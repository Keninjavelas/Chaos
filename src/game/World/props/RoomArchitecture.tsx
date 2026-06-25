"use client";
import React from "react";
import { RigidBody } from "@react-three/rapier";
import { RoundedBox, MeshReflectorMaterial } from "@react-three/drei";

interface FloorProps {
  position?: [number, number, number];
  args?: [number, number];
}

export function RoomFloor({ position = [0, -0.5, 0], args = [20, 40] }: FloorProps) {
  return (
    <RigidBody type="fixed" position={position}>
      {/* Base Floor with Wet Reflections */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <planeGeometry args={args} />
        <MeshReflectorMaterial 
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={0.6}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#151515"
          metalness={0.5}
          mirror={1}
        />
      </mesh>
      
      {/* Collision Box underlying the plane - made extremely thin to prevent edge snags */}
      <mesh position={[0, 0.495, 0]}>
        <boxGeometry args={[args[0], 0.01, args[1]]} />
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
      <mesh>
        <boxGeometry args={args} />
        <meshStandardMaterial color="#1a1c1d" roughness={0.9} />
      </mesh>

      {/* Recessed Light Fixture Trim */}
      {hasLights && (
        <>
          <mesh position={[0, -0.49, 0]}>
            <boxGeometry args={[2.2, 0.05, 4.2]} />
            <meshStandardMaterial color="#2d3033" roughness={0.5} />
          </mesh>
          {/* The glowing fluorescent panel */}
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[2, 0.02, 4]} />
            <meshStandardMaterial color="#e6f2ff" emissive="#e6f2ff" emissiveIntensity={0.8} />
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
        <mesh position={[0, dimensions[1]/2, 0]}>
          <boxGeometry args={dimensions} />
          {/* Concrete/Plaster look */}
          <meshStandardMaterial color="#2a2b2c" roughness={0.9} />
        </mesh>
      </RigidBody>
      
      {/* Baseboards (Visual only, no collision to prevent snagging) */}
      <mesh position={[0, 0.1, dimensions[2]/2 + 0.02]}>
        <boxGeometry args={[dimensions[0], 0.2, 0.05]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.1, -dimensions[2]/2 - 0.02]}>
        <boxGeometry args={[dimensions[0], 0.2, 0.05]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
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
          <meshStandardMaterial color="#1a1c1d" roughness={0.6} />
        </RoundedBox>
        {/* Inner Dark Cutout (where doors slide) */}
        <mesh position={[0, 1.15, 0.1]}>
          <boxGeometry args={[1.4, 2.3, 0.1]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
        
        {/* Left Door */}
        <RoundedBox ref={leftDoorRef} args={[0.7, 2.3, 0.05]} position={[-0.35, 1.15, 0.15]} radius={0.01}>
          <meshStandardMaterial color="#4a4c50" roughness={0.4} metalness={0.6} />
        </RoundedBox>
        {/* Right Door */}
        <RoundedBox ref={rightDoorRef} args={[0.7, 2.3, 0.05]} position={[0.35, 1.15, 0.15]} radius={0.01}>
          <meshStandardMaterial color="#4a4c50" roughness={0.4} metalness={0.6} />
        </RoundedBox>

        {/* Elevator Floor Indicator */}
        <mesh position={[0, 2.5, 0.1]}>
          <boxGeometry args={[0.4, 0.15, 0.05]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 2.5, 0.13]}>
          <planeGeometry args={[0.3, 0.08]} />
          <meshStandardMaterial color="#ff3333" emissive="#ff3333" emissiveIntensity={isAwakened ? 1.0 : 0.5} />
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
        <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.03, 0.03, 2.5]} />
          <meshStandardMaterial color="#111" roughness={0.6} />
        </mesh>
        
        {/* 3 Chairs */}
        {[-0.8, 0, 0.8].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            {/* Seat */}
            <RoundedBox args={[0.6, 0.05, 0.5]} position={[0, 0.45, 0.1]} radius={0.02}>
              <meshStandardMaterial color="#2d3748" roughness={0.8} />
            </RoundedBox>
            {/* Backrest */}
            <RoundedBox args={[0.6, 0.5, 0.05]} position={[0, 0.7, -0.15]} rotation={[-0.1, 0, 0]} radius={0.02}>
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
          </group>
        ))}
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
