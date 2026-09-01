"use client";

import type {
  AlbumMemory,
  AlbumStatus,
  EventAlbum,
} from "@/features/albums/types/album.types";
import {
  buildMockMemories,
  coverOptions,
  defaultChallenges,
  seedAlbums,
} from "@/features/albums/data/albums.data";

const STORAGE_KEY = "event-moments.albums.v1";
const ROLL_PREFIX = "event-moments.roll.";

export function slugifyAlbumName(name: string) {
  return (
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "album"
  );
}

export function readStoredAlbums() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EventAlbum[]) : [];
  } catch {
    return [];
  }
}

export function readAlbums() {
  const stored = readStoredAlbums();
  const storedIds = new Set(stored.map((album) => album.id));
  return [...stored, ...seedAlbums.filter((album) => !storedIds.has(album.id))];
}

export function readAlbum(id: string) {
  return readAlbums().find((album) => album.id === id) ?? null;
}

export function saveAlbum(album: EventAlbum) {
  if (typeof window === "undefined") {
    return;
  }

  const nextAlbums = [
    album,
    ...readStoredAlbums().filter((item) => item.id !== album.id),
  ];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAlbums));
  window.dispatchEvent(new Event("event-moments:albums-change"));
}

export function updateAlbum(id: string, patch: Partial<EventAlbum>) {
  const current = readAlbum(id);

  if (!current) {
    return null;
  }

  const nextAlbum = { ...current, ...patch };
  saveAlbum(nextAlbum);
  return nextAlbum;
}

export function createAlbum(input: {
  name: string;
  date: string;
  durationHours: number;
  privacy: "public" | "pin";
  pin?: string;
  revealMode: boolean;
  revealAt?: string;
  disposableOn: boolean;
  photosPerGuest: number;
  challengesOn: boolean;
  allowVideos: boolean;
  allowVoice: boolean;
  allowDownload: boolean;
  bestOfOn: boolean;
}) {
  const id = `${slugifyAlbumName(input.name)}-${Math.random().toString(36).slice(2, 6)}`;
  const album: EventAlbum = {
    id,
    name: input.name.trim(),
    date: input.date ? new Date(input.date).toISOString() : new Date().toISOString(),
    cover:
      coverOptions[Math.floor(Math.random() * coverOptions.length)] ?? coverOptions[0],
    durationHours: input.durationHours,
    privacy: input.privacy,
    pin: input.privacy === "pin" ? input.pin || "1234" : undefined,
    createdAt: new Date().toISOString(),
    revealMode: input.revealMode,
    revealAt:
      input.revealMode && input.revealAt
        ? new Date(input.revealAt).toISOString()
        : undefined,
    challengesOn: input.challengesOn,
    challenges: defaultChallenges,
    disposableOn: input.disposableOn,
    photosPerGuest: input.photosPerGuest,
    allowVideos: input.allowVideos,
    allowVoice: input.allowVoice,
    allowDownload: input.allowDownload,
    bestOfOn: input.bestOfOn,
    votes: {},
    photos: [],
    photosCount: 0,
    contributors: 0,
    views: 0,
  };

  saveAlbum(album);
  return album;
}

export function albumUrl(id: string) {
  if (typeof window === "undefined") {
    return `/a/${id}`;
  }

  return `${window.location.origin}/a/${id}`;
}

export function getAlbumStatus(album: EventAlbum, now = Date.now()): AlbumStatus {
  if (album.frozen) {
    return "frozen";
  }

  if (album.revealMode && getRevealMsLeft(album, now) > 0) {
    return "reveal-pending";
  }

  if (album.closedManually || getUploadMsLeft(album, now) <= 0) {
    return "closed";
  }

  if (album.revealMode) {
    return "revealed";
  }

  return "open";
}

export function getUploadMsLeft(album: EventAlbum, now = Date.now()) {
  const closeAt = new Date(album.createdAt).getTime() + album.durationHours * 3600 * 1000;
  return closeAt - now;
}

export function getRevealMsLeft(album: EventAlbum, now = Date.now()) {
  if (!album.revealMode || !album.revealAt) {
    return 0;
  }

  return new Date(album.revealAt).getTime() - now;
}

export function formatMsLeft(ms: number) {
  if (ms <= 0) {
    return "0m";
  }

  const minutes = Math.floor(ms / 60000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const restMinutes = minutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  }

  if (hours > 0) {
    return `${hours}h ${restMinutes}m`;
  }

  return `${restMinutes}m`;
}

export function getGuestRollCount(albumId: string) {
  if (typeof window === "undefined") {
    return 0;
  }

  return Number(window.localStorage.getItem(`${ROLL_PREFIX}${albumId}`) ?? 0);
}

export function addGuestRollCount(albumId: string, count: number) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    `${ROLL_PREFIX}${albumId}`,
    String(getGuestRollCount(albumId) + count),
  );
  window.dispatchEvent(new Event("event-moments:albums-change"));
}

export function buildUploadedMemories(
  album: EventAlbum,
  guest: string,
  challengeId?: string,
): AlbumMemory[] {
  return buildMockMemories(3, 1).map((memory, index) => ({
    ...memory,
    id: `upload-${Date.now()}-${index}`,
    guest: guest.trim() || "Invitado anonimo",
    takenAt: new Date().toISOString(),
    challengeId,
  }));
}

export function groupByGuest(album: EventAlbum) {
  const groups = new Map<string, AlbumMemory[]>();

  album.photos.forEach((photo) => {
    groups.set(photo.guest, [...(groups.get(photo.guest) ?? []), photo]);
  });

  return [...groups.entries()]
    .map(([guest, photos]) => ({ guest, photos }))
    .sort((a, b) => b.photos.length - a.photos.length);
}

export function buildTimeline(album: EventAlbum) {
  const sorted = [...album.photos].sort(
    (a, b) => new Date(a.takenAt).getTime() - new Date(b.takenAt).getTime(),
  );

  return sorted.reduce<Array<{ time: string; label: string; photos: AlbumMemory[] }>>(
    (groups, photo, index) => {
      const current = groups[groups.length - 1];
      const label =
        index === 0
          ? "Primeros recuerdos"
          : index > sorted.length - 5
            ? "Ultimos momentos"
            : "Durante el evento";
      const time = new Date(photo.takenAt).toLocaleTimeString("es-MX", {
        hour: "numeric",
        minute: "2-digit",
      });

      if (!current || current.label !== label) {
        groups.push({ time, label, photos: [photo] });
      } else {
        current.photos.push(photo);
      }

      return groups;
    },
    [],
  );
}

export function countCompletedChallenges(album: EventAlbum) {
  const completedIds = new Set(
    album.photos.map((photo) => photo.challengeId).filter(Boolean),
  );
  return album.challenges.filter(
    (challenge) => challenge.active && completedIds.has(challenge.id),
  ).length;
}
