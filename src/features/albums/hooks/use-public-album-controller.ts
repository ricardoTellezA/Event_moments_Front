"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  downloadEventPhotos,
  getPublicEvent,
  recordEventView,
  unlockEventPin,
  uploadEventPhotos,
  type UploadedApiPhoto,
} from "@/features/albums/api/albums.api";
import {
  addGuestRollCount,
  albumUrl,
  formatMsLeft,
  getAlbumStatus,
  getGuestRollCount,
  getRevealMsLeft,
  getUploadMsLeft,
} from "@/features/albums/lib/albums-store";
import { mapUploadedPhotoToMemory } from "@/features/albums/lib/photo-mappers";
import type { EventAlbum } from "@/features/albums/types/album.types";

export function usePublicAlbumController(id: string) {
  const [album, setAlbum] = useState<EventAlbum | null | undefined>(undefined);
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [forceReveal, setForceReveal] = useState(false);
  const [rollUsed, setRollUsed] = useState(0);
  const [now, setNow] = useState(0);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadAlbum() {
      try {
        const nextAlbum = await getPublicEvent(id);

        if (mounted) {
          setAlbum(nextAlbum);
          setRollUsed(getGuestRollCount(id));
          setNow(Date.now());
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
  }, [id]);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!album) {
      return;
    }

    const viewed = window.sessionStorage.getItem(`event-moments.viewed.${album.id}`);

    if (!viewed) {
      window.sessionStorage.setItem(`event-moments.viewed.${album.id}`, "true");
      void recordEventView(album.id)
        .then((nextAlbum) => setAlbum(nextAlbum))
        .catch(() =>
          setAlbum((current) =>
            current ? { ...current, views: current.views + 1 } : current,
          ),
        );
    }
  }, [album]);

  const shareUrl = useMemo(() => albumUrl(id), [id]);

  const status = album ? getAlbumStatus(album, now) : undefined;
  const revealPending = status === "reveal-pending" && !forceReveal;
  const lockedByPin = album?.privacy === "pin" && !unlocked;
  const uploadOpen = status
    ? ["open", "reveal-pending", "revealed"].includes(status)
    : false;
  const remainingRoll =
    album?.disposableOn && album ? Math.max(album.photosPerGuest - rollUsed, 0) : Infinity;
  const uploadMsLabel =
    album && uploadOpen ? formatMsLeft(getUploadMsLeft(album, now)) : undefined;
  const revealMsLeft = album ? getRevealMsLeft(album, now) : 0;

  const handleUpload = async (guest: string, files: File[]) => {
    if (!album || !uploadOpen || remainingRoll <= 0) {
      toast.error(
        remainingRoll <= 0 ? "Ya usaste todas tus fotos" : "El album esta cerrado",
      );
      return;
    }

    const uploadedPhotos = await uploadEventPhotos({
      slug: album.id,
      guest,
      pin: album.privacy === "pin" ? pin : undefined,
      files,
    });

    addGuestRollCount(album.id, uploadedPhotos.length);
    setRollUsed((current) => current + uploadedPhotos.length);
    appendUploadedPhotos(uploadedPhotos);
  };

  const appendUploadedPhotos = (uploadedPhotos: UploadedApiPhoto[]) => {
    setAlbum((current) => {
      if (!current) {
        return current;
      }

      const existingGuests = new Set(current.photos.map((photo) => photo.guest));
      const newMemories = uploadedPhotos.map((photo) =>
        mapUploadedPhotoToMemory(photo, current.name),
      );
      const newGuestCount = newMemories.some((photo) => !existingGuests.has(photo.guest))
        ? 1
        : 0;

      return {
        ...current,
        photos: [...newMemories, ...current.photos],
        photosCount: current.photosCount + uploadedPhotos.length,
        contributors: current.contributors + newGuestCount,
      };
    });
  };

  const handleVote = (category: string, photoId: string) => {
    if (!album) {
      return;
    }

    const categoryVotes = { ...(album.votes[category] ?? {}) };
    categoryVotes[photoId] = (categoryVotes[photoId] ?? 0) + 1;
    setAlbum({ ...album, votes: { ...album.votes, [category]: categoryVotes } });
    toast.success("Voto registrado");
  };

  const handleDownload = async () => {
    if (!album || downloading) {
      return;
    }

    setDownloading(true);

    try {
      const blob = await downloadEventPhotos(
        album.id,
        album.privacy === "pin" ? pin : undefined,
      );
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${album.id}-recuerdos.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Descarga lista");
    } catch {
      toast.error("No pudimos preparar la descarga");
    } finally {
      setDownloading(false);
    }
  };

  const handleUnlockPin = async () => {
    if (!album) {
      return;
    }

    try {
      await unlockEventPin(album.id, pin);
      setUnlocked(true);
    } catch {
      toast.error("PIN incorrecto");
    }
  };

  return {
    album,
    downloading,
    lockedByPin,
    pin,
    remainingRoll,
    revealMsLeft,
    revealPending,
    shareUrl,
    status,
    uploadMsLabel,
    uploadOpen,
    handleDownload,
    handleUnlockPin,
    handleUpload,
    handleVote,
    setForceReveal,
    setPin,
  };
}
