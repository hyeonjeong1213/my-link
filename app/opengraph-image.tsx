import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage: "linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 50%, #f8fafc 100%)",
          position: "relative",
        }}
      >
        {/* Content Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 100px",
            background: "white",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            borderRadius: "64px",
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              letterSpacing: "0.2em",
              color: "#111827",
              marginBottom: 40,
            }}
          >
            M Y L I N K
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "#4b5563",
              marginBottom: 60,
            }}
          >
            단 하나의 링크로 나를 표현하세요
          </div>
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 64px",
              background: "#111827",
              color: "white",
              fontSize: 28,
              fontWeight: 700,
              borderRadius: "32px",
            }}
          >
            무료로 시작하기
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
