"use client";
import React, { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";
import { FacilityMaterial, FacilityMaterialKind } from "../materials/FacilityMaterials";
import { FacilityFluorescent } from "../lighting/FacilityLighting";
import { useArchiveStore } from "@/lib/state";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloorProps {
  position?: [number, number, number];
  args?: [number, number];
  kind?: FacilityMaterialKind;
  color?: string;
}

export function RoomFloor({ position = [0, -0.5, 0], args = [20, 40], kind = "dirty-floor", color }: FloorProps) {
  return (
    <RigidBody type="fixed" position={position}>
      {/* Base Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <planeGeometry args={args} />
        <FacilityMaterial kind={kind} color={color} />
      </mesh>
      
      {/* Collision Box underlying the plane */}
      <mesh position={[0, 0.0, 0]}>
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
  kind?: FacilityMaterialKind;
  color?: string;
}

export function RoomCeiling({ position = [0, 2.5, 0], args = [20, 1, 40], kind = "ceiling-panel", color }: CeilingProps) {
  const tileColumns = Math.max(1, Math.floor(args[0] / 1.2));
  const tileRows = Math.max(1, Math.floor(args[2] / 1.2));
  return (
    <RigidBody type="fixed" position={position}>
      {/* Ceiling Plane */}
      <mesh receiveShadow>
        <boxGeometry args={args} />
        <FacilityMaterial kind={kind} color={color} />
      </mesh>

      {/* Grid framing */}
      {Array.from({ length: tileColumns - 1 }).map((_, index) => (
        <mesh key={`ceiling-column-${index}`} position={[-args[0] / 2 + (index + 1) * 1.2, -args[1] / 2 - 0.006, 0]}>
          <boxGeometry args={[0.018, 0.012, args[2]]} />
          <meshStandardMaterial color="#20211d" roughness={0.95} />
        </mesh>
      ))}
      {Array.from({ length: tileRows - 1 }).map((_, index) => (
        <mesh key={`ceiling-row-${index}`} position={[0, -args[1] / 2 - 0.006, -args[2] / 2 + (index + 1) * 1.2]}>
          <boxGeometry args={[args[0], 0.012, 0.018]} />
          <meshStandardMaterial color="#20211d" roughness={0.95} />
        </mesh>
      ))}
    </RigidBody>
  );
}

interface WallProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  args?: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
  kind?: FacilityMaterialKind;
  color?: string;
}

export function RoomWall({ position, rotation = [0,0,0], args, width, height, depth, kind = "painted-plaster", color }: WallProps) {
  const dimensions = args ?? [width ?? 1, height ?? 1, depth ?? 0.2];
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        {/* Main Wall */}
        <mesh position={[0, dimensions[1]/2, 0]} castShadow receiveShadow>
          <boxGeometry args={dimensions} />
          <FacilityMaterial kind={kind} color={color} />
        </mesh>
      </RigidBody>
      
      {/* Baseboards */}
      <mesh position={[0, 0.1, dimensions[2]/2 + 0.01]} receiveShadow>
        <boxGeometry args={[dimensions[0], 0.2, 0.04]} />
        <FacilityMaterial kind="painted-metal" color="#222826" />
      </mesh>
      <mesh position={[0, 0.1, -dimensions[2]/2 - 0.01]} receiveShadow>
        <boxGeometry args={[dimensions[0], 0.2, 0.04]} />
        <FacilityMaterial kind="painted-metal" color="#222826" />
      </mesh>
      
      {/* Chair Rail (Middle Trim) */}
      <mesh position={[0, 1.0, dimensions[2]/2 + 0.01]} receiveShadow>
        <boxGeometry args={[dimensions[0], 0.08, 0.05]} />
        <FacilityMaterial kind="wood" color="#3c3026" />
      </mesh>
      <mesh position={[0, 1.0, -dimensions[2]/2 - 0.01]} receiveShadow>
        <boxGeometry args={[dimensions[0], 0.08, 0.05]} />
        <FacilityMaterial kind="wood" color="#3c3026" />
      </mesh>
    </group>
  );
}

export function InstitutionalFluorescent({
  position,
  color = "#d8e5dc",
  intensity = 1.4,
  distance = 6,
}: {
  position: [number, number, number];
  color?: string;
  intensity?: number;
  distance?: number;
}) {
  return <FacilityFluorescent position={position} color={color} intensity={intensity} distance={distance} />;
}

