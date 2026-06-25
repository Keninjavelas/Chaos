import React from "react";
import { RoomProps } from "../types";
import { RoomFloor, RoomCeiling, RoomWall } from "../props/RoomArchitecture";
import { InteractableObject } from "../../Gameplay/InteractableObject";
import { useArchiveStore } from "@/lib/state";

export function ElevatorLobby({ position }: RoomProps) {
  const { setTeleportTarget } = useArchiveStore();
  // Center is global X=0, Z=-8.
  // Room is 6x6m (X: -3 to 3, Z: -3 to 3 relative)
  // Front of the lobby (Relative Z=2.5) aligns perfectly with the Reception Security Gate (Global Z=-5.5).
  // The Elevator sits at the back (Relative Z=-3).

  return (
    <group position={position}>
      {/* ─── ARCHITECTURE ─── */}
      <RoomFloor args={[6, 6]} position={[0, -0.5, 0]} />
      <RoomCeiling args={[6, 0.1, 6]} position={[0, 3.4, 0]} hasLights={false} />

      {/* Left Wall */}
      <RoomWall position={[-3, 0, 0]} args={[0.2, 3.9, 6]} />
      {/* Right Wall */}
      <RoomWall position={[3, 0, 0]} args={[0.2, 3.9, 6]} />
      
      {/* Front Wall (Facing the Gate) - Mostly open so the player can see inside */}
      <RoomWall position={[-2.25, 0, 2.5]} args={[1.5, 3.9, 0.2]} />
      <RoomWall position={[2.25, 0, 2.5]} args={[1.5, 3.9, 0.2]} />

      {/* Rear Wall (Z=-3) */}
      <RoomWall position={[-2, 0, -3]} args={[2, 3.9, 0.2]} />
      <RoomWall position={[2, 0, -3]} args={[2, 3.9, 0.2]} />

      {/* ─── THE ELEVATOR ─── */}
      <group position={[0, 0, -3]}>
        {/* Elevator Door Frame */}
        <mesh position={[0, 1.2, 0]}><boxGeometry args={[2.2, 2.5, 0.2]} /><meshStandardMaterial color="#111" roughness={0.8} /></mesh>
        
        {/* Elevator Doors (Closed) */}
        <mesh position={[-0.5, 1.2, 0.1]}><boxGeometry args={[1.0, 2.4, 0.05]} /><meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.8} /></mesh>
        <mesh position={[0.5, 1.2, 0.1]}><boxGeometry args={[1.0, 2.4, 0.05]} /><meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.8} /></mesh>
        
        {/* Call Button Panel */}
        <InteractableObject 
          position={[1.3, 1.2, 0.1]} 
          size={[0.3, 0.5, 0.05]} 
          label="CALL ELEVATOR" 
          color="#501010" 
          onInteract={() => setTeleportTarget([0, -48, 0])} 
        />
      </group>

      {/* ─── SCENERY & DIRT ─── */}
      {/* Debris on the lobby floor */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`lobby-debris-${i}`} position={[-2 + Math.random()*4, -0.49, -2 + Math.random()*4]} rotation={[-Math.PI/2, 0, Math.random()*Math.PI]}>
          <planeGeometry args={[0.3, 0.4]} />
          <meshStandardMaterial color={Math.random() > 0.5 ? "#ccc" : "#444"} roughness={0.9} />
        </mesh>
      ))}

      {/* Large blood/dirt stain leading to the elevator */}
      <mesh position={[0, -0.48, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[2, 4]} />
        <meshStandardMaterial color="#0a0a0a" transparent opacity={0.6} />
      </mesh>

    </group>
  );
}
