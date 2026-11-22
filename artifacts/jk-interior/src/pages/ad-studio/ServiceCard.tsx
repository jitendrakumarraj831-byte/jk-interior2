import { useEffect, useId, useRef, useState } from "react"
import type { ChangeEvent, DragEvent, KeyboardEvent } from "react"
import { ServiceGlyph } from "./ServiceGlyph"
import { StudioIcon } from "./StudioIcon"
import {
  AD_PRESETS,
  AUTO_SCRIPT_MIN_PHOTOS,
  CLIP_MAX_DURATION_SEC,
  CLIP_MIN_DURATION_SEC,
  FILTER_OPTIONS,
  MAX_PHOTOS_LIMIT,
  MUSIC_TRACKS,
  OUTRO_DURATION_SEC,
  TRANSITION_OPTIONS,
  clipTimeline,
  formatSeconds,
  totalClipSeconds,
  totalVideoSeconds,
  type AdDetails,
  type AdPreset,
  type AspectRatio,
  type FilterLook,
  type MotionEffect,
  type ServiceDefinition,
  type ServiceProject,
  type TransitionStyle,
} from "./studio-data"

type FlashTone = "good" | "warn" | "over"

interface ServiceCardProps {
  service: ServiceDefinition
  project: ServiceProject
  preset: AdPreset
  index: number
  onAddPhotos: (files: File[]) => void
  onRemovePhoto: (photoId: string) => void
  onMovePhoto: (from: number, to: number) => void
  onPhotoNote: (photoId: string, note: string) => void
  onDetails: (field: keyof AdDetails, value: string) => void
  onPreset: (presetId: string) => void
  onShufflePreset: () => void
  onConfig: (
    patch: Partial<Pick<ServiceProject, "minPhotos" | "maxPhotos">>,
  ) => void
  onToggleEditor: () => void
  onPreview: () => void
  onResetDraft: () => void
  onClipDuration: (photoId: string, durationSec: number) => void
  onClipTransition: (photoId: string, transition: TransitionStyle) => void
  onClipFilter: (photoId: string, filter: FilterLook) => void
  onScriptField: (field: "hook" | "cta", value: string) => void
  onScriptCaption: (index: number, value: string) => void
  onRegenerateScript: () => void
  onAspect: (aspect: AspectRatio) => void
  onMotion: (motion: MotionEffect) => void
  onMusicMode: (mode: "builtin" | "upload" | "mute") => void
  onMusicTrack: (trackId: string) => void
  onUploadedAudio: (file: File | null) => void
  onExport: () => Promise<void>
  onCancelExport: () => void
  exporting: boolean
  exportStatus: string
  exportPercent: number
  exportFailed: boolean
}

