import type { ComponentProps } from "react"
import { StudioIcon, type StudioIconName } from "./StudioIcon"
import type { ServiceIcon } from "./studio-data"

/**
 * Maps the studio's service names onto the local inline SVG set. Keeping this
 * mapping here means the card code never needs to know about a third-party
 * icon package, and the studio stays pure React + CSS.
 */
const GLYPHS: Record<ServiceIcon, StudioIconName> = {
  layers: "layers",
  panels: "panels",
  fluted: "fluted",
  louvers: "louvers",
  ceiling: "ceiling",
  grid: "grid",
  marble: "gem",
  tv: "tv",
  light: "light",
  leaf: "leaf",
  partition: "partition",
}

export function ServiceGlyph({
  icon,
  size = 17,
  ...props
}: { icon: ServiceIcon; size?: number } & Omit<ComponentProps<"svg">, "name">) {
  return <StudioIcon name={GLYPHS[icon]} size={size} {...props} />
}
