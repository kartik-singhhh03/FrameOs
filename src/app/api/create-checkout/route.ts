import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Paddle, Environment } from "@paddle/paddle-node-sdk";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const paddle = new Paddle(process.env.PADDLE_API_KEY!, {
  environment:
    process.env.PADDLE_ENV === "production"
      ? Environment.production
      : Environment.sandbox,
});

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email || !session.user.id) {
      return NextResponse.json(
        { error: "You must be signed in to subscribe." },
        { status: 401 },
      );
    }

    // Resolve or create Paddle customer so email is pre-filled in checkout
    let paddleCustomerId: string | undefined;
    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { paddleCustomerId: true },
    });

    if (dbUser?.paddleCustomerId) {
      paddleCustomerId = dbUser.paddleCustomerId;
    } else {
      const customer = await paddle.customers.create({
        email: session.user.email,
        name: session.user.name ?? undefined,
      });
      paddleCustomerId = customer.id;
      await prisma.user.update({
        where: { id: session.user.id },
        data: { paddleCustomerId: customer.id },
      });
    }

    const transaction = await paddle.transactions.create({
      items: [{ priceId: process.env.PADDLE_PRICE_ID!, quantity: 1 }],
      customerId: paddleCustomerId,
      customData: { userId: session.user.id },
    });

    return NextResponse.json({ transactionId: transaction.id });
  } catch (err) {
    console.error("[create-checkout]", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 },
    );
  }
}
