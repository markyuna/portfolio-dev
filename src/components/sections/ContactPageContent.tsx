"use client";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import { useLanguage } from "@/lib/language-context";

export default function ContactPageContent() {
  const { t } = useLanguage();
  const c = t.contactPage;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] px-6 py-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,0.16),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(168,85,247,0.14),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(124,58,237,0.06)_1px,transparent_1px),linear-gradient(to_right,rgba(124,58,237,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.16]" />

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-20 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-white/70 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-violet-400" />
            {c.badge}
          </div>

          <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-white md:text-7xl lg:text-8xl">
            {c.h1a}{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {c.h1highlight}
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/55 md:text-xl">
            {c.description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-violet-400">
                <MessageCircle className="h-5 w-5" />
              </div>

              <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white">
                {c.form.header}
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/55">
                {c.form.subheader}
              </p>
            </div>

            <div className="grid gap-4">
              {c.contactItems.map((item) => {
                const Icon =
                  item.label === "Email"
                    ? Mail
                    : item.label === "Phone" || item.label === "Téléphone"
                      ? Phone
                      : MapPin;

                const content = (
                  <div className="group flex items-center justify-between rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-violet-500/25 hover:bg-white/[0.06]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-white/80">
                          {item.value}
                        </p>
                      </div>
                    </div>

                    {item.href && (
                      <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400" />
                    )}
                  </div>
                );

                return item.href ? (
                  <a key={item.label} href={item.href}>
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