export function InstitutionalDoor({ position, rotation = [0,0,0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  // Institutional double-doorway frame (2.0m clear opening for accessible navigation)
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        {/* Frame Sides (2.0m clear inner opening) */}
        <mesh position={[-1.05, 1.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 2.1, 0.25]} />
          <FacilityMaterial kind="painted-metal" color="#1a2228" />
        </mesh>
        <mesh position={[1.05, 1.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 2.1, 0.25]} />
          <FacilityMaterial kind="painted-metal" color="#1a2228" />
        </mesh>
        {/* Frame Top Header */}
        <mesh position={[0, 2.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.1, 0.25]} />
          <FacilityMaterial kind="painted-metal" color="#1a2228" />
        </mesh>
      </RigidBody>
    </group>
  );
}

export function ElevatorDoor({ position, rotation = [0,0,0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  const { isAwakened } = useArchiveStore();
  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (isAwakened) {
      if (leftDoorRef.current && leftDoorRef.current.position.x > -0.9) {
        leftDoorRef.current.position.x -= delta * 0.2;
      }
      if (rightDoorRef.current && rightDoorRef.current.position.x < 0.9) {
        rightDoorRef.current.position.x += delta * 0.2;
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
        {/* Inner Dark Cutout */}
        <mesh position={[0, 1.15, 0.1]}>
          <boxGeometry args={[1.4, 2.3, 0.1]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
        
        {/* Left Door */}
        <RoundedBox ref={leftDoorRef} args={[0.7, 2.3, 0.05]} position={[-0.9, 1.15, 0.15]} radius={0.01}>
          <meshStandardMaterial color="#362f2d" roughness={0.7} metalness={0.8} />
        </RoundedBox>
        {/* Right Door */}
        <RoundedBox ref={rightDoorRef} args={[0.7, 2.3, 0.05]} position={[0.9, 1.15, 0.15]} radius={0.01}>
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
          <FacilityMaterial kind="painted-metal" color="#1a2024" />
        </mesh>
        
        {/* 3 Chairs */}
        {[-1.0, 0, 1.0].map((x, i) => {
          const isDamaged = i === 1;
          return (
            <group key={i} position={[x, 0.005, 0]}>
              <RoundedBox args={[0.6, 0.05, 0.5]} position={[0, 0.45, 0.1]} rotation={[isDamaged ? 0.05 : 0, 0, 0]} radius={0.02}>
                <meshStandardMaterial color="#2d3748" roughness={0.8} />
              </RoundedBox>
              <RoundedBox args={[0.6, 0.5, 0.05]} position={[0, 0.7, -0.15]} rotation={[isDamaged ? -0.15 : -0.1, 0, isDamaged ? 0.05 : 0]} radius={0.02}>
                <meshStandardMaterial color="#2d3748" roughness={0.8} />
              </RoundedBox>
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
        {/* Missing Tile Hole */}
        <mesh position={[0, 4.49, 0]}>
          <planeGeometry args={[1.9, 1.9]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        {/* Hanging Tile */}
        <mesh position={[0, 4.1, 0.8]} rotation={[0.4, 0.2, 0]}>
          <boxGeometry args={[1.9, 0.02, 1.9]} />
          <FacilityMaterial kind="ceiling-panel" color="#4a4d44" />
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
          <FacilityMaterial kind="wood" color="#3c3025" />
        </RoundedBox>
        {/* Corkboard */}
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[1.9, 1.1]} />
          <FacilityMaterial kind="wood" color="#68553e" />
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
          <FacilityMaterial kind="concrete-wall" color="#454c4a" />
        </mesh>
        <mesh position={[0, 0.2, 0]} receiveShadow>
          <boxGeometry args={[0.7, 0.4, 0.7]} />
          <FacilityMaterial kind="painted-metal" color="#222826" />
        </mesh>
        <mesh position={[0, height - 0.2, 0]} receiveShadow>
          <boxGeometry args={[0.7, 0.4, 0.7]} />
          <FacilityMaterial kind="painted-metal" color="#222826" />
        </mesh>
      </group>
    </RigidBody>
  );
}

export function StructuralBeam({ position, rotation = [0,0,0], length = 10 }: { position: [number, number, number], rotation?: [number, number, number], length?: number }) {
  return (
    <RigidBody type="fixed">
      <group position={position} rotation={rotation}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[length, 0.4, 0.1]} />
          <FacilityMaterial kind="painted-metal" color="#283035" />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[length, 0.05, 0.4]} />
          <FacilityMaterial kind="painted-metal" color="#283035" />
        </mesh>
        <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[length, 0.05, 0.4]} />
          <FacilityMaterial kind="painted-metal" color="#283035" />
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
        <FacilityMaterial kind="painted-metal" color="#3c464e" />
      </mesh>
      <mesh position={[0, -0.1, -0.2]} castShadow receiveShadow rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.05, 0.05, length, 16]} />
        <FacilityMaterial kind="painted-metal" color="#252d32" />
      </mesh>
      {Array.from({ length: Math.max(1, Math.floor(length / 2)) }).map((_, i) => (
        <mesh key={i} position={[(i - Math.floor(length / 2) / 2) * 2, 0.1, 0]}>
          <boxGeometry args={[0.05, 0.3, 0.6]} />
          <FacilityMaterial kind="painted-metal" color="#181e22" />
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
        <FacilityMaterial kind="painted-metal" color="#262e34" />
      </mesh>
      <mesh position={[0, -0.01, 0]} rotation={[Math.PI/2, 0, 0]}>
        <planeGeometry args={[1.4, 1.4]} />
        <FacilityMaterial kind="painted-metal" color="#0c1012" />
      </mesh>
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[0, -0.02, -0.6 + i * 0.2]}>
          <boxGeometry args={[1.4, 0.02, 0.02]} />
          <FacilityMaterial kind="painted-metal" color="#3a444c" />
        </mesh>
      ))}
    </group>
  );
}
