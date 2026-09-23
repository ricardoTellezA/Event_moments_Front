"use client";

import Link from "next/link";
import { DownloadIcon, SettingsIcon } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";
import { UploadMemoryDialog } from "@/features/albums/components/upload-memory-dialog";

export function PublicAlbumActions({
  albumId,
  canManage,
  canUpload,
  canDownload,
  downloading,
  uploadMsLabel,
  remainingRoll,
  uploadDialogOpen,
  onUpload,
  onUploadDialogOpenChange,
  onDownload,
}: {
  albumId: string;
  canManage: boolean;
  canUpload: boolean;
  canDownload: boolean;
  downloading: boolean;
  uploadMsLabel?: string;
  remainingRoll: number;
  uploadDialogOpen?: boolean;
  onUpload: (
    guest: string,
    files: File[],
    onProgress?: (progress: number) => void,
  ) => Promise<void>;
  onUploadDialogOpenChange?: (open: boolean) => void;
  onDownload: () => void;
}) {
  return (
    <ScrollReveal className="flex flex-wrap items-center gap-3">
      <UploadMemoryDialog
        albumId={albumId}
        disabled={!canUpload || remainingRoll <= 0}
        maxFiles={Number.isFinite(remainingRoll) ? Math.min(12, remainingRoll) : 12}
        open={uploadDialogOpen}
        onOpenChange={onUploadDialogOpenChange}
        onUpload={onUpload}
      />
      {canManage && canDownload ? (
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
      {canManage ? (
        <Button
          variant="ghost"
          size="lg"
          nativeButton={false}
          render={<Link href={`/a/${albumId}/administrar`} />}
        >
          <SettingsIcon />
          Administrar
        </Button>
      ) : null}
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
