import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { CtaSection } from "@/components/cta-section";
import { getBlogPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "Cost guides, material comparisons, and design ideas from JK Interior — false ceiling, wall panels, and complete interiors.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="Guides & Ideas" title="JK Interior Blog" center={false} />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="glass-card card-hover block overflow-hidden">
              {post.coverImage && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl bg-secondary">
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-5">
                <h2 className="font-serif text-lg font-bold text-foreground">{post.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
