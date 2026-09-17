import { CameraIcon, Share2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/shared/countdown/countdown";
import { CopyButton } from "@/components/shared/copy-button/copy-button";
import { MobileBottomBar } from "@/components/shared/mobile-bottom-bar/mobile-bottom-bar";
import { QrCard } from "@/components/shared/qr-card/qr-card";
import { SectionHeader } from "@/components/shared/section-header/section-header";
import { DesignSection } from "@/features/design-system/components/design-section";

export function DesignSystemSharedSection() {
  return (
    <DesignSection
      title="Shared components"
      description="Patrones detectados en la referencia y listos para reutilizar antes de construir pantallas."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
          <SectionHeader
            eyebrow="Seccion"
            title="Header reutilizable"
            description="Controla titulo, descripcion, alineacion y accion."
            action={<Button size="sm">Accion</Button>}
          />
        </div>
        <QrCard url="keeps.tellez.website/e/abc123" />
        <div className="rounded-3xl border border-border bg-soft-gradient p-5">
          <Countdown label="Se revelan en" hours={3} minutes={14} seconds={28} />
          <div className="mt-4">
            <CopyButton value="keeps.tellez.website/e/abc123" />
          </div>
        </div>
      </div>
      <MobileBottomBar>
        <Button className="flex-1">
          <CameraIcon />
          Subir fotos
        </Button>
        <Button size="icon" variant="outline" aria-label="Compartir">
          <Share2Icon />
        </Button>
      </MobileBottomBar>
    </DesignSection>
  );
}
