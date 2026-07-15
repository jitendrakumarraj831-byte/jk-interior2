import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { ReviewCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { BUSINESS } from "@/lib/constants";
import { getReviews } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Read what JK Interior customers across Bihar say about our false ceiling and interior design work.",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <>
      <Breadcrumbs items={[{ name: "Reviews", href: "/reviews" }]} />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Customer Stories" title="What Our Clients Say" center={false} />
        <div className="glass-card mt-6 flex w-fit items-center gap-3 px-6 py-4">
          <div className="flex gap-0.5 text-amber">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <p className="text-sm font-bold text-foreground">
            {BUSINESS.googleRating} / 5 · {BUSINESS.googleReviewCount}+ Google Reviews
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
