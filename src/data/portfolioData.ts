export type VerificationStatus =
  | "verified"
  | "needs-approval"
  | "needs-source"
  | "private"
  | "remove";

export type AssetStatus = "available" | "missing" | "needs-update" | "private";
export type SkillLevel = "completed-project" | "coursework" | "learning";
export type UserDecision = "APPROVE / EDIT / REMOVE";

export interface VerificationMeta {
  verificationStatus: VerificationStatus;
  sourceLabel: string;
  sourceUrl?: string;
  lastVerified: string;
}

export interface ApprovalItem extends VerificationMeta {
  id: string;
  title: string;
  category: string;
  currentValue: string;
  proposedPublicWording: string;
  evidence: string;
  appearsIn: readonly string[];
  missingLinks: readonly string[];
  missingImages: readonly string[];
  missingPdfs: readonly string[];
  userDecision: UserDecision;
  implementationStatus?: "implemented" | "needs-implementation";
}

export interface ManifestLink extends VerificationMeta {
  label: string;
  url: string;
  visibility: "public" | "resume-only" | "private";
  note?: string;
}

export interface ContactFormConfig extends VerificationMeta {
  publicFields: readonly string[];
  requiresLogin: boolean;
  implementationStatus: "implemented" | "needs-implementation";
  publicWording: string;
  deliveryRule: string;
}

export interface SkillEntry extends VerificationMeta {
  name: string;
  level: SkillLevel;
  factualDescription: string;
  publicWording: string;
}

export type SupplementalCapabilityCategory =
  | "supporting-language"
  | "currently-learning"
  | "engineering-tool"
  | "project-scoped-capability"
  | "research-tool";

export interface SupplementalCapabilityEntry extends VerificationMeta {
  id: string;
  label: string;
  publicCategory: SupplementalCapabilityCategory;
  scope: string;
  factualDescription: string;
  publicWording: string;
}

export interface TimelineEntry extends VerificationMeta {
  yearLabel: string;
  heading: string;
  bullets: string[];
  publicWording: string;
}

export interface ExperienceEntry extends VerificationMeta {
  company: string;
  role: string;
  duration: string;
  location: string;
  bullets: string[];
  factualDescription: string;
  publicWording: string;
}

export interface EducationEntry extends VerificationMeta {
  institution: string;
  credential: string;
  duration: string;
  location: string;
  detail?: string;
  coursework?: string[];
  factualDescription: string;
  publicWording: string;
}

export type ProjectDisplayTier =
  | "FLAGSHIP EXHIBIT"
  | "DETAILED DOSSIER"
  | "ARCHIVE RECORD"
  | "DEFERRED - OWNER EVIDENCE REQUIRED";

export interface ProjectEntry extends VerificationMeta {
  slug: string;
  name: string;
  category: string;
  displayTier: ProjectDisplayTier;
  lifecycleStatus: string;
  oneLiner: string;
  caseStudyDescription: string;
  factualDescription: string;
  atmosphericPresentation: string;
  technologies: string[];
  implementedFeatures: string[];
  repositoryVisibility: string;
  repositoryUrl: string | null;
  liveDemoUrl: string | null;
  exactContribution: string;
  ownershipModel: string;
  evidenceSummary: string;
  verificationState: string;
  publicSafeAssets: string[];
  knownLimitations: string[];
  facilityPlacement: string;
  assetRequirements: string[];
  dates: string;
}

export interface PublicationEntry extends VerificationMeta {
  title: string;
  venue: string;
  statusLine: string;
  notes: string[];
  factualDescription: string;
  publicWording: string;
  /** Local public PDF path when an authentic copy is integrated, else absent. */
  pdfLocal?: string | null;
}

export interface CertificationEntry extends VerificationMeta {
  title: string;
  issuer: string;
  issueDate: string | null;
  verificationUrl: string | null;
  credentialType: "course-completion" | "professional-certification" | "unknown";
  publicWording: string;
}

export interface OpenSourceEntry extends VerificationMeta {
  project: string;
  repositoryUrl: string | null;
  pullRequestUrl: string | null;
  pullRequestNumber: string | null;
  statusLine: string;
  detail: string;
  publicWording: string;
}

export interface LeadershipEntry extends VerificationMeta {
  label: string;
  publicWording: string;
}

const LAST_VERIFIED = "2026-08-07";
const USER_DECISION: UserDecision = "APPROVE / EDIT / REMOVE";

const meta = (
  verificationStatus: VerificationStatus,
  sourceLabel: string,
  sourceUrl?: string
): VerificationMeta => ({
  verificationStatus,
  sourceLabel,
  sourceUrl,
  lastVerified: LAST_VERIFIED,
});

const approvalItem = (
  id: string,
  title: string,
  category: string,
  currentValue: string,
  proposedPublicWording: string,
  evidence: string,
  verificationStatus: VerificationStatus,
  appearsIn: readonly string[],
  missing: {
    links?: readonly string[];
    images?: readonly string[];
    pdfs?: readonly string[];
  } = {},
  sourceUrl?: string
): ApprovalItem => ({
  id,
  title,
  category,
  currentValue,
  proposedPublicWording,
  evidence,
  appearsIn,
  missingLinks: missing.links ?? [],
  missingImages: missing.images ?? [],
  missingPdfs: missing.pdfs ?? [],
  userDecision: USER_DECISION,
  ...meta(verificationStatus, evidence, sourceUrl),
});

const skillEntry = (
  name: string,
  level: SkillLevel,
  factualDescription: string,
  publicWording: string,
  verificationStatus: VerificationStatus = "needs-approval",
  sourceLabel: string = "Student report and resume inventory"
): SkillEntry => ({
  name,
  level,
  factualDescription,
  publicWording,
  ...meta(verificationStatus, sourceLabel),
});

const supplementalCapabilityEntry = (
  id: string,
  label: string,
  publicCategory: SupplementalCapabilityCategory,
  scope: string,
  factualDescription: string,
  publicWording: string,
  verificationStatus: VerificationStatus = "needs-approval",
  sourceLabel: string = "Student report and resume inventory"
): SupplementalCapabilityEntry => ({
  id,
  label,
  publicCategory,
  scope,
  factualDescription,
  publicWording,
  ...meta(verificationStatus, sourceLabel),
});

const supplementalCapabilityAppearsIn = (
  capability: SupplementalCapabilityEntry
) => {
  switch (capability.publicCategory) {
    case "supporting-language":
      return ["Personnel Wing", "Project dossiers", "Final showcase"] as const;
    case "currently-learning":
      return ["Research Lab", "Current curiosities", "Final showcase"] as const;
    case "engineering-tool":
      return ["Research Lab", "Archive Room", "Project dossiers"] as const;
    case "project-scoped-capability":
      return ["Project dossiers", "Archive Room", "Final showcase"] as const;
    case "research-tool":
      return ["Research Lab", "Archive Room", "Publication records"] as const;
    default:
      return ["Research Lab", "Archive Room", "Final showcase"] as const;
  }
};

const bulletList = (title: string, bullets: readonly string[]) =>
  `${title}\n\n${bullets.map((bullet) => `- ${bullet}`).join("\n")}`;

const labelList = (title: string, lines: readonly string[]) =>
  `${title}\n\n${lines.join("\n")}`;

export const shouldRenderPublicEntry = (verificationStatus: VerificationStatus) =>
  verificationStatus !== "needs-source" &&
  verificationStatus !== "private" &&
  verificationStatus !== "remove";

const flagshipProjectEntries = [
  {
    slug: "inframind",
    name: "InfraMind",
    category: "Platform Engineering / Developer Tooling",
    displayTier: "FLAGSHIP EXHIBIT",
    lifecycleStatus: "Working public prototype",
    oneLiner:
      "Local-first infrastructure cognition layer for Terraform, Kubernetes, and Docker, delivered through a VS Code extension plus backend analyzers.",
    caseStudyDescription:
      "InfraMind pairs a VS Code extension with backend analyzers to surface diagnostics, hover intelligence, topology views, and security context for infrastructure code without relying on raw code upload.",
    factualDescription:
      "Original infrastructure-tooling project with extension UX, parser backends, visualization assets, test fixtures, workflows, and public presentation surfaces.",
    atmosphericPresentation:
      "FLAGSHIP EXHIBIT: INFRAMIND // Infrastructure code translated into readable diagnostics, topology, and developer guidance.",
    technologies: ["Python", "TypeScript", "VS Code Extension API", "Terraform", "Kubernetes", "Docker"],
    implementedFeatures: [
      "VS Code extension entrypoints with diagnostics and hover intelligence",
      "Analyze and visualize commands tied to backend parser output",
      "Backend parsers for Terraform, Kubernetes, and Docker",
      "Topology and security presentation surfaces backed by documentation and screenshots",
      "Regression and lint workflows plus parser fixture suites",
    ],
    repositoryVisibility: "Public original repository",
    repositoryUrl: "https://github.com/Keninjavelas/InfraMind",
    liveDemoUrl: "https://infra-site-three.vercel.app/",
    exactContribution:
      "Aryan appears to be the primary builder of the extension, backend analyzers, documentation, and presentation assets.",
    ownershipModel:
      "Likely solo original project; fetched history showed one author, but commit-level attribution was not exhaustively audited.",
    evidenceSummary:
      "Repository inspection surfaced extension entrypoints, parser fixtures, screenshots, architecture docs, CI workflows, and a live Vercel site. Marketplace history exists, but live Marketplace status remains unresolved for launch.",
    verificationState:
      "Repository structure, test fixtures, workflow files, screenshots, architecture docs, and the Vercel deployment were verified. Marketplace presence should remain unlinked in public launch surfaces until manually reconfirmed.",
    publicSafeAssets: [
      "Extension screenshots from the public repository",
      "Mermaid topology image",
      "System-design documentation",
      "Live Vercel site",
    ],
    knownLimitations: [
      "Do not claim enterprise-scale accuracy, benchmark wins, or broad adoption beyond visible repo evidence.",
      "Marketplace badge or link should stay hidden until the listing is manually rechecked.",
    ],
    facilityPlacement: "Final Showcase centerpiece - Infrastructure and Tooling Wing",
    assetRequirements: [
      "Hero product screenshot",
      "Two supporting interface screenshots",
      "Architecture diagram",
    ],
    dates: "2026-05-14 to 2026-06-07",
    ...meta(
      "verified",
      "Final Portfolio Selection Board and GitHub repository audit",
      "https://github.com/Keninjavelas/InfraMind"
    ),
  },
  {
    slug: "auxilium",
    name: "Auxilium Digital Archive",
    category: "Interactive Product Engineering / WebGL Portfolio",
    displayTier: "FLAGSHIP EXHIBIT",
    lifecycleStatus: "Active in-development local build",
    oneLiner:
      "Interactive first-person WebGL developer portfolio that turns resume content into an explorable archive environment.",
    caseStudyDescription:
      "Auxilium Digital Archive presents professional identity, project records, research, and supporting documents through first-person exploration, room-based interfaces, and readable dossier surfaces.",
    factualDescription:
      "Original portfolio environment with room-based navigation, interaction systems, document overlays, archive state, and data-driven professional content.",
    atmosphericPresentation:
      "FLAGSHIP EXHIBIT: AUXILIUM DIGITAL ARCHIVE // An explorable professional archive built around rooms, records, and readable systems.",
    technologies: ["Next.js", "React", "TypeScript", "Three.js", "React Three Fiber", "Zustand", "Tailwind CSS"],
    implementedFeatures: [
      "First-person navigation across multiple archive rooms and routes",
      "Object interaction system with overlays, prompts, and inspection views",
      "Intro flow, archive bootstrap, persistence, and observation systems",
      "Data-driven portfolio content integrated into room and document surfaces",
      "Document, terminal, and environmental storytelling interfaces",
    ],
    repositoryVisibility: "Confirmed private GitHub repository",
    repositoryUrl: null,
    liveDemoUrl: null,
    exactContribution:
      "Aryan is the primary author of the local codebase, scene structure, state systems, interaction model, and design documents.",
    ownershipModel: "Solo original private project with one visible local author.",
    evidenceSummary:
      "Local workspace inspection confirmed implemented routes, room modules, intro systems, archive persistence, interaction overlays, and manifest validation utilities.",
    verificationState:
      "Code structure and local project evidence were verified, but no public deployment, CI pipeline, or approved launch asset set has been independently confirmed yet.",
    publicSafeAssets: [
      "Existing environment imagery",
      "Architecture and implementation documents",
      "Approved content manifest structure",
    ],
    knownLimitations: [
      "Launch screenshots, walkthrough capture, and public deployment are still missing.",
      "Automated verification is limited to local validation utilities rather than a full CI pipeline.",
    ],
    facilityPlacement: "Final Showcase centerpiece - Central Archive installation",
    assetRequirements: [
      "Hero environment screenshot",
      "Three supporting room or interaction screenshots",
      "Architecture diagram",
    ],
    dates: "2026-06-22 to 2026-08-04",
    ...meta("verified", "Final Portfolio Selection Board and local workspace audit"),
  },
  {
    slug: "metis",
    name: "Metis",
    category: "Applied AI / Solution Engineering Platform",
    displayTier: "FLAGSHIP EXHIBIT",
    lifecycleStatus: "Active private prototype with gate review",
    oneLiner:
      "AI-native solution-engineering workspace for turning raw briefs into validated architecture artifacts and deployable outputs.",
    caseStudyDescription:
      "Metis combines a web dashboard, FastAPI backend, workflow engine, and artifact-generation system to translate briefs into architecture diagrams, reports, and deployable system outputs.",
    factualDescription:
      "Private multi-service platform with workflow orchestration, architecture generation, remediation services, and generated artifact bundles.",
    atmosphericPresentation:
      "FLAGSHIP EXHIBIT: METIS // Structured briefs transformed into workflows, architecture artifacts, and validation gates.",
    technologies: ["Next.js 15", "React 19", "FastAPI", "Python", "PostgreSQL", "Redis", "Docker"],
    implementedFeatures: [
      "Web dashboard and FastAPI backend",
      "Workflow orchestration with auth and traceability layers",
      "Terraform generation and remediation services",
      "Constraint engine, artifact bundling, and architecture-diagram generation",
      "Generated reports, SVGs, PDFs, and other artifact outputs",
    ],
    repositoryVisibility: "Confirmed private GitHub repository",
    repositoryUrl: null,
    liveDemoUrl: null,
    exactContribution:
      "Aryan appears to be the primary builder of the web app, API, workflow engine, artifact generation path, and architecture tooling.",
    ownershipModel: "Solo private prototype with one visible author and active local development.",
    evidenceSummary:
      "Local workspace review surfaced 24 commits, a gate report, extensive API tests, deployment files, and many generated architecture artifacts.",
    verificationState:
      "Strong local evidence exists, and Batch 4D promotes Metis for V1 because its current evidence package is presentable even though full runtime behavior was not independently rerun during the launch audit.",
    publicSafeAssets: [
      "Generated architecture diagrams",
      "Report artifacts after redaction",
      "Gate report summary",
    ],
    knownLimitations: [
      "README ambition outruns fully verified runtime proof.",
      "Public case-study assets require redaction and a tighter narrative before launch.",
    ],
    facilityPlacement: "Final Showcase centerpiece - Applied AI Systems Wing",
    assetRequirements: [
      "Hero architecture artifact",
      "Two supporting workflow or dashboard screenshots",
      "Architecture diagram",
    ],
    dates: "2026-06-04 to 2026-07-02",
    ...meta("verified", "Final Portfolio Selection Board and local workspace audit"),
  },
] satisfies ProjectEntry[];

