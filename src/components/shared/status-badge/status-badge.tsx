import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type EventStatus = "open" | "reveal-pending" | "revealed" | "closed" | "frozen";

type StatusBadgeProps = {
  status: EventStatus;
  className?: string;
};

const statusConfig: Record<EventStatus, { label: string; className: string }> = {
  open: {
    label: "Open",
    className: "bg-primary-soft text-primary",
  },
  "reveal-pending": {
    label: "Reveal pending",
    className: "bg-warm/35 text-foreground",
  },
  revealed: {
    label: "Revealed",
    className: "bg-afterglow text-primary-foreground",
  },
  closed: {
    label: "Closed",
    className: "bg-muted text-muted-foreground",
  },
  frozen: {
    label: "Frozen",
    className: "bg-blush/25 text-foreground",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn("border-transparent", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
