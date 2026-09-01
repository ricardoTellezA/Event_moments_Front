"use client";

import { DownloadIcon, Share2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CopyButton } from "@/components/shared/copy-button/copy-button";
import { QrCard } from "@/components/shared/qr-card/qr-card";

type ShareEventDialogProps = {
  eventName: string;
  url: string;
};

export function ShareEventDialog({ eventName, url }: ShareEventDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        <Share2Icon />
        Share
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compartir {eventName}</DialogTitle>
          <DialogDescription>
            Comparte este QR o link para que los invitados suban recuerdos.
          </DialogDescription>
        </DialogHeader>
        <QrCard url={url} className="shadow-none" />
        <DialogFooter>
          <Button variant="outline">
            <DownloadIcon />
            Download QR
          </Button>
          <CopyButton value={url} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
