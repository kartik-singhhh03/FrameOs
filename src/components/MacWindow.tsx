import type { ReactNode } from "react";

interface MacWindowProps {
  /** Content rendered inside the window body */
  children: ReactNode;
  /** Title shown in the centre of the title bar */
  title?: string;
  /** Extra Tailwind classes applied to the outer container */
  className?: string;
}

const TRAFFIC_LIGHTS = [
  { color: "bg-[#ff5f57]", label: "Close" },
  { color: "bg-[#febc2e]", label: "Minimise" },
  { color: "bg-[#28c840]", label: "Maximise" },
] as const;

/**
 * MacWindow
 *
 * A macOS-style window chrome. Three-column title bar keeps the title
 * perfectly centred regardless of traffic-light width, using a mirrored
 * invisible right spacer. No hardcoded pixel values — spacing via Tailwind.
 */
export default function MacWindow({
  children,
  title = "FrameOS",
  className = "",
}: MacWindowProps) {
  return (
    <div
      className={[
        "w-full rounded-3xl overflow-hidden",
        "bg-white/55 backdrop-blur-2xl",
        "border border-white/50",
        "shadow-2xl shadow-violet-300/30",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── Title bar ────────────────────────────────────── */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3.5 bg-white/35 border-b border-white/40">
        {/* Left — traffic lights */}
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Window controls"
        >
          {TRAFFIC_LIGHTS.map(({ color, label }) => (
            <span
              key={label}
              aria-label={label}
              className={[
                "w-3 h-3 rounded-full shadow-sm",
                "transition-[filter] duration-150 hover:brightness-90",
                color,
              ].join(" ")}
            />
          ))}
        </div>

        {/* Centre — title */}
        <span className="text-xs font-semibold text-violet-700/70 tracking-widest uppercase select-none text-center whitespace-nowrap px-4">
          {title}
        </span>

        {/* Right — invisible mirror of left col to keep title centred */}
        <div aria-hidden="true" className="flex items-center gap-2 invisible">
          {TRAFFIC_LIGHTS.map(({ label }) => (
            <span key={label} className="w-3 h-3 rounded-full" />
          ))}
        </div>
      </div>

      {/* ── Window body ──────────────────────────────────── */}
      <div className="relative w-full">{children}</div>
    </div>
  );
}
