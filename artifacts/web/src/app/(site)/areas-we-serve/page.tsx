import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { DistrictCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { getDistricts, getCitiesByDistrictId } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description: "JK Interior serves Araria, Purnia, Supaul, Katihar, Madhepura and Kishanganj districts in Bihar. Find your nearest service area.",
};

export default async function AreasWeServePage() {
  const districts = await getDistricts();
  const districtsWithCities = await Promise.all(
    districts.map(async (d) => ({ district: d, cityCount: (await getCitiesByDistrictId(d.id)).length })),
  );

  return (
    <>
      <Breadcrumbs items={[{ name: "Areas We Serve", href: "/areas-we-serve" }]} />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Service Coverage"
          title="Areas We Serve"
          description="6 districts across North Bihar. Select your district to see cities, local projects, and reviews."
          center={false}
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {districtsWithCities.map(({ district, cityCount }) => (
            <DistrictCard key={district.slug} district={district} cityCount={cityCount} />
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
