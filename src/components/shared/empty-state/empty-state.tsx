import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-dashed border-border bg-muted p-8 text-center",
        className,
      )}
    >
      {Icon ? (
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-card text-primary shadow-soft">
          <Icon className="size-5" />
        </span>
      ) : null}
      <h3 className="mt-4 text-heading-3">{title}</h3>
      {description ? (
        <p className="mx-auto mt-2 max-w-sm text-body-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