const detailedDossierProjectEntries = [
  {
    slug: "poseidon",
    name: "Poseidon",
    category: "Distributed Systems / Real-Time Simulation",
    displayTier: "DETAILED DOSSIER",
    lifecycleStatus: "Working multi-service prototype",
    oneLiner:
      "Real-time digital-twin platform for water management combining ingestion, processing, simulation, and visualization.",
    caseStudyDescription:
      "Poseidon combines backend services, event-driven processing, simulation, frontend dashboards, and edge-AI modules into a digital-twin style systems project.",
    factualDescription:
      "Original multi-service backend and frontend project with tests, Docker assets, Kubernetes manifests, and domain-specific processing flows.",
    atmosphericPresentation:
      "DETAILED DOSSIER: POSEIDON // Distributed services, simulation, and operational architecture reviewed from source and system design evidence.",
    technologies: ["TypeScript", "Node.js", "React", "Docker", "Kubernetes", "MQTT", "Python"],
    implementedFeatures: [
      "Backend routes and services for ingestion, processing, simulation, and persistence",
      "Frontend dashboards, maps, and digital-twin views",
      "Edge-AI optical-sentry module and test surface",
      "Dockerized multi-service layout with Kubernetes deployment manifest",
      "Backend and frontend test coverage plus CI workflow",
    ],
    repositoryVisibility: "Public original repository",
    repositoryUrl: "https://github.com/Keninjavelas/Poseidon",
    liveDemoUrl: null,
    exactContribution:
      "Aryan appears to be the primary builder across backend, frontend, edge-AI, containerization, and CI surfaces.",
    ownershipModel: "Likely solo original project; fetched history showed one author.",
    evidenceSummary:
      "Public repository inspection confirmed multi-service code, backend and edge tests, Docker assets, Kubernetes manifests, and CI configuration.",
    verificationState:
      "Source and architecture evidence were reviewed; full local runtime could not be independently reproduced during the V1 launch audit because the required Docker Linux engine was unavailable.",
    publicSafeAssets: [
      "Public repository code surface",
      "Validation results documentation",
      "Lightweight frontend assets suitable for curated screenshots later",
    ],
    knownLimitations: [
      "Presentation media is thin compared with the implementation depth.",
      "Do not overstate real-time synchronization quality or digital-twin fidelity without a fresh runtime verification pass.",
    ],
    facilityPlacement: "Research Lab dossier wall - Distributed Systems Wing",
    assetRequirements: [
      "Hero dashboard or simulation screenshot",
      "Two supporting workflow or interface screenshots",
      "Architecture diagram",
    ],
    dates: "2026-04-10 to 2026-04-26",
    ...meta(
      "verified",
      "Final Portfolio Selection Board and GitHub repository audit",
      "https://github.com/Keninjavelas/Poseidon"
    ),
  },
  {
    slug: "multicloud-serverless-analytics",
    name: "Multi-Cloud Serverless Analytics",
    category: "Cloud Platform Engineering",
    displayTier: "DETAILED DOSSIER",
    lifecycleStatus: "Working multi-cloud prototype",
    oneLiner:
      "Multi-cloud event pipeline that ingests on AWS, processes on GCP, and serves analytics through dashboard and utility layers.",
    caseStudyDescription:
      "This project demonstrates AWS-to-GCP event flow, Terraform-backed infrastructure, testing discipline, and dashboard support in a concrete multi-cloud architecture.",
    factualDescription:
      "Original public repository with Lambda and Cloud Run services, Terraform modules, deployment workflows, and broad pytest coverage.",
    atmosphericPresentation:
      "DETAILED DOSSIER: MULTI-CLOUD SERVERLESS ANALYTICS // Cross-provider events processed with IaC, tests, and operational clarity.",
    technologies: ["Python", "AWS Lambda", "GCP Cloud Run", "Terraform", "Firestore", "Docker"],
    implementedFeatures: [
      "AWS Lambda ingestion and GCP Cloud Run processing services",
      "Dashboard code and validation utilities",
      "Replay and load-testing tools",
      "Terraform modules for ingestion, processing, and dashboard infrastructure",
      "Broad pytest coverage with deploy-oriented GitHub workflows",
    ],
    repositoryVisibility: "Public original repository",
    repositoryUrl: "https://github.com/Keninjavelas/MultiCloud-Serverless-Analytics",
    liveDemoUrl: null,
    exactContribution:
      "Aryan appears to be the primary builder of the multi-cloud prototype, test suite, and Terraform layout.",
    ownershipModel: "Likely solo original project; fetched history showed one author.",
    evidenceSummary:
      "Repository inspection confirmed services, tests, Terraform modules, workflow files, dashboard imagery, and engineering-decision documentation.",
    verificationState:
      "Implementation evidence is strong, but no live public endpoint or successful remote workflow run was independently verified in the audit.",
    publicSafeAssets: [
      "Dashboard screenshot",
      "Architecture documentation",
      "Engineering decision notes",
    ],
    knownLimitations: [
      "Presentation media is lighter than the implementation depth.",
      "Do not claim hardened production reliability or verified live deployment.",
    ],
    facilityPlacement: "Research Lab - Cloud Systems collection",
    assetRequirements: [
      "Hero dashboard screenshot",
      "One supporting workflow or test screenshot",
    ],
    dates: "2026-03-16 to 2026-04-04",
    ...meta(
      "verified",
      "Final Portfolio Selection Board and GitHub repository audit",
      "https://github.com/Keninjavelas/MultiCloud-Serverless-Analytics"
    ),
  },
  {
    slug: "word-extension",
    name: "Word Extension",
    category: "Productivity Tooling / Office Add-in",
    displayTier: "DEFERRED - OWNER EVIDENCE REQUIRED",
    lifecycleStatus: "Deferred from V1 launch",
    oneLiner:
      "Microsoft Word Office Add-in for document analysis, guided editing, and safe command-plan execution.",
    caseStudyDescription:
      "Word Extension is deferred from V1 launch because a real Microsoft Word host transformation capture was not available during the final launch audit.",
    factualDescription:
      "Local-only productivity tool workspace with strong evidence from automated QA, structured reports, and Office-specific integration surfaces.",
    atmosphericPresentation:
      "DEFERRED RECORD: WORD EXTENSION // Office add-in deferred from V1 launch pending Word host transformation capture.",
    technologies: ["TypeScript", "React", "Office.js", "Webpack", "Vitest", "PowerShell"],
    implementedFeatures: [
      "Task-pane UI and local interpreter",
      "Command plans and OpenAI-compatible provider hook",
      "Same-origin QA relay and task-pane bridge",
      "Word-specific PowerShell automation harness",
      "Structured JSON and markdown QA evidence reports",
    ],
    repositoryVisibility: "Local-only workspace",
    repositoryUrl: null,
    liveDemoUrl: null,
    exactContribution:
      "Aryan appears to be the primary builder of the add-in, interpreter, QA relay, and Word-specific automation harness.",
    ownershipModel: "Likely solo local-only project; no Git history was surfaced.",
    evidenceSummary:
      "Workspace review surfaced tests, QA tooling, and reports showing successful lint, build, start, and task-pane relay checks dated 2026-08-06.",
    verificationState:
      "The evidence surface is unusually good for a local-only project, but final public release still depends on curated screenshots and one last human acceptance pass.",
    publicSafeAssets: [
      "QA reports",
      "Structured test evidence bundles",
      "Add-in interface captures after redaction",
    ],
    knownLimitations: [
      "No remote repository or public distribution surface exists yet.",
      "Document-derived screenshots need redaction before public use.",
    ],
    facilityPlacement: "Internal records only",
    assetRequirements: [],
    dates: "Through 2026-08-06",
    ...meta("verified", "Final Portfolio Selection Board and local workspace audit"),
  },
  {
    slug: "dayone-ai",
    name: "DayOne AI",
    category: "Retrieval / Applied AI Systems",
    displayTier: "DETAILED DOSSIER",
    lifecycleStatus: "Substantial self-hosted prototype",
    oneLiner:
      "Retrieval-oriented AI workspace for grounded answers over internal data.",
    caseStudyDescription:
      "DayOne AI focuses on retrieval, routing, evaluation, and backend service design rather than generic chatbot framing, making it a useful dossier for applied AI systems work.",
    factualDescription:
      "Original public repository with retrieval services, test suites, Docker assets, and evaluation or routing utilities, but also noisy checked-in environments.",
    atmosphericPresentation:
      "DETAILED DOSSIER: DAYONE AI // Retrieval, routing, and evaluation assembled into a cautious applied-AI prototype.",
    technologies: ["Python", "FastAPI", "Docker", "MinIO", "Retrieval pipelines", "Evaluation tooling"],
    implementedFeatures: [
      "Backend services for abstention, auth, document storage, embeddings, routing, traces, and verification",
      "Frontend login, chat, and admin debugging surfaces",
      "Ingestion, evaluation, and drift scripts",
      "First-party pytest coverage for routing, traces, streaming parity, and evaluation endpoints",
    ],
    repositoryVisibility: "Public original repository",
    repositoryUrl: "https://github.com/Keninjavelas/DayOne-AI",
    liveDemoUrl: null,
    exactContribution:
      "Aryan appears to be the primary builder of the retrieval, routing, admin, and evaluation code, but production-readiness claims should stay out of the public story.",
    ownershipModel: "Likely solo original project; fetched history showed one author.",
    evidenceSummary:
      "Repository inspection confirmed first-party tests, backend services, frontend surfaces, Docker assets, and blueprint documentation.",
    verificationState:
      "The core implementation is real, but checked-in virtual environments materially distort the repo surface and make public-proof claims less clean than the stronger dossiers.",
    publicSafeAssets: [
      "Documentation blueprint",
      "Curatable repo assets after cleanup",
    ],
    knownLimitations: [
      "Checked-in virtual environments weaken the cleanliness of the evidence surface.",
      "No CI or live deployment was independently verified.",
    ],
    facilityPlacement: "Research Lab dossier shelf",
    assetRequirements: [
      "Hero application screenshot",
      "One supporting admin or workflow screenshot",
    ],
    dates: "2026-04-17 to 2026-06-02",
    ...meta(
      "verified",
      "Final Portfolio Selection Board and GitHub repository audit",
      "https://github.com/Keninjavelas/DayOne-AI"
    ),
  },
  {
    slug: "ghost-protocol",
    name: "Ghost Protocol",
    category: "Cybersecurity / Backend Platform",
    displayTier: "DEFERRED - OWNER EVIDENCE REQUIRED",
    lifecycleStatus: "Deferred from V1 launch",
    oneLiner:
      "Cybersecurity platform with scanning, policy, graph, remediation, and dashboard components.",
    caseStudyDescription:
      "Ghost Protocol is deferred from V1 launch because the code surface is broad but the clean verification story is weaker than the flagship set, and repository hygiene issues require owner review before public promotion.",
    factualDescription:
      "Original public repository with many security modules, Docker packaging, dashboard media, and architecture-oriented markdown, but no clean automated-proof layer.",
    atmosphericPresentation:
      "DEFERRED RECORD: GHOST PROTOCOL // Security platform deferred from V1 launch pending repository hygiene review and verification confirmation.",
    technologies: ["Python", "Docker", "Alembic", "Security scanning", "Graph modules", "Threat intelligence"],
    implementedFeatures: [
      "AI-core modules for intent inference, MITRE mapping, report generation, and scoring",
      "Detection API and orchestration layers",
      "Network-defense, gateway, tracking, canary, and resilience modules",
      "Threat-intelligence surfaces and dashboard media",
    ],
    repositoryVisibility: "Public original repository",
    repositoryUrl: "https://github.com/Keninjavelas/Ghost-Protocol",
    liveDemoUrl: null,
    exactContribution:
      "Aryan appears to own or lead the repository, but exact subsystem ownership and collaboration boundaries still need confirmation.",
    ownershipModel: "Original public repository with multiple visible authors and unresolved collaboration boundaries.",
    evidenceSummary:
      "Repository inspection confirmed large security-module coverage, dashboard media, Docker assets, and architecture markdown.",
    verificationState:
      "The code surface is substantial, but no clean first-party automated suite or CI proof was confirmed after excluding noisy repo artifacts. Repository hygiene issues (tracked .env files, demo credentials, checked-in environments) require owner review before public promotion.",
    publicSafeAssets: [
      "Dashboard image",
      "Architecture and deployment markdown",
    ],
    knownLimitations: [
      "Tracked .env files, demo credentials, and checked-in environment artifacts need review before public promotion.",
      "Do not overstate attacker coverage, deception effectiveness, or production hardening.",
    ],
    facilityPlacement: "Internal records only",
    assetRequirements: [],
    dates: "2026-02-25 to 2026-03-07",
    ...meta(
      "verified",
      "Final Portfolio Selection Board and GitHub repository audit",
      "https://github.com/Keninjavelas/Ghost-Protocol"
    ),
  },
] satisfies ProjectEntry[];

