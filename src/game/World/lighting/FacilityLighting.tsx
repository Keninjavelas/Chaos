import React from "react";
import { FacilityMaterial } from "../materials/FacilityMaterials";

type Position = [number, number, number];

export function FacilityFluorescent({ position, color = "#d8e5dc", intensity = 1.35, distance = 6 }: { position: Position; color?: string; intensity?: number; distance?: number }) {
  return (
    <group position={position}>
      <mesh><boxGeometry args={[1.35, 0.09, 0.32]} /><FacilityMaterial kind="painted-metal" color="#20221f" /></mesh>
      <mesh position={[0, -0.055, 0]}><boxGeometry args={[1.16, 0.025, 0.18]} /><meshStandardMaterial color="#eef4df" emissive={color} emissiveIntensity={1.15} toneMapped={false} /></mesh>
      <pointLight position={[0, -0.15, 0]} color={color} intensity={intensity} distance={distance} decay={2} />
    </group>
  );
}

export function FacilityEmergencyLight({ position, intensity = 0.6 }: { position: Position; intensity?: number }) {
  return (
    <group position={position}>
      <mesh><cylinderGeometry args={[0.08, 0.08, 0.08, 16]} /><meshStandardMaterial color="#52211c" emissive="#c64335" emissiveIntensity={1.5} toneMapped={false} /></mesh>
      <pointLight color="#c64335" intensity={intensity} distance={3.2} decay={2} />
    </group>
  );
}

export function FacilityTaskLight({ position, color = "#d9d2b0" }: { position: Position; color?: string }) {
  return <pointLight position={position} color={color} intensity={0.85} distance={3.2} decay={2} />;
}

export function FacilityServerAccent({ position }: { position: Position }) {
  return <pointLight position={position} color="#41c9bd" intensity={0.72} distance={3.5} decay={2} />;
}
