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

            <div className="relative mx-auto aspect-[4/3] w-full max-w-[4.05in]">
              <svg
                aria-hidden="true"
                viewBox="0 0 520 390"
                className="absolute inset-0 h-full w-full"
                fill="none"
              >
                <path
                  d="M121 162H82c-19 0-34 15-34 34v4c0 19 15 34 34 34h39"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M122 118h276c30 0 54 24 54 54v112c0 30-24 54-54 54H122c-30 0-54-24-54-54V172c0-30 24-54 54-54Z"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
                <path
                  d="M210 118V88c0-23 19-42 42-42h57c23 0 42 19 42 42v30"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="260"
                  cy="236"
                  r="92"
                  fill="#fbf8f0"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <path
                  d="M68 338h76"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute left-1/2 top-[60.5%] grid aspect-square w-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center bg-[#fbf8f0] p-[1.5%]">
                  <QRCodeSVG
                    value={shareUrl}
                    title={`QR para subir fotos a ${album.name}`}
                    size={720}
                    level="M"
                    marginSize={1}
                    className="h-full w-full"
                  />
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
