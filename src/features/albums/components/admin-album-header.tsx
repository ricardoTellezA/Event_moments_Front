"use client";

import Link from "next/link";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  MonitorPlayIcon,
  QrCodeIcon,
} from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";
import { AlbumStatusLabel } from "@/features/albums/components/album-status-label";
import type { AlbumStatus } from "@/features/albums/types/album.types";

export function AdminAlbumHeader({
  albumId,
  albumName,
  status,
}: {
  albumId: string;
  albumName: string;
  status: AlbumStatus;
}) {
  return (
    <ScrollReveal>
      <Button
        variant="ghost"
        nativeButton={false}
        render={<Link href={`/a/${albumId}`} />}
      >
        <ArrowLeftIcon />
        Volver al album
      </Button>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <AlbumStatusLabel status={status} />
          <h1 className="mt-3 font-heading text-4xl font-semibold">{albumName}</h1>
          <p className="mt-2 text-muted-foreground">
            Panel para moderar recuerdos, compartir el evento y ajustar permisos.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href={`/a/${albumId}/live`} />}
          >
            <MonitorPlayIcon />
            Pantalla en vivo
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href={`/a/${albumId}/libro`} />}
          >
            <BookOpenIcon />
            Libro de recuerdos
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href={`/a/${albumId}/qr`} />}
          >
            <QrCodeIcon />
            QR para imprimir
          </Button>
          <Button
            className="bg-afterglow"
            nativeButton={false}
            render={<Link href={`/a/${albumId}`} />}
          >
            Ver album publico
          </Button>
        </div>
      </div>
    </ScrollReveal>
  );
}
