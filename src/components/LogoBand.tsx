const logos = [
  { name: "Acme", letter: "A" },
  { name: "Kobe", letter: "K" },
  { name: "Osio", letter: "O" },
  { name: "Turm", letter: "T" },
  { name: "Bento", letter: "B" },
  { name: "Vercel", letter: "V" },
  { name: "Linear", letter: "L" },
  { name: "Notion", letter: "N" },
];

export default function LogoBand() {
  return (
    <section className="py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-violet-500 uppercase tracking-widest mb-10">
          Trusted by creators at world-class companies
        </p>

        <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="glass px-5 py-2.5 rounded-xl flex items-center gap-2 opacity-70 hover:opacity-100 transition-all duration-200 hover:scale-105 cursor-default"
            >
              <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center">
                {logo.letter}
              </span>
              <span className="text-sm font-bold text-violet-800 tracking-tight">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
