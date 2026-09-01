import type { LucideIcon } from "lucide-react";

type HowItWorksStepProps = {
  index: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function HowItWorksStep({
  index,
  title,
  description,
  icon: Icon,
}: HowItWorksStepProps) {
  return (
    <article className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
      <span className="grid size-11 place-items-center rounded-2xl bg-soft-gradient">
        <Icon className="size-5 text-primary" />
      </span>
      <p className="mt-4 text-body-sm text-muted-foreground">Paso {index}</p>
      <h3 className="mt-1 text-heading-3">{title}</h3>
      <p className="mt-2 text-body-sm text-muted-foreground">{description}</p>
    </article>
  );
}
