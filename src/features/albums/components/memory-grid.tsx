"use client";

import Image from "next/image";
import { CheckIcon, XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AlbumMemory } from "@/features/albums/types/album.types";
import { cn } from "@/lib/utils";

export function MemoryGrid({
  photos,
  moderation = false,
  onApprove,
  onReject,
  onRemove,
  className,
}: {
  photos: AlbumMemory[];
  moderation?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onRemove?: (id: string) => void;
  className?: string;
}) {
  if (photos.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
        Todavia no hay recuerdos aqui. Se el primero en subir.
      </p>
    );
  }

  return (
    <div className={cn("columns-2 gap-3 sm:columns-3 lg:columns-4", className)}>
      {photos.map((photo, index) => (
        <figure
          key={photo.id}
          className="group relative mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-muted shadow-soft"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={720}
            height={900}
            unoptimized
            loading="lazy"
            className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-3 text-xs font-semibold text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {photo.guest} · recuerdo {index + 1}
          </figcaption>
          {moderation ? (
            <Badge
              variant={photo.status === "rejected" ? "destructive" : "secondary"}
              className="absolute left-2 top-2 bg-card/90"
            >
              {photo.status === "pending"
                ? "Pendiente"
                : photo.status === "rejected"
                  ? "Rechazada"
                  : "Aprobada"}
            </Badge>
          ) : null}
          {moderation ? (
            <div className="absolute inset-x-2 bottom-2 flex gap-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
              {photo.status !== "approved" ? (
                <Button
                  size="icon-sm"
                  className="bg-card/95 text-foreground shadow-soft hover:bg-card"
                  onClick={() => onApprove?.(photo.id)}
                  aria-label="Aprobar recuerdo"
                >
                  <CheckIcon />
                </Button>
              ) : null}
              {photo.status !== "rejected" ? (
                <Button
                  size="icon-sm"
                  variant="outline"
                  className="bg-card/95 shadow-soft"
                  onClick={() => onReject?.(photo.id)}
                  aria-label="Rechazar recuerdo"
                >
                  <XIcon />
                </Button>
              ) : null}
            </div>
          ) : null}
          {onRemove ? (
            <button
              type="button"
              aria-label="Eliminar recuerdo"
              onClick={() => onRemove(photo.id)}
              className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-card/90 text-foreground opacity-0 shadow-soft transition-all duration-300 hover:bg-card group-hover:opacity-100"
            >
              <XIcon className="size-4" />
            </button>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
