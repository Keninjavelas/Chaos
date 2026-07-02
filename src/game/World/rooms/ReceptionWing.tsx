import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoomProps } from "../types";
import { RoomFloor, RoomCeiling, RoomWall, StructuralColumn, CeilingPipes, HVACVent } from "../props/RoomArchitecture";
import { ReceptionDesk } from "../props/ReceptionDesk";
import { FilingCabinet } from "../props/FilingCabinet";
import { VisitorChairs, NoticeBoard, InstitutionalDoor } from "../props/RoomArchitecture";
import { RingingPhone } from "../props/RingingPhone";
import { DocumentProp } from "../props/DocumentProp";
import { InstitutionalTablet } from "../props/InstitutionalTablet";
import { ReceptionLighting } from "./ReceptionLighting";
import { CoffeeMug, Pen, StickyNote, EmployeeID, Keyboard, CRTMonitor, DeskPhone, Intercom, Bell, WallSign, Magazine } from "../props/Clutter";
import { InstancedDebris } from "../props/InstancedDebris";
import { VendingMachine, TrashBin, CleaningTrolley, WaterDispenser } from "../props/HeavyProps";

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
      <mesh position={[0, -0.45, 0]} rotation={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.01, 0.01, 0.9]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <pointLight ref={lightRef} position={[0, -0.9, 0]} color="#aaaaff" intensity={0} distance={4} decay={2} />
    </group>
  );
}