const archiveProjectEntries = [
  {
    slug: "student-os",
    name: "Student OS",
    category: "Full-Stack Product Prototype",
    displayTier: "ARCHIVE RECORD",
    lifecycleStatus: "Archive - evidence-backed but overlapping",
    oneLiner:
      "Campus recruitment and placement-readiness platform spanning backend, frontend, and deployment scaffolding.",
    caseStudyDescription:
      "Student OS remains a technically valid record, but it now sits in the archive because its broad AI-product narrative overlaps stronger and cleaner dossier candidates.",
    factualDescription:
      "Platform prototype spanning backend, frontend, tests, and deployment scaffolding.",
    atmosphericPresentation:
      "ARCHIVE RECORD: STUDENT OS // A broad product platform retained as technical history rather than a lead showcase.",
    technologies: ["JavaScript", "Node.js", "React", "Docker"],
    implementedFeatures: [
      "Backend auth and student-flow routes",
      "Frontend dashboards for mentorship, job, and resume surfaces",
      "Deployment scaffolding",
      "Tests plus GitHub workflow files",
    ],
    repositoryVisibility:
      "Repository unlinked — ownership could not be verified (see audit note)",
    repositoryUrl: null,
    liveDemoUrl: null,
    exactContribution:
      "Earlier Selection Board audit reviewed the project content. The previously linked repository is no longer public, so live contribution cannot be independently confirmed.",
    ownershipModel:
      "Unverified — the previously linked repository is no longer public (see audit note).",
    evidenceSummary:
      "Earlier local audit recorded backend, frontend, tests, and workflow artifacts. AUDIT NOTE (2026-09-06): the previously linked repository could not be verified as the user's work; the currently public Student_OS repository is a fork of muqeet1001/Student_OS with no commits authored by the user, and it is NOT linked to this record.",
    verificationState:
      "Record retained as technical history with claims reduced to what the earlier audit supported; repository evidence is void pending an owner-supplied source.",
    publicSafeAssets: ["Architecture markdown", "Curatable app assets"],
    knownLimitations: [
      "Heavy overlap with DayOne AI and YatinVeda in the AI-product lane.",
      "Tracked environment files require cleanup before any promotion.",
      "Repository link removed 2026-09-06 after ownership could not be verified.",
    ],
    facilityPlacement: "Archive Room - product systems shelf",
    assetRequirements: ["Single archive screenshot"],
    dates:
      "Evidence reviewed 2026-03 to 2026-06; source repository no longer public as of 2026-09-06",
    ...meta(
      "verified",
      "Final Portfolio Selection Board audit (2026-09-06): repository link removed after ownership could not be verified — see evidence note"
    ),
  },
  {
    slug: "yatinveda",
    name: "YatinVeda",
    category: "Private Product Prototype",
    displayTier: "ARCHIVE RECORD",
    lifecycleStatus: "Archive - strong private MVP with privacy sensitivity",
    oneLiner:
      "Full-stack wellness-platform prototype combining practitioner workflows, booking, prescriptions, retrieval, and observability.",
    caseStudyDescription:
      "YatinVeda is technically substantial, but it moves to the archive because its product lane overlaps other candidates and the privacy burden for public presentation is much higher.",
    factualDescription:
      "Confirmed private repository with broad product scope, testing surfaces, deployment guides, and domain-sensitive assets.",
    atmosphericPresentation:
      "ARCHIVE RECORD: YATINVEDA // A substantial private product retained with careful privacy boundaries.",
    technologies: ["FastAPI", "Next.js", "Docker Compose", "Kubernetes", "Qdrant", "LangChain"],
    implementedFeatures: [
      "Auth, MFA, booking, payment, and community flows",
      "AI chat, retrieval, and digital prescription workflows",
      "Monitoring, deployment guides, and broad test coverage",
    ],
    repositoryVisibility: "Confirmed private GitHub repository",
    repositoryUrl: null,
    liveDemoUrl: null,
    exactContribution:
      "Aryan appears to be the primary builder across backend, frontend, deployment, observability, and testing surfaces.",
    ownershipModel: "Solo private MVP with one visible author.",
    evidenceSummary:
      "Local audit confirmed 81 commits, broad tests, deployment guides, and product artifacts including validation summaries.",
    verificationState:
      "The implementation is substantial, but domain sensitivity and tracked environment files make it a poor public lead compared with the selected set.",
    publicSafeAssets: [
      "Redacted product screenshots",
      "Validation summaries",
      "Architecture material after privacy review",
    ],
    knownLimitations: [
      "Requires strict privacy redaction before any public-facing use.",
      "Do not frame it as a production healthcare-grade system.",
    ],
    facilityPlacement: "Archive Room - restricted case-file shelf",
    assetRequirements: [],
    dates: "2026-02-08 to 2026-08-06",
    ...meta("verified", "Final Portfolio Selection Board and local workspace audit"),
  },
  {
    slug: "reconcilyx",
    name: "Reconcilyx",
    category: "Historical Systems Project Record",
    displayTier: "ARCHIVE RECORD",
    lifecycleStatus: "Archive - scope under reconciliation",
    oneLiner:
      "Historical project record retained while the intended public-safe scope is reconciled against conflicting evidence.",
    caseStudyDescription:
      "Reconcilyx stays in the archive only as a narrow historical record because the currently surfaced private repository does not cleanly match the earlier approved OpenMP-oriented framing.",
    factualDescription:
      "The locally surfaced repository reads as a Kubernetes-optimization prototype, but the project identity conflicts with earlier approved skill evidence and still requires direct owner confirmation.",
    atmosphericPresentation:
      "ARCHIVE RECORD: RECONCILYX // Historical scope retained cautiously while identity and narrative are reconciled.",
    technologies: ["Go", "Kubernetes", "Helm", "Docker", "Vite/React"],
    implementedFeatures: [
      "Current private repo shows controllers, proposal workflows, CLI and UI surfaces, and validation docs",
      "Public archive copy must remain narrower than the currently surfaced repo until owner confirmation arrives",
    ],
    repositoryVisibility: "Confirmed private GitHub repository with unresolved public-safe scope",
    repositoryUrl: null,
    liveDemoUrl: null,
    exactContribution:
      "Aryan appears to be the primary builder of the currently surfaced private repo, but the public project identity still needs owner confirmation.",
    ownershipModel: "Solo private repository with unresolved naming and scope boundaries.",
    evidenceSummary:
      "Local audit surfaced a substantial private repository, but the selection board explicitly marked the project as blocked by identity mismatch.",
    verificationState:
      "Keep public wording minimal until direct owner confirmation resolves whether the currently surfaced repository is the intended Reconcilyx record.",
    publicSafeAssets: ["Beta screenshots and docs are available but should not be surfaced yet"],
    knownLimitations: [
      "Identity mismatch blocks confident public storytelling.",
      "Do not expand this record into a dossier or flagship without owner confirmation.",
    ],
    facilityPlacement: "Archive Room - restricted historical record",
    assetRequirements: [],
    dates: "2026-06-21 to 2026-07-02",
    ...meta("verified", "Final Portfolio Selection Board and local workspace audit"),
  },
  {
    slug: "gcp-omnistream",
    name: "GCP OmniStream",
    category: "Cloud Architecture Prototype",
    displayTier: "ARCHIVE RECORD",
    lifecycleStatus: "Archive - short-window prototype",
    oneLiner:
      "GCP telemetry prototype with service code, infrastructure definitions, screenshots, and deployment workflows.",
    caseStudyDescription:
      "GCP OmniStream remains a credible archive record because the code, docs, and screenshots are real, but the development window is too short and the deployment proof too thin for a larger public slot.",
    factualDescription:
      "Original public repository with multiple services, Terraform, tests, screenshots, and workflow definitions.",
    atmosphericPresentation:
      "ARCHIVE RECORD: GCP OMNISTREAM // A compact cloud prototype with visible implementation but modest proof depth.",
    technologies: ["Python", "GCP", "Cloud Run", "Pub/Sub", "Terraform", "Docker"],
    implementedFeatures: [
      "Telemetry ingestion and analytics services",
      "Edge simulation scripts and dashboard artifact",
      "Terraform and CI-CD workflow definitions",
    ],
    repositoryVisibility: "Public original repository",
    repositoryUrl: "https://github.com/Keninjavelas/GCP-OmniStream",
    liveDemoUrl: null,
    exactContribution:
      "Aryan appears to be the primary builder of the prototype services and infrastructure files.",
    ownershipModel: "Likely solo original project; fetched history showed one author.",
    evidenceSummary:
      "Repository inspection confirmed services, tests, docs, screenshots, and deployment workflows.",
    verificationState:
      "The implementation exists, but the short development span and lack of verified live deployment keep it in the archive.",
    publicSafeAssets: ["Repo screenshots", "Architecture markdown"],
    knownLimitations: [
      "Very short development window for the scope implied by the title.",
      "No verified public deployment or runtime evidence under load.",
    ],
    facilityPlacement: "Archive Room - cloud systems shelf",
    assetRequirements: ["Single archive screenshot"],
    dates: "2026-03-17 to 2026-03-19",
    ...meta(
      "verified",
      "Final Portfolio Selection Board and GitHub repository audit",
      "https://github.com/Keninjavelas/GCP-OmniStream"
    ),
  },
  {
    slug: "aws-cloudops",
    name: "AWS CloudOps",
    category: "Cloud Security Prototype",
    displayTier: "ARCHIVE RECORD",
    lifecycleStatus: "Archive - credible prototype",
    oneLiner:
      "AWS security-platform prototype with scanners, remediation logic, graph modules, tests, and Terraform.",
    caseStudyDescription:
      "AWS CloudOps stays in the archive as a compact cloud-security prototype with real code and tests, but not enough depth or evidence cleanliness to outrank the main dossiers.",
    factualDescription:
      "Original public repository with scanners, remediation flows, dashboard code, tests, Docker assets, and Terraform.",
    atmosphericPresentation:
      "ARCHIVE RECORD: AWS CLOUDOPS // Cloud-security automation retained as a compact prototype case file.",
    technologies: ["Python", "AWS", "Terraform", "Docker", "Security scanning"],
    implementedFeatures: [
      "Scanners for EC2, IAM, RDS, S3, security groups, VPC, and EBS",
      "Remediation actions and graph-building modules",
      "Backend routes plus dashboard frontend",
      "Pytest suite for graph, policy, remediation, and attack views",
    ],
    repositoryVisibility: "Public original repository",
    repositoryUrl: "https://github.com/Keninjavelas/AWS-CloudOps",
    liveDemoUrl: null,
    exactContribution:
      "Aryan appears to be the primary builder of the visible prototype codebase.",
    ownershipModel: "Likely solo original project; fetched history showed one author.",
    evidenceSummary:
      "Repository inspection confirmed code modules, tests, Docker assets, Terraform, and dashboard imagery.",
    verificationState:
      "Real implementation exists, but the commit history is short and no CI or live deployment evidence was verified.",
    publicSafeAssets: ["Dashboard screenshot"],
    knownLimitations: [
      "Only three visible commits back the current repository history.",
      "Do not present it as mature Cloud SecOps coverage or production-safe remediation tooling.",
    ],
    facilityPlacement: "Archive Room - cloud systems shelf",
    assetRequirements: ["Single archive screenshot"],
    dates: "2026-03-17 to 2026-03-19",
    ...meta(
      "verified",
      "Final Portfolio Selection Board and GitHub repository audit",
      "https://github.com/Keninjavelas/AWS-CloudOps"
    ),
  },
  {
    slug: "aws-helix-data-lakehouse",
    name: "AWS Helix Data Lakehouse",
    category: "Data Platform Prototype",
    displayTier: "ARCHIVE RECORD",
    lifecycleStatus: "Archive - architecture-heavy prototype",
    oneLiner:
      "Architecture-heavy AWS data-platform prototype with stream processing, Terraform modules, and query-output assets.",
    caseStudyDescription:
      "AWS Helix Data Lakehouse remains worth preserving, but its one-commit history and lack of test or CI proof make it a background archive record rather than a dossier.",
    factualDescription:
      "Original public repository with Lambda-style processing code, data-generation utilities, Terraform modules, and architecture screenshots.",
    atmosphericPresentation:
      "ARCHIVE RECORD: AWS HELIX DATA LAKEHOUSE // A compact architecture prototype preserved as technical history.",
    technologies: ["Python", "AWS", "Terraform", "Athena", "Data generation"],
    implementedFeatures: [
      "Stream-processor and transformation code",
      "Synthetic transaction generation",
      "Terraform modules for compute, storage, database, and analytics",
      "Architecture and query-output imagery",
    ],
    repositoryVisibility: "Public original repository",
    repositoryUrl: "https://github.com/Keninjavelas/AWS-Helix-Data-Lakehouse",
    liveDemoUrl: null,
    exactContribution:
      "Aryan appears to be the primary builder of the visible prototype.",
    ownershipModel: "Likely solo original project; one visible commit.",
    evidenceSummary:
      "Repository inspection confirmed stream-processing code, Terraform modules, and screenshot evidence.",
    verificationState:
      "The prototype is real, but one visible commit and no tests or CI keep it firmly in the archive.",
    publicSafeAssets: ["Architecture screenshot", "Query screenshot"],
    knownLimitations: [
      "No verified public deployment, tests, or CI.",
      "Do not imply mature lakehouse reliability or production scale.",
    ],
    facilityPlacement: "Archive Room - cloud systems shelf",
    assetRequirements: ["Single archive screenshot"],
    dates: "2026-02-18",
    ...meta(
      "verified",
      "Final Portfolio Selection Board and GitHub repository audit",
      "https://github.com/Keninjavelas/AWS-Helix-Data-Lakehouse"
    ),
  },
  {
    slug: "fashion-feet",
    name: "Fashion Feet",
    category: "Historical Product Workspace",
    displayTier: "ARCHIVE RECORD",
    lifecycleStatus: "Archive - unstable local workspace",
    oneLiner:
      "Fashion storefront and admin workspace retained as historical work rather than a presentation-ready product.",
    caseStudyDescription:
      "Fashion Feet shows meaningful interface and product-workflow ambition, but current runtime instability and missing repository history push it into the archive.",
    factualDescription:
      "Local-only Next.js storefront workspace with product, account, admin, media, and checkout surfaces, but no clean runtime proof.",
    atmosphericPresentation:
      "ARCHIVE RECORD: FASHION FEET // A visually ambitious storefront workspace preserved with caution.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "NextAuth", "Prisma", "Zustand"],
    implementedFeatures: [
      "Storefront navigation and product pages",
      "Checkout and account flows",
      "Admin and MFA surfaces",
      "Media actions and elaborate home-page components",
    ],
    repositoryVisibility: "Local-only workspace",
    repositoryUrl: null,
    liveDemoUrl: null,
    exactContribution:
      "Aryan appears to own at least a meaningful portion of the current local implementation, but authorship cannot be bounded without Git history.",
    ownershipModel: "Local-only workspace with no surfaced Git history.",
    evidenceSummary:
      "Local review confirmed substantial UI code, but the strongest runtime artifact was an error capture rather than a successful run.",
    verificationState:
      "Treat this as historical archive material only until environment handling is cleaned up and working UI evidence is captured.",
    publicSafeAssets: ["None currently ready for public use"],
    knownLimitations: [
      "Current negative runtime evidence makes it unsuitable for promotion.",
      "Tracked environment and database files require caution.",
    ],
    facilityPlacement: "Archive Room - historical workspace shelf",
    assetRequirements: [],
    dates: "Recent local activity before 2026-08-07",
    ...meta("verified", "Final Portfolio Selection Board and local workspace audit"),
  },
  {
    slug: "odysseus",
    name: "Odysseus",
    category: "Fork Contribution / Self-Hosted AI Workspace",
    displayTier: "ARCHIVE RECORD",
    lifecycleStatus: "Archive - upstream-derived contribution record",
    oneLiner:
      "Upstream-derived self-hosted AI workspace preserved as a contribution and configuration record rather than an original-system ownership claim.",
    caseStudyDescription:
      "Odysseus remains in the public history because the configuration, debugging, and self-hosted workflow work matter, but the project must always be framed against the upstream platform.",
    factualDescription:
      "Public fork of an upstream self-hosted AI workspace with strong visible upstream functionality and a high attribution burden on any public copy.",
    atmosphericPresentation:
      "ARCHIVE RECORD: ODYSSEUS // A self-hosted AI workspace represented through fork-aware contribution language.",
    technologies: ["Python", "Docker Compose", "FastAPI", "TypeScript", "Self-hosted AI tooling"],
    implementedFeatures: [
      "Self-hosted document and chat workspace surfaces",
      "Docker Compose deployment and workflow files",
      "Tests, docs, and architecture inventory inherited from the upstream project",
      "Aryan's public-safe contribution lane centers on configuration, debugging, and adaptation",
    ],
    repositoryVisibility: "Public fork of an upstream repository",
    repositoryUrl: "https://github.com/Keninjavelas/odysseus",
    liveDemoUrl: null,
    exactContribution:
      "Safe wording is that Aryan configured, debugged, adapted, and restored workflows inside the fork rather than independently building the whole upstream system.",
    ownershipModel: "Public fork with upstream code and a high attribution requirement.",
    evidenceSummary:
      "GitHub audit confirmed a public fork with tests, Docker Compose files, workflows, screenshots, and upstream deployment evidence.",
    verificationState:
      "Keep repository and contribution wording explicit about the fork relationship. Do not use upstream functionality as proof of full original ownership.",
    publicSafeAssets: ["Fork screenshots from the public repository", "Architecture inventory markdown"],
    knownLimitations: [
      "Every public sentence must distinguish upstream functionality from Aryan's contribution.",
      "Do not attach the upstream public deployment as if it were Aryan's personal live product.",
    ],
    facilityPlacement: "Archive Room - contribution records shelf",
    assetRequirements: ["Single archive screenshot"],
    dates: "Active fork history through 2026-07-22",
    ...meta(
      "verified",
      "Final Portfolio Selection Board and GitHub repository audit",
      "https://github.com/Keninjavelas/odysseus"
    ),
  },
] satisfies ProjectEntry[];

