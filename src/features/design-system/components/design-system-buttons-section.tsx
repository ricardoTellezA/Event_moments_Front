import { Share2Icon, UploadIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge/status-badge";
import { DesignSection } from "@/features/design-system/components/design-section";

export function DesignSystemButtonsSection() {
  return (
    <DesignSection title="Botones y badges">
      <div className="flex flex-wrap gap-3">
        <Button>Crear mi album</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Eliminar</Button>
        <Button size="icon" aria-label="Compartir">
          <Share2Icon />
        </Button>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" variant="soft" aria-label="Subir fotos">
          <UploadIcon />
        </Button>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge>Activo</Badge>
        <Badge variant="secondary">Reveal pendiente</Badge>
        <Badge variant="outline">Abierto</Badge>
        <Badge variant="destructive">Critico</Badge>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <StatusBadge status="open" />
        <StatusBadge status="reveal-pending" />
        <StatusBadge status="revealed" />
        <StatusBadge status="closed" />
        <StatusBadge status="frozen" />
      </div>
    </DesignSection>
  );
}
