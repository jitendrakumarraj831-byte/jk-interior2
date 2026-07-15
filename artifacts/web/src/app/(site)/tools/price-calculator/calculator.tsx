"use client";

import { useMemo, useState } from "react";
import { QuoteForm } from "@/components/quote-form";

type ServiceOption = { slug: string; name: string; priceRangeMin: number; priceRangeMax: number; priceUnit: string };

export function PriceCalculator({ services }: { services: ServiceOption[] }) {
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(10);
  const [serviceSlug, setServiceSlug] = useState(services[0]?.slug ?? "");

  const service = services.find((s) => s.slug === serviceSlug) ?? services[0];
  const sqft = length * width;

  const estimate = useMemo(() => {
    if (!service || service.priceUnit !== "sq.ft") return null;
    const round = (n: number) => Math.round((n / 100)) * 100;
    return {
      low: round(sqft * service.priceRangeMin),
      high: round(sqft * service.priceRangeMax),
    };
  }, [service, sqft]);

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

        <div className="rounded-2xl bg-secondary p-5 text-center">
          <p className="text-sm text-muted-foreground">
            {length}×{width} ft = <span className="font-bold text-foreground">{sqft} sq.ft</span>
          </p>
          {estimate ? (
            <p className="mt-2 font-serif text-2xl font-bold text-primary">
              ₹{estimate.low.toLocaleString("en-IN")} – ₹{estimate.high.toLocaleString("en-IN")}
            </p>
          ) : (
            <p className="mt-2 text-sm font-bold text-foreground">This service is quoted per project — request a custom quote below.</p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">Exact pricing depends on design and lighting. Free site visit gives an accurate quotation.</p>
        </div>
      </div>

      <div>
        <QuoteForm defaultService={service?.name} />
      </div>
    </div>
  );
}
