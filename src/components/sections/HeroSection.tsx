"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Palette, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function HeroSection() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#070707] pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(99,102,241,0.16),transparent_34%),radial-gradient(circle_at_82%_82%,rgba(168,85,247,0.14),transparent_36%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(124,58,237,0.06)_1px,transparent_1px),linear-gradient(to_right,rgba(124,58,237,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.16]" />

      <div className="absolute right-[-140px] top-24 h-[460px] w-[460px] rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="absolute bottom-[-160px] left-[-120px] h-[460px] w-[460px] rounded-full bg-violet-500/20 blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 shadow-2xl backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-violet-400" />
            {h.badge}
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.06em] text-white md:text-7xl">
            {h.h1a}{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {h.h1highlight}
            </span>{" "}
            {h.h1b}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/55 md:text-xl">
            {h.description}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="/projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black shadow-[0_10px_35px_rgba(255,255,255,0.12)] transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              {h.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-violet-400/50 hover:bg-white/10"
            >
              {h.ctaSecondary}
            </a>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-3">
            {h.tags.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
              >
                <p className="text-sm font-semibold text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-white/45">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -2, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-indigo-500/20 via-white/5 to-violet-500/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950 p-3">
              <div className="mb-3 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <div className="overflow-hidden rounded-2xl bg-[#f8fbff] p-6">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-600">
                      {h.featuredProject}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-zinc-950">
                      France Courtier
                    </h3>
                  </div>
                  <div className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white">
                    {h.live}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="h-32 rounded-3xl bg-gradient-to-br from-zinc-950 via-indigo-950 to-violet-600 p-5">
                    <div className="h-3 w-28 rounded-full bg-white/60" />
                    <div className="mt-5 h-5 w-56 rounded-full bg-white/90" />
                    <div className="mt-3 h-5 w-40 rounded-full bg-white/50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <Code2 className="h-6 w-6 text-violet-600" />
                      <p className="mt-4 text-sm font-semibold text-zinc-950">
                        Next.js
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {h.fastScalable}
                      </p>
                    </div>

                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <Palette className="h-6 w-6 text-violet-600" />
                      <p className="mt-4 text-sm font-semibold text-zinc-950">
                        Premium UI
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {h.elegantExperience}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-indigo-100 bg-white/80 p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-zinc-950">
                        {h.projectQuality}
                      </p>
                      <p className="text-sm font-semibold text-violet-600">
                        96%
                      </p>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-indigo-100">
                      <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-8 top-16 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-xl shadow-black/30 backdrop-blur-xl"
          >
            <p className="text-xs text-white/45">{h.creativeDirection}</p>
            <p className="mt-1 text-sm font-semibold text-white">
              {h.designCode}
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-5 bottom-20 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-xl shadow-black/30 backdrop-blur-xl"
          >
            <p className="text-xs text-white/45">{h.focus}</p>
            <p className="mt-1 text-sm font-semibold text-white">
              {h.premiumUX}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
