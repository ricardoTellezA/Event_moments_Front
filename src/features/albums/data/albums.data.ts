import type {
  AlbumMemory,
  EventAlbum,
  PhotoChallenge,
} from "@/features/albums/types/album.types";

const gallerySources = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=80",
];

const guests = ["Ricardo", "Andrea", "Carlos", "Sofia", "Invitado anonimo"];

export const defaultChallenges: PhotoChallenge[] = [
  { id: "festejado", title: "Foto con los protagonistas", active: true },
  { id: "selfie", title: "Selfie con alguien nuevo", active: true },
  { id: "comida", title: "Mejor foto de la comida", active: true },
  { id: "baile", title: "La mejor foto bailando", active: true },
  { id: "random", title: "Momento que nadie esperaba", active: true },
];

const baseAlbum = {
  privacy: "public" as const,
  challengesOn: true,
  challenges: defaultChallenges,
  disposableOn: false,
  photosPerGuest: 12,
  allowVideos: true,
  allowVoice: false,
  allowDownload: true,
  bestOfOn: true,
  revealMode: false,
  votes: {},
};

function hoursAgo(hours: number) {
  return new Date(Date.now() - hours * 3600 * 1000).toISOString();
}

export function buildMockMemories(count: number, spreadHours = 12): AlbumMemory[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `memory-${index}-${Math.random().toString(36).slice(2, 7)}`,
    src: gallerySources[index % gallerySources.length],
    alt: `Recuerdo ${index + 1}`,
    kind: index % 11 === 0 ? "video" : "photo",
    guest: guests[index % guests.length],
    takenAt: hoursAgo(spreadHours - (spreadHours / Math.max(count, 1)) * index),
    challengeId:
      index % 3 === 0
        ? defaultChallenges[index % defaultChallenges.length]?.id
        : undefined,
  }));
}

const bodaMemories = buildMockMemories(18, 14);
const cumpleMemories = buildMockMemories(14, 9);

export const seedAlbums: EventAlbum[] = [
  {
    ...baseAlbum,
    id: "boda-ana-luis",
    name: "Boda Ana & Luis",
    date: hoursAgo(20),
    cover: gallerySources[0],
    durationHours: 72,
    createdAt: hoursAgo(20),
    photos: bodaMemories,
    photosCount: bodaMemories.length,
    contributors: 18,
    views: 342,
    allowVoice: true,
  },
  {
    ...baseAlbum,
    id: "cumple-sofia",
    name: "Cumple de Sofia",
    date: hoursAgo(10),
    cover: gallerySources[4],
    durationHours: 24,
    createdAt: hoursAgo(10),
    revealMode: true,
    revealAt: new Date(Date.now() + 11 * 3600 * 1000).toISOString(),
    disposableOn: true,
    privacy: "pin",
    pin: "2468",
    photos: cumpleMemories,
    photosCount: cumpleMemories.length,
    contributors: 11,
    views: 128,
  },
];

export const coverOptions = gallerySources;
