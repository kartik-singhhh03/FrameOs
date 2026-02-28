import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — FrameOS",
  description: "Terms and Conditions for using FrameOS.",
};

const LAST_UPDATED = "February 28, 2026";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#ECE7E2] px-4 py-16">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-[#5A635A] hover:text-[#1C1F1C] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to FrameOS
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#252C25] flex items-center justify-center shadow-sm flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" />
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
              </svg>
            </div>
            <span className="text-xl font-black text-[#1C1F1C] tracking-tight">FrameOS</span>
          </div>

          <h1 className="text-4xl font-extrabold text-[#1C1F1C] mb-3">Terms &amp; Conditions</h1>
          <p className="text-sm text-[#5A635A]">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 sm:p-10 space-y-10 text-[#1C1F1C]">

          {/* 1. Introduction */}
          <section>
            <h2 className="text-lg font-bold mb-3">1. Introduction</h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              Welcome to FrameOS (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). FrameOS is an online SaaS design
              editor available at{" "}
              <a href="https://frameos.kartikdev.me" className="underline hover:text-[#252C25]" target="_blank" rel="noopener noreferrer">
                https://frameos.kartikdev.me
              </a>{" "}
              that enables users to create Mac-style frames, social post templates, and aesthetic screenshots.
            </p>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mt-3">
              By accessing or using FrameOS, you agree to be bound by these Terms &amp; Conditions
              (&ldquo;Terms&rdquo;). If you do not agree with any part of these Terms, you must not use our Service.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 2. Eligibility */}
          <section>
            <h2 className="text-lg font-bold mb-3">2. Eligibility</h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              You must be at least 18 years of age to use FrameOS. By using our Service, you represent and
              warrant that you are 18 years or older and have the legal capacity to enter into a binding
              agreement. If you are using FrameOS on behalf of a company or organisation, you represent that
              you have the authority to bind that entity to these Terms.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 3. Account Registration */}
          <section>
            <h2 className="text-lg font-bold mb-3">3. Account Registration</h2>
            <ul className="text-sm text-[#3A3D3A] leading-relaxed space-y-2 list-disc list-inside">
              <li>You may use the free editor without registration. Certain Pro features require a verified account.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You agree to provide accurate, current, and complete information during registration.</li>
              <li>
                You are solely responsible for all activities that occur under your account. Notify us
                immediately at{" "}
                <a href="mailto:sweatandcode@gmail.com" className="underline hover:text-[#252C25]">
                  sweatandcode@gmail.com
                </a>{" "}
                of any unauthorised use.
              </li>
              <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
            </ul>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 4. Subscription & Billing */}
          <section>
            <h2 className="text-lg font-bold mb-3">4. Subscription &amp; Billing</h2>
            <ul className="text-sm text-[#3A3D3A] leading-relaxed space-y-2 list-disc list-inside">
              <li>
                FrameOS offers a free plan with limited features and a <strong>Pro plan at $5 USD/month</strong>.
              </li>
              <li>
                Subscriptions are processed securely via{" "}
                <a href="https://paddle.com" className="underline hover:text-[#252C25]" target="_blank" rel="noopener noreferrer">
                  Paddle
                </a>
                , our Merchant of Record. Paddle handles all billing, tax compliance, and payment processing.
              </li>
              <li>
                Your Pro subscription <strong>automatically renews monthly</strong> on the same date you
                first subscribed, unless cancelled before the renewal date.
              </li>
              <li>All prices are displayed in USD and are exclusive of applicable taxes where required by law.</li>
              <li>We reserve the right to change pricing with at least 30 days&rsquo; notice to active subscribers.</li>
              <li>
                For billing disputes, contact Paddle support or email us at{" "}
                <a href="mailto:sweatandcode@gmail.com" className="underline hover:text-[#252C25]">
                  sweatandcode@gmail.com
                </a>.
              </li>
            </ul>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 5. Cancellation & Termination */}
          <section>
            <h2 className="text-lg font-bold mb-3">5. Cancellation &amp; Termination</h2>
            <ul className="text-sm text-[#3A3D3A] leading-relaxed space-y-2 list-disc list-inside">
              <li>
                You may cancel your Pro subscription <strong>at any time</strong> from your account settings
                or by contacting us. Cancellation takes effect at the end of the current billing period.
              </li>
              <li>
                Upon cancellation, you will retain Pro access until your billing period ends, after which
                your account will revert to the free plan.
              </li>
              <li>
                FrameOS is a <strong>digital product</strong>. As such, refunds are generally not provided
                for partially used billing periods. Please review our Refund Policy for full details.
              </li>
              <li>
                We reserve the right to terminate or suspend your account at any time, with or without
                notice, for violation of these Terms or applicable law.
              </li>
            </ul>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 6. Acceptable Use */}
          <section>
            <h2 className="text-lg font-bold mb-3">6. Acceptable Use</h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mb-3">
              You agree not to use FrameOS to:
            </p>
            <ul className="text-sm text-[#3A3D3A] leading-relaxed space-y-2 list-disc list-inside">
              <li>Violate any applicable local, national, or international law or regulation.</li>
              <li>Create, distribute, or publish harmful, hateful, defamatory, or illegal content.</li>
              <li>Infringe upon any third party&rsquo;s intellectual property, copyright, or privacy rights.</li>
              <li>Reverse-engineer, decompile, or attempt to extract the source code of FrameOS.</li>
              <li>Use automated tools, bots, or scrapers to access or abuse our service.</li>
              <li>Attempt to gain unauthorised access to any systems or networks connected to FrameOS.</li>
              <li>Resell, sublicense, or commercially exploit the Service without our written permission.</li>
            </ul>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mt-3">
              Violation of acceptable use may result in immediate account termination without refund.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 7. Intellectual Property */}
          <section>
            <h2 className="text-lg font-bold mb-3">7. Intellectual Property</h2>
            <ul className="text-sm text-[#3A3D3A] leading-relaxed space-y-2 list-disc list-inside">
              <li>
                FrameOS and all its content, features, design, code, and trademarks are the exclusive
                property of FrameOS and its creators.
              </li>
              <li>
                You retain full ownership of the designs and content you create using FrameOS. By using
                our Service, you grant us no rights over your created content.
              </li>
              <li>
                You may not use our name, logo, or brand identity without explicit written permission.
              </li>
              <li>
                Any feedback or suggestions you provide to us may be used by FrameOS without obligation
                or compensation to you.
              </li>
            </ul>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 8. Disclaimer */}
          <section>
            <h2 className="text-lg font-bold mb-3">8. Disclaimer of Warranties</h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              FrameOS is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without any warranties of any
              kind, either express or implied, including but not limited to warranties of merchantability,
              fitness for a particular purpose, or non-infringement. We do not warrant that the Service
              will be uninterrupted, error-free, or free of viruses or harmful components.
            </p>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mt-3">
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time
              without notice.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 9. Limitation of Liability */}
          <section>
            <h2 className="text-lg font-bold mb-3">9. Limitation of Liability</h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              To the fullest extent permitted by applicable law, FrameOS and its creators shall not be
              liable for any indirect, incidental, special, consequential, or punitive damages, including
              but not limited to loss of data, revenue, profits, or goodwill, arising out of or in
              connection with your use of the Service.
            </p>
            <p className="text-sm text-[#3A3D3A] leading-relaxed mt-3">
              In no event shall our total liability to you exceed the amount paid by you to FrameOS in the
              three (3) months immediately preceding the claim.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 10. Changes to Terms */}
          <section>
            <h2 className="text-lg font-bold mb-3">10. Changes to Terms</h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              We reserve the right to update or modify these Terms at any time. Changes will be effective
              immediately upon posting to this page with an updated &ldquo;Last updated&rdquo; date. We will make
              reasonable efforts to notify active subscribers of material changes via email or in-app
              notification. Your continued use of FrameOS after any changes constitutes your acceptance
              of the new Terms.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 11. Governing Law */}
          <section>
            <h2 className="text-lg font-bold mb-3">11. Governing Law</h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>,
              without regard to its conflict of law provisions. Any disputes arising under these Terms
              shall be subject to the exclusive jurisdiction of the courts located in India.
            </p>
          </section>

          <hr className="border-[#D9D3CC]" />

          {/* 12. Contact */}
          <section>
            <h2 className="text-lg font-bold mb-3">12. Contact Information</h2>
            <p className="text-sm text-[#3A3D3A] leading-relaxed">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="mt-3 text-sm text-[#3A3D3A] space-y-1">
              <p><strong>Product:</strong> FrameOS</p>
              <p>
                <strong>Website:</strong>{" "}
                <a href="https://frameos.kartikdev.me" className="underline hover:text-[#252C25]" target="_blank" rel="noopener noreferrer">
                  https://frameos.kartikdev.me
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:sweatandcode@gmail.com" className="underline hover:text-[#252C25]">
                  sweatandcode@gmail.com
                </a>
              </p>
            </div>
          </section>

        </div>

        {/* Footer nav */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[#5A635A]">
          <Link href="/" className="hover:text-[#1C1F1C] transition-colors">Home</Link>
          <Link href="/editor" className="hover:text-[#1C1F1C] transition-colors">Editor</Link>
          <Link href="/upgrade" className="hover:text-[#1C1F1C] transition-colors">Pricing</Link>
          <a href="mailto:sweatandcode@gmail.com" className="hover:text-[#1C1F1C] transition-colors">Contact</a>
        </div>
      </div>
    </main>
  );
}
