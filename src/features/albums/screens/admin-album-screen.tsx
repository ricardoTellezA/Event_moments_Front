"use client";

import Link from "next/link";

import { EmptyState } from "@/components/shared/empty-state/empty-state";
import { Button } from "@/components/ui/button";
import { AdminAlbumHeader } from "@/features/albums/components/admin-album-header";
import { AdminAlbumSettings } from "@/features/albums/components/admin-album-settings";
import { AdminAlbumStats } from "@/features/albums/components/admin-album-stats";
import { AdminDangerActions } from "@/features/albums/components/admin-danger-actions";
import { AdminModerationSection } from "@/features/albums/components/admin-moderation-section";
import {
  AdminParticipantsSection,
  getParticipantStats,
} from "@/features/albums/components/admin-participants-section";
import { AlbumShareCard } from "@/features/albums/components/album-share-card";
import { useAdminAlbumController } from "@/features/albums/hooks/use-admin-album-controller";
import { countCompletedChallenges } from "@/features/albums/lib/albums-store";

export function AdminAlbumScreen({ id }: { id: string }) {
  const admin = useAdminAlbumController(id);
  const { album, status } = admin;

  if (album === undefined) {
    return <main className="min-h-[70vh]" />;
  }

  if (album === null || !status) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <EmptyState
          title="Album no encontrado"
          description="No existe un album para administrar con este link."
          action={
            <Button nativeButton={false} render={<Link href="/mis-albumes" />}>
              Ver mis albumes
            </Button>
          }
        />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-10 px-5 py-12">
      <AdminAlbumHeader albumId={album.id} albumName={album.name} status={status} />
      <AdminAlbumStats
        photos={album.photos.length}
        contributors={album.contributors}
        views={album.views}
        completedChallenges={countCompletedChallenges(album)}
      />
      <AdminAlbumSettings album={album} onPatch={(patch) => void admin.patchAlbum(patch)} />
      <AdminParticipantsSection
        stats={getParticipantStats(album.photos)}
        disposableOn={album.disposableOn}
        photosPerGuest={album.photosPerGuest}
      />
      <AdminModerationSection
        pendingPhotos={admin.pendingPhotos}
        approvedPhotos={admin.approvedPhotos}
        rejectedPhotos={admin.rejectedPhotos}
        allPhotos={album.photos}
        onApprove={(photoId) => void admin.moderatePhoto(photoId, "approved")}
        onReject={(photoId) => void admin.moderatePhoto(photoId, "rejected")}
        onRemove={(photoId) => void admin.removePhoto(photoId)}
      />
      <AlbumShareCard title={album.name} url={admin.shareUrl} />
      <AdminDangerActions
        frozen={album.frozen}
        onToggleFrozen={admin.toggleFrozen}
        onClearPhotos={admin.clearPhotos}
      />
    </main>
  );
}
