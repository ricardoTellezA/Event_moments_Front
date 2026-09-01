"use client";

import { LockIcon } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";
import { formatMsLeft } from "@/features/albums/lib/albums-store";
import type { EventAlbum } from "@/features/albums/types/album.types";

export function RevealPendingCard({
  album,
  msLeft,
  onOpen,
}: {
  album: EventAlbum;
  msLeft: number;
  onOpen: () => void;
}) {
  return (
    <ScrollReveal className="mx-auto max-w-xl rounded-[2rem] border border-border bg-card p-10 text-center shadow-lifted">
      <LockIcon className="mx-auto size-10 text-primary" />
      <h2 className="mt-5 font-heading text-4xl font-semibold">
        {album.photosCount} recuerdos guardados
      </h2>
      <p className="mt-2 text-muted-foreground">Todavia no puedes verlos.</p>
      <p className="mt-5 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
        Se revelan en {formatMsLeft(msLeft)}
      </p>
      <Button className="mt-6 bg-afterglow" onClick={onOpen}>
        Ver demo del album
      </Button>
    </ScrollReveal>
  );
}

export function FrozenAlbumCard({ album }: { album: EventAlbum }) {
  return (
    <ScrollReveal className="rounded-[2rem] border border-border bg-card p-8 text-center shadow-soft">
      <h2 className="font-heading text-3xl font-semibold">
        Este recuerdo quedo guardado
      </h2>
      <p className="mt-2 text-muted-foreground">
        {album.photosCount} recuerdos congelados como capsula del momento.
      </p>
    </ScrollReveal>
  );
}
