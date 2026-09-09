"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckIcon, Trash2Icon, XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MemoryLightbox } from "@/features/albums/components/memory-lightbox";
import type { AlbumMemory } from "@/features/albums/types/album.types";
import { cn } from "@/lib/utils";

export function MemoryGrid({
  photos,
  moderation = false,
  showStatus = false,
  onApprove,
  onReject,
  onRemove,
  className,
}: {
  photos: AlbumMemory[];
  moderation?: boolean;
  showStatus?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onRemove?: (id: string) => void;
  className?: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
        Todavia no hay recuerdos aqui. Se el primero en subir.
      </p>
    );
  }

  if (moderation) {
    return (
      <div className={cn("space-y-3", className)}>
        {photos.map((photo, index) => (
          <figure
            key={photo.id}
            className="flex gap-3 rounded-2xl border border-border bg-card p-2 shadow-soft"
          >
            <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-28">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={240}
                height={240}
                unoptimized
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 py-1 pr-1">
              <figcaption>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {photo.guest}
                    </p>
                    <p className="text-xs text-muted-foreground">Recuerdo {index + 1}</p>
                  </div>
                  <Badge
                    variant={photo.status === "rejected" ? "destructive" : "secondary"}
                    className="h-6 shrink-0 rounded-full px-2 text-[0.68rem]"
                  >
                    {photo.status === "pending"
                      ? "Pendiente"
                      : photo.status === "rejected"
                        ? "Rechazada"
                        : "Aprobada"}
                  </Badge>
                </div>
              </figcaption>
              <div className="mt-4 flex items-center gap-2">
                <Button
                  size="icon-sm"
                  variant={photo.status === "approved" ? "secondary" : "soft"}
                  disabled={photo.status === "approved"}
                  onClick={() => onApprove?.(photo.id)}
                  aria-label="Aprobar recuerdo"
                  className="size-9 rounded-full"
                >
                  <CheckIcon />
                </Button>
                <Button
                  size="icon-sm"
                  variant="outline"
                  disabled={photo.status === "rejected"}
                  onClick={() => onReject?.(photo.id)}
                  aria-label="Rechazar recuerdo"
                  className="size-9 rounded-full"
                >
                  <XIcon />
                </Button>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => onRemove?.(photo.id)}
                  aria-label="Eliminar recuerdo"
                  className="ml-auto size-9 rounded-full text-destructive hover:text-destructive"
                >
                  <Trash2Icon />
                </Button>
              </div>
            </div>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={cn("columns-2 gap-3 sm:columns-3 lg:columns-4", className)}>
        {photos.map((photo, index) => (
          <figure
            key={photo.id}
            className="group relative mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-muted shadow-soft"
          >
            <button
              type="button"
              className="block w-full text-left"
              onClick={() => setLightboxIndex(index)}
              aria-label={`Abrir recuerdo ${index + 1}`}
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
            </button>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-3 text-xs font-semibold text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {photo.guest} · recuerdo {index + 1}
            </figcaption>
            {moderation || showStatus ? (
              <Badge
                variant={photo.status === "rejected" ? "destructive" : "secondary"}
                className="absolute left-2 top-2 h-7 rounded-full bg-card/90 px-2.5 text-xs shadow-soft backdrop-blur"
              >
                {photo.status === "pending"
                  ? "Pendiente"
                  : photo.status === "rejected"
                    ? "Rechazada"
                    : "Aprobada"}
              </Badge>
            ) : null}
            {moderation ? (
              <div className="absolute inset-x-2 bottom-2 flex justify-end gap-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
                {photo.status !== "approved" ? (
                  <Button
                    size="icon-sm"
                    className="size-8 bg-card/95 text-foreground shadow-soft hover:bg-card"
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
                    className="size-8 bg-card/95 shadow-soft"
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
                className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-card/90 text-foreground shadow-soft transition-all duration-300 hover:bg-card sm:opacity-0 sm:group-hover:opacity-100"
              >
                <XIcon className="size-4" />
              </button>
            ) : null}
          </figure>
        ))}
      </div>
      {lightboxIndex !== null ? (
        <MemoryLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      ) : null}
    </>
  );
}
