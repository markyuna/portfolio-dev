// src/components/layout/Navbar.tsx

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastY && currentY > 90) {
        setHidden(true);
        setOpen(false);
      } else {
        setHidden(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-0 z-50 w-full px-4 pt-4"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-white shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-semibold">
              M
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>

            <span className="text-sm font-semibold tracking-tight">
              Marcos<span className="text-white/45">.dev</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-white/70 transition duration-300 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/#contact"
            className="group hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition duration-300 hover:scale-[1.03] hover:bg-white/90 md:flex"
          >
            Start a project
            <ArrowUpRight className="size-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <button
            onClick={() => setOpen((value) => !value)}
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="fixed left-4 right-4 top-24 z-40 overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909]/90 p-4 text-white shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-4 text-lg font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-sm font-semibold text-black"
              >
                Start a project
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}