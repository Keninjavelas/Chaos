import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoomFloor, RoomCeiling, RoomWall, NoticeBoard, InstitutionalDoor } from "../props/RoomArchitecture";
import {
  SupervisorDesk,
  WallClock,
  DeskLamp,
  OfficePrinter,
  FamilyPhoto,
} from "../props/PersonnelProps";
import { FilingCabinet } from "../props/FilingCabinet";
import {
  CoffeeMug,
  Pen,
  StickyNote,
  EmployeeID,
  Keyboard,
  CRTMonitor,
  DeskPhone,
} from "../props/Clutter";
import { DocumentProp } from "../props/DocumentProp";
import { InstancedDebris } from "../props/InstancedDebris";
import { CeilingPipes, HVACVent } from "../props/RoomArchitecture";

function FlickeringLight({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const flickerTimer = useRef(0);

  useFrame((_state, delta) => {
    if (lightRef.current) {
      flickerTimer.current += delta;
      if (flickerTimer.current > 0.5 + Math.random() * 0.5) {
        lightRef.current.intensity = Math.random() > 0.3 ? 5.0 : 0.5;
        flickerTimer.current = 0;
      }
    }
  });

  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.1]} />
        <meshStandardMaterial color="#eee" />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0, -0.2, 0]}
        color="#ffddaa"
        intensity={3}
        distance={8}
        decay={2}
        castShadow
      />
    </group>
  );
}

export function CommunicationsOffice({ position = [0, 0, 0], rotation = [0, 0, 0] }: { position?: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Room Architecture - Proper institutional scale (5m x 6m) */}
      <RoomFloor args={[5, 6]} position={[0, -0.5, 0]} />
      <RoomCeiling args={[5, 0.1, 6]} position={[0, 2.9, 0]} hasLights={false} />
      
      {/* Rear Wall */}
      <RoomWall position={[0, 0, -3]} args={[5, 3.2, 0.2]} />
      {/* Right Wall */}
      <RoomWall position={[2.5, 0, 0]} args={[0.2, 3.2, 6]} />
      {/* Left Wall */}
      <RoomWall position={[-2.5, 0, 0]} args={[0.2, 3.2, 6]} />
      {/* Front Wall with proper institutional door opening (1m wide) */}
      <RoomWall position={[-1, 0, 3]} args={[3, 3.2, 0.2]} />
      <RoomWall position={[2, 0, 3]} args={[1, 3.2, 0.2]} />
      <mesh position={[0.5, 2.8, 3]}><boxGeometry args={[1, 0.4, 0.2]} /><meshStandardMaterial color="#444" /></mesh>
      <InstitutionalDoor position={[0.5, 0, 3.1]} rotation={[0, 0, 0]} />

      {/* Ceiling Elements */}
      <CeilingPipes position={[1, 2.75, -2]} rotation={[0, Math.PI / 2, 0]} length={4} />
      <HVACVent position={[-1, 2.65, 1]} />
      
      {/* Ceiling Light */}
      <FlickeringLight position={[0, 2.9, 0]} />
      
      {/* Desk Lamp Light */}
      <pointLight position={[1, 1.7, -1.5]} color="#ffd6a5" intensity={2} distance={3} decay={2} />

      {/* Supervisor Desk against back wall */}
      <SupervisorDesk position={[0, 0, -1.5]} rotation={[0, 0, 0]} />

      {/* Desk Storytelling - abandoned in normal work */}
      <group position={[0, 0, -1.5]}>
        {/* Monitor */}
        <CRTMonitor position={[-0.1, 0.81, -0.6]} rotation={[0, -0.2, 0]} on={true} />
        <pointLight position={[-0.1, 1.2, -0.4]} color="#33ff33" intensity={0.8} distance={2} decay={2} />
        <Keyboard position={[-0.1, 0.81, -0.3]} rotation={[0, -0.2, 0]} />
        <DeskPhone position={[-0.6, 0.81, -0.4]} rotation={[0, 0.3, 0]} />
        
        {/* Desk Lamp */}
        <DeskLamp position={[0.6, 0.81, -0.3]} rotation={[0, 0.5, 0]} on={true} />
        
        {/* Employee ID */}
        <EmployeeID position={[-1.2, 0.81, -0.6]} rotation={[0, 0.4, 0]} name="M. Carter" />
        
        {/* Coffee Mug */}
        <CoffeeMug position={[0.8, 0.81, 0.3]} rotation={[0, 0.8, 0]} spilled={false} />
        
        {/* Family Photo */}
        <FamilyPhoto position={[-0.9, 0.81, 0.2]} rotation={[0, 1.2, 0]} />
        
        {/* Sticky Notes */}
        <StickyNote position={[0.4, 0.81, -0.3]} rotation={[0, 0.2, 0]} color="#fcf383" />
        <StickyNote position={[-0.2, 0.81, -0.6]} rotation={[0, -0.1, 0]} color="#ff9e9e" />
        
        {/* Pens */}
        <Pen position={[0.8, 0.81, -0.3]} rotation={[0, 1.2, 0]} />
        <Pen position={[0.7, 0.81, -0.5]} rotation={[0, 0.1, 0]} />
        
        {/* Documents */}
        <DocumentProp position={[0.3, 0.81, -1.0]} rotation={[0, -0.1, 0]}
          document={{
            id: "ADMIN-LOG-01",
            title: "DAILY LOG",
            type: "note",
            content: `Date: 10/17/1998

Heard movement in the basement again tonight.
Security cameras showed nothing.
Something is wrong with this place.`
          }}
        />
      </group>

      {/* Visitor Chair in front of desk */}
      <mesh position={[0, 0.5, 0.5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 0.9, 0.5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-0.2, 0.25, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0.2, 0.25, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[-0.2, 0.25, 0.7]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0.2, 0.25, 0.7]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Filing Cabinets on left wall */}
      <FilingCabinet position={[-2.2, 0, 1]} rotation={[0, Math.PI / 2, 0]} />
      <FilingCabinet position={[-2.2, 0, -0.5]} rotation={[0, Math.PI / 2, 0]} />
      
      {/* Printer on right side */}
      <OfficePrinter position={[2.2, 0, 1]} rotation={[0, -Math.PI / 2, 0]} />
      
      {/* Notice Board on right wall */}
      <NoticeBoard position={[2.35, 1.2, -1]} rotation={[0, -Math.PI / 2, 0]} />
      
      {/* Wall Clock */}
      <WallClock position={[0, 2.4, -2.9]} rotation={[0, Math.PI, 0]} />
      
      {/* Paper debris near desk */}
      <InstancedDebris count={8} areaSize={[2, 2]} position={[0, -0.49, -0.5]} type="paper" />
    </group>
  );
}
