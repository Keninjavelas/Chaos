// src/archive/init/initRareEvents.ts
/**
 * Initialize the Rare Events subsystem.
 * Sets up cooldown tracking in the store and ensures the
 * controller respects per‑session limits.
 */
import { useArchiveStore } from "../../lib/state";

export function initRareEvents() {
  // Initialise the rareEventCooldowns map if not present.
  const store = useArchiveStore.getState();
  if (!store.rareEventCooldowns) {
    store.rareEventCooldowns = {};
  }
  console.log("[Init] Rare Events initialized");
}
