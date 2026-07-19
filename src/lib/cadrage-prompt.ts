import { formatDateFR } from "@/lib/format";
import {
  cadrageModules,
  getModuleForTypeSite,
  getPrecisionFields,
  isCadrageFieldVisible,
  troncCommunSections,
} from "@/lib/cadrage.config";
import type { CadrageAnswers, CadrageField, CadrageSection } from "@/lib/cadrage.types";
import type { QuestionnaireAnswers } from "@/lib/questionnaire.types";

function fieldValueLabel(field: CadrageField, value: CadrageAnswers[string] | undefined): string | null {
  if (field.kind === "checkbox") {
    return value === true ? "Oui" : null;
  }
  if (field.kind === "checkbox-group") {
    if (!Array.isArray(value) || value.length === 0) return null;
    return value.map((id) => field.options?.find((o) => o.id === id)?.label ?? id).join(", ");
  }
  if (typeof value !== "string" || !value.trim()) return null;
  if (field.kind === "radio") {
    return field.options?.find((o) => o.id === value)?.label ?? value;
  }
  if (field.kind === "date") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : formatDateFR(date);
  }
  return value.trim();
}

function renderSection(section: CadrageSection, answers: CadrageAnswers): string[] {
  const lines: string[] = [];
  for (const field of section.fields) {
    if (!isCadrageFieldVisible(field, answers)) continue;
    const label = fieldValueLabel(field, answers[field.id]);
    if (label === null) continue;
    lines.push(`- ${field.label} : ${label}`);
  }
  if (lines.length === 0) return [];
  return [`### ${section.title}`, ...lines, ""];
}

/** Builds the "## Complément de cadrage" markdown block, omitting every unfilled field. Returns "" if nothing was filled in. */
export function generateCadrageMarkdown(
  briefAnswers: QuestionnaireAnswers,
  cadrageAnswers: CadrageAnswers,
): string {
  const blocks: string[] = [];

  for (const section of troncCommunSections) {
    blocks.push(...renderSection(section, cadrageAnswers));
  }

  const activeModuleId = getModuleForTypeSite(briefAnswers["type-site"] as string | undefined);
  const activeModule = cadrageModules.find((m) => m.id === activeModuleId);
  if (activeModule) {
    for (const section of activeModule.sections) {
      blocks.push(
        ...renderSection({ ...section, title: `${activeModule.title} — ${section.title}` }, cadrageAnswers),
      );
    }
  }

  const precisionFields = getPrecisionFields(briefAnswers);
  if (precisionFields.length > 0) {
    blocks.push(
      ...renderSection(
        { id: "precisions", title: "Fonctionnalités à préciser", fields: precisionFields },
        cadrageAnswers,
      ),
    );
  }

  if (blocks.length === 0) return "";

  return ["## Complément de cadrage", "", ...blocks].join("\n").trimEnd();
}
