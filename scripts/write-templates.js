const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");

function write(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trimStart(), "utf8");
  console.log("✓", rel);
}

// ── NOISE helper (inline SVG data URI, shared by multiple templates) ──────────
// We define a constant string they all import via a shared helper
write(
  "src/components/templates/_noise.ts",
  `
// Shared SVG noise data URI used across tactile templates
export const NOISE_OVERLAY =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")";

export const PAPER_NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")";
`,
);

// ─────────────────────────────────────────────────────────────────────────────
// 1. CRUMPLED PAPER CANVAS
// ─────────────────────────────────────────────────────────────────────────────
write(
  "src/components/templates/CrumpledPaperTemplate.tsx",
  `
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
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.13'/%3E%3C/svg%3E\")",
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
`,
);

// ─────────────────────────────────────────────────────────────────────────────
// 2. TORN NOTEBOOK PAGE
// ─────────────────────────────────────────────────────────────────────────────
write(
  "src/components/templates/TornNotebookTemplate.tsx",
  `
import type { TemplateProps } from "./types";

/** SVG torn-edge path for the bottom of the page */
const TORN_BOTTOM = \`M0,0 C20,10 40,-5 60,8 C80,20 100,5 120,12 C140,18 160,-2 180,10 C200,20 220,8 240,14 C260,20 280,5 300,0 L300,40 L0,40 Z\`;
const TORN_TOP    = \`M0,40 C20,30 40,45 60,32 C80,18 100,38 120,28 C140,18 160,35 180,25 C200,15 220,30 240,20 C260,12 280,28 300,40 L300,0 L0,0 Z\`;

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
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.10'/%3E%3C/svg%3E\")",
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
`,
);

// ─────────────────────────────────────────────────────────────────────────────
// 3. FRAMED GALLERY QUOTE
// ─────────────────────────────────────────────────────────────────────────────
write(
  "src/components/templates/GalleryFrameTemplate.tsx",
  `
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
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E\")",
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
`,
);

// ─────────────────────────────────────────────────────────────────────────────
// 4. TYPEWRITER STYLE QUOTE
// ─────────────────────────────────────────────────────────────────────────────
write(
  "src/components/templates/TypewriterTemplate.tsx",
  `
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
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")",
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
`,
);

// ─────────────────────────────────────────────────────────────────────────────
// 5. NEWSPAPER EDITORIAL
// ─────────────────────────────────────────────────────────────────────────────
write(
  "src/components/templates/NewspaperTemplate.tsx",
  `
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
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.70' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.11'/%3E%3C/svg%3E\")",
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
`,
);

// ─────────────────────────────────────────────────────────────────────────────
// 6. SHADOW DESK MOCKUP
// ─────────────────────────────────────────────────────────────────────────────
write(
  "src/components/templates/ShadowDeskTemplate.tsx",
  `
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
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.10'/%3E%3C/svg%3E\")",
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
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
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
`,
);

// ─────────────────────────────────────────────────────────────────────────────
// 7. ENHANCED POLAROID (replaces simple existing one)
// ─────────────────────────────────────────────────────────────────────────────
write(
  "src/components/templates/PolaroidTemplate.tsx",
  `
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
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
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
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")",
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
`,
);

// ─────────────────────────────────────────────────────────────────────────────
// 8. ENHANCED MAC WINDOW (with realism)
// ─────────────────────────────────────────────────────────────────────────────
write(
  "src/components/templates/MacWindowTemplate.tsx",
  `
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
                  border: \`1px solid \${border}\`,
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
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
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
`,
);

console.log("\n✓ All template files written.");
