"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { QuoteForm } from "@/components/quote-form";

type ServiceOption = { slug: string; name: string; priceRangeMin: number; priceRangeMax: number; priceUnit: string };

type Room = { id: number; label: string; serviceSlug: string; length: number; width: number };

let nextId = 1;

function newRoom(defaultServiceSlug: string): Room {
  return { id: nextId++, label: `Room ${nextId - 1}`, serviceSlug: defaultServiceSlug, length: 12, width: 10 };
}

export function EstimateCalculator({ services }: { services: ServiceOption[] }) {
  const defaultSlug = services[0]?.slug ?? "";
  const [rooms, setRooms] = useState<Room[]>([newRoom(defaultSlug)]);

  function addRoom() {
    setRooms((prev) => [...prev, newRoom(defaultSlug)]);
  }

  function removeRoom(id: number) {
    setRooms((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  function updateRoom(id: number, patch: Partial<Room>) {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  const lineItems = useMemo(
    () =>
      rooms.map((room) => {
        const service = services.find((s) => s.slug === room.serviceSlug);
        const sqft = room.length * room.width;
        const canEstimate = service && service.priceUnit === "sq.ft";
        const round = (n: number) => Math.round(n / 100) * 100;
        const low = canEstimate ? round(sqft * service!.priceRangeMin) : null;
        const high = canEstimate ? round(sqft * service!.priceRangeMax) : null;
        return { room, service, sqft, low, high };
      }),
    [rooms, services],
  );

  const total = lineItems.reduce(
    (acc, item) => ({
      low: acc.low + (item.low ?? 0),
      high: acc.high + (item.high ?? 0),
      hasCustom: acc.hasCustom || item.low === null,
    }),
    { low: 0, high: 0, hasCustom: false },
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        {rooms.map((room, i) => {
          const service = services.find((s) => s.slug === room.serviceSlug);
          const sqft = room.length * room.width;
          return (
            <div key={room.id} className="glass-card space-y-3 p-5">
              <div className="flex items-center justify-between">
                <input
                  value={room.label}
                  onChange={(e) => updateRoom(room.id, { label: e.target.value })}
                  className="w-1/2 border-b border-border bg-transparent text-sm font-bold text-foreground outline-none"
                  aria-label={`Room ${i + 1} name`}
                />
                {rooms.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRoom(room.id)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Remove room"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <select
                value={room.serviceSlug}
                onChange={(e) => updateRoom(room.id, { serviceSlug: e.target.value })}
                className="glass-input w-full rounded-xl px-4 py-2.5 text-sm"
              >
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min={1}
                  value={room.length}
                  onChange={(e) => updateRoom(room.id, { length: Number(e.target.value) || 0 })}
                  className="glass-input rounded-xl px-4 py-2.5 text-sm"
                  aria-label="Length (ft)"
                  placeholder="Length (ft)"
                />
                <input
                  type="number"
                  min={1}
                  value={room.width}
                  onChange={(e) => updateRoom(room.id, { width: Number(e.target.value) || 0 })}
                  className="glass-input rounded-xl px-4 py-2.5 text-sm"
                  aria-label="Width (ft)"
                  placeholder="Width (ft)"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {sqft} sq.ft ·{" "}
                {service && service.priceUnit === "sq.ft" ? (
                  <span className="font-bold text-primary">
                    ₹{Math.round((sqft * service.priceRangeMin) / 100) * 100}–₹{Math.round((sqft * service.priceRangeMax) / 100) * 100}
                  </span>
                ) : (
                  "custom quote"
                )}
              </p>
            </div>
          );
        })}
        <button
          type="button"
          onClick={addRoom}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm font-bold text-primary hover:bg-secondary"
        >
          <Plus className="h-4 w-4" /> Add another room
        </button>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 text-center">
          <p className="text-sm text-muted-foreground">Total estimate across {rooms.length} room{rooms.length > 1 ? "s" : ""}</p>
          <p className="mt-2 font-serif text-3xl font-bold text-primary">
            ₹{total.low.toLocaleString("en-IN")} – ₹{total.high.toLocaleString("en-IN")}
            {total.hasCustom && "+"}
          </p>
          {total.hasCustom && <p className="mt-2 text-xs text-muted-foreground">Some selected services are quoted per project and are not included above.</p>}
          <p className="mt-2 text-xs text-muted-foreground">Final pricing depends on design and site conditions. Free site visit gives an accurate quotation.</p>
        </div>
        <QuoteForm defaultService={`Multi-room: ${rooms.map((r) => r.label).join(", ")}`} />
      </div>
    </div>
  );
}
