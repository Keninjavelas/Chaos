import React from "react";
import { RigidBody } from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";

interface ReceptionDeskProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  onInteractMap?: () => void;
}

function CRTMonitor({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Monitor Body */}
      <mesh position={[0, 0.35, 0.05]} rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.45]} />
        <meshStandardMaterial color="#d4d0c8" roughness={0.9} />
      </mesh>
      {/* Screen Frame */}
      <mesh position={[0, 0.35, 0.28]} rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.45, 0.35, 0.02]} />
        <meshStandardMaterial color="#a09e98" roughness={0.9} />
      </mesh>
      {/* Glass Screen */}
      <mesh position={[0, 0.35, 0.29]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[0.4, 0.3]} />
        <meshStandardMaterial color="#050a10" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Power LED */}
      <mesh position={[0.18, 0.2, 0.29]} rotation={[-0.1, 0, 0]}>
        <planeGeometry args={[0.01, 0.01]} />
        <meshBasicMaterial color="#ff3333" />
      </mesh>
    </group>
  );
}

function Keyboard({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[0.45, 0.02, 0.15]} />
        <meshStandardMaterial color="#d4d0c8" roughness={0.9} />
      </mesh>
      {/* Keys surface */}
      <mesh position={[0, 0.012, 0]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[0.42, 0.01, 0.13]} />
        <meshStandardMaterial color="#a09e98" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function ReceptionDesk({ position, rotation = [0, 0, 0], onInteractMap }: ReceptionDeskProps) {
  return (
    <group position={position} rotation={rotation}>
      
      {/* ─── DESK STRUCTURE ─── */}
      <RigidBody type="fixed" colliders="cuboid">
        {/* Working Surface (The only desk surface now) */}
        <RoundedBox args={[4.2, 0.1, 2.4]} position={[0, 0.75, 0]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#3a2f24" roughness={0.8} />
        </RoundedBox>
        {/* Drawers (Left and Right) */}
        <mesh position={[-1.4, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.7, 1.2]} />
          <meshStandardMaterial color="#2c231a" roughness={0.85} />
        </mesh>
        <mesh position={[1.4, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.7, 1.2]} />
          <meshStandardMaterial color="#2c231a" roughness={0.85} />
        </mesh>
        {/* Drawer Handles */}
        <mesh position={[-1.4, 0.6, 0.62]}><boxGeometry args={[0.2, 0.02, 0.02]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[-1.4, 0.3, 0.62]}><boxGeometry args={[0.2, 0.02, 0.02]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[1.4, 0.6, 0.62]}><boxGeometry args={[0.2, 0.02, 0.02]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[1.4, 0.3, 0.62]}><boxGeometry args={[0.2, 0.02, 0.02]} /><meshStandardMaterial color="#111" /></mesh>
      </RigidBody>
    </group>
  );
}
