import type { TemplateProps } from "./types";

/**
 * CleanCardTemplate
 * Minimal elevated card — clean white background, subtle border,
 * intentional negative space, and a soft shadow.
 */
export default function CleanCardTemplate({ children }: TemplateProps) {
  return (
    <div
      className="rounded-2xl border border-zinc-100 overflow-hidden"
      style={{
        background: "#ffffff",
        boxShadow:
          "0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
      }}
    >
      {/* Top accent strip */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #7c3aed, #a78bfa, #4f46e5)",
        }}
        aria-hidden="true"
      />

      {/* Content area */}
      <div className="p-6 flex items-center justify-center">{children}</div>

      {/* Footer label */}
      <div className="px-4 pb-3 flex items-center justify-between border-t border-zinc-50">
        <span className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase select-none">
          FrameOS
        </span>
        <span className="text-[10px] text-zinc-300 select-none">
          frameos.app
        </span>
      </div>
    </div>
  );
}
