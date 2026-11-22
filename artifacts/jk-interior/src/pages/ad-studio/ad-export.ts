import type { AdAudio } from "./ad-audio"
import {
  FILTER_CSS,
  STUDIO_AREAS,
  STUDIO_CALL_DISPLAY,
  STUDIO_REGION,
  STUDIO_WEBSITE,
  STUDIO_WHATSAPP_DISPLAY,
  clipCaption,
  clipTimeline,
  totalClipSeconds,
  totalVideoSeconds,
  type AdPreset,
  type ClipTiming,
  type FilterLook,
  type ServiceDefinition,
  type ServiceProject,
} from "./studio-data"

export interface ExportProgress {
  phase: "preparing" | "rendering" | "encoding" | "done" | "error"
  percent: number
  message: string
}

type ProgressCb = (p: ExportProgress) => void

function report(cb: ProgressCb | undefined, p: ExportProgress) {
  cb?.(p)
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function canceledError(): DOMException {
  return new DOMException("Export canceled", "AbortError")
}

function pickMimeType(): string | null {
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
    "video/mp4",
  ]
  for (const candidate of candidates) {
    if (
      typeof MediaRecorder !== "undefined" &&
      MediaRecorder.isTypeSupported(candidate)
    )
      return candidate
  }
  return null
}

function extForMime(mime: string) {
  return mime.includes("mp4") ? "mp4" : "webm"
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  return await new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = () =>
      reject(new Error("A photo could not be loaded for export."))
    img.src = url
  })
}

function coverDraw(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  scale = 1,
  offsetX = 0,
  offsetY = 0,
) {
  const sw = img.naturalWidth || img.width
  const sh = img.naturalHeight || img.height
  const sr = sw / sh
  const dr = dw / dh
  let cw = sw
  let ch = sh
  if (sr > dr) {
    cw = sh * dr
  } else {
    ch = sw / dr
  }
  cw /= scale
  ch /= scale
  let sx = (sw - cw) / 2 + offsetX * (sw - cw) * 0.5
  let sy = (sh - ch) / 2 + offsetY * (sh - ch) * 0.5
  sx = Math.max(0, Math.min(sw - cw, sx))
  sy = Math.max(0, Math.min(sh - ch, sy))
  ctx.drawImage(img, sx, sy, cw, ch, dx, dy, dw, dh)
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let line = ""
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines.slice(0, 3)
}

function drawCaptionBlock(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  aspect: "16:9" | "9:16",
  service: ServiceDefinition,
  project: ServiceProject,
  caption: string,
  photoIndex: number,
  count: number,
) {
  const pad = Math.round(W * 0.06)
  const barH = aspect === "9:16" ? Math.round(H * 0.22) : Math.round(H * 0.2)
  const y = H - barH
  const grad = ctx.createLinearGradient(0, y - 60, 0, H)
  grad.addColorStop(0, "rgba(7,17,31,0)")
  grad.addColorStop(0.22, "rgba(7,17,31,0.62)")
  grad.addColorStop(1, "rgba(7,17,31,0.92)")
  ctx.fillStyle = grad
  ctx.fillRect(0, y - 60, W, barH + 60)

  ctx.fillStyle = "#E7C65A"
  ctx.font = `700 ${Math.round(W * 0.028)}px sans-serif`
  ctx.fillText("JK INTERIOR", pad, y + Math.round(barH * 0.28))
  ctx.fillStyle = "rgba(255,255,255,0.88)"
  ctx.font = `600 ${Math.round(W * 0.024)}px sans-serif`
  ctx.fillText(service.name.toUpperCase(), pad, y + Math.round(barH * 0.46))

  const captionText = caption || project.script.hook || service.tagline
  ctx.fillStyle = "#FFFFFF"
  ctx.font = `700 ${Math.round(W * (aspect === "9:16" ? 0.045 : 0.034))}px sans-serif`
  const lines = wrapText(ctx, captionText, W - pad * 2)
  lines.forEach((line, i) => {
    ctx.fillText(
      line,
      pad,
      y +
        Math.round(barH * (aspect === "9:16" ? 0.64 : 0.66)) +
        i * Math.round(W * 0.045),
    )
  })

  ctx.fillStyle = "rgba(255,255,255,0.55)"
  ctx.font = `500 ${Math.round(W * 0.022)}px sans-serif`
  ctx.fillText(
    `${STUDIO_REGION} · ${photoIndex + 1}/${count}`,
    pad,
    H - Math.round(barH * 0.12),
  )
}

