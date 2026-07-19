"use client";

import { AlertCircle, Send } from "lucide-react";
import type { LeadInfo } from "@/lib/questionnaire.types";

interface LeadCaptureStepProps {
  lead: LeadInfo;
  onChange: (lead: LeadInfo) => void;
  onSubmit: () => void;
  submitting: boolean;
  errorMessage: string | null;
}

const fieldClasses =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:bg-white/10";

export default function LeadCaptureStep({
  lead,
  onChange,
  onSubmit,
  submitting,
  errorMessage,
}: LeadCaptureStepProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h3 className="text-lg font-semibold tracking-[-0.02em] text-white">
        Vos coordonnées
      </h3>
      <p className="mt-2 text-sm leading-6 text-white/50">
        Dernière étape — je reviens vers vous avec une proposition détaillée.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="mb-2 block text-sm text-white/60">
            Nom<span className="ml-1 text-violet-400">*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            required
            value={lead.name}
            onChange={(e) => onChange({ ...lead, name: e.target.value })}
            placeholder="Votre nom"
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="lead-company" className="mb-2 block text-sm text-white/60">
            Entreprise
          </label>
          <input
            id="lead-company"
            type="text"
            value={lead.company}
            onChange={(e) => onChange({ ...lead, company: e.target.value })}
            placeholder="Facultatif"
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="lead-email" className="mb-2 block text-sm text-white/60">
            Email<span className="ml-1 text-violet-400">*</span>
          </label>
          <input
            id="lead-email"
            type="email"
            required
            value={lead.email}
            onChange={(e) => onChange({ ...lead, email: e.target.value })}
            placeholder="vous@exemple.com"
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="lead-phone" className="mb-2 block text-sm text-white/60">
            Téléphone
          </label>
          <input
            id="lead-phone"
            type="tel"
            value={lead.phone}
            onChange={(e) => onChange({ ...lead, phone: e.target.value })}
            placeholder="Facultatif"
            className={fieldClasses}
          />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-white/60">
        <input
          type="checkbox"
          required
          checked={lead.consent}
          onChange={(e) => onChange({ ...lead, consent: e.target.checked })}
          className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 text-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        />
        <span>
          J&apos;accepte que mes données soient utilisées pour être recontacté(e)
          au sujet de ma demande de projet. Elles ne sont ni revendues, ni
          partagées avec des tiers.
          <span className="ml-1 text-violet-400">*</span>
        </span>
      </label>

      {errorMessage && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition duration-300 hover:scale-[1.01] hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Envoi en cours..." : "Envoyer ma demande"}
        <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
