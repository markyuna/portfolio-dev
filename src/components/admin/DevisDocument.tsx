"use client";

import { Printer } from "lucide-react";
import { formatDateFR, formatPriceFR } from "@/lib/format";
import type { LeadInfo, PricingResult } from "@/lib/questionnaire.types";

interface IssuerInfo {
  name: string;
  email: string;
  address: string;
  siret: string;
}

interface DevisDocumentProps {
  devisNumber: string;
  onDevisNumberChange: (value: string) => void;
  issuer: IssuerInfo;
  onIssuerChange: (issuer: IssuerInfo) => void;
  lead: LeadInfo;
  onLeadChange: (lead: LeadInfo) => void;
  pricing: PricingResult;
  maintenanceNote: string | null;
}

const TVA_RATE = 0.2;

export default function DevisDocument({
  devisNumber,
  onDevisNumberChange,
  issuer,
  onIssuerChange,
  lead,
  onLeadChange,
  pricing,
  maintenanceNote,
}: DevisDocumentProps) {
  const tva = pricing.total * TVA_RATE;
  const totalTTC = pricing.total + tva;
  // Only genuinely billable lines belong on a quote — zero-price answers are
  // informational (audience, indicative client budget, "included" base tiers).
  const mainLines = pricing.lines.filter((l) => !l.excludedFromTotal && l.price > 0);

  return (
    <div>
      <div className="no-print mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          <Printer className="h-4 w-4" />
          Imprimer / PDF
        </button>
      </div>

      <div className="devis-print rounded-2xl border border-zinc-300 bg-white p-10 text-zinc-900 shadow-xl print:rounded-none print:border-none print:shadow-none">
        <div className="flex items-start justify-between border-b border-zinc-200 pb-6">
          <div>
            <input
              value={issuer.name}
              onChange={(e) => onIssuerChange({ ...issuer, name: e.target.value })}
              className="w-full border-none bg-transparent text-lg font-semibold outline-none"
            />
            <input
              value={issuer.email}
              onChange={(e) => onIssuerChange({ ...issuer, email: e.target.value })}
              className="mt-1 w-full border-none bg-transparent text-sm text-zinc-500 outline-none"
            />
            <input
              value={issuer.address}
              onChange={(e) => onIssuerChange({ ...issuer, address: e.target.value })}
              placeholder="Adresse"
              className="mt-1 w-full border-none bg-transparent text-sm text-zinc-500 outline-none placeholder:text-zinc-300"
            />
            <input
              value={issuer.siret}
              onChange={(e) => onIssuerChange({ ...issuer, siret: e.target.value })}
              placeholder="SIRET"
              className="mt-1 w-full border-none bg-transparent text-sm text-zinc-500 outline-none placeholder:text-zinc-300"
            />
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold tracking-tight">DEVIS</p>
            <input
              value={devisNumber}
              onChange={(e) => onDevisNumberChange(e.target.value)}
              className="mt-1 w-40 border-none bg-transparent text-right text-sm text-zinc-500 outline-none"
            />
            <p className="mt-1 text-sm text-zinc-500">{formatDateFR(new Date())}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-400">Client</p>
            <input
              value={lead.name}
              onChange={(e) => onLeadChange({ ...lead, name: e.target.value })}
              className="mt-1 w-full border-none bg-transparent text-sm font-medium outline-none"
            />
            <input
              value={lead.company}
              onChange={(e) => onLeadChange({ ...lead, company: e.target.value })}
              placeholder="Entreprise"
              className="mt-1 w-full border-none bg-transparent text-sm text-zinc-600 outline-none placeholder:text-zinc-300"
            />
            <input
              value={lead.email}
              onChange={(e) => onLeadChange({ ...lead, email: e.target.value })}
              className="mt-1 w-full border-none bg-transparent text-sm text-zinc-600 outline-none"
            />
            <input
              value={lead.phone}
              onChange={(e) => onLeadChange({ ...lead, phone: e.target.value })}
              placeholder="Téléphone"
              className="mt-1 w-full border-none bg-transparent text-sm text-zinc-600 outline-none placeholder:text-zinc-300"
            />
          </div>
        </div>

        <table className="mt-8 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-widest text-zinc-400">
              <th className="py-2">Prestation</th>
              <th className="py-2 text-right">Montant HT</th>
            </tr>
          </thead>
          <tbody>
            {mainLines.map((line, index) => (
              <tr key={`${line.optionId}-${index}`} className="border-b border-zinc-100">
                <td className="py-3 pr-4">{line.optionLabel}</td>
                <td className="py-3 text-right tabular-nums">{formatPriceFR(line.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-end">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between text-zinc-500">
              <span>Total HT</span>
              <span className="tabular-nums">{formatPriceFR(pricing.total)}</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>TVA (20 %)</span>
              <span className="tabular-nums">{formatPriceFR(tva)}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-300 pt-2 text-base font-semibold text-zinc-900">
              <span>Total TTC</span>
              <span className="tabular-nums">{formatPriceFR(totalTTC)}</span>
            </div>
          </div>
        </div>

        {maintenanceNote && (
          <p className="mt-6 text-xs text-zinc-500">{maintenanceNote}</p>
        )}

        <div className="mt-10 space-y-1 border-t border-zinc-200 pt-6 text-xs leading-5 text-zinc-400">
          <p>Devis valable 30 jours à compter de sa date d&apos;émission.</p>
          <p>Acompte de 30 % à la commande, solde à la livraison.</p>
          <p>Estimation à affiner après une phase de cadrage détaillée avec le client.</p>
        </div>
      </div>
    </div>
  );
}
