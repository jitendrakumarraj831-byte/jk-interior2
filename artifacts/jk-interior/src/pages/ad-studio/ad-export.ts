import type { AdAudio } from "./ad-audio"
import {
  STUDIO_AREAS,
  STUDIO_CALL_DISPLAY,
  STUDIO_REGION,
  STUDIO_WEBSITE,
  STUDIO_WHATSAPP_DISPLAY,
  type AdPreset,
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
  return new Promise((r) => setTimeout(r, ms))
}

function pickMimeType(): string | null {
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
    "video/mp4",
  ]
  for (const c of candidates) {
    if (
      typeof MediaRecorder !== "undefined" &&
      MediaRecorder.isTypeSupported(c)
    )
      return c
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
    img.onerror = () => reject(new Error("Failed to load image"))
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
  titleLines.forEach((l, i) =>
    ctx.fillText(l, pad, Math.round(H * 0.28) + i * Math.round(W * 0.075)),
  )

  ctx.fillStyle = "rgba(255,255,255,0.82)"
  ctx.font = `600 ${Math.round(W * 0.034)}px sans-serif`
  const cta = project.script.cta || `WhatsApp ${STUDIO_WHATSAPP_DISPLAY}`
  wrapText(ctx, cta, W - pad * 2)
    .slice(0, 2)
    .forEach((l, i) => {
      ctx.fillText(l, pad, Math.round(H * 0.48) + i * Math.round(W * 0.045))
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
    .forEach((l, i) => {
      ctx.fillText(l, pad, Math.round(H * 0.84) + i * Math.round(W * 0.03))
    })
}

function motionTransform(
  motion: ServiceProject["motion"],
  progress: number,
  slideIndex: number,
) {
  // progress 0..1 within slide
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
  // ken-burns
  const zoomIn = !alt
  const scale = zoomIn ? 1 + 0.1 * progress : 1.1 - 0.1 * progress
  return {
    scale,
    x: alt ? 0.02 - 0.04 * progress : -0.02 + 0.04 * progress,
    y: 0,
  }
}

export async function exportAdVideo(options: {
  service: ServiceDefinition
  project: ServiceProject
  preset: AdPreset
  audio: AdAudio
  onProgress?: ProgressCb
}): Promise<void> {
  const { service, project, preset, audio, onProgress } = options
  const mime = pickMimeType()
  if (!mime)
    throw new Error(
      "Video export is not supported in this browser (MediaRecorder unavailable).",
    )
  if (typeof HTMLCanvasElement.prototype.captureStream !== "function") {
    throw new Error(
      "Video export is not supported in this browser (canvas capture unavailable).",
    )
  }

  const aspect = project.aspect
  const W = aspect === "9:16" ? 1080 : 1920
  const H = aspect === "9:16" ? 1920 : 1080
  const fps = 30
  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not create canvas.")

  report(onProgress, {
    phase: "preparing",
    percent: 5,
    message: "Loading photos…",
  })
  const images = await Promise.all(project.photos.map((p) => loadImage(p.url)))

  const totalDuration = project.durationSec
  const slideDuration = totalDuration / Math.max(1, images.length)
  const outroDuration = Math.min(2.5, Math.max(1.8, totalDuration * 0.18))
  const mainDuration = Math.max(1, totalDuration - outroDuration)

  const videoStream = canvas.captureStream(fps)
  const tracks: MediaStreamTrack[] = [...videoStream.getVideoTracks()]

  // Audio handling
  let cleanupAudio: (() => void) | null = null
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
        ).find((t) => t.id === project.musicTrackId)?.mood ?? preset.mood
      const dest = audio.createRecordDestination()
      audio.setMuted(false)
      audio.setVolume(0.85)
      audio.start(mood)
      audio.cue(0)
      if (dest) tracks.push(...dest.stream.getAudioTracks())
      cleanupAudio = () => {
        audio.stop()
        audio.clearRecordDestination()
      }
    } else if (project.musicMode === "upload" && project.uploadedAudioUrl) {
      const aCtx =
        audio.getContext() ||
        new (window.AudioContext || (window as any).webkitAudioContext)()
      const dest = aCtx.createMediaStreamDestination()
      const el = new Audio(project.uploadedAudioUrl)
      el.crossOrigin = "anonymous"
      el.loop = true
      const src = aCtx.createMediaElementSource(el)
      src.connect(dest)
      src.connect(aCtx.destination)
      await el.play().catch(() => {})
      tracks.push(...dest.stream.getAudioTracks())
      cleanupAudio = () => {
        el.pause()
        el.src = ""
        try {
          src.disconnect()
        } catch {}
      }
    }
  } catch {
    // continue without audio
  }

  const stream = new MediaStream(tracks)
  let recorder: MediaRecorder
  try {
    recorder = new MediaRecorder(stream, {
      mimeType: mime,
      videoBitsPerSecond: 6_000_000,
    })
  } catch {
    recorder = new MediaRecorder(stream)
  }

  const chunks: Blob[] = []
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data)
  }

  const done = new Promise<void>((resolve, reject) => {
    recorder.onerror = () => reject(new Error("Recording failed."))
    recorder.onstop = () => resolve()
  })

  report(onProgress, {
    phase: "rendering",
    percent: 10,
    message: "Rendering video…",
  })
  recorder.start(250)

  const start = performance.now()
  let lastCue = -1
  let outroFired = false

  await new Promise<void>((resolve) => {
    const frame = () => {
      const now = performance.now()
      const elapsed = Math.min(totalDuration, (now - start) / 1000)
      report(onProgress, {
        phase: "rendering",
        percent: Math.min(90, 10 + (elapsed / totalDuration) * 80),
        message: `Rendering ${Math.round(elapsed)}s / ${totalDuration}s…`,
      })

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = "#07111f"
      ctx.fillRect(0, 0, W, H)

      if (elapsed < mainDuration) {
        const idx = Math.min(
          images.length - 1,
          Math.floor(elapsed / slideDuration),
        )
        if (idx !== lastCue && project.musicMode === "builtin") {
          lastCue = idx
          try {
            audio.cue(idx)
          } catch {}
        }
        const local = (elapsed - idx * slideDuration) / slideDuration
        const t = motionTransform(
          project.motion,
          Math.max(0, Math.min(1, local)),
          idx,
        )
        const img = images[idx]
        coverDraw(ctx, img, 0, 0, W, H, t.scale, t.x, t.y)

        if (project.motion === "fade-slide") {
          const fade =
            local < 0.12
              ? 1 - local / 0.12
              : local > 0.88
                ? (local - 0.88) / 0.12
                : 0
          if (fade > 0) {
            ctx.fillStyle = `rgba(7,17,31,${fade * 0.35})`
            ctx.fillRect(0, 0, W, H)
          }
        }

        const caption =
          project.script.captions[idx] || project.photos[idx]?.note || ""
        drawCaptionBlock(
          ctx,
          W,
          H,
          aspect,
          service,
          project,
          caption,
          idx,
          images.length,
        )
      } else {
        if (!outroFired && project.musicMode === "builtin") {
          outroFired = true
          try {
            audio.outro()
          } catch {}
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

  report(onProgress, {
    phase: "encoding",
    percent: 93,
    message: "Finalizing video file…",
  })
  // allow last frames to flush
  await wait(400)
  recorder.stop()
  await done
  cleanupAudio?.()
  try {
    audio.clearRecordDestination()
  } catch {}

  const blob = new Blob(chunks, { type: recorder.mimeType || mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  const safeName = service.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  a.href = url
  a.download = `jk-interior-${safeName}-${aspect.replace(":", "x")}.${extForMime(recorder.mimeType || mime)}`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 5000)

  report(onProgress, {
    phase: "done",
    percent: 100,
    message: "Video downloaded.",
  })
}
