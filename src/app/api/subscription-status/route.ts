import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    // Not logged in → definitely not Pro
    return NextResponse.json({ isPro: false });
  }

  const now = new Date();

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
      status: "active",
      currentPeriodEnd: { gt: now },
    },
  });

  return NextResponse.json({ isPro: subscription !== null });
}
