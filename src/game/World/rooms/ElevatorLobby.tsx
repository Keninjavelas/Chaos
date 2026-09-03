import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoomProps } from "../types";
import { RoomFloor, RoomCeiling, RoomWall, ElevatorDoor } from "../props/RoomArchitecture";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useArchiveStore } from "@/lib/state";
import { HorrorMaterial } from "../materials/HorrorMaterial";
import { ContactTerminalStation } from "../props/PortfolioExhibits";
import { InstancedDebris } from "../props/InstancedDebris";

function ElevatorLight({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame(({ clock }) => {
    if (lightRef.current) {
      const time = clock.getElapsedTime() % 1.8;
      lightRef.current.intensity = time < 1.5 ? 6.0 : 0.0;
    }
  });

  return <pointLight ref={lightRef} position={position} intensity={6.0} color="#B00000" distance={15} decay={2} castShadow shadow-mapSize={[512, 512]} shadow-bias={-0.001} />;
}

export function ElevatorLobby({ position }: RoomProps) {
  const { setTeleportTarget, isBlackout } = useArchiveStore();

  return (
    <group position={position}>
      {!isBlackout && (
        <group>
          <ElevatorLight position={[0, 2.8, 1.6]} />
          <pointLight position={[-4.5, 2, 3]} intensity={2.0} color="#BFD5FF" distance={15} decay={2} />
        </group>
      )}
      {/* ─── ARCHITECTURE ─── */}
      <RoomFloor args={[6.5, 6.5]} position={[0, -0.5, 0.25]} />
      <RoomCeiling args={[6.5, 0.1, 6.5]} position={[0, 3.2, 0.25]} hasLights={false} />

      {/* Left Wall */}
      <RoomWall position={[-3, 0, 0]} args={[0.2, 3.2, 6]} />
      {/* Right Wall */}
      <RoomWall position={[3, 0, 0]} args={[0.2, 3.2, 6]} />
      
      {/* Front Wall (Facing the Security Gate) */}
      <RoomWall position={[-2.25, 0, 2.5]} args={[1.5, 3.2, 0.2]} />
      <RoomWall position={[2.25, 0, 2.5]} args={[1.5, 3.2, 0.2]} />

      {/* Rear Wall (Z=-3) */}
      <RoomWall position={[-2, 0, -3]} args={[2, 3.2, 0.2]} />
      <RoomWall position={[2, 0, -3]} args={[2, 3.2, 0.2]} />

      {/* ─── CONTACT / RECRUITER TERMINAL STATION ─── */}
      <ContactTerminalStation position={[-1.8, 0, -0.8]} rotation={[0, 0.4, 0]} />

      {/* ─── THE ELEVATOR ─── */}
      <group position={[0, 0, -3]}>
        <ElevatorDoor position={[0, 0, 0]} />
        
        {/* Call Button Panel */}
        <InteractableObject 
          label="Elevator call panel"
          interactionKind="USE"
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
      <InstancedDebris count={12} areaSize={[4, 4]} position={[0, -0.485, 0]} type="paper" />

      {/* Stain leading to the elevator */}
      <mesh position={[0, -0.48, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[2, 4]} />
        <meshBasicMaterial color="#0a0a0a" transparent opacity={0.8} depthWrite={false} />
      </mesh>

    </group>
  );
}
