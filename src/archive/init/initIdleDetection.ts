// src/archive/init/initIdleDetection.ts
/**
 * Idle detection module.
 * Tracks user inactivity and triggers appropriate actions based on thresholds.
 */
import { DegradationEngine } from "../degradation/degradationEngine";
import { ObservationEngine } from "../observation/observerEngine";
import { IDLE_THRESHOLDS } from "../constants";
import { NoteGenerator } from "../observation/noteGenerator";
import { ArchiveController } from "../controller/ArchiveController";

let idleTimer: number | null = null;
let idleSeconds = 0;
let idleStage = 0; // 0: observation pending, 1: degradation done, 2: rare events done

function resetTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  idleSeconds = 0;
  idleStage = 0;
}

function scheduleCheck() {
  idleTimer = setTimeout(() => {
    idleSeconds += 5; // check every 5 seconds
    handleIdleStep(idleSeconds);
    scheduleCheck();
  }, 5000) as unknown as number;
}

function handleIdleStep(seconds: number) {
  // Observation – fire once when crossing observation threshold
  if (seconds >= IDLE_THRESHOLDS.observation && idleStage === 0) {
    const note = NoteGenerator.idle(seconds);
    ArchiveController.emitObservation(note, "low");
    // advance stage but keep counting for next thresholds
    idleStage = 1;
  }
  // Degradation – fire once when crossing degradation threshold
  if (seconds >= IDLE_THRESHOLDS.degradation && idleStage === 1) {
    DegradationEngine.handleIdle(seconds);
    idleStage = 2;
  }
  // Rare events – fire once when crossing rare event evaluation threshold
  if (seconds >= IDLE_THRESHOLDS.rareEventEval && idleStage === 2) {
    ArchiveController.evaluateRareEvents();
    idleStage = 3;
  }
  // Archive comment – fire once when crossing comment evaluation threshold
  if (seconds >= IDLE_THRESHOLDS.archiveCommentEval) {
    ArchiveController.triggerArchiveComment();
    // Reset everything after comment to start the cycle anew
    idleSeconds = 0;
    idleStage = 0;
  }
}

/**
 * Initialize idle detection. Call this once during bootstrap.
 */
export function initIdleDetection() {
  // Listen for any user interaction to reset the idle counter
  const events = ["mousemove", "keydown", "touchstart", "scroll"];
  let timerStarted = false;
  const startTimerIfNeeded = () => {
    if (!timerStarted) {
      scheduleCheck();
      timerStarted = true;
    }
    resetTimer();
  };
  events.forEach((ev) => window.addEventListener(ev, startTimerIfNeeded));
  // Do NOT start the timer here; it will start on first user interaction
  // Return cleanup function
  return () => {
    if (idleTimer) clearTimeout(idleTimer);
    events.forEach((ev) => window.removeEventListener(ev, startTimerIfNeeded));
  };
}
