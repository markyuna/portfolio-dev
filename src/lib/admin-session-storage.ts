import { useSyncExternalStore } from "react";
import type { CustomLineItem, LeadInfo, QuestionnaireAnswers } from "@/lib/questionnaire.types";
import type { PriceOverrides } from "@/lib/pricing";

const SESSION_KEY = "admin-brief-devis:session";

export interface AdminSession {
  answers: QuestionnaireAnswers;
  lead: LeadInfo;
  overrides: PriceOverrides;
  customLines: CustomLineItem[];
}

function loadAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AdminSession) : null;
  } catch {
    return null;
  }
}

// Cached so useSyncExternalStore gets a referentially stable snapshot, and
// kept in sync on every save so other admin pages/components (e.g. the
// shared AdminNavbar, or the Cadrage page reading the loaded brief) pick up
// the change without a full page reload.
let cachedSessionSnapshot: AdminSession | null | undefined;
const listeners = new Set<() => void>();

export function saveAdminSession(session: AdminSession): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // best-effort only — an internal single-user tool, not worth failing over
  }
  cachedSessionSnapshot = session;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSessionSnapshot(): AdminSession | null {
  if (cachedSessionSnapshot === undefined) {
    cachedSessionSnapshot = loadAdminSession();
  }
  return cachedSessionSnapshot;
}

function getServerSessionSnapshot(): AdminSession | null {
  return null;
}

/** SSR-safe read of the admin session, live-updated whenever any component calls saveAdminSession. */
export function useAdminSessionBaseline(): AdminSession | null {
  return useSyncExternalStore(subscribe, getSessionSnapshot, getServerSessionSnapshot);
}
