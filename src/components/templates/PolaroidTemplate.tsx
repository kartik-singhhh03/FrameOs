import type { TemplateProps } from "./types";

/**
 * PolaroidTemplate
 * Classic instant-photo frame: thick white border, generous bottom label area,
 * subtle rotation and drop shadow.
 */
export default function PolaroidTemplate({ children }: TemplateProps) {
  return (
    <div
      style={{
        transform: "rotate(-1.5deg)",
        display: "inline-block",
        filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.22))",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "12px 12px 52px",
          borderRadius: 4,
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Photo area */}
        <div style={{ borderRadius: 2, overflow: "hidden" }}>{children}</div>

        {/* Caption area */}
        <div
          style={{
            marginTop: 16,
            textAlign: "center",
            fontFamily: '"Caveat", "Segoe Print", cursive',
            fontSize: 15,
            color: "#555",
            letterSpacing: "0.02em",
            userSelect: "none",
          }}
        >
          FrameOS ✦
        </div>
      </div>
    </div>
  );
}
