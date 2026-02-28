import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — FrameOS",
  description:
    "Simple, transparent pricing for FrameOS. Free plan available. Pro plan at $5/month.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#ECE7E2] px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-[#5A635A] hover:text-[#1C1F1C] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to FrameOS
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#252C25] flex items-center justify-center shadow-sm flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" />
                <rect
                  x="10"
                  y="2"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.7"
                />
                <rect
                  x="2"
                  y="10"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.7"
                />
                <rect
                  x="10"
                  y="10"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.5"
                />
              </svg>
            </div>
            <span className="text-xl font-black text-[#1C1F1C] tracking-tight">
              FrameOS
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#1C1F1C] mb-3">
            Simple, Transparent Pricing
          </h1>
          <p className="text-[#5A635A] text-base">
            No hidden fees. No surprises. Cancel anytime.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Free Plan */}
          <div className="glass-card rounded-2xl p-8">
            <div className="mb-6">
              <div className="text-xs font-bold text-[#5A635A] uppercase tracking-wider mb-2">
                Free Plan
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-[#1C1F1C]">$0</span>
                <span className="text-[#5A635A] mb-1">/forever</span>
              </div>
              <p className="text-xs text-[#5A635A]">No credit card required</p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                { text: "Basic templates", included: true },
                { text: "Standard PNG export", included: true },
                { text: "No login required", included: true },
                { text: "Watermark on exports", included: false },
                { text: "Premium templates", included: false },
                { text: "High-resolution export", included: false },
                { text: "Scene mode", included: false },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm">
                  {item.included ? (
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
                  ) : (
                    <svg
                      className="w-4 h-4 text-[#D9D3CC] flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  <span
                    className={
                      item.included ? "text-[#1C1F1C]" : "text-[#9AA09A]"
                    }
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/editor"
              className="block w-full text-center border border-[#D9D3CC] bg-white text-[#1C1F1C] px-6 py-3 rounded-xl font-semibold text-sm hover:border-[#252C25] hover:bg-[#F4F1ED] transition-all"
            >
              Start for free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="glass-card rounded-2xl p-8 border-2 border-[#252C25] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#252C25] text-white text-xs font-bold px-4 py-1 rounded-full">
              Most Popular
            </div>
            <div className="mb-6">
              <div className="text-xs font-bold text-[#AB6D48] uppercase tracking-wider mb-2">
                Pro Plan
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-[#1C1F1C]">$5</span>
                <span className="text-[#5A635A] mb-1">/month</span>
              </div>
              <p className="text-xs text-[#5A635A]">
                Billed monthly · Auto-renews · Cancel anytime
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "No watermark on exports",
                "All premium templates",
                "4K ultra-high-resolution export",
                "2× high-resolution export",
                "Scene Mode (iPhone, MacBook, Web)",
                "All social post templates",
                "Advanced typography controls",
                "Priority support",
              ].map((feature) => (
                <li
                  key={feature}
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
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/upgrade"
              className="block w-full text-center bg-[#252C25] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1F261F] transition-all shadow-md"
            >
              Upgrade to Pro — $5/month
            </Link>
          </div>
        </div>

        {/* Transparency notice */}
        <div className="glass-card rounded-2xl p-8 mb-6 space-y-4">
          <h2 className="text-base font-bold text-[#1C1F1C]">
            Billing Transparency
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-[#3A3D3A]">
            <div className="flex items-start gap-2.5">
              <span className="text-[#252C25] mt-0.5 font-bold text-base leading-none">
                ·
              </span>
              <p>
                <strong>Auto-renewal:</strong> Your Pro subscription renews
                automatically every month on the same date you subscribed.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#252C25] mt-0.5 font-bold text-base leading-none">
                ·
              </span>
              <p>
                <strong>Cancel anytime:</strong> You can cancel at any time from
                your account dashboard. Access continues until the end of your
                billing period.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#252C25] mt-0.5 font-bold text-base leading-none">
                ·
              </span>
              <p>
                <strong>No hidden fees:</strong> The price you see is the price
                you pay. Tax may be added at checkout depending on your
                location.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#252C25] mt-0.5 font-bold text-base leading-none">
                ·
              </span>
              <p>
                <strong>Secure payments:</strong> All payments are processed
                securely by{" "}
                <a
                  href="https://paddle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#252C25]"
                >
                  Paddle
                </a>
                , our Merchant of Record.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#252C25] mt-0.5 font-bold text-base leading-none">
                ·
              </span>
              <p>
                <strong>Refund policy:</strong> We offer a 7-day refund window
                on your first payment. See our{" "}
                <Link
                  href="/refund-policy"
                  className="underline hover:text-[#252C25]"
                >
                  Refund Policy
                </Link>{" "}
                for details.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#252C25] mt-0.5 font-bold text-base leading-none">
                ·
              </span>
              <p>
                <strong>Support:</strong> Questions? Email us at{" "}
                <a
                  href="mailto:sweatandcode@gmail.com"
                  className="underline hover:text-[#252C25]"
                >
                  sweatandcode@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-center gap-6 text-xs text-[#5A635A]">
          <Link href="/" className="hover:text-[#1C1F1C] transition-colors">
            Home
          </Link>
          <Link
            href="/terms"
            className="hover:text-[#1C1F1C] transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/refund-policy"
            className="hover:text-[#1C1F1C] transition-colors"
          >
            Refund Policy
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-[#1C1F1C] transition-colors"
          >
            Privacy Policy
          </Link>
          <a
            href="mailto:sweatandcode@gmail.com"
            className="hover:text-[#1C1F1C] transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </main>
  );
}
