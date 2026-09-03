# Portfolio Content Approval

Last updated: `2026-08-06`

This document is the review companion to:

- `src/data/portfolioData.ts`
- `src/data/portfolioAssets.ts`

## Current Totals

- Total content entries: `90`
- Verified: `63`
- Needs approval: `19`
- Needs source: `7`
- Private: `1`
- Missing assets/resources: `53`

## Review Batches

1. Batch 1 - Identity, Contact, Education and Experience
2. Batch 2 - Skills and Professional Direction
3. Batch 3 - Flagship Projects
4. Batch 4 - Publications, Certifications and Open Source
5. Batch 5 - Leadership, Timeline and Personal Archive

## Decision Labels

- `APPROVE`
- `EDIT`
- `REMOVE`
- `PRIVATE`
- `NEEDS EVIDENCE`
- `CURRENTLY LEARNING`

## Batch 1

### Identity

| Manifest key | Current value | Proposed public wording | Current verification status | Evidence available | Public location in the facility | Privacy concern | Applied decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `identity-name` | `Aryan Kapoor` | `Aryan Kapoor` | `verified` | Portfolio correction brief and current manifest | Reception terminal; Final showcase; Resume interface | None | `APPROVE` |
| `identity-location` | `Bengaluru, India` | `Based in Bengaluru, India` | `verified` | Portfolio correction brief | Reception terminal; Final showcase | Keep this city-level only. Do not expose a more precise address. | `APPROVE` |
| `identity-status` | `Computer Science and Engineering student graduating in 2027` | `Computer Science and Engineering student graduating in 2027` | `verified` | Explicit user confirmation in Batch 1 decisions | Reception terminal; Final showcase; Resume interface | None | `EDIT -> Computer Science and Engineering student graduating in 2027` |
| `identity-college` | `HKBK College of Engineering` | `HKBK College of Engineering` | `verified` | Student report referenced in correction brief | Personnel Wing; Final showcase; Resume interface | None | `APPROVE` |
| `identity-degree` | `Bachelor of Engineering in Computer Science` | `Bachelor of Engineering in Computer Science` | `verified` | Portfolio correction brief | Personnel Wing; Final showcase; Resume interface | None | `APPROVE` |
| `identity-duration` | `2023-2027` | `Expected graduation year: 2027` | `verified` | Explicit user confirmation in Batch 1 decisions | Personnel Wing; Final showcase; Resume interface | None | `APPROVE` |
| `identity-headline` | `Software Engineering Student focused on Backend Systems, Cloud Infrastructure, AI Systems and Interactive WebGL Experiences` | `Software Engineering Student focused on Backend Systems, Cloud Infrastructure, AI Systems and Interactive WebGL Experiences` | `verified` | Explicit user confirmation in Batch 1 decisions | Reception terminal; Final showcase; Resume interface | Keep claims broad but supportable. | `EDIT -> approved headline` |
| `identity-short-intro` | `Computer Science engineering student in Bengaluru building backend systems, cloud infrastructure, local AI tools and interactive WebGL experiences. I enjoy turning ambitious ideas into working, understandable systems.` | `Computer Science engineering student in Bengaluru building backend systems, cloud infrastructure, local AI tools and interactive WebGL experiences. I enjoy turning ambitious ideas into working, understandable systems.` | `verified` | Explicit user confirmation in Batch 1 decisions | Reception terminal; Reception document surfaces | None | `EDIT -> approved intro` |
| `identity-biography` | `Approved biography text supplied in Batch 1 decisions` | `I'm Aryan Kapoor, a Computer Science and Engineering student at HKBK College of Engineering in Bengaluru, graduating in 2027. My work spans backend engineering, cloud and DevOps, local AI systems, automation and interactive WebGL experiences. I have built projects involving Flask microservices, Docker, AWS and GCP infrastructure, local LLM tooling, automated media pipelines and React Three Fiber environments. I am especially interested in platform engineering and systems that are practical, privacy-aware and maintainable. Auxilium Digital Archive brings these interests together as an explorable developer portfolio.` | `verified` | Explicit user confirmation in Batch 1 decisions | Final showcase; Resume interface | Do not overstate scope beyond approved project evidence. | `EDIT -> approved biography` |
| `identity-availability` | `Open to software engineering internships, open-source collaboration and 2027 graduate opportunities in backend engineering, platform engineering, cloud and DevOps, and applied AI systems.` | `Open to software engineering internships, open-source collaboration and 2027 graduate opportunities in backend engineering, platform engineering, cloud and DevOps, and applied AI systems.` | `verified` | Explicit user confirmation in Batch 1 decisions | Reception terminal; Final showcase | None | `EDIT -> approved availability` |

### Contact

| Manifest key | Current value | Proposed public wording | Current verification status | Evidence available | Public location in the facility | Privacy concern | Applied decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `contact-github` | `https://github.com/Keninjavelas` | `github.com/Keninjavelas` | `verified` | Resume and correction brief | Reception; Final showcase; Git terminal | None | `APPROVE` |
| `contact-linkedin` | `https://www.linkedin.com/in/kapoor-aryan` | `linkedin.com/in/kapoor-aryan` | `verified` | Resume and correction brief | Reception; Final showcase; Contact interface | None | `APPROVE` |
| `contact-email` | `aryankapoor0303@gmail.com` | `aryankapoor0303@gmail.com` | `verified` | Resume and correction brief | Reception; Final showcase; Contact interface | Public email exposure is intentional. | `APPROVE` |
| `contact-email-public` | `Public email enabled` | `Show email publicly` | `verified` | Explicit user confirmation in Batch 1 decisions | Final showcase; Contact interface | Public email may attract spam. | `APPROVE` |
| `contact-phone-public` | `Phone omitted from the public bundle` | `Keep the phone number completely out of the public bundle.` | `private` | Explicit user confirmation in Batch 1 decisions | Final showcase; Resume policy | High privacy concern. Keep it out of the shipped public bundle, not merely hidden in the client. | `PRIVATE` |
| `contact-cgpa-public` | `Current CGPA: 8.93/10` | `Display CGPA as Current CGPA: 8.93/10` | `verified` | Explicit user confirmation in Batch 1 decisions | Personnel Wing; Final showcase; Resume interface | Public only while intentionally maintained. | `APPROVE` |
| `contact-research-publication` | `https://zenodo.org/records/20002606` | `Research Publication` | `verified` | Explicit user confirmation in Batch 1 decisions | Reception; Final showcase; Research interface | Do not describe this single record as a full research profile. | `APPROVE -> https://zenodo.org/records/20002606` |
| `contact-form` | `Public contact form approved` | `Public contact form with Name, Email, Subject, and Message fields. No login required.` | `verified` | Explicit user confirmation in Batch 1 decisions | Reception; Final showcase; Contact interface | Receiving service and private configuration must remain server-side. | `APPROVE (needs implementation)` |
| `contact-auxilium-url` | `Not yet supplied` | `Public deployment link for Auxilium Digital Archive. Render only after deployment.` | `needs-source` | Deployment URL not yet supplied | Final showcase; Projects directory | Do not render a dead placeholder link. | `NEEDS EVIDENCE` |
| `contact-resume-pdf` | `/portfolio/documents/resume.pdf` | `Downloadable public resume PDF. Hide or disable until the file exists in production.` | `needs-source` | Reserved public path only; actual PDF not yet supplied | Final showcase; Resume interface | Do not expose a broken download. | `NEEDS EVIDENCE` |

### Education

| Manifest key | Current value | Proposed public wording | Current verification status | Evidence available | Public location in the facility | Privacy concern | Applied decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `education-hkbk` | `Bachelor of Engineering in Computer Science, 2023-2027, Bengaluru, Current CGPA: 8.93/10` | `Bachelor of Engineering in Computer Science at HKBK College of Engineering, 2023-2027. Current CGPA: 8.93/10.` | `verified` | Explicit user confirmation in Batch 1 decisions | Personnel Wing; Final showcase; Resume interface | No issue if CGPA is accurate and deliberately public. | `APPROVE` |
| `education-vibgyor` | `High School Diploma, 2019-2021, Bengaluru` | `High School Diploma, VIBGYOR High, 2019-2021.` | `verified` | Explicit user confirmation in Batch 1 decisions | Archive timeline; Resume interface | Keep this concise and do not promote it to a major room exhibit. | `APPROVE` |

