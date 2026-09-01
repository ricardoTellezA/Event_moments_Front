"use client";

import { ArrowRightIcon } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";
import { CreateAlbumStepper } from "@/features/albums/components/create-album-fields";
import {
  AlbumExtrasStep,
  AlbumModeStep,
  BasicAlbumStep,
} from "@/features/albums/components/create-album-steps";
import { useCreateAlbumController } from "@/features/albums/hooks/use-create-album-controller";

const steps = ["Lo basico", "Modo del evento", "Extras"];

export function CreateAlbumScreen() {
  const form = useCreateAlbumController();

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-14">
      <ScrollReveal>
        <h1 className="font-heading text-4xl font-semibold">Crea tu album</h1>
        <p className="mt-2 text-muted-foreground">
          Tres pasos rapidos. Puedes cambiar todo despues desde el panel.
        </p>
      </ScrollReveal>

      <ScrollReveal as="section" className="mt-8">
        <CreateAlbumStepper steps={steps} currentStep={form.step} />
      </ScrollReveal>

      <ScrollReveal
        as="section"
        className="wizard-card mt-8 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft"
        delay={90}
      >
        <div
          key={form.step}
          className={
            form.direction === "forward"
              ? "min-h-[318px] space-y-6 animate-wizard-forward"
              : "min-h-[318px] space-y-6 animate-wizard-back"
          }
        >
          {form.step === 0 ? (
            <BasicAlbumStep
              name={form.name}
              date={form.date}
              privacy={form.privacy}
              pin={form.pin}
              duration={form.duration}
              onNameChange={form.setName}
              onDateChange={form.setDate}
              onPrivacyChange={form.setPrivacy}
              onPinChange={form.setPin}
              onDurationChange={form.setDuration}
            />
          ) : null}
          {form.step === 1 ? (
            <AlbumModeStep
              revealMode={form.revealMode}
              revealAt={form.revealAt}
              disposableOn={form.disposableOn}
              photosPerGuest={form.photosPerGuest}
              challengesOn={form.challengesOn}
              onRevealModeChange={form.setRevealMode}
              onRevealAtChange={form.setRevealAt}
              onDisposableChange={form.setDisposableOn}
              onPhotosPerGuestChange={form.setPhotosPerGuest}
              onChallengesChange={form.setChallengesOn}
            />
          ) : null}
          {form.step === 2 ? (
            <AlbumExtrasStep
              allowVideos={form.allowVideos}
              allowVoice={form.allowVoice}
              bestOfOn={form.bestOfOn}
              allowDownload={form.allowDownload}
              onAllowVideosChange={form.setAllowVideos}
              onAllowVoiceChange={form.setAllowVoice}
              onBestOfChange={form.setBestOfOn}
              onAllowDownloadChange={form.setAllowDownload}
            />
          ) : null}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            disabled={form.step === 0}
            onClick={() => form.goToStep(form.step - 1)}
          >
            Atras
          </Button>
          <Button
            className="bg-afterglow shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lifted"
            onClick={form.handleNext}
            disabled={form.isCreating}
          >
            {form.step < 2
              ? "Siguiente"
              : form.isCreating
                ? "Creando..."
                : "Crear album"}
            {form.step < 2 ? <ArrowRightIcon /> : null}
          </Button>
        </div>
      </ScrollReveal>
    </main>
  );
}
