"use client";

import Image from "next/image";

import { AlbumStatusLabel } from "@/features/albums/components/album-status-label";
import type { AlbumStatus, EventAlbum } from "@/features/albums/types/album.types";

export function PublicAlbumHero({
  album,
  status,
}: {
  album: EventAlbum;
  status: AlbumStatus;
}) {
  return (
    <header className="relative h-[42vh] min-h-72 overflow-hidden">
      <Image
        src={album.cover}
        alt={`Portada de ${album.name}`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-5 pb-8">
        <AlbumStatusLabel status={status} />
        <h1 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">
          {album.name}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {album.photosCount} recuerdos · {album.contributors} personas ·{" "}
          {album.views} visitas
        </p>
      </div>
    </header>
  );
}
