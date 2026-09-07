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
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Physics } from "@react-three/rapier";
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from "@react-three/postprocessing";

const chromaticAberrationOffset = new THREE.Vector2(0.00025, 0.00025);

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
import { ReceptionTerminalUI } from "../UI/ReceptionTerminalUI";
import { KeypadSafeUI } from "../UI/KeypadSafeUI";
import { DocumentOverlay } from "../UI/DocumentOverlay";
import { ResumeOverlay } from "../UI/ResumeOverlay";
import { InteractionPrompt } from "../UI/InteractionPrompt";
import { InspectionView } from "../Interactables/InspectionView";
import { InteractionController } from "../Interactables/InteractionController";
import { AudioController } from "../Audio/AudioController";
import { useArchiveStore } from "@/lib/state";

export default function Renderer() {
  const [, setIsGameUIActive] = useState(false);
  const isDebugMode = useArchiveStore((state) => state.isDebugMode);

  // Developer Debug Mode (F1) — development builds only; the toggle is inert
  // in production so physics/lighting debug overlays are never exposed to
  // public visitors (see docs/portfolio-launch-readiness.md security audit).
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F1" && process.env.NODE_ENV === "development") {
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
      <Canvas key="main-game-canvas" dpr={[1.25, 2]} shadows camera={{ position: [0, 1.8, 5], fov: 75 }} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} onCreated={({ gl }) => { gl.shadowMap.type = THREE.PCFShadowMap; }}>
        <color attach="background" args={["#0a0d10"]} />
        
        {/* Subtle Volumetric Haze (Fog) */}
        <fogExp2 attach="fog" args={["#0c1014", 0.012]} />
        
        {/* Global Indirect Illumination (Layer 1) - Preserves architectural silhouettes in shadows */}
        <hemisphereLight args={["#354240", "#18201e", 0.28]} />
        
        {/* Core Lighting */}
        <React.Suspense fallback={<mesh position={[0,2,0]}><boxGeometry/><meshBasicMaterial color="green"/></mesh>}>
          <Lighting />
        </React.Suspense>
        {/* Narrative State Manager (No longer wraps rendering) */}
        <AnomalyEngine />
        <InteractionController />
        <InspectionView />
        <AudioController />

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
              <RecordsHall position={[-9.5, 0, -6.5]} rotation={[0, 0, 0]} />
              <ElevatorLobby position={[0, 0, -8]} />
              <PersonnelWing position={[17, 0, 0]} rotation={[0, 0, 0]} />
              <CommunicationsOffice position={[-9.5, 0, 4.5]} rotation={[0, 0, 0]} />
              <Sublevel position={[0, -50, 0]} />
            </group>
          </Physics>
        </React.Suspense>

        {/* POST PROCESSING - Crisp Material Clarity & Restrained Atmosphere */}
        {!isDebugMode && (
          <EffectComposer>
            <Bloom luminanceThreshold={2.0} intensity={0.06} />
            <Vignette eskil={false} offset={0.3} darkness={0.45} />
            <Noise opacity={0.006} />
            <ChromaticAberration offset={chromaticAberrationOffset} />
          </EffectComposer>
        )}
      </Canvas>

      {/* 2D HUD Overlays */}
      <InteractionPrompt />
      <GameUI onOverlayStateChange={setIsGameUIActive} />
      <ReceptionTerminalUI />
      <KeypadSafeUI />
      <DocumentOverlay />
      <ResumeOverlay />
    </div>
  );
}
