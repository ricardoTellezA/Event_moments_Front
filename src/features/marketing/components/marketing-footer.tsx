import { AppLogo } from "@/components/shared/app-logo/app-logo";
import { PageContainer } from "@/components/shared/page-container/page-container";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <PageContainer className="flex flex-col items-center gap-3 text-body-sm text-muted-foreground sm:flex-row sm:justify-between">
        <AppLogo />
        <p>Hecho para recordar. Keeps 2026</p>
      </PageContainer>
    </footer>
  );
}
