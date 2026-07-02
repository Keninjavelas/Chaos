"use client";
import React from "react";
import { RigidBody } from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";
import { HorrorMaterial } from "../materials/HorrorMaterial";

interface FloorProps {
  position?: [number, number, number];
  args?: [number, number];
}

export function RoomFloor({ position = [0, -0.5, 0], args = [20, 40] }: FloorProps) {
  return (
    <RigidBody type="fixed" position={position}>
      {/* Base Floor with Wet Reflections (HorrorMaterial) */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <planeGeometry args={args} />
        <HorrorMaterial color="#1a1a1a" roughness={0.7} metalness={0.2} noiseScale={8.0} bumpStrength={0.5} />
      </mesh>
      
      {/* Collision Box underlying the plane - made thick to prevent falling through on spawn */}
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[args[0], 1.0, args[1]]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </RigidBody>
  );
}

interface CeilingProps {
  position?: [number, number, number];
  args?: [number, number, number];
  hasLights?: boolean;
}

export function RoomCeiling({ position = [0, 2.5, 0], args = [20, 1, 40], hasLights = true }: CeilingProps) {
  return (
    <RigidBody type="fixed" position={position}>
      {/* Ceiling Plane */}
      <mesh receiveShadow>
        <boxGeometry args={args} />
        <HorrorMaterial color="#151515" roughness={0.9} noiseScale={12.0} />
      </mesh>

      {/* Recessed Light Fixture Trim */}
      {hasLights && (
        <>
          <mesh position={[0, -0.49, 0]}>
            <boxGeometry args={[2.2, 0.05, 4.2]} />
            <HorrorMaterial color="#2d3033" roughness={0.6} />
          </mesh>
          {/* The glowing fluorescent panel */}
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[2, 0.02, 4]} />
            <meshStandardMaterial color="#ffffff" emissive="#e6f2ff" emissiveIntensity={1.0} toneMapped={false} />
          </mesh>
        </>
      )}
    </RigidBody>
  );
}

interface WallProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  // Accept either explicit args or individual dimensions
  args?: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
}

export function RoomWall({ position, rotation = [0,0,0], args, width, height, depth }: WallProps) {
  // Determine dimensions: prioritize args, then individual dimensions, fallback defaults
  const dimensions = args ?? [width ?? 1, height ?? 1, depth ?? 0.2];
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        {/* Main Wall */}
        <mesh position={[0, dimensions[1]/2, 0]} castShadow receiveShadow>
          <boxGeometry args={dimensions} />
          {/* Concrete/Plaster look */}
          <HorrorMaterial color="#4a4b48" roughness={0.9} metalness={0} noiseScale={6.0} bumpStrength={1.5} />
        </mesh>
      </RigidBody>
      
      {/* Baseboards */}
      <mesh position={[0, 0.1, dimensions[2]/2 + 0.01]} receiveShadow>
        <boxGeometry args={[dimensions[0], 0.2, 0.04]} />
        <HorrorMaterial color="#111111" roughness={0.8} noiseScale={2.0} />
      </mesh>
      <mesh position={[0, 0.1, -dimensions[2]/2 - 0.01]} receiveShadow>
        <boxGeometry args={[dimensions[0], 0.2, 0.04]} />
        <HorrorMaterial color="#111111" roughness={0.8} noiseScale={2.0} />
      </mesh>
      
      {/* Chair Rail (Middle Trim) */}
      <mesh position={[0, 1.0, dimensions[2]/2 + 0.01]} receiveShadow>
        <boxGeometry args={[dimensions[0], 0.08, 0.05]} />
        <HorrorMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.0, -dimensions[2]/2 - 0.01]} receiveShadow>
        <boxGeometry args={[dimensions[0], 0.08, 0.05]} />
        <HorrorMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Cornice (Top Trim) */}
      <mesh position={[0, dimensions[1] - 0.1, dimensions[2]/2 + 0.01]} receiveShadow>
        <boxGeometry args={[dimensions[0], 0.2, 0.04]} />
        <HorrorMaterial color="#111111" roughness={0.9} noiseScale={2.0} />
      </mesh>
      <mesh position={[0, dimensions[1] - 0.1, -dimensions[2]/2 - 0.01]} receiveShadow>
        <boxGeometry args={[dimensions[0], 0.2, 0.04]} />
        <HorrorMaterial color="#111111" roughness={0.9} noiseScale={2.0} />
      </mesh>
    </group>
  );
}

