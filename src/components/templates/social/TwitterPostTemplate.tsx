import type { TemplateProps } from "../types";
import {
  ProfileAvatar,
  IconComment,
  IconRepeat,
  IconHeart,
  IconShare,
} from "./_shared";

/**
 * TwitterPostTemplate
 * Inspired by microblogging post layout. Not affiliated with any brand.
 */
export default function TwitterPostTemplate({
  children,
  socialData,
  canvasWidth,
}: TemplateProps) {
  const dark = socialData?.darkMode ?? false;

  const bg = dark ? "#15202b" : "#ffffff";
  const text = dark ? "#e7e9ea" : "#0f1419";
  const sub = dark ? "#8b98a5" : "#536471";
  const border = dark ? "#38444d" : "#eff3f4";
  const iconCol = dark ? "#8b98a5" : "#536471";
  const hoverBg = dark ? "#1e2f3d" : "#f7f9f9";

  const name = socialData?.displayName ?? "FrameOS Studio";
  const handle = socialData?.handle ?? "@frameos";
  const timestamp = socialData?.timestamp ?? "2h";
  const likeCount = socialData?.likeCount ?? "1,204";
  const imageUrl = socialData?.profileImageUrl ?? null;

  return (
    <div
      style={{
        background: bg,
        borderRadius: 16,
        border: `1px solid ${border}`,
        padding: "16px 16px 12px",
        width: canvasWidth != null ? canvasWidth + 32 : 480,
        fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <ProfileAvatar imageUrl={imageUrl} displayName={name} size={42} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: text,
                lineHeight: 1.2,
              }}
            >
              {name}
            </span>
            {/* Custom verified badge — inspired, not official */}
            <span
              style={{
                width: 17,
                height: 17,
                borderRadius: "50%",
                background: "#1d9bf0",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                color: "#fff",
                fontWeight: 900,
                flexShrink: 0,
              }}
              aria-label="Verified"
            >
              ✓
            </span>
          </div>
          <span style={{ fontSize: 13, color: sub }}>
            {handle} · {timestamp}
          </span>
        </div>

        {/* More icon */}
        <span
          style={{
            color: sub,
            fontSize: 20,
            lineHeight: 1,
            cursor: "default",
            letterSpacing: 1,
          }}
          aria-hidden="true"
        >
          ···
        </span>
      </div>

      {/* Attached image (QuoteCanvas) */}
      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 12,
          border: `1px solid ${border}`,
          maxWidth: "100%",
        }}
      >
        <div style={{ display: "flex", maxWidth: "100%", overflow: "hidden" }}>
          {children}
        </div>
      </div>

      {/* Engagement row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "4px 0 0",
          borderTop: `1px solid ${border}`,
          paddingTop: 10,
        }}
      >
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: sub,
            fontSize: 13,
            background: "none",
            border: "none",
            cursor: "default",
            padding: 0,
          }}
          tabIndex={-1}
          aria-label="Reply"
        >
          <IconComment color={iconCol} />
          <span>24</span>
        </button>
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: sub,
            fontSize: 13,
            background: "none",
            border: "none",
            cursor: "default",
            padding: 0,
          }}
          tabIndex={-1}
          aria-label="Repost"
        >
          <IconRepeat color={iconCol} />
          <span>89</span>
        </button>
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: sub,
            fontSize: 13,
            background: "none",
            border: "none",
            cursor: "default",
            padding: 0,
          }}
          tabIndex={-1}
          aria-label={`${likeCount} likes`}
        >
          <IconHeart color={iconCol} />
          <span>{likeCount}</span>
        </button>
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: sub,
            fontSize: 13,
            background: "none",
            border: "none",
            cursor: "default",
            padding: 0,
            marginLeft: "auto",
          }}
          tabIndex={-1}
          aria-label="Share"
        >
          <IconShare color={iconCol} />
        </button>
      </div>

      {/* Bottom branding bar */}
      <div
        style={{
          background: hoverBg,
          borderRadius: 10,
          padding: "8px 12px",
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 12, color: sub, fontWeight: 600 }}>
          via FrameOS
        </span>
        <span style={{ fontSize: 11, color: sub }}>frameos.app</span>
      </div>
    </div>
  );
}
