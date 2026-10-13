import { QRCodeSVG } from "qrcode.react";

import { CopyButton } from "@/components/shared/copy-button/copy-button";
import { cn } from "@/lib/utils";

type QrCardProps = {
  url: string;
  title?: string;
  className?: string;
};

export function QrCard({ url, title = "QR del evento", className }: QrCardProps) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-3xl border border-border bg-card p-5 shadow-card",
        className,
      )}
    >
      <div className="mx-auto grid aspect-square w-full max-w-44 place-items-center rounded-2xl bg-white p-3 sm:max-w-none sm:p-4">
        <QRCodeSVG
          value={url}
          size={220}
          level="M"
          marginSize={2}
          className="size-full max-h-44 max-w-44"
        />
      </div>
      <div className="mt-4 min-w-0">
        <p className="text-label">{title}</p>
        <p className="mt-1 line-clamp-2 break-all text-body-sm text-muted-foreground">
          {url}
        </p>
      </div>
      <div className="mt-4 [&_button]:w-full">
        <CopyButton value={url} />
      </div>
    </div>
  );
}
