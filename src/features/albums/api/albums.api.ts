import { apiFetch } from "@/lib/api/client";
import type { EventAlbum } from "@/features/albums/types/album.types";
import { coverOptions, defaultChallenges } from "@/features/albums/data/albums.data";

export type ApiEvent = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  coverUrl: string | null;
  eventDate: string | null;
  uploadClosesAt: string | null;
  durationHours: number | null;
  revealMode: boolean;
  revealAt: string | null;
  status: "draft" | "active" | "closed" | "frozen";
  privacy: "public" | "pin";
  allowDownloads: boolean;
  maxPhotos: number | null;
  views: number;
  contributors: number;
  photosCount: number;
  photos?: Array<{
    id: string;
    url: string;
    thumbnailUrl: string | null;
    mimeType: string;
    status: "pending" | "approved" | "rejected";
    uploadedAt: string;
    guest: string;
  }>;
  createdAt: string;
  updatedAt: string;
};

export type CreateEventInput = {
  name: string;
  eventDate?: string;
  durationHours: number;
  privacy: "public" | "pin";
  pin?: string;
  revealMode: boolean;
  revealAt?: string;
  allowDownloads: boolean;
  maxPhotos?: number;
};

export type UpdateEventInput = Partial<{
  name: string;
  description: string | null;
  eventDate: string | null;
  durationHours: number;
  status: "draft" | "active" | "closed" | "frozen";
  privacy: "public" | "pin";
  pin: string;
  revealMode: boolean;
  revealAt: string | null;
  allowDownloads: boolean;
  maxPhotos: number | null;
}>;

export function mapApiEventToAlbum(event: ApiEvent): EventAlbum {
  const cover = event.coverUrl ?? coverOptions[0];
  const photos =
    event.photos?.map((photo) => ({
      id: photo.id,
      src: photo.thumbnailUrl ?? photo.url,
      alt: `Recuerdo de ${event.name}`,
      kind: photo.mimeType.startsWith("video/") ? ("video" as const) : ("photo" as const),
      guest: photo.guest,
      takenAt: photo.uploadedAt,
      status: photo.status,
    })) ?? [];

  return {
    dbId: event.id,
    id: event.slug,
    name: event.name,
    date: event.eventDate ?? event.createdAt,
    cover,
    durationHours: event.durationHours ?? 72,
    privacy: event.privacy,
    createdAt: event.createdAt,
    revealMode: event.revealMode,
    revealAt: event.revealAt ?? undefined,
    challengesOn: false,
    challenges: defaultChallenges,
    disposableOn: false,
    photosPerGuest: event.maxPhotos ?? 12,
    allowVideos: true,
    allowVoice: false,
    allowDownload: event.allowDownloads,
    bestOfOn: false,
    votes: {},
    photos,
    contributors: event.contributors,
    views: event.views,
    closedManually: event.status === "closed",
    frozen: event.status === "frozen",
  };
}

export async function createEvent(input: CreateEventInput, token: string | null) {
  const event = await apiFetch<ApiEvent>("/events", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });

  return mapApiEventToAlbum(event);
}

export async function getMyEvents(token: string | null) {
  const events = await apiFetch<ApiEvent[]>("/events/me", { token });

  return events.map(mapApiEventToAlbum);
}

export async function getPublicEvent(slug: string) {
  const event = await apiFetch<ApiEvent>(`/events/${slug}`);

  return mapApiEventToAlbum(event);
}

export async function getAdminEvent(idOrSlug: string, token: string | null) {
  const event = await apiFetch<ApiEvent>(`/events/${idOrSlug}/admin`, { token });

  return mapApiEventToAlbum(event);
}

export async function updateEvent(
  idOrSlug: string,
  input: UpdateEventInput,
  token: string | null,
) {
  const event = await apiFetch<ApiEvent>(`/events/${idOrSlug}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(input),
  });

  return mapApiEventToAlbum(event);
}

export async function recordEventView(slug: string) {
  const event = await apiFetch<ApiEvent>(`/events/${slug}/view`, {
    method: "POST",
  });

  return mapApiEventToAlbum(event);
}

export function unlockEventPin(slug: string, pin: string) {
  return apiFetch<{ unlocked: boolean }>(`/events/${slug}/unlock-pin`, {
    method: "POST",
    body: JSON.stringify({ pin }),
  });
}

export type UploadedApiPhoto = NonNullable<ApiEvent["photos"]>[number];

export async function uploadEventPhotos({
  slug,
  guest,
  pin,
  files,
}: {
  slug: string;
  guest: string;
  pin?: string;
  files: File[];
}) {
  const formData = new FormData();
  formData.set("displayName", guest.trim() || "Invitado");

  if (pin) {
    formData.set("pin", pin);
  }

  files.forEach((file) => formData.append("files", file));

  return apiFetch<UploadedApiPhoto[]>(`/events/${slug}/photos`, {
    method: "POST",
    body: formData,
  });
}

export function removeEventPhoto(
  idOrSlug: string,
  photoId: string,
  token: string | null,
) {
  return apiFetch<{ deleted: boolean }>(`/events/${idOrSlug}/photos/${photoId}`, {
    method: "DELETE",
    token,
  });
}

export function updateEventPhotoStatus(
  idOrSlug: string,
  photoId: string,
  status: "pending" | "approved" | "rejected",
  token: string | null,
) {
  return apiFetch<{ id: string; status: "pending" | "approved" | "rejected" }>(
    `/events/${idOrSlug}/photos/${photoId}/status`,
    {
      method: "PATCH",
      token,
      body: JSON.stringify({ status }),
    },
  );
}
