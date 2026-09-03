import React from "react";
import { RoomProps } from "../types";
import { RoomFloor, RoomCeiling, RoomWall, CeilingPipes, HVACVent } from "../props/RoomArchitecture";
import { FilingCabinet } from "../props/FilingCabinet";
import { portfolioManifest } from "@/data/portfolioData";
import { FacilitySignPanel } from "../props/FacilityKit";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useGameState } from "../../useGameState";
import { ArchiveBoxStack, PaperworkStack, FloorScuffDecal, CableConduitRun } from "../props/EnvironmentalProps";
import { FacilityMaterial } from "../materials/FacilityMaterials";
import {
  FlagshipExhibitPedestal,
  ProjectDossierBinder,
  ResearchFolio,
} from "../props/PortfolioExhibits";

const binderColors = ["#1b2a38", "#2d3e4e", "#3a2618", "#243c2c", "#3c3226", "#442222", "#1f3330", "#382e38"];

function DenseShelfRow({ yOffset, shelfWidth = 1.5 }: { yOffset: number; shelfWidth?: number }) {
  const count = 12;
  const spacing = (shelfWidth - 0.2) / count;

  return (
    <group position={[-shelfWidth / 2 + 0.1, yOffset, 0]}>
      {Array.from({ length: count }).map((_, i) => {
        const color = binderColors[(i * 3 + Math.floor(yOffset * 10)) % binderColors.length];
        const height = 0.26 + ((i * 7) % 5) * 0.015;
        const depth = 0.22 + ((i * 3) % 4) * 0.01;
        const width = 0.038 + ((i * 5) % 3) * 0.008;

        return (
          <mesh
            key={`binder-${yOffset}-${i}`}
            position={[i * spacing, height / 2, 0]}
            rotation={[0, 0, (i === 4 ? 0.08 : 0)]}
            castShadow
          >
            <boxGeometry args={[width, height, depth]} />
            <FacilityMaterial kind="painted-metal" color={color} />
          </mesh>
        );
      })}
    </group>
  );
}

function ArchiveShelf({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Heavy Steel Upright Posts (4 Corners) */}
      <mesh position={[-0.8, 1.0, -0.14]} castShadow>
        <boxGeometry args={[0.04, 2.0, 0.04]} />
        <FacilityMaterial kind="painted-metal" color="#1a2228" />
      </mesh>
      <mesh position={[-0.8, 1.0, 0.14]} castShadow>
        <boxGeometry args={[0.04, 2.0, 0.04]} />
        <FacilityMaterial kind="painted-metal" color="#1a2228" />
      </mesh>
      <mesh position={[0.8, 1.0, -0.14]} castShadow>
        <boxGeometry args={[0.04, 2.0, 0.04]} />
        <FacilityMaterial kind="painted-metal" color="#1a2228" />
      </mesh>
      <mesh position={[0.8, 1.0, 0.14]} castShadow>
        <boxGeometry args={[0.04, 2.0, 0.04]} />
        <FacilityMaterial kind="painted-metal" color="#1a2228" />
      </mesh>

      {/* 5 Shelf Levels */}
      {[0.08, 0.52, 0.98, 1.45, 1.92].map((lvl) => (
        <mesh key={`shelf-tier-${lvl}`} position={[0, lvl, 0]} receiveShadow>
          <boxGeometry args={[1.64, 0.03, 0.32]} />
          <FacilityMaterial kind="painted-metal" color="#263138" />
        </mesh>
      ))}

      {/* Dense Row of Binders on Lower/Middle Tiers */}
      <DenseShelfRow yOffset={0.1} />
      <DenseShelfRow yOffset={0.54} />
      <DenseShelfRow yOffset={1.47} />

      {/* Cardboard Storage Boxes on Upper Tiers */}
      <ArchiveBox position={[-0.45, 1.13, 0]} color="#5a4738" />
      <ArchiveBox position={[0.45, 1.13, 0]} color="#483a2c" rotation={[0, 0.1, 0]} />
      <ArchiveBox position={[-0.2, 1.6, 0]} color="#544335" />
      <ArchiveBox position={[0.35, 1.6, 0]} color="#4a3b2e" />
    </group>
  );
}

function ArchiveBox({
  position,
  rotation = [0, 0, 0],
  color = "#5a4a3a",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={[0.36, 0.24, 0.26]} />
      <FacilityMaterial kind="wood" color={color} />
    </mesh>
  );
}

