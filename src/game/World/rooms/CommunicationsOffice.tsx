import React from "react";
import { RigidBody } from "@react-three/rapier";
import { CeilingPipes } from "../props/RoomArchitecture";
import { FacilitySignPanel, FacilityVent } from "../props/FacilityKit";
import { FacilityFluorescent } from "../lighting/FacilityLighting";
import { FacilityMaterial } from "../materials/FacilityMaterials";
import { ResearchHeroCeiling, ResearchHeroFloor, ResearchHeroWall, ResearchWaterStain, ResearchDampPatch, ResearchPeelingPaint } from "../materials/ResearchAuthoredMaterials";
import { DeskLamp } from "../props/PersonnelProps";
import { CoffeeMug, StickyNote, Keyboard } from "../props/Clutter";
import { MarkerTray, ServerCableBundle, PaperworkStack, FloorScuffDecal, WaterStainDecal } from "../props/EnvironmentalProps";
import { ServerRack } from "../props/ServerRack";
import { GlassWhiteboard } from "../props/GlassWhiteboard";
import { useGameState } from "../../useGameState";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { portfolioDocuments, portfolioManifest } from "@/data/portfolioData";

export function CommunicationsOffice({ position = [0, 0, 0], rotation = [0, 0, 0] }: { position?: [number, number, number], rotation?: [number, number, number] }) {
  const addInventoryItem = useGameState((state) => state.addInventoryItem);
  const inventory = useGameState((state) => state.inventory);
  const setMilestone = useGameState((state) => state.setMilestone);
  const inspectDocument = useGameState((state) => state.inspectDocument);

  return (
    <group position={position} rotation={rotation}>

      {/* ══════════════════════════════════════════════════════════════════
        HERO SURFACES — PBR materials matching Reception/Personnel standard
        ══════════════════════════════════════════════════════════════════ */}
      <ResearchHeroFloor position={[0, -0.5, 0.25]} args={[5.5, 6.5]} />
      <ResearchHeroCeiling position={[0, 2.9, 0.25]} args={[5.5, 0.1, 6.5]} />

      {/* North (back) wall — faces whiteboard */}
      <ResearchHeroWall position={[0, 0, 2.85]} args={[5.5, 3.2, 0.2]} />
      {/* East wall — faces rack zone */}
      <ResearchHeroWall position={[2.35, 0, 0.25]} args={[0.2, 3.2, 5.0]} />
      {/* West wall — faces entry corridor */}
      <ResearchHeroWall position={[-2.35, 0, 0.25]} args={[0.2, 3.2, 5.0]} />
      {/* South wall with doorway opening — a wide 2.3 m clear opening so the
          room reads as an ordinary institutional doorway, not a dark tunnel. */}
      <ResearchHeroWall position={[-1.75, 0, -2.5]} args={[1.2, 3.2, 0.2]} />
      <ResearchHeroWall position={[1.75, 0, -2.5]} args={[1.2, 3.2, 0.2]} />

      {/* Wall-fill header above the door (plaster finish, same plane as the
          wall). Closes the opening from door-head to ceiling — replaces the
          heavy black lintel that visually compressed the threshold. */}
      <RigidBody type="fixed" position={[0, 2.775, -2.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.85, 0.2]} />
          <FacilityMaterial kind="painted-plaster" color="#6a726a" />
        </mesh>
      </RigidBody>

      {/* Slim painted-metal door frame — side jambs + head casing on the
          room side. Slim enough to read as framing, not a lintel. */}
      <mesh position={[-1.16, 1.175, -2.44]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 2.35, 0.12]} />
        <FacilityMaterial kind="painted-metal" color="#414b4e" />
      </mesh>
      <mesh position={[1.16, 1.175, -2.44]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 2.35, 0.12]} />
        <FacilityMaterial kind="painted-metal" color="#414b4e" />
      </mesh>
      <mesh position={[0, 2.375, -2.44]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.05, 0.12]} />
        <FacilityMaterial kind="painted-metal" color="#414b4e" />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════════
        DECAY DECALS — institutional horror atmosphere
        ══════════════════════════════════════════════════════════════════ */}
      {/* Floor scuffs — operator's step-out path on the aisle side of the bench */}
      <FloorScuffDecal position={[-1.02, 0.008, 0.42]} rotation={[-Math.PI / 2, 0, 0.35]} scale={[0.85, 0.42]} opacity={0.4} />
      <FloorScuffDecal position={[-0.88, 0.008, -0.45]} rotation={[-Math.PI / 2, 0, -0.12]} scale={[0.7, 0.34]} opacity={0.36} />
      
      {/* Floor scuffs near rack access zone */}
      <FloorScuffDecal position={[1.95, 0.008, 0.3]} rotation={[-Math.PI / 2, 0, 0.5]} scale={[0.65, 0.3]} opacity={0.35} />
      <FloorScuffDecal position={[1.85, 0.008, 1.8]} rotation={[-Math.PI / 2, 0, -0.3]} scale={[0.7, 0.32]} opacity={0.38} />
      
      {/* Wall water stain near ceiling pipe junction */}
      <WaterStainDecal position={[1.2, 2.88, 1.2]} size={0.75} opacity={0.32} />
      
      {/* Subtle damp patch on east wall near rack */}
      <ResearchDampPatch position={[2.32, 0.6, 1.8]} rotation={[0, -Math.PI / 2, 0]} scale={[0.55, 0.45]} opacity={0.38} />
      
      {/* Peeling paint on west wall near entrance */}
      <ResearchPeelingPaint position={[-2.32, 1.35, -1.8]} rotation={[0, Math.PI / 2, 0]} scale={[0.4, 0.35]} opacity={0.45} />
      
      {/* Ceiling water stain near HVAC */}
      <ResearchWaterStain position={[-0.5, 2.88, 0.8]} scale={[0.6, 0.85]} opacity={0.3} />

      {/* ══════════════════════════════════════════════════════════════════
        CEILING INFRASTRUCTURE — institutional horror finish
        ══════════════════════════════════════════════════════════════════ */}
      {/* Overhead pipes along the east side — now terminate over the rack run,
          clear of the doorway so no duct end crowds the threshold. */}
      <CeilingPipes position={[1.8, 2.82, 0.45]} rotation={[0, Math.PI / 2, 0]} length={3.4} />
      {/* HVAC vent moved to mid-room, well off the entry sightline */}
      <FacilityVent position={[0.5, 2.62, 0.4]} />

      {/* ══════════════════════════════════════════════════════════════════
        LIGHTING — off-axis layered pools, cooler institutional base.
        Hierarchy: workstation pool > rack pool > board side-graze > fills.
        No fixture or light sits on the doorway axis; the systems board is
        lit obliquely so it reads as a lit surface, never as a glowing orb.
        ══════════════════════════════════════════════════════════════════ */}

      {/* ZONE B — back-wall side grazes only. Oblique, low-intensity; no
          frontal light aimed at the board or straight down the entry line. */}
      <pointLight position={[-1.55, 1.7, 2.45]} color="#709098" intensity={0.5} distance={3.6} decay={2} />
      <pointLight position={[1.6, 1.7, 2.4]} color="#7d9aa0" intensity={0.42} distance={3.4} decay={2} />

      {/* West-back strip — off-axis pool over the memo shelf / systems zone */}
      <FacilityFluorescent position={[-1.8, 2.78, 2.05]} color="#83989f" intensity={0.75} distance={4.4} />

      {/* ZONE D — cool-green overhead base directly over the workstation bench */}
      <FacilityFluorescent position={[-1.55, 2.78, 0.35]} color="#b0c9bc" intensity={1.15} distance={5.0} />

      {/* ZONE C — cool overhead accent just in front of the rack faces */}
      <FacilityFluorescent position={[1.15, 2.78, 1.7]} color="#7fa3b0" intensity={0.9} distance={4.8} />

      {/* Mid-room texture fill — keeps the circulation path charcoal, not a black
          void, without ever becoming a visible source. */}
      <pointLight position={[0, 1.45, 0.75]} color="#93a2a2" intensity={0.5} distance={6.5} decay={2} />

      {/* Warm localized task accent comes from the DeskLamp spot + rack LEDs —
          the only small coloured accents in the room. */}

      {/* ══════════════════════════════════════════════════════════════════
        ZONE A — ENTRY / THRESHOLD (kept clear — no props inside the doorway)
        ══════════════════════════════════════════════════════════════════ */}
      {/* Room ID on the EAST wall, entry-side (y ≈ 2.4). Sits comfortably
          inside the architectural frame when viewed from the doorway — not
          cropped against the opening edge, and off the door axis so the back
          wall stays a single-focus systems surface. */}
      <FacilitySignPanel
        position={[2.22, 2.42, -0.8]}
        rotation={[0, -Math.PI / 2, 0]}
        title="RESEARCH SYSTEMS / LOCAL-FIRST LAB"
        subtitle="SYSTEMS, CONTEXT, AND EXPERIMENT RECORDS"
        accent="#d6e7de"
      />

      {/* ══════════════════════════════════════════════════════════════════
        ZONE B — WHITEBOARD / SYSTEMS DISPLAY (back wall focal point)
        Composition: clear sightline from entry, positioned to draw player forward
        ══════════════════════════════════════════════════════════════════ */}
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
        <group position={[0, 1.5, 2.82]} rotation={[0, Math.PI, 0]}>
          <GlassWhiteboard position={[0, 0, 0]} rotation={[0, 0, 0]} />
          <MarkerTray position={[0, -0.65, 0.05]} width={1.2} />
        </group>
      </InteractableObject>

      {/* ══════════════════════════════════════════════════════════════════
        ZONE C — COMPUTE / SERVER RACK ROW (east wall, dedicated zone)
        Composition: racks along east perimeter, leaving clear circulation
        ══════════════════════════════════════════════════════════════════ */}
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
        <ServerRack position={[1.85, 0, 1.0]} rotation={[0, -Math.PI / 2, 0]} role="INFERENCE CLUSTER" />
      </InteractableObject>
      <ServerRack position={[1.85, 0, 2.3]} rotation={[0, -Math.PI / 2, 0]} role="LOCAL CONTEXT CACHE" />
      <ServerCableBundle position={[2.15, 0.01, 1.65]} rotation={[0, -Math.PI / 2, 0]} length={1.2} />
      
      {/* Rack zone is self-labelled by each ServerRack role plaque — no extra
          ceiling text competing with the board surface or the door line. */}

      {/* Shallow support shelf — WEST wall, deep half, between the bench and
          the systems board (no longer floating over the desk near the entry).
          Dark metal; the Hermes memo + paperwork sit ON it. */}
      <group position={[-2.11, 1.02, 1.75]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.92, 0.035, 0.26]} />
          <FacilityMaterial kind="painted-metal" color="#2a333a" />
        </mesh>
        {/* Wall-mount L-brackets under each end — the shelf now visibly hangs
            from steel angles fixed to the wall instead of floating. */}
        {[-0.36, 0.36].map((bx) => (
          <group key={`shelf-bracket-${bx}`} position={[bx, 0, 0]}>
            <mesh position={[0, -0.045, 0]} castShadow>
              <boxGeometry args={[0.05, 0.02, 0.3]} />
              <FacilityMaterial kind="painted-metal" color="#3a454b" />
            </mesh>
            <mesh position={[0, -0.1, -0.125]} castShadow>
              <boxGeometry args={[0.05, 0.14, 0.04]} />
              <FacilityMaterial kind="painted-metal" color="#3a454b" />
            </mesh>
          </group>
        ))}
        <PaperworkStack position={[0.22, 0.02, 0.02]} rotation={[0, 0.08, 0]} folderColor="#1e3a5f" sheets={6} />
        <InteractableObject
          label="Project Hermes memo"
          interactionKind="READ"
          onInteract={() =>
            inspectDocument({
              id: "DOC-HERMES-NOTE",
              title: "PROJECT HERMES CORE MEMO",
              type: "note",
              content: portfolioDocuments.communicationsMemo,
            })
          }
        >
          <mesh position={[-0.16, 0.012, 0.01]} rotation={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.18, 0.006, 0.24]} />
            <meshStandardMaterial color="#d8d2c4" roughness={0.92} />
          </mesh>
        </InteractableObject>
      </group>
      {/* ══════════════════════════════════════════════════════════════════
        ZONE D — WORKSTATION (west-wall technical bench, mid-depth)
        Anchor [-1.85, 0, 0.1]: the bench sits flush against the west wall
        (desk west edge ≈ wall face x -2.25) and reads as a wall-side
        technical workbench, not a freestanding island. The bench runs N-S
        along the wall; the operator works from the AISLE (east) side with
        the chair pulled out and usable. The centre aisle stays clear as the
        sightline to the systems board.
        ══════════════════════════════════════════════════════════════════ */}
      <group position={[-1.85, 0, 0.1]} rotation={[0, Math.PI / 2, 0]}>
        <RigidBody type="fixed" colliders="cuboid">
          <mesh position={[0, 0.73, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.55, 0.04, 0.78]} />
            <FacilityMaterial kind="wood" color="#3a2a1a" />
          </mesh>
          <mesh position={[-0.72, 0.365, 0]} castShadow>
            <boxGeometry args={[0.04, 0.73, 0.7]} />
            <FacilityMaterial kind="painted-metal" color="#222826" />
          </mesh>
          <mesh position={[0.72, 0.365, 0]} castShadow>
            <boxGeometry args={[0.04, 0.73, 0.7]} />
            <FacilityMaterial kind="painted-metal" color="#222826" />
          </mesh>
          <mesh position={[0, 0.4, -0.37]} castShadow>
            <boxGeometry args={[1.48, 0.5, 0.02]} />
            <FacilityMaterial kind="painted-metal" color="#1b201e" />
          </mesh>
        </RigidBody>

        {/* Warm localized task pool is provided by the DeskLamp's own spot —
            no floating second source hovering above the bench. */}

        {/* Dark lab CRT — screen faces the operator on the aisle side
            (east / local +Z), with the keyboard between operator and screen. */}
        <group position={[0.04, 0.73, -0.02]} rotation={[0, 0, 0]}>
          <mesh position={[0, 0.02, 0]} castShadow>
            <boxGeometry args={[0.16, 0.03, 0.14]} />
            <FacilityMaterial kind="painted-metal" color="#1a1f1d" />
          </mesh>
          <mesh position={[0, 0.055, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.045, 0.045]} />
            <FacilityMaterial kind="painted-metal" color="#141816" />
          </mesh>
          <mesh position={[0, 0.2, 0]} rotation={[-0.08, 0, 0]} castShadow>
            <boxGeometry args={[0.32, 0.24, 0.22]} />
            <FacilityMaterial kind="painted-metal" color="#1a1f1d" />
          </mesh>
          <mesh position={[0, 0.2, 0.112]} rotation={[-0.08, 0, 0]}>
            <planeGeometry args={[0.26, 0.18]} />
            <meshStandardMaterial
              color="#0c1a12"
              emissive="#2dff88"
              emissiveIntensity={0.55}
              roughness={0.25}
              metalness={0.45}
            />
          </mesh>
        </group>
        <Keyboard position={[0.04, 0.731, 0.24]} rotation={[0, 0, 0]} />
        <DeskLamp position={[0.5, 0.731, 0.02]} rotation={[0, -0.35, 0]} on={true} />
        <CoffeeMug position={[-0.55, 0.735, 0.3]} rotation={[0, 0.8, 0]} spilled={false} />
        <StickyNote position={[-0.35, 0.731, 0.2]} rotation={[0, 0.12, 0]} color="#aaccff" />

        {/* Chair on the AISLE (east) side of the bench, facing the desk —
            pulled out clear of the apron so it reads usable, not crammed
            into the narrow slot between the bench and the west wall. */}
        <group position={[0, 0, 0.78]} rotation={[0, Math.PI, 0]}>
          {/* Gas cylinder / pedestal stem */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.5, 8]} />
            <FacilityMaterial kind="painted-metal" color="#111518" />
          </mesh>
          {/* Five-star base hub */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.06, 5]} />
            <FacilityMaterial kind="painted-metal" color="#111518" />
          </mesh>
          {/* Base arms × 5 */}
          {[0, 72, 144, 216, 288].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <mesh
                key={`arm-${i}`}
                position={[Math.sin(rad) * 0.22, 0.025, Math.cos(rad) * 0.22]}
                rotation={[0, -rad, 0]}
              >
                <boxGeometry args={[0.06, 0.04, 0.42]} />
                <FacilityMaterial kind="painted-metal" color="#111518" />
              </mesh>
            );
          })}
          {/* Seat cushion */}
          <mesh position={[0, 0.50, 0]}>
            <boxGeometry args={[0.46, 0.07, 0.44]} />
            <meshStandardMaterial color="#1c252c" roughness={0.85} />
          </mesh>
          {/* Seat pan underside */}
          <mesh position={[0, 0.465, 0]}>
            <boxGeometry args={[0.48, 0.02, 0.46]} />
            <FacilityMaterial kind="painted-metal" color="#0e1418" />
          </mesh>
          {/* Back support post */}
          <mesh position={[0, 0.68, -0.21]}>
            <boxGeometry args={[0.06, 0.36, 0.04]} />
            <FacilityMaterial kind="painted-metal" color="#111518" />
          </mesh>
          {/* Back cushion */}
          <mesh position={[0, 0.82, -0.23]} rotation={[0.12, 0, 0]}>
            <boxGeometry args={[0.44, 0.42, 0.06]} />
            <meshStandardMaterial color="#1c252c" roughness={0.85} />
          </mesh>
          {/* Armrests */}
          <mesh position={[-0.26, 0.62, -0.05]}>
            <boxGeometry args={[0.04, 0.04, 0.32]} />
            <FacilityMaterial kind="painted-metal" color="#111518" />
          </mesh>
          <mesh position={[0.26, 0.62, -0.05]}>
            <boxGeometry args={[0.04, 0.04, 0.32]} />
            <FacilityMaterial kind="painted-metal" color="#111518" />
          </mesh>
          <mesh position={[-0.26, 0.66, 0.07]}>
            <boxGeometry args={[0.04, 0.02, 0.1]} />
            <meshStandardMaterial color="#1a2026" roughness={0.9} />
          </mesh>
          <mesh position={[0.26, 0.66, 0.07]}>
            <boxGeometry args={[0.04, 0.02, 0.1]} />
            <meshStandardMaterial color="#1a2026" roughness={0.9} />
          </mesh>
        </group>

        <InteractableObject
          label="Local AI workbench status"
          interactionKind="READ"
          onInteract={() =>
            inspectDocument({
              id: "DOC-AI-EXPERIMENT",
              title: "LOCAL AI WORKBENCH STATUS",
              type: "dossier",
              content: portfolioDocuments.communicationsExperimentLog,
            })
          }
        >
          <mesh position={[0.3, 0.738, 0.18]} rotation={[0, -0.08, 0]} castShadow>
            <boxGeometry args={[0.16, 0.006, 0.22]} />
            <meshStandardMaterial color="#d4cbb8" roughness={0.92} />
          </mesh>
        </InteractableObject>

        {!inventory[portfolioManifest.personalArchive.accessCard.id] && (
          <group position={[-0.68, 0.738, 0.24]}>
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

      {/* Scattered paper debris at the bench's north end — evidence of active work */}
      <group position={[-1.2, 0.01, 1.05]}>
        <mesh rotation={[-Math.PI / 2, 0, 0.15]} receiveShadow>
          <planeGeometry args={[0.12, 0.15]} />
          <meshStandardMaterial color="#e8e2d0" roughness={0.9} />
        </mesh>
        <mesh position={[0.08, 0.002, -0.05]} rotation={[-Math.PI / 2, 0, -0.25]} receiveShadow>
          <planeGeometry args={[0.1, 0.12]} />
          <meshStandardMaterial color="#e8e2d0" roughness={0.9} />
        </mesh>
      </group>

    </group>
  );
}
