import { useCallback, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Activity, BarChart3, Building2, ChevronDown, CircleAlert, ExternalLink, Gauge, MapPin, MessageSquare, Plus, RefreshCw, Settings2, ShieldCheck, Star, Unplug, Users } from "lucide-react"

type Status = { connected: boolean; email?: string; selectedAccountName?: string | null; selectedLocationName?: string | null }
type Account = { name?: string; accountName?: string; accountNumber?: string; type?: string }
type Location = { name?: string; title?: string; storeCode?: string; metadata?: { mapsUri?: string } }

const cards = [
  [Building2, "Business Profile", "Manage profile details and visibility"],
  [MapPin, "Location", "Choose the location to automate"],
  [Star, "Reviews", "Monitor and prepare responses"],
  [Gauge, "Performance", "Search and customer actions"],
  [MessageSquare, "Posts", "Draft posts for explicit publishing"],
  [Settings2, "Automation Status", "Review safe automation settings"],
] as const

async function api(path: string, init?: RequestInit) {
  const response = await fetch(path, { ...init, credentials: "include", headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) } })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error ?? "Request failed")
  return data
}

function MetricCard({ icon: Icon, title, description }: { icon: typeof Building2; title: string; description: string }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-start justify-between gap-4"><div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon className="size-5" /></div><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Ready</span></div>
    <h3 className="mt-5 text-sm font-bold text-slate-900">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
  </article>
}

export default function GBPPage() {
  const [status, setStatus] = useState<Status | null>(null)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedAccount, setSelectedAccount] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const load = useCallback(async () => {
    setLoading(true); setError("")
    try {
      const next = await api("/api/google/status")
      setStatus(next)
      if (next.connected) {
        const accountData = await api("/api/google/accounts")
        setAccounts(accountData.accounts ?? [])
      }
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to load Google Business Profile status.") }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { void load() }, [load])
  useEffect(() => {
    if (!selectedAccount) return
    void api(`/api/google/locations?account=${encodeURIComponent(selectedAccount)}`).then((data) => setLocations(data.locations ?? [])).catch((err) => setError(err instanceof Error ? err.message : "Unable to load locations."))
  }, [selectedAccount])

  async function disconnect() {
    if (!window.confirm("Disconnect Google Business Profile? This removes the stored server-side refresh token and stops dashboard access until you reconnect.")) return
    await api("/api/google/disconnect", { method: "POST" }); setAccounts([]); setLocations([]); setStatus({ connected: false });
  }

  return <>
    <Helmet><title>GBP Automation – JK Interior</title><meta name="robots" content="noindex, nofollow" /></Helmet>
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-blue-700 text-white"><Building2 className="size-5" /></div><div><p className="text-sm font-black tracking-tight">JK Interior</p><p className="text-xs text-slate-500">Google Business Profile Automation</p></div></div>
        <div className="flex items-center gap-2"><button onClick={() => void load()} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"><RefreshCw className="size-3.5" /> Refresh</button><a href="/" className="hidden text-xs font-semibold text-slate-500 hover:text-blue-700 sm:inline-flex">View website <ExternalLink className="ml-1 size-3.5" /></a></div>
      </div></header>
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-8 sm:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Admin workspace</p><h1 className="text-3xl font-black tracking-tight sm:text-4xl">Good morning, JK Interior.</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">A safe control center for your business profile. Nothing is published or changed without an explicit action.</p></div><div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800"><ShieldCheck className="size-4" /> Admin-only workspace</div></section>
        {error && <div role="alert" className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><CircleAlert className="mt-0.5 size-4 shrink-0" /><div><p className="font-semibold">{error}</p><p className="mt-1 text-xs text-amber-700">Check your Google Cloud API access and reconnect if the connection has expired.</p></div></div>}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><div className="flex items-center gap-2"><span className={`size-2.5 rounded-full ${status?.connected ? "bg-emerald-500" : "bg-slate-300"}`} /><h2 className="font-bold">Google Account</h2></div><p className="mt-2 text-sm text-slate-500">{loading ? "Checking secure connection…" : status?.connected ? status.email : "Not connected to Google Business Profile"}</p></div><div className="flex flex-wrap gap-2">{status?.connected ? <><button onClick={() => { window.location.href = "/api/google/auth" }} className="rounded-lg bg-blue-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-800">Reconnect</button><button onClick={() => void disconnect()} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"><Unplug className="size-3.5" /> Disconnect</button></> : <button onClick={() => { window.location.href = "/api/google/auth" }} className="rounded-lg bg-blue-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-800">Connect Google Business Profile</button>}</div></div></section>
        {status?.connected && <section className="grid gap-5 lg:grid-cols-[1fr_1fr]"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-bold">Business Profile accounts</h2><p className="mt-1 text-xs text-slate-500">Select an account to load live locations.</p></div><Users className="size-5 text-slate-400" /></div><div className="relative"><select aria-label="Business Profile account" value={selectedAccount} onChange={(event) => setSelectedAccount(event.target.value)} className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 pr-9 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"><option value="">Choose an account</option>{accounts.map((account) => <option key={account.name} value={account.name}>{account.accountName ?? account.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3.5 size-4 text-slate-400" /></div>{accounts.length === 0 && <p className="mt-4 text-sm text-slate-500">No accounts returned. Confirm the Business Profile APIs are enabled for this project.</p>}</div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-bold">Locations</h2><p className="mt-1 text-xs text-slate-500">Live locations available to this account.</p></div><MapPin className="size-5 text-slate-400" /></div>{locations.length ? <div className="flex flex-col gap-2">{locations.map((location) => <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3" key={location.name}><div><p className="text-sm font-semibold">{location.title ?? "Untitled location"}</p><p className="mt-1 text-xs text-slate-500">{location.name}</p></div><span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-slate-500">Available</span></div>)}</div> : <div className="flex min-h-24 items-center justify-center rounded-xl border border-dashed border-slate-200 text-center text-sm text-slate-500">Choose an account to see locations.</div>}</div></section>}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([icon, title, description]) => <MetricCard key={title} icon={icon} title={title} description={description} />)}</section>
        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700"><BarChart3 className="size-4" /></div><div><h2 className="font-bold">Performance overview</h2><p className="text-xs text-slate-500">Metrics will appear after a location is selected.</p></div></div><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{["Search impressions", "Website clicks", "Phone calls", "Direction requests"].map((label) => <div key={label} className="rounded-xl bg-slate-50 p-3"><p className="text-[11px] leading-4 text-slate-500">{label}</p><p className="mt-3 text-xl font-black text-slate-300">—</p></div>)}</div></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-3"><Activity className="size-5 text-blue-700" /><div><h2 className="font-bold">Activity log</h2><p className="text-xs text-slate-500">Recent protected admin actions.</p></div></div><p className="mt-6 text-sm text-slate-500">Your connection activity will appear here.</p></div></section>
      </div>
    </main>
  </>
}
