"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DownloadIcon,
  LockIcon,
  SettingsIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/shared/empty-state/empty-state";
import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlbumShareCard } from "@/features/albums/components/album-share-card";
import { AlbumStatusLabel } from "@/features/albums/components/album-status-label";
import { MemoryGrid } from "@/features/albums/components/memory-grid";
import { UploadMemoryDialog } from "@/features/albums/components/upload-memory-dialog";
import {
  downloadEventPhotos,
  getPublicEvent,
  recordEventView,
  unlockEventPin,
  uploadEventPhotos,
} from "@/features/albums/api/albums.api";
import {
  addGuestRollCount,
  albumUrl,
  buildTimeline,
  countCompletedChallenges,
  formatMsLeft,
  getAlbumStatus,
  getGuestRollCount,
  getRevealMsLeft,
  getUploadMsLeft,
  groupByGuest,
} from "@/features/albums/lib/albums-store";
import type { EventAlbum } from "@/features/albums/types/album.types";

export function PublicAlbumScreen({ id }: { id: string }) {
  const [album, setAlbum] = useState<EventAlbum | null | undefined>(undefined);
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [forceReveal, setForceReveal] = useState(false);
  const [rollUsed, setRollUsed] = useState(0);
  const [now, setNow] = useState(0);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadAlbum() {
      try {
        const nextAlbum = await getPublicEvent(id);

        if (mounted) {
          setAlbum(nextAlbum);
          setRollUsed(getGuestRollCount(id));
          setNow(Date.now());
        }
      } catch {
        if (mounted) {
          setAlbum(null);
        }
      }
    }

    void loadAlbum();

    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!album) {
      return;
    }

    const viewed = window.sessionStorage.getItem(`event-moments.viewed.${album.id}`);

    if (!viewed) {
      window.sessionStorage.setItem(`event-moments.viewed.${album.id}`, "true");
      void recordEventView(album.id)
        .then((nextAlbum) => setAlbum(nextAlbum))
        .catch(() =>
          setAlbum((current) =>
            current ? { ...current, views: current.views + 1 } : current,
          ),
        );
    }
  }, [album]);

  const shareUrl = useMemo(() => albumUrl(id), [id]);

  if (album === undefined) {
    return <main className="min-h-[70vh]" />;
  }

  if (album === null) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <EmptyState
          title="Este album ya no existe"
          description="Puede que haya expirado o que el link este mal escrito."
          action={
            <Button nativeButton={false} render={<Link href="/" />}>
              Volver al inicio
            </Button>
          }
        />
      </main>
    );
  }

  const status = getAlbumStatus(album, now);
  const revealPending = status === "reveal-pending" && !forceReveal;
  const lockedByPin = album.privacy === "pin" && !unlocked;
  const uploadMsLeft = getUploadMsLeft(album, now);
  const revealMsLeft = getRevealMsLeft(album, now);
  const uploadOpen = ["open", "reveal-pending", "revealed"].includes(status);
  const remainingRoll = album.disposableOn
    ? Math.max(album.photosPerGuest - rollUsed, 0)
    : Infinity;

  const handleUpload = async (guest: string, files: File[]) => {
    if (!uploadOpen || remainingRoll <= 0) {
      toast.error(
        remainingRoll <= 0 ? "Ya usaste todas tus fotos" : "El album esta cerrado",
      );
      return;
    }

    const uploadedPhotos = await uploadEventPhotos({
      slug: album.id,
      guest,
      pin: album.privacy === "pin" ? pin : undefined,
      files,
    });

    addGuestRollCount(album.id, uploadedPhotos.length);
    setRollUsed((current) => current + uploadedPhotos.length);
    toast.success("Recuerdos enviados a revision");
  };

  const handleVote = (category: string, photoId: string) => {
    const categoryVotes = { ...(album.votes[category] ?? {}) };
    categoryVotes[photoId] = (categoryVotes[photoId] ?? 0) + 1;
    const nextAlbum = {
      ...album,
      votes: { ...album.votes, [category]: categoryVotes },
    };

    setAlbum(nextAlbum);
    toast.success("Voto registrado");
  };

  const handleDownload = async () => {
    if (downloading) {
      return;
    }

    setDownloading(true);

    try {
      const blob = await downloadEventPhotos(
        album.id,
        album.privacy === "pin" ? pin : undefined,
      );
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${album.id}-recuerdos.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Descarga lista");
    } catch {
      toast.error("No pudimos preparar la descarga");
    } finally {
      setDownloading(false);
    }
  };

  if (lockedByPin) {
    return (
      <main className="mx-auto max-w-sm px-5 py-24 text-center">
        <LockIcon className="mx-auto size-10 text-primary" />
        <h1 className="mt-5 font-heading text-3xl font-semibold">{album.name}</h1>
        <p className="mt-3 text-muted-foreground">Este album esta protegido con PIN.</p>
        <Input
          className="mt-6 text-center text-lg tracking-[0.4em]"
          inputMode="numeric"
          value={pin}
          onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="0000"
        />
        <Button
          className="mt-4 w-full bg-afterglow"
          onClick={() => {
            void unlockEventPin(album.id, pin)
              .then(() => {
                setUnlocked(true);
              })
              .catch(() => toast.error("PIN incorrecto"));
          }}
        >
          Entrar
        </Button>
      </main>
    );
  }

  return (
    <main>
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
            {album.photos.length} recuerdos · {album.contributors} personas ·{" "}
            {album.views} visitas
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl space-y-12 px-5 py-10">
        <ScrollReveal className="flex flex-wrap items-center gap-3">
          <UploadMemoryDialog
            disabled={!uploadOpen || remainingRoll <= 0}
            onUpload={handleUpload}
          />
          {album.allowDownload && !revealPending ? (
            <Button
              variant="outline"
              size="lg"
              disabled={downloading}
              onClick={() => {
                void handleDownload();
              }}
            >
              <DownloadIcon />
              {downloading ? "Preparando..." : "Descargar todo"}
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="lg"
            nativeButton={false}
            render={<Link href={`/a/${album.id}/administrar`} />}
          >
            <SettingsIcon />
            Administrar
          </Button>
          {uploadOpen ? (
            <span className="rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground">
              {formatMsLeft(uploadMsLeft)} restantes
            </span>
          ) : null}
          {album.disposableOn ? (
            <span className="rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground">
              {remainingRoll === 0
                ? "Tu rollo esta completo"
                : `${remainingRoll} fotos restantes`}
            </span>
          ) : null}
        </ScrollReveal>

        {album.frozen ? <FrozenAlbum album={album} /> : null}

        {revealPending ? (
          <RevealPending
            album={album}
            msLeft={revealMsLeft}
            onOpen={() => setForceReveal(true)}
          />
        ) : (
          <AlbumTabs album={album} onVote={handleVote} />
        )}

        <ScrollReveal>
          <AlbumShareCard title={album.name} url={shareUrl} />
        </ScrollReveal>
      </div>
    </main>
  );
}

function RevealPending({
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
        {album.photos.length} recuerdos guardados
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

function FrozenAlbum({ album }: { album: EventAlbum }) {
  return (
    <ScrollReveal className="rounded-[2rem] border border-border bg-card p-8 text-center shadow-soft">
      <h2 className="font-heading text-3xl font-semibold">
        Este recuerdo quedo guardado
      </h2>
      <p className="mt-2 text-muted-foreground">
        {album.photos.length} recuerdos congelados como capsula del momento.
      </p>
    </ScrollReveal>
  );
}

function AlbumTabs({
  album,
  onVote,
}: {
  album: EventAlbum;
  onVote: (category: string, photoId: string) => void;
}) {
  const timeline = buildTimeline(album);
  const guestGroups = groupByGuest(album);
  const completedChallenges = countCompletedChallenges(album);

  return (
    <Tabs defaultValue="gallery" className="w-full">
      <TabsList className="h-auto flex-wrap rounded-full">
        <TabsTrigger value="gallery" className="rounded-full px-4 py-2">
          Galeria
        </TabsTrigger>
        <TabsTrigger value="timeline" className="rounded-full px-4 py-2">
          Timeline
        </TabsTrigger>
        {album.challengesOn ? (
          <TabsTrigger value="challenges" className="rounded-full px-4 py-2">
            Retos
          </TabsTrigger>
        ) : null}
        <TabsTrigger value="rolls" className="rounded-full px-4 py-2">
          Rollos
        </TabsTrigger>
        {album.bestOfOn ? (
          <TabsTrigger value="best" className="rounded-full px-4 py-2">
            Lo mejor
          </TabsTrigger>
        ) : null}
      </TabsList>

      <TabsContent value="gallery" className="mt-8 animate-wizard-forward">
        <MemoryGrid photos={album.photos} />
      </TabsContent>
      <TabsContent value="timeline" className="mt-8 animate-wizard-forward">
        <div className="space-y-8 border-l border-border pl-6">
          {timeline.map((group) => (
            <div key={`${group.time}-${group.label}`} className="relative">
              <span className="absolute -left-[31px] top-2 size-3 rounded-full bg-afterglow ring-4 ring-background" />
              <p className="font-heading text-2xl font-semibold">{group.time}</p>
              <p className="text-sm text-muted-foreground">{group.label}</p>
              <MemoryGrid photos={group.photos} className="mt-4 lg:columns-3" />
            </div>
          ))}
        </div>
      </TabsContent>
      {album.challengesOn ? (
        <TabsContent value="challenges" className="mt-8 animate-wizard-forward">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-semibold">Retos de fotos</h2>
            <span className="rounded-full bg-soft-gradient px-4 py-1.5 text-sm font-semibold">
              {completedChallenges} de{" "}
              {album.challenges.filter((item) => item.active).length}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {album.challenges
              .filter((challenge) => challenge.active)
              .map((challenge) => (
                <div
                  key={challenge.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <div>
                    <p className="font-semibold">{challenge.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {album.photos.some((photo) => photo.challengeId === challenge.id)
                        ? "Completado"
                        : "Pendiente"}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-afterglow"
                    onClick={() => toast.info("Sube la foto desde el boton principal")}
                  >
                    Subir
                  </Button>
                </div>
              ))}
          </div>
        </TabsContent>
      ) : null}
      <TabsContent value="rolls" className="mt-8 animate-wizard-forward">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guestGroups.map((group) => (
            <div
              key={group.guest}
              className="rounded-3xl border border-border bg-card p-5 shadow-soft"
            >
              <UsersIcon className="size-5 text-primary" />
              <h3 className="mt-3 font-heading text-xl font-semibold">{group.guest}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {group.photos.length} recuerdos capturados
              </p>
            </div>
          ))}
        </div>
      </TabsContent>
      {album.bestOfOn ? (
        <TabsContent value="best" className="mt-8 animate-wizard-forward">
          <BestOfSection album={album} onVote={onVote} />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}

function BestOfSection({
  album,
  onVote,
}: {
  album: EventAlbum;
  onVote: (category: string, photoId: string) => void;
}) {
  const photos = album.photos.filter((photo) => photo.kind === "photo").slice(0, 8);

  if (photos.length === 0) {
    return (
      <EmptyState
        title="Aun no hay nominadas"
        description="Cuando haya fotos, los invitados podran votar lo mejor del evento."
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-2xl font-semibold">Lo mejor de la noche</h2>
        <span className="text-sm text-muted-foreground">
          La votacion cierra en 24 horas
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => onVote("foto-noche", photo.id)}
            className="group relative overflow-hidden rounded-2xl shadow-soft"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={520}
              height={520}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold">
              <TrophyIcon className="size-3" />
              {album.votes["foto-noche"]?.[photo.id] ?? 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
