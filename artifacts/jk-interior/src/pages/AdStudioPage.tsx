import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { AdAudio } from "./ad-studio/ad-audio"
import { AdPreview } from "./ad-studio/AdPreview"
import { ServiceCard } from "./ad-studio/ServiceCard"
import { StudioIcon } from "./ad-studio/StudioIcon"
import {
  AD_PRESETS,
  MAX_DURATION_SEC,
  MAX_PHOTOS_LIMIT,
  MIN_DURATION_SEC,
  PRESET_BY_ID,
  STUDIO_CALL_DISPLAY,
  STUDIO_REGION,
  STUDIO_SERVICES,
  STUDIO_WEBSITE,
  STUDIO_WHATSAPP_DISPLAY,
  clamp,
  createInitialProjects,
  projectIsReady,
  resetProjectDraft,
  type AdDetails,
  type ServiceProject,
} from "./ad-studio/studio-data"
import "./ad-studio/ad-studio-base.css"
import "./ad-studio/ad-studio-editor.css"
import "./ad-studio/ad-studio-preview.css"
import "./ad-studio/ad-studio-presets.css"

type GateState = "checking" | "locked" | "unlocked"

function makePhotoId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function")
    return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function revokeProjects(projects: Record<string, ServiceProject>) {
  for (const project of Object.values(projects)) {
    for (const photo of project.photos) URL.revokeObjectURL(photo.url)
  }
}

/**
 * The studio owns its own noindex head instead of importing react-helmet-async,
 * so the private route stays pure React + CSS. It updates the existing tags when
 * prerendered and only creates them when they are genuinely missing, which keeps
 * the prerendered HTML and the live page to one tag per field.
 */
function usePrivateStudioHead() {
  useEffect(() => {
    document.title = "Ad Studio — JK Interior"
    const setMeta = (name: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(
        `meta[name="${name}"]`,
      )
      if (!tag) {
        tag = document.createElement("meta")
        tag.setAttribute("name", name)
        document.head.appendChild(tag)
      }
      tag.setAttribute("content", "noindex, nofollow")
    }
    setMeta("robots")
    setMeta("googlebot")
  }, [])
}

