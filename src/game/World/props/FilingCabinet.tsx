import React from "react";
import { RigidBody } from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";

interface FilingCabinetProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  openDrawers?: number[]; // Array of indices (0-3) for open drawers
}

export function FilingCabinet({ position, rotation = [0, 0, 0], openDrawers = [] }: FilingCabinetProps) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed">
        {/* Main Cabinet Body */}
        <RoundedBox args={[0.8, 1.8, 0.8]} position={[0, 0.9, 0]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#323639" roughness={0.7} metalness={0.4} />
        </RoundedBox>

        {/* Drawers */}
        {[0.3, 0.7, 1.1, 1.5].map((y, i) => {
          const isDrawerOpen = openDrawers.includes(i);
          const zOffset = isDrawerOpen ? 0.3 : 0;
          return (
            <group key={i} position={[0, y, 0.4 + zOffset]}>
              {/* Drawer Front */}
              <RoundedBox args={[0.76, 0.36, 0.05]} position={[0, 0, 0]} radius={0.01}>
                <meshStandardMaterial color="#404447" roughness={0.6} metalness={0.5} />
              </RoundedBox>
              {/* Handle */}
              <RoundedBox args={[0.3, 0.04, 0.04]} position={[0, 0.08, 0.03]} radius={0.01}>
                <meshStandardMaterial color="#7a8288" roughness={0.4} metalness={0.8} />
              </RoundedBox>
              {/* Label Holder */}
              <RoundedBox args={[0.1, 0.06, 0.02]} position={[0, -0.05, 0.03]} radius={0.005}>
                <meshStandardMaterial color="#7a8288" roughness={0.4} metalness={0.8} />
              </RoundedBox>
              <mesh position={[0, -0.05, 0.041]}>
                <planeGeometry args={[0.08, 0.04]} />
                <meshStandardMaterial color="#e0dfd5" roughness={0.9} />
              </mesh>
              
              {/* Drawer Box (visible when open) */}
              {isDrawerOpen && (
                <>
                  {/* Left Side */}
                  <mesh position={[-0.37, 0, -0.2]}>
                    <boxGeometry args={[0.02, 0.36, 0.4]} />
                    <meshStandardMaterial color="#2a2d2f" />
                  </mesh>
                  {/* Right Side */}
                  <mesh position={[0.37, 0, -0.2]}>
                    <boxGeometry args={[0.02, 0.36, 0.4]} />
                    <meshStandardMaterial color="#2a2d2f" />
                  </mesh>
                  {/* Bottom Side */}
                  <mesh position={[0, -0.17, -0.2]}>
                    <boxGeometry args={[0.72, 0.02, 0.4]} />
                    <meshStandardMaterial color="#2a2d2f" />
                  </mesh>
                </>
              )}
            </group>
          );
        })}
      </RigidBody>
    </group>
  );
}
