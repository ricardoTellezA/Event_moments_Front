"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
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
    return <main className="min-h-screen bg-zinc-950" />;
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
      <main className="min-h-screen bg-zinc-950 px-5 py-6 text-white">
        <LiveTopBar albumId={album.id} albumName={album.name} shareUrl={shareUrl} />
        <div className="flex min-h-[75vh] items-center justify-center text-center">
          <EmptyState
            title="Todavia no hay recuerdos aprobados"
            description="Aprueba fotos desde moderacion para iniciar la pantalla en vivo."
            action={
              <Button
                className="bg-afterglow"
                nativeButton={false}
                render={<Link href={`/a/${album.id}/administrar`} />}
              >
                Volver al panel
              </Button>
            }
          />
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`${activePhoto.id}-backdrop`}
        src={activePhoto.displaySrc}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),rgba(9,9,11,0.86)_58%,rgba(9,9,11,0.98))]" />

      <div className="relative z-10 flex min-h-screen flex-col px-4 py-4 sm:px-6">
        <LiveTopBar albumId={album.id} albumName={album.name} shareUrl={shareUrl} />

        <section className="grid flex-1 place-items-center py-6">
          <div className="relative flex h-[68vh] w-full max-w-6xl items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activePhoto.id}
              src={activePhoto.displaySrc}
              alt={activePhoto.alt}
              className="max-h-full max-w-full rounded-[1.75rem] object-contain shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
            />
          </div>
        </section>

        <div className="mb-3 flex flex-wrap items-end justify-between gap-4 rounded-[1.75rem] border border-white/12 bg-zinc-950/62 px-5 py-4 shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/62">
              Recuerdo {safeIndex + 1} de {photos.length}
            </p>
            <h2 className="mt-2 truncate font-heading text-3xl font-medium leading-none text-white sm:text-4xl">
              {activePhoto.guest}
            </h2>
            <p className="mt-2 text-sm font-normal text-white/68">
              {new Date(activePhoto.takenAt).toLocaleString("es-MX", {
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                month: "long",
              })}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/10 p-2 text-white shadow-soft backdrop-blur">
            <Button
              aria-label="Foto anterior"
              size="icon"
              variant="ghost"
              className="text-white/75 hover:bg-white/12 hover:text-white"
              onClick={goToPrevious}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              aria-label={paused ? "Reproducir" : "Pausar"}
              size="icon"
              className="bg-white text-zinc-950 hover:bg-white/90"
              onClick={() => setPaused((currentValue) => !currentValue)}
            >
              {paused ? <PlayIcon /> : <PauseIcon />}
            </Button>
            <Button
              aria-label="Siguiente foto"
              size="icon"
              variant="ghost"
              className="text-white/75 hover:bg-white/12 hover:text-white"
              onClick={goToNext}
            >
              <ChevronRightIcon />
            </Button>
            <Button
              aria-label="Pantalla completa"
              size="icon"
              variant="ghost"
              className="text-white/75 hover:bg-white/12 hover:text-white"
              onClick={toggleFullscreen}
            >
              <Maximize2Icon />
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
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-white/10 bg-zinc-950/58 px-3 py-2 text-white shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          className="text-white/62 hover:bg-white/10 hover:text-white"
          nativeButton={false}
          render={<Link href={`/a/${albumId}/administrar`} />}
        >
          <ArrowLeftIcon />
          Panel
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

      <div className="flex min-w-0 items-center gap-3 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-white/78 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-emerald-300" />
        <span className="hidden font-normal sm:inline">Sube tus recuerdos</span>
        <span className="max-w-[56vw] truncate font-medium text-white">
          {shareUrl.replace(/^https?:\/\//, "")}
        </span>
      </div>
    </header>
  );
}
