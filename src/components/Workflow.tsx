const steps = [
  {
    num: "01",
    title: "Pick your canvas",
    desc: "Choose a canvas format or start from a blank slate. Every size — post, story, banner, thumbnail — lives in one place.",
  },
  {
    num: "02",
    title: "Design with ease",
    desc: "Drop in text, images, gradients, and icons. Customize every detail in seconds using our intelligent styling controls.",
  },
  {
    num: "03",
    title: "Export & share",
    desc: "Export in full resolution — PNG, SVG, or WebP — and share directly to social or download for your campaigns.",
  },
];

export default function Workflow() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: steps */}
          <div>
            <span className="section-tag">How it works</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-violet-950 leading-tight mb-12">
              Simplify your <span className="text-gradient">workflow</span>
            </h2>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-violet-200 group-hover:scale-110 transition-transform">
                      {step.num}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 h-full bg-gradient-to-b from-violet-300 to-transparent mt-2 min-h-[32px]" />
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-bold text-violet-950 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-violet-500 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-3 glass px-5 py-3 rounded-2xl w-fit">
              <div className="flex -space-x-1">
                {["bg-violet-400", "bg-fuchsia-400", "bg-indigo-400"].map(
                  (bg, i) => (
                    <span
                      key={i}
                      className={`w-7 h-7 rounded-full ${bg} border-2 border-white`}
                    />
                  ),
                )}
              </div>
              <p className="text-xs font-semibold text-violet-700">
                Available on macOS & Web
              </p>
            </div>
          </div>

          {/* Right: UI mockup */}
          <div className="relative">
            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl shadow-violet-200/40">
              {/* Window chrome */}
              <div className="bg-white/40 px-4 py-3 border-b border-white/30 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-medium text-violet-400 ml-3">
                  FrameOS — New Frame
                </span>
              </div>
              <div className="p-6 space-y-4">
                {/* Template row */}
                {[
                  { bg: "from-violet-500 to-purple-600", label: "Quote Frame" },
                  { bg: "from-indigo-500 to-blue-500", label: "Announcement" },
                  {
                    bg: "from-fuchsia-500 to-pink-500",
                    label: "Product Showcase",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${item.bg} shadow-md group hover:scale-[1.02] transition-transform cursor-pointer`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {item.label}
                      </p>
                      <p className="text-white/60 text-xs">
                        Click to customize
                      </p>
                    </div>
                    <div className="ml-auto bg-white/20 text-white text-xs px-3 py-1 rounded-xl font-medium">
                      Use →
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg">
              <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
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
              <span className="text-xs font-bold text-violet-900">
                3 exports saved today
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
