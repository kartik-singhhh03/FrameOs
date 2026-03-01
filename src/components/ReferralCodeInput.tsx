"use client";

import { useState, useRef, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ReferralCodeInput({
  defaultCode = "",
}: {
  defaultCode?: string;
}) {
  const [code, setCode] = useState(defaultCode);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const applied = status === "success";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = code.trim();
    if (!trimmed) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/apply-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referralCode: trimmed }),
      });

      const data: { success?: boolean; message?: string; error?: string } =
        await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(
          "Referral code applied! You'll get 1 free month of Pro after your first payment.",
        );
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <div className="glass-card rounded-2xl p-6 mb-6">
      <p className="text-xs font-bold text-[#5A635A] uppercase tracking-wider mb-3">
        Have a referral code?
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2"
        aria-label="Apply referral code"
      >
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={applied || status === "loading"}
            placeholder="Enter referral code"
            maxLength={32}
            spellCheck={false}
            autoComplete="off"
            className={[
              "w-full px-4 py-2.5 rounded-xl text-sm font-medium border transition-all outline-none",
              "bg-white text-[#1C1F1C] placeholder:text-[#9AA09A]",
              applied
                ? "border-[#5A635A] opacity-60 cursor-not-allowed"
                : status === "error"
                  ? "border-red-400 focus:ring-2 focus:ring-red-200"
                  : "border-[#D9D3CC] focus:border-[#252C25] focus:ring-2 focus:ring-[#25292525]",
            ].join(" ")}
          />
          {/* Lock icon when applied */}
          {applied && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A635A]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={applied || status === "loading" || !code.trim()}
          className={[
            "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
            applied
              ? "bg-[#5A635A] text-white opacity-60 cursor-not-allowed"
              : status === "loading"
                ? "bg-[#252C25] text-white opacity-70 cursor-wait"
                : "bg-[#252C25] text-white hover:bg-[#1F261F] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed",
          ].join(" ")}
        >
          {status === "loading" ? (
            <span className="flex items-center gap-1.5">
              <svg
                className="animate-spin w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeOpacity="0.25"
                />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              Applying…
            </span>
          ) : applied ? (
            "Applied ✓"
          ) : (
            "Apply"
          )}
        </button>
      </form>

      {/* Feedback message */}
      {message && (
        <p
          role="status"
          aria-live="polite"
          className={[
            "mt-2.5 text-xs font-medium flex items-start gap-1.5",
            applied ? "text-[#3A7A3A]" : "text-red-500",
          ].join(" ")}
        >
          {applied ? (
            <svg
              className="w-3.5 h-3.5 mt-px flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5 mt-px flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {message}
        </p>
      )}
    </div>
  );
}
