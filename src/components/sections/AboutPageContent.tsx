"use client";

import { ArrowUpRight, Code2, Layers3, Palette, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const iconMap = [Code2, Palette, Layers3];

export default function AboutPageContent() {
  const { t } = useLanguage();
  const a = t.aboutPage;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] px-6 py-32 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(99,102,241,0.16),transparent_34%),radial-gradient(circle_at_85%_85%,rgba(168,85,247,0.14),transparent_36%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(124,58,237,0.06)_1px,transparent_1px),linear-gradient(to_right,rgba(124,58,237,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.16]" />

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-xl">
          <Sparkles className="h-4 w-4 text-violet-400" />
          {a.badge}
        </div>

        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.07em] text-white md:text-7xl lg:text-8xl">
              {a.h1a}{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {a.h1highlight}
              </span>{" "}
              {a.h1b}
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/55 md:text-xl">
              {a.bio}
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-400">
              {a.cardBadge}
            </p>

            <p className="mt-5 text-2xl font-semibold leading-snug tracking-[-0.05em] text-white">
              {a.cardText}
            </p>

            <a
              href="/projects"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              {a.cardCta}
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-24 grid gap-4 md:grid-cols-3">
          {a.highlights.map((item, index) => {
            const Icon = iconMap[index];

            return (
              <article
                key={item.title}
                className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-500/25 hover:bg-white/[0.06]"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-violet-400">
                  <Icon className="h-5 w-5" />
                </div>

                <h2 className="text-xl font-semibold tracking-[-0.04em] text-white">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-24 rounded-[2.5rem] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl md:p-10">
          <div className="grid gap-8 md:grid-cols-[0.55fr_1.45fr]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-400">
              {a.philosophy.label}
            </p>

            <p className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.055em] text-white md:text-5xl">
              {a.philosophy.quote}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
