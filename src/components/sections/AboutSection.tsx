"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const stack = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Framer Motion", "Supabase", "Node.js", "AI / LLM",
];

export default function AboutSection() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section className="relative overflow-hidden bg-[#070707] py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.14),transparent_36%),radial-gradient(circle_at_15%_80%,rgba(168,85,247,0.12),transparent_36%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-violet-400" />
              {a.badge}
            </div>

            <h2 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.06em] text-white md:text-6xl">
              {a.h2a}{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {a.h2highlight}
              </span>{" "}
              {a.h2b}
            </h2>

            <p className="mt-7 max-w-lg text-lg leading-8 text-white/55">{a.bio}</p>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/45">{a.bio2}</p>

            <Link
              href="/about"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black shadow-[0_10px_35px_rgba(255,255,255,0.12)] transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              {a.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="grid grid-cols-3 gap-4">
              {a.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl"
                >
                  <p className="text-3xl font-semibold tracking-[-0.06em] text-white md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-white/45">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
                {a.stackTitle}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/[0.08] bg-white/5 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur transition hover:border-violet-400/50 hover:text-violet-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
