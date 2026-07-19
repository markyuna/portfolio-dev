"use client";

import { formatPriceFR } from "@/lib/format";
import type { ChoiceQuestion } from "@/lib/questionnaire.types";

interface QuestionMultipleChoiceProps {
  question: ChoiceQuestion;
  value: string[] | undefined;
  onChange: (optionIds: string[]) => void;
  showPrices?: boolean;
}

export default function QuestionMultipleChoice({
  question,
  value,
  onChange,
  showPrices = false,
}: QuestionMultipleChoiceProps) {
  const selected = value ?? [];

  function toggle(optionId: string) {
    const option = question.options.find((o) => o.id === optionId);
    if (!option) return;

    if (option.exclusive) {
      onChange(selected.includes(optionId) ? [] : [optionId]);
      return;
    }

    const exclusiveId = question.options.find((o) => o.exclusive)?.id;
    const withoutExclusive = selected.filter((id) => id !== exclusiveId);

    onChange(
      withoutExclusive.includes(optionId)
        ? withoutExclusive.filter((id) => id !== optionId)
        : [...withoutExclusive, optionId],
    );
  }

  return (
    <fieldset>
      <legend className="text-lg font-semibold tracking-[-0.02em] text-white">
        {question.label}
        {question.required && <span className="ml-1 text-violet-400">*</span>}
      </legend>
      {question.helper && (
        <p className="mt-2 text-sm leading-6 text-white/50">{question.helper}</p>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => {
          const active = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(option.id)}
              className={[
                "flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-medium transition duration-300 motion-reduce:transition-none",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
                active
                  ? "border-violet-400 bg-violet-500/15 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:border-violet-400/50 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              <span>{option.label}</span>
              {showPrices && (
                <span className="shrink-0 text-xs font-semibold text-violet-300">
                  {option.price > 0
                    ? `+${formatPriceFR(option.price)}`
                    : "Inclus"}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
