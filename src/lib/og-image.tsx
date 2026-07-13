import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/seo";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function renderOgImage({
  lines,
  subtitle,
}: {
  lines: ReactNode[];
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#070707",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(99,102,241,0.35), transparent 40%), radial-gradient(circle at 85% 85%, rgba(168,85,247,0.3), transparent 40%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            fontWeight: 700,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          {SITE_NAME}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -2,
            color: "#ffffff",
          }}
        >
          {lines.map((line, index) => (
            <div key={index} style={{ display: "flex" }}>
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 32,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}

export function ogGradientSpan(text: string) {
  return (
    <span
      style={{
        backgroundImage: "linear-gradient(90deg, #818cf8, #a78bfa, #e879f9)",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {text}
    </span>
  );
}
