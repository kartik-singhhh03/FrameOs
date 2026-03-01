"use client";

import { useEffect, useState } from "react";

type Status = "loading" | "ready" | "error";

export default function ReferralShare() {
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [status, setStatus] = useState<Status>("loading");
  const [copied, setCopied] = useState<"code" | "link" | null>(null);

  useEffect(() => {
    fetch("/api/referral-code")
      .then((r) => r.json())
      .then((data) => {
        if (data.referralCode) {
          setReferralCode(data.referralCode);
          setReferralCount(data.referralCount ?? 0);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/pricing?ref=${referralCode}`
      : "";

  async function copy(type: "code" | "link") {
    const text = type === "code" ? referralCode : referralLink;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  }

  if (status === "loading") {
    return (
      <div className="glass-card rounded-2xl p-6 mb-6 animate-pulse">
        <div className="h-3 w-32 bg-[#D9D3CC] rounded mb-4" />
        <div className="h-10 w-full bg-[#D9D3CC] rounded-xl" />
      </div>
    );
  }

  if (status === "error") return null;

  return (
    <div className="glass-card rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-bold text-[#5A635A] uppercase tracking-wider">
          Refer a friend &amp; earn 1 free month
        </p>
        {referralCount > 0 && (
          <span className="text-xs font-semibold text-[#252C25] bg-[#D9D3CC] rounded-full px-2.5 py-0.5">
            {referralCount} {referralCount === 1 ? "referral" : "referrals"}
          </span>
        )}
      </div>
      <p className="text-xs text-[#9AA09A] mb-4">
        Share your code or link. When a friend signs up and subscribes, you both
        get 1 free month of Pro.
      </p>

      {/* Referral code row */}
      <div className="mb-3">
        <p className="text-[11px] font-semibold text-[#5A635A] uppercase tracking-wider mb-1.5">
          Your code
        </p>
        <div className="flex gap-2">
          <div className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#D9D3CC] text-sm font-mono font-semibold text-[#1C1F1C] select-all truncate">
            {referralCode}
          </div>
          <button
            onClick={() => copy("code")}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#252C25] text-white hover:bg-[#1F261F] active:scale-95 transition-all whitespace-nowrap"
          >
            {copied === "code" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Referral link row */}
      <div>
        <p className="text-[11px] font-semibold text-[#5A635A] uppercase tracking-wider mb-1.5">
          Or share a link
        </p>
        <div className="flex gap-2">
          <div className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#D9D3CC] text-xs text-[#9AA09A] truncate flex items-center">
            {referralLink}
          </div>
          <button
            onClick={() => copy("link")}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#252C25] text-white hover:bg-[#1F261F] active:scale-95 transition-all whitespace-nowrap"
          >
            {copied === "link" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
