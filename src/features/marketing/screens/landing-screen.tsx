import { EventTypesSection } from "@/features/marketing/components/event-types-section";
import { FinalCtaSection } from "@/features/marketing/components/final-cta-section";
import { GalleryShowcaseSection } from "@/features/marketing/components/gallery-showcase-section";
import { HeroSection } from "@/features/marketing/components/hero-section";
import { HowItWorksSection } from "@/features/marketing/components/how-it-works-section";
import { MarketingFooter } from "@/features/marketing/components/marketing-footer";
import { MarketingHeader } from "@/features/marketing/components/marketing-header";

export function LandingScreen() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <GalleryShowcaseSection />
        <EventTypesSection />
        <FinalCtaSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
