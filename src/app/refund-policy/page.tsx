import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy — FrameOS",
  description: "FrameOS refund policy for Pro subscriptions.",
};

const LAST_UPDATED = "February 28, 2026";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#ECE7E2] px-4 py-16">
      <div className="max-w-3xl mx-auto">
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
            Refund Policy
          </h1>
          <p className="text-sm text-[#5A635A]">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 sm:p-10 space-y-10 text-[#1C1F1C]">
          {/* 1. Overview */}
          <section>
            <h2 className="text-lg font-bold mb-3">1. Overview</h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              FrameOS operates as a digital SaaS product. We want you to be
              fully satisfied with your subscription. This Refund Policy
              outlines the conditions under which you may request a refund for
              your FrameOS Pro subscription, processed via{" "}
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
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 2. Eligibility */}
          <section>
            <h2 className="text-lg font-bold mb-3">
              2. Eligibility for Refund
            </h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mb-3">
              You may be eligible for a full refund if <strong>all</strong> of
              the following conditions are met:
            </p>
            <ul className="text-sm text-[#3A3D3A] leading-relaxed space-y-2 list-disc list-inside">
              <li>
                It is your <strong>first subscription payment</strong> to
                FrameOS Pro.
              </li>
              <li>
                Your refund request is submitted <strong>within 7 days</strong>{" "}
                of the initial charge.
              </li>
              <li>
                You have not made excessive use of Pro features (e.g., bulk
                exports of 4K assets).
              </li>
              <li>
                Your account is in good standing and has not violated our Terms
                &amp; Conditions.
              </li>
            </ul>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 3. Non-refundable */}
          <section>
            <h2 className="text-lg font-bold mb-3">
              3. Non-Refundable Situations
            </h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mb-3">
              The following situations are <strong>not eligible</strong> for a
              refund:
            </p>
            <ul className="text-sm text-[#3A3D3A] leading-relaxed space-y-2 list-disc list-inside">
              <li>Renewal charges after the initial subscription period.</li>
              <li>Partial billing cycles — we do not prorate unused days.</li>
              <li>
                Refund requests submitted more than 7 days after the charge
                date.
              </li>
              <li>Accounts terminated due to Terms of Service violations.</li>
              <li>
                Requests citing features that are clearly documented as part of
                the Free plan only.
              </li>
              <li>Change of mind after extensive use of Pro features.</li>
            </ul>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 4. How to Request */}
          <section>
            <h2 className="text-lg font-bold mb-3">
              4. How to Request a Refund
            </h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mb-3">
              To request a refund, please email us at{" "}
              <a
                href="mailto:sweatandcode@gmail.com"
                className="underline hover:text-[#252C25]"
              >
                sweatandcode@gmail.com
              </a>{" "}
              with the following information:
            </p>
            <ul className="text-sm text-[#3A3D3A] leading-relaxed space-y-2 list-disc list-inside">
              <li>
                Subject line:{" "}
                <strong>&ldquo;Refund Request — FrameOS Pro&rdquo;</strong>
              </li>
              <li>Your registered email address.</li>
              <li>Date of charge and approximate amount.</li>
              <li>Reason for requesting a refund.</li>
            </ul>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mt-3">
              We will review your request and respond within{" "}
              <strong>2 business days</strong>.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 5. Processing Timeline */}
          <section>
            <h2 className="text-lg font-bold mb-3">5. Processing Timeline</h2>
            <ul className="text-sm text-[#3A3D3A] leading-relaxed space-y-2 list-disc list-inside">
              <li>
                Once approved, refunds are processed through{" "}
                <strong>Paddle</strong>, our payment processor.
              </li>
              <li>
                Refunds are credited to your{" "}
                <strong>original payment method</strong> (credit/debit card or
                PayPal).
              </li>
              <li>
                Processing time is typically <strong>5–10 business days</strong>{" "}
                depending on your bank or card issuer.
              </li>
              <li>
                You will receive an email confirmation once the refund has been
                initiated.
              </li>
              <li>
                Following a refund, your account will revert to the Free plan
                immediately.
              </li>
            </ul>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 6. Cancellation vs Refund */}
          <section>
            <h2 className="text-lg font-bold mb-3">
              6. Cancellation vs. Refund
            </h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              Cancelling your subscription and requesting a refund are{" "}
              <strong>two separate actions</strong>. Cancellation stops future
              renewals and is available anytime from your account dashboard. It
              does <strong>not</strong> automatically trigger a refund of the
              current billing period. If you also want a refund, you must submit
              a separate request as described above.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 7. Contact */}
          <section>
            <h2 className="text-lg font-bold mb-3">7. Contact Details</h2>
            <div className="text-sm text-[#3A3D3A] space-y-1">
              <p>
                <strong>Product:</strong> FrameOS
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href="https://frameos.kartikdev.me"
                  className="underline hover:text-[#252C25]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://frameos.kartikdev.me
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:sweatandcode@gmail.com"
                  className="underline hover:text-[#252C25]"
                >
                  sweatandcode@gmail.com
                </a>
              </p>
              <p className="mt-3 text-[#5A635A]">
                For billing disputes that cannot be resolved directly with us,
                you may also contact{" "}
                <a
                  href="https://paddle.com/support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#252C25]"
                >
                  Paddle Support
                </a>
                .
              </p>
            </div>
          </section>
        </div>

        {/* Footer nav */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[#5A635A]">
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
            href="/privacy-policy"
            className="hover:text-[#1C1F1C] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/pricing"
            className="hover:text-[#1C1F1C] transition-colors"
          >
            Pricing
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
