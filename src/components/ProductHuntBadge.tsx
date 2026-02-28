"use client";

export default function ProductHuntBadge() {
  return (
    <section className="py-6 px-4 flex justify-center">
      <a
        href="https://www.producthunt.com/products/frameos?utm_source=website&utm_medium=badge"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-4 px-6 py-4 rounded-2xl border border-[#D9D3CC] bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all duration-200 cursor-pointer"
        style={{ maxWidth: 420 }}
      >
        {/* PH Logo */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
          style={{ background: "#FF6154" }}
        >
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
            <path
              d="M21.25 18.75H16.25V13.75H21.25C22.5761 13.75 23.75 14.9239 23.75 16.25C23.75 17.5761 22.5761 18.75 21.25 18.75Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 3.75C11.0254 3.75 3.75 11.0254 3.75 20C3.75 28.9746 11.0254 36.25 20 36.25C28.9746 36.25 36.25 28.9746 36.25 20C36.25 11.0254 28.9746 3.75 20 3.75ZM13.75 11.25H21.25C23.9761 11.25 26.25 13.5239 26.25 16.25C26.25 18.9761 23.9761 21.25 21.25 21.25H16.25V28.75H13.75V11.25Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-bold" style={{ color: "#FF6154" }}>
              We&apos;re live on Product Hunt
            </span>
            <span className="text-base">🚀</span>
          </div>
          <p className="text-xs text-[#5A635A] font-medium">
            Support us &amp; share your feedback
          </p>
        </div>

        {/* Arrow */}
        <svg
          className="w-4 h-4 text-[#5A635A] flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </section>
  );
}
