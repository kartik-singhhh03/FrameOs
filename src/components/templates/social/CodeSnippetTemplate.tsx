import type { TemplateProps } from "../types";

/**
 * CodeSnippetTemplate
 * VS Code–inspired code editor window wrapping the canvas as an embedded screenshot.
 */
export default function CodeSnippetTemplate({
  children,
  socialData,
  canvasWidth,
}: TemplateProps) {
  const filename = socialData?.filename ?? "quote.md";
  const language = filename.split(".").pop() ?? "md";

  // Editor line "decorations" (fake dimmed text lines around the screenshot)
  const fakeLines = [
    { n: 1, code: "const frame = (", color: "#c792ea" },
    { n: 2, code: "  quote: string,", color: "#82aaff" },
    { n: 3, code: "  author: string,", color: "#82aaff" },
    { n: 4, code: "): FrameOS => ({", color: "#c792ea" },
    { n: 5, code: "", color: "transparent" },
  ];
  const afterLines = [
    { n: 10, code: "});", color: "#c792ea" },
    { n: 11, code: "", color: "transparent" },
    { n: 12, code: "// ✦ Made with FrameOS", color: "#546e7a" },
  ];

  const lineNumColor = "#444f5c";

  const DOT_COLORS = ["#ff5f57", "#febc2e", "#28c840"];

  return (
    <div
      style={{
        background: "#1e1e2e",
        borderRadius: 14,
        overflow: "hidden",
        width: canvasWidth ?? 540,
        fontFamily: '"JetBrains Mono","Fira Code","Cascadia Code",monospace',
        fontSize: 13,
        lineHeight: "1.7",
        boxShadow: "0 8px 40px 0 rgba(0,0,0,0.55)",
        boxSizing: "border-box",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: "#13131f",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 0,
          position: "relative",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 7, marginRight: 16 }}>
          {DOT_COLORS.map((c, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: c,
              }}
              aria-hidden="true"
            />
          ))}
        </div>
        {/* Filename tab */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#1e1e2e",
            borderRadius: "6px 6px 0 0",
            padding: "4px 14px 5px",
            fontSize: 12,
            color: "#cdd6f4",
          }}
        >
          {/* File icon */}
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 1h7l3 3v11H2V1z"
              stroke="#7f849c"
              strokeWidth="1.2"
              fill="none"
            />
            <path d="M9 1v3h3" stroke="#7f849c" strokeWidth="1.2" fill="none" />
          </svg>
          <span>{filename}</span>
        </div>
        {/* Language badge */}
        <div
          style={{
            marginLeft: "auto",
            fontSize: 11,
            color: "#6272a4",
            letterSpacing: "0.04em",
          }}
        >
          {language.toUpperCase()}
        </div>
      </div>

      {/* Editor body */}
      <div style={{ display: "flex", background: "#1e1e2e" }}>
        {/* Line numbers column */}
        <div
          style={{
            padding: "14px 0",
            minWidth: 40,
            textAlign: "right",
            color: lineNumColor,
            userSelect: "none",
            background: "#1e1e2e",
            fontSize: 12,
          }}
          aria-hidden="true"
        >
          {[
            ...fakeLines,
            { n: 6, code: "", color: "" },
            { n: 7, code: "", color: "" },
            { n: 8, code: "", color: "" },
            { n: 9, code: "", color: "" },
            ...afterLines,
          ].map((l) => (
            <div key={l.n} style={{ paddingRight: 14, lineHeight: "1.7" }}>
              {l.n}
            </div>
          ))}
        </div>

        {/* Code + embed column */}
        <div
          style={{ flex: 1, padding: "14px 20px 14px 0", overflow: "hidden" }}
        >
          {/* Fake lines before */}
          {fakeLines.map((l) => (
            <div
              key={l.n}
              style={{ color: l.color, lineHeight: "1.7", whiteSpace: "pre" }}
            >
              {l.code}
            </div>
          ))}

          {/* Embedded screenshot (QuoteCanvas) */}
          <div
            style={{
              borderRadius: 8,
              overflow: "hidden",
              display: "inline-block",
              width: "100%",
              boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
              margin: "4px 0",
              border: "1px solid #313244",
            }}
          >
            {children}
          </div>

          {/* Fake lines after */}
          {afterLines.map((l) => (
            <div
              key={l.n}
              style={{ color: l.color, lineHeight: "1.7", whiteSpace: "pre" }}
            >
              {l.code}
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div
        style={{
          background: "#6c6ef2",
          padding: "2px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#e0e0ff",
        }}
        aria-hidden="true"
      >
        <span>FrameOS</span>
        <span>{language.toUpperCase()} · UTF-8 · LF</span>
      </div>
    </div>
  );
}
