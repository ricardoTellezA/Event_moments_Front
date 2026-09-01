"use client";

import { SnowflakeIcon, Trash2Icon } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { Button } from "@/components/ui/button";

export function AdminDangerActions({
  frozen,
  onToggleFrozen,
  onClearPhotos,
}: {
  frozen?: boolean;
  onToggleFrozen: () => void;
  onClearPhotos: () => void;
}) {
  return (
    <ScrollReveal className="flex flex-wrap gap-3 rounded-3xl border border-border bg-card p-6 shadow-soft">
      <Button variant="outline" onClick={onToggleFrozen}>
        <SnowflakeIcon />
        {frozen ? "Descongelar album" : "Congelar como capsula"}
      </Button>
      <Button
        variant="ghost"
        className="text-destructive hover:text-destructive"
        onClick={onClearPhotos}
      >
        <Trash2Icon />
        Vaciar album
      </Button>
    </ScrollReveal>
  );
}
