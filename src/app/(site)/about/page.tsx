import type { Metadata } from "next";
import AboutPageContent from "@/components/sections/AboutPageContent";

const title = "About";
const description =
  "Marcos Suarez is a web developer based in Paris building modern, responsive and polished websites with Next.js, Tailwind CSS and motion-driven interfaces.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "/about",
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
