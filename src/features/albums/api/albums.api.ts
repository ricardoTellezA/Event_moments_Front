import { API_BASE_URL, apiFetch } from "@/lib/api/client";
import type { EventAlbum } from "@/features/albums/types/album.types";
import {
  defaultChallenges,
  getCoverForEventName,
} from "@/features/albums/data/albums.data";

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
  allowVideos: boolean;
  allowVoice: boolean;
  challengesOn: boolean;
  bestOfOn: boolean;
  disposableOn: boolean;
  photosPerGuest: number;
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
  coverUrl?: string;
  eventDate?: string;
  durationHours: number;
  privacy: "public" | "pin";
  pin?: string;
  revealMode: boolean;
  revealAt?: string;
  allowDownloads: boolean;
  allowVideos?: boolean;
  allowVoice?: boolean;
  challengesOn?: boolean;
  bestOfOn?: boolean;
  disposableOn?: boolean;
  photosPerGuest?: number;
  maxPhotos?: number;
};

export type UpdateEventInput = Partial<{
  name: string;
  description: string | null;
  coverUrl: string | null;
  eventDate: string | null;
  durationHours: number;
  status: "draft" | "active" | "closed" | "frozen";
  privacy: "public" | "pin";
  pin: string;
  revealMode: boolean;
  revealAt: string | null;
  allowDownloads: boolean;
  allowVideos: boolean;
  allowVoice: boolean;
  challengesOn: boolean;
  bestOfOn: boolean;
  disposableOn: boolean;
  photosPerGuest: number;
  maxPhotos: number | null;
}>;

export function mapApiEventToAlbum(event: ApiEvent): EventAlbum {
  const cover = event.coverUrl ?? getCoverForEventName(event.name);
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
    challengesOn: event.challengesOn,
    challenges: defaultChallenges,
    disposableOn: event.disposableOn,
    photosPerGuest: event.photosPerGuest,
    allowVideos: event.allowVideos,
    allowVoice: event.allowVoice,
    allowDownload: event.allowDownloads,
    bestOfOn: event.bestOfOn,
    votes: {},
    photos,
    photosCount: event.photosCount,
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
  onProgress,
}: {
  slug: string;
  guest: string;
  pin?: string;
  files: File[];
  onProgress?: (progress: number) => void;
}) {
  const formData = new FormData();
  formData.set("displayName", guest.trim() || "Invitado");

  if (pin) {
    formData.set("pin", pin);
  }

  files.forEach((file) => formData.append("files", file));

  if (!onProgress) {
    return apiFetch<UploadedApiPhoto[]>(`/events/${slug}/photos`, {
      method: "POST",
      body: formData,
    });
  }

  return uploadWithProgress<UploadedApiPhoto[]>(
    `${API_BASE_URL}/events/${slug}/photos`,
    formData,
    onProgress,
  );
}

function uploadWithProgress<TResponse>(
  url: string,
  body: FormData,
  onProgress: (progress: number) => void,
) {
  return new Promise<TResponse>((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.open("POST", url);
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.min(99, Math.round((event.loaded / event.total) * 100)));
      }
    };
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        onProgress(100);
        resolve(JSON.parse(request.responseText) as TResponse);
        return;
      }

      reject(parseXhrError(request));
    };
    request.onerror = () => reject(new Error("NETWORK_ERROR"));
    request.send(body);
  });
}

function parseXhrError(request: XMLHttpRequest) {
  try {
    const body = JSON.parse(request.responseText) as {
      code?: string;
      message?: string | string[];
    };
    const message = Array.isArray(body.message)
      ? body.message.join(", ")
      : body.message;

    return new Error(message ?? `API request failed with status ${request.status}`, {
      cause: body.code,
    });
  } catch {
    return new Error(`API request failed with status ${request.status}`);
  }
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

export async function downloadEventPhotos(slug: string, token: string | null) {
  const response = await fetch(`${API_BASE_URL}/events/${slug}/photos/download`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API download failed with status ${response.status}`);
  }

  return response.blob();
}
