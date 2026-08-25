import { useState, useEffect, useCallback } from "react"
import { Helmet } from "react-helmet-async"

interface Lead {
  id: number
  name: string
  phone: string
  city: string | null
  service: string | null
  estimate: string | null
  preferred_time: string | null
  chat_summary: string | null
  is_read: boolean
  created_at: string
}

const ADMIN_KEY_SESSION = "jk_admin_key"

function normalizeIndianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "")
  const local = digits.replace(/^(?:91|0)/, "").slice(-10)
  return `91${local}`
}

function waLink(lead: Lead) {
  const msg = [
    `👋 Namaste ${lead.name} ji!`,
    `Main JK Interior se call kar raha hoon.`,
    lead.service ? `Aapne ${lead.service} ke baare mein inquiry ki thi.` : "",
    lead.estimate ? `Rough estimate: ${lead.estimate}` : "",
    `Free site visit ke liye kab aana theek rahega?`,
    `📞 +91 8651070831`,
  ].filter(Boolean).join("\n")
  return `https://wa.me/${normalizeIndianPhone(lead.phone)}?text=${encodeURIComponent(msg)}`
}

function csvEscape(val: unknown): string {
  const s = String(val ?? "").replace(/^([=+\-@])/, "'$1").replace(/"/g, '""')
  return `"${s}"`
}

function fmt(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diffH = (now.getTime() - d.getTime()) / 3600000
  if (diffH < 1) return `${Math.round(diffH * 60)}m ago`
  if (diffH < 24) return `${Math.round(diffH)}h ago`
  if (diffH < 48) return "Yesterday"
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

function WAIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.054 23.447a.5.5 0 00.611.61l5.7-1.461A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.389l-.36-.214-3.733.957.993-3.618-.235-.373A9.818 9.818 0 1112 21.818z"/>
    </svg>
  )
}

function Row({ icon, label, value, highlight }: { icon: string; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-start gap-2 text-xs">
      <span className="w-4 shrink-0">{icon}</span>
      <span className="text-gray-500 w-14 shrink-0 text-[11px]">{label}</span>
      <span className={`font-semibold break-all text-[12px] ${highlight ? "text-gold-700" : "text-gray-800"}`}>{value}</span>
    </div>
  )
}

