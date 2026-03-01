const ICONS = [
  // Smart Auto Formatting
  <svg
    key={0}
    className="w-5 h-5 text-[#252C25]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 6h16M4 10h12M4 14h16M4 18h10"
    />
  </svg>,
  // Template Library
  <svg
    key={1}
    className="w-5 h-5 text-[#252C25]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
    />
  </svg>,
  // Social Post Templates
  <svg
    key={2}
    className="w-5 h-5 text-[#252C25]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    />
  </svg>,
  // Scene Mode
  <svg
    key={3}
    className="w-5 h-5 text-[#252C25]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>,
  // Word Emphasis
  <svg
    key={4}
    className="w-5 h-5 text-[#252C25]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>,
  // Typography
  <svg
    key={5}
    className="w-5 h-5 text-[#252C25]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 6h16M4 12h16M4 18h7"
    />
  </svg>,
  // Backgrounds
  <svg
    key={6}
    className="w-5 h-5 text-[#252C25]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>,
  // Export
  <svg
    key={7}
    className="w-5 h-5 text-[#252C25]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>,
  // Dev Mode Templates
  <svg
    key={8}
    className="w-5 h-5 text-[#252C25]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>,
  // One-click Share
  <svg
    key={9}
    className="w-5 h-5 text-[#252C25]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>,
  // Thread Carousel
  <svg
    key={10}
    className="w-5 h-5 text-[#252C25]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>,
  // Referral
  <svg
    key={11}
    className="w-5 h-5 text-[#252C25]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>,
];

const features = [
  {
    title: "Smart Auto Formatting",
    desc: "Intelligent rule-based text layout that auto-sizes, balances lines, and picks the perfect line-height for every quote — instantly.",
  },
  {
    title: "Beautiful Template Library",
    desc: "Mac window, minimal card, polaroid, glass frame, browser — choose from hand-crafted Frame templates built for pixel-perfect results.",
  },
  {
    title: "Social Post Templates",
    desc: "Export-ready templates for Twitter/X, LinkedIn, Instagram, Threads, Notion, and code snippets. Designed for virality.",
  },
  {
    title: "Scene / Studio Mode",
    desc: "Drop your design into realistic scenes — desktop, portrait, landscape, tablet — for polished launch screenshots.",
  },
  {
    title: "Word Emphasis Styling",
    desc: "Highlight key words with colour, underline, pill, or glow — auto-detected from your quote or manually selected.",
  },
  {
    title: "Advanced Typography",
    desc: "16 premium fonts, full weight control, letter-spacing, line-height, text transforms, and drop shadow fine-tuning.",
  },
  {
    title: "Professional Backgrounds",
    desc: "Solid colours, gradient presets, custom hex, image upload with blur slider, noise texture, and grain overlay.",
  },
  {
    title: "High-Resolution Export",
    desc: "Export at 1x, 2x, or 4K quality. Pixel-perfect PNG output that matches the live preview exactly — watermark-free on Pro.",
  },
  {
    title: "Dev Mode Templates",
    desc: "Code snippet cards, terminal screenshots, metrics milestones, and thread carousels — purpose-built for developers building in public.",
  },
  {
    title: "One-click Social Share",
    desc: "Share to X, LinkedIn, and Instagram directly from the editor. Image downloads automatically, caption copies to clipboard — no OAuth, no friction.",
  },
  {
    title: "Thread Carousel Builder",
    desc: "Write multi-slide thread content, navigate between slides with arrow keys, and export each card individually — perfect for X threads.",
  },
  {
    title: "Referral & Invite",
    desc: "Share your unique invite link with friends. Both you and your referral unlock Pro perks — grow your network while creating.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="scroll-anchor py-24 relative bg-[#ECE7E2]"
    >
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
              <h3 className="text-sm font-bold text-[#1C1F1C] mb-2">
                {f.title}
              </h3>
              <p className="text-[#5A635A] text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-12 glass-card rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "10×", label: "Faster than Canva" },
            { val: "25+", label: "Ready-made templates" },
            { val: "4K", label: "Export resolution" },
            { val: "4.9★", label: "Average user rating" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl font-extrabold text-[#252C25]">
                {stat.val}
              </p>
              <p className="text-sm text-[#5A635A] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
