"use client";

import { useRef, useState } from "react";
import { Download, Printer } from "lucide-react";
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

  const printRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    if (!printRef.current) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(printRef.current, { scale: 2, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/jpeg", 0.85);

      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const safeName = (lead.name || "client").trim().replace(/[^\p{L}\p{N}]+/gu, "-");
      pdf.save(`Devis-${devisNumber || "brouillon"}-${safeName}.pdf`);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div>
      <div className="no-print mb-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <Printer className="h-4 w-4" />
          Imprimer
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Download className="h-4 w-4" />
          {downloading ? "Génération..." : "Télécharger le devis (PDF)"}
        </button>
      </div>

      <div
        ref={printRef}
        className="devis-print rounded-2xl border border-zinc-300 bg-white p-6 text-zinc-900 shadow-xl print:rounded-none print:border-none print:shadow-none"
      >
        <div className="flex items-start justify-between border-b border-zinc-200 pb-3">
          <div>
            <input
              value={issuer.name}
              onChange={(e) => onIssuerChange({ ...issuer, name: e.target.value })}
              className="w-full border-none bg-transparent text-sm font-semibold leading-tight outline-none"
            />
            <input
              value={issuer.email}
              onChange={(e) => onIssuerChange({ ...issuer, email: e.target.value })}
              className="w-full border-none bg-transparent text-xs leading-tight text-zinc-500 outline-none"
            />
            <input
              value={issuer.address}
              onChange={(e) => onIssuerChange({ ...issuer, address: e.target.value })}
              placeholder="Adresse"
              className="w-full border-none bg-transparent text-xs leading-tight text-zinc-500 outline-none placeholder:text-zinc-300"
            />
            <input
              value={issuer.siret}
              onChange={(e) => onIssuerChange({ ...issuer, siret: e.target.value })}
              placeholder="SIRET"
              className="w-full border-none bg-transparent text-xs leading-tight text-zinc-500 outline-none placeholder:text-zinc-300"
            />
          </div>

          <div className="text-right">
            <p className="text-lg font-bold leading-tight tracking-tight">DEVIS</p>
            <input
              value={devisNumber}
              onChange={(e) => onDevisNumberChange(e.target.value)}
              className="w-40 border-none bg-transparent text-right text-xs leading-tight text-zinc-500 outline-none"
            />
            <p className="text-xs leading-tight text-zinc-500">{formatDateFR(new Date())}</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-400">Client</p>
            <input
              value={lead.name}
              onChange={(e) => onLeadChange({ ...lead, name: e.target.value })}
              className="w-full border-none bg-transparent text-xs font-medium leading-tight outline-none"
            />
            <input
              value={lead.company}
              onChange={(e) => onLeadChange({ ...lead, company: e.target.value })}
              placeholder="Entreprise"
              className="w-full border-none bg-transparent text-xs leading-tight text-zinc-600 outline-none placeholder:text-zinc-300"
            />
            <input
              value={lead.email}
              onChange={(e) => onLeadChange({ ...lead, email: e.target.value })}
              className="w-full border-none bg-transparent text-xs leading-tight text-zinc-600 outline-none"
            />
            <input
              value={lead.phone}
              onChange={(e) => onLeadChange({ ...lead, phone: e.target.value })}
              placeholder="Téléphone"
              className="w-full border-none bg-transparent text-xs leading-tight text-zinc-600 outline-none placeholder:text-zinc-300"
            />
          </div>
        </div>

        <table className="mt-4 w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-300 text-left text-[10px] uppercase tracking-widest text-zinc-400">
              <th className="py-1">Prestation</th>
              <th className="py-1 text-right">Montant HT</th>
            </tr>
          </thead>
          <tbody>
            {mainLines.map((line, index) => (
              <tr key={`${line.optionId}-${index}`} className="border-b border-zinc-100">
                <td className="py-1 pr-4">{line.optionLabel}</td>
                <td className="py-1 text-right tabular-nums">{formatPriceFR(line.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-3 flex justify-end">
          <div className="w-56 space-y-1 text-xs">
            <div className="flex justify-between text-zinc-500">
              <span>Total HT</span>
              <span className="tabular-nums">{formatPriceFR(pricing.total)}</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>TVA (20 %)</span>
              <span className="tabular-nums">{formatPriceFR(tva)}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-300 pt-1 text-sm font-semibold text-zinc-900">
              <span>Total TTC</span>
              <span className="tabular-nums">{formatPriceFR(totalTTC)}</span>
            </div>
          </div>
        </div>

        {maintenanceNote && (
          <p className="mt-3 text-[10px] leading-tight text-zinc-500">{maintenanceNote}</p>
        )}

        <div className="mt-4 space-y-0.5 border-t border-zinc-200 pt-3 text-[10px] leading-tight text-zinc-400">
          <p>Devis valable 30 jours à compter de sa date d&apos;émission.</p>
          <p>Acompte de 30 % à la commande, solde à la livraison.</p>
          <p>Estimation à affiner après une phase de cadrage détaillée avec le client.</p>
        </div>
      </div>
    </div>
  );
}
