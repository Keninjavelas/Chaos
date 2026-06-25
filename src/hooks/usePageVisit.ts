// src/hooks/usePageVisit.ts
/**
 * Hook to track page visits via Next.js router events.
 * On each route change it updates the Archive state:
 *   - increments visit count
 *   - records the page visit with timestamp and duration (duration will be calculated on next navigation)
 *   - updates degradation according to the specifications (extra degradation on repeat visits)
 */
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useArchiveStore } from "../lib/state";
import { ArchiveController } from "../archive/controller/ArchiveController";

export function usePageVisit() {
  const router = useRouter();
  const previousRoute = useRef<string | null>(null);
  const visitStart = useRef<number>(0);

  useEffect(() => {
    // Record initial page visit on mount
    const initialRoute = router.pathname;
    previousRoute.current = initialRoute;
    visitStart.current = Date.now();
    ArchiveController.recordVisit();
    useArchiveStore.getState().setLastVisited(initialRoute);

    const handleRouteChange = (url: string) => {
      const now = Date.now();
      // Calculate duration on previous route (optional, can be used for analytics)
      const durationSec = (now - visitStart.current) / 1000;
      // Update store with duration if needed (not currently stored, placeholder)
      // Record the visit for the new route
      visitStart.current = now;
      previousRoute.current = url;
      // Update global store
      useArchiveStore.getState().recordPageVisit({ route: url, timestamp: now, duration: durationSec });
      // Increment visit count and handle degradation for repeat visits
      ArchiveController.recordVisit();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
}
