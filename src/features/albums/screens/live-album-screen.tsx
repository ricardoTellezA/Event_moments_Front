"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ImagesIcon,
  Maximize2Icon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";

import { AppLogo } from "@/components/shared/app-logo/app-logo";
import { EmptyState } from "@/components/shared/empty-state/empty-state";
import { Button } from "@/components/ui/button";
import { useAdminAlbumController } from "@/features/albums/hooks/use-admin-album-controller";

export function LiveAlbumScreen({ id }: { id: string }) {
  const { album, approvedPhotos, shareUrl } = useAdminAlbumController(id);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const photos = useMemo(
    () =>
      approvedPhotos.map((photo) => ({
        ...photo,
        displaySrc: photo.originalSrc ?? photo.src,
      })),
    [approvedPhotos],
  );

  useEffect(() => {
    if (paused || photos.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % photos.length);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [paused, photos.length]);

  const safeIndex = photos.length > 0 ? activeIndex % photos.length : 0;
  const activePhoto = photos[safeIndex];

  const goToPrevious = () => {
    if (photos.length === 0) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? photos.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    if (photos.length === 0) {
      return;
    }

    setActiveIndex((currentIndex) => (currentIndex + 1) % photos.length);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }

    void document.documentElement.requestFullscreen();
  };

  if (album === undefined) {
    return <main className="h-dvh bg-zinc-950" />;
  }

  if (album === null) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <EmptyState
          title="Album no encontrado"
          description="No existe un album para mostrar en pantalla en vivo."
          action={
            <Button nativeButton={false} render={<Link href="/mis-albumes" />}>
              Ver mis albumes
            </Button>
          }
        />
      </main>
    );
  }

  if (!activePhoto) {
    return (
      <main className="h-dvh overflow-hidden bg-zinc-950 px-4 py-3 text-white sm:px-5 sm:py-6">
        <LiveTopBar albumId={album.id} albumName={album.name} shareUrl={shareUrl} />
        <div className="flex h-[calc(100dvh-6rem)] items-center justify-center text-center">
          <div className="w-full max-w-md rounded-[2rem] border border-white/12 bg-zinc-900/78 px-6 py-7 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-8 sm:py-8">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/10 text-white shadow-soft">
              <ImagesIcon className="size-5" />
            </span>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.26em] text-white/46">
              Pantalla en espera
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium leading-tight text-white">
              No hay fotos aprobadas
            </h2>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-white/62">
              Revisa los recuerdos pendientes y aprueba los que quieras mostrar en la pantalla en vivo.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
              <Button
                className="bg-afterglow"
                nativeButton={false}
                render={<Link href={`/a/${album.id}/revisar`} />}
              >
                Revisar fotos
              </Button>
              <Button
                variant="outline"
                className="border-white/15 bg-white/8 text-white hover:bg-white/12 hover:text-white"
                nativeButton={false}
                render={<Link href={`/a/${album.id}/administrar`} />}
              >
                Ir al panel
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative h-dvh overflow-hidden bg-zinc-950 text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`${activePhoto.id}-backdrop`}
        src={activePhoto.displaySrc}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),rgba(9,9,11,0.86)_58%,rgba(9,9,11,0.98))]" />

      <div className="relative z-10 flex h-dvh flex-col gap-3 px-3 py-3 sm:px-5 sm:py-4 lg:gap-4 lg:px-6">
        <LiveTopBar albumId={album.id} albumName={album.name} shareUrl={shareUrl} />

        <section className="grid min-h-0 flex-1 place-items-center">
          <div className="relative flex size-full max-w-6xl items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activePhoto.id}
              src={activePhoto.displaySrc}
              alt={activePhoto.alt}
              className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:rounded-[1.75rem]"
            />
          </div>
        </section>

        <div className="flex shrink-0 items-center justify-between gap-3 rounded-3xl border border-white/12 bg-zinc-950/68 px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:mb-2 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/62 sm:text-xs sm:tracking-[0.24em]">
              Recuerdo {safeIndex + 1} de {photos.length}
            </p>
            <h2 className="mt-1 truncate font-heading text-2xl font-medium leading-none text-white sm:mt-2 sm:text-4xl">
              {activePhoto.guest}
            </h2>
            <p className="mt-1 truncate text-xs font-normal text-white/68 sm:mt-2 sm:text-sm">
              {new Date(activePhoto.takenAt).toLocaleString("es-MX", {
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                month: "long",
              })}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/12 bg-white/10 p-1 text-white shadow-soft backdrop-blur sm:gap-2 sm:p-2">
            <Button
              aria-label="Foto anterior"
              size="icon"
              variant="ghost"
              className="text-white/75 hover:bg-white/12 hover:text-white"
              onClick={goToPrevious}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              aria-label={paused ? "Reproducir" : "Pausar"}
              size="icon"
              className="size-9 bg-white text-zinc-950 hover:bg-white/90 sm:size-10"
              onClick={() => setPaused((currentValue) => !currentValue)}
            >
              {paused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
            </Button>
            <Button
              aria-label="Siguiente foto"
              size="icon"
              variant="ghost"
              className="text-white/75 hover:bg-white/12 hover:text-white"
              onClick={goToNext}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
            <Button
              aria-label="Pantalla completa"
              size="icon"
              variant="ghost"
              className="text-white/75 hover:bg-white/12 hover:text-white"
              onClick={toggleFullscreen}
            >
              <Maximize2Icon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

function LiveTopBar({
  albumId,
  albumName,
  shareUrl,
}: {
  albumId: string;
  albumName: string;
  shareUrl: string;
}) {
  return (
    <header className="flex shrink-0 items-center justify-between gap-2 rounded-3xl border border-white/10 bg-zinc-950/64 px-2 py-2 text-white shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:gap-3 sm:rounded-full sm:px-3">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Button
          variant="ghost"
          className="h-9 px-2 text-white/62 hover:bg-white/10 hover:text-white sm:px-3"
          nativeButton={false}
          render={<Link href={`/a/${albumId}/administrar`} />}
        >
          <ArrowLeftIcon className="size-4" />
          <span className="hidden sm:inline">Panel</span>
        </Button>
        <div className="hidden items-center gap-3 sm:flex">
          <AppLogo className="text-white" />
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/55">
              Pantalla en vivo
            </p>
            <h1 className="font-heading text-2xl font-medium leading-none text-white">
              {albumName}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-2 text-xs text-white/78 backdrop-blur sm:gap-3 sm:px-4 sm:text-sm">
        <span className="size-2 shrink-0 rounded-full bg-emerald-300" />
        <span className="hidden font-normal sm:inline">Sube tus recuerdos</span>
        <span className="max-w-[64vw] truncate font-medium text-white sm:max-w-[56vw]">
          {shareUrl.replace(/^https?:\/\//, "")}
        </span>
      </div>
    </header>
  );
}
