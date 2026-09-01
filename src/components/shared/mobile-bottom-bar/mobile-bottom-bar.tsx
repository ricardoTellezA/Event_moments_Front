import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MobileBottomBarProps = {
  children: ReactNode;
  className?: string;
};

export function MobileBottomBar({ children, className }: MobileBottomBarProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 py-3 backdrop-blur-xl md:hidden",
        className,
      )}
    >
      <div className="mx-auto flex max-w-md items-center gap-2">{children}</div>
    </div>
  );
}
