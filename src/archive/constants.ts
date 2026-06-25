// src/archive/constants.ts
/** Centralized constants for the archive core */
export const IDLE_THRESHOLDS = {
  observation: 15, // seconds → generate observation note
  degradation: 30, // seconds → increase degradation
  rareEventEval: 60, // seconds → evaluate rare events
  archiveCommentEval: 120, // seconds → evaluate archive comment
};
