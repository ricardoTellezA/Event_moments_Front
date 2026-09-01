import Link from "next/link";
import { SparklesIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type AppLogoProps = {
  href?: string;
  compact?: boolean;
  className?: string;
};

export function AppLogo({ href = "/", compact = false, className }: AppLogoProps) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2", className)}>
      <span className="grid size-8 place-items-center rounded-xl bg-afterglow shadow-soft">
        <SparklesIcon className="size-4 text-primary-foreground" />
      </span>
      {!compact ? (
        <span className="font-heading text-lg font-semibold tracking-tight">
          Event Moments
        </span>
      ) : null}
    </Link>
  );
}
