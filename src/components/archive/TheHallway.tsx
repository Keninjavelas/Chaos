"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useArchiveStore } from "@/lib/state";

export const TheHallway: React.FC = () => {
  const { observationHistory, degradationLevel } = useArchiveStore();
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 100);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`memory-room the-hallway ${flicker ? "flicker-event" : ""}`}>
      <Link href="/" className="memory-back-link">Walk back to the lobby</Link>
      
      <div className="hallway-container">
        <div className="security-monitor">
          <h2 className="monitor-title">FEED ACTIVE</h2>
          <div className="feed-container">
            {observationHistory.map((obs) => (
              <div key={obs.id} className="feed-line">
                <span className="feed-time">[{new Date(obs.timestamp).toLocaleTimeString([], {hour12: false})}]</span> 
                {" "}
                <span className={obs.severity === "high" ? "feed-high" : ""}>{obs.message}</span>
              </div>
            ))}
            {observationHistory.length === 0 && (
              <div className="feed-line">No movement detected... yet.</div>
            )}
            {degradationLevel > 0.6 && (
              <div className="feed-line feed-high">SOMETHING IS IN THE HALLWAY.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
