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
  const usesApiCover = album.cover.includes("/api/v1/events/");

  return (
    <header className="relative h-[34vh] min-h-64 overflow-hidden sm:h-[42vh] sm:min-h-72">
      {usesApiCover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={album.cover}
          alt={`Portada de ${album.name}`}
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <Image
          src={album.cover}
          alt={`Portada de ${album.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/72 via-45% to-background/8" />
      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-4 pb-6 sm:px-5 sm:pb-8">
        <AlbumStatusLabel status={status} />
        <h1 className="mt-3 max-w-[16ch] font-heading text-[clamp(2rem,10vw,3rem)] font-semibold leading-[0.98] [overflow-wrap:anywhere] sm:max-w-none sm:text-5xl">
          {album.name}
        </h1>
        <div className="mt-3 flex flex-wrap gap-2 text-[0.8rem] font-semibold text-muted-foreground sm:text-base sm:font-normal">
          <span className="rounded-full bg-background/82 px-2.5 py-1 shadow-soft backdrop-blur sm:bg-transparent sm:p-0 sm:shadow-none">
            {album.photosCount} recuerdos
          </span>
          <span className="rounded-full bg-background/82 px-2.5 py-1 shadow-soft backdrop-blur sm:bg-transparent sm:p-0 sm:shadow-none">
            {album.contributors} personas
          </span>
          <span className="rounded-full bg-background/82 px-2.5 py-1 shadow-soft backdrop-blur sm:bg-transparent sm:p-0 sm:shadow-none">
            {album.views} visitas
          </span>
        </div>
      </div>
    </header>
  );
}