### Experience

| Manifest key | Current value | Proposed public wording | Current verification status | Evidence available | Public location in the facility | Privacy concern | Applied decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `experience-springer-capital` | `Backend Intern - Springer Capital | Remote | August 2025-November 2025` | `Backend Intern - Springer Capital | Remote | August 2025-November 2025. Developed Flask microservices using SQLAlchemy, designed and tested REST APIs and database schemas, created mock services for integration testing, resolved dependency conflicts, and supported debugging and deployment reliability across a multi-service backend platform.` | `verified` | Explicit user confirmation in Batch 1 decisions | Personnel Wing; Final showcase; Resume interface | Avoid employer logos, internal screenshots, customer names, and proprietary architecture until later asset approval. | `EDIT -> approved experience wording` |

### Batch 1 Review Notes

- `contact-auxilium-url` remains `needs-source` until the real deployed Auxilium URL exists.
- `contact-resume-pdf` remains `needs-source` until the production resume PDF exists.
- `contact-form` is approved in content but remains marked `needs-implementation`.
- `contact-research-publication` is approved as a single public publication link, not a complete research profile.
- `education-vibgyor` is intentionally limited to a concise archive timeline entry and the full resume.
- `experience-springer-capital` is approved text-first; supporting visual assets remain intentionally restricted until later approval.

### Applied Batch 1 Defaults

- Location: `Bengaluru, India`
- Email: Public
- Phone: Private and excluded from the shipped public bundle
- CGPA: `Current CGPA: 8.93/10`
- Research publication link: Public
- Contact form: Approved, implementation pending
- Resume download: Hidden or disabled until the real PDF exists
- Auxilium live link: Hidden until deployment exists

## Batch 2

Batch 2 status: `Complete`

Modeled skill, tool, and learning entry count after Batch 2C: `41`

This batch audits every explicit skill, tool, and capability currently represented in `src/data/portfolioData.ts` and adds proposed professional-direction entries for approval. Batch 2C has now been applied, so the modeled Batch 2 inventory has zero unresolved decisions. Supporting project-scoped capability rows and professional-direction notes remain below for hierarchy and display guidance.

### Programming Languages