const deferredProjectEntries = [
  {
    slug: "understanding-studio",
    name: "Understanding Studio",
    category: "Deferred private media-systems record",
    displayTier: "DEFERRED - OWNER EVIDENCE REQUIRED",
    lifecycleStatus: "Deferred - owner evidence required",
    oneLiner:
      "Deferred internal record for a deterministic media-production pipeline covering generated visuals, narration, motion, and assembly.",
    caseStudyDescription:
      "Understanding Studio remains part of the internal evidence set, but its public record is paused until the workspace or an approved evidence pack is supplied.",
    factualDescription:
      "Prior approval history records Edge-TTS, FFmpeg, and deterministic pipeline work, but no inspectable workspace was available during the audit.",
    atmosphericPresentation:
      "DEFERRED RECORD: UNDERSTANDING STUDIO // Internal evidence retained pending workspace access.",
    technologies: ["Python", "Edge-TTS", "FFmpeg", "Pipeline orchestration"],
    implementedFeatures: [
      "Historical evidence covers generated visuals, narration, motion, and assembly workflows",
    ],
    repositoryVisibility: "Private / workspace unavailable during audit",
    repositoryUrl: null,
    liveDemoUrl: null,
    exactContribution:
      "Owner-approved internal history states Aryan designed and implemented the pipeline, but the codebase was unavailable for this audit pass.",
    ownershipModel: "Private project retained as internal evidence only until the workspace is surfaced again.",
    evidenceSummary:
      "Evidence currently comes from prior approved capability rows rather than direct workspace inspection in this audit.",
    verificationState:
      "Do not publicly render this project until the workspace or an approved evidence pack is supplied.",
    publicSafeAssets: [],
    knownLimitations: ["Workspace unavailable during the audit."],
    facilityPlacement: "Internal records only",
    assetRequirements: [],
    dates: "2025-2026",
    ...meta("private", "Deferred project record retained from approved Batch 2 and Batch 3 notes"),
  },
  {
    slug: "mediaops",
    name: "MediaOps",
    category: "Deferred private automation record",
    displayTier: "DEFERRED - OWNER EVIDENCE REQUIRED",
    lifecycleStatus: "Deferred - owner evidence required",
    oneLiner:
      "Deferred internal record for a Python automation workflow focused on media detection, classification, and organization.",
    caseStudyDescription:
      "MediaOps remains part of the internal evidence set, but its public dossier is paused until the workspace or an approved evidence pack is supplied.",
    factualDescription:
      "Prior approval history records Python automation and pytest-backed detector evidence, but no inspectable workspace was available during the audit.",
    atmosphericPresentation:
      "DEFERRED RECORD: MEDIAOPS // Internal evidence retained pending workspace access.",
    technologies: ["Python", "pytest", "Filesystem automation"],
    implementedFeatures: ["Historical evidence covers classification, organization, and detector-testing workflows"],
    repositoryVisibility: "Private / workspace unavailable during audit",
    repositoryUrl: null,
    liveDemoUrl: null,
    exactContribution:
      "Owner-approved internal history states Aryan designed and implemented the workflow, but the codebase was unavailable for this audit pass.",
    ownershipModel: "Private project retained as internal evidence only until the workspace is surfaced again.",
    evidenceSummary:
      "Evidence currently comes from prior approved capability rows rather than direct workspace inspection in this audit.",
    verificationState:
      "Do not publicly render this project until the workspace or an approved evidence pack is supplied.",
    publicSafeAssets: [],
    knownLimitations: ["Workspace unavailable during the audit."],
    facilityPlacement: "Internal records only",
    assetRequirements: [],
    dates: "2025-2026",
    ...meta("private", "Deferred project record retained from approved Batch 2 and Batch 3 notes"),
  },
  {
    slug: "yggdrasil",
    name: "Yggdrasil",
    category: "Deferred private local-AI record",
    displayTier: "DEFERRED - OWNER EVIDENCE REQUIRED",
    lifecycleStatus: "Deferred - owner evidence required",
    oneLiner:
      "Deferred internal record for the historically referenced Yggdrasil local-AI workspace.",
    caseStudyDescription:
      "Yggdrasil remains unresolved because its relationship to Hermes is still ambiguous and no separate inspectable workspace surfaced during the audit.",
    factualDescription:
      "Historically referenced local-AI project name without sufficient current workspace evidence to support a public record.",
    atmosphericPresentation:
      "DEFERRED RECORD: YGGDRASIL // Internal evidence retained until naming and scope are reconciled.",
    technologies: ["Local AI tooling", "Agent workflows"],
    implementedFeatures: ["Historical references only; no current workspace evidence was inspected"],
    repositoryVisibility: "Repository status unknown during audit",
    repositoryUrl: null,
    liveDemoUrl: null,
    exactContribution:
      "No public-safe contribution statement should be surfaced until the project is separated from or merged with Hermes by owner confirmation.",
    ownershipModel: "Historical internal record with unresolved naming boundary.",
    evidenceSummary:
      "The selection board retained Yggdrasil explicitly so it would not disappear, but direct workspace evidence was unavailable.",
    verificationState:
      "Do not publicly render this project until owner confirmation resolves whether it is distinct from Hermes.",
    publicSafeAssets: [],
    knownLimitations: ["Workspace unavailable and naming boundary unresolved."],
    facilityPlacement: "Internal records only",
    assetRequirements: [],
    dates: "2025-2026",
    ...meta("private", "Deferred project record retained from approved Batch 3 notes"),
  },
] satisfies ProjectEntry[];

