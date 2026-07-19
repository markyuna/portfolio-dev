"use client";

import type { CadrageField as CadrageFieldType } from "@/lib/cadrage.types";

interface CadrageFieldProps {
  field: CadrageFieldType;
  value: string | string[] | boolean | undefined;
  onChange: (value: string | string[] | boolean) => void;
}

const fieldClasses =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:bg-white/10";

export default function CadrageField({ field, value, onChange }: CadrageFieldProps) {
  return (
    <div>
      {field.kind !== "checkbox" && (
        <label className="mb-2 block text-sm font-medium text-white/80">{field.label}</label>
      )}
      {field.helper && <p className="mb-2 text-xs text-white/45">{field.helper}</p>}

      {field.kind === "checkbox" && (
        <label className="flex min-h-[2.75rem] cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:border-violet-400/40">
          <input
            type="checkbox"
            checked={value === true}
            onChange={(e) => onChange(e.target.checked)}
            className="size-5 shrink-0 rounded border-white/20 bg-white/5 text-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          />
          {field.label}
        </label>
      )}

      {field.kind === "radio" && (
        <div className="flex flex-wrap gap-2">
          {field.options?.map((option) => {
            const active = value === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => onChange(option.id)}
                className={[
                  "min-h-[2.75rem] rounded-full border px-4 py-2.5 text-sm font-medium transition",
                  active
                    ? "border-violet-400 bg-violet-500/15 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-violet-400/50 hover:text-white",
                ].join(" ")}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}

      {field.kind === "checkbox-group" && (
        <div className="flex flex-wrap gap-2">
          {field.options?.map((option) => {
            const selected = Array.isArray(value) ? value.includes(option.id) : false;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  const current = Array.isArray(value) ? value : [];
                  onChange(selected ? current.filter((id) => id !== option.id) : [...current, option.id]);
                }}
                className={[
                  "min-h-[2.75rem] rounded-full border px-4 py-2.5 text-sm font-medium transition",
                  selected
                    ? "border-violet-400 bg-violet-500/15 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-violet-400/50 hover:text-white",
                ].join(" ")}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}

      {(field.kind === "text" || field.kind === "number") && (
        <input
          type={field.kind === "number" ? "number" : "text"}
          value={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={fieldClasses}
        />
      )}

      {field.kind === "textarea" && (
        <textarea
          rows={3}
          value={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`resize-y ${fieldClasses}`}
        />
      )}

      {field.kind === "date" && (
        <input
          type="date"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={fieldClasses}
        />
      )}
    </div>
  );
}
