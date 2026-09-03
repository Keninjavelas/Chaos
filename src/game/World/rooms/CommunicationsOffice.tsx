import React from "react";
import { Text } from "@react-three/drei";
import { FacilityCeilingGrid, FacilityFloorSection, FacilitySignPanel, FacilityVent, FacilityWallSegment } from "../props/FacilityKit";
import { FacilityFluorescent, FacilityServerAccent, FacilityTaskLight } from "../lighting/FacilityLighting";
import { FacilityMaterial } from "../materials/FacilityMaterials";
import {
  SupervisorDesk,
  DeskLamp,
} from "../props/PersonnelProps";
import {
  CoffeeMug,
  StickyNote,
  Keyboard,
  CRTMonitor,
} from "../props/Clutter";
import { DocumentProp } from "../props/DocumentProp";
import { InstancedDebris } from "../props/InstancedDebris";
import { CeilingPipes } from "../props/RoomArchitecture";
import { ServerRack } from "../props/ServerRack";
import { GlassWhiteboard } from "../props/GlassWhiteboard";
import { useGameState } from "../../useGameState";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { MarkerTray, ServerCableBundle, PaperworkStack, FloorScuffDecal, WaterStainDecal } from "../props/EnvironmentalProps";
import { portfolioDocuments, portfolioManifest } from "@/data/portfolioData";

