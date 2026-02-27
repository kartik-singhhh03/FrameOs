import type { TemplateProps } from "./types";

/** SVG torn-edge path for the bottom of the page */
const TORN_BOTTOM = `M0,0 C20,10 40,-5 60,8 C80,20 100,5 120,12 C140,18 160,-2 180,10 C200,20 220,8 240,14 C260,20 280,5 300,0 L300,40 L0,40 Z`;
const TORN_TOP    = `M0,40 C20,30 40,45 60,32 C80,18 100,38 120,28 C140,18 160,35 180,25 C200,15 220,30 240,20 C260,12 280,28 300,40 L300,0 L0,0 Z`;

export default function TornNotebookTemplate({ children }: TemplateProps) {
  return (
    <div
      style={{
        display: "inline-block",
        transform: "rotate(-0.6deg)",
        filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.14)) drop-shadow(0 3px 10px rgba(0,0,0,0.08))",
        transition: "transform 0.3s ease",
      }}
      className="group hover:scale-[1.015]"
    >
      <div style={{ position: "relative" }}>
        {/* Torn top edge */}
        <svg
          viewBox="0 0 300 40"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 30, position: "relative", zIndex: 2 }}
          aria-hidden
        >
          <path d={TORN_TOP} fill="#EEE9DF" />
        </svg>

        {/* Main page body */}
        <div
          style={{
            background: "#EEE9DF",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ruled lines */}
          <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 0, right: 0,
                  top: 28 + i * 28,
                  height: 1,
                  background: "rgba(176, 196, 222, 0.45)",
                }}
              />
            ))}
            {/* Red margin line */}
            <div style={{
              position: "absolute",
              top: 0, bottom: 0,
              left: 44,
              width: 1,
              background: "rgba(220, 100, 100, 0.35)",
            }} />
          </div>
          {/* Spiral binding dots */}
          <div aria-hidden style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 32, zIndex: 2 }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: 10,
                top: 8 + i * 30,
                width: 12, height: 12,
                borderRadius: "50%",
                border: "2px solid rgba(180,170,155,0.6)",
                background: "rgba(240,235,228,0.9)",
              }} />
            ))}
          </div>
          {/* Paper noise */}
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.10'/%3E%3C/svg%3E)",
            backgroundSize: "300px 300px",
            mixBlendMode: "multiply",
            pointerEvents: "none",
            zIndex: 1,
          }} />
          {/* Content */}
          <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
        </div>

        {/* Torn bottom edge */}
        <svg
          viewBox="0 0 300 40"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 30, position: "relative", zIndex: 2 }}
          aria-hidden
        >
          <path d={TORN_BOTTOM} fill="#EEE9DF" />
        </svg>
      </div>
    </div>
  );
}
