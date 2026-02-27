import type { TemplateProps } from "./types";

const TRAFFIC = [
  { bg: "bg-[#ff5f57]", label: "Close" },
  { bg: "bg-[#febc2e]", label: "Minimise" },
  { bg: "bg-[#28c840]", label: "Maximise" },
];

/**
 * MacWindowTemplate
 * Renders a macOS-style window chrome around the quote canvas.
 */
export default function MacWindowTemplate({ children }: TemplateProps) {
  return (
    <div
      className="rounded-3xl overflow-hidden shadow-2xl shadow-violet-400/25 border border-white/50"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.72) 0%, rgba(237,233,254,0.65) 100%)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
      }}
    >
      {/* Title bar */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 border-b border-white/40 bg-white/30">
        {/* Traffic lights */}
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Window controls"
        >
          {TRAFFIC.map(({ bg, label }) => (
            <span
              key={label}
              aria-label={label}
              className={`w-3 h-3 rounded-full ${bg} opacity-90`}
            />
          ))}
        </div>

        {/* Centred title */}
        <span className="text-xs font-semibold text-violet-700/70 tracking-wide select-none">
          FrameOS Studio
        </span>

        {/* Mirror spacer */}
        <span aria-hidden="true" />
      </div>

      {/* Window body */}
      <div className="p-6 flex items-center justify-center">{children}</div>
    </div>
  );
}
