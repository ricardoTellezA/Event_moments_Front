import { PageContainer } from "@/components/shared/page-container/page-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header/section-header";
import { FeatureCard } from "@/features/marketing/components/feature-card";
import { featureCards } from "@/features/marketing/data/marketing.data";

export function FeaturesSection() {
  return (
    <section id="features" className="pb-16 md:pb-24">
      <PageContainer>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Funciones"
            title="Pensado para invitados, no para usuarios tecnicos"
            description="Cada parte de la experiencia reduce friccion: QR, subida desde telefono y recuerdos centralizados."
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 55}>
              <FeatureCard {...feature} />
            </ScrollReveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
