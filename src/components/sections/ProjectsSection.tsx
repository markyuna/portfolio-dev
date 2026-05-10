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
    title: "DND Conseil",
    subtitle: "Renovation consulting platform",
    category: "Construction consulting website",
    description:
      "A premium website for a building renovation consulting service, designed with elegant visuals, conversion-focused sections and a structured quote request journey.",
    image: "/images/projects/dnd-conseil.png",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Supabase"],
    url: "https://dnd-conseils.vercel.app/",
    metrics: ["Quote request flow", "Premium service positioning", "Admin lead management"],
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isReversed = index % 2 === 1;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), {
    stiffness: 140,
    damping: 24,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), {
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
      className="group relative overflow-hidden rounded-[2rem] border border-indigo-200/70 bg-[#f6f3ff] shadow-[0_28px_120px_rgba(79,70,229,0.16)] transition duration-500 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(124,58,237,0.16),transparent_34%)] before:opacity-0 before:transition before:duration-500 hover:-translate-y-1 hover:border-violet-300/70 hover:before:opacity-100 md:rounded-[2.5rem]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.9),transparent_34%),radial-gradient(circle_at_100%_100%,rgba(99,102,241,0.14),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />

      <div className="relative grid min-h-[620px] lg:grid-cols-2">
        <ProjectVisual project={project} isReversed={isReversed} />
        <ProjectContent project={project} index={index} isReversed={isReversed} />
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
      className={`relative flex min-h-[340px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,0.18),transparent_36%),linear-gradient(135deg,#f8fbff,#eef2ff_48%,#ddd6fe)] p-6 md:min-h-[460px] md:p-10 lg:min-h-full ${
        isReversed ? "lg:order-2" : ""
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.72),transparent)] opacity-0 transition duration-1000 group-hover:translate-x-full group-hover:opacity-100" />

      <div className="absolute left-8 top-8 rounded-full border border-indigo-200/70 bg-white/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-indigo-700 shadow-sm backdrop-blur-xl">
        Live project
      </div>

      <motion.div
        style={{ transform: "translateZ(42px)" }}
        className="relative w-full max-w-[720px]"
      >
        <div className="absolute -inset-8 rounded-[2rem] bg-violet-400/20 blur-3xl opacity-70 transition duration-700 group-hover:opacity-100" />

        <div className="relative overflow-hidden rounded-[1.8rem] border border-indigo-200/70 bg-white/65 p-2 shadow-2xl shadow-indigo-950/15 backdrop-blur-xl">
          <Image
            src={project.image}
            alt={`${project.title} website preview`}
            width={1200}
            height={800}
            className="h-auto w-full rounded-[1.35rem] object-cover transition duration-700 group-hover:scale-[1.035]"
            priority={false}
          />

          <div className="pointer-events-none absolute inset-2 rounded-[1.35rem] ring-1 ring-indigo-200/70" />
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
      className={`relative flex min-h-[480px] flex-col justify-between border-indigo-200/70 bg-white/35 p-7 md:p-10 lg:p-12 ${
        isReversed ? "lg:border-r" : "lg:border-l"
      }`}
    >
      <div>
        <div className="mb-10 flex items-start justify-between gap-6">
          <p className="max-w-[280px] text-[11px] font-semibold uppercase tracking-[0.36em] text-violet-600">
            {project.category}
          </p>

          <span className="font-mono text-sm text-indigo-300">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mb-4 text-sm text-zinc-500">{project.subtitle}</p>

        <h3 className="max-w-2xl text-4xl font-semibold tracking-[-0.065em] text-zinc-950 md:text-5xl lg:text-6xl">
          {project.title}
        </h3>

        <p className="mt-7 max-w-xl text-base leading-8 text-zinc-600">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-indigo-200/70 bg-white/60 px-3 py-1.5 text-xs font-medium text-zinc-700 backdrop-blur transition duration-300 group-hover:border-violet-300/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <ul className="mt-9 grid gap-3 border-t border-indigo-200/70 pt-7 text-sm text-zinc-600">
          {project.metrics.map((metric) => (
            <li key={metric} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500 shadow-[0_0_18px_rgba(124,58,237,0.65)]" />
              {metric}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03] hover:bg-violet-600"
      >
        View case study
        <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#f4f7ff] py-28 text-zinc-950 md:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_6%,rgba(99,102,241,0.18),transparent_34%),radial-gradient(circle_at_85%_90%,rgba(168,85,247,0.14),transparent_36%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(79,70,229,0.08)_1px,transparent_1px),linear-gradient(to_right,rgba(79,70,229,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.18]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/40 bg-white/60 px-4 py-2 text-sm text-zinc-700 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Selected work
            </div>

            <h2 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-zinc-950 md:text-7xl">
              Digital work with{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                cinematic depth.
              </span>
            </h2>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-zinc-600 lg:justify-self-end">
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