import type { AlbumMemory, EventAlbum } from "@/features/albums/types/album.types";

export type MemoryBookSpread = {
  title: string;
  subtitle: string;
  photos: AlbumMemory[];
};

export function getBookPhotos(album: EventAlbum) {
  const approvedPhotos = album.photos.filter((photo) => photo.status === "approved");

  if (approvedPhotos.length > 0) {
    return approvedPhotos;
  }

  return album.photos.filter((photo) => photo.status !== "rejected");
}

export function buildMemoryBookSpreads(photos: AlbumMemory[]): MemoryBookSpread[] {
  const sortedPhotos = [...photos].sort(
    (a, b) => new Date(a.takenAt).getTime() - new Date(b.takenAt).getTime(),
  );
  const firstPhotos = sortedPhotos.slice(0, 6);
  const lastPhotos = sortedPhotos.slice(Math.max(sortedPhotos.length - 6, 0));
  const guestMap = new Map<string, AlbumMemory[]>();

  sortedPhotos.forEach((photo) => {
    guestMap.set(photo.guest, [...(guestMap.get(photo.guest) ?? []), photo]);
  });

  const guestHighlights = [...guestMap.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3)
    .flatMap(([, guestPhotos]) => guestPhotos.slice(0, 2));

  const spreads: MemoryBookSpread[] = [
    {
      title: "Primeros recuerdos",
      subtitle: "Las primeras fotos que empezaron a contar el evento.",
      photos: firstPhotos,
    },
    {
      title: "Visto por los invitados",
      subtitle: "Momentos compartidos desde distintos puntos de vista.",
      photos: guestHighlights.length > 0 ? guestHighlights : sortedPhotos.slice(0, 6),
    },
    {
      title: "Lo mejor del cierre",
      subtitle: "Los instantes que quedaron para volver a vivir la noche.",
      photos: lastPhotos,
    },
  ];

  return spreads.filter((spread) => spread.photos.length > 0);
}

export function formatBookDate(date: string) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "long",
  }).format(new Date(date));
}
