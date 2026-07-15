import Link from "next/link";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import type { Service, Project, District, City, Review } from "@workspace/db/schema";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="glass-card card-hover group block overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-secondary">
        {service.heroImage && (
          <Image src={service.heroImage} alt={service.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-foreground">{service.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{service.shortDescription}</p>
        <p className="mt-3 text-sm font-bold text-primary">
          {service.priceRangeMin > 0 ? `₹${service.priceRangeMin}–₹${service.priceRangeMax}/${service.priceUnit}` : "Custom quote"}
        </p>
      </div>
    </Link>
  );
}

export function ProjectCard({ project }: { project: Project & { city?: (City & { district?: District | null }) | null } }) {
  return (
    <Link href={`/projects/${project.slug}`} className="glass-card card-hover group block overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-secondary">
        {project.afterImage && (
          <Image src={project.afterImage} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold capitalize text-foreground">
          {project.spaceType}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-base font-bold text-foreground">{project.title}</h3>
        {project.city && (
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {project.city.name}, {project.city.district?.name}
          </p>
        )}
      </div>
    </Link>
  );
}

export function DistrictCard({ district, cityCount }: { district: District; cityCount: number }) {
  return (
    <Link href={`/areas-we-serve/${district.slug}`} className="glass-card card-hover group block overflow-hidden">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl bg-secondary">
        {district.heroImage && (
          <Image src={district.heroImage} alt={`${district.name} district`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-foreground">{district.name} District</h3>
        <p className="mt-1 text-sm text-muted-foreground">{cityCount} cities served</p>
      </div>
    </Link>
  );
}

export function CityCard({ city, districtSlug }: { city: City; districtSlug: string }) {
  return (
    <Link href={`/areas-we-serve/${districtSlug}/${city.slug}`} className="glass-card card-hover block p-4">
      <h4 className="font-serif font-bold text-foreground">{city.name}</h4>
      <p className="mt-1 text-xs text-muted-foreground">{city.distanceFromHq}</p>
    </Link>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glass-card p-5">
      <div className="flex gap-0.5 text-amber">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-3 text-sm text-foreground/90">{review.text}</p>
      <p className="mt-3 text-sm font-bold text-foreground">{review.authorName}</p>
    </div>
  );
}
