// src/archive/observation/observerEngine.ts
import { useArchiveStore } from "../../lib/state";
import { ArchiveController } from "../controller/ArchiveController";

/**
 * Simple observation engine that generates contextual notes based on
 * user behavior stored in the archive state.
 */
export const ObservationEngine = {
  maybeEmit(page: string) {
    const store = useArchiveStore.getState();
    // Example heuristics – can be expanded later
    if (store.visitCount > 5 && store.favoriteSection !== page) {
      ArchiveController.emitObservation(`You seem interested in ${page}. Have you explored the ${store.favoriteSection ?? "archive"} yet?`);
    }
  },
  setFavorite(section: string) {
    const store = useArchiveStore.getState();
    store.setFavoriteSection(section);
    ArchiveController.emitObservation(`You have marked ${section} as a favorite.`);
  },
};