export function CommunicationsOffice({ position = [0, 0, 0], rotation = [0, 0, 0] }: { position?: [number, number, number], rotation?: [number, number, number] }) {
  const addInventoryItem = useGameState((state) => state.addInventoryItem);
  const inventory = useGameState((state) => state.inventory);
  const setMilestone = useGameState((state) => state.setMilestone);
  const inspectDocument = useGameState((state) => state.inspectDocument);

  return (
    <group position={position} rotation={rotation}>
      <FacilityFloorSection args={[5.5, 6.5]} position={[0, -0.5, 0.25]} />
      <FacilityCeilingGrid args={[5.5, 0.1, 6.5]} position={[0, 2.9, 0.25]} hasLights={false} />

      <FacilityWallSegment position={[0, 0, 3]} args={[5, 3.2, 0.2]} />
      <FacilityWallSegment position={[2.5, 0, 0]} args={[0.2, 3.2, 6]} />
      <FacilityWallSegment position={[-2.5, 0, 0]} args={[0.2, 3.2, 6]} />
      <FacilityWallSegment position={[-2.0, 0, -3]} args={[1.0, 3.2, 0.2]} />
      <FacilityWallSegment position={[2.0, 0, -3]} args={[1.0, 3.2, 0.2]} />
      <mesh position={[0, 3.0, -3]}>
        <boxGeometry args={[3.0, 0.4, 0.2]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      <CeilingPipes position={[1, 2.75, -2]} rotation={[0, Math.PI / 2, 0]} length={4} />
      <FacilityVent position={[-1, 2.65, 1]} />

      <FacilityFluorescent position={[0.5, 2.78, -1.3]} color="#c7e3db" intensity={1.45} distance={5.5} />
      <FacilityFluorescent position={[-1.35, 2.78, 1.55]} color="#87c9d7" intensity={0.95} distance={4.5} />
      <spotLight position={[0, 2.72, 1.6]} target-position={[0, 1.1, 2.7]} angle={0.72} penumbra={0.6} intensity={2.4} distance={6} color="#9ed4e1" />
      <FacilityServerAccent position={[-1.8, 1.8, 0]} />

      <FacilitySignPanel position={[0, 2.52, -2.87]} title="RESEARCH SYSTEMS / LOCAL-FIRST LAB" subtitle="SYSTEMS, CONTEXT, AND EXPERIMENT RECORDS" accent="#d6e7de" />

      <InteractableObject
        label="Local-first systems diagram"
        interactionKind="VIEW"
        interactionRange={3.2}
        priority={3}
        onInteract={() => inspectDocument({
          id: "DOC-LOCAL-FIRST-SYSTEMS",
          title: "LOCAL-FIRST AI WORKBENCH",
          type: "dossier",
          content: portfolioDocuments.communicationsExperimentLog,
        })}
      >
        <group position={[0, 1.5, 2.85]}>
          <GlassWhiteboard position={[0, 0, 0]} rotation={[0, 0, 0]} />
          <MarkerTray position={[0, -0.65, 0.05]} width={1.2} />
        </group>
      </InteractableObject>

      {/* Racks are pulled from the service wall, leaving a believable approach lane. */}
      <InteractableObject
        label="Inference cluster"
        interactionKind="INSPECT"
        onInteract={() => inspectDocument({
          id: "INSPECT-INFERENCE-CLUSTER",
          title: "COMPUTE / RETRIEVAL",
          type: "note",
          content: "Local-first experimentation support. The rack zone is presented as a portfolio environment, not a live production deployment.",
        })}
      >
        <ServerRack position={[-1.72, 0, 1.2]} rotation={[0, Math.PI / 2, 0]} role="INFERENCE CLUSTER" />
      </InteractableObject>
      <ServerRack position={[-1.72, 0, -0.6]} rotation={[0, Math.PI / 2, 0]} role="LOCAL CONTEXT CACHE" />
      <ServerCableBundle position={[-1.72, 0.01, 0.3]} rotation={[0, Math.PI / 2, 0]} length={1.8} />
      <Text position={[-2.34, 2.62, 0.28]} rotation={[0, Math.PI / 2, 0]} fontSize={0.065} color="#8fe0d0" anchorX="center" material-toneMapped={false}>COMPUTE / RETRIEVAL</Text>

      <SupervisorDesk position={[0.2, 0, 0.2]} rotation={[0, -Math.PI / 6, 0]} />
      <FacilityTaskLight position={[0.75, 1.65, -0.2]} />
      <FloorScuffDecal position={[0.2, 0.008, 0.2]} scale={[1.4, 1.0]} opacity={0.4} />
      <WaterStainDecal position={[1.0, 2.88, -2.0]} size={0.9} opacity={0.35} />

      <group position={[0.2, 0, 0.2]} rotation={[0, -Math.PI / 6, 0]}>
        <CRTMonitor position={[-0.1, 0.81, -0.6]} rotation={[0, -0.2, 0]} on={true} />
        <Keyboard position={[-0.1, 0.81, -0.3]} rotation={[0, -0.2, 0]} />
        <DeskLamp position={[0.6, 0.81, -0.3]} rotation={[0, 0.5, 0]} on={true} />
        <CoffeeMug position={[0.8, 0.81, 0.3]} rotation={[0, 0.8, 0]} spilled={false} />
        <StickyNote position={[0.4, 0.81, -0.3]} rotation={[0, 0.2, 0]} color="#aaccff" />
        <PaperworkStack position={[0.75, 0.81, -0.7]} rotation={[0, -0.2, 0]} folderColor="#1e3a5f" sheets={10} />
        {/* Research Task Chair */}
        <mesh position={[-0.5, 0.4, -0.4]} rotation={[0, Math.PI / 2 + 0.2, 0]}>
          <boxGeometry args={[0.45, 0.75, 0.45]} />
          <FacilityMaterial kind="painted-metal" color="#1c252c" />
        </mesh>

        <DocumentProp
          position={[0.3, 0.81, -1.0]}
          rotation={[0, -0.1, 0]}
          document={{
            id: "DOC-AI-EXPERIMENT",
            title: "LOCAL AI WORKBENCH STATUS",
            type: "dossier",
            content: portfolioDocuments.communicationsExperimentLog,
          }}
        />

        {!inventory[portfolioManifest.personalArchive.accessCard.id] && (
          <group position={[-0.6, 0.82, -0.2]}>
            <InteractableObject
              label={portfolioManifest.personalArchive.accessCard.label}
              onInteract={() => {
                addInventoryItem({
                  id: portfolioManifest.personalArchive.accessCard.id,
                  name: portfolioManifest.personalArchive.accessCard.name,
                  description: portfolioManifest.personalArchive.accessCard.description,
                  category: "key",
                  acquired: true,
                  isNew: true,
                  icon: "keycard_level2",
                });
                setMilestone("PERSONAL_ARCHIVE_DISCOVERED", true);
              }}
            >
              <mesh rotation={[-Math.PI / 2, 0, 0.4]}>
                <boxGeometry args={[0.1, 0.01, 0.14]} />
                <meshStandardMaterial color="#00aacc" roughness={0.3} metalness={0.8} />
              </mesh>
            </InteractableObject>
          </group>
        )}
      </group>

      {/* East Wall Engineering Memo Mounting Plate */}
      <group position={[2.42, 1.3, -0.8]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Anodized Aluminum Backplate */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.9, 1.2, 0.02]} />
          <FacilityMaterial kind="painted-metal" color="#263238" />
        </mesh>
        {/* Brass Header Clip */}
        <mesh position={[0, 0.55, 0.02]}>
          <boxGeometry args={[0.3, 0.06, 0.02]} />
          <FacilityMaterial kind="archive-brass" />
        </mesh>
      </group>
      <DocumentProp
        position={[2.39, 1.25, -0.8]}
        rotation={[0, -Math.PI / 2, 0]}
        document={{
          id: "DOC-HERMES-NOTE",
          title: "PROJECT HERMES CORE MEMO",
          type: "note",
          content: portfolioDocuments.communicationsMemo,
        }}
      />

      <group position={[2.42, 2.25, -0.8]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh><boxGeometry args={[1.45, 0.22, 0.02]} /><FacilityMaterial kind="painted-metal" color="#1a252c" /></mesh>
        <Text position={[0, 0, 0.015]} fontSize={0.055} color="#8fe0d0" anchorX="center" material-toneMapped={false}>RESEARCH MEMO // LOCAL LLM</Text>
      </group>

      {/* Localized technical paperwork near desk */}
      <InstancedDebris count={4} areaSize={[1.2, 1.2]} position={[0.4, 0.01, -0.2]} type="paper" />
    </group>
  );
}
