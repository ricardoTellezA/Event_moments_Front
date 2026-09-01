"use client";

import {
  BellIcon,
  CalendarIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ShareEventDialog } from "@/components/shared/share-event-dialog/share-event-dialog";
import { DesignSection } from "@/features/design-system/components/design-section";

export function DesignSystemOverlaysSection() {
  return (
    <DesignSection title="Overlays y feedback">
      <div className="flex flex-wrap gap-3">
        <ShareEventDialog eventName="Boda Ana & Luis" url="eventmoments.com/e/abc123" />
        <DeleteDialogDemo />
        <UpgradeDialogDemo />
        <SheetDemo />
        <ActionsMenuDemo />
        <PopoverDemo />
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
  );
}

function DeleteDialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Delete dialog</DialogTrigger>
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
  );
}

function UpgradeDialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Upgrade dialog</DialogTrigger>
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
  );
}

function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Abrir sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configuracion rapida</SheetTitle>
          <SheetDescription>Panel lateral para acciones secundarias.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button className="mt-6">Guardar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function ActionsMenuDemo() {
  return (
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
  );
}

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Popover</PopoverTrigger>
      <PopoverContent>
        <p className="text-label">Album privado</p>
        <p className="mt-1 text-body-sm text-muted-foreground">
          Solo invitados con link pueden subir recuerdos.
        </p>
      </PopoverContent>
    </Popover>
  );
}
