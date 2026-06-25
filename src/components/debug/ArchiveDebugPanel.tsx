// src/components/debug/ArchiveDebugPanel.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useArchiveStore } from "@/lib/state";
import { ArchiveController } from "@/archive/controller/ArchiveController";

/**
 * Debug panel for inspecting the runtime archive state in the browser.
 * Displays core metrics and provides quick actions to trigger events.
 * This component is intended for development only and should be removed
 * or hidden in production builds.
 */
export const ArchiveDebugPanel: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setIsEnabled(localStorage.getItem("archive-debug") === "true");
    }
  }, []);

  if (!isEnabled) return null;
  const {
    degradationLevel,
    visitCount,
    incidentCount,
    archiveHealth,
    memoryIntegrity,
    favoriteSection,
    lastVisitedPage,
    totalSessions,
    totalTimeSpent,
    session,
    observationHistory,
    corruptionFlags,
    archiveMetrics,
  } = useArchiveStore();

  const handleIdle = () => {
    ArchiveController.addIdleTime(15);
  };

  const handlePanic = () => {
    ArchiveController.addPanicEvent();
  };

  const triggerRare = (name: string) => {
    // @ts-ignore – runtime will ensure correct event name
    ArchiveController.triggerRareEvent(name as any);
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "0",
      right: "0",
      width: "320px",
      maxHeight: "80vh",
      overflowY: "auto",
      background: "rgba(20,20,20,0.9)",
      color: "#fff",
      fontFamily: "Special Elite, monospace",
      padding: "1rem",
      zIndex: 9999,
      borderTopLeftRadius: "8px",
    }}>
      <h2 style={{margin: "0 0 0.5rem", fontSize: "1.2rem"}}>Archive Debug Panel</h2>
      <ul style={{listStyle: "none", padding: 0, margin: 0}}>
        <li>Degradation: {(degradationLevel * 100).toFixed(1)}%</li>
        <li>Visit Count: {visitCount}</li>
        <li>Incident Count: {incidentCount}</li>
        <li>Health: {archiveHealth.toFixed(0)}%</li>
        <li>Memory Integrity: {memoryIntegrity.toFixed(0)}%</li>
        <li>Session Duration: {session.sessionDuration}s</li>
        <li>Longest Session: {session.longestSession}s</li>
        <li>Visit Streak: {session.visitStreak}</li>
        <li>Observations: {observationHistory.length}</li>
        <li>Corruption Flags: {Object.entries(corruptionFlags).filter(([,v])=>v).map(([k])=>k).join(", ") || "none"}</li>
      </ul>
      <hr style={{borderColor: "#555", margin: "0.5rem 0"}} />
      <button onClick={handleIdle} style={{marginRight: "0.5rem"}} className="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700">Idle +15s</button>
      <button onClick={handlePanic} className="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700">Panic</button>
      <div style={{marginTop: "0.5rem"}}>
        <button onClick={() => triggerRare("peripheralSilhouette")} className="bg-gray-800 text-white px-2 py-1 rounded mr-2 hover:bg-gray-700">Rare: Silhouette</button>
        <button onClick={() => triggerRare("wrongRouteFlash")} className="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700">Rare: Wrong Route</button>
      </div>
    </div>
  );
};
