import type { ReactNode, CSSProperties } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SceneType =
  | "minimal-gradient"
  | "macos-desktop"
  | "soft-studio"
  | "dark-spotlight"
  | "glass"
  | "dark-studio"
  | "desk-mockup"
  | "floating-card"
  | "gradient-glow"
  | "soft-paper"
  | "editorial"
  | "cinematic"
  | "social-frame"
  | "screenshot-pro";

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
  { id: "glass", name: "Glass", icon: "🪟" },
  { id: "dark-studio", name: "Dark Studio", icon: "🎬" },
  { id: "desk-mockup", name: "Desk", icon: "🪑" },
  { id: "floating-card", name: "Float", icon: "🃏" },
  { id: "gradient-glow", name: "Glow", icon: "✨" },
  { id: "soft-paper", name: "Soft Paper", icon: "📄" },
  { id: "editorial", name: "Editorial", icon: "📰" },
  { id: "cinematic", name: "Cinematic", icon: "🎞" },
  { id: "social-frame", name: "Social", icon: "📱" },
  { id: "screenshot-pro", name: "Screenshot", icon: "🖼" },
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

    case "glass":
      return {
        wrapperStyle: {
          background:
            "linear-gradient(135deg, rgba(220,230,255,0.85) 0%, rgba(200,215,250,0.75) 50%, rgba(230,220,255,0.85) 100%)",
          padding: "56px 64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
          position: "relative",
          overflow: "hidden",
        },
        innerStyle: {
          filter: `drop-shadow(0 20px 40px rgba(80,100,200,${0.18 * si + 0.06}))`,
          position: "relative",
          zIndex: 2,
        },
        overlay: {
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255,255,255,0.5) 0%, transparent 60%)",
          zIndex: 1,
          pointerEvents: "none",
        },
      };

    case "dark-studio":
      return {
        wrapperStyle: {
          background:
            "linear-gradient(160deg, #0d0d12 0%, #12121a 40%, #0a0a10 100%)",
          padding: "64px 72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
          position: "relative",
          overflow: "hidden",
        },
        innerStyle: {
          filter: `drop-shadow(0 32px 64px rgba(0,0,0,${0.5 * si + 0.25}))`,
          position: "relative",
          zIndex: 2,
        },
        overlay: {
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(80,60,140,0.2) 0%, transparent 65%)",
          zIndex: 1,
          pointerEvents: "none",
        },
      };

    case "desk-mockup":
      return {
        wrapperStyle: {
          background:
            "linear-gradient(180deg, #c8bba8 0%, #d8ccbc 35%, #c0b098 100%)",
          padding: "60px 72px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
          position: "relative",
          overflow: "hidden",
        },
        innerStyle: {
          filter: `drop-shadow(0 28px 56px rgba(60,40,20,${0.32 * si + 0.12}))`,
          position: "relative",
          zIndex: 2,
        },
        overlay: {
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,248,235,0.15) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        },
      };

    case "floating-card":
      return {
        wrapperStyle: {
          background:
            "linear-gradient(135deg, #e8eaf6 0%, #fce7f3 50%, #e8f5e9 100%)",
          padding: "60px 68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
        },
        innerStyle: {
          filter: `drop-shadow(0 24px 48px rgba(100,80,180,${0.22 * si + 0.08}))`,
        },
      };

    case "gradient-glow":
      return {
        wrapperStyle: {
          background:
            "radial-gradient(ellipse at center, #2d1b69 0%, #1e1b4b 45%, #0f0e17 100%)",
          padding: "64px 72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
          position: "relative",
          overflow: "hidden",
        },
        innerStyle: {
          filter: `drop-shadow(0 0 ${Math.round(24 + 40 * si)}px rgba(139,92,246,${0.4 * si + 0.2}))`,
          position: "relative",
          zIndex: 2,
        },
        overlay: {
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(124,58,237,0.25) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        },
      };

    case "soft-paper":
      return {
        wrapperStyle: {
          background: "#f5f0e8",
          padding: "60px 68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
        },
        innerStyle: {
          filter: `drop-shadow(0 20px 40px rgba(120,90,60,${0.16 * si + 0.06}))`,
        },
      };

    case "editorial":
      return {
        wrapperStyle: {
          background: "#ffffff",
          padding: "64px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
          borderTop: "6px solid #1a1a1a",
        },
        innerStyle: {
          filter: `drop-shadow(0 16px 32px rgba(0,0,0,${0.14 * si + 0.04}))`,
        },
      };

    case "cinematic":
      return {
        wrapperStyle: {
          background: "#000000",
          padding: "64px 72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
          position: "relative",
          overflow: "hidden",
        },
        innerStyle: {
          filter: `drop-shadow(0 0 ${Math.round(20 + 30 * si)}px rgba(255,255,200,${0.15 * si + 0.05}))`,
          position: "relative",
          zIndex: 2,
        },
        overlay: {
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 40% at 50% 10%, rgba(255,250,200,0.12) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        },
      };

    case "social-frame":
      return {
        wrapperStyle: {
          background:
            "linear-gradient(145deg, #eff6ff 0%, #f0fdf4 50%, #fdf4ff 100%)",
          padding: "48px 56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
          border: "1px solid rgba(200,210,230,0.8)",
        },
        innerStyle: {
          filter: `drop-shadow(0 16px 40px rgba(60,90,180,${0.16 * si + 0.06}))`,
        },
      };

    case "screenshot-pro":
      return {
        wrapperStyle: {
          background:
            "linear-gradient(180deg, #dde3ea 0%, #e8edf2 40%, #f1f5f9 100%)",
          padding: "48px 56px 56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
          position: "relative",
          overflow: "hidden",
        },
        innerStyle: {
          filter: `drop-shadow(0 20px 48px rgba(30,50,80,${0.22 * si + 0.08}))`,
          position: "relative",
          zIndex: 2,
        },
        overlay: {
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 35%)",
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
