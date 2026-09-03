# Auxilium: Portfolio Content Mapping & Hierarchy (Batch 5E)

This document establishes the physical locations, interaction verbs, verified source mappings, and presentation rules for all portfolio artifacts within Auxilium Digital Archive.

---

## 1. Project Hierarchy & Facility Placement

All public content is bound to `src/data/portfolioData.ts` and validated against `src/data/validatePortfolioData.ts`.

| Tier | Project Name | Slug | Physical Room & Zone | Interaction | Evidence & Live URL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FLAGSHIP** | **InfraMind** | `inframind` | **Records Hall** (West Pedestal) | `VIEW` | [Repo](https://github.com/Keninjavelas/InfraMind), [Live](https://infra-site-three.vercel.app/) |
| **FLAGSHIP** | **Auxilium Digital Archive** | `auxilium-digital-archive` | **Records Hall** (Center Pedestal) | `VIEW` | [Repo](https://github.com/Keninjavelas/Chaos) |
| **FLAGSHIP** | **Metis** | `metis` | **Records Hall** (East Pedestal) | `VIEW` | Verified manifest dossier |
| **DOSSIER** | **Multi-Cloud Serverless Analytics** | `multi-cloud-serverless-analytics` | **Records Hall** (West Inspection Table) | `READ` | Architecture diagrams & data flows |
| **DOSSIER** | **DayOne AI** | `dayone-ai` | **Records Hall** (West Inspection Table) | `READ` | Gemini API + local storage evidence |
| **DOSSIER** | **Poseidon** | `poseidon` | **Records Hall** (East Inspection Table) | `READ` | Bounded non-flagship simulation dossier |
| **ARCHIVE** | **Student OS** | `student-os` | **Records Hall** (West Shelf 1) | `READ` | Archive dossier binder |
| **ARCHIVE** | **YatinVeda** | `yatinveda` | **Records Hall** (West Shelf 1) | `READ` | Archive dossier binder |
| **ARCHIVE** | **Reconcilyx** | `reconcilyx` | **Records Hall** (West Shelf 2) | `READ` | Archive dossier binder |
| **ARCHIVE** | **GCP OmniStream** | `gcp-omnistream` | **Records Hall** (West Shelf 2) | `READ` | Archive dossier binder |
| **ARCHIVE** | **AWS CloudOps** | `aws-cloudops` | **Records Hall** (East Shelf 1) | `READ` | Archive dossier binder |
| **ARCHIVE** | **AWS Helix Data Lakehouse** | `aws-helix-data-lakehouse` | **Records Hall** (East Shelf 1) | `READ` | Archive dossier binder |
| **ARCHIVE** | **Fashion Feet** | `fashion-feet` | **Records Hall** (East Shelf 2) | `READ` | Next.js ecommerce dossier |
| **ARCHIVE** | **Odysseus** | `odysseus` | **Records Hall** (East Shelf 2) | `READ` | [Repo](https://github.com/Keninjavelas/odysseus) (Explicit fork attribution) |

---

## 2. Professional Experience & Education Mapping

| Artifact | Location | Source Mapping | Public Scope |
| :--- | :--- | :--- | :--- |
| **Springer Capital Internship** | **Personnel Wing** (Supervisor Desk A) | `portfolioManifest.experience[0]` | Flask microservices, SQLAlchemy, REST APIs, integration testing |
| **Academic Degree & Record** | **Personnel Wing** (Notice Board) | `portfolioManifest.education[0]` | HKBK College of Engineering, B.E. Computer Science (2023–2027), CGPA: 8.93/10 |
| **Developer Timeline Wall** | **Personnel Wing** (East Wall) | `portfolioManifest.timeline` | Concise physical timeline cards + full `VIEW` modal overlay |
| **Certifications Audit** | **Personnel Wing** | Verified only | **Zero unsupported AWS certification claims** |

---

## 3. Systems Thinking & Research Mapping

| Artifact | Location | Source Mapping | Verification Note |
| :--- | :--- | :--- | :--- |
| **Local-First Systems Workbench** | **Research Lab** (Glass Whiteboard) | `portfolioDocuments.communicationsExperimentLog` | Systems architecture thinking |
| **Compute & Retrieval Racks** | **Research Lab** (Server Cluster) | `portfolioManifest.researchWorkbench` | Local LLMs, Ollama, agent orchestration |
| **Post-Quantum Cryptography** | **Records Hall** (Central Table) | `portfolioManifest.publications[0]` | [Zenodo Record](https://zenodo.org/records/20002606) |
| **AI Systems Survey** | **Records Hall** (Central Table) | `portfolioManifest.publications[1]` | ICETM 2026 accepted oral presentation |

---

## 4. Contact & Recruiter Compression

| Channel | Mapping | Wording / Value |
| :--- | :--- | :--- |
| **GitHub** | Verified public link | `https://github.com/Keninjavelas` |
| **LinkedIn** | Verified public link | `https://www.linkedin.com/in/kapoor-aryan` |
| **Email** | Verified public email | `aryankapoor0303@gmail.com` |
| **Phone** | **Omitted** | Kept out of the public bundle per manifest policy |
| **Availability** | Stated open roles | Internships, open-source collaboration, 2027 graduate roles |
| **Contact Station** | **Elevator Lobby** & **Reception Terminal** | Integrated modal with Name, Email, Subject, Message |
