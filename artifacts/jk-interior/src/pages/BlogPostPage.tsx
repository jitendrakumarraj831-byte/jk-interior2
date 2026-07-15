import { useParams, Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-data"
import { Calendar, Clock, ArrowLeft, Phone, MessageCircle } from "lucide-react"

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = getBlogPostBySlug(slug || "")

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
          <Link href="/blog" className="text-emerald-600 hover:underline mt-4 block">Back to blog</Link>
        </div>
      </div>
    )
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `https://www.jkinterior.online${post.coverImage}`,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "JK Interior" },
    publisher: { "@type": "Organization", name: "JK Interior", logo: { "@type": "ImageObject", url: "https://www.jkinterior.online/logo.png" } },
    mainEntityOfPage: `https://www.jkinterior.online/blog/${post.slug}`,
  }

  return (
    <>
      <SeoHead
        title={`${post.title} | JK Interior Blog`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        ogImage={`https://www.jkinterior.online${post.coverImage}`}
        ogType="article"
        jsonLd={articleJsonLd}
      />
      <Navbar />

      <article className="relative overflow-hidden pt-28 pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] to-white" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-6 lg:px-12">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <span className="mb-4 inline-block rounded-lg bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            {post.category}
          </span>

          <h1 className="mb-2 text-3xl font-black leading-tight text-gray-900 sm:text-4xl">{post.title}</h1>
          <p className="mb-6 text-base font-medium text-emerald-700/80">{post.titleHi}</p>

          <div className="mb-8 flex items-center gap-4 text-xs font-semibold text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readMinutes} min read
            </span>
          </div>

          <div className="mb-10 overflow-hidden rounded-2xl">
            <img src={post.coverImage} alt={post.title} className="w-full object-cover" style={{ maxHeight: 420 }} />
          </div>

          <div className="prose-content space-y-8">
            {post.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="mb-3 text-xl font-black text-gray-900 sm:text-2xl">{section.heading}</h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="mb-4 text-base leading-relaxed text-gray-700">{p}</p>
                ))}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8">
            <h3 className="mb-2 text-lg font-black text-gray-900">Ready to start your project?</h3>
            <p className="mb-5 text-sm text-gray-600">Free site visit, no obligation — Forbesganj, Araria &amp; nearby districts.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="tel:+918541849118" className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-500 transition-colors">
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <a
                href={`https://wa.me/918651070831?text=${encodeURIComponent(`Hi JK Interior, I read your article "${post.title}" and want to know more.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#1ebe5d] transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-14">
              <h3 className="mb-5 text-lg font-black text-gray-900">Read Next</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md"
                  >
                    <p className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">{r.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </>
  )
}
