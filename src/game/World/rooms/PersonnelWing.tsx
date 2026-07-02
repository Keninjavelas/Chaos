import React, { useState } from "react";
import { RoomProps } from "../types";
import { RoomFloor, RoomCeiling, RoomWall, NoticeBoard, VisitorChairs, InstitutionalDoor } from "../props/RoomArchitecture";
import { ReceptionDesk } from "../props/ReceptionDesk";
import { FilingCabinet } from "../props/FilingCabinet";
import { DocumentProp } from "../props/DocumentProp";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useGameState } from "../../useGameState";
import { DocumentContent } from "@/data/types";
import { HorrorMaterial } from "../materials/HorrorMaterial";
import { VendingMachine, TrashBin } from "../props/HeavyProps";
import { CoffeeMug, Pen, StickyNote, EmployeeID, Keyboard, CRTMonitor, DeskPhone, Magazine, WallSign } from "../props/Clutter";
import { InstancedDebris } from "../props/InstancedDebris";
import { CubicleDivider, SupervisorDesk, OldRefrigerator, Microwave, CoffeeMachine, OfficePrinter, AudioRecorder, CassetteTape, FamilyPhoto, WallClock, DeskLamp } from "../props/PersonnelProps";

function InteractiveItem({ position, rotation, label, icon, onInteract, children }: { position: [number, number, number], rotation: [number, number, number], label: string, icon?: string, onInteract: () => void, children: React.ReactNode }) {
  return (
    <InteractableObject label={label} onInteract={onInteract}>
      <group position={position} rotation={rotation}>{children}</group>
    </InteractableObject>
  );
}

