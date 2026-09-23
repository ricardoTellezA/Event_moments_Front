"use client";

import { useEffect, useMemo, useState } from "react";
import { ImagePlusIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import { ApiError } from "@/lib/api/client";

const maxFileSize = 4 * 1024 * 1024;
const maxImageSide = 2400;

type SelectedMemory = {
  id: string;
  file: File;
  previewUrl: string;
};

type UploadPhase = "idle" | "compressing" | "uploading";

export function UploadMemoryDialog({
  albumId,
  disabled,
  maxFiles = 12,
  onUpload,
}: {
  albumId: string;
  disabled?: boolean;
  maxFiles?: number;
  onUpload: (
    guest: string,
    files: File[],
    onProgress?: (progress: number) => void,
  ) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState(() => readGuestName(albumId));
  const [selectedMemories, setSelectedMemories] = useState<SelectedMemory[]>([]);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPhase, setUploadPhase] = useState<UploadPhase>("idle");
  const [progress, setProgress] = useState(0);

  const files = useMemo(
    () => selectedMemories.map((memory) => memory.file),
    [selectedMemories],
  );
  const guestNameStorageKey = useMemo(() => getGuestNameStorageKey(albumId), [albumId]);

  useEffect(() => {
    return () => {
      selectedMemories.forEach((memory) => URL.revokeObjectURL(memory.previewUrl));
    };
  }, [selectedMemories]);

  const resetSelection = () => {
    selectedMemories.forEach((memory) => URL.revokeObjectURL(memory.previewUrl));
    setSelectedMemories([]);
    setFileInputKey((key) => key + 1);
  };

  const handleUpload = async () => {
    if (!files.length) {
      toast.error("Selecciona al menos una foto");
      return;
    }

    try {
      setIsUploading(true);
      setUploadPhase("compressing");
      setProgress(8);

      const compressedFiles: File[] = [];

      for (const [index, file] of files.entries()) {
        compressedFiles.push(await compressImage(file));
        setProgress(Math.round(((index + 1) / files.length) * 70));
      }

      setUploadPhase("uploading");
      setProgress(72);
      const displayName = guest.trim() || "Invitado";

      await onUpload(displayName, compressedFiles, (uploadProgress) => {
        setProgress(72 + Math.round(uploadProgress * 0.28));
      });
      saveGuestName(guestNameStorageKey, displayName);
      setProgress(100);
      setGuest(displayName);
      resetSelection();
      setOpen(false);
      toast.success(
        compressedFiles.length === 1
          ? "1 recuerdo enviado a revision"
          : `${compressedFiles.length} recuerdos enviados a revision`,
      );
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setIsUploading(false);
      setUploadPhase("idle");
      setProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            disabled={disabled}
            size="lg"
            className="bg-afterglow shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lifted"
          />
        }
      >
        <ImagePlusIcon />
        Subir fotos
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Subir recuerdos</DialogTitle>
          <DialogDescription>
            Selecciona fotos desde tu celular. Las optimizamos antes de guardarlas.
          </DialogDescription>
        </DialogHeader>
        <label className="space-y-2">
          <span className="text-sm font-semibold">Tu nombre</span>
          <Input
            value={guest}
            onChange={(event) => setGuest(event.target.value)}
            placeholder="Invitado"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold">Fotos</span>
          <Input
            key={fileInputKey}
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => {
              const selectedFiles = Array.from(event.target.files ?? []);

              if (selectedFiles.length > maxFiles) {
                toast.error(`Solo puedes subir ${maxFiles} fotos mas`);
              }

              const nextMemories = selectedFiles.slice(0, maxFiles).map((file) => ({
                id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
                file,
                previewUrl: URL.createObjectURL(file),
              }));

              resetSelection();
              setSelectedMemories(nextMemories);
            }}
          />
          <span className="block text-xs text-muted-foreground">
            Maximo {maxFiles} fotos en esta subida. Limite final: 150 fotos por
            album.
          </span>
        </label>

        {selectedMemories.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">
                {selectedMemories.length} seleccionadas
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isUploading}
                onClick={resetSelection}
              >
                Limpiar
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {selectedMemories.map((memory) => (
                <div
                  key={memory.id}
                  className="group relative overflow-hidden rounded-2xl bg-muted shadow-soft"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={memory.previewUrl}
                    alt={memory.file.name}
                    className="aspect-square w-full object-cover"
                  />
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => {
                      URL.revokeObjectURL(memory.previewUrl);
                      setSelectedMemories((current) =>
                        current.filter((item) => item.id !== memory.id),
                      );
                    }}
                    className="absolute right-1.5 top-1.5 grid size-8 place-items-center rounded-full bg-card/95 text-foreground shadow-soft transition-transform active:scale-95 disabled:pointer-events-none disabled:opacity-50"
                    aria-label="Quitar foto"
                  >
                    <Trash2Icon className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {isUploading ? (
          <Progress value={progress} className="rounded-2xl bg-muted/50 p-4">
            <ProgressLabel className="inline-flex items-center gap-2">
              <Loader2Icon className="size-4 animate-spin text-primary" />
              {uploadPhase === "compressing" ? "Optimizando fotos" : "Subiendo fotos"}
            </ProgressLabel>
            <span className="ml-auto text-sm text-muted-foreground tabular-nums">
              {progress}%
            </span>
          </Progress>
        ) : null}

        <DialogFooter>
          <Button
            className="bg-afterglow"
            disabled={isUploading || !selectedMemories.length}
            onClick={() => void handleUpload()}
          >
            {isUploading ? "Subiendo..." : "Agregar recuerdos"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function getUploadErrorMessage(error: unknown) {
  if (error instanceof Error && error.message === "IMAGE_TOO_LARGE") {
    return "Una foto sigue pesando mas de 4 MB despues de optimizarla";
  }

  if (error instanceof ApiError) {
    return getUploadErrorCodeMessage(error.code);
  }

  if (error instanceof Error && typeof error.cause === "string") {
    return getUploadErrorCodeMessage(error.cause);
  }

  return "No pudimos subir las fotos";
}

function getUploadErrorCodeMessage(code?: string) {
  const messages: Record<string, string> = {
    EVENT_PHOTO_LIMIT_REACHED: "Este album ya llego al limite de 150 fotos",
    PARTICIPANT_PHOTO_LIMIT_REACHED:
      "Ya alcanzaste el limite de fotos para este album",
    EVENT_UPLOAD_CLOSED: "Este album ya cerro la subida de fotos",
    EVENT_CLOSED: "Este album esta cerrado",
    INVALID_EVENT_PIN: "El PIN del album no es valido",
    INVALID_FILE_TYPE: "Una de las fotos no es una imagen valida",
    NO_FILES_UPLOADED: "Selecciona al menos una foto",
    UPLOAD_RATE_LIMITED:
      "Hay demasiadas subidas seguidas. Intenta de nuevo en unos minutos",
  };

  return messages[code ?? ""] ?? "No pudimos subir las fotos";
}

async function compressImage(file: File) {
  const image = document.createElement("img");
  const url = URL.createObjectURL(file);

  try {
    image.src = url;
    await image.decode();

    const scale = Math.min(1, maxImageSide / Math.max(image.width, image.height));
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);

    for (const quality of [0.9, 0.82, 0.74]) {
      const blob = await canvasToBlob(canvas, quality);

      if (blob.size <= maxFileSize) {
        return new File([blob], replaceExtension(file.name), {
          type: "image/jpeg",
        });
      }
    }

    throw new Error("IMAGE_TOO_LARGE");
  } finally {
    URL.revokeObjectURL(url);
  }
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error("Image compression failed"));
      },
      "image/jpeg",
      quality,
    );
  });
}

function replaceExtension(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "") + ".jpg";
}

function getGuestNameStorageKey(albumId: string) {
  return `keeps.guestName.${albumId}`;
}

function readGuestName(albumId: string) {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(getGuestNameStorageKey(albumId)) ?? "";
}

function saveGuestName(key: string, guestName: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, guestName);
}
