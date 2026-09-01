import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        action ? "sm:flex-row sm:items-end sm:justify-between sm:text-left" : null,
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" ? "mx-auto" : null)}>
        {eyebrow ? (
          <p className="text-caption uppercase tracking-widest text-primary">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-heading-1">{title}</h2>
        {description ? (
          <p className="mt-3 text-body text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
