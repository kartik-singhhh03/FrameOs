// Returns { isPro: boolean } based on role, active subscription, or referral free-Pro grant.
// role, freeProUntil, referralCode, and referredById are never exposed to the client.
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ isPro: false });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true, freeProUntil: true },
  });

  if (!user) {
    return NextResponse.json({ isPro: false });
  }

  if (user.role === Role.ADMIN) {
    return NextResponse.json({ isPro: true });
  }

  const now = new Date();

  // Free Pro from referral reward.
  if (user.freeProUntil !== null && user.freeProUntil > now) {
    return NextResponse.json({ isPro: true });
  }

  const activeSubscription = await prisma.subscription.findFirst({
    where: { userId: user.id, status: "active", currentPeriodEnd: { gt: now } },
    select: { id: true },
  });

  return NextResponse.json({ isPro: activeSubscription !== null });
}
