import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { nanoid } from "nanoid";
import prisma from "./prisma";

// Generates a unique 8-char referral code, retrying up to `attempts` times on collision.
async function generateUniqueReferralCode(attempts = 5): Promise<string> {
  for (let i = 0; i < attempts; i++) {
    const code = nanoid(8);
    const existing = await prisma.user.findUnique({
      where: { referralCode: code },
      select: { id: true },
    });
    if (!existing) return code;
  }
  return nanoid(16);
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) session.user.id = token.id as string;
      return session;
    },
  },
  events: {
    // Fires only on first sign-up — assigns a unique referral code.
    async createUser({ user }) {
      const code = await generateUniqueReferralCode();
      await prisma.user.update({
        where: { id: user.id },
        data: { referralCode: code },
      });
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
};
