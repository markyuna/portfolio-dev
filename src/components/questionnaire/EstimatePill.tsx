"use client";

import { Sparkles } from "lucide-react";
import { formatPriceFR } from "@/lib/format";

interface EstimatePillProps {
  rangeLow: number;
  rangeHigh: number;
}

export default function EstimatePill({ rangeLow, rangeHigh }: EstimatePillProps) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4"
      aria-live="polite"
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-[#0a0a0f]/90 px-5 py-3 text-sm text-white shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="text-white/60">Estimation indicative :</span>
        <span className="font-semibold text-white">
          {formatPriceFR(rangeLow)} – {formatPriceFR(rangeHigh)} HT
        </span>
      </div>
    </div>
  );
}
