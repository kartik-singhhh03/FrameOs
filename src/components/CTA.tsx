export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#ECE7E2]">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "#252C25" }}
        >
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
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
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
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-bold">
                  $5
                </span>
                Upgrade to Pro
              </a>
            </div>

            {/* Type chips */}
            <div className="flex justify-center gap-3 flex-wrap mb-12">
              {[
                "Quote Frames",
                "Dev Screenshots",
                "Thread Carousels",
                "Announcement Posts",
                "Product Showcases",
              ].map((label, i) => (
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
                      <p className="text-white/50 text-[10px] uppercase font-bold tracking-wider mb-1">
                        Frame {i + 1}
                      </p>
                      <p className="text-white font-semibold text-sm">
                        Beautiful design in seconds
                      </p>
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
