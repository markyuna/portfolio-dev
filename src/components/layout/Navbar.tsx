"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/60 border-b border-white/20"
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="font-semibold text-lg">
          Marcos.dev
        </div>

        <div className="flex gap-6 text-sm">
          <a href="#projects" className="hover:opacity-70">
            Projects
          </a>
          <a href="#about" className="hover:opacity-70">
            About
          </a>
          <a href="#contact" className="hover:opacity-70">
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}