import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

import { PageContainer } from "@/components/shared/page-container/page-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";
import { HeroEventPreview } from "@/features/marketing/components/hero-event-preview";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-soft-gradient" />
      <PageContainer className="relative grid gap-12 py-14 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm shadow-soft">
            <SparklesIcon className="size-4 text-primary" />
            Albumes colaborativos para eventos
          </span>
          <h1 className="mt-6 text-display-xl">
            Todas las fotos de tu evento.{" "}
            <span className="text-afterglow">En un solo lugar.</span>
          </h1>
          <p className="mt-6 max-w-lg text-body-lg text-muted-foreground">
            Crea un album, comparte el QR y deja que todos suban sus mejores momentos. Sin
            instalar nada.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-afterglow shadow-lifted"
              nativeButton={false}
              render={<Link href="/crear" />}
            >
              Crear mi album
              <ArrowRightIcon />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={<Link href="/como-funciona" />}
            >
              Ver como funciona
            </Button>
          </div>
          <p className="mt-5 text-body-sm text-muted-foreground">
            Gratis para tu primer album · Sin registro para invitados
          </p>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <HeroEventPreview />
        </ScrollReveal>
      </PageContainer>
    </section>
  );
}
