// src/archive/state/selectors.ts
/**
 * Derived selectors for the archive state.
 * These helpers provide convenient, memoized access to computed values.
 */
import { useArchiveStore } from "../../lib/state";

/** Archive health as a human‑readable string */
export const getArchiveHealthStatus = () => {
  const health = useArchiveStore.getState().archiveHealth;
  if (health >= 80) return "Excellent";
  if (health >= 60) return "Good";
  if (health >= 40) return "Fair";
  if (health >= 20) return "Poor";
  return "Critical";
};

/** Memory integrity status */
export const getMemoryIntegrityStatus = () => {
  const mi = useArchiveStore.getState().memoryIntegrity;
  if (mi >= 90) return "Pristine";
  if (mi >= 70) return "Stable";
  if (mi >= 50) return "Degraded";
  if (mi >= 30) return "Corroded";
  return "Lost";
};

/** Corruption stage based on active flags */
export const getCorruptionStage = () => {
  const flags = useArchiveStore.getState().corruptionFlags;
  const active = Object.entries(flags).filter(([, v]) => v).map(([k]) => k);
  if (active.length === 0) return "None";
  return active.join(", ");
};

/** Session risk level – a simple heuristic */
export const getSessionRiskLevel = () => {
  // These were removed in a previous refactor
  // hasExperiencedPanic: (state: ArchiveState) => state.panicEvents.length > 0,
  // getRecentPanicEvents: (state: ArchiveState) => {
  //   const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
  //   return state.panicEvents.filter(e => e.timestamp > tenMinutesAgo);
  // },
  // getIdleEvents: (state: ArchiveState) => state.idleEvents,
  const score = 0; 
  if (score < 0.3) return "Low";
  if (score < 0.6) return "Medium";
  return "High";
};

/** Most visited section (page) */
export const getMostVisitedSection = () => {
  const metrics = useArchiveStore.getState().archiveMetrics;
  const pages = metrics.pagesVisited || {};
  let topPage = "";
  let topCount = 0;
  for (const [page, cnt] of Object.entries(pages)) {
    if (cnt > topCount) {
      topCount = cnt;
      topPage = page;
    }
  }
  return topPage || "None";
};
