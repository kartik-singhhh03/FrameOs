import type { TemplateProps } from "../types";

/**
 * NotionPageTemplate
 * Clean Notion-inspired page embed layout. Not affiliated with Notion Labs Inc.
 */
export default function NotionPageTemplate({
  children,
  socialData,
  canvasWidth,
}: TemplateProps) {
  const title = socialData?.displayName ?? "Untitled";
  const handle = socialData?.handle ?? "@frameos";
  const date = socialData?.timestamp ?? "Jun 2025";

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 12,
        border: "1px solid #e5e5e5",
        overflow: "hidden",
        width: canvasWidth ?? 520,
        fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
        boxSizing: "border-box",
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
      }}
    >
      {/* Notion nav bar */}
      <div
        style={{
          background: "#f7f7f5",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        {/* Logo placeholder */}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-hidden="true"
        >
          <span
            style={{
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            N
          </span>
        </div>
        <span style={{ fontSize: 13, color: "#6b6b6b", fontWeight: 500 }}>
          Notion
        </span>
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#ebebeb",
            borderRadius: 6,
            padding: "4px 10px",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="5" stroke="#888" strokeWidth="1.5" />
            <path
              d="M11 11L14 14"
              stroke="#888"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span style={{ fontSize: 12, color: "#888" }}>Search</span>
        </div>
      </div>

      {/* Page content */}
      <div style={{ padding: "28px 32px 24px" }}>
        {/* Page icon + title */}
        <div style={{ marginBottom: 6 }}>
          <span style={{ fontSize: 36, lineHeight: 1 }} aria-hidden="true">
            📄
          </span>
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: 4,
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 12, color: "#aeaeae" }}>{handle}</span>
          <span style={{ fontSize: 10, color: "#d0d0d0" }}>·</span>
          <span style={{ fontSize: 12, color: "#aeaeae" }}>{date}</span>
        </div>

        {/* Divider */}
        <div
          style={{ height: 1, background: "#e8e8e8", marginBottom: 20 }}
          aria-hidden="true"
        />

        {/* Callout block wrapping the canvas */}
        <div
          style={{
            background: "#fff8e6",
            border: "1px solid #f3e5b5",
            borderLeft: "4px solid #f0c040",
            borderRadius: 8,
            padding: "14px 16px",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <span
              style={{ fontSize: 18, lineHeight: 1, marginTop: 2 }}
              aria-hidden="true"
            >
              💡
            </span>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "#6b6b6b",
                lineHeight: 1.6,
              }}
            >
              Embedded visual from FrameOS. Designed to inspire.
            </p>
          </div>
          {/* Canvas embed */}
          <div
            style={{
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid #f3e5b5",
            }}
          >
            {children}
          </div>
        </div>

        {/* Fake paragraph blocks */}
        {[80, 65, 90, 50].map((w, i) => (
          <div
            key={i}
            style={{
              height: 10,
              borderRadius: 4,
              background: "#efefef",
              width: `${w}%`,
              marginBottom: 10,
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          background: "#f7f7f5",
          borderTop: "1px solid #e5e5e5",
          padding: "8px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 11, color: "#aeaeae" }}>Made with</span>
        <span style={{ fontSize: 11, color: "#6b6b6b", fontWeight: 600 }}>
          FrameOS
        </span>
      </div>
    </div>
  );
}
