"use client";

import { useMemo, useState } from "react";
import { QuoteForm } from "@/components/quote-form";

type ServiceOption = { slug: string; name: string; materialsUsed: string[] };

export function MaterialCalculator({ services }: { services: ServiceOption[] }) {
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(10);
  const [serviceSlug, setServiceSlug] = useState(services[0]?.slug ?? "");

  const service = services.find((s) => s.slug === serviceSlug) ?? services[0];
  const area = length * width;
  const perimeter = 2 * (length + width);

  const materials = useMemo(() => {
    if (!service) return [];
    const list: { label: string; quantity: string }[] = [
      { label: `${service.name} panels / boards`, quantity: `${Math.ceil(area * 1.1)} sq.ft (incl. ~10% cutting wastage)` },
    ];
    if (service.materialsUsed.some((m) => /channel|framework/i.test(m))) {
      list.push({ label: "GI channel framework", quantity: `${Math.ceil(perimeter * 1.5)} running ft (approx.)` });
    }
    if (service.materialsUsed.some((m) => /cove|led/i.test(m))) {
      list.push({ label: "LED cove lighting profile", quantity: `${Math.ceil(perimeter)} running ft (approx.)` });
    }
    list.push({ label: "Screws & fasteners", quantity: `${Math.ceil(area * 6)} pcs (approx.)` });
    return list;
  }, [service, area, perimeter]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="glass-card space-y-4 p-6">
        <div>
          <label className="text-sm font-semibold text-foreground" htmlFor="service">
            Service
          </label>
          <select
            id="service"
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
            className="glass-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
          >
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-foreground" htmlFor="length">
              Room Length (ft)
            </label>
            <input
              id="length"
              type="number"
              min={1}
              value={length}
              onChange={(e) => setLength(Number(e.target.value) || 0)}
              className="glass-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground" htmlFor="width">
              Room Width (ft)
            </label>
            <input
              id="width"
              type="number"
              min={1}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value) || 0)}
              className="glass-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-secondary p-5">
          <p className="text-center text-sm text-muted-foreground">
            {length}×{width} ft = <span className="font-bold text-foreground">{area} sq.ft</span> · Perimeter{" "}
            <span className="font-bold text-foreground">{perimeter} ft</span>
          </p>
          <ul className="mt-4 space-y-2">
            {materials.map((m) => (
              <li key={m.label} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-foreground">{m.label}</span>
                <span className="font-bold text-primary">{m.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            These are approximate quantities for budgeting. Our team confirms exact material needed during the free site visit.
          </p>
        </div>
      </div>

      <div>
        <QuoteForm defaultService={service?.name} />
      </div>
    </div>
  );
}