const allProjectEntries = [
  ...flagshipProjectEntries,
  ...detailedDossierProjectEntries,
  ...archiveProjectEntries,
  ...deferredProjectEntries,
] as const;

const projectDisplayOrder = [
  "inframind",
  "auxilium",
  "metis",
  "poseidon",
  "multicloud-serverless-analytics",
  "dayone-ai",
  "student-os",
  "yatinveda",
  "reconcilyx",
  "gcp-omnistream",
  "aws-cloudops",
  "aws-helix-data-lakehouse",
  "fashion-feet",
  "odysseus",
  "word-extension",
  "ghost-protocol",
  "hermes",
  "yggdrasil",
  "understanding-studio",
] as const;

const projectDisplayRank = new Map<string, number>(
  projectDisplayOrder.map((slug, index) => [slug, index] as const)
);

const orderedProjectEntries = [...allProjectEntries].sort((left, right) => {
  const leftRank = projectDisplayRank.get(left.slug) ?? Number.MAX_SAFE_INTEGER;
  const rightRank = projectDisplayRank.get(right.slug) ?? Number.MAX_SAFE_INTEGER;
  return leftRank - rightRank;
});

const projectEntriesByTier = {
  flagshipExhibits: orderedProjectEntries.filter(
    (project) => project.displayTier === "FLAGSHIP EXHIBIT"
  ),
  detailedDossiers: orderedProjectEntries.filter(
    (project) => project.displayTier === "DETAILED DOSSIER"
  ),
  archiveRecords: orderedProjectEntries.filter(
    (project) => project.displayTier === "ARCHIVE RECORD"
  ),
  deferred: orderedProjectEntries.filter(
    (project) => project.displayTier === "DEFERRED - OWNER EVIDENCE REQUIRED"
  ),
} satisfies {
  flagshipExhibits: ProjectEntry[];
  detailedDossiers: ProjectEntry[];
  archiveRecords: ProjectEntry[];
  deferred: ProjectEntry[];
};

const satisfiedProjectAssetRequirements: Record<string, readonly string[]> = {
  inframind: [
    "Hero product screenshot",
    "Two supporting interface screenshots",
    "Architecture diagram",
  ],
  auxilium: ["Hero environment screenshot", "Architecture diagram"],
  metis: [
    "Hero architecture artifact",
    "Two supporting workflow or dashboard screenshots",
    "Architecture diagram",
  ],
  "multicloud-serverless-analytics": [
    "Hero dashboard screenshot",
    "One supporting workflow or test screenshot",
  ],
  "word-extension": ["Hero task-pane screenshot"],
  "dayone-ai": [
    "Hero application screenshot",
    "One supporting admin or workflow screenshot",
  ],
  "ghost-protocol": ["Hero dashboard screenshot"],
  "student-os": ["Single archive screenshot"],
  "gcp-omnistream": ["Single archive screenshot"],
  "aws-cloudops": ["Single archive screenshot"],
  "aws-helix-data-lakehouse": ["Single archive screenshot"],
  odysseus: ["Single archive screenshot"],
};

const projectAppearsIn = (project: ProjectEntry) => {
  switch (project.displayTier) {
    case "FLAGSHIP EXHIBIT":
      return ["Final showcase", "Research Lab", "Project dossiers"] as const;
    case "DETAILED DOSSIER":
      return ["Project dossiers", "Research Lab", "Archive Room"] as const;
    case "ARCHIVE RECORD":
      return ["Archive Room", "Project dossiers", "Records Hall"] as const;
    case "DEFERRED - OWNER EVIDENCE REQUIRED":
      return ["Internal records only"] as const;
    default:
      return ["Project dossiers", "Archive Room"] as const;
  }
};

const projectMissingLinks = (project: ProjectEntry) => {
  const missing: string[] = [];

  if (!project.repositoryUrl && project.repositoryVisibility.startsWith("Public")) {
    missing.push("Repository URL");
  }

  if (
    !project.liveDemoUrl &&
    project.displayTier === "FLAGSHIP EXHIBIT" &&
    project.slug === "auxilium"
  ) {
    missing.push("Live deployment URL");
  }

  return missing;
};

const projectMissingImages = (project: ProjectEntry) => {
  const satisfied = satisfiedProjectAssetRequirements[project.slug] ?? [];
  return project.assetRequirements.filter(
    (requirement) => !satisfied.includes(requirement)
  );
};

