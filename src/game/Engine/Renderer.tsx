"use client";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Lighting } from "./Lighting";

import { ReceptionWing } from "../World/rooms/ReceptionWing";
import { RecordsHall } from "../World/rooms/RecordsHall";
import { ElevatorLobby } from "../World/rooms/ElevatorLobby";
import { PersonnelWing } from "../World/rooms/PersonnelWing";
import { CommunicationsOffice } from "../World/rooms/CommunicationsOffice";
import { Sublevel } from "../World/rooms/Sublevel";

import { PlayerController } from "../Gameplay/PlayerController";
import { AnomalyEngine } from "../Narrative/AnomalyEngine";
import { GameUI } from "../UI/GameUI";
import { InspectionUI } from "../UI/InspectionUI";
import { useArchiveStore } from "@/lib/state";

export default function Renderer() {
  const [isGameUIActive, setIsGameUIActive] = useState(false);
  const { activeDocument, isDebugMode } = useArchiveStore();

  const isLocked = !isGameUIActive && !activeDocument;

  // Developer Debug Mode (F1)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F1") {
        e.preventDefault();
        useArchiveStore.getState().toggleDebugMode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "black", position: "relative" }}>
      
      {/* 3D WebGL Canvas */}
      <Canvas camera={{ position: [0, 1.8, 5], fov: 75 }}>
        {/* Core Lighting */}
        <Lighting />

        {/* Narrative State Manager (No longer wraps rendering) */}
        <AnomalyEngine />

        {isDebugMode && (
          <>
            <axesHelper args={[5]} />
            <gridHelper args={[20, 20]} />
          </>
        )}

        {/* The World + Physics + Player */}
        <Physics gravity={[0, -9.81, 0]} debug={isDebugMode}>
          <PlayerController isLocked={isLocked} />
          
          <group>
            <ReceptionWing position={[0, 0, 0]} onInteractMap={() => {}} />
            <RecordsHall position={[-15, 0, -19]} />
            <ElevatorLobby position={[0, 0, -8]} />
            <PersonnelWing position={[12, 0, -5]} />
            <CommunicationsOffice position={[-15, 0, 1]} rotation={[0, Math.PI, 0]} />
            <Sublevel position={[0, -50, 0]} />
          </group>
        </Physics>
      </Canvas>

      {/* Crosshair */}
      <div 
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "20px" }}
      >
        +
      </div>

      {/* 2D HUD Overlays */}
      <GameUI onOverlayStateChange={setIsGameUIActive} />
      <InspectionUI />
    </div>
  );
}