function drawOutro(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  aspect: "16:9" | "9:16",
  service: ServiceDefinition,
  project: ServiceProject,
) {
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, "#0d2138")
  g.addColorStop(1, "#07111f")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  const pad = Math.round(W * 0.08)
  ctx.fillStyle = "#E7C65A"
  ctx.font = `800 ${Math.round(W * 0.03)}px sans-serif`
  ctx.fillText("JK INTERIOR", pad, Math.round(H * 0.18))
  ctx.fillStyle = "#FFFFFF"
  ctx.font = `700 ${Math.round(W * (aspect === "9:16" ? 0.072 : 0.056))}px sans-serif`
  const titleLines = wrapText(
    ctx,
    project.script.hook || `Premium ${service.name}`,
    W - pad * 2,
  )
  titleLines.forEach((line, i) =>
    ctx.fillText(line, pad, Math.round(H * 0.28) + i * Math.round(W * 0.075)),
  )

  ctx.fillStyle = "rgba(255,255,255,0.82)"
  ctx.font = `600 ${Math.round(W * 0.034)}px sans-serif`
  const cta = project.script.cta || `WhatsApp ${STUDIO_WHATSAPP_DISPLAY}`
  wrapText(ctx, cta, W - pad * 2)
    .slice(0, 2)
    .forEach((line, i) => {
      ctx.fillText(line, pad, Math.round(H * 0.48) + i * Math.round(W * 0.045))
    })

  ctx.fillStyle = "#E7C65A"
  ctx.font = `700 ${Math.round(W * 0.03)}px sans-serif`
  ctx.fillText(STUDIO_WHATSAPP_DISPLAY, pad, Math.round(H * 0.62))
  ctx.fillStyle = "#FFFFFF"
  ctx.fillText(STUDIO_CALL_DISPLAY, pad, Math.round(H * 0.68))
  ctx.fillStyle = "rgba(255,255,255,0.72)"
  ctx.font = `500 ${Math.round(W * 0.026)}px sans-serif`
  ctx.fillText(
    STUDIO_WEBSITE.replace(/^https?:\/\//, ""),
    pad,
    Math.round(H * 0.74),
  )

  ctx.fillStyle = "rgba(255,255,255,0.55)"
  ctx.font = `500 ${Math.round(W * 0.022)}px sans-serif`
  const areas = STUDIO_AREAS.join(" • ")
  wrapText(ctx, areas, W - pad * 2)
    .slice(0, aspect === "9:16" ? 3 : 2)
    .forEach((line, i) => {
      ctx.fillText(line, pad, Math.round(H * 0.84) + i * Math.round(W * 0.03))
    })
}

function motionTransform(
  motion: ServiceProject["motion"],
  progress: number,
  slideIndex: number,
) {
  const alt = slideIndex % 2 === 1
  if (motion === "pan") {
    const fromX = alt ? 0.06 : -0.06
    const toX = -fromX
    return { scale: 1.12, x: fromX + (toX - fromX) * progress, y: 0 }
  }
  if (motion === "fade-slide") {
    const dir = alt ? -1 : 1
    return { scale: 1.06, x: dir * (0.04 - 0.04 * progress), y: 0 }
  }
  const zoomIn = !alt
  const scale = zoomIn ? 1 + 0.1 * progress : 1.1 - 0.1 * progress
  return {
    scale,
    x: alt ? 0.02 - 0.04 * progress : -0.02 + 0.04 * progress,
    y: 0,
  }
}

function drawPhoto(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  W: number,
  H: number,
  project: ServiceProject,
  localProgress: number,
  index: number,
  filter: FilterLook,
  options?: {
    alpha?: number
    scaleMultiplier?: number
    offsetX?: number
  },
) {
  const t = motionTransform(project.motion, localProgress, index)
  ctx.save()
  ctx.globalAlpha = options?.alpha ?? 1
  ctx.filter = FILTER_CSS[filter]
  coverDraw(
    ctx,
    img,
    options?.offsetX ?? 0,
    0,
    W,
    H,
    t.scale * (options?.scaleMultiplier ?? 1),
    t.x,
    t.y,
  )
  ctx.restore()
}

