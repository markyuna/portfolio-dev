// src/app/(site)/projects/page.tsx

import type { Metadata } from "next";
import ProjectsSection from "@/components/sections/ProjectsSection";

const title = "Projects";
const description =
  "Selected projects by Marcos Suarez — premium websites, interactive experiences and modern web applications built with Next.js, Tailwind CSS and Framer Motion.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    url: "/projects",
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <ProjectsSection />
    </main>
  );
}