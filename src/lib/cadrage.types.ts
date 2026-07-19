export type CadrageFieldKind =
  | "checkbox"
  | "checkbox-group"
  | "radio"
  | "text"
  | "textarea"
  | "date"
  | "number";

export interface CadrageFieldOption {
  id: string;
  label: string;
}

export interface CadrageField {
  id: string;
  kind: CadrageFieldKind;
  label: string;
  helper?: string;
  placeholder?: string;
  /** radio | checkbox-group only */
  options?: CadrageFieldOption[];
  defaultValue?: string;
  /** Only rendered/counted when `answers[showIf.fieldId] === showIf.equals`. */
  showIf?: { fieldId: string; equals: string | boolean };
}

export interface CadrageSection {
  id: string;
  title: string;
  fields: CadrageField[];
}

export type CadrageModuleId = "A" | "B" | "C" | "D";

export interface CadrageModule {
  id: CadrageModuleId;
  title: string;
  /** questionnaire `type-site` option ids that auto-open this module. */
  matchTypeSiteIds: string[];
  sections: CadrageSection[];
}

/** fieldId -> checkbox boolean, radio/text/date/number string, or checkbox-group string[]. */
export type CadrageAnswers = Record<string, string | string[] | boolean>;
