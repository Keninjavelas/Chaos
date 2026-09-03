import React from "react";
import { Text } from "@react-three/drei";
import { FacilityMaterial } from "../materials/FacilityMaterials";
import { portfolioManifest } from "@/data/portfolioData";

interface DeveloperTimelineWallProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const cardColors = ["#eae4d5", "#dfd9cb", "#eae4d5", "#f0ebe1"] as const;
const titleColors = ["#1a221f", "#1a221f", "#1a221f", "#1a221f"] as const;
const cardPositions = [-1.14, -0.38, 0.38, 1.14] as const;

export function DeveloperTimelineWall({ position = [0, 0, 0], rotation = [0, 0, 0] }: DeveloperTimelineWallProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Outer Anodized Aluminum / Dark Wood Mounting Frame */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.25, 1.75, 0.04]} />
        <FacilityMaterial kind="painted-metal" color="#222b28" />
      </mesh>

      {/* Inner Pinboard / Cork Linoleum Surface */}
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[3.12, 1.62]} />
        <FacilityMaterial kind="wood" color="#4a3e30" />
      </mesh>

      {/* Frame Mounting Standoffs (4 corners) */}
      {[[-1.52, 0.77], [1.52, 0.77], [-1.52, -0.77], [1.52, -0.77]].map(([bx, by], idx) => (
        <mesh key={`bolt-${idx}`} position={[bx, by, 0.028]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.015, 8]} />
          <FacilityMaterial kind="archive-brass" />
        </mesh>
      ))}

      {/* Header Plaque */}
      <mesh position={[0, 0.68, 0.028]}>
        <planeGeometry args={[2.8, 0.12]} />
        <meshBasicMaterial color="#1a2420" />
      </mesh>
      <Text
        position={[0, 0.68, 0.035]}
        fontSize={0.065}
        color="#c8dbd0"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        VERIFIED DEVELOPMENT TIMELINE // 2023–2026
      </Text>

      {/* Timeline Cards */}
      {portfolioManifest.timeline.map((entry, index) => (
        <group key={entry.yearLabel} position={[cardPositions[index] ?? 0, 0.22, 0.035]}>
          {/* Card Paper Base */}
          <mesh castShadow receiveShadow>
            <planeGeometry args={[0.68, 0.72]} />
            <meshBasicMaterial color={cardColors[index]} toneMapped={false} />
          </mesh>

          {/* Card Heading */}
          <Text
            position={[-0.29, 0.26, 0.005]}
            fontSize={0.044}
            color={titleColors[index]}
            anchorX="left"
            maxWidth={0.58}
            lineHeight={1.2}
            material-toneMapped={false}
          >
            {`${entry.yearLabel} // ${entry.heading.toUpperCase()}`}
          </Text>

          {/* Card Key Points */}
          <Text
            position={[-0.29, 0.10, 0.005]}
            fontSize={0.026}
            color="#2d3532"
            anchorX="left"
            anchorY="top"
            maxWidth={0.58}
            lineHeight={1.35}
            material-toneMapped={false}
          >
            {entry.bullets.length > 0 ? `• ${entry.bullets[0]}` : ""}
          </Text>
        </group>
      ))}

      {/* Open Source Activity Strip */}
      <group position={[0, -0.58, 0.035]}>
        <mesh position={[0, 0.16, 0]}>
          <planeGeometry args={[2.85, 0.045]} />
          <meshBasicMaterial color="#121815" toneMapped={false} />
        </mesh>
        <Text position={[0, 0.16, 0.005]} fontSize={0.028} color="#00e575" anchorX="center" material-toneMapped={false}>
          VERIFIED OPEN SOURCE CONTRIBUTIONS // GITHUB MATRIX
        </Text>
        {Array.from({ length: 42 }).map((_, col) =>
          Array.from({ length: 4 }).map((__, row) => {
            const intensity = (col * 7 + row * 3) % 4;
            const colors = ["#161b22", "#0e4429", "#006d32", "#39d353"];
            return (
              <mesh key={`gh-${col}-${row}`} position={[-1.33 + col * 0.065, -row * 0.062, 0]}>
                <planeGeometry args={[0.048, 0.048]} />
                <meshBasicMaterial color={colors[intensity]} toneMapped={false} />
              </mesh>
            );
          })
        )}
      </group>
    </group>
  );
}
