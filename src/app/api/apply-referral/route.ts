import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const referralCode =
    body !== null &&
    typeof body === "object" &&
    "referralCode" in body &&
    typeof (body as Record<string, unknown>).referralCode === "string"
      ? (body as Record<string, string>).referralCode.trim()
      : null;

  if (!referralCode) {
    return NextResponse.json(
      { error: "referralCode is required and must be a non-empty string." },
      { status: 400 },
    );
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, referredById: true },
  });

  if (!currentUser) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  if (currentUser.referredById !== null) {
    return NextResponse.json(
      { error: "A referral code has already been applied to your account." },
      { status: 409 },
    );
  }

  const referrer = await prisma.user.findUnique({
    where: { referralCode },
    select: { id: true },
  });

  // Return identical 400 for both "not found" and "self-referral" to prevent code enumeration.
  if (!referrer || referrer.id === currentUser.id) {
    return NextResponse.json(
      { error: "Invalid referral code." },
      { status: 400 },
    );
  }

  try {
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { referredById: referrer.id },
    });
  } catch (err) {
    console.error("[apply-referral] DB update failed:", err);
    return NextResponse.json(
      { error: "Failed to apply referral code. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { success: true, message: "Referral code applied successfully." },
    { status: 200 },
  );
}
