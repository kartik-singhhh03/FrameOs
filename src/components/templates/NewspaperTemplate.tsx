import type { TemplateProps } from "./types";

export default function NewspaperTemplate({ children }: TemplateProps) {
  return (
    <div
      style={{
        display: "inline-block",
        transform: "rotate(-0.3deg)",
        filter: "drop-shadow(0 18px 44px rgba(0,0,0,0.16)) drop-shadow(0 4px 12px rgba(0,0,0,0.08))",
        transition: "transform 0.3s ease",
      }}
      className="group hover:scale-[1.015]"
    >
      <div
        style={{
          position: "relative",
          background: "#F2EDDF",
          overflow: "hidden",
          borderRadius: 3,
          // Aged newsprint texture
          backgroundImage: [
            "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.70' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.11'/%3E%3C/svg%3E)",
            "linear-gradient(180deg, rgba(230,220,200,0.5) 0%, rgba(242,237,223,1) 8%, rgba(242,237,223,1) 92%, rgba(225,215,195,0.5) 100%)",
          ].join(","),
        }}
      >
        {/* Masthead */}
        <div style={{
          borderBottom: "3px double rgba(60,52,40,0.8)",
          padding: "10px 20px 8px",
          position: "relative",
          zIndex: 2,
        }}>
          <div style={{ borderBottom: "1px solid rgba(60,52,40,0.5)", paddingBottom: 6, marginBottom: 6 }}>
            <div style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: 22,
              fontWeight: 800,
              color: "rgba(40,32,22,0.9)",
              letterSpacing: "0.12em",
              textAlign: "center",
              textTransform: "uppercase",
            }}>
              The Frame Post
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: '"Times New Roman", serif', fontSize: 8, color: "rgba(60,52,40,0.65)", fontStyle: "italic" }}>
              Vol. XXIV  ·  No. 47
            </div>
            <div style={{ fontFamily: '"Times New Roman", serif', fontSize: 8, color: "rgba(60,52,40,0.65)", fontStyle: "italic" }}>
              Est. MMXXIV
            </div>
            <div style={{ fontFamily: '"Times New Roman", serif', fontSize: 8, color: "rgba(60,52,40,0.65)", fontStyle: "italic" }}>
              One Edition
            </div>
          </div>
        </div>

        {/* Decorative column rule */}
        <div aria-hidden style={{
          position: "absolute",
          top: 90, bottom: 20,
          right: 0,
          width: 1,
          marginRight: "33%",
          background: "rgba(60,52,40,0.15)",
          zIndex: 1,
        }} />

        {/* Vignette */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(120,108,88,0.15) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 3 }}>{children}</div>

        {/* Footer rule */}
        <div style={{
          borderTop: "1px solid rgba(60,52,40,0.4)",
          padding: "5px 20px",
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 2,
        }}>
          <span style={{ fontFamily: '"Times New Roman", serif', fontSize: 7, color: "rgba(60,52,40,0.5)", fontStyle: "italic" }}>
            frameos.design
          </span>
          <span style={{ fontFamily: '"Times New Roman", serif', fontSize: 7, color: "rgba(60,52,40,0.5)", fontStyle: "italic" }}>
            ✦ Premium Design Studio ✦
          </span>
          <span style={{ fontFamily: '"Times New Roman", serif', fontSize: 7, color: "rgba(60,52,40,0.5)", fontStyle: "italic" }}>
            All rights reserved
          </span>
        </div>
      </div>
    </div>
  );
}
