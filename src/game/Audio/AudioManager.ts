/**
 * Pure Web Audio Procedural Sound & Ambience Engine
 * Zero external audio assets, zero copyright risk, lightweight, and resilient to browser autoplay policies.
 */

export type RoomAudioProfile = "RECEPTION" | "PERSONNEL" | "RESEARCH" | "RECORDS" | "CORRIDOR" | "SUBLEVEL";

class AudioManager {
  private ctx: AudioContext | null = null;
  private isUnlocked = false;

  // Master & Bus Nodes
  private masterGain: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  // Global Ambience Nodes (Low HVAC / Structural Drone)
  private globalOsc: OscillatorNode | null = null;
  private globalNoiseNode: AudioBufferSourceNode | null = null;
  private globalGain: GainNode | null = null;

  // Room Ambience Layers (Cross-faded)
  private roomGains: Record<RoomAudioProfile, GainNode | null> = {
    RECEPTION: null,
    PERSONNEL: null,
    RESEARCH: null,
    RECORDS: null,
    CORRIDOR: null,
    SUBLEVEL: null,
  };
  private currentProfile: RoomAudioProfile = "RECEPTION";

  // Footsteps Synthesis state
  private lastFootstepTime = 0;
  private footstepStepToggle = false;

  constructor() {
    // Lazy initialize on first interaction to respect autoplay policy
  }

