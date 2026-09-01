"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { AppLogo } from "@/components/shared/app-logo/app-logo";
import { PageContainer } from "@/components/shared/page-container/page-container";
import { Button } from "@/components/ui/button";
import { AuthActions } from "@/features/auth/components/auth-actions";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { marketingNavItems } from "@/features/marketing/data/marketing.data";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <PageContainer className="flex h-16 items-center justify-between gap-3 px-4 sm:px-5">
        <AppLogo compact className="md:hidden" />
        <AppLogo className="hidden md:inline-flex" />
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {marketingNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <AuthActions />
        <div className="flex items-center gap-2 md:hidden">
          <AuthActions layout="mobile-header" />
          <Sheet>
          <SheetTrigger
            render={<Button variant="outline" size="icon" className="md:hidden" />}
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Event Moments</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 grid gap-3">
              {marketingNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-3 py-3 text-body-sm hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8">
              <AuthActions layout="mobile" />
            </div>
          </SheetContent>
          </Sheet>
        </div>
      </PageContainer>
    </header>
  );
}
