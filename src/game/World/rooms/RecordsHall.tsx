import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { RoomProps } from "../types";
import { RoomFloor, RoomCeiling, RoomWall, CeilingPipes, HVACVent, InstitutionalDoor } from "../props/RoomArchitecture";
import { FilingCabinet } from "../props/FilingCabinet";
import { DocumentProp } from "../props/DocumentProp";
import { HorrorMaterial } from "../materials/HorrorMaterial";

function BrokenFluorescent({ position, castShadow = false }: { position: [number, number, number], castShadow?: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const timer = useRef(0);
  const isOff = useRef(false);

  useFrame((_, delta) => {
    if (!lightRef.current) return;
    timer.current -= delta;
    if (timer.current <= 0) {
      if (isOff.current) {
        lightRef.current.intensity = 1.0 + Math.random() * 2.0;
        isOff.current = false;
        timer.current = 1 + Math.random() * 3;
      } else {
        lightRef.current.intensity = 0;
        isOff.current = true;
        timer.current = 0.1 + Math.random() * 0.5;
      }
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, -0.05, 0]} castShadow={castShadow}><boxGeometry args={[1.2, 0.1, 0.3]} /><HorrorMaterial color="#111" roughness={0.6} /></mesh>
      <pointLight ref={lightRef} color="#E5E3D4" distance={10} decay={2} intensity={0} castShadow={castShadow} shadow-mapSize={[512, 512]} shadow-bias={-0.001} />
    </group>
  );
}

function WorkingFluorescent({ position, castShadow = false }: { position: [number, number, number], castShadow?: boolean }) {
  return (
    <group position={position}>
        <mesh position={[0, -0.05, 0]}><boxGeometry args={[1.2, 0.1, 0.4]} /><meshStandardMaterial color="#fff" emissive="#ddddff" emissiveIntensity={0.8} /></mesh>
      <pointLight color="#E5E3D4" distance={12} decay={2} intensity={4.0} castShadow={castShadow} shadow-mapSize={[512, 512]} shadow-bias={-0.002} />
    </group>
  );
}

function ArchiveShelf({ position, rotation = [0,0,0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Shelf Frame */}
      <mesh position={[-0.8, 1, 0]}><boxGeometry args={[0.05, 2, 0.3]} /><meshStandardMaterial color="#3a2b1d" roughness={0.8} /></mesh>
      <mesh position={[0.8, 1, 0]}><boxGeometry args={[0.05, 2, 0.3]} /><meshStandardMaterial color="#3a2b1d" roughness={0.8} /></mesh>
      <mesh position={[0, 1.9, 0]}><boxGeometry args={[1.65, 0.05, 0.3]} /><meshStandardMaterial color="#3a2b1d" roughness={0.8} /></mesh>
      
      {/* Shelves */}
      <mesh position={[0, 1.5, 0]}><boxGeometry args={[1.6, 0.03, 0.28]} /><meshStandardMaterial color="#4a3b2d" roughness={0.7} /></mesh>
      <mesh position={[0, 1, 0]}><boxGeometry args={[1.6, 0.03, 0.28]} /><meshStandardMaterial color="#4a3b2d" roughness={0.7} /></mesh>
      <mesh position={[0, 0.5, 0]}><boxGeometry args={[1.6, 0.03, 0.28]} /><meshStandardMaterial color="#4a3b2d" roughness={0.7} /></mesh>
      <mesh position={[0, 0.05, 0]}><boxGeometry args={[1.6, 0.03, 0.28]} /><meshStandardMaterial color="#4a3b2d" roughness={0.7} /></mesh>
    </group>
  );
}

function ArchiveBox({ position, rotation = [0,0,0], color = "#5a4a3a" }: { position: [number, number, number], rotation?: [number, number, number], color?: string }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={[0.35, 0.25, 0.2]} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  );
}

