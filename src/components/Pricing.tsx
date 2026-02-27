"use client";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FREE_FEATURES = [
  "Basic templates",
  "Watermark on export",
  "Standard export",
];

const PRO_FEATURES = [
  "All templates",
  "Scene Mode",
  "Social templates",
  "High resolution export",
  "Advanced typography",
  "Blur & grain",
  "Remove watermark",
  "Cancel anytime",
];

const FAQ = [
  {
    q: "Is there a free plan?",
    a: "Yes — the Free plan is permanent. You get access to the full editor with basic templates and standard export, always free.",
  },
  {
    q: "Can I cancel my Pro subscription anytime?",
    a: "Absolutely. Cancel from your account page in one click. You keep Pro access until the end of your billing period, then revert to Free.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit and debit cards via Paddle. Apple Pay and Google Pay are also supported.",
  },
  {
    q: "Does Pro remove the watermark on exports?",
    a: "Yes. All exports on the Pro plan are completely watermark-free at high resolution.",
  },
];

function CheckIcon({ dark }: { dark?: boolean }) {
  return (
    <span
      className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${dark ? "bg-white/20" : "bg-[#ECE7E2]"}`}
    >
      <svg
        className={`w-3 h-3 ${dark ? "text-white" : "text-[#252C25]"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

function UpgradeButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (status === "loading") return;
    if (!session) {
      signIn(undefined, { callbackUrl: "/upgrade" });
      return;
    }
    setLoading(true);
    router.push("/upgrade");
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || status === "loading"}
      className="w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] mb-8 bg-white text-[#252C25] hover:bg-[#F4F1ED] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {loading ? "Redirecting..." : "Upgrade to Pro — $5/month"}
    </button>
  );
}

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      id="pricing"
      className="scroll-anchor py-24 relative overflow-hidden bg-[#ECE7E2]"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="section-tag">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1F1C] leading-tight mb-4">
            Simple, honest <span className="text-[#AB6D48]">pricing</span>
          </h2>
          <p className="text-[#5A635A] text-lg max-w-lg mx-auto leading-relaxed">
            Free forever. Upgrade to Pro for just{" "}
            <span className="font-bold text-[#252C25]">$5/month</span> and
            unlock the full studio experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Free Plan */}
          <div className="glass-card rounded-2xl p-8 flex flex-col">
            <p className="text-xs font-bold uppercase tracking-widest text-[#5A635A] mb-2">
              Free
            </p>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-5xl font-extrabold tracking-tight text-[#1C1F1C]">
                $0
              </span>
            </div>
            <p className="text-sm text-[#5A635A] leading-relaxed mb-8">
              The full editor, basic templates, and standard export — always
              free.
            </p>
            <a
              href="/editor"
              className="w-full block text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] mb-8 bg-[#ECE7E2] border border-[#D9D3CC] text-[#252C25] hover:bg-[#D9D3CC]"
            >
              Start for free
            </a>
            <ul className="space-y-3 flex-1">
              {FREE_FEATURES.map((feat, j) => (
                <li key={j} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-[#5A635A]">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div
            className="rounded-2xl p-8 flex flex-col shadow-md relative"
            style={{ background: "#252C25" }}
          >
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md"
              style={{ background: "#AB6D48" }}
            >
              Most popular
            </span>
            <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Pro
            </p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-extrabold tracking-tight text-white">
                $5
              </span>
              <span className="text-sm font-medium mb-2 text-white/60">
                / month
              </span>
            </div>
            <p className="text-xs text-white/50 mb-2 font-medium">
              Cancel anytime · No contracts
            </p>
            <p className="text-sm text-white/70 leading-relaxed mb-8">
              Remove watermarks, unlock all templates, and export in high
              resolution.
            </p>
            <UpgradeButton />
            <ul className="space-y-3 flex-1">
              {PRO_FEATURES.map((feat, j) => (
                <li key={j} className="flex items-start gap-3">
                  <CheckIcon dark />
                  <span className="text-sm text-white/80">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-[#5A635A] mt-6 font-medium">
          Billed monthly · Cancel anytime · No hidden fees
        </p>

        {/* FAQ */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-[#1C1F1C] text-center mb-8">
            Frequently asked questions
          </h3>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-bold text-[#1C1F1C]">
                    {item.q}
                  </span>
                  <svg
                    className={`w-4 h-4 text-[#5A635A] transition-transform duration-200 flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-[#5A635A] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
