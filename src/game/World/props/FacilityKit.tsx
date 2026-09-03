import React from "react";
import { Text } from "@react-three/drei";
import {
  CeilingPipes,
  HVACVent,
  InstitutionalDoor,
  RoomCeiling,
  RoomFloor,
  RoomWall,
  StructuralColumn,
} from "./RoomArchitecture";
import { FacilityMaterial } from "../materials/FacilityMaterials";

type Position = [number, number, number];
type Rotation = [number, number, number];

export const FacilityFloorSection = RoomFloor;
export const FacilityCeilingGrid = RoomCeiling;
export const FacilityWallSegment = RoomWall;
export const FacilityDoorFrame = InstitutionalDoor;
export const FacilityColumn = StructuralColumn;
export const FacilityPipe = CeilingPipes;
export const FacilityVent = HVACVent;

export function FacilityWallCorner({ position, size = 1, height = 3.2 }: { position: Position; size?: number; height?: number }) {
  return (
    <group position={position}>
      <RoomWall position={[size / 2, 0, 0]} args={[size, height, 0.2]} />
      <RoomWall position={[0, 0, size / 2]} args={[0.2, height, size]} />
    </group>
  );
}

export function FacilitySignPanel({ position, rotation = [0, 0, 0], title, subtitle, accent = "#d6e7de" }: { position: Position; rotation?: Rotation; title: string; subtitle?: string; accent?: string }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh><boxGeometry args={[2.1, subtitle ? 0.34 : 0.22, 0.025]} /><FacilityMaterial kind="painted-metal" color="#26302d" /></mesh>
      <Text position={[0, subtitle ? 0.06 : 0, 0.02]} fontSize={0.075} color={accent} anchorX="center" material-toneMapped={false}>{title}</Text>
      {subtitle && <Text position={[0, -0.085, 0.02]} fontSize={0.042} color="#b7c9c0" anchorX="center" material-toneMapped={false}>{subtitle}</Text>}
    </group>
  );
}

export function FacilityShelf({ position, rotation = [0, 0, 0], width = 1.4, height = 1.8 }: { position: Position; rotation?: Rotation; width?: number; height?: number }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[-width / 2, height / 2, 0]}><boxGeometry args={[0.06, height, 0.38]} /><FacilityMaterial kind="rusted-metal" /></mesh>
      <mesh position={[width / 2, height / 2, 0]}><boxGeometry args={[0.06, height, 0.38]} /><FacilityMaterial kind="rusted-metal" /></mesh>
      {[0.16, 0.6, 1.04, 1.48].filter((level) => level < height).map((level) => (
        <mesh key={level} position={[0, level, 0]}><boxGeometry args={[width, 0.045, 0.38]} /><FacilityMaterial kind="rusted-metal" /></mesh>
      ))}
    </group>
  );
}
