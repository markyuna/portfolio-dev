"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const projects = [
  {
    title: "France Courtier",
    category: "Premium business website",
    description:
      "A refined financial services website with animated sections, lead generation flow and a high-end visual identity.",
    image: "/images/projects/france-courtier.png",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Supabase"],
    url: "https://francecourtier.fr",
    featured: true,
    metrics: ["Lead generation flow", "Premium UI system", "Admin-ready backend"],
  },
  {
    title: "Marcos Papermache",
    category: "Art & e-commerce experience",
    description:
      "A creative website for handmade paper-mâché sculptures, with multilingual content and custom AI image generation experience.",
    image: "/images/projects/marcos-papermache.png",
    tags: ["Next.js", "AI", "Supabase", "Vercel"],
    url: "https://www.marcospapermache.com",
    featured: false,
    metrics: ["AI creation journey", "Multilingual content", "Premium art direction"],
  },
  {
    title: "Quizmify",
    category: "Interactive quiz app",
    description:
      "A modern quiz experience focused on clean interactions, dynamic content and playful user engagement.",
    image: "/images/projects/quizmify.png",
    tags: ["React", "Next.js", "UI Design"],
    url: "#",
    featured: false,
    metrics: ["Interactive UI", "Clean game logic", "Responsive experience"],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 160,
    damping: 24,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 160,
    damping: 24,
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{
        duration: 0.8,
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
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/40 backdrop-blur-2xl transition duration-500 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.12),transparent_38%)] before:opacity-0 before:transition before:duration-500 hover:-translate-y-1 hover:border-orange-400/40 hover:before:opacity-100 ${
        project.featured
          ? "lg:grid lg:grid-cols-[1fr_0.9fr]"
          : "lg:grid lg:grid-cols-[0.9fr_1fr]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
        <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-28 left-16 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div
        className={`relative overflow-hidden bg-gradient-to-br from-zinc-950 via-black to-orange-950/20 ${
          !project.featured ? "lg:order-2" : ""
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.1),transparent)] opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100" />

        <motion.div
          style={{ transform: "translateZ(28px)" }}
          className="relative flex min-h-[260px] items-center justify-center overflow-hidden md:min-h-[340px] lg:min-h-[420px]"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-[76%] max-w-[720px] rounded-[1.6rem] shadow-2xl shadow-black/60 transition duration-700 group-hover:scale-[1.035] group-hover:-translate-y-1 md:w-[74%] lg:w-[80%]"
          />
        </motion.div>
      </div>

      <div className="relative flex flex-col justify-between p-7 md:p-10 lg:p-12">
        <div>
          <div className="mb-8 flex items-center justify-between gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-400">
              {project.category}
            </p>

            <span className="font-mono text-sm text-zinc-600">
              0{index + 1}
            </span>
          </div>

          <h3 className="max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl lg:text-6xl">
            {project.title}
          </h3>

          <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 border-t border-white/10 pt-7 text-sm text-zinc-400">
            {project.metrics.map((metric) => (
              <li key={metric} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                {metric}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition duration-300 hover:bg-orange-400 hover:text-white"
        >
          View case study
          <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#070707] py-28 text-white md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(249,115,22,0.22),transparent_30%),radial-gradient(circle_at_80%_90%,rgba(245,158,11,0.14),transparent_32%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-zinc-300 shadow-2xl shadow-orange-500/10 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-orange-400" />
              Selected work
            </div>

            <h2 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl">
              Digital work with{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent">
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

        <div className="grid gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}