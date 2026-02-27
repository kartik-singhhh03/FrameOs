import type { TemplateProps } from "./types";

export default function TypewriterTemplate({ children }: TemplateProps) {
  return (
    <div
      style={{
        display: "inline-block",
        filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.20)) drop-shadow(0 4px 14px rgba(0,0,0,0.10))",
        transition: "transform 0.3s ease",
      }}
      className="group hover:scale-[1.015]"
    >
      <div
        style={{
          position: "relative",
          background: "#F8F4ED",
          overflow: "hidden",
          borderRadius: 2,
          // Subtle aged paper tone
          backgroundImage: [
            "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E)",
            "linear-gradient(180deg, rgba(240,230,210,0.6) 0%, rgba(248,244,237,1) 15%, rgba(248,244,237,1) 85%, rgba(235,220,200,0.5) 100%)",
          ].join(","),
        }}
      >
        {/* Top tape strip decoration */}
        <div aria-hidden style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 6,
          background: "repeating-linear-gradient(90deg, rgba(180,165,140,0.35) 0px, rgba(180,165,140,0.35) 8px, rgba(160,145,120,0.20) 8px, rgba(160,145,120,0.20) 16px)",
          zIndex: 2,
        }} />
        {/* Typewriter top header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px 10px",
          borderBottom: "1px solid rgba(160,148,130,0.3)",
          position: "relative",
          zIndex: 3,
        }}>
          <div style={{ display: "flex", gap: 6 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 6, height: 6,
                borderRadius: "50%",
                background: "rgba(160,148,130,0.5)",
              }} />
            ))}
          </div>
          <div style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 9,
            color: "rgba(120,108,90,0.7)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}>
            FrameOS · Studio
          </div>
          <div style={{
            width: 28, height: 8,
            border: "1px solid rgba(160,148,130,0.5)",
            borderRadius: 1,
            overflow: "hidden",
            background: "linear-gradient(90deg, rgba(130,115,95,0.6) 0%, rgba(130,115,95,0.6) 75%, transparent 75%)",
          }} />
        </div>

        {/* Vignette */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(140,125,105,0.16) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 3 }}>{children}</div>

        {/* Bottom ruled strip */}
        <div aria-hidden style={{
          height: 18,
          background: "rgba(160,148,130,0.12)",
          borderTop: "1px solid rgba(160,148,130,0.22)",
          position: "relative",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 7,
            color: "rgba(110,100,82,0.5)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}>
            ···  frameos.design  ···
          </div>
        </div>
      </div>
    </div>
  );
}
