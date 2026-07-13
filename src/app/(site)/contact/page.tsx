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

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contactPage;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f7ff] px-6 py-32 text-zinc-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,0.18),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(168,85,247,0.14),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(79,70,229,0.08)_1px,transparent_1px),linear-gradient(to_right,rgba(79,70,229,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.16]" />

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-20 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/40 bg-white/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-zinc-700 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-violet-500" />
            {c.badge}
          </div>

          <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-zinc-950 md:text-7xl lg:text-8xl">
            {c.h1a}{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              {c.h1highlight}
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
            {c.description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-indigo-200/70 bg-white/55 p-7 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/40 bg-violet-100/70 text-violet-600">
                <MessageCircle className="h-5 w-5" />
              </div>

              <h2 className="text-3xl font-semibold tracking-[-0.05em] text-zinc-950">
                {c.form.header}
              </h2>

              <p className="mt-4 text-sm leading-7 text-zinc-600">
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
                  <div className="group flex items-center justify-between rounded-3xl border border-indigo-200/70 bg-white/55 p-5 shadow-xl shadow-indigo-950/5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/70 hover:bg-white/75">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100/70 text-violet-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-zinc-800">
                          {item.value}
                        </p>
                      </div>
                    </div>

                    {item.href && (
                      <ArrowUpRight className="h-4 w-4 text-zinc-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-600" />
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
