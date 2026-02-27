const audiences = [
  {
    emoji: "🐦",
    title: "X / Twitter Creators",
    desc: "Make your threads stand out with viral-ready quote cards, branded visuals, and social post templates — in seconds.",
    gradient: "from-slate-800 to-slate-900",
  },
  {
    emoji: "💼",
    title: "LinkedIn Founders",
    desc: "Elevate your founder posts with Mac-style frames and professional templates that command attention in the feed.",
    gradient: "from-blue-700 to-blue-900",
  },
  {
    emoji: "⚡",
    title: "Indie Hackers",
    desc: "Ship beautiful launch screenshots, product mockups, and milestone posts — without a designer on your team.",
    gradient: "from-violet-700 to-purple-800",
  },
  {
    emoji: "🎨",
    title: "Designers",
    desc: "A fast, beautiful tool for presenting your work. Export at 4K, drag-and-drop text, and layer scenes effortlessly.",
    gradient: "from-fuchsia-600 to-pink-700",
  },
];

export default function ForCreators() {
  return (
    <section id="creators" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/20 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="section-tag">Designed for creators</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-violet-950 leading-tight mb-4">
            Built for the people who{" "}
            <span className="text-gradient">build in public</span>
          </h2>
          <p className="text-violet-500 text-lg max-w-xl mx-auto leading-relaxed">
            Whether you post daily or launch monthly — FrameOS makes every
            visual look intentional and premium.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${a.gradient} rounded-3xl p-7 text-white hover:-translate-y-1 transition-all duration-300 shadow-xl`}
            >
              <div className="text-3xl mb-4">{a.emoji}</div>
              <h3 className="text-base font-extrabold mb-3">{a.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/editor"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:opacity-90 transition-all duration-200 shadow-xl shadow-violet-300/40 hover:scale-[1.02]"
          >
            Open the free editor
          </a>
          <a
            href="#pricing"
            className="glass px-8 py-4 rounded-2xl font-bold text-sm text-violet-700 hover:bg-white/40 transition-all duration-200 shadow-md hover:scale-[1.02]"
          >
            See Pro features →
          </a>
        </div>
      </div>
    </section>
  );
}
