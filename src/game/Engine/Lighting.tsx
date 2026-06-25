import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";
import { useArchiveStore } from "@/lib/state";

function FlickeringLight({ position, color }: { position: [number, number, number], color: string }) {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame(() => {
    if (lightRef.current) {
      const r = Math.random();
      if (r > 0.95) lightRef.current.intensity = 0; // 0%
      else if (r > 0.85) lightRef.current.intensity = 4 * 0.8; // 80%
      else lightRef.current.intensity = 4; // 100%
    }
  });

  return <pointLight ref={lightRef} position={position} intensity={4.0} color={color} distance={5} decay={2} />;
}

function ElevatorLight({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame(({ clock }) => {
    if (lightRef.current) {
      const time = clock.getElapsedTime() % 1.8;
      lightRef.current.intensity = time < 1.5 ? 2.0 : 0.0;
    }
  });

  return <pointLight ref={lightRef} position={position} intensity={2.0} color="#B00000" distance={6} decay={2} />;
}

export function Lighting() {
  const { isBlackout, isDebugMode } = useArchiveStore();

  if (isDebugMode) {
    return (
      <group>
        <ambientLight intensity={3.0} />
        <directionalLight position={[10, 10, 10]} intensity={2.0} />
      </group>
    );
  }

  return (
    <group>
      {/* 1. Increased ambient light from 0.05 to 0.12 so room isn't crushed to black */}
      <ambientLight intensity={isBlackout ? 0.005 : 0.12} />
      
      {!isBlackout && (
        <>
          {/* 2. Fluorescent light as the primary light overhead */}
          <FlickeringLight position={[0, 2.9, -1.5]} color="#E5E3D4" />
          
          {/* Desk Lamp for warmth */}
          <spotLight 
            position={[-0.5, 1.2, -1.5]} 
            intensity={3.0} 
            angle={0.8} 
            penumbra={0.5} 
            distance={2.5} 
            color="#FFBE6B" 
            castShadow
          />

          {/* 4. Subtle cool rim light from behind the desk for depth */}
          <pointLight 
            position={[0, 1.0, -3.0]} 
            intensity={1.0} 
            color="#88aaff" 
            distance={4} 
            decay={2} 
          />
        </>
      )}

      {/* The locked elevator should draw the eye down the hall */}
      <ElevatorLight position={[0, 2.8, -6.4]} />
      <pointLight position={[-4.5, 2, -5]} intensity={1.0} color="#BFD5FF" distance={8} decay={2} />
      
      {/* Atmosphere dust */}
      <Sparkles count={100} scale={[9, 3.2, 8]} size={1.2} speed={0.05} opacity={0.3} color="#ffffff" position={[0, 1.6, 1.5]} />
    </group>
  );
}
