import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background:
            "radial-gradient(circle at top left, #312e81 0%, #0f172a 45%, #020617 100%)",
          color: "#f8fafc",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#fcd34d",
            marginBottom: 20,
            letterSpacing: 2,
          }}
        >
          AI + SOFTWARE ENGINEERING
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
          Nidesh Kaarthik R S
        </div>
        <div style={{ fontSize: 32, marginTop: 24, color: "#cbd5e1" }}>
          Projects, Writing, and Product-first Builds
        </div>
      </div>
    ),
    size,
  );
}
