"use client";

import Image from "next/image";
import { TrophyIcon, UsersIcon } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/shared/empty-state/empty-state";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemoryGrid } from "@/features/albums/components/memory-grid";
import {
  buildTimeline,
  countCompletedChallenges,
  groupByGuest,
} from "@/features/albums/lib/albums-store";
import type { EventAlbum } from "@/features/albums/types/album.types";

export function PublicAlbumTabs({
  album,
  onVote,
  showStatus = false,
}: {
  album: EventAlbum;
  onVote: (category: string, photoId: string) => void;
  showStatus?: boolean;
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
        <MemoryGrid photos={album.photos} showStatus={showStatus} />
      </TabsContent>
      <TabsContent value="timeline" className="mt-8 animate-wizard-forward">
        <div className="space-y-8 border-l border-border pl-6">
          {timeline.map((group) => (
            <div key={`${group.time}-${group.label}`} className="relative">
              <span className="absolute -left-[31px] top-2 size-3 rounded-full bg-afterglow ring-4 ring-background" />
              <p className="font-heading text-2xl font-semibold">{group.time}</p>
              <p className="text-sm text-muted-foreground">{group.label}</p>
              <MemoryGrid
                photos={group.photos}
                showStatus={showStatus}
                className="mt-4 lg:columns-3"
              />
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
          <BestOfSection album={album} onVote={onVote} showStatus={showStatus} />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}

function BestOfSection({
  album,
  onVote,
  showStatus,
}: {
  album: EventAlbum;
  onVote: (category: string, photoId: string) => void;
  showStatus: boolean;
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
            {showStatus && photo.status === "pending" ? (
              <span className="absolute right-2 top-2 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold">
                Pendiente
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
