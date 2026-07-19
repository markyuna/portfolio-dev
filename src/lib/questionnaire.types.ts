export type QuestionKind = "single" | "multiple" | "text";

export interface QuestionOption {
  id: string;
  label: string;
  price: number;
  /** Selecting this option deselects every other option in the same question. */
  exclusive?: boolean;
  /** Percentage surcharge applied to the subtotal (e.g. 0.15 for +15%), instead of a flat price. */
  surchargePercent?: number;
  /** Purely informational — does not affect the computed total. */
  excludedFromTotal?: boolean;
  helper?: string;
}

export interface QuestionBase {
  id: string;
  kind: QuestionKind;
  label: string;
  helper?: string;
  required?: boolean;
}

export interface ChoiceQuestion extends QuestionBase {
  kind: "single" | "multiple";
  options: QuestionOption[];
}

export interface TextQuestion extends QuestionBase {
  kind: "text";
  placeholder?: string;
  multiline?: boolean;
}

export type Question = ChoiceQuestion | TextQuestion;

export interface QuestionnaireSection {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

/** questionId -> selected option id(s) or free text */
export type QuestionnaireAnswers = Record<string, string | string[]>;

export interface LeadInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
  consent: boolean;
}

export interface BriefPayload {
  answers: QuestionnaireAnswers;
  lead: LeadInfo;
  submittedAt: string;
}

export interface PricingBreakdownLine {
  questionId: string;
  questionLabel: string;
  optionId: string;
  optionLabel: string;
  price: number;
  isSurcharge?: boolean;
  excludedFromTotal?: boolean;
}

export interface PricingResult {
  lines: PricingBreakdownLine[];
  subtotal: number;
  urgencySurcharge: number;
  total: number;
  rangeLow: number;
  rangeHigh: number;
}