export function ReceptionWing({ position, onInteractMap }: RoomProps) {
  return (
    <group position={position}>
      <ReceptionLighting />
      {/* ─── ROOM GEOMETRY ─── */}
      <RoomFloor position={[0, -0.5, -1]} args={[9, 13]} />

      {/* ─── CEILING ─── */}
      <group position={[0, 0, 0]}>
        <RoomCeiling position={[0, 2.9, 1.5]} args={[9, 0.1, 8]} hasLights={false} />
        <RoomCeiling position={[0, 2.5, -4]} args={[9, 0.1, 3]} hasLights={false} />
        
        <mesh position={[0, 2.7, -2.5]}><boxGeometry args={[9, 0.4, 0.1]} /><meshStandardMaterial color="#444" /></mesh>

        <StructuralColumn position={[-2.5, 0, -3.5]} height={2.9} />
        <StructuralColumn position={[2.5, 0, -3.5]} height={2.9} />

        <CeilingPipes position={[-1.5, 2.75, 1.5]} rotation={[0, -Math.PI/2, 0]} length={8} />
        <CeilingPipes position={[2.5, 2.75, 1.5]} rotation={[0, -Math.PI/2, 0]} length={8} />
        <HVACVent position={[0, 2.65, 3]} />
        <SparkingCable position={[1.5, 2.9, -1]} />
      </group>

      {/* ─── WALLS & BOUNDARIES ─── */}
      <RoomWall position={[0, 0, 5.5]} args={[9, 3.2, 0.2]} />

      <RoomWall position={[4.5, 0, 1.75]} args={[0.2, 3.2, 7.5]} />
      <RoomWall position={[4.5, 0, -4.75]} args={[0.2, 3.2, 1.5]} />
      <mesh position={[4.5, 2.8, -3]}><boxGeometry args={[0.2, 0.8, 2]} /><meshStandardMaterial color="#444" /></mesh>

      {/* Left wall with entrance to left corridor */}
      <RoomWall position={[-4.5, 0, 4.5]} args={[0.2, 3.2, 2]} />
      <RoomWall position={[-4.5, 0, -2.5]} args={[0.2, 3.2, 7.5]} />
      <mesh position={[-4.5, 2.8, 1]}><boxGeometry args={[0.2, 0.4, 3]} /><meshStandardMaterial color="#444" /></mesh>

      {/* ─── LEFT CORRIDOR (Leads to Communications Office and Archive) ─── */}
      <group position={[0, 0, 0]}>
        {/* Main Left Corridor Floor */}
        <RoomFloor position={[-5.5, -0.5, 1]} args={[5, 8]} />
        <RoomCeiling position={[-5.5, 2.6, 1]} args={[5, 0.1, 8]} hasLights={false} />
        
        {/* Corridor Walls */}
        <RoomWall position={[-5.5, 0, -3]} args={[5, 3.2, 0.2]} />
        <RoomWall position={[-5.5, 0, 5]} args={[5, 3.2, 0.2]} />
        <RoomWall position={[-8, 0, 1]} args={[0.2, 3.2, 8]} /> {/* Back wall of corridor */}
        
        {/* Doorway to Communications Office (upper left) */}
        <RoomWall position={[-8, 0, 4.5]} args={[0.2, 3.2, 3]} />
        <RoomWall position={[-8, 0, 7.5]} args={[0.2, 3.2, 3]} />
        <mesh position={[-8, 2.8, 6]}><boxGeometry args={[0.2, 0.4, 1]} /><meshStandardMaterial color="#444" /></mesh>
        
        {/* Doorway to Archive Room (lower left) */}
        <RoomWall position={[-8, 0, -4.5]} args={[0.2, 3.2, 3]} />
        <RoomWall position={[-8, 0, -1.5]} args={[0.2, 3.2, 3]} />
        <mesh position={[-8, 2.8, -3]}><boxGeometry args={[0.2, 0.4, 1]} /><meshStandardMaterial color="#444" /></mesh>
        
        {/* Corridor lighting */}
        <pointLight position={[-5.5, 2.4, 1]} color="#E5E3D4" intensity={2} distance={5} decay={2} />
        
        {/* Corridor pipes */}
        <CeilingPipes position={[-5.5, 2.75, 1]} rotation={[0, 0, 0]} length={5} />
      </group>

      {/* ─── SECURITY GATE ─── */}
      <RoomWall position={[-3, 0, -5.5]} args={[3, 3.0, 0.2]} />
      <RoomWall position={[3, 0, -5.5]} args={[3, 3.0, 0.2]} />
      <mesh position={[0, 2.8, -5.5]}><boxGeometry args={[3, 0.4, 0.2]} /><meshStandardMaterial color="#444" /></mesh>
      <mesh position={[0, 3.2, -5.5]}><boxGeometry args={[9, 0.4, 0.2]} /><meshStandardMaterial color="#111" /></mesh>
      <group position={[0, 0, -5.5]}>
        {Array.from({ length: 15 }).map((_, i) => (
          <mesh key={`bar-${i}`} position={[-1.4 + i*0.2, 1.2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 2.4]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[0, 0.5, 0]}><boxGeometry args={[3, 0.05, 0.05]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} /></mesh>
        <mesh position={[0, 1.5, 0]}><boxGeometry args={[3, 0.05, 0.05]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} /></mesh>
        <mesh position={[-1.5, 1.2, 0]}><boxGeometry args={[0.1, 2.4, 0.1]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[1.5, 1.2, 0]}><boxGeometry args={[0.1, 2.4, 0.1]} /><meshStandardMaterial color="#111" /></mesh>
      </group>

      {/* ─── RECEPTION DESK ─── */}
      <ReceptionDesk 
        position={[0, 0, -1.5]} 
        rotation={[0, 0, 0]}
        onInteractMap={onInteractMap}
      />
      <group position={[0, 0, -1.5]}>
        <CRTMonitor position={[-0.1, 0.81, -0.6]} rotation={[0, -0.2, 0]} on={true} />
        <Keyboard position={[-0.1, 0.81, -0.3]} rotation={[0, -0.2, 0]} />
        <DeskPhone position={[-0.6, 0.81, -0.4]} rotation={[0, 0.3, 0]} />
        <Intercom position={[0.4, 0.81, -0.6]} rotation={[0, -0.4, 0]} />
        <Bell position={[0.6, 0.81, -0.1]} />
        <EmployeeID position={[-1.2, 0.81, -0.6]} rotation={[0, 0.4, 0]} name="A. Vance" />
        <CoffeeMug position={[0.9, 0.81, -0.2]} rotation={[0, 0.8, 0]} spilled={true} />
        <Pen position={[0.7, 0.81, -0.3]} rotation={[0, 1.2, 0]} />
        <StickyNote position={[0.4, 0.81, -0.3]} rotation={[0, 0.2, 0]} color="#fcf383" />
        <StickyNote position={[0.0, 1.15, -0.55]} rotation={[0, 0, 0]} color="#ff9e9e" />
      </group>
      <InstitutionalTablet position={[-0.8, 0.81, -1.4]} rotation={[0, 0.2, 0]} />
      <DocumentProp position={[0.3, 0.81, -1.15]} rotation={[0, -0.1, 0]}
        document={{ id: "LOGBOOK-01", title: "VISITOR LOG", type: "dossier", content: `Day 17

Still hearing movement below.` }} 
      />
      <DocumentProp position={[-0.5, 0.81, -1.4]} rotation={[0, 0.2, 0]}
        document={{ id: "NOTE-WARN-01", title: "HANDWRITTEN NOTE", type: "note", content: `IF THE ELEVATOR OPENS

DO NOT GO DOWN` }} 
      />

      {/* ─── WALL SIGNS ─── */}
      <WallSign position={[-3.1, 1.8, -5.4]} rotation={[0, 0, 0]} size="small" />
      <WallSign position={[3.1, 1.8, -5.4]} rotation={[0, 0, 0]} size="small" />
      <WallSign position={[-4.3, 1.5, -2.5]} rotation={[0, Math.PI/2, 0]} size="large" />
      <WallSign position={[4.3, 1.5, -2.5]} rotation={[0, -Math.PI/2, 0]} size="large" />

      {/* ─── FILING CABINETS ─── */}
      <group position={[-3.8, 0, 4]}>
        <FilingCabinet position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} />
        <FilingCabinet position={[0, 0, -0.8]} rotation={[0, Math.PI/2, 0]} />
      </group>

      {/* ─── WAITING AREA ─── */}
      <VendingMachine position={[3.8, 0, -2]} rotation={[0, -0.1, 0]} />
      <WaterDispenser position={[3.7, 0, -0.8]} rotation={[0, -0.4, 0]} />
      <TrashBin position={[2.8, 0, -2.2]} rotation={[0, 0, 0]} />
      <VisitorChairs position={[2.8, 0, 2.0]} rotation={[0, -Math.PI/2 - 0.1, 0]} />
      <CleaningTrolley position={[3.5, 0, 0.5]} rotation={[0, 0.6, 0]} />
      <Magazine position={[2.8, 0.46, 1.0]} rotation={[0, 1.2, 0]} color="#f1c40f" />
      <CoffeeMug position={[2.8, 0.46, 2.0]} rotation={[0, 0.3, 0]} />

      {/* ─── DEBRIS ─── */}
      <InstancedDebris count={30} areaSize={[6, 10]} position={[0, 0.01, 0]} type="paper" />
      <InstancedDebris count={20} areaSize={[6, 10]} position={[0, 0.01, -1]} type="rubble" />

      {/* ─── NOTICE BOARD ─── */}
      <NoticeBoard position={[4.38, 1.2, 1.5]} rotation={[0, -Math.PI/2, 0]} />
      <DocumentProp position={[4.35, 1.2, 1.7]} rotation={[0, -Math.PI/2, 0]}
        document={{ id: "NOTE-BOARD-01", title: "NOTICE", type: "note", content: `Missing Employee.

[A photo was here, but only the silhouette of tape remains]` }} 
      />
    </group>
  );
}
