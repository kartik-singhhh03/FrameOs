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
      className="w-full block text-center py-3 rounded-2xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] mb-8 bg-white text-violet-700 hover:bg-violet-50 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {loading ? "Redirecting..." : "Upgrade to Pro — $5/month"}
    </button>
  );
}

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-200/25 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="section-tag">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-violet-950 leading-tight mb-4">
            Simple, honest <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-violet-500 text-lg max-w-lg mx-auto leading-relaxed">
            Free forever. Upgrade to Pro for just{" "}
            <span className="font-bold text-violet-700">$5/month</span> and
            unlock the full studio experience.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Free Plan */}
          <div className="glass-card rounded-3xl p-8 flex flex-col">
            <p className="text-sm font-bold uppercase tracking-widest text-violet-500 mb-2">Free</p>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-5xl font-extrabold tracking-tight text-violet-950">$0</span>
            </div>
            <p className="text-sm text-violet-500 leading-relaxed mb-8">
              The full editor, basic templates, and standard export — always free.
            </p>
            <a
              href="/editor"
              className="w-full block text-center py-3 rounded-2xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] mb-8 bg-violet-100 text-violet-700 hover:bg-violet-200"
            >
              Start for free
            </a>
            <ul className="space-y-3 flex-1">
              {FREE_FEATURES.map((feat, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 bg-violet-100">
                    <svg className="w-3 h-3 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-sm text-violet-600">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-8 flex flex-col shadow-2xl shadow-violet-400/30 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
              Most popular
            </span>
            <p className="text-sm font-bold uppercase tracking-widest text-violet-200 mb-2">Pro</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-extrabold tracking-tight text-white">$5</span>
              <span className="text-sm font-medium mb-2 text-violet-200">/ month</span>
            </div>
            <p className="text-xs text-violet-300 mb-2 font-medium">Cancel anytime · No contracts</p>
            <p className="text-sm text-violet-200 leading-relaxed mb-8">
              Remove watermarks, unlock all templates, and export in high resolution.
            </p>
            <UpgradeButton />
            <ul className="space-y-3 flex-1">
              {PRO_FEATURES.map((feat, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 bg-white/20">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-sm text-violet-100">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-violet-400 mt-6 font-medium">
          * Billed monthly · Cancel anytime · No hidden fees
        </p>

        {/* FAQ */}
        <div className="mt-16">
          <h3 className="text-2xl font-extrabold text-violet-950 text-center mb-8">
            Frequently asked questions
          </h3>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-bold text-violet-900">{item.q}</span>
                  <svg
                    className={`w-4 h-4 text-violet-500 transition-transform duration-200 flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-violet-500 leading-relaxed">{item.a}</p>
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
