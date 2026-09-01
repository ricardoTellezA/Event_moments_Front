import Image from "next/image";

import { cn } from "@/lib/utils";

export type ImageGridItem = {
  id: string;
  src: string;
  alt: string;
};

type ImageGridProps = {
  images: ImageGridItem[];
  className?: string;
};

export function ImageGrid({ images, className }: ImageGridProps) {
  return (
    <div className={cn("columns-2 gap-3 sm:columns-3 lg:columns-4", className)}>
      {images.map((image) => (
        <Image
          key={image.id}
          src={image.src}
          alt={image.alt}
          width={520}
          height={640}
          className="mb-3 w-full break-inside-avoid rounded-2xl object-cover shadow-soft"
        />
      ))}
    </div>
  );
}
