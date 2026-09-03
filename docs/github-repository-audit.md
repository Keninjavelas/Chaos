# GitHub Repository Audit

Date: `2026-08-06`

## Status

`BATCH 3 STATUS: SUPERSEDED - GITHUB-FIRST AUDIT IN PROGRESS`

This file replaces the earlier resume-derived Batch 3 assumptions with a GitHub-first audit of Keninjavelas public repositories.

## Method

- Enumerated the current public repository inventory for `Keninjavelas`, cloned each public repository for local inspection, and later fetched deeper commit history for the strongest candidates.
- Inspected repository trees, README files, screenshots, architecture docs, tests, GitHub Actions, Terraform or Docker assets, and public deployment links where present.
- Did not treat README marketing phrases alone as proof.
- Treated forks separately from original projects.
- Flagged repos with checked-in virtual environments, tracked `.env` files, or checked-in Terraform state as higher-risk evidence sources.

## Audit Snapshot

- Public repositories discovered: `38`
- Project-bearing repositories audited: `37`
- Original project repositories: `33`
- Forks: `4`
- Profile/meta repositories: `1` - `Keninjavelas`
- Missing project-bearing repository added during reconciliation: `Chess-Bot`
- Provisional flagship evidence-review set: `10` - `InfraMind`, `Ghost-Protocol`, `Poseidon`, `DayOne-AI`, `Auxilium Digital Archive`, `Student-OS`, `GCP-OmniStream`, `AWS-CloudOps`, `AWS-Helix-Data-Lakehouse`, `MultiCloud-Serverless-Analytics`
- Current repo-inventory detailed-dossier candidates: `7` - `Anchor`, `AWS-CloudOps`, `AWS-Helix-Data-Lakehouse`, `AWS-Serverless-Contact-Form`, `GCP-OmniStream`, `MultiCloud-Serverless-Analytics`, `Student-OS`
- Current repo-inventory archive candidates: `23`
- Fork-contribution candidates: `4` - `backstage`, `latitude-llm`, `odysseus`, `Sportify`
- Inventory tiers remain provisional until the evidence-review section below is approved.

## Existing Manifest Corrections

- `project-multicloud-analytics` was marked as repository-missing and visually unsupported; the public repo now shows Terraform, tests, workflows, architecture documentation, and a dashboard image.
- `project-odysseus` was treated as if its repository state were unresolved; the public fork exists and requires upstream attribution rather than a generic missing-repo note.
- `project-infrastructure-automation` is too vague to survive; concrete public repositories already exist and should replace the composite entry.
- `project-telemetry-platform` should not remain an abstract label if it maps to `GCP-OmniStream`; that mapping must be confirmed explicitly.
- `project-mediaops` still has unresolved repository state and should stay unresolved until a public repo is found.

## Manifest Mapping Table

| Manifest entry | Repository mapping | Status | Action |
| --- | --- | --- | --- |
| `project-auxilium` | No confirmed public GitHub repository yet | Unresolved | Keep local-workspace evidence separate from GitHub audit. |
| `project-hermes-yggdrasil` | No confirmed public repository mapping yet | Unresolved | Do not guess from thematically similar local-AI repos. |
| `project-odysseus` | Keninjavelas/odysseus | Confirmed public fork | Contribution boundaries must be stated against upstream. |
| `project-understanding-studio` | No confirmed public GitHub repository yet | Unresolved | Keep as private-code or local artifact until a repo is supplied. |
| `project-mediaops` | No confirmed public repository found yet | Unresolved | Repository state should remain unresolved. |
| `project-multicloud-analytics` | Keninjavelas/MultiCloud-Serverless-Analytics | Confirmed | Old missing-repo status is incorrect. |
| `project-telemetry-platform` | Possibly Keninjavelas/GCP-OmniStream | Needs confirmation | Do not auto-map without user confirmation. |
| `project-infrastructure-automation` | Composite entry; split across concrete repos | Needs replacement | Do not keep as one vague abstract project. |

## Existing Manifest Entries That Should Be Replaced Or Split

- `project-infrastructure-automation` should be replaced or split across concrete repositories such as `InfraMind`, `AWS-Hydra`, `AWS-HA-3-TIER`, `AWS-Serverless-Contact-Form`, `AWS-Static-Website`, `GCC-GitOps-IDP`, and possibly `AWS-CloudOps`.
- `project-multicloud-analytics` should map directly to `Keninjavelas/MultiCloud-Serverless-Analytics`.
- `project-telemetry-platform` should be confirmed against `Keninjavelas/GCP-OmniStream` or replaced with a more concrete entry.
- `project-hermes-yggdrasil` should not be force-mapped to a public repo without user confirmation; `DayOne-AI` and other local-AI repos are related thematically but not proven equivalents.

## Repository Inventory

### InfraMind

- Repository: `InfraMind`
- URL: https://github.com/Keninjavelas/InfraMind
- Original project or fork: Original repository.
- Repository description: InfraMind is a local-first, AI-native infrastructure cognition layer for Terraform. It deterministically parses code into a semantic graph, providing developers with real-time IDE diagnostics, contextual hover intelligence, instant topology visualizations, and on-demand architectural reasoning without exposing raw code to the cloud.
- Primary language and project category: `Python` - Terraform cognition / VS Code extension
- Current branch: `main`
- Last meaningful activity: `2026-06-07 | Updated`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership plus shipped website and VS Code Marketplace packaging strongly suggest Aryan is the primary builder; exact solo versus collaborator split still needs commit-level confirmation.
- README claims: <div align="center"> <img src="assets/logo.png" alt="InfraMind Logo" width="350"/><br/> <p style="margin: 10px 0;"><b>AI-native Infrastructure Intelligence for Terraform, Kubernetes, and Docker.</b></p>
- Claims supported by visible code: Visible code supports a VS Code extension plus backend analyzers for Terraform, Kubernetes, and Docker; screenshots, architecture docs, tests, workflows, website, and marketplace links are all present.
- Screenshots present: `apps/vscode-extension/assets/activity-icon.svg`, `apps/vscode-extension/assets/logo.png`, `assets/docker_intelligence.png`, `assets/hover_intelligence.png`, `assets/inline_diagnostics.png`
- Architecture diagrams present: `assets/mermaid_topology.png`, `docs/architecture/system-design.md`
- Tests present: `tests/ai-benchmarks/ai_validation.json`, `tests/docker/dockerfiles/dangerous_dockerfile.Dockerfile`, `tests/docker/dockerfiles/expected.json`, `tests/docker/false-positives/expected.json`, `tests/docker/false-positives/secure_dockerfile.Dockerfile`
- CI/CD present: `.github/workflows/extension.yml`, `.github/workflows/lint.yml`, `.github/workflows/regression.yml`
- Infrastructure code present: `docker-compose.yml`, `apps/backend/Dockerfile`, `apps/backend/app/parsers/kubernetes/dependencies.py`, `apps/backend/app/parsers/kubernetes/parser.py`, `apps/backend/app/parsers/kubernetes/resources.py`, `apps/backend/app/parsers/kubernetes/security.py`
- Deployment or live link: https://infra-site-three.vercel.app/; VS Code Marketplace: https://marketplace.visualstudio.com/items?itemName=aryankapoor-keninjavelas.inframind
- Security or privacy concerns: No obvious secret leakage from the quick audit; still review marketplace packaging and backend configuration before public promotion.
- Relationship to an existing portfolio manifest entry: Strong candidate to replace or split the vague `project-infrastructure-automation` entry; also a separate flagship-caliber candidate outside the current manifest.
- Risk of overstatement: Low to moderate if the public story stays on visible extension behavior, parser coverage, screenshots, workflows, website, and marketplace listing rather than claiming unseen enterprise adoption.
- Recommended tier: `FLAGSHIP`
- Confidence: `VERIFIED`

### Ghost-Protocol

- Repository: `Ghost-Protocol`
- URL: https://github.com/Keninjavelas/Ghost-Protocol
- Original project or fork: Original repository.
- Repository description: Ghost Protocol is an AI-powered cyber deception system that engages attackers in a dynamic sandbox, analyzes their behavior in real time, maps their tactics to MITRE ATT&CK, and automatically generates threat intelligence reports, turning intrusions into actionable intelligence.
- Primary language and project category: `Python` - Cybersecurity / deception platform
- Current branch: `main`
- Last meaningful activity: `2026-03-07 | pdf downloader added`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary builder, but the exact split across cybersecurity modules, dashboard work, and deployment assets still needs commit-level confirmation.
- README claims: Ghost Protocol — AI Deception & Attribution Engine **An AI-driven cyber deception platform that transforms attacker intrusions into actionable threat intelligence.** Traditional security tools detect attacks **after damage occurs**. They rely on known signatures, behavioral baselines, and reactive alerting — all of which assume defenders are permanently on the back foot.
- Claims supported by visible code: Visible code supports a multi-module Python security project with Docker packaging and at least one dashboard image. Advanced deception, attribution, and production-deployment claims still need deeper code review.
- Screenshots present: `Dashboard.png`, `venv/Lib/site-packages/win32com/HTML/image/blank.gif`, `venv/Lib/site-packages/win32com/HTML/image/BTN_HomePage.gif`, `venv/Lib/site-packages/win32com/HTML/image/BTN_ManualTop.gif`, `venv/Lib/site-packages/win32com/HTML/image/BTN_NextPage.gif`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: `venv/Lib/site-packages/adodbapi/test/adodbapitest.py`, `venv/Lib/site-packages/adodbapi/test/test_adodbapi_dbapi20.py`, `venv/Lib/site-packages/alembic/testing/suite/test_autogen_comments.py`, `venv/Lib/site-packages/alembic/testing/suite/test_autogen_computed.py`, `venv/Lib/site-packages/alembic/testing/suite/test_autogen_diffs.py`
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: `docker-compose.yml`, `Dockerfile`
- Deployment or live link: https://waao-omega.vercel.app/
- Security or privacy concerns: Tracked `.env` file plus a checked-in `venv` folder. Treat repo hygiene as noisy until secrets and vendored dependencies are reviewed.
- Relationship to an existing portfolio manifest entry: No current direct manifest entry; strong candidate to add as a new project rather than forcing it into an old resume-derived slot.
- Risk of overstatement: High because the README uses ambitious cyber-defense language and the repo includes noisy vendored files; production-readiness and attack-coverage claims need code-level proof.
- Recommended tier: `FLAGSHIP`
- Confidence: `NEEDS CODE REVIEW`

### Poseidon

- Repository: `Poseidon`
- URL: https://github.com/Keninjavelas/Poseidon
- Original project or fork: Original repository.
- Repository description: Poseidon is a real-time digital twin platform for water management that integrates simulation, data processing, and visualization.
- Primary language and project category: `TypeScript` - Event-driven digital twin platform
- Current branch: `main`
- Last meaningful activity: `2026-04-26 | Build Updates`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary builder; visible code spans backend, frontend, edge-AI, Docker, Kubernetes, and CI, but exact collaboration split is not provable from the public surface alone.
- README claims: Poseidon Smart Water Management Hub Poseidon is a distributed smart water platform with a backend-authoritative digital twin. It combines MQTT ingestion, event-driven processing, PostgreSQL or TimescaleDB persistence, live WebSocket fanout, edge AI anomaly signals, a geospatial map, and a real-time 3D simulation interface. - Added backend-authoritative digital twin state and control flow.
- Claims supported by visible code: Visible code supports a multi-service platform with backend, frontend, edge-AI, Docker, Kubernetes, CI, and tests. This is stronger than a README-only architecture sketch.
- Screenshots present: `frontend/src/app/icon.svg`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: `backend/src/__tests__/envGuard.test.js`, `backend/src/__tests__/mqttClient.test.js`, `backend/src/__tests__/routes.test.js`, `backend/src/__tests__/server.test.js`, `backend/src/__tests__/simulation.test.js`
- CI/CD present: `.github/workflows/ci-cd.yml`
- Infrastructure code present: `docker-compose.yml`, `backend/Dockerfile.api`, `backend/Dockerfile.ingestion`, `backend/Dockerfile.processing`, `backend/Dockerfile.simulator`, `edge_ai/Dockerfile`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct manifest entry; strong candidate to add as a new project.
- Risk of overstatement: Moderate because the architecture is substantial and code is visible, but real-time, synchronized, and digital-twin claims should stay tied to visible modules and tests.
- Recommended tier: `FLAGSHIP`
- Confidence: `VERIFIED`

### MultiCloud-Serverless-Analytics

- Repository: `MultiCloud-Serverless-Analytics`
- URL: https://github.com/Keninjavelas/MultiCloud-Serverless-Analytics
- Original project or fork: Original repository.
- Repository description: Multi-cloud serverless analytics platform using AWS and GCP with dashboard and Slack alerting claims.
- Primary language and project category: `Python` - Multi-cloud analytics pipeline
- Current branch: `main`
- Last meaningful activity: `2026-04-04 | Updated README`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan implemented or assembled the repo structure, Terraform, tests, deploy workflows, and dashboard assets, but the precise boundary between designed and fully deployed features still needs code-level confirmation.
- README claims: 🌐 Multi-Cloud Serverless Analytics Platform **A production-grade, event-driven analytics pipeline spanning AWS and GCP with real-time observability, secure federation, and automated alerting.** > 🚀 A real-time, production-style analytics pipeline that ingests data via AWS and processes it on GCP — with live dashboards and automated anomaly detection.
- Claims supported by visible code: Visible code supports Terraform modules, Cloud Run and Lambda deployment workflows, tests, a dashboard image, and architecture documentation.
- Screenshots present: `Image_d.png`
- Architecture diagrams present: `docs/ARCHITECTURE.md`
- Tests present: `test_event.py`, `.github/workflows/test.yml`, `cloudrun/utils/test_logging_demo.py`, `terraform/modules/aws-ingestion/TEST_AUTHENTICATION.md`, `tests/test_auth_properties.py`
- CI/CD present: `.github/workflows/deploy-cloudrun.yml`, `.github/workflows/deploy-lambda.yml`, `.github/workflows/terraform.yml`, `.github/workflows/test.yml`
- Infrastructure code present: `docker-compose.yml`, `cloudrun/Dockerfile`, `dashboard/Dockerfile`, `docker/firestore/Dockerfile`, `lambda/Dockerfile.local`, `terraform/main.tf`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: Confirmed match for `project-multicloud-analytics`.
- Risk of overstatement: Moderate because the repo now clearly contains Terraform, workflows, tests, screenshot, and architecture docs, but real-time, anomaly-detection, and Slack-alert claims still need careful wording.
- Recommended tier: `DETAILED DOSSIER`
- Confidence: `VERIFIED`

### GCP-OmniStream

