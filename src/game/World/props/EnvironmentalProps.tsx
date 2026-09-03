import React from "react";
import { FacilityMaterial } from "../materials/FacilityMaterials";

type Position = [number, number, number];
type Rotation = [number, number, number];

/**
 * Corrugated Cardboard Archive Storage Box (Single or Stacked)
 */
export function ArchiveBoxStack({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  count = 2,
}: {
  position?: Position;
  rotation?: Rotation;
  count?: 1 | 2 | 3;
  label?: string;
}) {
  const boxHeight = 0.32;
  const boxWidth = 0.45;
  const boxDepth = 0.35;

  return (
    <group position={position} rotation={rotation}>
      {Array.from({ length: count }).map((_, i) => {
        const yOffset = i * (boxHeight + 0.005);
        const slightTwist = (i % 2 === 1 ? 0.04 : -0.02) * (i > 0 ? 1 : 0);
        return (
          <group key={i} position={[0, yOffset + boxHeight / 2, 0]} rotation={[0, slightTwist, 0]}>
            {/* Box Body */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[boxWidth, boxHeight, boxDepth]} />
              <FacilityMaterial kind="painted-plaster" color={i === 0 ? "#827158" : "#917e63"} />
            </mesh>
            {/* Lid Rim */}
            <mesh position={[0, boxHeight / 2 - 0.02, 0]} castShadow>
              <boxGeometry args={[boxWidth + 0.015, 0.045, boxDepth + 0.015]} />
              <FacilityMaterial kind="painted-plaster" color="#73624c" />
            </mesh>
            {/* White Label Strip */}
            <mesh position={[0, 0, boxDepth / 2 + 0.001]}>
              <planeGeometry args={[0.22, 0.09]} />
              <meshBasicMaterial color="#e8dfce" toneMapped={false} />
            </mesh>
            {/* Handle Cutout */}
            <mesh position={[0, 0.04, boxDepth / 2 + 0.002]}>
              <planeGeometry args={[0.08, 0.025]} />
              <meshBasicMaterial color="#332a20" toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/**
 * Desk Paperwork Batch with Binder Clip / Folder Cover
 */
export function PaperworkStack({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  sheets = 12,
  folderColor = "#2b3b4c",
}: {
  position?: Position;
  rotation?: Rotation;
  sheets?: number;
  folderColor?: string;
}) {
  const stackHeight = 0.003 * Math.min(sheets, 20);

  return (
    <group position={position} rotation={rotation}>
      {/* Manila / Blue Card Folder Base */}
      <mesh position={[0, stackHeight / 2, 0]} receiveShadow>
        <boxGeometry args={[0.24, stackHeight, 0.32]} />
        <meshStandardMaterial color={folderColor} roughness={0.85} />
      </mesh>
      {/* Paper Top Leaf */}
      <mesh position={[0.005, stackHeight + 0.001, 0.005]} rotation={[-Math.PI / 2, 0, 0.02]}>
        <planeGeometry args={[0.21, 0.297]} />
        <meshStandardMaterial color="#f2eee4" roughness={0.9} />
      </mesh>
      {/* Metal Binder Clip */}
      <mesh position={[-0.09, stackHeight + 0.005, 0.12]} castShadow>
        <boxGeometry args={[0.03, 0.01, 0.015]} />
        <FacilityMaterial kind="painted-metal" color="#1a1a1a" />
      </mesh>
    </group>
  );
}

/**
 * Floor Scuff Mark Decal (Subtle abrasion under desk chairs or doorways)
 */
export function FloorScuffDecal({
  position = [0, 0.008, 0],
  rotation = [-Math.PI / 2, 0, 0],
  scale = [1.2, 0.8],
  opacity = 0.45,
}: {
  position?: Position;
  rotation?: Rotation;
  scale?: [number, number];
  opacity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={[scale[0], scale[1]]} />
      <meshBasicMaterial
        color="#080808"
        transparent
        opacity={opacity}
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-2}
      />
    </mesh>
  );
}

/**
 * Wall/Ceiling Water Stain Decal under pipe runs
 */
export function WaterStainDecal({
  position = [0, 2.9, 0],
  rotation = [Math.PI / 2, 0, 0],
  size = 0.9,
  opacity = 0.38,
}: {
  position?: Position;
  rotation?: Rotation;
  size?: number;
  opacity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={[size, size * 0.75]} />
      <meshBasicMaterial
        color="#2b2318"
        transparent
        opacity={opacity}
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-2}
      />
    </mesh>
  );
}

/**
 * Industrial Wall/Ceiling Electrical Conduit Run with Junction Box
 */
export function CableConduitRun({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  length = 4,
}: {
  position?: Position;
  rotation?: Rotation;
  length?: number;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Metal Pipe */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, length, 8]} />
        <FacilityMaterial kind="painted-metal" color="#4a525a" />
      </mesh>
      {/* Junction Box at center */}
      <mesh position={[0, 0, 0.03]} castShadow>
        <boxGeometry args={[0.12, 0.12, 0.06]} />
        <FacilityMaterial kind="painted-metal" color="#353c44" />
      </mesh>
    </group>
  );
}

/**
 * Server Rack Cable Bundle (Floor loom / drop cables)
 */
export function ServerCableBundle({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  length = 1.5,
}: {
  position?: Position;
  rotation?: Rotation;
  length?: number;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main black conduit sleeve */}
      <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, length, 8]} />
        <meshStandardMaterial color="#111111" roughness={0.7} />
      </mesh>
      {/* Colored patch cable breakout */}
      <mesh position={[length / 2 - 0.1, 0.025, 0.02]} rotation={[0, 0.2, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.3, 6]} />
        <meshStandardMaterial color="#2d72d9" roughness={0.6} />
      </mesh>
      <mesh position={[length / 2 - 0.1, 0.025, -0.02]} rotation={[0, -0.2, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.3, 6]} />
        <meshStandardMaterial color="#d9822b" roughness={0.6} />
      </mesh>
    </group>
  );
}

