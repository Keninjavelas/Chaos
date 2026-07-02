import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useArchiveStore } from "@/lib/state";

function FlickeringLight({ position, color, castShadow = false }: { position: [number, number, number], color: string, castShadow?: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame(() => {
    if (lightRef.current) {
      const r = Math.random();
      if (r > 0.95) lightRef.current.intensity = 0; // 0%
      else if (r > 0.85) lightRef.current.intensity = 5 * 0.8; // 80%
      else lightRef.current.intensity = 5; // 100%
    }
  });

  return (
    <pointLight 
      ref={lightRef} 
      position={position} 
      intensity={5.0} 
      color={color} 
      distance={15} 
      decay={2} 
      castShadow={castShadow} 
      shadow-mapSize={[1024, 1024]} 
      shadow-bias={-0.001} 
    />
  );
}

export function ReceptionLighting() {
  const { isBlackout } = useArchiveStore();

  if (isBlackout) return null;

  return (
    <group>
      {/* Primary Fluorescent overhead (Cold, high contrast) */}
      <FlickeringLight position={[0, 2.8, 1.5]} color="#D4EBFF" />
      
      {/* Recessed Light above Waiting Area (Right side) */}
      <spotLight
        position={[3.5, 2.8, -0.5]}
        angle={0.8}
        penumbra={1.0}
        intensity={5.0}
        distance={10}
        decay={2}
        color="#cce0ff" // Shifted to cold institutional blue/gray
      />
      {/* LookAt target for the recessed light */}
      <mesh position={[3.5, 0, -0.5]} visible={false}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
      </mesh>

      {/* Desk Lamp (Warm, localized) */}
      <spotLight 
        position={[-0.5, 1.2, -1.5]} 
        intensity={10.0} 
        angle={0.7} 
        penumbra={1.0} 
        distance={8} 
        decay={2}
        color="#FFCBA4" 
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
      {/* Fake target for desk lamp so it points straight down */}
      <mesh position={[-0.5, 0, -1.5]} visible={false}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
      </mesh>

      {/* Blue Emergency Light by Elevator Gate */}
      <pointLight 
        position={[0, 2.5, -4.5]} 
        intensity={5.0} 
        color="#0A1A4A" 
        distance={6} 
        decay={2}
      />
      
      {/* Very faint blue fill near elevator to soften pitch-black corners */}
      <pointLight 
        position={[0, 1.0, -4.0]} 
        intensity={0.2} 
        color="#0A1A4A" 
        distance={4} 
      />
    </group>
  );
}