function LeadCard({ lead, onRead, adminKey }: { lead: Lead; onRead: (id: number) => void; adminKey: string }) {
  const [marking, setMarking] = useState(false)

  async function markRead() {
    if (lead.is_read || marking) return
    setMarking(true)
    try {
      const res = await fetch(`/api/leads`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ id: lead.id }),
      })
      // A failed request (wrong key expired mid-session, a server error) still
      // resolves rather than throwing — checking status here is what stops the
      // UI from marking a lead read that the server never actually updated.
      if (res.ok) onRead(lead.id)
    } catch {
      // Network failure — leave the lead unread so the tap can be retried.
    } finally {
      setMarking(false)
    }
  }

  return (
    <div className={`rounded-2xl border bg-white shadow-sm overflow-hidden transition-all ${lead.is_read ? "opacity-70 border-gray-100" : "border-gold-200 shadow-gold-50"}`}>
      <div className={`px-4 py-3 flex items-center justify-between ${lead.is_read ? "bg-gray-50" : "bg-gradient-to-r from-gold-600 to-gold-500"}`}>
        <div className="flex items-center gap-2.5">
          <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${lead.is_read ? "bg-gray-200 text-gray-500" : "bg-white/20 text-white"}`}>
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className={`text-[13px] font-bold leading-tight ${lead.is_read ? "text-gray-700" : "text-white"}`}>{lead.name}</p>
            <p className={`text-[11px] leading-none mt-0.5 ${lead.is_read ? "text-gray-500" : "text-white/70"}`}>{fmt(lead.created_at)}</p>
          </div>
        </div>
        {!lead.is_read && <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0 animate-pulse" />}
      </div>
      <div className="px-4 py-3 space-y-1.5">
        <Row icon="📱" label="Phone" value={lead.phone} />
        <Row icon="📍" label="City" value={lead.city ?? "—"} />
        <Row icon="🔧" label="Service" value={lead.service ?? "—"} />
        {lead.estimate && <Row icon="💰" label="Estimate" value={lead.estimate} highlight />}
        {lead.preferred_time && <Row icon="📅" label="Visit" value={lead.preferred_time} />}
        {lead.chat_summary && (
          <div className="flex items-start gap-2 text-xs mt-1.5 pt-1.5 border-t border-gray-100">
            <span className="w-4 shrink-0">💬</span>
            <span className="text-gray-500 w-14 shrink-0 text-[11px]">Chat</span>
            <span className="text-gray-600 text-[11px] italic leading-relaxed">{lead.chat_summary}</span>
          </div>
        )}
      </div>
      <div className="px-4 pb-4 flex gap-2">
        <a href={waLink(lead)} target="_blank" rel="noopener noreferrer" onClick={markRead}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2.5 text-[12px] font-bold text-white hover:opacity-90 active:scale-95 transition-all">
          <WAIcon /> WhatsApp
        </a>
        <a href={`tel:${lead.phone}`} onClick={markRead}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-gold-200 bg-gold-50 px-4 py-2.5 text-[12px] font-bold text-gold-700 hover:bg-gold-100 active:scale-95 transition-all">
          📞 Call
        </a>
        {!lead.is_read && (
          <button onClick={markRead} disabled={marking}
            className="flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2.5 text-[11px] text-gray-500 hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50">
            ✓ Read
          </button>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [key, setKey] = useState("")
  const [inputKey, setInputKey] = useState("")
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "new" | "read">("all")

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(ADMIN_KEY_SESSION)
      if (saved) { setKey(saved) }
    } catch {}
  }, [])

  const fetchLeads = useCallback(async (k: string) => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/leads`, { headers: { "x-admin-key": k } })
      if (res.status === 401) { setError("Wrong password."); setKey(""); sessionStorage.removeItem(ADMIN_KEY_SESSION); return }
      const data = await res.json()
      if (!data.ok) { setError("Failed to load leads."); return }
      setLeads(data.leads)
    } catch {
      setError("Network error. Try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (key) fetchLeads(key)
  }, [key, fetchLeads])

  function login() {
    const k = inputKey.trim()
    if (!k) return
    sessionStorage.setItem(ADMIN_KEY_SESSION, k)
    setKey(k)
  }

  function markRead(id: number) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, is_read: true } : l))
  }

  async function markAllRead() {
    const unread = leads.filter(l => !l.is_read)
    if (unread.length === 0) return
    try {
      const results = await Promise.allSettled(
        unread.map(l =>
          fetch(`/api/leads`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "x-admin-key": key },
            body: JSON.stringify({ id: l.id }),
          })
        )
      )
      // "fulfilled" only means the request completed without a network error —
      // a 401/500 response still fulfills the promise, so it's checked too.
      // Without this, a lead could show as read in the UI when the server
      // never actually updated it.
      const successIds = new Set(
        unread.filter((_, i) => {
          const r = results[i]
          return r.status === "fulfilled" && r.value.ok
        }).map(l => l.id)
      )
      setLeads(prev => prev.map(l => successIds.has(l.id) ? { ...l, is_read: true } : l))
    } catch {
      setError("Failed to mark all as read. Please try again.")
    }
  }

  function exportCSV() {
    const header = ["ID", "Name", "Phone", "City", "Service", "Estimate", "Visit Time", "Chat Summary", "Read", "Date"]
    const rows = leads.map(l => [
      l.id, l.name, l.phone, l.city ?? "", l.service ?? "", l.estimate ?? "",
      l.preferred_time ?? "", l.chat_summary ?? "",
      l.is_read ? "Yes" : "No",
      new Date(l.created_at).toLocaleDateString("en-IN"),
    ])
    const csv = [header.map(csvEscape), ...rows.map(r => r.map(csvEscape))].map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `jk-leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function exportExcel() {
    const XLSX = await import("xlsx")
    const wb = XLSX.utils.book_new()
    const leadsData = [
      ["JK Interior — Leads Report", "", "", "", "", "", "", "", "", ""],
      [`Exported: ${new Date().toLocaleString("en-IN")}`, "", "", "", "", "", "", "", "", ""],
      [],
      ["#", "Name", "Phone", "City", "Service", "Estimate", "Preferred Visit", "Chat Summary", "Status", "Date"],
      ...leads.map((l, i) => [
        i + 1, l.name, l.phone, l.city ?? "—", l.service ?? "—", l.estimate ?? "—",
        l.preferred_time ?? "—", l.chat_summary ?? "—", l.is_read ? "Read" : "New",
        new Date(l.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      ]),
    ]
    const ws1 = XLSX.utils.aoa_to_sheet(leadsData)
    ws1["!cols"] = [{ wch: 4 }, { wch: 20 }, { wch: 14 }, { wch: 14 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 45 }, { wch: 8 }, { wch: 14 }]
    XLSX.utils.book_append_sheet(wb, ws1, "All Leads")
    XLSX.writeFile(wb, `jk-interior-leads-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  const filtered = leads.filter(l => {
    if (filter === "new" && l.is_read) return false
    if (filter === "read" && !l.is_read) return false
    if (search) {
      const q = search.toLowerCase()
      return l.name.toLowerCase().includes(q) || l.phone.includes(q) ||
        (l.city ?? "").toLowerCase().includes(q) || (l.service ?? "").toLowerCase().includes(q)
    }
    return true
  })

  const newCount = leads.filter(l => !l.is_read).length

  const noIndexHelmet = (
    <Helmet>
      <title>Admin – JK Interior</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  )

  if (!key) {
    return (
      <>
        {noIndexHelmet}
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0e1f3d 0%, #152742 100%)" }}>
        <div className="w-full max-w-sm mx-4">
          <div className="text-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-gold-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-black text-white">JK</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-sm text-white/50 mt-1">JK Interior — Lead Dashboard</p>
          </div>
          <form onSubmit={e => { e.preventDefault(); login() }} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
            <p className="text-sm text-white/70 mb-4 text-center">Enter admin password to continue</p>
            {error && <p className="text-red-400 text-sm text-center mb-3">{error}</p>}
            <input type="password" value={inputKey} onChange={e => setInputKey(e.target.value)}
              placeholder="Password" aria-label="Admin password" autoComplete="current-password"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-gold-400 mb-4"
              autoFocus />
            <button type="submit" className="w-full rounded-xl bg-gold-700 py-3 text-sm font-bold text-white hover:bg-gold-600 active:scale-95 transition-all">
              Login
            </button>
          </form>
        </div>
      </div>
      </>
    )
  }

  return (
    <>
      {noIndexHelmet}
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #faf7f0 0%, #f7f9f8 100%)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gold-700 flex items-center justify-center shrink-0">
                <span className="text-xs font-black text-white">JK</span>
              </div>
              <div>
                <p className="text-[13px] font-bold text-gray-800 leading-tight">Leads Dashboard</p>
                <p className="text-[11px] text-gray-500">JK Interior</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {newCount > 0 && <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">{newCount} new</span>}
              <button onClick={() => fetchLeads(key)} disabled={loading} className="rounded-xl border border-gray-200 px-3 py-1.5 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 active:scale-95 transition-all">
                {loading ? "…" : "↻ Refresh"}
              </button>
              {newCount > 0 && <button onClick={markAllRead} className="rounded-xl border border-gold-200 bg-gold-50 px-3 py-1.5 text-[11px] font-semibold text-gold-700 hover:bg-gold-100 active:scale-95 transition-all">✓ All Read</button>}
              <button onClick={exportExcel} className="rounded-xl border border-gold-300 bg-gold-50 px-3 py-1.5 text-[11px] font-semibold text-gold-700 hover:bg-gold-100 active:scale-95 transition-all">↓ Excel</button>
              <button onClick={exportCSV} className="rounded-xl border border-gray-200 px-3 py-1.5 text-[11px] font-semibold text-gray-500 hover:bg-gray-50 active:scale-95 transition-all">↓ CSV</button>
              <button onClick={() => { setKey(""); sessionStorage.removeItem(ADMIN_KEY_SESSION) }} className="rounded-xl border border-gray-200 px-3 py-1.5 text-[11px] font-semibold text-gray-500 hover:bg-gray-50 active:scale-95 transition-all">Logout</button>
            </div>
          </div>
          <div className="px-4 pb-3 space-y-2">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone, city…" aria-label="Search leads"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-[13px] text-gray-700 placeholder:text-gray-400 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 focus:bg-white transition-all" />
            <div className="flex gap-2">
              {(["all", "new", "read"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`flex-1 rounded-xl py-2 text-[11px] font-bold capitalize transition-all active:scale-95 ${filter === f ? "bg-gold-700 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                  {f === "all" ? `All (${leads.length})` : f === "new" ? `New (${newCount})` : `Read (${leads.length - newCount})`}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-4 py-4 space-y-3">
          {loading && <div className="flex items-center justify-center py-16"><div className="h-8 w-8 rounded-full border-2 border-gold-500 border-t-transparent animate-spin" /></div>}
          {error && !loading && <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-6 text-center"><p className="text-red-600 font-semibold">{error}</p></div>}
          {!loading && !error && filtered.length === 0 && (
            <div className="rounded-2xl bg-white border border-gray-100 px-4 py-12 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-500 font-medium">{search ? "No leads match your search." : "No leads yet."}</p>
              <p className="text-gray-500 text-sm mt-1">Leads from the chatbot will appear here.</p>
            </div>
          )}
          {!loading && filtered.map(lead => <LeadCard key={lead.id} lead={lead} onRead={markRead} adminKey={key} />)}
        </div>
      </div>
    </div>
    </>
  )
}