export function PersonnelWing({ position }: RoomProps) {
  const inspectDocument = useGameState(state => state.inspectDocument);

  // ZONES:
  // - Supervisor Office: X: -4 to -1.5, Z: -4 to 0
  // - Lockers: X: 3.5 to 4, Z: -4 to -1
  // - Break Area: X: -2 to 1, Z: 2.5 to 4
  // - Filing/Printing: X: 2 to 4, Z: 2 to 4
  // - Workstations: 4 cubicles in center (X: -1 to 2.5, Z: -2 to 1.5)

  return (
    <group position={position}>
      {/* ─── ARCHITECTURE ─── */}
      <RoomFloor args={[8, 8]} position={[0, -0.5, 0]} />
      <RoomCeiling args={[8, 0.1, 8]} position={[0, 2.9, 0]} hasLights={false} />

      {/* Main Walls */}
      <RoomWall position={[0, 0, -4]} args={[8, 3.4, 0.2]} /> {/* Rear */}
      <RoomWall position={[0, 0, 4]} args={[8, 3.4, 0.2]} /> {/* Front */}
      <RoomWall position={[4, 0, 0]} args={[0.2, 3.4, 8]} /> {/* Right */}

      {/* Left Wall with Cutout at Z=2 (Z=1 to Z=3) */}
      <RoomWall position={[-4, 0, -1.5]} args={[0.2, 3.4, 5]} /> {/* Rear part (Z=-4 to Z=1) */}
      <RoomWall position={[-4, 0, 3.5]} args={[0.2, 3.4, 1]} /> {/* Front part (Z=3 to Z=4) */}
      <mesh position={[-4, 2.8, 2]}><boxGeometry args={[0.2, 0.8, 2]} /><meshStandardMaterial color="#444" /></mesh> {/* Header */}

      {/* ─── ENTRY CORRIDOR ─── */}
      <group position={[-5.75, 0, 2]}>
        <RoomFloor args={[3.5, 4]} position={[0, -0.5, 0]} />
        <RoomCeiling args={[3.5, 0.1, 4]} position={[0, 2.5, 0]} hasLights={false} />
        <RoomWall position={[0, 0, -1]} args={[3.9, 3.4, 0.2]} />
        <RoomWall position={[0, 0, 1]} args={[3.9, 3.4, 0.2]} />
      </group>

      {/* ─── LIGHTING & ATMOSPHERE ─── */}
      {/* Broken/Flickering Overhead Light */}
      <group position={[0, 2.8, 0]}>
        <mesh><boxGeometry args={[1.2, 0.1, 0.3]} /><HorrorMaterial color="#111" /></mesh>
        <pointLight color="#ffe5cc" distance={8} decay={2} intensity={0.3} />
      </group>
      {/* Light coming from corridor */}
      <spotLight position={[-4, 2, 2]} target-position={[0, 0, 0]} angle={0.8} penumbra={0.5} intensity={2.0} distance={10} color="#aaccff" />
      <mesh position={[0, 0, 0]} visible={false}><boxGeometry args={[0.1, 0.1, 0.1]} /></mesh>
      {/* General dirt */}
      <InstancedDebris count={150} areaSize={[8, 8]} position={[0, 0.01, 0]} type="paper" />
      <InstancedDebris count={50} areaSize={[8, 8]} position={[0, 0.01, 0]} type="rubble" />
      <InstancedDebris count={20} areaSize={[3, 3]} position={[-2, 0.01, 3]} type="blood" /> {/* Spilled coffee near break area */}

      {/* ─── ZONE 1: SUPERVISOR OFFICE ─── */}
      <group position={[-2.5, 0, -2.5]}>
        {/* Office Partition Walls */}
        <mesh position={[1, 1.4, 0]}><boxGeometry args={[0.1, 2.8, 3]} /><HorrorMaterial color="#2a2a2a" roughness={0.9} /></mesh>
        <mesh position={[1, 1.4, 2]}><boxGeometry args={[0.1, 2.8, 1]} /><HorrorMaterial color="#2a2a2a" roughness={0.9} /></mesh>
        {/* Doorway header */}
        <mesh position={[1, 2.6, 1.25]}><boxGeometry args={[0.1, 0.4, 0.5]} /><HorrorMaterial color="#2a2a2a" /></mesh>
        
        {/* Glass panel */}
        <mesh position={[1, 1.5, -0.5]} rotation={[0, Math.PI/2, 0]}>
          <planeGeometry args={[1.8, 1.5]} />
          <meshStandardMaterial color="#fff" transparent opacity={0.1} roughness={0.1} />
        </mesh>
        
        <SupervisorDesk position={[-0.5, 0, -0.5]} rotation={[0, Math.PI/2, 0]} />
        <DeskLamp position={[-0.2, 0.8, -0.9]} rotation={[0, 0.5, 0]} on={true} />
        <CRTMonitor position={[-0.4, 0.8, -0.4]} rotation={[0, Math.PI/2 - 0.2, 0]} on={false} />
        <Keyboard position={[0.0, 0.8, -0.4]} rotation={[0, Math.PI/2 - 0.2, 0]} />
        
        <DocumentProp position={[-0.2, 0.8, -0.1]} rotation={[-Math.PI/2, 0, 0.3]}
          document={{ id: "DOC-TERMINATION", title: "TERMINATION NOTICE", type: "dossier", content: "To: Vance, A.\n\nYour employment is hereby terminated effective immediately.\n\nPlease return your access card to Security." }} 
        />
        <CassetteTape position={[-0.6, 0.8, -0.2]} rotation={[0, 0.5, 0]} />
        <AudioRecorder position={[-0.7, 0.8, -0.3]} rotation={[0, 0.8, 0]} />
        
        <FilingCabinet position={[-1.2, 0, 1.0]} rotation={[0, Math.PI/2, 0]} />
        <NoticeBoard position={[-1.48, 1.5, 0.5]} rotation={[0, Math.PI/2, 0]} />
        <DocumentProp position={[-1.47, 1.5, 0.5]} rotation={[0, Math.PI/2, 0]}
          document={{ id: "DOC-TIMELINE", title: "ERASED TIMELINE", type: "note", content: "08:00 - Initial breach detected\n08:15 - Containment failed\n08:30 - Do not let them leave" }} 
        />
        {/* Supervisor Chair */}
        <mesh position={[0.2, 0.4, -0.5]}><boxGeometry args={[0.5, 0.8, 0.5]} /><HorrorMaterial color="#1a1a1a" roughness={0.8} /></mesh>
      </group>

      {/* ─── ZONE 2: WORKSTATIONS (CUBICLES) ─── */}
      <group position={[0.5, 0, -0.5]}>
        {/* Cross Divider */}
        <CubicleDivider position={[0, 0, 0]} rotation={[0, 0, 0]} length={4} />
        <CubicleDivider position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} length={4} />
        
        {/* Desk 1: Overworked (Bottom-Right of cross) */}
        <group position={[1.0, 0, -1.0]}>
          <mesh position={[0, 0.75, 0]}><boxGeometry args={[1.8, 0.05, 1.8]} /><HorrorMaterial color="#ddd" roughness={0.8} /></mesh>
          <DeskLamp position={[0.5, 0.8, -0.5]} rotation={[0, -0.5, 0]} on={true} />
          <CRTMonitor position={[0.2, 0.8, -0.2]} rotation={[0, -Math.PI/4, 0]} on={true} />
          <Keyboard position={[-0.1, 0.8, 0.1]} rotation={[0, -Math.PI/4, 0]} />
          <CoffeeMug position={[-0.4, 0.8, -0.2]} spilled={true} />
          <DocumentProp position={[0.4, 0.8, 0.4]} rotation={[-Math.PI/2, 0, 0.2]} document={{ id: "DOC-ROTA", title: "STAFF ROTA", type: "dossier", content: "Shift 1: Vance, Miller\nShift 2: Chen, Harrison\n\nNote: Mandatory overtime until further notice." }} />
          <WallClock position={[-0.9, 1.4, 0]} rotation={[0, Math.PI/2, 0]} />
          {/* Chair pushed back */}
          <mesh position={[-0.3, 0.4, 0.5]} rotation={[0, 0.4, 0]}><boxGeometry args={[0.4, 0.4, 0.4]} /><HorrorMaterial color="#333" /></mesh>
        </group>

        {/* Desk 2: Left in a hurry (Bottom-Left of cross) */}
        <group position={[-1.0, 0, -1.0]}>
          <mesh position={[0, 0.75, 0]}><boxGeometry args={[1.8, 0.05, 1.8]} /><HorrorMaterial color="#ddd" roughness={0.8} /></mesh>
          <CRTMonitor position={[-0.2, 0.8, -0.2]} rotation={[0, Math.PI/4, 0]} on={true} />
          <DeskPhone position={[-0.6, 0.8, 0.2]} rotation={[0, 0.5, 0]} /> {/* Phone off hook implied */}
          <DocumentProp position={[0.2, 0.8, -0.5]} rotation={[-Math.PI/2, 0, -0.2]} document={{ id: "DOC-REPORT", title: "INCIDENT REPORT", type: "case_file", content: "Subject 44 exhibited extreme aggression.\nThree staff injured.\nProtocol 7 initiated." }} />
          {/* Tipped Chair */}
          <mesh position={[0.2, 0.2, 0.5]} rotation={[Math.PI/2, 0, 0.4]}><boxGeometry args={[0.4, 0.4, 0.4]} /><HorrorMaterial color="#333" /></mesh>
        </group>

        {/* Desk 3: Personalized (Top-Left of cross) */}
        <group position={[-1.0, 0, 1.0]}>
          <mesh position={[0, 0.75, 0]}><boxGeometry args={[1.8, 0.05, 1.8]} /><HorrorMaterial color="#ddd" roughness={0.8} /></mesh>
          <FamilyPhoto position={[-0.5, 0.8, 0.5]} rotation={[0, Math.PI, 0]} />
          <DeskLamp position={[-0.5, 0.8, 0.1]} rotation={[0, 1.5, 0]} on={false} />
          <Pen position={[0.2, 0.8, 0.2]} rotation={[0, 0.1, 0]} />
          <Pen position={[0.3, 0.8, 0.25]} rotation={[0, 0.2, 0]} />
          <DocumentProp position={[-0.2, 0.8, 0.4]} rotation={[-Math.PI/2, 0, 0]} document={{ id: "DOC-PASSWORD", title: "PASSWORD NOTE", type: "note", content: "Network Login: admin\nPassword: god_help_us_all" }} />
          <mesh position={[0.1, 0.4, 0.1]}><boxGeometry args={[0.4, 0.4, 0.4]} /><HorrorMaterial color="#333" /></mesh>
        </group>

        {/* Desk 4: Empty/New Hire (Top-Right of cross) */}
        <group position={[1.0, 0, 1.0]}>
          <mesh position={[0, 0.75, 0]}><boxGeometry args={[1.8, 0.05, 1.8]} /><HorrorMaterial color="#ddd" roughness={0.8} /></mesh>
          <DocumentProp position={[0.0, 0.8, 0.0]} rotation={[-Math.PI/2, 0, 0.1]} document={{ id: "DOC-HANDBOOK", title: "PERSONNEL HANDBOOK", type: "dossier", content: "Welcome to Auxilium Asylum.\n\nRule 1: Never enter the Sublevel alone.\nRule 2: Report all hallucinations." }} />
          <StickyNote position={[0.4, 0.8, 0.2]} rotation={[0, -0.4, 0]} color="#ff9e9e" />
          <mesh position={[-0.1, 0.4, 0.1]}><boxGeometry args={[0.4, 0.4, 0.4]} /><HorrorMaterial color="#333" /></mesh>
        </group>
      </group>

      {/* ─── ZONE 3: BREAK AREA ─── */}
      <group position={[-2, 0, 3]}>
        <OldRefrigerator position={[-1.5, 0, 0]} rotation={[0, Math.PI/2, 0]} />
        <mesh position={[-0.5, 0.4, 0.5]}><boxGeometry args={[1.5, 0.05, 0.8]} /><HorrorMaterial color="#ddd" /></mesh> {/* Counter */}
        <Microwave position={[-0.8, 0.45, 0.5]} rotation={[0, 0, 0]} />
        <CoffeeMachine position={[-0.2, 0.45, 0.5]} rotation={[0, -0.2, 0]} />
        <VendingMachine position={[1.0, 0, 0.5]} rotation={[0, Math.PI, 0]} />
        <TrashBin position={[1.8, 0, 0.5]} rotation={[0, 0, 0]} />
        
        <WallSign position={[-1.98, 1.8, 0.5]} rotation={[0, Math.PI/2, 0]} text="KITCHEN" size="large" />
        <DocumentProp position={[-0.5, 0.48, 0.8]} rotation={[-Math.PI/2, 0, 0.4]} document={{ id: "DOC-MEMO", title: "WARNING MEMO", type: "note", content: "Please clean the microwave after use.\nAlso, stop putting blood vials in the fridge." }} />
        
        {/* Plastic chairs scattered */}
        <mesh position={[0, 0.2, -0.5]} rotation={[0, 0.3, 0]}><boxGeometry args={[0.3, 0.4, 0.3]} /><HorrorMaterial color="#2a4d69" /></mesh>
        <mesh position={[1.2, 0.2, -0.2]} rotation={[Math.PI/2, 0, 0.8]}><boxGeometry args={[0.3, 0.4, 0.3]} /><HorrorMaterial color="#2a4d69" /></mesh>
      </group>

      {/* ─── ZONE 4: FILING & PRINTING ─── */}
      <group position={[2.5, 0, 3]}>
        <OfficePrinter position={[-0.5, 0, 0]} rotation={[0, 0, 0]} />
        
        <FilingCabinet position={[0.5, 0, 0.6]} rotation={[0, Math.PI, 0]} />
        <FilingCabinet position={[1.1, 0, 0.6]} rotation={[0, Math.PI, 0]} />
        
        {/* Tipped over cabinet */}
        <group position={[1.0, 0.2, -0.8]} rotation={[Math.PI/2, 0, 0.3]}>
          <FilingCabinet position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </group>
        
        <DocumentProp position={[1.0, 0.05, -1.8]} rotation={[-Math.PI/2, 0, 0.2]} document={{ id: "DOC-SECURITY", title: "SECURITY NOTICE", type: "dossier", content: "Lockdown overridden.\nFacility compromised.\nEvacuate immediately." }} />
        
        <InstancedDebris count={30} areaSize={[2, 2]} position={[0.5, 0.01, -1]} type="paper" />
      </group>

      {/* ─── ZONE 5: LOCKERS ─── */}
      <group position={[3.6, 0, -2]} rotation={[0, -Math.PI/2, 0]}>
        {/* Bank of lockers */}
        <mesh position={[0, 1.0, 0]}><boxGeometry args={[3.0, 2.0, 0.6]} /><HorrorMaterial color="#3a4a5a" metalness={0.7} roughness={0.6} noiseScale={4.0} /></mesh>
        {/* Open doors */}
        <mesh position={[0.75, 1.0, 0.3]} rotation={[0, -0.6, 0]}><boxGeometry args={[0.5, 2.0, 0.05]} /><HorrorMaterial color="#3a4a5a" metalness={0.7} roughness={0.6} noiseScale={3.0} /></mesh>
        <mesh position={[-0.75, 1.0, 0.3]} rotation={[0, -1.2, 0]}><boxGeometry args={[0.5, 2.0, 0.05]} /><HorrorMaterial color="#3a4a5a" metalness={0.7} roughness={0.6} noiseScale={3.0} /></mesh>
        
        <DocumentProp position={[0.6, 0.51, 0.1]} rotation={[-Math.PI/2, 0, 0.2]} document={{ id: "DOC-MEETING", title: "MEETING MINUTES", type: "note", content: "Management refuses to acknowledge the screaming.\nWe are organizing a walk-out on Friday." }} />
        
        {/* Backpack inside open locker */}
        <mesh position={[-0.7, 0.3, 0]}><boxGeometry args={[0.3, 0.4, 0.2]} /><HorrorMaterial color="#8b0000" /></mesh>
      </group>

    </group>
  );
}
