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

        {/* Compact grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const isLive = project.status === "En ligne";
            const statusLabel = isLive ? p.statusLive : p.statusInProgress;

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.85,
                  delay: (index % 3) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-violet-500/25 hover:bg-white/[0.06]"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isLive ? "bg-emerald-400" : "bg-amber-400"
                      }`}
                    />
                    {statusLabel}
                  </div>

                  {/* Number */}
                  <div className="absolute right-4 top-4 font-mono text-xs text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400">
                    {project.category[locale]}
                  </p>
                  <h3 className="text-lg font-semibold tracking-[-0.04em] text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/45">
                    {project.subtitle[locale]}
                  </p>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/55">
                    {project.description[locale]}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-white/5 px-2.5 py-1 text-xs text-white/45"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isLive || project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white/80 transition duration-300 group-hover:text-violet-400"
                    >
                      {isLive ? p.cta : p.ctaPreview}
                      <ArrowUpRight className="h-3.5 w-3.5 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="mt-4 inline-flex w-fit cursor-not-allowed items-center gap-1.5 text-sm font-semibold text-white/30"
                    >
                      {p.ctaComingSoon}
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
