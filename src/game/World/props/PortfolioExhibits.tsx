import React from "react";
import { Text } from "@react-three/drei";
import { InteractableObject } from "../../Interactables/InteractableObject";
import { useGameState } from "../../useGameState";
import { ProjectEntry, PublicationEntry, ExperienceEntry } from "@/data/portfolioData";
import { FacilityMaterial } from "../materials/FacilityMaterials";

type Position = [number, number, number];
type Rotation = [number, number, number];

/**
 * Format a project entry into a rich, structured dossier text for DocumentOverlay
 */
export function formatProjectDossier(project: ProjectEntry): string {
  const parts: string[] = [
    `PROJECT: ${project.name.toUpperCase()}`,
    `CATEGORY: ${project.category}`,
    `TIER: ${project.displayTier}`,
    `STATUS: ${project.lifecycleStatus}`,
    "",
    `OVERVIEW:`,
    project.oneLiner,
    "",
    `CASE STUDY & PROBLEM:`,
    project.caseStudyDescription,
    "",
    `CORE TECHNOLOGIES:`,
    project.technologies.map((t) => `• ${t}`).join("\n"),
    "",
    `IMPLEMENTED FEATURES:`,
    project.implementedFeatures.map((f) => `• ${f}`).join("\n"),
    "",
    `CONTRIBUTION & OWNERSHIP:`,
    `Ownership Model: ${project.ownershipModel}`,
    `Exact Contribution: ${project.exactContribution}`,
    "",
    `EVIDENCE & VERIFICATION:`,
    project.evidenceSummary,
  ];

  if (project.repositoryUrl) {
    parts.push("", `REPOSITORY: ${project.repositoryUrl}`);
  }
  if (project.liveDemoUrl) {
    parts.push(`LIVE DEMO: ${project.liveDemoUrl}`);
  }
  if (project.knownLimitations && project.knownLimitations.length > 0) {
    parts.push("", `KNOWN LIMITATIONS & BOUNDS:`, project.knownLimitations.map((l) => `• ${l}`).join("\n"));
  }

  return parts.join("\n");
}

/**
 * Format a publication entry into a structured research document
 */
export function formatPublicationDocument(pub: PublicationEntry): string {
  return [
    `RESEARCH PUBLICATION`,
    `TITLE: ${pub.title}`,
    `VENUE / PLATFORM: ${pub.venue}`,
    `STATUS: ${pub.statusLine}`,
    "",
    `SUMMARY:`,
    pub.factualDescription,
    "",
    `DETAILS & NOTES:`,
    pub.notes.map((n) => `• ${n}`).join("\n"),
    pub.sourceUrl ? `\nRECORD URL: ${pub.sourceUrl}` : "",
  ].join("\n");
}

/**
 * Format an experience entry into a professional internship document
 */
export function formatExperienceDocument(exp: ExperienceEntry): string {
  return [
    `PROFESSIONAL EXPERIENCE RECORD`,
    `COMPANY: ${exp.company.toUpperCase()}`,
    `ROLE: ${exp.role}`,
    `DURATION: ${exp.duration}`,
    `LOCATION: ${exp.location}`,
    "",
    `RESPONSIBILITIES & SCOPE:`,
    exp.bullets.map((b) => `• ${b}`).join("\n"),
    "",
    `FACTUAL OVERVIEW:`,
    exp.factualDescription,
  ].join("\n");
}

/**
 * Illuminated Archival Exhibit Station (For InfraMind, Auxilium, Metis)
 * Museum/archive-grade pedestal with tempered glass vitrine, interior spotlight, and engraved plaque.
 */
