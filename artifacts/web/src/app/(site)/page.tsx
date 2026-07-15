import Link from "next/link";
import { PlayCircle, ShieldCheck, Users, Award, Clock3, Star } from "lucide-react";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { FaqAccordion } from "@/components/faq-accordion";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { ServiceCard, ProjectCard, DistrictCard, ReviewCard } from "@/components/cards";
import { JsonLd, faqPageSchema } from "@/components/json-ld";
import { BUSINESS, MATERIAL_BRANDS } from "@/lib/constants";
import {
  getServices,
  getDistricts,
  getCitiesByDistrictId,
  getFeaturedProjects,
  getReviews,
  getFaqs,
  getFeaturedBlogPosts,
} from "@/lib/queries";

const WHY_US = [
  { icon: ShieldCheck, title: "1-Year Warranty", description: "Every project backed by a written workmanship warranty." },
  { icon: Users, title: "500+ Projects Delivered", description: "A decade of trusted work across 6 districts in Bihar." },
  { icon: Award, title: "Branded Materials Only", description: "We install ISI-marked and branded PVC, gypsum & WPC products." },
  { icon: Clock3, title: "On-Time Delivery", description: "Clear timelines shared upfront, and we stick to them." },
];

const PROCESS_STEPS = [
  { step: "1", title: "Free Site Visit", description: "Our team visits your site to measure and understand your requirement." },
  { step: "2", title: "Design & Quotation", description: "We share a design concept and itemized quotation within 24 hours." },
  { step: "3", title: "Material & Execution", description: "Branded materials sourced and installation completed on schedule." },
  { step: "4", title: "Handover & Warranty", description: "Final walkthrough, cleaning, and warranty documentation." },
];

export default async function HomePage() {
  const [services, districts, featuredProjects, reviews, faqs, blogPosts] = await Promise.all([
    getServices(),
    getDistricts(),
    getFeaturedProjects(6),
    getReviews(),
    getFaqs(),
    getFeaturedBlogPosts(3),
  ]);

  const districtsWithCities = await Promise.all(
    districts.map(async (d) => ({ district: d, cityCount: (await getCitiesByDistrictId(d.id)).length })),
  );

  const beforeAfterProject = featuredProjects.find((p) => p.beforeImage && p.afterImage);

  return (
    <>
      <Hero />

      {/* Services Overview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="What We Do" title="Services Built for Every Room" description="12 specialised interior services — each with its own detailed pricing, materials, and process page." />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/services" className="font-bold text-primary hover:underline">
            View all 12 services →
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Why JK Interior" title="Built on Trust, Backed by Warranty" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map((item) => (
              <div key={item.title} className="glass-card p-6 text-center">
                <item.icon className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-3 font-serif font-bold text-foreground">{item.title}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/about" className="font-bold text-primary hover:underline">
              Learn more about us →
            </Link>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Our Process" title="From Site Visit to Handover" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <div key={step.step} className="glass-card p-6">
              <span className="gold-gradient inline-flex h-9 w-9 items-center justify-center rounded-full font-serif font-bold text-white">{step.step}</span>
              <p className="mt-3 font-serif font-bold text-foreground">{step.title}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Material Brands */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Trusted Materials" title="Materials & Brands We Work With" description="We source ISI-marked, branded materials for every project." />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {MATERIAL_BRANDS.map((brand) => (
              <span key={brand} className="font-serif text-lg font-bold text-foreground/70">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Our Work" title="Featured Projects" description="A sample of recent installations across our service districts." />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/projects" className="font-bold text-primary hover:underline">
            View all projects →
          </Link>
        </div>
      </section>

      {/* Before/After Slider */}
      {beforeAfterProject && (
        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeading eyebrow="See the Difference" title="Before &amp; After" />
            <div className="mt-10">
              <BeforeAfterSlider before={beforeAfterProject.beforeImage!} after={beforeAfterProject.afterImage!} alt={beforeAfterProject.title} />
            </div>
            <div className="mt-6 text-center">
              <Link href={`/projects/${beforeAfterProject.slug}`} className="font-bold text-primary hover:underline">
                Read the full project story →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Price Calculator teaser */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <SectionHeading eyebrow="Instant Estimate" title="How Much Will Your Project Cost?" description="Answer a few quick questions and get an instant price range for your room." />
        <Link href="/tools/price-calculator" className="mt-8 inline-flex rounded-xl gold-gradient px-8 py-4 text-sm font-bold text-white shadow-sm hover:opacity-90">
          Open Price Calculator →
        </Link>
      </section>

      {/* Areas We Serve */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Service Coverage" title="Areas We Serve Across Bihar" description="6 districts, dozens of cities — find your nearest JK Interior service area." />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {districtsWithCities.map(({ district, cityCount }) => (
              <DistrictCard key={district.slug} district={district} cityCount={cityCount} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/areas-we-serve" className="font-bold text-primary hover:underline">
              See all service areas →
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews + Google Rating */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Customer Stories" title="What Our Clients Say" />
        <div className="glass-card mx-auto mt-8 flex max-w-md items-center justify-center gap-3 px-6 py-4">
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
          {reviews.slice(0, 6).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/reviews" className="font-bold text-primary hover:underline">
            Read all reviews →
          </Link>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionHeading eyebrow="See Us in Action" title="Watch a Live Project Walkthrough" />
          <div className="glass-card mt-8 flex aspect-video items-center justify-center">
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Hi, I'd like to see a video walkthrough of a recent JK Interior project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-primary"
            >
              <PlayCircle className="h-14 w-14" />
              <span className="text-sm font-bold">Request a project video on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <JsonLd data={faqPageSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
        <div className="mt-10">
          <FaqAccordion faqs={faqs.slice(0, 5)} />
        </div>
        <div className="mt-8 text-center">
          <Link href="/faq" className="font-bold text-primary hover:underline">
            View all FAQs →
          </Link>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="From the Blog" title="Guides &amp; Cost Comparisons" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="glass-card card-hover block p-5">
                <h3 className="font-serif text-base font-bold text-foreground">{post.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/blog" className="font-bold text-primary hover:underline">
              Read all articles →
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
