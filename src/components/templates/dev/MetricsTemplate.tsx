/**
 * MetricsTemplate.tsx
 * Build-in-public milestone announcement — rendered as an OVERLAY on top of
 * the standard canvas (which provides the background colour/gradient).
 *
 * quoteCanvasJsx is rendered as `children`; this component absolutely
 * positions the metric content on top of it, visually replacing the quote text.
 */
import { memo } from "react";
import type { TemplateProps } from "../types";
import type { DevData } from "./devTypes";

interface MetricsTemplateProps extends TemplateProps {
  devData?: DevData;
  canvasWidth?: number;
  canvasHeight?: number;
}

function MetricsTemplate({
  devData,
  canvasWidth,
  canvasHeight,
}: MetricsTemplateProps) {
  const value = devData?.metricValue ?? "100";
  const label = devData?.metricLabel ?? "Users";
  const subtext = devData?.metricSubtext ?? "in 14 days since launch";
  const badge = devData?.metricBadge ?? "";

  const w = canvasWidth ?? 420;
  const h = canvasHeight ?? w;

  // Scale typography proportionally to canvas size
  const scaleFactor = w / 420;
  const valueFontSize = Math.round(
    Math.min(
      120,
      Math.max(48, 110 * scaleFactor * (4 / Math.max(4, value.length))),
    ),
  );
  const labelFontSize = Math.round(28 * scaleFactor);
  const subtextFontSize = Math.round(15 * scaleFactor);
  const badgeFontSize = Math.round(13 * scaleFactor);

  return (
    <div
      style={{
        width: w,
        height: h,
        background: "inherit", // inherits canvas background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: `${Math.round(40 * scaleFactor)}px`,
        boxSizing: "border-box",
        gap: Math.round(8 * scaleFactor),
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Optional badge */}
      {badge && (
        <div
          style={{
            fontSize: badgeFontSize,
            color: "rgba(255,255,255,0.55)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 999,
            padding: `${Math.round(4 * scaleFactor)}px ${Math.round(14 * scaleFactor)}px`,
            letterSpacing: "0.04em",
            marginBottom: Math.round(8 * scaleFactor),
            fontFamily: '"Inter","DM Sans",sans-serif',
            fontWeight: 500,
          }}
        >
          {badge}
        </div>
      )}

      {/* Big number */}
      <div
        style={{
          fontSize: valueFontSize,
          fontWeight: 900,
          color: "#ffffff",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          fontFamily: '"Inter","DM Sans","Outfit",sans-serif',
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: labelFontSize,
          fontWeight: 700,
          color: "rgba(255,255,255,0.92)",
          letterSpacing: "-0.01em",
          fontFamily: '"Inter","DM Sans","Outfit",sans-serif',
          marginTop: Math.round(4 * scaleFactor),
        }}
      >
        {label}
      </div>

      {/* Subtext */}
      {subtext && (
        <div
          style={{
            fontSize: subtextFontSize,
            fontWeight: 400,
            color: "rgba(255,255,255,0.50)",
            letterSpacing: "0.01em",
            fontFamily: '"Inter","DM Sans","Outfit",sans-serif',
            maxWidth: "80%",
            lineHeight: 1.5,
            marginTop: Math.round(4 * scaleFactor),
          }}
        >
          {subtext}
        </div>
      )}

      {/* Subtle rule */}
      <div
        style={{
          position: "absolute",
          bottom: Math.round(32 * scaleFactor),
          left: "50%",
          transform: "translateX(-50%)",
          width: Math.round(40 * scaleFactor),
          height: 2,
          background: "rgba(255,255,255,0.15)",
          borderRadius: 2,
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export default memo(MetricsTemplate);
