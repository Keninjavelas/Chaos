import React from "react";
import { RoomFloor, RoomCeiling, RoomWall, ElevatorDoor } from "../props/RoomArchitecture";

interface RoomProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export function ElevatorRoom({ position, rotation = [0, 0, 0] }: RoomProps) {
  // A tiny, dead-end room specifically for the elevator. 4x4.
  return (
    <group position={position} rotation={rotation}>
      {/* ─── ARCHITECTURE ─── */}
      <RoomFloor args={[4, 4]} position={[0, -0.5, 0]} />
      <RoomCeiling args={[4, 1, 4]} position={[0, 2.5, 0]} hasLights={false} />

      {/* Far Back Wall */}
      <RoomWall position={[0, 0, -2]} args={[4, 5, 1]} />
      {/* Left Wall */}
      <RoomWall position={[-2, 0, 0]} args={[1, 5, 4]} />
      {/* Right Wall */}
      <RoomWall position={[2, 0, 0]} args={[1, 5, 4]} />
      
      {/* Front Wall (Gap for entrance) */}
      <RoomWall position={[-1.5, 0, 2]} args={[1, 5, 1]} />
      <RoomWall position={[1.5, 0, 2]} args={[1, 5, 1]} />

      {/* ─── ELEVATOR ─── */}
      <ElevatorDoor position={[0, 0, -1.9]} rotation={[0, 0, 0]} />

      {/* ─── SCENERY ─── */}
      <mesh position={[-1.5, 0, -1]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.6]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
}
