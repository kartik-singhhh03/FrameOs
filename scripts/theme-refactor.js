const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");

function write(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trimStart(), "utf8");
  console.log("✓", rel);
}

// ─── globals.css ──────────────────────────────────────────────────────────────
write(
  "src/app/globals.css",
  `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand:       #252C25;
  --brand-hover: #1F261F;
  --bg:          #ECE7E2;
  --surface:     #F4F1ED;
  --border:      #D9D3CC;
  --text-1:      #1C1F1C;
  --text-2:      #5A635A;
  --accent-w:    #AB6D48;
  --accent-c:    #7EA0AE;
  --accent-l:    #4669B5;
}

* { box-sizing: border-box; padding: 0; margin: 0; }

html {
  scroll-behavior: smooth;
  overscroll-behavior-x: none;
}

html, body {
  max-width: 100vw;
  overflow-x: hidden;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #ECE7E2;
  color: #1C1F1C;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

button, [role="button"], [role="switch"], input[type="range"],
select, a, label[for] { min-height: 44px; }

.touch-compact { min-height: unset !important; }

input[type="range"] {
  min-height: 28px;
  width: 100%;
  accent-color: #252C25;
  cursor: pointer;
}

@media (pointer: coarse) {
  input[type="range"]::-webkit-slider-thumb { width: 22px; height: 22px; }
  input[type="range"]::-moz-range-thumb     { width: 22px; height: 22px; }
}

img, video, svg { max-width: 100%; height: auto; }

@layer utilities {
  .glass {
    background: rgba(244, 241, 237, 0.88);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid #D9D3CC;
  }

  .glass-card {
    background: #F4F1ED;
    border: 1px solid #D9D3CC;
    box-shadow: 0 2px 12px rgba(28, 31, 28, 0.06);
  }

  .text-gradient {
    background: linear-gradient(135deg, #252C25, #AB6D48);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #F4F1ED;
    border: 1px solid #D9D3CC;
    color: #5A635A;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.35rem 0.875rem;
    border-radius: 9999px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .btn-primary {
    background: #252C25;
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    transition: background 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
  }
  .btn-primary:hover { background: #1F261F; }

  .btn-ghost {
    background: white;
    color: #252C25;
    border: 1px solid #D9D3CC;
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .btn-ghost:hover { background: #F4F1ED; border-color: #252C25; }

  .pb-safe { padding-bottom: max(1.5rem, env(safe-area-inset-bottom)); }
  .pt-safe { padding-top:    max(0px,    env(safe-area-inset-top)); }
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track  { background: #ECE7E2; }
::-webkit-scrollbar-thumb  { background: #D9D3CC; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #252C25; }

/* Grid dot pattern */
.grid-pattern {
  background-image: radial-gradient(circle, rgba(37,44,37,0.05) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}
.animate-float { animation: float 5s ease-in-out infinite; }

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
.animate-pulse-slow { animation: pulse-slow 2.5s ease-in-out infinite; }
`,
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
write(
  "src/components/Navbar.tsx",
  `
"use client";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Creators", href: "#creators" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#252C25] flex items-center justify-center shadow-sm">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" />
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
              </svg>
            </span>
            <span className="font-bold text-lg text-[#1C1F1C] tracking-tight">FrameOS</span>
            <span className="hidden sm:inline-flex items-center bg-[#F4F1ED] border border-[#D9D3CC] text-[#5A635A] text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 tracking-wide">
              Now with Social Templates
            </span>
          </a>

          {/* Nav links – desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#5A635A] px-4 py-2 rounded-xl hover:bg-[#F4F1ED] hover:text-[#1C1F1C] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="text-sm font-semibold text-[#5A635A] hover:text-[#1C1F1C] transition-colors px-2"
            >
              Log in
            </a>
            <a
              href="#pricing"
              className="text-sm font-semibold text-[#252C25] border border-[#D9D3CC] hover:border-[#252C25] px-4 py-2 rounded-xl transition-all duration-200 hover:bg-[#F4F1ED]"
            >
              Upgrade — $5/mo
            </a>
            <a
              href="/editor"
              className="bg-[#252C25] text-white text-sm font-semibold py-2 px-5 rounded-xl hover:bg-[#1F261F] transition-all duration-200"
            >
              Start Creating
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-[#5A635A] p-2 rounded-xl hover:bg-[#F4F1ED] transition"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              {open ? (
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="glass mt-2 rounded-2xl px-6 py-4 flex flex-col gap-2 shadow-sm">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#5A635A] py-2 hover:text-[#1C1F1C] transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="border-t border-[#D9D3CC] pt-3 flex flex-col gap-2">
              <a href="#" className="text-sm font-semibold text-[#5A635A] py-2">Log in</a>
              <a href="#pricing" className="text-sm font-semibold text-[#252C25] py-2" onClick={() => setOpen(false)}>
                Upgrade — $5/month
              </a>
              <a href="/editor" className="bg-[#252C25] text-white text-sm font-semibold py-3 px-5 rounded-xl text-center">
                Start Creating
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
`,
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
write(
  "src/components/Hero.tsx",
  `
"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 bg-[#ECE7E2]">
      {/* Subtle warm glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
             style={{ background: "radial-gradient(ellipse, rgba(171,109,72,0.10) 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-[#D9D3CC] bg-[#F4F1ED] px-4 py-1.5 rounded-full text-xs font-semibold text-[#5A635A] tracking-wide mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#252C25] animate-pulse-slow" />
          FrameOS — The Creator Studio
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1F1C] mb-6 max-w-4xl mx-auto">
          Create{" "}
          <span className="text-[#AB6D48]">viral-ready posts</span>
          {" "}in seconds.
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-[#5A635A] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Design Mac-style frames, social post templates, and aesthetic
          screenshots — all in one powerful editor.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="/editor"
            className="bg-[#252C25] text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#1F261F] transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Creating — free
          </a>
          <a
            href="#pricing"
            className="border border-[#D9D3CC] bg-white text-[#1C1F1C] px-7 py-3.5 rounded-xl font-semibold text-sm hover:border-[#252C25] hover:bg-[#F4F1ED] transition-all duration-200 shadow-sm flex items-center gap-2"
          >
            <span className="text-xs bg-[#252C25] text-white px-2 py-0.5 rounded font-bold">PRO</span>
            Upgrade — $5/month
          </a>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
          <div className="flex -space-x-2">
            {["bg-[#252C25]","bg-[#AB6D48]","bg-[#7EA0AE]","bg-[#5A635A]","bg-[#4669B5]"].map((bg, i) => (
              <div key={i} className={\`w-8 h-8 rounded-full \${bg} border-2 border-[#ECE7E2] flex items-center justify-center text-white text-xs font-bold shadow-sm\`}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm text-[#5A635A] font-medium">
            <span className="font-semibold text-[#1C1F1C]">2,400+ creators</span> already designing with FrameOS
          </p>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-[#5A635A] font-medium ml-1.5">4.9 / 5</span>
          </div>
        </div>

        {/* Mockup Grid */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">

            {/* Mockup 1 — Mac Window Quote */}
            <div className="glass-card rounded-2xl overflow-hidden shadow-sm animate-float col-span-2 md:col-span-1">
              <div className="bg-[#ECE7E2] px-3 py-2 flex items-center gap-1.5 border-b border-[#D9D3CC]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="p-5 aspect-[4/3] flex items-center justify-center" style={{ background: "linear-gradient(135deg, #252C25, #3a4a3a)" }}>
                <div className="text-center">
                  <p className="text-white/50 text-[9px] font-medium uppercase tracking-widest mb-2">Daily Quote</p>
                  <p className="text-white text-xs font-semibold leading-snug">&ldquo;Design is how it works.&rdquo;</p>
                  <p className="text-white/50 text-[9px] mt-2">— Steve Jobs</p>
                </div>
              </div>
            </div>

            {/* Mockup 2 — Social Post */}
            <div className="glass-card rounded-2xl overflow-hidden shadow-sm col-span-2 animate-float" style={{ animationDelay: "0.3s" }}>
              <div style={{ background: "#1C1F1C" }} className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "#252C25" }}>K</div>
                  <div>
                    <p className="text-white text-xs font-semibold">@kartik_singhhh</p>
                    <p className="text-gray-400 text-[9px]">Indie Hacker · Founder</p>
                  </div>
                </div>
                <p className="text-gray-100 text-xs leading-relaxed">
                  Shipped a new feature in 2 hours using FrameOS. The auto-formatting alone saves me 30 mins per post.
                </p>
                <div className="flex items-center gap-4 mt-3 text-gray-500 text-[9px]">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    42
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    128
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    891
                  </span>
                </div>
              </div>
            </div>

            {/* Mockup 3 — Minimal Frame */}
            <div className="glass-card rounded-2xl overflow-hidden shadow-sm animate-float" style={{ animationDelay: "0.6s" }}>
              <div className="p-5 aspect-square flex items-center justify-center" style={{ background: "linear-gradient(135deg, #AB6D48, #7a4e33)" }}>
                <div className="text-center">
                  <p className="text-white/60 text-[9px] uppercase tracking-widest mb-2">Inspiration</p>
                  <p className="text-white text-xs font-bold leading-tight">Build things<br />people love.</p>
                  <div className="mt-3 h-px w-8 bg-white/30 mx-auto" />
                </div>
              </div>
            </div>

          </div>

          {/* Floating badge below */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass-card px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm whitespace-nowrap">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
            <span className="text-xs font-medium text-[#5A635A]">Live editor — no account needed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
);

// ─── Features ────────────────────────────────────────────────────────────────
write(
  "src/components/Features.tsx",
  `
const ICONS = [
  // Smart Auto Formatting
  <svg key={0} className="w-5 h-5 text-[#252C25]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h12M4 14h16M4 18h10" /></svg>,
  // Template Library
  <svg key={1} className="w-5 h-5 text-[#252C25]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>,
  // Social Post Templates
  <svg key={2} className="w-5 h-5 text-[#252C25]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>,
  // Scene Mode
  <svg key={3} className="w-5 h-5 text-[#252C25]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  // Word Emphasis
  <svg key={4} className="w-5 h-5 text-[#252C25]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  // Typography
  <svg key={5} className="w-5 h-5 text-[#252C25]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" /></svg>,
  // Backgrounds
  <svg key={6} className="w-5 h-5 text-[#252C25]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  // Export
  <svg key={7} className="w-5 h-5 text-[#252C25]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
];

const features = [
  { title: "Smart Auto Formatting",    desc: "Intelligent rule-based text layout that auto-sizes, balances lines, and picks the perfect line-height for every quote — instantly." },
  { title: "Beautiful Template Library", desc: "Mac window, minimal card, polaroid, glass frame, browser — choose from hand-crafted Frame templates built for pixel-perfect results." },
  { title: "Social Post Templates",    desc: "Export-ready templates for Twitter/X, LinkedIn, Instagram, Threads, Notion, and code snippets. Designed for virality." },
  { title: "Scene / Studio Mode",      desc: "Drop your design into realistic scenes — desktop, portrait, landscape, tablet — for polished launch screenshots." },
  { title: "Word Emphasis Styling",    desc: "Highlight key words with colour, underline, pill, or glow — auto-detected from your quote or manually selected." },
  { title: "Advanced Typography",      desc: "16 premium fonts, full weight control, letter-spacing, line-height, text transforms, and drop shadow fine-tuning." },
  { title: "Professional Backgrounds", desc: "Solid colours, gradient presets, custom hex, image upload with blur slider, noise texture, and grain overlay." },
  { title: "High-Resolution Export",   desc: "Export at 1x, 2x, or 4K quality. Pixel-perfect PNG output that matches the live preview exactly — watermark-free on Pro." },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative bg-[#ECE7E2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="section-tag">Features</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1F1C] leading-tight mb-4">
            Everything a creator{" "}
            <span className="text-[#AB6D48]">actually needs</span>
          </h2>
          <p className="text-[#5A635A] text-lg max-w-xl mx-auto leading-relaxed">
            No bloat. No complexity. Just the tools that make your content look
            stunning and spread fast.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ECE7E2] border border-[#D9D3CC] flex items-center justify-center mb-5 group-hover:bg-[#252C25] transition-colors duration-300">
                <div className="group-hover:[&_svg]:text-white transition-colors duration-300">
                  {ICONS[i]}
                </div>
              </div>
              <h3 className="text-sm font-bold text-[#1C1F1C] mb-2">{f.title}</h3>
              <p className="text-[#5A635A] text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-12 glass-card rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "10×",  label: "Faster than Canva" },
            { val: "20+",  label: "Ready-made templates" },
            { val: "4K",   label: "Export resolution" },
            { val: "4.9★", label: "Average user rating" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl font-extrabold text-[#252C25]">{stat.val}</p>
              <p className="text-sm text-[#5A635A] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
);

// ─── ForCreators ──────────────────────────────────────────────────────────────
write(
  "src/components/ForCreators.tsx",
  `
const audiences = [
  {
    title: "X / Twitter Creators",
    desc: "Make your threads stand out with viral-ready quote cards, branded visuals, and social post templates — in seconds.",
    bg: "#1C1F1C",
  },
  {
    title: "LinkedIn Founders",
    desc: "Elevate your founder posts with Mac-style frames and professional templates that command attention in the feed.",
    bg: "#252C25",
  },
  {
    title: "Indie Hackers",
    desc: "Ship beautiful launch screenshots, product mockups, and milestone posts — without a designer on your team.",
    bg: "#AB6D48",
  },
  {
    title: "Designers",
    desc: "A fast, beautiful tool for presenting your work. Export at 4K, drag-and-drop text, and layer scenes effortlessly.",
    bg: "#7EA0AE",
  },
];

const AUDIENCE_ICONS = [
  <svg key={0} className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  <svg key={1} className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  <svg key={2} className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key={3} className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
];

export default function ForCreators() {
  return (
    <section id="creators" className="py-24 relative overflow-hidden bg-[#ECE7E2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-tag">Designed for creators</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1F1C] leading-tight mb-4">
            Built for the people who{" "}
            <span className="text-[#AB6D48]">build in public</span>
          </h2>
          <p className="text-[#5A635A] text-lg max-w-xl mx-auto leading-relaxed">
            Whether you post daily or launch monthly — FrameOS makes every
            visual look intentional and premium.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map((a, i) => (
            <div
              key={i}
              style={{ background: a.bg }}
              className="rounded-2xl p-7 text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <div className="mb-4">{AUDIENCE_ICONS[i]}</div>
              <h3 className="text-base font-bold mb-3">{a.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/editor"
            className="bg-[#252C25] text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-[#1F261F] transition-all duration-200 shadow-sm hover:scale-[1.02]"
          >
            Open the free editor
          </a>
          <a
            href="#pricing"
            className="border border-[#D9D3CC] bg-white text-[#252C25] px-8 py-4 rounded-xl font-semibold text-sm hover:bg-[#F4F1ED] hover:border-[#252C25] transition-all duration-200 shadow-sm hover:scale-[1.02]"
          >
            See Pro features →
          </a>
        </div>
      </div>
    </section>
  );
}
`,
);

// ─── Testimonials ────────────────────────────────────────────────────────────
write(
  "src/components/Testimonials.tsx",
  `
const testimonials = [
  {
    name: "Aria Chen",
    role: "X Creator · 42K followers",
    avatar: "A",
    bg: "#252C25",
    text: "FrameOS completely changed how I make content. What used to take 40 minutes now takes under 5. The auto-formatting alone is worth the Pro upgrade.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    role: "Indie Hacker · LinkedIn Founder",
    avatar: "M",
    bg: "#4669B5",
    text: "I ship polished posts every single day now. The social templates are so good that people ask what designer I hired. It's just FrameOS.",
    stars: 5,
  },
  {
    name: "Sophie Laurent",
    role: "Content Creator · Instagram",
    avatar: "S",
    bg: "#AB6D48",
    text: "The emphasis styling feature is a game changer. I highlight key words in my posts and my engagement doubled. No exaggeration.",
    stars: 5,
  },
  {
    name: "Kai Orozco",
    role: "Founder, DeskMail · Product Hunt #1",
    avatar: "K",
    bg: "#7EA0AE",
    text: "Launched 3 products with FrameOS screenshots. The Mac window template + scene mode makes everything look premium instantly.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "Designer · Building in public",
    avatar: "P",
    bg: "#5A635A",
    text: "The background system is insane. Gradients, image upload, blur slider, grain overlay — this rivals tools that cost 10× more.",
    stars: 5,
  },
  {
    name: "Tom Ellison",
    role: "X / Twitter Growth Builder",
    avatar: "T",
    bg: "#1C1F1C",
    text: "Every thread I write now has a FrameOS visual. Impressions are up 3× since I started. The drag-to-reposition feature is so satisfying.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#ECE7E2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left */}
          <div>
            <span className="section-tag">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1F1C] leading-tight">
              Loved by designers{" "}
              <span className="text-[#AB6D48]">&amp; teams</span>
            </h2>
          </div>
          {/* Right — featured quote */}
          <div className="flex items-center">
            <div className="glass-card rounded-2xl p-6 w-full">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm font-bold text-[#252C25] ml-1">4.9 out of 5</span>
              </div>
              <p className="text-[#1C1F1C] text-sm leading-relaxed font-medium">
                "Before FrameOS, juggling different tools to manage clients,
                tasks, and imagery was chaos. Now it&apos;s all in one place. We ship
                campaigns faster than ever before."
              </p>
              <p className="text-[#5A635A] text-xs mt-3 font-semibold">
                — Lena Iglesias, Brand Manager at Rosé
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial masonry grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 break-inside-avoid hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <svg key={j} className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#1C1F1C] text-sm leading-relaxed mb-5">{t.text}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: t.bg }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1C1F1C]">{t.name}</p>
                  <p className="text-xs text-[#5A635A] font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
);

// ─── CTA ─────────────────────────────────────────────────────────────────────
write(
  "src/components/CTA.tsx",
  `
export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#ECE7E2]">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden" style={{ background: "#252C25" }}>
          {/* Subtle mesh */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(171,109,72,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(126,160,174,0.4) 0%, transparent 50%)",
            }}
          />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative px-8 py-20 md:px-20 md:py-28 text-center">
            <p className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-white/80 uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-slow" />
              Start creating today
            </p>

            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl mx-auto mb-6">
              Create something{" "}
              <span style={{ color: "#AB6D48" }}>beautiful. Right now.</span>
            </h2>

            <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12">
              Free forever. Upgrade to Pro for $5/month and get watermark-free
              exports, all templates, and 4K quality.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
              <a
                href="/editor"
                className="bg-white text-[#252C25] px-8 py-4 rounded-xl font-semibold text-sm hover:bg-[#F4F1ED] transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Creating — free
              </a>
              <a
                href="#pricing"
                className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all duration-200 hover:scale-[1.02] flex items-center gap-2"
              >
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-bold">$5</span>
                Upgrade to Pro
              </a>
            </div>

            {/* Type chips */}
            <div className="flex justify-center gap-3 flex-wrap mb-12">
              {["Quote Frames", "Announcement Posts", "Product Showcases"].map((label, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/15 rounded-xl px-6 py-3 text-white/80 text-sm font-medium shadow-sm hover:bg-white/15 transition-colors cursor-default"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Browser mockup */}
            <div className="bg-white/8 border border-white/15 rounded-2xl overflow-hidden max-w-4xl mx-auto shadow-2xl">
              <div className="bg-white/10 px-4 py-2.5 flex items-center gap-2 border-b border-white/10">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                </div>
                <div className="flex-1 max-w-xs mx-auto bg-white/10 rounded-md px-3 py-0.5 text-xs text-white/40 text-center">
                  app.frameos.design/studio
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-6">
                {[
                  { bg: "linear-gradient(135deg, #252C25, #3a4a3a)" },
                  { bg: "linear-gradient(135deg, #AB6D48, #7a4e33)" },
                  { bg: "linear-gradient(135deg, #7EA0AE, #4d7a8a)" },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="rounded-xl aspect-video flex items-center justify-center shadow-lg"
                    style={{ background: card.bg }}
                  >
                    <div className="text-center px-4">
                      <p className="text-white/50 text-[10px] uppercase font-bold tracking-wider mb-1">Frame {i + 1}</p>
                      <p className="text-white font-semibold text-sm">Beautiful design in seconds</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
);

// ─── Footer ───────────────────────────────────────────────────────────────────
write(
  "src/components/Footer.tsx",
  `
const footerLinks = {
  Product:   ["Features", "Templates", "Changelog", "Roadmap", "Status"],
  Company:   ["About", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Docs", "API Reference", "Community", "Tutorials", "Showcase"],
  Legal:     ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

const socials = [
  {
    name: "X / Twitter",
    href: "https://x.com/kartik_singhhh",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/kartik-singh-879b6b288/",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[#D9D3CC]" style={{ background: "#F4F1ED" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-xl bg-[#252C25] flex items-center justify-center shadow-sm">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" />
                  <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
                  <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
                  <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
                </svg>
              </span>
              <span className="font-bold text-xl text-[#1C1F1C] tracking-tight">FrameOS</span>
            </a>
            <p className="text-sm text-[#5A635A] leading-relaxed max-w-xs">
              A premium design studio built for creators, indie hackers, and
              founders who care about quality.
            </p>
            <p className="text-xs text-[#5A635A] mt-3">
              Built by{" "}
              <a href="https://www.linkedin.com/in/kartik-singh-879b6b288/" target="_blank" rel="noopener noreferrer" className="text-[#252C25] font-semibold hover:underline">Kartik Singh</a>
              {" "}&middot;{" "}
              <a href="https://x.com/kartik_singhhh" target="_blank" rel="noopener noreferrer" className="text-[#252C25] font-semibold hover:underline">@kartik_singhhh</a>
            </p>
            <div className="flex items-center gap-2.5 mt-5">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-xl border border-[#D9D3CC] bg-white flex items-center justify-center text-[#5A635A] hover:text-[#1C1F1C] hover:border-[#252C25] transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-xs font-bold text-[#1C1F1C] uppercase tracking-widest mb-4">{heading}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#5A635A] hover:text-[#1C1F1C] font-medium transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[#D9D3CC] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#5A635A] font-medium">
            &copy; {new Date().getFullYear()} FrameOS by{" "}
            <a href="https://www.linkedin.com/in/kartik-singh-879b6b288/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1C1F1C] transition-colors">
              Kartik Singh
            </a>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow" />
            <span className="text-xs text-[#5A635A] font-medium">All systems operational</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-[#5A635A] hover:text-[#1C1F1C] transition font-medium">Privacy</a>
            <a href="#" className="text-sm text-[#5A635A] hover:text-[#1C1F1C] transition font-medium">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
`,
);

// ─── Pricing ─────────────────────────────────────────────────────────────────
write(
  "src/components/Pricing.tsx",
  `
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
    <span className={\`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 \${dark ? "bg-white/20" : "bg-[#ECE7E2]"}\`}>
      <svg className={\`w-3 h-3 \${dark ? "text-white" : "text-[#252C25]"}\`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
    if (!session) { signIn(undefined, { callbackUrl: "/upgrade" }); return; }
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
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#ECE7E2]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="section-tag">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1F1C] leading-tight mb-4">
            Simple, honest{" "}
            <span className="text-[#AB6D48]">pricing</span>
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#5A635A] mb-2">Free</p>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-5xl font-extrabold tracking-tight text-[#1C1F1C]">$0</span>
            </div>
            <p className="text-sm text-[#5A635A] leading-relaxed mb-8">
              The full editor, basic templates, and standard export — always free.
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
          <div className="rounded-2xl p-8 flex flex-col shadow-md relative" style={{ background: "#252C25" }}>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md" style={{ background: "#AB6D48" }}>
              Most popular
            </span>
            <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Pro</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-extrabold tracking-tight text-white">$5</span>
              <span className="text-sm font-medium mb-2 text-white/60">/ month</span>
            </div>
            <p className="text-xs text-white/50 mb-2 font-medium">Cancel anytime · No contracts</p>
            <p className="text-sm text-white/70 leading-relaxed mb-8">
              Remove watermarks, unlock all templates, and export in high resolution.
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
                  <span className="text-sm font-bold text-[#1C1F1C]">{item.q}</span>
                  <svg
                    className={\`w-4 h-4 text-[#5A635A] transition-transform duration-200 flex-shrink-0 ml-4 \${openFaq === i ? "rotate-180" : ""}\`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-[#5A635A] leading-relaxed">{item.a}</p>
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
`,
);

// ─── upgrade/page.tsx ─────────────────────────────────────────────────────────
write(
  "src/app/upgrade/page.tsx",
  `
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import PaddleCheckoutButton from "@/components/PaddleCheckoutButton";

export default function UpgradePage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(undefined, { callbackUrl: "/upgrade" });
    }
  }, [status]);

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#ECE7E2]">
        <div className="w-8 h-8 rounded-full border-4 border-[#D9D3CC] border-t-[#252C25] animate-spin" />
      </main>
    );
  }

  if (!session) return null;

  return (
    <main className="min-h-screen bg-[#ECE7E2] px-4 pt-20 pb-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-[#252C25] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M3 9h18" />
              </svg>
            </div>
            <span className="text-base font-black text-[#1C1F1C] tracking-tight">FrameOS</span>
          </Link>

          {/* User info */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {session.user?.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={session.user.image} alt={session.user.name ?? "User"} className="w-10 h-10 rounded-full border-2 border-[#D9D3CC]" />
            )}
            <div className="text-left">
              <p className="text-sm font-bold text-[#1C1F1C]">{session.user?.name}</p>
              <p className="text-xs text-[#5A635A]">{session.user?.email}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="ml-2 text-[11px] text-[#5A635A] hover:text-[#1C1F1C] transition-colors underline"
            >
              Sign out
            </button>
          </div>

          <h1 className="text-4xl font-extrabold text-[#1C1F1C] mb-3">
            Upgrade to{" "}
            <span style={{ color: "#AB6D48" }}>Pro</span>
          </h1>
          <p className="text-[#5A635A] text-base">
            Everything you need to create viral-ready posts.
          </p>
        </div>

        {/* Pricing card */}
        <div className="glass-card rounded-2xl p-8 mb-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-xs font-bold text-[#5A635A] uppercase tracking-wider mb-1">Pro Plan</div>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black text-[#1C1F1C]">$5</span>
                <span className="text-[#5A635A] mb-1.5">/month</span>
              </div>
              <p className="text-xs text-[#5A635A] mt-1">Cancel anytime · No commitment</p>
            </div>
            <div className="bg-[#252C25] text-white text-xs font-bold px-3 py-1.5 rounded-full">
              Most Popular
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {[
              "No watermark on exports",
              "4K ultra-high-resolution export",
              "2× high-resolution export",
              "All social post templates",
              "Scene Mode (iPhone, MacBook, Web)",
              "Priority support",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-[#1C1F1C]">
                <svg className="w-4 h-4 text-[#252C25] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <PaddleCheckoutButton />
          <p className="text-center text-[11px] text-[#5A635A] mt-3">
            Secure checkout · Cancel anytime from your account
          </p>
        </div>

        <p className="text-center text-sm text-[#5A635A]">
          Want to try first?{" "}
          <Link href="/editor" className="text-[#252C25] font-semibold hover:underline">
            Open the free editor
          </Link>
        </p>
      </div>
    </main>
  );
}
`,
);

// ─── auth/signin/page.tsx ─────────────────────────────────────────────────────
write(
  "src/app/auth/signin/page.tsx",
  `
"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/upgrade";

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#ECE7E2] px-4">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl p-10 text-center">
          {/* Logo */}
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#252C25] flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M3 9h18" />
              </svg>
            </div>
            <span className="text-lg font-black text-[#1C1F1C] tracking-tight">FrameOS</span>
          </div>

          <h1 className="text-2xl font-extrabold text-[#1C1F1C] mb-2">Sign in to continue</h1>
          <p className="text-sm text-[#5A635A] mb-8 leading-relaxed">
            Sign in to unlock Pro features — watermark-free exports, 4K quality,
            and all templates.
          </p>

          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 bg-white border border-[#D9D3CC] hover:border-[#252C25] hover:bg-[#F4F1ED] text-[#1C1F1C] font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-[11px] text-[#5A635A] mt-6">
            Free editor works without login. No credit card required.
          </p>
        </div>
      </div>
    </main>
  );
}
`,
);

console.log("\\nAll files written successfully.");