function drawClipFrame(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  images: HTMLImageElement[],
  timeline: ClipTiming[],
  clip: ClipTiming,
  local: number,
  project: ServiceProject,
) {
  const localProgress = Math.min(1, Math.max(0, local / clip.duration))
  const transitionDuration = Math.min(0.6, Math.max(0.3, clip.duration * 0.18))
  const inTransition =
    clip.index > 0 &&
    clip.photo.transition !== "cut" &&
    local < transitionDuration
  const currentImage = images[clip.index]

  if (inTransition) {
    const previous = timeline[clip.index - 1]
    const previousImage = images[previous.index]
    const progress = Math.min(1, Math.max(0, local / transitionDuration))

    drawPhoto(
      ctx,
      previousImage,
      W,
      H,
      project,
      1,
      previous.index,
      previous.photo.filter,
    )

    if (clip.photo.transition === "crossfade") {
      drawPhoto(
        ctx,
        currentImage,
        W,
        H,
        project,
        localProgress,
        clip.index,
        clip.photo.filter,
        {
          alpha: progress,
        },
      )
    } else if (clip.photo.transition === "slide") {
      drawPhoto(
        ctx,
        currentImage,
        W,
        H,
        project,
        localProgress,
        clip.index,
        clip.photo.filter,
        {
          offsetX: W * (1 - progress),
        },
      )
    } else {
      drawPhoto(
        ctx,
        currentImage,
        W,
        H,
        project,
        localProgress,
        clip.index,
        clip.photo.filter,
        {
          alpha: progress,
          scaleMultiplier: 1.18 - 0.18 * progress,
        },
      )
    }
  } else {
    drawPhoto(
      ctx,
      currentImage,
      W,
      H,
      project,
      localProgress,
      clip.index,
      clip.photo.filter,
    )
  }

  if (project.motion === "fade-slide") {
    const fade =
      localProgress < 0.12
        ? 1 - localProgress / 0.12
        : localProgress > 0.88
          ? (localProgress - 0.88) / 0.12
          : 0
    if (fade > 0) {
      ctx.fillStyle = `rgba(7,17,31,${fade * 0.35})`
      ctx.fillRect(0, 0, W, H)
    }
  }
}