export function InstitutionalDoor({ position, rotation = [0,0,0], isOpen = false }: { position: [number, number, number], rotation?: [number, number, number], isOpen?: boolean }) {
  // Institutional heavy metal door with frame
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        {/* Frame Sides */}
        <mesh position={[-0.45, 1.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 2.1, 0.25]} />
          <HorrorMaterial color="#1a1a1a" roughness={0.6} metalness={0.5} />
        </mesh>
        <mesh position={[0.45, 1.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 2.1, 0.25]} />
          <HorrorMaterial color="#1a1a1a" roughness={0.6} metalness={0.5} />
        </mesh>
        {/* Frame Top */}
        <mesh position={[0, 2.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.1, 0.25]} />
          <HorrorMaterial color="#1a1a1a" roughness={0.6} metalness={0.5} />
        </mesh>
        
        {/* Actual Door */}
        <group position={[-0.4, 1.05, 0]} rotation={[0, isOpen ? -Math.PI / 2.2 : 0, 0]}>
          <mesh position={[0.4, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 2.05, 0.05]} />
            <HorrorMaterial color="#3a302a" roughness={0.8} metalness={0.3} noiseScale={3.0} />
          </mesh>
          {/* Kickplate */}
          <mesh position={[0.4, -0.9, 0.026]} receiveShadow>
            <planeGeometry args={[0.8, 0.2]} />
            <HorrorMaterial color="#555" roughness={0.4} metalness={0.8} />
          </mesh>
          <mesh position={[0.4, -0.9, -0.026]} rotation={[0, Math.PI, 0]} receiveShadow>
            <planeGeometry args={[0.8, 0.2]} />
            <HorrorMaterial color="#555" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Handle */}
          <mesh position={[0.7, 0, 0.04]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.15]} />
            <meshStandardMaterial color="#888" roughness={0.3} metalness={0.9} />
          </mesh>
        </group>
      </RigidBody>
    </group>
  );
}

