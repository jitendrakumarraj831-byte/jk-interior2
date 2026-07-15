import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { ProjectsGrid } from "./projects-grid";
import { getProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Our Projects",
  description: "Browse completed JK Interior projects — false ceiling, wall paneling, and complete interior installations across Bihar.",
};

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ material?: string; space?: string }> }) {
  const [projects, params] = await Promise.all([getProjects(), searchParams]);

  return (
    <>
      <Breadcrumbs items={[{ name: "Projects", href: "/projects" }]} />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Our Work"
          title="Completed Projects"
          description="Real installations with location, materials, timeline, cost range and customer feedback. Filter by material or space type below."
          center={false}
        />
        <div className="mt-10">
          <ProjectsGrid projects={projects} initialMaterial={params.material} initialSpaceType={params.space} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
