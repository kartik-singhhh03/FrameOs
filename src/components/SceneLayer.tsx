import type { ReactNode, CSSProperties } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SceneType =
  | "minimal-gradient"
  | "macos-desktop"
  | "soft-studio"
  | "dark-spotlight";

export interface SceneDefinition {
  id: SceneType;
  name: string;
  icon: string;
}

export const SCENE_OPTIONS: SceneDefinition[] = [
  { id: "minimal-gradient", name: "Minimal", icon: "✦" },
  { id: "macos-desktop", name: "macOS", icon: "🖥" },
  { id: "soft-studio", name: "Studio", icon: "💡" },
  { id: "dark-spotlight", name: "Spotlight", icon: "🌙" },
];

interface SceneLayerProps {
  type: SceneType;
  /** 0.7 – 1.3, applied as scale transform on the inner content */
  scale: number;
  /** 0 – 100, controls shadow opacity multiplier */
  shadowIntensity: number;
  children: ReactNode;
}

// ─── Scene configs ────────────────────────────────────────────────────────────

interface SceneConfig {
  wrapperStyle: CSSProperties;
  innerStyle: CSSProperties;
  /** Extra decorative layer rendered behind children, if any */
  overlay?: CSSProperties;
}

function getSceneConfig(type: SceneType, shadowIntensity: number): SceneConfig {
  const si = shadowIntensity / 100; // 0–1

  switch (type) {
    case "minimal-gradient":
      return {
        wrapperStyle: {
          background:
            "linear-gradient(135deg, #ECE7E2 0%, #F4F1ED 30%, #D9D3CC 55%, #ECE7E2 80%, #F4F1ED 100%)",
          padding: "56px 64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
        },
        innerStyle: {
          filter: `drop-shadow(0 24px 48px rgba(37,44,37,${0.18 * si + 0.08}))`,
        },
      };

    case "macos-desktop":
      return {
        wrapperStyle: {
          background:
            "linear-gradient(160deg, #0f1a0f 0%, #1C1F1C 25%, #252C25 50%, #0f1a0f 100%)",
          padding: "56px 64px 76px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
          position: "relative",
          overflow: "hidden",
        },
        innerStyle: {
          filter: `drop-shadow(0 32px 64px rgba(0,0,0,${0.4 * si + 0.2}))`,
          position: "relative",
          zIndex: 2,
        },
        overlay: {
          // subtle radial glow top-right
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 75% 20%, rgba(125,160,174,0.18) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        },
      };

    case "soft-studio":
      return {
        wrapperStyle: {
          background: "#F4F1ED",
          padding: "60px 68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
        },
        innerStyle: {
          filter: `drop-shadow(0 28px 56px rgba(0,0,0,${0.22 * si + 0.08}))`,
        },
      };

    case "dark-spotlight":
      return {
        wrapperStyle: {
          background: "#0c0c0f",
          padding: "60px 72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
          position: "relative",
          overflow: "hidden",
        },
        innerStyle: {
          filter: `drop-shadow(0 0 ${Math.round(32 + 32 * si)}px rgba(171,109,72,${0.3 * si + 0.15}))`,
          position: "relative",
          zIndex: 2,
        },
        overlay: {
          // radial glow centred behind content
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(171,109,72,0.22) 0%, rgba(37,44,37,0.08) 45%, transparent 75%)",
          zIndex: 1,
          pointerEvents: "none",
        },
      };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * SceneLayer
 * Wraps the template + canvas combo in a styled background scene.
 * Pure CSS — no images, no heavy assets.
 */
export default function SceneLayer({
  type,
  scale,
  shadowIntensity,
  children,
}: SceneLayerProps) {
  const cfg = getSceneConfig(type, shadowIntensity);

  return (
    <div style={cfg.wrapperStyle}>
      {/* Optional decorative overlay (glow, gradient) */}
      {cfg.overlay && <div style={cfg.overlay} aria-hidden="true" />}

      {/* Scaled content */}
      <div
        style={{
          ...cfg.innerStyle,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          // Prevent scale from clipping — add room for the shadow
          padding: scale > 1 ? `${Math.round((scale - 1) * 60)}px` : undefined,
          transition: "transform 0.25s ease, filter 0.25s ease",
          position: "relative" as const,
          zIndex: cfg.overlay ? 2 : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
