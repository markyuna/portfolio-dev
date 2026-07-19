import { questionnaireSections } from "@/lib/questionnaire.config";
import { computePricing } from "@/lib/pricing";
import { formatPriceFR } from "@/lib/format";
import { findOption } from "@/lib/questionnaire-lookup";
import type { BriefPayload } from "@/lib/questionnaire.types";

function answerLabel(questionId: string, value: string | string[]): string {
  for (const section of questionnaireSections) {
    const question = section.questions.find((q) => q.id === questionId);
    if (!question) continue;

    if (question.kind === "text") {
      return Array.isArray(value) ? value.join(", ") : value;
    }

    const ids = Array.isArray(value) ? value : [value];
    return ids
      .map((id) => findOption(question, id)?.label ?? id)
      .join(", ");
  }
  return Array.isArray(value) ? value.join(", ") : value;
}

export function buildBriefEmail(payload: BriefPayload) {
  const pricing = computePricing(payload.answers);

  const summaryLines: string[] = [];
  for (const section of questionnaireSections) {
    summaryLines.push(`\n${section.title}`);
    for (const question of section.questions) {
      const value = payload.answers[question.id];
      if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
        continue;
      }
      summaryLines.push(`- ${question.label}: ${answerLabel(question.id, value)}`);
    }
  }

  const subject = `Nouveau brief — ${payload.lead.name}`;

  const text = [
    `Nouvelle demande de projet de ${payload.lead.name}`,
    `Entreprise : ${payload.lead.company || "—"}`,
    `Email : ${payload.lead.email}`,
    `Téléphone : ${payload.lead.phone || "—"}`,
    `Estimation indicative : ${formatPriceFR(pricing.rangeLow)} – ${formatPriceFR(pricing.rangeHigh)} HT`,
    summaryLines.join("\n"),
    "\n--- JSON structuré (à coller dans l'admin) ---",
    JSON.stringify(payload, null, 2),
  ].join("\n");

  const html = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
      <h2>Nouvelle demande de projet — ${escapeHtml(payload.lead.name)}</h2>
      <p>
        <strong>Entreprise :</strong> ${escapeHtml(payload.lead.company || "—")}<br/>
        <strong>Email :</strong> ${escapeHtml(payload.lead.email)}<br/>
        <strong>Téléphone :</strong> ${escapeHtml(payload.lead.phone || "—")}<br/>
        <strong>Estimation indicative :</strong> ${formatPriceFR(pricing.rangeLow)} – ${formatPriceFR(pricing.rangeHigh)} HT
      </p>
      <pre style="white-space: pre-wrap; font-family: monospace;">${escapeHtml(summaryLines.join("\n"))}</pre>
      <h3>JSON structuré (à coller dans l'admin)</h3>
      <pre style="white-space: pre-wrap; font-family: monospace; background: #f4f4f4; padding: 12px; border-radius: 8px;">${escapeHtml(JSON.stringify(payload, null, 2))}</pre>
    </div>
  `;

  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
