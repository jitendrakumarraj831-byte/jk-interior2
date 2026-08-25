import { Link } from "wouter"
import { TARGET_KEYWORDS, type TargetKeyword } from "@/lib/seo-keywords"

/**
 * "Popular searches" chip row — shared by the Services and Gallery sections.
 *
 * Every chip is real, crawlable, internal-linking text: the exact phrase JK
 * Interior targets in Search Console, wired to the service/city page that
 * actually answers it. This is the visible, natural half of the keyword
 * strategy — the machine-read half (alt/title/JSON-LD) lives alongside it in
 * `lib/seo-keywords.ts`, `lib/gallery-data.ts` and `lib/services-summary.ts`.
 */
export default function KeywordChips({
  groups,
  label = "Popular searches",
  className = "",
}: {
  /** Restrict the row to one or more keyword groups; omit for all of them. */
  groups?: TargetKeyword["group"][]
  label?: string
  className?: string
}) {
  const keywords = groups ? TARGET_KEYWORDS.filter((k) => groups.includes(k.group)) : TARGET_KEYWORDS

  return (
    <nav aria-label={label} className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-xs font-bold uppercase tracking-widest text-gold-800/50">{label}:</span>
      {keywords.map((k) => (
        <Link
          key={k.phrase}
          href={k.href}
          className="rounded-full border border-gold-900/10 bg-white px-3 py-1.5 text-[11px] font-semibold text-gold-800 transition-colors hover:border-gold-500/40 hover:bg-gold-50"
        >
          {k.label}
        </Link>
      ))}
    </nav>
  )
}
