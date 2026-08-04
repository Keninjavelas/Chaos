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
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useGameState } from "../../useGameState";

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

      {/* ─── CENTRAL RECEPTION HALL ─── */}
      <RoomFloor position={[0, -0.5, 0]} args={[10, 10.5]} />
      <RoomCeiling position={[0, 3.2, 0]} args={[10, 0.1, 10.5]} hasLights={false} />

      {/* Ceiling elements */}
      <CeilingPipes position={[-1.5, 3.0, 0]} rotation={[0, -Math.PI/2, 0]} length={10} />
      <CeilingPipes position={[2.5, 3.0, 0]} rotation={[0, -Math.PI/2, 0]} length={10} />
      <HVACVent position={[0, 3.0, 3]} />
      <SparkingCable position={[1.5, 3.1, -1]} />

      {/* Outer Reception Boundaries */}
      {/* South Wall */}
      <RoomWall position={[0, 0, 5]} args={[10, 3.2, 0.2]} />

      {/* West Boundary (Opening to Left Wing Corridor) */}
      <RoomWall position={[-5, 0, 3.25]} args={[0.2, 3.2, 3.5]} />
      <RoomWall position={[-5, 0, -3.25]} args={[0.2, 3.2, 3.5]} />
      <mesh position={[-5, 3.0, 0]}>
        <boxGeometry args={[0.2, 0.4, 3.0]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* East Boundary (Opening to Right Wing Corridor) */}
      <RoomWall position={[5, 0, 3.25]} args={[0.2, 3.2, 3.5]} />
      <RoomWall position={[5, 0, -3.25]} args={[0.2, 3.2, 3.5]} />
      <mesh position={[5, 3.0, 0]}>
        <boxGeometry args={[0.2, 0.4, 3.0]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* North Security Gate (Opening to Elevator Lobby) */}
      <RoomWall position={[-3.75, 0, -5]} args={[2.5, 3.2, 0.2]} />
      <RoomWall position={[3.75, 0, -5]} args={[2.5, 3.2, 0.2]} />
      <mesh position={[0, 3.0, -5]}>
        <boxGeometry args={[5, 0.4, 0.2]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Security Gate Bars */}
      <group position={[0, 0, -5]}>
        {Array.from({ length: 23 }).map((_, i) => (
          <mesh key={`bar-${i}`} position={[-2.3 + i * 0.2, 1.2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 2.4]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[0, 0.5, 0]}><boxGeometry args={[5, 0.05, 0.05]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} /></mesh>
        <mesh position={[0, 1.5, 0]}><boxGeometry args={[5, 0.05, 0.05]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} /></mesh>
        <mesh position={[-2.5, 1.2, 0]}><boxGeometry args={[0.1, 2.4, 0.1]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[2.5, 1.2, 0]}><boxGeometry args={[0.1, 2.4, 0.1]} /><meshStandardMaterial color="#111" /></mesh>
      </group>

      {/* ─── LEFT WING CORRIDOR (Leads to Communications & Records) ─── */}
      <group position={[0, 0, 0]}>
        <RoomFloor position={[-9, -0.5, 0]} args={[8.5, 3.5]} />
        <RoomCeiling position={[-9, 3.2, 0]} args={[8.5, 0.1, 3.5]} hasLights={false} />

        {/* North Wall with Communications Office 3.0m suite cutout */}
        <RoomWall position={[-6.5, 0, 1.5]} args={[3.0, 3.2, 0.2]} />
        <RoomWall position={[-12.0, 0, 1.5]} args={[2.0, 3.2, 0.2]} />
        <mesh position={[-9.5, 3.0, 1.5]}>
          <boxGeometry args={[3.0, 0.4, 0.2]} />
          <meshStandardMaterial color="#444" />
        </mesh>

        {/* South Wall with Records Hall 3.0m suite cutout */}
        <RoomWall position={[-6.5, 0, -1.5]} args={[3.0, 3.2, 0.2]} />
        <RoomWall position={[-12.0, 0, -1.5]} args={[2.0, 3.2, 0.2]} />
        <mesh position={[-9.5, 3.0, -1.5]}>
          <boxGeometry args={[3.0, 0.4, 0.2]} />
          <meshStandardMaterial color="#444" />
        </mesh>

        {/* West Terminal Wall */}
        <RoomWall position={[-13, 0, 0]} args={[0.2, 3.2, 3.0]} />

        {/* Corridor Lighting & Pipes */}
        <pointLight position={[-9, 2.8, 0]} color="#E5E3D4" intensity={2} distance={6} decay={2} />
        <CeilingPipes position={[-9, 3.0, 0]} rotation={[0, 0, 0]} length={8} />
      </group>

      {/* ─── RIGHT WING CORRIDOR (Leads to Personnel Wing) ─── */}
      <group position={[0, 0, 0]}>
        <RoomFloor position={[9, -0.5, 0]} args={[8.5, 3.5]} />
        <RoomCeiling position={[9, 3.2, 0]} args={[8.5, 0.1, 3.5]} hasLights={false} />

        {/* North Wall */}
        <RoomWall position={[9, 0, 1.5]} args={[8, 3.2, 0.2]} />

        {/* South Wall */}
        <RoomWall position={[9, 0, -1.5]} args={[8, 3.2, 0.2]} />

        {/* East Terminal Wall with Personnel Wing 3.0m suite cutout */}
        <RoomWall position={[13, 0, 2.25]} args={[0.2, 3.2, 1.5]} />
        <RoomWall position={[13, 0, -2.25]} args={[0.2, 3.2, 1.5]} />
        <mesh position={[13, 3.0, 0]}>
          <boxGeometry args={[0.2, 0.4, 3.0]} />
          <meshStandardMaterial color="#444" />
        </mesh>

        {/* Corridor Lighting & Pipes */}
        <pointLight position={[9, 2.8, 0]} color="#E5E3D4" intensity={2} distance={6} decay={2} />
        <CeilingPipes position={[9, 3.0, 0]} rotation={[0, 0, 0]} length={8} />
      </group>

      {/* ─── RECEPTION DESK ─── */}
      <ReceptionDesk 
        position={[0, 0, -1.5]} 
        rotation={[0, 0, 0]}
        onInteractMap={onInteractMap}
      />
      <group position={[0, 0, -1.5]}>
        {/* Reception Computer Terminal Trigger */}
        <InteractableObject
          label="Use Reception Computer"
          onInteract={() => useGameState.getState().setActiveTerminal("RECEPTION_PC")}
        >
          <CRTMonitor position={[-0.1, 0.81, -0.6]} rotation={[0, -0.2, 0]} on={true} />
        </InteractableObject>
        <Keyboard position={[-0.1, 0.81, -0.3]} rotation={[0, -0.2, 0]} />

        {/* Telephone Static Feedback Trigger */}
        <InteractableObject
          label="Pick up Desk Phone"
          onInteract={() => useGameState.getState().setActivePrompt({ text: "[ PHONE LINE DEAD ] - Heavy static frequency..." })}
        >
          <DeskPhone position={[-0.6, 0.81, -0.4]} rotation={[0, 0.3, 0]} />
        </InteractableObject>
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
        document={{ 
          id: "LOGBOOK-01", 
          title: "VISITOR REGISTER", 
          type: "dossier", 
          content: `AUXILIUM DIGITAL ARCHIVE - VISITOR REGISTER\n\n09:15 - Amazon Recruiter | Status: No Response\n11:42 - Open Source Maintainer | Status: Accepted\n13:20 - Conference Committee | Status: Paper Under Review\n14:50 - Cloud Certification Center | Status: Scheduled\n\n[Handwritten Entry]: 16:00 - UNKNOWN ENTRY: "Do not forget why you started. DO NOT GO BELOW."` 
        }} 
      />
      <DocumentProp position={[-0.5, 0.81, -1.4]} rotation={[0, 0.2, 0]}
        document={{ 
          id: "NOTE-WARN-01", 
          title: "DEVELOPER GOAL NOTE", 
          type: "note", 
          content: `Today's Goals:\nFinish one feature.\n\nRemember:\nOne project finished is worth ten abandoned ones.` 
        }} 
      />

      {/* ─── WALL SIGNS ─── */}
      <WallSign position={[-4.5, 1.8, -4.9]} rotation={[0, 0, 0]} size="small" />
      <WallSign position={[4.5, 1.8, -4.9]} rotation={[0, 0, 0]} size="small" />
      <WallSign position={[-4.8, 1.5, 3]} rotation={[0, Math.PI/2, 0]} size="large" />
      <WallSign position={[4.8, 1.5, 3]} rotation={[0, -Math.PI/2, 0]} size="large" />

      {/* ─── FILING CABINETS ─── */}
      <group position={[-4.2, 0, 4]}>
        <FilingCabinet position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} />
        <FilingCabinet position={[0, 0, -0.8]} rotation={[0, Math.PI/2, 0]} />
      </group>

      {/* ─── WAITING AREA & PROPS ─── */}
      <VendingMachine position={[4.6, 0, -3]} rotation={[0, -Math.PI/2, 0]} />
      <WaterDispenser position={[4.8, 0, 1.0]} rotation={[0, -Math.PI/2, 0]} />
      <TrashBin position={[2.2, 0, -1.5]} rotation={[0, 0, 0]} />
      <VisitorChairs position={[3.5, 0, 3.5]} rotation={[0, -Math.PI/2 - 0.1, 0]} />
      <CleaningTrolley position={[4.0, 0, 2.0]} rotation={[0, 0.6, 0]} />
      <Magazine position={[3.5, 0.46, 2.5]} rotation={[0, 1.2, 0]} color="#f1c40f" />
      <CoffeeMug position={[3.5, 0.46, 3.5]} rotation={[0, 0.3, 0]} />

      {/* ─── DEBRIS ─── */}
      <InstancedDebris count={30} areaSize={[6, 8]} position={[0, 0.01, 0]} type="paper" />
      <InstancedDebris count={20} areaSize={[6, 8]} position={[0, 0.01, -1]} type="rubble" />

      {/* ─── NOTICE BOARD ─── */}
      <NoticeBoard position={[4.88, 1.2, 3.5]} rotation={[0, -Math.PI/2, 0]} />
      <DocumentProp position={[4.85, 1.2, 3.7]} rotation={[0, -Math.PI/2, 0]}
        document={{ id: "NOTE-BOARD-01", title: "NOTICE", type: "note", content: `Missing Employee.\n\n[A photo was here, but only the silhouette of tape remains]` }} 
      />
    </group>
  );
}
