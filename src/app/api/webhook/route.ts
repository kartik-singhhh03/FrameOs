import { NextRequest, NextResponse } from "next/server";
import { Paddle, Environment } from "@paddle/paddle-node-sdk";
import prisma from "@/lib/prisma";

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

        // Resolve user — prefer userId from customData, fallback to email
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
        // Unhandled event type — ignore silently
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
