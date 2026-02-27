import type { TemplateProps } from "../types";
import {
  ProfileAvatar,
  IconThumbUp,
  IconComment,
  IconRepeat,
  IconSend,
} from "./_shared";

/**
 * LinkedInPostTemplate
 * Inspired by professional network post layout. Not affiliated with LinkedIn.
 */
export default function LinkedInPostTemplate({
  children,
  socialData,
}: TemplateProps) {
  const dark = socialData?.darkMode ?? false;

  const bg = dark ? "#1b1f23" : "#ffffff";
  const card = dark ? "#252a2e" : "#f3f2ef";
  const text = dark ? "#e9e5df" : "#000000";
  const sub = dark ? "#a0a8a0" : "#666666";
  const border = dark ? "#38444d" : "#e0e0e0";
  const accent = "#0a66c2";
  const icon = dark ? "#a0a8a0" : "#666666";

  const name = socialData?.displayName ?? "FrameOS Studio";
  const designation = socialData?.designation ?? "Design Tools · Creator";
  const handle = socialData?.handle ?? "@frameos";
  const timestamp = socialData?.timestamp ?? "2h";
  const likeCount = socialData?.likeCount ?? "1,204";
  const imageUrl = socialData?.profileImageUrl ?? null;

  return (
    <div
      style={{
        background: bg,
        borderRadius: 8,
        border: `1px solid ${border}`,
        width: 500,
        fontFamily: '"Inter","Helvetica Neue",Arial,sans-serif',
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ padding: "16px 16px 12px", display: "flex", gap: 10 }}>
        <ProfileAvatar
          imageUrl={imageUrl}
          displayName={name}
          size={48}
          style={{ borderRadius: "50%", border: `2px solid ${border}` }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: accent,
                cursor: "default",
              }}
            >
              {name}
            </span>
            <span
              style={{
                fontSize: 11,
                color: sub,
                background: card,
                borderRadius: 4,
                padding: "1px 6px",
                fontWeight: 600,
                border: `1px solid ${border}`,
              }}
            >
              1st
            </span>
          </div>
          <div
            style={{ fontSize: 12, color: sub, marginTop: 1, lineHeight: 1.4 }}
          >
            {designation}
          </div>
          <div style={{ fontSize: 11, color: sub, marginTop: 2 }}>
            {timestamp} · {handle}
          </div>
        </div>

        {/* Follow button */}
        <button
          type="button"
          tabIndex={-1}
          style={{
            alignSelf: "flex-start",
            color: accent,
            border: `1px solid ${accent}`,
            background: "transparent",
            borderRadius: 16,
            padding: "4px 14px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "default",
            flexShrink: 0,
          }}
        >
          + Follow
        </button>
      </div>

      {/* Attached image (QuoteCanvas) */}
      <div style={{ width: "100%", overflow: "hidden" }}>{children}</div>

      {/* Reaction count row */}
      <div
        style={{
          padding: "8px 16px 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 12, color: sub }}>👍 ❤️ 💡</span>
          <span style={{ fontSize: 12, color: sub }}>{likeCount}</span>
        </div>
        <span style={{ fontSize: 12, color: sub }}>42 comments</span>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: border, margin: "4px 16px" }} />

      {/* Action buttons */}
      <div
        style={{
          padding: "4px 0 8px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {[
          { icon: <IconThumbUp color={icon} />, label: "Like" },
          { icon: <IconComment color={icon} />, label: "Comment" },
          { icon: <IconRepeat color={icon} />, label: "Repost" },
          { icon: <IconSend color={icon} />, label: "Send" },
        ].map(({ icon: ic, label }) => (
          <button
            key={label}
            type="button"
            tabIndex={-1}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "default",
              padding: "6px 16px",
              borderRadius: 4,
              color: sub,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {ic}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
