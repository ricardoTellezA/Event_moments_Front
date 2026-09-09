"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { ImagesIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AuthActionsProps = {
  layout?: "desktop" | "mobile" | "mobile-header";
};

export function AuthActions({ layout = "desktop" }: AuthActionsProps) {
  const isMobile = layout === "mobile";
  const isMobileHeader = layout === "mobile-header";
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div
      className={cn(
        "items-center gap-2",
        isMobile && "grid",
        isMobileHeader && "flex md:hidden",
        layout === "desktop" && "hidden md:flex",
      )}
    >
      {!isLoaded ? (
        <div
          className={cn(
            "rounded-lg bg-muted",
            isMobileHeader ? "h-8 w-24" : "h-10 w-28",
          )}
          aria-hidden="true"
        />
      ) : null}

      {isLoaded && !isSignedIn ? (
        <>
          <Button
            variant={isMobile ? "outline" : "ghost"}
            size={isMobileHeader ? "xs" : "default"}
            className={cn(isMobileHeader && "px-2.5")}
            nativeButton={false}
            render={<Link href="/sign-in" />}
          >
            Entrar
          </Button>
          <Button
            size={isMobileHeader ? "xs" : "default"}
            className={cn("bg-afterglow shadow-soft", isMobileHeader && "px-3")}
            nativeButton={false}
            render={<Link href="/sign-up" />}
          >
            Crear
          </Button>
        </>
      ) : null}

      {isLoaded && isSignedIn ? (
        <>
          {!isMobileHeader ? (
            <Button
              variant={isMobile ? "outline" : "ghost"}
              nativeButton={false}
              render={<Link href="/mis-albumes" />}
            >
              <ImagesIcon data-icon="inline-start" />
              Mis albumes
            </Button>
          ) : null}
          <Button
            size={isMobileHeader ? "xs" : "default"}
            className="bg-afterglow shadow-soft"
            nativeButton={false}
            render={<Link href="/crear" />}
          >
            <PlusIcon data-icon="inline-start" />
            {isMobileHeader ? "Crear" : "Crear album"}
          </Button>
          <div
            className={cn(
              "flex",
              isMobile ? "justify-center pt-2" : "pl-1",
              isMobileHeader && "pl-0",
            )}
          >
            <UserButton
              appearance={{
                elements: {
                  avatarBox: cn(
                    "rounded-lg shadow-card",
                    isMobileHeader ? "size-8" : "size-10",
                  ),
                },
              }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
