"use client";

import { useEffect, useMemo, useState } from "react";
import { questionnaireSections, MAINTENANCE_QUESTION_ID } from "@/lib/questionnaire.config";
import { computePricing, CUSTOM_LINE_QUESTION_ID } from "@/lib/pricing";
import { formatPriceFR } from "@/lib/format";
import { getNextDevisNumber } from "@/lib/devis-sequence";
import { generateClaudePrompt } from "@/lib/claude-prompt";
import { generateCadrageMarkdown } from "@/lib/cadrage-prompt";
import { loadCadrageSession } from "@/lib/cadrage-storage";
import { isTimelineUnrealistic } from "@/lib/risk-alerts";
import {
  saveAdminSession,
  useAdminSessionBaseline,
  type AdminSession,
} from "@/lib/admin-session-storage";
import type {
  BriefPayload,
  CustomLineItem,
  LeadInfo,
  TextQuestion,
} from "@/lib/questionnaire.types";
import QuestionSingleChoice from "@/components/questionnaire/QuestionSingleChoice";
import QuestionMultipleChoice from "@/components/questionnaire/QuestionMultipleChoice";
import QuestionText from "@/components/questionnaire/QuestionText";
import DevisDocument from "@/components/admin/DevisDocument";
import ClaudePromptOutput from "@/components/admin/ClaudePromptOutput";
import CustomLineItemsEditor from "@/components/admin/CustomLineItemsEditor";
import { AlertTriangle } from "lucide-react";

const EMPTY_LEAD: LeadInfo = { name: "", company: "", email: "", phone: "", consent: true };

const EMPTY_SESSION: AdminSession = {
  answers: {},
  lead: EMPTY_LEAD,
  overrides: {},
  customLines: [],
};

const fieldClasses =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:bg-white/10";