- Repository: `GCP-OmniStream`
- URL: https://github.com/Keninjavelas/GCP-OmniStream
- Original project or fork: Original repository.
- Repository description: Event-driven Google Cloud pipeline processing live telemetry from an Edge-AI Tactical Helmet.
- Primary language and project category: `Python` - GCP telemetry pipeline
- Current branch: `main`
- Last meaningful activity: `2026-03-19 | change`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary builder; the repo visibly contains infrastructure, services, tests, and screenshots, but the exact end-to-end deployment state still needs confirmation.
- README claims: 🛰️ GCP-OmniStream: Real-Time Tactical Telemetry Pipeline [![GCP](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/) [![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)](https://www.terraform.io/)
- Claims supported by visible code: Visible code supports GCP infrastructure definitions, service directories, CI/CD workflows, tests, screenshots of ingestion and dashboard stages, and architecture documentation.
- Screenshots present: `images/1-cloud-run-ingestion-api.png`, `images/2-pubsub-event-queue.png`, `images/3-firestore-live-state.png`, `images/4-bigquery-data-warehouse.png`, `images/5-tactical-map-dashboard.png`
- Architecture diagrams present: `docs/architecture.md`
- Tests present: `edge-simulation/single_device_test.py`, `services/analytics-processor/test_main.py`, `services/telemetry-ingestion-api/test_main.py`
- CI/CD present: `.github/workflows/.gitkeep`, `.github/workflows/cd-deploy.yml`, `.github/workflows/ci-tests.yml`
- Infrastructure code present: `infrastructure/compute.tf`, `infrastructure/data.tf`, `infrastructure/iam.tf`, `infrastructure/main.tf`, `infrastructure/outputs.tf`, `infrastructure/pubsub.tf`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: Likely candidate for `project-telemetry-platform`, but this mapping still needs user confirmation and should not be assumed automatically.
- Risk of overstatement: Moderate because screenshots, Terraform, workflows, and service code exist, but broader tactical-helmet and real-time operational claims should stay scoped to visible repo proof.
- Recommended tier: `DETAILED DOSSIER`
- Confidence: `VERIFIED`

### AWS-Helix-Data-Lakehouse

- Repository: `AWS-Helix-Data-Lakehouse`
- URL: https://github.com/Keninjavelas/AWS-Helix-Data-Lakehouse
- Original project or fork: Original repository.
- Repository description: A Serverless CDC Data Lakehouse on AWS built with Terraform and Python.
- Primary language and project category: `HCL` - Serverless CDC / data lakehouse
- Current branch: `main`
- Last meaningful activity: `2026-02-18 | Initial commit: Helix Data Lakehouse`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary builder of the Terraform-defined architecture; commit-level review would still be needed before claiming sole authorship of every module.
- README claims: <div align="center"> 🧬 Helix: Serverless CDC Data Lakehouse **Transform real-time transactional data into a cost-optimized analytical data lake, automatically.**
- Claims supported by visible code: Visible code supports Terraform modules and repository assets for architecture and query output. End-to-end operational proof remains thinner than the infrastructure layer.
- Screenshots present: `architecture.png`, `query.png`
- Architecture diagrams present: `architecture.png`
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: `infrastructure/main.tf`, `infrastructure/outputs.tf`, `infrastructure/variables.tf`, `infrastructure/modules/analytics/main.tf`, `infrastructure/modules/analytics/variables.tf`, `infrastructure/modules/compute/iam.tf`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No clean current manifest entry; separate data-engineering candidate.
- Risk of overstatement: Moderate because the IaC and screenshots are visible, but deployment state and end-to-end CDC execution are not yet independently verified.
- Recommended tier: `DETAILED DOSSIER`
- Confidence: `PARTIALLY VERIFIED`

### AWS-Serverless-Contact-Form

- Repository: `AWS-Serverless-Contact-Form`
- URL: https://github.com/Keninjavelas/AWS-Serverless-Contact-Form
- Original project or fork: Original repository.
- Repository description: A fully serverless guestbook web app built with AWS, Terraform, and GitHub Actions.
- Primary language and project category: `HCL` - Serverless web app / IaC
- Current branch: `main`
- Last meaningful activity: `2025-11-06 | Create README.md`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary builder of the guestbook stack, Terraform, and GitHub Actions workflow.
- README claims: 🪶 Project 2 — Full-Stack Serverless Guestbook (AWS + Terraform) A **fully serverless, full-stack web application** built on **AWS** and managed via **Terraform**. This project implements a **public Guestbook** where users can submit and view messages in real time — all deployed automatically using **GitHub Actions**.
- Claims supported by visible code: Visible code supports Terraform definitions, GitHub Actions deployment workflows, a public CloudFront link, and at least one guestbook screenshot.
- Screenshots present: `Guestbook.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: `.github/workflows/backend-deploy.yml`, `.github/workflows/frontend-deploy.yml`
- Infrastructure code present: `backend/main.tf`, `backend/outputs.tf`, `backend/variables.tf`
- Deployment or live link: https://d37dlarjhwpaup.cloudfront.net/#
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: Candidate component that could replace part of the vague `project-infrastructure-automation` composite.
- Risk of overstatement: Low to moderate because public deployment, workflows, Terraform, and screenshot exist; avoid overstating scale or production guarantees.
- Recommended tier: `DETAILED DOSSIER`
- Confidence: `VERIFIED`

### AWS-CloudOps

- Repository: `AWS-CloudOps`
- URL: https://github.com/Keninjavelas/AWS-CloudOps
- Original project or fork: Original repository.
- Repository description: Infrastructure intelligence platform that scans AWS environments and detects security misconfigurations.
- Primary language and project category: `Python` - Cloud security / graph analysis
- Current branch: `main`
- Last meaningful activity: `2026-03-19 | Final Commits`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary builder; exact responsibility for attack-graph, remediation, and dashboard layers still needs deeper code review.
- README claims: ☁️ CloudOps – Infrastructure Intelligence Platform > **Continuous Cloud Security, Graph-Based Asset Discovery, and Attack Path Analysis.** CloudOps is a production-grade infrastructure intelligence platform designed to provide deep visibility and automated security enforcement across AWS environments. By transforming raw cloud metadata into a traversable dependency graph, it identifies critical ex
- Claims supported by visible code: Visible code supports a Python app with tests, Docker packaging, Terraform, and a dashboard screenshot.
- Screenshots present: `Dashboard.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: `pytest.ini`, `test_aws.py`, `tests/test_attack_graph.py`, `tests/test_graph.py`, `tests/test_multi_account.py`
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: `docker-compose.yml`, `Dockerfile`, `infrastructure/terraform/main.tf`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: Only `.env.example` was found, which is fine, but the security-analysis claims still need deeper validation before strong marketing copy.
- Relationship to an existing portfolio manifest entry: Candidate infrastructure or cloud-systems project not represented cleanly by the current abstract manifest.
- Risk of overstatement: Moderate to high because security-analysis and attack-path claims are strong and deserve deeper code inspection before promotional wording.
- Recommended tier: `DETAILED DOSSIER`
- Confidence: `PARTIALLY VERIFIED`

### Anchor

- Repository: `Anchor`
- URL: https://github.com/Keninjavelas/Anchor
- Original project or fork: Original repository.
- Repository description: Anchor is a self-imposed commitment device and personal firewall that blocks distracting websites, keywords, and content using Accessibility and VPN enforcement.
- Primary language and project category: `Kotlin` - Android productivity app
- Current branch: `main`
- Last meaningful activity: `2026-06-10 | Fixing CI Build Errors`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary builder; the repo shows a substantial Android codebase with tests and CI, but exact co-authorship cannot be proven from the public surface alone.
- README claims: <div align="center"> <img src="apps/android/src/main/res/mipmap-xxxhdpi/ic_launcher.png" alt="Anchor Icon" width="250"/> > A Local-First Digital Discipline Platform
- Claims supported by visible code: Visible code supports an Android/Kotlin app with screenshots, unit tests, and CI.
- Screenshots present: `apps/android/src/main/res/mipmap-hdpi/ic_launcher.png`, `apps/android/src/main/res/mipmap-mdpi/ic_launcher.png`, `apps/android/src/main/res/mipmap-xhdpi/ic_launcher.png`, `apps/android/src/main/res/mipmap-xxhdpi/ic_launcher.png`, `apps/android/src/main/res/mipmap-xxxhdpi/ic_launcher.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: `packages/accessibility/src/test/kotlin/com/anchor/accessibility/AccessibilityParserTest.kt`, `packages/analytics/src/test/kotlin/com/anchor/analytics/workers/StrictChangesWorkerTest.kt`, `packages/blocker/src/test/kotlin/com/anchor/blocker/engine/AnchorStressTest.kt`, `packages/blocker/src/test/kotlin/com/anchor/blocker/engine/OverrideEngineTest.kt`, `packages/blocker/src/test/kotlin/com/anchor/blocker/engine/RuleEngineTest.kt`
- CI/CD present: `.github/workflows/ci.yml`
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct manifest entry; separate product candidate.
- Risk of overstatement: Moderate because the repo is substantial and tested, but app-store distribution and real-world enforcement claims should wait for product proof.
- Recommended tier: `DETAILED DOSSIER`
- Confidence: `PARTIALLY VERIFIED`

### DayOne-AI

- Repository: `DayOne-AI`
- URL: https://github.com/Keninjavelas/DayOne-AI
- Original project or fork: Original repository.
- Repository description: DayOne AI is a production-grade, multi-tenant retrieval system delivering grounded, explainable answers from internal data.
- Primary language and project category: `Python` - Retrieval / RAG system
- Current branch: `main`
- Last meaningful activity: `2026-06-02 | Latest Updates`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Exact contribution boundaries are not yet safe to state. The repo appears original, but the checked-in virtual environments and very broad README claims mean contribution wording should wait for deeper code review.
- README claims: <p align="center"> <img src="https://img.shields.io/badge/Production-Grade-0ea5e9?style=for-the-badge" alt="Production Grade" /> <img src="https://img.shields.io/badge/Multi--Tenant-Isolation-22c55e?style=for-the-badge" alt="Multi Tenant Isolation" />
- Claims supported by visible code: Visible code supports a sizable multi-component app structure with Docker and tests, but the checked-in virtual environments mean the repo needs filtering before strong proof claims are made.
- Screenshots present: `.venv_localhost/Lib/site-packages/networkx/drawing/tests/baseline/test_display_complex.png`, `.venv_localhost/Lib/site-packages/networkx/drawing/tests/baseline/test_display_empty_graph.png`, `.venv_localhost/Lib/site-packages/networkx/drawing/tests/baseline/test_display_house_with_colors.png`, `.venv_localhost/Lib/site-packages/networkx/drawing/tests/baseline/test_display_labels_and_colors.png`, `.venv_localhost/Lib/site-packages/networkx/drawing/tests/baseline/test_display_shortest_path.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: `pytest.ini`, `.venv_localhost/Lib/site-packages/aiohttp/test_utils.py`, `.venv_localhost/Lib/site-packages/annotated_types/test_cases.py`, `.venv_localhost/Lib/site-packages/colorama/tests/ansitowin32_test.py`, `.venv_localhost/Lib/site-packages/colorama/tests/ansi_test.py`
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: `docker-compose.yml`, `Dockerfile`, `infra/docker-compose.yml`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: Three checked-in virtual environments materially inflate file, screenshot, and test counts. Treat repo evidence cautiously until noise is filtered.
- Relationship to an existing portfolio manifest entry: No current direct manifest entry; possible overlap with future local-AI project curation, but do not map automatically to `project-hermes-yggdrasil`.
- Risk of overstatement: High because the README language is aggressive and the checked-in virtual environments distort surface evidence.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `NEEDS CODE REVIEW`

### Student-OS

- Repository: `Student-OS`
- URL: https://github.com/Keninjavelas/Student-OS
- Original project or fork: Original repository.
- Repository description: No public GitHub description provided.
- Primary language and project category: `JavaScript` - Campus recruitment platform
- Current branch: `main`
- Last meaningful activity: `2026-06-08 | Frontend`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Exact contribution boundaries are not yet safe to state. The repo appears original, but tracked environment files and broad product claims require deeper review before strong authorship wording.
- README claims: Student OS — AI-Powered Campus Recruitment Platform Student OS is a production-grade platform that helps students improve employability and helps institutions & companies discover qualified candidates using an AI-first approach. This README consolidates product roadmap, production runbook, and developer quick-start instructions. Key sections below:
- Claims supported by visible code: Visible code supports backend, frontend, AI-service, Terraform, tests, and GitHub Actions. Product-scale claims still need deeper confirmation.
- Screenshots present: `frontend/public/favicon.svg`, `frontend/public/icons.svg`, `frontend/src/assets/hero.png`, `frontend/src/assets/react.svg`, `frontend/src/assets/vite.svg`
- Architecture diagrams present: `ARCHITECTURE.md`
- Tests present: `backend/node_modules/buffer-equal-constant-time/test.js`, `backend/node_modules/memory-pager/test.js`, `backend/node_modules/mongoose/lib/drivers/SPEC.md`, `backend/node_modules/sparse-bitfield/test.js`, `backend/__tests__/auth.test.js`
- CI/CD present: `.github/workflows/deploy.yml`, `.github/workflows/frontend-ci.yml`
- Infrastructure code present: `docker-compose.yml`, `ai-service/Dockerfile`, `backend/Dockerfile`, `terraform/main.tf`, `terraform/outputs.tf`, `terraform/variables.tf`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: Tracked `.env` files in backend and frontend require review before treating the repo as clean launch evidence.
- Relationship to an existing portfolio manifest entry: No current direct manifest entry; separate product candidate.
- Risk of overstatement: High because the README sounds productized and production-ready while tracked env files and unreviewed implementation claims need scrutiny.
- Recommended tier: `DETAILED DOSSIER`
- Confidence: `NEEDS CODE REVIEW`

### Neptune-AI

- Repository: `Neptune-AI`
- URL: https://github.com/Keninjavelas/Neptune-AI
- Original project or fork: Original repository.
- Repository description: AI-powered smart water monitoring and automated distribution system.
- Primary language and project category: `TypeScript` - Smart water monitoring platform
- Current branch: `main`
- Last meaningful activity: `2026-05-02 | Updates`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: **AI-powered smart water leak detection & automatic response system** 📋 Project Overview Neptune-AI is a **real-time water monitoring and leak detection system** designed for the hackathon. It combines IoT sensors, AI anomaly detection, and automated valve control to detect water leaks instantly and respond autonomously.
- Claims supported by visible code: Visible repository contents include GitHub Actions or CI workflows, infrastructure or deployment files, and screenshots or media assets.
- Screenshots present: `frontend/src/app/icon.svg`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: `.github/workflows/ci-cd.yml`
- Infrastructure code present: `docker-compose.yml`, `backend/Dockerfile.api`, `frontend/Dockerfile`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct manifest entry; separate project candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### odysseus

- Repository: `odysseus`
- URL: https://github.com/Keninjavelas/odysseus
- Original project or fork: Fork of `pewdiepie-archdaemon/odysseus`.
- Repository description: Self-hosted AI workspace. 
- Primary language and project category: `Python` - Self-hosted AI workspace fork
- Current branch: `dev`
- Last meaningful activity: `2026-07-22 | fix(reminders): support OAuth SMTP accounts (#5649)`
- Personal or team project: Public fork of an upstream self-hosted AI workspace.
- Aryan Kapoor's exact contribution: Contribution boundaries must be stated against upstream. Safe wording is that Aryan configured, debugged, and adapted the fork unless clearly isolated original additions are identified.
- README claims: <p align="center"> <img src="docs/odysseus-wordmark.png" alt="Odysseus" width="238"> <p align="center">
- Claims supported by visible code: Visible code supports a substantial upstream workspace with tests, Docker Compose, workflows, and docs. The open question is which visible parts are Aryan's work inside the fork.
- Screenshots present: `docs/odysseus-browser.jpg`, `docs/odysseus-wordmark.png`, `docs/odysseus.jpg`, `static/icons/icon-192.png`, `static/icons/icon-512.png`
- Architecture diagrams present: `specs/architecture-runtime-inventory.md`
- Tests present: `tests/bombadil-spec.ts`, `tests/conftest.py`, `tests/LAYOUT_INVENTORY.md`, `tests/markdown_codefence_placeholder_regression.mjs`, `tests/OVERSIZED_TEST_SPLIT_PLAN.md`
- CI/CD present: `.github/workflows/ci.yml`, `.github/workflows/codeql.yml`, `.github/workflows/container-scan.yml`, `.github/workflows/container-trivy.yml`, `.github/workflows/dependency-review.yml`
- Infrastructure code present: `docker-compose.gpu-amd.yml`, `docker-compose.gpu-nvidia.yml`, `docker-compose.yml`, `Dockerfile`
- Deployment or live link: https://pewdiepie-archdaemon.github.io/odysseus/
- Security or privacy concerns: Forked repo with upstream code and deployment assets. Contribution wording, not secrets, is the main risk.
- Relationship to an existing portfolio manifest entry: Confirmed match for `project-odysseus`; this is a public fork, not a clean original repo match.
- Risk of overstatement: High unless every public sentence clearly distinguishes upstream functionality from Aryan's configuration, debugging, and extension work.
- Recommended tier: `FORK-CONTRIBUTION`
- Confidence: `NEEDS CODE REVIEW`

### AWS-Smart-Gallery

- Repository: `AWS-Smart-Gallery`
- URL: https://github.com/Keninjavelas/AWS-Smart-Gallery
- Original project or fork: Original repository.
- Repository description: Serverless cloud application that uses AI to automatically tag and categorize images in real-time.
- Primary language and project category: `JavaScript` - Serverless AI image app
- Current branch: `main`
- Last meaningful activity: `2025-12-01 | Revise README for clarity and structure`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: 🤖 Smart Gallery — Serverless AI Image Recognition ![Smart Gallery screenshot](./image.png) A full‑stack, event‑driven cloud application that uses Computer Vision to automatically tag and categorize images. Built with React, Python, Terraform, and AWS.
- Claims supported by visible code: Visible repository contents include screenshots or media assets.
- Screenshots present: `image.png`, `frontend/public/vite.svg`, `frontend/src/assets/react.svg`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: http://smart-gallery-frontend-c141e9d6.s3-website-us-east-1.amazonaws.com
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### AWS-Static-Website

- Repository: `AWS-Static-Website`
- URL: https://github.com/Keninjavelas/AWS-Static-Website
- Original project or fork: Original repository.
- Repository description: Secure, scalable, and automated AWS web hosting pipeline built using Amazon S3, CloudFront, and GitHub Actions.
- Primary language and project category: `HTML` - Static site CI/CD
- Current branch: `main`
- Last meaningful activity: `2025-10-29 | Update README.md`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: ☁️ AWS Cloud Static Website Project 🚀 Project Overview This project demonstrates how to **deploy, secure, and automate a static website using AWS services** — all within the AWS Free Tier.
- Claims supported by visible code: Visible repository contents include GitHub Actions or CI workflows, and screenshots or media assets.
- Screenshots present: `Metrics.png`, `Screenshot.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: `.github/workflows/deploy.yml`
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: https://d78vjzv8z61e6.cloudfront.net/
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: Candidate component that could replace part of the vague `project-infrastructure-automation` composite.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### GCC-GitOps-IDP

- Repository: `GCC-GitOps-IDP`
- URL: https://github.com/Keninjavelas/GCC-GitOps-IDP
- Original project or fork: Original repository.
- Repository description: GitOps Internal Developer Platform built on GKE using Argo CD.
- Primary language and project category: `Shell` - GitOps platform / GKE
- Current branch: `main`
- Last meaningful activity: `2026-03-02 | Update image source in README.md`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: ☁️ GitOps Internal Developer Platform (IDP) on GKE ![GitOps](https://img.shields.io/badge/GitOps-Enabled-blue) ![GKE](https://img.shields.io/badge/GKE-Cluster-green)
- Claims supported by visible code: Visible repository contents include infrastructure or deployment files, and screenshots or media assets.
- Screenshots present: `image.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: `app-source/Dockerfile`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: Candidate component that could replace part of the vague `project-infrastructure-automation` composite.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### AWS-Hydra

- Repository: `AWS-Hydra`
- URL: https://github.com/Keninjavelas/AWS-Hydra
- Original project or fork: Original repository.
- Repository description: Self-healing AWS application built with Terraform.
- Primary language and project category: `HCL` - Terraform AWS architecture
- Current branch: `main`
- Last meaningful activity: `2026-02-21 | Remove job status tracking from future improvements`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: Project Hydra 🐙 **A Self-Healing, 3-Tier Cloud Architecture deployed with Terraform** ![Status](https://img.shields.io/badge/Status-Active-success)
- Claims supported by visible code: Visible repository contents include infrastructure or deployment files, and screenshots or media assets.
- Screenshots present: `image.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: `main.tf`, `outputs.tf`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: Checked-in `terraform.tfstate` and backup file are a hygiene risk and should be removed before direct portfolio promotion.
- Relationship to an existing portfolio manifest entry: Candidate component that could replace part of the vague `project-infrastructure-automation` composite.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### AWS-HA-3-TIER

- Repository: `AWS-HA-3-TIER`
- URL: https://github.com/Keninjavelas/AWS-HA-3-TIER
- Original project or fork: Original repository.
- Repository description: Secure cloud infrastructure automation on AWS for a PHP/MySQL application with zero downtime claims.
- Primary language and project category: `PHP` - AWS HA architecture demo
- Current branch: `main`
- Last meaningful activity: `2025-12-26 | Initial commit: High Availability Architecture v1.0`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: ﻿# AWS High-Availability 3-Tier Architecture ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![AWS](https://img.shields.io/badge/AWS-Free%20Tier-orange) ![Status](https://img.shields.io/badge/Status-Completed-green) Corporate-Grade Web Infrastructure Simulation
- Claims supported by visible code: Visible repository contents include tests, screenshots or media assets, and architecture or workflow documents.
- Screenshots present: `diagrams/architecture-screenshot.png`, `diagrams/connected-screenshot.png`, `diagrams/fleet-screenshot.png`
- Architecture diagrams present: `diagrams/architecture-screenshot.png`, `diagrams/connected-screenshot.png`, `diagrams/fleet-screenshot.png`
- Tests present: `src/db-test.php`
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: Candidate component that could replace part of the vague `project-infrastructure-automation` composite.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### Chess-Bot

- Repository: `Chess-Bot`
- URL: https://github.com/Keninjavelas/Chess-Bot
- Original project or fork: Original repository.
- Repository description: Offline desktop chess application with Stockfish-backed play and analysis features.
- Primary language and project category: `Python` - Desktop chess application
- Current branch: `main`
- Last meaningful activity: `2025-11-17 | Update README.md`
- Personal or team project: Original repository with two commit authors in fetched history.
- Aryan Kapoor's exact contribution: Public ownership plus visible GUI and engine structure suggest meaningful direct implementation, but a solo-build claim is not safe without clarifying the second author.
- README claims: Chess-Bot presents itself as an offline personal chess coach powered by Stockfish with analysis and review features.
- Claims supported by visible code: Visible code supports a Python desktop app with board widgets, engine integration, analysis dialogs, configuration files, a bundled Stockfish directory, and a screenshot.
- Screenshots present: `Screen.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: `test_pyqt.py`
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or packaged installer verified in this audit.
- Security or privacy concerns: No obvious secret leakage surfaced in the quick audit.
- Relationship to an existing portfolio manifest entry: No current direct manifest mapping.
- Risk of overstatement: Moderate if the portfolio implies polished distribution or heavy analysis depth beyond the visible desktop implementation.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### cropchain-project

- Repository: `cropchain-project`
- URL: https://github.com/Keninjavelas/cropchain-project
- Original project or fork: Original repository.
- Repository description: Hybrid blockchain solution for agricultural traceability.
- Primary language and project category: `JavaScript` - Blockchain traceability app
- Current branch: `main`
- Last meaningful activity: `2025-10-31 | Merge branch 'main' of https://github.com/Keninjavelas/cropchain-project`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: CropChain: Blockchain-Powered Agricultural Traceability [![Hyperledger Fabric](https://img.shields.io/badge/Hyperledger%20Fabric-2.2.0-blue)](https://www.hyperledger.org/use/fabric) [![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
- Claims supported by visible code: Visible repository contents include infrastructure or deployment files, and screenshots or media assets.
- Screenshots present: `Dashboard.png`, `Management.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: `docker-compose.yml`, `Dockerfile`, `fabric-network/docker-compose-fabric.yaml`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: Tracked `.env` file requires review before direct public linking from a portfolio.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### cs-website

- Repository: `cs-website`
- URL: https://github.com/Keninjavelas/cs-website
- Original project or fork: Original repository.
- Repository description: IEEE CS HKBK chapter website built with Next.js and Supabase.
- Primary language and project category: `TypeScript` - Chapter website / CMS
- Current branch: `main`
- Last meaningful activity: `2026-05-27 | Merge pull request #1 from Keninjavelas/vercel/install-vercel-web-analytics-e7h7cn`
- Personal or team project: Likely organizational or chapter website work rather than a purely solo personal product.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: IEEE Computer Society Chapter Platform A production-ready web platform for managing IEEE Computer Society chapter operations, events, and community engagement. [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
- Claims supported by visible code: Visible repository contents include screenshots or media assets.
- Screenshots present: `app/icon.svg`, `public/file.svg`, `public/globe.svg`, `public/Introduction.mp4`, `public/next.svg`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: https://cs-website-rosy.vercel.app; Official site: https://cs-website-rosy.vercel.app
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### DigitalSteganography

- Repository: `DigitalSteganography`
- URL: https://github.com/Keninjavelas/DigitalSteganography
- Original project or fork: Original repository.
- Repository description: Java tool for hiding and retrieving text or files inside PNG images using LSB steganography.
- Primary language and project category: `Java` - Java security / steganography tool
- Current branch: `main`
- Last meaningful activity: `2026-01-23 | Update`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: 🌟 Shadow Cipher - Digital Necromancy v2.0 *"In shadows we hide, in darkness we reveal"* A mysterious and powerful Java-based steganography application that weaves dark magic to hide secrets within digital images. Built with enterprise-grade security, zero external dependencies, and an immersive mysterious user experience.
- Claims supported by visible code: Visible repository contents include tests, GitHub Actions or CI workflows, and screenshots or media assets.
- Screenshots present: `images/CLI.png`, `images/GUI.png`, `images/shadow-cli-demo.png`, `images/shadow-gui-screenshot.png`, `resources/input.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: `src/test/java/com/stegaj/core/ImageValidatorTest.java`, `src/test/java/com/stegaj/integration/SteganographyIntegrationTest.java`, `src/test/java/com/stegaj/security/AdvancedCryptoTest.java`, `src/test/java/com/stegaj/util/FileUtilsTest.java`
- CI/CD present: `.github/workflows/ci.yml`
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### hubspot-deals-etl-api

- Repository: `hubspot-deals-etl-api`
- URL: https://github.com/Keninjavelas/hubspot-deals-etl-api
- Original project or fork: Original repository.
- Repository description: Containerized application that extracts HubSpot deals, stores them in PostgreSQL, and provides a RESTful API.
- Primary language and project category: `Python` - ETL + API service
- Current branch: `main`
- Last meaningful activity: `2025-11-18 | Update README.md`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: HubSpot Deals ETL & API A complete, containerized application for extracting HubSpot deals, storing them in a PostgreSQL database, and managing them through a RESTful API with a simple web interface. - **Dockerized Services**: The entire application stack (Database, API, Extraction Script) is managed with Docker Compose for easy setup and consistent environments.
- Claims supported by visible code: Visible repository contents include tests, infrastructure or deployment files, and screenshots or media assets.
- Screenshots present: `Display.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: `tests/test_api.py`, `tests/test_extraction.py`, `tests/test_health.py`
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: `docker-compose.yml`, `docker/Dockerfile`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### AWS-Socket-Chat

- Repository: `AWS-Socket-Chat`
- URL: https://github.com/Keninjavelas/AWS-Socket-Chat
- Original project or fork: Original repository.
- Repository description: Real-time containerized WebSocket chat app on AWS with DynamoDB.
- Primary language and project category: `HTML` - Containerized realtime chat
- Current branch: `main`
- Last meaningful activity: `2026-01-20 | Merge branch 'main' of https://github.com/Keninjavelas/AWS-Socket-Chat`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: 💬 AWS Cloud Chat — Real-Time Containerized Application **A stateful, real-time chat application orchestrated on Amazon ECS and persisted via DynamoDB.** This project demonstrates how to deploy **stateful** applications (WebSockets) on AWS using Docker containers, managing the infrastructure via CLI, and integrating serverless storage for message persistence.
- Claims supported by visible code: Visible repository contents include infrastructure or deployment files, and screenshots or media assets.
- Screenshots present: `images/chat-room-dark.png`, `images/chat-room-light.png`, `images/dynamodb.png`, `images/initial-chat.png`, `images/login-screen.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: `Dockerfile`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### AWS-EconVerse

- Repository: `AWS-EconVerse`
- URL: https://github.com/Keninjavelas/AWS-EconVerse
- Original project or fork: Original repository.
- Repository description: A serverless, event-driven financial engine on AWS.
- Primary language and project category: `Python` - Serverless economic simulator
- Current branch: `main`
- Last meaningful activity: `2026-02-06 | Fix formatting of author attribution in README`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: 🌍 EconVerse: Serverless Financial Simulation Engine **A deterministic, event-driven economic simulation platform built on AWS Free Tier.** EconVerse simulates a closed-loop economy where macroeconomic states, market orders, agent behaviors, and blockchain consensus evolve in discrete, replayable "ticks." It demonstrates a sophisticated **Distributed State Machine** architecture using serverless pr
- Claims supported by visible code: Visible repository contents include tests, and screenshots or media assets.
- Screenshots present: `econverse_status.png`, `Graph_view.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: `tests/__init__.py`, `tests/unit/test_agents.py`, `tests/unit/test_ledger.py`, `tests/unit/test_market.py`, `tests/unit/__init__.py`
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### AWS-Signal_Sync

- Repository: `AWS-Signal_Sync`
- URL: https://github.com/Keninjavelas/AWS-Signal_Sync
- Original project or fork: Original repository.
- Repository description: Hybrid edge-cloud architecture for real-time interview coaching.
- Primary language and project category: `JavaScript` - Edge-cloud voice coach
- Current branch: `main`
- Last meaningful activity: `2026-02-02 | first commit`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: Signal Sync 🎙️🧠 > A Hybrid Edge-Cloud AI Voice Coach ![AWS](https://img.shields.io/badge/AWS-Lambda%20%7C%20Polly%20%7C%20API%20Gateway-orange?logo=amazon-aws)
- Claims supported by visible code: Visible repository contents include screenshots or media assets.
- Screenshots present: `image.png`, `frontend/public/vite.svg`, `frontend/src/assets/react.svg`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### AWS-SYBIL-Prototype

- Repository: `AWS-SYBIL-Prototype`
- URL: https://github.com/Keninjavelas/AWS-SYBIL-Prototype
- Original project or fork: Original repository.
- Repository description: A containerized, locally-hosted AI governance engine that automates DevSecOps compliance using multi-persona LLM agents.
- Primary language and project category: `Python` - AI governance / DevSecOps prototype
- Current branch: `main`
- Last meaningful activity: `2026-01-28 | Replace hardcoded API key with placeholder`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: S.Y.B.I.L. (Systemic Yield & Binary Intelligence Layer) > **Automated Governance & Compliance Engine** > *A containerized, locally-hosted AI Tribunal for DevSecOps auditing.*
- Claims supported by visible code: Visible repository contents include tests, infrastructure or deployment files, and screenshots or media assets.
- Screenshots present: `image.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: `backend/venv/Lib/site-packages/annotated_types/test_cases.py`, `backend/venv/Lib/site-packages/annotated_types/__pycache__/test_cases.cpython-311.pyc`, `backend/venv/Lib/site-packages/colorama/tests/ansitowin32_test.py`, `backend/venv/Lib/site-packages/colorama/tests/ansi_test.py`, `backend/venv/Lib/site-packages/colorama/tests/initialise_test.py`
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: `docker-compose.yml`, `backend/Dockerfile`, `frontend/Dockerfile`
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: Repo includes a checked-in screenshot and multi-service structure, but broader confidence is reduced because similar repos in this set sometimes vendor environments or generated artifacts.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `NEEDS CODE REVIEW`

### Kaggle-Lab-Bench-Copilot

- Repository: `Kaggle-Lab-Bench-Copilot`
- URL: https://github.com/Keninjavelas/Kaggle-Lab-Bench-Copilot
- Original project or fork: Original repository.
- Repository description: A multimodal AI assistant for molecular biology.
- Primary language and project category: `TypeScript` - Multimodal lab assistant
- Current branch: `main`
- Last meaningful activity: `2025-12-09 | Expand README with Lab Bench Co-Pilot details`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: <div align="center"> <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" /> Run and deploy your AI Studio app
- Claims supported by visible code: Visible code mainly supports a basic project skeleton and README-level description; deeper implementation evidence is limited.
- Screenshots present: None visible in the inspected tree.
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### Landing-Page

- Repository: `Landing-Page`
- URL: https://github.com/Keninjavelas/Landing-Page
- Original project or fork: Original repository.
- Repository description: Multilingual portfolio website with dual-theme design.
- Primary language and project category: `TypeScript` - Portfolio site
- Current branch: `main`
- Last meaningful activity: `2026-02-28 | Updated Versioning`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: 🚀 Retro-Futuristic Portfolio > A modern, multilingual portfolio website featuring a unique dual-theme design: sleek futuristic interface and nostalgic 80s CRT monitor aesthetic. **🌐 Live Demo:** [https://landing-page-sandy-alpha-26.vercel.app](https://landing-page-sandy-alpha-26.vercel.app)
- Claims supported by visible code: Visible repository contents include tests, and GitHub Actions or CI workflows.
- Screenshots present: None visible in the inspected tree.
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: `src/components/__tests__/GlitchText.test.tsx`
- CI/CD present: `.github/workflows/ci.yml`
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: https://landing-page-sandy-alpha-26.vercel.app
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### VoidTech

- Repository: `VoidTech`
- URL: https://github.com/Keninjavelas/VoidTech
- Original project or fork: Original repository.
- Repository description: Interactive 3D viewer built with Three.js.
- Primary language and project category: `JavaScript` - Three.js 3D experience
- Current branch: `main`
- Last meaningful activity: `2026-02-07 | Revise README for clarity and feature details`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: Immersive 3D Experiences for the Cyberpunk Web <p align="center"> <img src="https://img.shields.io/github/stars/Keninjavelas/VoidTech?style=for-the-badge&color=7f5af0" />
- Claims supported by visible code: Visible repository contents include screenshots or media assets.
- Screenshots present: `Image.png`, `assets/textures/envmap.jpg`, `assets/textures/envmap1.jpg`, `assets/textures/envmap2.jpg`, `assets/textures/evnmap3.jpg`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### Quantum-Feedback-Simulator

- Repository: `Quantum-Feedback-Simulator`
- URL: https://github.com/Keninjavelas/Quantum-Feedback-Simulator
- Original project or fork: Original repository.
- Repository description: Qiskit-based tool for simulating quantum systems with feedback loops.
- Primary language and project category: `Python` - Qiskit simulator
- Current branch: `main`
- Last meaningful activity: `2025-05-26 | Rename Qiakit Output 2.png to Qiskit Output 2.png`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: Quantum Feedback Simulator A Qiskit-based simulation of quantum systems with feedback loops. ![Quantum Feedback Simulation Results](Qiskit%20Output%201.png)
- Claims supported by visible code: Visible repository contents include screenshots or media assets.
- Screenshots present: `Qiskit Output 1.png`, `Qiskit Output 2.png`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### employee_project

- Repository: `employee_project`
- URL: https://github.com/Keninjavelas/employee_project
- Original project or fork: Original repository.
- Repository description: Django-based employee management web app.
- Primary language and project category: `Python` - Django employee system
- Current branch: `main`
- Last meaningful activity: `2025-10-08 | Update README.md`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: 🧑‍💼 Employee Management System A **Django-based web application** for managing employees, departments, and attendance — complete with an **interactive dashboard** and **RESTful API** integration. * 👥 **Full CRUD** operations for Employees and Departments
- Claims supported by visible code: Visible code mainly supports a basic project skeleton and README-level description; deeper implementation evidence is limited.
- Screenshots present: None visible in the inspected tree.
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### Expense-Tracker

- Repository: `Expense-Tracker`
- URL: https://github.com/Keninjavelas/Expense-Tracker
- Original project or fork: Original repository.
- Repository description: Expense Tracker is a modern, secure web application for managing personal finances.
- Primary language and project category: `HTML` - Personal finance web app
- Current branch: `main`
- Last meaningful activity: `2025-10-08 | Update README.md`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: 💸 Expense Tracker A **futuristic**, **intuitive**, and **secure** expense tracking web application built with **Node.js**, **Express**, **SQLite**, and **Tailwind CSS**. Track, visualize, and manage your personal expenses with ease — all from a lightweight and responsive interface.
- Claims supported by visible code: Visible code mainly supports a basic project skeleton and README-level description; deeper implementation evidence is limited.
- Screenshots present: None visible in the inspected tree.
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### Expense-Tracker-CLI

- Repository: `Expense-Tracker-CLI`
- URL: https://github.com/Keninjavelas/Expense-Tracker-CLI
- Original project or fork: Original repository.
- Repository description: A simple, multi-user command-line expense tracker built with Python and SQLite.
- Primary language and project category: `Python` - CLI finance tool
- Current branch: `main`
- Last meaningful activity: `2025-10-08 | Update README.md`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: 💰 Expense Tracker CLI A **lightweight**, **multi-user command-line expense tracker** built with **Python** and **SQLite**. Easily log, view, and export expenses — all from your terminal.
- Claims supported by visible code: Visible code mainly supports a basic project skeleton and README-level description; deeper implementation evidence is limited.
- Screenshots present: None visible in the inspected tree.
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: No major issue surfaced in the quick audit beyond the normal need to avoid overstating README claims.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `ARCHIVE RECORD`
- Confidence: `PARTIALLY VERIFIED`

### backstage

- Repository: `backstage`
- URL: https://github.com/Keninjavelas/backstage
- Original project or fork: Fork of `backstage/backstage`.
- Repository description: Backstage is an open framework for building developer portals
- Primary language and project category: `Unknown` - Developer portal fork
- Current branch: `master`
- Last meaningful activity: `2026-08-04 | Fix strict config check rejecting valid open-ended schemas (#35043)`
- Personal or team project: Public fork of a large upstream open-source project.
- Aryan Kapoor's exact contribution: Fork-contribution repository. Exact work must be identified by commit diff or pull request, not by repo ownership.
- README claims: [![headline](docs/assets/headline.png)](https://backstage.io/) [Backstage](https://backstage.io) English \| [한국어](README-ko_kr.md) \| [中文版](README-zh_Hans.md) \| [Français](README-fr_FR.md) \| [日本語](README-ja_JP.md)
- Claims supported by visible code: Visible repository contents include tests, GitHub Actions or CI workflows, infrastructure or deployment files, screenshots or media assets, and architecture or workflow documents.
- Screenshots present: `beps/0001-notifications-system/notifications-architecture.drawio.svg`, `beps/0001-notifications-system/UserNotificationSettings.png`, `beps/0002-dynamic-frontend-plugins/scope-sharing.png`, `beps/0003-auth-architecture-evolution/token-sequence-cookie.drawio.svg`, `beps/0003-auth-architecture-evolution/token-sequence-obo.drawio.svg`
- Architecture diagrams present: `.changeset/create-app-ci-workflow.md`, `beps/0001-notifications-system/notifications-architecture.drawio.svg`, `beps/0003-auth-architecture-evolution/README.md`, `beps/0003-auth-architecture-evolution/token-sequence-cookie.drawio.svg`, `beps/0003-auth-architecture-evolution/token-sequence-obo.drawio.svg`
- Tests present: `.cursor/rules/tests/backend-test-utils.mdc`, `.cursor/rules/tests/test-utils.mdc`, `docs/tooling/cli/module-test.md`, `packages/app/e2e-tests/app.test.ts`, `packages/app/e2e-tests/HomePage.test.ts`
- CI/CD present: `.github/workflows/api-breaking-changes-comment.yml`, `.github/workflows/api-breaking-changes.yml`, `.github/workflows/automate_area-labels.yml`, `.github/workflows/automate_changeset_feedback.yml`, `.github/workflows/automate_issue_labels.yml`
- Infrastructure code present: `docker-compose.deps.yml`, `.devcontainer/Dockerfile`, `contrib/docker/devops/Dockerfile`, `contrib/docker/frontend-with-nginx/Dockerfile.dockerbuild`, `contrib/docker/frontend-with-nginx/Dockerfile.hostbuild`, `contrib/docker/minimal-hardened-image/Dockerfile`
- Deployment or live link: https://backstage.io/
- Security or privacy concerns: Primary risk is attribution drift, not repo hygiene.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `FORK-CONTRIBUTION`
- Confidence: `NEEDS CODE REVIEW`

### latitude-llm

- Repository: `latitude-llm`
- URL: https://github.com/Keninjavelas/latitude-llm
- Original project or fork: Fork of `latitude-dev/latitude-llm`.
- Repository description: Latitude is the open-source ai monitoring platform.
- Primary language and project category: `TypeScript` - AI monitoring platform fork
- Current branch: `development`
- Last meaningful activity: `2026-07-24 | release: v0.3.66`
- Personal or team project: Public fork of an active upstream open-source product.
- Aryan Kapoor's exact contribution: Fork-contribution repository. Exact work must be identified by commit diff or pull request, not by repo ownership.
- README claims: <p align="center"> <img src="docs/assets/readme/readme-banner.png?raw=true" alt="Latitude — self-healing AI agents" width="100%" /> <h1 align="center" style="border: none; margin-bottom: 8px;">
- Claims supported by visible code: Visible repository contents include tests, GitHub Actions or CI workflows, infrastructure or deployment files, screenshots or media assets, and architecture or workflow documents.
- Screenshots present: `apps/design-system/public/favicon.svg`, `apps/design-system/public/latitude-logo-dark.png`, `apps/design-system/public/latitude-logo-dark.svg`, `apps/design-system/public/latitude-logo-mark-dark.svg`, `apps/design-system/public/latitude-logo-mark.svg`
- Architecture diagrams present: `.agents/skills/architecture-boundaries/SKILL.md`, `.agents/skills/temporal-developer/references/core/interactive-workflows.md`, `apps/workflows/datadog/taxonomy-shadow-datadog-setup.md`, `dev-docs/network-diagram.md`, `dev-docs/assets/latitude-network-diagram.svg`
- Tests present: `vitest.config.ts`, `.github/workflows/test.yml`, `apps/api/vitest.config.ts`, `apps/api/src/mcp/server.test.ts`, `apps/api/src/middleware/access-logger.test.ts`
- CI/CD present: `.github/workflows/api-manifests.yml`, `.github/workflows/build-images.yml`, `.github/workflows/check.yml`, `.github/workflows/claude.yml`, `.github/workflows/deploy.yml`
- Infrastructure code present: `docker-compose.yml`, `Dockerfile`
- Deployment or live link: https://latitude.so
- Security or privacy concerns: Primary risk is attribution drift, not repo hygiene.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `FORK-CONTRIBUTION`
- Confidence: `NEEDS CODE REVIEW`

### Sportify

- Repository: `Sportify`
- URL: https://github.com/Keninjavelas/Sportify
- Original project or fork: Fork; upstream name is not yet confirmed from this audit.
- Repository description: No public GitHub description provided.
- Primary language and project category: `Unknown` - Mobile sports trainer fork
- Current branch: `master`
- Last meaningful activity: `2025-10-23 | froneted doene bc`
- Personal or team project: Public fork; upstream needs confirmation.
- Aryan Kapoor's exact contribution: Fork-contribution repository with unclear upstream and unclear original contribution boundaries.
- README claims: AI Sports Trainer – Mobile A modern, AI-assisted coaching app for multiple sports, built with Expo + React Native. It helps athletes practice smarter, get feedback, and stay motivated with community and nutrition features. Problem we’re solving
- Claims supported by visible code: Visible repository contents include screenshots or media assets.
- Screenshots present: `assets/images/android-icon-background.png`, `assets/images/android-icon-foreground.png`, `assets/images/android-icon-monochrome.png`, `assets/images/batting.jpg`, `assets/images/bowling.jpg`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: Primary risk is attribution drift, not repo hygiene.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `FORK-CONTRIBUTION`
- Confidence: `NEEDS CODE REVIEW`

### Keninjavelas

- Repository: `Keninjavelas`
- URL: https://github.com/Keninjavelas/Keninjavelas
- Original project or fork: Original repository.
- Repository description: Explored many domains, now building in the cloud with AWS, Terraform, Docker, and Python while learning and shipping in public.
- Primary language and project category: `Unknown` - Profile repository
- Current branch: `main`
- Last meaningful activity: `2026-06-03 | Update README to modify badges`
- Personal or team project: Likely personal original repository; no separate upstream is visible from this audit.
- Aryan Kapoor's exact contribution: Public ownership suggests Aryan is the primary author or maintainer, but exact solo versus team boundaries are not fully provable from the public surface alone.
- README claims: <p align="center"> src="https://raw.githubusercontent.com/Keninjavelas/Keninjavelas/main/assets/aura.svg" alt="Aura Banner"
- Claims supported by visible code: Visible repository contents include screenshots or media assets.
- Screenshots present: `assets/aura.svg`
- Architecture diagrams present: None visible in the inspected tree.
- Tests present: No obvious first-party tests detected from the quick audit.
- CI/CD present: No GitHub Actions workflows detected.
- Infrastructure code present: No Terraform, Docker, or Kubernetes artifacts detected.
- Deployment or live link: No confirmed public deployment or external product listing found in this audit.
- Security or privacy concerns: Profile README only; no code-surface concern beyond normal personal-branding review.
- Relationship to an existing portfolio manifest entry: No current direct `portfolioData.ts` project mapping; treat as a separate repository candidate.
- Risk of overstatement: Moderate unless the public wording stays tied to visible code, assets, and workflows rather than README-only marketing language.
- Recommended tier: `OMIT`
- Confidence: `PARTIALLY VERIFIED`

## Flagship Candidate Evidence Review

- The ten reviews below supersede earlier first-pass shorthand such as `likely flagship candidates`.
- Scores are comparison aids only; they are not yet portfolio copy and do not freeze the final shortlist.
- README claims were treated as unverified unless backed by visible source structure, tests, workflow definitions, product media, or local workspace code.

### InfraMind Review

- Repository: `Keninjavelas/InfraMind`
- Original or fork: Original repository.
- Solo or team: Likely solo-owned public repo; fetched history shows `32` commits and `1` author.
- Current functional status: Working extension-plus-backend product with visible diagnostics, visualization, documentation, tests, workflows, website, and marketplace packaging.
- Implemented subsystems confirmed in source: VS Code extension entrypoints, diagnostics, hover provider, analyze and visualize commands, architecture and security panels, API service wiring, backend parsers for Terraform, Kubernetes, and Docker, Mermaid diagram generation, context building, and AI orchestration modules.
- README claims not yet confirmed: Any enterprise-scale accuracy, benchmark, latency, or broad adoption claims beyond the visible parser coverage and UI assets.
- Tests actually present: Parser fixture suites across Terraform, Kubernetes, and Docker plus AI validation fixtures and `run_tests.py`.
- Latest test or CI evidence: `.github/workflows/extension.yml`, `lint.yml`, and `regression.yml` are present; no successful run logs were inspected during this audit.
- Deployment evidence: Public website link, VS Code Marketplace listing, `render.yaml`, and `docker-compose.yml`.
- Screenshots or product media: `docker_intelligence.png`, `hover_intelligence.png`, `inline_diagnostics.png`, `k8s_intelligence.png`, `security_panel.png`, and `mermaid_topology.png`.
- Architecture documentation: `docs/architecture/system-design.md` plus the Mermaid topology asset.
- Commit-history depth: `32` commits.
- Meaningful development span: `2026-05-14` through `2026-06-07` (about 3 weeks).
- Known limitations: Production telemetry, user adoption, and AI-quality claims remain outside the visible repository evidence.
- Security concerns: No obvious leaked secrets surfaced in the quick audit, but provider configuration should still be reviewed before public promotion.
- Exact personal contribution: Safe to state Aryan appears to be the primary builder of the extension, backend analyzers, documentation, and presentation assets.
- Technical depth: `5/5`
- Originality and ownership: `5/5`
- Evidence quality: `5/5`
- Career relevance: `5/5`
- Product completeness: `4/5`
- Presentation readiness: `5/5`
- Recommended tier: `FLAGSHIP`
- Decision: `APPROVE`

### Ghost-Protocol Review

- Repository: `Keninjavelas/Ghost-Protocol`
- Original or fork: Original repository.
- Solo or team: Original repo with `20` fetched commits and `2` authors; exact solo-versus-collaborative boundary is unresolved.
- Current functional status: Large integrated cybersecurity prototype with many modules, dashboard media, and Docker packaging, but runtime health and operational completeness were not verified.
- Implemented subsystems confirmed in source: `ai_core` modules for intent inference, MITRE mapping, report generation, and threat scoring; detection API and orchestrator; network-defense modules; SSH gateway modules; sandbox Docker manager; tracking and canary modules; resilience helpers; threat-intelligence modules; VPN-security modules; and Alembic or database scaffolding.
- README claims not yet confirmed: Broad attacker coverage, dynamic deception effectiveness, real-time attribution quality, production hardening, and MITRE mapping accuracy.
- Tests actually present: No clear first-party automated test suite was found after excluding the checked-in `venv`; the strongest visible evidence is a manual `QA_TESTING_CHECKLIST.md`.
- Latest test or CI evidence: No GitHub Actions workflows were detected. Manual QA and deployment markdown files exist, but no verified run artifact was inspected.
- Deployment evidence: `Dockerfile` and `docker-compose.yml` are present. A public web link was referenced during the earlier repo audit, but its operational state was not re-verified in this candidate pass.
- Screenshots or product media: `Dashboard.png`
- Architecture documentation: `AI_INTELLIGENCE_DEPLOYMENT.md`, `DASHBOARD_INTEGRATION.md`, `Attacks_Handled.md`, and `DEMO_SCRIPT_FEATURE.md`
- Commit-history depth: `20` commits.
- Meaningful development span: `2026-02-25` through `2026-03-07` (about 11 days).
- Known limitations: No verified automated tests, no verified CI, noisy repo hygiene, and a large gap between ambitious README language and currently confirmed implementation proof.
- Security concerns: Tracked `.env`, checked-in `venv`, and the presence of `ai_core/demo_credentials.py` all need review before public promotion.
- Exact personal contribution: Safe to say Aryan appears to own or lead the repo, but each subsystem and the exact collaboration split still need confirmation.
- Technical depth: `4/5`
- Originality and ownership: `4/5`
- Evidence quality: `2/5`
- Career relevance: `4/5`
- Product completeness: `3/5`
- Presentation readiness: `3/5`
- Recommended tier: `DETAILED DOSSIER`
- Decision: `NEEDS DEEPER CODE REVIEW`

### Poseidon Review

- Repository: `Keninjavelas/Poseidon`
- Original or fork: Original repository.
- Solo or team: Likely solo-owned public repo; fetched history shows `17` commits and `1` author.
- Current functional status: Working multi-service digital-twin prototype with backend, frontend, edge-AI, Docker, Kubernetes, and test coverage.
- Implemented subsystems confirmed in source: Backend routes for agriculture, alerts, auth, digital twin, harvesting, quality, rainfall, and usage; backend services for ingestion, processing, simulation, MQTT, WebSocket fanout, and persistence; frontend routes for dashboards, map, trackers, and digital-twin views; React or WebGL scene components; state stores; and edge-AI optical-sentry files.
- README claims not yet confirmed: Real-time synchronization quality, digital-twin fidelity, edge-anomaly performance, and production-scale deployment behavior.
- Tests actually present: Backend Jest tests, frontend `AlertFeed` test, `edge_ai/test_optical_sentry.py`, `pytest.ini`, and multiple Jest configs.
- Latest test or CI evidence: `.github/workflows/ci-cd.yml` is present along with backend, frontend, and edge test configuration files; no successful run logs were inspected during this audit.
- Deployment evidence: `docker-compose.yml`, multiple backend Dockerfiles, `edge_ai/Dockerfile`, and `k8s/poseidon.yaml`.
- Screenshots or product media: Limited curated media in the repo; the strongest visible product asset is `frontend/src/app/icon.svg`.
- Architecture documentation: `VALIDATION_RESULTS.md`
- Commit-history depth: `17` commits.
- Meaningful development span: `2026-04-10` through `2026-04-26` (about 2.5 weeks).
- Known limitations: Presentation media is light, architecture explanation is thinner than the code surface, and no public deployment was verified.
- Security concerns: No major issue surfaced in the quick audit beyond normal environment and deployment review.
- Exact personal contribution: Safe to state Aryan appears to be the primary builder across backend, frontend, edge-AI, and orchestration layers.
- Technical depth: `5/5`
- Originality and ownership: `5/5`
- Evidence quality: `4/5`
- Career relevance: `5/5`
- Product completeness: `4/5`
- Presentation readiness: `4/5`
- Recommended tier: `FLAGSHIP`
- Decision: `APPROVE`

### DayOne-AI Review

- Repository: `Keninjavelas/DayOne-AI`
- Original or fork: Original repository.
- Solo or team: Likely solo-owned public repo; fetched history shows `28` commits and `1` author.
- Current functional status: Substantial local or self-hosted retrieval prototype with backend services, frontend surfaces, infrastructure files, data fixtures, and first-party tests.
- Implemented subsystems confirmed in source: Backend services for abstention, auth, document storage, embeddings, query classification, query routing, trace capture, MinIO storage, user management, and verification; frontend components for login, chat, and admin debugging; app router entry files; ingestion, evaluation, and drift scripts; and dataset or fixture folders.
- README claims not yet confirmed: `production-grade`, strong multi-tenant isolation, full explainability, and mature deployment claims.
- Tests actually present: `test_abstention.py`, `test_auth.py`, `test_eval_abstention_metrics.py`, `test_eval_metrics_endpoint.py`, `test_query_routing.py`, `test_query_traces.py`, `test_streaming_parity.py`, and `tests/streamlit/test_app_login.py`.
- Latest test or CI evidence: `pytest.ini` and first-party tests are present, but no GitHub Actions workflows or successful run artifacts were verified.
- Deployment evidence: `Dockerfile`, root `docker-compose.yml`, and `infra/docker-compose.yml`.
- Screenshots or product media: The repo includes an `assets` folder and `take_screenshots.py`, but no clearly curated hero screenshots were verified in this pass.
- Architecture documentation: `docs/uncertainty_control_blueprint.md`
- Commit-history depth: `28` commits.
- Meaningful development span: `2026-04-17` through `2026-06-02` (about 6.5 weeks).
- Known limitations: Three checked-in virtual environments materially distort repo counts and weaken the cleanliness of the evidence surface; no CI or live deployment was verified.
- Security concerns: The checked-in `.venv_localhost`, `.venv_new`, and `.venv_test` folders should be removed or ignored before treating the repo as polished evidence.
- Exact personal contribution: Safe to state Aryan appears to be the primary builder of the retrieval, routing, admin, and evaluation code, but claims of full production readiness should wait.
- Technical depth: `4/5`
- Originality and ownership: `4/5`
- Evidence quality: `3/5`
- Career relevance: `5/5`
- Product completeness: `3/5`
- Presentation readiness: `3/5`
- Recommended tier: `DETAILED DOSSIER`
- Decision: `NEEDS DEEPER CODE REVIEW`

### Auxilium Digital Archive Review

- Repository: Local workspace `Chaos` with Git remote `https://github.com/Keninjavelas/Chaos.git`
- Original or fork: Local original workspace with a GitHub remote configured; public visibility was not independently verified in this local-evidence pass.
- Solo or team: Local history shows `4` commits and `1` author.
- Current functional status: Active in-development interactive portfolio with implemented room-based navigation, intro flow, archive systems, state persistence, and multiple exploratory routes.
- Implemented subsystems confirmed in source: Top-level routes for `correspondence`, `hallway`, `library`, `memory-archive`, `mirror-room`, `timeline`, and `workshop`; room modules for Reception, Personnel, Records Hall, Communications, Elevator, Main Corridor, and Sublevel; player, renderer, lighting, and input systems; intro sequencing; archive bootstrap and persistence modules; observation, rare-event, panic-detection, and degradation engines; document overlays; and manifest validation utilities.
- README claims not yet confirmed: Final launch readiness, completed content curation, approved public asset set, and live deployment status.
- Tests actually present: No dedicated first-party automated test suite or GitHub Actions workflows were found in the local workspace; the strongest verification artifacts are `src/data/validatePortfolioData.ts` and `src/runtime_check.ts`.
- Latest test or CI evidence: Local validation utilities exist, but no CI pipeline or successful build artifact was verified in this audit.
- Deployment evidence: `package.json` contains `dev`, `build`, and `start` scripts for a Next.js 16 app, and the workspace has an origin remote pointing at `Keninjavelas/Chaos.git`. No approved live production URL exists yet.
- Screenshots or product media: Public image assets exist for the environment and intro sequence, but curated launch screenshots and demo captures have not been collected yet.
- Architecture documentation: `PROJECT_ARCHIVE_AK27_SPEC.md`, `PROJECT_ARCHIVE_AK27_IMPLEMENTATION_GUIDE.md`, and room-design markdown files.
- Commit-history depth: `4` commits.
- Meaningful development span: `2026-06-22` through `2026-08-04` (about 6 weeks).
- Known limitations: Batch 3 content is still being rebuilt from the audit, automated testing is thin, and the launch asset set is incomplete.
- Security concerns: No obvious secret leakage surfaced in the local workspace review.
- Exact personal contribution: Safe to state Aryan is the primary author of the local codebase, scene structure, state systems, and design documents.
- Technical depth: `4/5`
- Originality and ownership: `5/5`
- Evidence quality: `4/5`
- Career relevance: `5/5`
- Product completeness: `3/5`
- Presentation readiness: `4/5`
- Recommended tier: `FLAGSHIP`
- Decision: `APPROVE`

### Student-OS Review

- Repository: `Keninjavelas/Student-OS`
- Original or fork: Original repository.
- Solo or team: Likely solo-owned public repo; fetched history shows `12` commits and `1` author.
- Current functional status: Working product prototype with backend, frontend, AI-service, tests, Docker packaging, and Terraform scaffolding.
- Implemented subsystems confirmed in source: Backend routes for auth, AI, mentorship, and student flows; backend services for AI, calendars, judging, payments, and sync; frontend pages for admin and student dashboards, coding assessments, job board, mentorship, mock interview, resume builders, roadmaps, settings, and skill flows; Redux-style store slices with tests; and an AI-service `main.py`.
- README claims not yet confirmed: Broad `production-grade` platform language, institutional or company readiness, and large-scale deployment maturity.
- Tests actually present: Backend tests such as `auth.test.js` and `students.test.js`, frontend component and slice tests, and `frontend/e2e/auth.spec.js`.
- Latest test or CI evidence: `.github/workflows/deploy.yml` and `frontend-ci.yml` are present. Successful run logs were not inspected during this audit.
- Deployment evidence: `docker-compose.yml`, `ai-service/Dockerfile`, `backend/Dockerfile`, Terraform files, `README_PRODUCTION.md`, and `DEPLOYMENT_CHECKLIST.md`.
- Screenshots or product media: UI assets exist, but no strong public-facing screenshots or demo captures were verified beyond internal app assets.
- Architecture documentation: `ARCHITECTURE.md` and `PRODUCT_ROADMAP.md`
- Commit-history depth: `12` commits.
- Meaningful development span: `2026-03-24` through `2026-06-08` (about 11 weeks).
- Known limitations: Scope is very broad relative to the verified presentation proof, and no live deployment was confirmed.
- Security concerns: Tracked `.env` files in `backend` and `frontend` need cleanup before public promotion.
- Exact personal contribution: Safe to state Aryan appears to be the primary builder, but contribution wording should stay conservative until deployment and ownership claims are cleaner.
- Technical depth: `4/5`
- Originality and ownership: `4/5`
- Evidence quality: `3/5`
- Career relevance: `4/5`
- Product completeness: `3/5`
- Presentation readiness: `3/5`
- Recommended tier: `DETAILED DOSSIER`
- Decision: `NEEDS DEEPER CODE REVIEW`

### GCP-OmniStream Review

- Repository: `Keninjavelas/GCP-OmniStream`
- Original or fork: Original repository.
- Solo or team: Likely solo-owned public repo; fetched history shows `10` commits and `1` author.
- Current functional status: Working cloud architecture prototype with three services, infrastructure code, tests, docs, screenshots, and deployment workflow definitions.
- Implemented subsystems confirmed in source: `telemetry-ingestion-api`, `analytics-processor`, `situational-awareness-stream`, `edge-simulation` scripts, `dashboard.html`, and Terraform files for compute, data, IAM, Pub/Sub, and outputs.
- README claims not yet confirmed: Sustained distributed telemetry throughput, real-time map or dashboard behavior under load, and successful production deployment across GCP services.
- Tests actually present: `services/telemetry-ingestion-api/test_main.py`, `services/analytics-processor/test_main.py`, and edge-simulation scripts such as `load_test_locust.py` and `single_device_test.py`.
- Latest test or CI evidence: `.github/workflows/ci-tests.yml` and `cd-deploy.yml` are present. No successful run logs were inspected during this audit.
- Deployment evidence: Dockerfiles for the services, Terraform in `infrastructure/`, and screenshot evidence from the repo image set. No live public endpoint was verified.
- Screenshots or product media: The repo includes multiple GCP-focused screenshots in `images/`.
- Architecture documentation: `docs/architecture.md` and `docs/payload-schema.json`
- Commit-history depth: `10` commits.
- Meaningful development span: `2026-03-17` through `2026-03-19` (3 days).
- Known limitations: The development window is very short for the scope implied by the project name, and live deployment proof was not independently verified.
- Security concerns: No obvious secret leakage surfaced in the quick audit.
- Exact personal contribution: Safe to state Aryan appears to be the primary builder of the prototype services and infrastructure files.
- Technical depth: `3/5`
- Originality and ownership: `4/5`
- Evidence quality: `4/5`
- Career relevance: `4/5`
- Product completeness: `3/5`
- Presentation readiness: `4/5`
- Recommended tier: `ARCHIVE`
- Decision: `DOWNGRADE`

### AWS-CloudOps Review

- Repository: `Keninjavelas/AWS-CloudOps`
- Original or fork: Original repository.
- Solo or team: Likely solo-owned public repo; fetched history shows `3` commits and `1` author.
- Current functional status: Working security-platform prototype with backend routes, scanners, policy engine, remediation actions, graph modules, frontend dashboard, tests, Docker packaging, and Terraform.
- Implemented subsystems confirmed in source: AWS scanners for EC2, IAM, RDS, S3, security groups, VPC, and EBS; remediation actions for public S3 and SSH exposure; graph-building modules; backend models and services; route files for scans, policy, dashboard, graph, remediation, and attack views; and a dashboard frontend.
- README claims not yet confirmed: Mature multi-account Cloud SecOps coverage, production-grade remediation safety, and deep operational readiness.
- Tests actually present: `test_aws.py`, `tests/test_graph.py`, `tests/test_attack_graph.py`, `tests/test_remediation.py`, `tests/test_policies.py`, and `tests/test_multi_account.py`.
- Latest test or CI evidence: `pytest.ini` and the test suite are present, but no GitHub Actions workflows or successful run artifacts were verified.
- Deployment evidence: `Dockerfile`, `docker-compose.yml`, `infrastructure/terraform/main.tf`, and `Dashboard.png`.
- Screenshots or product media: `Dashboard.png`
- Architecture documentation: No strong architecture case-study document was found beyond code organization and `tasks.md`.
- Commit-history depth: `3` commits.
- Meaningful development span: `2026-03-17` through `2026-03-19` (3 days).
- Known limitations: The scope is large for a three-commit history, documentation is thin, and no live deployment or CI evidence was verified.
- Security concerns: No major issue surfaced in the quick audit beyond ordinary environment review.
- Exact personal contribution: Safe to state Aryan appears to be the primary builder of the prototype codebase.
- Technical depth: `4/5`
- Originality and ownership: `4/5`
- Evidence quality: `3/5`
- Career relevance: `4/5`
- Product completeness: `3/5`
- Presentation readiness: `3/5`
- Recommended tier: `ARCHIVE`
- Decision: `DOWNGRADE`

### AWS-Helix-Data-Lakehouse Review

- Repository: `Keninjavelas/AWS-Helix-Data-Lakehouse`
- Original or fork: Original repository.
- Solo or team: Likely solo-owned public repo; fetched history shows `1` commit and `1` author.
- Current functional status: Architecture-heavy data-platform prototype with a stream processor, data generator, SQL assets, screenshots, and Terraform modules.
- Implemented subsystems confirmed in source: `src/stream_processor/lambda_function.py`, `parquet_writer.py`, `transformation.py`, the synthetic transaction generator, Terraform modules for compute, storage, database, and analytics, and Athena or analytics SQL scripts.
- README claims not yet confirmed: End-to-end deployed lakehouse reliability, operational scale, and performance claims beyond the visible prototype files.
- Tests actually present: No first-party automated tests were found in the repository.
- Latest test or CI evidence: No GitHub Actions workflows, test suite, or successful run artifacts were verified.
- Deployment evidence: Terraform files and screenshots such as `architecture.png` and `query.png`; no live deployment endpoint was verified.
- Screenshots or product media: `architecture.png` and `query.png`
- Architecture documentation: The strongest architecture evidence is the diagram image plus the Terraform module layout.
- Commit-history depth: `1` commit.
- Meaningful development span: Single visible commit on `2026-02-18`.
- Known limitations: One-commit history, no tests, no CI, and no verified public deployment make it too thin for a higher tier.
- Security concerns: No obvious secret leakage surfaced in the quick audit.
- Exact personal contribution: Safe to state Aryan appears to be the primary builder of the visible prototype.
- Technical depth: `3/5`
- Originality and ownership: `3/5`
- Evidence quality: `3/5`
- Career relevance: `4/5`
- Product completeness: `2/5`
- Presentation readiness: `3/5`
- Recommended tier: `ARCHIVE`
- Decision: `DOWNGRADE`

### MultiCloud-Serverless-Analytics Review

- Repository: `Keninjavelas/MultiCloud-Serverless-Analytics`
- Original or fork: Original repository.
- Solo or team: Likely solo-owned public repo; fetched history shows `17` commits and `1` author.
- Current functional status: Working multi-cloud prototype with AWS Lambda, GCP Cloud Run, dashboard code, Terraform modules, a broad test suite, and deploy-oriented workflow definitions.
- Implemented subsystems confirmed in source: `lambda/lambda_function.py`, `cloudrun/main.py`, dashboard application code, utility modules for forwarding, validation, storage, logging, and enrichment, event replay and load-testing tools, and Terraform modules for AWS ingestion, GCP processing, and GCP dashboard infrastructure.
- README claims not yet confirmed: Full production reliability, hardened security posture, and the current status of any live deployment.
- Tests actually present: Broad pytest coverage for process endpoints, storage, auth, logging, replay behavior, dashboard queries, integration paths, and property tests.
- Latest test or CI evidence: `.github/workflows/test.yml` runs flake8, black, unit tests, property tests, and coverage generation. `deploy-cloudrun.yml`, `deploy-lambda.yml`, and `terraform.yml` are also present. Successful remote runs were not inspected.
- Deployment evidence: Terraform, multiple Dockerfiles, deployment and security docs, and a dashboard image. No live public endpoint was verified in this pass.
- Screenshots or product media: `Image_d.png`
- Architecture documentation: `docs/ARCHITECTURE.md`, `docs/ENGINEERING_DECISIONS.md`, and `docs/architecture-diagram.txt`
- Commit-history depth: `17` commits.
- Meaningful development span: `2026-03-16` through `2026-04-04` (about 3 weeks).
- Known limitations: Presentation media is lighter than the implementation depth, and public runtime status was not independently verified.
- Security concerns: No obvious secret leakage surfaced in the quick audit, but packaged placeholders and deployment helper artifacts should still be reviewed before public promotion.
- Exact personal contribution: Safe to state Aryan appears to be the primary builder of the multi-cloud prototype, test suite, and Terraform layout.
- Technical depth: `5/5`
- Originality and ownership: `4/5`
- Evidence quality: `5/5`
- Career relevance: `5/5`
- Product completeness: `4/5`
- Presentation readiness: `4/5`
- Recommended tier: `DETAILED DOSSIER`
- Decision: `APPROVE`

## Private and Local Project Audit

- The current public GitHub flagship review remains provisional.
- The owner reports at least six private repositories that do not appear in the public GitHub inventory used for the first audit pass.
- Search scope for this section: `C:\Users\aryan\OneDrive\Desktop`, `C:\Users\aryan\OneDrive\Documents`, and `C:\Users\aryan\Documents`.
- Lightweight checks only: Git remote inspection, commit history, Git status, package and build-script inspection, test discovery, existing report inspection, and artifact review.
- No expensive full-system tests were run for this section.
- Evidence labels in this section mean:
  - `Tests present`: test files, harnesses, or validation scripts exist in the workspace.
  - `Last known test results`: a local report or document claims earlier pass or fail state.
  - `Test executed during this audit`: always `No` in this section.
  - `Runtime behavior independently verified`: only `Yes, previously reported` when a local artifact documents a prior successful run.

### Repository Classification Rules Used Here

- `CONFIRMED PRIVATE GITHUB REPOSITORY`: local repo has a GitHub remote, `git ls-remote origin` resolves from this machine, and the repo does not appear in the unauthenticated public GitHub inventory used in the public audit.
- `LOCAL-ONLY PROJECT`: a local workspace exists but no Git metadata or remote could be verified.
- `PUBLIC REPOSITORY UNDER A DIFFERENT NAME`: a local workspace maps to a differently named public repository.
- `FORK OR EXTERNAL CODEBASE WITH LOCAL MODIFICATIONS`: a local workspace maps to a public fork or upstream-derived codebase with local delta.
- `REPOSITORY STATUS UNKNOWN`: no local workspace surfaced, or the remote could not be verified.

### Auxilium Digital Archive

- Local project name: `Chaos`
- Canonical proposed name: `Auxilium Digital Archive`
- Local path: `C:\Users\aryan\OneDrive\Desktop\Chaos`
- Classification: `CONFIRMED PRIVATE GITHUB REPOSITORY`
- Git remote configuration: `origin -> https://github.com/Keninjavelas/Chaos.git`
- Repository visibility: Confirmed private GitHub repository; the remote resolves locally and is absent from the public inventory.
- Maps to an audited public repository: No.
- Solo or team ownership: `1` visible author.
- Dates: `2026-06-22` to `2026-08-04`
- Current status: Active local development with an intentionally unfinished launch surface and a dirty worktree.
- Purpose: Immersive engineering portfolio presented as a navigable archive facility.
- Exact personal contribution: Safe to state Aryan is the primary author of the current local codebase, scene structure, archive systems, and design documents.
- Technology stack: `Next.js 16`, `React 19`, `TypeScript`, `Three.js`, `React Three Fiber`, `Zustand`, `Tailwind CSS`
- Implemented subsystems: First-person room navigation, intro flow, archive bootstrap, persistence modules, observation and panic-detection logic, room-specific props, document overlays, manifest validation utilities, and multi-route content surfaces.
- Incomplete or planned work: Final content approval, launch assets, production deployment, and stronger automated verification.
- Tests present: Lightweight validation utilities such as `src/data/validatePortfolioData.ts` and `src/runtime_check.ts`.
- Last known test results: No standalone local pass report found.
- Test executed during this audit: `No`
- Runtime behavior independently verified: `No`
- CI/CD configuration: No GitHub Actions or CI pipeline surfaced.
- Docker, Terraform, Kubernetes, or deployment files: No container or IaC files surfaced in the local workspace.
- Screenshots and diagrams: Public image assets plus design and architecture docs exist; curated launch screenshots are still missing.
- Demonstration or deployment evidence: Private GitHub remote exists; no approved live production URL exists yet.
- Commit-history evidence: `4` commits, `1` author, active dirty worktree.
- Known limitations: Content is still being reconciled from the GitHub-first audit and the launch asset set is incomplete.
- Security or privacy concerns: No obvious secret leakage surfaced in the local workspace review.
- Whether selected material may be shown publicly: Yes, after project-copy and asset approval; no private phone or undeployed links should be exposed.
- Existing portfolio manifest mapping: `project-auxilium`
- Risk of overstatement: Moderate if presented as a finished deployed product rather than an advanced in-progress flagship.
- Technical depth: `4/5`
- Originality and ownership: `5/5`
- Evidence quality: `4/5`
- Career relevance: `5/5`
- Product completeness: `3/5`
- Presentation readiness: `4/5`
- Provisional tier: `FLAGSHIP`

### Metis

- Local project name: `Metis`
- Canonical proposed name: `Metis`
- Local path: `C:\Users\aryan\OneDrive\Desktop\Metis`
- Classification: `CONFIRMED PRIVATE GITHUB REPOSITORY`
- Git remote configuration: `origin -> https://github.com/Keninjavelas/Metis.git`
- Repository visibility: Confirmed private GitHub repository; the remote resolves locally and is absent from the public inventory.
- Maps to an audited public repository: No.
- Solo or team ownership: `1` visible author.
- Dates: `2026-06-04` to `2026-07-02`
- Current status: Large active private repo with a dirty worktree and a documented partial-pass gate report.
- Purpose: AI-native solution engineering workspace for turning raw briefs into validated architecture artifacts and deployable outputs.
- Exact personal contribution: Safe to state Aryan appears to be the primary builder of the web app, API, workflow engine, artifact generation path, and architecture tooling.
- Technology stack: `Next.js 15`, `React 19`, `FastAPI`, `Python`, `PostgreSQL`, `Redis`, `Docker`, `Railway`, `Vercel`
- Implemented subsystems: Web dashboard, FastAPI backend, auth and traceability layers, workflow orchestration, Terraform generation and remediation services, constraint engine, artifact bundling, architecture diagram generation, and generated report artifacts.
- Incomplete or planned work: Real LLM validation, Docker verification, frontend browser verification, and active new subsystems already visible as uncommitted changes.
- Tests present: Extensive API test suite plus Playwright-style web capture assets.
- Last known test results: `GATE_REPORT.md` records Gate 1, 2, 5, 6, and 7 as `PASS`, Gate 3 as `PARTIAL PASS`, Gate 4 as `NOT RUN`, and overall readiness `85/100`.
- Test executed during this audit: `No`
- Runtime behavior independently verified: `No`
- CI/CD configuration: No active workflow suite was confirmed from the checked workspace state.
- Docker, Terraform, Kubernetes, or deployment files: `docker-compose.yml`, `Dockerfile`, `Dockerfile.web`, `railway.toml`, `vercel.json`, and Dockerfiles under `infrastructure/docker/`.
- Screenshots and diagrams: Large set of generated architecture diagrams, SVGs, PNGs, DOCX reports, and PDF outputs under `apps/api/data/artifacts/`.
- Demonstration or deployment evidence: Generated architecture artifacts and gate report exist; no public live deployment was verified.
- Commit-history evidence: `24` commits, `1` author, heavily dirty worktree.
- Known limitations: README marketing claims outrun the currently verified runtime evidence, and the repo is mid-flight with many uncommitted additions.
- Security or privacy concerns: No obvious live secret leakage surfaced; keep generated customer-style artifacts reviewed before public release.
- Whether selected material may be shown publicly: Yes, with redaction discipline and after choosing a stable narrative around the validated gates.
- Existing portfolio manifest mapping: No current direct mapping.
- Risk of overstatement: Moderate to high if presented as fully production-ready or fully autonomous rather than as a validated private prototype.
- Technical depth: `5/5`
- Originality and ownership: `5/5`
- Evidence quality: `4/5`
- Career relevance: `5/5`
- Product completeness: `4/5`
- Presentation readiness: `4/5`
- Provisional tier: `FLAGSHIP`

### Reconcilyx

- Local project name: `Reconcilyx`
- Canonical proposed name: `Reconcilyx`
- Local path: `C:\Users\aryan\OneDrive\Desktop\Reconcilyx`
- Classification: `CONFIRMED PRIVATE GITHUB REPOSITORY`
- Git remote configuration: `origin -> https://github.com/Keninjavelas/Reconcilyx.git`
- Repository visibility: Confirmed private GitHub repository; the remote resolves locally and is absent from the public inventory.
- Maps to an audited public repository: No.
- Solo or team ownership: `1` visible author.
- Dates: `2026-06-21` to `2026-07-02`
- Current status: Honest beta-stage Kubernetes optimization prototype with a dirty worktree and explicit release-posture docs.
- Purpose: Kubernetes optimization system focused on cost, carbon, right-sizing, rollback safety, and operator-driven proposal workflows.
- Exact personal contribution: Safe to state Aryan appears to be the primary builder of the operator, engine, UI, CLI, docs, and validation surfaces currently visible.
- Technology stack: `Go`, `Kubernetes operator patterns`, `Helm`, `Docker`, `Vite/React UI`, `GitOps`, multi-cloud pricing and carbon integrations
- Implemented subsystems: CRDs, controllers, proposal lifecycle, rollback snapshots, analyzer layer, federated learning modules, live pricing and carbon providers, ChatOps surfaces, CLI actions, UI console, GitOps helpers, and validation docs.
- Incomplete or planned work: The project openly defers eBPF streaming and node consolidation actuation to `v5.0`; it should not be described as production-ready.
- Tests present: Broad Go unit, integration, controller, telemetry, policy, RL, federated, and e2e tests.
- Last known test results: README and `STATUS.md` state `go build ./...`, `go test ./...`, and UI build checks are passing for `v4.0.0-beta`.
- Test executed during this audit: `No`
- Runtime behavior independently verified: `No`
- CI/CD configuration: `.github/workflows/build.yml`, `lint.yml`, `test.yml`, and `test-e2e.yml`
- Docker, Terraform, Kubernetes, or deployment files: Root `Dockerfile`, Helm `charts/`, `kind-spoke.yaml`, webhook manifests, workload manifests, and containerized demo assets.
- Screenshots and diagrams: `artifacts/screenshots/execution_demo.webp`, `grafana_cpu_drop.png`, plus architecture and validation docs.
- Demonstration or deployment evidence: Validation docs, screenshots, and build or test claims exist; no live production cluster was verified in this audit.
- Commit-history evidence: `5` commits, `1` author, active dirty worktree.
- Known limitations: Strong prototype posture is clearly documented; some pillars are still partial or deferred.
- Security or privacy concerns: No obvious secret leakage surfaced in the local review.
- Whether selected material may be shown publicly: Yes, especially the architecture docs, screenshots, and beta-status narrative.
- Existing portfolio manifest mapping: No current direct mapping.
- Risk of overstatement: Low to moderate if the public narrative stays aligned with the repo's own `beta` language.
- Technical depth: `5/5`
- Originality and ownership: `5/5`
- Evidence quality: `5/5`
- Career relevance: `5/5`
- Product completeness: `4/5`
- Presentation readiness: `4/5`
- Provisional tier: `FLAGSHIP`

### YatinVeda

- Local project name: `YatinVeda`
- Canonical proposed name: `YatinVeda`
- Local path: `C:\Users\aryan\OneDrive\Desktop\YatinVeda`
- Classification: `CONFIRMED PRIVATE GITHUB REPOSITORY`
- Git remote configuration: `origin -> https://github.com/Keninjavelas/YatinVeda.git`
- Repository visibility: Confirmed private GitHub repository; the remote resolves locally and is absent from the public inventory.
- Maps to an audited public repository: No.
- Solo or team ownership: `1` visible author.
- Dates: `2026-02-08` to `2026-08-06`
- Current status: Large clean private repo in active MVP hardening with broad product and testing surfaces.
- Purpose: Vedic wellness platform combining practitioner workflows, booking, digital prescriptions, and AI assistance.
- Exact personal contribution: Safe to state Aryan appears to be the primary builder of the backend, frontend, mobile, deployment, observability, and testing surfaces visible in the local repo.
- Technology stack: `FastAPI`, `Next.js`, mobile app code, `Docker Compose`, `Kubernetes`, `Render`, `Qdrant`, `LangChain`, observability stack components
- Implemented subsystems: Auth and MFA, booking and payment flows, AI chat, retrieval, digital prescriptions with QR verification, community features, mobile tests, deployment guides, monitoring, and containerized local dev.
- Incomplete or planned work: Broad zero-cost production claims and operator-grade deployment posture were not independently verified in this audit.
- Tests present: Large backend, frontend, mobile, integration, performance, and security test surface plus dedicated validation modules.
- Last known test results: `VALIDATION_COMPLETION_SUMMARY.md` reports `58` chart-validation tests passing, around `90%` coverage for the core validation logic, and no regressions for that feature slice.
- Test executed during this audit: `No`
- Runtime behavior independently verified: `No`
- CI/CD configuration: `.github/workflows/build.yml`, `ci.yml`, and `test.yml`
- Docker, Terraform, Kubernetes, or deployment files: `render.yaml`, `kubernetes/`, proxy Dockerfiles, container-start scripts, and deployment guides.
- Screenshots and diagrams: QR outputs, generated prescription artifacts, validation docs, and multiple product and technical docs.
- Demonstration or deployment evidence: Deployment docs and generated outputs exist; no public production environment was verified.
- Commit-history evidence: `81` commits, `1` author, clean worktree.
- Known limitations: The repo includes tracked `.env` files and domain-sensitive data artifacts; this requires stricter public-redaction discipline than most other candidates.
- Security or privacy concerns: High sensitivity due health or wellness domain framing plus tracked environment files and test databases.
- Whether selected material may be shown publicly: Yes, but only with synthetic or redacted data and without exposing any secret-bearing files.
- Existing portfolio manifest mapping: No current direct mapping.
- Risk of overstatement: Moderate to high if framed as a production healthcare-grade platform instead of a substantial MVP or prototype.
- Technical depth: `5/5`
- Originality and ownership: `4/5`
- Evidence quality: `4/5`
- Career relevance: `3/5`
- Product completeness: `4/5`
- Presentation readiness: `3/5`
- Provisional tier: `DETAILED DOSSIER`

### Word Extension

- Local project name: `Word Extension`
- Canonical proposed name: `Word Extension`
- Local path: `C:\Users\aryan\OneDrive\Desktop\Word Extension`
- Classification: `LOCAL-ONLY PROJECT`
- Git remote configuration: None found.
- Repository visibility: Local-only project; no Git history or remote surfaced.
- Maps to an audited public repository: No.
- Solo or team ownership: Likely solo, but commit history is unavailable because the folder is not a Git repo.
- Dates: Commit-history dates unavailable; strong QA evidence is dated `2026-08-06`.
- Current status: `v0.2.0` QA freeze with unusually strong local test harness evidence.
- Purpose: Microsoft Word Office Add-in for document analysis, guided editing, and safe command-plan execution.
- Exact personal contribution: Safe to state Aryan appears to be the primary builder of the add-in, local interpreter, and Word-specific QA harness visible in the workspace.
- Technology stack: `TypeScript`, `React`, `Office.js`, `Webpack`, `Vitest`, PowerShell automation
- Implemented subsystems: Task pane UI, local interpreter, command plans, OpenAI-compatible provider hook, same-origin QA relay, task-pane bridge, native PowerShell QA automation, and structured report generation.
- Incomplete or planned work: Final human acceptance gate for the live Word desktop experience still remains.
- Tests present: `vitest` tests plus a dedicated `tools/word-qa` harness and structured reports.
- Last known test results: `TESTING.md` reports `npm run lint`, `npm run build`, and `npm start` as passing on `2026-08-06`; `tools/word-qa/reports/latest.md` records a successful automated live task-pane relay and analyze-document pass.
- Test executed during this audit: `No`
- Runtime behavior independently verified: `Yes, previously reported`
- CI/CD configuration: None found.
- Docker, Terraform, Kubernetes, or deployment files: `manifest.xml` and local bundling or sideload tooling; no cloud deployment layer is required.
- Screenshots and diagrams: Asset folder plus detailed QA evidence bundles; a polished public hero asset set is still missing.
- Demonstration or deployment evidence: Rich local QA reports and JSON evidence bundles, including Word launch, relay handshake, and task-pane checks.
- Commit-history evidence: Unavailable because the folder is not a Git repo.
- Known limitations: No Git history, no remote, and the final release gate still requires manual desktop acceptance.
- Security or privacy concerns: Keep live Office session artifacts and any document-derived evidence private unless redacted.
- Whether selected material may be shown publicly: Yes, after curating screenshots and excluding sensitive local paths or documents.
- Existing portfolio manifest mapping: No current direct mapping.
- Risk of overstatement: Moderate if framed as fully shipped or publicly distributed before a stable repo or distribution surface exists.
- Technical depth: `4/5`
- Originality and ownership: `4/5`
- Evidence quality: `5/5`
- Career relevance: `4/5`
- Product completeness: `4/5`
- Presentation readiness: `4/5`
- Provisional tier: `DETAILED DOSSIER`

### Fashion Feet

- Local project name: `Fashion Feet`
- Canonical proposed name: `Fashion Feet`
- Local path: `C:\Users\aryan\OneDrive\Desktop\Fashion Feet`
- Classification: `LOCAL-ONLY PROJECT`
- Git remote configuration: None found.
- Repository visibility: Local-only project; no Git history or remote surfaced.
- Maps to an audited public repository: No.
- Solo or team ownership: Unknown from available evidence.
- Dates: Commit-history dates unavailable; a local runtime-error artifact shows recent active local execution attempts.
- Current status: Substantial local Next.js storefront or admin workspace, but currently unstable and not presentation-ready.
- Purpose: Fashion or footwear storefront with product, admin, profile, media, checkout, and auth flows.
- Exact personal contribution: Safe to say Aryan appears to own at least a meaningful portion of the current local implementation, but authorship cannot be bounded without Git history.
- Technology stack: `Next.js 16`, `React 19`, `TypeScript`, `NextAuth`, `Prisma`, `SQLite/libSQL`, `Zustand`
- Implemented subsystems: Product pages, storefront navigation, checkout and account flows, admin panel, MFA screens, media actions, and visually elaborate home-page components.
- Incomplete or planned work: Stable Prisma runtime wiring, improved documentation, and stronger evidence of testing and deployment.
- Tests present: JSON fixture files only; no clear first-party automated test suite surfaced.
- Last known test results: `error.html` captures a local `PrismaClientConstructorValidationError`, which is negative runtime evidence rather than a pass report.
- Test executed during this audit: `No`
- Runtime behavior independently verified: `No`
- CI/CD configuration: None found.
- Docker, Terraform, Kubernetes, or deployment files: No container or IaC layer surfaced.
- Screenshots and diagrams: Only generic or framework-default public assets were obvious in the local review.
- Demonstration or deployment evidence: No verified deployment or positive run report surfaced; the strongest runtime artifact is currently a failure snapshot.
- Commit-history evidence: Unavailable because the folder is not a Git repo.
- Known limitations: Generic README, no repo metadata, and current runtime failure make this an unreliable flagship or dossier candidate.
- Security or privacy concerns: Tracked `.env` file and local database file require caution.
- Whether selected material may be shown publicly: Only after cleaning environment handling and capturing working UI evidence.
- Existing portfolio manifest mapping: Historical Fashion Feet references only; no current direct manifest mapping in the audit.
- Risk of overstatement: High if presented as polished, deployed, or fully stable.
- Provisional tier: `ARCHIVE RECORD`

### Hermes

- Local project name: `Hermes`
- Canonical proposed name: `Hermes`
- Local path: `C:\Users\aryan\OneDrive\Desktop\Hermes`
- Classification: `LOCAL-ONLY PROJECT`
- Git remote configuration: None found.
- Repository visibility: Local-only workspace with minimal surfaced implementation.
- Maps to an audited public repository: No.
- Solo or team ownership: Unknown from available evidence.
- Dates: Unknown.
- Current status: Thin local AI-workspace artifact rather than a fully inspectable software project.
- Purpose: The visible material suggests a local AI execution-policy and prompt workspace.
- Exact personal contribution: Only safe to say Aryan appears to own the visible local prompt material.
- Technology stack: Not safely characterizable from the surfaced files.
- Implemented subsystems: Only `prompts/SOUL.md` was directly surfaced during the audit; `config`, `knowledge`, `logs`, `memory`, `skills`, and `temp` directories exist but were not evidenced as a complete system.
- Incomplete or planned work: Most system-level implementation remains unavailable for source-based review.
- Tests present: None surfaced.
- Last known test results: None surfaced.
- Test executed during this audit: `No`
- Runtime behavior independently verified: `No`
- CI/CD configuration: None surfaced.
- Docker, Terraform, Kubernetes, or deployment files: None surfaced.
- Screenshots and diagrams: None surfaced.
- Demonstration or deployment evidence: None surfaced beyond the execution-policy prompt.
- Commit-history evidence: None available.
- Known limitations: The visible evidence is too thin to support broad claims about local LLM orchestration, memory, or tooling.
- Security or privacy concerns: Unknown due thin evidence.
- Whether selected material may be shown publicly: Only limited prompt-policy excerpts are clearly public-safe.
- Existing portfolio manifest mapping: Partial evidence for `project-hermes-yggdrasil`
- Risk of overstatement: High.
- Provisional tier: `PRIVATE EVIDENCE ONLY`

### Yggdrasil

- Local project name: `Yggdrasil`
- Canonical proposed name: `Yggdrasil`
- Local path: No separate workspace found in the searched roots.
- Classification: `REPOSITORY STATUS UNKNOWN`
- Git remote configuration: None found.
- Repository visibility: Unknown.
- Maps to an audited public repository: No.
- Solo or team ownership: Unknown.
- Dates: Unknown.
- Current status: No separate local workspace surfaced; it may be merged conceptually into `Hermes`, but this audit could not prove that.
- Purpose: Earlier approval docs describe it as part of a local-first AI experimentation and orchestration area.
- Exact personal contribution: Not reassessed in source during this pass.
- Technology stack: Earlier docs mention local LLMs, Ollama, and agent orchestration, but no separate workspace was available to verify them.
- Implemented subsystems: Not inspectable in source during this audit.
- Incomplete or planned work: Unknown.
- Tests present: Unknown.
- Last known test results: Unknown.
- Test executed during this audit: `No`
- Runtime behavior independently verified: `No`
- CI/CD configuration: Unknown.
- Docker, Terraform, Kubernetes, or deployment files: Unknown.
- Screenshots and diagrams: None surfaced beyond earlier manifest placeholders.
- Demonstration or deployment evidence: None surfaced in the searched local roots.
- Commit-history evidence: None available.
- Known limitations: No separate workspace means the project cannot compete fairly in the shortlist yet.
- Security or privacy concerns: Unknown.
- Whether selected material may be shown publicly: Not enough surfaced evidence to decide.
- Existing portfolio manifest mapping: Partial evidence for `project-hermes-yggdrasil`
- Risk of overstatement: High.
- Provisional tier: `PRIVATE EVIDENCE ONLY`

### Understanding Studio

- Local project name: `Understanding Studio`
- Canonical proposed name: `Understanding Studio`
- Local path: No separate workspace found in the searched roots.
- Classification: `REPOSITORY STATUS UNKNOWN`
- Git remote configuration: None found.
- Repository visibility: Unknown.
- Maps to an audited public repository: No.
- Solo or team ownership: Unknown.
- Dates: Unknown.
- Current status: Mentioned repeatedly in approval docs and manifest text, but no inspectable local source workspace surfaced in this audit.
- Purpose: Earlier approved wording describes a deterministic media pipeline for visuals, narration, motion, and episode assembly.
- Exact personal contribution: Not reassessed in source during this pass.
- Technology stack: Earlier docs mention image generation, `Edge-TTS`, `FFmpeg`, and deterministic assembly pipelines.
- Implemented subsystems: Not inspectable in source during this audit.
- Incomplete or planned work: Unknown from local source because the workspace was not found.
- Tests present: Unknown.
- Last known test results: Unknown.
- Test executed during this audit: `No`
- Runtime behavior independently verified: `No`
- CI/CD configuration: Unknown.
- Docker, Terraform, Kubernetes, or deployment files: Unknown.
- Screenshots and diagrams: Only placeholder asset references surfaced in the manifest.
- Demonstration or deployment evidence: None inspectable in a local project folder during this pass.
- Commit-history evidence: None available.
- Known limitations: Strong prior content-approval wording exists, but it is not yet backed by a surfaced local codebase in this audit.
- Security or privacy concerns: Unknown.
- Whether selected material may be shown publicly: Not enough surfaced evidence to approve public-facing project detail yet.
- Existing portfolio manifest mapping: `project-understanding-studio`
- Risk of overstatement: High until the workspace or curated artifact set is surfaced.
- Provisional tier: `PRIVATE EVIDENCE ONLY`

### MediaOps

- Local project name: `MediaOps`
- Canonical proposed name: `MediaOps`
- Local path: No separate workspace found in the searched roots.
- Classification: `REPOSITORY STATUS UNKNOWN`
- Git remote configuration: None found.
- Repository visibility: Unknown.
- Maps to an audited public repository: No.
- Solo or team ownership: Unknown.
- Dates: Unknown.
- Current status: Mentioned in approval docs and manifest text, but not surfaced as an inspectable local folder during this audit.
- Purpose: Earlier approved wording describes homelab-style download monitoring, classification, organization, and self-hosted media automation.
- Exact personal contribution: Not reassessed in source during this pass.
- Technology stack: Earlier docs tie it to Python automation and project-scoped `pytest` usage, but the codebase was not surfaced.
- Implemented subsystems: Not inspectable in source during this audit.
- Incomplete or planned work: Unknown from local source because the workspace was not found.
- Tests present: Unknown.
- Last known test results: Unknown.
- Test executed during this audit: `No`
- Runtime behavior independently verified: `No`
- CI/CD configuration: Unknown.
- Docker, Terraform, Kubernetes, or deployment files: Unknown.
- Screenshots and diagrams: Only placeholder asset references surfaced in the manifest.
- Demonstration or deployment evidence: None inspectable in a local project folder during this pass.
- Commit-history evidence: None available.
- Known limitations: Earlier content evidence exists, but it is not yet backed by a surfaced local codebase in this audit.
- Security or privacy concerns: Unknown.
- Whether selected material may be shown publicly: Not enough surfaced evidence to approve a stronger public tier yet.
- Existing portfolio manifest mapping: `project-mediaops`
- Risk of overstatement: High until the workspace or curated artifact set is surfaced.
- Provisional tier: `PRIVATE EVIDENCE ONLY`

### Additional Local Project Directories Found

#### Expense-Tracker Local Folder

- Local project name: `Expense-Tracker`
- Canonical proposed name: `Expense-Tracker`
- Local path: `C:\Users\aryan\OneDrive\Documents\GitHub\Expense-Tracker`
- Classification: `REPOSITORY STATUS UNKNOWN`
- Git remote configuration: `origin -> https://github.com/Keninjavelas/Expense-Tracker-Website.git`
- Repository visibility: Unknown; `git ls-remote origin` reported repository not found.
- Maps to an audited public repository: No confirmed mapping.
- Solo or team ownership: Unknown.
- Dates: Local history shows `1` commit on `2025-05-07`.
- Current status: Thin local stub with only a README and a broken or renamed remote.
- Purpose: Unknown from the currently surfaced folder.
- Exact personal contribution: Not safely characterizable.
- Technology stack: Unknown.
- Implemented subsystems: None surfaced.
- Incomplete or planned work: Unknown.
- Tests present: None surfaced.
- Last known test results: None surfaced.
- Test executed during this audit: `No`
- Runtime behavior independently verified: `No`
- CI/CD configuration: None surfaced.
- Docker, Terraform, Kubernetes, or deployment files: None surfaced.
- Screenshots and diagrams: None surfaced.
- Demonstration or deployment evidence: None surfaced.
- Commit-history evidence: `1` commit, remote unresolved.
- Known limitations: Too little evidence to keep this in the shortlist.
- Security or privacy concerns: None obvious.
- Whether selected material may be shown publicly: Not enough surfaced material.
- Existing portfolio manifest mapping: None.
- Risk of overstatement: High.
- Provisional tier: `OMIT`

#### Playground

- Local project name: `Playground`
- Canonical proposed name: `Playground`
- Local path: `C:\Users\aryan\OneDrive\Documents\Playground`
- Classification: `REPOSITORY STATUS UNKNOWN`
- Git remote configuration: No usable remote or commit history surfaced.
- Repository visibility: Unknown.
- Maps to an audited public repository: No.
- Solo or team ownership: Unknown.
- Dates: No commits surfaced.
- Current status: Empty or near-empty local Git shell rather than a demonstrable project.
- Purpose: Unknown.
- Exact personal contribution: Not characterizable.
- Technology stack: Unknown.
- Implemented subsystems: None surfaced.
- Incomplete or planned work: Unknown.
- Tests present: None surfaced.
- Last known test results: None surfaced.
- Test executed during this audit: `No`
- Runtime behavior independently verified: `No`
- CI/CD configuration: None surfaced.
- Docker, Terraform, Kubernetes, or deployment files: None surfaced.
- Screenshots and diagrams: None surfaced.
- Demonstration or deployment evidence: None surfaced.
- Commit-history evidence: No commits surfaced.
- Known limitations: Not a shortlist candidate in its current state.
- Security or privacy concerns: Unknown.
- Whether selected material may be shown publicly: Not enough surfaced material.
- Existing portfolio manifest mapping: None.
- Risk of overstatement: High.
- Provisional tier: `OMIT`

## Combined Public and Private Candidate Comparison

| Project | Source | Visibility or status | Strongest evidence currently surfaced | Main caution | Provisional tier |
| --- | --- | --- | --- | --- | --- |
| `InfraMind` | Public repo | Public original repo | Marketplace listing, website, parser tests, workflows, extension UI, architecture docs | Runtime not executed in this audit | `FLAGSHIP` |
| `Poseidon` | Public repo | Public original repo | Multi-service code, tests, CI, Docker, Kubernetes, frontend plus edge AI | Media and live deployment proof are light | `FLAGSHIP` |
| `Auxilium Digital Archive` | Private repo + local workspace | Confirmed private GitHub repo | Strong original portfolio codebase, scene system, architecture docs, approved narrative direction | No CI or approved live deployment yet | `FLAGSHIP` |
| `Metis` | Private repo + local workspace | Confirmed private GitHub repo | Gate report, generated architecture artifacts, multi-service app, workflow engine | README ambition outruns fully verified runtime proof | `FLAGSHIP` |
| `Reconcilyx` | Private repo + local workspace | Confirmed private GitHub repo | Beta docs, tests, workflows, screenshots, honest release posture | Still beta, not production-ready | `FLAGSHIP` |
| `Ghost-Protocol` | Public repo | Public original repo | Large cybersecurity module set, dashboard asset, Docker packaging | No clear automated test proof, tracked `.env`, noisy repo hygiene | `DETAILED DOSSIER` |
| `DayOne-AI` | Public repo | Public original repo | Real first-party tests, retrieval or routing services, multi-week history | Checked-in virtual envs distort the evidence surface | `DETAILED DOSSIER` |
| `Student-OS` | Public repo | Public original repo | Backend, frontend, AI service, tests, workflows, Terraform, long dev span | Tracked `.env` files and broad product claims | `DETAILED DOSSIER` |
| `MultiCloud-Serverless-Analytics` | Public repo | Public original repo | Strong tests, CI workflows, Terraform modules, docs, dashboard image | Live deployment not independently verified | `DETAILED DOSSIER` |
| `YatinVeda` | Private repo + local workspace | Confirmed private GitHub repo | Large codebase, broad tests, deployment docs, validation summary | Sensitive domain plus tracked env and data artifacts | `DETAILED DOSSIER` |
| `Word Extension` | Local workspace | Local-only project | Word QA harness, automated evidence reports, Office add-in source, manual QA notes | No Git history and final human release gate still remains | `DETAILED DOSSIER` |
| `GCP-OmniStream` | Public repo | Public original repo | Screenshots, docs, workflows, service code | Very short development span and no live proof | `ARCHIVE RECORD` |
| `AWS-CloudOps` | Public repo | Public original repo | Clear scanner and remediation code plus tests | Only three commits, no CI or live proof | `ARCHIVE RECORD` |
| `AWS-Helix-Data-Lakehouse` | Public repo | Public original repo | Diagrams, lambda and Terraform prototype | One commit and no tests | `ARCHIVE RECORD` |
| `Fashion Feet` | Local workspace | Local-only project | Large storefront code surface and admin flows | Local runtime failure, generic README, no Git evidence | `ARCHIVE RECORD` |
| `Hermes` | Local workspace | Local-only project | One visible prompt-policy file | Too little surfaced implementation for a software-project tier | `PRIVATE EVIDENCE ONLY` |
| `Yggdrasil` | Not surfaced locally | Repository status unknown | Prior approval-doc references only | No separate workspace was found | `PRIVATE EVIDENCE ONLY` |
| `Understanding Studio` | Not surfaced locally | Repository status unknown | Prior approval-doc references to FFmpeg and Edge-TTS pipeline work | No local code workspace surfaced in this audit | `PRIVATE EVIDENCE ONLY` |
| `MediaOps` | Not surfaced locally | Repository status unknown | Prior approval-doc references to automation and `pytest` evidence | No local code workspace surfaced in this audit | `PRIVATE EVIDENCE ONLY` |
| `Expense-Tracker` local folder | Local repo shell | Repository status unknown | Only a README and one commit surfaced | Remote is unresolved and the project has no shortlist-grade evidence | `OMIT` |
| `Playground` | Local repo shell | Repository status unknown | No meaningful project surface found | Empty or near-empty repo shell | `OMIT` |

## Final Portfolio Selection Board

- This section supersedes the earlier five-flagship provisional shortlist and is the first board intended to drive final project selection.
- No expensive runtime verification was performed for this board. Scores reflect repository inspection, local-workspace inspection, lightweight validation evidence, and previously reported test artifacts only.
- As of `2026-08-07`, the `InfraMind` site at [infra-site-three.vercel.app](https://infra-site-three.vercel.app/) returned HTTP `200`. The Marketplace evidence is conflicting: a readable Marketplace page was surfaced during web inspection, but a direct `HEAD` request to the listing URL returned `404`, so Marketplace status must be manually reconfirmed before launch copy relies on it.

### Scorecard

| Project | Technical depth | Originality and ownership | Evidence quality | Career relevance | Product completeness | Presentation readiness | Total | Provisional selection |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `InfraMind` | `5` | `4` | `4` | `5` | `4` | `4` | `26/30` | `FLAGSHIP EXHIBIT` |
| `Auxilium Digital Archive` | `4` | `5` | `4` | `5` | `4` | `4` | `26/30` | `FLAGSHIP EXHIBIT` |
| `Poseidon` | `5` | `4` | `4` | `5` | `4` | `3` | `25/30` | `FLAGSHIP EXHIBIT` |
| `Metis` | `5` | `4` | `3` | `5` | `3` | `3` | `23/30` | `DETAILED DOSSIER` |
| `Multi-Cloud Serverless Analytics` | `4` | `4` | `4` | `5` | `3` | `3` | `23/30` | `DETAILED DOSSIER` |
| `Word Extension` | `4` | `5` | `4` | `4` | `3` | `3` | `23/30` | `DETAILED DOSSIER` |
| `DayOne AI` | `4` | `4` | `3` | `4` | `3` | `2` | `20/30` | `DETAILED DOSSIER` |
| `Ghost Protocol` | `4` | `3` | `2` | `4` | `3` | `2` | `18/30` | `DETAILED DOSSIER` |
| `Student OS` | `4` | `3` | `3` | `4` | `3` | `2` | `19/30` | `ARCHIVE RECORD` |
| `YatinVeda` | `5` | `4` | `3` | `5` | `3` | `2` | `22/30` | `ARCHIVE RECORD` |
| `Reconcilyx` | `3` | `4` | `2` | `3` | `2` | `3` | `17/30` | `ARCHIVE RECORD` |

### Candidate Notes

#### InfraMind

- Canonical name and status: `InfraMind` - public original repository with public website and a Marketplace listing that needs manual reconfirmation.
- Product purpose: Local-first infrastructure cognition layer for Terraform, Kubernetes, and Docker, delivered through a VS Code extension plus backend analyzers.
- Exact personal contribution and ownership: Safe wording is that Aryan appears to be the primary builder of the extension UX, parser backend, test fixtures, docs, and website; ownership appears solo from the public surface, but commit-by-commit attribution was not completed.
- Implemented features supported by source: Deterministic parsing, diagnostics, hover intelligence, topology visualization assets, backend analyzer modules, workflows, and extension packaging are all visible in source.
- Runtime or test evidence: Parser fixtures and test assets are present, along with `.github/workflows/extension.yml`, `lint.yml`, and `regression.yml`; the full runtime was not independently executed during this audit.
- Existing screenshots, diagrams, demos, and public-safe assets: Logo assets, screenshots, `assets/mermaid_topology.png`, and `docs/architecture/system-design.md` are public-safe and already usable.
- Repository or case-study availability: Public GitHub repository and live website exist; Marketplace presence is plausible but not yet cleanly revalidated.
- Career relevance: Strong fit for platform engineering, DevOps tooling, cloud infrastructure, and developer experience.
- Distinction from other candidates: Strongest pure devtools and infrastructure-analysis story in the set.
- Overlap and primary narrative served: Slight overlap with `Multi-Cloud Serverless Analytics` on infrastructure themes, but it serves a clearer `platform engineering + infrastructure intelligence` narrative.
- Main weakness, overstatement risk, and launch blockers: Main weakness is incomplete runtime verification and conflicting Marketplace evidence; overstatement risk is low to moderate if claims stay tied to visible extension behavior; blockers are a fresh demo capture, one clean build or test confirmation, and a manual Marketplace recheck.

#### Auxilium Digital Archive

- Canonical name and status: `Auxilium Digital Archive` - confirmed private GitHub repository with local workspace under `Chaos`.
- Product purpose: Interactive first-person WebGL developer portfolio that turns resume content into an explorable archive environment.
- Exact personal contribution and ownership: Safe wording is that Aryan is the solo original builder of the scene system, portfolio architecture, interaction model, content pipeline, and launch-direction documents visible in the workspace.
- Implemented features supported by source: Scene routing, player movement, interaction state, document inspection flow, environmental storytelling structure, and the approved content-validation utilities are all present.
- Runtime or test evidence: Lightweight verification exists through `src/data/validatePortfolioData.ts` and `src/runtime_check.ts`; no full CI, no public deployment, and no fresh runtime walk-through were independently verified during this audit.
- Existing screenshots, diagrams, demos, and public-safe assets: Public-safe environment images and architecture or design docs exist, but curated hero screenshots and a polished walkthrough capture still need to be produced.
- Repository or case-study availability: Private repository only; this is acceptable if the public launch uses approved screenshots, architecture diagrams, and a strong technical case study.
- Career relevance: Strong fit for frontend systems, interactive graphics, product design, and original portfolio execution.
- Distinction from other candidates: Only candidate that clearly demonstrates an original WebGL portfolio experience rather than a conventional app or infrastructure system.
- Overlap and primary narrative served: Minimal overlap with the rest of the shortlist; it serves the `interactive systems + product sensibility + technical storytelling` narrative.
- Main weakness, overstatement risk, and launch blockers: Main weakness is missing launch media rather than missing code; overstatement risk is moderate only if unfinished rooms or unapproved content are presented as final; blockers are screenshot capture, walkthrough approval, and stable public deployment.

#### Poseidon

- Canonical name and status: `Poseidon` - public original repository.
- Product purpose: Real-time digital-twin platform for water management combining ingestion, processing, simulation, and visualization.
- Exact personal contribution and ownership: Safe wording is that Aryan appears to be the primary builder across backend, frontend, edge-AI, containerization, and CI surfaces; solo ownership is likely but not fully attribution-audited.
- Implemented features supported by source: Backend services, tests, frontend application structure, edge AI module, Docker assets, Kubernetes-oriented files, and CI workflow are visible in source.
- Runtime or test evidence: Backend tests exist for environment guards, MQTT, routes, server, and simulation behavior; `.github/workflows/ci-cd.yml` is present; no live deployment or independently rerun stack was verified in this audit.
- Existing screenshots, diagrams, demos, and public-safe assets: Public-safe code, app assets, and architecture narrative exist, but polished screenshots and diagrams are lighter than the code depth.
- Repository or case-study availability: Public GitHub repository is available; no confirmed public deployment was found.
- Career relevance: Strong fit for backend systems, event-driven architecture, distributed processing, and cloud-native services.
- Distinction from other candidates: Best distributed-systems and event-processing story currently backed by visible implementation.
- Overlap and primary narrative served: Some overlap with `Multi-Cloud Serverless Analytics`, but `Poseidon` serves a clearer `real-time backend + digital twin + system orchestration` narrative.
- Main weakness, overstatement risk, and launch blockers: Main weakness is limited presentation media relative to system scope; overstatement risk is moderate if real-time or digital-twin claims outrun the visible modules; blockers are fresh screenshots, one architecture diagram, and at least one runtime validation pass.

#### Metis

- Canonical name and status: `Metis` - confirmed private GitHub repository with local workspace.
- Product purpose: AI-native solution-engineering workspace for turning raw briefs into validated architecture artifacts and deployable outputs.
- Exact personal contribution and ownership: Safe wording is that Aryan appears to be the primary builder of the web dashboard, FastAPI backend, workflow engine, artifact generation path, and architecture tooling; visible history suggests solo ownership.
- Implemented features supported by source: Dashboard, backend APIs, auth and traceability layers, workflow orchestration, Terraform generation, remediation services, constraint engine, artifact bundling, and architecture-diagram generation are all visible.
- Runtime or test evidence: Extensive API tests and capture artifacts exist, and `GATE_REPORT.md` records an overall `85/100` readiness score with one partial pass and one not-run gate; the full stack was not independently rerun during this audit.
- Existing screenshots, diagrams, demos, and public-safe assets: The repo contains many generated diagrams, reports, PDFs, and screenshots that could support a strong case study after redaction.
- Repository or case-study availability: Private repository only; a public case study is feasible, but a stable public-safe story still needs curation.
- Career relevance: Excellent fit for backend systems, automation, architecture tooling, and applied AI workflows.
- Distinction from other candidates: Most substantial private product after `Auxilium`, with stronger systems-automation depth than a typical showcase project.
- Overlap and primary narrative served: Overlaps `InfraMind` on infrastructure intelligence and `Word Extension` on generated artifacts, but serves a broader `solution-engineering platform` narrative.
- Main weakness, overstatement risk, and launch blockers: Main weakness is that product definition is still more complex than the independently verified runtime proof; overstatement risk is moderate to high if presented as fully autonomous or production-ready; blockers are owner-approved narrative tightening, fresh runtime verification, and a public-safe asset selection pass.

#### Multi-Cloud Serverless Analytics

- Canonical name and status: `Multi-Cloud Serverless Analytics` - public original repository currently stored as `MultiCloud-Serverless-Analytics`.
- Product purpose: Multi-cloud event pipeline that ingests on AWS, processes on GCP, and serves analytics through dashboard and utility layers.
- Exact personal contribution and ownership: Safe wording is that Aryan appears to be the primary builder of the Lambda and Cloud Run services, Terraform modules, test suite, and dashboard scaffolding; solo ownership looks likely from the public surface.
- Implemented features supported by source: Lambda handler, Cloud Run service, replay and load tools, dashboard code, validation utilities, and Terraform modules for AWS ingestion, GCP processing, and dashboard infrastructure are all visible.
- Runtime or test evidence: Broad pytest coverage and deploy-oriented workflows exist in `.github/workflows/test.yml`, `deploy-cloudrun.yml`, `deploy-lambda.yml`, and `terraform.yml`; no live public endpoint or successful remote run logs were independently verified.
- Existing screenshots, diagrams, demos, and public-safe assets: `docs/ARCHITECTURE.md`, engineering-decision docs, dashboard image, and repo-safe diagrams already exist.
- Repository or case-study availability: Public GitHub repository exists; a public case-study page is immediately supportable.
- Career relevance: Strong fit for cloud infrastructure, event-driven systems, IaC, and backend engineering.
- Distinction from other candidates: Best explicit multi-cloud and Terraform-backed architecture story in the audited public set.
- Overlap and primary narrative served: Overlaps `Poseidon` on event processing and `InfraMind` on infrastructure topics, but serves the narrower `multi-cloud pipeline + IaC` narrative well.
- Main weakness, overstatement risk, and launch blockers: Main weakness is missing live-deployment proof and lighter visual polish than the implementation depth; overstatement risk is moderate if `production` or `hardened` language is used; blockers are one runtime smoke test and cleaner public screenshots.

#### Word Extension

- Canonical name and status: `Word Extension` - local-only workspace with no surfaced Git history.
- Product purpose: Microsoft Word Office Add-in for document analysis, guided editing, and safe command-plan execution.
- Exact personal contribution and ownership: Safe wording is that Aryan appears to be the primary builder of the task-pane UI, interpreter, QA relay, and Word-specific automation harness; likely solo, though Git attribution is unavailable.
- Implemented features supported by source: Task pane, command plans, OpenAI-compatible provider hook, relay bridge, PowerShell QA automation, and structured evidence reporting are all visible in the workspace.
- Runtime or test evidence: `vitest` plus `tools/word-qa` evidence exist, and `TESTING.md` reports successful lint, build, start, and live task-pane relay checks dated `2026-08-06`; those runs were not re-executed during this audit.
- Existing screenshots, diagrams, demos, and public-safe assets: QA bundles, JSON reports, and local assets exist; public-safe screenshots are possible after redaction, but a polished hero set is not yet curated.
- Repository or case-study availability: No public repo or private remote surfaced; this can still support a local-workspace case study if ownership and screenshots are documented carefully.
- Career relevance: Strong fit for product engineering, productivity tooling, UI integration, and test automation.
- Distinction from other candidates: Most distinctive desktop productivity-tool story in the current audit.
- Overlap and primary narrative served: Slight overlap with `Auxilium` on UX polish and with `Metis` on workflow tooling, but it serves a unique `Office add-in + automation + QA discipline` narrative.
- Main weakness, overstatement risk, and launch blockers: Main weakness is missing repo history and release distribution; overstatement risk is moderate if described as shipped broadly; blockers are screenshot curation, redaction of live document artifacts, and final manual acceptance on Word desktop.

#### DayOne AI

- Canonical name and status: `DayOne AI` - public original repository currently stored as `DayOne-AI`.
- Product purpose: Retrieval-oriented AI workspace for grounded answers over internal data.
- Exact personal contribution and ownership: Safe wording is limited to saying the repo appears original and Aryan appears central to it, but exact contribution language should stay conservative until noisy checked-in environments are separated from first-party code.
- Implemented features supported by source: Multi-component Python app structure, Docker packaging, retrieval-oriented services, and some first-party testing scaffolding are visible.
- Runtime or test evidence: `pytest.ini` and Docker assets are present, but surfaced test counts are polluted by checked-in virtual environments; no CI workflow or live deployment was confirmed.
- Existing screenshots, diagrams, demos, and public-safe assets: The currently surfaced screenshot evidence is dominated by vendored environment assets, so public-safe presentation material is weak today.
- Repository or case-study availability: Public GitHub repository exists, but the repo needs cleanup before it becomes strong public proof.
- Career relevance: Good fit for local AI systems, retrieval, backend services, and applied ML workflows.
- Distinction from other candidates: Strongest current candidate for a retrieval-specific AI dossier.
- Overlap and primary narrative served: Overlaps `Student OS` and `YatinVeda` on applied AI and productized backend patterns, but serves the narrowest `retrieval system` narrative.
- Main weakness, overstatement risk, and launch blockers: Main weakness is evidence noise from checked-in virtual environments; overstatement risk is high if README claims are repeated verbatim; blockers are repo cleanup, first-party asset curation, and clearer ownership wording.

#### Ghost Protocol

- Canonical name and status: `Ghost Protocol` - public original repository currently stored as `Ghost-Protocol`.
- Product purpose: Cybersecurity platform with scanning, policy, graph, remediation, and dashboard components.
- Exact personal contribution and ownership: Safe wording is that Aryan appears to be the primary builder, but the exact split across modules and deployment surfaces still needs commit-level confirmation.
- Implemented features supported by source: Security modules, backend services, graph logic, Docker packaging, and at least one dashboard artifact are visible in source.
- Runtime or test evidence: The repo shows Docker assets and substantial code, but no clean GitHub Actions suite and no clearly isolated first-party automated proof surfaced in the quick audit.
- Existing screenshots, diagrams, demos, and public-safe assets: A dashboard image exists, but architecture diagrams and polished public demo materials are currently thin.
- Repository or case-study availability: Public GitHub repository exists and could support a dossier after tighter verification.
- Career relevance: Good fit for security engineering, backend design, graph reasoning, and cloud remediation workflows.
- Distinction from other candidates: Best security-themed candidate in the current board.
- Overlap and primary narrative served: Overlaps `InfraMind` on infrastructure and policy narratives, but serves the more explicit `security platform` story.
- Main weakness, overstatement risk, and launch blockers: Main weakness is weaker automated proof and noisier repo hygiene than the top candidates; overstatement risk is moderate to high if advanced defense claims are presented broadly; blockers are clearer test evidence, better screenshots, and repo cleanup.

#### Student OS

- Canonical name and status: `Student OS` - public original repository currently stored as `Student-OS`.
- Product purpose: AI-assisted campus recruitment platform spanning backend, frontend, AI-service, and deployment scaffolding.
- Exact personal contribution and ownership: Safe wording is that Aryan appears central to the build, but exact authorship claims should stay conservative until tracked environment artifacts and broad README language are cleaned up.
- Implemented features supported by source: Backend auth and student flows, frontend dashboards and job or mentorship surfaces, AI service, tests, Docker assets, Terraform, and workflows are all visible.
- Runtime or test evidence: Backend and frontend tests plus deployment workflows exist, but tracked `.env` files and noisy dependency surfaces weaken confidence in clean public proof.
- Existing screenshots, diagrams, demos, and public-safe assets: App assets and `ARCHITECTURE.md` exist, but the strongest presentation material still needs curation.
- Repository or case-study availability: Public GitHub repository exists.
- Career relevance: Strong fit for full-stack product engineering and applied AI services.
- Distinction from other candidates: Broadest education-product candidate in the public set.
- Overlap and primary narrative served: Heavy overlap with `DayOne AI` and `YatinVeda`; it serves the `AI product platform` narrative but is not the cleanest representative of that lane.
- Main weakness, overstatement risk, and launch blockers: Main weakness is broad scope relative to cleaned evidence; overstatement risk is high if `production-grade` claims survive unchanged; blockers are env cleanup, narrower scope, and curated visuals.

#### YatinVeda

- Canonical name and status: `YatinVeda` - confirmed private GitHub repository with local workspace.
- Product purpose: Full-stack healthcare-oriented platform with AI, booking, prescriptions, retrieval, and observability components.
- Exact personal contribution and ownership: Safe wording is that Aryan appears to be the primary builder across backend, frontend, mobile, deployment, and observability surfaces; visible history suggests solo ownership.
- Implemented features supported by source: Auth and MFA, booking and payment flows, AI chat, retrieval, prescriptions with QR verification, community features, deployment guides, and mobile tests are visible.
- Runtime or test evidence: Broad tests and validation summaries exist, including `VALIDATION_COMPLETION_SUMMARY.md`, but no public deployment or independently rerun environment was verified.
- Existing screenshots, diagrams, demos, and public-safe assets: Product outputs, QR artifacts, and technical docs exist, but domain sensitivity means asset curation must be especially strict.
- Repository or case-study availability: Private repository only; public case-study material is possible but requires careful privacy review.
- Career relevance: Very strong fit for backend systems, applied AI, observability, and product engineering.
- Distinction from other candidates: Broadest healthcare-domain product in the shortlist.
- Overlap and primary narrative served: Heavy overlap with `DayOne AI` and `Student OS` as a large AI-enabled product platform.
- Main weakness, overstatement risk, and launch blockers: Main weakness is the combination of sensitive domain material and broad unverified deployment claims; overstatement risk is moderate to high; blockers are privacy review, visual redaction, and clearer launch-safe scoping.

#### Reconcilyx

- Canonical name and status: `Reconcilyx` - confirmed private GitHub repository with local workspace, but its currently surfaced scope conflicts with the earlier owner-approved framing of `Reconcilyx` as C or OpenMP performance work.
- Product purpose: The locally surfaced repo reads as a Kubernetes-optimization prototype with policy, rollback, UI, and operator workflows, but this identity must be reconciled with the earlier conversation before public use.
- Exact personal contribution and ownership: Safe wording is only that Aryan appears to be the primary builder of the currently visible private repo surfaces; visible history suggests solo ownership.
- Implemented features supported by source: Controllers, proposal workflows, analyzer modules, GitOps helpers, UI, CLI, validation docs, and screenshots are visible in the local repo.
- Runtime or test evidence: Broad Go tests and workflows are present, and repo docs claim build and test success for `v4.0.0-beta`; none of those runs were independently re-executed during this audit.
- Existing screenshots, diagrams, demos, and public-safe assets: Architecture docs and screenshots exist and appear public-safe if this project identity is confirmed.
- Repository or case-study availability: Private repository only; a case study is possible only after the naming and scope mismatch is resolved.
- Career relevance: Potentially strong for platform engineering and Kubernetes optimization, but weak as a shortlist item until the identity conflict is cleared.
- Distinction from other candidates: If the current repo identity is correct, it is distinct from the rest; if the earlier OpenMP framing is the intended project, the surfaced repo may be a different project entirely.
- Overlap and primary narrative served: Overlaps `InfraMind` and `Multi-Cloud Serverless Analytics` on infrastructure themes while also carrying an unresolved naming conflict.
- Main weakness, overstatement risk, and launch blockers: Main weakness is project-identity ambiguity; overstatement risk is high until owner confirmation resolves whether this repo is the intended `Reconcilyx`; blockers are direct owner confirmation and a decision on whether this belongs in the public portfolio at all.

### Deferred Owner-Evidence Candidates

| Project | Status | Reason it remains on the board | Current action |
| --- | --- | --- | --- |
| `Understanding Studio` | `DEFERRED - OWNER EVIDENCE REQUIRED` | Prior approval history records meaningful FFmpeg, Edge-TTS, and deterministic media-pipeline work, but no local workspace was available during this audit. | Retain as unresolved until the workspace or approved evidence pack is supplied. |
| `MediaOps` | `DEFERRED - OWNER EVIDENCE REQUIRED` | Prior approval history records automation, backend, and `pytest` evidence, but no local workspace was available during this audit. | Retain as unresolved until the workspace or approved evidence pack is supplied. |
| `Yggdrasil` | `DEFERRED - OWNER EVIDENCE REQUIRED` | The project is historically referenced, but no inspectable workspace surfaced and its boundary with `Hermes` is still ambiguous. | Retain as unresolved until owner confirmation separates or merges the names. |

### Selection Report

- Recommended final three flagships: `InfraMind`, `Auxilium Digital Archive`, and `Poseidon`.
- First flagship alternate: `Metis`.
- Second flagship alternate: `Multi-Cloud Serverless Analytics`.
- Recommended five detailed dossiers: `Metis`, `Multi-Cloud Serverless Analytics`, `Word Extension`, `DayOne AI`, and `Ghost Protocol`.
- Archive migrations: `Student OS`, `YatinVeda`, and `Reconcilyx` should move out of the dossier or flagship lane and into the archive unless later owner evidence changes the balance.
- Deferred projects: `Understanding Studio`, `MediaOps`, and `Yggdrasil` remain active but unresolved as `DEFERRED - OWNER EVIDENCE REQUIRED`.
- Projects excluded because of overlap: `Student OS` overlaps heavily with `DayOne AI` and `YatinVeda`; `YatinVeda` overlaps with the same AI-product lane while adding privacy risk; `Reconcilyx` overlaps infrastructure themes while also carrying unresolved naming ambiguity.
- Projects blocked by insufficient evidence: `Reconcilyx` is blocked by identity mismatch; `Ghost Protocol` is blocked from higher placement by weaker automated proof and noisy repo hygiene; `DayOne AI` is blocked from flagship consideration by checked-in virtual-environment noise and weak public-safe visual evidence; `Metis` is blocked from flagship consideration until its runtime and public-safe story are tightened.
- Decisions requiring direct owner confirmation: whether the currently surfaced `Reconcilyx` repo is the intended project at all; whether `Metis` should be presented as a private solution-engineering platform or narrowed to one subsystem; whether `InfraMind` Marketplace presence is currently live and intended for public launch copy; whether `Auxilium` already has enough stable rooms and interactions for a public walkthrough freeze; whether `Yggdrasil` is distinct from `Hermes` or should be merged.
- All tiers in this board remain provisional until explicit owner approval.

## Summary Report

- Public repositories discovered: `38`
- Project-bearing repositories audited: `37`
- Original project repositories: `33`
- Forks: `4`
- Profile/meta repositories: `1` - `Keninjavelas`
- Missing project-bearing repository added during reconciliation: `Chess-Bot`
- Confirmed private GitHub repositories outside the public inventory: `4` - `Auxilium Digital Archive / Chaos`, `Metis`, `Reconcilyx`, and `YatinVeda`
- Additional local-only workspaces surfaced: `3` - `Word Extension`, `Fashion Feet`, and `Hermes`
- Named private or local candidates still not surfaced as inspectable workspaces: `3` - `Understanding Studio`, `MediaOps`, and `Yggdrasil`
- The final selection board now recommends a provisional three-flagship ceiling: `InfraMind`, `Auxilium Digital Archive`, and `Poseidon`
- The current provisional flagship alternates are: `Metis` and `Multi-Cloud Serverless Analytics`
- The current provisional detailed-dossier set is: `Metis`, `Multi-Cloud Serverless Analytics`, `Word Extension`, `DayOne AI`, and `Ghost Protocol`
- The current provisional archive migrations include: `Student OS`, `YatinVeda`, `Reconcilyx`, `GCP-OmniStream`, `AWS-CloudOps`, `AWS-Helix-Data-Lakehouse`, `Fashion Feet`, and the broader public inventory archive records including `Chess-Bot`
- Projects currently held as `DEFERRED - OWNER EVIDENCE REQUIRED`: `Understanding Studio`, `MediaOps`, and `Yggdrasil`
- `Hermes` remains private supporting evidence rather than a standalone shortlist project on current surfaced proof
- Repositories or folders currently outside shortlist contention: `Expense-Tracker` local folder and `Playground`
- Repositories still needing deeper code inspection or runtime verification before any shortlist freeze: `Ghost-Protocol`, `DayOne-AI`, `Student-OS`, `Metis`, `Reconcilyx`, `YatinVeda`, `Word Extension`, `odysseus`, `backstage`, `latitude-llm`, and `Sportify`
- Existing manifest entries with incorrect repository status: `project-multicloud-analytics`, `project-odysseus`, `project-infrastructure-automation`, and likely `project-telemetry-platform`.
- Existing manifest entries that should be replaced or split: `project-infrastructure-automation` must be replaced by concrete repositories; `project-telemetry-platform` and `project-multicloud-analytics` should map to concrete repos instead of abstract summaries.

## Notes

- The earlier Batch 3 Group 1 and Group 2 sections remain useful as audit history, but they must not be copied into `portfolioData.ts` as current fact while this GitHub-first audit is still in progress.
- A detailed README is evidence of intent, not proof of implementation. Complex claims such as `production-grade`, `fully autonomous`, `real-time`, `99.99% uptime`, or `100+ attacks supported` should only enter the portfolio after deeper code review or stronger deployment evidence.
- Forks such as `odysseus`, `latitude-llm`, `backstage`, and `Sportify` should stay in a distinct fork or contribution category unless original work inside the fork is clearly isolated.
