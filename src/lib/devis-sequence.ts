const SEQUENCE_KEY = "brief-devis:sequence";

interface StoredSequence {
  year: number;
  count: number;
}

function readSequence(): StoredSequence | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SEQUENCE_KEY);
    return raw ? (JSON.parse(raw) as StoredSequence) : null;
  } catch {
    return null;
  }
}

function writeSequence(value: StoredSequence): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SEQUENCE_KEY, JSON.stringify(value));
  } catch {
    // best-effort only — numbering stays manually editable if storage fails
  }
}

/** Returns the next devis number (DEV-{year}-{NNN}) and advances the stored counter. */
export function getNextDevisNumber(): string {
  const year = new Date().getFullYear();
  const stored = readSequence();
  const count = stored && stored.year === year ? stored.count + 1 : 1;

  writeSequence({ year, count });

  return `DEV-${year}-${String(count).padStart(3, "0")}`;
}
