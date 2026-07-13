"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import { useLanguage } from "@/lib/language-context";

export default function FeaturedProjectsSection() {
  const { locale, t } = useLanguage();
  const f = t.featured;

  return (
    <section className="relative overflow-hidden bg-[#070707] py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(124,58,237,0.12),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.1),transparent_40%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-violet-400" />
              {f.badge}
            </div>
            <h2 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl">
              {f.h2a}{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {f.h2highlight}
              </span>
            </h2>
          </div>

          <Link
            href="/projects"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-violet-500/50 hover:bg-white/10"
          >
            {f.cta}
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/[0.07]"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/70 via-transparent to-transparent" />

                {/* Live badge */}
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
                  {f.liveBadge}
                </div>

                {/* Arrow */}
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
                <p className="mt-1 text-sm text-white/50">
                  {project.subtitle[locale]}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] bg-white/5 px-2.5 py-1 text-xs text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
