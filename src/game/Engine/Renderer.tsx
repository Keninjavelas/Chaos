"use client";
import React, { useState } from "react";

// Suppress known Three.js / R3F deprecation warnings until libraries catch up
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string') {
    if (args[0].includes('THREE.Clock: This module has been deprecated')) return;
    if (args[0].includes('using deprecated parameters for the initialization function')) return;
  }
  originalWarn(...args);
};
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Physics } from "@react-three/rapier";
import { EffectComposer, SSAO, Bloom, Vignette, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useEffect } from "react";

function ConsoleReporter() {
  const { camera } = useThree();
  
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("[DEBUG] Camera pos:", camera.position.toArray());
      console.log("[DEBUG] Camera rot:", camera.rotation.toArray());
    }, 1000);
    return () => clearInterval(interval);
  }, [camera]);

  return null;
}
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
import { ResumeOverlay } from "../UI/ResumeOverlay";
import { InteractionPrompt } from "../UI/InteractionPrompt";
import { InspectionView } from "../Interactables/InspectionView";
import { useArchiveStore } from "@/lib/state";
import { useGameState } from "../useGameState";
import { AmbientAudio } from "../World/FX/AmbientAudio";

export default function Renderer() {
  const [isGameUIActive, setIsGameUIActive] = useState(false);
  const { isDebugMode } = useArchiveStore();

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
    <div id="game-container" style={{ width: "100vw", height: "100vh", background: "black", position: "relative" }}>
      
      {/* 3D WebGL Canvas */}
      <Canvas key="main-game-canvas" shadows camera={{ position: [0, 1.8, 5], fov: 75 }} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={["#050505"]} />
        
        {/* Subtle Volumetric Haze (Fog) */}
        <fogExp2 attach="fog" args={["#0a0c10", 0.015]} />
        
        {/* Global Indirect Illumination (Layer 1) - Faint architectural readability */}
        <hemisphereLight args={["#1a202c", "#050505", 0.15]} />
        
        {/* Core Lighting */}
        <React.Suspense fallback={<mesh position={[0,2,0]}><boxGeometry/><meshBasicMaterial color="green"/></mesh>}>
          <Lighting />
        </React.Suspense>
        
        <ConsoleReporter />

        {/* Narrative State Manager (No longer wraps rendering) */}
        <AnomalyEngine />
        <InspectionView />
        <AmbientAudio />

        {/* DEBUG CUBE 
        <ambientLight intensity={1} />
        <mesh position={[0, 1.65, 2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
        */}

        {isDebugMode && (
          <>
            <axesHelper args={[5]} />
            <gridHelper args={[20, 20]} />
          </>
        )}

        {/* The World + Physics + Player */}
        <React.Suspense fallback={<mesh position={[0,2,0]}><boxGeometry/><meshBasicMaterial color="blue"/></mesh>}>
          <Physics gravity={[0, -9.81, 0]} debug={isDebugMode}>
            <PlayerController />
            
            <group>
        <ReceptionWing position={[0, 0, 0]} onInteractMap={() => {}} />
        <RecordsHall position={[-8, 0, -4]} />
        <ElevatorLobby position={[0, 0, -8]} />
        <PersonnelWing position={[12, 0, -5]} />
        <CommunicationsOffice position={[-8, 0, 6]} rotation={[0, Math.PI, 0]} />
        <Sublevel position={[0, -50, 0]} />
      </group>
          </Physics>
        </React.Suspense>

        {/* POST PROCESSING */}
        {!isDebugMode && (
          <EffectComposer>
            <Bloom luminanceThreshold={2.0} intensity={0.15} mipmapBlur />
            <Vignette eskil={false} offset={0.3} darkness={0.9} />
            <Noise opacity={0.05} />
            <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} />
          </EffectComposer>
        )}
      </Canvas>

      {/* Crosshair */}
      <div 
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "20px" }}
      >
        +
      </div>

      {/* 2D HUD Overlays */}
      <InteractionPrompt />
      <GameUI onOverlayStateChange={setIsGameUIActive} />
      <ResumeOverlay />
    </div>
  );
}
