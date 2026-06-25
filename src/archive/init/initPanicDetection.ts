// src/archive/init/initPanicDetection.ts
/**
 * Initialization wrapper for panic detection subsystem.
 * This simply forwards to the implementation in the events folder.
 */
import { initPanicDetection as _initPanicDetection } from "../events/panicDetection";

export function initPanicDetection() {
  // Call the actual initialization logic.
  _initPanicDetection();
}
