"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const sheetVariants = cva(
  "fixed z-50 gap-5 border-border bg-card p-6 text-card-foreground shadow-floating transform-gpu overscroll-contain opacity-0 will-change-transform transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-open:opacity-100",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b rounded-b-2xl -translate-y-full data-open:translate-y-0",
        bottom:
          "inset-x-0 bottom-0 border-t rounded-t-2xl translate-y-full data-open:translate-y-0",
        left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r rounded-r-2xl -translate-x-full data-open:translate-x-0",
        right:
          "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l rounded-l-2xl translate-x-full data-open:translate-x-0",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

function Sheet(props: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetPortal(props: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetOverlay({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-foreground/30 opacity-0 transition-opacity duration-200 ease-out data-open:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: DrawerPrimitive.Popup.Props & VariantProps<typeof sheetVariants>) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DrawerPrimitive.Viewport
        data-slot="sheet-viewport"
        className="fixed inset-0 z-50 pointer-events-none"
      >
        <DrawerPrimitive.Popup
          data-slot="sheet-content"
          className={cn("pointer-events-auto", sheetVariants({ side }), className)}
          {...props}
        >
          {children}
          <DrawerPrimitive.Close
            className="absolute top-4 right-4 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/35 focus-visible:outline-none"
            aria-label="Cerrar"
          >
            <XIcon className="size-4" />
          </DrawerPrimitive.Close>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-2 pr-8", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-heading-3", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-body-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
