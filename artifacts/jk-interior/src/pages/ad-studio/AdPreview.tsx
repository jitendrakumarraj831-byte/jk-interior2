import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { AdAudio } from "./ad-audio"
import { StudioIcon } from "./StudioIcon"
import {
  MOOD_NAMES,
  OUTRO_DURATION_SEC,
  STUDIO_AREAS,
  STUDIO_CALL_DISPLAY,
  STUDIO_CALL_URL,
  STUDIO_REGION,
  STUDIO_WEBSITE,
  STUDIO_WHATSAPP_DISPLAY,
  STUDIO_WHATSAPP_URL,
  TRANSITION_OPTIONS,
  clamp,
  clipCaption,
  clipIndexAtTime,
  clipTimeline,
  formatSeconds,
  totalClipSeconds,
  totalVideoSeconds,
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
  const timeline = clipTimeline(project)
  const count = timeline.length
  const clipTotal = totalClipSeconds(project)
  const duration = totalVideoSeconds(project)

  const [playing, setPlaying] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [muted, setMuted] = useState(audio.isMuted)
  const [volume, setVolume] = useState(audio.currentVolume)
  const [seekEpoch, setSeekEpoch] = useState(0)

  const elapsedRef = useRef(0)
  const lastIndexRef = useRef(0)
  const outroRef = useRef(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  const activeIndex =
    count > 0 ? clipIndexAtTime(project, Math.min(elapsed, clipTotal)) : 0
  const activeClip = timeline[activeIndex]
  const activePhoto = activeClip?.photo
  const local = activeClip ? Math.max(0, elapsed - activeClip.start) : 0
  const showOutro = count > 0 && elapsed >= clipTotal
  const transitionWindow = activeClip
    ? Math.min(0.6, Math.max(0.3, activeClip.duration * 0.18))
    : 0.5
  const inTransition =
    !!activeClip &&
    playing &&
    !showOutro &&
    activeIndex > 0 &&
    activeClip.photo.transition !== "cut" &&
    local < transitionWindow
  const previousClip = inTransition ? timeline[activeIndex - 1] : undefined

  const progress = duration > 0 ? Math.min(100, (elapsed / duration) * 100) : 0
  const title = project.details.title.trim()
  const location = project.details.location.trim()
  const material = project.details.material.trim()
  const highlight = project.details.highlight.trim()
  const caption = activeIndex >= 0 ? clipCaption(project, activeIndex) : ""
  const note = activePhoto?.note.trim() ?? ""
  const moodName = MOOD_NAMES[preset.mood] ?? MOOD_NAMES[0]
  const audioLabel =
    project.musicMode === "mute"
      ? "Muted"
      : project.musicMode === "upload"
        ? project.uploadedAudioUrl
          ? "Uploaded audio"
          : "No audio file"
        : moodName
  const transitionLabel =
    activeIndex > 0
      ? (TRANSITION_OPTIONS.find(
          (option) => option.id === activeClip?.photo.transition,
        )?.label ?? "Cut")
      : "Opening"

  function handleClose() {
    audio.stop()
    audio.stopUploaded()
    onClose()
  }

  function handleToggle() {
    if (elapsedRef.current >= duration - 0.05) {
      handleReplay()
      return
    }
    setPlaying((value) => !value)
  }

  function handleReplay() {
    elapsedRef.current = 0
    lastIndexRef.current = 0
    outroRef.current = false
    setElapsed(0)
    setPlaying(true)
    setSeekEpoch((value) => value + 1)
    audio.stop()
    audio.stopUploaded()
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

  function seekTo(next: number) {
    const safe = clamp(next, 0, duration)
    elapsedRef.current = safe
    lastIndexRef.current =
      count > 0 ? clipIndexAtTime(project, Math.min(safe, clipTotal)) : 0
    outroRef.current = safe >= clipTotal
    setElapsed(safe)
    setSeekEpoch((value) => value + 1)
    if (safe >= duration - 0.02) setPlaying(false)
  }

  // Start the audio graph and keep the preview scroll-locked. The page called
  // audio.ensure() inside the Preview click, so mobile autoplay policy has
  // already seen a user gesture.
  useEffect(() => {
    audio.ensure()
    audio.setVolume(volume)
    audio.setMuted(muted)
    closeRef.current?.focus()
    return () => {
      audio.stop()
      audio.stopUploaded()
    }
    // Mount-only: the preview owns one fixed project snapshot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Transport clock. Elapsed time drives both the visual stage and the audio
  // transport, including the closing CTA card.
  useEffect(() => {
    if (!playing) return
    const startedAt = performance.now() - elapsedRef.current * 1_000

    const timer = window.setInterval(() => {
      const next = (performance.now() - startedAt) / 1_000
      if (next >= duration) {
        elapsedRef.current = duration
        setElapsed(duration)
        setPlaying(false)
        if (project.musicMode === "builtin") audio.pause()
        else audio.stopUploaded()
        return
      }
      elapsedRef.current = next
      setElapsed(next)

      if (next >= clipTotal && !outroRef.current) {
        outroRef.current = true
        if (project.musicMode === "builtin") audio.outro()
        else audio.stopUploaded()
      }

      if (count > 0 && next < clipTotal) {
        const nextIndex = clipIndexAtTime(project, next)
        if (nextIndex !== lastIndexRef.current) {
          lastIndexRef.current = nextIndex
          if (project.musicMode === "builtin") audio.cue(nextIndex)
        }
      }
    }, 100)

    return () => window.clearInterval(timer)
  }, [playing, duration, clipTotal, count, project, audio, seekEpoch])

  // Audio transport: built-in pad, decoded uploaded buffer, or mute. Uploaded
  // audio is decoded through AudioContext/AudioBuffer and restarted at the
  // current playhead on every seek.
  useEffect(() => {
    if (project.musicMode === "mute") {
      audio.stop()
      audio.stopUploaded()
      return
    }
    if (!playing) {
      if (project.musicMode === "builtin") audio.pause()
      else audio.stopUploaded()
      return
    }
    if (showOutro) {
      if (project.musicMode === "upload") audio.stopUploaded()
      return
    }
    if (project.musicMode === "builtin") {
      audio.stopUploaded()
      audio.start(preset.mood)
      return
    }
    if (!project.uploadedAudioUrl) {
      audio.stopUploaded()
      return
    }

    let cancelled = false
    audio.stop()
    void (async () => {
      const buffer = await audio.loadUploaded(project.uploadedAudioUrl)
      if (cancelled || !buffer) return
      audio.startUploaded(buffer, elapsedRef.current, true)
    })()
    return () => {
      cancelled = true
    }
  }, [
    playing,
    showOutro,
    project.musicMode,
    project.uploadedAudioUrl,
    preset.mood,
    seekEpoch,
    audio,
  ])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        audio.stop()
        audio.stopUploaded()
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
                {preset.name} · {count} clip{count === 1 ? "" : "s"} ·{" "}
                {formatSeconds(duration)}
              </span>
            </div>
            <span className="jk-preview-mood" title={`Audio: ${audioLabel}`}>
              <span className="jk-preview-mood-dot" />
              {audioLabel}
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
          data-aspect={project.aspect}
          data-playing={playing ? "true" : "false"}
          data-slide={activeIndex % 2 === 0 ? "a" : "b"}
          style={
            {
              "--jk-slice": `${activeClip?.duration ?? 3}s`,
              "--jk-transition": `${transitionWindow}s`,
            } as CSSProperties
          }
        >
          <div className="jk-ad-stage">
            {previousClip ? (
              <div
                className={`jk-ad-layer is-out-${previousClip.photo.transition}`}
                key={`out-${previousClip.photo.id}-${seekEpoch}`}
              >
                <div className="jk-ad-photo-wrap">
                  <img
                    className="jk-ad-photo"
                    src={previousClip.photo.url}
                    alt=""
                    draggable={false}
                    data-filter={previousClip.photo.filter}
                    style={
                      {
                        "--jk-slice": `${previousClip.duration}s`,
                      } as CSSProperties
                    }
                  />
                  <div className="jk-ad-fx" aria-hidden="true" />
                </div>
              </div>
            ) : null}

            <div
              className={`jk-ad-layer ${inTransition ? `is-in-${activeClip?.photo.transition}` : ""}`}
              key={`${activePhoto?.id ?? "empty"}-${seekEpoch}`}
            >
              <div className="jk-ad-photo-wrap">
                {activePhoto ? (
                  <img
                    className="jk-ad-photo"
                    src={activePhoto.url}
                    alt={activePhoto.name}
                    draggable={false}
                    data-filter={activePhoto.filter}
                  />
                ) : (
                  <div className="jk-ad-empty">No photos selected</div>
                )}
                <div className="jk-ad-fx" aria-hidden="true" />
              </div>
            </div>

            <div className="jk-ad-vignette" aria-hidden="true" />
          </div>

          <span className="jk-ad-frame-mark" aria-hidden="true" />

          <div className="jk-ad-lower">
            <div
              className="jk-ad-lower-inner"
              key={`lt-${activePhoto?.id ?? "empty"}-${activeIndex}`}
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
              {caption ? <p className="jk-ad-lt-caption">{caption}</p> : null}
              {note && note !== caption ? (
                <p className="jk-ad-lt-note">{note}</p>
              ) : null}
              <p className="jk-ad-lt-foot">
                {STUDIO_REGION} · {Math.min(activeIndex + 1, count)}/{count} ·{" "}
                {transitionLabel}
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
                  {project.script.hook ? (
                    project.script.hook
                  ) : (
                    <>
                      Give your space
                      <br />
                      <em>a finished look.</em>
                    </>
                  )}
                </h2>
                <p className="jk-ad-outro-sub">
                  {project.script.cta ||
                    `${service.name} · serving all ${STUDIO_AREAS.length} service areas`}
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

        <div className="jk-ad-scrub">
          <div className="jk-ad-progress" aria-hidden="true">
            <div
              className="jk-ad-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span
            className="jk-ad-scrub-thumb"
            style={{ left: `${progress}%` }}
            aria-hidden="true"
          />
          <input
            className="jk-ad-scrub-range"
            type="range"
            min={0}
            max={Math.max(0.1, duration)}
            step={0.05}
            value={Math.min(elapsed, duration)}
            onChange={(event) => seekTo(Number(event.target.value))}
            aria-label="Seek video"
            aria-valuetext={`${formatSeconds(elapsed)} of ${formatSeconds(duration)}`}
          />
        </div>

        <div className="jk-preview-controls">
          <button
            type="button"
            className="jk-preview-btn jk-preview-btn-primary"
            onClick={handleToggle}
          >
            {elapsed >= duration - 0.05 ? (
              <StudioIcon name="rotate" size={13} />
            ) : playing ? (
              <StudioIcon name="pause" size={13} />
            ) : (
              <StudioIcon name="play" size={13} />
            )}
            {elapsed >= duration - 0.05 ? "Replay" : playing ? "Pause" : "Play"}
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
          <span className="jk-preview-clipinfo">
            Clip {Math.min(activeIndex + 1, count)}/{count} ·{" "}
            {activeClip ? `${activeClip.duration.toFixed(1)}s` : "0s"} ·{" "}
            {showOutro ? `CTA ${OUTRO_DURATION_SEC}s` : transitionLabel}
          </span>
          <span className="jk-preview-hint">
            Scrub the timeline · Esc to close
          </span>
        </div>
      </div>
    </div>
  )
}
