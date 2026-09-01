"use client";

import { useState } from "react";
import { ImagePlusIcon } from "lucide-react";
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

export function UploadMemoryDialog({
  disabled,
  onUpload,
}: {
  disabled?: boolean;
  onUpload: (guest: string, files: File[]) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!files.length) {
      toast.error("Selecciona al menos una foto");
      return;
    }

    try {
      setIsUploading(true);
      const compressedFiles = await Promise.all(files.map(compressImage));
      await onUpload(guest, compressedFiles);
      setGuest("");
      setFiles([]);
      setFileInputKey((key) => key + 1);
      setOpen(false);
    } catch {
      toast.error("No pudimos subir las fotos");
    } finally {
      setIsUploading(false);
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
      <DialogContent>
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
              setFiles(Array.from(event.target.files ?? []).slice(0, 12));
            }}
          />
          <span className="block text-xs text-muted-foreground">
            Maximo 12 fotos por subida. Limite final: 150 fotos por album.
          </span>
        </label>
        <DialogFooter>
          <Button
            className="bg-afterglow"
            disabled={isUploading}
            onClick={() => void handleUpload()}
          >
            {isUploading ? "Subiendo..." : "Agregar recuerdos"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

async function compressImage(file: File) {
  const image = document.createElement("img");
  const url = URL.createObjectURL(file);

  try {
    image.src = url;
    await image.decode();

    const maxSide = 1200;
    const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);

    for (const quality of [0.78, 0.68, 0.58]) {
      const blob = await canvasToBlob(canvas, quality);

      if (blob.size <= 1024 * 1024 || quality === 0.58) {
        return new File([blob], replaceExtension(file.name), {
          type: "image/jpeg",
        });
      }
    }

    return file;
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
