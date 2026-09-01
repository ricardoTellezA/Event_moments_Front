import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  name: string;
  eyebrow: string;
  price: string;
  suffix?: string;
  description: string;
  cta: string;
  featured: boolean;
  features: string[];
};

export function PricingCard({
  name,
  eyebrow,
  price,
  suffix,
  description,
  cta,
  featured,
  features,
}: PricingCardProps) {
  return (
    <article
      className={cn(
        "rounded-[2rem] border border-border bg-card p-8 shadow-soft",
        featured
          ? "relative overflow-hidden border-transparent bg-afterglow p-[2px] shadow-lifted"
          : null,
      )}
    >
      <div
        className={cn(featured ? "h-full rounded-[calc(2rem-2px)] bg-card p-8" : null)}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-body-sm text-muted-foreground">{eyebrow}</p>
          {featured ? (
            <span className="rounded-full bg-soft-gradient px-3 py-1 text-caption text-foreground">
              Recomendado
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 font-heading text-2xl font-semibold">{name}</h3>
        <p className="mt-3 font-heading text-4xl font-semibold">
          {price}{" "}
          {suffix ? (
            <span className="text-lg text-muted-foreground">{suffix}</span>
          ) : null}
        </p>
        <p className="mt-3 text-body-sm text-muted-foreground">{description}</p>
        <ul className="mt-6 space-y-3 text-body-sm">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          className={cn("mt-8 w-full", featured ? "bg-afterglow" : null)}
          variant={featured ? "default" : "secondary"}
          nativeButton={false}
          render={<Link href="/crear" />}
        >
          {cta}
        </Button>
      </div>
    </article>
  );
}
