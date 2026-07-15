import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="badge-glow inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-primary">
            <Star className="h-3.5 w-3.5 fill-current" /> {BUSINESS.googleRating} rated · {BUSINESS.googleReviewCount}+ Google reviews
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Premium <span className="gold-text">False Ceiling &amp; Interior</span> Solutions for Bihar
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            {BUSINESS.name} designs and installs PVC, gypsum &amp; WPC false ceilings, wall panels, and complete interiors — trusted across Araria, Purnia, Supaul and
            beyond since {BUSINESS.founded}.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/tools/price-calculator" className="rounded-xl gold-gradient px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:opacity-90">
              Get Free Price Estimate
            </Link>
            <a
              href={`tel:${BUSINESS.phone1}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-bold text-foreground hover:bg-secondary"
            >
              <Phone className="h-4 w-4" /> {BUSINESS.phone1}
            </a>
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" /> 1-year warranty on every project · Free site visit
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
          <Image src="/images/hero-interior.jpg" alt="Premium false ceiling and interior design by JK Interior" fill priority className="object-cover" />
        </div>
      </div>
    </section>
  );
}
