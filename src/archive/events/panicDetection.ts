// src/archive/events/panicDetection.ts
/**
 * Simple panic detection based on cursor movement.
 * Tracks velocity, acceleration, and direction changes.
 * When thresholds are exceeded, triggers the rapid movement handler.
 */
import { DegradationEngine } from "../degradation/degradationEngine";

interface Position {
  x: number;
  y: number;
  t: number; // timestamp ms
}

let lastPos: Position | null = null;
let prevVelocity = 0;

let activeHandler: ((e: MouseEvent) => void) | null = null;

export function initPanicDetection() {
  if (activeHandler) {
    window.removeEventListener("mousemove", activeHandler);
  }

  let lastPanicTime = 0;
  const PANIC_COOLDOWN = 1000; // Only 1 panic event per second
  const THROTTLE_MS = 50;
  let lastExecTime = 0;

  const handler = (e: MouseEvent) => {
    const now = performance.now();
    
    // Throttle execution
    if (now - lastExecTime < THROTTLE_MS) return;
    lastExecTime = now;

    const cur: Position = { x: e.clientX, y: e.clientY, t: now };
    if (lastPos) {
      const dt = (cur.t - lastPos.t) / 1000; // seconds
      if (dt <= 0) return; // Prevent Infinity

      const dx = cur.x - lastPos.x;
      const dy = cur.y - lastPos.y;
      const distance = Math.hypot(dx, dy);
      const velocity = distance / dt; // px/s
      const acceleration = (velocity - prevVelocity) / dt; // px/s^2

      const VELOCITY_THRESHOLD = 2000; // Increased threshold
      const ACCEL_THRESHOLD = 5000; // Increased threshold

      if (
        (velocity > VELOCITY_THRESHOLD || acceleration > ACCEL_THRESHOLD) &&
        (now - lastPanicTime > PANIC_COOLDOWN)
      ) {
        lastPanicTime = now;
        DegradationEngine.handleRapidMovement();
      }
      prevVelocity = velocity;
    }
    lastPos = cur;
  };

  activeHandler = handler;
  window.addEventListener("mousemove", handler);
  // Return cleanup function for later disposal
  return () => {
    window.removeEventListener("mousemove", handler);
    activeHandler = null;
  };
}
