import React from "react";
import { RigidBody } from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";

interface ReceptionDeskProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  onInteractMap?: () => void;
}

export function ReceptionDesk({ position, rotation = [0, 0, 0], onInteractMap }: ReceptionDeskProps) {
  return (
    <group position={position} rotation={rotation}>
      
      {/* ─── DESK STRUCTURE ─── */}
      <RigidBody type="fixed" colliders="cuboid">
        {/* Main Counter Top */}
        <RoundedBox args={[4.2, 0.1, 1.2]} position={[0, 1.1, 0.4]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#2a2218" roughness={0.9} />
        </RoundedBox>
        {/* Front Panel */}
        <RoundedBox args={[4, 1.1, 0.2]} position={[0, 0.55, 0.9]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#1f1810" roughness={0.9} />
        </RoundedBox>
        {/* Side Panels */}
        <RoundedBox args={[0.2, 1.1, 2.4]} position={[-1.9, 0.55, 0]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#1f1810" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[0.2, 1.1, 2.4]} position={[1.9, 0.55, 0]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#1f1810" roughness={0.9} />
        </RoundedBox>
        {/* Working Surface (Lower) */}
        <RoundedBox args={[3.6, 0.1, 1.6]} position={[0, 0.75, -0.1]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#3a2f24" roughness={0.8} />
        </RoundedBox>
      </RigidBody>

      {/* ─── DESK LAMP ─── */}
      <group position={[-1.2, 0.8, -0.4]}>
        <RigidBody type="fixed">
          {/* Base */}
          <mesh position={[0, 0.025, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
            <meshStandardMaterial color="#111" roughness={0.6} />
          </mesh>
          {/* Stem */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          </mesh>
          {/* Shade */}
          <mesh position={[0, 0.6, 0.1]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.15, 0.2, 16]} />
            <meshStandardMaterial color="#222" roughness={0.5} />
          </mesh>
        </RigidBody>
        {/* Lamp Light */}
        <pointLight position={[0, 0.5, 0.2]} intensity={1.2} color="#ffb74d" distance={6} decay={2} />
      </group>

      {/* ─── VISITOR LOGBOOK ─── */}
      <RigidBody type="fixed" position={[-0.8, 1.15, 0.4]} rotation={[0, -0.1, 0]}>
        <RoundedBox args={[0.6, 0.03, 0.4]} radius={0.005}>
          <meshStandardMaterial color="#333" roughness={0.8} />
        </RoundedBox>
        {/* Open Pages */}
        <mesh position={[0, 0.016, 0]}>
          <boxGeometry args={[0.58, 0.01, 0.38]} />
          <meshStandardMaterial color="#e0dfd5" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* ─── BROKEN WALL CLOCK (Placed on wall behind desk) ─── */}
      <RigidBody type="fixed" position={[0, 2.5, 3.5]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Clock Frame */}
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
        {/* Clock Face */}
        <mesh position={[0, 0.026, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.01, 32]} />
          <meshStandardMaterial color="#e0dfd5" roughness={0.9} />
        </mesh>
        {/* Clock Hands (Stuck at 03:14) */}
        <mesh position={[0.1, 0.035, 0.1]} rotation={[0, Math.PI/4, 0]}>
          <boxGeometry args={[0.01, 0.01, 0.2]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[-0.05, 0.035, 0.15]} rotation={[0, -Math.PI/6, 0]}>
          <boxGeometry args={[0.01, 0.01, 0.15]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </RigidBody>

      {/* ─── MAP BLUEPRINT ─── */}
      <RigidBody type="fixed" position={[0.5, 1.15, 0.5]} rotation={[0, 0.2, 0]}>
        {/* Rolled paper cylinder */}
        <cylinderGeometry args={[0.04, 0.04, 0.5, 16]} rotation={[0, 0, Math.PI/2]} />
        <meshStandardMaterial color="#d4cbb8" roughness={0.9} />
        
        {/* Interaction Hitbox for Map */}
        {onInteractMap && (
          <mesh 
            position={[0, 0.1, 0]} 
            onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
            onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}
            onClick={(e) => { e.stopPropagation(); onInteractMap(); }}
          >
            <boxGeometry args={[0.6, 0.3, 0.2]} />
            <meshBasicMaterial visible={false} />
          </mesh>
        )}
      </RigidBody>

    </group>
  );
}
