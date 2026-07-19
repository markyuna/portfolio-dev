import { CheckCircle2 } from "lucide-react";

export default function ConfirmationScreen() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-[-0.05em] text-white">
        Merci !
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-7 text-white/55">
        Je reviens vers vous sous 24–48 h avec une proposition.
      </p>
    </div>
  );
}
