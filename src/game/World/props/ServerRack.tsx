import React from "react";
import { RigidBody } from "@react-three/rapier";
import { HorrorMaterial } from "../materials/HorrorMaterial";

interface ServerRackProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function ServerRack({ position = [0, 0, 0], rotation = [0, 0, 0] }: ServerRackProps) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* Main Server Tower Frame */}
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 2.2, 0.8]} />
          <HorrorMaterial color="#12161a" roughness={0.6} metalness={0.8} />
        </mesh>
      </RigidBody>

      {/* Front Glass Door Frame */}
      <mesh position={[0, 1.1, 0.41]}>
        <planeGeometry args={[0.62, 2.1]} />
        <meshStandardMaterial color="#00aacc" transparent opacity={0.15} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Server Blade Modules (6 Stacked Units) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={`blade-${i}`} position={[0, 0.3 + i * 0.32, 0.38]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.26, 0.04]} />
            <HorrorMaterial color="#1a2026" roughness={0.5} metalness={0.7} />
          </mesh>
          {/* Fan Grill Mesh Lines */}
          <mesh position={[-0.15, 0, 0.022]}>
            <planeGeometry args={[0.22, 0.18]} />
            <meshStandardMaterial color="#0b0d10" roughness={0.9} />
          </mesh>
          {/* Status LEDs */}
          <mesh position={[0.18, 0.05, 0.022]}>
            <sphereGeometry args={[0.012]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#00ff66" : "#00aacc"} toneMapped={false} />
          </mesh>
          <mesh position={[0.22, 0.05, 0.022]}>
            <sphereGeometry args={[0.012]} />
            <meshBasicMaterial color="#00ff66" toneMapped={false} />
          </mesh>
          <mesh position={[0.22, -0.05, 0.022]}>
            <sphereGeometry args={[0.012]} />
            <meshBasicMaterial color={i === 4 ? "#ff3333" : "#00ff66"} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Blue Internal Server Light Glow */}
      <pointLight position={[0, 1.1, 0.3]} color="#00aacc" intensity={0.8} distance={3} decay={2} />
    </group>
  );
}
