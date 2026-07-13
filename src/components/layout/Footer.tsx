"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-[#050507] px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Link href="/" className="relative h-10 w-[160px] shrink-0">
          <Image
            src="/logo-morado.png"
            alt="Marcos Suarez"
            fill
            sizes="160px"
            className="object-contain brightness-110 contrast-125"
          />
        </Link>

        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/40 transition hover:text-white/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:marcossuarezr88@gmail.com"
          className="group flex items-center gap-1.5 text-sm text-white/40 transition hover:text-white/80"
        >
          marcossuarezr88@gmail.com
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/[0.06] pt-6 text-center text-xs text-white/20">
        © {new Date().getFullYear()} Marcos Suarez. {t.footer.copyright}
      </div>
    </footer>
  );
}