export function FlagshipExhibitPedestal({
  position,
  rotation = [0, 0, 0],
  project,
  accentColor = "#00e5ff",
}: {
  position: Position;
  rotation?: Rotation;
  project: ProjectEntry;
  accentColor?: string;
}) {
  const inspectDocument = useGameState((state) => state.inspectDocument);

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Heavy Chamfered Base Plinth (Dark Brushed Steel / Museum Slate) */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.9, 0.85]} />
        <FacilityMaterial kind="painted-metal" color="#182025" />
      </mesh>

      {/* Base Plinth Kickplate & Top Collar */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[1.12, 0.08, 0.92]} />
        <FacilityMaterial kind="painted-metal" color="#101518" />
      </mesh>
      <mesh position={[0, 0.91, 0]}>
        <boxGeometry args={[1.08, 0.04, 0.88]} />
        <FacilityMaterial kind="painted-metal" color="#263138" />
      </mesh>

      {/* 2. Velvet / Matte Display Stage Inside Vitrine */}
      <mesh position={[0, 0.94, 0]}>
        <boxGeometry args={[0.85, 0.04, 0.65]} />
        <FacilityMaterial kind="painted-metal" color="#14181a" />
      </mesh>

      {/* Physical Project Dossier Folio binder on angled reading mount inside vitrine */}
      <group position={[0, 1.05, 0]} rotation={[0.25, 0, 0]}>
        {/* Folio Binder Cover */}
        <mesh castShadow>
          <boxGeometry args={[0.48, 0.03, 0.36]} />
          <FacilityMaterial kind="painted-metal" color="#283238" />
        </mesh>
        {/* Paper Document Insert with Project Title — lit material so the page
            reads as a document under the dim case light, not as a self-lit
            white rectangle that turns the vitrine into a glowing panel. */}
        <mesh position={[0, 0.018, 0]}>
          <planeGeometry args={[0.44, 0.32]} />
          <meshStandardMaterial color="#d8cfbc" roughness={0.88} />
        </mesh>
        <Text
          position={[0, 0.02, 0.04]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.034}
          color="#151b18"
          anchorX="center"
          material-toneMapped={false}
        >
          {project.name.toUpperCase()}
        </Text>
      </group>

      {/* 3. Tempered Museum Glass Vitrine Case */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[0.92, 0.44, 0.72]} />
        <FacilityMaterial kind="glass" color="#a0d4d0" />
      </mesh>
      {/* Vitrine Metal Top Cap Frame */}
      <mesh position={[0, 1.38, 0]}>
        <boxGeometry args={[0.94, 0.02, 0.74]} />
        <FacilityMaterial kind="painted-metal" color="#222b30" />
      </mesh>

      {/* 4. Subtle Interior Vitrine Showcase Light — dim pool so the case
          stays identifiable without glowing like a lit rectangle in the room. */}
      <pointLight position={[0, 1.32, 0]} color={accentColor} intensity={0.22} distance={1.7} decay={2} />

      {/* 5. Front Angled Display Plaque (Engraved Anodized Metal) */}
      <group position={[0, 0.65, 0.45]} rotation={[-0.24, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.88, 0.36, 0.02]} />
          <FacilityMaterial kind="painted-metal" color="#202a32" />
        </mesh>
        {/* Brass Header Border */}
        <mesh position={[0, 0.16, 0.012]}>
          <boxGeometry args={[0.82, 0.008, 0.004]} />
          <FacilityMaterial kind="archive-brass" />
        </mesh>
        <Text
          position={[0, 0.08, 0.02]}
          fontSize={0.062}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          {project.name.toUpperCase()}
        </Text>
        <Text
          position={[0, -0.05, 0.02]}
          fontSize={0.028}
          color={accentColor}
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          FLAGSHIP EXHIBIT // {project.category.toUpperCase().slice(0, 26)}
        </Text>
      </group>

      {/* 6. Interaction Trigger */}
      <InteractableObject
        label={`${project.name} exhibit`}
        interactionKind="VIEW"
        priority={4}
        interactionRange={3.0}
        onInteract={() =>
          inspectDocument({
            id: `FLAGSHIP-${project.slug.toUpperCase()}`,
            title: project.name,
            type: "dossier",
            content: formatProjectDossier(project),
          })
        }
      >
        <mesh position={[0, 0.95, 0]} visible={false}>
          <boxGeometry args={[1.2, 1.3, 1.0]} />
        </mesh>
      </InteractableObject>
    </group>
  );
}

/**
 * Project Dossier Binder (For Detailed Dossiers & Archive Projects on Tables/Shelves)
 */
