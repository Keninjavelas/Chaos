import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoomProps } from "../types";
import { CeilingPipes, HVACVent, VisitorChairs, NoticeBoard } from "../props/RoomArchitecture";
import {
  ReceptionHeroFloor,
  ReceptionHeroCeiling,
  ReceptionHeroWall,
  ReceptionWaterStreak,
  ReceptionDampPatch,
  ReceptionRepairPatch,
} from "../materials/ReceptionAuthoredMaterials";
import { ReceptionDesk } from "../props/ReceptionDesk";
import { FilingCabinet } from "../props/FilingCabinet";
import { DocumentProp } from "../props/DocumentProp";
import { InstitutionalTablet } from "../props/InstitutionalTablet";
import { ReceptionLighting } from "./ReceptionLighting";
import { CoffeeMug, Pen, StickyNote, EmployeeID, Keyboard, CRTMonitor, DeskPhone, Intercom, Bell, WallSign } from "../props/Clutter";
import { InstancedDebris } from "../props/InstancedDebris";
import { VendingMachine, TrashBin, CleaningTrolley, WaterDispenser } from "../props/HeavyProps";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useGameState } from "../../useGameState";
import { FacilitySignPanel } from "../props/FacilityKit";
import { CoatRack, PaperworkStack, FloorScuffDecal, ArchiveBoxStack } from "../props/EnvironmentalProps";
import { FacilityMaterial } from "../materials/FacilityMaterials";
import { portfolioDocuments } from "@/data/portfolioData";

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

      {/* ─── CENTRAL RECEPTION HALL (AUTHORED PBR VERTICAL SLICE) ─── */}
      <ReceptionHeroFloor position={[0, -0.5, 0]} args={[10, 10.5]} />
      <ReceptionHeroCeiling position={[0, 3.2, 0]} args={[10, 0.1, 10.5]} />

      {/* Ceiling elements */}
      <CeilingPipes position={[-1.5, 3.0, 0]} rotation={[0, -Math.PI/2, 0]} length={10} />
      <CeilingPipes position={[2.5, 3.0, 0]} rotation={[0, -Math.PI/2, 0]} length={10} />
      <HVACVent position={[0, 3.0, 3]} />
      <SparkingCable position={[1.5, 3.1, -1]} />

      {/* ─── LOCALIZED WALL DECALS & TILING BREAKUPS (Requirement 6) ─── */}
      {/* 1. Vertical Water Run Streaks under ceiling pipes / vent penetrations */}
      <ReceptionWaterStreak position={[-1.5, 1.9, 4.89]} scale={[0.38, 1.9]} opacity={0.65} />
      <ReceptionWaterStreak position={[-4.89, 2.0, 2.4]} rotation={[0, Math.PI / 2, 0]} scale={[0.4, 1.7]} opacity={0.65} />
      <ReceptionWaterStreak position={[4.89, 1.9, 1.8]} rotation={[0, -Math.PI / 2, 0]} scale={[0.35, 1.6]} opacity={0.55} />

      {/* 2. Plaster Repair Patches (Aged compound fills over structural settling) */}
      <ReceptionRepairPatch position={[2.5, 1.75, 4.89]} scale={[0.6, 0.45]} />
      <ReceptionRepairPatch position={[-4.89, 1.45, -2.7]} rotation={[0, Math.PI / 2, 0]} scale={[0.5, 0.38]} />

      {/* 3. Organic Damp Corner Patches near janitorial corner & south-east perimeter */}
      <ReceptionDampPatch position={[-4.89, 0.5, 4.35]} rotation={[0, Math.PI / 2, 0]} scale={[0.95, 0.75]} opacity={0.55} />
      <ReceptionDampPatch position={[4.89, 0.45, 4.35]} rotation={[0, -Math.PI / 2, 0]} scale={[0.85, 0.65]} opacity={0.5} />

      {/* Outer Reception Boundaries */}
      {/* South Wall */}
      <ReceptionHeroWall position={[0, 0, 5]} args={[10, 3.2, 0.2]} />

      {/* West Boundary (Opening to Left Wing Corridor) */}
      <ReceptionHeroWall position={[-5, 0, 3.25]} args={[0.2, 3.2, 3.5]} />
      <ReceptionHeroWall position={[-5, 0, -3.25]} args={[0.2, 3.2, 3.5]} />
      
      {/* West Wing Portal Architectural Casing & Structural Lintel */}
      <mesh position={[-4.95, 3.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 0.4, 3.12]} />
        <FacilityMaterial kind="painted-metal" color="#1e252a" />
      </mesh>
      <mesh position={[-4.95, 1.6, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 3.2, 0.1]} />
        <FacilityMaterial kind="painted-metal" color="#1e252a" />
      </mesh>
      <mesh position={[-4.95, 1.6, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 3.2, 0.1]} />
        <FacilityMaterial kind="painted-metal" color="#1e252a" />
      </mesh>
      <FacilitySignPanel
        position={[-4.82, 2.7, 0]}
        rotation={[0, Math.PI / 2, 0]}
        title="WEST WING // ARCHIVES & RESEARCH"
        subtitle="RECORDS HALL (SOUTH) // COMMUNICATIONS LAB (NORTH)"
        accent="#b7d6d0"
      />

      {/* East Boundary (Opening to Right Wing Corridor) */}
      <ReceptionHeroWall position={[5, 0, 3.25]} args={[0.2, 3.2, 3.5]} />
      <ReceptionHeroWall position={[5, 0, -3.25]} args={[0.2, 3.2, 3.5]} />
      <mesh position={[4.95, 3.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 0.4, 3.12]} />
        <FacilityMaterial kind="painted-metal" color="#1e252a" />
      </mesh>
      <mesh position={[4.95, 1.6, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 3.2, 0.1]} />
        <FacilityMaterial kind="painted-metal" color="#1e252a" />
      </mesh>
      <mesh position={[4.95, 1.6, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 3.2, 0.1]} />
        <FacilityMaterial kind="painted-metal" color="#1e252a" />
      </mesh>
      <FacilitySignPanel
        position={[4.82, 2.7, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        title="EAST WING // PERSONNEL"
        subtitle="IDENTITY ARCHIVES // TIMELINE"
        accent="#dfcfaa"
      />

      {/* North Security Gate (Opening to Elevator Lobby) */}
      <ReceptionHeroWall position={[-3.75, 0, -5]} args={[2.5, 3.2, 0.2]} />
      <ReceptionHeroWall position={[3.75, 0, -5]} args={[2.5, 3.2, 0.2]} />
      <mesh position={[0, 3.0, -5]} castShadow receiveShadow>
        <boxGeometry args={[5.0, 0.4, 0.24]} />
        <FacilityMaterial kind="painted-metal" color="#1e252a" />
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
        <ReceptionHeroFloor position={[-9, -0.5, 0]} args={[8.5, 3.5]} />
        <ReceptionHeroCeiling position={[-9, 3.2, 0]} args={[8.5, 0.1, 3.5]} />

        {/* North Wall with Communications Office 3.0m suite cutout */}
        <ReceptionHeroWall position={[-6.5, 0, 1.5]} args={[3.0, 3.2, 0.2]} />
        <ReceptionHeroWall position={[-12.0, 0, 1.5]} args={[2.0, 3.2, 0.2]} />
        <mesh position={[-9.5, 3.0, 1.5]}>
          <boxGeometry args={[3.0, 0.4, 0.2]} />
          <meshStandardMaterial color="#444" />
        </mesh>

        {/* South Wall with Records Hall 3.0m suite cutout */}
        <ReceptionHeroWall position={[-6.5, 0, -1.5]} args={[3.0, 3.2, 0.2]} />
        <ReceptionHeroWall position={[-12.0, 0, -1.5]} args={[2.0, 3.2, 0.2]} />
        <mesh position={[-9.5, 3.0, -1.5]}>
          <boxGeometry args={[3.0, 0.4, 0.2]} />
          <meshStandardMaterial color="#444" />
        </mesh>

        {/* West Terminal Wall */}
        <ReceptionHeroWall position={[-13, 0, 0]} args={[0.2, 3.2, 3.0]} />

        {/* Corridor Lighting & Pipes */}
        <pointLight position={[-9, 2.8, 0]} color="#E5E3D4" intensity={2} distance={6} decay={2} />
        <CeilingPipes position={[-9, 3.0, 0]} rotation={[0, 0, 0]} length={8} />
      </group>

      {/* ─── RIGHT WING CORRIDOR (Leads to Personnel Wing) ─── */}
      <group position={[0, 0, 0]}>
        <ReceptionHeroFloor position={[9, -0.5, 0]} args={[8.5, 3.5]} />
        <ReceptionHeroCeiling position={[9, 3.2, 0]} args={[8.5, 0.1, 3.5]} />

        {/* North Wall */}
        <ReceptionHeroWall position={[9, 0, 1.5]} args={[8, 3.2, 0.2]} />

        {/* South Wall */}
        <ReceptionHeroWall position={[9, 0, -1.5]} args={[8, 3.2, 0.2]} />

        {/* East Terminal Wall with Personnel Wing 3.0m suite cutout */}
        <ReceptionHeroWall position={[13, 0, 2.25]} args={[0.2, 3.2, 1.5]} />
        <ReceptionHeroWall position={[13, 0, -2.25]} args={[0.2, 3.2, 1.5]} />
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
          content: portfolioDocuments.receptionVisitorRegister
        }} 
      />
      <DocumentProp position={[-0.5, 0.81, -1.4]} rotation={[0, 0.2, 0]}
        document={{ 
          id: "NOTE-WARN-01", 
          title: "DEVELOPER GOAL NOTE", 
          type: "note", 
          content: portfolioDocuments.receptionGoalNote
        }} 
      />

      {/* ─── WALL SIGNS ─── */}
      <WallSign position={[-4.5, 1.8, -4.9]} rotation={[0, 0, 0]} size="small" />
      <WallSign position={[4.5, 1.8, -4.9]} rotation={[0, 0, 0]} size="small" />

      {/* ─── RECEPTION LEFT-SIDE SERVICE & ADMINISTRATIVE ALCOVE (West Wall) ─── */}
      {/* 1. Flush Contiguous Filing Cabinet Bank (Flush against West Wall X = -4.88) */}
      <FilingCabinet position={[-4.48, 0, 3.65]} rotation={[0, Math.PI / 2, 0]} cabinetId="RECEPTION_CABINET_1" />
      <FilingCabinet position={[-4.48, 0, 2.82]} rotation={[0, Math.PI / 2, 0]} cabinetId="RECEPTION_CABINET_2" />

      {/* Purposeful Storage on Top of Cabinets (Institutional Record Storage) */}
      <ArchiveBoxStack position={[-4.48, 1.81, 3.65]} rotation={[0, Math.PI / 2, 0]} count={1} label="RECEPTION // LOGS" />
      <PaperworkStack position={[-4.48, 1.81, 2.82]} rotation={[0, 0.1, 0]} folderColor="#3a4856" sheets={10} />

      {/* 2. Institutional Archive & Records Wall Plaque */}
      <FacilitySignPanel
        position={[-4.88, 2.15, 3.24]}
        rotation={[0, Math.PI / 2, 0]}
        title="ADMINISTRATIVE ARCHIVE"
        subtitle="RECEPTION RECORDS // SECTION-01"
        accent="#9ac5b8"
      />

      {/* 3. Wall-Mounted Emergency Lockbox / Key Cabinet */}
      <group position={[-4.88, 1.45, 2.05]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.26, 0.38, 0.06]} />
          <FacilityMaterial kind="painted-metal" color="#262f36" />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[0.2, 0.06]} />
          <meshBasicMaterial color="#b33939" toneMapped={false} />
        </mesh>
        <mesh position={[0.08, 0, 0.04]}>
          <cylinderGeometry args={[0.008, 0.008, 0.02, 8]} />
          <FacilityMaterial kind="archive-brass" />
        </mesh>
      </group>

      {/* 4. Floor Wear Decal in Front of Cabinets (Showing Authentic Drawer Access Footwear) */}
      <FloorScuffDecal position={[-3.9, 0.008, 3.24]} scale={[0.9, 1.4]} opacity={0.35} />

      {/* 5. Dedicated Service Corner (Tucked South-West Maintenance Equipment) */}
      <CleaningTrolley position={[-4.45, 0, 4.45]} rotation={[0, 0, 0]} />
      <FacilitySignPanel
        position={[-4.45, 1.75, 4.88]}
        rotation={[0, 0, 0]}
        title="FACILITY SERVICE"
        subtitle="STATION 01 // JANITORIAL"
        accent="#9cb8a6"
      />

      {/* ─── VISITOR WAITING & REFRESHMENT ZONE (East Wall) ─── */}
      <VisitorChairs position={[4.5, 0, 3.2]} rotation={[0, -Math.PI / 2, 0]} />
      <WaterDispenser position={[4.6, 0, 1.5]} rotation={[0, -Math.PI / 2, 0]} />
      <TrashBin position={[4.6, 0, 0.9]} rotation={[0, -Math.PI / 2, 0]} />
      <VendingMachine position={[4.6, 0, -3.2]} rotation={[0, -Math.PI / 2, 0]} />
      <NoticeBoard position={[4.88, 1.5, 3.2]} rotation={[0, -Math.PI / 2, 0]} />
      <DocumentProp
        position={[4.85, 1.5, 3.4]}
        rotation={[0, -Math.PI / 2, 0]}
        document={{
          id: "NOTE-BOARD-01",
          title: "NOTICE",
          type: "note",
          content: "Facility Notice.\n\nAll non-essential personnel have departed. Active project dossiers are consolidated in Records Hall.",
        }}
      />

      {/* Entrance Accessories (South Entry Wall) */}
      <CoatRack position={[-2.8, 0, 4.6]} rotation={[0, 0.2, 0]} />
      <FloorScuffDecal position={[0, 0.008, -2.4]} scale={[1.4, 0.9]} opacity={0.4} />
      <PaperworkStack position={[-1.2, 0.81, -1.8]} rotation={[0, 0.15, 0]} folderColor="#3a4856" sheets={14} />

      {/* ─── PURPOSEFUL LOCALIZED ABANDONMENT (CLEAN TRAVERSAL) ─── */}
      <InstancedDebris count={5} areaSize={[1.2, 1.0]} position={[-1.2, 0.01, -0.6]} type="paper" />
      <InstancedDebris count={3} areaSize={[0.6, 0.6]} position={[4.2, 0.01, 4.0]} type="rubble" />
    </group>
  );
}
