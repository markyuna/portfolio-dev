interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

export default function StepProgress({ currentStep, totalSteps, stepLabel }: StepProgressProps) {
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/45">
        <span>
          Étape {currentStep} / {totalSteps}
        </span>
        <span>{stepLabel}</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 transition-all duration-500 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
