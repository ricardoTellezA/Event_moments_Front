"use client";

import { EyeIcon, ImageIcon, SnowflakeIcon, UsersIcon } from "lucide-react";

import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";

export function AdminAlbumStats({
  photos,
  contributors,
  views,
  completedChallenges,
}: {
  photos: number;
  contributors: number;
  views: number;
  completedChallenges: number;
}) {
  return (
    <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <StatCard label="Recuerdos" value={photos} icon={ImageIcon} delay={0} />
      <StatCard label="Personas" value={contributors} icon={UsersIcon} delay={60} />
      <StatCard label="Visitas" value={views} icon={EyeIcon} delay={120} />
      <StatCard
        label="Retos activos"
        value={completedChallenges}
        icon={SnowflakeIcon}
        delay={180}
      />
    </section>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  delay,
}: {
  label: string;
  value: number;
  icon: typeof ImageIcon;
  delay: number;
}) {
  return (
    <ScrollReveal
      delay={delay}
      className="rounded-[1.35rem] border border-border bg-card p-4 shadow-soft sm:rounded-3xl sm:p-5"
    >
      <Icon className="size-5 text-primary" />
      <p className="mt-3 text-xs text-muted-foreground sm:mt-4 sm:text-sm">{label}</p>
      <p className="font-heading text-2xl font-semibold sm:text-3xl">{value}</p>
    </ScrollReveal>
  );
}
