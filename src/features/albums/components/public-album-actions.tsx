"use client";

import Link from "next/link";
import { DownloadIcon, SettingsIcon } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";
import { UploadMemoryDialog } from "@/features/albums/components/upload-memory-dialog";

export function PublicAlbumActions({
  albumId,
  canUpload,
  canDownload,
  downloading,
  uploadMsLabel,
  remainingRoll,
  onUpload,
  onDownload,
}: {
  albumId: string;
  canUpload: boolean;
  canDownload: boolean;
  downloading: boolean;
  uploadMsLabel?: string;
  remainingRoll: number;
  onUpload: (guest: string, files: File[]) => Promise<void>;
  onDownload: () => void;
}) {
  return (
    <ScrollReveal className="flex flex-wrap items-center gap-3">
      <UploadMemoryDialog
        disabled={!canUpload || remainingRoll <= 0}
        maxFiles={Number.isFinite(remainingRoll) ? Math.min(12, remainingRoll) : 12}
        onUpload={onUpload}
      />
      {canDownload ? (
        <Button
          variant="outline"
          size="lg"
          disabled={downloading}
          onClick={onDownload}
        >
          <DownloadIcon />
          {downloading ? "Preparando..." : "Descargar todo"}
        </Button>
      ) : null}
      <Button
        variant="ghost"
        size="lg"
        nativeButton={false}
        render={<Link href={`/a/${albumId}/administrar`} />}
      >
        <SettingsIcon />
        Administrar
      </Button>
      {uploadMsLabel ? (
        <span className="rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground">
          {uploadMsLabel} restantes
        </span>
      ) : null}
      {Number.isFinite(remainingRoll) ? (
        <span className="rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground">
          {remainingRoll === 0 ? "Tu rollo esta completo" : `${remainingRoll} fotos restantes`}
        </span>
      ) : null}
    </ScrollReveal>
  );
}
