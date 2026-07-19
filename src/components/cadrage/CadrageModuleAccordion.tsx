"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { CadrageAnswers, CadrageModule } from "@/lib/cadrage.types";
import CadrageSectionCard from "@/components/cadrage/CadrageSectionCard";

interface CadrageModuleAccordionProps {
  module: CadrageModule;
  isOpen: boolean;
  onToggle: () => void;
  answers: CadrageAnswers;
  onFieldChange: (fieldId: string, value: CadrageAnswers[string]) => void;
}

export default function CadrageModuleAccordion({
  module,
  isOpen,
  onToggle,
  answers,
  onFieldChange,
}: CadrageModuleAccordionProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex min-h-[3.5rem] w-full items-center justify-between gap-3 px-6 py-5 text-left"
      >
        <h2 className="text-lg font-semibold text-white">{module.title}</h2>
        <ChevronDown
          className={`size-5 shrink-0 text-white/50 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-8 px-6 pb-6">
              {module.sections.map((section) => (
                <CadrageSectionCard
                  key={section.id}
                  section={section}
                  answers={answers}
                  onFieldChange={onFieldChange}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
