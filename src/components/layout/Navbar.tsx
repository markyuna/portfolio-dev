"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const lastYRef = useRef(0);

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const scrollingDown = currentY > lastYRef.current;

        setScrolled(currentY > 20);

        if (scrollingDown && currentY > 110) {
          setHidden(true);
          setOpen(false);
        } else {
          setHidden(false);
        }

        lastYRef.current = currentY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-0 z-50 w-full px-4 pt-4"
      >
        <div
          className={[
            "mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-full border px-4 py-2 text-white backdrop-blur-2xl transition-all duration-500 md:px-5",
            scrolled
              ? "border-white/10 bg-[#08080c]/75 shadow-[0_24px_90px_rgba(0,0,0,0.45)]"
              : "border-white/10 bg-white/[0.055] shadow-[0_18px_70px_rgba(0,0,0,0.28)]",
          ].join(" ")}
        >
          <Link href="/" className="group relative flex shrink-0 items-center">
            <motion.div
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-12 w-[178px] overflow-hidden rounded-full md:w-[195px]"
            >
              <Image
                src="/logo-morado.png"
                alt="Marcos Suarez Logo"
                fill
                sizes="210px"
                className="object-contain brightness-110 contrast-125 drop-shadow-[0_0_18px_rgba(124,58,237,0.35)] transition duration-500 group-hover:brightness-125"
                priority
              />

              <span className="pointer-events-none absolute inset-y-0 -left-12 w-10 rotate-12 bg-white/45 blur-md transition-all duration-700 group-hover:left-[120%]" />
            </motion.div>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/25 p-1 shadow-inner shadow-white/5 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "relative rounded-full px-4 py-2 text-sm font-medium transition duration-300",
                    active
                      ? "text-white"
                      : "text-white/60 hover:text-white",
                  ].join(" ")}
                >
                  {active && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-[0_10px_35px_rgba(255,255,255,0.16)] transition duration-300 hover:scale-[1.035] hover:bg-white/90 md:flex"
          >
            Start a project
            <ArrowUpRight className="size-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <button
            onClick={() => setOpen((value) => !value)}
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-inner shadow-white/10 transition hover:bg-white/15 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -12, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 12, scale: 0.85 }}
                transition={{ duration: 0.18 }}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              aria-label="Close menu overlay"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-4 right-4 top-24 z-50 overflow-hidden rounded-[2rem] border border-white/10 bg-[#08080c]/92 p-3 text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:hidden"
            >
              <div className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 size-48 rounded-full bg-orange-500/10 blur-3xl" />

              <div className="relative flex flex-col gap-2">
                {navLinks.map((link, index) => {
                  const active = pathname === link.href;

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={[
                          "flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-medium transition",
                          active
                            ? "bg-white/12 text-white"
                            : "text-white/75 hover:bg-white/10 hover:text-white",
                        ].join(" ")}
                      >
                        {link.label}
                        <ArrowUpRight className="size-4 opacity-50" />
                      </Link>
                    </motion.div>
                  );
                })}

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-sm font-bold text-black shadow-[0_16px_45px_rgba(255,255,255,0.16)]"
                >
                  Start a project
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}