import { PageContainer } from "@/components/shared/page-container/page-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header/section-header";
import { PricingCard } from "@/features/marketing/components/pricing-card";
import { pricingPlans } from "@/features/marketing/data/marketing.data";

export function PricingSection() {
  return (
    <section id="pricing" className="pb-16 md:pb-24">
      <PageContainer size="md">
        <ScrollReveal>
          <SectionHeader
            align="center"
            eyebrow="Precios"
            title="Paga por evento, no por mes"
            description="Empieza gratis y mejora el album cuando tu evento necesite mas duracion, privacidad o capacidad."
          />
        </ScrollReveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={index * 70}>
              <PricingCard {...plan} />
            </ScrollReveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
