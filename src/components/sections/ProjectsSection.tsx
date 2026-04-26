// src/components/sections/ProjectsSection.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const projects = [
  {
    title: "France Courtier",
    subtitle: "High-end financial platform",
    category: "Premium business website",
    description:
      "A refined financial services website with animated sections, lead generation flow and a high-end visual identity.",
    image: "/images/projects/france-courtier.png",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Supabase"],
    url: "https://francecourtier-site.vercel.app",
    metrics: ["Lead generation flow", "Premium UI system", "Admin-ready backend"],
  },
  {
    title: "Marcos Papermache",
    subtitle: "AI-powered art experience",
    category: "Art & e-commerce experience",
    description:
      "A creative website for handmade paper-mâché sculptures, with multilingual content and custom AI image generation experience.",
    image: "/images/projects/marcos-papermache.png",
    tags: ["Next.js", "AI", "Supabase", "Vercel"],
    url: "https://www.marcospapermache.com",
    metrics: ["AI creation journey", "Multilingual content", "Premium art direction"],
  },
  {
    title: "Quizmify",
    subtitle: "Interactive learning system",
    category: "Interactive quiz app",
    description:
      "A modern quiz experience focused on clean interactions, dynamic content and playful user engagement.",
    image: "/images/projects/quizmify.png",
    tags: ["React", "Next.js", "UI Design"],
    url: "https://quizmify-two.vercel.app/",
    metrics: ["Interactive UI", "Clean game logic", "Responsive experience"],
  },
];

type Project = (typeof projects)[number];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isReversed = index % 2 === 1;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2.5, -2.5]), {
    stiffness: 140,
    damping: 24,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]), {
    stiffness: 140,
    damping: 24,
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 64, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();

        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);

        event.currentTarget.style.setProperty(
          "--x",
          `${event.clientX - rect.left}px`,
        );
        event.currentTarget.style.setProperty(
          "--y",
          `${event.clientY - rect.top}px`,
        );
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0c] shadow-[0_28px_120px_rgba(0,0,0,0.55)] transition duration-500 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.13),transparent_34%)] before:opacity-0 before:transition before:duration-500 hover:-translate-y-1 hover:border-orange-300/35 hover:before:opacity-100 md:rounded-[2.5rem]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.06),transparent_32%),radial-gradient(circle_at_100%_100%,rgba(249,115,22,0.16),transparent_34%)]" />

      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative grid min-h-[620px] lg:grid-cols-2">
        <ProjectVisual project={project} isReversed={isReversed} />

        <ProjectContent
          project={project}
          index={index}
          isReversed={isReversed}
        />
      </div>
    </motion.article>
  );
}

function ProjectVisual({
  project,
  isReversed,
}: {
  project: Project;
  isReversed: boolean;
}) {
  return (
    <div
      className={`relative flex min-h-[340px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(249,115,22,0.22),transparent_34%),linear-gradient(135deg,#030303,#09090b_45%,rgba(67,20,7,0.55))] p-6 md:min-h-[460px] md:p-10 lg:min-h-full ${
        isReversed ? "lg:order-2" : ""
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.11),transparent)] opacity-0 transition duration-1000 group-hover:translate-x-full group-hover:opacity-100" />

      <div className="absolute left-8 top-8 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 backdrop-blur-xl">
        Live project
      </div>

      <motion.div
        style={{ transform: "translateZ(42px)" }}
        className="relative w-full max-w-[720px]"
      >
        <div className="absolute -inset-8 rounded-[2rem] bg-orange-500/15 blur-3xl opacity-60 transition duration-700 group-hover:opacity-100" />

        <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/70 backdrop-blur-xl">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={800}
            className="h-auto w-full rounded-[1.35rem] object-cover transition duration-700 group-hover:scale-[1.035]"
            priority={false}
          />

          <div className="pointer-events-none absolute inset-2 rounded-[1.35rem] ring-1 ring-white/10" />
        </div>
      </motion.div>
    </div>
  );
}

function ProjectContent({
  project,
  index,
  isReversed,
}: {
  project: Project;
  index: number;
  isReversed: boolean;
}) {
  return (
    <div
      className={`relative flex min-h-[480px] flex-col justify-between border-white/10 bg-white/[0.018] p-7 md:p-10 lg:p-12 ${
        isReversed ? "lg:border-r" : "lg:border-l"
      }`}
    >
      <div>
        <div className="mb-10 flex items-start justify-between gap-6">
          <p className="max-w-[280px] text-[11px] font-semibold uppercase tracking-[0.36em] text-orange-300">
            {project.category}
          </p>

          <span className="font-mono text-sm text-zinc-600">
            0{index + 1}
          </span>
        </div>

        <p className="mb-4 text-sm text-zinc-500">{project.subtitle}</p>

        <h3 className="max-w-2xl text-4xl font-semibold tracking-[-0.065em] text-white md:text-5xl lg:text-6xl">
          {project.title}
        </h3>

        <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur transition duration-300 group-hover:border-orange-300/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <ul className="mt-9 grid gap-3 border-t border-white/10 pt-7 text-sm text-zinc-400">
          {project.metrics.map((metric) => (
            <li key={metric} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-300 shadow-[0_0_18px_rgba(251,146,60,0.9)]" />
              {metric}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition duration-300 hover:scale-[1.03] hover:bg-orange-400 hover:text-white"
      >
        View case study
        <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#070707] py-28 text-white md:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(249,115,22,0.24),transparent_30%),radial-gradient(circle_at_80%_90%,rgba(245,158,11,0.13),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-zinc-300 shadow-2xl shadow-orange-500/10 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-orange-300" />
              Selected work
            </div>

            <h2 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl">
              Digital work with{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-100 bg-clip-text text-transparent">
                cinematic depth.
              </span>
            </h2>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-zinc-400 lg:justify-self-end">
            Premium interfaces, immersive motion, clean engineering and
            business-focused experiences crafted to feel sharp, modern and
            memorable.
          </p>
        </motion.div>

        <div className="grid gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}