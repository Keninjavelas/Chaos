"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useArchiveStore } from "@/lib/state";

export const TheLobby: React.FC = () => {
  const router = useRouter();
  const { totalSessions } = useArchiveStore();
  const [hoverText, setHoverText] = useState("");
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    // Hidden debug toggle for adjusting zones (Press 'D')
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'd' && e.shiftKey) setDebugMode(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (path: string) => {
    setHoverText("");
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  return (
    <div className="hub-wrapper">
      <div className="scanlines" />
      <div className="hub-container">
        {/* Base Image */}
        <img src="/hub/base-room.png" alt="The Lobby" className="hub-background" />

        {/* Evolving Memory Changes */}
        {totalSessions > 1 && (
          <div className="hub-mutation" style={{ top: "60%", left: "40%", width: "10%", height: "20%", background: "rgba(0,0,0,0.5)", mixBlendMode: "multiply", borderRadius: "50%" }}>
            {/* Fake shadow or anomaly that appears on second visit */}
          </div>
        )}

        {totalSessions > 4 && (
          <div className="hub-mutation clock-missing" style={{ top: "15%", left: "45%", width: "10%", height: "10%", background: "#050505" }}>
            {/* Replaces the clock with a dark void on visit 5 */}
          </div>
        )}

        {/* Interactable Zones */}
        <div 
          className={`interactable-zone ${debugMode ? "debug-outline" : ""}`}
          style={{ top: "35%", left: "5%", width: "25%", height: "60%" }}
          onMouseEnter={() => setHoverText("The Library")}
          onMouseLeave={() => setHoverText("")}
          onClick={() => handleNavigate("/library")}
        />

        <div 
          className={`interactable-zone ${debugMode ? "debug-outline" : ""}`}
          style={{ top: "65%", left: "35%", width: "20%", height: "15%" }}
          onMouseEnter={() => setHoverText("The Mirror Room")}
          onMouseLeave={() => setHoverText("")}
          onClick={() => handleNavigate("/mirror-room")}
        />

        <div 
          className={`interactable-zone ${debugMode ? "debug-outline" : ""}`}
          style={{ top: "45%", left: "55%", width: "15%", height: "15%" }}
          onMouseEnter={() => setHoverText("The Hallway")}
          onMouseLeave={() => setHoverText("")}
          onClick={() => handleNavigate("/hallway")}
        />

        <div 
          className={`interactable-zone ${debugMode ? "debug-outline" : ""}`}
          style={{ top: "50%", left: "70%", width: "10%", height: "15%" }}
          onMouseEnter={() => setHoverText("The Workshop")}
          onMouseLeave={() => setHoverText("")}
          onClick={() => handleNavigate("/workshop")}
        />

        <div 
          className={`interactable-zone ${debugMode ? "debug-outline" : ""}`}
          style={{ top: "10%", left: "80%", width: "20%", height: "80%" }}
          onMouseEnter={() => setHoverText("The Basement")}
          onMouseLeave={() => setHoverText("")}
          onClick={() => {
            setHoverText("Locked.");
            setTimeout(() => setHoverText(""), 2000);
          }}
        />

        {/* Diegetic Subtitle / Hover Text */}
        {hoverText && (
          <div className="hub-subtitle">
            {hoverText}
          </div>
        )}
      </div>
    </div>
  );
};
