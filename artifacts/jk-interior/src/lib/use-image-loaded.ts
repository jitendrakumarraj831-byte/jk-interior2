import { useCallback, useState } from "react"

/**
 * Tracks whether an `<img>` has finished loading, for the fade-in-over-skeleton
 * pattern used by the gallery grids.
 *
 * `onLoad` alone is not enough. A browser can finish decoding a cached image
 * before React has attached the handler, and the `load` event does not replay —
 * so the tile stayed at `opacity: 0` over its pulsing placeholder forever. That
 * made every gallery photo invisible the *second* time a modal was opened, which
 * is the visit where it should have been instant.
 *
 * The ref callback closes that gap: when React attaches to the node it checks
 * `complete` (plus `naturalWidth`, because a failed load also reports complete)
 * and settles the state there and then.
 *
 * `onError` also settles it — a photo that 404s should reveal the alt text, not
 * leave a skeleton animating in place indefinitely.
 */
export function useImageLoaded() {
  const [loaded, setLoaded] = useState(false)

  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node && node.complete && node.naturalWidth > 0) setLoaded(true)
  }, [])

  const onLoad = useCallback(() => setLoaded(true), [])
  const onError = useCallback(() => setLoaded(true), [])

  return { loaded, imgRef, onLoad, onError }
}
