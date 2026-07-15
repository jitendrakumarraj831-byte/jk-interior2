"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Printer, MessageCircle, Pencil } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

type ServiceOption = { slug: string; name: string; priceRangeMin: number; priceRangeMax: number; priceUnit: string };

type LineItem = { id: number; description: string; quantity: number; unit: string; rate: number };

let nextId = 1;

function newLineItem(description = "", quantity = 100, unit = "sq.ft", rate = 100): LineItem {
  return { id: nextId++, description, quantity, unit, rate };
}

export function QuotationGenerator({ services }: { services: ServiceOption[] }) {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    newLineItem(services[0]?.name ?? "", 100, services[0]?.priceUnit ?? "sq.ft", services[0]?.priceRangeMin ?? 100),
  ]);

  const quotationNo = useMemo(() => `JK-${new Date().getFullYear()}${String(Date.now()).slice(-5)}`, []);
  const quotationDate = useMemo(() => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }), []);

  function addItem() {
    setItems((prev) => [...prev, newLineItem()]);
  }

  function removeItem(id: number) {
    setItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));
  }

  function updateItem(id: number, patch: Partial<LineItem>) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }

  function applyService(id: number, slug: string) {
    const service = services.find((s) => s.slug === slug);
    if (!service) return;
    updateItem(id, { description: service.name, unit: service.priceUnit, rate: service.priceRangeMin });
  }

  const total = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);

  function shareOnWhatsApp() {
    const lines = [
      `*${BUSINESS.name} — Quotation ${quotationNo}*`,
      customerName ? `Customer: ${customerName}` : "",
      "",
      ...items.map((i) => `${i.description} — ${i.quantity} ${i.unit} x ₹${i.rate} = ₹${(i.quantity * i.rate).toLocaleString("en-IN")}`),
      "",
      `*Total: ₹${total.toLocaleString("en-IN")}*`,
      "",
      `Valid for 15 days. Call ${BUSINESS.phone1} to confirm.`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(lines)}`, "_blank", "noopener,noreferrer");
  }

  if (mode === "edit") {
    return (
      <div className="space-y-6">
        <div className="glass-card grid grid-cols-1 gap-4 p-6 sm:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-foreground" htmlFor="customerName">
              Customer Name
            </label>
            <input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="glass-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
              placeholder="Customer name"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground" htmlFor="customerPhone">
              Phone
            </label>
            <input
              id="customerPhone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="glass-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
              placeholder="10-digit mobile number"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground" htmlFor="customerAddress">
              Site Address
            </label>
            <input
              id="customerAddress"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="glass-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
              placeholder="City / area"
            />
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="glass-card grid grid-cols-1 gap-3 p-5 sm:grid-cols-[1.1fr_1.3fr_0.7fr_0.7fr_0.9fr_auto]">
              <select
                value={services.find((s) => s.name === item.description)?.slug ?? ""}
                onChange={(e) => applyService(item.id, e.target.value)}
                className="glass-input min-w-0 rounded-xl px-3 py-2 text-sm"
              >
                <option value="">Custom item</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input
                value={item.description}
                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                className="glass-input min-w-0 rounded-xl px-3 py-2 text-sm"
                placeholder="Description"
              />
              <input
                type="number"
                min={0}
                value={item.quantity}
                onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) || 0 })}
                className="glass-input min-w-0 rounded-xl px-3 py-2 text-sm"
                aria-label="Quantity"
                placeholder="Qty"
              />
              <input
                value={item.unit}
                onChange={(e) => updateItem(item.id, { unit: e.target.value })}
                className="glass-input min-w-0 rounded-xl px-3 py-2 text-sm"
                aria-label="Unit"
                placeholder="Unit"
              />
              <input
                type="number"
                min={0}
                value={item.rate}
                onChange={(e) => updateItem(item.id, { rate: Number(e.target.value) || 0 })}
                className="glass-input min-w-0 rounded-xl px-3 py-2 text-sm"
                aria-label="Rate (₹)"
                placeholder="Rate ₹"
              />
              <div className="flex min-w-0 items-center justify-between gap-2 text-sm font-bold text-primary sm:justify-end">
                <span className="truncate">₹{(item.quantity * item.rate).toLocaleString("en-IN")}</span>
                {items.length > 1 && (
                  <button type="button" onClick={() => removeItem(item.id)} className="shrink-0 text-muted-foreground hover:text-destructive" aria-label="Remove item">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm font-bold text-primary hover:bg-secondary"
          >
            <Plus className="h-4 w-4" /> Add line item
          </button>
        </div>

        <div className="glass-card flex items-center justify-between p-6">
          <span className="font-serif text-lg font-bold text-foreground">Total</span>
          <span className="font-serif text-2xl font-bold text-primary">₹{total.toLocaleString("en-IN")}</span>
        </div>

        <button
          type="button"
          onClick={() => setMode("preview")}
          className="w-full rounded-xl gold-gradient px-4 py-3.5 text-sm font-bold text-white shadow-sm hover:opacity-90"
        >
          Generate Quotation →
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="no-print mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setMode("edit")}
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground hover:bg-secondary"
        >
          <Pencil className="h-4 w-4" /> Edit
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground hover:bg-secondary"
        >
          <Printer className="h-4 w-4" /> Print / Save as PDF
        </button>
        <button
          type="button"
          onClick={shareOnWhatsApp}
          className="flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" /> Share on WhatsApp
        </button>
      </div>

      <div className="glass-card p-8">
        <div className="flex items-start justify-between gap-4 border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt={BUSINESS.name} width={48} height={48} className="rounded-lg" />
            <div>
              <p className="font-serif text-xl font-bold text-foreground">{BUSINESS.name}</p>
              <p className="text-xs text-muted-foreground">{BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.district}, {BUSINESS.address.state}</p>
              <p className="text-xs text-muted-foreground">{BUSINESS.phone1} · {BUSINESS.email}</p>
            </div>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <p className="font-bold text-foreground">Quotation #{quotationNo}</p>
            <p>Date: {quotationDate}</p>
          </div>
        </div>

        {(customerName || customerPhone || customerAddress) && (
          <div className="border-b border-border py-4 text-sm">
            <p className="font-bold text-foreground">Bill To</p>
            {customerName && <p className="text-muted-foreground">{customerName}</p>}
            {customerPhone && <p className="text-muted-foreground">{customerPhone}</p>}
            {customerAddress && <p className="text-muted-foreground">{customerAddress}</p>}
          </div>
        )}

        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="py-2">Description</th>
              <th className="py-2 text-right">Qty</th>
              <th className="py-2 text-right">Unit</th>
              <th className="py-2 text-right">Rate (₹)</th>
              <th className="py-2 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border/60">
                <td className="py-3 text-foreground">{item.description || "—"}</td>
                <td className="py-3 text-right text-muted-foreground">{item.quantity}</td>
                <td className="py-3 text-right text-muted-foreground">{item.unit}</td>
                <td className="py-3 text-right text-muted-foreground">{item.rate.toLocaleString("en-IN")}</td>
                <td className="py-3 text-right font-bold text-foreground">{(item.quantity * item.rate).toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <div className="w-full max-w-xs space-y-1 text-sm">
            <div className="flex justify-between font-serif text-lg font-bold text-foreground">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          This is an estimated quotation valid for 15 days from the date above. Final pricing is confirmed after a free site visit. Prices exclude GST unless
          stated. 1-year workmanship warranty applies as per {BUSINESS.name} terms.
        </p>
      </div>
    </div>
  );
}
