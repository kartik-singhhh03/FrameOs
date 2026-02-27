import type { TemplateProps } from "./types";

export default function GalleryFrameTemplate({ children }: TemplateProps) {
  return (
    <div
      style={{
        display: "inline-block",
        transform: "rotate(0.3deg)",
        filter: "drop-shadow(0 24px 58px rgba(0,0,0,0.24)) drop-shadow(0 6px 18px rgba(0,0,0,0.12))",
        transition: "transform 0.3s ease",
      }}
      className="group hover:scale-[1.015]"
    >
      {/* Outer ornate frame — 4-layer border */}
      <div style={{
        background: "linear-gradient(135deg, #8B7355 0%, #C9A96E 35%, #8B7355 55%, #D4B483 75%, #8B7355 100%)",
        padding: 18,
        borderRadius: 4,
        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)",
      }}>
        {/* Inner linen mat */}
        <div style={{
          background: "#F4F0E8",
          padding: 28,
          borderRadius: 2,
          backgroundImage: [
            "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E)",
            "linear-gradient(160deg, rgba(255,255,255,0.5) 0%, transparent 60%)",
          ].join(","),
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.10), inset 0 -2px 8px rgba(0,0,0,0.06)",
        }}>
          {/* Inner gold bead border */}
          <div style={{
            border: "2px solid rgba(180,148,96,0.7)",
            padding: 4,
            borderRadius: 1,
          }}>
            <div style={{
              border: "1px solid rgba(180,148,96,0.4)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Corner rosettes */}
              {[["0%","0%"],["100%","0%"],["0%","100%"],["100%","100%"]].map(([t, l], i) => (
                <div key={i} aria-hidden style={{
                  position: "absolute",
                  top: t === "0%" ? -5 : "auto",
                  bottom: t === "100%" ? -5 : "auto",
                  left: l === "0%" ? -5 : "auto",
                  right: l === "100%" ? -5 : "auto",
                  width: 10, height: 10,
                  background: "radial-gradient(circle, #D4B483 0%, #8B7355 100%)",
                  borderRadius: "50%",
                  zIndex: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                }} />
              ))}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
