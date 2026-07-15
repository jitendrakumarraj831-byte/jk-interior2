"use client";

import { useState } from "react";
import Image from "next/image";

export function BeforeAfterSlider({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="glass-card overflow-hidden p-2">
      <div className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl">
        <Image src={after} alt={`${alt} — after`} fill className="object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <Image src={before} alt={`${alt} — before`} fill className="object-cover" />
        </div>
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-lg" style={{ left: `${position}%` }} />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white">Before</span>
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white">After</span>
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label="Drag to compare before and after"
          className="absolute inset-x-0 bottom-3 mx-auto w-2/3 accent-primary"
        />
      </div>
    </div>
  );
}