export function ServiceCard({
  service,
  project,
  preset,
  index,
  onAddPhotos,
  onRemovePhoto,
  onMovePhoto,
  onPhotoNote,
  onDetails,
  onPreset,
  onShufflePreset,
  onConfig,
  onToggleEditor,
  onPreview,
  onResetDraft,
  onClipDuration,
  onClipTransition,
  onClipFilter,
  onScriptField,
  onScriptCaption,
  onRegenerateScript,
  onAspect,
  onMotion,
  onMusicMode,
  onMusicTrack,
  onUploadedAudio,
  onExport,
  onCancelExport,
  exporting,
  exportStatus,
  exportPercent,
  exportFailed,
}: ServiceCardProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [flash, setFlash] = useState<{ tone: FlashTone; text: string } | null>(
    null,
  )
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)

  useEffect(() => {
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current)
    }
  }, [])

  const photos = project.photos
  const count = photos.length
  const over = count > project.maxPhotos
  const under = count < project.minPhotos
  const ready = !over && !under
  const extended = count > 5
  const timeline = clipTimeline(project)
  const clipsTotal = totalClipSeconds(project)
  const total = totalVideoSeconds(project)
  const status = over
    ? "Over limit"
    : count === 0
      ? "Empty"
      : under
        ? `Need ${project.minPhotos - count}`
        : "Ready"
  const statusClass = over
    ? "jk-chip-over"
    : ready
      ? "jk-chip-ready"
      : "jk-chip-warn"

  const selectedIndex = Math.max(
    0,
    photos.findIndex((photo) => photo.id === selectedPhotoId),
  )
  const selectedPhoto = photos[selectedIndex]

  function showFlash(tone: FlashTone, text: string) {
    setFlash({ tone, text })
    if (flashTimer.current) clearTimeout(flashTimer.current)
    flashTimer.current = setTimeout(() => setFlash(null), 4_500)
  }

  function openPicker() {
    inputRef.current?.click()
  }

  function handleFiles(fileList: FileList | File[] | null) {
    if (!fileList) return
    const incoming = Array.from(fileList)
    if (incoming.length === 0) return

    const images = incoming.filter((file) => file.type.startsWith("image/"))
    if (images.length === 0) {
      showFlash("warn", "Choose image files only — nothing is uploaded.")
      return
    }

    const room = Math.max(0, project.maxPhotos - count)
    if (room === 0) {
      showFlash(
        "over",
        `Max ${project.maxPhotos} photos reached. Raise Max or remove a photo.`,
      )
      return
    }

    const accepted = images.slice(0, room)
    onAddPhotos(accepted)
    if (accepted.length < images.length) {
      showFlash(
        "warn",
        `Added ${accepted.length}. This card holds ${project.maxPhotos} photos.`,
      )
    } else {
      showFlash(
        "good",
        `${accepted.length} photo${accepted.length === 1 ? "" : "s"} added locally. Nothing was uploaded.`,
      )
    }
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files)
    event.target.value = ""
  }

  function onDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault()
    setDragActive(false)
    handleFiles(event.dataTransfer.files)
  }

  function onDragLeave(event: DragEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null))
      setDragActive(false)
  }

  function onDragOver(event: DragEvent<HTMLElement>) {
    event.preventDefault()
    setDragActive(true)
  }

  function onDropzoneKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openPicker()
    }
  }

  function moveSelected(direction: -1 | 1) {
    if (!selectedPhoto) return
    const target = selectedIndex + direction
    if (target < 0 || target >= count) return
    onMovePhoto(selectedIndex, target)
    setSelectedPhotoId(selectedPhoto.id)
  }

  function removeSelected() {
    if (!selectedPhoto) return
    onRemovePhoto(selectedPhoto.id)
    setSelectedPhotoId(null)
  }

  function resetDraft() {
    onResetDraft()
    setSelectedPhotoId(null)
    setConfirmReset(false)
    showFlash("warn", "Draft reset. Photos, notes and details were cleared.")
  }

  const ticks = Array.from(
    { length: 5 },
    (_, tick) => `${((total * tick) / 4).toFixed(1)}s`,
  )
  const miniPhotoStyle = photos[0]
    ? {
        backgroundImage: `url(${photos[0].url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined
  const filledDetails = [
    project.details.title.trim(),
    project.details.location.trim(),
    project.details.material.trim(),
    project.details.highlight.trim(),
  ].filter(Boolean)

  return (
    <article
      className={`jk-card ${ready ? "is-ready" : ""}`}
      style={{ animationDelay: `${Math.min(index, 10) * 55}ms` }}
    >
      <div className="jk-card-head">
        <span className="jk-service-icon">
          <ServiceGlyph icon={service.icon} size={17} strokeWidth={1.8} />
        </span>
        <div className="jk-service-copy">
          <h2>{service.name}</h2>
          <p>{service.tagline}</p>
        </div>
        <span className="jk-card-index">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="jk-card-body">
        {count === 0 ? (
          <div
            className={`jk-dropzone ${dragActive ? "is-drag" : ""}`}
            role="button"
            tabIndex={0}
            onClick={openPicker}
            onKeyDown={onDropzoneKey}
            onDragEnter={onDragOver}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            aria-label={`Add photos for ${service.name}`}
          >
            <span className="jk-dropzone-icon">
              <StudioIcon name="upload" size={15} />
            </span>
            <strong>Drop photos here</strong>
            <span>or tap to choose · image/* · stays on this device</span>
          </div>
        ) : (
          <div
            className={`jk-thumbs ${dragActive ? "is-drag" : ""}`}
            onDragEnter={onDragOver}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {photos.map((photo, photoIndex) => (
              <div
                className="jk-thumb"
                key={photo.id}
                style={{ animationDelay: `${Math.min(photoIndex, 8) * 35}ms` }}
              >
                <img src={photo.url} alt={photo.name} />
                <span className="jk-thumb-index">{photoIndex + 1}</span>
                {photo.note.trim() ? (
                  <span className="jk-thumb-note" title="Photo note added">
                    <StudioIcon name="wand" size={9} />
                  </span>
                ) : null}
                <div className="jk-thumb-actions">
                  <button
                    type="button"
                    onClick={() => onMovePhoto(photoIndex, photoIndex - 1)}
                    disabled={photoIndex === 0}
                    aria-label={`Move ${photo.name} earlier`}
                  >
                    <StudioIcon name="arrow-left" size={11} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onMovePhoto(photoIndex, photoIndex + 1)}
                    disabled={photoIndex === count - 1}
                    aria-label={`Move ${photo.name} later`}
                  >
                    <StudioIcon name="arrow-right" size={11} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemovePhoto(photo.id)}
                    aria-label={`Remove ${photo.name}`}
                  >
                    <StudioIcon name="x" size={11} />
                  </button>
                </div>
                <span className="jk-thumb-name" title={photo.name}>
                  {photo.name}
                </span>
              </div>
            ))}
            {count < project.maxPhotos ? (
              <button
                type="button"
                className="jk-thumb-add"
                onClick={openPicker}
              >
                <StudioIcon name="image-plus" size={16} />
                <span>Add</span>
              </button>
            ) : null}
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="jk-file-input"
          onChange={onFileChange}
          aria-label={`Choose photos for ${service.name}`}
        />

        <div className="jk-card-meta">
          <span className="jk-chip jk-chip-gold">
            Min <strong>{project.minPhotos}</strong>
          </span>
          <span className="jk-chip">
            Max <strong>{project.maxPhotos}</strong>
          </span>
          <span className={`jk-chip ${statusClass}`}>{status}</span>
          <span className="jk-chip jk-chip-push">
            <strong>{count}</strong>/{project.maxPhotos} photos
          </span>
        </div>

        <div className="jk-config">
          <div className="jk-config-item">
            <span className="jk-config-label">Min photos</span>
            <div className="jk-stepper">
              <button
                type="button"
                onClick={() =>
                  onConfig({ minPhotos: Math.max(1, project.minPhotos - 1) })
                }
                disabled={project.minPhotos <= 1}
                aria-label="Decrease minimum photos"
              >
                <StudioIcon name="minus" size={10} />
              </button>
              <output>{project.minPhotos}</output>
              <button
                type="button"
                onClick={() =>
                  onConfig({
                    minPhotos: Math.min(
                      5,
                      project.maxPhotos,
                      project.minPhotos + 1,
                    ),
                  })
                }
                disabled={project.minPhotos >= Math.min(5, project.maxPhotos)}
                aria-label="Increase minimum photos"
              >
                <StudioIcon name="plus" size={10} />
              </button>
            </div>
          </div>

          <div className="jk-config-item">
            <span className="jk-config-label">Max photos</span>
            <div className="jk-stepper">
              <button
                type="button"
                onClick={() =>
                  onConfig({
                    maxPhotos: Math.max(
                      2,
                      project.minPhotos,
                      project.maxPhotos - 1,
                    ),
                  })
                }
                disabled={project.maxPhotos <= Math.max(2, project.minPhotos)}
                aria-label="Decrease maximum photos"
              >
                <StudioIcon name="minus" size={10} />
              </button>
              <output>{project.maxPhotos}</output>
              <button
                type="button"
                onClick={() =>
                  onConfig({
                    maxPhotos: Math.min(
                      MAX_PHOTOS_LIMIT,
                      project.maxPhotos + 1,
                    ),
                  })
                }
                disabled={project.maxPhotos >= MAX_PHOTOS_LIMIT}
                aria-label="Increase maximum photos"
              >
                <StudioIcon name="plus" size={10} />
              </button>
            </div>
          </div>

          <div className="jk-config-item">
            <span className="jk-config-label">Runtime</span>
            <output className="jk-runtime-value">{formatSeconds(total)}</output>
          </div>

          <div className="jk-config-foot">
            <span>
              {count > 0
                ? `${count} clip${count === 1 ? "" : "s"} · ${clipsTotal.toFixed(1)}s + ${OUTRO_DURATION_SEC}s end card`
                : "Add photos to build the timeline"}
            </span>
            <span>
              <strong>{formatSeconds(total)}</strong> total
            </span>
          </div>
        </div>

        {over ? (
          <p className="jk-inline-note is-over">
            <StudioIcon name="warning" size={11} />
            {count} photos is over the {project.maxPhotos}-photo max. Remove{" "}
            {count - project.maxPhotos} or raise Max.
          </p>
        ) : null}
        {!over && under && count > 0 ? (
          <p className="jk-inline-note is-warn">
            <StudioIcon name="info" size={11} />
            Add {project.minPhotos - count} more to reach the minimum of{" "}
            {project.minPhotos}.
          </p>
        ) : null}
        {extended && !over ? (
          <p className="jk-inline-note is-warn">
            <StudioIcon name="warning" size={11} />
            Above the standard 5 photos — trim each clip in the timeline to keep
            the total runtime tight.
          </p>
        ) : null}
        {flash ? (
          <p className={`jk-inline-note is-${flash.tone}`}>
            {flash.tone === "good" ? (
              <StudioIcon name="check" size={11} />
            ) : (
              <StudioIcon name="warning" size={11} />
            )}
            {flash.text}
          </p>
        ) : null}

        <div className="jk-card-actions">
          <button
            type="button"
            className="jk-btn jk-btn-gold jk-btn-preview"
            onClick={onPreview}
            disabled={!ready}
            title={
              ready
                ? "Preview this ad"
                : `Add at least ${project.minPhotos} photos to preview`
            }
          >
            <StudioIcon name="eye" size={13} />
            Preview ad
          </button>
          <button
            type="button"
            className="jk-btn"
            onClick={openPicker}
            disabled={count >= project.maxPhotos}
            title={
              count >= project.maxPhotos
                ? "Maximum photos reached"
                : "Add another photo"
            }
          >
            <StudioIcon name="image-plus" size={13} />
            Add
          </button>
        </div>

        <button
          type="button"
          className={`jk-editor-toggle ${project.editorOpen ? "is-open" : ""}`}
          onClick={onToggleEditor}
          aria-expanded={project.editorOpen}
          aria-controls={`${id}-editor`}
        >
          <span className="jk-editor-toggle-label">
            <StudioIcon name="clapperboard" size={13} />
            Advance Video Editor
          </span>
          <span className="jk-editor-toggle-meta">
            {preset.name} · {count} photos · {formatSeconds(total)}
          </span>
          <StudioIcon
            name="chevron-down"
            size={14}
            className="jk-editor-chevron"
          />
        </button>

        {project.editorOpen ? (
          <div className="jk-editor" id={`${id}-editor`}>
            <section className="jk-editor-section">
              <div className="jk-section-head">
                <StudioIcon name="film" size={12} />
                <h3>Clip timeline</h3>
                <span>
                  {formatSeconds(total)} total · {count} clip
                  {count === 1 ? "" : "s"}
                </span>
              </div>
              <p className="jk-section-help">
                Click a clip to trim its duration, write its caption, choose a
                transition and apply a colour look. The closing CTA adds{" "}
                {OUTRO_DURATION_SEC}s.
              </p>

              <div className="jk-timeline">
                {count === 0 ? (
                  <div className="jk-timeline-empty">
                    Add photos above to build the timeline.
                  </div>
                ) : (
                  timeline.map((item) => {
                    const transitionLabel =
                      TRANSITION_OPTIONS.find(
                        (option) => option.id === item.photo.transition,
                      )?.label ?? "Cut"
                    return (
                      <button
                        type="button"
                        key={item.photo.id}
                        className={`jk-slot ${item.index === selectedIndex ? "is-selected" : ""}`}
                        style={{ flexGrow: item.duration }}
                        onClick={() => setSelectedPhotoId(item.photo.id)}
                        aria-label={`Clip ${item.index + 1}, ${item.start.toFixed(1)} to ${item.end.toFixed(1)} seconds`}
                        title={`${item.photo.name} · ${item.duration.toFixed(1)}s · ${transitionLabel}`}
                      >
                        <img
                          src={item.photo.url}
                          alt=""
                          data-filter={item.photo.filter}
                        />
                        <span className="jk-slot-index">{item.index + 1}</span>
                        <span className="jk-slot-transition">
                          {transitionLabel}
                        </span>
                        <span className="jk-slot-time">
                          {item.duration.toFixed(1)}s
                        </span>
                      </button>
                    )
                  })
                )}
              </div>
              {count > 0 ? (
                <div className="jk-timeline-scale" aria-hidden="true">
                  {ticks.map((tick) => (
                    <span key={tick}>{tick}</span>
                  ))}
                </div>
              ) : null}

              {selectedPhoto ? (
                <div className="jk-slot-editor">
                  <div className="jk-slot-preview">
                    <img
                      src={selectedPhoto.url}
                      alt=""
                      data-filter={selectedPhoto.filter}
                    />
                  </div>
                  <div className="jk-slot-fields">
                    <div className="jk-clip-row">
                      <div className="jk-field">
                        <label htmlFor={`${id}-clip-duration`}>
                          Clip duration
                        </label>
                        <div className="jk-stepper">
                          <button
                            type="button"
                            onClick={() =>
                              onClipDuration(
                                selectedPhoto.id,
                                Math.max(
                                  CLIP_MIN_DURATION_SEC,
                                  selectedPhoto.durationSec - 0.5,
                                ),
                              )
                            }
                            disabled={
                              selectedPhoto.durationSec <= CLIP_MIN_DURATION_SEC
                            }
                            aria-label="Shorten clip"
                          >
                            <StudioIcon name="minus" size={10} />
                          </button>
                          <output id={`${id}-clip-duration`}>
                            {selectedPhoto.durationSec.toFixed(1)}s
                          </output>
                          <button
                            type="button"
                            onClick={() =>
                              onClipDuration(
                                selectedPhoto.id,
                                Math.min(
                                  CLIP_MAX_DURATION_SEC,
                                  selectedPhoto.durationSec + 0.5,
                                ),
                              )
                            }
                            disabled={
                              selectedPhoto.durationSec >= CLIP_MAX_DURATION_SEC
                            }
                            aria-label="Lengthen clip"
                          >
                            <StudioIcon name="plus" size={10} />
                          </button>
                        </div>
                      </div>
                      <div className="jk-field">
                        <label htmlFor={`${id}-clip-transition`}>
                          Transition in
                        </label>
                        <select
                          id={`${id}-clip-transition`}
                          className="jk-input"
                          value={selectedPhoto.transition}
                          onChange={(event) =>
                            onClipTransition(
                              selectedPhoto.id,
                              event.target.value as TransitionStyle,
                            )
                          }
                          disabled={selectedIndex === 0}
                        >
                          {TRANSITION_OPTIONS.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="jk-field">
                        <label htmlFor={`${id}-clip-filter`}>Colour look</label>
                        <select
                          id={`${id}-clip-filter`}
                          className="jk-input"
                          value={selectedPhoto.filter}
                          onChange={(event) =>
                            onClipFilter(
                              selectedPhoto.id,
                              event.target.value as FilterLook,
                            )
                          }
                        >
                          {FILTER_OPTIONS.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="jk-field">
                      <label htmlFor={`${id}-caption`}>
                        Clip caption / script
                      </label>
                      <input
                        id={`${id}-caption`}
                        className="jk-input"
                        value={project.script.captions[selectedIndex] ?? ""}
                        maxLength={120}
                        onChange={(event) =>
                          onScriptCaption(selectedIndex, event.target.value)
                        }
                        placeholder="Text shown on this clip"
                      />
                    </div>
                    <div className="jk-field">
                      <label htmlFor={`${id}-note`}>
                        Lower-third note (optional)
                      </label>
                      <input
                        id={`${id}-note`}
                        className="jk-input"
                        value={selectedPhoto.note}
                        maxLength={90}
                        onChange={(event) =>
                          onPhotoNote(selectedPhoto.id, event.target.value)
                        }
                        placeholder="Shown only when filled"
                      />
                    </div>
                    <div className="jk-slot-actions">
                      <button
                        type="button"
                        className="jk-btn"
                        onClick={() => moveSelected(-1)}
                        disabled={selectedIndex === 0}
                      >
                        <StudioIcon name="arrow-left" size={11} />
                        Earlier
                      </button>
                      <button
                        type="button"
                        className="jk-btn"
                        onClick={() => moveSelected(1)}
                        disabled={selectedIndex === count - 1}
                      >
                        Later
                        <StudioIcon name="arrow-right" size={11} />
                      </button>
                      <button
                        type="button"
                        className="jk-btn jk-btn-danger"
                        onClick={removeSelected}
                      >
                        <StudioIcon name="trash" size={11} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </section>

            <section className="jk-editor-section">
              <div className="jk-section-head">
                <StudioIcon name="settings" size={12} />
                <h3>Basic Details</h3>
                <span>Optional</span>
              </div>
              <div className="jk-fields">
                <div className="jk-field">
                  <label htmlFor={`${id}-title`}>Project / Site Title</label>
                  <input
                    id={`${id}-title`}
                    className="jk-input"
                    value={project.details.title}
                    maxLength={80}
                    onChange={(event) => onDetails("title", event.target.value)}
                    placeholder="3BHK ceiling, Forbesganj"
                  />
                </div>
                <div className="jk-field">
                  <label htmlFor={`${id}-location`}>Location / Area</label>
                  <input
                    id={`${id}-location`}
                    className="jk-input"
                    value={project.details.location}
                    maxLength={60}
                    onChange={(event) =>
                      onDetails("location", event.target.value)
                    }
                    placeholder="Araria"
                  />
                </div>
                <div className="jk-field jk-field-wide">
                  <label htmlFor={`${id}-material`}>
                    Material / Finish Note
                  </label>
                  <input
                    id={`${id}-material`}
                    className="jk-input"
                    value={project.details.material}
                    maxLength={80}
                    onChange={(event) =>
                      onDetails("material", event.target.value)
                    }
                    placeholder="Gypsum with warm profile light"
                  />
                </div>
                <div className="jk-field jk-field-wide">
                  <label htmlFor={`${id}-highlight`}>Short Highlight</label>
                  <textarea
                    id={`${id}-highlight`}
                    className="jk-textarea"
                    value={project.details.highlight}
                    maxLength={120}
                    onChange={(event) =>
                      onDetails("highlight", event.target.value)
                    }
                    placeholder="Clean finish, finished on time"
                  />
                </div>
              </div>
              <p className="jk-section-help">
                Filled fields appear in the lower third. Blank fields stay
                hidden.
              </p>
              {filledDetails.length > 0 ? (
                <div
                  className="jk-detail-preview"
                  aria-label="Lower third preview"
                >
                  <span className="jk-detail-preview-label">Lower third</span>
                  {filledDetails.map((value) => (
                    <span className="jk-detail-preview-chip" key={value}>
                      {value}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>

            <section className="jk-editor-section">
              <div className="jk-section-head">
                <StudioIcon name="wand" size={12} />
                <h3>Animated Design</h3>
                <span>{AD_PRESETS.length} styles</span>
              </div>
              <div className="jk-preset-toolbar">
                <button
                  type="button"
                  className="jk-btn"
                  onClick={onShufflePreset}
                >
                  <StudioIcon name="shuffle" size={11} />
                  Surprise me
                </button>
                <p>
                  <strong>{preset.name}</strong> — {preset.description}
                </p>
              </div>
              <div className="jk-preset-grid">
                {AD_PRESETS.map((item, presetIndex) => {
                  const selected = item.id === preset.id
                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`jk-preset ${selected ? "is-selected" : ""}`}
                      onClick={() => onPreset(item.id)}
                      aria-pressed={selected}
                      title={`${item.name} — ${item.description}`}
                    >
                      <span
                        className="jk-mini"
                        data-preset={item.id}
                        data-frame={item.frame}
                        aria-hidden="true"
                      >
                        <span
                          className="jk-mini-photo"
                          style={miniPhotoStyle}
                        />
                        <span className="jk-mini-fx" />
                        <span className="jk-mini-frame" />
                      </span>
                      <span className="jk-preset-name">{item.name}</span>
                      <span className="jk-preset-num">
                        {String(presetIndex + 1).padStart(2, "0")}
                      </span>
                      {selected ? (
                        <span className="jk-preset-check">
                          <StudioIcon name="check" size={8} />
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="jk-editor-section">
              <div className="jk-section-head">
                <StudioIcon name="film" size={12} />
                <h3>Shorts Script & Export</h3>
                <span>{project.aspect}</span>
              </div>

              <div className="jk-export-grid">
                <label className="jk-field">
                  <span className="jk-config-label">Aspect ratio</span>
                  <select
                    className="jk-input"
                    value={project.aspect}
                    onChange={(e) => onAspect(e.target.value as AspectRatio)}
                  >
                    <option value="9:16">9:16 Shorts (1080x1920)</option>
                    <option value="16:9">16:9 Landscape (1920x1080)</option>
                  </select>
                </label>
                <label className="jk-field">
                  <span className="jk-config-label">Motion effect</span>
                  <select
                    className="jk-input"
                    value={project.motion}
                    onChange={(e) => onMotion(e.target.value as MotionEffect)}
                  >
                    <option value="ken-burns">Ken Burns Zoom</option>
                    <option value="pan">Smooth Pan</option>
                    <option value="fade-slide">Crossfade / Slide</option>
                  </select>
                </label>
              </div>

              <div className="jk-export-grid">
                <label className="jk-field">
                  <span className="jk-config-label">Music</span>
                  <select
                    className="jk-input"
                    value={project.musicMode}
                    onChange={(e) =>
                      onMusicMode(
                        e.target.value as "builtin" | "upload" | "mute",
                      )
                    }
                  >
                    <option value="builtin">Built-in Web Audio</option>
                    <option value="upload">Upload audio file</option>
                    <option value="mute">Mute</option>
                  </select>
                </label>
                {project.musicMode === "builtin" ? (
                  <label className="jk-field">
                    <span className="jk-config-label">Mood track</span>
                    <select
                      className="jk-input"
                      value={project.musicTrackId}
                      onChange={(e) => onMusicTrack(e.target.value)}
                    >
                      {MUSIC_TRACKS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : project.musicMode === "upload" ? (
                  <div className="jk-field">
                    <span className="jk-config-label">Audio file</span>
                    <div className="jk-audio-upload">
                      <button
                        type="button"
                        className="jk-btn"
                        onClick={() => audioInputRef.current?.click()}
                      >
                        <StudioIcon name="upload" size={12} />{" "}
                        {project.uploadedAudioName
                          ? "Change audio"
                          : "Upload audio"}
                      </button>
                      {project.uploadedAudioName ? (
                        <span
                          className="jk-audio-name"
                          title={project.uploadedAudioName}
                        >
                          {project.uploadedAudioName}
                        </span>
                      ) : null}
                    </div>
                    <input
                      ref={audioInputRef}
                      type="file"
                      accept="audio/*"
                      className="jk-file-input"
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null
                        onUploadedAudio(f)
                        e.target.value = ""
                      }}
                    />
                  </div>
                ) : (
                  <div className="jk-field">
                    <span className="jk-config-label">Audio</span>
                    <p className="jk-section-help">Export will be silent.</p>
                  </div>
                )}
              </div>

              <div className="jk-script-block">
                <div className="jk-script-head">
                  <div>
                    <strong>Auto script</strong>
                    <p>
                      {count >= AUTO_SCRIPT_MIN_PHOTOS
                        ? "Hook, per-clip captions, and CTA for Shorts."
                        : count > 0
                          ? `Auto-fills at ${AUTO_SCRIPT_MIN_PHOTOS}+ photos. You can edit every line now.`
                          : "Add photos to generate a hook, captions and CTA."}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="jk-btn"
                    onClick={onRegenerateScript}
                    disabled={count < 1}
                  >
                    <StudioIcon name="sparkles" size={12} /> Regenerate
                  </button>
                </div>
                {count > 0 ? (
                  <div className="jk-fields">
                    <label className="jk-field jk-field-wide">
                      <span className="jk-config-label">Hook</span>
                      <input
                        className="jk-input"
                        value={project.script.hook}
                        onChange={(e) => onScriptField("hook", e.target.value)}
                        placeholder="Short opening hook"
                      />
                    </label>
                    {project.photos.map((photo, i) => (
                      <label className="jk-field jk-field-wide" key={photo.id}>
                        <span className="jk-config-label">
                          Clip {i + 1} caption
                        </span>
                        <input
                          className="jk-input"
                          value={project.script.captions[i] ?? ""}
                          onChange={(e) => onScriptCaption(i, e.target.value)}
                          placeholder={`Caption for clip ${i + 1}`}
                        />
                      </label>
                    ))}
                    <label className="jk-field jk-field-wide">
                      <span className="jk-config-label">Closing CTA</span>
                      <input
                        className="jk-input"
                        value={project.script.cta}
                        onChange={(e) => onScriptField("cta", e.target.value)}
                        placeholder="Closing call to action"
                      />
                    </label>
                  </div>
                ) : null}
              </div>

              <div className="jk-export-actions">
                <button
                  type="button"
                  className="jk-btn jk-btn-gold"
                  onClick={() => {
                    void onExport()
                  }}
                  disabled={!ready || exporting}
                >
                  <StudioIcon
                    name={exporting ? "rotate" : "download"}
                    size={13}
                  />
                  {exporting
                    ? `Exporting ${Math.round(exportPercent)}%…`
                    : exportFailed
                      ? "Retry export"
                      : "Download Video"}
                </button>
                {exporting ? (
                  <button
                    type="button"
                    className="jk-btn jk-btn-danger"
                    onClick={onCancelExport}
                  >
                    <StudioIcon name="x" size={12} />
                    Cancel
                  </button>
                ) : null}
                <p
                  className={`jk-section-help jk-export-status ${exportFailed ? "is-error" : ""}`}
                  aria-live="polite"
                >
                  {exportStatus ||
                    (ready
                      ? `Exports ${project.aspect} ${formatSeconds(total)} video with captions and ${project.musicMode === "mute" ? "no audio" : project.musicMode === "upload" ? "uploaded audio" : "built-in music"}.`
                      : "Add required photos before exporting.")}
                </p>
              </div>
              {exporting || exportPercent > 0 ? (
                <div
                  className={`jk-export-progress ${exportFailed ? "is-error" : ""}`}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(exportPercent)}
                  aria-label="Video export progress"
                >
                  <div
                    className="jk-export-progress-fill"
                    style={{
                      width: `${Math.max(0, Math.min(100, exportPercent))}%`,
                    }}
                  />
                  <span>{Math.round(exportPercent)}%</span>
                </div>
              ) : null}
            </section>

            {confirmReset ? (
              <div
                className="jk-reset-confirm"
                role="alertdialog"
                aria-label="Confirm reset service draft"
              >
                <p>
                  <StudioIcon name="warning" size={13} />
                  <span>
                    <strong>Reset this service draft?</strong> Photos, notes,
                    details and timing will be cleared. The editor stays open.
                  </span>
                </p>
                <div className="jk-reset-actions">
                  <button
                    type="button"
                    className="jk-btn jk-btn-danger"
                    onClick={resetDraft}
                  >
                    <StudioIcon name="rotate" size={11} />
                    Reset draft
                  </button>
                  <button
                    type="button"
                    className="jk-btn"
                    onClick={() => setConfirmReset(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}

            <div className="jk-editor-actions">
              <button
                type="button"
                className="jk-btn jk-btn-gold"
                onClick={onPreview}
                disabled={!ready}
              >
                <StudioIcon name="eye" size={13} />
                Preview ad
              </button>
              <button
                type="button"
                className="jk-btn jk-btn-danger jk-reset-trigger"
                onClick={() => setConfirmReset(true)}
              >
                <StudioIcon name="rotate" size={12} />
                Reset Service Draft
              </button>
              <span>
                {ready
                  ? `${count} photos · ${formatSeconds(total)} · clips 2–8s each`
                  : `Add at least ${project.minPhotos} photos to preview`}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}
