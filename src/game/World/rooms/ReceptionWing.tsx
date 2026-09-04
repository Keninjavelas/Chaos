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
  ReceptionPeelingPaint,
  ReceptionRustBleed,
  ReceptionCeilingPipeStain,
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
      lightRef.current.intensity = Math.random() > 0.4 ? 3.5 : 0.6;
      if (sparkDurationRef.current <= 0) {
        isSparkingRef.current = false;
        lightRef.current.intensity = 0;
        sparkTimerRef.current = 50 + Math.random() * 70;
      }
    } else {
      sparkTimerRef.current -= delta;
      if (sparkTimerRef.current <= 0) {
        isSparkingRef.current = true;
        sparkDurationRef.current = 0.03 + Math.random() * 0.08;
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

      {/* Ceiling pipe-run discoloration stain (single pipe route — the older, more used run) */}
      <ReceptionCeilingPipeStain position={[-1.5, 3.14, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={[10, 0.62]} opacity={0.55} />

      {/* ─── LOCALIZED WALL DECALS — NARRATIVE SURFACE DECAY ─── */}

      {/* 1. Vertical Water Run Streaks — only under actual south-wall ceiling pipe penetrations */}
      <ReceptionWaterStreak position={[-1.5, 1.9, 4.89]} scale={[0.42, 2.1]} opacity={0.62} />
      <ReceptionWaterStreak position={[2.5, 1.7, 4.89]} scale={[0.28, 1.4]} opacity={0.5} />

      {/* 2. Plaster Repair Patch — single aged compound fill under the shorter water streak (leak was fixed) */}
      <ReceptionRepairPatch position={[2.5, 1.75, 4.89]} scale={[0.58, 0.44]} />

      {/* 3. Organic Damp Corner Patches — janitorial service corner (plumbing riser proximity) + rear east (gate weep) */}
      <ReceptionDampPatch position={[-4.89, 0.55, 4.35]} rotation={[0, Math.PI / 2, 0]} scale={[0.9, 0.75]} opacity={0.52} />
      <ReceptionDampPatch position={[4.89, 0.5, -4.0]} rotation={[0, -Math.PI / 2, 0]} scale={[0.65, 0.5]} opacity={0.38} />

      {/* Micro-polish: short weep streak descending gate lintel above rear-east damp corner (plausible leak source = ferrous gate post) */}
      <ReceptionWaterStreak position={[4.89, 1.15, -4.0]} rotation={[0, -Math.PI / 2, 0]} scale={[0.18, 0.95]} opacity={0.42} />

      {/* 4. Peeling Paint — single zone where the SW damp corner has lifted paint long-term */}
      <ReceptionPeelingPaint position={[-4.89, 1.25, 4.0]} rotation={[0, Math.PI / 2, 0]} scale={[0.7, 0.6]} opacity={0.65} />

      {/* 5. Rust Bleed — only beneath rear security gate frame hardware (old ferrous metal posts) */}
      <ReceptionRustBleed position={[-2.5, 2.8, -4.89]} scale={[0.14, 0.36]} opacity={0.45} />
      <ReceptionRustBleed position={[2.5, 2.8, -4.89]} scale={[0.14, 0.36]} opacity={0.45} />

      {/* Micro-polish: localized base-wall scuff cluster immediately in front of filing cabinets (drawer-kick footwear wear — physically motivated) */}
      <FloorScuffDecal position={[-4.2, 0.008, 3.1]} rotation={[-Math.PI / 2, 0, 0.4]} scale={[0.55, 0.35]} opacity={0.48} />
      <FloorScuffDecal position={[-4.15, 0.008, 2.5]} rotation={[-Math.PI / 2, 0, -0.25]} scale={[0.45, 0.28]} opacity={0.42} />

      {/* Outer Reception Boundaries */}
      {/* South Wall */}
      <ReceptionHeroWall position={[0, 0, 5]} args={[10, 3.2, 0.2]} />

      {/* West Boundary (Opening to Left Wing Corridor) */}
      <ReceptionHeroWall position={[-5, 0, 3.25]} args={[0.2, 3.2, 3.5]} />
      <ReceptionHeroWall position={[-5, 0, -3.25]} args={[0.2, 3.2, 3.5]} />
      
      {/* West Wing Portal Architectural Casing & Structural Lintel — charcoal horror trim */}
      <mesh position={[-4.95, 3.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 0.4, 3.12]} />
        <FacilityMaterial kind="painted-metal" color="#14191d" />
      </mesh>
      <mesh position={[-4.95, 1.6, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 3.2, 0.1]} />
        <FacilityMaterial kind="painted-metal" color="#14191d" />
      </mesh>
      <mesh position={[-4.95, 1.6, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 3.2, 0.1]} />
        <FacilityMaterial kind="painted-metal" color="#14191d" />
      </mesh>
      <FacilitySignPanel
        position={[-4.82, 2.7, 0]}
        rotation={[0, Math.PI / 2, 0]}
        title="WEST WING // ARCHIVES & RESEARCH"
        subtitle="RECORDS HALL (SOUTH) // COMMUNICATIONS LAB (NORTH)"
        accent="#8db5ae"
      />

      {/* East Boundary (Opening to Right Wing Corridor) */}
      <ReceptionHeroWall position={[5, 0, 3.25]} args={[0.2, 3.2, 3.5]} />
      <ReceptionHeroWall position={[5, 0, -3.25]} args={[0.2, 3.2, 3.5]} />
      <mesh position={[4.95, 3.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 0.4, 3.12]} />
        <FacilityMaterial kind="painted-metal" color="#14191d" />
      </mesh>
      <mesh position={[4.95, 1.6, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 3.2, 0.1]} />
        <FacilityMaterial kind="painted-metal" color="#14191d" />
      </mesh>
      <mesh position={[4.95, 1.6, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 3.2, 0.1]} />
        <FacilityMaterial kind="painted-metal" color="#14191d" />
      </mesh>
      <FacilitySignPanel
        position={[4.82, 2.7, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        title="EAST WING // PERSONNEL"
        subtitle="IDENTITY ARCHIVES // TIMELINE"
        accent="#c9b98f"
      />

      {/* North Security Gate (Opening to Elevator Lobby) */}
      <ReceptionHeroWall position={[-3.75, 0, -5]} args={[2.5, 3.2, 0.2]} />
      <ReceptionHeroWall position={[3.75, 0, -5]} args={[2.5, 3.2, 0.2]} />
      <mesh position={[0, 3.0, -5]} castShadow receiveShadow>
        <boxGeometry args={[5.0, 0.4, 0.24]} />
        <FacilityMaterial kind="painted-metal" color="#14191d" />
      </mesh>

      {/* Security Gate Bars — charcoal black institutional horror finish */}
      <group position={[0, 0, -5]}>
        {Array.from({ length: 23 }).map((_, i) => (
          <mesh key={`bar-${i}`} position={[-2.3 + i * 0.2, 1.2, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 2.4]} />
            <meshStandardMaterial color="#0e1113" metalness={0.82} roughness={0.62} />
          </mesh>
        ))}
        <mesh position={[0, 0.5, 0]}><boxGeometry args={[5, 0.05, 0.05]} /><meshStandardMaterial color="#0e1113" metalness={0.82} roughness={0.62} /></mesh>
        <mesh position={[0, 1.5, 0]}><boxGeometry args={[5, 0.05, 0.05]} /><meshStandardMaterial color="#0e1113" metalness={0.82} roughness={0.62} /></mesh>
        <mesh position={[-2.5, 1.2, 0]}><boxGeometry args={[0.1, 2.4, 0.1]} /><meshStandardMaterial color="#0a0c0e" metalness={0.75} roughness={0.68} /></mesh>
        <mesh position={[2.5, 1.2, 0]}><boxGeometry args={[0.1, 2.4, 0.1]} /><meshStandardMaterial color="#0a0c0e" metalness={0.75} roughness={0.68} /></mesh>
      </group>

      {/* ─── LEFT WING CORRIDOR (Leads to Communications & Records) ─── */}
      <group position={[0, 0, 0]}>
        <ReceptionHeroFloor position={[-9, -0.5, 0]} args={[8.5, 3.5]} />
        <ReceptionHeroCeiling position={[-9, 3.2, 0]} args={[8.5, 0.1, 3.5]} />

        {/* North Wall with Communications Office 3.0m suite cutout */}
        <ReceptionHeroWall position={[-6.5, 0, 1.5]} args={[3.0, 3.2, 0.2]} />
        <ReceptionHeroWall position={[-12.0, 0, 1.5]} args={[2.0, 3.2, 0.2]} />
        <mesh position={[-9.5, 3.0, 1.5]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.4, 0.2]} />
          <meshStandardMaterial color="#22282c" roughness={0.75} metalness={0.35} />
        </mesh>

        {/* South Wall with Records Hall 3.0m suite cutout */}
        <ReceptionHeroWall position={[-6.5, 0, -1.5]} args={[3.0, 3.2, 0.2]} />
        <ReceptionHeroWall position={[-12.0, 0, -1.5]} args={[2.0, 3.2, 0.2]} />
        <mesh position={[-9.5, 3.0, -1.5]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.4, 0.2]} />
          <meshStandardMaterial color="#22282c" roughness={0.75} metalness={0.35} />
        </mesh>

        {/* West Terminal Wall */}
        <ReceptionHeroWall position={[-13, 0, 0]} args={[0.2, 3.2, 3.0]} />

        {/* Corridor Lighting & Pipes — cold cyan-grey institutional spill */}
        <pointLight position={[-9, 2.75, 0]} color="#5c7588" intensity={1.1} distance={5.5} decay={2.1} />
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

        {/* Corridor Lighting & Pipes — colder teal-grey east wing */}
        <pointLight position={[9, 2.75, 0]} color="#687a79" intensity={1.0} distance={5.5} decay={2.1} />
        <CeilingPipes position={[9, 3.0, 0]} rotation={[0, 0, 0]} length={8} />
      </group>

      {/* ─── RECEPTION DESK — LAST ACTIVE CHECKPOINT, NARRATIVE CORE ─── */}
      <ReceptionDesk 
        position={[0, 0, -1.5]} 
        rotation={[0, 0.04, 0]}
        onInteractMap={onInteractMap}
      />
      <group position={[0, 0, -1.5]}>
        {/* Dead CRT with tiny green standby LED — interrupted work, not "on" in horror */}
        <InteractableObject
          label="Use Reception Computer"
          onInteract={() => useGameState.getState().setActiveTerminal("RECEPTION_PC")}
        >
          <group position={[-0.15, 0.81, -0.6]} rotation={[0, -0.28, -0.04]}>
            <CRTMonitor position={[0, 0, 0]} rotation={[0, 0, 0]} on={false} />
            {/* Faint green standby indicator — single small LED glowing on monitor bezel */}
            <mesh position={[0.17, 0.06, 0.202]} rotation={[-0.1, 0, 0]}>
              <planeGeometry args={[0.012, 0.012]} />
              <meshStandardMaterial color="#2eff6a" emissive="#3cff79" emissiveIntensity={2.4} toneMapped={false} />
            </mesh>
          </group>
        </InteractableObject>

        {/* Keyboard pulled slightly to the side, as if shoved when leaving */}
        <Keyboard position={[-0.02, 0.81, -0.28]} rotation={[0, -0.38, 0.03]} />

        {/* Desk Phone — handset askew, receiver not perfectly aligned, implies dropped call */}
        <InteractableObject
          label="Pick up Desk Phone"
          onInteract={() => useGameState.getState().setActivePrompt({ text: "[ PHONE LINE DEAD ] - Heavy static frequency..." })}
        >
          <group position={[-0.65, 0.81, -0.38]} rotation={[0, 0.55, 0.04]}>
            <DeskPhone position={[0, 0, 0]} rotation={[0, 0, 0]} />
            {/* Receiver sitting slightly off the cradle */}
            <mesh position={[-0.03, 0.02, -0.06]} rotation={[0, 0.3, 0.12]}>
              <boxGeometry args={[0.04, 0.02, 0.2]} />
              <meshStandardMaterial color="#131313" roughness={0.7} />
            </mesh>
          </group>
        </InteractableObject>

        {/* Intercom tilted as if last person jabbed the call button */}
        <Intercom position={[0.4, 0.81, -0.58]} rotation={[0.05, -0.5, -0.05]} />
        <Bell position={[0.62, 0.81, -0.12]} rotation={[0, 0.15, 0]} />

        {/* Employee ID — slid partially toward edge of desk */}
        <EmployeeID position={[-1.25, 0.81, -0.55]} rotation={[0, 0.55, 0.06]} name="A. Vance" />

        {/* Spilled mug — pushed over on its side with a wider pool */}
        <group position={[0.92, 0.81, -0.2]} rotation={[0, 0.95, 0]}>
          <CoffeeMug position={[0, 0, 0]} rotation={[0, 0, 0]} spilled={true} />
        </group>

        {/* Pen rolled to the edge of the desk */}
        <Pen position={[0.78, 0.81, -0.38]} rotation={[0, 1.55, 0.08]} />

        {/* Sticky notes — curl implied with slight overlays */}
        <StickyNote position={[0.4, 0.81, -0.3]} rotation={[0, 0.28, 0.04]} color="#e6d94b" />
        <StickyNote position={[0.0, 1.15, -0.55]} rotation={[0, 0, 0]} color="#d64545" />
      </group>

      {/* Institutional tablet — tilted like it was dropped mid-use */}
      <InstitutionalTablet position={[-0.72, 0.81, -1.38]} rotation={[0.08, 0.32, -0.05]} />

      {/* Open file / partially open log on corner of desk */}
      <DocumentProp position={[0.3, 0.81, -1.12]} rotation={[0, -0.22, 0.04]}
        document={{ 
          id: "LOGBOOK-01", 
          title: "VISITOR REGISTER", 
          type: "dossier", 
          content: portfolioDocuments.receptionVisitorRegister
        }} 
      />
      {/* Second file left open further out */}
      <DocumentProp position={[-0.45, 0.81, -1.38]} rotation={[0, 0.3, 0.08]}
        document={{ 
          id: "NOTE-WARN-01", 
          title: "DEVELOPER GOAL NOTE", 
          type: "note", 
          content: portfolioDocuments.receptionGoalNote
        }} 
      />

      {/* ─── DESK SURFACE — localized paper scatter (interrupted departure) ─── */}
      <InstancedDebris count={5} areaSize={[2.2, 1.3]} position={[0, 0.815, -1.2]} type="paper" />

      {/* ─── FLOOR — scattered papers someone kicked aside in rush ─── */}
      <InstancedDebris count={3} areaSize={[1.8, 1.2]} position={[-0.8, 0.01, -0.2]} type="paper" />
      {/* Drag / scuff marks near chair — evidence of someone shoving back hard */}
      <FloorScuffDecal position={[0.1, 0.008, -0.5]} rotation={[-Math.PI / 2, 0, 0.3]} scale={[1.1, 0.4]} opacity={0.5} />
      <FloorScuffDecal position={[-0.4, 0.008, -0.9]} rotation={[-Math.PI / 2, 0, -0.2]} scale={[0.9, 0.35]} opacity={0.45} />
      {/* Faint tracked-wear circulation paths */}
      <FloorScuffDecal position={[0, 0.008, 1.0]} scale={[2.0, 1.2]} opacity={0.3} />

      {/* ─── WALL SIGNS ─── */}
      <WallSign position={[-4.5, 1.8, -4.9]} rotation={[0, 0, 0]} size="small" />
      <WallSign position={[4.5, 1.8, -4.9]} rotation={[0, 0, 0]} size="small" />

      {/* ─── RECEPTION LEFT-SIDE SERVICE & ADMINISTRATIVE ALCOVE (West Wall) ─── */}
      {/* 1. Filing Cabinet Bank — second cabinet has middle drawer left ajar (interruption hint) */}
      <FilingCabinet position={[-4.48, 0, 3.65]} rotation={[0, Math.PI / 2, 0.02]} cabinetId="RECEPTION_CABINET_1" />
      <group position={[-4.48, 0, 2.82]} rotation={[0, Math.PI / 2, -0.02]}>
        <FilingCabinet position={[0, 0, 0]} rotation={[0, 0, 0]} cabinetId="RECEPTION_CABINET_2" />
        {/* Visual: middle drawer slightly pulled out, implies someone left mid-search */}
        <group position={[0.4, 0.7, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.06, 0.34, 0.74]} />
            <FacilityMaterial kind="painted-metal" color="#354048" />
          </mesh>
          <mesh position={[0.035, 0.08, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.3]} />
            <FacilityMaterial kind="painted-metal" color="#7a858e" />
          </mesh>
          {/* Papers visible inside the ajar drawer gap */}
          <mesh position={[0.07, 0, 0]} rotation={[0, 0.1, 0.06]}>
            <boxGeometry args={[0.03, 0.26, 0.55]} />
            <meshStandardMaterial color="#e8e2d0" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Storage on Top of Cabinets — archive box slightly offset for asymmetry */}
      <group position={[-4.48, 1.81, 3.65]} rotation={[0, Math.PI / 2, 0.03]}>
        <ArchiveBoxStack position={[0, 0, 0]} rotation={[0, 0, 0]} count={1} label="RECEPTION // LOGS" />
      </group>
      <PaperworkStack position={[-4.48, 1.81, 2.82]} rotation={[0, 0.18, 0.04]} folderColor="#2f3d49" sheets={10} />
      {/* A single loose sheet drifting off the paperwork stack */}
      <InstancedDebris count={1} areaSize={[0.25, 0.15]} position={[-4.22, 1.83, 2.82]} type="paper" />

      {/* 2. Institutional Archive & Records Wall Plaque */}
      <FacilitySignPanel
        position={[-4.88, 2.15, 3.24]}
        rotation={[0, Math.PI / 2, 0]}
        title="ADMINISTRATIVE ARCHIVE"
        subtitle="RECEPTION RECORDS // SECTION-01"
        accent="#6f9e93"
      />

      {/* 3. Wall-Mounted Emergency Lockbox / Key Cabinet — deeper horror dark tone */}
      <group position={[-4.88, 1.45, 2.05]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.26, 0.38, 0.06]} />
          <FacilityMaterial kind="painted-metal" color="#1e272e" />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[0.2, 0.06]} />
          <meshBasicMaterial color="#8b2626" toneMapped={false} />
        </mesh>
        <mesh position={[0.08, 0, 0.04]}>
          <cylinderGeometry args={[0.008, 0.008, 0.02, 8]} />
          <FacilityMaterial kind="archive-brass" />
        </mesh>
        {/* Faint rust bleed under the lockbox edge */}
        <ReceptionRustBleed position={[0, -0.28, 0.031]} rotation={[0, 0, 0]} scale={[0.12, 0.3]} opacity={0.45} />
      </group>

      {/* 4. Floor Wear Decal in Front of Cabinets (Showing Authentic Drawer Access Footwear) */}
      <FloorScuffDecal position={[-3.9, 0.008, 3.24]} scale={[0.95, 1.5]} opacity={0.42} />

      {/* 5. Dedicated Service Corner — trolley pulled slightly away from wall, a bit messy */}
      <CleaningTrolley position={[-4.35, 0, 4.42]} rotation={[0, 0.08, 0]} />
      <FacilitySignPanel
        position={[-4.45, 1.75, 4.88]}
        rotation={[0, 0, 0]}
        title="FACILITY SERVICE"
        subtitle="STATION 01 // JANITORIAL"
        accent="#7fa08e"
      />

      {/* ─── VISITOR WAITING & REFRESHMENT ZONE (East Wall) ─── */}
      {/* Visitor chairs: whole group is slightly rotated, not perfectly flush to wall */}
      <VisitorChairs position={[4.52, 0, 3.22]} rotation={[0, -Math.PI / 2 + 0.06, -0.02]} />
      <WaterDispenser position={[4.62, 0, 1.48]} rotation={[0, -Math.PI / 2 + 0.04, 0]} />
      {/* Trash bin: slightly tilted, hinting at someone knocking into it */}
      <group position={[4.6, 0, 0.9]} rotation={[0, -Math.PI / 2 - 0.05, 0.03]}>
        <TrashBin position={[0, 0, 0]} rotation={[0, 0, 0]} />
        {/* A crumpled scrap beside the bin */}
      </group>
      <InstancedDebris count={1} areaSize={[0.4, 0.3]} position={[4.25, 0.01, 0.9]} type="paper" />
      <VendingMachine position={[4.62, 0, -3.18]} rotation={[0, -Math.PI / 2 + 0.03, 0]} />

      {/* NoticeBoard — slightly tilted; we layer torn memos and a half-removed sheet in front */}
      <group position={[4.88, 1.5, 3.2]} rotation={[0, -Math.PI / 2, -0.02]}>
        <NoticeBoard position={[0, 0, 0]} rotation={[0, 0, 0]} />
        {/* Torn memo strips layered in front of cork */}
        <mesh position={[-0.55, 0.3, 0.032]} rotation={[0, 0, -0.12]}>
          <planeGeometry args={[0.22, 0.08]} />
          <meshStandardMaterial color="#e6dfc9" roughness={0.95} />
        </mesh>
        <mesh position={[-0.2, -0.4, 0.032]} rotation={[0, 0, 0.18]}>
          <planeGeometry args={[0.18, 0.12]} />
          <meshStandardMaterial color="#d8d0b5" roughness={0.95} />
        </mesh>
        {/* Half-peeled corner of a notice */}
        <mesh position={[0.45, 0.25, 0.035]} rotation={[0, 0, 0.35]}>
          <planeGeometry args={[0.1, 0.1]} />
          <meshStandardMaterial color="#cfc5a8" roughness={0.95} />
        </mesh>
        {/* One pin — dark red pushpin */}
        <mesh position={[-0.55, 0.3, 0.04]}>
          <cylinderGeometry args={[0.006, 0.006, 0.012, 8]} />
          <meshStandardMaterial color="#6a2222" roughness={0.4} />
        </mesh>
      </group>

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

      {/* Entrance Accessories (South Entry Wall) — coat rack slightly off-kilter */}
      <CoatRack position={[-2.85, 0, 4.58]} rotation={[0, 0.35, 0.04]} />
      {/* Drag scuff marks near gate axis (faint movement traces toward the elevator) */}
      <FloorScuffDecal position={[0, 0.008, -2.4]} rotation={[-Math.PI / 2, 0, 0.08]} scale={[1.4, 0.9]} opacity={0.44} />
      <FloorScuffDecal position={[0.8, 0.008, -3.0]} rotation={[-Math.PI / 2, 0, -0.15]} scale={[0.7, 0.35]} opacity={0.5} />
      {/* Paperwork stack on the side desk — slightly misaligned */}
      <PaperworkStack position={[-1.2, 0.81, -1.8]} rotation={[0, 0.22, 0.05]} folderColor="#2f3d49" sheets={14} />

      {/* ─── PURPOSEFUL LOCALIZED ABANDONMENT (CLEAN TRAVERSAL) ─── */}
      <InstancedDebris count={2} areaSize={[1.2, 1.0]} position={[-1.2, 0.01, -0.6]} type="paper" />
      {/* Rubble near waiting area — single small ceiling tile chip */}
      <InstancedDebris count={1} areaSize={[0.6, 0.6]} position={[4.2, 0.01, 4.0]} type="rubble" />
      {/* Tiny dust/dirt ring in front of the elevator gate (heavy foot traffic) */}
      <FloorScuffDecal position={[0, 0.008, -3.6]} scale={[2.0, 1.4]} opacity={0.22} />
    </group>
  );
}