export function RecordsHall({ position }: RoomProps) {
  return (
    <group position={position}>
      {/* Room Architecture - Proper institutional scale (8.5m x 10.5m) */}
      <RoomFloor args={[8.5, 10.5]} position={[0, -0.5, -0.25]} />
      <RoomCeiling args={[8.5, 0.1, 10.5]} position={[0, 2.9, -0.25]} hasLights={false} />
      
      {/* Walls */}
      <RoomWall position={[0, 0, -5]} args={[8, 3.2, 0.2]} /> {/* Rear (South) */}
      <RoomWall position={[-4, 0, 0]} args={[0.2, 3.2, 10]} /> {/* Left (West) */}
      <RoomWall position={[4, 0, 0]} args={[0.2, 3.2, 10]} /> {/* Right (East) */}
      {/* North Wall (3.0m Open Suite Entrance Flush with Corridor) */}
      <RoomWall position={[-2.75, 0, 5]} args={[2.5, 3.2, 0.2]} />
      <RoomWall position={[2.75, 0, 5]} args={[2.5, 3.2, 0.2]} />
      <mesh position={[0, 3.0, 5]}>
        <boxGeometry args={[3.0, 0.4, 0.2]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Ceiling Elements */}
      <CeilingPipes position={[-2, 2.75, 0]} rotation={[0, -Math.PI/2, 0]} length={8} />
      <CeilingPipes position={[2, 2.75, 0]} rotation={[0, -Math.PI/2, 0]} length={8} />
      <HVACVent position={[0, 2.65, -3]} />
      <HVACVent position={[0, 2.65, 3]} />

      {/* Lighting - Mostly dark, one flickering, one working */}
      <WorkingFluorescent position={[-2, 2.9, 0]} />
      <BrokenFluorescent position={[2, 2.9, 0]} />
      <pointLight position={[-2, 2.9, -3]} color="#ff3333" intensity={1.5} distance={4} decay={2} /> {/* Red emergency light */}

      {/* Archive Shelves - Organized aisles */}
      <ArchiveShelf position={[-2, 0, -3]} />
      <ArchiveShelf position={[-2, 0, -0.5]} />
      <ArchiveShelf position={[-2, 0, 2]} />
      
      <ArchiveShelf position={[2, 0, -3]} rotation={[0, Math.PI, 0]} />
      <ArchiveShelf position={[2, 0, -0.5]} rotation={[0, Math.PI, 0]} />
      <ArchiveShelf position={[2, 0, 2]} rotation={[0, Math.PI, 0]} />

      {/* Rolling Storage Cabinets against back wall */}
      <FilingCabinet position={[-3, 0, -4.5]} rotation={[0, Math.PI/2, 0]} />
      <FilingCabinet position={[-1, 0, -4.5]} rotation={[0, Math.PI/2, 0]} />
      <FilingCabinet position={[1, 0, -4.5]} rotation={[0, Math.PI/2, 0]} />
      <FilingCabinet position={[3, 0, -4.5]} rotation={[0, Math.PI/2, 0]} />

      {/* Archive Boxes on shelves */}
      <ArchiveBox position={[-2, 1.7, -2.9]} color="#6a5a4a" />
      <ArchiveBox position={[-1.8, 1.7, -2.9]} color="#5a4a3a" rotation={[0, 0.2, 0]} />
      <ArchiveBox position={[-2, 1.2, -2.9]} color="#7a6a5a" />
      <ArchiveBox position={[-2.2, 0.7, -2.9]} color="#4a3a2a" />
      
      <ArchiveBox position={[2, 1.7, -2.9]} color="#6a5a4a" rotation={[0, Math.PI, 0]} />
      <ArchiveBox position={[1.8, 1.2, -2.9]} color="#5a4a3a" rotation={[0, Math.PI - 0.1, 0]} />

      {/* Fallen boxes (searched look) */}
      <ArchiveBox position={[0, -0.35, -1]} color="#5a4a3a" rotation={[0.3, 0.5, 0.2]} />
      <ArchiveBox position={[-0.5, -0.38, -0.8]} color="#4a3a2a" rotation={[-0.2, 0.8, 0.1]} />
      <mesh position={[0.3, -0.45, -1.2]} rotation={[-Math.PI/2, 0.3, 0]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial color="#ddd" roughness={0.9} />
      </mesh>
      <mesh position={[-0.2, -0.46, -0.9]} rotation={[-Math.PI/2 + 0.1, -0.2, 0]}>
        <planeGeometry args={[0.25, 0.18]} />
        <meshStandardMaterial color="#eee" roughness={0.9} />
      </mesh>

      {/* Documents on the floor */}
      <DocumentProp position={[0.5, -0.45, 1]} rotation={[-Math.PI/2, 0.4, 0]}
        document={{ id: "DOC-001", title: "PATIENT RECORDS - 1995", type: "note", content: "Confidential: Access restricted to authorized personnel only." }} />
      <DocumentProp position={[-1, -0.46, 2.5]} rotation={[-Math.PI/2, -0.3, 0.1]}
        document={{ id: "DOC-002", title: "INCIDENT REPORT - 10/12", type: "note", content: "Unidentified movement detected in Sublevel 1. Security dispatched." }} />

      {/* Sorting Table against left wall */}
      <group position={[-3.5, 0, 1]} rotation={[0, 0, 0]}>
        <mesh position={[0, 0.9, 0]}><boxGeometry args={[0.8, 0.05, 1.5]} /><meshStandardMaterial color="#4a3b2d" roughness={0.8} /></mesh>
        <mesh position={[-0.35, 0.45, -0.6]}><cylinderGeometry args={[0.04, 0.04, 0.9]} /><meshStandardMaterial color="#333" /></mesh>
        <mesh position={[0.35, 0.45, -0.6]}><cylinderGeometry args={[0.04, 0.04, 0.9]} /><meshStandardMaterial color="#333" /></mesh>
        <mesh position={[-0.35, 0.45, 0.6]}><cylinderGeometry args={[0.04, 0.04, 0.9]} /><meshStandardMaterial color="#333" /></mesh>
        <mesh position={[0.35, 0.45, 0.6]}><cylinderGeometry args={[0.04, 0.04, 0.9]} /><meshStandardMaterial color="#333" /></mesh>
        
        {/* Table clutter */}
        <ArchiveBox position={[0, 1.05, -0.3]} color="#7a6a5a" />
        <mesh position={[0.2, 1.0, 0.2]} rotation={[-Math.PI/2, 0.1, 0]}>
          <planeGeometry args={[0.3, 0.2]} />
          <meshStandardMaterial color="#ddd" roughness={0.9} />
        </mesh>
      </group>

      {/* Document Rack against right wall */}
      <group position={[3.5, 0, -2]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 1.5, 0]}><boxGeometry args={[0.1, 1.5, 0.8]} /><meshStandardMaterial color="#444" roughness={0.8} /></mesh>
        <mesh position={[0, 1.8, 0]}><boxGeometry args={[0.15, 0.05, 0.85]} /><meshStandardMaterial color="#333" roughness={0.9} /></mesh>
        <mesh position={[0, 1.2, 0]}><boxGeometry args={[0.15, 0.05, 0.85]} /><meshStandardMaterial color="#333" roughness={0.9} /></mesh>
        <mesh position={[0, 0.6, 0]}><boxGeometry args={[0.15, 0.05, 0.85]} /><meshStandardMaterial color="#333" roughness={0.9} /></mesh>
      </group>

      {/* Section Labels */}
      <Text position={[-3.8, 2.2, -2]} fontSize={0.15} color="#aaa" rotation={[0, Math.PI/2, 0]}>
        PATIENT FILES
      </Text>
      <Text position={[-3.8, 2.2, 1]} fontSize={0.15} color="#aaa" rotation={[0, Math.PI/2, 0]}>
        INCIDENT REPORTS
      </Text>
      <Text position={[3.8, 2.2, -2]} fontSize={0.15} color="#aaa" rotation={[0, -Math.PI/2, 0]}>
        ADMINISTRATIVE
      </Text>
    </group>
  );
}
