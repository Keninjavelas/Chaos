import React from "react";
import { Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { RoomProps } from "../types";
import { FilingCabinet } from "../props/FilingCabinet";
import { DocumentProp } from "../props/DocumentProp";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useGameState } from "../../useGameState";
import { FacilityMaterial } from "../materials/FacilityMaterials";
import { CoffeeMug, Pen, Keyboard, CRTMonitor, DeskPhone } from "../props/Clutter";
import { OfficePrinter, FamilyPhoto } from "../props/PersonnelProps";
import { DeveloperTimelineWall } from "../props/DeveloperTimelineWall";
import { PersonnelHeroCeiling, PersonnelHeroFloor, PersonnelHeroWall } from "../materials/PersonnelAuthoredMaterials";
import { FacilitySignPanel } from "../props/FacilityKit";
import { FacilityFluorescent, FacilityTaskLight } from "../lighting/FacilityLighting";
import { ArchiveBoxStack, PaperworkStack, FloorScuffDecal, WaterStainDecal, CableConduitRun } from "../props/EnvironmentalProps";
import { formatExperienceDocument } from "../props/PortfolioExhibits";
import { portfolioManifest } from "@/data/portfolioData";

type Position = [number, number, number];
type Rotation = [number, number, number];

function ContextPlaque({
  position,
  rotation = [0, 0, 0],
  width = 0.7,
  height = 0.22,
  title,
  subtitle,
  accent = "#c9b98f",
  fontSize,
}: {
  position: Position;
  rotation?: Rotation;
  width?: number;
  height?: number;
  title: string;
  subtitle?: string;
  accent?: string;
  fontSize?: { title?: number };
}) {
  const titleSize = fontSize?.title ?? (subtitle ? 0.036 : 0.032);
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, 0.02]} />
        <FacilityMaterial kind="painted-metal" color="#202a32" />
      </mesh>
      <Text
        position={[0, subtitle ? height * 0.18 : 0, 0.012]}
        fontSize={titleSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={width * 0.9}
        material-toneMapped={false}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          position={[0, -height * 0.22, 0.012]}
          fontSize={0.022}
          color={accent}
          anchorX="center"
          anchorY="middle"
          maxWidth={width * 0.92}
          material-toneMapped={false}
        >
          {subtitle}
        </Text>
      ) : null}
    </group>
  );
}

const springerExperience = portfolioManifest.experience[0];

