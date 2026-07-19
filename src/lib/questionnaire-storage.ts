import { useSyncExternalStore } from "react";
import type { QuestionnaireAnswers } from "@/lib/questionnaire.types";

const DRAFT_KEY = "demarrer-un-projet:draft";

export function loadDraftAnswers(): QuestionnaireAnswers | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as QuestionnaireAnswers) : null;
  } catch {
    return null;
  }
}

// Cached so useSyncExternalStore gets a referentially stable snapshot — the
// draft is only ever read once per page load, not watched for live changes.
let cachedDraftSnapshot: QuestionnaireAnswers | null | undefined;

function subscribeNoop() {
  return () => {};
}

function getDraftSnapshot(): QuestionnaireAnswers | null {
  if (cachedDraftSnapshot === undefined) {
    cachedDraftSnapshot = loadDraftAnswers();
  }
  return cachedDraftSnapshot;
}

function getServerDraftSnapshot(): QuestionnaireAnswers | null {
  return null;
}

/** SSR-safe read of the saved draft — null on the server and until hydration reads localStorage. */
export function useDraftAnswers(): QuestionnaireAnswers | null {
  return useSyncExternalStore(subscribeNoop, getDraftSnapshot, getServerDraftSnapshot);
}

export function saveDraftAnswers(answers: QuestionnaireAnswers): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(answers));
  } catch {
    // Storage unavailable (private mode, quota) — draft persistence is best-effort.
  }
}

export function clearDraftAnswers(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}
