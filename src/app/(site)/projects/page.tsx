// src/app/(site)/projects/page.tsx

import ProjectsSection from "@/components/sections/ProjectsSection";

export const metadata = {
  title: "Projects | Marcos Suarez",
  description:
    "Selected projects by Marcos Suarez — premium websites, interactive experiences and modern web applications.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <ProjectsSection />
    </main>
  );
}