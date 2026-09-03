export type InteractionFeedback = "focus" | "activate" | "read" | "open" | "close" | "unavailable";

const tones: Record<InteractionFeedback, { frequency: number; duration: number; volume: number; type?: OscillatorType }> = {
  focus: { frequency: 520, duration: 0.025, volume: 0.015, type: "sine" },
  activate: { frequency: 390, duration: 0.06, volume: 0.035, type: "sine" },
  read: { frequency: 460, duration: 0.05, volume: 0.030, type: "triangle" },
  open: { frequency: 260, duration: 0.08, volume: 0.04, type: "sine" },
  close: { frequency: 190, duration: 0.05, volume: 0.025, type: "sine" },
  unavailable: { frequency: 120, duration: 0.11, volume: 0.035, type: "sawtooth" },
};

export function playInteractionFeedback(kind: InteractionFeedback) {
  if (typeof window === "undefined") return;
  const AudioContextConstructor =
    window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextConstructor) return;

  try {
    const context = new AudioContextConstructor();
    const tone = tones[kind];
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    
    oscillator.type = tone.type ?? "sine";
    oscillator.frequency.value = tone.frequency;
    
    gain.gain.setValueAtTime(tone.volume, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + tone.duration);
    
    oscillator.connect(gain);
    gain.connect(context.destination);
    
    oscillator.start();
    oscillator.stop(context.currentTime + tone.duration);
    oscillator.addEventListener("ended", () => void context.close());
  } catch {
    // Audio feedback is optional; interaction must remain usable when audio is blocked.
  }
}
