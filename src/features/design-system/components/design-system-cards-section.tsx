import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DesignSection } from "@/features/design-system/components/design-section";

export function DesignSystemCardsSection() {
  return (
    <DesignSection title="Cards, tabs y progreso">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Boda Ana & Luis</CardTitle>
            <CardDescription>243 recuerdos guardados</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={62}>
              <ProgressLabel>Retos completados</ProgressLabel>
              <ProgressValue>{() => "5 / 8"}</ProgressValue>
            </Progress>
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-caption text-muted-foreground">3h restantes</span>
            <Button size="sm" variant="soft">
              Ver evento
            </Button>
          </CardFooter>
        </Card>
        <Card className="border-primary bg-primary-soft shadow-soft">
          <CardHeader>
            <CardTitle>Card seleccionada</CardTitle>
            <CardDescription>Patron para selected cards.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="bg-card">
              Revisar
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Invitados</CardTitle>
            <CardDescription>Participantes recientes</CardDescription>
          </CardHeader>
          <CardContent className="flex -space-x-2">
            {["AM", "LS", "PR"].map((name) => (
              <Avatar key={name} className="border-2 border-card">
                <AvatarImage alt="" src="" />
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>
            ))}
          </CardContent>
        </Card>
        <Card className="transition-transform hover:-translate-y-1 hover:shadow-floating">
          <CardHeader>
            <CardTitle>Card interactiva</CardTitle>
            <CardDescription>Hover suave, sin sombra pesada.</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <Tabs defaultValue="gallery" className="mt-4">
        <TabsList>
          <TabsTrigger value="gallery">Galeria</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="gallery" className="rounded-2xl bg-muted p-4">
          Vista de galeria preparada.
        </TabsContent>
        <TabsContent value="timeline" className="rounded-2xl bg-muted p-4">
          Vista de timeline preparada.
        </TabsContent>
      </Tabs>
    </DesignSection>
  );
}