export function RecordsHall({ position }: RoomProps) {
  const inspectDocument = useGameState((state) => state.inspectDocument);

  // Projects data
  const flagships = portfolioManifest.projects.flagshipExhibits;
  const dossiers = portfolioManifest.projects.detailedDossiers;
  const archives = portfolioManifest.projects.archiveRecords;
  const publications = portfolioManifest.publications;

  return (
    <group position={position}>
      {/* ─── ARCHITECTURE ─── */}
      <RoomFloor args={[8.5, 10.5]} position={[0, -0.5, -0.25]} kind="dirty-floor" />
      <RoomCeiling args={[8.5, 0.1, 10.5]} position={[0, 2.9, -0.25]} hasLights={false} kind="ceiling-panel" />

      <RoomWall position={[0, 0, -5]} args={[8, 3.2, 0.2]} kind="painted-plaster" color="#647068" />
      <RoomWall position={[-4, 0, 0]} args={[0.2, 3.2, 10]} kind="painted-plaster" color="#647068" />
      <RoomWall position={[4, 0, 0]} args={[0.2, 3.2, 10]} kind="painted-plaster" color="#647068" />
      <RoomWall position={[-2.75, 0, 5]} args={[2.5, 3.2, 0.2]} kind="painted-plaster" color="#647068" />
      <RoomWall position={[2.75, 0, 5]} args={[2.5, 3.2, 0.2]} kind="painted-plaster" color="#647068" />
      <mesh position={[0, 3.0, 5]}>
        <boxGeometry args={[3.0, 0.4, 0.2]} />
        <FacilityMaterial kind="painted-metal" color="#2c363d" />
      </mesh>
      <FacilitySignPanel position={[0, 2.55, 4.87]} title="RECORDS HALL // PROJECT ARCHIVE" subtitle="FLAGSHIPS // DOSSIERS // RESEARCH PUBLICATIONS" accent="#00e5c0" />

      {/* Ceiling Utilities */}
      <CeilingPipes position={[-2, 2.75, 0]} rotation={[0, -Math.PI / 2, 0]} length={8} />
      <CeilingPipes position={[2, 2.75, 0]} rotation={[0, -Math.PI / 2, 0]} length={8} />
      <HVACVent position={[0, 2.65, -3]} />
      <HVACVent position={[0, 2.65, 3]} />

      {/* Ambient & Focal Lighting (Balanced Fill, No Black Crush) */}
      <spotLight position={[0, 2.8, 0]} target-position={[0, 0, 0]} angle={1.1} penumbra={0.6} intensity={2.2} distance={10} color="#e0d4be" />
      <pointLight position={[-2, 2.4, -2]} color="#c2d5d8" intensity={1.2} distance={6} decay={2} />
      <pointLight position={[2, 2.4, 2]} color="#d8c5a2" intensity={1.2} distance={6} decay={2} />

      {/* ─── 1. FLAGSHIP EXHIBITS (InfraMind, Auxilium Digital Archive, Metis) ─── */}
      {flagships[0] && (
        <FlagshipExhibitPedestal
          position={[-2.6, 0, 3.2]}
          rotation={[0, 0.3, 0]}
          project={flagships[0]}
          accentColor="#00e5ff"
        />
      )}
      {flagships[1] && (
        <FlagshipExhibitPedestal
          position={[0, 0, 3.5]}
          rotation={[0, 0, 0]}
          project={flagships[1]}
          accentColor="#00ff88"
        />
      )}
      {flagships[2] && (
        <FlagshipExhibitPedestal
          position={[2.6, 0, 3.2]}
          rotation={[0, -0.3, 0]}
          project={flagships[2]}
          accentColor="#ffaa00"
        />
      )}

      {/* ─── 2. DENSE ARCHIVE SHELVING UNITS (West & East Walls) ─── */}
      <ArchiveShelf position={[-3.3, 0, -3]} />
      <ArchiveShelf position={[-3.3, 0, -0.5]} />
      <ArchiveShelf position={[-3.3, 0, 2]} />
      <ArchiveShelf position={[3.3, 0, -3]} rotation={[0, Math.PI, 0]} />
      <ArchiveShelf position={[3.3, 0, -0.5]} rotation={[0, Math.PI, 0]} />
      <ArchiveShelf position={[3.3, 0, 2]} rotation={[0, Math.PI, 0]} />

      {/* ─── 3. INTERACTIVE ARCHIVE PROJECT BINDERS ON SHELVES ─── */}
      {/* West Shelf 1: Student OS & YatinVeda */}
      {archives[0] && <ProjectDossierBinder position={[-3.3, 1.01, -3.2]} rotation={[0, 0.1, 0]} project={archives[0]} folderColor="#24384c" />}
      {archives[1] && <ProjectDossierBinder position={[-3.3, 1.01, -2.8]} rotation={[0, -0.05, 0]} project={archives[1]} folderColor="#2d4256" />}
      
      {/* West Shelf 2: Reconcilyx & GCP OmniStream */}
      {archives[2] && <ProjectDossierBinder position={[-3.3, 1.01, -0.7]} rotation={[0, 0.08, 0]} project={archives[2]} folderColor="#166050" />}
      {archives[3] && <ProjectDossierBinder position={[-3.3, 1.01, -0.3]} rotation={[0, -0.12, 0]} project={archives[3]} folderColor="#1e6b42" />}

      {/* East Shelf 1: AWS CloudOps & AWS Helix */}
      {archives[4] && <ProjectDossierBinder position={[3.3, 1.01, -3.2]} rotation={[0, Math.PI + 0.1, 0]} project={archives[4]} folderColor="#8a4414" />}
      {archives[5] && <ProjectDossierBinder position={[3.3, 1.01, -2.8]} rotation={[0, Math.PI - 0.05, 0]} project={archives[5]} folderColor="#9c561a" />}

      {/* East Shelf 2: Fashion Feet & Odysseus (Fork Attribution) */}
      {archives[6] && <ProjectDossierBinder position={[3.3, 1.01, -0.7]} rotation={[0, Math.PI + 0.05, 0]} project={archives[6]} folderColor="#583470" />}
      {archives[7] && <ProjectDossierBinder position={[3.3, 1.01, -0.3]} rotation={[0, Math.PI - 0.1, 0]} project={archives[7]} folderColor="#205882" />}

      {/* Rear Filing Cabinets */}
      <FilingCabinet position={[-3, 0, -4.5]} rotation={[0, Math.PI / 2, 0]} cabinetId="ARCHIVE_CABINET_1" />
      <FilingCabinet position={[-1, 0, -4.5]} rotation={[0, Math.PI / 2, 0]} cabinetId="ARCHIVE_CABINET_2" />
      <FilingCabinet position={[1, 0, -4.5]} rotation={[0, Math.PI / 2, 0]} cabinetId="ARCHIVE_CABINET_3" />
      <FilingCabinet position={[3, 0, -4.5]} rotation={[0, Math.PI / 2, 0]} cabinetId="ARCHIVE_CABINET_4" />

      {/* ─── 4. DETAILED DOSSIER TABLES (West & East Sides) ─── */}
      {/* West Table: Multi-Cloud Serverless Analytics & DayOne AI */}
      <group position={[-1.7, 0, 0.8]}>
        <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.06, 1.6]} />
          <FacilityMaterial kind="wood" color="#443428" />
        </mesh>
        <mesh position={[-0.35, 0.42, -0.7]}><cylinderGeometry args={[0.03, 0.03, 0.85]} /><FacilityMaterial kind="painted-metal" color="#182025" /></mesh>
        <mesh position={[0.35, 0.42, -0.7]}><cylinderGeometry args={[0.03, 0.03, 0.85]} /><FacilityMaterial kind="painted-metal" color="#182025" /></mesh>
        <mesh position={[-0.35, 0.42, 0.7]}><cylinderGeometry args={[0.03, 0.03, 0.85]} /><FacilityMaterial kind="painted-metal" color="#182025" /></mesh>
        <mesh position={[0.35, 0.42, 0.7]}><cylinderGeometry args={[0.03, 0.03, 0.85]} /><FacilityMaterial kind="painted-metal" color="#182025" /></mesh>
        {dossiers[0] && (
          <ProjectDossierBinder
            position={[0.0, 0.94, -0.35]}
            rotation={[0, 0.15, 0]}
            project={dossiers[0]}
            folderColor="#163850"
          />
        )}
        {dossiers[1] && (
          <ProjectDossierBinder
            position={[0.0, 0.94, 0.35]}
            rotation={[0, -0.1, 0]}
            project={dossiers[1]}
            folderColor="#44325c"
          />
        )}
      </group>

      {/* East Table: Poseidon (Bounded Non-Flagship Dossier) */}
      <group position={[1.7, 0, 0.8]}>
        <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.06, 1.6]} />
          <FacilityMaterial kind="wood" color="#443428" />
        </mesh>
        <mesh position={[-0.35, 0.42, -0.7]}><cylinderGeometry args={[0.03, 0.03, 0.85]} /><FacilityMaterial kind="painted-metal" color="#182025" /></mesh>
        <mesh position={[0.35, 0.42, -0.7]}><cylinderGeometry args={[0.03, 0.03, 0.85]} /><FacilityMaterial kind="painted-metal" color="#182025" /></mesh>
        <mesh position={[-0.35, 0.42, 0.7]}><cylinderGeometry args={[0.03, 0.03, 0.85]} /><FacilityMaterial kind="painted-metal" color="#182025" /></mesh>
        <mesh position={[0.35, 0.42, 0.7]}><cylinderGeometry args={[0.03, 0.03, 0.85]} /><FacilityMaterial kind="painted-metal" color="#182025" /></mesh>
        {dossiers[2] && (
          <ProjectDossierBinder
            position={[0.0, 0.94, 0]}
            rotation={[0, Math.PI + 0.1, 0]}
            project={dossiers[2]}
            folderColor="#1e5436"
          />
        )}
      </group>

      {/* ─── 5. CENTRAL ARCHIVE CATALOGUE & RESEARCH LIBRARY ─── */}
      <group position={[0, 0, -1.2]}>
        {/* Table Structure */}
        <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.08, 1.0]} />
          <FacilityMaterial kind="wood" color="#46362a" />
        </mesh>
        <mesh position={[-0.75, 0.42, -0.38]}><cylinderGeometry args={[0.04, 0.04, 0.85]} /><FacilityMaterial kind="painted-metal" color="#182025" /></mesh>
        <mesh position={[0.75, 0.42, -0.38]}><cylinderGeometry args={[0.04, 0.04, 0.85]} /><FacilityMaterial kind="painted-metal" color="#182025" /></mesh>
        <mesh position={[-0.75, 0.42, 0.38]}><cylinderGeometry args={[0.04, 0.04, 0.85]} /><FacilityMaterial kind="painted-metal" color="#182025" /></mesh>
        <mesh position={[0.75, 0.42, 0.38]}><cylinderGeometry args={[0.04, 0.04, 0.85]} /><FacilityMaterial kind="painted-metal" color="#182025" /></mesh>

        {/* Central Master Catalogue Dossier */}
        <InteractableObject
          label="Master archive catalogue"
          interactionKind="VIEW"
          priority={3}
          onInteract={() =>
            inspectDocument({
              id: "VIEW-MASTER-CATALOGUE",
              title: "AUXILIUM MASTER ARCHIVE CATALOGUE",
              type: "dossier",
              content: [
                "AUXILIUM MASTER ARCHIVE CATALOGUE // VERIFIED PROJECTS & RESEARCH",
                "",
                "FLAGSHIP EXHIBITS:",
                flagships.map((f) => `• ${f.name} - ${f.oneLiner}`).join("\n"),
                "",
                "DETAILED DOSSIERS:",
                dossiers.map((d) => `• ${d.name} - ${d.oneLiner}`).join("\n"),
                "",
                "ARCHIVE RECORDS:",
                archives.map((a) => `• ${a.name} [${a.category}]`).join("\n"),
                "",
                "RESEARCH PUBLICATIONS:",
                publications.map((p) => `• ${p.title} (${p.venue})`).join("\n"),
              ].join("\n"),
            })
          }
        >
          <PaperworkStack position={[0.0, 0.93, -0.2]} rotation={[0, 0.05, 0]} folderColor="#5c3826" sheets={18} />
        </InteractableObject>

        {/* Research Publication 1: Zenodo Post-Quantum Cryptography */}
        {publications[0] && (
          <ResearchFolio
            position={[-0.45, 0.93, 0.18]}
            rotation={[0, 0.2, 0]}
            publication={publications[0]}
          />
        )}

        {/* Research Publication 2: ICETM 2026 AI Survey */}
        {publications[1] && (
          <ResearchFolio
            position={[0.45, 0.93, 0.18]}
            rotation={[0, -0.15, 0]}
            publication={publications[1]}
          />
        )}
      </group>

      {/* Environmental Decals & Conduits */}
      <ArchiveBoxStack position={[-3.0, 0, 3.8]} rotation={[0, 0.3, 0]} count={3} />
      <ArchiveBoxStack position={[3.0, 0, 3.8]} rotation={[0, -0.2, 0]} count={2} />
      <FloorScuffDecal position={[0, 0.008, 0]} scale={[2.2, 1.6]} opacity={0.4} />
      <CableConduitRun position={[0, 2.85, -4.88]} rotation={[0, 0, Math.PI / 2]} length={7.8} />

      {/* Wall Discipline Signage Mounted on Metal Plaques */}
      <FacilitySignPanel position={[-3.85, 2.2, -1.8]} rotation={[0, Math.PI / 2, 0]} title="BACKEND & CLOUD SYSTEMS" subtitle="MICROSERVICES & DISTRIBUTED INFRASTRUCTURE" accent="#d4c3a0" />
      <FacilitySignPanel position={[-3.85, 2.2, 1.2]} rotation={[0, Math.PI / 2, 0]} title="PLATFORM ENGINEERING" subtitle="STREAMING DATA & CLOUDOPS" accent="#d4c3a0" />
      <FacilitySignPanel position={[3.85, 2.2, -1.8]} rotation={[0, -Math.PI / 2, 0]} title="AI AGENT SYSTEMS" subtitle="LOCAL-FIRST & COGNITIVE WORKBENCH" accent="#8fe0d0" />
      <FacilitySignPanel position={[3.85, 2.2, 1.2]} rotation={[0, -Math.PI / 2, 0]} title="RESEARCH & PUBLICATIONS" subtitle="CRYPTOGRAPHY & AI ARCHITECTURE" accent="#8fe0d0" />
    </group>
  );
}
