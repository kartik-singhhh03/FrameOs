/**
 * TerminalTemplate.tsx
 * Fake macOS-style terminal screenshot.
 * Monospace font, optional green accent text, optional traffic-light header.
 */
import { memo } from "react";
import type { TemplateProps } from "../types";
import type { DevData } from "./devTypes";

const MONO =
  '"JetBrains Mono","Fira Code","Cascadia Code","Courier New",monospace';
const DOT_COLORS = ["#ff5f57", "#febc2e", "#28c840"];

interface TerminalTemplateProps extends TemplateProps {
  devData?: DevData;
  canvasWidth?: number;
  canvasHeight?: number;
}

function TerminalTemplate({
  devData,
  canvasWidth,
  canvasHeight,
}: TerminalTemplateProps) {
  const rawLines = (devData?.terminalLines ?? "").split("\n");
  const prompt = devData?.prompt ?? "$";
  const showHeader = devData?.showTerminalHeader ?? true;
  const accentColor = devData?.terminalAccentColor ?? "#22c55e";

  const w = canvasWidth ?? 540;
  const h = canvasHeight ?? Math.round(w * (9 / 16));

  // Decide if a line is a "result" (no prompt) or "command" (first line of each group)
  // We treat non-blank lines that start with a checkmark/bullet/symbol as output
  const classify = (line: string): "prompt" | "success" | "error" | "plain" => {
    const trimmed = line.trim();
    if (trimmed.startsWith("✓") || trimmed.startsWith("✔")) return "success";
    if (
      trimmed.startsWith("✗") ||
      trimmed.startsWith("✘") ||
      trimmed.toLowerCase().startsWith("error")
    )
      return "error";
    if (trimmed === "") return "plain";
    // Heuristic: if previous line had prompt, this is a command
    return "plain";
  };

  return (
    <div
      style={{
        width: w,
        height: h,
        background: "#0d0d0d",
        borderRadius: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: MONO,
        fontSize: 13,
        lineHeight: "1.7",
        boxSizing: "border-box",
      }}
    >
      {/* ── Title bar ─────────────────────────────── */}
      {showHeader && (
        <div
          style={{
            background: "#1a1a1a",
            borderBottom: "1px solid #2a2a2a",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: 7 }}>
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
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 12,
              color: "#888",
              letterSpacing: "0.02em",
            }}
          >
            zsh — 80×24
          </div>
        </div>
      )}

      {/* ── Terminal body ────────────────────────────── */}
      <div
        style={{
          flex: 1,
          padding: "18px 22px",
          overflowY: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 0,
        }}
      >
        {rawLines.map((line, i) => {
          const trimmed = line.trim();
          const kind = classify(line);
          const isCmdLine =
            i === 0 || (rawLines[i - 1]?.trim() === "" && trimmed !== "");
          const isCommand = isCmdLine && kind === "plain";

          let textColor = "#d4d4d4";
          if (kind === "success") textColor = accentColor;
          if (kind === "error") textColor = "#f87171";
          if (isCommand) textColor = "#ffffff";

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 6,
                lineHeight: "1.7",
                minHeight: trimmed === "" ? "0.85em" : undefined,
              }}
            >
              {isCommand && (
                <span
                  style={{
                    color: accentColor,
                    userSelect: "none",
                    flexShrink: 0,
                  }}
                >
                  {prompt}
                </span>
              )}
              <span
                style={{
                  color: textColor,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
              >
                {line}
              </span>
            </div>
          );
        })}

        {/* Blinking cursor */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 2,
          }}
        >
          <span style={{ color: accentColor }}>{prompt}</span>
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 15,
              background: accentColor,
              opacity: 0.85,
              verticalAlign: "middle",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(TerminalTemplate);
