"use client";

import { useMemo, useState } from "react";
import { questionnaireSections, MAINTENANCE_QUESTION_ID } from "@/lib/questionnaire.config";
import { computePricing, type PriceOverrides } from "@/lib/pricing";
import { formatPriceFR } from "@/lib/format";
import { getNextDevisNumber } from "@/lib/devis-sequence";
import { generateClaudePrompt } from "@/lib/claude-prompt";
import type {
  BriefPayload,
  LeadInfo,
  QuestionnaireAnswers,
  TextQuestion,
} from "@/lib/questionnaire.types";
import QuestionSingleChoice from "@/components/questionnaire/QuestionSingleChoice";
import QuestionMultipleChoice from "@/components/questionnaire/QuestionMultipleChoice";
import QuestionText from "@/components/questionnaire/QuestionText";
import DevisDocument from "@/components/admin/DevisDocument";
import ClaudePromptOutput from "@/components/admin/ClaudePromptOutput";

const EMPTY_LEAD: LeadInfo = { name: "", company: "", email: "", phone: "", consent: true };

const fieldClasses =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:bg-white/10";

export default function AdminBriefDevisWorkspace() {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});
  const [lead, setLead] = useState<LeadInfo>(EMPTY_LEAD);
  const [jsonInput, setJsonInput] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<PriceOverrides>({});
  const [devisNumber, setDevisNumber] = useState("");
  const [issuer, setIssuer] = useState({
    name: "Marcos Suarez",
    email: "marcossuarezr88@gmail.com",
    address: "",
    siret: "",
  });
  const [activeTab, setActiveTab] = useState<"devis" | "prompt">("devis");
  const [prompt, setPrompt] = useState("");

  const pricing = useMemo(() => computePricing(answers, overrides), [answers, overrides]);

  function setAnswer(questionId: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function setOverride(questionId: string, optionId: string, price: number) {
    setOverrides((prev) => ({ ...prev, [`${questionId}:${optionId}`]: price }));
  }

  function handleImport() {
    setImportError(null);
    try {
      const parsed = JSON.parse(jsonInput) as Partial<BriefPayload>;
      if (!parsed.answers || !parsed.lead) {
        throw new Error("Structure JSON inattendue (answers / lead manquant).");
      }
      setAnswers(parsed.answers);
      setLead({ ...EMPTY_LEAD, ...parsed.lead });
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
    setPrompt(generateClaudePrompt(answers, lead, pricing));
    setActiveTab("prompt");
  }

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

        {questionnaireSections.map((section) => (
          <section
            key={section.id}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
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
        ))}

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-lg font-semibold text-white">Ajuster les prix</h2>
          <p className="mt-2 text-sm text-white/50">
            Modifiez ponctuellement un montant avant de générer le devis.
          </p>
          <div className="mt-4 flex flex-col divide-y divide-white/10">
            {pricing.lines
              .filter((l) => !l.isSurcharge)
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
            prompt={prompt || generateClaudePrompt(answers, lead, pricing)}
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
