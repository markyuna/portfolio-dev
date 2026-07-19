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
    lines: [<>Démarrer {ogGradientSpan("un projet")}.</>],
    subtitle: "Estimation indicative — Marcos Suarez",
  });
}
