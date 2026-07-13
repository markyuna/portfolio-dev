import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
