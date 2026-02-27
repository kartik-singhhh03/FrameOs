import type { TemplateProps } from "./types";

/**
 * MinimalGlassTemplate
 * Soft frosted-glass card — no top bar, pure content focus.
 */
export default function MinimalGlassTemplate({ children }: TemplateProps) {
  return (
    <div
      className="rounded-3xl overflow-hidden shadow-xl border border-white/60 p-8 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(245,243,255,0.45) 100%)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        boxShadow:
          "0 20px 60px rgba(109,40,217,0.14), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
    >
      {children}
    </div>
  );
}
