"use client";

import { Input } from "@/components/ui/input";
import { Field, Pill, ToggleRow } from "@/features/albums/components/create-album-fields";

export const durationOptions = [
  { label: "24 horas", value: "24" },
  { label: "3 dias", value: "72" },
  { label: "7 dias", value: "168" },
  { label: "30 dias", value: "720" },
];

export function BasicAlbumStep({
  name,
  date,
  privacy,
  pin,
  duration,
  onNameChange,
  onDateChange,
  onPrivacyChange,
  onPinChange,
  onDurationChange,
}: {
  name: string;
  date: string;
  privacy: string;
  pin: string;
  duration: string;
  onNameChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onPrivacyChange: (value: string) => void;
  onPinChange: (value: string) => void;
  onDurationChange: (value: string) => void;
}) {
  return (
    <>
      <Field label="Nombre del evento">
        <Input
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Boda Ana & Luis"
        />
      </Field>
      <Field label="Fecha del evento">
        <Input
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
        />
      </Field>
      <Field label="Cuanto tiempo estara abierto?">
        <div className="flex flex-wrap gap-2">
          {durationOptions.map((option) => (
            <Pill
              key={option.value}
              active={duration === option.value}
              onClick={() => onDurationChange(option.value)}
            >
              {option.label}
            </Pill>
          ))}
        </div>
      </Field>
      <Field label="Privacidad">
        <div className="flex flex-wrap gap-2">
          <Pill active={privacy === "public"} onClick={() => onPrivacyChange("public")}>
            Cualquiera con el link
          </Pill>
          <Pill active={privacy === "pin"} onClick={() => onPrivacyChange("pin")}>
            Con PIN
          </Pill>
        </div>
        {privacy === "pin" ? (
          <Input
            className="mt-3 animate-wizard-forward"
            inputMode="numeric"
            value={pin}
            onChange={(event) =>
              onPinChange(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="PIN de 4 digitos"
          />
        ) : null}
      </Field>
    </>
  );
}

export function AlbumModeStep({
  revealMode,
  revealAt,
  disposableOn,
  photosPerGuest,
  challengesOn,
  onRevealModeChange,
  onRevealAtChange,
  onDisposableChange,
  onPhotosPerGuestChange,
  onChallengesChange,
}: {
  revealMode: boolean;
  revealAt: string;
  disposableOn: boolean;
  photosPerGuest: number;
  challengesOn: boolean;
  onRevealModeChange: (value: boolean) => void;
  onRevealAtChange: (value: string) => void;
  onDisposableChange: (value: boolean) => void;
  onPhotosPerGuestChange: (value: number) => void;
  onChallengesChange: (value: boolean) => void;
}) {
  return (
    <>
      <ToggleRow
        label="Modo revelado"
        hint="Nadie ve las fotos hasta la hora del revelado."
        checked={revealMode}
        onCheckedChange={onRevealModeChange}
      />
      {revealMode ? (
        <Field label="Fecha y hora del revelado">
          <Input
            type="datetime-local"
            value={revealAt}
            onChange={(event) => onRevealAtChange(event.target.value)}
          />
        </Field>
      ) : null}
      <ToggleRow
        label="Modo desechable"
        hint="Cada invitado tiene un numero limitado de fotos."
        checked={disposableOn}
        onCheckedChange={onDisposableChange}
      />
      {disposableOn ? (
        <Field label="Fotos por invitado">
          <div className="flex flex-wrap gap-2">
            {[6, 12, 24, 36].map((option) => (
              <Pill
                key={option}
                active={photosPerGuest === option}
                onClick={() => onPhotosPerGuestChange(option)}
              >
                {option} fotos
              </Pill>
            ))}
          </div>
        </Field>
      ) : null}
      <ToggleRow
        label="Retos de fotos"
        hint="Retos divertidos para que nadie se quede sin subir fotos."
        checked={challengesOn}
        onCheckedChange={onChallengesChange}
      />
    </>
  );
}

export function AlbumExtrasStep({
  allowVideos,
  allowVoice,
  bestOfOn,
  allowDownload,
  onAllowVideosChange,
  onAllowVoiceChange,
  onBestOfChange,
  onAllowDownloadChange,
}: {
  allowVideos: boolean;
  allowVoice: boolean;
  bestOfOn: boolean;
  allowDownload: boolean;
  onAllowVideosChange: (value: boolean) => void;
  onAllowVoiceChange: (value: boolean) => void;
  onBestOfChange: (value: boolean) => void;
  onAllowDownloadChange: (value: boolean) => void;
}) {
  return (
    <>
      <ToggleRow
        label="Permitir videos cortos"
        checked={allowVideos}
        onCheckedChange={onAllowVideosChange}
      />
      <ToggleRow
        label="Permitir mensajes de voz"
        checked={allowVoice}
        onCheckedChange={onAllowVoiceChange}
      />
      <ToggleRow
        label="Lo mejor de la noche"
        checked={bestOfOn}
        onCheckedChange={onBestOfChange}
      />
      <ToggleRow
        label="Permitir descargas"
        checked={allowDownload}
        onCheckedChange={onAllowDownloadChange}
      />
    </>
  );
}
