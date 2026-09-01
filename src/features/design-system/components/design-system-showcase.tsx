"use client";

import { Toaster } from "@/components/ui/sonner";
import { PageContainer } from "@/components/shared/page-container/page-container";
import { DesignSystemButtonsSection } from "@/features/design-system/components/design-system-buttons-section";
import { DesignSystemCardsSection } from "@/features/design-system/components/design-system-cards-section";
import { DesignSystemFormsSection } from "@/features/design-system/components/design-system-forms-section";
import { DesignSystemHeader } from "@/features/design-system/components/design-system-header";
import { DesignSystemOverlaysSection } from "@/features/design-system/components/design-system-overlays-section";
import { DesignSystemSharedSection } from "@/features/design-system/components/design-system-shared-section";
import { DesignSystemStatesSection } from "@/features/design-system/components/design-system-states-section";
import { DesignSystemTokenSection } from "@/features/design-system/components/design-system-token-section";
import { DesignSystemTypographySection } from "@/features/design-system/components/design-system-typography-section";

export function DesignSystemShowcase() {
  return (
    <main className="min-h-dvh bg-background px-4 py-6 sm:px-6 lg:px-8">
      <Toaster richColors position="bottom-right" />
      <PageContainer className="flex flex-col gap-6 px-0">
        <DesignSystemHeader />
        <DesignSystemTokenSection />
        <DesignSystemTypographySection />
        <DesignSystemButtonsSection />
        <DesignSystemFormsSection />
        <DesignSystemCardsSection />
        <DesignSystemOverlaysSection />
        <DesignSystemStatesSection />
        <DesignSystemSharedSection />
      </PageContainer>
    </main>
  );
}
