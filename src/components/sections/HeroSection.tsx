"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Palette, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#fffaf3] pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.22),transparent_35%)]" />

      <div className="absolute right-[-140px] top-24 h-[420px] w-[420px] rounded-full bg-orange-300/30 blur-[110px]" />
      <div className="absolute bottom-[-160px] left-[-120px] h-[420px] w-[420px] rounded-full bg-amber-300/30 blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/60 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-orange-500" />
            Web Developer • Creative • AI
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-zinc-950 md:text-7xl">
            I craft{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              high-end
            </span>{" "}
            digital experiences that elevate brands.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
            I build premium websites and interfaces with modern technologies,
            refined design, smooth animations and a strong focus on results.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-zinc-950/15 transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white/50 px-7 py-4 text-sm font-semibold text-zinc-900 backdrop-blur transition hover:-translate-y-0.5 hover:border-zinc-950 hover:bg-white"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-3">
            {[
              { value: "Next.js", label: "Modern stack" },
              { value: "UI/UX", label: "Premium design" },
              { value: "AI", label: "Creative tools" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/70 bg-white/55 p-4 shadow-sm backdrop-blur"
              >
                <p className="text-sm font-semibold text-zinc-950">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-orange-300/30 via-white/20 to-amber-300/30 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/65 p-4 shadow-2xl shadow-orange-950/10 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-950 p-3">
              <div className="mb-3 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <div className="overflow-hidden rounded-2xl bg-[#fff7ed] p-6">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-orange-500">
                      Featured Project
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-zinc-950">
                      France Courtier
                    </h3>
                  </div>

                  <div className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold text-white">
                    Live
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="h-32 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-800 to-orange-500 p-5">
                    <div className="h-3 w-28 rounded-full bg-white/60" />
                    <div className="mt-5 h-5 w-56 rounded-full bg-white/90" />
                    <div className="mt-3 h-5 w-40 rounded-full bg-white/50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <Code2 className="h-6 w-6 text-orange-500" />
                      <p className="mt-4 text-sm font-semibold text-zinc-950">
                        Next.js
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Fast & scalable
                      </p>
                    </div>

                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <Palette className="h-6 w-6 text-orange-500" />
                      <p className="mt-4 text-sm font-semibold text-zinc-950">
                        Premium UI
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Elegant experience
                      </p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-orange-100 bg-white/70 p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-zinc-950">
                        Project quality
                      </p>
                      <p className="text-sm font-semibold text-orange-500">
                        96%
                      </p>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-orange-100">
                      <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-8 top-16 rounded-2xl border border-white/70 bg-white/70 px-5 py-4 shadow-xl backdrop-blur"
          >
            <p className="text-xs text-zinc-500">Creative direction</p>
            <p className="mt-1 text-sm font-semibold text-zinc-950">
              Design + Code
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-5 bottom-20 rounded-2xl border border-white/70 bg-white/70 px-5 py-4 shadow-xl backdrop-blur"
          >
            <p className="text-xs text-zinc-500">Focus</p>
            <p className="mt-1 text-sm font-semibold text-zinc-950">
              Premium UX
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}