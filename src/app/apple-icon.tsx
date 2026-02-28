import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        borderRadius: 40,
        background: "#252C25",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: 100,
          height: 100,
          gap: 10,
        }}
      >
        <div
          style={{
            width: 45,
            height: 45,
            borderRadius: 10,
            background: "white",
          }}
        />
        <div
          style={{
            width: 45,
            height: 45,
            borderRadius: 10,
            background: "rgba(255,255,255,0.65)",
          }}
        />
        <div
          style={{
            width: 45,
            height: 45,
            borderRadius: 10,
            background: "rgba(255,255,255,0.65)",
          }}
        />
        <div
          style={{
            width: 45,
            height: 45,
            borderRadius: 10,
            background: "rgba(255,255,255,0.4)",
          }}
        />
      </div>
    </div>,
    { ...size },
  );
}
