"use client";

import { useEffect, useState } from "react";
import { CheckCircle2Icon, XIcon } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";

export function PublicUploadSuccessCard({
  count,
  onDismiss,
}: {
  count: number;
  onDismiss: () => void;
}) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (count <= 0) {
      return;
    }

    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, 4200);
    const dismissTimer = window.setTimeout(() => {
      onDismiss();
    }, 4700);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(dismissTimer);
    };
  }, [count, onDismiss]);

  if (count <= 0) {
    return null;
  }

  return (
    <ScrollReveal
      className={`relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-5 shadow-soft transition-all duration-500 ${
        isLeaving
          ? "-translate-y-2 scale-[0.98] opacity-0"
          : "translate-y-0 scale-100 opacity-100"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-afterglow" />
      <div className="flex items-start gap-4 pr-10">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
          <CheckCircle2Icon className="size-5" />
        </span>
        <div>
          <h2 className="font-heading text-2xl font-semibold">
            {count === 1 ? "Recuerdo enviado" : "Recuerdos enviados"}
          </h2>
          <p className="mt-1 text-body-sm text-muted-foreground">
            {count === 1
              ? "Tu foto quedo guardada y puede pasar por revision antes de aparecer."
              : `${count} fotos quedaron guardadas y pueden pasar por revision antes de aparecer.`}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-3 top-3"
        onClick={() => {
          setIsLeaving(true);
          window.setTimeout(onDismiss, 260);
        }}
        aria-label="Cerrar confirmacion"
      >
        <XIcon />
      </Button>
    </ScrollReveal>
  );
}
