"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import { useLanguage } from "@/lib/language-context";

export default function ProjectsSection() {
  const { locale, t } = useLanguage();
  const p = t.projects;

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#070707] py-28 text-white md:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_6%,rgba(99,102,241,0.18),transparent_34%),radial-gradient(circle_at_85%_90%,rgba(168,85,247,0.14),transparent_36%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 shadow-2xl backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-violet-400" />
              {p.badge}
            </div>

            <h2 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl">
              {p.h2a}{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {p.h2highlight}
              </span>
            </h2>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-white/55 lg:justify-self-end">
            {p.description}
          </p>
        </motion.div>

        {/* Compact 2-column grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.85,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-violet-500/25 hover:bg-white/[0.06]"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />

                {/* Live badge */}
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
                  {p.liveBadge}
                </div>

                {/* Number */}
                <div className="absolute right-4 top-4 font-mono text-xs text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400">
                      {project.category[locale]}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-[-0.05em] text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/45">
                      {project.subtitle[locale]}
                    </p>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 flex shrink-0 items-center gap-1.5 rounded-full bg-white/8 px-4 py-2 text-xs font-semibold text-white/70 transition duration-300 hover:bg-violet-600 hover:text-white"
                  >
                    {p.cta}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                <p className="text-sm leading-7 text-white/55">
                  {project.description[locale]}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] bg-white/5 px-2.5 py-1 text-xs text-white/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <ul className="mt-5 grid gap-2 border-t border-white/[0.08] pt-5">
                  {project.metrics[locale].map((metric) => (
                    <li
                      key={metric}
                      className="flex items-center gap-2.5 text-sm text-white/50"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.6)]" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
