"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  CheckIcon,
  ImagesIcon,
  RotateCcwIcon,
  XIcon,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state/empty-state";
import { Button } from "@/components/ui/button";
import { useAdminAlbumController } from "@/features/albums/hooks/use-admin-album-controller";
import type { AlbumMemory } from "@/features/albums/types/album.types";
import { cn } from "@/lib/utils";

type SwipeIntent = "approve" | "reject" | null;

export function ReviewPhotosScreen({ id }: { id: string }) {
  const admin = useAdminAlbumController(id);
  const { album, pendingPhotos, approvedPhotos, rejectedPhotos } = admin;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [lastAction, setLastAction] = useState<{
    photo: AlbumMemory;
    previousIndex: number;
  } | null>(null);

  const safeIndex =
    pendingPhotos.length > 0 ? Math.min(currentIndex, pendingPhotos.length - 1) : 0;
  const currentPhoto = pendingPhotos[safeIndex];
  const remainingCount = Math.max(pendingPhotos.length - currentIndex, 0);
  const swipeIntent: SwipeIntent =
    dragOffset > 70 ? "approve" : dragOffset < -70 ? "reject" : null;

  const reviewPhoto = useCallback(
    (nextStatus: "approved" | "rejected") => {
      if (!currentPhoto) {
        return;
      }

      setLastAction({ photo: currentPhoto, previousIndex: safeIndex });
      void admin.moderatePhoto(currentPhoto.id, nextStatus);
      setCurrentIndex((index) => index + 1);
      setDragOffset(0);
      setDragStartX(null);
    },
    [admin, currentPhoto, safeIndex],
  );

  const undoLastAction = () => {
    if (!lastAction) {
      return;
    }

    void admin.moderatePhoto(lastAction.photo.id, "pending");
    setCurrentIndex(lastAction.previousIndex);
    setLastAction(null);
  };

  const approveAllPending = () => {
    if (pendingPhotos.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      `Vas a aprobar ${pendingPhotos.length} recuerdos pendientes y se veran en el album publico. ¿Continuar?`,
    );

    if (!confirmed) {
      return;
    }

    void admin.bulkModeratePhotos("approved", "pending");
    setCurrentIndex(0);
    setDragOffset(0);
    setDragStartX(null);
    setLastAction(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!currentPhoto) {
        return;
      }

      if (event.key === "ArrowLeft") {
        reviewPhoto("rejected");
      }

      if (event.key === "ArrowRight") {
        reviewPhoto("approved");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPhoto, reviewPhoto]);

  const stats = useMemo(
    () => [
      { label: "pendientes", value: pendingPhotos.length },
      { label: "aprobadas", value: approvedPhotos.length },
      { label: "rechazadas", value: rejectedPhotos.length },
    ],
    [approvedPhotos.length, pendingPhotos.length, rejectedPhotos.length],
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    setDragStartX(event.clientX);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (dragStartX === null) {
      return;
    }

    setDragOffset(event.clientX - dragStartX);
  };

  const handlePointerUp = () => {
    if (dragOffset > 110) {
      reviewPhoto("approved");
      return;
    }

    if (dragOffset < -110) {
      reviewPhoto("rejected");
      return;
    }

    setDragStartX(null);
    setDragOffset(0);
  };

  if (album === undefined) {
    return <main className="min-h-[70vh]" />;
  }

  if (album === null) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <EmptyState
          title="Album no encontrado"
          description="No existe un album para revisar con este link."
          action={
            <Button nativeButton={false} render={<Link href="/mis-albumes" />}>
              Ver mis albumes
            </Button>
          }
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f2ec] px-4 py-4 sm:py-5">
      <div className="mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col">
        <header className="grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href={`/a/${album.id}`} />}
          >
            <ArrowLeftIcon />
            Album
          </Button>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
            {stats.map((stat) => (
              <span
                key={stat.label}
                className="rounded-full bg-white px-2.5 py-1.5 text-center text-[0.68rem] font-semibold text-muted-foreground shadow-soft sm:px-3 sm:text-xs"
              >
                {stat.value} {stat.label}
              </span>
            ))}
          </div>
        </header>

        <section className="grid min-h-0 flex-1 gap-4 py-4 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:py-5">
          <div className="space-y-2 sm:space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Moderacion rapida
            </p>
            <h1 className="font-heading text-[clamp(2rem,10vw,3.5rem)] font-semibold leading-tight">
              Revisa recuerdos sin entrar al panel completo.
            </h1>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              En celular desliza a la derecha para aprobar o a la izquierda para rechazar. En compu usa los botones o las flechas del teclado.
            </p>
            {pendingPhotos.length > 0 ? (
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-full bg-white px-4 shadow-soft"
                onClick={approveAllPending}
              >
                <CheckIcon />
                Aprobar todas
              </Button>
            ) : null}
            <div className="hidden gap-2 text-xs font-semibold text-muted-foreground lg:flex">
              <span className="rounded-full bg-white px-3 py-1.5 shadow-soft">
                ← Rechazar
              </span>
              <span className="rounded-full bg-white px-3 py-1.5 shadow-soft">
                → Aprobar
              </span>
            </div>
          </div>

          <div className="flex min-h-0 flex-col items-center gap-4">
            {currentPhoto ? (
              <>
                <article
                  className="relative w-full max-w-sm touch-pan-y select-none sm:max-w-md"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <div
                    className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-3 shadow-lifted transition-transform duration-200"
                    style={{
                      transform: `translateX(${dragOffset}px) rotate(${dragOffset / 24}deg)`,
                    }}
                  >
                    <SwipeBadge intent={swipeIntent} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentPhoto.originalSrc ?? currentPhoto.src}
                      alt={currentPhoto.alt}
                      className="aspect-[4/4.7] w-full rounded-[1.35rem] object-cover sm:aspect-[4/5]"
                      draggable={false}
                    />
                    <div className="flex items-center justify-between gap-3 px-2 py-3 sm:py-4">
                      <div className="min-w-0">
                        <p className="truncate font-heading text-xl font-semibold sm:text-2xl">
                          {currentPhoto.guest}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {remainingCount} pendientes por revisar
                        </p>
                      </div>
                      <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                        Nueva
                      </span>
                    </div>
                  </div>
                </article>

                <div className="grid w-full max-w-sm grid-cols-[1fr_auto_1fr] items-center gap-2 sm:max-w-md sm:gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full border-destructive/25 bg-white px-3 text-destructive hover:bg-destructive/10 hover:text-destructive sm:h-14 sm:px-6"
                    onClick={() => reviewPhoto("rejected")}
                  >
                    <XIcon />
                    Rechazar
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-11 rounded-full bg-white shadow-soft sm:size-12"
                    disabled={!lastAction}
                    onClick={undoLastAction}
                    aria-label="Deshacer ultima accion"
                  >
                    <RotateCcwIcon />
                  </Button>
                  <Button
                    size="lg"
                    className="h-12 rounded-full bg-afterglow px-3 shadow-soft sm:h-14 sm:px-6"
                    onClick={() => reviewPhoto("approved")}
                  >
                    <CheckIcon />
                    Aprobar
                  </Button>
                </div>
              </>
            ) : (
              <div className="w-full max-w-md rounded-[2rem] border border-dashed border-border bg-white p-8 text-center shadow-soft">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-muted text-primary">
                  <ImagesIcon className="size-5" />
                </span>
                <h2 className="mt-5 font-heading text-3xl font-semibold">
                  Todo revisado
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  No hay recuerdos pendientes. Cuando suban fotos nuevas apareceran aqui.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Button
                    nativeButton={false}
                    render={<Link href={`/a/${album.id}`} />}
                  >
                    Volver al album
                  </Button>
                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={<Link href={`/a/${album.id}/administrar#moderacion`} />}
                  >
                    Ver panel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function SwipeBadge({ intent }: { intent: SwipeIntent }) {
  if (!intent) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute left-6 top-6 z-10 rotate-[-10deg] rounded-2xl border-4 bg-white/90 px-4 py-2 text-xl font-black uppercase tracking-[0.16em] shadow-soft",
        intent === "approve"
          ? "border-emerald-400 text-emerald-500"
          : "border-red-400 text-red-500",
      )}
    >
      {intent === "approve" ? "Si" : "No"}
    </div>
  );
}
