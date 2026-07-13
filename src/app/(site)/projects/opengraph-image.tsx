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
      <>Selected{ogGradientSpan(" projects")}</>,
      <>&amp; case studies.</>,
    ],
    subtitle: "Premium websites by Marcos Suarez",
  });
}
