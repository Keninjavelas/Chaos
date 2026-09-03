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
      {/* 1. Ambient light for baseline architectural silhouette readability */}
      <ambientLight intensity={isBlackout ? 0.06 : 0.12} />
      
      {/* Subtle, sparse atmospheric dust concentrated in central volume */}
      <Sparkles count={12} scale={[8, 3.0, 7]} size={0.5} speed={0.012} opacity={0.07} color="#b4c8bc" position={[0, 1.5, 1.0]} />
    </group>
  );
}
