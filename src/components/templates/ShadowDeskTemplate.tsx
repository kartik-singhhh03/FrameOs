import type { TemplateProps } from "./types";

export default function ShadowDeskTemplate({ children }: TemplateProps) {
  return (
    <div
      style={{
        display: "inline-block",
        transition: "transform 0.3s ease",
        padding: "28px 32px 40px",
        // Desk surface background with linen texture
        background: "#E8E2D9",
        borderRadius: 8,
        backgroundImage: [
          "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.10'/%3E%3C/svg%3E)",
          "radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 60%)",
          "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
        ].join(","),
      }}
      className="group hover:scale-[1.01]"
    >
      {/* Decorative desk items */}
      <div aria-hidden style={{ position: "relative", marginBottom: 14, display: "flex", alignItems: "flex-end", gap: 10 }}>
        {/* Coffee ring stain */}
        <div style={{
          width: 34, height: 34,
          borderRadius: "50%",
          border: "2px solid rgba(160,130,100,0.22)",
          boxShadow: "0 0 0 1px rgba(160,130,100,0.10)",
          background: "transparent",
          position: "absolute",
          right: 30,
          top: -18,
          transform: "rotate(-12deg)",
        }} />
        {/* Pencil */}
        <div style={{
          width: 90, height: 7,
          borderRadius: 3,
          background: "linear-gradient(90deg, #F6C04A 0%, #F6C04A 80%, #D4904A 80%, #D4904A 88%, #F0E6D0 88%, #F0E6D0 100%)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          position: "absolute",
          left: -10,
          top: -16,
          transform: "rotate(4deg)",
        }} />
      </div>

      {/* The paper card */}
      <div
        style={{
          background: "#FDFAF5",
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          boxShadow: [
            "0 2px 4px rgba(0,0,0,0.04)",
            "0 8px 20px rgba(0,0,0,0.08)",
            "0 24px 60px rgba(0,0,0,0.13)",
            "0 1px 0px rgba(255,255,255,0.8) inset",
          ].join(","),
          transform: "rotate(0.5deg) perspective(800px) rotateX(1.5deg)",
        }}
      >
        {/* Paper noise */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E)",
          backgroundSize: "300px 300px",
          mixBlendMode: "multiply",
          pointerEvents: "none",
          zIndex: 1,
        }} />
        {/* Fold highlight */}
        <div aria-hidden style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "35%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }} />
        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      </div>

      {/* Desk shadow cast by card */}
      <div aria-hidden style={{
        height: 8,
        margin: "-4px 10px 0",
        borderRadius: "50%",
        background: "radial-gradient(ellipse at center, rgba(0,0,0,0.14) 0%, transparent 70%)",
        filter: "blur(4px)",
      }} />
    </div>
  );
}
