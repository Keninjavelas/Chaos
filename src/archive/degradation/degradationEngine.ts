// src/archive/degradation/degradationEngine.ts
import { useArchiveStore } from "../../lib/state";
import { ArchiveController } from "../controller/ArchiveController";

/**
 * Degradation engine applies the rules defined in the specification.
 * It should be called from UI hooks (idle tracking, navigation, etc.).
 */
export const DegradationEngine = {
  // Called when the user is idle for a certain amount of seconds
  handleIdle(seconds: number) {
    ArchiveController.addIdleTime(seconds);
    ArchiveController.computeHealth();
    ArchiveController.persist();
  },
  // Called on rapid mouse/keyboard movement (e.g., high pointer velocity)
  handleRapidMovement() {
    ArchiveController.addPanicEvent();
    ArchiveController.computeHealth();
    ArchiveController.persist();
  },
  // Called on each page visit
  handleVisit(page: string) {
    ArchiveController.recordVisit();
    ArchiveController.computeHealth();
    ArchiveController.persist();
    // Update favorite if none set
    const store = useArchiveStore.getState();
    if (!store.favoriteSection) {
      ArchiveController.recordVisit(); // already done
    }
  },
  // Called when an incident (project case file) is viewed
  handleIncidentView() {
    ArchiveController.recordIncident();
    ArchiveController.computeHealth();
    ArchiveController.persist();
  },
};
