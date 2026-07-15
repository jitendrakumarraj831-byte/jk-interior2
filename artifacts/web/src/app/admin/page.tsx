"use client";

import { useCallback, useEffect, useState } from "react";

interface Lead {
  id: number;
  name: string;
  phone: string;
  city: string | null;
  service: string | null;
  estimate: string | null;
  preferredTime: string | null;
  chatSummary: string | null;
  isRead: boolean;
  createdAt: string;
}

const ADMIN_KEY_SESSION = "jk_admin_key";

function normalizeIndianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const local = digits.replace(/^(?:91|0)/, "").slice(-10);
  return `91${local}`;
}

function waLink(lead: Lead) {
  const msg = [
    `Namaste ${lead.name} ji!`,
    `Main JK Interior se call kar raha hoon.`,
    lead.service ? `Aapne ${lead.service} ke baare mein inquiry ki thi.` : "",
    `Free site visit ke liye kab aana theek rahega?`,
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${normalizeIndianPhone(lead.phone)}?text=${encodeURIComponent(msg)}`;
}

function csvEscape(val: unknown): string {
  const s = String(val ?? "").replace(/^([=+\-@])/, "'$1").replace(/"/g, '""');
  return `"${s}"`;
}

function fmt(iso: string) {
  const d = new Date(iso);
  const diffH = (Date.now() - d.getTime()) / 3600000;
  if (diffH < 1) return `${Math.round(diffH * 60)}m ago`;
  if (diffH < 24) return `${Math.round(diffH)}h ago`;
  if (diffH < 48) return "Yesterday";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function LeadCard({ lead, onRead, adminKey }: { lead: Lead; onRead: (id: number) => void; adminKey: string }) {
  const [marking, setMarking] = useState(false);

  async function markRead() {
    if (lead.isRead || marking) return;
    setMarking(true);
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ id: lead.id }),
      });
      onRead(lead.id);
    } finally {
      setMarking(false);
    }
  }

  return (
    <div className={`rounded-2xl border bg-white shadow-sm overflow-hidden ${lead.isRead ? "opacity-70 border-gray-100" : "border-emerald-200"}`}>
      <div className={`px-4 py-3 flex items-center justify-between ${lead.isRead ? "bg-gray-50" : "bg-gradient-to-r from-emerald-600 to-emerald-500"}`}>
        <div>
          <p className={`text-sm font-bold ${lead.isRead ? "text-gray-700" : "text-white"}`}>{lead.name}</p>
          <p className={`text-xs ${lead.isRead ? "text-gray-400" : "text-white/70"}`}>{fmt(lead.createdAt)}</p>
        </div>
        {!lead.isRead && <span className="h-2 w-2 rounded-full bg-amber-400" />}
      </div>
      <div className="px-4 py-3 space-y-1 text-xs text-gray-600">
        <p>📱 {lead.phone}</p>
        <p>📍 {lead.city ?? "—"}</p>
        <p>🔧 {lead.service ?? "—"}</p>
        {lead.chatSummary && <p className="italic">💬 {lead.chatSummary}</p>}
      </div>
      <div className="px-4 pb-4 flex gap-2">
        <a
          href={waLink(lead)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={markRead}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2.5 text-xs font-bold text-white"
        >
          WhatsApp
        </a>
        <a href={`tel:${lead.phone}`} onClick={markRead} className="flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700">
          Call
        </a>
        {!lead.isRead && (
          <button onClick={markRead} disabled={marking} className="rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-500 disabled:opacity-50">
            ✓ Read
          </button>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "new" | "read">("all");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(ADMIN_KEY_SESSION);
      if (saved) setKey(saved);
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const fetchLeads = useCallback(async (k: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", { headers: { "x-admin-key": k } });
      if (res.status === 401) {
        setError("Wrong password.");
        setKey("");
        sessionStorage.removeItem(ADMIN_KEY_SESSION);
        return;
      }
      const data = await res.json();
      if (!data.ok) {
        setError("Failed to load leads.");
        return;
      }
      setLeads(data.leads);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (key) fetchLeads(key);
  }, [key, fetchLeads]);

  function login() {
    const k = inputKey.trim();
    if (!k) return;
    sessionStorage.setItem(ADMIN_KEY_SESSION, k);
    setKey(k);
  }

  function markRead(id: number) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, isRead: true } : l)));
  }

  function exportCSV() {
    const header = ["ID", "Name", "Phone", "City", "Service", "Read", "Date"];
    const rows = leads.map((l) => [l.id, l.name, l.phone, l.city ?? "", l.service ?? "", l.isRead ? "Yes" : "No", new Date(l.createdAt).toLocaleDateString("en-IN")]);
    const csv = [header.map(csvEscape), ...rows.map((r) => r.map(csvEscape))].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jk-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = leads.filter((l) => {
    if (filter === "new" && l.isRead) return false;
    if (filter === "read" && !l.isRead) return false;
    if (search) {
      const q = search.toLowerCase();
      return l.name.toLowerCase().includes(q) || l.phone.includes(q) || (l.city ?? "").toLowerCase().includes(q) || (l.service ?? "").toLowerCase().includes(q);
    }
    return true;
  });

  const newCount = leads.filter((l) => !l.isRead).length;

  if (!key) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0e1f3d 0%, #152742 100%)" }}>
        <div className="w-full max-w-sm mx-4">
          <div className="text-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-black text-white">JK</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-sm text-white/50 mt-1">JK Interior — Leads Dashboard</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10"
          >
            <p className="text-sm text-white/70 mb-4 text-center">Enter admin password to continue</p>
            {error && <p className="text-red-400 text-sm text-center mb-3">{error}</p>}
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-emerald-400 mb-4"
              autoFocus
            />
            <button type="submit" className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f7f9f8 100%)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-sm font-bold text-gray-800">Leads Dashboard</p>
              <p className="text-xs text-gray-400">JK Interior</p>
            </div>
            <div className="flex items-center gap-2">
              {newCount > 0 && <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">{newCount} new</span>}
              <button onClick={() => fetchLeads(key)} disabled={loading} className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 disabled:opacity-50">
                {loading ? "…" : "↻ Refresh"}
              </button>
              <button onClick={exportCSV} className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-500">
                ↓ CSV
              </button>
              <button
                onClick={() => {
                  setKey("");
                  sessionStorage.removeItem(ADMIN_KEY_SESSION);
                }}
                className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-500"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="px-4 pb-3 space-y-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, city…"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-emerald-400"
            />
            <div className="flex gap-2">
              {(["all", "new", "read"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold capitalize ${filter === f ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-500"}`}
                >
                  {f === "all" ? `All (${leads.length})` : f === "new" ? `New (${newCount})` : `Read (${leads.length - newCount})`}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-4 py-4 space-y-3">
          {loading && <div className="flex justify-center py-16"><div className="h-8 w-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" /></div>}
          {error && !loading && <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-6 text-center text-red-600 font-semibold">{error}</div>}
          {!loading && !error && filtered.length === 0 && (
            <div className="rounded-2xl bg-white border border-gray-100 px-4 py-12 text-center">
              <p className="text-gray-500 font-medium">{search ? "No leads match your search." : "No leads yet."}</p>
            </div>
          )}
          {!loading && filtered.map((lead) => <LeadCard key={lead.id} lead={lead} onRead={markRead} adminKey={key} />)}
        </div>
      </div>
    </div>
  );
}
