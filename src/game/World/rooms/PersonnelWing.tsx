import React from "react";
import { RoomProps } from "../types";
import { NoticeBoard } from "../props/RoomArchitecture";
import { FilingCabinet } from "../props/FilingCabinet";
import { DocumentProp } from "../props/DocumentProp";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useGameState } from "../../useGameState";
import { FacilityMaterial } from "../materials/FacilityMaterials";
import { VendingMachine, TrashBin } from "../props/HeavyProps";
import { CoffeeMug, Pen, Keyboard, CRTMonitor, DeskPhone, WallSign } from "../props/Clutter";
import { InstancedDebris } from "../props/InstancedDebris";
import { CubicleDivider, SupervisorDesk, OldRefrigerator, Microwave, CoffeeMachine, OfficePrinter, AudioRecorder, CassetteTape, FamilyPhoto, DeskLamp } from "../props/PersonnelProps";
import { DeveloperTimelineWall } from "../props/DeveloperTimelineWall";
import { FacilityCeilingGrid, FacilityFloorSection, FacilityWallSegment } from "../props/FacilityKit";
import { FacilityFluorescent, FacilityTaskLight } from "../lighting/FacilityLighting";
import { ArchiveBoxStack, PaperworkStack, FloorScuffDecal, WaterStainDecal, CableConduitRun } from "../props/EnvironmentalProps";
import { ExperiencePlaque } from "../props/PortfolioExhibits";
import { portfolioManifest } from "@/data/portfolioData";

