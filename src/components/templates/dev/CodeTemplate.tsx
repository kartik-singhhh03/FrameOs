/**
 * CodeTemplate.tsx
 * VS Code–inspired code editor window with inline syntax highlighting.
 * Respects the aspect-ratio wrapper and the export pipeline.
 * Purely synchronous — no dynamic imports, no font-loading races.
 */
import { memo, useMemo } from "react";
import type { TemplateProps } from "../types";
import type { DevData } from "./devTypes";
import { tokenize, EDITOR_COLORS } from "./syntaxHighlight";

const C = EDITOR_COLORS;
const DOT_COLORS = C.dot;

const MONO =
  '"JetBrains Mono","Fira Code","Cascadia Code","Courier New",monospace';

interface CodeTemplateProps extends TemplateProps {
  devData?: DevData;
  canvasWidth?: number;
  canvasHeight?: number;
}

function CodeTemplate({
  devData,
  canvasWidth,
  canvasHeight,
}: CodeTemplateProps) {
  const code = devData?.code ?? "";
  const language = devData?.language ?? "tsx";
  const filename = devData?.filename ?? "snippet.ts";
  const showLineNumbers = devData?.showLineNumbers ?? true;
  const showMacHeader = devData?.showMacHeader ?? true;

  const tokenLines = useMemo(() => tokenize(code, language), [code, language]);

  const w = canvasWidth ?? 540;
  const h = canvasHeight ?? Math.round(w * (16 / 9));

  return (
    <div
      style={{
        width: w,
        height: h,
        background: C.bg,
        borderRadius: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: MONO,
        fontSize: 13,
        lineHeight: "1.65",
        boxSizing: "border-box",
      }}
    >
      {/* ── Title bar ─────────────────────────────────── */}
      {showMacHeader && (
        <div
          style={{
            background: C.titleBar,
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 0,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: 7, marginRight: 14 }}>
            {DOT_COLORS.map((dc, i) => (
              <div
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: dc,
                }}
                aria-hidden="true"
              />
            ))}
          </div>
          {/* Active tab */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: C.bg,
              borderRadius: "6px 6px 0 0",
              padding: "4px 14px 5px",
              fontSize: 12,
              color: "#cdd6f4",
            }}
          >
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
              <path
                d="M9 1v3h3"
                stroke="#7f849c"
                strokeWidth="1.2"
                fill="none"
              />
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
      )}

      {/* ── Editor body ──────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Line numbers */}
        {showLineNumbers && (
          <div
            aria-hidden="true"
            style={{
              padding: "16px 0",
              minWidth: 44,
              textAlign: "right",
              color: C.lineNum,
              userSelect: "none",
              fontSize: 12,
              flexShrink: 0,
            }}
          >
            {tokenLines.map((_, i) => (
              <div key={i} style={{ paddingRight: 14, lineHeight: "1.65" }}>
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Code */}
        <div
          style={{
            flex: 1,
            padding: "16px 20px 16px 0",
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "pre",
          }}
        >
          {tokenLines.map((tokens, li) => (
            <div key={li} style={{ lineHeight: "1.65", minHeight: "1.65em" }}>
              {tokens.map((tok, ti) => (
                <span key={ti} style={{ color: tok.color }}>
                  {tok.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Status bar ──────────────────────────────────── */}
      <div
        style={{
          height: 22,
          background: C.cursor,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: 16,
          flexShrink: 0,
          fontSize: 11,
          color: "rgba(255,255,255,0.85)",
          letterSpacing: "0.02em",
        }}
      >
        <span>⎇ main</span>
        <span style={{ marginLeft: "auto" }}>{language.toUpperCase()}</span>
        <span>{tokenLines.length} lines</span>
      </div>
    </div>
  );
}

export default memo(CodeTemplate);
