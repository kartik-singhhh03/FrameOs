"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { trackEvent } from "@/lib/analytics";

interface PaddleCheckoutButtonProps {
  className?: string;
  label?: string;
}

export default function PaddleCheckoutButton({
  className,
  label = "Subscribe — $5/month",
}: PaddleCheckoutButtonProps) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);

    // Require login before checkout
    if (status !== "authenticated") {
      signIn(undefined, { callbackUrl: "/upgrade" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", { method: "POST" });
      const data = (await res.json()) as {
        transactionId?: string;
        error?: string;
      };

      if (!res.ok || !data.transactionId) {
        throw new Error(data.error ?? "Failed to start checkout.");
      }

      const win = window as Window & {
        Paddle?: {
          Checkout: {
            open: (opts: { transactionId: string }) => void;
          };
        };
      };

      if (!win.Paddle?.Checkout) {
        throw new Error(
          "Paddle.js is not loaded. Please refresh and try again.",
        );
      }

      win.Paddle.Checkout.open({ transactionId: data.transactionId });
      trackEvent("upgrade_clicked", {
        location: "upgrade_page",
        plan: "pro_monthly",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={
          className ??
          "w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm py-4 rounded-2xl hover:opacity-90 transition-all duration-200 shadow-xl shadow-violet-300/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        }
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            Opening checkout…
          </span>
        ) : (
          label
        )}
      </button>
      {error && (
        <p className="text-[11px] text-red-500 text-center mt-2">{error}</p>
      )}
    </div>
  );
}
