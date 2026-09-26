"use client";

import Link from "next/link";
import { PrinterIcon, Share2Icon } from "lucide-react";

import { CopyButton } from "@/components/shared/copy-button/copy-button";
import { QrCard } from "@/components/shared/qr-card/qr-card";
import { Button } from "@/components/ui/button";

export function AlbumShareCard({
  albumId,
  title,
  url,
}: {
  albumId?: string;
  title: string;
  url: string;
}) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url });
    }
  };

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="grid gap-5 sm:grid-cols-[180px_1fr] sm:items-center">
        <QrCard url={url} title="QR para invitados" className="p-4 shadow-none" />
        <div>
          <h2 className="font-heading text-2xl font-semibold">Comparte el album</h2>
          <p className="mt-2 text-body-sm text-muted-foreground">
            Tus invitados entran desde el navegador, suben recuerdos y vuelven cuando
            quieras revelar la galeria.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <CopyButton value={url} label="Copiar link" copiedLabel="Copiado" />
            {albumId ? (
              <Button
                type="button"
                variant="outline"
                nativeButton={false}
                render={<Link href={`/a/${albumId}/qr`} />}
              >
                <PrinterIcon />
                Imprimir QR
              </Button>
            ) : null}
            <Button type="button" className="bg-afterglow" onClick={handleShare}>
              <Share2Icon />
              Compartir
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
