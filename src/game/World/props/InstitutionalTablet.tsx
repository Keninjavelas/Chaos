import React from "react";
import { Text } from "@react-three/drei";
import { FacilityMaterial } from "../materials/FacilityMaterials";

interface InstitutionalTabletProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export function InstitutionalTablet({ position, rotation = [0, 0, 0] }: InstitutionalTabletProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Tablet Body Chassis */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[0.5, 0.03, 0.7]} />
        <FacilityMaterial kind="painted-metal" color="#1e242b" />
      </mesh>

      {/* Glass Screen Bezel */}
      <mesh position={[0, 0.016, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.45, 0.65]} />
        <meshStandardMaterial color="#08140c" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Screen Interface Text / Emissive Status */}
      <group position={[0, 0.017, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          position={[0, 0.18, 0]}
          fontSize={0.035}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          AUXILIUM OS v4.12
        </Text>
        <Text
          position={[0, 0.08, 0]}
          fontSize={0.024}
          color="#a0e0c0"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          DEVELOPER IDENTITY // VERIFIED
        </Text>
        <Text
          position={[0, -0.05, 0]}
          fontSize={0.028}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          [ PRESS E TO READ ]
        </Text>
      </group>
    </group>
  );
}
