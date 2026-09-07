import React from "react";
import { Text } from "@react-three/drei";
import { FacilityMaterial } from "../materials/FacilityMaterials";
import { portfolioManifest } from "@/data/portfolioData";

interface GlassWhiteboardProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function GlassWhiteboard({ position = [0, 0, 0], rotation = [0, 0, 0] }: GlassWhiteboardProps) {
  const [leftNode, centerNode, rightNode] = portfolioManifest.researchWorkbench.whiteboard.nodes;

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.012]} castShadow>
        <boxGeometry args={[2.32, 1.32, 0.03]} />
        <FacilityMaterial kind="painted-metal" color="#1c2428" />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.2, 1.2, 0.018]} />
        <FacilityMaterial kind="painted-metal" color="#151b1e" />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[2.12, 1.12]} />
        <meshStandardMaterial
          color="#1a2c32"
          transparent
          opacity={0.42}
          roughness={0.42}
          metalness={0.18}
        />
      </mesh>
      <mesh position={[0, 0, 0.014]}>
        <planeGeometry args={[2.08, 1.08]} />
        <meshStandardMaterial color="#1b2b2f" roughness={0.62} metalness={0.16} />
      </mesh>

      {/* Ink kept readable-but-dim (muted teal/green, no emissive): the board
          is lit obliquely by the room, it must not become a light source. */}
      <Text
        position={[0, 0.42, 0.02]}
        fontSize={0.048}
        color="#b9d6ce"
        anchorX="center"
        anchorY="middle"
      >
        {portfolioManifest.researchWorkbench.whiteboard.title}
      </Text>

      <group position={[0, 0.05, 0.02]}>
        <Text position={[-0.7, 0.15, 0]} fontSize={0.032} color="#a3c6af" anchorX="center">
          {leftNode.title}
        </Text>
        <Text position={[-0.7, 0.05, 0]} fontSize={0.02} color="#a3bac0" anchorX="center" maxWidth={0.48} lineHeight={1.2}>
          {leftNode.subtitle}
        </Text>
        <Text position={[-0.3, 0.15, 0]} fontSize={0.03} color="#8ba6ab" anchorX="center">
          {"->"}
        </Text>
        <Text position={[0, 0.15, 0]} fontSize={0.032} color="#a3c6af" anchorX="center">
          {centerNode.title}
        </Text>
        <Text position={[0, 0.05, 0]} fontSize={0.02} color="#a3bac0" anchorX="center" maxWidth={0.48} lineHeight={1.2}>
          {centerNode.subtitle}
        </Text>
        <Text position={[0.4, 0.15, 0]} fontSize={0.03} color="#8ba6ab" anchorX="center">
          {"->"}
        </Text>
        <Text position={[0.75, 0.15, 0]} fontSize={0.032} color="#a3c6af" anchorX="center">
          {rightNode.title}
        </Text>
        <Text position={[0.75, 0.05, 0]} fontSize={0.02} color="#a3bac0" anchorX="center" maxWidth={0.48} lineHeight={1.2}>
          {rightNode.subtitle}
        </Text>
      </group>

      <Text
        position={[0, -0.38, 0.02]}
        fontSize={0.02}
        color="#8da6ad"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.9}
        lineHeight={1.2}
      >
        {portfolioManifest.researchWorkbench.whiteboard.footer}
      </Text>
    </group>
  );
}
