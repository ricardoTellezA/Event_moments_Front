import { CameraIcon, HeartIcon, SparklesIcon, UsersIcon } from "lucide-react";

import type { MemoryBookSpread } from "@/features/albums/lib/memory-book";
import { formatBookDate } from "@/features/albums/lib/memory-book";
import type { EventAlbum } from "@/features/albums/types/album.types";

type MemoryBookPagesProps = {
  album: EventAlbum;
  photosCount: number;
  contributors: number;
  spreads: MemoryBookSpread[];
};

export function MemoryBookPages({
  album,
  photosCount,
  contributors,
  spreads,
}: MemoryBookPagesProps) {
  return (
    <div className="memory-book-pages mx-auto max-w-5xl space-y-8 print:mx-0 print:max-w-none print:space-y-0">
      <MemoryBookCover
        album={album}
        photosCount={photosCount}
        contributors={contributors}
      />
      {spreads.map((spread, index) => (
        <MemoryBookSpreadPage key={spread.title} spread={spread} index={index} />
      ))}
      <MemoryBookClosingPage album={album} photosCount={photosCount} />
    </div>
  );
}

function MemoryBookCover({
  album,
  photosCount,
  contributors,
}: {
  album: EventAlbum;
  photosCount: number;
  contributors: number;
}) {
  return (
    <section className="memory-book-page memory-book-cover relative overflow-hidden rounded-[2rem] border border-border bg-foreground text-background shadow-lifted print:rounded-none print:border-0 print:shadow-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={album.cover}
        alt=""
        className="absolute inset-0 size-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/90 via-foreground/60 to-foreground/20" />
      <div className="relative flex min-h-[760px] flex-col justify-between p-10 print:min-h-0 print:p-12">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-afterglow text-primary-foreground shadow-soft">
              <SparklesIcon className="size-5" />
            </span>
            <span className="text-label text-background">Keeps</span>
          </div>
          <span className="rounded-full bg-background/92 px-4 py-2 text-xs font-semibold text-foreground">
            Libro de recuerdos
          </span>
        </div>
        <div>
          <p className="text-label text-background/75">{formatBookDate(album.date)}</p>
          <h1 className="mt-4 max-w-3xl font-heading text-6xl font-semibold leading-[0.95] print:text-6xl">
            {album.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-background/82">
            Un album armado con las fotos que compartieron los invitados durante el
            evento.
          </p>
        </div>
        <div className="grid max-w-xl gap-3 sm:grid-cols-3">
          <BookStat icon={CameraIcon} label="recuerdos" value={photosCount} />
          <BookStat icon={UsersIcon} label="invitados" value={contributors} />
          <BookStat icon={HeartIcon} label="album" value="PDF" />
        </div>
      </div>
    </section>
  );
}

function BookStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CameraIcon;
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl bg-background/12 p-4 backdrop-blur">
      <Icon className="size-5 text-background/85" />
      <p className="mt-5 font-heading text-3xl font-semibold">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-background/68">
        {label}
      </p>
    </div>
  );
}

function MemoryBookSpreadPage({
  spread,
  index,
}: {
  spread: MemoryBookSpread;
  index: number;
}) {
  const heroPhoto = spread.photos[0];
  const gridPhotos = spread.photos.slice(1, 6);

  return (
    <section className="memory-book-page rounded-[2rem] border border-border bg-card p-8 shadow-lifted print:rounded-none print:border-0 print:shadow-none">
      <div className="grid h-full gap-7 lg:grid-cols-[0.9fr_1.1fr] print:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-label text-primary">Capitulo {index + 1}</p>
            <h2 className="mt-4 font-heading text-5xl font-semibold leading-tight">
              {spread.title}
            </h2>
            <p className="mt-4 max-w-sm text-body text-muted-foreground">
              {spread.subtitle}
            </p>
          </div>
          {heroPhoto ? (
            <PhotoCredit guest={heroPhoto.guest} index={1} className="mt-8" />
          ) : null}
        </div>
        <div className="grid min-h-[620px] grid-rows-[1.15fr_0.85fr] gap-4 print:min-h-0">
          {heroPhoto ? (
            <BookPhoto photo={heroPhoto} className="rounded-[1.75rem]" />
          ) : null}
          <div className="grid grid-cols-2 gap-4">
            {gridPhotos.map((photo, photoIndex) => (
              <BookPhoto
                key={photo.id}
                photo={photo}
                className={photoIndex === 2 ? "col-span-2" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BookPhoto({
  photo,
  className,
}: {
  photo: EventAlbum["photos"][number];
  className?: string;
}) {
  return (
    <figure className={`relative min-h-44 overflow-hidden bg-muted ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.originalSrc ?? photo.src}
        alt={photo.alt}
        className="size-full object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-3 text-xs font-semibold text-background">
        {photo.guest}
      </figcaption>
    </figure>
  );
}

function PhotoCredit({
  guest,
  index,
  className,
}: {
  guest: string;
  index: number;
  className?: string;
}) {
  return (
    <p className={`text-sm text-muted-foreground ${className ?? ""}`}>
      Foto principal por <span className="font-semibold text-foreground">{guest}</span> -
      recuerdo {index}
    </p>
  );
}

function MemoryBookClosingPage({
  album,
  photosCount,
}: {
  album: EventAlbum;
  photosCount: number;
}) {
  return (
    <section className="memory-book-page flex flex-col justify-between rounded-[2rem] border border-border bg-soft-gradient p-10 shadow-lifted print:rounded-none print:border-0 print:shadow-none">
      <div>
        <p className="text-label text-primary">Keeps</p>
        <h2 className="mt-4 max-w-2xl font-heading text-6xl font-semibold leading-[0.95]">
          Gracias por compartir este recuerdo.
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-[1fr_280px] sm:items-end">
        <p className="max-w-xl text-body text-muted-foreground">
          {album.name} queda guardado con {photosCount} recuerdos compartidos por sus
          invitados. Cada foto forma parte de una historia hecha entre todos.
        </p>
        <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
          <p className="text-label">Album original</p>
          <p className="mt-2 break-all text-body-sm text-muted-foreground">
            keeps.tellez.website/a/{album.id}
          </p>
        </div>
      </div>
    </section>
  );
}
