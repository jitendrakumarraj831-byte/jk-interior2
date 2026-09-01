import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

interface GalleryModalContextValue {
  isGalleryOpen: boolean
  openGalleryModal: () => void
  closeGalleryModal: () => void
}

const GalleryModalContext = createContext<GalleryModalContextValue | null>(null)

/**
 * App-wide open/close state for the design-search gallery modal. Mounted once
 * in `App.tsx` (see `GalleryModalHost` in `components/design-search-modal.tsx`)
 * so any trigger, anywhere in the tree — the Gallery section's "Search Design
 * Ideas" button, the mobile sticky bar's "View Designs" button — opens the
 * exact same always-present modal instead of each owning a private copy of
 * `open` that only works if that trigger's own subtree happens to render it.
 */
export function GalleryModalProvider({ children }: { children: ReactNode }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const openGalleryModal = useCallback(() => setIsGalleryOpen(true), [])
  const closeGalleryModal = useCallback(() => setIsGalleryOpen(false), [])

  const value = useMemo(
    () => ({ isGalleryOpen, openGalleryModal, closeGalleryModal }),
    [isGalleryOpen, openGalleryModal, closeGalleryModal]
  )

  return <GalleryModalContext.Provider value={value}>{children}</GalleryModalContext.Provider>
}

export function useGalleryModal(): GalleryModalContextValue {
  const ctx = useContext(GalleryModalContext)
  if (!ctx) throw new Error("useGalleryModal must be used within a GalleryModalProvider")
  return ctx
}
