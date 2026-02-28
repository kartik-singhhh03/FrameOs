import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: "#252C25",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 2x2 grid of squares — FrameOS logo */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: 18,
          height: 18,
          gap: 2,
        }}
      >
        <div
          style={{ width: 8, height: 8, borderRadius: 2, background: "white" }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 2,
            background: "rgba(255,255,255,0.65)",
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 2,
            background: "rgba(255,255,255,0.65)",
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 2,
            background: "rgba(255,255,255,0.4)",
          }}
        />
      </div>
    </div>,
    { ...size },
  );
}
