import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Ruler, Layers, Clock, IndianRupee, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { ProjectCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/constants";
import { getProjectBySlug, getProjects, getRelatedProjects } from "@/lib/queries";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.challenge ?? project.title,
    alternates: { canonical: `${SITE_URL}/projects/${project.slug}` },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const relatedProjects = await getRelatedProjects(project.slug, project.serviceId, 3);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    about: project.service?.name,
    locationCreated: project.city ? { "@type": "Place", name: project.city.name } : undefined,
  };

  return (
    <>
      <JsonLd data={projectSchema} />
      <Breadcrumbs items={[{ name: "Projects", href: "/projects" }, { name: project.title, href: `/projects/${project.slug}` }]} />

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">{project.title}</h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          {project.city && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {project.city.name}, {project.city.district?.name}
            </span>
          )}
          {project.areaSqft && (
            <span className="flex items-center gap-1.5">
              <Ruler className="h-4 w-4" /> {project.areaSqft} sq.ft
            </span>
          )}
          {project.timeline && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {project.timeline}
            </span>
          )}
          {(project.costRangeMin || project.costRangeMax) && (
            <span className="flex items-center gap-1.5">
              <IndianRupee className="h-4 w-4" /> ₹{project.costRangeMin?.toLocaleString("en-IN")}–₹{project.costRangeMax?.toLocaleString("en-IN")}
            </span>
          )}
          {project.materials && (
            <span className="flex items-center gap-1.5">
              <Layers className="h-4 w-4" /> {project.materials}
            </span>
          )}
        </div>

        {project.beforeImage && project.afterImage ? (
          <div className="mt-8">
            <BeforeAfterSlider before={project.beforeImage} after={project.afterImage} alt={project.title} />
          </div>
        ) : (
          project.afterImage && (
            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-3xl">
              <Image src={project.afterImage} alt={project.title} fill className="object-cover" priority />
            </div>
          )
        )}

        {project.images.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.images.map((img) => (
              <div key={img} className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={img} alt={project.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}

        {project.challenge && (
          <div className="mt-10">
            <SectionHeading title="The Challenge" center={false} />
            <p className="mt-3 text-muted-foreground">{project.challenge}</p>
          </div>
        )}
        {project.solution && (
          <div className="mt-8">
            <SectionHeading title="Our Solution" center={false} />
            <p className="mt-3 text-muted-foreground">{project.solution}</p>
          </div>
        )}

        {project.customerReview && (
          <div className="glass-card mt-10 p-6">
            <div className="flex gap-0.5 text-amber">
              {Array.from({ length: project.customerRating ?? 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-3 text-foreground/90">&ldquo;{project.customerReview}&rdquo;</p>
            {project.customerName && <p className="mt-3 font-bold text-foreground">— {project.customerName}</p>}
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          {project.service && (
            <Link href={`/services/${project.service.slug}`} className="font-bold text-primary hover:underline">
              See the {project.service.name} service page →
            </Link>
          )}
          {project.city && (
            <Link href={`/areas-we-serve/${project.city.district?.slug}/${project.city.slug}`} className="font-bold text-primary hover:underline">
              More projects in {project.city.name} →
            </Link>
          )}
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="bg-secondary/40 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading title="Related Projects" center={false} />
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection title="Want a project like this?" />
    </>
  );
}
