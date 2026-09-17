"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeftIcon, CameraIcon, PrinterIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state/empty-state";
import { Button } from "@/components/ui/button";
import { useAdminAlbumController } from "@/features/albums/hooks/use-admin-album-controller";

export function PrintableQrScreen({ id }: { id: string }) {
  const { album, shareUrl } = useAdminAlbumController(id);

  if (album === undefined) {
    return <main className="min-h-[70vh]" />;
  }

  if (album === null) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <EmptyState
          title="Album no encontrado"
          description="No existe un album para generar QR con este link."
          action={
            <Button nativeButton={false} render={<Link href="/mis-albumes" />}>
              Ver mis albumes
            </Button>
          }
        />
      </main>
    );
  }

  return (
    <main className="qr-print-root min-h-screen bg-soft-gradient px-5 py-6 print:bg-white print:p-0">
      <div className="mx-auto max-w-3xl print:max-w-none">
        <div className="mb-6 flex items-center justify-between gap-3 print:hidden">
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href={`/a/${album.id}/administrar`} />}
          >
            <ArrowLeftIcon />
            Volver
          </Button>
          <Button className="bg-afterglow" onClick={() => window.print()}>
            <PrinterIcon />
            Imprimir
          </Button>
        </div>

        <section className="qr-print-sheet overflow-hidden rounded-[2rem] border border-border bg-card shadow-lifted">
          <div className="relative min-h-48 overflow-hidden bg-foreground px-8 py-7 text-background print:min-h-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={album.cover}
              alt=""
              className="absolute inset-0 size-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 via-foreground/55 to-foreground/10" />
            <div className="relative flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-afterglow text-primary-foreground shadow-soft">
                  <CameraIcon className="size-5" />
                </span>
                <span className="text-label text-background">Keeps</span>
              </div>
              <span className="rounded-full bg-background/92 px-4 py-2 text-xs font-semibold text-foreground">
                Sin cuenta para invitados
              </span>
            </div>
            <h1 className="relative mt-12 max-w-xl font-heading text-5xl font-semibold leading-tight print:mt-8 print:text-4xl">
              Sube tus fotos a {album.name}
            </h1>
            <p className="relative mt-4 max-w-md text-base leading-7 text-background/85 print:text-sm print:leading-6">
              Escanea el QR desde tu celular y comparte tus mejores recuerdos del
              evento.
            </p>
          </div>

          <div className="grid gap-7 p-8 text-center print:grid-cols-[1fr_1.1fr] print:items-center print:gap-6 print:p-6 print:text-left">
            <div className="mx-auto w-full max-w-sm rounded-[1.75rem] border border-border bg-white p-4 shadow-soft print:max-w-none print:p-3 print:shadow-none">
              <QRCodeSVG
                value={shareUrl}
                title={`QR para subir fotos a ${album.name}`}
                size={720}
                level="M"
                marginSize={3}
                className="aspect-square w-full"
              />
            </div>
            <div>
              <p className="text-label text-primary">Como participar</p>
              <h2 className="mt-3 font-heading text-4xl font-semibold leading-tight print:text-3xl">
                Abre tu camara, apunta al QR y sube tus fotos.
              </h2>
              <p className="mt-4 text-body-sm text-muted-foreground">
                No necesitas instalar nada. Entras al album, escribes tu nombre y
                seleccionas las fotos desde tu galeria.
              </p>
              <p className="mt-6 break-all rounded-2xl bg-muted px-4 py-3 text-sm font-medium text-muted-foreground print:text-xs">
                {shareUrl}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
