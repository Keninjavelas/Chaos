// src/archive/types.ts
/** Types for archive system */

export enum ObservationPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical",
}

export interface ObservationEntry {
  id: string;
  timestamp: number; // Unix epoch ms
  category: string;
  severity: "low" | "medium" | "high";
  message: string;
  priority: ObservationPriority;
}

export interface ArchiveMetrics {
  favoriteSection?: string;
  mostViewedProject?: string;
  longestSession: number; // seconds
  totalVisits: number;
  idleEvents: number;
  panicEvents: number;
  lettersSent: number;
  rareEventsSeen: number;
  pagesVisited: Record<string, number>;
  lastVisit?: number; // timestamp
}

export interface PageVisit {
  route: string;
  timestamp: number;
  duration?: number;
}

export interface SessionInfo {
  sessionStart: number;
  sessionDuration: number;
  longestSession: number;
  visitStreak: number;
}

export interface CorruptionFlags {
  typographyCorruption: boolean;
  ambientAudioCorruption: boolean;
  hiddenContentUnlocked: boolean;
  observerActivity: boolean;
  silhouetteActivity: boolean;
}

export interface RareEventCooldown {
  lastTriggered: number; // timestamp
  cooldown: number; // seconds
  maxPerSession: number;
  countPerSession: number;
}

export type RareEventName = keyof typeof import("./events/rareEvents").RareEventProbabilities;
