import { Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SeoHead from "@/components/seo-head"
import { blogPosts } from "@/lib/blog-data"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"

export default function BlogPage() {
  return (
    <>
      <SeoHead
        title="Interior Design Blog – Tips, Costs & Trends | JK Interior"
        description="Read expert guides on false ceiling costs, PVC vs gypsum, WPC wall panel maintenance, and 2026 interior design trends from JK Interior, Forbesganj Bihar."
        canonical="/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "JK Interior Blog",
          url: "https://www.jkinterior.online/blog",
        }}
      />
      <Navbar />
      <h1 className="sr-only">JK Interior Blog — Interior Design Tips, Costs and Trends</h1>

      <section className="relative overflow-hidden pt-28 pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdf4] to-white" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-12">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5">
              <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">JK Interior Blog</span>
            </div>
            <h2 className="mb-3 text-3xl font-black text-gray-900 sm:text-4xl">
              Interior Design <span className="hero-gradient-text">Guides &amp; Tips</span>
            </h2>
            <p className="mx-auto max-w-xl text-sm text-gray-500 sm:text-base">
              Cost breakdowns, material comparisons, and design trends — written by the JK Interior team.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_8px_40px_rgba(5,150,105,0.12)]"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 rounded-lg bg-emerald-600/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 text-base font-black leading-snug text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readMinutes} min read
                    </span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700">
                    Read Article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
