export type AlbumPrivacy = "public" | "pin";

export type MemoryKind = "photo" | "video" | "voice";

export type AlbumStatus = "open" | "reveal-pending" | "revealed" | "closed" | "frozen";

export type PhotoChallenge = {
  id: string;
  title: string;
  active: boolean;
};

export type AlbumMemory = {
  id: string;
  src: string;
  originalSrc?: string;
  alt: string;
  kind: MemoryKind;
  guest: string;
  takenAt: string;
  status?: "pending" | "approved" | "rejected";
  challengeId?: string;
};

export type EventAlbum = {
  dbId?: string;
  id: string;
  name: string;
  date: string;
  cover: string;
  durationHours: number;
  privacy: AlbumPrivacy;
  pin?: string;
  createdAt: string;
  revealMode: boolean;
  revealAt?: string;
  challengesOn: boolean;
  challenges: PhotoChallenge[];
  disposableOn: boolean;
  photosPerGuest: number;
  allowVideos: boolean;
  allowVoice: boolean;
  allowDownload: boolean;
  bestOfOn: boolean;
  votes: Record<string, Record<string, number>>;
  photos: AlbumMemory[];
  photosCount: number;
  contributors: number;
  views: number;
  closedManually?: boolean;
  frozen?: boolean;
};