| Manifest key | Current public label | Current description | Proposed public wording | Proficiency category | Evidence currently available | Projects or experience demonstrating it | Facility locations | Risk of overstating the capability | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `skill-python` | `Python` | Used in backend services, automation workflows, media pipelines, and local AI tooling. | `Python for backend services, automation workflows, media pipelines, and local AI tooling.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 1 decisions | Springer Capital; MediaOps; Understanding Studio | Personnel Wing; Final showcase; Project dossiers | Low if kept tied to backend, automation, media-pipeline, and local-tooling implementations already represented in the manifest. | `APPROVE -> DEMONSTRATED` |
| `skill-typescript` | `TypeScript` | Used for interactive web applications, reusable interface systems, and state-driven 3D experiences. | `TypeScript for interactive web applications, reusable interface systems, and state-driven 3D experiences.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 1 decisions | Auxilium Digital Archive | Personnel Wing; Final showcase; Project dossiers | Low. | `APPROVE -> DEMONSTRATED` |
| `skill-java` | `Java` | Used for data structures, algorithms, and academic software development. | `Java - used for data structures, algorithms and academic software development.` | `WORKING KNOWLEDGE` | Explicit user confirmation in Batch 2 decisions | Academic DSA and Java problem-solving implementations | Archive Room; Final showcase | Moderate if presented as a primary production-backend language. | `APPROVE -> WORKING KNOWLEDGE` |
| `skill-bash` | `Bash` | Used for command-line automation and development-environment workflows across Linux, Docker, and local setup tasks. | `Bash - command-line automation and development-environment workflows.` | `WORKING KNOWLEDGE` | Explicit user confirmation in Batch 2 decisions | Linux, DevOps, Docker, and local-development workflows | Archive Room; Final showcase | Moderate if it implies advanced shell scripting without a substantial script or repository. | `APPROVE -> WORKING KNOWLEDGE` |
| `skill-c` | `C` | Used in parallel-programming and performance experiments with OpenMP, including sequential versus parallel sorting comparisons. | `C - parallel-programming and performance experiments using OpenMP.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 decisions | Reconcilyx OpenMP programs; sequential and parallel sorting experiments; performance comparison work | Archive Room; Final showcase | Low if kept tied to parallel-programming experiments rather than broad systems claims. | `EDIT -> DEMONSTRATED` |
| `skill-cpp` | `C++` | Used for academic programming and algorithmic foundations. | `C++ - academic programming and algorithmic foundations.` | `WORKING KNOWLEDGE` | Explicit user confirmation in Batch 2 decisions | Academic programming and foundational problem solving | Archive Room; Final showcase | Low if kept below Java and Python in prominence. | `APPROVE -> WORKING KNOWLEDGE` |

### Backend Engineering

| Manifest key | Current public label | Current description | Proposed public wording | Proficiency category | Evidence currently available | Projects or experience demonstrating it | Facility locations | Risk of overstating the capability | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `skill-backend-engineering` | `Backend engineering` | Used across multi-service internship work, API development, self-hosted systems, and automation projects. | `Backend engineering across multi-service internship work, API development, self-hosted systems, and automation projects.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 1 decisions | Springer Capital; Odysseus; MediaOps | Personnel Wing; Final showcase; Project dossiers | Low if kept at implemented system, service, and automation level rather than broad production claims. | `EDIT -> DEMONSTRATED` |
| `skill-flask` | `Flask` | Used for backend microservices and internal API development during the Springer Capital internship. | `Flask - backend microservices and internal API development.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 decisions | Springer Capital internship; Flask services within an eight-service backend system | Personnel Wing; Final showcase; Project dossiers | Low to moderate. | `EDIT -> DEMONSTRATED` |
| `skill-fastapi` | `FastAPI` | Worked with FastAPI backends for self-hosted AI workflows, document handling, and API debugging. | `Worked with FastAPI backends for self-hosted AI workflows, document handling, and API debugging.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 1 decisions | Odysseus | Personnel Wing; Final showcase; Project dossiers | Low if kept framed as meaningful implementation and debugging work rather than sole authorship of the entire backend. | `EDIT -> DEMONSTRATED` |
| `skill-sqlalchemy` | `SQLAlchemy` | Used for ORM-backed service development and database integration during the Springer Capital internship. | `SQLAlchemy - ORM-backed service development and database integration.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 decisions | Springer Capital internship; database-backed Flask services; schema-related debugging | Personnel Wing; Final showcase; Project dossiers | Low to moderate. | `EDIT -> DEMONSTRATED` |
| `skill-rest-api-design` | `REST API design` | Used for endpoint design, service integration, and API validation, including mock endpoints and curl-based checks during the Springer Capital internship. | `REST API design - endpoint design, service integration and API validation.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 decisions | Springer Capital internship; API-contract-driven services; mock endpoints; curl-based API validation | Personnel Wing; Final showcase; Project dossiers | Low to moderate. | `EDIT -> DEMONSTRATED` |
| `skill-microservices` | `Microservices` | Used in development and debugging across a multi-service backend architecture during the Springer Capital internship. | `Microservices - development and debugging across a multi-service backend architecture.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 decisions | Springer Capital internship; eight-service backend platform | Personnel Wing; Final showcase; Project dossiers | Low to moderate. | `EDIT -> DEMONSTRATED` |
| `experience-springer-capital.database-schema-design` | `Database schema design` | Designed and tested REST APIs and database schemas. | `Supported database schema design and resolved schema-related integration failures.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 decisions | Springer Capital internship; schema creation; database-volume issues; missing-column failures; service database integration | Springer Capital experience block; Project dossiers | High if promoted as a standalone global skill badge rather than experience evidence. | `EDIT -> keep under Springer evidence, not as a headline skill badge` |
| `experience-springer-capital.integration-testing` | `Integration testing` | Created mock services for integration testing. | `Supported service integration testing using mock APIs and endpoint validation.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 decisions | Springer Capital internship; mock Flask services; API-contract testing; curl-based validation across services | Springer Capital experience block; Project dossiers | High if promoted as a standalone global skill badge rather than experience evidence. | `EDIT -> keep under Springer evidence, not as a headline skill badge` |
| `experience-springer-capital.mock-services` | `Mock services` | Created mock services for integration testing. | `Built mock API services to unblock integration testing and dependent-service development.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 decisions | Springer Capital internship; mock entity and transaction services used during integration work | Springer Capital experience block; Project dossiers | High if promoted as a standalone global skill badge rather than experience evidence. | `EDIT -> keep under Springer evidence, not as a headline skill badge` |
| `experience-springer-capital.backend-debugging` | `Backend debugging` | Supported debugging and deployment reliability across a multi-service backend platform. | `Diagnosed and resolved backend startup, dependency, database and service-networking issues.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 decisions | Springer Capital internship; startup, dependency, import, schema, and networking failures across multiple services | Springer Capital experience block; Project dossiers | High if promoted as a standalone global skill badge rather than experience evidence. | `EDIT -> keep under Springer evidence, not as a headline skill badge` |

### Frontend and Interactive Development

| Manifest key | Current public label | Current description | Proposed public wording | Proficiency category | Evidence currently available | Projects or experience demonstrating it | Facility locations | Risk of overstating the capability | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `skill-react` | `React` | Used for interactive application interfaces, reusable UI systems, and WebGL-integrated experiences. | `React for interactive application interfaces, reusable UI systems, and WebGL-integrated experiences.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 1 decisions | Auxilium Digital Archive | Personnel Wing; Final showcase; Project dossiers | Low. | `APPROVE -> DEMONSTRATED` |
| `skill-next-js` | `Next.js` | Used for application structure, routing, rendering, and deployment-ready portfolio delivery. | `Next.js for application structure, routing, rendering, and deployment-ready portfolio delivery.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 1 decisions | Auxilium Digital Archive | Personnel Wing; Final showcase; Project dossiers | Low. | `APPROVE -> DEMONSTRATED` |
| `skill-three-js` | `Three.js` | Used for WebGL scene construction, lighting, materials, cameras, and interactive visual systems. | `Three.js for WebGL scene construction, lighting, materials, cameras, and interactive visual systems.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 1 decisions | Auxilium Digital Archive | Research Lab; Final showcase; Project dossiers | Low. | `APPROVE -> DEMONSTRATED` |
| `skill-react-three-fiber` | `React Three Fiber` | Used for component-driven 3D scenes, interactive objects, and integration between React interfaces and WebGL environments. | `React Three Fiber for component-driven 3D scenes, interactive objects, and integration between React interfaces and WebGL environments.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 1 decisions | Auxilium Digital Archive | Research Lab; Final showcase; Project dossiers | Low. | `APPROVE -> DEMONSTRATED` |
| `skill-webgl-development` | `WebGL development` | Used for immersive portfolio interfaces, first-person exploration, and scene-based environmental storytelling. | `WebGL development for immersive portfolio interfaces, first-person exploration, and scene-based environmental storytelling.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 1 decisions | Auxilium Digital Archive | Research Lab; Final showcase; Project dossiers | Low to moderate if kept tied to the implemented Auxilium environment rather than broader graphics-engineering claims. | `APPROVE -> DEMONSTRATED` |
| `skill-zustand` | `Zustand` | Used for player interaction state, document inspection, interface state, and environment progression. | `Zustand for player interaction state, document inspection, interface state, and environment progression.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 1 decisions | Auxilium Digital Archive | Personnel Wing; Final showcase; Project dossiers | Low. | `APPROVE -> DEMONSTRATED` |
| `skill-tailwind-css` | `Tailwind CSS` | Used for terminal interfaces, document overlays, responsive surfaces, and supporting portfolio UI. | `Tailwind CSS for terminal interfaces, document overlays, responsive surfaces, and supporting portfolio UI.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 1 decisions | Auxilium Digital Archive | Personnel Wing; Final showcase; Project dossiers | Low. | `APPROVE -> DEMONSTRATED` |
| `project-auxilium.interactive-3d-experiences` | `Interactive 3D experiences` | Auxilium is described as a navigable archive facility with spatial interaction. | `Interactive 3D experiences built around first-person navigation, spatial interaction, environmental storytelling, and readable information design.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Auxilium Digital Archive | Research Lab; Final showcase; Project dossiers | Moderate if treated as broad game-development breadth rather than a focused interface differentiator. | `APPROVE -> DEMONSTRATED` |

### Cloud and Infrastructure

| Manifest key | Current public label | Current description | Proposed public wording | Proficiency category | Evidence currently available | Projects or experience demonstrating it | Facility locations | Risk of overstating the capability | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `skill-aws` | `AWS` | Used for infrastructure automation, serverless workflows, and cloud application projects. | `AWS for infrastructure automation, serverless workflows, and cloud application projects.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Multi-Cloud Serverless Analytics Platform; Infrastructure Automation Platform | Research Lab; Final showcase; Project dossiers | Moderate if interpreted as a certification-level or provider-wide mastery claim rather than practical AWS project experience. | `EDIT -> DEMONSTRATED` |
| `skill-gcp` | `GCP` | Used for event-driven analytics, telemetry processing, serverless services, and cloud data workflows. | `GCP for event-driven analytics, telemetry processing, serverless services, and cloud data workflows.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Multi-Cloud Serverless Analytics Platform; Distributed Telemetry Processing Platform | Research Lab; Final showcase; Project dossiers | Moderate if interpreted as broad provider mastery instead of project-specific cloud implementation evidence. | `EDIT -> DEMONSTRATED` |
| `skill-docker` | `Docker` | Used with Docker Compose for self-hosted AI workspaces, reproducible development environments, and local services. | `Docker and Docker Compose for self-hosted AI workspaces, reproducible development environments, and local services.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Odysseus; local AI workspace projects; supporting MediaOps environments | Research Lab; Final showcase; Project dossiers | Low to moderate if Odysseus and local AI workspaces remain the primary evidence. | `EDIT -> DEMONSTRATED` |
| `skill-terraform` | `Terraform` | Used for version-controlled, repeatable cloud infrastructure provisioning. | `Terraform for version-controlled, repeatable cloud infrastructure provisioning.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Infrastructure Automation Platform | Research Lab; Final showcase; Project dossiers | Low. | `EDIT -> DEMONSTRATED` |
| `skill-github-actions` | `GitHub Actions` | Used for automated validation, CI workflows, and deployment-oriented project pipelines. | `GitHub Actions for automated validation, CI workflows, and deployment-oriented project pipelines.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Infrastructure Automation Platform; Distributed Telemetry Processing Platform | Research Lab; Final showcase; Project dossiers | Low to moderate. | `EDIT -> DEMONSTRATED` |
| `skill-linux` | `Linux` | Used for Linux command-line, development-environment, container, and DevOps workflows. | `Linux command-line, development-environment, container, and DevOps workflows.` | `WORKING KNOWLEDGE` | Local AI tooling, Docker-based environments, OpenMP compilation work, and infrastructure learning | Local AI tooling; Docker-based environments; OpenMP compilation work; infrastructure learning | Moderate because most documented development remains Windows-based and the current record does not yet show a Linux deployment, homelab, or substantial Linux automation project. | `EDIT -> WORKING KNOWLEDGE` |
| `skill-ci-cd` | `CI/CD` | Used for repeatable validation, deployment, and infrastructure automation workflows. | `CI/CD workflow implementation for repeatable validation, deployment, and infrastructure automation.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Infrastructure Automation Platform; Distributed Telemetry Processing Platform | Research Lab; Final showcase; Project dossiers | Low to moderate. | `EDIT -> DEMONSTRATED` |
| `skill-infrastructure-as-code` | `Infrastructure as Code` | Used for repeatable provisioning, version-controlled infrastructure, and consistent deployment workflows. | `Infrastructure as Code for repeatable provisioning, version-controlled infrastructure, and consistent deployment workflows.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Infrastructure Automation Platform | Research Lab; Final showcase; Project dossiers | Low. | `EDIT -> DEMONSTRATED` |
| `skill-event-driven-architecture` | `Event-driven architecture` | Used for asynchronous ingestion, processing pipelines, and decoupled system workflows. | `Event-driven architecture for asynchronous ingestion, processing pipelines, and decoupled system workflows.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Multi-Cloud Serverless Analytics Platform; Distributed Telemetry Processing Platform | Research Lab; Final showcase; Project dossiers | Moderate because exact implementation depth remains partly project-scoped. | `APPROVE -> DEMONSTRATED` |
| `skill-cloud-infrastructure` | `Cloud infrastructure` | Used for cloud infrastructure design and implementation across AWS and GCP project environments. | `Cloud infrastructure design and implementation across AWS and GCP project environments.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Multi-Cloud Serverless Analytics Platform; Distributed Telemetry Processing Platform; Infrastructure Automation Platform | Research Lab; Final showcase; Project dossiers | Moderate if interpreted as production-cloud breadth beyond the approved project environments. | `EDIT -> DEMONSTRATED` |
| `skill-high-availability` | `High availability` | Working knowledge from high-availability and scalability considerations in cloud architecture projects such as Smart Gallery and VedaMind AI. | `High-availability architecture - working knowledge through cloud-system design and infrastructure projects.` | `WORKING KNOWLEDGE` | Explicit user confirmation in Batch 2 decisions | Smart Gallery; VedaMind AI | Research Lab; Final showcase | High if marked demonstrated before stronger deployed or tested architecture evidence is approved. | `EDIT -> WORKING KNOWLEDGE` |
| `project-infrastructure-automation.cloud-networking` | `Cloud networking` | Infrastructure automation includes networking, VPC design, and load balancing. | `Working knowledge of VPC design, load balancing, service connectivity, and cloud-networking fundamentals through infrastructure project work.` | `WORKING KNOWLEDGE` | Explicit user confirmation in Batch 2 Group 2 decisions | Infrastructure Automation Platform | Research Lab; Final showcase; Project dossiers | Moderate until the project includes approved deployment evidence, network diagrams, or tested infrastructure outputs. | `EDIT -> WORKING KNOWLEDGE` |