/**
 * Whiteboard Marker Tray with Pens
 */
export function MarkerTray({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 0.8,
}: {
  position?: Position;
  rotation?: Rotation;
  width?: number;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Aluminum Tray */}
      <mesh castShadow>
        <boxGeometry args={[width, 0.015, 0.08]} />
        <FacilityMaterial kind="painted-metal" color="#666666" />
      </mesh>
      {/* Markers */}
      <mesh position={[-0.15, 0.012, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.007, 0.007, 0.14, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      <mesh position={[0.0, 0.012, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.007, 0.007, 0.14, 8]} />
        <meshStandardMaterial color="#b32d2e" roughness={0.5} />
      </mesh>
      <mesh position={[0.15, 0.012, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.007, 0.007, 0.14, 8]} />
        <meshStandardMaterial color="#1e5cb3" roughness={0.5} />
      </mesh>
      {/* Felt Eraser Block */}
      <mesh position={[width / 2 - 0.08, 0.018, 0]} castShadow>
        <boxGeometry args={[0.1, 0.025, 0.045]} />
        <meshStandardMaterial color="#2d3748" roughness={0.9} />
      </mesh>
    </group>
  );
}

/**
 * Standing Hall Coat Rack with hanging staff jacket
 */
export function CoatRack({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: Position;
  rotation?: Rotation;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Heavy Base */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.06, 16]} />
        <FacilityMaterial kind="painted-metal" color="#222" />
      </mesh>
      {/* Main Pole */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 1.8, 12]} />
        <FacilityMaterial kind="painted-metal" color="#2c333a" />
      </mesh>
      {/* Pegs */}
      <mesh position={[0.08, 1.65, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <FacilityMaterial kind="painted-metal" color="#666" />
      </mesh>
      <mesh position={[-0.08, 1.65, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <FacilityMaterial kind="painted-metal" color="#666" />
      </mesh>
      {/* Hanging Lab Coat / Jacket */}
      <mesh position={[0.06, 1.25, 0]} rotation={[0, 0, 0.08]} castShadow>
        <boxGeometry args={[0.14, 0.75, 0.28]} />
        <meshStandardMaterial color="#4a5568" roughness={0.9} />
      </mesh>
    </group>
  );
}