export const portfolioManifest = {
  meta: {
    version: LAST_VERIFIED,
    purpose:
      "Professional content manifest for Auxilium Digital Archive. Internal approval and source state live alongside public-safe wording.",
    sources: [
      "User-supplied portfolio correction brief dated August 5, 2026",
      "User-supplied personal archive direction brief dated August 5, 2026",
      "User-supplied Batch 2C and Batch 3 review brief dated August 6, 2026",
      "Approved Final Portfolio Selection Board freeze dated August 7, 2026",
      "Current workspace implementation state as of August 7, 2026",
    ],
    publishingRules: [
      "Do not publish fictional certifications, GitHub streaks, pull requests, hardware specs, or paper titles.",
      "Do not gate professional portfolio chapters, contact details, resume access, or final showcase behind collectibles or puzzles.",
      "Entries marked needs-source must not render in the public experience.",
      "Development-only approval state should not be exposed verbatim in public-facing copy.",
      "Show Bengaluru, India only, never a more precise address.",
      "Keep the phone number out of the public bundle entirely unless a later approval reverses that decision.",
      "Display CGPA as 'Current CGPA: 8.93/10' from the manifest so it can be updated once.",
      "Do not show Springer Capital logos, internal screenshots, customer names, or proprietary architecture until explicitly approved.",
      "Hide or disable the resume download in production until the actual PDF exists.",
      "Render the Auxilium live-link only after deployment; never show a dead placeholder link.",
      "Do not give every approved skill identical prominence; emphasize core capabilities and present supporting frameworks within project or domain context.",
      "FastAPI, Next.js, Zustand, and Tailwind CSS should remain supporting frameworks and tools rather than defining headline technologies.",
      "Keep project-scoped capability rows such as interactive 3D experiences, cloud networking, local LLMs, Ollama, and agent orchestration primarily inside their associated project dossiers rather than promoting them to equal headline badges.",
      "Git and Node.js may appear in the complete skills directory, but Node.js should remain framed as supporting web-development runtime and tooling rather than a primary backend specialty.",
      "Linux should be presented as working knowledge in command-line, container, and DevOps workflows unless later Linux deployment or homelab evidence is approved.",
      "JavaScript should remain a supporting language beneath TypeScript rather than appearing beside it as an equal headline capability in every room.",
      "Azure should appear only in learning or current-curiosities contexts until approved project or lab evidence raises it beyond currently learning.",
      "GitHub and npm are supporting engineering tools, not headline technical capabilities.",
      "Keep pytest, OpenMP, and LaTeX / Overleaf primarily inside their associated project, research, or archival dossiers rather than turning them into equal global badges.",
    ],
  },
  identity: {
    name: "Aryan Kapoor",
    location: "Bengaluru, India",
    status: "Computer Science and Engineering student graduating in 2027",
    institution: "HKBK College of Engineering",
    degree: "Bachelor of Engineering in Computer Science",
    duration: "2023-2027",
    cgpa: "8.93/10",
    headline:
      "Software Engineering Student focused on Backend Systems, Cloud Infrastructure, AI Systems and Interactive WebGL Experiences",
    shortIntro:
      "Computer Science engineering student in Bengaluru building backend systems, cloud infrastructure, local AI tools and interactive WebGL experiences. I enjoy turning ambitious ideas into working, understandable systems.",
    biography:
      "I'm Aryan Kapoor, a Computer Science and Engineering student at HKBK College of Engineering in Bengaluru, graduating in 2027. My work spans backend engineering, cloud and DevOps, local AI systems, automation and interactive WebGL experiences. I have built projects involving Flask microservices, Docker, AWS and GCP infrastructure, local LLM tooling, automated media pipelines and React Three Fiber environments. I am especially interested in platform engineering and systems that are practical, privacy-aware and maintainable. Auxilium Digital Archive brings these interests together as an explorable developer portfolio.",
    availability:
      "Open to software engineering internships, open-source collaboration and 2027 graduate opportunities in backend engineering, platform engineering, cloud and DevOps, and applied AI systems.",
    entries: [
      approvalItem(
        "identity-name",
        "Name",
        "identity",
        "Aryan Kapoor",
        "Aryan Kapoor",
        "Portfolio correction brief and current manifest",
        "verified",
        ["Reception terminal", "Final showcase", "Resume interface"]
      ),
      approvalItem(
        "identity-location",
        "Location",
        "identity",
        "Bengaluru, India",
        "Based in Bengaluru, India",
        "Portfolio correction brief",
        "verified",
        ["Reception terminal", "Final showcase"]
      ),
      approvalItem(
        "identity-status",
        "Current Status",
        "identity",
        "Computer Science and Engineering student graduating in 2027",
        "Computer Science and Engineering student graduating in 2027",
        "Explicit user confirmation in Batch 1 decisions",
        "verified",
        ["Reception terminal", "Final showcase", "Resume interface"]
      ),
      approvalItem(
        "identity-college",
        "College",
        "identity",
        "HKBK College of Engineering",
        "HKBK College of Engineering",
        "Student report referenced in correction brief",
        "verified",
        ["Personnel Wing", "Final showcase", "Resume interface"]
      ),
      approvalItem(
        "identity-degree",
        "Degree",
        "identity",
        "Bachelor of Engineering in Computer Science",
        "Bachelor of Engineering in Computer Science",
        "Portfolio correction brief",
        "verified",
        ["Personnel Wing", "Final showcase", "Resume interface"]
      ),
      approvalItem(
        "identity-duration",
        "Degree Duration",
        "identity",
        "2023-2027",
        "Expected graduation year: 2027",
        "Explicit user confirmation in Batch 1 decisions",
        "verified",
        ["Personnel Wing", "Final showcase", "Resume interface"]
      ),
      approvalItem(
        "identity-cgpa",
        "CGPA",
        "identity",
        "8.93/10",
        "Current CGPA: 8.93/10",
        "Explicit user confirmation in Batch 1 decisions",
        "verified",
        ["Personnel Wing", "Final showcase", "Resume interface"]
      ),
      approvalItem(
        "identity-headline",
        "Public Headline",
        "identity",
        "Software Engineering Student focused on Backend Systems, Cloud Infrastructure, AI Systems and Interactive WebGL Experiences",
        "Software Engineering Student focused on Backend Systems, Cloud Infrastructure, AI Systems and Interactive WebGL Experiences",
        "Explicit user confirmation in Batch 1 decisions",
        "verified",
        ["Reception terminal", "Final showcase", "Resume interface"]
      ),
      approvalItem(
        "identity-short-intro",
        "Short Introduction",
        "identity",
        portfolioManifestTextFallback(
          "Computer Science engineering student in Bengaluru building backend systems, cloud infrastructure, local AI tools and interactive WebGL experiences. I enjoy turning ambitious ideas into working, understandable systems."
        ),
        "Computer Science engineering student in Bengaluru building backend systems, cloud infrastructure, local AI tools and interactive WebGL experiences. I enjoy turning ambitious ideas into working, understandable systems.",
        "Explicit user confirmation in Batch 1 decisions",
        "verified",
        ["Reception terminal", "Reception document surfaces"]
      ),
      approvalItem(
        "identity-biography",
        "Biography",
        "identity",
        "Approved biography text supplied in Batch 1 decisions",
        "I'm Aryan Kapoor, a Computer Science and Engineering student at HKBK College of Engineering in Bengaluru, graduating in 2027. My work spans backend engineering, cloud and DevOps, local AI systems, automation and interactive WebGL experiences. I have built projects involving Flask microservices, Docker, AWS and GCP infrastructure, local LLM tooling, automated media pipelines and React Three Fiber environments. I am especially interested in platform engineering and systems that are practical, privacy-aware and maintainable. Auxilium Digital Archive brings these interests together as an explorable developer portfolio.",
        "Explicit user confirmation in Batch 1 decisions",
        "verified",
        ["Final showcase", "Resume interface"],
        { images: ["Professional headshot"] }
      ),
      approvalItem(
        "identity-availability",
        "Availability",
        "identity",
        "Open to software engineering internships, open-source collaboration and 2027 graduate opportunities in backend engineering, platform engineering, cloud and DevOps, and applied AI systems.",
        "Open to software engineering internships, open-source collaboration and 2027 graduate opportunities in backend engineering, platform engineering, cloud and DevOps, and applied AI systems.",
        "Explicit user confirmation in Batch 1 decisions",
        "verified",
        ["Reception terminal", "Final showcase"]
      ),
    ] satisfies ApprovalItem[],
  },
  contact: {
    emailPublic: true,
    phonePublic: false,
    cgpaPublic: true,
    contactForm: {
      publicFields: ["Name", "Email", "Subject", "Message"],
      requiresLogin: false,
      implementationStatus: "needs-implementation",
      publicWording: "Public contact form with Name, Email, Subject, and Message fields. No login required.",
      deliveryRule: "Do not expose the receiving service or private configuration in the client.",
      ...meta("verified", "Explicit user confirmation in Batch 1 decisions"),
    } satisfies ContactFormConfig,
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Keninjavelas",
        visibility: "public",
        ...meta("verified", "Resume and correction brief", "https://github.com/Keninjavelas"),
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/kapoor-aryan",
        visibility: "public",
        ...meta("verified", "Resume and correction brief", "https://www.linkedin.com/in/kapoor-aryan"),
      },
      {
        label: "Email",
        url: "mailto:aryankapoor0303@gmail.com",
        visibility: "public",
        ...meta("verified", "Resume and correction brief"),
      },
      {
        label: "Research Publication",
        url: "https://zenodo.org/records/20002606",
        visibility: "public",
        note: "Standalone publication record. Do not describe this as a complete research profile without a later ORCID, Google Scholar, or Zenodo profile URL.",
        ...meta("verified", "Explicit user confirmation in Batch 1 decisions", "https://zenodo.org/records/20002606"),
      },
      {
        label: "Auxilium Live URL",
        url: "",
        visibility: "public",
        note: "Render this link only after the real deployment URL exists.",
        ...meta("needs-source", "Deployment URL not yet supplied"),
      },
      {
        label: "Resume PDF",
        url: "/portfolio/documents/resume.pdf",
        visibility: "public",
        note: "Downloadable public resume (user-supplied PDF, integrated 2026-09-06).",
        ...meta("verified", "Real resume PDF present at the manifest path"),
      },
    ] satisfies ManifestLink[],
    entries: [
      approvalItem(
        "contact-github",
        "GitHub",
        "contact",
        "https://github.com/Keninjavelas",
        "github.com/Keninjavelas",
        "Resume and correction brief",
        "verified",
        ["Reception", "Final showcase", "Git terminal"],
        {},
        "https://github.com/Keninjavelas"
      ),
      approvalItem(
        "contact-linkedin",
        "LinkedIn",
        "contact",
        "https://www.linkedin.com/in/kapoor-aryan",
        "linkedin.com/in/kapoor-aryan",
        "Resume and correction brief",
        "verified",
        ["Reception", "Final showcase", "Contact interface"],
        {},
        "https://www.linkedin.com/in/kapoor-aryan"
      ),
      approvalItem(
        "contact-email",
        "Email",
        "contact",
        "aryankapoor0303@gmail.com",
        "aryankapoor0303@gmail.com",
        "Resume and correction brief",
        "verified",
        ["Reception", "Final showcase", "Contact interface"]
      ),
      approvalItem(
        "contact-email-public",
        "Public Email Decision",
        "contact",
        "Public email enabled",
        "Show email publicly",
        "Explicit user confirmation in Batch 1 decisions",
        "verified",
        ["Final showcase", "Contact interface"]
      ),
      approvalItem(
        "contact-phone-public",
        "Public Phone Decision",
        "contact",
        "Phone omitted from the public bundle",
        "Keep the phone number completely out of the public bundle.",
        "Explicit user confirmation in Batch 1 decisions",
        "private",
        ["Final showcase", "Resume policy"]
      ),
      approvalItem(
        "contact-cgpa-public",
        "Public CGPA Decision",
        "contact",
        "Current CGPA: 8.93/10",
        "Display CGPA as Current CGPA: 8.93/10",
        "Explicit user confirmation in Batch 1 decisions",
        "verified",
        ["Personnel Wing", "Final showcase", "Resume interface"]
      ),
      approvalItem(
        "contact-research-publication",
        "Research Publication",
        "contact",
        "https://zenodo.org/records/20002606",
        "Research Publication",
        "Explicit user confirmation in Batch 1 decisions",
        "verified",
        ["Reception", "Final showcase", "Research interface"],
        {},
        "https://zenodo.org/records/20002606"
      ),
      {
        ...approvalItem(
          "contact-form",
          "Contact Form",
          "contact",
          "Public contact form approved",
          "Public contact form with Name, Email, Subject, and Message fields. No login required.",
          "Explicit user confirmation in Batch 1 decisions",
          "verified",
          ["Reception", "Final showcase", "Contact interface"]
        ),
        implementationStatus: "needs-implementation",
      },
      approvalItem(
        "contact-auxilium-url",
        "Auxilium Live URL",
        "contact",
        "Not yet supplied",
        "Public deployment link for Auxilium Digital Archive. Render only after deployment.",
        "Deployment URL not yet supplied",
        "needs-source",
        ["Final showcase", "Projects directory"],
        { links: ["Final deployed Auxilium Digital Archive URL"] }
      ),
      approvalItem(
        "contact-resume-pdf",
        "Resume PDF",
        "contact",
        "/portfolio/documents/resume.pdf",
        "Downloadable public resume PDF.",
        "User-supplied resume PDF integrated at /portfolio/documents/resume.pdf (2026-09-06)",
        "verified",
        ["Final showcase", "Resume interface"],
        {},
        "/portfolio/documents/resume.pdf"
      ),
    ] satisfies ApprovalItem[],
  },
  experience: [
    {
      company: "Springer Capital",
      role: "Backend Intern",
      duration: "August 2025-November 2025",
      location: "Remote",
      bullets: [
        "Developed Flask microservices using SQLAlchemy.",
        "Designed and tested REST APIs and database schemas.",
        "Created mock services for integration testing.",
        "Resolved dependency conflicts.",
        "Supported debugging and deployment reliability across a multi-service backend platform.",
      ],
      factualDescription:
        "Backend internship focused on Flask microservices, SQLAlchemy, REST APIs, schema design, integration testing, and deployment reliability across a multi-service backend platform.",
      publicWording:
        "Backend Intern - Springer Capital | Remote | August 2025-November 2025. Developed Flask microservices using SQLAlchemy, designed and tested REST APIs and database schemas, created mock services for integration testing, resolved dependency conflicts, and supported debugging and deployment reliability across a multi-service backend platform.",
      ...meta("verified", "Explicit user confirmation in Batch 1 decisions"),
    } satisfies ExperienceEntry,
  ],
  education: [
    {
      institution: "HKBK College of Engineering",
      credential: "Bachelor of Engineering in Computer Science",
      duration: "2023-2027",
      location: "Bengaluru",
      detail: "Current CGPA: 8.93/10",
      coursework: [
        "Data Structures and Algorithms",
        "Operating Systems",
        "Computer Networks",
        "Database Systems",
        "Cloud Computing",
        "Artificial Intelligence",
        "Cybersecurity",
        "Distributed Systems",
      ],
      factualDescription:
        "Primary degree record with CGPA and a compact list of relevant focus areas rather than an exhaustive course list.",
      publicWording:
        "Bachelor of Engineering in Computer Science at HKBK College of Engineering, 2023-2027. Current CGPA: 8.93/10.",
      ...meta("verified", "Explicit user confirmation in Batch 1 decisions"),
    } satisfies EducationEntry,
    {
      institution: "VIBGYOR High",
      credential: "High School Diploma",
      duration: "2019-2021",
      location: "Bengaluru",
      factualDescription:
        "Secondary education entry intended only for a concise archive timeline mention and the full resume, not a major room exhibit.",
      publicWording: "High School Diploma, VIBGYOR High, 2019-2021.",
      ...meta("verified", "Explicit user confirmation in Batch 1 decisions"),
    } satisfies EducationEntry,
  ],
  skills: {
    languages: [
      skillEntry(
        "Python",
        "completed-project",
        "Used in backend services, automation workflows, media pipelines, and local AI tooling.",
        "Python for backend services, automation workflows, media pipelines, and local AI tooling.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 1 decisions"
      ),
      skillEntry(
        "TypeScript",
        "completed-project",
        "Used for interactive web applications, reusable interface systems, and state-driven 3D experiences.",
        "TypeScript for interactive web applications, reusable interface systems, and state-driven 3D experiences.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 1 decisions"
      ),
      skillEntry(
        "Java",
        "coursework",
        "Used for data structures, algorithms, and academic software development.",
        "Java - used for data structures, algorithms and academic software development.",
        "verified",
        "Explicit user confirmation in Batch 2 decisions"
      ),
      skillEntry(
        "Bash",
        "coursework",
        "Used for command-line automation and development-environment workflows across Linux, Docker, and local setup tasks.",
        "Bash - command-line automation and development-environment workflows.",
        "verified",
        "Explicit user confirmation in Batch 2 decisions"
      ),
      skillEntry(
        "C",
        "completed-project",
        "Used in parallel-programming and performance experiments with OpenMP, including sequential versus parallel sorting comparisons.",
        "C - parallel-programming and performance experiments using OpenMP.",
        "verified",
        "Explicit user confirmation in Batch 2 decisions"
      ),
      skillEntry(
        "C++",
        "coursework",
        "Used for academic programming and algorithmic foundations.",
        "C++ - academic programming and algorithmic foundations.",
        "verified",
        "Explicit user confirmation in Batch 2 decisions"
      ),
    ] satisfies SkillEntry[],
    cloudAndDevOps: [
      skillEntry(
        "AWS",
        "completed-project",
        "Used for infrastructure automation, serverless workflows, and cloud application projects.",
        "AWS for infrastructure automation, serverless workflows, and cloud application projects.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 2 decisions"
      ),
      skillEntry(
        "GCP",
        "completed-project",
        "Used for event-driven analytics, telemetry processing, serverless services, and cloud data workflows.",
        "GCP for event-driven analytics, telemetry processing, serverless services, and cloud data workflows.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 2 decisions"
      ),
      skillEntry(
        "Docker",
        "completed-project",
        "Used with Docker Compose for self-hosted AI workspaces, reproducible development environments, and local services.",
        "Docker and Docker Compose for self-hosted AI workspaces, reproducible development environments, and local services.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 2 decisions"
      ),
      skillEntry(
        "Terraform",
        "completed-project",
        "Used for version-controlled, repeatable cloud infrastructure provisioning.",
        "Terraform for version-controlled, repeatable cloud infrastructure provisioning.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 2 decisions"
      ),
      skillEntry(
        "GitHub Actions",
        "completed-project",
        "Used for automated validation, CI workflows, and deployment-oriented project pipelines.",
        "GitHub Actions for automated validation, CI workflows, and deployment-oriented project pipelines.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 2 decisions"
      ),
      skillEntry(
        "Linux",
        "coursework",
        "Used for Linux command-line, development-environment, container, and DevOps workflows.",
        "Linux command-line, development-environment, container, and DevOps workflows.",
        "verified",
        "Explicit user confirmation in Batch 2 closing decisions"
      ),
      skillEntry(
        "CI/CD",
        "completed-project",
        "Used for repeatable validation, deployment, and infrastructure automation workflows.",
        "CI/CD workflow implementation for repeatable validation, deployment, and infrastructure automation.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 2 decisions"
      ),
    ] satisfies SkillEntry[],
    frameworksAndTools: [
      skillEntry(
        "Flask",
        "completed-project",
        "Used for backend microservices and internal API development during the Springer Capital internship.",
        "Flask - backend microservices and internal API development.",
        "verified",
        "Explicit user confirmation in Batch 2 decisions"
      ),
      skillEntry(
        "FastAPI",
        "completed-project",
        "Worked with FastAPI backends for self-hosted AI workflows, document handling, and API debugging.",
        "Worked with FastAPI backends for self-hosted AI workflows, document handling, and API debugging.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 1 decisions"
      ),
      skillEntry(
        "SQLAlchemy",
        "completed-project",
        "Used for ORM-backed service development and database integration during the Springer Capital internship.",
        "SQLAlchemy - ORM-backed service development and database integration.",
        "verified",
        "Explicit user confirmation in Batch 2 decisions"
      ),
      skillEntry(
        "React",
        "completed-project",
        "Used for interactive application interfaces, reusable UI systems, and WebGL-integrated experiences.",
        "React for interactive application interfaces, reusable UI systems, and WebGL-integrated experiences.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 1 decisions"
      ),
      skillEntry(
        "Next.js",
        "completed-project",
        "Used for application structure, routing, rendering, and deployment-ready portfolio delivery.",
        "Next.js for application structure, routing, rendering, and deployment-ready portfolio delivery.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 1 decisions"
      ),
      skillEntry(
        "Three.js",
        "completed-project",
        "Used for WebGL scene construction, lighting, materials, cameras, and interactive visual systems.",
        "Three.js for WebGL scene construction, lighting, materials, cameras, and interactive visual systems.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 1 decisions"
      ),
      skillEntry(
        "React Three Fiber",
        "completed-project",
        "Used for component-driven 3D scenes, interactive objects, and integration between React interfaces and WebGL environments.",
        "React Three Fiber for component-driven 3D scenes, interactive objects, and integration between React interfaces and WebGL environments.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 1 decisions"
      ),
      skillEntry(
        "Zustand",
        "completed-project",
        "Used for player interaction state, document inspection, interface state, and environment progression.",
        "Zustand for player interaction state, document inspection, interface state, and environment progression.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 1 decisions"
      ),
      skillEntry(
        "Tailwind CSS",
        "completed-project",
        "Used for terminal interfaces, document overlays, responsive surfaces, and supporting portfolio UI.",
        "Tailwind CSS for terminal interfaces, document overlays, responsive surfaces, and supporting portfolio UI.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 1 decisions"
      ),
      skillEntry(
        "Node.js",
        "completed-project",
        "Used as the runtime and tooling layer for React, Next.js, TypeScript, package management, and application build workflows.",
        "Node.js runtime and tooling for React, Next.js, TypeScript, package management, and application build workflows.",
        "verified",
        "Explicit user confirmation in Batch 2 closing decisions"
      ),
      skillEntry(
        "Git",
        "completed-project",
        "Used for version control, branching, remote management, debugging changes, and open-source contribution workflows.",
        "Git for version control, branching, remote management, debugging changes, and open-source contribution workflows.",
        "verified",
        "Explicit user confirmation in Batch 2 closing decisions"
      ),
    ] satisfies SkillEntry[],
    engineeringConcepts: [
      skillEntry(
        "Backend engineering",
        "completed-project",
        "Used across multi-service internship work, API development, self-hosted systems, and automation projects.",
        "Backend engineering across multi-service internship work, API development, self-hosted systems, and automation projects.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 1 decisions"
      ),
      skillEntry(
        "REST API design",
        "completed-project",
        "Used for endpoint design, service integration, and API validation, including mock endpoints and curl-based checks during the Springer Capital internship.",
        "REST API design - endpoint design, service integration and API validation.",
        "verified",
        "Explicit user confirmation in Batch 2 decisions"
      ),
      skillEntry(
        "Microservices",
        "completed-project",
        "Used in development and debugging across a multi-service backend architecture during the Springer Capital internship.",
        "Microservices - development and debugging across a multi-service backend architecture.",
        "verified",
        "Explicit user confirmation in Batch 2 decisions"
      ),
      skillEntry("Distributed systems", "learning", "An active area of focus that appears across project themes and current curiosities.", "Distributed systems"),
      skillEntry(
        "Event-driven architecture",
        "completed-project",
        "Used for asynchronous ingestion, processing pipelines, and decoupled system workflows.",
        "Event-driven architecture for asynchronous ingestion, processing pipelines, and decoupled system workflows.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 2 decisions"
      ),
      skillEntry(
        "Infrastructure as Code",
        "completed-project",
        "Used for repeatable provisioning, version-controlled infrastructure, and consistent deployment workflows.",
        "Infrastructure as Code for repeatable provisioning, version-controlled infrastructure, and consistent deployment workflows.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 2 decisions"
      ),
      skillEntry(
        "Cloud infrastructure",
        "completed-project",
        "Used for cloud infrastructure design and implementation across AWS and GCP project environments.",
        "Cloud infrastructure design and implementation across AWS and GCP project environments.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 2 decisions"
      ),
      skillEntry(
        "High availability",
        "coursework",
        "Working knowledge from high-availability and scalability considerations in cloud architecture projects such as Smart Gallery and VedaMind AI.",
        "High-availability architecture - working knowledge through cloud-system design and infrastructure projects.",
        "verified",
        "Explicit user confirmation in Batch 2 decisions"
      ),
      skillEntry(
        "WebGL development",
        "completed-project",
        "Used for immersive portfolio interfaces, first-person exploration, and scene-based environmental storytelling.",
        "WebGL development for immersive portfolio interfaces, first-person exploration, and scene-based environmental storytelling.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 1 decisions"
      ),
      skillEntry(
        "Local AI experimentation",
        "learning",
        "Currently developing practical experience through local AI experimentation, controllable tooling, model evaluation, and workflow design.",
        "Currently developing practical experience through local AI experimentation, controllable tooling, model evaluation, and workflow design.",
        "verified",
        "Explicit user confirmation in Batch 2 Group 2 decisions"
      ),
    ] satisfies SkillEntry[],
  },
  supplementalCapabilities: [
    supplementalCapabilityEntry(
      "tool-javascript",
      "JavaScript",
      "supporting-language",
      "Complete skills directory and relevant web-project dossiers",
      "Used for JavaScript fundamentals supporting React, TypeScript, and browser-based application development.",
      "JavaScript fundamentals supporting React, TypeScript and browser-based application development.",
      "verified",
      "Explicit user confirmation in Batch 2C decisions"
    ),
    supplementalCapabilityEntry(
      "tool-azure",
      "Azure",
      "currently-learning",
      "Learning and current-curiosities section only",
      "Currently learning Azure fundamentals as part of broader cloud-platform study.",
      "Currently learning Azure fundamentals as part of broader cloud-platform study.",
      "verified",
      "Explicit user confirmation in Batch 2C decisions"
    ),
    supplementalCapabilityEntry(
      "tool-github",
      "GitHub",
      "engineering-tool",
      "Tool directory, open-source dossier, and project records",
      "Used for repository management, pull-request workflows, issue tracking, and open-source collaboration.",
      "GitHub for repository management, pull-request workflows, issue tracking and open-source collaboration.",
      "verified",
      "Explicit user confirmation in Batch 2C decisions"
    ),
    supplementalCapabilityEntry(
      "tool-npm",
      "npm",
      "engineering-tool",
      "Project technology lists only",
      "Used for dependency management, scripts, development workflows, and application builds.",
      "npm for dependency management, scripts, development workflows and application builds.",
      "verified",
      "Explicit user confirmation in Batch 2C decisions"
    ),
    supplementalCapabilityEntry(
      "project-mediaops.pytest",
      "pytest",
      "project-scoped-capability",
      "MediaOps dossier and complete tools directory",
      "Used for automated testing of Python detection and automation components.",
      "pytest for automated testing of Python detection and automation components.",
      "verified",
      "Explicit user confirmation in Batch 2C decisions"
    ),
    supplementalCapabilityEntry(
      "project-reconcilyx.openmp",
      "OpenMP",
      "project-scoped-capability",
      "Reconcilyx dossier and historical-project archive",
      "Used for parallel C experiments, section-based execution, and sequential-versus-parallel performance comparison.",
      "OpenMP for parallel C experiments, section-based execution and sequential-versus-parallel performance comparison.",
      "verified",
      "Explicit user confirmation in Batch 2C decisions"
    ),
    supplementalCapabilityEntry(
      "tool-latex-overleaf",
      "LaTeX / Overleaf",
      "research-tool",
      "Research dossier, publication records, and complete tools directory",
      "Used for academic-paper preparation, bibliography management, and IEEE-style publication workflows.",
      "LaTeX and Overleaf for academic-paper preparation, bibliography management and IEEE-style publication workflows.",
      "verified",
      "Explicit user confirmation in Batch 2C decisions"
    ),
  ] satisfies SupplementalCapabilityEntry[],
  projects: {
    flagshipExhibits: projectEntriesByTier.flagshipExhibits,
    detailedDossiers: projectEntriesByTier.detailedDossiers,
    archiveRecords: projectEntriesByTier.archiveRecords,
    deferred: projectEntriesByTier.deferred,
  },
  publications: [
    {
      title:
        "A Decision Framework for Post-Quantum Cryptography Deployment in Zero Trust Architecture",
      venue: "Zenodo",
      statusLine: "Public record available",
      notes: [
        "Public Zenodo record available.",
        "Display abstract summary, PDF, and citation information once the local asset package is added.",
      ],
      factualDescription:
        "Publication focused on post-quantum cryptography adoption within Zero Trust architecture planning.",
      publicWording:
        "A Decision Framework for Post-Quantum Cryptography Deployment in Zero Trust Architecture.",
      pdfLocal: "/portfolio/documents/papers/post-quantum-zero-trust.pdf",
      ...meta("verified", "Correction brief", "https://zenodo.org/records/20002606"),
    } satisfies PublicationEntry,
    {
      title:
        "AI-Driven Systems for Education and Recruitment: A Comprehensive Survey",
      venue: "Standalone manuscript",
      statusLine: "Complete manuscript",
      notes: [
        "Co-authored with Abdul Muqeet, Bhavani Singh Rajput, Dawood Masoodi, and Dr. Pushpa Mohan.",
        "Standalone manuscript; no external publication record is attached to this paper.",
      ],
      factualDescription:
        "Survey paper covering AI systems for education and recruitment, including interviews, resume parsing, placement prediction, and programming education.",
      publicWording:
        "AI-Driven Systems for Education and Recruitment: A Comprehensive Survey.",
      pdfLocal: "/portfolio/documents/papers/ai-education-recruitment-survey.pdf",
      ...meta("verified", "Final manuscript PDF (user-supplied) and approved summary"),
    } satisfies PublicationEntry,
  ] as PublicationEntry[],
  certifications: [
    {
      title: "Google Project Management Professional Certificate",
      issuer: "Google",
      issueDate: null,
      verificationUrl: null,
      credentialType: "unknown",
      publicWording: "Google Project Management Professional Certificate",
      ...meta("needs-source", "Correction brief lists title but local proof package is missing"),
    } satisfies CertificationEntry,
    {
      title: "AWS Cloud Practitioner Essentials",
      issuer: "AWS",
      issueDate: null,
      verificationUrl: null,
      credentialType: "course-completion",
      publicWording: "AWS Cloud Practitioner Essentials",
      ...meta("needs-source", "Correction brief lists title but local proof package is missing"),
    } satisfies CertificationEntry,
    {
      title: "Oracle Cloud Infrastructure Foundations",
      issuer: "Oracle",
      issueDate: null,
      verificationUrl: null,
      credentialType: "unknown",
      publicWording: "Oracle Cloud Infrastructure Foundations",
      ...meta("needs-source", "Correction brief lists title but local proof package is missing"),
    } satisfies CertificationEntry,
    {
      title: "NPTEL: Introduction to Quantum Computing, Quantum Algorithms and Qiskit",
      issuer: "NPTEL",
      issueDate: null,
      verificationUrl: null,
      credentialType: "course-completion",
      publicWording: "NPTEL: Introduction to Quantum Computing, Quantum Algorithms and Qiskit",
      ...meta("needs-source", "Correction brief lists title but local proof package is missing"),
    } satisfies CertificationEntry,
  ],
  openSource: [
    {
      project: "First Contributions",
      repositoryUrl: null,
      pullRequestUrl: null,
      pullRequestNumber: null,
      statusLine: "Merged status described, exact repository and PR URL still missing",
      detail:
        "Useful as the beginning of the open-source timeline, but the exact repository, PR number, and link still need to be supplied before public rendering.",
      publicWording:
        "First Contributions entry reserved for the first merged public contribution once the exact repository and PR details are attached.",
      ...meta("needs-source", "Correction brief notes merged status but no URL package is attached"),
    } satisfies OpenSourceEntry,
    {
      project: "Latitude LLM",
      repositoryUrl: null,
      pullRequestUrl: null,
      pullRequestNumber: null,
      statusLine: "Closed / not merged",
      detail:
        "Investigated Gmail CTA-button rendering and submitted changes. Must not be presented as merged.",
      publicWording:
        "Latitude LLM: investigated Gmail CTA-button rendering and submitted a non-merged patch.",
      ...meta("needs-approval", "Correction brief"),
    } satisfies OpenSourceEntry,
  ],
  leadership: [
    {
      label: "IEEE Computer Society Webmaster",
      publicWording: "IEEE Computer Society Webmaster",
      ...meta("needs-approval", "Student report referenced in correction brief"),
    },
    {
      label: "Placement Batch Student Coordinator",
      publicWording: "Placement Batch Student Coordinator",
      ...meta("needs-approval", "Student report referenced in correction brief"),
    },
    {
      label: "Class Representative",
      publicWording: "Class Representative",
      ...meta("needs-approval", "Student report referenced in correction brief"),
    },
    {
      label: "ISTE-associated Value Added Course coordinator",
      publicWording: "ISTE-associated Value Added Course coordinator",
      ...meta("needs-approval", "Student report referenced in correction brief"),
    },
    {
      label: "Technical Symposium organization - May 2025",
      publicWording: "Technical Symposium organization, May 2025",
      ...meta("needs-approval", "Student report referenced in correction brief"),
    },
    {
      label: "24-hour Hackathon organization",
      publicWording: "24-hour Hackathon organization",
      ...meta("needs-approval", "Student report referenced in correction brief"),
    },
    {
      label: "Calypso event involvement",
      publicWording: "Calypso event involvement",
      ...meta("needs-approval", "Student report referenced in correction brief"),
    },
    {
      label: "VoiceX public-speaking participation",
      publicWording: "VoiceX public-speaking participation",
      ...meta("needs-approval", "Student report referenced in correction brief"),
    },
    {
      label: "College basketball team participation",
      publicWording: "College basketball team participation",
      ...meta("needs-approval", "Student report referenced in correction brief"),
    },
  ] satisfies LeadershipEntry[],
  currentCuriosities: [
    "Cloud and platform engineering",
    "DevOps",
    "Distributed systems",
    "Security engineering",
    "Infrastructure automation",
    "DSA",
    "Local AI",
    "WebGL experimentation",
  ],
  personalArchive: {
    accessCard: {
      id: "KEYCARD-LEVEL2",
      label: "Take Personal Archive Access Card",
      name: "Personal Archive Access Card",
      description:
        "Optional credential that unlocks off-duty material and personal exhibits. It is not required to complete the professional portfolio.",
      discoveryPrompt: "OPTIONAL AREA DISCOVERED: PERSONAL ARCHIVE",
      ...meta("needs-approval", "Personal archive direction brief"),
    },
    accessMethods: [
      "Find the hidden Personal Archive card during exploration for early optional access.",
      "Expose the same archive from the final showcase through an 'About Me Beyond Code' option.",
    ],
    exhibits: [
      "Basketball corner with configurable team, training, and memory placeholders",
      "Philosophy and psychology shelf with reflective notes and systems-thinking prompts",
      "Horror and architecture board explaining the visual language of the archive",
      "Homelab and tinkering display for Linux, Docker, local-first computing, and infrastructure experiments",
      "Community cabinet for open-source, hackathons, IEEE work, and college participation",
      "Current Curiosity wall driven by configurable data rather than hardcoded props",
    ],
    placeholderRule:
      "Do not invent favorite books, media, photographs, or private anecdotes until supplied.",
  },
  timeline: [
    {
      yearLabel: "2023",
      heading: "Foundations and Degree Start",
      bullets: [
        "Started B.E. Computer Science at HKBK College of Engineering.",
        "Built programming and data-structure fundamentals.",
        "Began leaning into backend and systems-oriented work.",
      ],
      publicWording:
        "Started the Computer Science degree and focused on programming foundations, problem-solving, and systems-oriented thinking.",
      ...meta("needs-approval", "Current manifest draft derived from correction brief"),
    },
    {
      yearLabel: "2024",
      heading: "Backend and Cloud Foundations",
      bullets: [
        "Expanded into TypeScript, React, and modern web development.",
        "Built with Docker, cloud tooling, and deployment workflows.",
        "Started shaping a stronger interest in infrastructure and platform work.",
      ],
      publicWording:
        "Expanded into TypeScript, React, Docker, and cloud deployment workflows while strengthening interest in infrastructure and platform work.",
      ...meta("needs-approval", "Current manifest draft derived from correction brief"),
    },
    {
      yearLabel: "2025",
      heading: "Internships, Events, and Systems Work",
      bullets: [
        "Completed Backend Internship at Springer Capital.",
        "Contributed to student leadership, IEEE work, and technical events.",
        "Pushed further into WebGL, automation, and local-first AI experiments.",
      ],
      publicWording:
        "Completed the Springer Capital backend internship, contributed to college leadership work, and deepened work in automation, WebGL, and local-first experimentation.",
      ...meta("needs-approval", "Current manifest draft derived from correction brief"),
    },
    {
      yearLabel: "2026",
      heading: "Research and Portfolio Systems",
      bullets: [
        "Prepared and presented research work across security and AI-for-education topics.",
        "Built Auxilium Digital Archive as an immersive engineering portfolio.",
        "Continued consolidating projects, publications, and proof materials for public release.",
      ],
      publicWording:
        "Focused on research publication work and the construction of Auxilium Digital Archive as an immersive engineering portfolio.",
      ...meta("needs-approval", "Current manifest draft derived from correction brief"),
    },
  ] satisfies TimelineEntry[],
  reception: {
    visitorRegister: [
      "09:15 - Recruiter review requested",
      "11:42 - Open-source activity reviewed",
      "13:20 - Research publication status checked",
      "14:50 - Resume and contact surfaces verified",
      "16:00 - Optional Personal Archive access noted",
    ],
    goalNote: [
      "Finish one concrete improvement.",
      "Keep the professional archive clear and readable.",
      "Make the atmosphere support the content rather than obscure it.",
    ],
  },
  researchWorkbench: {
    labLog: [
      "Project: Local-first orchestration workspace",
      "Mode: Tooling, memory, and structured workflows",
      "Current state: Iterative experimentation across local systems",
      "Public note: Detailed hardware and repository records are being prepared",
    ],
    memo: [
      '"Local first -> privacy -> ownership -> reliable tooling"',
      "Document the system clearly before broadening the archive around it.",
    ],
    whiteboard: {
      title: "LOCAL-FIRST AI WORKBENCH",
      nodes: [
        {
          title: "[ LOCAL MODELS ]",
          subtitle: "Model stack documented internally",
        },
        {
          title: "[ CONTEXT + TOOLS ]",
          subtitle: "Ollama, memory, plugins, and structured workflows",
        },
        {
          title: "[ ORCHESTRATION CORE ]",
          subtitle: "Execution layer for local-first workflows",
        },
      ],
      footer: "Public release should describe validated capabilities without inventing unsupported metrics.",
    },
  },
  terminal: {
    manifestLines: [
      "Professional identity, research, and project records are consolidated into one archive manifest.",
      "Core portfolio sections remain accessible without collectibles or puzzle gates.",
      "Projects, publications, and open-source records are surfaced through structured case files.",
      "The environment exists to support comprehension and memorability, not to obscure the facts.",
    ],
    openSourceLines: [
      "Only public contribution records with confirmed outcomes should appear in the final showcase.",
      "Non-merged investigations can remain visible when their status is stated exactly.",
    ],
    researchLines: [
      "Zenodo publication records can be surfaced directly once local PDFs and cover images are attached.",
      "Conference and proceedings links should appear only when they are actually available.",
    ],
    systemLines: [
      "Main portfolio chapters remain accessible without keycards.",
      "Personal Archive is optional and should unlock with a bonus access card.",
      "The final showcase should also expose an 'About Me Beyond Code' path.",
    ],
  },
} as const;

