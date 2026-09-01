import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Fraunces, Manrope } from "next/font/google";
import { PageTransition } from "@/components/shared/page-transition/page-transition";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Event Moments",
  description: "Todas las fotos de tu evento en un solo lugar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignOutUrl="/"
          appearance={{
            variables: {
              colorPrimary: "oklch(0.64 0.18 315)",
              colorBackground: "oklch(0.99 0.006 80)",
              borderRadius: "0.9rem",
              fontFamily: "var(--font-manrope)",
            },
            elements: {
              cardBox: "shadow-floating border border-border/70",
              formButtonPrimary: "bg-afterglow shadow-soft hover:opacity-95",
              headerTitle: "font-heading",
            },
          }}
        >
          <PageTransition>{children}</PageTransition>
          <Toaster richColors />
        </ClerkProvider>
      </body>
    </html>
  );
}
