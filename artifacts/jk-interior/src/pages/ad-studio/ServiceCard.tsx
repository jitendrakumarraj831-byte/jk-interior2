import { useEffect, useId, useRef, useState } from "react"
import type { ChangeEvent, DragEvent, KeyboardEvent } from "react"
import { ServiceGlyph } from "./ServiceGlyph"
import { StudioIcon } from "./StudioIcon"
import {
  AD_PRESETS,
  MAX_DURATION_SEC,
  MAX_PHOTOS_LIMIT,
  MIN_DURATION_SEC,
  type AdDetails,
  type AdPreset,
  type ServiceDefinition,
  type ServiceProject,
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
    patch: Partial<
      Pick<ServiceProject, "minPhotos" | "maxPhotos" | "durationSec">
    >,
  ) => void
  onToggleEditor: () => void
  onPreview: () => void
  onResetDraft: () => void
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
}: ServiceCardProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
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
  const perPhoto = count > 0 ? project.durationSec / count : 0
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
    (_, tick) => `${((project.durationSec * tick) / 4).toFixed(1)}s`,
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
            <span className="jk-config-label">Duration</span>
            <div className="jk-stepper">
              <button
                type="button"
                onClick={() =>
                  onConfig({
                    durationSec: Math.max(
                      MIN_DURATION_SEC,
                      project.durationSec - 1,
                    ),
                  })
                }
                disabled={project.durationSec <= MIN_DURATION_SEC}
                aria-label="Decrease video duration"
              >
                <StudioIcon name="minus" size={10} />
              </button>
              <output>{project.durationSec}s</output>
              <button
                type="button"
                onClick={() =>
                  onConfig({
                    durationSec: Math.min(
                      MAX_DURATION_SEC,
                      project.durationSec + 1,
                    ),
                  })
                }
                disabled={project.durationSec >= MAX_DURATION_SEC}
                aria-label="Increase video duration"
              >
                <StudioIcon name="plus" size={10} />
              </button>
            </div>
          </div>

          <div className="jk-config-foot">
            <span>
              {count > 0
                ? `${perPhoto.toFixed(1)}s per photo`
                : "Add photos to split the time"}
            </span>
            <span>
              <strong>{project.durationSec}s</strong> total
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
            Above the standard 5 photos — every timing slice gets shorter.
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
            {preset.name} · {count} photos · {project.durationSec}s
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
                <h3>{project.durationSec}-second timeline</h3>
                <span>
                  {count} slot{count === 1 ? "" : "s"}
                </span>
              </div>
              <p className="jk-section-help">
                Click a slice to edit its note, reorder it, or remove it. Time
                is divided evenly across the photos.
              </p>

              <div className="jk-timeline">
                {count === 0 ? (
                  <div className="jk-timeline-empty">
                    Add photos above to build the timeline.
                  </div>
                ) : (
                  photos.map((photo, photoIndex) => {
                    const start = photoIndex * perPhoto
                    const end = start + perPhoto
                    return (
                      <button
                        type="button"
                        key={photo.id}
                        className={`jk-slot ${photoIndex === selectedIndex ? "is-selected" : ""}`}
                        onClick={() => setSelectedPhotoId(photo.id)}
                        aria-label={`Photo ${photoIndex + 1}, ${start.toFixed(1)} to ${end.toFixed(1)} seconds`}
                        title={photo.name}
                      >
                        <img src={photo.url} alt="" />
                        <span className="jk-slot-index">{photoIndex + 1}</span>
                        <span className="jk-slot-time">
                          {start.toFixed(1)}–{end.toFixed(1)}s
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
                    <img src={selectedPhoto.url} alt="" />
                  </div>
                  <div className="jk-slot-fields">
                    <div className="jk-field">
                      <label htmlFor={`${id}-note`}>
                        Photo note (optional)
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
                  ? `${count} photos · ${project.durationSec}s · ${perPhoto.toFixed(1)}s each`
                  : `Add at least ${project.minPhotos} photos to preview`}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}
