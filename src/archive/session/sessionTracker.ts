// src/archive/session/sessionTracker.ts
/**
 * Session tracking utilities.
 * Tracks aggregate session statistics that persist across page loads.
 *
 * Persists:
 *   - totalSessions
 *   - totalTimeSpent
 *   - longestSession
 *   - visitStreak
 *   - lastVisitTimestamp
 *
 * Does NOT persist the current session duration or current route.
 */
import { useArchiveStore } from "../../lib/state";

/** Start a new session – called on app boot */
export function startSession() {
  const store = useArchiveStore.getState();
  // Increment total session count
  store.incrementTotalSessions();
  // Record start timestamp
  const now = Date.now();
  store.setSessionInfo({ sessionStart: now, sessionDuration: 0, visitStreak: 0 });
  // Save start as lastVisitTimestamp for continuity (will be updated on each visit)
  store.setLastVisitTimestamp(now);
}

/** End current session – called on unload */
export function endSession() {
  const store = useArchiveStore.getState();
  const now = Date.now();
  const durationSec = Math.floor((now - store.session.sessionStart) / 1000);
  // Update aggregate metrics
  store.addTimeSpent(durationSec);
  // Update longest session if applicable
  if (durationSec > store.session.longestSession) {
    store.setSessionInfo({ longestSession: durationSec });
  }
  // Update visit streak – simple heuristic: if last visit was within 24h, increment
  const lastVisit = store.lastVisitTimestamp;
  if (lastVisit && now - lastVisit < 24 * 60 * 60 * 1000) {
    store.setSessionInfo({ visitStreak: store.session.visitStreak + 1 });
  } else {
    store.setSessionInfo({ visitStreak: 1 });
  }
  // Persist final state
  store.setLastVisitTimestamp(now);
}

/** Hook to wire start/end to page lifecycle */
export function useSessionTracker() {
  // This hook is intended to be used in a client component (e.g., ArchiveProvider)
  // It will start a session on mount and end it on unload.
  // The actual implementation lives in ArchiveProvider's useEffect.
}
