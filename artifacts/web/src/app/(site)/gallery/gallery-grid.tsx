"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type GalleryItem = {
  id: number;
  imageUrl: string;
  altText: string;
  materialTag: string;
  spaceType: string;
  project: { slug: string };
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [material, setMaterial] = useState<string>("all");
  const [spaceType, setSpaceType] = useState<string>("all");

  const materials = useMemo(() => ["all", ...Array.from(new Set(items.map((i) => i.materialTag)))], [items]);
  const spaceTypes = useMemo(() => ["all", ...Array.from(new Set(items.map((i) => i.spaceType)))], [items]);

  const filtered = items.filter((i) => (material === "all" || i.materialTag === material) && (spaceType === "all" || i.spaceType === spaceType));

  return (
    <div>
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-wrap gap-2">
          {materials.map((m) => (
            <button
              key={m}
              onClick={() => setMaterial(m)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold capitalize transition-colors ${
                material === m ? "gold-gradient text-white" : "bg-secondary text-foreground/70 hover:bg-accent"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {spaceTypes.map((s) => (
            <button
              key={s}
              onClick={() => setSpaceType(s)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold capitalize transition-colors ${
                spaceType === s ? "gold-gradient text-white" : "bg-secondary text-foreground/70 hover:bg-accent"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item) => (
          <Link key={item.id} href={`/projects/${item.project.slug}`} className="group relative aspect-square overflow-hidden rounded-2xl">
            <Image src={item.imageUrl} alt={item.altText} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-black/50 px-2 py-1 text-center text-xs font-bold capitalize text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.materialTag} · {item.spaceType}
            </span>
          </Link>
        ))}
        {filtered.length === 0 && <p className="col-span-full py-12 text-center text-muted-foreground">No images match this filter yet.</p>}
      </div>
    </div>
  );
}
