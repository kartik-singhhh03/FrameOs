"use client";
import { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Templates", href: "/templates" },
  { label: "Creators", href: "/#creators" },
  { label: "Pricing", href: "/#pricing" },
];

function Avatar({ src, name }: { src?: string | null; name?: string | null }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name ?? "avatar"}
        width={32}
        height={32}
        className="rounded-full object-cover border border-[#D9D3CC]"
        referrerPolicy="no-referrer"
      />
    );
  }
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";
  return (
    <span className="w-8 h-8 rounded-full bg-[#252C25] text-white text-xs font-bold flex items-center justify-center border border-[#D9D3CC] flex-shrink-0">
      {initials}
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isLoggedIn = status === "authenticated" && !!session?.user;

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-6 pt-4">
        {/* Fixed-height bar so nothing shifts */}
        <div
          className="glass rounded-2xl px-6 flex items-center justify-between shadow-sm"
          style={{ height: 56 }}
        >
          {/* ── Logo ── */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <span className="w-8 h-8 rounded-xl bg-[#252C25] flex items-center justify-center shadow-sm flex-shrink-0">
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
            <span className="font-bold text-lg text-[#1C1F1C] tracking-tight">
              FrameOS
            </span>
            <span className="hidden sm:inline-flex items-center bg-[#F4F1ED] border border-[#D9D3CC] text-[#5A635A] text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 tracking-wide">
              Now with Social Templates
            </span>
          </a>

          {/* ── Nav links – desktop ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{ minHeight: "unset" }}
                className="text-sm font-medium text-[#5A635A] px-4 py-2 rounded-xl hover:bg-[#F4F1ED] hover:text-[#1C1F1C] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* ── CTA / Auth – desktop ── */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setDropOpen((v) => !v)}
                  style={{ minHeight: "unset" }}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#F4F1ED] transition-colors"
                  aria-label="Account menu"
                >
                  <Avatar src={session.user.image} name={session.user.name} />
                  <span className="text-sm font-semibold text-[#1C1F1C] max-w-[100px] truncate leading-none">
                    {session.user.name?.split(" ")[0]}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-[#5A635A] transition-transform ${dropOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 glass-card rounded-2xl py-2 shadow-lg z-50">
                    <div className="px-4 py-2.5 border-b border-[#D9D3CC]">
                      <p className="text-xs font-bold text-[#1C1F1C] truncate">
                        {session.user.name}
                      </p>
                      <p className="text-[11px] text-[#5A635A] truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <a
                      href="/editor"
                      style={{ minHeight: "unset" }}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1C1F1C] hover:bg-[#F4F1ED] transition-colors"
                      onClick={() => setDropOpen(false)}
                    >
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Open Editor
                    </a>
                    <a
                      href="/upgrade"
                      style={{ minHeight: "unset" }}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#AB6D48] font-semibold hover:bg-[#F4F1ED] transition-colors"
                      onClick={() => setDropOpen(false)}
                    >
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Upgrade to Pro
                    </a>
                    <button
                      onClick={() => {
                        setDropOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      style={{ minHeight: "unset" }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#5A635A] hover:bg-[#F4F1ED] transition-colors"
                    >
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
                        />
                      </svg>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn(undefined, { callbackUrl: "/editor" })}
                disabled={status === "loading"}
                style={{ minHeight: "unset" }}
                className="text-sm font-semibold text-[#5A635A] hover:text-[#1C1F1C] transition-colors px-2 py-1.5 disabled:opacity-40"
              >
                {status === "loading" ? "…" : "Log in"}
              </button>
            )}

            <a
              href="/#pricing"
              style={{ minHeight: "unset" }}
              className="text-sm font-semibold text-[#252C25] border border-[#D9D3CC] hover:border-[#252C25] px-4 py-2 rounded-xl transition-all duration-200 hover:bg-[#F4F1ED]"
            >
              Upgrade — $5/mo
            </a>
            <a
              href="/editor"
              style={{ minHeight: "unset" }}
              className="bg-[#252C25] text-white text-sm font-semibold py-2 px-5 rounded-xl hover:bg-[#1F261F] transition-all duration-200 flex items-center"
            >
              Start Creating
            </a>
          </div>

          {/* ── Hamburger ── */}
          <button
            style={{ minHeight: "unset" }}
            className="md:hidden text-[#5A635A] p-2 rounded-xl hover:bg-[#F4F1ED] transition flex items-center"
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

        {/* ── Mobile menu ── */}
        {open && (
          <div className="glass mt-2 rounded-2xl px-6 py-4 flex flex-col gap-1 shadow-sm">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{ minHeight: "unset" }}
                className="text-sm font-medium text-[#5A635A] py-2.5 hover:text-[#1C1F1C] transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="border-t border-[#D9D3CC] pt-3 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 py-2">
                    <Avatar src={session.user.image} name={session.user.name} />
                    <div>
                      <p className="text-sm font-semibold text-[#1C1F1C]">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-[#5A635A]">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <a
                    href="/upgrade"
                    style={{ minHeight: "unset" }}
                    className="text-sm font-semibold text-[#AB6D48] py-2"
                    onClick={() => setOpen(false)}
                  >
                    Upgrade to Pro
                  </a>
                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    style={{ minHeight: "unset" }}
                    className="text-left text-sm font-semibold text-[#5A635A] py-2"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    signIn(undefined, { callbackUrl: "/editor" });
                  }}
                  style={{ minHeight: "unset" }}
                  className="text-left text-sm font-semibold text-[#5A635A] py-2.5 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Log in / Sign up with Google
                </button>
              )}
              <a
                href="/#pricing"
                style={{ minHeight: "unset" }}
                className="text-sm font-semibold text-[#252C25] py-2.5"
                onClick={() => setOpen(false)}
              >
                Upgrade — $5/month
              </a>
              <a
                href="/editor"
                style={{ minHeight: "unset" }}
                className="bg-[#252C25] text-white text-sm font-semibold py-3 px-5 rounded-xl text-center"
                onClick={() => setOpen(false)}
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