export function ProjectDossierBinder({
  position,
  rotation = [0, 0, 0],
  project,
  folderColor = "#1e3a5f",
}: {
  position: Position;
  rotation?: Rotation;
  project: ProjectEntry;
  folderColor?: string;
}) {
  const inspectDocument = useGameState((state) => state.inspectDocument);

  return (
    <group position={position} rotation={rotation}>
      <InteractableObject
        label={`${project.name} record`}
        interactionKind="READ"
        priority={3}
        interactionRange={2.2}
        onInteract={() =>
          inspectDocument({
            id: `DOSSIER-${project.slug.toUpperCase()}`,
            title: project.name,
            type: "dossier",
            content: formatProjectDossier(project),
          })
        }
      >
        {/* Hardcover Binder Case */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.26, 0.045, 0.34]} />
          <FacilityMaterial kind="painted-metal" color={folderColor} />
        </mesh>
        {/* Paper Edge */}
        <mesh position={[0.01, 0, 0]}>
          <boxGeometry args={[0.24, 0.038, 0.32]} />
          <meshBasicMaterial color="#ebe5d8" />
        </mesh>
        {/* Spine Label */}
        <Text
          position={[-0.125, 0, 0]}
          rotation={[0, -Math.PI / 2, Math.PI / 2]}
          fontSize={0.022}
          color="#ffffff"
          anchorX="center"
          material-toneMapped={false}
        >
          {project.name.toUpperCase().slice(0, 16)}
        </Text>
      </InteractableObject>
    </group>
  );
}

/**
 * Research Folio (For Zenodo publication and survey manuscript)
 */
export function ResearchFolio({
  position,
  rotation = [0, 0, 0],
  publication,
}: {
  position: Position;
  rotation?: Rotation;
  publication: PublicationEntry;
}) {
  const inspectDocument = useGameState((state) => state.inspectDocument);

  return (
    <group position={position} rotation={rotation}>
      <InteractableObject
        label={`${publication.title.slice(0, 22)} folio`}
        interactionKind="READ"
        priority={3}
        interactionRange={2.2}
        onInteract={() =>
          inspectDocument({
            id: `PUB-${publication.title.slice(0, 16).replace(/[^a-zA-Z0-9]/g, "_").toUpperCase()}`,
            title: publication.title,
            type: "dossier",
            content: formatPublicationDocument(publication),
          })
        }
      >
        {/* Bound Research Folio Cover */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.28, 0.03, 0.36]} />
          <FacilityMaterial kind="wood" color="#3c2f24" />
        </mesh>
        {/* Gold Leaf Stamp Accent */}
        <mesh position={[0, 0.016, 0]}>
          <planeGeometry args={[0.22, 0.28]} />
          <meshBasicMaterial color="#ecdcb0" />
        </mesh>
        <Text
          position={[0, 0.018, 0.04]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.022}
          color="#1c1810"
          anchorX="center"
          maxWidth={0.2}
          material-toneMapped={false}
        >
          {publication.title.toUpperCase()}
        </Text>
      </InteractableObject>
    </group>
  );
}

/**
 * Professional Experience Plaque (For Springer Capital Internship)
 */
export function ExperiencePlaque({
  position,
  rotation = [0, 0, 0],
  experience,
}: {
  position: Position;
  rotation?: Rotation;
  experience: ExperienceEntry;
}) {
  const inspectDocument = useGameState((state) => state.inspectDocument);

  if (!experience) {
    return null;
  }

  return (
    <group position={position} rotation={rotation}>
      <InteractableObject
        label={`${experience.company} record`}
        interactionKind="READ"
        priority={3}
        interactionRange={2.2}
        onInteract={() =>
          inspectDocument({
            id: `EXP-${experience.company.toUpperCase().replace(/\s+/g, "_")}`,
            title: `${experience.company} - ${experience.role}`,
            type: "dossier",
            content: formatExperienceDocument(experience),
          })
        }
      >
        {/* Hardwood / Metal Mounted Wall Plaque */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.45, 0.03]} />
          <FacilityMaterial kind="painted-metal" color="#222b28" />
        </mesh>
        {/* Inner Brass Faceplate */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[0.64, 0.39]} />
          <FacilityMaterial kind="archive-brass" />
        </mesh>
        <Text
          position={[0, 0.1, 0.025]}
          fontSize={0.044}
          color="#181e1a"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          {experience.company.toUpperCase()}
        </Text>
        <Text
          position={[0, 0.02, 0.025]}
          fontSize={0.026}
          color="#2a3630"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          {experience.role.toUpperCase()}
        </Text>
        <Text
          position={[0, -0.08, 0.025]}
          fontSize={0.022}
          color="#384a40"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          {`${experience.duration} - ${experience.location}`}
        </Text>
      </InteractableObject>
    </group>
  );
}