export async function exportAdVideo(options: {
  service: ServiceDefinition
  project: ServiceProject
  preset: AdPreset
  audio: AdAudio
  onProgress?: ProgressCb
  signal?: AbortSignal
}): Promise<void> {
  const { service, project, preset, audio, onProgress, signal } = options

  if (typeof MediaRecorder === "undefined") {
    throw new Error(
      "Video export is not supported in this browser (MediaRecorder unavailable). Try the latest Chrome, Edge or Safari.",
    )
  }
  if (typeof HTMLCanvasElement.prototype.captureStream !== "function") {
    throw new Error(
      "Video export is not supported in this browser (canvas captureStream unavailable). Try the latest Chrome, Edge or Safari.",
    )
  }
  const mime = pickMimeType()
  if (!mime) {
    throw new Error(
      "This browser has no supported video codec (VP9/VP8/MP4). Try the latest Chrome on Android or desktop Chrome/Edge.",
    )
  }
  if (signal?.aborted) throw canceledError()

  const timeline = clipTimeline(project)
  if (timeline.length === 0) {
    throw new Error("Add at least one photo before exporting.")
  }

  const aspect = project.aspect
  const W = aspect === "9:16" ? 1080 : 1920
  const H = aspect === "9:16" ? 1920 : 1080
  const fps = 30
  const clipTotal = totalClipSeconds(project)
  const totalDuration = totalVideoSeconds(project)
  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not create the export canvas.")

  report(onProgress, {
    phase: "preparing",
    percent: 2,
    message: "Preparing export…",
  })
  const images = await Promise.all(
    timeline.map((clip) => loadImage(clip.photo.url)),
  )
  if (signal?.aborted) throw canceledError()

  report(onProgress, {
    phase: "preparing",
    percent: 8,
    message: "Preparing audio…",
  })

  const videoStream = canvas.captureStream(fps)
  const tracks: MediaStreamTrack[] = [...videoStream.getVideoTracks()]
  const previousMuted = audio.isMuted
  const previousVolume = audio.currentVolume
  let cleanupAudio: (() => void) | null = null
  let recorder: MediaRecorder | null = null
  let stream: MediaStream | null = null
  let aborted = false
  const onAbort = () => {
    aborted = true
  }
  signal?.addEventListener("abort", onAbort)

  try {
    if (project.musicMode === "builtin") {
      const mood =
        (
          [
            { id: "warm-gold", mood: 0 },
            { id: "deep-navy", mood: 1 },
            { id: "soft-ivory", mood: 2 },
            { id: "amber-glow", mood: 3 },
            { id: "forest-calm", mood: 4 },
            { id: "rosewood", mood: 5 },
          ] as const
        ).find((track) => track.id === project.musicTrackId)?.mood ??
        preset.mood
      const dest = audio.createRecordDestination()
      audio.setMuted(false)
      audio.setVolume(0.85)
      audio.start(mood)
      audio.cue(0)
      if (dest) tracks.push(...dest.stream.getAudioTracks())
      cleanupAudio = () => {
        audio.stop()
        audio.stopUploaded()
        audio.clearRecordDestination()
        audio.setMuted(previousMuted)
        audio.setVolume(previousVolume)
      }
    } else if (project.musicMode === "upload" && project.uploadedAudioUrl) {
      const dest = audio.createRecordDestination()
      audio.setMuted(false)
      audio.setVolume(0.85)
      const buffer = await audio.loadUploaded(project.uploadedAudioUrl)
      if (signal?.aborted || aborted) throw canceledError()
      if (buffer) {
        audio.startUploaded(buffer, 0, true)
        if (dest) tracks.push(...dest.stream.getAudioTracks())
        cleanupAudio = () => {
          audio.stop()
          audio.stopUploaded()
          audio.clearRecordDestination()
          audio.setMuted(previousMuted)
          audio.setVolume(previousVolume)
        }
      } else {
        audio.clearRecordDestination()
        report(onProgress, {
          phase: "preparing",
          percent: 10,
          message:
            "Audio could not be decoded — exporting a silent video instead.",
        })
      }
    }

    stream = new MediaStream(tracks)
    try {
      recorder = new MediaRecorder(stream, {
        mimeType: mime,
        videoBitsPerSecond: 6_000_000,
      })
    } catch {
      try {
        recorder = new MediaRecorder(stream)
      } catch {
        throw new Error(
          "This browser could not start MediaRecorder for the selected codec. Try the latest Chrome or Edge.",
        )
      }
    }

    const chunks: Blob[] = []
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) chunks.push(event.data)
    }
    const done = new Promise<void>((resolve, reject) => {
      recorder!.onerror = () =>
        reject(new Error("Recording failed in this browser."))
      recorder!.onstop = () => resolve()
    })

    report(onProgress, {
      phase: "rendering",
      percent: 12,
      message: "Rendering video…",
    })
    recorder.start(250)

    const startedAt = performance.now()
    let lastCue = -1
    let outroFired = false

    await new Promise<void>((resolve) => {
      const frame = () => {
        if (signal?.aborted || aborted) {
          resolve()
          return
        }
        const elapsed = Math.min(
          totalDuration,
          (performance.now() - startedAt) / 1000,
        )
        report(onProgress, {
          phase: "rendering",
          percent: Math.min(
            90,
            12 + (elapsed / Math.max(0.001, totalDuration)) * 78,
          ),
          message: `Rendering ${Math.round(elapsed)}s / ${Math.round(totalDuration)}s…`,
        })

        ctx.clearRect(0, 0, W, H)
        ctx.fillStyle = "#07111f"
        ctx.fillRect(0, 0, W, H)

        if (elapsed < clipTotal) {
          const active =
            timeline.find(
              (clip) => elapsed >= clip.start && elapsed < clip.end,
            ) ?? timeline[timeline.length - 1]
          if (active.index !== lastCue) {
            lastCue = active.index
            if (project.musicMode === "builtin") {
              try {
                audio.cue(active.index)
              } catch {
                // audio is optional
              }
            }
          }
          drawClipFrame(
            ctx,
            W,
            H,
            images,
            timeline,
            active,
            elapsed - active.start,
            project,
          )
          drawCaptionBlock(
            ctx,
            W,
            H,
            aspect,
            service,
            project,
            clipCaption(project, active.index),
            active.index,
            timeline.length,
          )
        } else {
          if (!outroFired) {
            outroFired = true
            if (project.musicMode === "builtin") {
              try {
                audio.outro()
              } catch {
                // audio is optional
              }
            }
          }
          drawOutro(ctx, W, H, aspect, service, project)
        }

        if (elapsed >= totalDuration - 0.001) {
          resolve()
          return
        }
        requestAnimationFrame(frame)
      }
      requestAnimationFrame(frame)
    })

    if (signal?.aborted || aborted) throw canceledError()

    report(onProgress, {
      phase: "encoding",
      percent: 94,
      message: "Finalizing video file…",
    })
    await wait(400)
    if (signal?.aborted || aborted) throw canceledError()
    if (recorder.state !== "inactive") recorder.stop()
    await done

    cleanupAudio?.()
    cleanupAudio = null
    audio.clearRecordDestination()

    if (chunks.length === 0) {
      throw new Error(
        "The browser recorded no video data. Try a shorter clip or the latest Chrome.",
      )
    }

    const blob = new Blob(chunks, { type: recorder.mimeType || mime })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    const safeName = service.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
    anchor.href = url
    anchor.download = `jk-interior-${safeName}-${aspect.replace(":", "x")}.${extForMime(recorder.mimeType || mime)}`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    setTimeout(() => URL.revokeObjectURL(url), 5000)

    report(onProgress, {
      phase: "done",
      percent: 100,
      message: "Video downloaded.",
    })
  } catch (error) {
    if (recorder && recorder.state !== "inactive") {
      try {
        recorder.stop()
      } catch {
        // already stopped
      }
    }
    cleanupAudio?.()
    audio.clearRecordDestination()
    throw error
  } finally {
    signal?.removeEventListener("abort", onAbort)
    stream?.getTracks().forEach((track) => track.stop())
  }
}
