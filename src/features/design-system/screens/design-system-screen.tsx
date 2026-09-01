"use client";

import {
  BellIcon,
  CalendarIcon,
  CameraIcon,
  CheckIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  Share2Icon,
  SparklesIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AppLogo } from "@/components/shared/app-logo/app-logo";
import { Countdown } from "@/components/shared/countdown/countdown";
import { CopyButton } from "@/components/shared/copy-button/copy-button";
import { EmptyState } from "@/components/shared/empty-state/empty-state";
import { MobileBottomBar } from "@/components/shared/mobile-bottom-bar/mobile-bottom-bar";
import { PageContainer } from "@/components/shared/page-container/page-container";
import { QrCard } from "@/components/shared/qr-card/qr-card";
import { SectionHeader } from "@/components/shared/section-header/section-header";
import { ShareEventDialog } from "@/components/shared/share-event-dialog/share-event-dialog";
import { StatusBadge } from "@/components/shared/status-badge/status-badge";
import { DesignSection } from "@/features/design-system/components/design-section";
import { TokenSwatch } from "@/features/design-system/components/token-swatch";

const tokenSwatches = [
  { name: "Background", value: "#FAFAF8", className: "bg-background" },
  { name: "Foreground", value: "#1A1A1A", className: "bg-foreground" },
  { name: "Primary", value: "#7C6CF2", className: "bg-primary" },
  { name: "Primary soft", value: "#E9E6FD", className: "bg-primary-soft" },
  { name: "Blush", value: "#F2A1A1", className: "bg-blush" },
  { name: "Warm", value: "#F2C98A", className: "bg-warm" },
  { name: "Muted", value: "#F4F4F0", className: "bg-muted" },
  { name: "Afterglow", value: "Official gradient", className: "bg-afterglow" },
];

export function DesignSystemScreen() {
  return (
    <main className="min-h-dvh bg-background px-4 py-6 sm:px-6 lg:px-8">
      <Toaster richColors position="bottom-right" />
      <PageContainer className="flex flex-col gap-6 px-0">
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

        <DesignSection title="Tokens">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tokenSwatches.map((token) => (
              <TokenSwatch key={token.name} {...token} />
            ))}
          </div>
        </DesignSection>

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

        <DesignSection title="Forms">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-label">Nombre del evento</span>
              <Input placeholder="Boda Ana & Luis" />
            </label>
            <label className="grid gap-2">
              <span className="text-label">Estado focus</span>
              <Input placeholder="Focus visible al navegar con teclado" />
            </label>
            <label className="grid gap-2">
              <span className="text-label">Disabled</span>
              <Input placeholder="No editable" disabled />
            </label>
            <label className="grid gap-2">
              <span className="text-label text-destructive">Error</span>
              <Input aria-invalid placeholder="Campo requerido" />
              <span className="text-caption text-destructive">
                Este campo es obligatorio.
              </span>
            </label>
            <label className="grid gap-2">
              <span className="text-label">Tipo de evento</span>
              <Select defaultValue="wedding">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Boda</SelectItem>
                  <SelectItem value="birthday">Cumpleanos</SelectItem>
                  <SelectItem value="trip">Viaje</SelectItem>
                </SelectContent>
              </Select>
            </label>
            <label className="grid gap-2 lg:col-span-2">
              <span className="text-label">Mensaje para invitados</span>
              <Textarea placeholder="Comparte tus mejores recuerdos del evento." />
            </label>
            <div className="flex flex-wrap items-center gap-5">
              <label className="flex items-center gap-2 text-body-sm">
                <Checkbox defaultChecked /> Album publico
              </label>
              <label className="flex items-center gap-2 text-body-sm">
                <Switch defaultChecked /> Reveal automatico
              </label>
            </div>
            <RadioGroup defaultValue="24h" className="grid gap-3 sm:grid-cols-3">
              {["12h", "24h", "48h"].map((value) => (
                <label
                  key={value}
                  className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3 text-body-sm"
                >
                  <RadioGroupItem value={value} />
                  {value}
                </label>
              ))}
            </RadioGroup>
          </div>
        </DesignSection>

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

        <DesignSection title="Overlays y feedback">
          <div className="flex flex-wrap gap-3">
            <ShareEventDialog
              eventName="Boda Ana & Luis"
              url="eventmoments.com/e/abc123"
            />

            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Delete dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Eliminar album</DialogTitle>
                  <DialogDescription>
                    Esta accion es destructiva y solo debe usarse para eliminaciones.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancelar</Button>
                  <Button variant="destructive">
                    <Trash2Icon />
                    Eliminar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Upgrade dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Mejorar album</DialogTitle>
                  <DialogDescription>
                    Un dialog premium para desbloquear duracion, PIN y reveal.
                  </DialogDescription>
                </DialogHeader>
                <div className="rounded-3xl bg-soft-gradient p-5">
                  <p className="text-heading-3">Event Pass</p>
                  <p className="mt-1 text-body-sm text-muted-foreground">
                    30 dias, 1,000 fotos y descarga completa.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline">Despues</Button>
                  <Button>Mejorar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                Abrir sheet
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Configuracion rapida</SheetTitle>
                  <SheetDescription>
                    Panel lateral para acciones secundarias.
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                  <Button className="mt-6">Guardar</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                Acciones <MoreHorizontalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Evento</DropdownMenuLabel>
                <DropdownMenuItem>
                  <DownloadIcon /> Descargar QR
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CalendarIcon /> Programar reveal
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Eliminar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                Popover
              </PopoverTrigger>
              <PopoverContent>
                <p className="text-label">Album privado</p>
                <p className="mt-1 text-body-sm text-muted-foreground">
                  Solo invitados con link pueden subir recuerdos.
                </p>
              </PopoverContent>
            </Popover>

            <Tooltip>
              <TooltipTrigger render={<Button size="icon" variant="outline" />}>
                <BellIcon />
              </TooltipTrigger>
              <TooltipContent>Notificaciones del evento</TooltipContent>
            </Tooltip>

            <Button variant="soft" onClick={() => toast.success("Invitacion copiada")}>
              Toast
            </Button>
          </div>
        </DesignSection>

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
            <QrCard url="eventmoments.com/e/abc123" />
            <div className="rounded-3xl border border-border bg-soft-gradient p-5">
              <Countdown label="Se revelan en" hours={3} minutes={14} seconds={28} />
              <div className="mt-4">
                <CopyButton value="eventmoments.com/e/abc123" />
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
      </PageContainer>
    </main>
  );
}
