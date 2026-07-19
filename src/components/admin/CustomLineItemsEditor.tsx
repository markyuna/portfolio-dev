"use client";

import { Plus, X } from "lucide-react";
import type { CustomLineItem } from "@/lib/questionnaire.types";

const fieldClasses =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:bg-white/10";

interface CustomLineItemsEditorProps {
  customLines: CustomLineItem[];
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<CustomLineItem>) => void;
  onRemove: (id: string) => void;
}

export default function CustomLineItemsEditor({
  customLines,
  onAdd,
  onUpdate,
  onRemove,
}: CustomLineItemsEditorProps) {
  return (
    <div>
      <div className="flex flex-col gap-3">
        {customLines.map((line) => (
          <div key={line.id} className="flex items-center gap-3">
            <input
              value={line.label}
              onChange={(e) => onUpdate(line.id, { label: e.target.value })}
              placeholder="Ex : Carte interactive"
              className={`flex-1 ${fieldClasses}`}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/40">€</span>
              <input
                type="number"
                value={line.price}
                onChange={(e) => onUpdate(line.id, { price: Number(e.target.value) })}
                className="w-24 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-right text-sm text-white outline-none focus:border-violet-400/60"
              />
            </div>
            <button
              type="button"
              onClick={() => onRemove(line.id)}
              aria-label="Supprimer cette prestation"
              className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition hover:border-red-400/40 hover:text-red-300"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
      >
        <Plus className="size-4" />
        Ajouter une prestation
      </button>
    </div>
  );
}
