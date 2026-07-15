import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { getProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Our Projects",
  description: "Browse completed JK Interior projects — false ceiling, wall paneling, and complete interior installations across Bihar.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Breadcrumbs items={[{ name: "Projects", href: "/projects" }]} />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          eyebrow="Our Work"
          title="Completed Projects"
          description="Real installations with location, materials, timeline, cost range and customer feedback. Filtering by material and space type arrives in the next update."
          center={false}
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
