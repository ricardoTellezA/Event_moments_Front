"use client";

import { useEffect, useState } from "react";
import { CheckCircle2Icon, XIcon } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";
import type { AlbumMemory } from "@/features/albums/types/album.types";

export function PublicUploadSuccessCard({
  count,
  memories,
  onDismiss,
  onUploadMore,
}: {
  count: number;
  memories: AlbumMemory[];
  onDismiss: () => void;
  onUploadMore: () => void;
}) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (count <= 0) {
      return;
    }

    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, 6500);
    const dismissTimer = window.setTimeout(() => {
      onDismiss();
    }, 7000);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(dismissTimer);
    };
  }, [count, onDismiss]);

  if (count <= 0) {
    return null;
  }

  return (
    <ScrollReveal
      className={`relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-5 shadow-soft transition-all duration-500 ${
        isLeaving
          ? "-translate-y-2 scale-[0.98] opacity-0"
          : "translate-y-0 scale-100 opacity-100"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-afterglow" />
      <div className="flex items-start gap-4 pr-10">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
          <CheckCircle2Icon className="size-5" />
        </span>
        <div>
          <h2 className="font-heading text-2xl font-semibold">
            {count === 1 ? "Recuerdo enviado" : "Recuerdos enviados"}
          </h2>
          <p className="mt-1 text-body-sm text-muted-foreground">
            {count === 1
              ? "Tu foto quedo guardada y puede pasar por revision antes de aparecer."
              : `${count} fotos quedaron guardadas y pueden pasar por revision antes de aparecer.`}
          </p>
        </div>
      </div>
      {memories.length > 0 ? (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {memories.slice(0, 6).map((memory) => (
            <div
              key={memory.id}
              className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-muted shadow-soft"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={memory.src}
                alt={memory.alt}
                className="size-full object-cover"
              />
            </div>
          ))}
          {memories.length > 6 ? (
            <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-muted text-sm font-semibold text-muted-foreground">
              +{memories.length - 6}
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" className="bg-afterglow" onClick={onUploadMore}>
          Subir mas
        </Button>
        <Button type="button" variant="outline" onClick={onDismiss}>
          Ver album
        </Button>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-3 top-3"
        onClick={() => {
          setIsLeaving(true);
          window.setTimeout(onDismiss, 260);
        }}
        aria-label="Cerrar confirmacion"
      >
        <XIcon />
      </Button>
    </ScrollReveal>
  );
}
