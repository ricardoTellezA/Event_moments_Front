import { DesignSection } from "@/features/design-system/components/design-section";

export function DesignSystemTypographySection() {
  return (
    <DesignSection title="Tipografia">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-display-xl">Display XL</p>
          <p className="text-display-lg">Display LG</p>
          <p className="text-heading-1">Heading 1</p>
          <p className="text-heading-2">Heading 2</p>
          <p className="text-heading-3">Heading 3</p>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p className="text-body-lg">Body LG para bloques de contenido.</p>
          <p className="text-body">Body para lectura general y formularios.</p>
          <p className="text-body-sm">Body SM para metadatos y ayudas.</p>
          <p className="text-label text-foreground">Label consistente</p>
          <p className="text-caption">Caption para informacion secundaria</p>
        </div>
      </div>
    </DesignSection>
  );
}
