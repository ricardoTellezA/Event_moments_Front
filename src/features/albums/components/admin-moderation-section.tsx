"use client";

import { ImageIcon } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemoryGrid } from "@/features/albums/components/memory-grid";
import type { AlbumMemory } from "@/features/albums/types/album.types";

type ModerationTab = {
  value: string;
  label: string;
  shortLabel: string;
  count: number;
  photos: AlbumMemory[];
  emptyTitle: string;
  emptyDescription: string;
};

export function AdminModerationSection({
  pendingPhotos,
  approvedPhotos,
  rejectedPhotos,
  allPhotos,
  onApprove,
  onReject,
  onRemove,
}: {
  pendingPhotos: AlbumMemory[];
  approvedPhotos: AlbumMemory[];
  rejectedPhotos: AlbumMemory[];
  allPhotos: AlbumMemory[];
  onApprove: (photoId: string) => void;
  onReject: (photoId: string) => void;
  onRemove: (photoId: string) => void;
}) {
  const moderationTabs: ModerationTab[] = [
    {
      value: "pending",
      label: "Pendientes",
      shortLabel: "Pend.",
      count: pendingPhotos.length,
      photos: pendingPhotos,
      emptyTitle: "No hay recuerdos pendientes",
      emptyDescription: "Cuando alguien suba fotos nuevas apareceran aqui para revision.",
    },
    {
      value: "approved",
      label: "Aprobadas",
      shortLabel: "Aprob.",
      count: approvedPhotos.length,
      photos: approvedPhotos,
      emptyTitle: "No hay recuerdos aprobados",
      emptyDescription: "Aprueba recuerdos pendientes para que se vean en el album publico.",
    },
    {
      value: "rejected",
      label: "Rechazadas",
      shortLabel: "Rech.",
      count: rejectedPhotos.length,
      photos: rejectedPhotos,
      emptyTitle: "No hay recuerdos rechazados",
      emptyDescription: "Las fotos que descartes durante la moderacion quedaran aqui.",
    },
    {
      value: "all",
      label: "Todas",
      shortLabel: "Todas",
      count: allPhotos.length,
      photos: allPhotos,
      emptyTitle: "Todavia no hay recuerdos",
      emptyDescription: "Comparte el link del album para empezar a recibir fotos.",
    },
  ];

  return (
    <ScrollReveal className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold">Moderar recuerdos</h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
            Revisa lo que suben los invitados antes de mostrarlo en publico.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 text-xs font-semibold text-muted-foreground">
          <span className="rounded-full bg-muted/70 px-2.5 py-1">
            {pendingPhotos.length} pendientes
          </span>
          <span className="rounded-full bg-muted/70 px-2.5 py-1">
            {approvedPhotos.length} aprobadas
          </span>
          <span className="rounded-full bg-muted/70 px-2.5 py-1">
            {rejectedPhotos.length} rechazadas
          </span>
        </div>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="grid h-auto w-full grid-cols-4 gap-1 rounded-xl bg-muted p-1">
          {moderationTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className=" min-w-0 rounded-lg border-0 bg-transparent px-1.5 text-xs font-semibold text-muted-foreground shadow-none after:hidden data-active:bg-background data-active:text-foreground data-active:shadow-soft sm:h-10 sm:text-sm"
            >
              <span className="truncate sm:hidden">{tab.shortLabel}</span>
              <span className="hidden truncate sm:inline">{tab.label}</span>
              <span className="ml-1 grid min-w-5 place-items-center rounded-full bg-muted/80 px-1 text-[0.68rem] font-semibold text-foreground">
                {tab.count}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {moderationTabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="mt-5 animate-wizard-forward"
          >
            {tab.photos.length > 0 ? (
              <MemoryGrid
                photos={tab.photos}
                moderation
                onApprove={onApprove}
                onReject={onReject}
                onRemove={onRemove}
              />
            ) : (
              <ModerationEmptyState
                title={tab.emptyTitle}
                description={tab.emptyDescription}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </ScrollReveal>
  );
}

function ModerationEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-background px-5 py-8 text-center">
      <span className="mx-auto grid size-10 place-items-center rounded-full bg-muted text-primary">
        <ImageIcon className="size-4" />
      </span>
      <h3 className="mt-4 font-heading text-xl font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
