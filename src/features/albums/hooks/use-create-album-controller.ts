"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import { createEvent, uploadEventCover } from "@/features/albums/api/albums.api";
import { getCoverForEventName } from "@/features/albums/data/albums.data";
import { compressImageFile } from "@/features/albums/lib/image-compression";

export function useCreateAlbumController() {
  const router = useRouter();
  const { getToken } = useAuth();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [privacy, setPrivacy] = useState("public");
  const [pin, setPin] = useState("");
  const [duration, setDuration] = useState("72");
  const [revealMode, setRevealMode] = useState(false);
  const [revealAt, setRevealAt] = useState("");
  const [disposableOn, setDisposableOn] = useState(false);
  const [photosPerGuest, setPhotosPerGuest] = useState(12);
  const [challengesOn, setChallengesOn] = useState(true);
  const [allowVideos, setAllowVideos] = useState(true);
  const [allowVoice, setAllowVoice] = useState(false);
  const [bestOfOn, setBestOfOn] = useState(true);
  const [allowDownload, setAllowDownload] = useState(true);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    return () => {
      if (coverPreviewUrl) {
        URL.revokeObjectURL(coverPreviewUrl);
      }
    };
  }, [coverPreviewUrl]);

  const setCover = (file: File | null) => {
    setCoverFile(file);
    setCoverPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const goToStep = (nextStep: number) => {
    setDirection(nextStep > step ? "forward" : "back");
    setStep(Math.max(0, Math.min(2, nextStep)));
  };

  const handleNext = async () => {
    if (isCreating) {
      return;
    }

    if (step === 0 && !name.trim()) {
      toast.error("Ponle un nombre a tu evento");
      return;
    }

    if (step < 2) {
      goToStep(step + 1);
      return;
    }

    try {
      setIsCreating(true);
      const token = await getToken();
      const fallbackCoverUrl = getCoverForEventName(name);
      const album = await createEvent(
        {
          name,
          coverUrl: fallbackCoverUrl,
          eventDate: date ? new Date(date).toISOString() : undefined,
          durationHours: Number(duration),
          privacy: privacy === "pin" ? "pin" : "public",
          pin,
          revealMode,
          revealAt:
            revealMode && revealAt ? new Date(revealAt).toISOString() : undefined,
          allowDownloads: allowDownload,
          allowVideos,
          allowVoice,
          challengesOn,
          bestOfOn,
          disposableOn,
          photosPerGuest,
          maxPhotos: 150,
        },
        token,
      );

      if (coverFile) {
        try {
          const compressedCover = await compressImageFile(coverFile, {
            maxFileSize: 2.5 * 1024 * 1024,
            maxImageSide: 2200,
            qualities: [0.9, 0.82, 0.74, 0.66],
          });

          await uploadEventCover(album.dbId ?? album.id, compressedCover, token);
        } catch {
          toast.warning(
            "Album creado, pero no pudimos guardar la portada personalizada",
          );
        }
      }

      toast.success("Album creado");
      router.push(`/a/${album.id}`);
    } catch {
      toast.error("No pudimos crear el album");
      setIsCreating(false);
    }
  };

  return {
    allowDownload,
    allowVideos,
    allowVoice,
    bestOfOn,
    challengesOn,
    coverFile,
    coverPreviewUrl,
    date,
    direction,
    disposableOn,
    duration,
    isCreating,
    name,
    photosPerGuest,
    pin,
    privacy,
    revealAt,
    revealMode,
    step,
    goToStep,
    handleNext,
    setAllowDownload,
    setAllowVideos,
    setAllowVoice,
    setBestOfOn,
    setChallengesOn,
    setCover,
    setDate,
    setDisposableOn,
    setDuration,
    setName,
    setPhotosPerGuest,
    setPin,
    setPrivacy,
    setRevealAt,
    setRevealMode,
  };
}
