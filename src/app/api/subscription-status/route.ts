/**
 * GET /api/subscription-status
 *
 * Server-side only. Returns { isPro: boolean }.
 *
 * Security guarantees:
 *  - Role is read from DB and never returned to the client.
 *  - ADMIN users always receive isPro: true regardless of subscription.
 *  - Regular users require an active, non-expired Paddle subscription.
 *  - No privilege escalation possible from the client side.
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  // ── 1. Validate session ───────────────────────────────────────────────────
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ isPro: false });
  }

  // ── 2. Fetch user from DB — email is the authoritative identifier ─────────
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      role: true, // server-side only — NEVER forwarded to the client
    },
  });

  if (!user) {
    return NextResponse.json({ isPro: false });
  }

  // ── 3. ADMIN bypass — always Pro, no subscription required ────────────────
  if (user.role === Role.ADMIN) {
    return NextResponse.json({ isPro: true });
  }

  // ── 4. Regular USER — require an active, non-expired subscription ─────────
  const now = new Date();

  const activeSubscription = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
      status: "active",
      currentPeriodEnd: { gt: now },
    },
    select: { id: true }, // minimal projection — no sensitive fields returned
  });

  // ── 5. Return only { isPro: boolean } — role is NEVER exposed ────────────
  return NextResponse.json({ isPro: activeSubscription !== null });
}
