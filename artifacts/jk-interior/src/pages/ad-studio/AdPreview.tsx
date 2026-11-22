import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { AdAudio } from "./ad-audio"
import { StudioIcon } from "./StudioIcon"
import {
  MOOD_NAMES,
  STUDIO_AREAS,
  STUDIO_CALL_DISPLAY,
  STUDIO_CALL_URL,
  STUDIO_REGION,
  STUDIO_WEBSITE,
  STUDIO_WHATSAPP_DISPLAY,
  STUDIO_WHATSAPP_URL,
  formatSeconds,
  type AdPreset,
  type ServiceDefinition,
  type ServiceProject,
} from "./studio-data"

interface AdPreviewProps {
  service: ServiceDefinition
  project: ServiceProject
  preset: AdPreset
  audio: AdAudio
  onClose: () => void
}

export function AdPreview({
  service,
  project,
  preset,
  audio,
  onClose,
}: AdPreviewProps) {
  const photos = project.photos
  const count = photos.length
  const duration = project.durationSec
  const slice = count > 0 ? duration / count : duration

  const [playing, setPlaying] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [showOutro, setShowOutro] = useState(false)
  const [muted, setMuted] = useState(audio.isMuted)
  const [volume, setVolume] = useState(audio.currentVolume)

  const elapsedRef = useRef(0)
  const indexRef = useRef(0)
  const closeRef = useRef<HTMLButtonElement>(null)

  const photo = photos[photoIndex] ?? photos[0]
  const progress = duration > 0 ? Math.min(100, (elapsed / duration) * 100) : 0
  const title = project.details.title.trim()
  const location = project.details.location.trim()
  const material = project.details.material.trim()
  const highlight = project.details.highlight.trim()
  const note = photo?.note.trim() ?? ""
  const moodName = MOOD_NAMES[preset.mood] ?? MOOD_NAMES[0]

  function handleClose() {
    audio.stop()
    onClose()
  }

  function handleToggle() {
    if (showOutro) {
      handleReplay()
      return
    }
    if (playing) {
      setPlaying(false)
      audio.pause()
    } else {
      setPlaying(true)
      audio.start(preset.mood)
    }
  }

  function handleReplay() {
    elapsedRef.current = 0
    indexRef.current = 0
    setElapsed(0)
    setPhotoIndex(0)
    setShowOutro(false)
    setPlaying(true)
    audio.start(preset.mood)
    audio.cue(0)
  }

  function handleMute() {
    const next = !muted
    setMuted(next)
    audio.setMuted(next)
  }

  function handleVolume(next: number) {
    setVolume(next)
    if (muted && next > 0) {
      setMuted(false)
      audio.setMuted(false)
    }
    audio.setVolume(next)
  }

  // Start the pad and playback on mount. The page called audio.ensure() inside
  // the Preview click, so mobile autoplay policy has already seen a gesture.
  useEffect(() => {
    audio.ensure()
    audio.setVolume(volume)
    audio.setMuted(muted)
    audio.start(preset.mood)
    audio.cue(0)
    closeRef.current?.focus()
    return () => audio.stop()
    // Mount-only: the preview owns one fixed project snapshot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!playing || showOutro || count === 0) return
    audio.start(preset.mood)
    const startedAt = performance.now() - elapsedRef.current * 1_000

    const timer = window.setInterval(() => {
      const next = (performance.now() - startedAt) / 1_000
      if (next >= duration) {
        elapsedRef.current = duration
        setElapsed(duration)
        setPlaying(false)
        setShowOutro(true)
        audio.outro()
        return
      }
      elapsedRef.current = next
      setElapsed(next)
      const nextIndex = Math.min(count - 1, Math.floor(next / slice))
      if (nextIndex !== indexRef.current) {
        indexRef.current = nextIndex
        setPhotoIndex(nextIndex)
        audio.cue(nextIndex)
      }
    }, 100)

    return () => window.clearInterval(timer)
  }, [playing, showOutro, duration, slice, count, preset.mood, audio])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        audio.stop()
        onClose()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [audio, onClose])

  return (
    <div
      className="jk-preview-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${service.name} ad preview`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose()
      }}
    >
      <div className="jk-preview-panel">
        <div className="jk-preview-top">
          <div className="jk-preview-brand">
            <span className="jk-preview-mark">JK</span>
            <div className="jk-preview-copy">
              <strong>{service.name}</strong>
              <span>
                {preset.name} · {count} photo{count === 1 ? "" : "s"} ·{" "}
                {duration}s
              </span>
            </div>
            <span
              className="jk-preview-mood"
              title={`Live Web Audio mood: ${moodName}`}
            >
              <span className="jk-preview-mood-dot" />
              {moodName}
            </span>
          </div>

          <div className="jk-preview-timer" aria-live="off">
            <span className={`jk-preview-live ${playing ? "" : "is-paused"}`} />
            {formatSeconds(elapsed)}
            <span>/ {formatSeconds(duration)}</span>
          </div>

          <div className="jk-preview-audio">
            <button
              type="button"
              className="jk-icon-btn jk-btn"
              onClick={handleMute}
              aria-label={muted ? "Unmute music" : "Mute music"}
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <StudioIcon name="volume-off" size={15} />
              ) : (
                <StudioIcon name="volume" size={15} />
              )}
            </button>
            <input
              className="jk-preview-range"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(event) => handleVolume(Number(event.target.value))}
              aria-label="Music volume"
            />
          </div>

          <button
            ref={closeRef}
            type="button"
            className="jk-preview-close"
            onClick={handleClose}
            aria-label="Close ad preview"
          >
            <StudioIcon name="x" size={15} />
          </button>
        </div>

        <div
          className="jk-ad-frame"
          data-preset={preset.id}
          data-frame={preset.frame}
          data-lower={preset.lowerThird}
          data-slide={photoIndex % 2 === 0 ? "a" : "b"}
          style={{ "--jk-slice": `${slice}s` } as CSSProperties}
        >
          <div className="jk-ad-stage">
            <div className="jk-ad-photo-wrap" key={photo?.id ?? "empty"}>
              {photo ? (
                <img
                  className="jk-ad-photo"
                  src={photo.url}
                  alt={photo.name}
                  draggable={false}
                />
              ) : (
                <div className="jk-ad-empty">No photos selected</div>
              )}
              <div className="jk-ad-fx" aria-hidden="true" />
            </div>
            <div className="jk-ad-vignette" aria-hidden="true" />
          </div>

          <span className="jk-ad-frame-mark" aria-hidden="true" />

          <div className="jk-ad-lower">
            <div
              className="jk-ad-lower-inner"
              key={`lt-${photo?.id ?? "empty"}-${photoIndex}`}
            >
              <div className="jk-ad-lt-top">
                <span className="jk-ad-lt-brand">JK Interior</span>
                <span className="jk-ad-lt-service">{service.name}</span>
              </div>
              {title ? <p className="jk-ad-lt-title">{title}</p> : null}
              <div className="jk-ad-lt-details">
                {location ? (
                  <span>
                    <StudioIcon name="map-pin" size={10} />
                    {location}
                  </span>
                ) : null}
                {material ? (
                  <span>
                    <StudioIcon name="layers" size={10} />
                    {material}
                  </span>
                ) : null}
                {highlight ? (
                  <span className="jk-ad-lt-highlight">
                    <StudioIcon name="sparkles" size={10} />
                    {highlight}
                  </span>
                ) : null}
              </div>
              {note ? <p className="jk-ad-lt-note">{note}</p> : null}
              <p className="jk-ad-lt-foot">
                {STUDIO_REGION} · {photoIndex + 1}/{count}
              </p>
            </div>
          </div>

          {showOutro ? (
            <div
              className="jk-ad-outro"
              role="group"
              aria-label="Final call to action"
            >
              <div className="jk-ad-outro-inner">
                <p className="jk-ad-outro-eyebrow">
                  JK Interior · {STUDIO_REGION}
                </p>
                <h2>
                  Give your space
                  <br />
                  <em>a finished look.</em>
                </h2>
                <p className="jk-ad-outro-sub">
                  {service.name} · serving all 10 service areas
                </p>

                <div className="jk-ad-areas">
                  {STUDIO_AREAS.map((area) => (
                    <span className="jk-ad-area" key={area}>
                      {area}
                    </span>
                  ))}
                </div>

                <div className="jk-ad-contacts">
                  <a
                    className="jk-ad-contact"
                    href={STUDIO_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`WhatsApp ${STUDIO_WHATSAPP_DISPLAY}`}
                  >
                    <StudioIcon name="message" size={12} />
                    <span>WhatsApp {STUDIO_WHATSAPP_DISPLAY}</span>
                  </a>
                  <a
                    className="jk-ad-contact"
                    href={STUDIO_CALL_URL}
                    title={`Call ${STUDIO_CALL_DISPLAY}`}
                  >
                    <StudioIcon name="phone" size={12} />
                    <span>Call {STUDIO_CALL_DISPLAY}</span>
                  </a>
                  <a
                    className="jk-ad-contact"
                    href={STUDIO_WEBSITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={STUDIO_WEBSITE}
                  >
                    <StudioIcon name="globe" size={12} />
                    <span>{STUDIO_WEBSITE.replace(/^https?:\/\//, "")}</span>
                  </a>
                </div>

                <div className="jk-ad-outro-actions">
                  <button
                    type="button"
                    className="jk-preview-btn jk-preview-btn-primary"
                    onClick={handleReplay}
                  >
                    <StudioIcon name="rotate" size={13} />
                    Replay
                  </button>
                  <button
                    type="button"
                    className="jk-preview-btn"
                    onClick={handleClose}
                  >
                    <StudioIcon name="x" size={13} />
                    Back to editor
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="jk-ad-progress">
          <div
            className="jk-ad-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="jk-preview-controls">
          <button
            type="button"
            className="jk-preview-btn jk-preview-btn-primary"
            onClick={handleToggle}
          >
            {showOutro ? (
              <StudioIcon name="rotate" size={13} />
            ) : playing ? (
              <StudioIcon name="pause" size={13} />
            ) : (
              <StudioIcon name="play" size={13} />
            )}
            {showOutro ? "Replay" : playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            className="jk-preview-btn"
            onClick={handleReplay}
          >
            <StudioIcon name="rotate" size={13} />
            Restart
          </button>
          <button type="button" className="jk-preview-btn" onClick={handleMute}>
            {muted ? (
              <StudioIcon name="volume-off" size={13} />
            ) : (
              <StudioIcon name="volume" size={13} />
            )}
            {muted ? "Unmute" : "Mute"}
          </button>
          <span className="jk-preview-hint">
            Music generated live with Web Audio · Esc to close
          </span>
        </div>
      </div>
    </div>
  )
}
