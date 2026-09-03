import React from "react";
import { Text } from "@react-three/drei";
import { HorrorMaterial } from "../materials/HorrorMaterial";
import { portfolioManifest } from "@/data/portfolioData";

interface GlassWhiteboardProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function GlassWhiteboard({ position = [0, 0, 0], rotation = [0, 0, 0] }: GlassWhiteboardProps) {
  const [leftNode, centerNode, rightNode] = portfolioManifest.researchWorkbench.whiteboard.nodes;

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.2, 1.2, 0.02]} />
        <HorrorMaterial color="#1a2026" roughness={0.4} metalness={0.8} />
      </mesh>

      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[2.14, 1.14]} />
        <meshStandardMaterial color="#00aacc" transparent opacity={0.35} roughness={0.1} metalness={0.9} />
      </mesh>

      <Text
        position={[0, 0.42, 0.025]}
        fontSize={0.05}
        color="#aaccff"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {portfolioManifest.researchWorkbench.whiteboard.title}
      </Text>

      <group position={[0, 0.05, 0.025]}>
        <Text position={[-0.7, 0.15, 0]} fontSize={0.035} color="#00ff99" anchorX="center" material-toneMapped={false}>
          {leftNode.title}
        </Text>
        <Text position={[-0.7, 0.05, 0]} fontSize={0.022} color="#aaccff" anchorX="center" maxWidth={0.48} lineHeight={1.2} material-toneMapped={false}>
          {leftNode.subtitle}
        </Text>

        <Text position={[-0.3, 0.15, 0]} fontSize={0.035} color="#aaccff" anchorX="center" material-toneMapped={false}>
          {"->"}
        </Text>

        <Text position={[0, 0.15, 0]} fontSize={0.035} color="#00ff99" anchorX="center" material-toneMapped={false}>
          {centerNode.title}
        </Text>
        <Text position={[0, 0.05, 0]} fontSize={0.022} color="#aaccff" anchorX="center" maxWidth={0.48} lineHeight={1.2} material-toneMapped={false}>
          {centerNode.subtitle}
        </Text>

        <Text position={[0.4, 0.15, 0]} fontSize={0.035} color="#aaccff" anchorX="center" material-toneMapped={false}>
          {"->"}
        </Text>

        <Text position={[0.75, 0.15, 0]} fontSize={0.035} color="#00ff99" anchorX="center" material-toneMapped={false}>
          {rightNode.title}
        </Text>
        <Text position={[0.75, 0.05, 0]} fontSize={0.022} color="#aaccff" anchorX="center" maxWidth={0.48} lineHeight={1.2} material-toneMapped={false}>
          {rightNode.subtitle}
        </Text>
      </group>

      <Text
        position={[0, -0.38, 0.025]}
        fontSize={0.022}
        color="#aaccff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.9}
        lineHeight={1.2}
        material-toneMapped={false}
      >
        {portfolioManifest.researchWorkbench.whiteboard.footer}
      </Text>
    </group>
  );
}
