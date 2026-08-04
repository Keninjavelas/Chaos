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
import { DeskSafe } from "../props/DeskSafe";
import { DeveloperTimelineWall } from "../props/DeveloperTimelineWall";

function InteractiveItem({ position, rotation, label, icon, onInteract, children }: { position: [number, number, number], rotation: [number, number, number], label: string, icon?: string, onInteract: () => void, children: React.ReactNode }) {
  return (
    <InteractableObject label={label} onInteract={onInteract}>
      <group position={position} rotation={rotation}>{children}</group>
    </InteractableObject>
  );
}

export function PersonnelWing({ position }: RoomProps) {
  const inspectDocument = useGameState(state => state.inspectDocument);
  const setActivePrompt = useGameState(state => state.setActivePrompt);
  const addInventoryItem = useGameState(state => state.addInventoryItem);
  const inventory = useGameState(state => state.inventory);

  // ZONES:
  // - Supervisor Office: X: -4 to -1.5, Z: -4 to 0
  // - Lockers: X: 3.5 to 4, Z: -4 to -1
  // - Break Area: X: -2 to 1, Z: 2.5 to 4
  // - Filing/Printing: X: 2 to 4, Z: 2 to 4
  // - Workstations: 4 cubicles in center (X: -1 to 2.5, Z: -2 to 1.5)

  return (
    <group position={position}>
      {/* ─── ARCHITECTURE ─── */}
      <RoomFloor args={[8.5, 8.5]} position={[-0.25, -0.5, 0]} />
      <RoomCeiling args={[8.5, 0.1, 8.5]} position={[-0.25, 2.9, 0]} hasLights={false} />

      {/* Main Walls */}
      <RoomWall position={[0, 0, -4]} args={[8, 3.2, 0.2]} /> {/* Rear */}
      <RoomWall position={[0, 0, 4]} args={[8, 3.2, 0.2]} /> {/* Front */}
      <RoomWall position={[4, 0, 0]} args={[0.2, 3.2, 8]} /> {/* Right */}

      {/* West Wall (3.0m Open Suite Entrance Flush with Right Corridor End Wall) */}
      <RoomWall position={[-4, 0, -2.75]} args={[0.2, 3.2, 2.5]} />
      <RoomWall position={[-4, 0, 2.75]} args={[0.2, 3.2, 2.5]} />
      {/* East Wall Developer Timeline Montage */}
      <DeveloperTimelineWall position={[3.88, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* ─── LIGHTING & ATMOSPHERE ─── */}
      {/* Broken/Flickering Overhead Light */}
      <group position={[0, 2.8, 0]}>
        <mesh><boxGeometry args={[1.2, 0.1, 0.3]} /><HorrorMaterial color="#111" /></mesh>
        <pointLight color="#ffe5cc" distance={8} decay={2} intensity={0.3} />
      </group>
      {/* Light coming from corridor */}
      <spotLight position={[-4, 2, 2]} target-position={[0, 0, 0]} angle={0.8} penumbra={0.5} intensity={2.0} distance={10} color="#aaccff" />
      <mesh position={[0, 0, 0]} visible={false}><boxGeometry args={[0.1, 0.1, 0.1]} /></mesh>
      {/* General dirt & Refined Blood Trail (Reduced 40% with trailing droplets leading to exit) */}
      <InstancedDebris count={120} areaSize={[6, 6]} position={[0, 0.01, 0]} type="paper" />
      <InstancedDebris count={40} areaSize={[6, 6]} position={[0, 0.01, 0]} type="rubble" />
      
      {/* Irregular Blood Trail leading towards exit corridor (depthWrite=false & polygonOffset prevents Z-fighting) */}
      <mesh position={[-2.2, 0.01, 2.5]} rotation={[-Math.PI / 2, 0, 0.2]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshBasicMaterial color="#2b0202" transparent opacity={0.85} depthWrite={false} polygonOffset polygonOffsetFactor={-1} />
      </mesh>
      <mesh position={[-2.8, 0.01, 1.8]} rotation={[-Math.PI / 2, 0, 0.5]}>
        <planeGeometry args={[0.25, 0.25]} />
        <meshBasicMaterial color="#2b0202" transparent opacity={0.75} depthWrite={false} polygonOffset polygonOffsetFactor={-1} />
      </mesh>
      <mesh position={[-3.2, 0.01, 1.0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.15, 0.15]} />
        <meshBasicMaterial color="#2b0202" transparent opacity={0.7} depthWrite={false} polygonOffset polygonOffsetFactor={-1} />
      </mesh>
      <mesh position={[-3.6, 0.01, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 0.08]} />
        <meshBasicMaterial color="#2b0202" transparent opacity={0.6} depthWrite={false} polygonOffset polygonOffsetFactor={-1} />
      </mesh>

      {/* ─── ZONE 1: SUPERVISOR OFFICE (DESK A) ─── */}
      <group position={[-1.5, 0, -2.5]}>
        <SupervisorDesk position={[-0.5, 0, -0.5]} rotation={[0, Math.PI/2, 0]} />
        <DeskLamp position={[-0.2, 0.8, -0.9]} rotation={[0, 0.5, 0]} on={true} />
        <CRTMonitor position={[-0.4, 0.8, -0.4]} rotation={[0, Math.PI/2 - 0.2, 0]} on={false} />
        <Keyboard position={[0.0, 0.8, -0.4]} rotation={[0, Math.PI/2 - 0.2, 0]} />
        
        <DeskSafe position={[-0.7, 0.8, -0.9]} rotation={[0, Math.PI/2, 0]} safeId="SUPERVISOR_SAFE" />
        
        <DocumentProp position={[-0.2, 0.8, -0.1]} rotation={[-Math.PI/2, 0, 0.3]}
          document={{ 
            id: "DOC-ENGINEERING-LOG", 
            title: "ENGINEERING LOG", 
            type: "dossier", 
            content: `git log --oneline\n\n3e4ac9d feat: terminal authentication\nf992ac1 fix: collider clipping\nd45fa20 perf: reduce draw calls\n89bc332 refactor: interaction system` 
          }} 
        />
        <CassetteTape position={[-0.6, 0.8, -0.2]} rotation={[0, 0.5, 0]} />
        
        <InteractableObject
          label="Play Tape Log"
          onInteract={() => setActivePrompt({ text: "[ AUDIO RECORDING ] - 'This place wasn't treating patients. It was researching intelligence.'" })}
        >
          <AudioRecorder position={[-0.7, 0.8, -0.3]} rotation={[0, 0.8, 0]} />
        </InteractableObject>
        
        {/* Filing Cabinet flush against wall (0 block on room entrance sightlines) */}
        <FilingCabinet position={[-2.1, 0, -1.2]} rotation={[0, Math.PI/2, 0]} cabinetId="PERSONNEL_CABINET" />
        <NoticeBoard position={[-0.5, 1.5, -1.48]} rotation={[0, 0, 0]} />
        <DocumentProp position={[-0.5, 1.5, -1.46]} rotation={[0, 0, 0]}
          document={{ 
            id: "DOC-WHITEBOARD-MAP", 
            title: "ENGINEERING WHITEBOARD - SPRINT 27", 
            type: "note", 
            content: `Sprint 27\n\n☑ Inventory System\n☑ Physics Refactor\n☑ WebGL Optimization\n☐ Audio Occlusion\n☐ Dynamic AI Navigation\n\n[Security Safe Code: 0845]` 
          }} 
        />
        {/* Supervisor Chair */}
        <mesh position={[0.2, 0.4, -0.5]} rotation={[0, -0.2, 0]}><boxGeometry args={[0.5, 0.8, 0.5]} /><HorrorMaterial color="#1a1a1a" roughness={0.8} /></mesh>
      </group>

      {/* ─── ZONE 2: WORKSTATIONS (ENGINEERING CUBICLES) ─── */}
      <group position={[0.5, 0, -0.5]}>
        {/* Cross Divider */}
        <CubicleDivider position={[0, 0, 0]} rotation={[0, 0, 0]} length={4} />
        <CubicleDivider position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} length={4} />
        
        {/* Desk B: "Stood Up 5 Seconds Ago" (Sprint Goals) */}
        <group position={[1.0, 0, -1.0]}>
          <mesh position={[0, 0.75, 0]}><boxGeometry args={[1.8, 0.05, 1.8]} /><HorrorMaterial color="#ddd" roughness={0.8} /></mesh>
          <DeskLamp position={[0.5, 0.8, -0.5]} rotation={[0, -0.5, 0]} on={true} />
          <CRTMonitor position={[0.2, 0.8, -0.2]} rotation={[0, -Math.PI/4 - 0.2, 0]} on={true} />
          <Keyboard position={[-0.2, 0.77, 0.25]} rotation={[0, 0.3, 0]} />
          <CoffeeMug position={[-0.4, 0.8, -0.2]} spilled={true} />
          <DocumentProp position={[0.4, 0.8, 0.4]} rotation={[-Math.PI/2, 0, 0.2]} 
            document={{ 
              id: "DOC-SPRINT-GOALS", 
              title: "DEVELOPER LOG", 
              type: "dossier", 
              content: `"Sleep later. Keep building."\n\nNext Milestones:\n- Deploy web application\n- Refine lighting shaders` 
            }} 
          />
          <WallClock position={[-0.9, 1.4, 0]} rotation={[0, Math.PI/2, 0]} />
          <mesh position={[-0.5, 0.4, 0.7]} rotation={[0, 0.6, 0]}><boxGeometry args={[0.4, 0.4, 0.4]} /><HorrorMaterial color="#333" /></mesh>
        </group>

        {/* Desk C: Hidden AWS Certification in Drawer */}
        <group position={[-1.0, 0, -1.0]}>
          <mesh position={[0, 0.75, 0]}><boxGeometry args={[1.8, 0.05, 1.8]} /><HorrorMaterial color="#ddd" roughness={0.8} /></mesh>
          <CRTMonitor position={[-0.2, 0.8, -0.2]} rotation={[0, Math.PI/4, 0]} on={false} />
          <DeskPhone position={[-0.6, 0.8, 0.2]} rotation={[0, 0.5, 0]} />
          <DocumentProp position={[0.2, 0.8, -0.5]} rotation={[-Math.PI/2, 0, -0.2]} 
            document={{ 
              id: "DOC-CERT", 
              title: "AWS CERTIFICATE", 
              type: "case_file", 
              content: `AWS CERTIFIED SOLUTIONS ARCHITECT\n\n[ Achievement Unlocked ]\n\nVerified Credential ID: #88402-AWS\nStatus: ACTIVE` 
            }} 
          />
          <mesh position={[0.2, 0.2, 0.5]} rotation={[Math.PI/2, 0, 0.4]}><boxGeometry args={[0.4, 0.4, 0.4]} /><HorrorMaterial color="#333" /></mesh>
        </group>

        {/* Desk D: Network Credentials */}
        <group position={[-1.0, 0, 1.0]}>
          <mesh position={[0, 0.75, 0]}><boxGeometry args={[1.8, 0.05, 1.8]} /><HorrorMaterial color="#ddd" roughness={0.8} /></mesh>
          <FamilyPhoto position={[-0.5, 0.8, 0.5]} rotation={[0, Math.PI, 0]} />
          <DeskLamp position={[-0.5, 0.8, 0.1]} rotation={[0, 1.5, 0]} on={false} />
          <Pen position={[0.2, 0.8, 0.2]} rotation={[0, 0.1, 0]} />
          <DocumentProp position={[-0.2, 0.8, 0.4]} rotation={[-Math.PI/2, 0, 0]} 
            document={{ 
              id: "DOC-PASSWORD", 
              title: "NETWORK LOGIN CREDENTIALS", 
              type: "note", 
              content: `Network Login: kapoor.a\n\nSecurity Password Clues:\n- ICETM2026\n- LOCALFIRST\n- NOCLOUD` 
            }} 
          />
          <mesh position={[0.1, 0.4, 0.1]} rotation={[0, -0.3, 0]}><boxGeometry args={[0.4, 0.4, 0.4]} /><HorrorMaterial color="#333" /></mesh>
        </group>

        {/* Desk E: Developer Manifesto */}
        <group position={[1.0, 0, 1.0]}>
          <mesh position={[0, 0.75, 0]}><boxGeometry args={[1.8, 0.05, 1.8]} /><HorrorMaterial color="#ddd" roughness={0.8} /></mesh>
          <DocumentProp position={[0.0, 0.8, 0.0]} rotation={[-Math.PI/2, 0, 0.1]} 
            document={{ 
              id: "DOC-MANIFESTO", 
              title: "DEVELOPER MANIFESTO", 
              type: "dossier", 
              content: `AUXILIUM ENGINEERING MANIFESTO:\n\nRule 1: Performance first.\nRule 2: Clean architecture.\nRule 3: No shortcuts.\n\n"Don't forget why you started."` 
            }} 
          />
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
