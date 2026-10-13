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
    <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-5 sm:py-14">
      <ScrollReveal>
        <h1 className="font-heading text-[clamp(2.25rem,11vw,3rem)] font-semibold leading-none">
          Crea tu album
        </h1>
        <p className="mt-2 text-muted-foreground">
          Tres pasos rapidos. Puedes cambiar todo despues desde el panel.
        </p>
      </ScrollReveal>

      <ScrollReveal as="section" className="mt-8">
        <CreateAlbumStepper steps={steps} currentStep={form.step} />
      </ScrollReveal>

      <ScrollReveal
        as="section"
        className="wizard-card mt-6 overflow-hidden rounded-[1.6rem] border border-border bg-card p-4 shadow-soft sm:mt-8 sm:rounded-3xl sm:p-6"
        delay={90}
      >
        <div
          key={form.step}
          className={
            form.direction === "forward"
              ? "min-h-[318px] space-y-5 animate-wizard-forward sm:space-y-6"
              : "min-h-[318px] space-y-5 animate-wizard-back sm:space-y-6"
          }
        >
          {form.step === 0 ? (
            <BasicAlbumStep
              name={form.name}
              date={form.date}
              privacy={form.privacy}
              pin={form.pin}
              duration={form.duration}
              coverPreviewUrl={form.coverPreviewUrl}
              onNameChange={form.setName}
              onDateChange={form.setDate}
              onPrivacyChange={form.setPrivacy}
              onPinChange={form.setPin}
              onDurationChange={form.setDuration}
              onCoverChange={form.setCover}
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

        <div className="grid grid-cols-2 items-center gap-3 pt-2 sm:flex sm:justify-between">
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
