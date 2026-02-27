"use client";

// Sparkle positions: [top%, left%, size, delay, duration]
const SPARKLES: [number, number, number, number, number][] = [
  [8, 12, 4, 0, 3.2],
  [14, 82, 3, 0.6, 2.8],
  [22, 55, 5, 1.2, 3.6],
  [5, 38, 3, 0.3, 2.5],
  [30, 90, 4, 0.9, 3.0],
  [18, 68, 3, 1.8, 2.7],
  [38, 20, 5, 0.5, 3.4],
  [46, 72, 3, 1.4, 2.9],
  [55, 8, 4, 0.2, 3.1],
  [62, 48, 3, 1.0, 2.6],
  [70, 85, 5, 1.6, 3.3],
  [75, 28, 4, 0.7, 2.8],
  [82, 60, 3, 1.9, 3.5],
  [88, 15, 4, 0.4, 3.0],
  [92, 75, 3, 1.1, 2.7],
  [12, 95, 4, 1.5, 3.2],
  [50, 30, 3, 0.8, 2.9],
  [35, 62, 4, 1.3, 3.6],
  [60, 18, 3, 0.1, 2.5],
  [78, 43, 5, 1.7, 3.1],
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 bg-[#ECE7E2]">
      {/* ── Background canvas ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm top glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(171,109,72,0.13) 0%, transparent 68%)",
          }}
        />

        {/* Cool bottom-right accent */}
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(126,160,174,0.10) 0%, transparent 65%)",
          }}
        />

        {/* Left-side earth accent */}
        <div
          className="absolute top-1/3 -left-24 w-[300px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(37,44,37,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(37,44,37,0.18) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Sparkles */}
        {SPARKLES.map(([top, left, size, delay, dur], i) => (
          <svg
            key={i}
            className="absolute"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size * 4,
              height: size * 4,
              animation: `sparkle ${dur}s ease-in-out ${delay}s infinite`,
              opacity: 0,
            }}
            viewBox="0 0 16 16"
            fill="none"
          >
            {/* 4-point star sparkle */}
            <path
              d="M8 1 L8.9 6.9 L14.9 8 L8.9 9.1 L8 15 L7.1 9.1 L1.1 8 L7.1 6.9 Z"
              fill={
                i % 3 === 0 ? "#AB6D48" : i % 3 === 1 ? "#252C25" : "#7EA0AE"
              }
              fillOpacity="0.5"
            />
          </svg>
        ))}

        {/* Floating rings */}
        <div
          className="absolute top-[15%] right-[8%] w-24 h-24 rounded-full border border-[#D9D3CC] opacity-40 animate-float"
          style={{ animationDelay: "0s", animationDuration: "7s" }}
        />
        <div
          className="absolute top-[15%] right-[8%] w-36 h-36 rounded-full border border-[#D9D3CC] opacity-20 animate-float"
          style={{
            animationDelay: "0.5s",
            animationDuration: "7s",
            marginTop: "-24px",
            marginRight: "-24px",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[6%] w-20 h-20 rounded-full border border-[#AB6D48] opacity-25 animate-float"
          style={{ animationDelay: "1.2s", animationDuration: "8s" }}
        />

        {/* Subtle noise grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-[#D9D3CC] bg-[#F4F1ED] px-4 py-1.5 rounded-full text-xs font-semibold text-[#5A635A] tracking-wide mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#252C25] animate-pulse-slow" />
          FrameOS — The Creator Studio
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1F1C] mb-6 max-w-4xl mx-auto">
          Create <span className="text-[#AB6D48]">viral-ready posts</span> in
          seconds.
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
            <span className="text-xs bg-[#252C25] text-white px-2 py-0.5 rounded font-bold">
              PRO
            </span>
            Upgrade — $5/month
          </a>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
          <div className="flex -space-x-2">
            {[
              "bg-[#252C25]",
              "bg-[#AB6D48]",
              "bg-[#7EA0AE]",
              "bg-[#5A635A]",
              "bg-[#4669B5]",
            ].map((bg, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full ${bg} border-2 border-[#ECE7E2] flex items-center justify-center text-white text-xs font-bold shadow-sm`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm text-[#5A635A] font-medium">
            <span className="font-semibold text-[#1C1F1C]">
              2,400+ creators
            </span>{" "}
            already designing with FrameOS
          </p>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-amber-500 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-[#5A635A] font-medium ml-1.5">
              4.9 / 5
            </span>
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
              <div
                className="p-5 aspect-[4/3] flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #252C25, #3a4a3a)",
                }}
              >
                <div className="text-center">
                  <p className="text-white/50 text-[9px] font-medium uppercase tracking-widest mb-2">
                    Daily Quote
                  </p>
                  <p className="text-white text-xs font-semibold leading-snug">
                    &ldquo;Design is how it works.&rdquo;
                  </p>
                  <p className="text-white/50 text-[9px] mt-2">— Steve Jobs</p>
                </div>
              </div>
            </div>

            {/* Mockup 2 — Social Post */}
            <div
              className="glass-card rounded-2xl overflow-hidden shadow-sm col-span-2 animate-float"
              style={{ animationDelay: "0.3s" }}
            >
              <div style={{ background: "#1C1F1C" }} className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: "#252C25" }}
                  >
                    K
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">
                      @kartik_singhhh
                    </p>
                    <p className="text-gray-400 text-[9px]">
                      Indie Hacker · Founder
                    </p>
                  </div>
                </div>
                <p className="text-gray-100 text-xs leading-relaxed">
                  Shipped a new feature in 2 hours using FrameOS. The
                  auto-formatting alone saves me 30 mins per post.
                </p>
                <div className="flex items-center gap-4 mt-3 text-gray-500 text-[9px]">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    42
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    128
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    891
                  </span>
                </div>
              </div>
            </div>

            {/* Mockup 3 — Minimal Frame */}
            <div
              className="glass-card rounded-2xl overflow-hidden shadow-sm animate-float"
              style={{ animationDelay: "0.6s" }}
            >
              <div
                className="p-5 aspect-square flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #AB6D48, #7a4e33)",
                }}
              >
                <div className="text-center">
                  <p className="text-white/60 text-[9px] uppercase tracking-widest mb-2">
                    Inspiration
                  </p>
                  <p className="text-white text-xs font-bold leading-tight">
                    Build things
                    <br />
                    people love.
                  </p>
                  <div className="mt-3 h-px w-8 bg-white/30 mx-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge below */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass-card px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm whitespace-nowrap">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
            <span className="text-xs font-medium text-[#5A635A]">
              Live editor — no account needed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