export default function AdStudioPage() {
  usePrivateStudioHead()
  const [gate, setGate] = useState<GateState>("checking")
  const [gateError, setGateError] = useState("")
  const [pin, setPin] = useState("")
  const [showPin, setShowPin] = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [projects, setProjects] = useState<Record<string, ServiceProject>>(
    createInitialProjects,
  )
  const [previewServiceId, setPreviewServiceId] = useState<string | null>(null)

  const projectsRef = useRef(projects)
  projectsRef.current = projects
  const audioRef = useRef<AdAudio | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Ask the server whether the HttpOnly session is still valid. The page never
  // has the private key: the API returns only an unlocked/locked boolean.
  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 12_000)
    fetch("/api/ad-studio/auth", {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json().catch(() => null)
        if (cancelled) return
        if (response.ok && data?.unlocked === true) {
          setGate("unlocked")
          return
        }
        setGate("locked")
        if (response.status >= 500 && typeof data?.error === "string")
          setGateError(data.error)
      })
      .catch(() => {
        if (cancelled) return
        setGate("locked")
        setGateError(
          "Could not reach the studio service. Check your connection and try again.",
        )
      })
      .finally(() => window.clearTimeout(timeout))
    return () => {
      cancelled = true
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [])

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current)
      revokeProjects(projectsRef.current)
      audioRef.current?.destroy()
    }
  }, [])

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const key = pin.trim()
    if (!key || unlocking) return
    setUnlocking(true)
    setGateError("")
    try {
      const response = await fetch("/api/ad-studio/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ key }),
        cache: "no-store",
      })
      const data = await response.json().catch(() => null)
      if (response.ok && data?.unlocked === true) {
        setPin("")
        setLeaving(true)
        if (leaveTimer.current) clearTimeout(leaveTimer.current)
        leaveTimer.current = setTimeout(() => setGate("unlocked"), 240)
        return
      }
      setGateError(
        typeof data?.error === "string"
          ? data.error
          : response.status === 429
            ? "Too many attempts. Try again in a few minutes."
            : "Incorrect private key.",
      )
      setUnlocking(false)
    } catch {
      setGateError("Network error. Try again.")
      setUnlocking(false)
    }
  }

  async function lock() {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    leaveTimer.current = null
    setLeaving(false)
    audioRef.current?.stop()
    audioRef.current?.destroy()
    audioRef.current = null
    revokeProjects(projectsRef.current)
    setProjects(createInitialProjects())
    setPreviewServiceId(null)
    setPin("")
    setGateError("")
    setGate("locked")
    try {
      await fetch("/api/ad-studio/auth", {
        method: "DELETE",
        cache: "no-store",
      })
    } catch {
      // The screen is already locked; a failed cookie clear is retried on reload.
    }
  }

  function updateProject(
    serviceId: string,
    updater: (project: ServiceProject) => ServiceProject,
  ) {
    setProjects((previous) => {
      const project = previous[serviceId]
      if (!project) return previous
      return { ...previous, [serviceId]: updater(project) }
    })
  }

  function addPhotos(serviceId: string, files: File[]) {
    const project = projectsRef.current[serviceId]
    if (!project) return
    const room = Math.max(0, project.maxPhotos - project.photos.length)
    const accepted = files
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, room)
    if (accepted.length === 0) return

    const photos = accepted.map((file) => ({
      id: makePhotoId(),
      name: file.name,
      url: URL.createObjectURL(file),
      note: "",
    }))
    updateProject(serviceId, (current) => ({
      ...current,
      photos: [...current.photos, ...photos],
    }))
  }

  function removePhoto(serviceId: string, photoId: string) {
    const photo = projectsRef.current[serviceId]?.photos.find(
      (item) => item.id === photoId,
    )
    updateProject(serviceId, (current) => ({
      ...current,
      photos: current.photos.filter((item) => item.id !== photoId),
    }))
    if (photo) setTimeout(() => URL.revokeObjectURL(photo.url), 1_000)
  }

  function movePhoto(serviceId: string, from: number, to: number) {
    updateProject(serviceId, (current) => {
      if (
        from === to ||
        from < 0 ||
        to < 0 ||
        from >= current.photos.length ||
        to >= current.photos.length
      ) {
        return current
      }
      const photos = [...current.photos]
      const [moved] = photos.splice(from, 1)
      photos.splice(to, 0, moved)
      return { ...current, photos }
    })
  }

  function setPhotoNote(serviceId: string, photoId: string, note: string) {
    updateProject(serviceId, (current) => ({
      ...current,
      photos: current.photos.map((photo) =>
        photo.id === photoId ? { ...photo, note } : photo,
      ),
    }))
  }

  function setDetails(
    serviceId: string,
    field: keyof AdDetails,
    value: string,
  ) {
    updateProject(serviceId, (current) => ({
      ...current,
      details: { ...current.details, [field]: value },
    }))
  }

  function setPreset(serviceId: string, presetId: string) {
    updateProject(serviceId, (current) => ({ ...current, presetId }))
  }

  function shufflePreset(serviceId: string) {
    const current = projectsRef.current[serviceId]?.presetId
    const options = AD_PRESETS.filter((preset) => preset.id !== current)
    const next =
      options[Math.floor(Math.random() * options.length)] ?? AD_PRESETS[0]
    setPreset(serviceId, next.id)
  }

  function configure(
    serviceId: string,
    patch: Partial<
      Pick<ServiceProject, "minPhotos" | "maxPhotos" | "durationSec">
    >,
  ) {
    updateProject(serviceId, (current) => {
      const maxPhotos = clamp(
        patch.maxPhotos ?? current.maxPhotos,
        2,
        MAX_PHOTOS_LIMIT,
      )
      const minPhotos = clamp(
        patch.minPhotos ?? current.minPhotos,
        1,
        Math.min(5, maxPhotos),
      )
      const durationSec = clamp(
        patch.durationSec ?? current.durationSec,
        MIN_DURATION_SEC,
        MAX_DURATION_SEC,
      )
      return { ...current, minPhotos, maxPhotos, durationSec }
    })
  }

  function toggleEditor(serviceId: string) {
    updateProject(serviceId, (current) => ({
      ...current,
      editorOpen: !current.editorOpen,
    }))
  }

  function resetDraft(serviceId: string) {
    const project = projectsRef.current[serviceId]
    if (!project) return
    const index = STUDIO_SERVICES.findIndex(
      (service) => service.id === serviceId,
    )
    for (const photo of project.photos) URL.revokeObjectURL(photo.url)
    updateProject(serviceId, (current) =>
      resetProjectDraft(current, Math.max(0, index)),
    )
  }

  function openPreview(serviceId: string) {
    const project = projectsRef.current[serviceId]
    if (!project || !projectIsReady(project)) return
    // Create/resume the AudioContext inside this click so mobile browsers allow it.
    if (!audioRef.current) audioRef.current = new AdAudio()
    audioRef.current.ensure()
    setPreviewServiceId(serviceId)
  }

  const readyCount = STUDIO_SERVICES.filter((service) =>
    projectIsReady(projects[service.id]),
  ).length
  const totalPhotos = Object.values(projects).reduce(
    (total, project) => total + project.photos.length,
    0,
  )
  const previewService = STUDIO_SERVICES.find(
    (service) => service.id === previewServiceId,
  )
  const previewProject = previewServiceId
    ? projects[previewServiceId]
    : undefined
  const previewPreset = previewProject
    ? (PRESET_BY_ID[previewProject.presetId] ?? AD_PRESETS[0])
    : undefined

  if (gate !== "unlocked") {
    return (
      <div className="jk-ad-studio">
        <div className={`jk-lock-screen ${leaving ? "is-leaving" : ""}`}>
          <div className="jk-lock-orb jk-lock-orb-a" aria-hidden="true" />
          <div className="jk-lock-orb jk-lock-orb-b" aria-hidden="true" />
          <div className="jk-lock-grid" aria-hidden="true" />

          <div className="jk-lock-card">
            <div className="jk-lock-brand">
              <span className="jk-brand-mark">JK</span>
              <div className="jk-lock-brand-copy">
                <strong>JK Interior</strong>
                <span>Ad Studio · Private</span>
              </div>
            </div>

            <p className="jk-lock-eyebrow">Private creative workspace</p>
            <h1 className="jk-lock-title">
              Ad <em>Studio</em>
            </h1>
            <p className="jk-lock-sub">
              Unlock the local ad builder for JK Interior&apos;s eleven
              services. Photos never leave this device.
            </p>

            {gate === "checking" ? (
              <div className="jk-lock-status">
                <span className="jk-spinner" />
                Checking secure session…
              </div>
            ) : (
              <form className="jk-lock-form" onSubmit={unlock}>
                {gateError ? (
                  <p className="jk-lock-error" role="alert">
                    <StudioIcon name="key" size={13} />
                    {gateError}
                  </p>
                ) : null}

                <div className="jk-pin-wrap">
                  <input
                    className="jk-pin-input"
                    type={showPin ? "text" : "password"}
                    value={pin}
                    onChange={(event) => setPin(event.target.value)}
                    placeholder="Private key / PIN"
                    autoComplete="current-password"
                    autoFocus
                    aria-label="Private key or PIN"
                  />
                  <button
                    type="button"
                    className="jk-pin-toggle"
                    onClick={() => setShowPin((visible) => !visible)}
                    aria-label={
                      showPin ? "Hide private key" : "Show private key"
                    }
                  >
                    {showPin ? (
                      <StudioIcon name="eye-off" size={15} />
                    ) : (
                      <StudioIcon name="eye" size={15} />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="jk-btn jk-btn-gold jk-lock-submit"
                  disabled={unlocking || !pin.trim()}
                >
                  {unlocking ? (
                    <>
                      <span className="jk-spinner" />
                      Unlocking…
                    </>
                  ) : (
                    <>
                      <StudioIcon name="lock" size={14} />
                      Unlock studio
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="jk-lock-note">
              <strong>Server-verified.</strong> The key is checked against the
              deployment&apos;s private environment variable. A signed HttpOnly
              session is used; the key is never stored in this browser.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="jk-ad-studio">
      <header className="jk-studio-topbar">
        <div className="jk-topbar-brand">
          <span className="jk-brand-mark">JK</span>
          <div className="jk-topbar-copy">
            <strong>Ad Studio</strong>
            <span>JK Interior · Private</span>
          </div>
        </div>
        <div className="jk-topbar-actions">
          <span className="jk-private-pill">
            <span className="jk-private-dot" />
            Private session
          </span>
          <button type="button" className="jk-btn jk-btn-quiet" onClick={lock}>
            <StudioIcon name="lock" size={13} />
            Lock
          </button>
        </div>
      </header>

      <main className="jk-studio-main">
        <section className="jk-hero">
          <div>
            <p className="jk-eyebrow">Service ads · composed locally</p>
            <h1>
              Eleven services.
              <br />
              <em>Twenty-four ways to move.</em>
            </h1>
            <p className="jk-hero-sub">
              Pick a service, drop in photos, write a short lower third and
              preview a 15-second ad.{" "}
              <strong>Photos stay in this browser</strong> — no upload, no
              server copy, no external audio.
            </p>
          </div>

          <aside className="jk-hero-panel">
            <div className="jk-stat-grid">
              <div className="jk-stat">
                <strong>{STUDIO_SERVICES.length}</strong>
                <span>Services</span>
              </div>
              <div className="jk-stat">
                <strong>{AD_PRESETS.length}</strong>
                <span>Designs</span>
              </div>
              <div className="jk-stat">
                <strong>
                  {readyCount}/{STUDIO_SERVICES.length}
                </strong>
                <span>Ads ready</span>
              </div>
              <div className="jk-stat">
                <strong>{totalPhotos}</strong>
                <span>Local photos</span>
              </div>
            </div>
            <p className="jk-privacy-note">
              <StudioIcon name="shield-check" size={13} />
              Server-gated studio. Images are read with local object URLs and
              never sent to an API.
            </p>
          </aside>
        </section>

        <div className="jk-service-grid">
          {STUDIO_SERVICES.map((service, index) => {
            const project = projects[service.id]
            const preset = PRESET_BY_ID[project.presetId] ?? AD_PRESETS[0]
            return (
              <ServiceCard
                key={service.id}
                service={service}
                project={project}
                preset={preset}
                index={index}
                onAddPhotos={(files) => addPhotos(service.id, files)}
                onRemovePhoto={(photoId) => removePhoto(service.id, photoId)}
                onMovePhoto={(from, to) => movePhoto(service.id, from, to)}
                onPhotoNote={(photoId, note) =>
                  setPhotoNote(service.id, photoId, note)
                }
                onDetails={(field, value) =>
                  setDetails(service.id, field, value)
                }
                onPreset={(presetId) => setPreset(service.id, presetId)}
                onShufflePreset={() => shufflePreset(service.id)}
                onConfig={(patch) => configure(service.id, patch)}
                onToggleEditor={() => toggleEditor(service.id)}
                onPreview={() => openPreview(service.id)}
                onResetDraft={() => resetDraft(service.id)}
              />
            )
          })}
        </div>

        <footer className="jk-studio-foot">
          <span>
            <strong>JK Interior</strong> · {STUDIO_REGION} · WhatsApp{" "}
            {STUDIO_WHATSAPP_DISPLAY} · Call {STUDIO_CALL_DISPLAY} ·{" "}
            {STUDIO_WEBSITE.replace(/^https?:\/\//, "")}
          </span>
          <span>Private tool · noindex · local media only</span>
        </footer>
      </main>

      {previewService && previewProject && previewPreset && audioRef.current ? (
        <AdPreview
          service={previewService}
          project={previewProject}
          preset={previewPreset}
          audio={audioRef.current}
          onClose={() => setPreviewServiceId(null)}
        />
      ) : null}
    </div>
  )
}
