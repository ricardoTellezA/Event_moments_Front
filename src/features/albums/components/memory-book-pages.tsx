import { SparklesIcon } from "lucide-react";

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
    <div className="memory-book-pages mx-auto max-w-5xl space-y-6 sm:space-y-8 print:mx-0 print:max-w-none print:space-y-0">
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
  const previewPhotos = album.photos.slice(0, 4);

  return (
    <section className="memory-book-page memory-book-cover relative overflow-hidden rounded-[1.5rem] border border-[#d6c8b8] bg-[#f5efe6] text-[#1f1b18] shadow-lifted sm:rounded-[2rem] print:rounded-none print:border-0 print:shadow-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.95),transparent_28%),radial-gradient(circle_at_92%_18%,rgba(201,178,151,0.28),transparent_24%),linear-gradient(135deg,#fbf7ef,#e8dccd)]" />
      <div className="absolute inset-x-5 top-6 h-px bg-[#1f1b18]/18 sm:inset-x-8 sm:top-8" />
      <div className="relative flex min-h-0 flex-col p-5 sm:min-h-[760px] sm:p-8 print:min-h-0 print:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-[#1f1b18] text-[#f5efe6] shadow-soft sm:size-11">
              <SparklesIcon className="size-4 sm:size-5" />
            </span>
            <span className="text-sm font-semibold tracking-wide">Keeps</span>
          </div>
          <p className="max-w-28 text-right text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-[#1f1b18]/62 sm:max-w-none sm:text-[0.65rem] sm:tracking-[0.32em]">
            Digital memory book
          </p>
        </div>

        <div className="mt-8 text-center sm:mt-10">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#1f1b18]/64 sm:text-xs sm:tracking-[0.42em]">
            {formatBookDate(album.date)}
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-heading text-[clamp(2.35rem,12vw,4rem)] font-medium uppercase leading-[0.98] tracking-[0.08em] [overflow-wrap:anywhere] sm:text-6xl sm:tracking-[0.12em] print:text-6xl">
            {album.name}
          </h1>
          <div className="mx-auto mt-4 h-px w-36 bg-[#1f1b18]/28 sm:mt-5 sm:w-52" />
          <p className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#1f1b18]/72 sm:text-xs sm:tracking-[0.3em]">
            {photosCount} recuerdos | {contributors} invitados | Album completo
          </p>
        </div>

        <div className="mt-8 grid flex-1 items-end gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-[0.82fr_1.18fr] print:grid-cols-[0.82fr_1.18fr]">
          <div className="relative mx-auto w-full max-w-[14rem] sm:max-w-xs">
            <div className="rounded-[1.35rem] bg-white p-2.5 shadow-[0_24px_60px_rgba(53,39,25,0.2)] sm:rounded-[1.6rem] sm:p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={album.cover}
                alt=""
                className="aspect-[4/5] w-full rounded-[1rem] object-cover sm:rounded-[1.1rem]"
              />
              <div className="px-2 py-3 text-center sm:py-4">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#1f1b18]/58">
                  Evento
                </p>
                <p className="mt-1 truncate font-heading text-lg font-medium sm:text-xl">
                  {album.name}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[1.35rem] bg-white p-3 shadow-[0_28px_70px_rgba(53,39,25,0.22)] sm:rounded-[1.8rem] sm:p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {getCoverPreviewPhotos(previewPhotos, album).map((photo, index) => (
                  <figure
                    key={photo.id}
                    className={index === 0 ? "sm:col-span-2" : undefined}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.originalSrc ?? photo.src}
                      alt={photo.alt}
                      className={
                        index === 0
                          ? "aspect-[16/9] w-full rounded-xl object-cover"
                          : "aspect-square w-full rounded-xl object-cover"
                      }
                    />
                  </figure>
                ))}
              </div>
            </div>
            <div className="mt-3 max-w-full rounded-full bg-[#d8c3ad]/88 px-4 py-2 text-center text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#1f1b18]/74 shadow-soft sm:absolute sm:-right-4 sm:top-8 sm:mt-0 sm:max-w-60 sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.22em] print:right-2">
              Listo para imprimir o guardar en PDF
            </div>
          </div>
        </div>
      </div>
    </section>
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
  const gridPhotos = spread.photos.slice(1, 7);

  return (
    <section className="memory-book-page relative overflow-hidden rounded-[1.5rem] border border-[#d6c8b8] bg-[#faf6ee] p-5 text-[#1f1b18] shadow-lifted sm:rounded-[2rem] sm:p-8 print:rounded-none print:border-0 print:shadow-none">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,27,24,0.08)_0,transparent_8%,transparent_92%,rgba(31,27,24,0.06)_100%)]" />
      <div className="relative grid h-full gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-7 print:grid-cols-[0.78fr_1.22fr]">
        <div className="flex flex-col justify-between border-b border-[#1f1b18]/12 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6 print:border-b-0 print:border-r print:pr-6">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8f7256] sm:text-xs sm:tracking-[0.34em]">
              Capitulo {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(2rem,10vw,3.5rem)] font-medium leading-[0.98] tracking-wide [overflow-wrap:anywhere] sm:mt-5">
              {spread.title}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#1f1b18]/62 sm:mt-5 sm:text-base sm:leading-7">
              {spread.subtitle}
            </p>
          </div>
          {heroPhoto ? (
            <PhotoCredit guest={heroPhoto.guest} index={1} className="mt-8" />
          ) : null}
        </div>
        <div className="grid min-h-0 gap-4 sm:gap-5 lg:min-h-[620px] lg:grid-rows-[1.05fr_0.95fr] print:min-h-0">
          {heroPhoto ? (
            <BookPhoto photo={heroPhoto} className="h-full" featured />
          ) : null}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {gridPhotos.map((photo) => (
              <BookPhoto
                key={photo.id}
                photo={photo}
                className="h-full"
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
  featured = false,
}: {
  photo: EventAlbum["photos"][number];
  className?: string;
  featured?: boolean;
}) {
  return (
    <figure
      className={`relative flex min-h-0 flex-col overflow-hidden rounded-[1.1rem] bg-white p-2 shadow-[0_18px_42px_rgba(53,39,25,0.16)] sm:rounded-[1.35rem] ${className ?? ""}`}
    >
      <div className="min-h-0 flex-1 overflow-hidden rounded-[0.85rem] sm:rounded-[1rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.originalSrc ?? photo.src}
          alt={photo.alt}
          className={`size-full object-cover ${featured ? "min-h-52" : "min-h-28"}`}
        />
      </div>
      <figcaption className="shrink-0 truncate px-1.5 pt-2 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-[#1f1b18]/52 sm:px-2 sm:text-[0.65rem] sm:tracking-[0.14em]">
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
    <p className={`text-sm leading-6 text-[#1f1b18]/58 ${className ?? ""}`}>
      Foto principal por <span className="font-semibold text-[#1f1b18]">{guest}</span> -
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
    <section className="memory-book-page relative flex flex-col justify-between gap-10 overflow-hidden rounded-[1.5rem] border border-[#d6c8b8] bg-[#f5efe6] p-6 text-[#1f1b18] shadow-lifted sm:rounded-[2rem] sm:p-10 print:rounded-none print:border-0 print:shadow-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(216,195,173,0.48),transparent_24%),linear-gradient(135deg,#fffaf1,#eadfce)]" />
      <div className="relative">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8f7256] sm:text-xs sm:tracking-[0.34em]">
          Keeps
        </p>
        <h2 className="mt-5 max-w-3xl font-heading text-[clamp(2.55rem,13vw,4rem)] font-medium uppercase leading-[0.98] tracking-[0.04em] [overflow-wrap:anywhere] sm:text-6xl sm:leading-[0.96] sm:tracking-[0.08em]">
          Gracias por compartir este recuerdo.
        </h2>
      </div>
      <div className="relative grid gap-6 sm:grid-cols-[1fr_280px] sm:items-end">
        <p className="max-w-xl text-sm leading-7 text-[#1f1b18]/64 sm:text-base sm:leading-8">
          {album.name} queda guardado con {photosCount} recuerdos compartidos por sus
          invitados. Cada foto forma parte de una historia hecha entre todos.
        </p>
        <div className="rounded-3xl border border-[#d8cbbb] bg-white/72 p-5 shadow-soft">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#8f7256] sm:text-xs sm:tracking-[0.24em]">
            Album original
          </p>
          <p className="mt-3 break-all text-sm leading-6 text-[#1f1b18]/62">
            keeps.tellez.website/a/{album.id}
          </p>
        </div>
      </div>
    </section>
  );
}

function getCoverPreviewPhotos(
  photos: EventAlbum["photos"],
  album: EventAlbum,
): EventAlbum["photos"] {
  if (photos.length > 0) {
    return photos;
  }

  return [
    {
      id: "cover",
      originalSrc: album.cover,
      src: album.cover,
      alt: album.name,
      guest: "Keeps",
      takenAt: album.date,
      kind: "photo",
    },
  ];
}
