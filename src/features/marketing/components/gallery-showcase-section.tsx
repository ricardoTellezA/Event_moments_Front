import Image from "next/image";

import { PageContainer } from "@/components/shared/page-container/page-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal/scroll-reveal";
import { galleryImages } from "@/features/marketing/data/marketing.data";

export function GalleryShowcaseSection() {
  return (
    <section className="pb-16 md:pb-24">
      <PageContainer>
        <ScrollReveal className="overflow-hidden rounded-[2.5rem] bg-soft-gradient p-6 md:p-12">
          <div className="max-w-xl">
            <h2 className="text-heading-1">Un album que se siente como un recuerdo</h2>
            <p className="mt-3 text-body text-muted-foreground">
              Nada de carpetas ni archivos. Solo fotos grandes, ordenadas por el momento
              en que pasaron.
            </p>
          </div>
          <div className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4">
            {galleryImages.map((image, index) => (
              <ScrollReveal key={image.id} delay={index * 55} className="mb-3 break-inside-avoid">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={900}
                  height={1100}
                  className="w-full rounded-2xl shadow-soft transition-transform duration-500 hover:scale-[1.015]"
                />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </PageContainer>
    </section>
  );
}
