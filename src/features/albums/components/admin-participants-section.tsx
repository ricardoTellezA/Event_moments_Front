"use client";

import { UsersIcon } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import type { EventAlbum } from "@/features/albums/types/album.types";

export type ParticipantStat = {
  name: string;
  total: number;
  pending: number;
  approved: number;
  rejected: number;
};

export function AdminParticipantsSection({
  stats,
  disposableOn,
  photosPerGuest,
}: {
  stats: ParticipantStat[];
  disposableOn: boolean;
  photosPerGuest: number;
}) {
  return (
    <ScrollReveal>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-2xl font-semibold">Participantes</h2>
        {disposableOn ? (
          <p className="text-sm text-muted-foreground">
            Limite activo: {photosPerGuest} fotos por invitado.
          </p>
        ) : null}
      </div>
      {stats.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((participant) => (
            <div
              key={participant.name}
              className="rounded-3xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-xl font-semibold">
                    {participant.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {participant.total} recuerdos subidos
                  </p>
                </div>
                <UsersIcon className="size-5 text-primary" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <ParticipantCount label="Pend." value={participant.pending} />
                <ParticipantCount label="Aprob." value={participant.approved} />
                <ParticipantCount label="Rech." value={participant.rejected} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-3xl border border-dashed border-border p-8 text-center text-muted-foreground">
          Todavia no hay participantes con recuerdos.
        </p>
      )}
    </ScrollReveal>
  );
}

export function getParticipantStats(photos: EventAlbum["photos"]) {
  const stats = new Map<string, ParticipantStat>();

  for (const photo of photos) {
    const current = stats.get(photo.guest) ?? {
      name: photo.guest,
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    };

    current.total += 1;

    if (photo.status === "pending") {
      current.pending += 1;
    } else if (photo.status === "approved") {
      current.approved += 1;
    } else if (photo.status === "rejected") {
      current.rejected += 1;
    }

    stats.set(photo.guest, current);
  }

  return Array.from(stats.values()).sort((a, b) => b.total - a.total);
}

function ParticipantCount({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-muted px-2 py-3">
      <p className="font-heading text-xl font-semibold">{value}</p>
      <p className="mt-0.5 text-muted-foreground">{label}</p>
    </div>
  );
}
