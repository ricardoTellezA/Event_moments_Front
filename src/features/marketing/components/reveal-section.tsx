import { LockIcon, SparklesIcon } from "lucide-react";

import { Countdown } from "@/components/shared/countdown/countdown";
import { PageContainer } from "@/components/shared/page-container/page-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { StatusBadge } from "@/components/shared/status-badge/status-badge";

export function RevealSection() {
  return (
    <section className="pb-16 md:pb-24">
      <PageContainer>
        <ScrollReveal className="grid gap-6 overflow-hidden rounded-[2.5rem] bg-soft-gradient p-6 md:p-12 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <StatusBadge status="reveal-pending" />
            <h2 className="mt-5 text-heading-1">
              Reveal Mode convierte la espera en sorpresa
            </h2>
            <p className="mt-4 max-w-xl text-body text-muted-foreground">
              Todos pueden subir recuerdos durante el evento, pero nadie ve la galeria
              hasta que termina la cuenta regresiva.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Todos suben", "Nadie ve", "Se revela"].map((item) => (
                <div key={item} className="rounded-2xl bg-card p-4 shadow-soft">
                  <SparklesIcon className="size-4 text-primary" />
                  <p className="mt-3 text-label">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-border bg-card p-5 shadow-lifted">
            <div className="grid place-items-center rounded-3xl bg-muted p-8 text-center">
              <LockIcon className="size-10 text-primary" />
              <p className="mt-4 text-heading-3">243 recuerdos guardados</p>
              <p className="mt-1 text-body-sm text-muted-foreground">Se revelan pronto</p>
            </div>
            <div className="mt-5">
              <Countdown label="Se revelan en" hours={3} minutes={14} seconds={28} />
            </div>
          </div>
        </ScrollReveal>
      </PageContainer>
    </section>
  );
}