export function PersonnelWing({ position }: RoomProps) {
  const setInteractionMessage = useGameState(state => state.setInteractionMessage);
  const inspectDocument = useGameState(state => state.inspectDocument);

  return (
    <group position={position}>
      {/* ─── ARCHITECTURE ─── */}
      <FacilityFloorSection args={[8.5, 8.5]} position={[-0.25, -0.5, 0]} />
      <FacilityCeilingGrid args={[8.5, 0.1, 8.5]} position={[-0.25, 2.9, 0]} hasLights={false} />

      {/* Main Walls */}
      <FacilityWallSegment position={[0, 0, -4]} args={[8, 3.2, 0.2]} /> {/* Rear */}
      <FacilityWallSegment position={[0, 0, 4]} args={[8, 3.2, 0.2]} /> {/* Front */}
      <FacilityWallSegment position={[4, 0, 0]} args={[0.2, 3.2, 8]} /> {/* Right */}

      {/* West Wall (3.0m Open Suite Entrance Flush with Right Corridor End Wall) */}
      <FacilityWallSegment position={[-4, 0, -2.75]} args={[0.2, 3.2, 2.5]} />
      <FacilityWallSegment position={[-4, 0, 2.75]} args={[0.2, 3.2, 2.5]} />
      
      {/* East Wall Developer Timeline Montage */}
      <InteractableObject
        label="Developer timeline"
        interactionKind="VIEW"
        interactionRange={3.2}
        priority={3}
        onInteract={() => inspectDocument({
          id: "VIEW-DEVELOPER-TIMELINE",
          title: "DEVELOPER TIMELINE",
          type: "dossier",
          content: portfolioManifest.timeline
            .map((entry) => `${entry.yearLabel} // ${entry.heading}\n${entry.bullets.map((bullet) => `- ${bullet}`).join("\n")}`)
            .join("\n\n"),
        })}
      >
        <DeveloperTimelineWall position={[3.88, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]} />
      </InteractableObject>

      {/* ─── LIGHTING & ATMOSPHERE ─── */}
      <FacilityFluorescent position={[-0.8, 2.78, -1.2]} color="#e5dbc4" intensity={1.2} distance={5.5} />
      <FacilityFluorescent position={[1.6, 2.78, 1.4]} color="#d8e4d3" intensity={1.0} distance={4.8} />
      <FacilityTaskLight position={[-1.7, 1.75, -2.7]} />
      <FacilityTaskLight position={[3.1, 2.1, 0]} color="#e4d6ad" />
      {/* Light coming from corridor */}
      <spotLight position={[-4, 2, 2]} target-position={[0, 0, 0]} angle={0.8} penumbra={0.5} intensity={2.0} distance={10} color="#aaccff" />
      <mesh position={[0, 0, 0]} visible={false}><boxGeometry args={[0.1, 0.1, 0.1]} /></mesh>
      
      {/* Localized Floor Debris */}
      <InstancedDebris count={6} areaSize={[2, 2]} position={[2.5, 0.01, 2.5]} type="paper" />
      <InstancedDebris count={3} areaSize={[1, 1]} position={[-1.5, 0.01, 2.0]} type="rubble" />
      
      {/* Irregular Blood Trail leading towards exit corridor */}
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
        
        {/* Springer Capital Internship Record */}
        {portfolioManifest.experience[0] && (
          <ExperiencePlaque
            position={[-0.2, 0.81, -0.1]}
            rotation={[0, 0.2, 0]}
            experience={portfolioManifest.experience[0]}
          />
        )}
        <CassetteTape position={[-0.6, 0.8, -0.2]} rotation={[0, 0.5, 0]} />
        
        <InteractableObject
          label="Tape log"
          interactionKind="INSPECT"
          onInteract={() => setInteractionMessage("[ AUDIO RECORDING ] This place was researching intelligence.")}
        >
          <AudioRecorder position={[-0.7, 0.8, -0.3]} rotation={[0, 0.8, 0]} />
        </InteractableObject>

        <NoticeBoard position={[-0.5, 1.5, -1.48]} rotation={[0, 0, 0]} />
        <DocumentProp position={[-0.5, 1.5, -1.46]} rotation={[0, 0, 0]}
          document={{ 
            id: "DOC-ACADEMIC-RECORD", 
            title: "ACADEMIC & EDUCATION RECORD", 
            type: "dossier", 
            content: [
              `INSTITUTION: ${portfolioManifest.education[0]?.institution || "HKBK College of Engineering"}`,
              `CREDENTIAL: ${portfolioManifest.education[0]?.credential || "Bachelor of Engineering in Computer Science"}`,
              `DURATION: ${portfolioManifest.education[0]?.duration || "2023-2027"}`,
              `LOCATION: ${portfolioManifest.education[0]?.location || "Bengaluru, India"}`,
              `PERFORMANCE: Current CGPA: 8.93/10`,
              "",
              `FOCUS & COURSEWORK:`,
              "• Data Structures & Algorithms, Systems Programming, Database Systems",
              "• Computer Networks, Operating Systems, Software Architecture",
              "",
              `ACADEMIC SUMMARY:`,
              portfolioManifest.education[0]?.factualDescription || "Undergraduate computer science degree program in Bengaluru."
            ].join("\n")
          }} 
        />
        {/* Supervisor Chair */}
        <mesh position={[0.2, 0.4, -0.5]} rotation={[0, -0.2, 0]}><boxGeometry args={[0.5, 0.8, 0.5]} /><FacilityMaterial kind="painted-metal" color="#1a2228" /></mesh>
      </group>

      {/* ─── ZONE 2: WORKSTATIONS (ENGINEERING CUBICLES) ─── */}
      <group position={[0.5, 0, -0.5]}>
        {/* Cross Divider */}
        <CubicleDivider position={[0, 0, 0]} rotation={[0, 0, 0]} length={4} />
        <CubicleDivider position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]} length={4} />
        
        {/* Desk B: "Stood Up 5 Seconds Ago" (Sprint Goals) */}
        <group position={[1.0, 0, -1.0]}>
          <mesh position={[0, 0.75, 0]}><boxGeometry args={[1.8, 0.05, 1.8]} /><FacilityMaterial kind="wood" color="#4a3e30" /></mesh>
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
          <mesh position={[0.4, 0.4, -0.4]} rotation={[0, -Math.PI/4, 0]}><boxGeometry args={[0.4, 0.4, 0.4]} /><FacilityMaterial kind="painted-metal" color="#222b30" /></mesh>
        </group>

        {/* Desk C: Workspace and Coffee */}
        <group position={[-1.0, 0, -1.0]}>
          <mesh position={[0, 0.75, 0]}><boxGeometry args={[1.8, 0.05, 1.8]} /><FacilityMaterial kind="wood" color="#4a3e30" /></mesh>
          <CRTMonitor position={[-0.2, 0.8, -0.2]} rotation={[0, Math.PI/4, 0]} on={false} />
          <DeskPhone position={[-0.6, 0.8, 0.2]} rotation={[0, 0.5, 0]} />
          <InteractableObject label="Coffee mug" interactionKind="INSPECT" onInteract={() => setInteractionMessage("Late-night debugging sessions.")}>
            <CoffeeMug position={[-0.4, 0.8, -0.2]} spilled={true} />
          </InteractableObject>
          <mesh position={[-0.4, 0.4, -0.4]} rotation={[0, Math.PI/4, 0]}><boxGeometry args={[0.4, 0.4, 0.4]} /><FacilityMaterial kind="painted-metal" color="#222b30" /></mesh>
        </group>

        {/* Desk D: Network Credentials */}
        <group position={[-1.0, 0, 1.0]}>
          <mesh position={[0, 0.75, 0]}><boxGeometry args={[1.8, 0.05, 1.8]} /><FacilityMaterial kind="wood" color="#4a3e30" /></mesh>
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
          <mesh position={[-0.4, 0.4, 0.4]} rotation={[0, 3*Math.PI/4, 0]}><boxGeometry args={[0.4, 0.4, 0.4]} /><FacilityMaterial kind="painted-metal" color="#222b30" /></mesh>
        </group>

        {/* Desk E: Developer Manifesto */}
        <group position={[1.0, 0, 1.0]}>
          <mesh position={[0, 0.75, 0]}><boxGeometry args={[1.8, 0.05, 1.8]} /><FacilityMaterial kind="wood" color="#4a3e30" /></mesh>
          <DocumentProp position={[0.0, 0.8, 0.0]} rotation={[-Math.PI/2, 0, 0.1]} 
            document={{ 
              id: "DOC-MANIFESTO", 
              title: "DEVELOPER MANIFESTO", 
              type: "dossier", 
              content: `AUXILIUM ENGINEERING MANIFESTO:\n\nRule 1: Performance first.\nRule 2: Clean architecture.\nRule 3: No shortcuts.\n\n"Don't forget why you started."` 
            }} 
          />
          <mesh position={[0.4, 0.4, 0.4]} rotation={[0, -3*Math.PI/4, 0]}><boxGeometry args={[0.4, 0.4, 0.4]} /><FacilityMaterial kind="painted-metal" color="#222b30" /></mesh>
        </group>
      </group>

      {/* ─── ZONE 3: BREAK AREA (KITCHENETTE) ─── */}
      <group position={[-2.2, 0, 2.8]}>
        <OldRefrigerator position={[-1.4, 0, 0]} rotation={[0, Math.PI/2, 0]} />
        <mesh position={[-0.5, 0.4, 0.5]}><boxGeometry args={[1.5, 0.05, 0.8]} /><FacilityMaterial kind="wood" color="#554435" /></mesh>
        <Microwave position={[-0.8, 0.45, 0.5]} rotation={[0, 0, 0]} />
        <CoffeeMachine position={[-0.2, 0.45, 0.5]} rotation={[0, -0.2, 0]} />
        <VendingMachine position={[0.9, 0, 0.5]} rotation={[0, Math.PI, 0]} />
        <TrashBin position={[1.6, 0, 0.5]} rotation={[0, 0, 0]} />
        
        <WallSign position={[-1.98, 1.8, 0.5]} rotation={[0, Math.PI/2, 0]} text="KITCHEN" size="large" />
        <DocumentProp position={[-0.5, 0.48, 0.8]} rotation={[-Math.PI/2, 0, 0.4]} document={{ id: "DOC-MEMO", title: "WARNING MEMO", type: "note", content: "Please clean the microwave after use.\nAlso, stop putting blood vials in the fridge." }} />
        
        {/* Cohesive Breakroom Table & 2 Chairs */}
        <group position={[0.1, 0, -0.6]}>
          <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.45, 0.45, 0.04, 16]} /><FacilityMaterial kind="wood" color="#443528" /></mesh>
          <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.04, 0.04, 0.4, 8]} /><FacilityMaterial kind="painted-metal" color="#222" /></mesh>
          <mesh position={[0, 0.02, 0]}><cylinderGeometry args={[0.25, 0.25, 0.02, 16]} /><FacilityMaterial kind="painted-metal" color="#222" /></mesh>
          {/* 2 Chairs neatly placed */}
          <mesh position={[-0.45, 0.35, 0]} rotation={[0, Math.PI/2, 0]}><boxGeometry args={[0.3, 0.5, 0.3]} /><FacilityMaterial kind="painted-metal" color="#2a3a48" /></mesh>
          <mesh position={[0.45, 0.35, 0]} rotation={[0, -Math.PI/2, 0]}><boxGeometry args={[0.3, 0.5, 0.3]} /><FacilityMaterial kind="painted-metal" color="#2a3a48" /></mesh>
        </group>
      </group>

      {/* ─── ZONE 4: FILING & PRINTING ─── */}
      <group position={[2.5, 0, 3]}>
        <OfficePrinter position={[-0.5, 0, 0]} rotation={[0, 0, 0]} />
        
        <FilingCabinet position={[0.5, 0, 0.6]} rotation={[0, Math.PI, 0]} />
        <FilingCabinet position={[1.1, 0, 0.6]} rotation={[0, Math.PI, 0]} />
        <ArchiveBoxStack position={[0.5, 0, -1.2]} rotation={[0, 0.2, 0]} count={3} label="PERSONNEL // 2024-2025" />
        
        {/* Tipped over cabinet */}
        <group position={[1.0, 0.2, -0.8]} rotation={[Math.PI/2, 0, 0.3]}>
          <FilingCabinet position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </group>
        
        <DocumentProp position={[1.0, 0.05, -1.8]} rotation={[-Math.PI/2, 0, 0.2]} document={{ id: "DOC-SECURITY", title: "SECURITY NOTICE", type: "dossier", content: "Lockdown overridden.\nFacility compromised.\nEvacuate immediately." }} />
        
        {/* Localized spilled papers specifically near tipped cabinet */}
        <InstancedDebris count={6} areaSize={[1.2, 1.2]} position={[0.8, 0.01, -0.8]} type="paper" />
      </group>

      {/* Surface Wear & Conduits */}
      <FloorScuffDecal position={[-2.0, 0.008, -2.5]} scale={[1.2, 0.8]} opacity={0.45} />
      <FloorScuffDecal position={[0.5, 0.008, -0.5]} scale={[1.6, 1.2]} opacity={0.4} />
      <WaterStainDecal position={[-1.5, 2.88, 2.0]} size={1.1} opacity={0.35} />
      <CableConduitRun position={[0, 2.85, -3.88]} rotation={[0, 0, Math.PI / 2]} length={7.5} />
      <PaperworkStack position={[-1.7, 0.8, -3.1]} rotation={[0, 0.3, 0]} folderColor="#4a3b2c" sheets={16} />

      {/* ─── ZONE 5: LOCKERS ─── */}
      {/* Keep the timeline wall's natural viewing zone clear. */}
      <group position={[3.55, 0, -3.15]} rotation={[0, -Math.PI/2, 0]}>
        {/* Bank of lockers */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 2.0, 0.6]} />
          <FacilityMaterial kind="painted-metal" color="#354248" />
        </mesh>
        {/* Open doors */}
        <mesh position={[0.75, 1.0, 0.3]} rotation={[0, -0.6, 0]}>
          <boxGeometry args={[0.5, 2.0, 0.05]} />
          <FacilityMaterial kind="painted-metal" color="#354248" />
        </mesh>
        <mesh position={[-0.75, 1.0, 0.3]} rotation={[0, -1.2, 0]}>
          <boxGeometry args={[0.5, 2.0, 0.05]} />
          <FacilityMaterial kind="painted-metal" color="#354248" />
        </mesh>
        
        <DocumentProp position={[0.6, 0.51, 0.1]} rotation={[-Math.PI/2, 0, 0.2]} document={{ id: "DOC-MEETING", title: "MEETING MINUTES", type: "note", content: "Department notice: System consolidation complete. Verify development credentials on the central board." }} />
        
        {/* Backpack inside open locker */}
        <mesh position={[-0.7, 0.3, 0]}><boxGeometry args={[0.3, 0.4, 0.2]} /><FacilityMaterial kind="painted-metal" color="#5a2e2e" /></mesh>
      </group>

    </group>
  );
}
