"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import PaddleCheckoutButton from "@/components/PaddleCheckoutButton";
import { trackEvent } from "@/lib/analytics";

export default function UpgradePage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(undefined, { callbackUrl: "/upgrade" });
    }
  }, [status]);

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#ECE7E2]">
        <div className="w-8 h-8 rounded-full border-4 border-[#D9D3CC] border-t-[#252C25] animate-spin" />
      </main>
    );
  }

  if (!session) return null;

  return (
    <main className="min-h-screen bg-[#ECE7E2] px-4 pt-20 pb-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-[#252C25] flex items-center justify-center shadow-sm">
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
            <span className="text-base font-black text-[#1C1F1C] tracking-tight">
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
                className="w-10 h-10 rounded-full border-2 border-[#D9D3CC]"
              />
            )}
            <div className="text-left">
              <p className="text-sm font-bold text-[#1C1F1C]">
                {session.user?.name}
              </p>
              <p className="text-xs text-[#5A635A]">{session.user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="ml-2 text-[11px] text-[#5A635A] hover:text-[#1C1F1C] transition-colors underline"
            >
              Sign out
            </button>
          </div>

          <h1 className="text-4xl font-extrabold text-[#1C1F1C] mb-3">
            Upgrade to <span style={{ color: "#AB6D48" }}>Pro</span>
          </h1>
          <p className="text-[#5A635A] text-base">
            Everything you need to create viral-ready posts.
          </p>
        </div>

        {/* Pricing card */}
        <div className="glass-card rounded-2xl p-8 mb-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-xs font-bold text-[#5A635A] uppercase tracking-wider mb-1">
                Pro Plan
              </div>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black text-[#1C1F1C]">$5</span>
                <span className="text-[#5A635A] mb-1.5">/month</span>
              </div>
              <p className="text-xs text-[#5A635A] mt-1">
                Cancel anytime · No commitment
              </p>
            </div>
            <div className="bg-[#252C25] text-white text-xs font-bold px-3 py-1.5 rounded-full">
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
                className="flex items-center gap-3 text-sm text-[#1C1F1C]"
              >
                <svg
                  className="w-4 h-4 text-[#252C25] flex-shrink-0"
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

          <PaddleCheckoutButton />
          <p className="text-center text-[11px] text-[#5A635A] mt-3">
            Secure checkout · Cancel anytime from your account
          </p>
        </div>

        <p className="text-center text-sm text-[#5A635A]">
          Want to try first?{" "}
          <Link
            href="/editor"
            className="text-[#252C25] font-semibold hover:underline"
          >
            Open the free editor
          </Link>
        </p>
      </div>
    </main>
  );
}
