const audiences = [
  {
    title: "X / Twitter Creators",
    desc: "Make your threads pop with quote cards, thread carousels, and one-click share to X — caption auto-copies, image auto-downloads.",
    bg: "#1C1F1C",
  },
  {
    title: "LinkedIn Founders",
    desc: "Elevate your founder posts with Mac-style frames and professional templates that command attention in the feed.",
    bg: "#252C25",
  },
  {
    title: "Indie Hackers & Devs",
    desc: "Ship code snippet cards, terminal screenshots, metrics milestones, and thread carousels — without a designer on your team.",
    bg: "#AB6D48",
  },
  {
    title: "Designers",
    desc: "A fast, beautiful tool for presenting your work. Export at 4K, drag-and-drop text, and layer scenes effortlessly.",
    bg: "#7EA0AE",
  },
];

const AUDIENCE_ICONS = [
  <svg
    key={0}
    className="w-7 h-7 text-white/80"
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
  </svg>,
  <svg
    key={1}
    className="w-7 h-7 text-white/80"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>,
  <svg
    key={2}
    className="w-7 h-7 text-white/80"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>,
  <svg
    key={3}
    className="w-7 h-7 text-white/80"
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
];

export default function ForCreators() {
  return (
    <section
      id="creators"
      className="scroll-anchor py-24 relative overflow-hidden bg-[#ECE7E2]"
    >
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