### AI and Automation

| Manifest key | Current public label | Current description | Proposed public wording | Proficiency category | Evidence currently available | Projects or experience demonstrating it | Facility locations | Risk of overstating the capability | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `skill-local-ai-experimentation` | `Local AI experimentation` | Currently developing practical experience through local AI experimentation, controllable tooling, model evaluation, and workflow design. | `Currently developing practical experience through local AI experimentation, controllable tooling, model evaluation, and workflow design.` | `CURRENTLY LEARNING` | Explicit user confirmation in Batch 2 Group 2 decisions | Hermes / Yggdrasil; Odysseus | Research Lab; Final showcase; Project dossiers | Low if kept explicitly experimental and in-progress. | `APPROVE -> CURRENTLY LEARNING` |
| `project-hermes-yggdrasil.local-llms` | `Local LLMs` | Hermes / Yggdrasil explores local-first AI workflows and model control. | `Configured and tested local LLM workflows focused on privacy, ownership, offline operation, and controllable experimentation.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Hermes / Yggdrasil | Research Lab; Final showcase; Project dossiers | Moderate because the scope should remain within the current Hermes / Yggdrasil implementation rather than broad LLM-platform claims. | `EDIT -> DEMONSTRATED` |
| `project-hermes-yggdrasil.ollama` | `Ollama` | Ollama appears in the Hermes / Yggdrasil technology list. | `Configured Ollama for local model serving, model management, and multi-model experimentation.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Hermes / Yggdrasil local environment | Research Lab; Final showcase; Project dossiers | Moderate because no public repo or demo link is attached yet. | `EDIT -> DEMONSTRATED` |
| `project-hermes-yggdrasil.agent-orchestration` | `Agent orchestration` | Hermes / Yggdrasil is described as a local-first orchestration workspace. | `Built and configured agent-oriented workflows combining local models, tools, memory, and controlled filesystem access.` | `DEMONSTRATED` | Explicit user confirmation in Batch 2 Group 2 decisions | Hermes / Yggdrasil | Research Lab; Final showcase; Project dossiers | Moderate if described as fully autonomous or production-ready before stronger implementation evidence is approved. | `EDIT -> DEMONSTRATED` |
| `project-odysseus.document-processing-workflows` | `Document-processing workflows` | Configured and debugged document-upload, parsing, retrieval, and document-chat workflows in a self-hosted AI workspace. | `Configured and debugged document-upload, parsing, retrieval, and document-chat workflows in a self-hosted AI workspace.` | `DEMONSTRATED` | Odysseus upload and chat workflow, PDF-processing fixes, and backend/frontend debugging | Odysseus | Research Lab; Final showcase; Project dossiers | Low to moderate if the wording stays tied to configuration, integration, and debugging rather than claiming the complete system was independently built from scratch. | `EDIT -> DEMONSTRATED` |
| `project-understanding-studio.automated-media-pipelines` | `Automated media pipelines` | Built a deterministic media pipeline that converts structured episode specifications into generated visuals, narration, motion sequences, and assembled video output. | `Built a deterministic media pipeline that converts structured episode specifications into generated visuals, narration, motion sequences, and assembled video output.` | `DEMONSTRATED` | Understanding Studio shot, scene, and episode compilation pipeline | Understanding Studio | Research Lab; Final showcase; Project dossiers | Low to moderate if the wording stays tied to the current deterministic pipeline scope. | `EDIT -> DEMONSTRATED` |
| `project-understanding-studio.edge-tts` | `Edge-TTS` | Integrated Edge-TTS as a narration provider within a reusable text-to-speech pipeline. | `Integrated Edge-TTS as a narration provider within a reusable text-to-speech pipeline.` | `DEMONSTRATED` | Successfully generated narration audio and integrated it into final video assembly | Understanding Studio | Research Lab; Final showcase; Project dossiers | Low to moderate if it remains framed as a pipeline integration rather than a broader speech-systems claim. | `EDIT -> DEMONSTRATED` |
| `project-understanding-studio.ffmpeg` | `FFmpeg` | Used FFmpeg for image motion, audio-video muxing, scene rendering, and episode assembly. | `Used FFmpeg for image motion, audio-video muxing, scene rendering, and episode assembly.` | `DEMONSTRATED` | Zoom-pan motion generation, final-shot muxing, and concat-based episode output | Understanding Studio | Research Lab; Final showcase; Project dossiers | Low to moderate. | `EDIT -> DEMONSTRATED` |

### Engineering Tools

| Manifest key | Current public label | Current description | Proposed public wording | Proficiency category | Evidence currently available | Projects or experience demonstrating it | Facility locations | Risk of overstating the capability | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `skill-git` | `Git` | Used for version control, branching, remote management, debugging changes, and open-source contribution workflows. | `Git for version control, branching, remote management, debugging changes, and open-source contribution workflows.` | `DEMONSTRATED` | Personal repositories, Latitude LLM contribution work, First Contributions, and ongoing project development | Personal repositories; Latitude LLM contribution work; First Contributions; ongoing project development | Low to moderate. | `APPROVE -> DEMONSTRATED` |
| `skill-node-js` | `Node.js` | Used as the runtime and tooling layer for React, Next.js, TypeScript, package management, and application build workflows. | `Node.js runtime and tooling for React, Next.js, TypeScript, package management, and application build workflows.` | `DEMONSTRATED` | Auxilium Digital Archive, Fashion Feet, and other web projects | Auxilium Digital Archive; Fashion Feet; other web projects | Moderate if the wording drifts into implied production Node.js backend expertise without an approved Node backend project. | `EDIT -> DEMONSTRATED` |
| `project-odysseus.docker-compose` | `Docker Compose` | Configured and operated a multi-service Docker Compose environment for a self-hosted AI workspace. | `Configured and operated a multi-service Docker Compose environment for a self-hosted AI workspace.` | `DEMONSTRATED` | Odysseus deployment, service startup, container debugging, and configuration work | Odysseus | Research Lab; Final showcase; Project dossiers | Low. | `EDIT -> DEMONSTRATED` |

### Professional Direction

