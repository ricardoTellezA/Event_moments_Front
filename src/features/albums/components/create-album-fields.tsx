"use client";

import { CheckIcon } from "lucide-react";

import { Switch } from "@/components/ui/switch";

export function CreateAlbumStepper({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <ol className="grid grid-cols-3 gap-2 text-xs sm:flex sm:items-center sm:gap-3 sm:text-sm">
      {steps.map((item, index) => (
        <li key={item} className="flex min-w-0 flex-1 items-center gap-2">
          <span
            className={
              index <= currentStep
                ? "grid size-7 shrink-0 place-items-center rounded-full bg-afterglow text-xs font-semibold text-primary-foreground shadow-soft transition-all duration-300"
                : "grid size-7 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold text-muted-foreground transition-all duration-300"
            }
          >
            {index < currentStep ? (
              <CheckIcon className="size-3.5 animate-step-pop" />
            ) : (
              index + 1
            )}
          </span>
          <span
            className={
              index === currentStep
                ? "min-w-0 font-semibold leading-tight transition-colors duration-300"
                : "min-w-0 leading-tight text-muted-foreground transition-colors duration-300"
            }
          >
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">{label}</label>
      {children}
    </div>
  );
}

export function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full border border-transparent bg-afterglow px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 sm:px-4"
          : "rounded-full border border-border px-3.5 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted sm:px-4"
      }
    >
      {children}
    </button>
  );
}

export function ToggleRow({
  label,
  hint,
  checked,
  onCheckedChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-border/70 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card sm:p-4">
      <div>
        <p className="font-semibold">{label}</p>
        {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
