"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Template Demo Data ───────────────────────────────────────────────────────
// Each card has enough info to render a static visual demo in pure CSS/JSX.

type Category = "all" | "frames" | "social";

interface TemplateCard {
  id: string;
  name: string;
  desc: string;
  category: "frames" | "social";
  icon: string;
  isPro: boolean;
  demo: React.FC;
}

// ── Demo components ─────────────────────────────────────────────────────────

const QUOTE =
  "Build something people want — not something you think they want.";
const AUTHOR = "— Paul Graham";

function DemoMacWindow() {
  return (
    <div
      className="rounded-xl overflow-hidden shadow-lg border border-[#D9D3CC] w-full max-w-xs mx-auto"
      style={{ fontFamily: "system-ui" }}
    >
      <div className="bg-[#e8e8e8] px-3 py-2 flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="flex-1 mx-2 bg-white/80 rounded text-[9px] text-gray-400 text-center py-0.5 px-2">
          quoter.app
        </span>
      </div>
      <div className="bg-gradient-to-br from-[#252C25] to-[#AB6D48] p-6 text-white text-center">
        <p className="text-sm font-semibold leading-relaxed">"{QUOTE}"</p>
        <p className="text-xs opacity-70 mt-2">{AUTHOR}</p>
      </div>
    </div>
  );
}

function DemoMinimalGlass() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          background: "rgba(244,241,237,0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 8px 32px rgba(37,44,37,0.12)",
        }}
      >
        <p className="text-sm text-[#1C1F1C] font-semibold leading-relaxed">
          "{QUOTE}"
        </p>
        <p className="text-xs text-[#5A635A] mt-2">{AUTHOR}</p>
      </div>
    </div>
  );
}

function DemoBrowser() {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-[#D9D3CC] w-full max-w-xs mx-auto">
      <div className="bg-[#f0f0f0] px-3 py-1.5 flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="flex-1 mx-2 bg-white rounded text-[9px] text-gray-400 text-center py-0.5 flex items-center justify-center gap-1">
          <svg
            className="w-2.5 h-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          frameos.design
        </div>
      </div>
      <div className="bg-white p-6 text-center">
        <p className="text-sm text-[#1C1F1C] font-semibold leading-relaxed">
          "{QUOTE}"
        </p>
        <p className="text-xs text-[#5A635A] mt-2">{AUTHOR}</p>
      </div>
    </div>
  );
}

function DemoPolaroid() {
  return (
    <div
      className="w-full max-w-xs mx-auto flex justify-center"
      style={{ transform: "rotate(-2deg)" }}
    >
      <div
        className="bg-white shadow-xl p-3 pb-8 inline-block"
        style={{ boxShadow: "3px 3px 16px rgba(0,0,0,0.18)" }}
      >
        <div className="bg-gradient-to-br from-[#252C25] to-[#7EA0AE] w-48 h-32 flex items-center justify-center p-3">
          <p className="text-white text-xs font-medium text-center leading-relaxed">
            "{QUOTE}"
          </p>
        </div>
        <p className="text-center text-[11px] text-[#5A635A] mt-3 font-handwriting">
          {AUTHOR}
        </p>
      </div>
    </div>
  );
}

function DemoCleanCard() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E5E7EB]">
        <div className="h-1 bg-gradient-to-r from-[#252C25] to-[#AB6D48]" />
        <div className="p-6 text-center">
          <p className="text-sm text-[#1C1F1C] font-semibold leading-relaxed">
            "{QUOTE}"
          </p>
          <p className="text-xs text-[#5A635A] mt-3">{AUTHOR}</p>
        </div>
      </div>
    </div>
  );
}

function DemoCrumpledPaper() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div
        className="rounded-lg p-6 text-center"
        style={{
          background: "#F5F0E8",
          boxShadow:
            "inset 1px 1px 4px rgba(0,0,0,0.08), 2px 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 8px)",
          }}
        />
        <p className="text-sm text-[#2D2416] font-medium leading-relaxed italic relative">
          "{QUOTE}"
        </p>
        <p className="text-xs text-[#6B5538] mt-2 relative">{AUTHOR}</p>
      </div>
    </div>
  );
}

