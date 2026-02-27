import type { TemplateProps } from "./types";

const NAV_DOTS = [
  { bg: "#ff5f57", label: "Close" },
  { bg: "#febc2e", label: "Minimise" },
  { bg: "#28c840", label: "Maximise" },
];

/**
 * BrowserWindowTemplate
 * Mimics a browser chrome with a mocked address bar.
 */
export default function BrowserWindowTemplate({ children }: TemplateProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-zinc-200/80 shadow-2xl shadow-zinc-400/20"
      style={{ background: "#f5f5f7" }}
    >
      {/* Browser toolbar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-zinc-200">
        {/* Traffic lights */}
        <div
          className="flex items-center gap-1.5"
          role="group"
          aria-label="Browser controls"
        >
          {NAV_DOTS.map(({ bg, label }) => (
            <span
              key={label}
              aria-label={label}
              style={{ background: bg }}
              className="w-3 h-3 rounded-full opacity-90"
            />
          ))}
        </div>

        {/* Address bar mock */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 border border-zinc-200 shadow-sm w-48">
            <span className="text-zinc-400">
              <svg
                width="11"
                height="11"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="6"
                  cy="6"
                  r="4.5"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 10l2.5 2.5"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-[11px] text-zinc-400 font-medium select-none truncate">
              frameos.app/studio
            </span>
          </div>
        </div>

        {/* Spacer to balance layout */}
        <div className="w-12 flex-shrink-0" aria-hidden="true" />
      </div>

      {/* Page body */}
      <div
        className="p-6 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse at center, #f0eaff 0%, #f5f3ff 60%, #faf8ff 100%)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
