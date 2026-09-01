import { FeaturesSection } from "@/features/marketing/components/features-section";
import { FinalCtaSection } from "@/features/marketing/components/final-cta-section";
import { HowItWorksSection } from "@/features/marketing/components/how-it-works-section";
import { MarketingFooter } from "@/features/marketing/components/marketing-footer";
import { MarketingHeader } from "@/features/marketing/components/marketing-header";
import { RevealSection } from "@/features/marketing/components/reveal-section";

export function HowItWorksScreen() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <main>
        <HowItWorksSection />
        <FeaturesSection />
        <RevealSection />
        <FinalCtaSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
