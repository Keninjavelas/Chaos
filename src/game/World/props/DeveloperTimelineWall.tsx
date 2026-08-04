import React from "react";
import { Text } from "@react-three/drei";
import { HorrorMaterial } from "../materials/HorrorMaterial";

interface DeveloperTimelineWallProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function DeveloperTimelineWall({ position = [0, 0, 0], rotation = [0, 0, 0] }: DeveloperTimelineWallProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Wall Corkboard Frame */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.8, 0.04]} />
        <HorrorMaterial color="#4a3625" roughness={0.9} />
      </mesh>
      
      {/* Inner Cork Surface */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[3.0, 1.6]} />
        <meshStandardMaterial color="#8c6a46" roughness={0.95} />
      </mesh>

      {/* Header Banner */}
      <Text
        position={[0, 0.65, 0.035]}
        fontSize={0.07}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        DEVELOPER JOURNEY & TIMELINE
      </Text>

      {/* Timeline Card 1: 2023 - Foundations */}
      <group position={[-1.0, 0.25, 0.035]}>
        <mesh>
          <planeGeometry args={[0.65, 0.45]} />
          <meshBasicMaterial color="#eddcb9" toneMapped={false} />
        </mesh>
        <Text position={[0, 0.15, 0.005]} fontSize={0.04} color="#24160a" anchorX="center" material-toneMapped={false}>
          2023 // FOUNDATIONS
        </Text>
        <Text position={[-0.28, 0.05, 0.005]} fontSize={0.024} color="#24160a" anchorX="left" anchorY="top" maxWidth={0.56} lineHeight={1.3} material-toneMapped={false}>
          {"• First HTML & CSS Layouts\n• JS DOM Manipulation\n• Built first web apps"}
        </Text>
      </group>

      {/* Timeline Card 2: 2024 - React & Systems */}
      <group position={[-0.3, 0.25, 0.035]}>
        <mesh>
          <planeGeometry args={[0.65, 0.45]} />
          <meshBasicMaterial color="#e2ded5" toneMapped={false} />
        </mesh>
        <Text position={[0, 0.15, 0.005]} fontSize={0.04} color="#1c1b18" anchorX="center" material-toneMapped={false}>
          2024 // REACT & CLOUD
        </Text>
        <Text position={[-0.28, 0.05, 0.005]} fontSize={0.024} color="#1c1b18" anchorX="left" anchorY="top" maxWidth={0.56} lineHeight={1.3} material-toneMapped={false}>
          {"• React & TypeScript State\n• Docker & AWS Cloud\n• Open Source Contributions"}
        </Text>
      </group>

      {/* Timeline Card 3: 2025 - WebGL & AI */}
      <group position={[0.4, 0.25, 0.035]}>
        <mesh>
          <planeGeometry args={[0.65, 0.45]} />
          <meshBasicMaterial color="#eddcb9" toneMapped={false} />
        </mesh>
        <Text position={[0, 0.15, 0.005]} fontSize={0.04} color="#24160a" anchorX="center" material-toneMapped={false}>
          2025 // WEBGL & AI
        </Text>
        <Text position={[-0.28, 0.05, 0.005]} fontSize={0.024} color="#24160a" anchorX="left" anchorY="top" maxWidth={0.56} lineHeight={1.3} material-toneMapped={false}>
          {"• Three.js 3D Shaders\n• Local-First Agentic AI\n• Project Hermes Prototype"}
        </Text>
      </group>

      {/* Timeline Card 4: 2026 - Research & Production */}
      <group position={[1.1, 0.25, 0.035]}>
        <mesh>
          <planeGeometry args={[0.65, 0.45]} />
          <meshBasicMaterial color="#f5f2eb" toneMapped={false} />
        </mesh>
        <Text position={[0, 0.15, 0.005]} fontSize={0.04} color="#1c1b18" anchorX="center" material-toneMapped={false}>
          2026 // RESEARCH
        </Text>
        <Text position={[-0.28, 0.05, 0.005]} fontSize={0.024} color="#1c1b18" anchorX="left" anchorY="top" maxWidth={0.56} lineHeight={1.3} material-toneMapped={false}>
          {"• ICETM-2026 Paper Accepted\n• 3D Interactive Portfolio\n• 365+ Day Commit Streak"}
        </Text>
      </group>

      {/* Simulated GitHub Contribution Activity Mesh Grid */}
      <group position={[0, -0.35, 0.035]}>
        <mesh position={[0, 0.18, 0]}>
          <planeGeometry args={[2.8, 0.05]} />
          <meshBasicMaterial color="#222" toneMapped={false} />
        </mesh>
        <Text position={[0, 0.18, 0.005]} fontSize={0.03} color="#00ff00" anchorX="center" material-toneMapped={false}>
          GITHUB CONTRIBUTION ACTIVITY // 365 DAYS ACTIVE
        </Text>
        {/* 52 Columns x 5 Rows of Green Contribution Squares */}
        {Array.from({ length: 42 }).map((_, col) => (
          Array.from({ length: 5 }).map((_, row) => {
            const intensity = (col * 7 + row * 3) % 4;
            const colors = ["#161b22", "#0e4429", "#006d32", "#39d353"];
            return (
              <mesh key={`gh-${col}-${row}`} position={[-1.35 + col * 0.065, -row * 0.065, 0]}>
                <planeGeometry args={[0.05, 0.05]} />
                <meshBasicMaterial color={colors[intensity]} toneMapped={false} />
              </mesh>
            );
          })
        ))}
      </group>
    </group>
  );
}