function portfolioManifestTextFallback(value: string) {
  return value;
}

export const portfolioApproval = {
  identity: portfolioManifest.identity.entries,
  contact: portfolioManifest.contact.entries,
  education: [
    approvalItem(
      "education-hkbk",
      "HKBK College of Engineering",
      "education",
      "Bachelor of Engineering in Computer Science, 2023-2027, Bengaluru, Current CGPA: 8.93/10",
      portfolioManifest.education[0].publicWording,
      "Explicit user confirmation in Batch 1 decisions",
      "verified",
      ["Personnel Wing", "Final showcase", "Resume interface"],
      {}
    ),
    approvalItem(
      "education-vibgyor",
      "VIBGYOR High",
      "education",
      "High School Diploma, 2019-2021, Bengaluru",
      portfolioManifest.education[1].publicWording,
      "Explicit user confirmation in Batch 1 decisions",
      "verified",
      ["Archive timeline", "Resume interface"]
    ),
  ] satisfies ApprovalItem[],
  experience: [
    approvalItem(
      "experience-springer-capital",
      "Springer Capital Backend Internship",
      "experience",
      "Backend Intern - Springer Capital | Remote | August 2025-November 2025",
      portfolioManifest.experience[0].publicWording,
      "Explicit user confirmation in Batch 1 decisions",
      "verified",
      ["Personnel Wing", "Final showcase", "Resume interface"],
      {}
    ),
  ] satisfies ApprovalItem[],
  skills: [
    ...portfolioManifest.skills.languages.map((skill) =>
      approvalItem(
        `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        skill.name,
        "skill",
        `${skill.name} (${skill.level})`,
        skill.publicWording,
        skill.sourceLabel,
        skill.verificationStatus,
        ["Personnel Wing", "Final showcase", "Project dossiers"]
      )
    ),
    ...portfolioManifest.skills.cloudAndDevOps.map((skill) =>
      approvalItem(
        `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        skill.name,
        "skill",
        `${skill.name} (${skill.level})`,
        skill.publicWording,
        skill.sourceLabel,
        skill.verificationStatus,
        ["Research Lab", "Personnel Wing", "Final showcase"]
      )
    ),
    ...portfolioManifest.skills.frameworksAndTools.map((skill) =>
      approvalItem(
        `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        skill.name,
        "skill",
        `${skill.name} (${skill.level})`,
        skill.publicWording,
        skill.sourceLabel,
        skill.verificationStatus,
        ["Research Lab", "Personnel Wing", "Final showcase"]
      )
    ),
    ...portfolioManifest.skills.engineeringConcepts.map((skill) =>
      approvalItem(
        `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        skill.name,
        "skill",
        `${skill.name} (${skill.level})`,
        skill.publicWording,
        skill.sourceLabel,
        skill.verificationStatus,
        ["Research Lab", "Personnel Wing", "Final showcase"]
      )
    ),
    ...portfolioManifest.supplementalCapabilities.map((capability) =>
      approvalItem(
        capability.id,
        capability.label,
        "tooling",
        `${capability.publicCategory} // ${capability.scope}`,
        capability.publicWording,
        capability.sourceLabel,
        capability.verificationStatus,
        supplementalCapabilityAppearsIn(capability)
      )
    ),
  ] satisfies ApprovalItem[],
  projects: allProjectEntries.map((project) =>
    approvalItem(
      `project-${project.slug}`,
      project.name,
      "project",
      `${project.displayTier} // ${project.category} // ${project.lifecycleStatus}`,
      project.oneLiner,
      project.evidenceSummary,
      project.verificationStatus,
      projectAppearsIn(project),
      {
        links: projectMissingLinks(project),
        images: projectMissingImages(project),
        pdfs: [],
      }
    )
  ) satisfies ApprovalItem[],
  publications: portfolioManifest.publications.map((publication) =>
    approvalItem(
      `publication-${publication.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      publication.title,
      "publication",
      `${publication.venue} // ${publication.statusLine}`,
      publication.publicWording,
      publication.sourceLabel,
      publication.verificationStatus,
      ["Research Lab", "Archive Room", "Final showcase"],
      {
        links: publication.sourceUrl ? [] : ["External publication or conference record"],
        images: ["Cover-page image"],
        pdfs: publication.pdfLocal ? [] : ["Publication PDF"],
      },
      publication.sourceUrl
    )
  ) satisfies ApprovalItem[],
  certifications: portfolioManifest.certifications.map((certification) =>
    approvalItem(
      `certification-${certification.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      certification.title,
      "certification",
      `${certification.issuer} // ${certification.credentialType}`,
      certification.publicWording,
      certification.sourceLabel,
      certification.verificationStatus,
      ["Archive Room", "Final showcase"],
      {
        links: ["Verification URL"],
        images: ["Certificate thumbnail"],
        pdfs: ["Certificate PDF or scan"],
      }
    )
  ) satisfies ApprovalItem[],
  openSource: portfolioManifest.openSource.map((entry) =>
    approvalItem(
      `opensource-${entry.project.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      entry.project,
      "open-source",
      entry.statusLine,
      entry.publicWording,
      entry.sourceLabel,
      entry.verificationStatus,
      ["Reception terminal", "Archive Room", "Final showcase"],
      {
        links: ["Repository URL", "Pull request URL"],
        images: ["Optional discussion screenshot"],
        pdfs: [],
      }
    )
  ) satisfies ApprovalItem[],
  leadership: portfolioManifest.leadership.map((entry) =>
    approvalItem(
      `leadership-${entry.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      entry.label,
      "leadership",
      entry.label,
      entry.publicWording,
      entry.sourceLabel,
      entry.verificationStatus,
      ["Personnel Wing", "Archive Room", "Final showcase"],
      {
        links: [],
        images: ["Event or role photo"],
        pdfs: ["Role certificate or proof if available"],
      }
    )
  ) satisfies ApprovalItem[],
};

export const portfolioDocuments = {
  receptionVisitorRegister: labelList(
    "AUXILIUM DIGITAL ARCHIVE - VERIFIED VISITOR REGISTER",
    portfolioManifest.reception.visitorRegister
  ),
  receptionGoalNote: labelList(
    "DEVELOPER GOAL NOTE",
    portfolioManifest.reception.goalNote
  ),
  communicationsExperimentLog: labelList(
    "LOCAL AI WORKBENCH STATUS",
    portfolioManifest.researchWorkbench.labLog
  ),
  communicationsMemo: labelList(
    "PROJECT HERMES CORE MEMO",
    portfolioManifest.researchWorkbench.memo
  ),
  recordsDossiers: portfolioManifest.timeline.map((entry) =>
    bulletList(`DEVELOPER HISTORY ARCHIVE // ${entry.yearLabel}`, entry.bullets)
  ),
};
