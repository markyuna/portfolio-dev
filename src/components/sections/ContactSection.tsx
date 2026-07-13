"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <section className="relative overflow-hidden bg-[#070707] py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.2),transparent_50%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/60 backdrop-blur-xl">
            <Mail className="h-4 w-4 text-violet-400" />
            {c.badge}
          </div>

          <h2 className="text-5xl font-semibold tracking-[-0.07em] text-white md:text-7xl lg:text-8xl">
            {c.h2a}{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {c.h2highlight}
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/55 md:text-xl">
            {c.description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-[0_10px_45px_rgba(255,255,255,0.14)] transition hover:scale-[1.03] hover:bg-white/90"
            >
              {c.cta}
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <a
              href="mailto:marcossuarezr88@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition hover:border-white/20 hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              marcossuarezr88@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
