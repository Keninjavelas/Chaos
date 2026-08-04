import React from "react";
import { Text } from "@react-three/drei";
import { HorrorMaterial } from "../materials/HorrorMaterial";

interface GlassWhiteboardProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function GlassWhiteboard({ position = [0, 0, 0], rotation = [0, 0, 0] }: GlassWhiteboardProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Aluminum Wall Mount Stand */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.2, 1.2, 0.02]} />
        <HorrorMaterial color="#1a2026" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Translucent Glass Plane */}
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[2.14, 1.14]} />
        <meshStandardMaterial color="#00aacc" transparent opacity={0.35} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Illuminated Architecture Diagram Text */}
      <Text
        position={[0, 0.42, 0.025]}
        fontSize={0.05}
        color="#aaccff"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        LOCAL-FIRST AGENTIC AI ARCHITECTURE
      </Text>

      {/* Diagram Flowchart Nodes */}
      <group position={[0, 0.05, 0.025]}>
        <Text position={[-0.7, 0.15, 0]} fontSize={0.035} color="#00ff99" anchorX="center" material-toneMapped={false}>
          [ LOCAL LLM ]
        </Text>
        <Text position={[-0.7, 0.05, 0]} fontSize={0.022} color="#aaccff" anchorX="center" material-toneMapped={false}>
          Qwen-14B / 16GB VRAM
        </Text>

        <Text position={[-0.3, 0.15, 0]} fontSize={0.035} color="#aaccff" anchorX="center" material-toneMapped={false}>
          →
        </Text>

        <Text position={[0, 0.15, 0]} fontSize={0.035} color="#00ff99" anchorX="center" material-toneMapped={false}>
          [ CONTEXT ENGINE ]
        </Text>
        <Text position={[0, 0.05, 0]} fontSize={0.022} color="#aaccff" anchorX="center" material-toneMapped={false}>
          Zero-Cloud / Vector Store
        </Text>

        <Text position={[0.4, 0.15, 0]} fontSize={0.035} color="#aaccff" anchorX="center" material-toneMapped={false}>
          →
        </Text>

        <Text position={[0.75, 0.15, 0]} fontSize={0.035} color="#00ff99" anchorX="center" material-toneMapped={false}>
          [ HERMES CORE ]
        </Text>
        <Text position={[0.75, 0.05, 0]} fontSize={0.022} color="#aaccff" anchorX="center" material-toneMapped={false}>
          Autonomous Execution
        </Text>
      </group>

      {/* Principles Footnote */}
      <Text
        position={[0, -0.38, 0.025]}
        fontSize={0.025}
        color="#aaccff"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        "Local First → Privacy → Offline → Total Ownership"
      </Text>
    </group>
  );
}
