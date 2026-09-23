"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import {
  downloadEventPhotos,
  getAdminEvent,
  getPublicEvent,
  recordEventView,
  unlockEventPin,
  uploadEventPhotos,
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
import type { AlbumMemory, EventAlbum } from "@/features/albums/types/album.types";

export function usePublicAlbumController(id: string) {
  const { getToken, isSignedIn } = useAuth();
  const [album, setAlbum] = useState<EventAlbum | null | undefined>(undefined);
  const [canManage, setCanManage] = useState(false);
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [forceReveal, setForceReveal] = useState(false);
  const [rollUsed, setRollUsed] = useState(0);
  const [now, setNow] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [uploadSuccessCount, setUploadSuccessCount] = useState(0);
  const [uploadSuccessId, setUploadSuccessId] = useState(0);
  const [uploadSuccessMemories, setUploadSuccessMemories] = useState<AlbumMemory[]>([]);

  const loadAlbum = useCallback(async (mounted = true) => {
    try {
      const nextAlbum = await getPublicEvent(id);
      let isOwner = false;

      if (isSignedIn) {
        try {
          const token = await getToken();
          await getAdminEvent(id, token);
          isOwner = true;
        } catch {
          isOwner = false;
        }
      }

      if (mounted) {
        setAlbum(nextAlbum);
        setCanManage(isOwner);
        setRollUsed(getGuestRollCount(id));
        setNow(Date.now());
      }
    } catch {
      if (mounted) {
        setAlbum(null);
        setCanManage(false);
      }
    }
  }, [getToken, id, isSignedIn]);

  useEffect(() => {
    let mounted = true;
    const loadTimer = window.setTimeout(() => {
      void loadAlbum(mounted);
    }, 0);

    return () => {
      mounted = false;
      window.clearTimeout(loadTimer);
    };
  }, [loadAlbum]);

  useEffect(() => {
    let mounted = true;
    const interval = window.setInterval(() => {
      void loadAlbum(mounted);
    }, 15000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, [loadAlbum]);

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

  const handleUpload = async (
    guest: string,
    files: File[],
    onProgress?: (progress: number) => void,
  ) => {
    if (!album || !uploadOpen || remainingRoll <= 0) {
      toast.error(
        remainingRoll <= 0 ? "Ya usaste todas tus fotos" : "El album esta cerrado",
      );
      return;
    }

    setUploadSuccessCount(0);
    setUploadSuccessMemories([]);

    const uploadedPhotos = await uploadEventPhotos({
      slug: album.id,
      guest,
      pin: album.privacy === "pin" ? pin : undefined,
      files,
      onProgress,
    });
    const uploadedMemories = uploadedPhotos.map((photo) =>
      mapUploadedPhotoToMemory(photo, album.name),
    );

    addGuestRollCount(album.id, uploadedPhotos.length);
    setRollUsed((current) => current + uploadedPhotos.length);
    appendUploadedPhotos(uploadedMemories);
    setUploadSuccessCount(uploadedPhotos.length);
    setUploadSuccessMemories(uploadedMemories);
    setUploadSuccessId((current) => current + 1);
    void loadAlbum();
  };

  const appendUploadedPhotos = (uploadedMemories: AlbumMemory[]) => {
    setAlbum((current) => {
      if (!current) {
        return current;
      }

      const existingGuests = new Set(current.photos.map((photo) => photo.guest));
      const newGuestCount = uploadedMemories.some((photo) => !existingGuests.has(photo.guest))
        ? 1
        : 0;

      return {
        ...current,
        photos: [...uploadedMemories, ...current.photos],
        photosCount: current.photosCount + uploadedMemories.length,
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
      const token = await getToken();
      const blob = await downloadEventPhotos(album.id, token);
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
    canManage,
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
    uploadSuccessCount,
    uploadSuccessId,
    uploadSuccessMemories,
    handleDownload,
    handleUnlockPin,
    handleUpload,
    handleVote,
    dismissUploadSuccess: () => {
      setUploadSuccessCount(0);
      setUploadSuccessMemories([]);
    },
    setForceReveal,
    setPin,
  };
}
