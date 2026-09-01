"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { createEvent } from "@/features/albums/api/albums.api";

const durationOptions = [
  { label: "24 horas", value: "24" },
  { label: "3 dias", value: "72" },
  { label: "7 dias", value: "168" },
  { label: "30 dias", value: "720" },
];

const steps = ["Lo basico", "Modo del evento", "Extras"];

export function CreateAlbumScreen() {
  const router = useRouter();
  const { getToken } = useAuth();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [privacy, setPrivacy] = useState("public");
  const [pin, setPin] = useState("");
  const [duration, setDuration] = useState("72");
  const [revealMode, setRevealMode] = useState(false);
  const [revealAt, setRevealAt] = useState("");
  const [disposableOn, setDisposableOn] = useState(false);
  const [photosPerGuest, setPhotosPerGuest] = useState(12);
  const [challengesOn, setChallengesOn] = useState(true);
  const [allowVideos, setAllowVideos] = useState(true);
  const [allowVoice, setAllowVoice] = useState(false);
  const [bestOfOn, setBestOfOn] = useState(true);
  const [allowDownload, setAllowDownload] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const goToStep = (nextStep: number) => {
    setDirection(nextStep > step ? "forward" : "back");
    setStep(Math.max(0, Math.min(2, nextStep)));
  };

  const handleNext = async () => {
    if (isCreating) {
      return;
    }

    if (step === 0 && !name.trim()) {
      toast.error("Ponle un nombre a tu evento");
      return;
    }

    if (step < 2) {
      goToStep(step + 1);
      return;
    }

    try {
      setIsCreating(true);
      const token = await getToken();
      const album = await createEvent(
        {
          name,
          eventDate: date ? new Date(date).toISOString() : undefined,
          durationHours: Number(duration),
          privacy: privacy === "pin" ? "pin" : "public",
          pin,
          revealMode,
          revealAt:
            revealMode && revealAt ? new Date(revealAt).toISOString() : undefined,
          allowDownloads: allowDownload,
          maxPhotos: disposableOn ? photosPerGuest : undefined,
        },
        token,
      );

      toast.success("Album creado");
      router.push(`/a/${album.id}`);
    } catch {
      toast.error("No pudimos crear el album");
      setIsCreating(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-14">
      <ScrollReveal>
        <h1 className="font-heading text-4xl font-semibold">Crea tu album</h1>
        <p className="mt-2 text-muted-foreground">
          Tres pasos rapidos. Puedes cambiar todo despues desde el panel.
        </p>
      </ScrollReveal>

      <ScrollReveal as="section" className="mt-8">
        <ol className="flex items-center gap-3 text-sm">
          {steps.map((item, index) => (
            <li key={item} className="flex flex-1 items-center gap-2">
              <span
                className={
                  index <= step
                    ? "grid size-7 shrink-0 place-items-center rounded-full bg-afterglow text-xs font-semibold text-primary-foreground shadow-soft transition-all duration-300"
                    : "grid size-7 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold text-muted-foreground transition-all duration-300"
                }
              >
                {index < step ? (
                  <CheckIcon className="size-3.5 animate-step-pop" />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={
                  index === step
                    ? "font-semibold transition-colors duration-300"
                    : "text-muted-foreground transition-colors duration-300"
                }
              >
                {item}
              </span>
            </li>
          ))}
        </ol>
      </ScrollReveal>

      <ScrollReveal
        as="section"
        className="wizard-card mt-8 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft"
        delay={90}
      >
        <div
          key={step}
          className={
            direction === "forward"
              ? "min-h-[318px] space-y-6 animate-wizard-forward"
              : "min-h-[318px] space-y-6 animate-wizard-back"
          }
        >
          {step === 0 ? (
            <>
              <Field label="Nombre del evento">
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Boda Ana & Luis"
                />
              </Field>
              <Field label="Fecha del evento">
                <Input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </Field>
              <Field label="Cuanto tiempo estara abierto?">
                <div className="flex flex-wrap gap-2">
                  {durationOptions.map((option) => (
                    <Pill
                      key={option.value}
                      active={duration === option.value}
                      onClick={() => setDuration(option.value)}
                    >
                      {option.label}
                    </Pill>
                  ))}
                </div>
              </Field>
              <Field label="Privacidad">
                <div className="flex flex-wrap gap-2">
                  <Pill
                    active={privacy === "public"}
                    onClick={() => setPrivacy("public")}
                  >
                    Cualquiera con el link
                  </Pill>
                  <Pill active={privacy === "pin"} onClick={() => setPrivacy("pin")}>
                    Con PIN
                  </Pill>
                </div>
                {privacy === "pin" ? (
                  <Input
                    className="mt-3 animate-wizard-forward"
                    inputMode="numeric"
                    value={pin}
                    onChange={(event) =>
                      setPin(event.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="PIN de 4 digitos"
                  />
                ) : null}
              </Field>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <ToggleRow
                label="Modo revelado"
                hint="Nadie ve las fotos hasta la hora del revelado."
                checked={revealMode}
                onCheckedChange={setRevealMode}
              />
              {revealMode ? (
                <Field label="Fecha y hora del revelado">
                  <Input
                    type="datetime-local"
                    value={revealAt}
                    onChange={(event) => setRevealAt(event.target.value)}
                  />
                </Field>
              ) : null}
              <ToggleRow
                label="Modo desechable"
                hint="Cada invitado tiene un numero limitado de fotos."
                checked={disposableOn}
                onCheckedChange={setDisposableOn}
              />
              {disposableOn ? (
                <Field label="Fotos por invitado">
                  <div className="flex flex-wrap gap-2">
                    {[6, 12, 24, 36].map((option) => (
                      <Pill
                        key={option}
                        active={photosPerGuest === option}
                        onClick={() => setPhotosPerGuest(option)}
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
                onCheckedChange={setChallengesOn}
              />
            </>
          ) : null}

          {step === 2 ? (
            <>
              <ToggleRow
                label="Permitir videos cortos"
                checked={allowVideos}
                onCheckedChange={setAllowVideos}
              />
              <ToggleRow
                label="Permitir mensajes de voz"
                checked={allowVoice}
                onCheckedChange={setAllowVoice}
              />
              <ToggleRow
                label="Lo mejor de la noche"
                checked={bestOfOn}
                onCheckedChange={setBestOfOn}
              />
              <ToggleRow
                label="Permitir descargas"
                checked={allowDownload}
                onCheckedChange={setAllowDownload}
              />
            </>
          ) : null}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            disabled={step === 0}
            onClick={() => goToStep(step - 1)}
          >
            Atras
          </Button>
          <Button
            className="bg-afterglow shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lifted"
            onClick={handleNext}
            disabled={isCreating}
          >
            {step < 2 ? "Siguiente" : isCreating ? "Creando..." : "Crear album"}
            {step < 2 ? <ArrowRightIcon /> : null}
          </Button>
        </div>
      </ScrollReveal>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">{label}</label>
      {children}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full border border-transparent bg-afterglow px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300"
          : "rounded-full border border-border px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted"
      }
    >
      {children}
    </button>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onCheckedChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-border/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card">
      <div>
        <p className="font-semibold">{label}</p>
        {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