| Manifest key | Current public label | Current description | Proposed public wording | Proficiency category | Evidence currently available | Projects or experience demonstrating it | Facility locations | Risk of overstating the capability | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `proposed-direction-primary` | `Not yet represented as a standalone direction entry` | Direction is currently spread across the headline, biography, and availability fields. | `Primary direction: Backend, platform and cloud engineering, with complementary experience in local AI systems, developer tooling and interactive WebGL development.` | `DEMONSTRATED` | Approved identity copy plus existing internship and project inventory | Springer Capital; Odysseus; Infrastructure Automation Platform; Multi-Cloud Serverless Analytics Platform; Hermes / Yggdrasil; Auxilium Digital Archive | Personnel Wing; Final showcase | Low if kept as the focused umbrella statement for the portfolio. | `APPROVE` |
| `proposed-role-backend-engineering` | `Backend Engineering` | Current availability text references backend engineering opportunities. | `Target role: Backend Engineering` | `DEMONSTRATED` | Approved availability plus backend internship and project evidence | Springer Capital; Odysseus; MediaOps | Personnel Wing; Final showcase | Low. | `APPROVE` |
| `proposed-role-platform-engineering` | `Platform Engineering` | Current biography mentions platform engineering interest. | `Target role: Platform Engineering` | `DEMONSTRATED` | Approved biography plus local-first, self-hosted, and infrastructure project descriptions | Hermes / Yggdrasil; Odysseus; Infrastructure Automation Platform | Personnel Wing; Final showcase | Low to moderate if the final copy keeps this as a direction rather than a seniority claim. | `APPROVE` |
| `proposed-role-cloud-and-devops` | `Cloud and DevOps` | Current biography and availability mention cloud and DevOps. | `Target role: Cloud and DevOps` | `DEMONSTRATED` | Approved identity copy plus cloud and automation project descriptions | Multi-Cloud Serverless Analytics Platform; Distributed Telemetry Processing Platform; Infrastructure Automation Platform | Personnel Wing; Final showcase | Low to moderate because service-level depth should stay project-scoped. | `APPROVE` |
| `proposed-role-infrastructure-automation` | `Infrastructure Automation` | Current availability references infrastructure automation. | `Target role: Infrastructure Automation` | `DEMONSTRATED` | Approved availability plus infrastructure automation project description | Infrastructure Automation Platform | Personnel Wing; Final showcase | Low. | `APPROVE` |
| `proposed-role-applied-ai-systems` | `Applied AI Systems` | Current biography and availability mention local AI systems and applied AI systems. | `Applied AI Systems - secondary area of interest supported by local AI tooling, agent experiments and automated media workflows.` | `CURRENTLY LEARNING` | Approved identity copy plus local AI and document/media workflow projects | Hermes / Yggdrasil; Odysseus; Understanding Studio | Personnel Wing; Final showcase | Moderate if the portfolio suggests broad machine-learning depth rather than tool-building and systems integration. | `EDIT -> secondary area of interest` |
| `direction-webgl` | `Interactive WebGL Development` | WebGL currently appears as a demonstrated technical differentiator through Auxilium rather than a primary target role. | `Interactive WebGL Development - differentiating technical and creative capability, not the primary target role.` | `DEMONSTRATED` | Approved identity copy plus Auxilium Digital Archive implementation | Auxilium Digital Archive | Personnel Wing; Final showcase | Low if clearly framed as a differentiator rather than the main career track. | `EDIT -> differentiating capability, not primary target role` |

### Batch 2 Review Notes

- Remaining note-only review items not yet modeled as standalone manifest entries: `SQL`, `Responsive interface design`, `Retrieval and context systems`, `Prompt-driven tools`, and `VS Code`.
- Individual AWS and GCP services currently appear only inside project technology lists. They should stay project-scoped until Batch 3 approves exact project dossiers and evidence packages.
- `Database schema design`, `Integration testing`, `Mock services`, and `Backend debugging` should remain evidence under the Springer Capital experience and relevant project dossiers rather than becoming global headline skill badges.
- `Cloud networking` is still best kept as project-scoped capability evidence until a fuller project dossier is approved.
- Group 1 display hierarchy:
  Core capabilities are `Python`, `TypeScript`, `Backend Engineering`, `React`, `Three.js`, `React Three Fiber`, and `WebGL Development`.
  Supporting frameworks and tools are `FastAPI`, `Next.js`, `Zustand`, and `Tailwind CSS`.
- Group 2 display hierarchy:
  Core cloud and infrastructure capabilities are `AWS`, `GCP`, `Docker`, `Terraform`, `CI/CD`, `Infrastructure as Code`, `Cloud Infrastructure`, and `Event-Driven Architecture`.
  Supporting implementation tools are `GitHub Actions` and `Cloud Networking`.
  Local AI capability area includes `Local AI Experimentation` as currently learning, with `Local LLMs`, `Ollama`, and `Agent Orchestration` demonstrated within the current Hermes / Yggdrasil scope.
  `Interactive 3D Experiences` remains a creative differentiator and project-scoped capability rather than a separate headline badge.
- Modeled Batch 2 closing rules:
  `Linux` remains `WORKING KNOWLEDGE` rather than a core demonstrated platform capability until a Linux deployment, homelab, or substantial Linux automation project is approved.
  `Git` and `Node.js` may appear in the complete skills directory, but `Node.js` should remain framed as supporting web-development runtime and tooling rather than a primary backend specialty.
  `Odysseus document-processing workflows`, `Odysseus Docker Compose`, `Understanding Studio automated media pipelines`, `Edge-TTS`, and `FFmpeg` should remain inside their project dossiers rather than becoming headline global skill badges.
  `JavaScript` remains a supporting language below `TypeScript`.
  `Azure` remains in learning and current-curiosities contexts only.
  `GitHub` and `npm` remain supporting engineering tools rather than headline skill badges.
  `pytest`, `OpenMP`, and `LaTeX / Overleaf` remain project-scoped or research-scoped rather than equal global badges.
- `Applied AI Systems` is safer as a target-role interest than as a headline claim of broad AI depth.
- No percentage bars, star ratings, or equal-mastery language should appear in the public skills presentation.

### Skills Lacking Named Project-Level Evidence

These entries currently lack strong named implementation evidence:

- `skill-java`
- `skill-bash`
- `skill-cpp`

These entries have named architecture evidence but still need stronger deployed or tested implementation evidence:

- `skill-high-availability`

### Batch 2B - Closed

Batch 2B is now closed. The rows below record the final modeled Batch 2 entries resolved in the closing pass.

Excluded from this section:

- The resolved skill entries: `skill-java`, `skill-bash`, `skill-c`, `skill-cpp`, `skill-flask`, `skill-sqlalchemy`, `skill-rest-api-design`, `skill-microservices`, `skill-high-availability`, `skill-python`, `skill-typescript`, `skill-backend-engineering`, `skill-fastapi`, `skill-aws`, `skill-gcp`, `skill-docker`, `skill-terraform`, `skill-github-actions`, `skill-ci-cd`, `skill-infrastructure-as-code`, `skill-event-driven-architecture`, `skill-cloud-infrastructure`, and `skill-local-ai-experimentation`
- Springer Capital supporting capability rows
- Approved professional-direction rows
- The approved WebGL differentiator row
- The resolved project-scoped capability rows: `project-auxilium.interactive-3d-experiences`, `project-infrastructure-automation.cloud-networking`, `project-hermes-yggdrasil.local-llms`, `project-hermes-yggdrasil.ollama`, and `project-hermes-yggdrasil.agent-orchestration`

Not included in this modeled closing pass:

- Remaining note-only review items that still do not have standalone manifest entries, such as `SQL`, `Responsive interface design`, `Retrieval and context systems`, `Prompt-driven tools`, and `VS Code`

#### Cloud and Infrastructure

| Manifest key | Current public label | Proposed public wording | Proposed proficiency | Evidence basis | Exact evidence currently recorded | Named projects, experience or coursework supporting it | Risk of overstatement | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `skill-linux` | `Linux` | `Linux command-line, development-environment, container, and DevOps workflows.` | `WORKING KNOWLEDGE` | Completed or working implementations plus infrastructure learning | Local AI tooling, Docker-based environments, OpenMP compilation work, and infrastructure learning | Local AI tooling; Docker-based environments; OpenMP compilation work; infrastructure learning | Moderate because most documented development remains Windows-based and the current record does not yet show a Linux deployment, homelab, or substantial Linux automation project. | `EDIT -> WORKING KNOWLEDGE` |

#### AI and Automation

