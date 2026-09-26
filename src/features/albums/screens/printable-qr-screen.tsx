"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeftIcon, PrinterIcon } from "lucide-react";

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

  const eventDate = new Date(album.date).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="qr-print-root min-h-screen bg-[#eee8dd] px-5 py-6 print:bg-white print:p-0">
      <div className="mx-auto max-w-xl print:max-w-none">
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

        <section className="qr-print-sheet relative overflow-hidden rounded-[1.4rem] border border-[#d8cec0] bg-[#fbf8f0] px-8 py-10 text-center text-[#1f1b18] shadow-lifted print:rounded-none print:border-0 print:shadow-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(255,255,255,0.95),transparent_28%),linear-gradient(145deg,#fffdf7,#eee2d1)]" />
          <div className="relative mx-auto flex h-full max-w-[4.8in] flex-col items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.44em] text-[#1f1b18]/62">
                Recuerdos para
              </p>
              <h1 className="mt-1 font-heading text-5xl font-normal leading-none tracking-wide text-[#1f1b18]">
                siempre
              </h1>
            </div>

            <div className="relative w-full max-w-[4.05in]">
              <div className="qr-camera-shell relative mx-auto aspect-[1.34/1] w-full">
                <div className="absolute left-[5%] top-[26%] h-[12%] w-[15%] rounded-[0.16in] border-[0.04in] border-[#1f1b18]" />
                <div className="absolute left-[16%] top-[18%] h-[72%] w-[76%] rounded-[0.22in] border-[0.045in] border-[#1f1b18]" />
                <div className="absolute left-[38%] top-[8%] h-[18%] w-[24%] rounded-t-[0.22in] border-x-[0.045in] border-t-[0.045in] border-[#1f1b18] bg-[#fbf8f0]" />
                <div className="absolute left-[35%] top-[29%] grid aspect-square w-[36%] place-items-center rounded-full border-[0.045in] border-[#1f1b18] bg-[#fbf8f0] p-[0.12in]">
                  <QRCodeSVG
                    value={shareUrl}
                    title={`QR para subir fotos a ${album.name}`}
                    size={720}
                    level="M"
                    marginSize={1}
                    className="aspect-square w-full"
                  />
                </div>
                <div className="absolute bottom-[10%] left-[16%] h-[0.045in] w-[18%] bg-[#1f1b18]" />
              </div>
            </div>

            <div className="space-y-5">
              <p className="mx-auto max-w-[3.8in] text-[0.66rem] font-semibold uppercase leading-5 tracking-[0.22em] text-[#1f1b18]/62">
                Escanea el QR y comparte tus momentos favoritos junto a nosotros
              </p>
              <div>
                <p className="font-heading text-4xl font-normal leading-none text-[#1f1b18]">
                  {album.name}
                </p>
                <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#1f1b18]/52">
                  {eventDate}
                </p>
              </div>
              <p className="break-all text-[0.58rem] font-medium text-[#1f1b18]/38 print:hidden">
                {shareUrl}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
