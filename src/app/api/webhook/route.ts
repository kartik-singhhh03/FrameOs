import { NextRequest, NextResponse } from "next/server";
import { Paddle, Environment } from "@paddle/paddle-node-sdk";
import prisma from "@/lib/prisma";

// Month-extension helper used inside $transaction (must use the tx client, not the global one).
function computeExtendedDate(current: Date | null, now: Date): Date {
  const base =
    current !== null && current > now ? new Date(current) : new Date(now);
  base.setMonth(base.getMonth() + 1);
  return base;
}

const paddle = new Paddle(process.env.PADDLE_API_KEY!, {
  environment:
    process.env.PADDLE_ENV === "production"
      ? Environment.production
      : Environment.sandbox,
});

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("paddle-signature") ?? "";

  let event;
  try {
    event = await paddle.webhooks.unmarshal(
      rawBody,
      process.env.PADDLE_WEBHOOK_SECRET!,
      signature,
    );
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  try {
    switch (event.eventType) {
      case "subscription.activated": {
        const sub = event.data as {
          id: string;
          status: string;
          customData?: { userId?: string };
          customer?: { email?: string };
        };

        if (sub.status !== "active") {
          console.log(
            `[webhook] subscription.activated ignored — status=${sub.status}`,
          );
          break;
        }

        // Resolve user — prefer customData.userId, fallback to email.
        const userId = sub.customData?.userId;
        const email = sub.customer?.email;

        let user = userId
          ? await prisma.user.findUnique({
              where: { id: userId },
              select: { id: true, referredById: true },
            })
          : null;

        if (!user && email) {
          user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, referredById: true },
          });
        }

        if (!user) {
          console.warn(
            `[webhook] subscription.activated — user not found (sub=${sub.id})`,
          );
          break;
        }

        if (!user.referredById) break;

        // Guard against self-referral.
        if (user.referredById === user.id) {
          console.error(
            `[webhook] Self-referral detected for user ${user.id} — skipping reward.`,
          );
          break;
        }

        // Idempotency pre-check — skip if reward already exists.
        const existingReward = await prisma.referralReward.findUnique({
          where: {
            referrerId_refereeId: {
              referrerId: user.referredById,
              refereeId: user.id,
            },
          },
          select: { id: true },
        });

        if (existingReward) {
          console.log(
            `[webhook] Referral reward already granted — skipping.` +
              ` referrerId=${user.referredById} refereeId=${user.id}`,
          );
          break;
        }

        // Atomic: extend both users + record reward. @@unique is the final concurrency guard.
        await prisma.$transaction(async (tx) => {
          const now = new Date();
          const refereeId = user!.id;
          const referrerId = user!.referredById!;

          const [referee, referrer] = await Promise.all([
            tx.user.findUniqueOrThrow({
              where: { id: refereeId },
              select: { id: true, freeProUntil: true },
            }),
            tx.user.findUniqueOrThrow({
              where: { id: referrerId },
              select: { id: true, freeProUntil: true },
            }),
          ]);

          await Promise.all([
            tx.user.update({
              where: { id: referee.id },
              data: {
                freeProUntil: computeExtendedDate(referee.freeProUntil, now),
              },
            }),
            tx.user.update({
              where: { id: referrer.id },
              data: {
                freeProUntil: computeExtendedDate(referrer.freeProUntil, now),
              },
            }),
            tx.referralReward.create({
              data: { referrerId: referrer.id, refereeId: referee.id },
            }),
          ]);
        });

        console.log(
          `[webhook] Referral reward granted.` +
            ` referrerId=${user.referredById} refereeId=${user.id}`,
        );
        break;
      }

      case "subscription.created":
      case "subscription.updated": {
        const sub = event.data as {
          id: string;
          status: string;
          customData?: { userId?: string };
          customer?: { email?: string };
          currentBillingPeriod?: { endsAt?: string };
        };

        const userId = sub.customData?.userId;
        const email = sub.customer?.email;
        const periodEnd = sub.currentBillingPeriod?.endsAt
          ? new Date(sub.currentBillingPeriod.endsAt)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        let user = userId
          ? await prisma.user.findUnique({ where: { id: userId } })
          : null;

        if (!user && email) {
          user = await prisma.user.findUnique({ where: { email } });
        }

        if (!user) {
          console.warn("[webhook] User not found for sub:", sub.id);
          break;
        }

        await prisma.subscription.upsert({
          where: { paddleSubscriptionId: sub.id },
          create: {
            paddleSubscriptionId: sub.id,
            userId: user.id,
            status: sub.status,
            currentPeriodEnd: periodEnd,
          },
          update: {
            status: sub.status,
            currentPeriodEnd: periodEnd,
          },
        });

        console.log(
          `[webhook] subscription.${event.eventType.split(".")[1]} — user ${user.id} → ${sub.status}`,
        );
        break;
      }

      case "subscription.canceled": {
        const sub = event.data as {
          id: string;
          status: string;
          currentBillingPeriod?: { endsAt?: string };
        };

        const periodEnd = sub.currentBillingPeriod?.endsAt
          ? new Date(sub.currentBillingPeriod.endsAt)
          : new Date();

        await prisma.subscription.updateMany({
          where: { paddleSubscriptionId: sub.id },
          data: { status: "canceled", currentPeriodEnd: periodEnd },
        });

        console.log(`[webhook] subscription.canceled — ${sub.id}`);
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("[webhook] Handler error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
