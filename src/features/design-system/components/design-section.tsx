import type { ReactNode } from "react";

type DesignSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function DesignSection({ title, description, children }: DesignSectionProps) {
  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-card sm:p-6">
      <div className="mb-5 max-w-2xl">
        <h2 className="text-heading-3">{title}</h2>
        {description ? (
          <p className="mt-1 text-body-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
