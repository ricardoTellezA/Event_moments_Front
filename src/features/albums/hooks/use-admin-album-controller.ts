"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import {
  getAdminEvent,
  removeEventPhoto,
  updateEvent,
  updateEventPhotoStatus,
} from "@/features/albums/api/albums.api";
import { albumUrl, getAlbumStatus } from "@/features/albums/lib/albums-store";
import type { EventAlbum } from "@/features/albums/types/album.types";

export function useAdminAlbumController(id: string) {
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

  const status = album ? getAlbumStatus(album) : undefined;
  const pendingPhotos = album?.photos.filter((photo) => photo.status === "pending") ?? [];
  const approvedPhotos =
    album?.photos.filter((photo) => photo.status === "approved") ?? [];
  const rejectedPhotos =
    album?.photos.filter((photo) => photo.status === "rejected") ?? [];

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
          allowVideos: patch.allowVideos,
          allowVoice: patch.allowVoice,
          challengesOn: patch.challengesOn,
          bestOfOn: patch.bestOfOn,
          disposableOn: patch.disposableOn,
          photosPerGuest: patch.photosPerGuest,
        },
        token,
      );

      setAlbum({ ...optimisticAlbum, ...nextAlbum });
    } catch {
      setAlbum(previousAlbum);
      toast.error("No pudimos guardar el cambio");
    }
  };

  const moderatePhoto = async (
    photoId: string,
    nextStatus: "approved" | "rejected",
  ) => {
    if (!album) {
      return;
    }

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

  const removePhoto = async (photoId: string) => {
    if (!album) {
      return;
    }

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
  };

  const toggleFrozen = () => {
    if (!album) {
      return;
    }

    void patchAlbum({ frozen: !album.frozen });
    toast.success(album.frozen ? "Album descongelado" : "Album congelado");
  };

  const clearPhotos = () => {
    if (!album) {
      return;
    }

    setAlbum({ ...album, photos: [] });
    toast.success("Album vaciado");
  };

  return {
    album,
    approvedPhotos,
    pendingPhotos,
    rejectedPhotos,
    shareUrl,
    status,
    clearPhotos,
    moderatePhoto,
    patchAlbum,
    removePhoto,
    toggleFrozen,
  };
}