export function PersonnelWing({ position }: RoomProps) {
  const inspectDocument = useGameState((state) => state.inspectDocument);

  return (
    <group name="PersonnelWing" position={position}>
      {/* Hero surfaces are complete RigidBody+PBR components (Reception pattern).
          Never nest them inside a mesh+boxGeometry — that creates default white shells. */}
      <PersonnelHeroFloor position={[-0.25, -0.5, 0]} args={[8.5, 8.5]} />
      <PersonnelHeroCeiling position={[-0.25, 2.9, 0]} args={[8.5, 0.1, 8.5]} />
      <PersonnelHeroWall position={[0, 0, -4]} args={[8, 3.2, 0.2]} />
      <PersonnelHeroWall position={[0, 0, 4]} args={[8, 3.2, 0.2]} />
      <PersonnelHeroWall position={[4, 0, 0]} args={[0.2, 3.2, 8]} />
      <PersonnelHeroWall position={[-4, 0, -2.75]} args={[0.2, 3.2, 2.5]} />
      <PersonnelHeroWall position={[-4, 0, 2.75]} args={[0.2, 3.2, 2.5]} />

      <FacilitySignPanel
        position={[-3.88, 2.3, 2.05]}
        rotation={[0, Math.PI / 2, 0]}
        title="PERSONNEL // IDENTITY & RECORDS"
        subtitle="DEPARTMENT-02 · AUTHORIZED ACCESS ONLY"
        accent="#c9b98f"
      />

      {/* ═══════════════════════════════════════════════
        ZONE A · DEVELOPER TIMELINE / CAREER WALL · FROZEN
        Position, scale, viewing area, interaction UNCHANGED.
        x=+3.88 (east wall), z-centred on 0, viewing prism
        x∈[+1.0, +3.88], z∈[−2.0, +2.0]. No furniture inside.
        ═══════════════════════════════════════════════ */}
      <group position={[3.88, 1.5, 0]} rotation={[0, Math.PI, 0]}>
        <InteractableObject
          label="Developer timeline"
          interactionKind="VIEW"
          interactionRange={3.2}
          priority={3}
          onInteract={() =>
            inspectDocument({
              id: "VIEW-DEVELOPER-TIMELINE",
              title: "DEVELOPER TIMELINE",
              type: "dossier",
              content: portfolioManifest.timeline
                .map((entry) => `${entry.yearLabel} // ${entry.heading}\n${entry.bullets.map((bullet) => `- ${bullet}`).join("\n")}`)
                .join("\n\n"),
            })
          }
        >
          <DeveloperTimelineWall />
        </InteractableObject>

        {/* Timeline context plaque – LEFT. Removed floating "DEVELOPER JOURNEY"
            bare Text. Replaced with proper institutional mounted plaque that
            projects 0.04 m off the wall on painted-metal backing. */}
        <group position={[-1.9, 0.05, 0]}>
          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[0.32, 0.18, 0.035]} />
            <FacilityMaterial kind="painted-metal" color="#1f2724" />
          </mesh>
          <ContextPlaque
            position={[0, 0, 0.01]}
            rotation={[0, Math.PI, 0]}
            width={0.26}
            height={0.12}
            title="DEVELOPER JOURNEY"
            accent="#c9b98f"
            fontSize={{ title: 0.032 }}
          />
        </group>

        {/* Timeline context plaque – RIGHT. Removed floating "IDENTITY ARCHIVES"
            bare Text; matched institutional backing plaque. */}
        <group position={[1.9, 0.05, 0]}>
          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[0.32, 0.18, 0.035]} />
            <FacilityMaterial kind="painted-metal" color="#1f2724" />
          </mesh>
          <ContextPlaque
            position={[0, 0, 0.01]}
            rotation={[0, Math.PI, 0]}
            width={0.26}
            height={0.12}
            title="IDENTITY ARCHIVES"
            accent="#c9b98f"
            fontSize={{ title: 0.032 }}
          />
        </group>

        {/* Three milestone context plaques below timeline */}
        <ContextPlaque
          position={[-1.3, -0.9, 0.04]}
          rotation={[0, Math.PI, 0]}
          width={0.7}
          height={0.22}
          title="TECH STACK — FRONTIER"
          subtitle="Three.js · React Three Fiber · TypeScript · WebGPU forward"
          accent="#9ed6bb"
        />
        <ContextPlaque
          position={[0, -0.9, 0.04]}
          rotation={[0, Math.PI, 0]}
          width={0.7}
          height={0.22}
          title="SYSTEMS — HORIZON"
          subtitle="Architectural visualization · narrative simulation · CI automation"
          accent="#9ed6bb"
        />
        <ContextPlaque
          position={[1.3, -0.9, 0.04]}
          rotation={[0, Math.PI, 0]}
          width={0.7}
          height={0.22}
          title="ROADMAP — NEXUS"
          subtitle="Personnel records · Research wing · procedural world streaming"
          accent="#9ed6bb"
        />
      </group>

      {/* ═══════════════════════════════════════════════
        ZONE B · SUPERVISOR / PERSONNEL DESK · NW QUADRANT
        World anchor: x=−1.6, z=+2.2, rotation=0.
        Employee sits on SOUTH side (−z) facing NORTH into the work surface.
        Visitor / colleague approaches from SOUTH (z ≤ +1.5).
        Working-orientation sightline: chair pulled out at z=+1.35 → desk
        top at z∈[+1.7, +2.7] → modesty panel at z=+2.7.
        ═══════════════════════════════════════════════ */}
      <group position={[-1.6, 0, 2.2]} rotation={[0, 0, 0]}>
        <RigidBody type="fixed" colliders="cuboid">
          {/* Desktop 1.6 × 0.8 (reduced from 1.8×1.0 — less pale mass) */}
          <mesh position={[0, 0.73, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.04, 1.0]} />
            <FacilityMaterial kind="wood" color="#3a2a1a" />
          </mesh>
          {/* Left leg */}
          <mesh position={[-0.76, 0.365, 0]} castShadow>
            <boxGeometry args={[0.04, 0.73, 0.92]} />
            <FacilityMaterial kind="painted-metal" color="#222826" />
          </mesh>
          {/* Right leg */}
          <mesh position={[0.76, 0.365, 0]} castShadow>
            <boxGeometry args={[0.04, 0.73, 0.92]} />
            <FacilityMaterial kind="painted-metal" color="#222826" />
          </mesh>
          {/* Modesty panel on NORTH side (+z) — visitor cannot see under */}
          <mesh position={[0, 0.42, 0.47]} castShadow>
            <boxGeometry args={[1.52, 0.52, 0.02]} />
            <FacilityMaterial kind="painted-metal" color="#1b201e" />
          </mesh>
        </RigidBody>

        {/* Employee chair — pushed partially in. 1.5 m eye height, seated ≈1.1 m
            top-of-head, so chair seat at ~0.45 m is proportionally correct. */}
        <RigidBody type="fixed" colliders="cuboid">
          <mesh position={[0, 0.225, -0.55]} castShadow>
            <boxGeometry args={[0.48, 0.05, 0.48]} />
            <FacilityMaterial kind="painted-metal" color="#1a1f1c" />
          </mesh>
          <mesh position={[0, 0.56, -0.77]} castShadow>
            <boxGeometry args={[0.48, 0.6, 0.04]} />
            <FacilityMaterial kind="painted-metal" color="#1a1f1c" />
          </mesh>
          <mesh position={[-0.2, 0.11, -0.55]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.22]} />
            <FacilityMaterial kind="painted-metal" color="#121513" />
          </mesh>
          <mesh position={[0.2, 0.11, -0.55]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.22]} />
            <FacilityMaterial kind="painted-metal" color="#121513" />
          </mesh>
        </RigidBody>

        {/* ── Hero props, desktop Y = 0.75 + object bottom clearance ── */}

        {/* 1. CRTMonitor — 14-inch-ish. Base bottom at Y=0.755 (on top of
             desktop Y=0.73 + tiny 0.025 gap to account for texture).
             Total monitor height ≈ 0.04+0.06+0.3 = 0.4, top ≈ 1.16 m.
             Placed toward back of desk (+z=+0.2) so keyboard fits in front. */}
        <CRTMonitor position={[0.22, 0.755, 0.08]} rotation={[0, -0.06, 0]} on />

        {/* 2. Keyboard — in front of monitor, Y = desktop top + thickness. */}
        <Keyboard position={[0.2, 0.731, -0.28]} rotation={[0, 0, 0]} />

        {/* 3. Springer Capital / Experience plaque — physical desk standee.
             Stands slightly leaned back on its own plinth, not a floating plane. */}
        <group position={[-0.42, 0.73, 0.12]} rotation={[0, 0.04, 0]}>
          <mesh position={[0, 0.005, -0.02]} castShadow>
            <boxGeometry args={[0.22, 0.01, 0.06]} />
            <FacilityMaterial kind="archive-brass" />
          </mesh>
          <mesh position={[0, 0.12, 0.005]} rotation={[-0.12, 0, 0]} castShadow>
            <boxGeometry args={[0.2, 0.24, 0.012]} />
            <FacilityMaterial kind="wood" color="#2a1e12" />
          </mesh>
          <InteractableObject
            interactionRange={1.4}
            label={`${springerExperience.company} record`}
            interactionKind="READ"
            onInteract={() =>
              inspectDocument({
                id: `EXP-${springerExperience.company.toUpperCase().replace(/\s+/g, "_")}`,
                title: `${springerExperience.company} - ${springerExperience.role}`,
                type: "dossier",
                content: formatExperienceDocument(springerExperience),
              })
            }
          >
            <mesh position={[0, 0.12, 0.013]} rotation={[-0.12, 0, 0]}>
              <boxGeometry args={[0.18, 0.22, 0.002]} />
              <meshStandardMaterial color="#e5dfcf" roughness={0.85} />
            </mesh>
            <Text
              position={[0, 0.15, 0.016]}
              rotation={[-0.12, 0, 0]}
              fontSize={0.018}
              color="#181e1a"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.16}
              material-toneMapped={false}
            >
              {springerExperience.company.toUpperCase()}
            </Text>
          </InteractableObject>
        </group>

        {/* 4. Important document: DOC-MANIFESTO (Auxilium Engineering manifesto).
             Paper is 0.004 m thick, rests on desktop Y=0.73. Top of paper ≈ 0.734. */}
        <group position={[-0.42, 0.731, -0.24]} rotation={[0, 0.12, 0]}>
          <DocumentProp
            position={[0, 0, 0]}
            document={{
              id: "DOC-MANIFESTO",
              title: "AUXILIUM ENGINEERING — DEPARTMENT MANIFESTO",
              type: "note",
              content:
                "1. Engineering discipline exists to serve human clarity.\n2. Simplicity without capability is hollow. Capability without restraint is harm.\n3. The system is honest only when its failures are visible.\n\n\"Don't forget why you started.\"",
            }}
          />
          <Pen position={[0.12, 0.006, 0.02]} rotation={[0, 0.35, -0.1]} />
        </group>

        {/* 5. Single restrained personal / story object: FamilyPhoto.
             Stand-back-leaned frame, stand sits on desktop. */}
        <FamilyPhoto position={[-0.05, 0.73, 0.4]} rotation={[0, -0.08, 0]} />
      </group>

      {/* ═══════════════════════════════════════════════
        ZONE C · IDENTITY / INTAKE DESK · NE QUADRANT
        World anchor: x=+1.6, z=+2.2, rotation = [0, 0, 0].
        Employee sits on SOUTH side (−z) facing NORTH (+z) into the desk.
        Visitor / applicant approaches from NORTH (+z), across the desk,
        where the modesty panel is NOT placed (desk front is open on the
        north visitor side). Correct seating: guest stands at z≈+2.9,
        employee in chair at z≈+1.4.
        ═══════════════════════════════════════════════ */}
      <group position={[1.6, 0, -2.7]} rotation={[0, 0, 0]}>
        <RigidBody type="fixed" colliders="cuboid">
          {/* Desktop 1.6 × 0.85 m — institutional veneer */}
          <mesh position={[0, 0.73, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.04, 0.85]} />
            <FacilityMaterial kind="wood" color="#402e1c" />
          </mesh>
          {/* Legs */}
          <mesh position={[-0.76, 0.365, 0]} castShadow>
            <boxGeometry args={[0.04, 0.73, 0.77]} />
            <FacilityMaterial kind="painted-metal" color="#222826" />
          </mesh>
          <mesh position={[0.76, 0.365, 0]} castShadow>
            <boxGeometry args={[0.04, 0.73, 0.77]} />
            <FacilityMaterial kind="painted-metal" color="#222826" />
          </mesh>
          {/* Modesty panel on the EMPLOYEE / SOUTH side (−z=−0.4). The
              north/+z face has no panel — this is the visitor approach side. */}
          <mesh position={[0, 0.42, -0.40]} castShadow>
            <boxGeometry args={[1.52, 0.52, 0.02]} />
            <FacilityMaterial kind="painted-metal" color="#1b201e" />
          </mesh>
        </RigidBody>

        {/* Employee chair — NOT displaced. Correctly seated. Seat bottom = 0.45 m.
            Placed at z=−0.55 (south side) as intended, matching modesty panel side. */}
        <RigidBody type="fixed" colliders="cuboid">
          <mesh position={[0, 0.225, -0.55]} castShadow>
            <boxGeometry args={[0.46, 0.05, 0.46]} />
            <FacilityMaterial kind="painted-metal" color="#1a1f1c" />
          </mesh>
          <mesh position={[0, 0.56, -0.77]} castShadow>
            <boxGeometry args={[0.46, 0.6, 0.04]} />
            <FacilityMaterial kind="painted-metal" color="#1a1f1c" />
          </mesh>
          <mesh position={[-0.19, 0.11, -0.55]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.22]} />
            <FacilityMaterial kind="painted-metal" color="#121513" />
          </mesh>
          <mesh position={[0.19, 0.11, -0.55]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.22]} />
            <FacilityMaterial kind="painted-metal" color="#121513" />
          </mesh>
        </RigidBody>

        {/* Monitor on intake desk. Proportional 0.36-wide casing (≈13 in).
             Bottom Y=0.755 on top of desktop Y=0.73. Placed back/center. */}
        <group position={[0.05, 0.755, 0.0]}>
          <group rotation={[0, -0.04, 0]}>
            <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.18, 0.04, 0.18]} />
              <FacilityMaterial kind="painted-metal" color="#1a1f1d" />
            </mesh>
            <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.036, 0.055, 0.055]} />
              <FacilityMaterial kind="painted-metal" color="#141816" />
            </mesh>
            <mesh position={[0, 0.21, 0]} rotation={[-0.06, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.36, 0.27, 0.26]} />
              <FacilityMaterial kind="painted-metal" color="#1a1f1d" />
            </mesh>
            <mesh position={[0, 0.21, 0.134]} rotation={[-0.06, 0, 0]} receiveShadow>
              <planeGeometry args={[0.3, 0.21]} />
              <meshStandardMaterial color="#0e1f16" emissive="#34ffb6" emissiveIntensity={0.9} roughness={0.2} metalness={0.6} />
            </mesh>
          </group>
        </group>

        {/* DOC-PASSWORD intake login record sheet on visitor side of desk.
             Paper top: 0.73 + 0.004 = 0.734 m. Visitor reads this easily. */}
        <group position={[0.0, 0.731, 0.26]} rotation={[0, -0.05, 0]}>
          <DocumentProp
            position={[0, 0, 0]}
            document={{
              id: "DOC-PASSWORD",
              title: "ACCESS INTAKE — LOGIN WORKSHEET",
              type: "note",
              content:
                "Intake login:\n  username: kapoor.a\n\nPassword hints (rotate every 90 days):\n  1. ICETM2026\n  2. LOCALFIRST\n  3. NOCLOUD",
            }}
          />
        </group>

        {/* Intake desk phone. Resting fully on desktop. Bottom: 0.73 + 0.03 = 0.76. */}
        <DeskPhone position={[-0.48, 0.76, 0.14]} rotation={[0, 0.08, 0]} />

        {/* Pen beside intake form, fully on desk. */}
        <Pen position={[0.32, 0.738, 0.34]} rotation={[0, 0.5, 0.05]} />

        {/* Single personal object: CoffeeMug on employee side of desk.
             Mug bottom at 0.735, on top of desktop Y=0.73. */}
        <CoffeeMug position={[-0.48, 0.735, -0.18]} />
      </group>

      {/* Filing bank: west-south stub wall only. Drawers face +X into the room.
          0.85 m drawer standoff (x ∈ [-3.1, -2.25]). Not behind either desk.
          Outside timeline prism (x∈[+1, +3.88], z∈[-2, +2]). */}
      <group position={[0, 0, 0]}>
        <FilingCabinet position={[-3.5, 0, -3.6]} rotation={[0, -Math.PI / 2, 0]} cabinetId="PERSONNEL_CABINET_1" />
        <group position={[-3.5, 0, -2.75]} rotation={[0, -Math.PI / 2, 0]}>
          <FilingCabinet position={[0, 0, 0]} cabinetId="PERSONNEL_CABINET_2" />
          <mesh position={[0, 1.5, 0.455]} castShadow receiveShadow>
            <boxGeometry args={[0.76, 0.3, 0.055]} />
            <FacilityMaterial kind="painted-metal" color="#3b454d" />
          </mesh>
          <mesh position={[0, 1.5, 0.405]}>
            <boxGeometry args={[0.48, 0.16, 0.01]} />
            <meshStandardMaterial color="#c8bda4" roughness={0.9} metalness={0} />
          </mesh>
        </group>
        <FilingCabinet position={[-3.5, 0, -1.9]} rotation={[0, -Math.PI / 2, 0]} cabinetId="PERSONNEL_CABINET_3" />

        <ArchiveBoxStack position={[-3.5, 1.82, -1.9]} rotation={[0, -Math.PI / 2 + 0.04, 0]} count={1} />
        <PaperworkStack position={[-3.5, 1.82, -3.6]} rotation={[0, -Math.PI / 2 - 0.08, 0]} folderColor="#44382c" sheets={8} />

        <OfficePrinter position={[0.2, 0, 3.55]} rotation={[0, Math.PI, 0]} />

        <FacilitySignPanel
          position={[-3.88, 2.35, -2.75]}
          rotation={[0, Math.PI / 2, 0]}
          title="PERSONNEL RECORDS"
          subtitle="SECTION-02 · FILE CONSOLIDATION ACTIVE"
          accent="#c9b98f"
        />

        <FloorScuffDecal position={[-2.55, 0.008, -2.75]} scale={[0.7, 1.6]} opacity={0.42} />
        <FloorScuffDecal position={[-2.6, 0.008, -2.1]} scale={[0.55, 1.0]} opacity={0.38} />
      </group>

      {/* ── Remaining ambient detail (not new visual layers; trimmed to stay
           inside Task 9 per-room cap of ≤ 5 scuffs per family). Current scuff
           count here = 3 (2 on filing standoff + 1 by Zone B desk). ── */}
      <FloorScuffDecal position={[-1.6, 0.008, 1.2]} scale={[1.1, 0.6]} opacity={0.4} />
      <WaterStainDecal position={[-1.5, 2.88, 2.0]} size={1.1} opacity={0.35} />
      <CableConduitRun position={[0, 2.85, -3.88]} rotation={[0, 0, Math.PI / 2]} length={7.5} />

      <FacilityFluorescent position={[-0.8, 2.78, -1.2]} color="#e5dbc4" intensity={1.2} distance={5.5} />
      <FacilityFluorescent position={[1.6, 2.78, 1.4]} color="#d8e4d3" intensity={1.0} distance={4.8} />
      <FacilityTaskLight position={[-1.6, 1.75, 2.2]} color="#e4d6ad" />
      <FacilityTaskLight position={[1.6, 1.75, -2.7]} color="#e4d6ad" />
    </group>
  );
}