  private init() {
    if (this.ctx || typeof window === "undefined") return;

    const AudioContextClass =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      this.ctx = new AudioContextClass();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Ambience Sub-bus (Subtle, low volume 3-5%)
      this.ambienceGain = this.ctx.createGain();
      this.ambienceGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.ambienceGain.connect(this.masterGain);

      // SFX Sub-bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.setupGlobalAmbience();
      this.setupRoomLayers();
    } catch {
      // Audio is non-blocking
    }
  }

  public unlock() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().then(() => {
        this.isUnlocked = true;
      }).catch(() => {});
    } else {
      this.isUnlocked = true;
    }
  }

  private createNoiseBuffer(durationSeconds = 4): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * durationSeconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    // Generate pink-ish / brown noise
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
    return buffer;
  }

  private setupGlobalAmbience() {
    if (!this.ctx || !this.ambienceGain) return;

    // 1. Low 55Hz sub-rumble oscillator
    this.globalOsc = this.ctx.createOscillator();
    this.globalOsc.type = "sine";
    this.globalOsc.frequency.setValueAtTime(55, this.ctx.currentTime);

    const oscFilter = this.ctx.createBiquadFilter();
    oscFilter.type = "lowpass";
    oscFilter.frequency.setValueAtTime(80, this.ctx.currentTime);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

    this.globalOsc.connect(oscFilter);
    oscFilter.connect(oscGain);

    // 2. Filtered brown noise for HVAC breathing
    const noiseBuffer = this.createNoiseBuffer(5);
    if (noiseBuffer) {
      this.globalNoiseNode = this.ctx.createBufferSource();
      this.globalNoiseNode.buffer = noiseBuffer;
      this.globalNoiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(110, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

      this.globalNoiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);

      // Mix global
      this.globalGain = this.ctx.createGain();
      this.globalGain.gain.setValueAtTime(1.0, this.ctx.currentTime);

      oscGain.connect(this.globalGain);
      noiseGain.connect(this.globalGain);
      this.globalGain.connect(this.ambienceGain);

      this.globalOsc.start();
      this.globalNoiseNode.start();
    }
  }

  private setupRoomLayers() {
    if (!this.ctx || !this.ambienceGain) return;

    const profiles: RoomAudioProfile[] = ["RECEPTION", "PERSONNEL", "RESEARCH", "RECORDS", "CORRIDOR", "SUBLEVEL"];

    profiles.forEach((profile) => {
      if (!this.ctx || !this.ambienceGain) return;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(profile === "RECEPTION" ? 1.0 : 0.0, this.ctx.currentTime);

      if (profile === "RECEPTION") {
        // Fluorescent tube 120Hz ballast drone
        const osc = this.ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(120, this.ctx.currentTime);
        const filter = this.ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(240, this.ctx.currentTime);
        filter.Q.setValueAtTime(3.0, this.ctx.currentTime);
        const oGain = this.ctx.createGain();
        oGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(oGain);
        oGain.connect(gain);
        osc.start();
      } else if (profile === "RESEARCH") {
        // Server cooling fans (higher frequency multi-band air rush)
        const noiseBuf = this.createNoiseBuffer(4);
        if (noiseBuf) {
          const noise = this.ctx.createBufferSource();
          noise.buffer = noiseBuf;
          noise.loop = true;

          const filter1 = this.ctx.createBiquadFilter();
          filter1.type = "bandpass";
          filter1.frequency.setValueAtTime(450, this.ctx.currentTime);
          filter1.Q.setValueAtTime(2.0, this.ctx.currentTime);

          const filter2 = this.ctx.createBiquadFilter();
          filter2.type = "peaking";
          filter2.frequency.setValueAtTime(850, this.ctx.currentTime);
          filter2.gain.setValueAtTime(6, this.ctx.currentTime);

          const fanGain = this.ctx.createGain();
          fanGain.gain.setValueAtTime(0.55, this.ctx.currentTime);

          noise.connect(filter1);
          filter1.connect(filter2);
          filter2.connect(fanGain);
          fanGain.connect(gain);
          noise.start();
        }
      } else if (profile === "PERSONNEL") {
        // Subdued room tone with faint draft
        const noiseBuf = this.createNoiseBuffer(4);
        if (noiseBuf) {
          const noise = this.ctx.createBufferSource();
          noise.buffer = noiseBuf;
          noise.loop = true;
          const filter = this.ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(160, this.ctx.currentTime);
          const pGain = this.ctx.createGain();
          pGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

          noise.connect(filter);
          filter.connect(pGain);
          pGain.connect(gain);
          noise.start();
        }
      } else if (profile === "RECORDS") {
        // Damped, quiet acoustic room
        const osc = this.ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(48, this.ctx.currentTime);
        const rGain = this.ctx.createGain();
        rGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

        osc.connect(rGain);
        rGain.connect(gain);
        osc.start();
      }

      gain.connect(this.ambienceGain);
      this.roomGains[profile] = gain;
    });
  }

  public setRoomProfile(profile: RoomAudioProfile) {
    if (this.currentProfile === profile || !this.ctx) return;
    this.currentProfile = profile;
    const now = this.ctx.currentTime;
    const fadeDuration = 2.5; // Smooth crossfade over 2.5s

    (Object.keys(this.roomGains) as RoomAudioProfile[]).forEach((key) => {
      const g = this.roomGains[key];
      if (g) {
        g.gain.cancelScheduledValues(now);
        g.gain.setValueAtTime(g.gain.value, now);
        g.gain.linearRampToValueAtTime(key === profile ? 1.0 : 0.0, now + fadeDuration);
      }
    });
  }

  public setAmbienceDucking(isDucked: boolean) {
    if (!this.ctx || !this.ambienceGain) return;
    const now = this.ctx.currentTime;
    const targetGain = isDucked ? 0.012 : 0.04;
    this.ambienceGain.gain.cancelScheduledValues(now);
    this.ambienceGain.gain.setValueAtTime(this.ambienceGain.gain.value, now);
    this.ambienceGain.gain.linearRampToValueAtTime(targetGain, now + 0.5);
  }

  public playFootstep(surface: "concrete" | "tile" | "metal" = "concrete") {
    if (!this.ctx || !this.isUnlocked || !this.sfxGain) return;
    const now = performance.now();
    if (now - this.lastFootstepTime < 320) return; // Prevent audio spam
    this.lastFootstepTime = now;
    this.footstepStepToggle = !this.footstepStepToggle;

    const stepCtx = this.ctx;
    const t = stepCtx.currentTime;

    const osc = stepCtx.createOscillator();
    const gain = stepCtx.createGain();
    const filter = stepCtx.createBiquadFilter();

    const baseFreq = surface === "metal" ? 180 : surface === "tile" ? 130 : 95;
    const pitchMod = this.footstepStepToggle ? 1.05 : 0.95;
    const duration = surface === "metal" ? 0.07 : 0.05;

    osc.type = surface === "metal" ? "triangle" : "sine";
    osc.frequency.setValueAtTime(baseFreq * pitchMod, t);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, t + duration);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(surface === "tile" ? 400 : 250, t);

    gain.gain.setValueAtTime(0.045, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + duration);
  }
}

export const audioManager = new AudioManager();
