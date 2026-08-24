import { Layers, PanelTop, Tv, Grid3x3, Gem, Trees, DoorClosed, type LucideIcon } from "lucide-react"

/**
 * Full, service-specific guide content — one record per service. Backs the
 * /services/:slug "Read Full Guide" detail pages. Written fresh for each
 * service in clear, professional English so a Narpatganj, Forbesganj or Araria customer
 * understands the exact material, price, design choices, and warranty before
 * they call. Every field is unique to the service — no shared boilerplate.
 * Rates and specs stay in sync with business-data.ts / service-city-data.ts /
 * the homepage Services section.
 */

export interface ServiceMaterial {
  name: string
  detail: string
}

export interface InstallStep {
  title: string
  desc: string
}

export interface ServiceFaqItem {
  q: string
  a: string
}

/** One quality tier's local-market price band for Forbesganj / Araria district. */
export interface PriceTier {
  tier: "Economy" | "Standard" | "Premium"
  range: string
  desc: string
}

/** A design/style choice a customer can pick for this specific service. */
export interface DesignOption {
  name: string
  desc: string
}

/** One row of the head-to-head comparison against this service's main alternative. */
export interface ComparisonRow {
  point: string
  /** How this service performs on the point. */
  self: string
  /** How the alternative performs on the same point. */
  other: string
}

export interface ServiceContent {
  slug: string
  icon: LucideIcon
  name: string
  category: string
  tagline: string
  heroImage: string
  heroImageAlt: string
  galleryCategory: string
  /** Overall headline range shown in hero chips/homepage — spans Economy low to Premium high. */
  price: string
  /** Economy / Standard / Premium local-market price bands with what changes at each tier. */
  priceTiers: PriceTier[]
  /** Standard panel/board sizes and thickness available in the local market. */
  sizesThickness: string
  /** Rough estimated labour-only component, already included within the price range above. */
  labourCost: string
  /** Short version for the compact stat tile, e.g. "₹20–30/sq.ft". */
  labourCostShort: string
  /** What JK Interior sources/installs, described honestly without naming unconfirmed brands. */
  brandNote: string
  /** Coverage across the service area, with any material-specific caveat. */
  availability: string
  installTime: string
  maintenance: string
  warranty: string
  whatItIs: string
  whereUsed: string[]
  whereNotUsed: string[]
  benefits: string[]
  limitations: string[]
  /** Style/design choices offered for this service, shown as a picker grid. */
  designOptions: DesignOption[]
  /** What JK Interior's quoted price actually covers — shown as a clear checklist next to what's not. */
  whatsIncluded: string[]
  /** Work/material explicitly outside JK Interior's scope for this service. */
  whatsNotIncluded: string[]
  materials: ServiceMaterial[]
  installSteps: InstallStep[]
  /** Name of the material customers most often weigh this service against. */
  comparisonWith: string
  comparison: ComparisonRow[]
  /** One practical, on-site recommendation. */
  expertTip: string
  realProject: { title: string; desc: string; photos: number }
  faqs: ServiceFaqItem[]
  relatedSlugs: string[]
}

/** Shown on every service page directly under the price tiers — the one non-negotiable disclaimer. */
export const PRICE_DISCLAIMER =
  "Every rate on this page is a current Forbesganj and Araria market estimate rather than a fixed quotation. Your final figure is set at the free site visit and varies with your design, the material grade you choose and the total area. Combining work — ceiling, wall panelling and television unit together — brings the per-sq.ft rate down."

export const SERVICE_AREA_NOTE =
  "JK Interior operates from Narpatganj, with its registered workshop in Forbesganj, and travels roughly 80 km around it — Narpatganj, Forbesganj, Araria, Jogbani, Raniganj, Purnia, Supaul, Tribeniganj, Kursakanta and Chhatapur. A single call or WhatsApp message confirms whether your village or mohalla is on the route before you book."


