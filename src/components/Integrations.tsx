const integrations = [
  { name: "Figma", color: "from-pink-500 to-rose-500", letter: "F" },
  { name: "Notion", color: "from-slate-700 to-slate-500", letter: "N" },
  { name: "Slack", color: "from-emerald-500 to-teal-500", letter: "S" },
  { name: "Webflow", color: "from-blue-500 to-cyan-500", letter: "W" },
  { name: "Ghost", color: "from-violet-700 to-purple-600", letter: "G" },
  { name: "Zapier", color: "from-orange-500 to-amber-400", letter: "Z" },
  { name: "Framer", color: "from-indigo-500 to-violet-500", letter: "Fr" },
  { name: "Canva", color: "from-fuchsia-500 to-pink-400", letter: "C" },
];

export default function Integrations() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-200/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left: integration icons */}
            <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-white/30">
              <div className="grid grid-cols-4 gap-4">
                {integrations.map((app, i) => (
                  <div
                    key={i}
                    className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${app.color} flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 cursor-pointer group`}
                  >
                    <span className="text-white font-extrabold text-lg">
                      {app.letter}
                    </span>
                    <span className="text-white/70 text-[10px] font-medium mt-0.5 hidden group-hover:block transition-all">
                      {app.name}
                    </span>
                  </div>
                ))}
              </div>
              {/* Center connector */}
              <div className="flex items-center justify-center mt-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-xl shadow-violet-300/40 hover:scale-110 transition-transform cursor-pointer">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right: copy */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <span className="section-tag">Integrations</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-violet-950 leading-tight mb-4">
                One platform,{" "}
                <span className="text-gradient">unlimited connections</span>
              </h2>
              <p className="text-violet-500 leading-relaxed mb-8 text-sm">
                FrameOS plugs into the tools your team already loves. Whether
                you're exporting to Webflow, syncing with Notion, or automating
                exports via Zapier — it all works instantly, no setup headaches.
              </p>
              <a
                href="#"
                className="w-fit glass px-6 py-3 rounded-2xl text-sm font-bold text-violet-700 hover:bg-violet-50/60 transition-all duration-200 hover:scale-[1.02]"
              >
                View all integrations →
              </a>

              {/* Testimonial mini */}
              <div className="mt-10 glass rounded-2xl px-5 py-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                  D
                </div>
                <div>
                  <p className="text-sm text-violet-700 font-medium leading-relaxed">
                    "FrameOS helped our design team collaborate and ship visuals
                    30% faster — and the integrations are flawless."
                  </p>
                  <p className="text-xs text-violet-400 mt-2 font-semibold">
                    — Daniel Hughes, Co-founder & CEO at Zi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