| Manifest key | Current public label | Proposed public wording | Proposed proficiency | Evidence basis | Exact evidence currently recorded | Named projects, experience or coursework supporting it | Risk of overstatement | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `project-odysseus.document-processing-workflows` | `Document-processing workflows` | `Configured and debugged document-upload, parsing, retrieval, and document-chat workflows in a self-hosted AI workspace.` | `DEMONSTRATED` | Completed or working implementations focused on configuration, integration, and debugging | Odysseus upload and chat workflow, PDF-processing fixes, and backend/frontend debugging | Odysseus | Low to moderate if the wording stays tied to configuration, integration, and debugging rather than claiming the complete system was independently built from scratch. | `EDIT -> DEMONSTRATED` |
| `project-understanding-studio.automated-media-pipelines` | `Automated media pipelines` | `Built a deterministic media pipeline that converts structured episode specifications into generated visuals, narration, motion sequences, and assembled video output.` | `DEMONSTRATED` | Completed or working implementations | Understanding Studio shot, scene, and episode compilation pipeline | Understanding Studio | Low to moderate if the wording stays tied to the current deterministic pipeline scope. | `EDIT -> DEMONSTRATED` |
| `project-understanding-studio.edge-tts` | `Edge-TTS` | `Integrated Edge-TTS as a narration provider within a reusable text-to-speech pipeline.` | `DEMONSTRATED` | Completed or working implementations | Successfully generated narration audio and integrated it into final video assembly | Understanding Studio | Low to moderate if it remains framed as a pipeline integration rather than a broader speech-systems claim. | `EDIT -> DEMONSTRATED` |
| `project-understanding-studio.ffmpeg` | `FFmpeg` | `Used FFmpeg for image motion, audio-video muxing, scene rendering, and episode assembly.` | `DEMONSTRATED` | Completed or working implementations | Zoom-pan motion generation, final-shot muxing, and concat-based episode output | Understanding Studio | Low to moderate. | `EDIT -> DEMONSTRATED` |

#### Engineering Tools

| Manifest key | Current public label | Proposed public wording | Proposed proficiency | Evidence basis | Exact evidence currently recorded | Named projects, experience or coursework supporting it | Risk of overstatement | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `skill-git` | `Git` | `Git for version control, branching, remote management, debugging changes, and open-source contribution workflows.` | `DEMONSTRATED` | Completed or working implementations | Personal repositories, Latitude LLM contribution work, First Contributions, and ongoing project development | Personal repositories; Latitude LLM contribution work; First Contributions; ongoing project development | Low to moderate. | `APPROVE -> DEMONSTRATED` |
| `skill-node-js` | `Node.js` | `Node.js runtime and tooling for React, Next.js, TypeScript, package management, and application build workflows.` | `DEMONSTRATED` | Completed or working implementations | Auxilium Digital Archive, Fashion Feet, and other web projects | Auxilium Digital Archive; Fashion Feet; other web projects | Moderate if the wording drifts into implied production Node.js backend expertise without an approved Node backend project. | `EDIT -> DEMONSTRATED` |
| `project-odysseus.docker-compose` | `Docker Compose` | `Configured and operated a multi-service Docker Compose environment for a self-hosted AI workspace.` | `DEMONSTRATED` | Completed or working implementations | Odysseus deployment, service startup, container debugging, and configuration work | Odysseus | Low. | `EDIT -> DEMONSTRATED` |

#### Batch 2B Summary

- Remaining unresolved modeled Batch 2 entries: `0`
- Entries reviewed in the closing pass: `8`
- Demonstrated in the closing pass: `7`
- Working knowledge in the closing pass: `1`
- Currently learning in the closing pass: `0`
- Lacking sufficient evidence: `0`

### Batch 2C - Applied

Batch 2C has been applied in the manifest without creating seven equal global skill badges.

| Manifest key | Public label | Approved category | Public wording | Evidence | Display rule | Applied decision |
| --- | --- | --- | --- | --- | --- | --- |
| `tool-javascript` | `JavaScript` | `Supporting language` | `JavaScript fundamentals supporting React, TypeScript and browser-based application development.` | Approved user confirmation for React, TypeScript, and browser-based web-project support. | Complete skills directory and relevant web-project dossiers only. Do not duplicate it beside TypeScript in every room. | `APPROVE -> WORKING KNOWLEDGE` |
| `tool-azure` | `Azure` | `Currently learning` | `Currently learning Azure fundamentals as part of broader cloud-platform study.` | Approved user confirmation for broader cloud-platform study only. | Learning and current-curiosities section only. Do not place Azure beside AWS and GCP as an equally demonstrated platform. | `CURRENTLY LEARNING` |
| `tool-github` | `GitHub` | `Demonstrated supporting engineering tool` | `GitHub for repository management, pull-request workflows, issue tracking and open-source collaboration.` | Personal repositories, First Contributions, and the Latitude LLM contribution process. | Tool directory, open-source dossier, and project records. Do not make GitHub a headline technical capability. | `APPROVE -> DEMONSTRATED SUPPORTING TOOL` |
| `tool-npm` | `npm` | `Demonstrated supporting engineering tool` | `npm for dependency management, scripts, development workflows and application builds.` | Auxilium Digital Archive and other Node.js-based projects. | Project technology lists only. | `APPROVE -> DEMONSTRATED SUPPORTING TOOL` |
| `project-mediaops.pytest` | `pytest` | `Demonstrated project-scoped testing tool` | `pytest for automated testing of Python detection and automation components.` | MediaOps detector tests and local test execution. | MediaOps dossier and complete tools directory. Do not create a global pytest badge. | `APPROVE -> DEMONSTRATED PROJECT-SCOPED CAPABILITY` |
| `project-reconcilyx.openmp` | `OpenMP` | `Demonstrated project-scoped parallel-computing tool` | `OpenMP for parallel C experiments, section-based execution and sequential-versus-parallel performance comparison.` | Reconcilyx merge-sort and parallel-programming exercises. | Reconcilyx dossier and historical-project archive. Do not present OpenMP as a core career specialization. | `APPROVE -> DEMONSTRATED PROJECT-SCOPED CAPABILITY` |
| `tool-latex-overleaf` | `LaTeX / Overleaf` | `Demonstrated research tool` | `LaTeX and Overleaf for academic-paper preparation, bibliography management and IEEE-style publication workflows.` | ICETM-2026 survey paper preparation and revision. | Research dossier, publication records, and complete tools directory. | `APPROVE -> DEMONSTRATED RESEARCH TOOL` |

#### Batch 2C Summary

- Entries reviewed: `7`
- Working knowledge: `1`
- Currently learning: `1`
- Demonstrated supporting tools: `3`
- Demonstrated project-scoped capabilities: `2`
- Removed: `0`
- Needs evidence: `0`

Batch 2 is now fully complete.

## Batch 3

BATCH 3 STATUS: SUPERSEDED - GITHUB-FIRST AUDIT IN PROGRESS

The Group 1 and Group 2 decisions below were prepared before the
complete public GitHub repository inventory was reviewed.

They are retained for audit history only.

Do not apply these project tiers, repository states, missing-asset
counts, canonical names or verification statuses to `portfolioData.ts`
until the GitHub-first project audit is complete.

Batch 2 is complete. Batch 3 is now the active review batch for project selection, verification, and display tiering. Group 1 decisions below are applied in this document. Group 2 and later project rows remain pending review, so `portfolioData.ts` stays unchanged for Batch 3 until more project decisions are approved.

### Group 1 - Primary Portfolio Candidates

### project-auxilium

- Manifest key: `project-auxilium`
- Current project name: `Auxilium Digital Archive`
- Canonical proposed name: `Auxilium Digital Archive`
- One-sentence purpose: An interactive 3D developer portfolio that presents professional work through first-person exploration, spatial interfaces, readable documents, and environmental storytelling.
- Current development status: `Active development - functional local build`
- Dates: `2026`
- Exact personal contribution: Designed and built the portfolio concept, application architecture, 3D environment, interaction systems, document interfaces, state management, and professional-content integration.
- Technologies: `Next.js`, `React`, `TypeScript`, `Three.js`, `React Three Fiber`, `Zustand`, `Tailwind CSS`
- Features known to work: First-person navigation, room-based portfolio presentation, object interaction system, document inspection overlays, terminal interfaces, persistent interaction state across room navigation, data-driven professional content, and multiple themed portfolio chapters.
- Features planned but incomplete: Final showcase content approval, public repository attachment, live deployment, and the public asset package.
- Repository visibility: Intended public; a public repository slot exists in the asset registry but no URL is attached yet.
- Repository URL: `NEEDS SOURCE`
- Live demo URL: `NEEDS SOURCE`
- Evidence currently available: Current project workspace and correction brief, plus approved Batch 2 evidence for React, Next.js, Three.js, React Three Fiber, Zustand, Tailwind CSS, WebGL development, and interactive 3D experiences.
- Existing assets: Asset slots exist for a hero image, architecture diagram, and demo video, but all are currently marked missing. No supporting screenshots are attached.
- Missing launch assets: Hero screenshot; three supporting screenshots covering Reception, Personnel or Research room, and document or terminal interaction; one architecture diagram; a 30-60 second walkthrough video; public repository URL; and live deployment URL.
- Risk of overstating the project: Low to moderate if the public copy stays tied to the implemented archive environment and does not imply a published deployment before it exists.
- Proposed display tier: `FLAGSHIP EXHIBIT`
- Verification decision: `APPROVE`

