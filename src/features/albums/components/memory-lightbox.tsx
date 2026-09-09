"use client";

import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AlbumMemory } from "@/features/albums/types/album.types";

export function MemoryLightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: AlbumMemory[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const photo = photos[index];

  if (!photo) {
    return null;
  }

  const canNavigate = photos.length > 1;
  const previousIndex = index === 0 ? photos.length - 1 : index - 1;
  const nextIndex = index === photos.length - 1 ? 0 : index + 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-3 text-background backdrop-blur-sm animate-in fade-in-0"
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada del recuerdo"
    >
      <Button
        type="button"
        size="icon"
        variant="secondary"
        className="absolute right-3 top-3 z-10 rounded-full bg-background text-foreground shadow-soft"
        onClick={onClose}
        aria-label="Cerrar foto"
      >
        <XIcon />
      </Button>

      {canNavigate ? (
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background text-foreground shadow-soft"
          onClick={() => onIndexChange(previousIndex)}
          aria-label="Foto anterior"
        >
          <ChevronLeftIcon />
        </Button>
      ) : null}

      <figure className="w-full max-w-4xl animate-in zoom-in-95">
        <div className="relative mx-auto h-[74dvh] w-full overflow-hidden rounded-3xl bg-foreground">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            unoptimized
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
        <figcaption className="mx-auto mt-3 flex max-w-3xl items-center justify-between gap-3 px-2 text-sm">
          <span className="truncate font-semibold">{photo.guest}</span>
          <span className="shrink-0 text-background/70">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>

      {canNavigate ? (
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background text-foreground shadow-soft"
          onClick={() => onIndexChange(nextIndex)}
          aria-label="Siguiente foto"
        >
          <ChevronRightIcon />
        </Button>
      ) : null}
    </div>
  );
}