function DemoTornNotebook() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div
        className="bg-[#FFFEF5] border border-[#E8E4D0] rounded overflow-hidden shadow-sm relative"
        style={{ paddingLeft: 28 }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-7 border-r border-[#E8C0C0] bg-[#FDEAEA] flex flex-col items-center gap-2 pt-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-[#D9D3CC]" />
          ))}
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border-b border-[#BDE0F0] opacity-40 h-6" />
        ))}
        <div className="p-3 -mt-24">
          <p className="text-xs text-[#2D2416] font-medium leading-relaxed relative z-10">
            "{QUOTE}"
          </p>
          <p className="text-[10px] text-[#6B5538] mt-1.5 relative z-10">
            {AUTHOR}
          </p>
        </div>
      </div>
    </div>
  );
}

function DemoGalleryFrame() {
  return (
    <div className="w-full max-w-xs mx-auto flex justify-center">
      <div
        className="relative p-3"
        style={{
          background:
            "linear-gradient(135deg, #C8A84B, #8B6914, #C8A84B, #B8921A)",
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <div className="bg-[#F0E8D0] p-4 text-center" style={{ minWidth: 160 }}>
          <p className="text-[11px] text-[#2D2416] font-serif leading-relaxed italic">
            "{QUOTE}"
          </p>
          <p className="text-[10px] text-[#6B5538] mt-2 font-serif">{AUTHOR}</p>
        </div>
      </div>
    </div>
  );
}

function DemoTypewriter() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div
        className="bg-[#F5EDD8] border border-[#D4C5A0] p-4 relative"
        style={{
          fontFamily: "'Courier New', monospace",
          boxShadow: "2px 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div className="border-b-2 border-[#2D2416] pb-1 mb-3">
          <p className="text-[10px] text-[#5A4A2A] font-bold tracking-widest uppercase">
            FrameOS Writings
          </p>
        </div>
        <p className="text-xs text-[#2D2416] leading-relaxed">"{QUOTE}"</p>
        <p className="text-[10px] text-[#6B5538] mt-2">{AUTHOR}</p>
        <div className="mt-3 border-t border-dashed border-[#C4A46B] pt-2">
          <p className="text-[9px] text-[#9A8665] tracking-wider">
            --- printed ---
          </p>
        </div>
      </div>
    </div>
  );
}

function DemoNewspaper() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div
        className="bg-[#F0EAD6] border border-[#D4C5A0] p-4"
        style={{ fontFamily: "Georgia, serif" }}
      >
        <div className="border-b-2 border-[#1C1F1C] pb-1 mb-2 text-center">
          <p className="text-[11px] font-black tracking-widest uppercase">
            The Daily Quote
          </p>
        </div>
        <div className="border-b border-[#1C1F1C] mb-2" />
        <p className="text-[11px] text-[#2D2416] leading-relaxed font-bold italic">
          "{QUOTE}"
        </p>
        <p className="text-[10px] text-[#6B5538] mt-1.5 text-right">{AUTHOR}</p>
      </div>
    </div>
  );
}

function DemoShadowDesk() {
  return (
    <div
      className="w-full max-w-xs mx-auto"
      style={{ background: "#6B5C4A", borderRadius: 8, padding: 16 }}
    >
      <div
        className="bg-white rounded-lg p-5 text-center"
        style={{
          boxShadow:
            "4px 8px 24px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.15)",
        }}
      >
        <p className="text-xs text-[#1C1F1C] font-semibold leading-relaxed">
          "{QUOTE}"
        </p>
        <p className="text-[10px] text-[#5A635A] mt-2">{AUTHOR}</p>
      </div>
    </div>
  );
}

function DemoTwitter() {
  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-[#252C25] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          KS
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-bold text-[#1C1F1C]">
              Kartik Singh
            </span>
            <svg
              className="w-3.5 h-3.5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[10px] text-[#5A635A]">@kartik · 2h</span>
          </div>
          <p className="text-xs text-[#1C1F1C] leading-relaxed">"{QUOTE}"</p>
          <div className="flex items-center gap-4 mt-2.5">
            {["💬 12", "🔁 34", "❤️ 1.2k"].map((x) => (
              <span key={x} className="text-[10px] text-[#5A635A]">
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoLinkedIn() {
  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
      <div className="flex items-start gap-2.5 mb-3">
        <div className="w-9 h-9 rounded-full bg-[#0077b5] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          KS
        </div>
        <div>
          <p className="text-xs font-bold text-[#1C1F1C]">Kartik Singh</p>
          <p className="text-[10px] text-[#5A635A]">
            Builder · 1,200 followers
          </p>
          <p className="text-[9px] text-[#5A635A]">2h · 🌐</p>
        </div>
      </div>
      <p className="text-xs text-[#1C1F1C] leading-relaxed mb-3">
        "{QUOTE}" {AUTHOR}
      </p>
      <div className="border-t border-[#E5E7EB] pt-2 flex items-center gap-4">
        {["👍 Like", "💬 Comment", "🔁 Share"].map((x) => (
          <span key={x} className="text-[10px] text-[#5A635A] font-medium">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function DemoInstagram() {
  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 p-3">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
          }}
        >
          KS
        </div>
        <span className="text-[11px] font-bold text-[#1C1F1C]">
          kartik.builds
        </span>
      </div>
      <div className="bg-gradient-to-br from-[#252C25] to-[#7EA0AE] px-4 py-6 text-center">
        <p className="text-white text-[11px] font-semibold leading-relaxed">
          "{QUOTE}"
        </p>
        <p className="text-white/70 text-[10px] mt-1.5">{AUTHOR}</p>
      </div>
      <div className="p-2 flex items-center gap-3">
        {["❤️", "💬", "📤"].map((x) => (
          <span key={x} className="text-base">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function DemoThreads() {
  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-sm">
      <div className="flex gap-2.5">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-[#252C25] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
            K
          </div>
          <div className="w-px flex-1 bg-[#E5E7EB] min-h-[32px]" />
          <div className="w-5 h-5 rounded-full bg-[#F4F1ED] border border-[#E5E7EB]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-[#1C1F1C] mb-0.5">
            kartik.builds
          </p>
          <p className="text-xs text-[#1C1F1C] leading-relaxed">"{QUOTE}"</p>
          <p className="text-[10px] text-[#5A635A] mt-2">2h ago · ❤️ 89</p>
        </div>
      </div>
    </div>
  );
}

function DemoNotion() {
  return (
    <div
      className="w-full max-w-xs mx-auto bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm"
      style={{ fontFamily: "sans-serif" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">📄</span>
        <span className="text-xs font-bold text-[#1C1F1C]">My Quotes</span>
      </div>
      <div className="border-l-4 border-[#AB6D48] bg-[#FFF8F4] p-3 rounded">
        <p className="text-[11px] text-[#2D2416] leading-relaxed font-medium">
          "{QUOTE}"
        </p>
        <p className="text-[10px] text-[#AB6D48] mt-1.5">{AUTHOR}</p>
      </div>
    </div>
  );
}

function DemoCode() {
  return (
    <div className="w-full max-w-xs mx-auto rounded-xl overflow-hidden border border-[#1E1E3A] shadow-lg">
      <div className="bg-[#13131F] px-3 py-2 flex items-center gap-1.5">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span
            key={c}
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: c }}
          />
        ))}
        <span className="text-[9px] text-[#6C6EAF] ml-2">quote.ts</span>
      </div>
      <div className="bg-[#1E1E2E] p-4">
        <p
          className="text-[10px] leading-relaxed"
          style={{ fontFamily: "'Courier New', monospace", color: "#C792EA" }}
        >
          {"const quote = `"}
        </p>
        <p
          className="text-[10px] leading-relaxed ml-4"
          style={{ fontFamily: "'Courier New', monospace", color: "#A6E22E" }}
        >
          {QUOTE}
        </p>
        <p
          className="text-[10px] leading-relaxed"
          style={{ fontFamily: "'Courier New', monospace", color: "#C792EA" }}
        >
          {"`;"}
        </p>
        <div className="mt-2 h-1 bg-[#6C6EF2] rounded" />
      </div>
    </div>
  );
}

// ── Template catalog ─────────────────────────────────────────────────────────

const TEMPLATE_CARDS: TemplateCard[] = [
  {
    id: "mac-window",
    name: "Mac Window",
    desc: "macOS-style frosted glass chrome",
    category: "frames",
    icon: "🖥",
    isPro: false,
    demo: DemoMacWindow,
  },
  {
    id: "minimal-glass",
    name: "Minimal Glass",
    desc: "Clean frosted glass card, zero distractions",
    category: "frames",
    icon: "✦",
    isPro: false,
    demo: DemoMinimalGlass,
  },
  {
    id: "browser-window",
    name: "Browser",
    desc: "Realistic browser window with address bar",
    category: "frames",
    icon: "🌐",
    isPro: false,
    demo: DemoBrowser,
  },
  {
    id: "polaroid",
    name: "Polaroid",
    desc: "Instant-photo frame with caption",
    category: "frames",
    icon: "📷",
    isPro: false,
    demo: DemoPolaroid,
  },
  {
    id: "clean-card",
    name: "Clean Card",
    desc: "Minimal white card with accent stripe",
    category: "frames",
    icon: "🃏",
    isPro: false,
    demo: DemoCleanCard,
  },
  {
    id: "crumpled-paper",
    name: "Crumpled Paper",
    desc: "Tactile paper canvas with crease texture",
    category: "frames",
    icon: "📄",
    isPro: true,
    demo: DemoCrumpledPaper,
  },
  {
    id: "torn-notebook",
    name: "Torn Notebook",
    desc: "Ruled notepad with spiral binding",
    category: "frames",
    icon: "📓",
    isPro: true,
    demo: DemoTornNotebook,
  },
  {
    id: "gallery-frame",
    name: "Gallery Frame",
    desc: "Ornate gold frame with linen mat",
    category: "frames",
    icon: "🖼",
    isPro: true,
    demo: DemoGalleryFrame,
  },
  {
    id: "typewriter",
    name: "Typewriter",
    desc: "Aged typewriter paper aesthetic",
    category: "frames",
    icon: "⌨",
    isPro: true,
    demo: DemoTypewriter,
  },
  {
    id: "newspaper",
    name: "Newspaper",
    desc: "Editorial newsprint serif layout",
    category: "frames",
    icon: "📰",
    isPro: true,
    demo: DemoNewspaper,
  },
  {
    id: "shadow-desk",
    name: "Shadow Desk",
    desc: "Paper card with depth on textured desk",
    category: "frames",
    icon: "🗂",
    isPro: true,
    demo: DemoShadowDesk,
  },
  {
    id: "twitter-post",
    name: "Twitter / X",
    desc: "Tweet-style post with engagement row",
    category: "social",
    icon: "𝕏",
    isPro: false,
    demo: DemoTwitter,
  },
  {
    id: "linkedin-post",
    name: "LinkedIn",
    desc: "Professional post with reactions",
    category: "social",
    icon: "in",
    isPro: false,
    demo: DemoLinkedIn,
  },
  {
    id: "instagram-post",
    name: "Instagram",
    desc: "Instagram post with gradient-ring avatar",
    category: "social",
    icon: "◎",
    isPro: true,
    demo: DemoInstagram,
  },
  {
    id: "threads-post",
    name: "Threads",
    desc: "Short-form threaded post",
    category: "social",
    icon: "ꝏ",
    isPro: true,
    demo: DemoThreads,
  },
  {
    id: "notion-page",
    name: "Notion",
    desc: "Notion callout block embed",
    category: "social",
    icon: "N",
    isPro: true,
    demo: DemoNotion,
  },
  {
    id: "code-snippet",
    name: "Code Snippet",
    desc: "VS Code–style editor window",
    category: "social",
    icon: "</>",
    isPro: true,
    demo: DemoCode,
  },
];

const CATEGORIES: { id: Category; label: string; count: number }[] = [
  { id: "all", label: "All Templates", count: TEMPLATE_CARDS.length },
  {
    id: "frames",
    label: "Frames",
    count: TEMPLATE_CARDS.filter((t) => t.category === "frames").length,
  },
  {
    id: "social",
    label: "Social Posts",
    count: TEMPLATE_CARDS.filter((t) => t.category === "social").length,
  },
];

// ── Page component ────────────────────────────────────────────────────────────

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? TEMPLATE_CARDS
      : TEMPLATE_CARDS.filter((t) => t.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#ECE7E2]">
        {/* ── Hero ── */}
        <section className="pt-36 pb-16 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="section-tag">17 templates</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C1F1C] mt-4 mb-4 leading-tight tracking-tight">
              Every template you need to{" "}
              <span className="text-gradient">go viral</span>
            </h1>
            <p className="text-[#5A635A] text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Pick any template, type your quote, and download a pixel-perfect
              image in seconds. No design skills needed.
            </p>
            <a
              href="/editor"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base shadow-sm hover:scale-[1.02] transition-all"
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
                  d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
                />
              </svg>
              Open Free Editor
            </a>
          </div>
        </section>

        {/* ── Category tabs ── */}
        <section className="px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{ minHeight: "unset" }}
                  className={[
                    "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border",
                    activeCategory === cat.id
                      ? "bg-[#252C25] text-white border-[#252C25] shadow-sm"
                      : "bg-[#F4F1ED] text-[#5A635A] border-[#D9D3CC] hover:border-[#252C25] hover:text-[#1C1F1C]",
                  ].join(" ")}
                >
                  {cat.label}
                  <span
                    className={[
                      "ml-2 text-xs font-bold px-1.5 py-0.5 rounded-full",
                      activeCategory === cat.id
                        ? "bg-white/20 text-white"
                        : "bg-[#ECE7E2] text-[#5A635A]",
                    ].join(" ")}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Template grid ── */}
        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((tmpl) => {
                const Demo = tmpl.demo;
                return (
                  <div
                    key={tmpl.id}
                    className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Demo preview */}
                    <div className="bg-[#ECE7E2] p-5 min-h-[180px] flex items-center justify-center relative overflow-hidden">
                      {/* Subtle dot grid */}
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle, rgba(37,44,37,0.12) 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                      <div className="relative w-full">
                        <Demo />
                      </div>
                    </div>

                    {/* Card info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg leading-none">
                            {tmpl.icon}
                          </span>
                          <h3 className="text-sm font-bold text-[#1C1F1C]">
                            {tmpl.name}
                          </h3>
                        </div>
                        {tmpl.isPro && (
                          <span className="flex-shrink-0 bg-[#AB6D48]/10 text-[#AB6D48] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#AB6D48]/20 uppercase tracking-wide">
                            Pro
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5A635A] leading-relaxed mb-3">
                        {tmpl.desc}
                      </p>
                      <a
                        href={`/editor?template=${tmpl.id}`}
                        style={{ minHeight: "unset" }}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-[#252C25] text-white hover:bg-[#1F261F] transition-colors group-hover:shadow-sm"
                      >
                        Use this template
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Pro CTA banner ── */}
            <div className="mt-16 bg-[#252C25] rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden relative">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                  Pro Plan — $5/month
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                  Unlock all{" "}
                  <span style={{ color: "#AB6D48" }}>Pro templates</span>
                </h2>
                <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
                  Get access to all 12 premium templates, watermark-free 4K
                  exports, Scene Mode, and advanced typography tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="/upgrade"
                    style={{ minHeight: "unset" }}
                    className="bg-[#AB6D48] hover:bg-[#9A5F3A] text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-[1.02] shadow-sm"
                  >
                    Upgrade to Pro — $5/month
                  </a>
                  <a
                    href="/editor"
                    style={{ minHeight: "unset" }}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-xl transition-all border border-white/20"
                  >
                    Try free editor first
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
