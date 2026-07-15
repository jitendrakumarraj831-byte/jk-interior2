import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/constants";
import { getBlogPostBySlug, getBlogPosts, getServices, getRelatedBlogPosts, getFaqs } from "@/lib/queries";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: { type: "article", images: post.coverImage ? [{ url: post.coverImage }] : undefined },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const [allServices, relatedPosts, faqs] = await Promise.all([
    getServices(),
    getRelatedBlogPosts(post.slug, post.serviceTags[0], 2),
    getFaqs(),
  ]);

  const taggedServices = allServices.filter((s) => post.serviceTags.includes(s.slug));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.coverImage,
    author: { "@type": "Organization", name: post.author },
    datePublished: post.publishedAt.toString(),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title, href: `/blog/${post.slug}` }]} />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">{post.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          By {post.author} · {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        {post.coverImage && (
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-3xl">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        <div className="prose prose-neutral mt-8 max-w-none text-muted-foreground">
          <p>{post.content}</p>
        </div>

        {taggedServices.length > 0 && (
          <div className="mt-10">
            <SectionHeading title="Related Services" center={false} />
            <ul className="mt-3 flex flex-wrap gap-2">
              {taggedServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-accent">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {post.district && (
          <div className="mt-6">
            <Link href={`/areas-we-serve/${post.district.slug}`} className="font-bold text-primary hover:underline">
              See {post.district.name} district service page →
            </Link>
          </div>
        )}

        <div className="mt-6">
          <Link href="/tools/price-calculator" className="font-bold text-primary hover:underline">
            Estimate your project cost →
          </Link>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-10">
            <SectionHeading title="Related Articles" center={false} />
            <ul className="mt-3 space-y-2">
              {relatedPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="text-sm font-medium text-primary hover:underline">
                    {p.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {faqs.length > 0 && (
          <div className="mt-6">
            <Link href="/faq" className="font-bold text-primary hover:underline">
              Read more FAQs →
            </Link>
          </div>
        )}
      </article>

      <CtaSection />
    </>
  );
}
