const testimonials = [
  {
    name: "Aria Chen",
    role: "X Creator · 42K followers",
    avatar: "A",
    color: "from-violet-400 to-purple-600",
    text: "FrameOS completely changed how I make content. What used to take 40 minutes now takes under 5. The auto-formatting alone is worth the Pro upgrade.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    role: "Indie Hacker · LinkedIn Founder",
    avatar: "M",
    color: "from-indigo-400 to-blue-500",
    text: "I ship polished posts every single day now. The social templates are so good that people ask what designer I hired. It's just FrameOS.",
    stars: 5,
  },
  {
    name: "Sophie Laurent",
    role: "Content Creator · Instagram",
    avatar: "S",
    color: "from-fuchsia-400 to-pink-500",
    text: "The emphasis styling feature is a game changer. I highlight key words in my posts and my engagement doubled. No exaggeration.",
    stars: 5,
  },
  {
    name: "Kai Orozco",
    role: "Founder, DeskMail · Product Hunt #1",
    avatar: "K",
    color: "from-emerald-400 to-teal-500",
    text: "Launched 3 products with FrameOS screenshots. The Mac window template + scene mode makes everything look premium instantly.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "Designer · Building in public",
    avatar: "P",
    color: "from-orange-400 to-amber-500",
    text: "The background system is insane. Gradients, image upload, blur slider, grain overlay — this rivals tools that cost 10× more.",
    stars: 5,
  },
  {
    name: "Tom Ellison",
    role: "X / Twitter Growth Builder",
    avatar: "T",
    color: "from-violet-500 to-indigo-600",
    text: "Every thread I write now has a FrameOS visual. Impressions are up 3× since I started. The drag-to-reposition feature is so satisfying.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-200/30 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left */}
          <div>
            <span className="section-tag">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-violet-950 leading-tight">
              Loved by designers{" "}
              <span className="text-gradient">&amp; teams</span>
            </h2>
          </div>
          {/* Right */}
          <div className="flex items-center">
            <div className="glass-card rounded-3xl p-6 w-full">
              <div className="flex items-center gap-3 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm font-bold text-violet-700 ml-1">
                  4.9 out of 5
                </span>
              </div>
              <p className="text-violet-700 text-sm leading-relaxed font-medium">
                "Before FrameOS, juggling different tools to manage clients,
                tasks, and imagery was chaos. Now it's all in one place. We're
                campaigns faster than ever before."
              </p>
              <p className="text-violet-400 text-xs mt-3 font-semibold">
                — Lena Iglesias, Brand Manager at Rosé
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass-card rounded-3xl p-6 break-inside-avoid hover:shadow-xl hover:shadow-violet-200/50 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <svg
                    key={j}
                    className="w-4 h-4 text-amber-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-violet-700 text-sm leading-relaxed mb-5">
                {t.text}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-violet-900">{t.name}</p>
                  <p className="text-xs text-violet-400 font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