import { useArchiveStore } from "@/lib/state";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function ElevatorDoor({ position, rotation = [0,0,0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  const { isAwakened } = useArchiveStore();
  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (isAwakened) {
      if (leftDoorRef.current && leftDoorRef.current.position.x > -0.9) {
        leftDoorRef.current.position.x -= delta * 0.2; // slow open speed
      }
      if (rightDoorRef.current && rightDoorRef.current.position.x < 0.9) {
        rightDoorRef.current.position.x += delta * 0.2; // slow open speed
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        {/* Outer Frame */}
        <RoundedBox args={[1.8, 2.4, 0.2]} position={[0, 1.2, 0]} radius={0.02}>
          <meshStandardMaterial color="#151312" roughness={0.9} />
        </RoundedBox>
        {/* Inner Dark Cutout (where doors slide) */}
        <mesh position={[0, 1.15, 0.1]}>
          <boxGeometry args={[1.4, 2.3, 0.1]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
        
        {/* Left Door */}
        <RoundedBox ref={leftDoorRef} args={[0.7, 2.3, 0.05]} position={[-0.35, 1.15, 0.15]} radius={0.01}>
          <meshStandardMaterial color="#362f2d" roughness={0.7} metalness={0.8} />
        </RoundedBox>
        {/* Right Door */}
        <RoundedBox ref={rightDoorRef} args={[0.7, 2.3, 0.05]} position={[0.35, 1.15, 0.15]} radius={0.01}>
          <meshStandardMaterial color="#362f2d" roughness={0.7} metalness={0.8} />
        </RoundedBox>

        {/* Elevator Floor Indicator */}
        <mesh position={[0, 2.5, 0.1]}>
          <boxGeometry args={[0.4, 0.15, 0.05]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 2.5, 0.13]}>
          <planeGeometry args={[0.3, 0.08]} />
          <meshStandardMaterial color="#000000" emissive="#ff3333" emissiveIntensity={isAwakened ? 2.0 : 0.8} toneMapped={false} />
        </mesh>
      </RigidBody>
    </group>
  );
}

export function VisitorChairs({ position, rotation = [0,0,0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        {/* Metal connecting bar */}
        <mesh position={[0, 0.405, 0]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.03, 0.03, 2.8]} />
          <meshStandardMaterial color="#111" roughness={0.6} />
        </mesh>
        
        {/* 3 Chairs (Spaced further apart) */}
        {[-1.0, 0, 1.0].map((x, i) => {
          const isDamaged = i === 1; // Middle chair is damaged
          return (
            <group key={i} position={[x, 0.005, 0]}>
              {/* Seat */}
              <RoundedBox args={[0.6, 0.05, 0.5]} position={[0, 0.45, 0.1]} rotation={[isDamaged ? 0.05 : 0, 0, 0]} radius={0.02}>
                <meshStandardMaterial color="#2d3748" roughness={0.8} />
              </RoundedBox>
              {/* Backrest */}
              <RoundedBox args={[0.6, 0.5, 0.05]} position={[0, 0.7, -0.15]} rotation={[isDamaged ? -0.15 : -0.1, 0, isDamaged ? 0.05 : 0]} radius={0.02}>
                <meshStandardMaterial color="#2d3748" roughness={0.8} />
              </RoundedBox>
              {/* Legs */}
              <mesh position={[-0.25, 0.22, 0.3]}>
                <cylinderGeometry args={[0.02, 0.02, 0.45]} />
                <meshStandardMaterial color="#111" />
              </mesh>
              <mesh position={[0.25, 0.22, 0.3]}>
                <cylinderGeometry args={[0.02, 0.02, 0.45]} />
                <meshStandardMaterial color="#111" />
              </mesh>
              <mesh position={[-0.25, 0.22, -0.1]}>
                <cylinderGeometry args={[0.02, 0.02, 0.45]} />
                <meshStandardMaterial color="#111" />
              </mesh>
              <mesh position={[0.25, 0.22, -0.1]}>
                <cylinderGeometry args={[0.02, 0.02, 0.45]} />
                <meshStandardMaterial color="#111" />
              </mesh>
            </group>
          );
        })}
      </RigidBody>
    </group>
  );
}

export function BrokenCeilingPanel({ position, rotation = [0,0,0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        {/* Missing Tile Hole (Darkness) */}
        <mesh position={[0, 4.49, 0]}>
          <planeGeometry args={[1.9, 1.9]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        {/* Hanging Tile */}
        <mesh position={[0, 4.1, 0.8]} rotation={[0.4, 0.2, 0]}>
          <boxGeometry args={[1.9, 0.02, 1.9]} />
          <meshStandardMaterial color="#e0dfd5" roughness={0.9} />
        </mesh>
        {/* Hanging wires */}
        <mesh position={[-0.2, 3.8, -0.5]} rotation={[0.2, 0, 0.5]}>
          <cylinderGeometry args={[0.005, 0.005, 1.5]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0.4, 4.0, -0.2]} rotation={[-0.1, 0, -0.3]}>
          <cylinderGeometry args={[0.005, 0.005, 1.0]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </RigidBody>
    </group>
  );
}

export function NoticeBoard({ position, rotation = [0,0,0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        {/* Frame */}
        <RoundedBox args={[2.0, 1.2, 0.05]} position={[0, 0, 0]} radius={0.01}>
          <meshStandardMaterial color="#2d2218" roughness={0.9} />
        </RoundedBox>
        {/* Corkboard */}
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[1.9, 1.1]} />
          <meshStandardMaterial color="#8a6c4c" roughness={1.0} />
        </mesh>
        
        {/* Papers */}
        <mesh position={[-0.6, 0.2, 0.03]} rotation={[0, 0, 0.1]}>
          <planeGeometry args={[0.3, 0.4]} />
          <meshStandardMaterial color="#f0ead6" roughness={0.9} />
        </mesh>
        <mesh position={[-0.4, -0.2, 0.03]} rotation={[0, 0, -0.2]}>
          <planeGeometry args={[0.25, 0.3]} />
          <meshStandardMaterial color="#dcd4c4" roughness={0.9} />
        </mesh>
        
        {/* Missing Person Poster (Large, central) */}
        <mesh position={[0.1, 0.1, 0.03]} rotation={[0, 0, -0.05]}>
          <planeGeometry args={[0.5, 0.7]} />
          <meshStandardMaterial color="#e0dfd5" roughness={0.8} />
        </mesh>
        {/* Dark box for the "photo" on the poster */}
        <mesh position={[0.1, 0.2, 0.031]} rotation={[0, 0, -0.05]}>
          <planeGeometry args={[0.4, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        
        {/* More scattered notes */}
        <mesh position={[0.6, 0.3, 0.03]} rotation={[0, 0, 0.3]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshStandardMaterial color="#f0ead6" roughness={0.9} />
        </mesh>
      </RigidBody>
    </group>
  );
}

export function StructuralColumn({ position, rotation = [0,0,0], height = 3.2 }: { position: [number, number, number], rotation?: [number, number, number], height?: number }) {
  return (
    <RigidBody type="fixed">
      <group position={position} rotation={rotation}>
        <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, height, 0.6]} />
          <HorrorMaterial color="#4a4b48" roughness={0.9} noiseScale={4.0} bumpStrength={1.5} />
        </mesh>
        {/* Base */}
        <mesh position={[0, 0.2, 0]} receiveShadow>
          <boxGeometry args={[0.7, 0.4, 0.7]} />
          <HorrorMaterial color="#111" roughness={0.8} />
        </mesh>
        {/* Cap */}
        <mesh position={[0, height - 0.2, 0]} receiveShadow>
          <boxGeometry args={[0.7, 0.4, 0.7]} />
          <HorrorMaterial color="#111" roughness={0.8} />
        </mesh>
      </group>
    </RigidBody>
  );
}

export function StructuralBeam({ position, rotation = [0,0,0], length = 10 }: { position: [number, number, number], rotation?: [number, number, number], length?: number }) {
  return (
    <RigidBody type="fixed">
      <group position={position} rotation={rotation}>
        {/* I-Beam */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[length, 0.4, 0.1]} />
          <HorrorMaterial color="#2a2a2a" roughness={0.7} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[length, 0.05, 0.4]} />
          <HorrorMaterial color="#2a2a2a" roughness={0.7} metalness={0.5} />
        </mesh>
        <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[length, 0.05, 0.4]} />
          <HorrorMaterial color="#2a2a2a" roughness={0.7} metalness={0.5} />
        </mesh>
      </group>
    </RigidBody>
  );
}

export function CeilingPipes({ position, rotation = [0,0,0], length = 10 }: { position: [number, number, number], rotation?: [number, number, number], length?: number }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0.2]} castShadow receiveShadow rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.08, 0.08, length, 16]} />
        <HorrorMaterial color="#3a2a2a" metalness={0.6} roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.1, -0.2]} castShadow receiveShadow rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.05, 0.05, length, 16]} />
        <HorrorMaterial color="#1a1a1a" metalness={0.8} roughness={0.6} />
      </mesh>
      {/* Pipe Brackets */}
      {Array.from({ length: Math.max(1, Math.floor(length / 2)) }).map((_, i) => (
        <mesh key={i} position={[(i - Math.floor(length / 2) / 2) * 2, 0.1, 0]}>
          <boxGeometry args={[0.05, 0.3, 0.6]} />
          <HorrorMaterial color="#111" metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export function HVACVent({ position, rotation = [0,0,0], scale = 1.0 }: { position: [number, number, number], rotation?: [number, number, number], scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[1.5, 0.3, 1.5]} />
        <HorrorMaterial color="#222" metalness={0.8} roughness={0.5} />
      </mesh>
      {/* Vent Grate */}
      <mesh position={[0, -0.01, 0]} rotation={[Math.PI/2, 0, 0]}>
        <planeGeometry args={[1.4, 1.4]} />
        <HorrorMaterial color="#050505" />
      </mesh>
      {/* Grate Lines */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[0, -0.02, -0.6 + i * 0.2]}>
          <boxGeometry args={[1.4, 0.02, 0.02]} />
          <HorrorMaterial color="#444" metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}
