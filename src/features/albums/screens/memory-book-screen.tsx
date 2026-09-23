"use client";

import Link from "next/link";
import { ArrowLeftIcon, PrinterIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state/empty-state";
import { Button } from "@/components/ui/button";
import { MemoryBookPages } from "@/features/albums/components/memory-book-pages";
import {
  buildMemoryBookSpreads,
  getBookPhotos,
} from "@/features/albums/lib/memory-book";
import { useAdminAlbumController } from "@/features/albums/hooks/use-admin-album-controller";

export function MemoryBookScreen({ id }: { id: string }) {
  const { album } = useAdminAlbumController(id);

  if (album === undefined) {
    return <main className="min-h-[70vh]" />;
  }

  if (album === null) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <EmptyState
          title="Album no encontrado"
          description="No existe un album para generar libro con este link."
          action={
            <Button nativeButton={false} render={<Link href="/mis-albumes" />}>
              Ver mis albumes
            </Button>
          }
        />
      </main>
    );
  }

  const bookPhotos = getBookPhotos(album);
  const spreads = buildMemoryBookSpreads(bookPhotos);

  if (bookPhotos.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <EmptyState
          title="Todavia no hay recuerdos para el libro"
          description="Aprueba fotos en moderacion o espera a que los invitados suban recuerdos."
          action={
            <Button
              nativeButton={false}
              render={<Link href={`/a/${album.id}/administrar`} />}
            >
              Volver al panel
            </Button>
          }
        />
      </main>
    );
  }

  return (
    <main className="memory-book-root min-h-screen bg-soft-gradient px-5 py-6 print:bg-white print:p-0">
      <div className="mx-auto mb-6 flex max-w-5xl items-center justify-between gap-3 print:hidden">
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href={`/a/${album.id}/administrar`} />}
        >
          <ArrowLeftIcon />
          Volver al panel
        </Button>
        <Button className="bg-afterglow" onClick={() => window.print()}>
          <PrinterIcon />
          Imprimir / guardar PDF
        </Button>
      </div>
      <MemoryBookPages
        album={album}
        photosCount={bookPhotos.length}
        contributors={new Set(bookPhotos.map((photo) => photo.guest)).size}
        spreads={spreads}
      />
    </main>
  );
}
