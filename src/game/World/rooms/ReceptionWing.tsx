import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { RoomProps } from "../types";
import { RoomFloor, RoomCeiling, RoomWall } from "../props/RoomArchitecture";
import { ReceptionDesk } from "../props/ReceptionDesk";
import { FilingCabinet } from "../props/FilingCabinet";
import { VisitorChairs } from "../props/RoomArchitecture";
import { NoticeBoard } from "../props/RoomArchitecture";
import { RingingPhone } from "../props/RingingPhone";
import { DocumentProp } from "../props/DocumentProp";
import { useArchiveStore } from "@/lib/state";
function SparkingCable({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const sparkTimerRef = useRef(0);
  const isSparkingRef = useRef(false);
  const sparkDurationRef = useRef(0);

  useFrame((state, delta) => {
    if (!lightRef.current) return;
    
    if (isSparkingRef.current) {
      sparkDurationRef.current -= delta;
      lightRef.current.intensity = Math.random() > 0.3 ? 6.0 : 1.0;
      if (sparkDurationRef.current <= 0) {
        isSparkingRef.current = false;
        lightRef.current.intensity = 0;
        sparkTimerRef.current = 8 + Math.random() * 12; // 8-20 seconds
      }
    } else {
      sparkTimerRef.current -= delta;
      if (sparkTimerRef.current <= 0) {
        isSparkingRef.current = true;
        sparkDurationRef.current = 0.1 + Math.random() * 0.2; // 0.1-0.3 seconds
      }
    }
  });

  return (
    <group position={position}>
      {/* 0.9m Cable */}
      <mesh position={[0, -0.45, 0]} rotation={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.01, 0.01, 0.9]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Spark Light */}
      <pointLight ref={lightRef} position={[0, -0.9, 0]} color="#aaaaff" intensity={0} distance={4} decay={2} />
    </group>
  );
}

