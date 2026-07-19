"use client";

import { isCadrageFieldVisible } from "@/lib/cadrage.config";
import type { CadrageAnswers, CadrageSection } from "@/lib/cadrage.types";
import CadrageField from "@/components/cadrage/CadrageField";

interface CadrageSectionCardProps {
  section: CadrageSection;
  answers: CadrageAnswers;
  onFieldChange: (fieldId: string, value: CadrageAnswers[string]) => void;
}

export default function CadrageSectionCard({ section, answers, onFieldChange }: CadrageSectionCardProps) {
  return (
    <div>
      <h3 className="text-base font-semibold text-white">{section.title}</h3>
      <div className="mt-4 flex flex-col gap-5">
        {section.fields.map((field) => {
          if (!isCadrageFieldVisible(field, answers)) return null;
          const value = answers[field.id] ?? field.defaultValue;
          return (
            <CadrageField
              key={field.id}
              field={field}
              value={value}
              onChange={(next) => onFieldChange(field.id, next)}
            />
          );
        })}
      </div>
    </div>
  );
}
