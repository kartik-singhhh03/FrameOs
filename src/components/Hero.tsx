"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 bg-gradient-to-b from-violet-50 via-violet-50/40 to-white">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-200/20 blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-violet-200 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold text-violet-600 tracking-wide mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse-slow" />
          FrameOS — The Creator Studio
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-[-0.02em] text-gray-900 mb-6 max-w-4xl mx-auto">
          Create{" "}
          <span className="text-violet-600">viral-ready posts</span>
          {" "}in seconds.
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Design Mac-style frames, social post templates, and aesthetic
          screenshots — all in one powerful editor.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="/editor"
            className="bg-violet-600 text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-violet-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Creating — free
          </a>
          <a
            href="#pricing"
            className="border border-gray-200 bg-white text-gray-700 px-7 py-3.5 rounded-xl font-semibold text-sm hover:border-violet-300 hover:text-violet-700 transition-all duration-200 shadow-sm flex items-center gap-2"
          >
            <span className="text-xs bg-violet-600 text-white px-2 py-0.5 rounded font-bold">PRO</span>
            Upgrade — $5/month
          </a>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
          <div className="flex -space-x-2">
            {["bg-violet-400","bg-purple-500","bg-fuchsia-400","bg-indigo-400","bg-violet-600"].map((bg, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 font-medium">
            <span className="font-semibold text-gray-800">2,400+ creators</span> already designing with FrameOS
          </p>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-slate-500 font-medium ml-1.5">4.9 / 5</span>
          </div>
        </div>

        {/* Mockup Grid */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">

            {/* Mockup 1 — Mac Window Quote */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md animate-float col-span-2 md:col-span-1">
              <div className="bg-gray-50 px-3 py-2 flex items-center gap-1.5 border-b border-gray-100">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-5 aspect-[4/3] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/60 text-[9px] font-medium uppercase tracking-widest mb-2">Daily Quote</p>
                  <p className="text-white text-xs font-semibold leading-snug">&ldquo;Design is how it works.&rdquo;</p>
                  <p className="text-white/50 text-[9px] mt-2">— Steve Jobs</p>
                </div>
              </div>
            </div>

            {/* Mockup 2 — Social Post */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md col-span-2 animate-float" style={{ animationDelay: "0.3s" }}>
              <div className="bg-gray-900 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">K</div>
                  <div>
                    <p className="text-white text-xs font-semibold">@kartik_singhhh</p>
                    <p className="text-gray-400 text-[9px]">Indie Hacker · Founder</p>
                  </div>
                </div>
                <p className="text-gray-100 text-xs leading-relaxed">
                  Shipped a new feature in 2 hours using FrameOS. The auto-formatting alone saves me 30 mins per post.
                </p>
                <div className="flex items-center gap-4 mt-3 text-gray-500 text-[9px]">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    42
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    128
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    891
                  </span>
                </div>
              </div>
            </div>

            {/* Mockup 3 — Minimal Frame */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md animate-float" style={{ animationDelay: "0.6s" }}>
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-5 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/60 text-[9px] uppercase tracking-widest mb-2">Inspiration</p>
                  <p className="text-white text-xs font-bold leading-tight">Build things<br />people love.</p>
                  <div className="mt-3 h-px w-8 bg-white/30 mx-auto" />
                </div>
              </div>
            </div>

          </div>

          {/* Floating badge below */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white border border-gray-100 px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md whitespace-nowrap">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow" />
            <span className="text-xs font-medium text-gray-600">Live editor — no account needed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
