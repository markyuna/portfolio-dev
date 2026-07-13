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
      <>I craft {ogGradientSpan("high-end")}</>,
      <>digital experiences.</>,
    ],
    subtitle: "Web Developer · Paris",
  });
}
