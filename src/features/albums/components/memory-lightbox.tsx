"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
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

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!photo) {
    return null;
  }

  const canNavigate = photos.length > 1;
  const previousIndex = index === 0 ? photos.length - 1 : index - 1;
  const nextIndex = index === photos.length - 1 ? 0 : index + 1;

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-foreground/35 p-4 text-foreground backdrop-blur-md animate-in fade-in-0"
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada del recuerdo"
    >
      <figure className="relative grid max-h-[calc(100dvh-2rem)] w-full max-w-lg animate-in zoom-in-95 grid-rows-[auto_auto] gap-3 overflow-hidden rounded-[1.75rem] border border-border bg-card p-3 text-card-foreground shadow-floating sm:max-w-3xl sm:rounded-[2rem] sm:p-4">
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4 z-20 rounded-full bg-card/95 text-foreground shadow-soft backdrop-blur"
          onClick={onClose}
          aria-label="Cerrar foto"
        >
          <XIcon />
        </Button>

        <div className="relative min-h-0 overflow-hidden rounded-[1.25rem] bg-muted sm:rounded-[1.5rem]">
          <div className="relative h-[min(68dvh,34rem)] w-full">
            <Image
              src={photo.originalSrc ?? photo.src}
              alt={photo.alt}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, 768px"
              className="object-contain"
              priority
            />
          </div>

          {canNavigate ? (
            <>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-card/95 text-foreground shadow-soft backdrop-blur"
                onClick={() => onIndexChange(previousIndex)}
                aria-label="Foto anterior"
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-card/95 text-foreground shadow-soft backdrop-blur"
                onClick={() => onIndexChange(nextIndex)}
                aria-label="Siguiente foto"
              >
                <ChevronRightIcon />
              </Button>
            </>
          ) : null}
        </div>

        <figcaption className="flex items-center justify-between gap-3 px-1 pb-1 text-sm">
          <span className="min-w-0 truncate font-semibold">{photo.guest}</span>
          <span className="shrink-0 text-muted-foreground">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}