export const SERVICES_CONTENT: ServiceContent[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "gypsum-ceiling",
    icon: Layers,
    name: "Gypsum False Ceiling",
    category: "Ceiling",
    tagline: "Turn a plain roof into a designer ceiling — seamless, cove-lit, and built to the design you choose",
    heroImage: "/images/gypsum5.webp",
    heroImageAlt: "Designer gypsum false ceiling with hidden cove lighting in a Forbesganj drawing room by JK Interior",
    galleryCategory: "Gypsum False Ceiling",
    price: "₹75–₹210/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", range: "₹75–₹90/sq.ft", desc: "One flat, single-level plane in 12.5mm board — clean, plain, no cove step." },
      { tier: "Standard", range: "₹95–₹130/sq.ft", desc: "A stepped perimeter border with a cove channel ready for LED (strip billed apart)." },
      { tier: "Premium", range: "₹135–₹210/sq.ft", desc: "Multi-level trays, curves or islands with built-in cove lighting throughout." },
    ],
    sizesThickness: "12.5mm boards in 4×8 ft and 4×6 ft sheets, scored and cut on-site; a thinner 8mm board is used only where the design curves.",
    labourCost: "Framing, board fixing and taping labour runs about ₹30–45/sq.ft and is already inside the rate above; cove and multi-level work sits at the top of that band.",
    labourCostShort: "₹30–45/sq.ft",
    brandNote: "We fit ISI-marked branded gypsum board on galvanised GI framing, bought from authorised Purnia/Forbesganj dealers — never loose unbranded stock. You see the actual board and brand at the free site visit.",
    availability: "Fitted right across our service area. The cove and multi-level designs are booked most in Forbesganj and Araria town, where drawing-room ceilings are the biggest ask.",
    installTime: "2–3 days for one room, 3–5 days for a full hall",
    maintenance: "An occasional wipe with a dry cloth is all it ever needs",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A seamless designer ceiling in gypsum board on a rust-proof metal frame — a smooth, crack-free finish that gives a hall a polished, finished look, with hidden cove and LED lighting built right in.",
    whereUsed: [
      "Drawing room and main hall — the first ceiling every guest looks up at",
      "Master and children's bedrooms for soft, glare-free cove light",
      "Dining spaces where a tray design frames the table",
      "Dry office cabins, showrooms and reception lobbies",
    ],
    whereNotUsed: [
      "Bathrooms — trapped steam swells and stains the board",
      "Cooking kitchens — the same steam problem, every day",
      "Open balconies, terraces or anywhere rain can reach",
      "Any room with an active leak overhead — seal the slab first",
    ],
    benefits: [
      "Seamless, crack-free finish that gives your hall a clean, polished look",
      "Any design you dream — cove, curves, steps, islands — built exactly to your sketch",
      "Hides ugly wiring and shows off premium cove/LED lighting like no other ceiling",
      "Fire-resistant, softens noise between floors, and stays flawless for years",
      "Backed by a solid 1-year written warranty against sagging or cracks",
    ],
    limitations: [
      "Not waterproof — the one line we never cross for you",
      "Taping and sanding make it a touch slower to finish than PVC",
      "A leak from above means replacing board, not just wiping it",
      "For the same layout its labour runs a little higher than PVC",
    ],
    designOptions: [
      { name: "Single-level flat", desc: "One clean plane — the quiet, budget-friendly base every room can carry." },
      { name: "Stepped cove border", desc: "A recessed step around the edge hides an LED strip for a soft glow ring." },
      { name: "Central tray / island", desc: "A dropped centre panel that frames a fan or chandelier as the focal point." },
      { name: "Curved / multi-level designer", desc: "Layered curves and multiple heights for a full statement drawing-room ceiling." },
    ],
    whatsIncluded: [
      "GI metal frame set at the drop height you choose",
      "Gypsum boards fixed with staggered, screwed joints — no long straight seams",
      "Cove and step framing wherever your design calls for it",
      "Full taping, jointing and sanding to a paint-ready surface",
      "Neat cutouts for downlights, AC grilles and cove wiring",
      "1-year written warranty",
    ],
    whatsNotIncluded: [
      "LED cove strip and driver — quoted separately per running foot",
      "Main wiring, switches, downlights and fixtures — your electrician's scope",
      "Paint and putty over the ceiling — a separate finishing job",
      "Sealing a leaking or damp slab above — must be sorted before we start",
    ],
    materials: [
      { name: "Gypsum board (12.5mm)", detail: "Branded, ISI-marked panels with a firm gypsum core and paper facing" },
      { name: "GI metal channel frame", detail: "Galvanised sections that resist rust and won't sag with the years" },
      { name: "Joint tape & jointing compound", detail: "Bridges and fills every seam so the surface finishes dead flat" },
      { name: "Aluminium cove profile + LED", detail: "Recessed channel carrying a warm-white (3000K) strip for indirect light" },
    ],
    installSteps: [
      { title: "Mark the level", desc: "A dead-level line is snapped around all four walls at your chosen drop." },
      { title: "Anchor the frame", desc: "Perimeter angle and intermediate GI channels are fixed to the slab." },
      { title: "Screw the boards", desc: "Boards go up with staggered joints so no seam runs edge to edge." },
      { title: "Build the cove", desc: "If it's in the design, a recessed step is framed around the border for the LED." },
      { title: "Tape & sand smooth", desc: "Every joint and screw head is taped and sanded until it disappears." },
      { title: "Cutouts & handover", desc: "Light and AC openings are cut, the cove line is checked, and the warranty is handed over." },
    ],
    comparisonWith: "POP Ceiling",
    comparison: [
      { point: "How it's made", self: "Factory board on a GI frame — dry, precise, uniform", other: "Wet plaster mixed and applied by hand on site" },
      { point: "Finish quality", self: "Even, crack-resistant, mason-independent", other: "Depends heavily on the mason's hand" },
      { point: "Site mess & drying", self: "Little debris, no long drying wait", other: "More wet debris and curing time" },
      { point: "Later repair", self: "One board section can be opened and reset", other: "Patch repairs often show" },
    ],
    expertTip:
      "If cove lighting is even a maybe, lock it at the design stage. Adding a cove after the boards are closed means opening part of a finished ceiling — deciding early costs nothing extra.",
    realProject: {
      title: "Cove-lit hall ceiling, Forbesganj",
      desc: "A 180 sq.ft drawing room where a stepped border wraps a warm-white LED cove around a flat centre — the project we most often walk clients through on-site to explain how a cove actually reads.",
      photos: 16,
    },
    faqs: [
      { q: "If gypsum gets splashed once, is it ruined?", a: "A quick splash you wipe up is fine. What harms it is standing moisture and daily steam — that's exactly why we keep it out of bathrooms and cooking kitchens." },
      { q: "How much room height does a gypsum ceiling eat?", a: "A flat design drops the ceiling by roughly 3–4 inches. If your room is already low, tell us and we'll frame a shallower drop or suggest PVC instead." },
      { q: "Can you copy a ceiling design from a photo I saved?", a: "Yes — that's the whole point of gypsum. Show us the photo at the site visit; we'll tell you honestly what's buildable in your room's height and quote it." },
    ],
    relatedSlugs: ["pvc-false-ceiling", "grid-ceiling", "wpc-wall-panel"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "pvc-false-ceiling",
    icon: Layers,
    name: "PVC False Ceiling",
    category: "Ceiling",
    tagline: "The 100% waterproof ceiling that ends kitchen and bathroom dampness for good",
    heroImage: "/images/pvc-ceiling.webp",
    heroImageAlt: "Waterproof wood-texture PVC false ceiling in a Bihar kitchen installed by JK Interior",
    galleryCategory: "PVC Ceiling",
    price: "₹75–₹150/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", range: "₹75–₹90/sq.ft", desc: "Plain white or matte panels on a basic batten grid, 5mm gauge." },
      { tier: "Standard", range: "₹95–₹115/sq.ft", desc: "Wood-grain or marble-print panels in a 6–7mm gauge for less sag." },
      { tier: "Premium", range: "₹120–₹150/sq.ft", desc: "Designer 3D, embossed or high-gloss panels in a rigid 8mm gauge." },
    ],
    sizesThickness: "Panels come 200mm and 250mm wide and are cut to run up to ~12 ft without a joint. Gauge steps 5mm → 8mm by tier; the thicker the panel, the flatter it stays across a wide span.",
    labourCost: "Grid, panel fixing and beading labour is about ₹20–30/sq.ft, already in the rate — this is the fastest ceiling on our list to fit.",
    labourCostShort: "₹20–30/sq.ft",
    brandNote: "ISI-compliant branded PVC from authorised Forbesganj/Purnia suppliers — never the flimsy unbranded imports that yellow and bow. We show you the panel sample and its batch marking before you commit.",
    availability: "Stocked across the whole service area. It's our highest-volume ceiling, so the common whites and wood-grains are usually on hand with no waiting.",
    installTime: "One room in a day, a full home in 3–4 days",
    maintenance: "Practically none — a damp cloth wipes it clean",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Sealed, interlocking waterproof panels that never let steam, leakage or damp win again — the maintenance-free ceiling that stays bright and new for 20+ years without a single coat of paint.",
    whereUsed: [
      "Kitchens and bathrooms — our first and firmest recommendation",
      "Balconies and semi-open spots that catch the rain",
      "Shops, workshops and small offices on a tight budget",
      "Honestly, almost any room — it's the most flexible ceiling we fit",
    ],
    whereNotUsed: [
      "Formal halls set on complex cove or curved profiles — gypsum owns that look",
      "Rooms where you expect to repaint the ceiling a new colour every few years",
    ],
    benefits: [
      "100% waterproof — kill kitchen, bathroom and balcony dampness permanently",
      "Never needs paint or plaster again — looks new for 20+ years",
      "Termite-proof, fire-retardant and wipes clean in seconds",
      "Fastest ceiling we fit — a whole room done in a single day",
      "The friendliest price per sq.ft, backed by a 1-year leak-proof warranty",
    ],
    limitations: [
      "Design stays simple — no true cove or curved profiles",
      "The colour and texture you pick is locked for its whole life",
      "A cracked plank is swapped, not patched (matching one is easy though)",
      "In a formal drawing room it reads a notch below gypsum's finish",
    ],
    designOptions: [
      { name: "Plain white / matte", desc: "The clean, bright, budget classic — brightens a kitchen or bath instantly." },
      { name: "Wood-grain", desc: "Warm timber-look planks so a balcony or dining ceiling doesn't read 'plastic'." },
      { name: "Marble-print", desc: "Stone-pattern panels that pair neatly with a UV-marble wall." },
      { name: "3D embossed / high-gloss", desc: "Textured or mirror-gloss designer panels for a richer feature ceiling." },
    ],
    whatsIncluded: [
      "Batten grid fixed to the slab and the perimeter walls",
      "Panels measured, cut and interlocked plank by plank",
      "Corner beading and clean edge trims all round",
      "Cutouts for downlights or an exhaust fan",
      "1-year written warranty",
    ],
    whatsNotIncluded: [
      "Main wiring, switches or the light/exhaust fixtures themselves — electrician's scope",
      "AC ducting or plumbing that runs above the ceiling",
      "Swapping a plank cracked by later impact — billed separately if it comes up",
    ],
    materials: [
      { name: "PVC ceiling planks", detail: "Interlocking planks in white, wood-grain, marble-print and glossy finishes" },
      { name: "GI / treated wooden battens", detail: "Perimeter and support battens the planks clip onto and hang from" },
      { name: "Corner beading & trims", detail: "Finishes the line where ceiling meets wall so no raw edge shows" },
    ],
    installSteps: [
      { title: "Measure & mark", desc: "The room is measured and a drop-height line marked on every wall." },
      { title: "Fix the battens", desc: "Perimeter and support battens are set to carry the planks." },
      { title: "Clip the planks", desc: "Planks are cut and tongue-and-groove clipped in, one after another." },
      { title: "Bead the edges", desc: "Corner and edge beading is run all around for a clean join." },
      { title: "Cut the lights in", desc: "Openings for downlights or an exhaust fan are cut and wired." },
      { title: "Wipe & hand over", desc: "One wipe and the ceiling is ready to use the same minute." },
    ],
    comparisonWith: "Gypsum Ceiling",
    comparison: [
      { point: "Water & steam", self: "100% waterproof — made for wet rooms", other: "Not waterproof — dry rooms only" },
      { point: "Fitting speed", self: "Often a single day per room", other: "2–3 days with taping and drying" },
      { point: "Design range", self: "Flat, textured, printed — but simple", other: "Cove, curves, multi-level — anything" },
      { point: "Upkeep", self: "Wipe clean, no paint ever", other: "Needs putty and periodic paint" },
    ],
    expertTip:
      "Since the panel colour is fixed for life, carry a photo of your existing kitchen or bathroom tiles to the site visit. We'll hold samples against it and match a shade that actually sits well with what's already on your walls.",
    realProject: {
      title: "Wood-texture PVC ceiling, Araria kitchen",
      desc: "A kitchen-plus-balcony ceiling finished in one working day, in wood-texture planks chosen so it reads warm from the dining table rather than plastic overhead.",
      photos: 13,
    },
    faqs: [
      { q: "Is PVC ceiling genuinely 100% waterproof?", a: "Yes. The plank is solid PVC with no soak-in core, so splashing, steam and humidity have nowhere to go — they just roll off the surface." },
      { q: "Will PVC look cheap next to gypsum in my hall?", a: "In a formal cove-lit hall, gypsum reads more premium — no argument. But in kitchens, bathrooms and everyday rooms our wood and marble-texture PVC looks genuinely smart." },
      { q: "Can seepage or termites ruin a PVC ceiling?", a: "No — termites can't eat plastic and seepage runs off it. To protect the frame behind as well, we hang the planks on treated battens or GI channel." },
    ],
    relatedSlugs: ["gypsum-ceiling", "uv-marble-sheet", "grid-ceiling"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "grid-ceiling",
    icon: Grid3x3,
    name: "Grid Ceiling",
    category: "Ceiling",
    tagline: "The sharp corporate ceiling for offices, shops and clinics — professional, fast, and easy to service",
    heroImage: "/images/grid.webp",
    heroImageAlt: "2x2 mineral fibre T-grid false ceiling in a commercial office by JK Interior",
    galleryCategory: "Grid Ceiling",
    price: "₹45–₹115/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", range: "₹45–₹55/sq.ft", desc: "Basic mineral-fibre tile dropped into a standard T-grid." },
      { tier: "Standard", range: "₹56–₹75/sq.ft", desc: "Better mineral-fibre or PVC tile with some moisture resistance." },
      { tier: "Premium", range: "₹76–₹115/sq.ft", desc: "Acoustic-rated or edge-lit tiles carried on a heavier grid." },
    ],
    sizesThickness: "Standard 2×2 ft (600×600mm) lay-in tiles, 15–19mm thick by tier, resting on a 24mm-face T-section grid — the sizes stocked everywhere locally.",
    labourCost: "Wall-angle, grid, levelling and tile-drop labour is about ₹15–25/sq.ft, included above — on a big open floor nothing goes up quicker.",
    labourCostShort: "₹15–25/sq.ft",
    brandNote: "ISI/BIS-compliant branded grid and tiles from our regular Purnia suppliers. The exact tile make — plain, acoustic or moisture-grade — is confirmed with you at the site visit.",
    availability: "Common across offices and shops in Forbesganj, Araria and Purnia. Acoustic and edge-lit tiles may need 2–3 days' lead time in outlying blocks.",
    installTime: "1–2 days for a room, 3–4 days for a larger floor",
    maintenance: "Very low — dust now and then; a stained tile is swapped on its own",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A clean 2x2 tile ceiling on a strong metal grid that gives your business an instant corporate look, cuts room echo, and lets you reach wiring or AC above in seconds — no breaking, no mess.",
    whereUsed: [
      "Offices, cabins and coworking floors",
      "Shops, showrooms and retail counters",
      "Clinics and diagnostic centres — easy to sanitise and swap out",
      "Godowns and workshops where the services above need access",
    ],
    whereNotUsed: [
      "Formal living rooms or bedrooms chasing a seamless premium ceiling",
      "Bathrooms or damp rooms — standard mineral tiles sag once wet",
      "Very low rooms — it needs a little more drop than PVC",
    ],
    benefits: [
      "Instant professional, corporate look for any office, shop or clinic",
      "Lift one tile to reach wiring, AC or plumbing — repairs done in minutes",
      "Acoustic tile options cut office echo for a calmer, sharper space",
      "Fastest and most economical way to cover a large floor",
      "Fire-safe tiles backed by a 1-year structural warranty",
    ],
    limitations: [
      "The grid lines stay visible — this is a working ceiling, not a decorative one",
      "Standard mineral tiles aren't waterproof and sag if they get wet",
      "It wants a touch more drop height than PVC",
      "No cove lighting or curved profiles are possible",
    ],
    designOptions: [
      { name: "Plain white tile", desc: "The neutral office standard — bright, tidy, easy on the budget." },
      { name: "Acoustic tile", desc: "Sound-absorbing tiles that tame echo in halls, clinics and coaching rooms." },
      { name: "Moisture-resistant PVC tile", desc: "The same grid, but with wipe-clean PVC tiles for washrooms and pantries." },
      { name: "Edge-lit / backlit tile", desc: "Glowing panels set into the grid for a modern, premium retail look." },
    ],
    whatsIncluded: [
      "Perimeter wall-angle fixed all the way around",
      "GI T-grid hung on hanger wires and levelled dead flat",
      "Tiles laid in — mineral fibre, PVC or gypsum, as agreed",
      "Cutouts for lights, AC diffusers and sprinkler heads",
      "1-year written warranty",
    ],
    whatsNotIncluded: [
      "The wiring, AC ductwork or sprinkler piping itself — each trade's own job",
      "Replacing a tile marked after handover, say by a later leak",
      "Upgrading to acoustic or edge-lit tiles once the order is locked",
    ],
    materials: [
      { name: "GI T-grid runners & cross-tees", detail: "Galvanised steel grid hung on adjustable GI hanger wires" },
      { name: "Lay-in tiles", detail: "2×2 ft mineral-fibre for offices, PVC for damp areas, gypsum for a flush look" },
      { name: "Perimeter wall angle", detail: "The L-angle on the wall that the grid edges rest into" },
    ],
    installSteps: [
      { title: "Mark the level", desc: "The drop height is marked around every wall in the room." },
      { title: "Fix the wall angle", desc: "The perimeter L-angle is screwed to the walls on that line." },
      { title: "Hang the grid", desc: "T-runners hang on GI wires and cross-tees click in to form the squares." },
      { title: "Level the grid", desc: "Each wire is tuned until the whole grid sits perfectly level." },
      { title: "Drop the tiles", desc: "Tiles are set into every square from underneath." },
      { title: "Fixtures & handover", desc: "Lights, diffusers and sprinklers are seated, each tile checked, warranty handed over." },
    ],
    comparisonWith: "Gypsum Ceiling",
    comparison: [
      { point: "Access above", self: "Lift one tile, reach the services", other: "Must cut into the ceiling" },
      { point: "Look", self: "Practical, grid lines show", other: "Seamless and premium" },
      { point: "Best for", self: "Offices, shops, clinics", other: "Homes and formal halls" },
      { point: "Cost on big floors", self: "Lowest per sq.ft", other: "Higher labour and finishing" },
    ],
    expertTip:
      "Have your electrician and AC contractor lock every fixture position before we hang the grid. Move a light point after the grid is levelled and part of the layout has to be reset — a five-minute conversation upfront saves that.",
    realProject: {
      title: "Clinic waiting-area ceiling, Araria",
      desc: "A 400 sq.ft diagnostic-centre floor in acoustic mineral-fibre tiles, laid so any future AC or wiring work needs nothing more than lifting a tile — no breaking, no dust.",
      photos: 7,
    },
    faqs: [
      { q: "Why pick grid over gypsum for my office?", a: "If ducting, conduits or plumbing run overhead, grid lets an electrician lift one tile and get in without touching the rest. Gypsum looks premium but has to be cut open for that same access." },
      { q: "Are the tiles waterproof?", a: "Standard mineral-fibre tiles are not — they sag when wet. For washrooms or damp areas we drop PVC lay-in tiles into the very same grid instead." },
      { q: "Can I use grid ceiling at home?", a: "It's mostly a commercial choice because the grid lines show, but plenty of people use it in a store-room, garage or shop-cum-home where budget and easy access matter more than the look." },
    ],
    relatedSlugs: ["pvc-false-ceiling", "partition-wall", "gypsum-ceiling"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "partition-wall",
    icon: DoorClosed,
    name: "Partition Wall",
    category: "Partition",
    tagline: "A brand-new room or private cabin in days — no bricks, no cement, no mess",
    heroImage: "/images/partition-wall.webp",
    heroImageAlt: "Gypsum and glass partition wall dividing an office cabin, installed by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹100–₹750/sq.ft (gypsum or glass, Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", range: "₹100–₹130/sq.ft", desc: "Single-layer gypsum wall on one row of metal studs." },
      { tier: "Standard", range: "₹135–₹200/sq.ft (gypsum) · ₹380–₹450/sq.ft (glass)", desc: "Double-layer gypsum with rockwool sound infill, or entry toughened glass." },
      { tier: "Premium", range: "₹460–₹750/sq.ft", desc: "Frosted or fluted glass in aluminium framing with a flush door." },
    ],
    sizesThickness: "Gypsum: 12.5mm board (single or double layer) on 50mm/75mm metal studs. Glass: 8–12mm toughened safety glass set in aluminium channel framing.",
    labourCost: "Labour is roughly ₹25–40/sq.ft for gypsum and ₹60–100/sq.ft for glass, included above — glass costs more because it demands careful handling and exact alignment.",
    labourCostShort: "₹25–40/sq.ft (gypsum) · ₹60–100/sq.ft (glass)",
    brandNote: "Metal framing, gypsum board and toughened glass all come from ISI/BIS-compliant authorised Purnia/Forbesganj dealers. The glass is always genuine toughened safety glass — plain sheet is never used on a partition.",
    availability: "Gypsum partitions go up right across the service area. Glass partitions are booked most in Forbesganj and Araria offices; other towns add 2–4 days since the glass is cut in Purnia.",
    installTime: "2–4 days by length and whether it's gypsum or glass",
    maintenance: "Gypsum face: an occasional dust. Glass face: a wipe with glass cleaner.",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Split any space into a private cabin or extra room without the dust and weeks of brickwork — a rock-solid gypsum or elegant glass partition that gives you privacy, sound control and a clean modern look, fast.",
    whereUsed: [
      "Cabins carved out of one open office floor",
      "A glass-walled reception kept separate yet open to the working area",
      "A large bedroom split off into a study or walk-in wardrobe (gypsum)",
      "Shops needing a stockroom or a billing counter walled off",
    ],
    whereNotUsed: [
      "Anywhere load-bearing — these are non-structural walls only",
      "Full-height glass around small children without a safety film",
      "As a wet-area boundary like a bathroom wall — use masonry or PVC there",
    ],
    benefits: [
      "A new cabin or room ready in just 2–4 days — no brickwork, no cement dust",
      "Rock-solid gypsum or elegant glass, finished laser-straight and clean",
      "Real sound privacy between cabins with rockwool insulation",
      "Glass keeps the space open and bright; gypsum holds TVs and shelves",
      "Fully removable later — reworked in days if your layout changes",
    ],
    limitations: [
      "It is not a structural wall — it can't carry building loads",
      "The gypsum face isn't waterproof — keep it away from wet zones",
      "Glass costs noticeably more than gypsum for the same wall area",
      "A plain gypsum partition reduces sound; it isn't a soundproof studio wall",
    ],
    designOptions: [
      { name: "Solid gypsum cabin", desc: "Board both sides, finished and painted like a permanent room wall." },
      { name: "Half-gypsum, half-glass", desc: "A solid lower half with a glazed upper — privacy below, light above." },
      { name: "Full frosted / fluted glass", desc: "Frameless-look glazing that divides yet keeps the reception bright and modern." },
      { name: "Partition with sliding door", desc: "Gypsum or glass with a built-in sliding or flush door for a proper cabin." },
    ],
    whatsIncluded: [
      "Metal stud framing (gypsum) or aluminium channel framing (glass)",
      "Board fixed on both faces, or the glass panels fitted",
      "Rockwool acoustic infill wherever it's specified",
      "Door frame and hardware, if included in your quote",
      "Jointing and finishing (gypsum) or silicone sealing (glass)",
      "1-year written warranty",
    ],
    whatsNotIncluded: [
      "Wiring, switches or sockets on the new wall — electrician's scope",
      "Any structural or load-bearing change to the building",
      "Safety-laminated film on the glass, unless you ask for it and it's quoted upfront",
    ],
    materials: [
      { name: "Metal stud framing", detail: "Floor and ceiling track with vertical studs — the gypsum partition's skeleton" },
      { name: "Gypsum board, both faces", detail: "12.5mm boards on each side, taped and finished exactly like a wall" },
      { name: "Rockwool acoustic infill", detail: "Sound-absorbing wool packed inside the stud cavity (optional)" },
      { name: "Toughened glass + aluminium frame", detail: "8–12mm toughened glass — plain, frosted or fluted-film" },
    ],
    installSteps: [
      { title: "Mark the layout", desc: "The partition line and door opening are marked on floor and ceiling." },
      { title: "Frame it up", desc: "Gypsum gets tracks and studs; glass gets floor-to-ceiling aluminium U-channels." },
      { title: "Pack the acoustic infill", desc: "If specified, rockwool is packed in before the second face closes." },
      { title: "Fit board or glass", desc: "Boards are screwed to both faces, or the glass is lowered into its channel." },
      { title: "Door & finish", desc: "The door is fitted; gypsum joints are finished or glass joints silicone-sealed." },
      { title: "Clean & hand over", desc: "The face is cleaned, the door checked, and the warranty handed over." },
    ],
    comparisonWith: "Brick Wall",
    comparison: [
      { point: "Build time", self: "2–4 days, dry and clean", other: "1–2 weeks with curing" },
      { point: "Mess", self: "Almost no debris or dust", other: "Heavy cement dust and rubble" },
      { point: "Reversible?", self: "Yes — remove and rework later", other: "No — permanent, must be demolished" },
      { point: "Load on slab", self: "Light, no structural stress", other: "Heavy — not for every floor" },
    ],
    expertTip:
      "Planning to hang a TV, shelf or unit on the partition? Say so at the site visit and we'll build solid backing into the frame at that exact height, so the screws bite wood and not just board. For glass around kids, ask for the safety-laminated film upfront.",
    realProject: {
      title: "Two-cabin office split, Forbesganj",
      desc: "A 300 sq.ft rented office turned into two private cabins with rockwool-filled gypsum partitions and a frosted-glass reception, so the front counter stayed open and lit.",
      photos: 20,
    },
    faqs: [
      { q: "Can a partition hold a wall-mounted TV or shelves?", a: "Yes — as long as we know in advance. We build solid backing into the frame at the mounting height so the screws grip that, not just the board. Just flag it at the site-visit stage." },
      { q: "How much sound does a gypsum partition stop?", a: "A plain double-layer wall clearly cuts everyday conversation but isn't soundproof. Adding rockwool improves it enough for private office cabins — not for a recording studio." },
      { q: "Is a glass partition safe with kids around?", a: "We fit toughened glass as standard, which shatters into small blunt granules rather than sharp shards. For homes with young children we also recommend a safety-laminated film — just ask for it in the quote." },
    ],
    relatedSlugs: ["grid-ceiling", "wpc-wall-panel", "gypsum-ceiling"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "wpc-wall-panel",
    icon: PanelTop,
    name: "WPC Wall Panel",
    category: "Wall",
    tagline: "Teak- and walnut-look wooden walls for much less than solid wood — moisture- and termite-resistant",
    heroImage: "/images/wpc.webp",
    heroImageAlt: "Fluted WPC wall panel TV feature wall with LED backlight in Bihar by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹180–₹650/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", range: "₹180–₹250/sq.ft", desc: "Plain or solid-colour panel on a basic clip system, 8mm profile." },
      { tier: "Standard", range: "₹260–₹380/sq.ft", desc: "Wood-grain or grooved texture panels in a 12–15mm profile." },
      { tier: "Premium", range: "₹390–₹650/sq.ft", desc: "Deep fluted or louvre panels with an LED backlight channel, 18–25mm." },
    ],
    sizesThickness: "Panels run 250mm–600mm wide in 8 ft and 10 ft lengths, cut to your wall on-site. Profile depth steps from 8mm on plain up to 18–25mm on fluted and louvre designs.",
    labourCost: "Batten fixing, clipping, trims and any LED wiring together run about ₹25–45/sq.ft, included above — fluted and louvre profiles take longer than plain panels.",
    labourCostShort: "₹25–45/sq.ft",
    brandNote: "ISI-compliant branded composite WPC from authorised dealers — not the thin, loose unbranded WPC sold in the local bazaar, which bows within a season. We put the actual brand and texture sample in your hand at the site visit.",
    availability: "Fitted across the whole service area. The TV-wall panel is our most-asked WPC job in Forbesganj and Araria homes.",
    installTime: "One day for a TV wall, 2–3 days for a full room",
    maintenance: "A dry-cloth wipe — never any polish or varnish",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Designer wood-look panels that give your TV or feature wall the warmth of natural timber — but moisture-resistant, scratch-resistant and far less prone to termites and warping in Bihar's climate.",
    whereUsed: [
      "The TV wall or accent wall in the living room",
      "The headboard wall behind a bed",
      "Office reception and cabin feature walls",
      "Hotel lobby and restaurant statement walls",
    ],
    whereNotUsed: [
      "On ceilings — WPC is a wall product; use PVC or gypsum overhead",
      "On constantly-wet surfaces — it resists moisture, not standing water",
      "As a load-bearing wall — it's a cladding finish, not the wall itself",
    ],
    benefits: [
      "The look of teak/walnut timber at a much lower cost than solid wood",
      "Moisture- and termite-resistant — far less likely to warp, swell or rot than real wood",
      "Very low upkeep — no polish or varnish, a wipe keeps it clean",
      "A wide range of premium textures, including trending fluted and LED louvre",
      "A feature wall that lifts the room, usually finished in a day",
    ],
    limitations: [
      "Costs more per sq.ft than a UV marble sheet on the same wall",
      "Less free-form shaping than gypsum — it's a flat and fluted panel system",
      "A deeply gouged panel needs that section replaced, not touched up",
    ],
    designOptions: [
      { name: "Plain / solid colour", desc: "Flat panels in a single tone for a clean, understated backdrop." },
      { name: "Wood-grain finish", desc: "Teak, walnut and oak looks that read as real seasoned timber." },
      { name: "Vertical fluted", desc: "Ridged vertical lines that add depth and make a wall feel taller." },
      { name: "Louvre with LED backlight", desc: "Deep slats with a hidden strip glowing behind — the showpiece TV wall." },
    ],
    whatsIncluded: [
      "Battens fixed to the wall, vertical or horizontal to suit the design",
      "Panels cut and clip-fixed, tongue-and-groove aligned",
      "Matching edge and corner trims for a factory-finished look",
      "LED backlight wiring behind the panel, if it's in your design",
      "1-year written warranty",
    ],
    whatsNotIncluded: [
      "Running the LED driver wiring back to the main switchboard — electrician's scope",
      "Plastering or repairing a badly damaged wall first — masonry work",
      "Replacing a deeply gouged panel after the warranty — billed separately if needed",
    ],
    materials: [
      { name: "WPC panel board", detail: "Wood-fibre and polymer core in plain, wood-grain, fluted or 3D faces" },
      { name: "Batten & clip system", detail: "Battens on the wall; panels clip in with no face-fixing on show" },
      { name: "Edge & corner trims", detail: "Matching profiles that close every panel edge and corner cleanly" },
    ],
    installSteps: [
      { title: "Check the wall", desc: "The wall is checked for dryness and any cracks are filled before framing." },
      { title: "Fix the battens", desc: "Battens are set at standard spacing across the wall." },
      { title: "Cut & clip the panels", desc: "Panels are cut to size and clip-fixed onto the battens." },
      { title: "Route the LED", desc: "If the design has backlight, wiring is run behind before the last panel closes." },
      { title: "Trim the edges", desc: "Matching trims close off every exposed edge and corner." },
      { title: "Wipe & hand over", desc: "A wipe-down and the wall is ready — no curing wait, mount the TV the same day." },
    ],
    comparisonWith: "Natural Wood Panelling",
    comparison: [
      { point: "Cost", self: "About 60% of solid timber", other: "The full premium timber price" },
      { point: "Damp & termites", self: "Resists both — built for humidity", other: "Can warp, swell or get eaten" },
      { point: "Upkeep", self: "Just wipe — no polish ever", other: "Needs periodic polish/varnish" },
      { point: "Look", self: "Very close to real wood", other: "Genuine natural grain" },
    ],
    expertTip:
      "Decide on LED backlighting before we begin — the strip and its wiring live behind the panel. Bring your TV's exact size and its wall-mount bracket to the site visit too, so the layout and a solid TV backing are planned from the very first panel.",
    realProject: {
      title: "Fluted TV wall with LED backlight, Jogbani",
      desc: "A 12 ft living-room TV wall in walnut-tone fluted WPC with a hidden LED strip washing down from the top edge — the panels went up and the TV mounted on the same day.",
      photos: 20,
    },
    faqs: [
      { q: "Does WPC really pass for real wood?", a: "From normal room distance the better wood-grain and fluted textures read as real timber — most customers are genuinely surprised it isn't. We hand you a physical sample at the site visit so you can judge for yourself." },
      { q: "What would a standard TV wall cost?", a: "A typical 10×10 ft (100 sq.ft) TV wall in mid-range fluted WPC comes to roughly ₹18,000–₹30,000, including battens, trims and basic LED wiring." },
      { q: "Can WPC go over a tiled or painted wall?", a: "Yes — the panels clip onto battens, so we fix the battens straight over sound tile or an existing painted surface. The wall only has to be structurally solid, not perfectly smooth." },
    ],
    relatedSlugs: ["uv-marble-sheet", "modular-tv-unit", "partition-wall"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "uv-marble-sheet",
    icon: Gem,
    name: "UV Marble Sheet",
    category: "Wall",
    tagline: "Marble-look walls without the weight, mess or high cost of real stone",
    heroImage: "/images/uv-marble.webp",
    heroImageAlt: "High-gloss UV marble sheet wall cladding in a Bihar bathroom by JK Interior",
    galleryCategory: "WPC fluted panels & uv marble Sheet",
    price: "₹45–₹120/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", range: "₹45–₹60/sq.ft", desc: "Basic marble-print sheet with standard gloss, 3mm thick." },
      { tier: "Standard", range: "₹65–₹85/sq.ft", desc: "Finer veining and a higher-gloss finish, 4mm thick." },
      { tier: "Premium", range: "₹90–₹120/sq.ft", desc: "Premium granite or exotic print, 5–6mm, with an anti-fingerprint coat." },
    ],
    sizesThickness: "Standard 8×4 ft (2440×1220mm) sheets in 3–6mm thicknesses by tier — a thicker sheet takes knocks and scratches better on a busy kitchen or bathroom wall.",
    labourCost: "Surface prep, adhesive or clip fixing and edge beading run about ₹15–25/sq.ft, already inside the rate above.",
    labourCostShort: "₹15–25/sq.ft",
    brandNote: "ISI-compliant branded PVC-based sheets from authorised Purnia/Forbesganj dealers. We open the full sample book on-site so you see the real sheen and veining across a whole sheet before you order.",
    availability: "Fitted across the whole service area. Bathroom and pooja-room UV marble is the most common request in Forbesganj, Araria and Jogbani.",
    installTime: "1–2 days per room",
    maintenance: "None to speak of — a damp cloth keeps it shining, no polishing",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A glossy, seamless marble-look wall for your pooja room or bathroom — fully waterproof, with no grout lines to blacken, at a fraction of real marble's price.",
    whereUsed: [
      "Bathroom walls — no grout lines to blacken like tiles do",
      "Kitchen walls away from the direct flame (backsplash, side runs)",
      "Pooja-room walls — the exact marble look most families want",
      "Living-room feature walls after a stone finish",
    ],
    whereNotUsed: [
      "Right behind a gas stove or any high-heat surface — the PVC base isn't heat-rated",
      "On outdoor walls under years of harsh sun — the UV print can fade faster than stone",
      "On floors — this is wall cladding, not flooring",
    ],
    benefits: [
      "A premium marble look at a fraction of natural stone's cost",
      "High-gloss finish that brightens the whole room with reflected light",
      "Waterproof with no grout lines — stays clean and spotless for years",
      "Lightweight, scratch-resistant and wipes clean in seconds",
      "A fresh wall makeover finished in a single, dust-free day",
    ],
    limitations: [
      "Not heat-resistant — keep it clear of open flame and hot surfaces",
      "A deep scratch shows and can't be re-ground the way polished stone can",
      "Carries less resale prestige than a genuine natural-stone wall",
    ],
    designOptions: [
      { name: "White / Italian veined", desc: "Soft grey-gold veins on white — the classic bright, calm pooja and bath look." },
      { name: "Black / granite", desc: "Deep dark stone patterns for a bold feature or dado band." },
      { name: "Coloured / exotic print", desc: "Onyx, beige and exotic prints when you want a richer, warmer wall." },
      { name: "Book-matched panels", desc: "Two sheets mirrored so the veining flows symmetrically — a true slab effect." },
    ],
    whatsIncluded: [
      "Wall prep — cleaning, filling cracks and levelling the surface",
      "Sheet cutting and layout so the veining lines up at joints",
      "Bonding or clip-fixing onto the prepared wall",
      "Edge and corner beading for a seamless finish",
      "1-year written warranty",
    ],
    whatsNotIncluded: [
      "Heavy plaster repair or waterproofing of the wall base — masonry work done first and separately",
      "Moving plumbing or electrical fixtures behind the wall",
      "Replacing a sheet cracked or scratched after handover — billed separately if needed",
    ],
    materials: [
      { name: "UV-printed PVC marble sheet", detail: "High-gloss sheet with a marble/granite pattern UV-cured and sealed on" },
      { name: "Marine-grade adhesive / clip channel", detail: "Bonds or clip-fixes the sheet to a prepared wall depending on the surface" },
      { name: "Edge & corner beading", detail: "Matching trims that finish exposed edges and corners cleanly" },
    ],
    installSteps: [
      { title: "Prepare the wall", desc: "The wall is cleaned, cracks are filled, and it's levelled so the sheet bonds dead flat." },
      { title: "Lay out & cut", desc: "Sheets are measured and cut so the pattern lines up across the joints." },
      { title: "Bond / clip on", desc: "Sheets are adhered or clipped on, chosen to suit the wall type." },
      { title: "Align the veining", desc: "Neighbouring sheets are set so the veins read as one continuous flow." },
      { title: "Bead the edges", desc: "Corners and edges get a finishing bead." },
      { title: "Polish & hand over", desc: "A final buff brings the gloss up and it's ready to use straight away." },
    ],
    comparisonWith: "Ceramic Wall Tiles",
    comparison: [
      { point: "Grout lines", self: "None — one seamless surface", other: "Many lines that blacken over time" },
      { point: "Look", self: "Large-slab marble effect", other: "Repeating tile grid" },
      { point: "Fitting speed", self: "1–2 days, dry work", other: "Slower, wet cement work" },
      { point: "Cleaning", self: "Wipe the whole wall flat", other: "Scrubbing grout joints" },
    ],
    expertTip:
      "Ask to see the veining on a full sheet at the site visit, not just a small chip. Marble pattern reads completely differently across a whole wall than on a palm-sized sample — judging it big is how you avoid a surprise.",
    realProject: {
      title: "Pooja-room marble-finish wall, Purnia",
      desc: "A small pooja room clad floor-to-ceiling in white-and-gold veined UV marble with a recessed LED niche for the idol — finished in a single day with none of the dust real stone-cutting throws up.",
      photos: 20,
    },
    faqs: [
      { q: "Can UV marble go on the wall behind the stove?", a: "We keep it off the strip right behind the flame — direct heat can affect the PVC base. For that patch we suggest ceramic tile or a metal splashback and run UV marble across the rest of the wall." },
      { q: "Does it need grout like tiles?", a: "No — sheets meet edge-to-edge with the pattern aligned, so there's no grout line at all. That means no joint that turns black with mould over the years." },
      { q: "UV marble sheet or WPC panel for my wall?", a: "UV marble gives a stone look, is fully waterproof and costs less; WPC gives a wood look, resists moisture and costs more. So bathroom and pooja rooms lean UV marble, while a TV wall or bedroom leans WPC." },
    ],
    relatedSlugs: ["wpc-wall-panel", "pvc-false-ceiling", "modular-tv-unit"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "modular-tv-unit",
    icon: Tv,
    name: "Modular TV Unit",
    category: "Furniture",
    tagline: "A showroom-class TV unit built to your exact wall — hidden wires, smart storage, pure class",
    heroImage: "/images/tv-unit.webp",
    heroImageAlt: "Custom modular TV unit with hidden LED backlight and cable management by JK Interior in Bihar",
    galleryCategory: "TV Unit Design",
    price: "₹15,000–₹75,000+ per unit (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", range: "₹15,000–₹25,000", desc: "6–8 ft unit in laminate finish with basic hinges, no LED." },
      { tier: "Standard", range: "₹26,000–₹45,000", desc: "8–10 ft unit, better finish, soft-close hardware, LED optional." },
      { tier: "Premium", range: "₹46,000–₹75,000+", desc: "10–14 ft unit, premium veneer or gloss, LED backlight, extra storage." },
    ],
    sizesThickness: "Built to your wall's exact width, usually 6–14 ft. Carcass in 18mm plywood or MDF, 6mm back panel, ~1mm laminate face — shutter and shelf thicknesses vary with the design.",
    labourCost: "Fabrication and installation labour is bundled into the unit price — usually 25–35% of the total, and a little more where there's heavy LED work or several floating shelves.",
    labourCostShort: "25–35% of unit price",
    brandNote: "BWP/BWR-grade plywood or MDF from ISI-compliant branded stock, dressed in branded laminate or veneer with soft-close hardware. All the brand options are laid out for you at the design stage before anything is cut.",
    availability: "Fabricated and installed across the whole service area. Large premium units of 10 ft and up need about 5–7 days to build, a little longer for outlying blocks.",
    installTime: "3–5 days by size and design",
    maintenance: "Wipe with a dry cloth; keep hot vessels off the surface",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "A custom entertainment centre engineered to your exact wall and TV — no dangling wires, no clutter — with sleek storage, a premium anti-scratch finish and optional LED that makes your hall look straight out of a showroom.",
    whereUsed: [
      "Living rooms — the focal wall facing the seating",
      "Bedrooms — a compact unit across from the bed",
      "Home-theatre and media rooms that need AV storage",
    ],
    whereNotUsed: [
      "Damp or splash-prone walls — laminate and veneer aren't built for standing moisture",
      "Walls you plan to reconfigure soon — it's custom-built to that exact width",
    ],
    benefits: [
      "Fits your exact wall — no ugly side gaps like a ready-made unit",
      "All wires and boxes hidden inside — clean, clutter-free class",
      "Optional LED backlight for a floating, premium showroom glow",
      "Smart storage sized to exactly what you keep",
      "Finish, colour and hardware fully your choice, with a 1-year warranty",
    ],
    limitations: [
      "It's a fixed build — moving it to another wall later isn't practical",
      "Being made to order, it takes longer than lifting a ready-made unit off a floor",
      "That customisation costs more than a plain showroom piece",
    ],
    designOptions: [
      { name: "Wall-mounted floating", desc: "A hung unit with clear floor below — light, modern, easy to clean under." },
      { name: "Full-wall with panelling", desc: "The unit merges into a WPC or laminate back wall for one big statement." },
      { name: "Storage-heavy cabinet", desc: "Extra closed shutters and drawers when you need the unit to hide a lot." },
      { name: "Open-shelf minimal", desc: "Slim floating shelves and a clean panel for a pared-back, airy look." },
    ],
    whatsIncluded: [
      "On-site measurement and finalising the custom design with you",
      "Carcass fabrication in the laminate or veneer you choose",
      "Soft-close hinges and drawer hardware",
      "A cable-management channel built into the panel",
      "LED backlight wiring, if it's in your design",
      "1-year written warranty",
    ],
    whatsNotIncluded: [
      "The TV wall-mount bracket or the TV itself — unless added into your quote",
      "A fresh electrical point for the unit's LED — electrician's scope if none exists",
      "Relocating the finished unit to a different wall later on",
    ],
    materials: [
      { name: "Plywood / MDF carcass", detail: "Plywood where it bears load, MDF where a smooth laminate face is wanted" },
      { name: "Laminate / veneer finish", detail: "Matte, gloss or wood-veneer options across dozens of shades" },
      { name: "Soft-close hardware", detail: "Hinges and channels that shut silently and don't slam over the years" },
      { name: "LED strip + driver (optional)", detail: "Backlight along shelf edges for a floating, showroom effect" },
    ],
    installSteps: [
      { title: "Measure on-site", desc: "Exact wall width, height, TV size and socket positions are recorded." },
      { title: "Finalise the design", desc: "Layout, finish, colour and LED options are locked before anything is cut." },
      { title: "Fabricate the modules", desc: "Carcass panels are cut, edge-banded and laminated to the agreed finish." },
      { title: "Fix the wall bracket", desc: "Mounting battens are fixed to the wall at the right height." },
      { title: "Install the modules", desc: "Modules go up and are levelled with the cable channel routed behind." },
      { title: "Hardware, LED & handover", desc: "Hinges, channels and LED are fitted and tested, shutters checked, warranty handed over." },
    ],
    comparisonWith: "Ready-made TV Unit",
    comparison: [
      { point: "Fit to wall", self: "Exact width, no side gaps", other: "Fixed size, gaps or overflow" },
      { point: "Cable hiding", self: "Channel built in — wires vanish", other: "Wires usually left hanging" },
      { point: "Storage", self: "Sized to what you actually keep", other: "Whatever the model offers" },
      { point: "Lead time", self: "3–5 days made to order", other: "Carry it home the same day" },
    ],
    expertTip:
      "Before we lock the design, bring your TV's exact size and count every box you want tucked out of sight — set-top box, router, gaming console. The cable channel and the compartments are sized around that list, so nothing ends up sitting on top later.",
    realProject: {
      title: "10 ft floating LED TV unit, Forbesganj",
      desc: "A wall-hung 10 ft unit with a floating centre shelf, a hidden LED wash, and closed side cabinets sized precisely to swallow a set-top box and router out of sight.",
      photos: 8,
    },
    faqs: [
      { q: "How soon after I confirm the design is it ready?", a: "Once design and finish are locked, building and installing together take 3–5 days by size — a simple 6–8 ft unit is quicker, a large LED unit closer to five days." },
      { q: "Will it really hide the router, set-top box and cables?", a: "Yes — that's exactly what the cable channel is for. We run a hollow channel from the wall socket to a vented compartment, so the devices sit inside with only the remote sensor peeking out." },
      { q: "What size unit suits a 10×12 ft living room?", a: "An 8–10 ft wide unit usually balances that wall nicely. We confirm the exact size on-site against your real wall and how far back the seating sits." },
    ],
    relatedSlugs: ["wpc-wall-panel", "gypsum-ceiling", "uv-marble-sheet"],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "artificial-grass",
    icon: Trees,
    name: "Artificial Grass",
    category: "Outdoor",
    tagline: "A lush green lawn 365 days a year — zero watering, zero mowing, zero mud",
    heroImage: "/images/artificial-grass.webp",
    heroImageAlt: "UV-stabilised artificial grass balcony lawn installation in Bihar by JK Interior",
    galleryCategory: "Artificial Grass",
    price: "₹40–₹150/sq.ft (Forbesganj/Araria market rate)",
    priceTiers: [
      { tier: "Economy", range: "₹40–₹55/sq.ft", desc: "25–30mm pile at standard density — fine for a small balcony." },
      { tier: "Standard", range: "₹60–₹85/sq.ft", desc: "35–40mm denser pile with better UV treatment." },
      { tier: "Premium", range: "₹90–₹150/sq.ft", desc: "40–50mm premium-density pile with the longest-lasting colour and UV." },
    ],
    sizesThickness: "Rolls come in standard 2m and 4m widths and are seam-taped together for wider areas. Pile height steps 25mm → 50mm by tier — taller pile reads lusher underfoot.",
    labourCost: "Base/drainage prep, laying, seam joining and edge fixing run about ₹8–15/sq.ft on floors and ₹15–25/sq.ft on wall panels, included in the rate above.",
    labourCostShort: "₹8–15/sq.ft (floor) · ₹15–25/sq.ft (wall)",
    brandNote: "UV-stabilised synthetic turf from our regular Purnia suppliers. We check the UV treatment and pile density before ordering, because untreated turf bleaches within a single season under North Bihar's sun.",
    availability: "Fitted across the whole service area. Balcony and terrace turf is most requested in Forbesganj, Araria and Raniganj; premium rolls need a couple of extra days in outlying blocks.",
    installTime: "Half a day to a full day for a typical balcony or wall",
    maintenance: "An occasional rinse and a light brush — never any mowing or watering",
    warranty: "1 year written warranty (materials + workmanship)",
    whatItIs:
      "Soft, premium UV-protected turf that turns any balcony, terrace or wall into a fresh green oasis all year — no watering, no mowing, no insects — and it drains the monsoon straight through.",
    whereUsed: [
      "Balconies and terraces — evergreen with no watering or mowing",
      "A green feature wall in a living room or office",
      "Small home gardens and rooftop seating corners",
      "Pet-friendly outdoor spots where a real lawn is hard to keep",
    ],
    whereNotUsed: [
      "Over poor drainage — water pools and starts to smell; we fix the drainage first",
      "Under intense reflected heat — it can soften the backing faster than normal sun",
      "As an indoor soft-carpet replacement — turf feels quite different underfoot",
    ],
    benefits: [
      "Lush green 365 days a year — never any watering or mowing",
      "Soft and safe for kids and pets, comfortable underfoot",
      "Drains the monsoon straight through — no mud, no pooling, no smell",
      "UV-protected colour that won't fade for years in the sun",
      "Ready in hours, backed by a 1-year fade-proof warranty",
    ],
    limitations: [
      "It needs a properly drained base — poor drainage brings odour over time",
      "It can heat up underfoot in direct peak-afternoon sun",
      "It won't feel exactly like a real, watered lawn",
    ],
    designOptions: [
      { name: "Balcony / terrace floor lawn", desc: "Wall-to-wall turf over a drained base for an instant green floor." },
      { name: "Vertical green wall", desc: "Pre-cut panels on a batten frame for a living-look feature wall indoors or out." },
      { name: "Turf with pebble / deck border", desc: "Grass paired with a pebble strip or wood deck for a landscaped corner." },
      { name: "Play / seating area", desc: "Denser, softer pile sized for a kids' play spot or a rooftop lounge." },
    ],
    whatsIncluded: [
      "A surface and drainage check, plus base or batten prep",
      "Turf rolled or panels fixed, cut to your exact boundary",
      "Seam joining and edge fixing so nothing lifts at the corners",
      "A final grooming for a full, fresh-lawn finish",
      "1-year written warranty",
    ],
    whatsNotIncluded: [
      "Fixing pre-existing poor drainage or waterproofing the floor/terrace — civil work quoted separately first",
      "Potted plants, planters or any landscaping beyond the turf itself",
      "Replacing turf damaged by fire, sharp objects or pet chewing after handover",
    ],
    materials: [
      { name: "UV-stabilised synthetic turf", detail: "PE/PP grass fibres on a permeable backing, in several pile heights" },
      { name: "Drainage underlay", detail: "Sand, gravel or a perforated base that lets rainwater pass straight through" },
      { name: "Jointing tape / seam adhesive", detail: "Joins rolls invisibly so the lawn reads as one continuous surface" },
    ],
    installSteps: [
      { title: "Check surface & drainage", desc: "The base is cleaned and checked for slope and drainage; a wall has its battens checked." },
      { title: "Prepare the base", desc: "Floors get a drainage underlay; walls get a batten frame fixed up." },
      { title: "Lay turf / fix panels", desc: "Turf is rolled and cut to the boundary, or panels are fixed to the wall frame." },
      { title: "Join the seams", desc: "Neighbouring pieces are joined so the seam vanishes into the pile." },
      { title: "Fix the edges", desc: "Edges are secured with U-pins, adhesive or beading so they can't lift." },
      { title: "Groom & hand over", desc: "The fibres are brushed upright for a full, fresh-lawn look and it's handed over." },
    ],
    comparisonWith: "Natural Grass Lawn",
    comparison: [
      { point: "Watering", self: "None — never needs water", other: "Daily watering in summer" },
      { point: "Mowing & care", self: "No mowing, no fertiliser", other: "Regular mowing and feeding" },
      { point: "Monsoon", self: "Drains through, stays usable", other: "Turns muddy and patchy" },
      { point: "Year-round look", self: "Green every single day", other: "Browns off in dry months" },
    ],
    expertTip:
      "Tell us honestly how the space will actually be used — a quiet sitting corner is a very different job from a daily kids' play area. We size the drainage prep and pick the pile density around real use, not a guess.",
    realProject: {
      title: "Balcony lawn corner, Raniganj",
      desc: "A 60 sq.ft balcony given a drained-base artificial lawn with a small potted-plant corner — a garden feel for a family without a ground-floor plot to keep one.",
      photos: 7,
    },
    faqs: [
      { q: "Will it smell or grow mould in the monsoon?", a: "Not if the base drains properly — that's the one thing we always insist on checking. If your balcony doesn't drain well, we sort the drainage before a single roll goes down." },
      { q: "How long does it last outdoors?", a: "Good UV-stabilised turf keeps its colour and pile for about 5–8 years of regular sun before it noticeably fades. Our 1-year warranty covers the installation; the material itself lasts well beyond that." },
      { q: "Can it go on a wall as well?", a: "Yes — for a green feature wall we fix pre-cut turf panels onto a batten frame just like a WPC panel, with no drainage worry since it's vertical and stays dry." },
    ],
    relatedSlugs: ["wpc-wall-panel", "pvc-false-ceiling", "uv-marble-sheet"],
  },
]

export function getServiceContentBySlug(slug: string): ServiceContent | undefined {
  return SERVICES_CONTENT.find((s) => s.slug === slug)
}
