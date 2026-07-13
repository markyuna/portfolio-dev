import {
  ogGradientSpan,
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    lines: [
      <>Let&apos;s build something</>,
      <>{ogGradientSpan("exceptional")}.</>,
    ],
    subtitle: "Get in touch — Marcos Suarez",
  });
}
