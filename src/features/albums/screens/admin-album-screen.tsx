"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import {
  ArrowLeftIcon,
  ImageIcon,
  SnowflakeIcon,
  Trash2Icon,
  UsersIcon,
  EyeIcon,
} from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/shared/empty-state/empty-state";
import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlbumShareCard } from "@/features/albums/components/album-share-card";
import { AlbumStatusLabel } from "@/features/albums/components/album-status-label";
import { MemoryGrid } from "@/features/albums/components/memory-grid";
import {
  getAdminEvent,
  removeEventPhoto,
  updateEvent,
  updateEventPhotoStatus,
} from "@/features/albums/api/albums.api";
import {
  albumUrl,
  countCompletedChallenges,
  getAlbumStatus,
} from "@/features/albums/lib/albums-store";
import type { EventAlbum } from "@/features/albums/types/album.types";

export function AdminAlbumScreen({ id }: { id: string }) {
  const { getToken } = useAuth();
  const [album, setAlbum] = useState<EventAlbum | null | undefined>(undefined);
  const shareUrl = useMemo(() => albumUrl(id), [id]);

  useEffect(() => {
    let mounted = true;

    async function loadAlbum() {
      try {
        const token = await getToken();
        const nextAlbum = await getAdminEvent(id, token);

        if (mounted) {
          setAlbum(nextAlbum);
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
  }, [getToken, id]);

  const patchAlbum = async (patch: Partial<EventAlbum>) => {
    if (!album) {
      return;
    }

    const previousAlbum = album;
    const optimisticAlbum = { ...album, ...patch };
    setAlbum(optimisticAlbum);

    try {
      const token = await getToken();
      const nextAlbum = await updateEvent(
        album.dbId ?? album.id,
        {
          status: patch.frozen
            ? "frozen"
            : patch.closedManually
              ? "closed"
              : patch.frozen === false || patch.closedManually === false
                ? "active"
                : undefined,
          privacy: patch.privacy,
          pin: patch.pin,
          allowDownloads: patch.allowDownload,
        },
        token,
      );

      setAlbum({ ...optimisticAlbum, ...nextAlbum });
    } catch {
      setAlbum(previousAlbum);
      toast.error("No pudimos guardar el cambio");
    }
  };

  if (album === undefined) {
    return <main className="min-h-[70vh]" />;
  }

  if (album === null) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <EmptyState
          title="Album no encontrado"
          description="No existe un album para administrar con este link."
          action={
            <Button nativeButton={false} render={<Link href="/mis-albumes" />}>
              Ver mis albumes
            </Button>
          }
        />
      </main>
    );
  }

  const status = getAlbumStatus(album);
  const pendingPhotos = album.photos.filter((photo) => photo.status === "pending");
  const approvedPhotos = album.photos.filter((photo) => photo.status === "approved");
  const rejectedPhotos = album.photos.filter((photo) => photo.status === "rejected");

  const moderatePhoto = async (photoId: string, nextStatus: "approved" | "rejected") => {
    const previousAlbum = album;
    setAlbum({
      ...album,
      photos: album.photos.map((photo) =>
        photo.id === photoId ? { ...photo, status: nextStatus } : photo,
      ),
    });

    try {
      const token = await getToken();
      await updateEventPhotoStatus(album.dbId ?? album.id, photoId, nextStatus, token);
      toast.success(
        nextStatus === "approved" ? "Recuerdo aprobado" : "Recuerdo rechazado",
      );
    } catch {
      setAlbum(previousAlbum);
      toast.error("No pudimos moderar el recuerdo");
    }
  };

  return (
    <main className="mx-auto w-full max-w-5xl space-y-10 px-5 py-12">
      <ScrollReveal>
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href={`/a/${album.id}`} />}
        >
          <ArrowLeftIcon />
          Volver al album
        </Button>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <AlbumStatusLabel status={status} />
            <h1 className="mt-3 font-heading text-4xl font-semibold">{album.name}</h1>
            <p className="mt-2 text-muted-foreground">
              Panel para moderar recuerdos, compartir el evento y ajustar permisos.
            </p>
          </div>
          <Button
            className="bg-afterglow"
            nativeButton={false}
            render={<Link href={`/a/${album.id}`} />}
          >
            Ver album publico
          </Button>
        </div>
      </ScrollReveal>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Recuerdos"
          value={album.photos.length}
          icon={ImageIcon}
          delay={0}
        />
        <StatCard
          label="Personas"
          value={album.contributors}
          icon={UsersIcon}
          delay={60}
        />
        <StatCard label="Visitas" value={album.views} icon={EyeIcon} delay={120} />
        <StatCard
          label="Retos activos"
          value={countCompletedChallenges(album)}
          icon={SnowflakeIcon}
          delay={180}
        />
      </section>

      <ScrollReveal className="space-y-3 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-heading text-2xl font-semibold">Ajustes</h2>
        <SettingRow
          label="Album abierto para subir"
          checked={!album.closedManually}
          onCheckedChange={(checked) => {
            void patchAlbum({ closedManually: !checked });
          }}
        />
        <SettingRow
          label="Permitir descargas"
          checked={album.allowDownload}
          onCheckedChange={(checked) => {
            void patchAlbum({ allowDownload: checked });
          }}
        />
        <SettingRow
          label="Retos de fotos"
          checked={album.challengesOn}
          onCheckedChange={(checked) => {
            setAlbum({ ...album, challengesOn: checked });
          }}
        />
        <SettingRow
          label="Lo mejor de la noche"
          checked={album.bestOfOn}
          onCheckedChange={(checked) => {
            setAlbum({ ...album, bestOfOn: checked });
          }}
        />
        <SettingRow
          label="Modo desechable"
          checked={album.disposableOn}
          onCheckedChange={(checked) => {
            setAlbum({ ...album, disposableOn: checked });
          }}
        />
        <SettingRow
          label="Proteger con PIN"
          checked={album.privacy === "pin"}
          onCheckedChange={(checked) =>
            void patchAlbum({
              privacy: checked ? "pin" : "public",
              pin: checked ? (album.pin ?? "1234") : undefined,
            })
          }
        />
        {album.privacy === "pin" ? (
          <p className="text-sm text-muted-foreground">
            PIN actual: <strong>{album.pin}</strong>
          </p>
        ) : null}
      </ScrollReveal>

      <ScrollReveal>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-2xl font-semibold">Moderar recuerdos</h2>
          <p className="text-sm text-muted-foreground">
            Revisa lo que suben los invitados antes de mostrarlo en publico.
          </p>
        </div>
        <Tabs defaultValue="pending">
          <TabsList className="h-auto flex-wrap rounded-full">
            <TabsTrigger value="pending" className="rounded-full px-4 py-2">
              Pendientes ({pendingPhotos.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="rounded-full px-4 py-2">
              Aprobadas ({approvedPhotos.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="rounded-full px-4 py-2">
              Rechazadas ({rejectedPhotos.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="rounded-full px-4 py-2">
              Todas ({album.photos.length})
            </TabsTrigger>
          </TabsList>
          {[
            ["pending", pendingPhotos],
            ["approved", approvedPhotos],
            ["rejected", rejectedPhotos],
            ["all", album.photos],
          ].map(([value, photos]) => (
            <TabsContent
              key={value as string}
              value={value as string}
              className="mt-6 animate-wizard-forward"
            >
              <MemoryGrid
                photos={photos as EventAlbum["photos"]}
                moderation
                onApprove={(photoId) => {
                  void moderatePhoto(photoId, "approved");
                }}
                onReject={(photoId) => {
                  void moderatePhoto(photoId, "rejected");
                }}
                onRemove={(photoId) => {
                  void (async () => {
                    const previousAlbum = album;
                    setAlbum({
                      ...album,
                      photos: album.photos.filter((photo) => photo.id !== photoId),
                    });

                    try {
                      const token = await getToken();
                      await removeEventPhoto(album.dbId ?? album.id, photoId, token);
                      toast.success("Recuerdo eliminado");
                    } catch {
                      setAlbum(previousAlbum);
                      toast.error("No pudimos eliminar el recuerdo");
                    }
                  })();
                }}
              />
            </TabsContent>
          ))}
        </Tabs>
      </ScrollReveal>

      <ScrollReveal>
        <AlbumShareCard title={album.name} url={shareUrl} />
      </ScrollReveal>

      <ScrollReveal className="flex flex-wrap gap-3 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <Button
          variant="outline"
          onClick={() => {
            void patchAlbum({ frozen: !album.frozen });
            toast.success(album.frozen ? "Album descongelado" : "Album congelado");
          }}
        >
          <SnowflakeIcon />
          {album.frozen ? "Descongelar album" : "Congelar como capsula"}
        </Button>
        <Button
          variant="ghost"
          className="text-destructive hover:text-destructive"
          onClick={() => {
            setAlbum({ ...album, photos: [] });
            toast.success("Album vaciado");
          }}
        >
          <Trash2Icon />
          Vaciar album
        </Button>
      </ScrollReveal>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  delay,
}: {
  label: string;
  value: number;
  icon: typeof ImageIcon;
  delay: number;
}) {
  return (
    <ScrollReveal
      delay={delay}
      className="rounded-3xl border border-border bg-card p-5 shadow-soft"
    >
      <Icon className="size-5 text-primary" />
      <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      <p className="font-heading text-3xl font-semibold">{value}</p>
    </ScrollReveal>
  );
}

function SettingRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-3 last:border-0">
      <span className="text-sm font-medium">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
