import React from "react";
import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { FacilityMaterial } from "../materials/FacilityMaterials";

interface ServerRackProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  role?: string;
}

export function ServerRack({ position = [0, 0, 0], rotation = [0, 0, 0], role = "INFERENCE CLUSTER" }: ServerRackProps) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Main 42U Server Cabinet Frame */}
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 2.2, 0.85]} />
          <FacilityMaterial kind="painted-metal" color="#181f24" />
        </mesh>
      </RigidBody>

      {/* Recessed Interior Bay */}
      <mesh position={[0, 1.1, 0.05]}>
        <boxGeometry args={[0.66, 2.08, 0.74]} />
        <FacilityMaterial kind="painted-metal" color="#0c1013" />
      </mesh>

      {/* Role Identifier Header Plaque */}
      <mesh position={[0, 2.14, 0.44]}>
        <boxGeometry args={[0.55, 0.08, 0.02]} />
        <FacilityMaterial kind="painted-metal" color="#12181c" />
      </mesh>
      <Text
        position={[0, 2.14, 0.455]}
        fontSize={0.034}
        color="#87e0c8"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {role}
      </Text>

      {/* Perforated Door / Dark Acrylic Front Panel */}
      <mesh position={[0, 1.1, 0.43]}>
        <planeGeometry args={[0.65, 2.05]} />
        <meshStandardMaterial color="#0a1218" transparent opacity={0.35} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* 6 Server Chassis Blade Units */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={`blade-${i}`} position={[0, 0.28 + i * 0.32, 0.38]}>
          {/* Chassis Unit Faceplate */}
          <mesh castShadow>
            <boxGeometry args={[0.62, 0.28, 0.06]} />
            <FacilityMaterial kind="painted-metal" color="#202a32" />
          </mesh>

          {/* Air Intake Grill (Left) */}
          <mesh position={[-0.14, 0, 0.032]}>
            <planeGeometry args={[0.26, 0.2]} />
            <meshStandardMaterial color="#080b0e" roughness={0.9} />
          </mesh>

          {/* Drive Caddies (Middle) */}
          {Array.from({ length: 4 }).map((__, dIdx) => (
            <mesh key={`drive-${dIdx}`} position={[0.04 + dIdx * 0.04, 0, 0.032]}>
              <boxGeometry args={[0.032, 0.2, 0.01]} />
              <FacilityMaterial kind="painted-metal" color="#2c3740" />
            </mesh>
          ))}

          {/* Diagnostic Status LEDs (Right) */}
          <mesh position={[0.24, 0.06, 0.033]}>
            <sphereGeometry args={[0.008]} />
            <meshBasicMaterial color={i === 4 ? "#ffaa00" : "#00ff88"} toneMapped={false} />
          </mesh>
          <mesh position={[0.26, 0.06, 0.033]}>
            <sphereGeometry args={[0.008]} />
            <meshBasicMaterial color="#00ddff" toneMapped={false} />
          </mesh>
          <mesh position={[0.26, -0.06, 0.033]}>
            <sphereGeometry args={[0.008]} />
            <meshBasicMaterial color="#00ff88" toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Subdued Internal Equipment Glow */}
      <pointLight position={[0, 1.1, 0.25]} color="#00b0cc" intensity={0.4} distance={2.5} decay={2} />
    </group>
  );
}
