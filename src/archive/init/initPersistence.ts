// src/archive/init/initPersistence.ts
/**
 * Initialize persistence layer.
 * Loads persisted state from localStorage into the Zustand store.
 */
import { useArchiveStore } from "../../lib/state";

export function initPersistence() {
  try {
    const raw = localStorage.getItem('archiveState');
    if (raw) {
      const persisted = JSON.parse(raw);
      // Exclude critical runtime metrics and enforce fresh defaults
      const { degradationLevel, archiveHealth, memoryIntegrity, ...rest } = persisted;
      useArchiveStore.setState({
        ...rest,
        degradationLevel: 0,
        archiveHealth: 100,
        memoryIntegrity: 100,
      });
      console.log('[Init] Persistence loaded from localStorage');
    }
  } catch (e) {
    console.warn('[Init] Failed to load persistence:', e);
  }
}
