import type { TemplateProps } from "../types";
import { ProfileAvatar, IconHeart, IconComment, IconShare } from "./_shared";

/**
 * InstagramPostTemplate
 * Inspired by square photo-post layout. Not affiliated with Meta/Instagram.
 */
export default function InstagramPostTemplate({
  children,
  socialData,
}: TemplateProps) {
  const dark = socialData?.darkMode ?? false;

  const bg = dark ? "#121212" : "#ffffff";
  const text = dark ? "#f5f5f5" : "#000000";
  const sub = dark ? "#999999" : "#737373";
  const border = dark ? "#262626" : "#efefef";
  const icon = dark ? "#f5f5f5" : "#262626";

  const name = socialData?.displayName ?? "frameos_studio";
  const likeCount = socialData?.likeCount ?? "1,204";
  const caption =
    socialData?.caption ?? "Design smarter, share everything ✨ #FrameOS";
  const timestamp = socialData?.timestamp ?? "2 hours ago";
  const imageUrl = socialData?.profileImageUrl ?? null;

  return (
    <div
      style={{
        background: bg,
        width: 420,
        fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
        boxSizing: "border-box",
        border: `1px solid ${border}`,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 12px",
          gap: 10,
          borderBottom: `1px solid ${border}`,
        }}
      >
        {/* Avatar with gradient ring — platform-inspired, not exact */}
        <div
          style={{
            padding: 2,
            borderRadius: "50%",
            background:
              "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
          }}
        >
          <div style={{ background: bg, borderRadius: "50%", padding: 2 }}>
            <ProfileAvatar imageUrl={imageUrl} displayName={name} size={32} />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: text }}>
            {name}
          </div>
          <div style={{ fontSize: 11, color: sub }}>FrameOS Studio</div>
        </div>

        {/* More dots */}
        <span
          style={{
            color: text,
            fontSize: 20,
            letterSpacing: 2,
            cursor: "default",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          ···
        </span>
      </div>

      {/* Square post image (QuoteCanvas) — full bleed */}
      <div style={{ width: "100%", lineHeight: 0, overflow: "hidden" }}>
        {children}
      </div>

      {/* Action row */}
      <div
        style={{
          padding: "10px 12px 4px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <button
          type="button"
          tabIndex={-1}
          style={{
            background: "none",
            border: "none",
            cursor: "default",
            padding: 0,
            display: "flex",
          }}
          aria-label="Like"
        >
          <IconHeart color={icon} />
        </button>
        <button
          type="button"
          tabIndex={-1}
          style={{
            background: "none",
            border: "none",
            cursor: "default",
            padding: 0,
            display: "flex",
          }}
          aria-label="Comment"
        >
          <IconComment color={icon} />
        </button>
        <button
          type="button"
          tabIndex={-1}
          style={{
            background: "none",
            border: "none",
            cursor: "default",
            padding: 0,
            display: "flex",
          }}
          aria-label="Share"
        >
          <IconShare color={icon} />
        </button>

        {/* Bookmark (inline SVG) */}
        <div style={{ marginLeft: "auto" }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
              stroke={icon}
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Like count */}
      <div style={{ padding: "0 12px 6px" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: text }}>
          {likeCount} likes
        </span>
      </div>

      {/* Caption */}
      <div style={{ padding: "0 12px 6px", display: "flex", gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: text }}>
          {name}
        </span>
        <span
          style={
            {
              fontSize: 13,
              color: text,
              lineHeight: 1.4,
              flex: 1,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            } as React.CSSProperties
          }
        >
          {caption}
        </span>
      </div>

      {/* Timestamp */}
      <div style={{ padding: "0 12px 12px" }}>
        <span
          style={{
            fontSize: 11,
            color: sub,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {timestamp}
        </span>
      </div>
    </div>
  );
}
