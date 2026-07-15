import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { BUSINESS, MATERIAL_BRANDS } from "@/lib/constants";
import { getDistricts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "About Us",
  description: "JK Interior's story, mission, team, and why we're Bihar's trusted false ceiling and interior contractor since 2016.",
};

export default async function AboutPage() {
  const districts = await getDistricts();

  return (
    <>
      <Breadcrumbs items={[{ name: "About", href: "/about" }]} />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Our Story" title={`How ${BUSINESS.name} Began`} center={false} />
        <p className="mt-4 text-muted-foreground">
          Founded in {BUSINESS.founded} in Forbesganj, {BUSINESS.name} started as a small false ceiling installation crew and has grown into North Bihar&apos;s most
          trusted interior contractor, serving {districts.length} districts with over 500 completed projects.
        </p>
      </section>

      <section className="bg-secondary/40 py-12">
        <div className="mx-auto grid max-w-4xl gap-8 px-4 sm:grid-cols-2 sm:px-6">
          <div className="glass-card p-6">
            <h2 className="font-serif text-xl font-bold text-foreground">Our Mission</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Deliver premium interior craftsmanship — false ceilings, wall panels, and full home interiors — at honest, transparent pricing for every household and
              business in North Bihar.
            </p>
          </div>
          <div className="glass-card p-6">
            <h2 className="font-serif text-xl font-bold text-foreground">Our Vision</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              To be the first name every North Bihar family and business thinks of for interior design — known for reliability, branded materials, and work that
              lasts.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Track Record" title="Experience" center={false} />
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: `${new Date().getFullYear() - Number(BUSINESS.founded)}+`, label: "Years in Business" },
            { value: "500+", label: "Projects Completed" },
            { value: `${districts.length}`, label: "Districts Served" },
            { value: "1 Yr", label: "Warranty on Every Job" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <p className="font-serif text-2xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading eyebrow="Our People" title="Team" center={false} />
          <p className="mt-4 text-muted-foreground">
            Our in-house installation crews are trained on PVC, gypsum, and WPC systems, backed by a design and project-coordination team that handles measurement,
            quotation, and scheduling for every job.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Quality Assurance" title="Certificates & Materials" center={false} />
        <p className="mt-4 text-muted-foreground">
          We install ISI-marked, branded materials from suppliers including {MATERIAL_BRANDS.join(", ")}, and back every installation with a written 1-year
          workmanship warranty.
        </p>
      </section>

      <section className="bg-secondary/40 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading eyebrow="What Sets Us Apart" title={`Why ${BUSINESS.name}`} center={false} />
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Free site visit and transparent, itemized quotation before any work begins</li>
            <li>• One team handles ceiling, wall panels, and TV units — no coordination headaches</li>
            <li>• Fast response across {districts.length} districts, with same-week visits near Forbesganj</li>
            <li>• Written 1-year warranty on every project</li>
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
