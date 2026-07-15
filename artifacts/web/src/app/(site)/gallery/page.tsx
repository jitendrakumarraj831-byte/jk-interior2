import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { GalleryGrid } from "./gallery-grid";
import { getGalleryItems } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse JK Interior's project gallery filtered by material — gypsum, PVC, WPC, TV unit, partition — and space type.",
};

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ material?: string; space?: string }> }) {
  const [items, params] = await Promise.all([getGalleryItems(), searchParams]);

  return (
    <>
      <Breadcrumbs items={[{ name: "Gallery", href: "/gallery" }]} />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Visual Portfolio"
          title="Project Gallery"
          description="Every photo links to its full project story — location, materials, cost range and customer review."
          center={false}
        />
        <div className="mt-10">
          <GalleryGrid items={items} initialMaterial={params.material} initialSpaceType={params.space} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