### project-hermes-yggdrasil

- Manifest key: `project-hermes-yggdrasil`
- Current project name: `Hermes / Yggdrasil`
- Canonical proposed name: `NEEDS USER DECISION`
- One-sentence purpose: A local-first AI operating environment exploring model management, tool use, structured memory, and controllable agent workflows.
- Current development status: `Working prototype / active experimentation`
- Dates: `2025-2026`
- Exact personal contribution: Designed and configured the local model environment, tool integrations, structured memory layout, filesystem access, model-management workflows, and agent-oriented orchestration experiments.
- Technologies: `Ollama`, `local language models`, `tool integrations`, `structured memory`, `controlled filesystem access`
- Features known to work: Local model serving through Ollama, multiple local-model configurations, tool-enabled agent workflows, controlled filesystem access, structured memory and knowledge directories, and local-first experimentation without depending entirely on hosted AI services.
- Features planned but incomplete: Canonical naming, public repository decision, public-ready demo material, and any hardware or benchmark proof package.
- Repository visibility: `Private / under review`
- Repository URL: `None attached`
- Live demo URL: `None attached`
- Evidence currently available: Correction brief and existing room narrative, plus approved Batch 2 evidence for local LLM workflows, Ollama, and agent orchestration.
- Existing assets: Asset slots exist for a hero image and architecture diagram, both marked missing. A demo video slot exists but remains private and missing. No supporting screenshots are attached.
- Missing launch assets: One clean system screenshot, model-management screenshot, architecture diagram, screenshot of tool or filesystem integration, and an optional short demo video.
- Risk of overstating the project: Moderate to high because the name is unresolved, the hardware and benchmark claims are intentionally withheld, and the dossier must not imply full autonomy, production readiness, novel model training, benchmark superiority, or a completely original agent framework without later evidence.
- Proposed display tier: `DETAILED DOSSIER`
- Verification decision: `EDIT`

### project-odysseus

- Manifest key: `project-odysseus`
- Current project name: `Odysseus`
- Canonical proposed name: `Odysseus - Self-Hosted AI Workspace`
- One-sentence purpose: A self-hosted AI workspace configured and debugged for document upload, document chat, local model use, and multi-service operation.
- Current development status: `Configured and working locally`
- Dates: `2025-2026`
- Exact personal contribution: Deployed and operated the Docker Compose environment; configured models and services; investigated backend, document-processing, PDF, streaming, and frontend integration failures; and restored working upload-and-chat workflows.
- Technologies: `Docker Compose`, `FastAPI`, `document-processing services`, `model configuration`, `frontend streaming`
- Features known to work: Multi-service Docker Compose startup, document upload, PDF-processing workflow, document chat, model configuration, FastAPI service debugging, streaming-response integration, and frontend and backend issue resolution.
- Features planned but incomplete: Upstream repository source confirmation, public demo or walkthrough, architecture assets, and a tighter upstream-versus-personal-contribution breakdown in the dossier.
- Repository visibility: `Upstream repository needs source; personal fork or configuration repository: none unless one actually exists`
- Repository URL: `Upstream repository: NEEDS SOURCE`
- Live demo URL: `Not required; local self-hosted system`
- Evidence currently available: Correction brief, plus approved Batch 2 evidence for FastAPI work, document-processing workflows, and Docker Compose operation.
- Existing assets: Asset slots exist for a hero image, architecture diagram, and demo video, but all are currently marked missing. No supporting screenshots are attached.
- Missing launch assets: Workspace hero screenshot, document-upload screenshot, document-chat screenshot, Docker Compose architecture diagram, 30-60 second local demo, upstream project link, and a clear contribution statement.
- Risk of overstating the project: Moderate to high if the dossier fails to distinguish what was built by the upstream project from what was configured, deployed, debugged, extended, or repaired by Aryan.
- Proposed display tier: `DETAILED DOSSIER`
- Verification decision: `EDIT`

### project-understanding-studio

- Manifest key: `project-understanding-studio`
- Current project name: `Understanding Studio`
- Canonical proposed name: `Understanding Studio`
- One-sentence purpose: A deterministic media-production pipeline that converts structured episode specifications into generated visuals, narration, motion sequences, scenes, and assembled video output.
- Current development status: `Validated prototype - currently paused`
- Dates: `2025-2026`
- Exact personal contribution: Designed and implemented the provider-based media pipeline, structured episode workflow, Edge-TTS narration integration, FFmpeg motion and muxing stages, scene compilation, and episode assembly process.
- Technologies: `Python`, `Edge-TTS`, `FFmpeg`, `structured specifications`, `provider-based pipeline architecture`
- Features known to work: Image generation provider integration, narration generation, image-to-motion processing, audio-video muxing, shot compilation, multi-shot scene compilation, episode concatenation, and successful end-to-end output generation.
- Features planned but incomplete: Public output samples, walkthrough media, and any resumed development beyond the current paused state.
- Repository visibility: `Private`
- Repository URL: `None attached`
- Live demo URL: `Not applicable`
- Evidence currently available: Correction brief, plus approved Batch 2 evidence for automated media pipelines, Edge-TTS integration, and FFmpeg-based assembly.
- Existing assets: Asset slots exist for a hero image, pipeline diagram, and demo video, but all are currently marked missing. No supporting screenshots are attached.
- Missing launch assets: One generated still, one final-shot video sample, one scene or episode output sample, pipeline architecture diagram, screenshot of episode specification or build output, and a short technical retrospective.
- Risk of overstating the project: Moderate if the public copy hides the paused status, implies an entire completed production exists, or treats the current validated prototype as a finished release without output samples.
- Proposed display tier: `DETAILED DOSSIER`
- Verification decision: `APPROVE WITH EDITS`

### Group 1 Summary

- Projects reviewed: `4`
- Flagship exhibits: `1`
- Detailed dossiers: `3`
- Archive records: `0`
- Private: `0`
- Removed: `0`
- Needs naming decision: `1`
- Needs repository source: `2`
- Requires public live deployment: `1`
- Can launch as private-code case study: `2`

### Group 1 Placement

- `Auxilium Digital Archive`: Final Showcase centerpiece
- `Hermes or Yggdrasil`: Research Lab
- `Odysseus`: Research Lab systems terminal
- `Understanding Studio`: Research Lab or Archive project dossier

### Group 2 - Pending Review

Group 2 decisions below are now applied in this document. The three cloud projects should be presented together as a `Cloud Systems` collection rather than as unrelated major installations. `portfolioData.ts` remains unchanged until the later Batch 3 manifest-application step.

### project-mediaops

