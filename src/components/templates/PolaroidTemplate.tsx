import type { TemplateProps } from "./types";

export default function PolaroidTemplate({ children }: TemplateProps) {
  return (
    <div
      style={{
        display: "inline-block",
        transform: "rotate(-2deg)",
        transition: "transform 0.3s ease, filter 0.3s ease",
        filter: "drop-shadow(0 22px 48px rgba(0,0,0,0.22)) drop-shadow(0 6px 16px rgba(0,0,0,0.12))",
      }}
      className="group hover:scale-[1.015] hover:[filter:drop-shadow(0_28px_56px_rgba(0,0,0,0.25))_drop-shadow(0_8px_20px_rgba(0,0,0,0.14))]"
    >
      <div
        style={{
          background: "#FEFCF8",
          padding: "10px 10px 56px",
          borderRadius: 3,
          position: "relative",
          overflow: "visible",
          // Multi-layer polaroid shadow
          boxShadow: [
            "0 1px 0 rgba(0,0,0,0.05)",
            "0 2px 6px rgba(0,0,0,0.06)",
            "inset 0 1px 0 rgba(255,255,255,0.95)",
          ].join(","),
          backgroundImage: [
            "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E)",
            "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(254,252,248,1) 20%)",
          ].join(","),
        }}
      >
        {/* Tape strip top-left */}
        <div aria-hidden style={{
          position: "absolute",
          top: -10, left: "50%",
          width: 44, height: 18,
          marginLeft: -22,
          background: "rgba(240,230,200,0.7)",
          backdropFilter: "blur(2px)",
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E)",
          zIndex: 10,
        }} />

        {/* Photo area — slight inner shadow to fake depth */}
        <div style={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
          position: "relative",
        }}>
          {/* Photo edge vignette */}
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.08) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }} />
          {children}
        </div>

        {/* Caption area with handwriting feel */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}>
          <div style={{
            width: 32, height: 1.5,
            background: "rgba(180,165,140,0.45)",
            borderRadius: 10,
          }} />
          <span style={{
            fontFamily: '"Caveat", "Segoe Print", cursive',
            fontSize: 13,
            color: "rgba(100,88,72,0.7)",
            letterSpacing: "0.04em",
          }}>
            FrameOS ✦
          </span>
        </div>
      </div>
    </div>
  );
}
