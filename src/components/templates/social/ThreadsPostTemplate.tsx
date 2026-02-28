import type { TemplateProps } from "../types";
import {
  ProfileAvatar,
  IconHeart,
  IconComment,
  IconRepeat,
  IconShare,
} from "./_shared";

/**
 * ThreadsPostTemplate
 * Inspired by short-form threaded post layout. Not affiliated with Meta/Threads.
 */
export default function ThreadsPostTemplate({
  children,
  socialData,
  canvasWidth,
}: TemplateProps) {
  const dark = socialData?.darkMode ?? false;

  const bg = dark ? "#101010" : "#ffffff";
  const text = dark ? "#f3f3f3" : "#1a1a1a";
  const sub = dark ? "#777777" : "#999999";
  const border = dark ? "#2a2a2a" : "#ebebeb";
  const icon = dark ? "#888888" : "#888888";

  const name = socialData?.displayName ?? "frameos.studio";
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
        width: canvasWidth != null ? canvasWidth + 82 : 480,
        fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Post row */}
      <div style={{ display: "flex", gap: 12 }}>
        {/* Left column: avatar + thread line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <ProfileAvatar imageUrl={imageUrl} displayName={name} size={38} />
          {/* Thread continuation line */}
          <div
            style={{
              width: 2,
              flex: 1,
              minHeight: 24,
              background: border,
              borderRadius: 1,
              marginTop: 6,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Right column: content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Name + timestamp */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 14, color: text }}>
              {name}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 13, color: sub }}>{timestamp}</span>
              <span
                style={{
                  color: sub,
                  fontSize: 18,
                  cursor: "default",
                  letterSpacing: 1,
                }}
                aria-hidden="true"
              >
                ···
              </span>
            </div>
          </div>
          <div style={{ fontSize: 12, color: sub, marginBottom: 10 }}>
            {handle}
          </div>

          {/* Attached image (QuoteCanvas) */}
          <div
            style={{
              borderRadius: 10,
              overflow: "hidden",
              marginBottom: 12,
              border: `1px solid ${border}`,
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Engagement row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          paddingLeft: 50,
          paddingTop: 4,
        }}
      >
        <button
          type="button"
          tabIndex={-1}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "default",
            color: sub,
            fontSize: 13,
            padding: 0,
          }}
          aria-label="Like"
        >
          <IconHeart color={icon} />
          <span>{likeCount}</span>
        </button>
        <button
          type="button"
          tabIndex={-1}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "default",
            color: sub,
            fontSize: 13,
            padding: 0,
          }}
          aria-label="Reply"
        >
          <IconComment color={icon} />
          <span>24</span>
        </button>
        <button
          type="button"
          tabIndex={-1}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "default",
            color: sub,
            fontSize: 13,
            padding: 0,
          }}
          aria-label="Repost"
        >
          <IconRepeat color={icon} />
        </button>
        <button
          type="button"
          tabIndex={-1}
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "default",
            color: sub,
            fontSize: 13,
            padding: 0,
          }}
          aria-label="Share"
        >
          <IconShare color={icon} />
        </button>
      </div>

      {/* Reply preview row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          paddingLeft: 6,
          marginTop: 14,
          paddingTop: 12,
          borderTop: `1px solid ${border}`,
        }}
      >
        <div style={{ display: "flex" }}>
          {["#a78bfa", "#6366f1", "#ec4899"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: c,
                border: `2px solid ${bg}`,
                marginLeft: i === 0 ? 0 : -6,
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 12, color: sub }}>
          Liked by <strong style={{ color: text }}>3 others</strong>
        </span>
      </div>
    </div>
  );
}
