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
        "rounded-3xl border border-border bg-card p-5 shadow-card",
        className,
      )}
    >
      <div className="grid aspect-square place-items-center rounded-2xl bg-white p-4">
        <QRCodeSVG
          value={url}
          size={180}
          level="M"
          marginSize={2}
          className="size-full max-h-44 max-w-44"
        />
      </div>
      <div className="mt-4">
        <p className="text-label">{title}</p>
        <p className="mt-1 truncate text-body-sm text-muted-foreground">{url}</p>
      </div>
      <div className="mt-4">
        <CopyButton value={url} />
      </div>
    </div>
  );
}
