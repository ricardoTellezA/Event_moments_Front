import type { AlbumStatus } from "@/features/albums/types/album.types";
import { cn } from "@/lib/utils";

const statusCopy: Record<AlbumStatus, { label: string; className: string }> = {
  open: { label: "Abierto", className: "bg-primary-soft text-primary" },
  "reveal-pending": {
    label: "Revelado pendiente",
    className: "bg-warm/35 text-foreground",
  },
  revealed: { label: "Revelado", className: "bg-afterglow text-primary-foreground" },
  closed: { label: "Finalizado", className: "bg-muted text-muted-foreground" },
  frozen: { label: "Congelado", className: "bg-blush/25 text-foreground" },
};

export function AlbumStatusLabel({
  status,
  className,
}: {
  status: AlbumStatus;
  className?: string;
}) {
  const config = statusCopy[status];

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
