const features = [
  {
    emoji: "✨",
    title: "Smart Auto Formatting",
    desc: "Intelligent rule-based text layout that auto-sizes, balances lines, and picks the perfect line-height for every quote — instantly.",
    color: "from-violet-50 to-purple-50",
    border: "border-violet-200/50",
    accent: "text-violet-600",
  },
  {
    emoji: "🎨",
    title: "Beautiful Template Library",
    desc: "Mac window, minimal card, polaroid, glass frame, browser — choose from hand-crafted Frame templates built for pixel-perfect results.",
    color: "from-fuchsia-50 to-pink-50",
    border: "border-fuchsia-200/50",
    accent: "text-fuchsia-600",
  },
  {
    emoji: "📱",
    title: "Social Post Templates",
    desc: "Export-ready templates for Twitter/X, LinkedIn, Instagram, Threads, Notion, and code snippets. Designed for virality.",
    color: "from-indigo-50 to-blue-50",
    border: "border-indigo-200/50",
    accent: "text-indigo-600",
  },
  {
    emoji: "🖼",
    title: "Scene / Studio Mode",
    desc: "Drop your design into realistic scenes — desktop, portrait, landscape, tablet — for polished launch screenshots.",
    color: "from-emerald-50 to-teal-50",
    border: "border-emerald-200/50",
    accent: "text-emerald-600",
  },
  {
    emoji: "🎯",
    title: "Word Emphasis Styling",
    desc: "Highlight key words with colour, underline, pill, or glow — auto-detected from your quote or manually selected.",
    color: "from-orange-50 to-amber-50",
    border: "border-orange-200/50",
    accent: "text-orange-600",
  },
  {
    emoji: "🎛",
    title: "Advanced Typography",
    desc: "16 premium fonts, full weight control, letter-spacing, line-height, text transforms, and drop shadow fine-tuning.",
    color: "from-violet-50 to-indigo-50",
    border: "border-violet-200/50",
    accent: "text-violet-600",
  },
  {
    emoji: "💎",
    title: "Professional Backgrounds",
    desc: "Solid colours, gradient presets, custom hex, image upload with blur slider, noise texture, and grain overlay.",
    color: "from-purple-50 to-fuchsia-50",
    border: "border-purple-200/50",
    accent: "text-purple-600",
  },
  {
    emoji: "📥",
    title: "High-Resolution Export",
    desc: "Export at 1x, 2x, or 4K quality. Pixel-perfect PNG output that matches the live preview exactly — watermark-free on Pro.",
    color: "from-slate-50 to-violet-50",
    border: "border-slate-200/50",
    accent: "text-slate-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-200/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="section-tag">Features</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-violet-950 leading-tight mb-4">
            Everything a creator{" "}
            <span className="text-gradient">actually needs</span>
          </h2>
          <p className="text-violet-500 text-lg max-w-xl mx-auto leading-relaxed">
            No bloat. No complexity. Just the tools that make your content look
            stunning and spread fast.
          </p>
        </div>

        {/* Feature cards — 4 col grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className={`glass-card rounded-3xl p-6 hover:shadow-2xl hover:shadow-violet-200/50 transition-all duration-300 hover:-translate-y-1 group border ${f.border}`}
            >
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300 text-xl`}>
                {f.emoji}
              </div>
              <h3 className="text-sm font-bold text-violet-950 mb-2">{f.title}</h3>
              <p className="text-violet-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-14 glass-card rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "10×", label: "Faster than Canva" },
            { val: "20+", label: "Ready-made templates" },
            { val: "4K", label: "Export resolution" },
            { val: "4.9★", label: "Average user rating" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl font-extrabold text-gradient">{stat.val}</p>
              <p className="text-sm text-violet-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
