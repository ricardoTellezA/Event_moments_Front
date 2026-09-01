import { PageContainer } from "@/components/shared/page-container/page-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { eventTypes } from "@/features/marketing/data/marketing.data";

export function EventTypesSection() {
  return (
    <section className="pb-16 text-center md:pb-24">
      <PageContainer>
        <ScrollReveal>
          <h2 className="text-heading-1">Perfecto para</h2>
        </ScrollReveal>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {eventTypes.map((type, index) => (
            <ScrollReveal key={type} delay={index * 35}>
              <span className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-body-sm shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card">
                {type}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
