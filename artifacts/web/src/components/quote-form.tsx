"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export function QuoteForm({ defaultCity, defaultService }: { defaultCity?: string; defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          city: form.get("city") || defaultCity,
          service: form.get("service") || defaultService,
          source: "quote-form",
          website: form.get("website"),
        }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-card p-6 text-center">
        <p className="font-serif text-lg font-bold text-primary">Thank you!</p>
        <p className="mt-1 text-sm text-muted-foreground">Our team will call you shortly to schedule your free site visit.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-card space-y-3 p-6">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-foreground">
          Name
        </label>
        <input id="name" name="name" required className="glass-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm" placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-semibold text-foreground">
          Phone
        </label>
        <input id="phone" name="phone" required type="tel" className="glass-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm" placeholder="10-digit mobile number" />
      </div>
      <div>
        <label htmlFor="city" className="text-sm font-semibold text-foreground">
          City
        </label>
        <input id="city" name="city" defaultValue={defaultCity} className="glass-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm" placeholder="Your city" />
      </div>
      <div>
        <label htmlFor="service" className="text-sm font-semibold text-foreground">
          Service needed
        </label>
        <input id="service" name="service" defaultValue={defaultService} className="glass-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm" placeholder="e.g. PVC false ceiling" />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl gold-gradient px-4 py-3 text-sm font-bold text-white shadow-sm hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Get Free Quote"}
      </button>
      {status === "error" && <p className="text-sm text-destructive">Something went wrong. Please call us directly.</p>}
    </form>
  );
}
