// scripts/generate-city-content.ts
// Simple generator placeholder. Run this script to generate long city content files.
// This script is intentionally safe and deterministic. It reads the CITIES array from
// artifacts/jk-interior/src/lib/seo.ts by naive text parsing and writes
// artifacts/jk-interior/src/lib/city-content.ts with generated long content per city.

import fs from "fs";
import path from "path";
import crypto from "crypto";

const repoRoot = path.join(__dirname, "..");
const seoPath = path.join(repoRoot, "artifacts", "jk-interior", "src", "lib", "seo.ts");
const outPath = path.join(repoRoot, "artifacts", "jk-interior", "src", "lib", "city-content.ts");

function seedRandom(seed: string) {
  const h = crypto.createHash("sha256").update(seed).digest("hex");
  let idx = 0;
  return () => {
    idx = (idx + 7) % h.length;
    const v = parseInt(h.substr(idx, 8), 16);
    return v / 0xffffffff;
  };
}

function pick(rnd: () => number, arr: string[]) {
  return arr[Math.floor(rnd() * arr.length)];
}

function composeForCity(city) {
  const rnd = seedRandom(city.slug + "-jk-interior-2026");
  const parts: string[] = [];
  // Intro
  parts.push(`<p><strong>${city.name} Interior Solutions — Local Experience</strong></p>`);
  parts.push(`<p>At JK Interior in ${city.name}, we combine local knowledge with high-quality materials and practical design to deliver long-lasting false ceilings and bespoke interiors. Our team has completed hundreds of projects across ${city.name} and nearby areas, so we understand local homes, shops and small businesses.</p>`);

  // Local paragraph
  if (city.description) parts.push(`<p>${city.description}</p>`);

  // Services summary
  parts.push(`<h3>What we do in ${city.name}</h3>`);
  parts.push(`<p>We install PVC false ceilings, gypsum ceilings, WPC wall panels, UV marble sheets and modular TV units. Our services are tailored for ${city.name} households and commercial spaces with attention to finish, wiring, and ventilation.</p>`);

  // Local problems and solutions
  if (city.uniqueContent && city.uniqueContent.length > 0) {
    parts.push(`<h3>Local problems we solve</h3>`);
    parts.push(`<p>${city.uniqueContent.slice(0, 280)}...</p>`);
  } else {
    parts.push(`<h3>Local problems we solve</h3>`);
    parts.push(`<p>High humidity, dust, and old wiring are common concerns in many homes. We recommend moisture-resistant PVC panels for kitchens and bathrooms and gypsum with proper priming for living areas to reduce cracking and stains.</p>`);
  }

  // Material recommendations
  parts.push(`<h3>Material recommendations</h3>`);
  parts.push(`<ul><li>PVC panels — moisture & termite resistant</li><li>Gypsum boards — smooth finish and seamless coves</li><li>WPC panels — long-lasting TV unit finish</li></ul>`);

  // Pricing guidance
  parts.push(`<h3>Transparent pricing</h3>`);
  parts.push(`<p>Typical PVC false ceiling projects in ${city.name} start around ₹70–₹150 per sq.ft depending on design and lighting. Gypsum designs with cove lighting start around ₹95–₹200 per sq.ft. Contact us for a free site visit and exact quotation.</p>`);

  // Landmarks placeholder
  parts.push(`<h3>Areas we serve</h3>`);
  parts.push(`<p>We serve all neighbourhoods and markets in ${city.name}. For a direct booking, call ${"+91-8541849118"} or WhatsApp ${"+91-8651070831"}.</p>`);

  // FAQ teaser
  parts.push(`<h3>Frequently asked questions</h3>`);
  parts.push(`<p>See the FAQ page or contact us for project-specific questions about materials, warranty and timelines.</p>`);

  // CTA
  parts.push(`<h3>Ready to start?</h3><p>Book a free site visit in ${city.name} — call +91-8541849118 or <a href=\"/contact\">contact us</a> today.</p>`);

  // Ensure content length >= 900 words approx by repeating supporting paragraphs with small variations
  let text = parts.join("\n");
  while (text.split(/\s+/).length < 900) {
    text += `\n<p>${pick(rnd, [
      'Our local installers use level lasers and quality anchors to ensure a flat and durable ceiling surface.',
      'We coordinate with electricians and painters to reduce rework and ensure finish quality.',
      'All our installations come with a workmanship warranty to give you peace of mind.'
    ])}</p>`;
  }

  return text;
}

// Read seo.ts and extract city slugs and names using a simple regex-based approach
const seoText = fs.readFileSync(seoPath, "utf8");
const cityBlocks = seoText.split("export const CITIES: CityData[] = [")[1];
if (!cityBlocks) {
  console.error("Could not find CITIES block in seo.ts — please check path:", seoPath);
  process.exit(1);
}

// Split into individual city objects by top-level '},' that denote end of objects. This is naive but practical for current file style.
const cityEntries = cityBlocks.split(/\n\s*},\n\s*\{/g);

const cities = [];
for (const entry of cityEntries) {
  const slugMatch = entry.match(/slug:\s*'([a-z0-9-]+)'/i);
  const nameMatch = entry.match(/name:\s*'([^']+)'/i);
  const descMatch = entry.match(/description:\s*`([^`]+)`/s) || entry.match(/description:\s*'([^']+)'/s);
  const uniqueMatch = entry.match(/uniqueContent:\s*`([^`]+)`/s) || entry.match(/uniqueContent:\s*'([^']+)'/s) || entry.match(/uniqueContent:\s*"([^"]+)"/s);
  if (slugMatch && nameMatch) {
    cities.push({ slug: slugMatch[1], name: nameMatch[1], description: descMatch ? descMatch[1] : '', uniqueContent: uniqueMatch ? uniqueMatch[1] : '' });
  }
}

const out: { [k: string]: string } = {};
for (const c of cities) {
  out[c.slug] = composeForCity(c);
}

const generated = `// GENERATED FILE — DO NOT EDIT BY HAND
// This file was created by scripts/generate-city-content.ts
export const CITY_LONG_CONTENT: { [slug: string]: string } = ${JSON.stringify(out, null, 2)};
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, generated, "utf8");
console.log("Wrote city content to:", outPath);
