export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" />
          {/* Mesh overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #c4b5fd 0%, transparent 50%), radial-gradient(circle at 80% 80%, #818cf8 0%, transparent 50%)",
            }}
          />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative px-8 py-20 md:px-20 md:py-28 text-center">
            <p className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-white/90 uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-slow" />
              Start creating today
            </p>

            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight max-w-3xl mx-auto mb-6">
              Create something{" "}
              <span className="text-violet-200">beautiful. Right now.</span>
            </h2>

            <p className="text-violet-200 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12 font-medium">
              Free forever. Upgrade to Pro for $5/month and get watermark-free
              exports, all templates, and 4K quality.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
              <a
                href="/editor"
                className="bg-white text-violet-700 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-violet-50 transition-all duration-200 shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Creating — free
              </a>
              <a
                href="#pricing"
                className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all duration-200 hover:scale-[1.02] flex items-center gap-2"
              >
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-lg font-bold">
                  $5
                </span>
                Upgrade to Pro
              </a>
            </div>

            {/* Floating mockup strip */}
            <div className="relative mt-4 flex justify-center gap-4 flex-wrap">
              {[
                { bg: "from-white/20 to-white/10", text: "Quote Frames" },
                { bg: "from-white/15 to-white/5", text: "Announcement Posts" },
                { bg: "from-white/20 to-white/10", text: "Product Showcases" },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${card.bg} backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white/80 text-sm font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer`}
                >
                  {card.text}
                </div>
              ))}
            </div>

            {/* UI screenshot mockup */}
            <div className="mt-12 glass rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto border border-white/20">
              <div className="bg-white/10 px-4 py-2.5 flex items-center gap-2 border-b border-white/10">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
                </div>
                <div className="flex-1 mx-3 bg-white/10 rounded-md px-3 py-0.5 text-xs text-white/50 text-center max-w-xs mx-auto">
                  app.frameos.design/studio
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-6">
                {[
                  "bg-gradient-to-br from-violet-400 to-purple-600",
                  "bg-gradient-to-br from-indigo-400 to-blue-600",
                  "bg-gradient-to-br from-fuchsia-500 to-pink-600",
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`${bg} rounded-2xl aspect-video flex items-center justify-center shadow-lg`}
                  >
                    <div className="text-center px-4">
                      <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider mb-1">
                        Frame {i + 1}
                      </p>
                      <p className="text-white font-bold text-sm">
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
