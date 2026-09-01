import { SparklesIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { AppLogo } from "@/components/shared/app-logo/app-logo";

export function DesignSystemHeader() {
  return (
    <header className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <AppLogo />
        <Badge variant="secondary">Design System</Badge>
      </div>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          <h1 className="text-display-lg">Event Moments</h1>
          <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">
            Sistema visual base para revisar tokens, primitives, estados y
            comportamiento responsive antes de construir pantallas finales.
          </p>
        </div>
        <div className="rounded-3xl bg-afterglow p-5 text-primary-foreground shadow-floating">
          <SparklesIcon className="size-6" />
          <p className="mt-8 text-heading-3">Afterglow</p>
          <p className="mt-2 text-body-sm opacity-90">Gradiente oficial.</p>
        </div>
      </div>
    </header>
  );
}
