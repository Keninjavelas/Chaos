// src/archive/events/rareEvents.ts
/**
 * Central definition of rare event probabilities.
 * Probabilities are expressed as a fraction (0.0 – 1.0).
 * No component should hard‑code these values; they are referenced via
 * ArchiveController.triggerRareEvent(eventName).
 */
export const RareEventProbabilities = {
  peripheralSilhouette: 0.01, // 1%
  wrongRouteFlash: 0.03, // 3%
  crossPageLeakage: 0.02, // 2%
  hiddenAnnotation: 0.05, // 5%
  archiveComment: 0.10, // 10%
  envelopeEyes: 0.10, // 10%
} as const;

export type RareEventName = keyof typeof RareEventProbabilities;
