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
      <>Web{ogGradientSpan(" developer")}</>,
      <>&amp; designer.</>,
    ],
    subtitle: "About Marcos Suarez — Paris",
  });
}
