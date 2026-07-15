"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/cards";
import type { Project, City, District } from "@workspace/db/schema";

type ProjectWithRelations = Project & { city?: (City & { district?: District | null }) | null };

export function ProjectsGrid({ projects, initialMaterial, initialSpaceType }: { projects: ProjectWithRelations[]; initialMaterial?: string; initialSpaceType?: string }) {
  const [material, setMaterial] = useState<string>(initialMaterial && initialMaterial.length ? initialMaterial : "all");
  const [spaceType, setSpaceType] = useState<string>(initialSpaceType && initialSpaceType.length ? initialSpaceType : "all");

  const materials = useMemo(() => ["all", ...Array.from(new Set(projects.flatMap((p) => p.materialTags)))], [projects]);
  const spaceTypes = useMemo(() => ["all", ...Array.from(new Set(projects.map((p) => p.spaceType)))], [projects]);

  const filtered = projects.filter(
    (p) => (material === "all" || p.materialTags.includes(material)) && (spaceType === "all" || p.spaceType === spaceType),
  );

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

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        {filtered.length === 0 && <p className="col-span-full py-12 text-center text-muted-foreground">No projects match this filter yet.</p>}
      </div>
    </div>
  );
}
