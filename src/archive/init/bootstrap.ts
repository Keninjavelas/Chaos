// src/archive/init/bootstrap.ts
/**
 * Entry point to bootstrap the Archive core systems.
 * It is imported from the root layout and executed once on app start.
 */
import { initPersistence } from "./initPersistence";
import { initIdleDetection } from "./initIdleDetection";
import { initPanicDetection } from "./initPanicDetection";
import { initObservationEngine } from "./initObservationEngine";
import { initRareEvents } from "./initRareEvents";
let alreadyInitialized = false;
export function initializeArchive() {
  if (alreadyInitialized) return; // guard
  alreadyInitialized = true;
  console.log("[Archive] initializeArchive called");
  // Load persisted state first
  initPersistence();
  // Initialize subsystems
  initIdleDetection();
  initPanicDetection();
  initObservationEngine();
  initRareEvents();
}
