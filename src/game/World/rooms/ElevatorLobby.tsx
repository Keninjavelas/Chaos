import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoomProps } from "../types";
import { RoomFloor, RoomCeiling, RoomWall, ElevatorDoor } from "../props/RoomArchitecture";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useArchiveStore } from "@/lib/state";
import { HorrorMaterial } from "../materials/HorrorMaterial";

function ElevatorLight({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame(({ clock }) => {
    if (lightRef.current) {
      const time = clock.getElapsedTime() % 1.8;
      lightRef.current.intensity = time < 1.5 ? 6.0 : 0.0; // reduced from 150
    }
  });

  return <pointLight ref={lightRef} position={position} intensity={6.0} color="#B00000" distance={15} decay={2} castShadow shadow-mapSize={[512, 512]} shadow-bias={-0.001} />;
}

export function ElevatorLobby({ position }: RoomProps) {
  const { setTeleportTarget, isBlackout } = useArchiveStore();
  // Center is global X=0, Z=-8.
  // Room is 6x6m (X: -3 to 3, Z: -3 to 3 relative)
  // Front of the lobby (Relative Z=2.5) aligns perfectly with the Reception Security Gate (Global Z=-5.5).
  // The Elevator sits at the back (Relative Z=-3).

  return (
    <group position={position}>
      {!isBlackout && (
        <group>
          <ElevatorLight position={[0, 2.8, 1.6]} /> {/* Global Z was -6.4, relative Z is 1.6 */}
          {/* Corridor fill light moved here from global lighting and reduced intensity */}
          <pointLight position={[-4.5, 2, 3]} intensity={2.0} color="#BFD5FF" distance={15} decay={2} />
        </group>
      )}
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
      
      {/* Connector walls to Reception (Spans X=3.0 to X=4.5 to seal the void) */}
      <RoomWall position={[-3.75, 0, 2.5]} args={[1.5, 3.9, 0.2]} />
      <RoomWall position={[3.75, 0, 2.5]} args={[1.5, 3.9, 0.2]} />

      {/* Rear Wall (Z=-3) */}
      <RoomWall position={[-2, 0, -3]} args={[2, 3.9, 0.2]} />
      <RoomWall position={[2, 0, -3]} args={[2, 3.9, 0.2]} />

      {/* ─── THE ELEVATOR ─── */}
      <group position={[0, 0, -3]}>
        <ElevatorDoor position={[0, 0, 0]} />
        
        {/* Call Button Panel */}
        <InteractableObject 
          label="CALL ELEVATOR" 
          onInteract={() => setTeleportTarget([0, -48, 0])} 
        >
          <mesh position={[1.3, 1.2, 0.1]} castShadow>
            <boxGeometry args={[0.3, 0.5, 0.05]} />
            <HorrorMaterial color="#111" metalness={0.9} roughness={0.3} noiseScale={1.0} />
          </mesh>
          <mesh position={[1.3, 1.25, 0.13]} rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02]} />
            <meshStandardMaterial color="#333" emissive="#ff3333" emissiveIntensity={0.5} toneMapped={false} />
          </mesh>
        </InteractableObject>
      </group>

      {/* ─── SCENERY & DIRT ─── */}
      {/* Debris on the lobby floor */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`lobby-debris-${i}`} position={[-2 + Math.random()*4, -0.485, -2 + Math.random()*4]} rotation={[-Math.PI/2, 0, Math.random()*Math.PI]} receiveShadow>
          <planeGeometry args={[0.3, 0.4]} />
          <HorrorMaterial color={Math.random() > 0.5 ? "#b8b2a5" : "#444"} roughness={0.9} noiseScale={1.5} />
        </mesh>
      ))}

      {/* Large blood/dirt stain leading to the elevator */}
      <mesh position={[0, -0.48, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[2, 4]} />
        <meshBasicMaterial color="#0a0a0a" transparent opacity={0.8} depthWrite={false} />
      </mesh>

    </group>
  );
}
