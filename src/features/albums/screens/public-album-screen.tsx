"use client";

import { useState } from "react";
import Link from "next/link";
import { LockIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state/empty-state";
import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlbumShareCard } from "@/features/albums/components/album-share-card";
import { PublicAlbumActions } from "@/features/albums/components/public-album-actions";
import { PublicAlbumHero } from "@/features/albums/components/public-album-hero";
import {
  FrozenAlbumCard,
  RevealPendingCard,
} from "@/features/albums/components/public-album-state-cards";
import { PublicAlbumTabs } from "@/features/albums/components/public-album-tabs";
import { PublicUploadSuccessCard } from "@/features/albums/components/public-upload-success-card";
import { usePublicAlbumController } from "@/features/albums/hooks/use-public-album-controller";

export function PublicAlbumScreen({ id }: { id: string }) {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const albumController = usePublicAlbumController(id);
  const {
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
    dismissUploadSuccess,
    handleDownload,
    handleUnlockPin,
    handleUpload,
    handleVote,
    setForceReveal,
    setPin,
  } = albumController;

  if (album === undefined) {
    return <main className="min-h-[70vh]" />;
  }

  if (album === null || !status) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <EmptyState
          title="Este album ya no existe"
          description="Puede que haya expirado o que el link este mal escrito."
          action={
            <Button nativeButton={false} render={<Link href="/" />}>
              Volver al inicio
            </Button>
          }
        />
      </main>
    );
  }

  if (lockedByPin) {
    return (
      <main className="mx-auto max-w-sm px-5 py-24 text-center">
        <LockIcon className="mx-auto size-10 text-primary" />
        <h1 className="mt-5 font-heading text-3xl font-semibold">{album.name}</h1>
        <p className="mt-3 text-muted-foreground">Este album esta protegido con PIN.</p>
        <Input
          className="mt-6 text-center text-lg tracking-[0.4em]"
          inputMode="numeric"
          value={pin}
          onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="0000"
        />
        <Button className="mt-4 w-full bg-afterglow" onClick={handleUnlockPin}>
          Entrar
        </Button>
      </main>
    );
  }

  return (
    <main>
      <PublicAlbumHero album={album} status={status} />
      <div className="mx-auto w-full max-w-6xl space-y-12 px-5 py-10">
        <PublicAlbumActions
          albumId={album.id}
          canManage={canManage}
          canUpload={uploadOpen}
          canDownload={album.allowDownload && !revealPending}
          downloading={downloading}
          uploadMsLabel={uploadMsLabel}
          remainingRoll={remainingRoll}
          uploadDialogOpen={uploadDialogOpen}
          onUpload={handleUpload}
          onUploadDialogOpenChange={setUploadDialogOpen}
          onDownload={handleDownload}
        />
        <PublicUploadSuccessCard
          key={uploadSuccessId}
          count={uploadSuccessCount}
          memories={uploadSuccessMemories}
          onDismiss={dismissUploadSuccess}
          onUploadMore={() => {
            dismissUploadSuccess();
            setUploadDialogOpen(true);
          }}
        />
        {album.frozen ? <FrozenAlbumCard album={album} /> : null}
        {revealPending ? (
          <RevealPendingCard
            album={album}
            msLeft={revealMsLeft}
            onOpen={() => setForceReveal(true)}
          />
        ) : (
          <PublicAlbumTabs album={album} onVote={handleVote} showStatus />
        )}
        <ScrollReveal>
          <AlbumShareCard title={album.name} url={shareUrl} />
        </ScrollReveal>
      </div>
    </main>
  );
}
