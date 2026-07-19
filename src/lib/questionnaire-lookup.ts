import type { ChoiceQuestion, QuestionOption } from "@/lib/questionnaire.types";

/**
 * Resolves an option id against a question's current option list. Answers can
 * come from stale localStorage drafts or brief JSON saved before a config
 * change removed/renamed an option — in that case we skip it instead of
 * breaking the flow, and warn so it's visible during development.
 */
export function findOption(
  question: ChoiceQuestion,
  optionId: string,
): QuestionOption | undefined {
  const option = question.options.find((o) => o.id === optionId);
  if (!option) {
    console.warn(
      `[questionnaire] Unknown option id "${optionId}" for question "${question.id}" — ignoring stale answer.`,
    );
  }
  return option;
}
