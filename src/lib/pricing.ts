import { ESTIMATE_RANGE_PERCENT, questionnaireSections } from "@/lib/questionnaire.config";
import { findOption } from "@/lib/questionnaire-lookup";
import type {
  CustomLineItem,
  PricingBreakdownLine,
  PricingResult,
  QuestionnaireAnswers,
} from "@/lib/questionnaire.types";

/** Overrides keyed as `${questionId}:${optionId}` -> price, used by the admin to adjust line items. */
export type PriceOverrides = Record<string, number>;

/** questionId used for admin-added ad hoc prestations, so they can be filtered out of the questionnaire-driven price editor. */
export const CUSTOM_LINE_QUESTION_ID = "custom";

function selectedOptionIds(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function computePricing(
  answers: QuestionnaireAnswers,
  overrides: PriceOverrides = {},
  customLines: CustomLineItem[] = [],
): PricingResult {
  const lines: PricingBreakdownLine[] = [];
  let subtotal = 0;
  let urgencySurcharge = 0;

  for (const section of questionnaireSections) {
    for (const question of section.questions) {
      if (question.kind === "text") continue;

      let ids = selectedOptionIds(answers[question.id]);
      const exclusiveId = question.options.find((o) => o.exclusive)?.id;
      if (exclusiveId && ids.includes(exclusiveId)) {
        ids = [exclusiveId];
      }

      for (const optionId of ids) {
        const option = findOption(question, optionId);
        if (!option) continue;

        const overrideKey = `${question.id}:${option.id}`;
        const price = overrides[overrideKey] ?? option.price;

        if (option.surchargePercent) {
          continue;
        }

        lines.push({
          questionId: question.id,
          questionLabel: question.label,
          optionId: option.id,
          optionLabel: option.label,
          price,
          excludedFromTotal: option.excludedFromTotal,
        });

        if (!option.excludedFromTotal) {
          subtotal += price;
        }
      }
    }
  }

  for (const line of customLines) {
    if (!line.label.trim()) continue;

    lines.push({
      questionId: CUSTOM_LINE_QUESTION_ID,
      questionLabel: "Prestation personnalisée",
      optionId: line.id,
      optionLabel: line.label,
      price: line.price,
    });

    subtotal += line.price;
  }

  for (const section of questionnaireSections) {
    for (const question of section.questions) {
      if (question.kind === "text") continue;
      const ids = selectedOptionIds(answers[question.id]);
      for (const optionId of ids) {
        const option = question.options.find((o) => o.id === optionId);
        if (!option?.surchargePercent) continue;

        const surcharge = subtotal * option.surchargePercent;
        urgencySurcharge += surcharge;

        lines.push({
          questionId: question.id,
          questionLabel: question.label,
          optionId: option.id,
          optionLabel: `${option.label} (majoration ${Math.round(option.surchargePercent * 100)} %)`,
          price: surcharge,
          isSurcharge: true,
        });
      }
    }
  }

  const total = subtotal + urgencySurcharge;

  return {
    lines,
    subtotal,
    urgencySurcharge,
    total,
    rangeLow: Math.round(total * (1 - ESTIMATE_RANGE_PERCENT)),
    rangeHigh: Math.round(total * (1 + ESTIMATE_RANGE_PERCENT)),
  };
}
