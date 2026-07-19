"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Check, Copy } from "lucide-react";
import {
  cadrageModules,
  computeCadrageProgress,
  getModuleForTypeSite,
  getPrecisionFields,
  troncCommunSections,
} from "@/lib/cadrage.config";
import { generateCadrageMarkdown } from "@/lib/cadrage-prompt";
import { isTimelineUnrealistic } from "@/lib/risk-alerts";
import { saveAdminSession, useAdminSessionBaseline, type AdminSession } from "@/lib/admin-session-storage";
import { saveCadrageSession, useCadrageSessionBaseline } from "@/lib/cadrage-storage";
import type { CadrageAnswers, CadrageModuleId } from "@/lib/cadrage.types";
import type { CustomLineItem } from "@/lib/questionnaire.types";
import CadrageSectionCard from "@/components/cadrage/CadrageSectionCard";
import CadrageModuleAccordion from "@/components/cadrage/CadrageModuleAccordion";
import CustomLineItemsEditor from "@/components/admin/CustomLineItemsEditor";

const EMPTY_CADRAGE: CadrageAnswers = {};

export default function AdminCadrageWorkspace() {
  const briefBaseline = useAdminSessionBaseline();
  const cadrageBaseline = useCadrageSessionBaseline();

  const [briefEdits, setBriefEdits] = useState<AdminSession | null>(null);
  const [cadrageEdits, setCadrageEdits] = useState<CadrageAnswers | null>(null);
  const [userTouchedAccordion, setUserTouchedAccordion] = useState(false);
  const [manualModuleId, setManualModuleId] = useState<CadrageModuleId | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  const brief = briefEdits ?? briefBaseline;
  const cadrageAnswers = cadrageEdits ?? cadrageBaseline ?? EMPTY_CADRAGE;
  const typeSiteId = brief?.answers["type-site"] as string | undefined;

  // Auto-opens the module matching the loaded brief's type-site, until the
  // admin manually toggles an accordion — from then on their choice wins.
  const activeModuleId = userTouchedAccordion ? manualModuleId : getModuleForTypeSite(typeSiteId);

  useEffect(() => {
    if (cadrageEdits) saveCadrageSession(cadrageEdits);
  }, [cadrageEdits]);

  useEffect(() => {
    if (briefEdits) saveAdminSession(briefEdits);
  }, [briefEdits]);

  function setCadrageField(fieldId: string, value: CadrageAnswers[string]) {
    setCadrageEdits({ ...cadrageAnswers, [fieldId]: value });
  }

  function updateCustomLines(next: CustomLineItem[]) {
    if (!brief) return;
    setBriefEdits({ ...brief, customLines: next });
  }

  if (!brief || (!brief.lead.name.trim() && Object.keys(brief.answers).length === 0)) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
        <p className="text-white/70">Aucun brief chargé pour l&apos;instant.</p>
        <p className="mt-2 text-sm text-white/50">
          Chargez ou remplissez un brief dans Brief → Devis avant de démarrer le cadrage.
        </p>
        <Link
          href="/admin/brief-devis"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          Aller à Brief → Devis
        </Link>
      </div>
    );
  }

  const customLines = brief.customLines;
  const precisionFields = getPrecisionFields(brief.answers);
  const timelineRisk = isTimelineUnrealistic(brief.answers);
  const { filled, total } = computeCadrageProgress(cadrageAnswers, activeModuleId);
  const percent = total > 0 ? Math.round((filled / total) * 100) : 0;
  const cadrageMarkdown = generateCadrageMarkdown(brief.answers, cadrageAnswers);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(cadrageMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — nothing more we can do here.
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between text-sm text-white/60">
          <span>
            Progression — {filled} / {total} champs
          </span>
          <span>{percent}%</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {timelineRisk && (
        <section className="flex items-center gap-3 rounded-[2rem] border border-amber-400/30 bg-amber-500/10 p-6 backdrop-blur-xl">
          <AlertTriangle className="size-5 shrink-0 text-amber-300" />
          <p className="text-sm leading-6 text-amber-100">
            Délai probablement non réaliste — à recadrer avant d&apos;envoyer le devis.
          </p>
        </section>
      )}

      {troncCommunSections.map((section) => (
        <section
          key={section.id}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <CadrageSectionCard section={section} answers={cadrageAnswers} onFieldChange={setCadrageField} />
        </section>
      ))}

      {precisionFields.length > 0 && (
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <CadrageSectionCard
            section={{ id: "precisions", title: "Fonctionnalités à préciser", fields: precisionFields }}
            answers={cadrageAnswers}
            onFieldChange={setCadrageField}
          />
        </section>
      )}

      <div className="flex flex-col gap-4">
        {cadrageModules.map((module) => (
          <CadrageModuleAccordion
            key={module.id}
            module={module}
            isOpen={activeModuleId === module.id}
            onToggle={() => {
              setUserTouchedAccordion(true);
              setManualModuleId(activeModuleId === module.id ? undefined : module.id);
            }}
            answers={cadrageAnswers}
            onFieldChange={setCadrageField}
          />
        ))}
      </div>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="text-lg font-semibold text-white">Demandes libres du client</h2>
        {brief.answers["autre-besoin"] ? (
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/70">
            {brief.answers["autre-besoin"] as string}
          </p>
        ) : (
          <p className="mt-2 text-sm text-white/50">Aucune demande libre exprimée dans le brief.</p>
        )}
        <p className="mt-4 text-sm text-white/50">
          Précisez et tarifez-les ici — ces lignes se synchronisent avec les prestations personnalisées du
          devis.
        </p>
        <div className="mt-4">
          <CustomLineItemsEditor
            customLines={customLines}
            onAdd={() =>
              updateCustomLines([...customLines, { id: crypto.randomUUID(), label: "", price: 0 }])
            }
            onUpdate={(id, patch) =>
              updateCustomLines(customLines.map((line) => (line.id === id ? { ...line, ...patch } : line)))
            }
            onRemove={(id) => updateCustomLines(customLines.filter((line) => line.id !== id))}
          />
        </div>
      </section>

      <button
        type="button"
        onClick={handleCopy}
        disabled={!cadrageMarkdown}
        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Copié" : "Copier le complément de cadrage"}
      </button>
    </div>
  );
}
