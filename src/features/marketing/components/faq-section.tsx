import { PageContainer } from "@/components/shared/page-container/page-container";
import { faqItems } from "@/features/marketing/data/marketing.data";

export function FaqSection() {
  return (
    <section className="pb-16 md:pb-24">
      <PageContainer size="md">
        <h2 className="text-center text-heading-1">Preguntas frecuentes</h2>
        <div className="mt-8 grid gap-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-3xl border border-border bg-card p-5 shadow-soft"
            >
              <summary className="cursor-pointer list-none text-label marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-soft text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-body-sm text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
