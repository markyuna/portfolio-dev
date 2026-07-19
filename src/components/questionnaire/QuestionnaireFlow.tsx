"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { questionnaireSections, showEstimateToClient } from "@/lib/questionnaire.config";
import { computePricing } from "@/lib/pricing";
import type { LeadInfo, QuestionnaireAnswers, TextQuestion } from "@/lib/questionnaire.types";
import {
  clearDraftAnswers,
  saveDraftAnswers,
  useDraftAnswers,
} from "@/lib/questionnaire-storage";
import QuestionSingleChoice from "@/components/questionnaire/QuestionSingleChoice";
import QuestionMultipleChoice from "@/components/questionnaire/QuestionMultipleChoice";
import QuestionText from "@/components/questionnaire/QuestionText";
import StepProgress from "@/components/questionnaire/StepProgress";
import EstimatePill from "@/components/questionnaire/EstimatePill";
import LeadCaptureStep from "@/components/questionnaire/LeadCaptureStep";
import ConfirmationScreen from "@/components/questionnaire/ConfirmationScreen";

const EMPTY_LEAD: LeadInfo = {
  name: "",
  company: "",
  email: "",
  phone: "",
  consent: false,
};

const totalSteps = questionnaireSections.length + 1;

export default function QuestionnaireFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const draftAnswers = useDraftAnswers();
  const [edits, setEdits] = useState<QuestionnaireAnswers>({});
  const [lead, setLead] = useState<LeadInfo>(EMPTY_LEAD);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const answers = useMemo(
    () => ({ ...(draftAnswers ?? {}), ...edits }),
    [draftAnswers, edits],
  );

  useEffect(() => {
    if (Object.keys(answers).length > 0) saveDraftAnswers(answers);
  }, [answers]);

  const pricing = useMemo(() => computePricing(answers), [answers]);

  const isLeadStep = stepIndex === questionnaireSections.length;
  const section = isLeadStep ? null : questionnaireSections[stepIndex];

  function setAnswer(questionId: string, value: string | string[]) {
    setEdits((prev) => ({ ...prev, [questionId]: value }));
  }

  function goNext() {
    if (section) {
      const missing = section.questions.find(
        (q) => q.required && !answers[q.id],
      );
      if (missing) {
        setValidationMessage(`Merci de répondre à : « ${missing.label} »`);
        return;
      }
    }
    setValidationMessage(null);
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  }

  function goBack() {
    setValidationMessage(null);
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function handleSubmit() {
    if (!lead.consent) {
      setErrorMessage("Merci d'accepter l'utilisation de vos données pour continuer.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          lead,
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setErrorMessage(data.error ?? "Une erreur est survenue. Merci de réessayer.");
        setSubmitting(false);
        return;
      }

      clearDraftAnswers();
      setSubmitted(true);
    } catch {
      setErrorMessage("Erreur réseau. Merci de réessayer.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <ConfirmationScreen />;
  }

  return (
    <div className="relative pb-28">
      <StepProgress
        currentStep={stepIndex + 1}
        totalSteps={totalSteps}
        stepLabel={isLeadStep ? "Coordonnées" : (section?.title ?? "")}
      />

      <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="motion-reduce:transition-none"
          >
            {isLeadStep ? (
              <LeadCaptureStep
                lead={lead}
                onChange={setLead}
                onSubmit={handleSubmit}
                submitting={submitting}
                errorMessage={errorMessage}
              />
            ) : (
              section && (
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="mt-2 text-sm leading-6 text-white/50">
                      {section.description}
                    </p>
                  )}

                  <div className="mt-8 flex flex-col gap-8">
                    {section.questions.map((question) => {
                      if (question.kind === "single") {
                        return (
                          <QuestionSingleChoice
                            key={question.id}
                            question={question}
                            value={answers[question.id] as string | undefined}
                            onChange={(id) => setAnswer(question.id, id)}
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
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>

        {validationMessage && (
          <p className="mt-6 text-sm font-medium text-red-300">{validationMessage}</p>
        )}

        {!isLeadStep && (
          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Précédent
            </button>

            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              Suivant
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {isLeadStep && stepIndex > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Précédent
          </button>
        )}
      </div>

      {showEstimateToClient && (
        <EstimatePill rangeLow={pricing.rangeLow} rangeHigh={pricing.rangeHigh} />
      )}
    </div>
  );
}
