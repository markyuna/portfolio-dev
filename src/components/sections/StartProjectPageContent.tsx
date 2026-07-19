import { Sparkles } from "lucide-react";
import QuestionnaireFlow from "@/components/questionnaire/QuestionnaireFlow";

export default function StartProjectPageContent() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] px-6 py-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,0.16),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(168,85,247,0.14),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(124,58,237,0.06)_1px,transparent_1px),linear-gradient(to_right,rgba(124,58,237,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.16]" />

      <section className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-14 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-white/70 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Démarrer un projet
          </div>

          <h1 className="text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-white md:text-6xl">
            Décrivez votre projet,{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              obtenez une estimation
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/55 md:text-lg">
            Quelques questions pour cadrer votre besoin. Vous recevez une
            fourchette de prix indicative en direct, puis je reviens vers vous
            avec une proposition détaillée sous 24–48 h.
          </p>
        </div>

        <QuestionnaireFlow />
      </section>
    </main>
  );
}
