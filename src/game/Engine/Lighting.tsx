import React from "react";
import { Sparkles } from "@react-three/drei";
import { useArchiveStore } from "@/lib/state";

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
      {/* 1. Ambient light kept very low for horror atmosphere */}
      <ambientLight intensity={isBlackout ? 0.02 : 0.04} />
      
      {/* Atmosphere dust */}
      <Sparkles count={100} scale={[9, 3.2, 8]} size={1.2} speed={0.05} opacity={0.3} color="#ffffff" position={[0, 1.6, 1.5]} />
    </group>
  );
}
