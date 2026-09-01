import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <article className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <span className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-5 text-heading-3">{title}</h3>
      <p className="mt-2 text-body-sm text-muted-foreground">{description}</p>
    </article>
  );
}
