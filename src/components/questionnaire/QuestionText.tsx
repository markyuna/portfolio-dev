"use client";

import type { TextQuestion } from "@/lib/questionnaire.types";

interface QuestionTextProps {
  question: TextQuestion;
  value: string | undefined;
  onChange: (value: string) => void;
}

export default function QuestionText({ question, value, onChange }: QuestionTextProps) {
  const fieldClasses =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:bg-white/10";

  return (
    <div>
      <label htmlFor={question.id} className="text-lg font-semibold tracking-[-0.02em] text-white">
        {question.label}
        {question.required && <span className="ml-1 text-violet-400">*</span>}
      </label>
      {question.helper && (
        <p className="mt-2 text-sm leading-6 text-white/50">{question.helper}</p>
      )}

      <div className="mt-5">
        {question.multiline ? (
          <textarea
            id={question.id}
            rows={4}
            value={value ?? ""}
            placeholder={question.placeholder}
            required={question.required}
            onChange={(e) => onChange(e.target.value)}
            className={`resize-none ${fieldClasses}`}
          />
        ) : (
          <input
            id={question.id}
            type="text"
            value={value ?? ""}
            placeholder={question.placeholder}
            required={question.required}
            onChange={(e) => onChange(e.target.value)}
            className={fieldClasses}
          />
        )}
      </div>
    </div>
  );
}
