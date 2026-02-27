import type { TemplateProps } from "./types";

export default function MacWindowTemplate({ children }: TemplateProps) {
  return (
    <div
      style={{
        display: "inline-block",
        filter: "drop-shadow(0 28px 60px rgba(0,0,0,0.22)) drop-shadow(0 8px 20px rgba(0,0,0,0.12))",
        transform: "perspective(1200px) rotateX(1deg)",
        transition: "transform 0.3s ease",
      }}
      className="group hover:scale-[1.012]"
    >
      <div
        style={{
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.14)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
          position: "relative",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: "linear-gradient(180deg, #EBEBEB 0%, #D8D8D8 100%)",
            borderBottom: "1px solid rgba(0,0,0,0.18)",
            padding: "0 16px",
            height: 38,
            display: "flex",
            alignItems: "center",
            gap: 8,
            position: "relative",
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: 7, alignItems: "center", flexShrink: 0 }}>
            {[
              { bg: "#FF5F57", border: "#E0433D", dot: "#9A1C12" },
              { bg: "#FEBC2E", border: "#D69A11", dot: "#916100" },
              { bg: "#28C840", border: "#12A626", dot: "#0A6615" },
            ].map(({ bg, border, dot }, i) => (
              <div
                key={i}
                style={{
                  width: 13, height: 13,
                  borderRadius: "50%",
                  background: bg,
                  border: `1px solid ${border}`,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{
                  width: 4, height: 4,
                  borderRadius: "50%",
                  background: dot,
                  opacity: 0,
                }} />
              </div>
            ))}
          </div>

          {/* Title centred */}
          <div style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 12,
            fontWeight: 500,
            color: "rgba(0,0,0,0.5)",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            letterSpacing: "0.01em",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}>
            Quote — FrameOS Studio
          </div>

          {/* Title bar gloss */}
          <div aria-hidden style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Window content */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* Noise overlay */}
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E)",
            backgroundSize: "300px 300px",
            mixBlendMode: "overlay",
            pointerEvents: "none",
            zIndex: 5,
          }} />
          {children}
        </div>
      </div>
    </div>
  );
}
