"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { EyeIcon, ImageIcon, PlusIcon, UsersIcon } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/shared/empty-state/empty-state";
import { PageContainer } from "@/components/shared/page-container/page-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";
import { AlbumStatusLabel } from "@/features/albums/components/album-status-label";
import { getMyEvents } from "@/features/albums/api/albums.api";
import { getAlbumStatus } from "@/features/albums/lib/albums-store";
import type { EventAlbum } from "@/features/albums/types/album.types";

export function MyAlbumsScreen() {
  const { getToken } = useAuth();
  const [albums, setAlbums] = useState<EventAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadAlbums() {
      try {
        const token = await getToken();
        const nextAlbums = await getMyEvents(token);

        if (mounted) {
          setAlbums(nextAlbums);
        }
      } catch {
        toast.error("No pudimos cargar tus albumes");
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    void loadAlbums();

    return () => {
      mounted = false;
    };
  }, [getToken]);

  return (
    <main className="py-14">
      <PageContainer>
        <ScrollReveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl font-semibold">Mis albumes</h1>
            <p className="mt-2 text-muted-foreground">
              Todos tus eventos, en un solo lugar.
            </p>
          </div>
          <Button
            className="bg-afterglow shadow-soft"
            nativeButton={false}
            render={<Link href="/crear" />}
          >
            <PlusIcon />
            Nuevo album
          </Button>
        </ScrollReveal>
        {isLoading ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-3xl border border-border bg-muted"
              />
            ))}
          </div>
        ) : albums.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album, index) => (
              <ScrollReveal key={album.id} delay={index * 60}>
                <Link
                  href={`/a/${album.id}`}
                  className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={album.cover}
                      alt={`Portada de ${album.name}`}
                      width={720}
                      height={420}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <AlbumStatusLabel
                      status={getAlbumStatus(album)}
                      className="absolute left-3 top-3"
                    />
                  </div>
                  <div className="space-y-3 p-5">
                    <h2 className="font-heading text-xl font-semibold">{album.name}</h2>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <ImageIcon className="size-4" />
                        {album.photos.length}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <UsersIcon className="size-4" />
                        {album.contributors}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <EyeIcon className="size-4" />
                        {album.views}
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal className="mt-10" delay={100}>
            <EmptyState
              title="Todavia no tienes albumes"
              description="Crea tu primer evento para generar un link y QR compartible."
              action={
                <Button
                  className="bg-afterglow"
                  nativeButton={false}
                  render={<Link href="/crear" />}
                >
                  Crear album
                </Button>
              }
            />
          </ScrollReveal>
        )}
      </PageContainer>
    </main>
  );
}
