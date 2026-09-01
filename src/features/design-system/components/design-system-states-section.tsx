import { CameraIcon, CheckIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state/empty-state";
import { DesignSection } from "@/features/design-system/components/design-section";

export function DesignSystemStatesSection() {
  return (
    <DesignSection title="Estados">
      <div className="grid gap-4 lg:grid-cols-2">
        <Alert>
          <CameraIcon />
          <AlertTitle>Upload listo para maquetar</AlertTitle>
          <AlertDescription>
            Estado informativo usando tokens semanticos del sistema.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>Accion destructiva</AlertTitle>
          <AlertDescription>
            El rojo queda reservado para errores criticos y eliminaciones.
          </AlertDescription>
        </Alert>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
        <EmptyState
          icon={CheckIcon}
          title="Empty state"
          description="Base visual para pantallas sin contenido."
          action={<Button variant="soft">Crear primer evento</Button>}
        />
      </div>
    </DesignSection>
  );
}
