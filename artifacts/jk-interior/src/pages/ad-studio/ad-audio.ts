// A tiny Web Audio soundtrack engine — zero files, zero dependencies.
//
// The pad is built from detuned sine/triangle oscillators through a low-pass
// filter and a gentle compressor, so it stays warm instead of bright or harsh.
// Each design preset picks one of six chord moods; the pad walks a four-bar
// progression, and the player adds a very quiet bell on each photo change plus
// a three-note resolve on the outro.

type AudioContextCtor = typeof AudioContext

interface Voice {
  osc: OscillatorNode
  gain: GainNode
  level: number
}

interface Mood {
  chords: [number, number, number][]
  subs: number[]
}

const MOODS: Mood[] = [
  // Warm gold — A minor / open fifths
  {
    chords: [
      [110.0, 164.81, 220.0],
      [98.0, 146.83, 196.0],
      [130.81, 196.0, 261.63],
      [110.0, 164.81, 246.94],
    ],
    subs: [55.0, 49.0, 65.41, 55.0],
  },
  // Deep navy — D minor colour
  {
    chords: [
      [146.83, 220.0, 293.66],
      [130.81, 196.0, 261.63],
      [116.54, 174.61, 233.08],
      [146.83, 220.0, 349.23],
    ],
    subs: [73.42, 65.41, 58.27, 73.42],
  },
  // Soft ivory — C major
  {
    chords: [
      [130.81, 196.0, 261.63],
      [110.0, 164.81, 220.0],
      [87.31, 130.81, 174.61],
      [98.0, 146.83, 196.0],
    ],
    subs: [65.41, 55.0, 43.65, 49.0],
  },
  // Amber glow — G major
  {
    chords: [
      [98.0, 146.83, 196.0],
      [123.47, 185.0, 246.94],
      [110.0, 164.81, 220.0],
      [130.81, 196.0, 261.63],
    ],
    subs: [49.0, 61.74, 55.0, 65.41],
  },
  // Forest calm — E minor
  {
    chords: [
      [82.41, 123.47, 164.81],
      [98.0, 146.83, 196.0],
      [110.0, 164.81, 220.0],
      [123.47, 185.0, 246.94],
    ],
    subs: [41.2, 49.0, 55.0, 61.74],
  },
  // Rosewood — B flat major
  {
    chords: [
      [116.54, 174.61, 233.08],
      [98.0, 146.83, 196.0],
      [130.81, 196.0, 261.63],
      [110.0, 164.81, 220.0],
    ],
    subs: [58.27, 49.0, 65.41, 55.0],
  },
]

const BAR_SECONDS = 4.5
const DEFAULT_VOLUME = 0.42

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

export class AdAudio {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private filter: BiquadFilterNode | null = null
  private voices: Voice[] = []
  private barTimer: ReturnType<typeof setTimeout> | null = null
  private suspendTimer: ReturnType<typeof setTimeout> | null = null
  private recordDestination: MediaStreamAudioDestinationNode | null = null
  private mood = 0
  private bar = 0
  private volume = DEFAULT_VOLUME
  private muted = false
  private running = false
  private paused = false
  private disposed = false

  get isMuted(): boolean {
    return this.muted
  }

  get currentVolume(): number {
    return this.volume
  }

  getContext(): AudioContext | null {
    this.ensure()
    return this.ctx
  }

  getMaster(): GainNode | null {
    this.ensure()
    return this.master
  }

  createRecordDestination(): MediaStreamAudioDestinationNode | null {
    this.ensure()
    if (!this.ctx) return null
    this.clearRecordDestination()
    const dest = this.ctx.createMediaStreamDestination()
    this.recordDestination = dest
    if (this.master) {
      try {
        this.master.connect(dest)
      } catch {
        // ignore
      }
    }
    return dest
  }

  clearRecordDestination(): void {
    if (this.recordDestination && this.master) {
      try {
        this.master.disconnect(this.recordDestination)
      } catch {
        // ignore
      }
    }
    this.recordDestination = null
  }

