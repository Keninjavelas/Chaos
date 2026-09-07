"use client";
import React, { useState, useEffect } from "react";
import { useArchiveStore } from "@/lib/state";

export function AnomalyEngine() {
  const [isBlackout, setIsBlackout] = useState(false);
  const [showSilhouette, setShowSilhouette] = useState(false);
  const { mapDiscovered, mapAnomalyRevealed, revealMapAnomaly, isAwakened } = useArchiveStore();

  // The Impossible Room Event Hook
  useEffect(() => {
    if (!mapDiscovered || mapAnomalyRevealed) return;
    // All state changes are deferred into timer callbacks so the effect body
    // never calls setState synchronously (react-hooks/set-state-in-effect).
    const blackoutTimer = setTimeout(() => setIsBlackout(true), 0);
    const revealTimer = setTimeout(() => {
      revealMapAnomaly();
      setIsBlackout(false);
    }, 3000);
    return () => {
      clearTimeout(blackoutTimer);
      clearTimeout(revealTimer);
    };
  }, [mapDiscovered, mapAnomalyRevealed, revealMapAnomaly]);

  useEffect(() => {
    const triggerBlackout = () => {
      if (!useArchiveStore.getState().mapDiscovered || useArchiveStore.getState().mapAnomalyRevealed) {
        setIsBlackout(true);
        setTimeout(() => setIsBlackout(false), 2000 + Math.random() * 2000);
      }
      scheduleNextBlackout();
    };

    const scheduleNextBlackout = () => {
      setTimeout(triggerBlackout, 30000 + Math.random() * 60000);
    };

    const triggerSilhouette = () => {
      setShowSilhouette(true);
      setTimeout(() => setShowSilhouette(false), 500 + Math.random() * 1000);
      scheduleNextSilhouette();
    };

    const scheduleNextSilhouette = () => {
      setTimeout(triggerSilhouette, 45000 + Math.random() * 75000);
    };

    const blackoutTimer = setTimeout(triggerBlackout, 15000); // First blackout soon
    const silhouetteTimer = setTimeout(triggerSilhouette, 25000);

    return () => {
      clearTimeout(blackoutTimer);
      clearTimeout(silhouetteTimer);
    };
  }, []);

  // Sync state to store (to avoid render props)
  useEffect(() => {
    useArchiveStore.getState().setAnomalyState({ isBlackout, showSilhouette });
  }, [isBlackout, showSilhouette]);

  return null; // No longer a render wrapper
}
