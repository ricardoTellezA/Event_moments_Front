import Image from "next/image";
import { QrCodeIcon, UsersIcon } from "lucide-react";

import { heroPreviewPhotos } from "@/features/marketing/data/marketing.data";

export function HeroEventPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card p-3 shadow-lifted transition-transform duration-500 hover:-translate-y-1">
        <div className="relative overflow-hidden rounded-[2rem]">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
            alt="Invitados riendo en una boda al atardecer"
            width={1200}
            height={1504}
            priority
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-veil-gradient" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
            <p className="font-heading text-2xl font-semibold">Boda Ana & Luis</p>
            <p className="mt-1 text-sm text-primary-foreground/80">
              124 fotos · 18 personas
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-3">
          {heroPreviewPhotos.map((photo) => (
            <Image
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              width={360}
              height={360}
              className="aspect-square w-full rounded-xl object-cover transition-transform duration-500 hover:scale-[1.04]"
            />
          ))}
        </div>
      </div>
      <div className="absolute -left-4 top-8 hidden rounded-2xl bg-card px-4 py-3 shadow-soft animate-float-card sm:block">
        <p className="text-sm font-semibold">+ 8 fotos nuevas</p>
        <p className="text-xs text-muted-foreground">hace un momento</p>
      </div>
      <div className="absolute -right-3 bottom-16 hidden rounded-2xl bg-card p-4 shadow-soft animate-float-card-delayed sm:block">
        <QrCodeIcon className="size-6 text-primary" />
        <p className="mt-2 text-xs font-semibold">QR listo</p>
      </div>
      <div className="absolute -right-4 top-20 hidden items-center gap-2 rounded-2xl bg-card px-3 py-2 shadow-soft animate-float-card lg:flex">
        <UsersIcon className="size-4 text-primary" />
        <span className="text-xs font-semibold">18 invitados</span>
      </div>
    </div>
  );
}
