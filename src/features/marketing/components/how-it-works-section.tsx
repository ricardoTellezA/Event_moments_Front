import { PageContainer } from "@/components/shared/page-container/page-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { howItWorksSteps } from "@/features/marketing/data/marketing.data";
import { HowItWorksStep } from "@/features/marketing/components/how-it-works-step";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <PageContainer>
        <ScrollReveal>
          <h2 className="max-w-xl text-heading-1">Asi de facil se ve un evento entero</h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 70}>
              <HowItWorksStep index={index + 1} {...step} />
            </ScrollReveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