- Manifest key: `project-mediaops`
- Current project name: `MediaOps`
- Canonical proposed name: `MediaOps - Automated Media Organization Workflow`
- One-sentence purpose: A Python automation system for detecting, classifying, and organizing downloaded media for a self-hosted Jellyfin library.
- Current development status: `Working prototype - active development`
- Dates: `2025-2026`
- Exact personal contribution: Designed and implemented the media-detection and organization workflow, project structure, classification logic, filesystem operations, and pytest-based detector tests.
- Technologies: `Python`, `pytest`, `filesystem automation`, `Jellyfin`, `Windows-based self-hosting`
- Features known to work: Media detection workflow, classification logic, file and folder organization, automated detector testing with pytest, and integration with an existing self-hosted media environment.
- Features planned but incomplete: Repository attachment, workflow diagram, before-and-after captures, configuration proof, recorded local demonstration, and any broader automation features not yet shown working.
- Repository visibility: Intended public; a public repository slot exists in the asset registry but no URL is attached yet.
- Repository URL: `NEEDS SOURCE`
- Live demo URL: `Not required; local automation project`
- Evidence currently available: Correction brief, approved Python evidence tied to MediaOps, and approved Batch 2C pytest evidence for automated testing of detection and automation components.
- Existing assets: Asset slots exist for a workflow diagram and demo-oriented media, but all are currently marked missing. No screenshots are attached. The current asset registry still contains a generic hero-image slot even though a workflow diagram or terminal screenshot may serve that role better.
- Missing launch assets: Workflow diagram, before-and-after folder structure, terminal or test-output screenshot, one configuration screenshot with private paths removed, short recorded demonstration, and repository URL once public.
- Risk of overstating the project: Moderate if the public record implies a finished graphical interface, fully autonomous Jellyfin library management, production monitoring, notifications, or every planned classification feature before those are shown working.
- Proposed display tier: `DETAILED DOSSIER`
- Verification decision: `APPROVE WITH EDITS`

### project-multicloud-analytics

- Manifest key: `project-multicloud-analytics`
- Current project name: `Multi-Cloud Serverless Analytics Platform`
- Canonical proposed name: `Multi-Cloud Serverless Analytics Pipeline`
- One-sentence purpose: A cloud architecture project exploring event-driven data transfer and analytics workflows across AWS and GCP.
- Current development status: `Prototype / implementation evidence pending`
- Dates: `2025-2026`
- Exact personal contribution: `NEEDS USER APPROVAL`
- Technologies: `AWS`, `GCP`, `Pub/Sub`, `Cloud Run`, `Firestore`, `Workload Identity Federation`
- Features known to work: Current evidence supports only architecture-level description. The public-safe wording is that the project was designed as a multi-cloud, event-driven analytics pipeline spanning AWS and GCP, with serverless processing, cross-cloud identity, dashboarding, anomaly-detection, and alerting components included in the project scope.
- Features planned but incomplete: Implementation evidence, repository attachment, screenshots, deployment notes, architecture proof package, and an approved contribution statement.
- Repository visibility: Intended public; a public repository slot exists in the asset registry but no URL is attached yet.
- Repository URL: `None attached`
- Live demo URL: `Not required`
- Evidence currently available: Resume and correction brief, plus approved Batch 2 evidence for AWS, GCP, event-driven architecture, and cloud infrastructure connected to this project.
- Existing assets: Asset slots exist for a hero image, architecture diagram, and demo video, but all are currently marked missing. No supporting screenshots are attached.
- Missing launch assets: Architecture diagram, one approved implementation screenshot, configuration excerpt, or deployment output, concise personal-contribution statement, and repository URL if one exists.
- Risk of overstating the project: High unless dashboards, anomaly detection, Slack alert delivery, completed Workload Identity Federation, deployed AWS-to-GCP event flow, and production or real-time operation remain unverified and are described only as designed components until supported.
- Proposed display tier: `ARCHIVE RECORD`
- Verification decision: `EDIT`

### project-telemetry-platform

- Manifest key: `project-telemetry-platform`
- Current project name: `Distributed Telemetry Processing Platform`
- Canonical proposed name: `GCP Telemetry Processing Pipeline`
- One-sentence purpose: An event-driven GCP pipeline designed for telemetry ingestion, processing, persistence, retry handling, and operational visibility.
- Current development status: `Prototype / implementation evidence pending`
- Dates: `2025-2026`
- Exact personal contribution: `NEEDS USER APPROVAL`
- Technologies: `GCP Pub/Sub`, `Cloud Run`, `BigQuery`, `Firestore`, `CI/CD`
- Features known to work: Current evidence supports only architecture-level description. The public-safe wording is that the project was designed as a GCP telemetry-processing pipeline using Pub/Sub and Cloud Run, with BigQuery and Firestore persistence and planned retry, dead-letter, and operational-monitoring paths.
- Features planned but incomplete: Implementation evidence, repository attachment, ingestion or processing proof, CI workflow or deployment output, and an approved contribution statement.
- Repository visibility: Intended public; a public repository slot exists in the asset registry but no URL is attached yet.
- Repository URL: `None attached`
- Live demo URL: `Not required`
- Evidence currently available: Resume and correction brief, plus approved Batch 2 evidence for GCP, CI/CD, event-driven architecture, and cloud infrastructure connected to this project.
- Existing assets: Asset slots exist for a hero image, architecture diagram, and demo video, but all are currently marked missing. No supporting screenshots are attached.
- Missing launch assets: Pipeline architecture diagram, one ingestion or processing screenshot, CI workflow or deployment output where available, personal-contribution statement, and repository URL if public.
- Risk of overstating the project: High unless retries, dead-letter handling, and dashboards are treated as planned paths rather than verified completed features until implementation proof is provided.
- Proposed display tier: `ARCHIVE RECORD`
- Verification decision: `EDIT`

### project-infrastructure-automation

- Manifest key: `project-infrastructure-automation`
- Current project name: `Infrastructure Automation Platform`
- Canonical proposed name: `AWS Infrastructure Automation with Terraform`
- One-sentence purpose: An infrastructure project exploring repeatable AWS provisioning, network design, load balancing, and CI-assisted deployment through Terraform.
- Current development status: `Prototype / architecture project`
- Dates: `2025-2026`
- Exact personal contribution: `NEEDS USER APPROVAL`
- Technologies: `Terraform`, `AWS`, `GitHub Actions`, `VPC networking`, `load balancing`
- Features known to work: Current evidence supports only architecture-level description. Public-safe wording should stay at Terraform-based infrastructure definitions for an AWS environment involving networking, load balancing, and automated validation or deployment workflows, and use `Designed` instead of `Developed` unless Terraform code authorship is confirmed.
- Features planned but incomplete: Repository attachment or approved code excerpts, architecture assets, terraform plan or deployment output, GitHub Actions workflow evidence, clear resource list, and an approved project-specific contribution statement.
- Repository visibility: Intended public; a public repository slot exists in the asset registry but no URL is attached yet.
- Repository URL: `None attached`
- Live demo URL: `Not required`
- Evidence currently available: Resume and correction brief, plus approved Batch 2 evidence for Terraform, GitHub Actions, CI/CD, Infrastructure as Code, AWS, and cloud infrastructure connected to this project.
- Existing assets: Asset slots exist for a hero image, architecture diagram, and demo video, but all are currently marked missing. No supporting screenshots are attached.
- Missing launch assets: Architecture diagram, terraform plan or deployment output, GitHub Actions workflow evidence, clear resource list, repository URL if public, and any approved code excerpts or configuration proof.
- Risk of overstating the project: High unless the record stays explicit that the current public evidence is architecture-level and does not present the work like a reusable commercial platform or a fully evidenced deployment.
- Proposed display tier: `ARCHIVE RECORD`
- Verification decision: `EDIT`

### Group 2 Summary

- Projects reviewed: `4`
- Flagship exhibits: `0`
- Detailed dossiers: `1`
- Archive records: `3`
- Private: `0`
- Removed: `0`
- Needs contribution approval: `3`
- Needs repository source: `4`
- Requires live deployment: `0`
- Conditional merge candidates: `2`

### Group 2 Placement

- `MediaOps`: Personnel Wing automation workstation or Research Lab dossier
- `Multi-Cloud Analytics`: Research Lab cloud architecture terminal
- `GCP Telemetry Processing Pipeline`: Same cloud terminal as a separate experiment
- `AWS Infrastructure Automation with Terraform`: Research Lab infrastructure board or Archive technical record

### Group 2 Merge Rule

The Multi-Cloud Analytics and GCP Telemetry projects should remain separate only when each has distinct evidence, such as different repositories or folders, materially different architectures, distinct objectives and outputs, or separate screenshots and implementation proof.

If those distinctions are not supplied, merge them into one archive section:

- `Cloud Data and Event-Driven Systems`
- `Experiment A: Multi-cloud serverless analytics`
- `Experiment B: GCP telemetry ingestion and processing`

### Batch 3 Summary

Group 1 decisions are applied in this document. Group 2 and later project rows remain pending review, so no full-batch project counts are final yet.

## Batch 4

Pending review. This batch will cover publications, certifications, and open-source work.

## Batch 5

Pending review. This batch will cover leadership, professional timeline, and Personal Archive placeholders.
