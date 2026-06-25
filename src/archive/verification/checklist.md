// src/archive/verification/checklist.md
# Runtime Verification Checklist

The following checklist must be passed **before** moving on to the presentation layer (Intro Sequence, Archive Shell, Navigation, Homepage).

## Persistence
- [ ] Refresh the page and confirm that persisted fields survive (totalSessions, totalTimeSpent, longestSession, visitStreak, lastVisitTimestamp).
- [ ] Verify that non‑persisted fields (currentSessionDuration, currentRoute) reset on refresh.

## Idle Detection
- [ ] After 15 s of inactivity an observation is emitted.
- [ ] After 30 s degradation increases by the expected amount.
- [ ] After 60 s rare‑event evaluation runs.
- [ ] After 120 s archive‑comment evaluation runs (placeholder).

## Panic Detection
- [ ] Trigger a panic event (e.g., via the Debug Panel) and ensure degradation +0.03 and panicEvents increment.

## Observations
- [ ] Observations are recorded in `observationHistory` with correct `priority` values.
- [ ] Observation entries persist across reloads.

## Rare Events & Cooldowns
- [ ] Verify each rare event respects its `cooldown` and `maxPerSession` limits.
- [ ] `countPerSession` increments correctly and resets on new session.

## Metrics & Flags
- [ ] All metrics (`archiveMetrics`) update correctly on visits, incidents, idle, panic, etc.
- [ ] Corruption flags are derived **only** from `degradationLevel` as per the mapping.

## State Restoration
- [ ] After a full reload, the Zustand store is re‑hydrated with persisted data and derived flags are recomputed.

## Debug Panel
- [ ] Panel appears only when `process.env.NODE_ENV === "development"`.
- [ ] Live values (degradation, health, flags, session stats) reflect the current store.
- [ ] Simulation buttons affect the state as expected.

**Pass Criteria**: All items checked.

Once this checklist passes, we will proceed with:
1. Intro Sequence
2. Archive Shell
3. Navigation
4. Homepage

The runtime layer will then be considered complete.
