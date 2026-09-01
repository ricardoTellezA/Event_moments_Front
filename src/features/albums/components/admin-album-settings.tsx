"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Switch } from "@/components/ui/switch";
import type { EventAlbum } from "@/features/albums/types/album.types";

export function AdminAlbumSettings({
  album,
  onPatch,
}: {
  album: EventAlbum;
  onPatch: (patch: Partial<EventAlbum>) => void;
}) {
  return (
    <ScrollReveal className="space-y-3 rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h2 className="font-heading text-2xl font-semibold">Ajustes</h2>
      <SettingRow
        label="Album abierto para subir"
        checked={!album.closedManually}
        onCheckedChange={(checked) => onPatch({ closedManually: !checked })}
      />
      <SettingRow
        label="Permitir descargas"
        checked={album.allowDownload}
        onCheckedChange={(checked) => onPatch({ allowDownload: checked })}
      />
      <SettingRow
        label="Retos de fotos"
        checked={album.challengesOn}
        onCheckedChange={(checked) => onPatch({ challengesOn: checked })}
      />
      <SettingRow
        label="Lo mejor de la noche"
        checked={album.bestOfOn}
        onCheckedChange={(checked) => onPatch({ bestOfOn: checked })}
      />
      <SettingRow
        label="Modo desechable"
        checked={album.disposableOn}
        onCheckedChange={(checked) => onPatch({ disposableOn: checked })}
      />
      {album.disposableOn ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 py-3">
          <span className="text-sm font-medium">Fotos por invitado</span>
          <div className="flex flex-wrap gap-2">
            {[6, 12, 24, 36].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onPatch({ photosPerGuest: option })}
                className={
                  album.photosPerGuest === option
                    ? "rounded-full bg-afterglow px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft"
                    : "rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted"
                }
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <SettingRow
        label="Permitir videos"
        checked={album.allowVideos}
        onCheckedChange={(checked) => onPatch({ allowVideos: checked })}
      />
      <SettingRow
        label="Permitir mensajes de voz"
        checked={album.allowVoice}
        onCheckedChange={(checked) => onPatch({ allowVoice: checked })}
      />
      <SettingRow
        label="Proteger con PIN"
        checked={album.privacy === "pin"}
        onCheckedChange={(checked) =>
          onPatch({
            privacy: checked ? "pin" : "public",
            pin: checked ? (album.pin ?? "1234") : undefined,
          })
        }
      />
      {album.privacy === "pin" ? (
        <p className="text-sm text-muted-foreground">
          PIN protegido. Cambialo desactivando y activando esta opcion.
        </p>
      ) : null}
    </ScrollReveal>
  );
}

function SettingRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-3 last:border-0">
      <span className="text-sm font-medium">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
