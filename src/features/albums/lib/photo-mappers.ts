import type { UploadedApiPhoto } from "@/features/albums/api/albums.api";
import type { AlbumMemory } from "@/features/albums/types/album.types";

export function mapUploadedPhotoToMemory(
  photo: UploadedApiPhoto,
  albumName: string,
): AlbumMemory {
  return {
    id: photo.id,
    src: photo.thumbnailUrl ?? photo.url,
    alt: `Recuerdo de ${albumName}`,
    kind: photo.mimeType.startsWith("video/") ? "video" : "photo",
    guest: photo.guest,
    takenAt: photo.uploadedAt,
    status: photo.status,
  };
}
