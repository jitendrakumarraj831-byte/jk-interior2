// Everything the private Ad Studio renders comes from this file.
//
// The service list is intentionally the eleven approved services only — no
// out-of-scope categories, no invented ones. Contact details are the ones the
// studio was asked to show in every outro; they are kept local to the studio so
// changing the public site's business data cannot silently change an ad.

export const STUDIO_BRAND = "JK Interior"
export const STUDIO_REGION = "Forbesganj & Araria"
export const STUDIO_WEBSITE = "https://www.jkinterior.online"

/** WhatsApp is the 86510 line; the 85418 line is the call line. */
export const STUDIO_WHATSAPP_DISPLAY = "+91 8651070831"
export const STUDIO_WHATSAPP_NUMBER = "918651070831"
export const STUDIO_CALL_DISPLAY = "+91 8541849118"
export const STUDIO_CALL_NUMBER = "+918541849118"

export const STUDIO_WHATSAPP_URL = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Namaste JK Interior! I saw your service ad and would like to discuss a project.",
)}`
export const STUDIO_CALL_URL = `tel:${STUDIO_CALL_NUMBER}`

/** All ten service areas, in the order they should appear in the outro. */
export const STUDIO_AREAS = [
  "Forbesganj",
  "Araria",
  "Narpatganj",
  "Jogbani",
  "Raniganj",
  "Kursakanta",
  "Chhatapur",
  "Tribeniganj",
  "Supaul",
  "Purnia",
] as const

export type ServiceIcon =
  | "layers"
  | "panels"
  | "fluted"
  | "louvers"
  | "ceiling"
  | "grid"
  | "marble"
  | "tv"
  | "light"
  | "leaf"
  | "partition"

export interface ServiceDefinition {
  id: string
  name: string
  tagline: string
  icon: ServiceIcon
}

/** The eleven allowed services. Nothing else belongs in the studio. */
export const STUDIO_SERVICES: ServiceDefinition[] = [
  {
    id: "pvc-ceiling",
    name: "PVC Ceiling",
    tagline: "Clean, moisture-ready ceiling panels with a crisp finish.",
    icon: "layers",
  },
  {
    id: "pvc-wall-paneling",
    name: "PVC Wall Paneling",
    tagline: "Wipe-clean walls that stay sharp in every season.",
    icon: "panels",
  },
  {
    id: "wpc-fluted-panels",
    name: "WPC Fluted Panels",
    tagline: "Warm fluted texture for a feature wall that feels crafted.",
    icon: "fluted",
  },
  {
    id: "wpc-louvers",
    name: "WPC Louvers",
    tagline: "Slim slatted screens and ceiling accents with depth.",
    icon: "louvers",
  },
  {
    id: "gypsum-false-ceiling",
    name: "Gypsum False Ceiling",
    tagline: "Seamless plaster ceilings, clean lines and soft lighting.",
    icon: "ceiling",
  },
  {
    id: "grid-t-ceiling",
    name: "Grid T Ceiling",
    tagline: "Practical grid ceilings for offices, shops and workspaces.",
    icon: "grid",
  },
  {
    id: "uv-marble-sheet",
    name: "UV Marble Sheet",
    tagline: "High-gloss marble-look sheets for walls and feature panels.",
    icon: "marble",
  },
  {
    id: "tv-unit-design",
    name: "TV Unit Design",
    tagline: "Custom media walls with storage, texture and profile light.",
    icon: "tv",
  },
  {
    id: "led-profile-lighting",
    name: "LED Profile Lighting",
    tagline: "Slim linear light for ceilings, niches and wall accents.",
    icon: "light",
  },
  {
    id: "artificial-grass",
    name: "Artificial Grass",
    tagline: "Low-maintenance green for balconies, terraces and corners.",
    icon: "leaf",
  },
  {
    id: "partition-wall",
    name: "Partition Wall",
    tagline: "Smart space dividers for homes, offices and studios.",
    icon: "partition",
  },
]

export type LowerThirdStyle = "rise" | "slide" | "wipe" | "pop" | "blur"

/** Twenty-four frame treatments — one assigned to each preset below. */
export type AdFrame =
  | "hairline"
  | "corners"
  | "matte"
  | "ribbon"
  | "bevel"
  | "slate"
  | "split"
  | "wedge"
  | "halo"
  | "double"
  | "offset"
  | "bracket"
  | "arch"
  | "ticks"
  | "spot"
  | "keyline"
  | "film"
  | "grid"
  | "dots"
  | "band"
  | "cross"
  | "stamp"
  | "scan"
  | "edge"

export interface AdPreset {
  id: string
  name: string
  description: string
  /** 0–5. Selects a warm chord set in the Web Audio engine. */
  mood: number
  lowerThird: LowerThirdStyle
  /** Frame overlay drawn over the stage and the design-picker tile. */
  frame: AdFrame
}

/** Names shown beside the preview timer so the active audio mood is visible. */
export const MOOD_NAMES = [
  "Warm Gold",
  "Deep Navy",
  "Soft Ivory",
  "Amber Glow",
  "Forest Calm",
  "Rosewood",
] as const

/**
 * Twenty-four genuinely different designs. Each id gets its own motion,
 * per-slide alternate motion, frame treatment and lower-third entrance in
 * ad-studio-presets.css — not just a different colour.
 */
export const AD_PRESETS: AdPreset[] = [
  {
    id: "golden-zoom",
    name: "Golden Zoom",
    description: "Slow push-in with a warm light sweep.",
    mood: 0,
    lowerThird: "rise",
    frame: "hairline",
  },
  {
    id: "silk-pan-left",
    name: "Silk Pan Left",
    description: "Camera glides left across the room.",
    mood: 1,
    lowerThird: "slide",
    frame: "corners",
  },
  {
    id: "silk-pan-right",
    name: "Silk Pan Right",
    description: "Camera glides right with a soft vignette.",
    mood: 1,
    lowerThird: "slide",
    frame: "matte",
  },
  {
    id: "rising-frame",
    name: "Rising Frame",
    description: "Vertical reveal that lifts the subject.",
    mood: 2,
    lowerThird: "rise",
    frame: "ribbon",
  },
  {
    id: "falling-light",
    name: "Falling Light",
    description: "Downward drift with a settling glow.",
    mood: 2,
    lowerThird: "rise",
    frame: "bevel",
  },
  {
    id: "gold-curtain",
    name: "Gold Curtain",
    description: "Curtains part from the centre to reveal the photo.",
    mood: 3,
    lowerThird: "pop",
    frame: "slate",
  },
  {
    id: "split-stage",
    name: "Split Stage",
    description: "The frame splits open from the middle.",
    mood: 3,
    lowerThird: "wipe",
    frame: "split",
  },
  {
    id: "gold-wipe",
    name: "Gold Wipe",
    description: "A diagonal gold band wipes across the frame.",
    mood: 4,
    lowerThird: "wipe",
    frame: "wedge",
  },
  {
    id: "iris-focus",
    name: "Iris Focus",
    description: "Circular focus reveal with a blur-to-sharp finish.",
    mood: 0,
    lowerThird: "blur",
    frame: "halo",
  },
  {
    id: "card-flip",
    name: "Card Flip",
    description: "3D card flip entrance with a clean settle.",
    mood: 5,
    lowerThird: "pop",
    frame: "double",
  },
  {
    id: "stack-slide",
    name: "Stack Slide",
    description: "Photo slides in like a stacked print.",
    mood: 5,
    lowerThird: "slide",
    frame: "offset",
  },
  {
    id: "frame-push",
    name: "Frame Push",
    description: "A gold frame pushes in and locks around the shot.",
    mood: 1,
    lowerThird: "rise",
    frame: "bracket",
  },
  {
    id: "slow-orbit",
    name: "Slow Orbit",
    description: "Gentle orbital drift with a breathing scale.",
    mood: 4,
    lowerThird: "blur",
    frame: "arch",
  },
  {
    id: "diagonal-drift",
    name: "Diagonal Drift",
    description: "Diagonal camera move with a passing sheen.",
    mood: 3,
    lowerThird: "slide",
    frame: "ticks",
  },
  {
    id: "spotlight",
    name: "Spotlight",
    description: "A soft spotlight travels across the subject.",
    mood: 2,
    lowerThird: "blur",
    frame: "spot",
  },
  {
    id: "gold-border",
    name: "Gold Border",
    description: "A fine gold border draws itself around the image.",
    mood: 0,
    lowerThird: "rise",
    frame: "keyline",
  },
  {
    id: "film-strip",
    name: "Film Strip",
    description: "Film-strip rails glide past the frame.",
    mood: 5,
    lowerThird: "slide",
    frame: "film",
  },
  {
    id: "mosaic-glass",
    name: "Mosaic Glass",
    description: "A shifting tile grid shimmers over the shot.",
    mood: 4,
    lowerThird: "pop",
    frame: "grid",
  },
  {
    id: "ripple-focus",
    name: "Ripple Focus",
    description: "Soft concentric rings expand from the centre.",
    mood: 1,
    lowerThird: "wipe",
    frame: "dots",
  },
  {
    id: "horizon-glow",
    name: "Horizon Glow",
    description: "A warm horizon line rises under the image.",
    mood: 2,
    lowerThird: "rise",
    frame: "band",
  },
  {
    id: "compass-tilt",
    name: "Compass Tilt",
    description: "Perspective tilt with a slow corrective settle.",
    mood: 3,
    lowerThird: "slide",
    frame: "cross",
  },
  {
    id: "calm-pull",
    name: "Calm Pull",
    description: "Starts close and pulls back to reveal the room.",
    mood: 0,
    lowerThird: "blur",
    frame: "stamp",
  },
  {
    id: "shutter-blinds",
    name: "Shutter Blinds",
    description: "Horizontal shutter stripes lift away.",
    mood: 5,
    lowerThird: "pop",
    frame: "scan",
  },
  {
    id: "luxe-parallax",
    name: "Luxe Parallax",
    description: "Image and light layer move at different speeds.",
    mood: 4,
    lowerThird: "wipe",
    frame: "edge",
  },
]

export const PRESET_BY_ID: Record<string, AdPreset> = Object.fromEntries(
  AD_PRESETS.map((preset) => [preset.id, preset]),
)

export const DEFAULT_MIN_PHOTOS = 2
export const DEFAULT_MAX_PHOTOS = 5
export const DEFAULT_DURATION_SEC = 15
export const MIN_DURATION_SEC = 8
/** Hard ceiling for every ad, enforced in the UI and the page state. */
export const MAX_DURATION_SEC = 15
export const MAX_PHOTOS_LIMIT = 10

export interface StudioPhoto {
  id: string
  /** Original file name, kept only for the local thumbnail label. */
  name: string
  /** Local blob URL. Never uploaded. */
  url: string
  note: string
}

export interface AdDetails {
  title: string
  location: string
  material: string
  highlight: string
}

export type AspectRatio = "16:9" | "9:16"
export type MotionEffect = "ken-burns" | "pan" | "fade-slide"

export interface MusicTrack {
  id: string
  name: string
  description: string
  mood: number
}

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: "warm-gold",
    name: "Warm Gold",
    description: "Warm ambient pad",
    mood: 0,
  },
  { id: "deep-navy", name: "Deep Navy", description: "Deep calm pad", mood: 1 },
  {
    id: "soft-ivory",
    name: "Soft Ivory",
    description: "Light elegant pad",
    mood: 2,
  },
  {
    id: "amber-glow",
    name: "Amber Glow",
    description: "Bright warm pad",
    mood: 3,
  },
  {
    id: "forest-calm",
    name: "Forest Calm",
    description: "Grounded calm pad",
    mood: 4,
  },
  { id: "rosewood", name: "Rosewood", description: "Rich warm pad", mood: 5 },
]

export interface AdScript {
  hook: string
  captions: string[]
  cta: string
  /** True when generated and not manually edited as a whole. */
  auto: boolean
}

export interface ServiceProject {
  photos: StudioPhoto[]
  details: AdDetails
  presetId: string
  minPhotos: number
  maxPhotos: number
  durationSec: number
  editorOpen: boolean
  aspect: AspectRatio
  motion: MotionEffect
  musicMode: "builtin" | "upload" | "mute"
  musicTrackId: string
  uploadedAudioName: string
  uploadedAudioUrl: string
  script: AdScript
}

export function createEmptyScript(): AdScript {
  return { hook: "", captions: [], cta: "", auto: false }
}

export function createEmptyProject(index: number): ServiceProject {
  return {
    photos: [],
    details: { title: "", location: "", material: "", highlight: "" },
    presetId: AD_PRESETS[index % AD_PRESETS.length].id,
    minPhotos: DEFAULT_MIN_PHOTOS,
    maxPhotos: DEFAULT_MAX_PHOTOS,
    durationSec: DEFAULT_DURATION_SEC,
    editorOpen: false,
    aspect: "16:9",
    motion: "ken-burns",
    musicMode: "builtin",
    musicTrackId: MUSIC_TRACKS[index % MUSIC_TRACKS.length].id,
    uploadedAudioName: "",
    uploadedAudioUrl: "",
    script: createEmptyScript(),
  }
}

/** Clears a draft but leaves the editor open so the card can be rebuilt in place. */
export function resetProjectDraft(
  current: ServiceProject,
  index: number,
): ServiceProject {
  return { ...createEmptyProject(index), editorOpen: current.editorOpen }
}

export function createInitialProjects(): Record<string, ServiceProject> {
  return Object.fromEntries(
    STUDIO_SERVICES.map((service, index) => [
      service.id,
      createEmptyProject(index),
    ]),
  )
}

export const AUTO_SCRIPT_MIN_PHOTOS = 5

const SCRIPT_HOOKS: Record<string, string[]> = {
  "pvc-ceiling": [
    "Give your ceiling a clean, modern finish.",
    "A fresh PVC ceiling can change the whole room.",
  ],
  "pvc-wall-paneling": [
    "Turn plain walls into a clean, finished look.",
    "Smart wall paneling, made for everyday living.",
  ],
  "wpc-fluted-panels": [
    "Add warm texture with fluted panel design.",
    "A feature wall that feels crafted and premium.",
  ],
  "wpc-louvers": [
    "Slim louvers, strong visual impact.",
    "Add depth and style with WPC louvers.",
  ],
  "gypsum-false-ceiling": [
    "Smooth lines, soft lighting, elegant ceiling.",
    "A gypsum ceiling that lifts the whole space.",
  ],
  "grid-t-ceiling": [
    "Clean, practical ceilings for workspaces.",
    "A neat grid ceiling with a professional finish.",
  ],
  "uv-marble-sheet": [
    "Get a marble look with a sleek finish.",
    "Premium marble-look walls, beautifully installed.",
  ],
  "tv-unit-design": [
    "Make your TV wall the highlight of the room.",
    "A custom TV unit with style and storage.",
  ],
  "led-profile-lighting": [
    "Add the glow that completes your interior.",
    "Slim LED profiles for a modern finish.",
  ],
  "artificial-grass": [
    "Bring fresh green vibes to your space.",
    "Low-maintenance green for balcony or terrace.",
  ],
  "partition-wall": [
    "Divide space smartly without losing style.",
    "A clean partition that fits your layout.",
  ],
}

const SCRIPT_CAPTION_TEMPLATES = [
  "Quality finish by JK Interior",
  "Designed for your space",
  "Clean detailing, neat execution",
  "Modern look, lasting impression",
  "From idea to finished result",
  "Crafted for homes and businesses",
  "A finish that stands out",
  "Style meets practical comfort",
  "Every detail handled with care",
  "Made to elevate your interior",
]

export function generateAdScript(
  service: ServiceDefinition,
  photoCount: number,
): AdScript {
  const hooks = SCRIPT_HOOKS[service.id] ?? [
    `Upgrade your space with ${service.name}.`,
  ]
  const hook = hooks[0]
  const captions = Array.from({ length: Math.max(0, photoCount) }, (_, i) => {
    if (i === 0) return `${service.name} by JK Interior`
    if (i === photoCount - 1) return `Serving ${STUDIO_REGION}`
    return SCRIPT_CAPTION_TEMPLATES[i % SCRIPT_CAPTION_TEMPLATES.length]
  })
  const cta = `WhatsApp ${STUDIO_WHATSAPP_DISPLAY} | Call ${STUDIO_CALL_DISPLAY} | ${STUDIO_WEBSITE.replace(/^https?:\/\//, "")}`
  return { hook, captions, cta, auto: true }
}

export function projectIsReady(project: ServiceProject): boolean {
  const count = project.photos.length
  return count >= project.minPhotos && count <= project.maxPhotos
}

export function sliceSeconds(project: ServiceProject): number {
  return project.photos.length > 0
    ? project.durationSec / project.photos.length
    : 0
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function formatSeconds(value: number): string {
  const safe = Math.max(0, value)
  const minutes = Math.floor(safe / 60)
  const seconds = Math.floor(safe % 60)
  return `${minutes}:${String(seconds).padStart(2, "0")}`
}
