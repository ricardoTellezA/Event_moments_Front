import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { AppLogo } from "@/components/shared/app-logo/app-logo";
import { PageContainer } from "@/components/shared/page-container/page-container";
import { Button } from "@/components/ui/button";

type AuthPageShellProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export function AuthPageShell({
  children,
  title,
  description,
}: AuthPageShellProps) {
  return (
    <main className="min-h-screen bg-soft-gradient">
      <PageContainer className="grid min-h-screen content-start px-5 py-6">
        <header className="flex items-center justify-between">
          <AppLogo />
          <Button variant="ghost" nativeButton={false} render={<Link href="/" />}>
            <ArrowLeftIcon data-icon="inline-start" />
            Volver
          </Button>
        </header>

        <section className="mx-auto grid w-full max-w-[440px] gap-7 py-14 sm:py-20">
          <div className="grid gap-3 text-center">
            <h1 className="font-heading text-4xl leading-tight font-semibold">
              {title}
            </h1>
            <p className="text-body text-muted-foreground">{description}</p>
          </div>
          <div className="grid justify-items-center">{children}</div>
        </section>
      </PageContainer>
    </main>
  );
}
