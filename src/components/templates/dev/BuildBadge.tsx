/**
 * BuildBadge.tsx
 * Absolute-positioned overlay badge for "Build in Public" branding.
 * Renders inside the canvas, so it IS captured by the export pipeline.
 *
 * Usage (inside quoteCanvasJsx, as an absolute child):
 *   <BuildBadge text="Day 24 of building" opacity={80} />
 */
import { memo } from "react";

interface BuildBadgeProps {
  text: string;
  /** 0–100 */
  opacity: number;
}

function BuildBadge({ text, opacity }: BuildBadgeProps) {
  const normalizedOpacity = Math.max(0, Math.min(100, opacity)) / 100;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: 12,
        right: 12,
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: 999,
        padding: "4px 10px 4px 8px",
        opacity: normalizedOpacity,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 10,
      }}
    >
      {/* Pulsing dot */}
      <span
        style={{
          display: "inline-block",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#22c55e",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "rgba(255,255,255,0.9)",
          letterSpacing: "0.03em",
          fontFamily: '"Inter","DM Sans",sans-serif',
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default memo(BuildBadge);
