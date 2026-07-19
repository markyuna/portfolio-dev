import { useSyncExternalStore } from "react";
import type { CadrageAnswers } from "@/lib/cadrage.types";

const CADRAGE_SESSION_KEY = "admin-cadrage:session";

export function loadCadrageSession(): CadrageAnswers | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CADRAGE_SESSION_KEY);
    return raw ? (JSON.parse(raw) as CadrageAnswers) : null;
  } catch {
    return null;
  }
}

// Cached so useSyncExternalStore gets a referentially stable snapshot, and
// kept in sync on every save (same convention as admin-session-storage.ts).
let cachedCadrageSnapshot: CadrageAnswers | null | undefined;
const listeners = new Set<() => void>();

export function saveCadrageSession(answers: CadrageAnswers): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CADRAGE_SESSION_KEY, JSON.stringify(answers));
  } catch {
    // best-effort only — an internal single-user tool, not worth failing over
  }
  cachedCadrageSnapshot = answers;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getCadrageSnapshot(): CadrageAnswers | null {
  if (cachedCadrageSnapshot === undefined) {
    cachedCadrageSnapshot = loadCadrageSession();
  }
  return cachedCadrageSnapshot;
}

function getServerCadrageSnapshot(): CadrageAnswers | null {
  return null;
}

/** SSR-safe read of the cadrage session, live-updated whenever any component calls saveCadrageSession. */
export function useCadrageSessionBaseline(): CadrageAnswers | null {
  return useSyncExternalStore(subscribe, getCadrageSnapshot, getServerCadrageSnapshot);
}
