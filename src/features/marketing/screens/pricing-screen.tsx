import { FaqSection } from "@/features/marketing/components/faq-section";
import { FinalCtaSection } from "@/features/marketing/components/final-cta-section";
import { MarketingFooter } from "@/features/marketing/components/marketing-footer";
import { MarketingHeader } from "@/features/marketing/components/marketing-header";
import { PricingSection } from "@/features/marketing/components/pricing-section";

export function PricingScreen() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <main className="pt-14">
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
