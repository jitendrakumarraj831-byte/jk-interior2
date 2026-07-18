import Link from "next/link";
import Image from "next/image";
import {
  Star,
  MapPin,
  ArrowRight,
  Waves,
  Sparkles,
  LayoutPanelLeft,
  Gem,
  Tv,
  Home,
  Bed,
  ChefHat,
  Briefcase,
  Building2,
  AlignJustify,
  SquareStack,
  type LucideIcon,
} from "lucide-react";
import type { Service, Project, District, City, Review } from "@workspace/db/schema";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  waves: Waves,
  sparkles: Sparkles,
  "layout-panel-left": LayoutPanelLeft,
  gem: Gem,
  tv: Tv,
  home: Home,
  bed: Bed,
  "chef-hat": ChefHat,
  briefcase: Briefcase,
  "building-2": Building2,
  "align-justify": AlignJustify,
  "square-stack": SquareStack,
};

const TAG_LABEL_OVERRIDES: Record<string, string> = {
  pvc: "PVC",
  wpc: "WPC",
  acp: "ACP",
  "uv-marble": "UV Marble",
  "tv-unit": "TV Unit",
};

function formatMaterialTag(tag: string) {
  return TAG_LABEL_OVERRIDES[tag] ?? tag.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = (service.icon && SERVICE_ICONS[service.icon]) || Sparkles;

  return (
    <Link href={`/services/${service.slug}`} className="glass-card card-hover group block overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-secondary">
        {service.heroImage && (
          <Image src={service.heroImage} alt={service.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
        <span className="gold-gradient absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg ring-2 ring-white/40">
          <Icon className="h-5 w-5 text-white" />
        </span>
        {service.materialTag && (
          <span className="absolute right-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary shadow-sm backdrop-blur">
            {formatMaterialTag(service.materialTag)}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-foreground transition-colors group-hover:text-primary">{service.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{service.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/70 pt-3.5">
          <p className="text-sm font-bold text-primary">
            {service.priceRangeMin > 0 ? (
              <>
                From <span className="font-serif text-base">₹{service.priceRangeMin}</span>
                <span className="text-muted-foreground">/{service.priceUnit}</span>
              </>
            ) : (
              "Get Custom Quote"
            )}
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground/70 transition-all group-hover:gap-1.5 group-hover:text-primary">
            Explore <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
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
