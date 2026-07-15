import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd, breadcrumbSchema } from "./json-ld";
import { SITE_URL } from "@/lib/constants";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full: Crumb[] = [{ name: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <JsonLd data={breadcrumbSchema(full.map((c) => ({ name: c.name, url: `${SITE_URL}${c.href}` })))} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {full.map((crumb, i) => {
          const isLast = i === full.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
