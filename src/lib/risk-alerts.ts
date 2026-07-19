import { URGENCY_OPTION_ID } from "@/lib/questionnaire.config";
import type { QuestionnaireAnswers } from "@/lib/questionnaire.types";

const RISKY_TYPE_SITE_IDS = ["type-ecommerce", "type-app"];

/** Flags briefs combining a < 1 month timeline with e-commerce or a bespoke app — probably not realistic. */
export function isTimelineUnrealistic(answers: QuestionnaireAnswers): boolean {
  const delai = answers["delai"];
  const typeSite = answers["type-site"];
  return delai === URGENCY_OPTION_ID && typeof typeSite === "string" && RISKY_TYPE_SITE_IDS.includes(typeSite);
}
