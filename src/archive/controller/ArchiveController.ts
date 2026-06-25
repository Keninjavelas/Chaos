"use client";
import { ObservationPriority, ArchiveMetrics } from "../types";
import { useArchiveStore } from "../../lib/state";

/**
 * Central orchestrator for the Archive.
 * All subsystems (degradation, observation, panic, health, persistence) talk to
 * this controller. It updates the global Zustand store and triggers side‑effects
 * (audio, visual corruption, rare events) via callbacks that can be wired in.
 */
export const ArchiveController = {
  // --- Degradation -------------------------------------------------------
  addIdleTime(seconds: number) {
    const store = useArchiveStore.getState();
    const inc = seconds >= 30 ? 0.02 : seconds >= 15 ? 0.01 : 0;
    if (inc > 0) {
      store.setDegradation(store.degradationLevel + inc);
      store.archiveMetrics = { ...store.archiveMetrics, idleEvents: (store.archiveMetrics?.idleEvents ?? 0) + 1 };
    }
  },
  addPanicEvent() {
    const store = useArchiveStore.getState();
    store.setDegradation(store.degradationLevel + 0.03);
    store.archiveMetrics = { ...store.archiveMetrics, panicEvents: (store.archiveMetrics?.panicEvents ?? 0) + 1 };
  },
  recordVisit() {
    const store = useArchiveStore.getState();
    store.incrementVisit();
    // Return‑visit bonus (any visit beyond the first)
    if (store.visitCount > 1) {
      store.setDegradation(store.degradationLevel + 0.01);
    }
  },
  recordIncident() {
    const store = useArchiveStore.getState();
    store.incrementIncident();
    // each incident pushes degradation a bit
    store.setDegradation(store.degradationLevel + 0.02);
  },

  // --- Observation -------------------------------------------------------
  emitObservation(note: string, priority: "low" | "medium" | "high" | "critical" = "low") {
    // Record observation in store and persist.
    const store = useArchiveStore.getState();
    const sev: "low" | "medium" | "high" = priority === "critical" ? "high" : priority;
    const entry = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      category: "runtime",
      severity: sev,
      message: note,
      priority: ObservationPriority[priority.charAt(0).toUpperCase() + priority.slice(1) as keyof typeof ObservationPriority],
    } as const;
    store.addObservation(entry);
    console.log("[Observation]", note);
    // Persist after adding
    this.persist();
  },

  // --- Archive Health ----------------------------------------------------
  computeHealth() {
    const store = useArchiveStore.getState();
    // Simple linear health drop based on degradation
    const health = Math.max(0, 100 - store.degradationLevel * 100);
    store.archiveHealth = health;
    // Log degradation and flags for debugging
    console.log('[Debug] DEGRADATION', store.degradationLevel);
    console.log('[Debug] FLAGS BEFORE', store.corruptionFlags);
    // Update metric for health changes
// archiveHealth is stored directly in state; no need to record as metric
    // Derive corruption flags after health update
    this.deriveCorruptionFlags();
    console.log('[Debug] FLAGS AFTER', store.corruptionFlags);
    return health;
  },

  // --- Corruption Flags --------------------------------------------------
  /** Derive corruption flags from degradationLevel */
  deriveCorruptionFlags() {
    const store = useArchiveStore.getState();
    const d = store.degradationLevel;
    const flags = {
      typographyCorruption: d >= 0.20 && d < 0.40,
      breadcrumbCorruption: d >= 0.40 && d < 0.60,
      routeCorruption: d >= 0.60 && d < 0.80,
      audioCorruption: d >= 0.80 && d < 1.0,
      memoryDrift: d >= 0.80 && d < 1.0,
      archiveCollapse: d >= 1.0,
    };
    console.log('[Debug] deriveCorruptionFlags called with degradation', d);
    store.updateCorruptionFlags(flags);
  },

  // --- Persistence -------------------------------------------------------
  persist() {
    // Defer to PersistenceManager (import lazily to avoid circular deps)
    import("../../lib/PersistenceManager").then(({ PersistenceManager }) => {
      PersistenceManager.saveLocal();
    });
  },
  // Record a numeric metric (increment or set)
  // Record a numeric metric (increment or set)
  // Updated to use keyof ArchiveMetrics for type safety
  recordMetric(name: keyof import("../types").ArchiveMetrics, value: number) {
    const store = useArchiveStore.getState();
    const current = (store.archiveMetrics[name] ?? 0) as number;
    store.archiveMetrics = { ...store.archiveMetrics, [name]: current + value };
    this.persist();
  },

  // --- Rare Event Trigger -----------------------------------------------
  /**
   * Evaluate and possibly trigger rare events respecting cooldowns and per‑session limits.
   */
  evaluateRareEvents() {
    import("../events/rareEvents").then(({ RareEventProbabilities }) => {
      const store = useArchiveStore.getState();
      const now = Date.now();
      // Configuration for each event (cooldown in seconds, max per session)
      const config: Record<string, { cooldown: number; maxPerSession: number }> = {
        peripheralSilhouette: { cooldown: 15 * 60, maxPerSession: 2 },
        wrongRouteFlash: { cooldown: 10 * 60, maxPerSession: 3 },
        crossPageLeakage: { cooldown: 20 * 60, maxPerSession: 2 },
        hiddenAnnotation: { cooldown: 5 * 60, maxPerSession: 5 },
        archiveComment: { cooldown: 3 * 60, maxPerSession: 8 },
        envelopeEyes: { cooldown: Number.MAX_SAFE_INTEGER, maxPerSession: 1 }, // once per session
      };

      (Object.keys(RareEventProbabilities) as Array<keyof typeof RareEventProbabilities>).forEach(eventName => {
        const prob = RareEventProbabilities[eventName];
        const eventConfig = config[eventName as string];
        if (!eventConfig) return; // safety
        // Initialize cooldown entry if missing
        if (!store.rareEventCooldowns[eventName]) {
          store.rareEventCooldowns[eventName] = {
            lastTriggered: 0,
            cooldown: eventConfig.cooldown,
            maxPerSession: eventConfig.maxPerSession,
            countPerSession: 0,
          };
        }
        const cd = store.rareEventCooldowns[eventName];
        const canTrigger =
          now - cd.lastTriggered >= cd.cooldown * 1000 &&
          cd.countPerSession < cd.maxPerSession;
        if (canTrigger && Math.random() < prob) {
          console.log(`[Rare Event] ${eventName} triggered`);
          // Record that we triggered it
          cd.lastTriggered = now;
          cd.countPerSession += 1;
          store.rareEventCooldowns[eventName] = cd;
          // Emit a generic observation for debugging
          this.emitObservation(`Rare event ${eventName} occurred`, "high");
        }
      });
    });
  },

  /** Placeholder for archive comment evaluation logic */
  triggerArchiveComment() {
    // Future implementation will generate a comment based on archive state.
    console.log("[Archive Comment] Evaluation placeholder");
    this.emitObservation("Archive comment evaluated", "medium");
  },

  // --- Public API --------------------------------------------------------
  triggerRareEvent(eventName: keyof typeof import("../events/rareEvents").RareEventProbabilities) {
    // Direct trigger respecting cooldowns
    import("../events/rareEvents").then(({ RareEventProbabilities }) => {
      const prob = RareEventProbabilities[eventName];
      const store = useArchiveStore.getState();
      const now = Date.now();
      const cd = store.rareEventCooldowns[eventName] || {
        lastTriggered: 0,
        cooldown: 0,
        maxPerSession: Infinity,
        countPerSession: 0,
      };
      if (now - cd.lastTriggered >= cd.cooldown * 1000 && cd.countPerSession < cd.maxPerSession) {
        if (Math.random() < prob) {
          console.log(`[Rare Event] ${eventName} triggered`);
          cd.lastTriggered = now;
          cd.countPerSession++;
          store.rareEventCooldowns[eventName] = cd;
          this.emitObservation(`Rare event ${eventName} occurred`, "high");
        }
      }
    });
  },
};
