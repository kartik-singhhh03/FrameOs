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
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg shadow-violet-100/50">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center shadow-md">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" />
                <rect
                  x="10"
                  y="2"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.7"
                />
                <rect
                  x="2"
                  y="10"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.7"
                />
                <rect
                  x="10"
                  y="10"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.5"
                />
              </svg>
            </span>
            <span className="font-bold text-lg text-violet-900 tracking-tight">
              FrameOS
            </span>
            <span className="hidden sm:inline-flex items-center bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 tracking-wide">
              Now with Social Templates
            </span>
          </a>

          {/* Nav links – desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-violet-700 px-4 py-2 rounded-xl hover:bg-violet-100/60 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors px-2"
            >
              Log in
            </a>
            <a
              href="#pricing"
              className="text-sm font-semibold text-violet-600 border border-violet-300 hover:border-violet-500 px-4 py-2 rounded-2xl transition-all duration-200 hover:bg-violet-50"
            >
              Upgrade — $5/mo
            </a>
            <a
              href="/editor"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold py-2 px-5 rounded-2xl shadow-lg shadow-violet-300/40 hover:shadow-violet-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Start Creating
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-violet-700 p-2 rounded-xl hover:bg-violet-100 transition"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              {open ? (
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M6 6l12 12M6 18L18 6"
                />
              ) : (
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="glass mt-2 rounded-2xl px-6 py-4 flex flex-col gap-2 shadow-xl shadow-violet-100/50">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-violet-700 py-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="border-t border-violet-100 pt-3 flex flex-col gap-2">
              <a
                href="#"
                className="text-sm font-semibold text-violet-700 py-2"
              >
                Log in
              </a>
              <a
                href="#pricing"
                className="text-sm font-semibold text-violet-600 py-2"
                onClick={() => setOpen(false)}
              >
                Upgrade — $5/month
              </a>
              <a
                href="/editor"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold py-3 px-5 rounded-2xl text-center shadow-md"
              >
                Start Creating
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
