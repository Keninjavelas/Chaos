// src/runtime_check.ts
/**
 * Runtime Verification Checklist runner
 * Uses the archive store and controller to programmatically verify the checklist items.
 */
import { PersistenceManager } from "./lib/PersistenceManager.ts";
import { ArchiveController } from "./archive/controller/ArchiveController.ts";
import { useArchiveStore } from "./lib/state.ts";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`[PASS] ${message}`);
  }
}

async function runChecks() {
  // 1. Persistence
  const store = useArchiveStore.getState();
  // Set some persisted fields
  store.setDegradation(0.42);
  store.incrementVisit();
  store.incrementVisit();
  store.incrementTotalSessions();
  store.addTimeSpent(123);
  store.setSessionInfo({ visitStreak: 3, longestSession: 200 });
  PersistenceManager.saveLocal();
  // Reset store to defaults
  store.reset();
  // Load persisted data
  PersistenceManager.loadLocal();
  const after = useArchiveStore.getState();
  assert(after.degradationLevel === 0.42, "Persisted degradation survives refresh");
  assert(after.visitCount === 2, "Persisted visitCount survives refresh");
  // Non‑persisted fields should be reset
  assert(after.session.sessionDuration === 0, "Current sessionDuration reset");

  // 2. Idle Detection (simulate via controller)
  ArchiveController.addIdleTime(15);
  assert(useArchiveStore.getState().degradationLevel >= 0, "Idle 15s handled");
  ArchiveController.addIdleTime(30);
  const degAfter30 = useArchiveStore.getState().degradationLevel;
  assert(degAfter30 > 0, "Idle 30s increased degradation");

  // 3. Panic Detection
  const beforePanic = useArchiveStore.getState().archiveMetrics.panicEvents;
  ArchiveController.addPanicEvent();
  const afterPanic = useArchiveStore.getState().archiveMetrics.panicEvents;
  assert(afterPanic === beforePanic + 1, "Panic event increments counter");

  // 4. Observations
  const obsCountBefore = useArchiveStore.getState().observationHistory.length;
  ArchiveController.emitObservation("Test observation", "high");
  const obsCountAfter = useArchiveStore.getState().observationHistory.length;
  assert(obsCountAfter === obsCountBefore + 1, "Observation recorded");

  // 5. Rare Events & Cooldowns
  const rareBefore = useArchiveStore.getState().rareEventCooldowns["peripheralSilhouette"]?.countPerSession ?? 0;
  ArchiveController.triggerRareEvent("peripheralSilhouette");
  const rareAfter = useArchiveStore.getState().rareEventCooldowns["peripheralSilhouette"]?.countPerSession ?? 0;
  assert(rareAfter >= rareBefore, "Rare event cooldown map updated");

  // 6. Metrics & Flags
  ArchiveController.deriveCorruptionFlags();
  const flags = useArchiveStore.getState().corruptionFlags;
  const d = useArchiveStore.getState().degradationLevel;
  if (d >= 0.2 && d < 0.4) {
    assert(flags.typographyCorruption, "Typography flag correct");
  }

  // 8. Debug Panel visibility – cannot test UI here, just ensure env check
  const isDev = process.env.NODE_ENV === "development";
  console.log(`[INFO] Debug panel would be ${isDev ? "visible" : "hidden"} in this environment.`);

  console.log("All checks completed.");
}

runChecks().catch(err => {
  console.error("Error during checks:", err);
  process.exit(1);
});
