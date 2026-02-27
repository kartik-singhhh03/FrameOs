"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import PaddleCheckoutButton from "@/components/PaddleCheckoutButton";

export default function UpgradePage() {
  const { data: session, status } = useSession();

  // Redirect unauthenticated users to sign-in
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(undefined, { callbackUrl: "/upgrade" });
    }
  }, [status]);

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <div className="w-8 h-8 rounded-full border-4 border-violet-300 border-t-violet-600 animate-spin" />
      </main>
    );
  }

  if (!session) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 pt-20 pb-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M3 9h18" />
              </svg>
            </div>
            <span className="text-base font-black text-violet-950 tracking-tight">
              FrameOS
            </span>
          </Link>

          {/* User info */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {session.user?.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="w-10 h-10 rounded-full border-2 border-violet-200"
              />
            )}
            <div className="text-left">
              <p className="text-sm font-bold text-violet-900">
                {session.user?.name}
              </p>
              <p className="text-xs text-violet-500">{session.user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="ml-2 text-[11px] text-violet-400 hover:text-violet-600 transition-colors underline"
            >
              Sign out
            </button>
          </div>

          <h1 className="text-4xl font-extrabold text-violet-950 mb-3">
            Upgrade to{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Pro
            </span>
          </h1>
          <p className="text-violet-500 text-base">
            Everything you need to create viral-ready posts.
          </p>
        </div>

        {/* Pricing card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-violet-200 shadow-2xl shadow-violet-200/40 p-8 mb-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-sm font-bold text-violet-500 uppercase tracking-wider mb-1">
                Pro Plan
              </div>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black text-violet-950">$5</span>
                <span className="text-violet-400 mb-1.5">/month</span>
              </div>
              <p className="text-xs text-violet-400 mt-1">
                Cancel anytime · No commitment
              </p>
            </div>
            <div className="bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1.5 rounded-full">
              Most Popular
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {[
              "No watermark on exports",
              "4K ultra-high-resolution export",
              "2× high-resolution export",
              "All social post templates",
              "Scene Mode (iPhone, MacBook, Web)",
              "Priority support",
            ].map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 text-sm text-violet-800"
              >
                <svg
                  className="w-4 h-4 text-violet-600 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA — Paddle checkout */}
          <PaddleCheckoutButton />
          <p className="text-center text-[11px] text-violet-400 mt-3">
            Secure checkout · Cancel anytime from your account
          </p>
        </div>

        {/* Back to editor */}
        <p className="text-center text-sm text-violet-400">
          Want to try first?{" "}
          <Link
            href="/editor"
            className="text-violet-600 font-semibold hover:underline"
          >
            Open the free editor
          </Link>
        </p>
      </div>
    </main>
  );
}
