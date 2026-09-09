"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

import { PageContainer } from "@/components/shared/page-container/page-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  const { isLoaded, isSignedIn } = useUser();
  const createHref =
    isLoaded && isSignedIn ? "/crear" : "/sign-in?redirect_url=%2Fcrear";

  return (
    <section className="pb-20">
      <PageContainer>
        <ScrollReveal className="rounded-[2.5rem] bg-afterglow px-6 py-14 text-center shadow-lifted md:py-20">
          <h2 className="mx-auto max-w-2xl text-heading-1 text-primary-foreground">
            Tu proximo evento merece un album
          </h2>
          <p className="mx-auto mt-4 max-w-md text-body text-primary-foreground/85">
            Crea el album hoy, comparte el QR el dia del evento.
          </p>
          <Button
            size="lg"
            className="mt-8 bg-card text-foreground hover:bg-card/90"
            nativeButton={false}
            render={<Link href={createHref} />}
          >
            Crear mi album
          </Button>
        </ScrollReveal>
      </PageContainer>
    </section>
  );
}