/**
 * Recruiter Contact Terminal Station
 */
export function ContactTerminalStation({
  position,
  rotation = [0, 0, 0],
}: {
  position: Position;
  rotation?: Rotation;
}) {
  const inspectDocument = useGameState((state) => state.inspectDocument);

  return (
    <group position={position} rotation={rotation}>
      {/* Console Pedestal Body */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.75, 1.1, 0.55]} />
        <FacilityMaterial kind="painted-metal" color="#1a2228" />
      </mesh>

      {/* Angled Terminal Deck */}
      <group position={[0, 1.1, 0.1]} rotation={[-0.35, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.4, 0.04]} />
          <FacilityMaterial kind="painted-metal" color="#243038" />
        </mesh>

        {/* CRT Screen Display */}
        <mesh position={[0, 0.04, 0.022]}>
          <planeGeometry args={[0.62, 0.32]} />
          <meshBasicMaterial color="#051208" />
        </mesh>
        <Text
          position={[0, 0.1, 0.026]}
          fontSize={0.034}
          color="#00ff88"
          anchorX="center"
          material-toneMapped={false}
        >
          RECRUITER CONTACT TERMINAL
        </Text>
        <Text
          position={[0, 0.02, 0.026]}
          fontSize={0.022}
          color="#a0f0c0"
          anchorX="center"
          material-toneMapped={false}
        >
          CANDIDATE: ARYAN KAPOOR // 2027 GRAD
        </Text>
        <Text
          position={[0, -0.06, 0.026]}
          fontSize={0.024}
          color="#ffffff"
          anchorX="center"
          material-toneMapped={false}
        >
          [ PRESS E TO ACCESS DOSSIER ]
        </Text>
      </group>

      {/* Terminal Access Interaction */}
      <InteractableObject
        label="Recruiter contact terminal"
        interactionKind="USE"
        priority={4}
        interactionRange={2.6}
        onInteract={() =>
          inspectDocument({
            id: "RECRUITER-SUMMARY",
            title: "CANDIDATE SUMMARY & RECRUITER CONTACT",
            type: "personnel-dossier",
            content: [
              "CANDIDATE SUMMARY // ARYAN KAPOOR",
              "================================================",
              "ROLE FOCUS: Backend Systems, Cloud Architecture, DevOps",
              "EDUCATION: B.E. Computer Science, HKBK College (8.93 CGPA, 2023-2027)",
              "LOCATION: Bengaluru, India",
              "",
              "CORE FLAGSHIP PROJECTS:",
              "1. InfraMind - Local-first infrastructure cognition layer for Terraform, Kubernetes, and Docker",
              "2. Auxilium Digital Archive - Interactive first-person WebGL developer portfolio",
              "3. Metis - AI-native solution-engineering workspace for architecture artifacts and deployable outputs",
              "",
              "PROFESSIONAL INTERNSHIP:",
              "• Springer Capital (Aug 2025 - Nov 2025) - Flask microservices, SQLAlchemy, REST APIs, integration testing",
              "",
              "RESEARCH & PUBLICATIONS:",
              "• Post-Quantum Cryptography Survey (Zenodo 20002606)",
              "• AI-Driven Systems for Education and Recruitment survey (manuscript)",
              "",
              "CONTACT CHANNELS:",
              "• GitHub: https://github.com/Keninjavelas",
              "• LinkedIn: https://www.linkedin.com/in/kapoor-aryan",
              "• Email: aryankapoor0303@gmail.com",
              "",
              "AVAILABILITY: Open for Software Engineering Internships & Full-Time Roles",
            ].join("\n"),
          })
        }
      >
        <mesh position={[0, 1.0, 0]} visible={false}>
          <boxGeometry args={[0.9, 1.2, 0.7]} />
        </mesh>
      </InteractableObject>
    </group>
  );
}
