"use client";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Creators", href: "#creators" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#252C25] flex items-center justify-center shadow-sm">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" />
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
              </svg>
            </span>
            <span className="font-bold text-lg text-[#1C1F1C] tracking-tight">FrameOS</span>
            <span className="hidden sm:inline-flex items-center bg-[#F4F1ED] border border-[#D9D3CC] text-[#5A635A] text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 tracking-wide">
              Now with Social Templates
            </span>
          </a>

          {/* Nav links – desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#5A635A] px-4 py-2 rounded-xl hover:bg-[#F4F1ED] hover:text-[#1C1F1C] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="text-sm font-semibold text-[#5A635A] hover:text-[#1C1F1C] transition-colors px-2"
            >
              Log in
            </a>
            <a
              href="#pricing"
              className="text-sm font-semibold text-[#252C25] border border-[#D9D3CC] hover:border-[#252C25] px-4 py-2 rounded-xl transition-all duration-200 hover:bg-[#F4F1ED]"
            >
              Upgrade — $5/mo
            </a>
            <a
              href="/editor"
              className="bg-[#252C25] text-white text-sm font-semibold py-2 px-5 rounded-xl hover:bg-[#1F261F] transition-all duration-200"
            >
              Start Creating
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-[#5A635A] p-2 rounded-xl hover:bg-[#F4F1ED] transition"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              {open ? (
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="glass mt-2 rounded-2xl px-6 py-4 flex flex-col gap-2 shadow-sm">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#5A635A] py-2 hover:text-[#1C1F1C] transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="border-t border-[#D9D3CC] pt-3 flex flex-col gap-2">
              <a href="#" className="text-sm font-semibold text-[#5A635A] py-2">Log in</a>
              <a href="#pricing" className="text-sm font-semibold text-[#252C25] py-2" onClick={() => setOpen(false)}>
                Upgrade — $5/month
              </a>
              <a href="/editor" className="bg-[#252C25] text-white text-sm font-semibold py-3 px-5 rounded-xl text-center">
                Start Creating
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
