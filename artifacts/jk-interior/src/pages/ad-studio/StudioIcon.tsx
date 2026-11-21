import type { ComponentProps, ReactNode } from "react"

/**
 * Inline SVG icon set for the private Ad Studio.
 *
 * The studio deliberately imports no icon package: every glyph below is a
 * handful of local paths, so the route stays pure React + CSS + Web Audio.
 */
export type StudioIconName =
  | "eye"
  | "eye-off"
  | "key"
  | "lock"
  | "shield-check"
  | "arrow-left"
  | "arrow-right"
  | "check"
  | "chevron-down"
  | "chevron-up"
  | "clapperboard"
  | "film"
  | "image-plus"
  | "info"
  | "minus"
  | "plus"
  | "settings"
  | "shuffle"
  | "warning"
  | "trash"
  | "upload"
  | "wand"
  | "x"
  | "globe"
  | "layers"
  | "map-pin"
  | "message"
  | "pause"
  | "phone"
  | "play"
  | "rotate"
  | "sparkles"
  | "volume"
  | "volume-off"
  | "panels"
  | "fluted"
  | "louvers"
  | "ceiling"
  | "grid"
  | "gem"
  | "tv"
  | "light"
  | "leaf"
  | "partition"

const ICONS: Record<StudioIconName, ReactNode> = {
  eye: (
    <>
      <path d="M2.5 12s3.4-5.7 9.5-5.7 9.5 5.7 9.5 5.7-3.4 5.7-9.5 5.7S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  "eye-off": (
    <>
      <path d="M4 4l16 16" />
      <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.1 0 9.5 5.7 9.5 5.7a17.4 17.4 0 0 1-3.2 3.8" />
      <path d="M6.2 7.1A17.3 17.3 0 0 0 2.5 12s3.4 5.7 9.5 5.7a10.7 10.7 0 0 0 4.2-.8" />
      <path d="M10.1 10.1a2.7 2.7 0 0 0 3.8 3.8" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="3.2" />
      <path d="M10.4 12.6 20 3" />
      <path d="m16.5 6.5 2 2" />
      <path d="m14 9 2 2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v2" />
    </>
  ),
  "shield-check": (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  "arrow-left": (
    <>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  check: <path d="m5 12 4 4 10-10" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-up": <path d="m6 15 6-6 6 6" />,
  clapperboard: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="1.5" />
      <path d="M4 8 7 4h4L8 8" />
      <path d="M12 8 15 4h4l-3 4" />
      <path d="M4 12h16" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4" />
    </>
  ),
  "image-plus": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.4" />
      <path d="m3 17 5-5 4 4 3-3 6 6" />
      <path d="M17 4v5M14.5 6.5h5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </>
  ),
  shuffle: (
    <>
      <path d="M3 7h4l10 10h4" />
      <path d="m18 14 3 3-3 3" />
      <path d="M3 17h4l10-10h4" />
      <path d="m18 4 3 3-3 3" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3 2.8 20h18.4L12 3Z" />
      <path d="M12 9v5" />
      <path d="M12 17h.01" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="m6 7 1 13h10l1-13" />
      <path d="M10 11v5M14 11v5" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M4 16v3h16v-3" />
    </>
  ),
  wand: (
    <>
      <path d="m4 20 10-10" />
      <path d="m14 4 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" />
      <path d="m19 10 .7 1.3L21 12l-1.3.7L19 14l-.7-1.3L17 12l1.3-.7L19 10Z" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3.5 3 14.5 0 18-3-3.5-3-14.5 0-18Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  message: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H4l2.2-3.3A8 8 0 1 1 21 12Z" />
      <path d="M8 12h8M8 9h5" />
    </>
  ),
  pause: <path d="M8 5v14M16 5v14" />,
  phone: (
    <path d="M5 3h3l2 5-2 1.5a13 13 0 0 0 6.5 6.5L16 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  ),
  play: <path d="M7 4v16l13-8L7 4Z" />,
  rotate: (
    <>
      <path d="M4 12a8 8 0 1 0 2.3-5.7" />
      <path d="M4 4v4h4" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
      <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
    </>
  ),
  volume: (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M16 8a5 5 0 0 1 0 8" />
      <path d="M18.5 5.5a8.5 8.5 0 0 1 0 13" />
    </>
  ),
  "volume-off": (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="m16 9 5 6M21 9l-5 6" />
    </>
  ),
  panels: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 3v18M15 3v18" />
    </>
  ),
  fluted: (
    <>
      <path d="M5 3c2 3 2 6 0 9s-2 6 0 9" />
      <path d="M10 3c2 3 2 6 0 9s-2 6 0 9" />
      <path d="M15 3c2 3 2 6 0 9s-2 6 0 9" />
      <path d="M20 3c2 3 2 6 0 9s-2 6 0 9" />
    </>
  ),
  louvers: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8h18M3 12h18M3 16h18" />
    </>
  ),
  ceiling: (
    <>
      <path d="M3 4h18" />
      <path d="M8 4v5h8V4" />
      <path d="M12 9v4" />
      <path d="M9 17a3 3 0 0 0 6 0" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
    </>
  ),
  gem: (
    <>
      <path d="m12 3 7 5-7 13L5 8l7-5Z" />
      <path d="m5 8 7 4 7-4" />
      <path d="M12 12v9" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  light: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M8.5 14.5a6 6 0 1 1 7 0c-.8.6-1.5 1.4-1.5 2.5h-4c0-1.1-.7-1.9-1.5-2.5Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4C12 4 5 8 5 15c0 2.5 1.5 5 4 5 7 0 11-7 11-16Z" />
      <path d="M4 21c2-6 7-10 12-12" />
    </>
  ),
  partition: (
    <>
      <rect x="3" y="4" width="7" height="16" rx="1" />
      <rect x="14" y="4" width="7" height="16" rx="1" />
      <path d="M10 12h4" />
    </>
  ),
}

interface StudioIconProps extends Omit<ComponentProps<"svg">, "name"> {
  name: StudioIconName
  size?: number
}

export function StudioIcon({ name, size = 16, ...props }: StudioIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {ICONS[name]}
    </svg>
  )
}