export function ReceptionWing({ position, onInteractMap }: RoomProps) {
  return (
    <group position={position}>
      {/* ─── ROOM GEOMETRY ─── */}
      {/* Reception Floor (9x13m) Z from -7.5 to 5.5 - Seamless to prevent physics snags */}
      <RoomFloor position={[0, -0.5, -1]} args={[9, 13]} />

      {/* ─── THE AUTHENTIC CEILING ─── */}
      <group position={[0, 0, 0]}>
        {/* Main Ceiling (2.9m height) */}
        <RoomCeiling position={[0, 2.9, 1.5]} args={[9, 0.1, 8]} hasLights={false} />
        {/* Dropped Ceiling Rear (2.5m height) */}
        <RoomCeiling position={[0, 2.5, -4]} args={[9, 0.1, 3]} hasLights={false} />
        
        {/* Vertical trim to connect the two ceiling heights at Z = -2.5 */}
        <mesh position={[0, 2.7, -2.5]}><boxGeometry args={[9, 0.4, 0.1]} /><meshStandardMaterial color="#444" /></mesh>

        {/* Support Columns moved deeper to Z = -3.5 (0.6 x 0.6 x 3.2m) */}
        <mesh position={[-2.5, 1.1, -3.5]}><boxGeometry args={[0.6, 3.2, 0.6]} /><meshStandardMaterial color="#2a2a2a" roughness={0.9} /></mesh>
        <mesh position={[2.5, 1.1, -3.5]}><boxGeometry args={[0.6, 3.2, 0.6]} /><meshStandardMaterial color="#2a2a2a" roughness={0.9} /></mesh>

        {/* 3 Missing Acoustic Panels (Black Holes) in Main Ceiling */}
        <mesh position={[-1.5, 2.85, 2]}><boxGeometry args={[1.2, 0.2, 1.2]} /><meshBasicMaterial color="#000" /></mesh>
        <mesh position={[3, 2.85, 4]}><boxGeometry args={[1.2, 0.2, 1.2]} /><meshBasicMaterial color="#000" /></mesh>
        <mesh position={[2, 2.85, 0]}><boxGeometry args={[1.2, 0.2, 1.2]} /><meshBasicMaterial color="#000" /></mesh>

        {/* 2 Large Exposed Pipes */}
        <mesh position={[-1.5, 2.75, 1.5]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.08, 0.08, 8]} /><meshStandardMaterial color="#222" metalness={0.6} /></mesh>
        <mesh position={[2.5, 2.75, 1.5]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.05, 0.05, 8]} /><meshStandardMaterial color="#3a2a2a" metalness={0.8} /></mesh>

        {/* Exposed HVAC Vent */}
        <mesh position={[0, 2.8, 3]}><boxGeometry args={[1.5, 0.3, 1.5]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} /></mesh>
        <mesh position={[0, 2.7, 3]}><planeGeometry args={[1.4, 1.4]} rotation={[Math.PI/2, 0, 0]} /><meshStandardMaterial color="#050505" /></mesh>

        {/* Sparking Dangling Cable */}
        <SparkingCable position={[1.5, 2.9, -1]} />
      </group>

      {/* ─── WALLS & BOUNDARIES ─── */}
      {/* Front Wall (Z = 5.5) with Doorway */}
      <RoomWall position={[-2.75, 0, 5.5]} args={[4.5, 3.2, 0.2]} />
      <RoomWall position={[2.75, 0, 5.5]} args={[4.5, 3.2, 0.2]} />
      <mesh position={[0, 2.6, 5.5]}><boxGeometry args={[1, 1.2, 0.2]} /><meshStandardMaterial color="#444" /></mesh>

      {/* Right Wall (X = 4.5) with Corridor Cutout at Z = -3 */}
      <RoomWall position={[4.5, 0, 1.75]} args={[0.2, 3.2, 7.5]} /> {/* Front part */}
      <RoomWall position={[4.5, 0, -4.75]} args={[0.2, 3.2, 1.5]} /> {/* Back part */}
      <mesh position={[4.5, 2.8, -3]}><boxGeometry args={[0.2, 0.8, 2]} /><meshStandardMaterial color="#444" /></mesh> {/* Door header */}

      {/* Left Wall (X = -4.5) with Corridor Cutout at Z = -5 */}
      {/* Front part goes from Z=5.5 to Z=-4 (Length 9.5) */}
      <RoomWall position={[-4.5, 0, 0.75]} args={[0.2, 3.2, 9.5]} />
      {/* Back part goes from Z=-6 to Z=-6.5 (Length 0.5) */}
      <RoomWall position={[-4.5, 0, -6.25]} args={[0.2, 3.2, 0.5]} />

      {/* ─── LEFT CORRIDOR & T-JUNCTION (Leads to X=-15, Z=-5) ─── */}
      <mesh position={[-4.5, 2.8, -5]}><boxGeometry args={[0.2, 0.8, 2]} /><meshStandardMaterial color="#444" /></mesh>
      
      <group position={[0, 0, 0]}>
        {/* Corridor Floor (X: -4.5 to -14.0, depth 4 to go under walls) */}
        <RoomFloor position={[-9.25, -0.5, -5]} args={[9.5, 4]} />
        <RoomCeiling position={[-9.25, 2.5, -5]} args={[9.5, 0.1, 4]} hasLights={false} />
        
        {/* T-Junction Floor (X: -14.0 to -16.0, depth 2 to perfectly meet doorways without overlapping) */}
        <RoomFloor position={[-15.0, -0.5, -5]} args={[2.0, 2]} />
        <RoomCeiling position={[-15.0, 2.5, -5]} args={[2.0, 0.1, 2]} hasLights={false} />
        
        {/* Side Walls stop at X=-14 so they don't block the T-Junction doorways */}
        <RoomWall position={[-9.25, 0, -6]} args={[9.7, 3.2, 0.2]} />
        <RoomWall position={[-9.25, 0, -4]} args={[9.7, 3.2, 0.2]} />
        
        {/* End Cap Wall at the far side of the T-Junction (X=-16) */}
        <RoomWall position={[-16, 0, -5]} args={[0.2, 3.2, 2.0]} />
      </group>

      {/* ─── SECURITY GATE (Z = -5.5) ─── */}
      {/* Rear Wall with 3m wide cutout for the gate */}
      <RoomWall position={[-3, 0, -5.5]} args={[3, 3.2, 0.2]} />
      <RoomWall position={[3, 0, -5.5]} args={[3, 3.2, 0.2]} />
      <mesh position={[0, 2.8, -5.5]}><boxGeometry args={[3, 0.8, 0.2]} /><meshStandardMaterial color="#444" /></mesh>

      {/* The Gate Bars */}
      <group position={[0, 0, -5.5]}>
        {/* Actual vertical bars */}
        {Array.from({ length: 15 }).map((_, i) => (
          <mesh key={`bar-${i}`} position={[-1.4 + i*0.2, 1.2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 2.4]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.5} />
          </mesh>
        ))}
        {/* Horizontal Crossbars */}
        <mesh position={[0, 0.5, 0]}><boxGeometry args={[3, 0.05, 0.05]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} /></mesh>
        <mesh position={[0, 1.5, 0]}><boxGeometry args={[3, 0.05, 0.05]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} /></mesh>
        
        {/* Gate Frame */}
        <mesh position={[-1.5, 1.2, 0]}><boxGeometry args={[0.1, 2.4, 0.1]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[1.5, 1.2, 0]}><boxGeometry args={[0.1, 2.4, 0.1]} /><meshStandardMaterial color="#111" /></mesh>
      </group>

      {/* ─── RECEPTION DESK (Z = -1.5) ─── */}
      <ReceptionDesk 
        position={[0, -0.5, -1.5]} 
        rotation={[0, 0, 0]}
        onInteractMap={onInteractMap}
      />

      {/* Desk Storytelling Layout */}
      <mesh position={[-1.2, 0.61, -1.5]}><boxGeometry args={[0.2, 0.1, 0.15]} /><meshStandardMaterial color="#111" /></mesh>
      <mesh position={[0, 0.61, -1.5]} rotation={[0, 0.1, 0]}><planeGeometry args={[0.4, 0.3]} rotation={[-Math.PI/2, 0, 0]} /><meshStandardMaterial color="#ccc" /></mesh>
      <mesh position={[1.2, 0.65, -1.6]}><cylinderGeometry args={[0.1, 0.15, 0.1]} /><meshStandardMaterial color="#222" /></mesh>
      <DocumentProp position={[0.3, 0.61, -1.15]} rotation={[0, -0.1, 0]}
        document={{ id: "LOGBOOK-01", title: "VISITOR LOG", type: "dossier", content: `Day 17\n\nStill hearing movement below.` }} 
      />
      <mesh position={[0, 0.8, -1.8]} rotation={[0, 0, 0]}><boxGeometry args={[0.4, 0.3, 0.4]} /><meshStandardMaterial color="#0a0a0a" /></mesh>
      <mesh position={[0.4, 0.65, -1.75]}><cylinderGeometry args={[0.05, 0.05, 0.1]} /><meshStandardMaterial color="#444" /></mesh>
      <mesh position={[0.9, 0.61, -1.4]}><cylinderGeometry args={[0.06, 0.06, 0.02]} /><meshStandardMaterial color="#333" /></mesh>
      <DocumentProp position={[-0.5, 0.61, -1.4]} rotation={[0, 0.2, 0]}
        document={{ id: "NOTE-WARN-01", title: "HANDWRITTEN NOTE", type: "note", content: `IF THE ELEVATOR OPENS\n\nDO NOT GO DOWN` }} 
      />
      <mesh position={[0, 0.62, -1.05]} rotation={[Math.PI/2, 0, 0]}><boxGeometry args={[0.3, 0.1, 0.05]} /><meshStandardMaterial color="#554433" /></mesh>

      {/* Cardboard boxes removed for now */}

      <group position={[-3.8, -0.5, 4]}>
        <FilingCabinet position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} />
        <FilingCabinet position={[0, 0, -0.8]} rotation={[0, Math.PI/2, 0]} />
        <FilingCabinet position={[0.8, 0, 0]} rotation={[0, 0, 0]} />
      </group>

      <group position={[3.8, 0, -1.5]}>
        <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 1]} /><meshStandardMaterial color="#aaddff" transparent opacity={0.6} /></mesh>
        <mesh position={[0, -0.4, 0]}><boxGeometry args={[0.4, 0.4, 0.4]} /><meshStandardMaterial color="#ddd" /></mesh>
      </group>

      <VisitorChairs position={[3.8, -0.5, 3]} rotation={[0, -Math.PI/2, 0]} />

      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={`debris-${i}`} position={[-4 + Math.random()*8, -0.49, -4 + Math.random()*9]} rotation={[-Math.PI/2, 0, Math.random()*Math.PI]}>
          <planeGeometry args={[0.2, 0.3]} />
          <meshStandardMaterial color={Math.random() > 0.5 ? "#ccc" : "#999"} roughness={0.9} />
        </mesh>
      ))}

      {/* ─── STORYTELLING PROPS ─── */}
      <NoticeBoard position={[4.38, 1.2, 1]} rotation={[0, -Math.PI/2, 0]} />
      <DocumentProp position={[4.35, 1.2, 1.2]} rotation={[0, -Math.PI/2, 0]}
        document={{ id: "NOTE-BOARD-01", title: "NOTICE", type: "note", content: `Missing Employee.\n\n[A photo was here, but only the silhouette of tape remains]` }} 
      />

      <group position={[0, 1.8, -5.3]}>
        <mesh><cylinderGeometry args={[0.3, 0.3, 0.05, 32]} rotation={[Math.PI/2, 0, 0]} /><meshStandardMaterial color="#0a0a0a" roughness={0.8} /></mesh>
        <mesh position={[0, 0, 0.03]}><cylinderGeometry args={[0.25, 0.25, 0.02, 32]} rotation={[Math.PI/2, 0, 0]} /><meshStandardMaterial color="#a09080" roughness={0.9} /></mesh>
        <mesh position={[0.05, 0, 0.05]} rotation={[0, 0, -Math.PI/2]}><boxGeometry args={[0.02, 0.15, 0.01]} /><meshBasicMaterial color="#111" /></mesh>
      </group>
    </group>
  );
}