  /**
   * Creates/resumes the context. Call this directly inside a click handler so
   * mobile browsers count it as a user gesture; the preview can then start the
   * pad from an effect without being blocked by autoplay policy.
   */
  ensure(): void {
    if (this.disposed) return
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: AudioContextCtor })
          .webkitAudioContext
      if (!Ctor) return

      const ctx = new Ctor()
      const master = ctx.createGain()
      master.gain.value = 0

      const filter = ctx.createBiquadFilter()
      filter.type = "lowpass"
      filter.frequency.value = 1_500
      filter.Q.value = 0.35

      const compressor = ctx.createDynamicsCompressor()
      compressor.threshold.value = -20
      compressor.knee.value = 26
      compressor.ratio.value = 3
      compressor.attack.value = 0.03
      compressor.release.value = 0.35

      filter.connect(compressor)
      compressor.connect(master)
      master.connect(ctx.destination)
      if (this.recordDestination) {
        try {
          master.connect(this.recordDestination)
        } catch {
          // ignore duplicate connect
        }
      }

      this.ctx = ctx
      this.master = master
      this.filter = filter
      this.buildVoices()
    }

    if (this.ctx.state === "suspended") void this.ctx.resume().catch(() => {})
  }

  private buildVoices(): void {
    const ctx = this.ctx
    const filter = this.filter
    if (!ctx || !filter) return

    const specs: { type: OscillatorType; level: number; detune: number }[] = [
      { type: "triangle", level: 0.05, detune: -4 },
      { type: "sine", level: 0.04, detune: 3 },
      { type: "sine", level: 0.032, detune: -2 },
      { type: "sine", level: 0.055, detune: 0 },
    ]

    this.voices = specs.map((spec) => {
      const osc = ctx.createOscillator()
      osc.type = spec.type
      osc.detune.value = spec.detune
      const gain = ctx.createGain()
      gain.gain.value = 0
      osc.connect(gain)
      gain.connect(filter)
      osc.start()
      return { osc, gain, level: spec.level }
    })

    // A very slow filter breath keeps the pad from sounding static.
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.type = "sine"
    lfo.frequency.value = 0.09
    lfoGain.gain.value = 180
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()
  }

  private applyChord(immediate = false): void {
    const ctx = this.ctx
    if (!ctx) return
    const mood = MOODS[this.mood % MOODS.length]
    const chord = mood.chords[this.bar % mood.chords.length]
    const sub = mood.subs[this.bar % mood.subs.length]
    const now = ctx.currentTime
    const glide = immediate ? 0.05 : 0.65

    this.voices.forEach((voice, index) => {
      const frequency = index === 3 ? sub : (chord[index] ?? chord[0])
      voice.osc.frequency.setTargetAtTime(frequency, now, glide)
      voice.gain.gain.setTargetAtTime(voice.level, now, immediate ? 0.05 : 0.5)
    })
  }

  private scheduleBars(): void {
    if (this.barTimer !== null) clearTimeout(this.barTimer)
    this.barTimer = setTimeout(() => {
      if (!this.running) return
      this.bar = (this.bar + 1) % 4
      this.applyChord()
      this.scheduleBars()
    }, BAR_SECONDS * 1_000)
  }

  start(mood: number): void {
    this.ensure()
    const ctx = this.ctx
    const master = this.master
    if (!ctx || !master) return

    const changedMood = this.mood !== mood
    this.mood = Math.abs(Math.floor(mood)) % MOODS.length

    if (this.running && !this.paused) {
      if (changedMood) {
        this.bar = 0
        this.applyChord()
      }
      return
    }

    this.running = true
    this.paused = false
    if (this.suspendTimer !== null) {
      clearTimeout(this.suspendTimer)
      this.suspendTimer = null
    }
    void ctx.resume().catch(() => {})

    if (changedMood) this.bar = 0
    this.applyChord()
    const now = ctx.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setTargetAtTime(this.muted ? 0 : this.volume, now, 0.35)
    this.scheduleBars()
  }

  pause(): void {
    if (!this.running) return
    this.running = false
    this.paused = true
    if (this.barTimer !== null) {
      clearTimeout(this.barTimer)
      this.barTimer = null
    }
    const ctx = this.ctx
    if (ctx && this.master) {
      const now = ctx.currentTime
      this.master.gain.cancelScheduledValues(now)
      this.master.gain.setTargetAtTime(0, now, 0.12)
    }
    if (this.suspendTimer !== null) clearTimeout(this.suspendTimer)
    this.suspendTimer = setTimeout(() => {
      if (this.paused && this.ctx?.state === "running")
        void this.ctx.suspend().catch(() => {})
    }, 260)
  }

  stop(): void {
    this.running = false
    this.paused = false
    if (this.barTimer !== null) {
      clearTimeout(this.barTimer)
      this.barTimer = null
    }
    const ctx = this.ctx
    if (ctx && this.master) {
      const now = ctx.currentTime
      this.master.gain.cancelScheduledValues(now)
      this.master.gain.setTargetAtTime(0, now, 0.1)
    }
    if (this.suspendTimer !== null) clearTimeout(this.suspendTimer)
    this.suspendTimer = setTimeout(() => {
      if (!this.running && this.ctx?.state === "running")
        void this.ctx.suspend().catch(() => {})
    }, 260)
  }

  setMuted(muted: boolean): void {
    this.muted = muted
    const ctx = this.ctx
    if (!ctx || !this.master) return
    const now = ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setTargetAtTime(muted ? 0 : this.volume, now, 0.12)
  }

  setVolume(volume: number): void {
    this.volume = clamp01(volume)
    const ctx = this.ctx
    if (!ctx || !this.master || this.muted) return
    const now = ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setTargetAtTime(this.running ? this.volume : 0, now, 0.12)
  }

  /** Soft bell on a photo change. */
  cue(index = 0): void {
    if (!this.running || this.paused || this.muted) return
    const ctx = this.ctx
    if (!ctx) return
    const now = ctx.currentTime + 0.01
    const base = 587.33 + (index % 3) * 32.7
    this.tone(base, now, 0.55, 0.045, "triangle", base * 1.22)
    this.tone(base / 2, now + 0.015, 0.7, 0.022, "sine")
  }

  /** Gentle three-note resolve when the outro appears. */
  outro(): void {
    if (!this.running || this.paused || this.muted) return
    const ctx = this.ctx
    if (!ctx) return
    const now = ctx.currentTime + 0.02
    const notes = [523.25, 659.25, 783.99]
    notes.forEach((frequency, index) => {
      this.tone(
        frequency,
        now + index * 0.14,
        0.85,
        0.035,
        "sine",
        frequency * 1.01,
      )
    })
  }

  private tone(
    frequency: number,
    at: number,
    duration: number,
    level: number,
    type: OscillatorType,
    endFrequency?: number,
  ): void {
    const ctx = this.ctx
    const filter = this.filter
    if (!ctx || !filter) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(frequency, at)
    if (endFrequency)
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(20, endFrequency),
        at + duration * 0.8,
      )

    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.exponentialRampToValueAtTime(level, at + 0.035)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + duration)

    osc.connect(gain)
    gain.connect(filter)
    osc.start(at)
    osc.stop(at + duration + 0.06)
  }

  destroy(): void {
    this.disposed = true
    this.running = false
    this.paused = false
    if (this.barTimer !== null) clearTimeout(this.barTimer)
    if (this.suspendTimer !== null) clearTimeout(this.suspendTimer)
    this.barTimer = null
    this.suspendTimer = null
    for (const voice of this.voices) {
      try {
        voice.osc.stop()
      } catch {
        // already stopped
      }
    }
    this.voices = []
    if (this.ctx) void this.ctx.close().catch(() => {})
    this.ctx = null
    this.master = null
    this.filter = null
  }
}