export default function AdminBriefDevisWorkspace() {
  // `baseline` is the last saved session, read once (SSR-safe, same pattern
  // as the public questionnaire's draft). `edits` is null until the admin
  // makes a first change, after which it fully supersedes the baseline —
  // every setter below derives the next `edits` from the current effective
  // session, so there's no risk of stale baseline fields leaking back in
  // after an import replaces the working set.
  const baseline = useAdminSessionBaseline();
  const [edits, setEdits] = useState<AdminSession | null>(null);
  const session = edits ?? baseline ?? EMPTY_SESSION;
  const { answers, lead, overrides, customLines } = session;

  const [jsonInput, setJsonInput] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [devisNumber, setDevisNumber] = useState("");
  const [issuer, setIssuer] = useState({
    name: "Marcos Suarez",
    email: "marcossuarezr88@gmail.com",
    address: "2 rue Pierre Curie, 94270 Le Kremlin-Bicêtre",
    siret: "897 513 065 00010",
  });
  const [activeTab, setActiveTab] = useState<"devis" | "prompt">("devis");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (edits) saveAdminSession(edits);
  }, [edits]);

  const pricing = useMemo(
    () => computePricing(answers, overrides, customLines),
    [answers, overrides, customLines],
  );

  function updateSession(patch: Partial<AdminSession>) {
    setEdits({ ...session, ...patch });
  }

  function setAnswer(questionId: string, value: string | string[]) {
    updateSession({ answers: { ...answers, [questionId]: value } });
  }

  function setLead(next: LeadInfo) {
    updateSession({ lead: next });
  }

  function setOverride(questionId: string, optionId: string, price: number) {
    updateSession({ overrides: { ...overrides, [`${questionId}:${optionId}`]: price } });
  }

  function addCustomLine() {
    updateSession({
      customLines: [...customLines, { id: crypto.randomUUID(), label: "", price: 0 }],
    });
  }

  function updateCustomLine(id: string, patch: Partial<CustomLineItem>) {
    updateSession({
      customLines: customLines.map((line) => (line.id === id ? { ...line, ...patch } : line)),
    });
  }

  function removeCustomLine(id: string) {
    updateSession({ customLines: customLines.filter((line) => line.id !== id) });
  }

  function handleImport() {
    setImportError(null);
    try {
      const parsed = JSON.parse(jsonInput) as Partial<BriefPayload>;
      if (!parsed.answers || !parsed.lead) {
        throw new Error("Structure JSON inattendue (answers / lead manquant).");
      }
      updateSession({
        answers: parsed.answers,
        lead: { ...EMPTY_LEAD, ...parsed.lead },
      });
    } catch (error) {
      setImportError(
        error instanceof Error ? error.message : "JSON invalide.",
      );
    }
  }

  function handleGenerateDevis() {
    setDevisNumber(getNextDevisNumber());
    setActiveTab("devis");
  }

  function handleGeneratePrompt() {
    const cadrageMarkdown = generateCadrageMarkdown(answers, loadCadrageSession() ?? {});
    setPrompt(generateClaudePrompt(answers, lead, pricing, customLines, cadrageMarkdown));
    setActiveTab("prompt");
  }

  const timelineRisk = isTimelineUnrealistic(answers);

  const maintenanceAnswer = answers[MAINTENANCE_QUESTION_ID];
  const maintenanceOption = questionnaireSections
    .flatMap((s) => s.questions)
    .find((q) => q.id === MAINTENANCE_QUESTION_ID);
  const maintenanceLabel =
    maintenanceOption && maintenanceOption.kind !== "text"
      ? maintenanceOption.options.find((o) => o.id === maintenanceAnswer)?.label
      : undefined;
  const maintenanceNote =
    maintenanceAnswer && maintenanceAnswer !== "maintenance-aucune" && maintenanceLabel
      ? `Maintenance sélectionnée : ${maintenanceLabel} — facturée séparément, hors devis.`
      : null;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-8">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-lg font-semibold text-white">Importer un brief (JSON)</h2>
          <p className="mt-2 text-sm text-white/50">
            Collez le bloc JSON reçu par email pour pré-remplir le questionnaire ci-dessous.
          </p>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={6}
            placeholder='{ "answers": { ... }, "lead": { ... } }'
            className={`mt-4 resize-y font-mono text-xs ${fieldClasses}`}
          />
          {importError && (
            <p className="mt-2 text-sm text-red-300">{importError}</p>
          )}
          <button
            type="button"
            onClick={handleImport}
            className="mt-4 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Importer
          </button>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-lg font-semibold text-white">Client</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input
              value={lead.name}
              onChange={(e) => setLead({ ...lead, name: e.target.value })}
              placeholder="Nom"
              className={fieldClasses}
            />
            <input
              value={lead.company}
              onChange={(e) => setLead({ ...lead, company: e.target.value })}
              placeholder="Entreprise"
              className={fieldClasses}
            />
            <input
              value={lead.email}
              onChange={(e) => setLead({ ...lead, email: e.target.value })}
              placeholder="Email"
              className={fieldClasses}
            />
            <input
              value={lead.phone}
              onChange={(e) => setLead({ ...lead, phone: e.target.value })}
              placeholder="Téléphone"
              className={fieldClasses}
            />
          </div>
        </section>

        {timelineRisk && (
          <section className="flex items-center gap-3 rounded-[2rem] border border-amber-400/30 bg-amber-500/10 p-6 backdrop-blur-xl">
            <AlertTriangle className="size-5 shrink-0 text-amber-300" />
            <p className="text-sm leading-6 text-amber-100">
              Délai probablement non réaliste — à recadrer avant d&apos;envoyer le devis.
            </p>
          </section>
        )}

        {answers["autre-besoin"] && (
          <section className="rounded-[2rem] border border-amber-400/30 bg-amber-500/10 p-6 backdrop-blur-xl">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-300">
              Besoin complémentaire exprimé par le client
            </h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white">
              {answers["autre-besoin"] as string}
            </p>
          </section>
        )}

        {questionnaireSections.map((section) => (
          <div key={section.id} className="contents">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
              <div className="mt-6 flex flex-col gap-8">
                {section.questions.map((question) => {
                  if (question.kind === "single") {
                    return (
                      <QuestionSingleChoice
                        key={question.id}
                        question={question}
                        value={answers[question.id] as string | undefined}
                        onChange={(id) => setAnswer(question.id, id)}
                        showPrices
                      />
                    );
                  }
                  if (question.kind === "multiple") {
                    return (
                      <QuestionMultipleChoice
                        key={question.id}
                        question={question}
                        value={answers[question.id] as string[] | undefined}
                        onChange={(ids) => setAnswer(question.id, ids)}
                        showPrices
                      />
                    );
                  }
                  return (
                    <QuestionText
                      key={question.id}
                      question={question as TextQuestion}
                      value={answers[question.id] as string | undefined}
                      onChange={(value) => setAnswer(question.id, value)}
                    />
                  );
                })}
              </div>
            </section>

            {section.id === "fonctionnalites" && (
              <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h2 className="text-lg font-semibold text-white">Prestations personnalisées</h2>
                <p className="mt-2 text-sm text-white/50">
                  Ajoutez des lignes de devis hors questionnaire (ex : besoin exprimé par le client ci-dessus).
                </p>

                <div className="mt-4">
                  <CustomLineItemsEditor
                    customLines={customLines}
                    onAdd={addCustomLine}
                    onUpdate={updateCustomLine}
                    onRemove={removeCustomLine}
                  />
                </div>
              </section>
            )}
          </div>
        ))}

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-lg font-semibold text-white">Ajuster les prix</h2>
          <p className="mt-2 text-sm text-white/50">
            Modifiez ponctuellement un montant avant de générer le devis.
          </p>
          <div className="mt-4 flex flex-col divide-y divide-white/10">
            {pricing.lines
              .filter((l) => !l.isSurcharge && l.questionId !== CUSTOM_LINE_QUESTION_ID)
              .map((line) => (
                <div
                  key={`${line.questionId}:${line.optionId}`}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <span className="text-sm text-white/70">{line.optionLabel}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/40">€</span>
                    <input
                      type="number"
                      value={line.price}
                      onChange={(e) =>
                        setOverride(line.questionId, line.optionId, Number(e.target.value))
                      }
                      className="w-24 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-right text-sm text-white outline-none focus:border-violet-400/60"
                    />
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
            <span className="text-white/60">Total HT (estimation)</span>
            <span className="font-semibold text-white">{formatPriceFR(pricing.total)}</span>
          </div>
        </section>
      </div>

      <div className="lg:sticky lg:top-6 lg:self-start">
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={handleGenerateDevis}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Générer le devis
          </button>
          <button
            type="button"
            onClick={handleGeneratePrompt}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Générer le prompt
          </button>
        </div>

        <div className="mb-6 flex gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm">
          <button
            type="button"
            onClick={() => setActiveTab("devis")}
            className={`flex-1 rounded-full px-4 py-2 font-medium transition ${
              activeTab === "devis" ? "bg-white text-black" : "text-white/60 hover:text-white"
            }`}
          >
            Devis
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("prompt")}
            className={`flex-1 rounded-full px-4 py-2 font-medium transition ${
              activeTab === "prompt" ? "bg-white text-black" : "text-white/60 hover:text-white"
            }`}
          >
            Prompt Claude Code
          </button>
        </div>

        {activeTab === "devis" ? (
          <DevisDocument
            devisNumber={devisNumber || getPreviewDevisNumber()}
            onDevisNumberChange={setDevisNumber}
            issuer={issuer}
            onIssuerChange={setIssuer}
            lead={lead}
            onLeadChange={setLead}
            pricing={pricing}
            maintenanceNote={maintenanceNote}
          />
        ) : (
          <ClaudePromptOutput
            prompt={
              prompt ||
              generateClaudePrompt(
                answers,
                lead,
                pricing,
                customLines,
                generateCadrageMarkdown(answers, loadCadrageSession() ?? {}),
              )
            }
            onPromptChange={setPrompt}
            onRegenerate={handleGeneratePrompt}
          />
        )}
      </div>
    </div>
  );
}

function getPreviewDevisNumber(): string {
  const year = new Date().getFullYear();
  return `DEV-${year}-XXX`;
}
