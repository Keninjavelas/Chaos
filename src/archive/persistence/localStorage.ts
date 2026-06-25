// src/archive/persistence/localStorage.ts
import { useArchiveStore } from "../../lib/state";

/**
 * Simple wrapper around LocalStorage for primitive state values.
 * Used by ArchiveController.persist() and on app start.
 */
export const LocalStorage = {
  save() {
    const state = useArchiveStore.getState();
    const payload = {
      degradationLevel: state.degradationLevel,
      visitCount: state.visitCount,
      incidentCount: state.incidentCount,
      archiveHealth: state.archiveHealth,
      memoryIntegrity: state.memoryIntegrity,
      favoriteSection: state.favoriteSection,
      lastVisitedPage: state.lastVisitedPage,
      totalTimeSpent: state.totalTimeSpent,
      // idleEvents and panicEvents are stored inside archiveMetrics
      archiveMetrics: state.archiveMetrics,
      observationHistory: state.observationHistory,
    };
    localStorage.setItem("archiveState", JSON.stringify(payload));
  },
  load() {
    const raw = localStorage.getItem("archiveState");
    if (!raw) return;
    const data = JSON.parse(raw);
    const set = useArchiveStore.setState;
    set({
      degradationLevel: data.degradationLevel ?? 0,
      visitCount: data.visitCount ?? 0,
      incidentCount: data.incidentCount ?? 0,
      archiveHealth: data.archiveHealth ?? 100,
      memoryIntegrity: data.memoryIntegrity ?? 100,
      favoriteSection: data.favoriteSection,
      lastVisitedPage: data.lastVisitedPage,
      totalTimeSpent: data.totalTimeSpent ?? 0,
      // Restore archiveMetrics including idleEvents and panicEvents
      archiveMetrics: data.archiveMetrics ?? {
        idleEvents: 0,
        panicEvents: 0,
        favoriteSection: undefined,
        mostViewedProject: undefined,
        longestSession: 0,
        totalVisits: 0,
        lettersSent: 0,
        rareEventsSeen: 0,
        pagesVisited: {},
        lastVisit: undefined,
      },
      observationHistory: data.observationHistory ?? [],
    });
  },
};
