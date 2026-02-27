import type { TemplateProps } from "./types";

export default function CrumpledPaperTemplate({ children }: TemplateProps) {
  return (
    <div
      style={{
        display: "inline-block",
        transform: "rotate(0.4deg)",
        filter: "drop-shadow(0 18px 48px rgba(0,0,0,0.18)) drop-shadow(0 4px 12px rgba(0,0,0,0.10))",
        transition: "transform 0.3s ease, filter 0.3s ease",
      }}
      className="group hover:scale-[1.015]"
    >
      <div
        style={{
          position: "relative",
          background: "#F5F0E8",
          borderRadius: 3,
          overflow: "hidden",
          /* Simulate paper creases with subtle radial highlights */
          backgroundImage: [
            "radial-gradient(ellipse at 15% 25%, rgba(255,255,255,0.55) 0%, transparent 50%)",
            "radial-gradient(ellipse at 82% 65%, rgba(255,255,255,0.35) 0%, transparent 45%)",
            "radial-gradient(ellipse at 50% 5%, rgba(210,200,185,0.4) 0%, transparent 40%)",
            "linear-gradient(160deg, rgba(255,255,255,0.25) 0%, transparent 55%, rgba(195,185,170,0.20) 100%)",
          ].join(","),
        }}
      >
        {/* Paper noise texture */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.13'/%3E%3C/svg%3E)",
            backgroundSize: "300px 300px",
            mixBlendMode: "multiply",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {/* Edge vignette */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 55%, rgba(150,135,115,0.18) 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        {/* Fold crease lines */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
          <div style={{
            position: "absolute", top: "32%", left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent 0%, rgba(170,155,130,0.18) 30%, rgba(170,155,130,0.22) 50%, rgba(170,155,130,0.18) 70%, transparent 100%)",
          }} />
          <div style={{
            position: "absolute", bottom: "28%", left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent 0%, rgba(170,155,130,0.14) 25%, rgba(170,155,130,0.18) 55%, rgba(170,155,130,0.14) 80%, transparent 100%)",
          }} />
        </div>
        {/* Content */}
        <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
      </div>
    </div>
  );
}
