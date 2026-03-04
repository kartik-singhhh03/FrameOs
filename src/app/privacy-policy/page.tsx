import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — FrameOS",
  description:
    "FrameOS Privacy Policy — how we collect, use, and protect your data.",
};

const LAST_UPDATED = "February 28, 2026";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-[#5A635A]">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 sm:p-10 space-y-10 text-[#1C1F1C]">
          {/* Intro */}
          <section>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              FrameOS (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
              is committed to protecting your personal data. This Privacy Policy
              explains what data we collect, how we use it, and your rights
              under applicable data protection laws including the General Data
              Protection Regulation (GDPR). By using FrameOS at{" "}
              <a
                href="https://frameos.kartikdev.me"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#252C25]"
              >
                https://frameos.kartikdev.me
              </a>
              , you agree to the terms of this policy.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-lg font-bold mb-3">
              1. Information We Collect
            </h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mb-3">
              We collect the following categories of data:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-[#1C1F1C] mb-1">
                  a) Account Data
                </h3>
                <p className="text-sm text-[#3A3D3A] leading-relaxed">
                  When you sign in using Google OAuth (via NextAuth.js), we
                  receive your name, email address, and profile picture from
                  Google. We store this in our database solely to provide
                  account functionality.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1C1F1C] mb-1">
                  b) Usage Data
                </h3>
                <p className="text-sm text-[#3A3D3A] leading-relaxed">
                  We collect anonymised usage data such as pages visited,
                  features used, and session duration via Google Analytics 4.
                  This data is used to improve our product. No personally
                  identifiable information is shared with Google Analytics.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1C1F1C] mb-1">
                  c) Payment Data
                </h3>
                <p className="text-sm text-[#3A3D3A] leading-relaxed">
                  We do <strong>not</strong> collect or store any credit card or
                  payment details. All payment processing is handled entirely by{" "}
                  <a
                    href="https://paddle.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#252C25]"
                  >
                    Paddle
                  </a>
                  , our Merchant of Record. Paddle handles PCI compliance,
                  billing, and tax on our behalf. Please refer to{" "}
                  <a
                    href="https://www.paddle.com/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#252C25]"
                  >
                    Paddle&rsquo;s Privacy Policy
                  </a>{" "}
                  for details on how they handle payment data.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1C1F1C] mb-1">
                  d) Technical Data
                </h3>
                <p className="text-sm text-[#3A3D3A] leading-relaxed">
                  We may collect IP addresses, browser type, device type, and
                  operating system for security and diagnostic purposes. This
                  data is not linked to your personal identity.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 2. How We Use Information */}
          <section>
            <h2 className="text-lg font-bold mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="text-sm text-[#3A3D3A] leading-relaxed space-y-2 list-disc list-inside">
              <li>To provide, maintain, and improve the FrameOS service.</li>
              <li>To authenticate your identity and manage your account.</li>
              <li>To process subscription payments via Paddle.</li>
              <li>
                To send transactional emails (e.g., billing confirmations — via
                Paddle).
              </li>
              <li>
                To analyse product usage and improve user experience (Google
                Analytics).
              </li>
              <li>
                To detect and prevent fraud, abuse, or security incidents.
              </li>
              <li>To comply with legal obligations.</li>
            </ul>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mt-3">
              We do <strong>not</strong> sell, rent, or share your personal data
              with third parties for marketing purposes.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 3. Payment Processing */}
          <section>
            <h2 className="text-lg font-bold mb-3">
              3. Payment Processing (Paddle as Merchant of Record)
            </h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              FrameOS uses <strong>Paddle</strong> as its Merchant of Record.
              This means Paddle is responsible for processing payments, handling
              tax compliance, and issuing invoices on our behalf. When you
              subscribe to FrameOS Pro, you enter into a transaction with
              Paddle, not directly with FrameOS. Paddle&rsquo;s use of your
              payment information is governed by their own privacy policy
              available at{" "}
              <a
                href="https://www.paddle.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#252C25]"
              >
                paddle.com/legal/privacy
              </a>
              .
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 4. Cookies & Analytics */}
          <section>
            <h2 className="text-lg font-bold mb-3">
              4. Cookies &amp; Analytics
            </h2>
            <div className="space-y-3 text-sm text-[#3A3D3A] leading-relaxed">
              <p>We use the following cookies and tracking technologies:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F4F1ED]">
                      <th className="text-left p-3 font-semibold border border-[#D9D3CC]">
                        Cookie / Service
                      </th>
                      <th className="text-left p-3 font-semibold border border-[#D9D3CC]">
                        Purpose
                      </th>
                      <th className="text-left p-3 font-semibold border border-[#D9D3CC]">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        "next-auth.session-token",
                        "Maintains your login session",
                        "Essential",
                      ],
                      [
                        "__Secure-next-auth.session-token",
                        "Secure session cookie",
                        "Essential",
                      ],
                      [
                        "Google Analytics (GA4)",
                        "Anonymised usage analytics",
                        "Analytics",
                      ],
                      ["Paddle", "Checkout and fraud prevention", "Essential"],
                    ].map(([name, purpose, type]) => (
                      <tr key={name} className="border border-[#D9D3CC]">
                        <td className="p-3 font-mono text-[10px]">{name}</td>
                        <td className="p-3">{purpose}</td>
                        <td className="p-3">{type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Google Analytics is loaded only in production and uses
                anonymised data. You can opt out via the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#252C25]"
                >
                  Google Analytics opt-out browser add-on
                </a>
                .
              </p>
            </div>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 5. Data Retention */}
          <section>
            <h2 className="text-lg font-bold mb-3">5. Data Retention</h2>
            <ul className="text-sm text-[#3A3D3A] leading-relaxed space-y-2 list-disc list-inside">
              <li>
                Account data is retained for as long as your account is active.
              </li>
              <li>
                Upon account deletion request, we will delete your personal data
                within <strong>30 days</strong>, except where we are required to
                retain it for legal or tax compliance purposes.
              </li>
              <li>
                Anonymised analytics data may be retained indefinitely as it
                cannot identify you.
              </li>
              <li>
                Payment records are retained by Paddle in accordance with their
                policies and applicable tax law.
              </li>
            </ul>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 6. User Rights */}
          <section>
            <h2 className="text-lg font-bold mb-3">6. Your Rights (GDPR)</h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mb-3">
              If you are located in the European Economic Area (EEA) or UK, you
              have the following rights under GDPR:
            </p>
            <ul className="text-sm text-[#3A3D3A] leading-relaxed space-y-2 list-disc list-inside">
              <li>
                <strong>Right of access</strong> — request a copy of your
                personal data.
              </li>
              <li>
                <strong>Right to rectification</strong> — request correction of
                inaccurate data.
              </li>
              <li>
                <strong>Right to erasure</strong> — request deletion of your
                personal data.
              </li>
              <li>
                <strong>Right to restrict processing</strong> — request we limit
                how we use your data.
              </li>
              <li>
                <strong>Right to data portability</strong> — receive your data
                in a machine-readable format.
              </li>
              <li>
                <strong>Right to object</strong> — object to processing based on
                legitimate interests.
              </li>
            </ul>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mt-3">
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:sweatandcode@gmail.com"
                className="underline hover:text-[#252C25]"
              >
                sweatandcode@gmail.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 7. Data Security */}
          <section>
            <h2 className="text-lg font-bold mb-3">7. Data Security</h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              We implement appropriate technical and organisational measures to
              protect your personal data against unauthorised access,
              alteration, disclosure, or destruction. These include encrypted
              database connections (TLS), secure authentication tokens, and
              restricted access to production systems. However, no method of
              transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 8. Third-Party Services */}
          <section>
            <h2 className="text-lg font-bold mb-3">8. Third-Party Services</h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mb-3">
              We use the following third-party services:
            </p>
            <div className="space-y-2 text-sm text-[#3A3D3A]">
              {[
                [
                  "Google OAuth",
                  "Authentication",
                  "https://policies.google.com/privacy",
                ],
                [
                  "Google Analytics 4",
                  "Usage analytics",
                  "https://policies.google.com/privacy",
                ],
                [
                  "Paddle",
                  "Payment processing & billing",
                  "https://www.paddle.com/legal/privacy",
                ],
                [
                  "Neon",
                  "Database hosting",
                  "https://neon.tech/privacy-policy",
                ],
                [
                  "Vercel",
                  "Application hosting",
                  "https://vercel.com/legal/privacy-policy",
                ],
              ].map(([name, purpose, link]) => (
                <div key={name} className="flex items-start gap-2">
                  <span className="text-[#252C25] font-bold mt-0.5">·</span>
                  <p>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline hover:text-[#252C25]"
                    >
                      {name}
                    </a>{" "}
                    — {purpose}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 9. Changes */}
          <section>
            <h2 className="text-lg font-bold mb-3">
              9. Changes to This Policy
            </h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated &ldquo;Last updated&rdquo;
              date. For significant changes, we will notify registered users via
              email. Your continued use of FrameOS after changes are posted
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 10. Contact */}
          <section>
            <h2 className="text-lg font-bold mb-3">10. Contact Information</h2>
            <div className="text-sm text-[#3A3D3A] space-y-1">
              <p>
                <strong>Legal Owner:</strong> Kartik Singh
              </p>
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
            href="/refund-policy"
            className="hover:text-[#1C1F1C] transition-colors"
          >
            Refund Policy
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
