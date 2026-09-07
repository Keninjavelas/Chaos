# Identity Record Treatment — Personnel / Identity Archive

Status: DESIGN LOCKED (2026-09-06) — implementation pending V1 gates (room-state
approval capture, manual QA run, deployment). Not yet built.
Asset basis: `user_docs/Photograph.jpg` (authentic user headshot, verified).

## Framing rules (non-negotiable)

- In-world classification framing is **"PERSONNEL / IDENTITY ARCHIVE"** — never
  "patient", "medical", or anything implying a real diagnosis/medical record.
- All professional facts come verbatim from the verified registry
  (`src/data/portfolioData.ts` + approvals). No new claims are introduced.
- Horror/decay are **diegetic decoration** on the archive record: redaction
  bars, stamps, scan artifacts, annotation marks, timestamp anomalies, minor
  text corruption, "REVIEW REQUIRED"/"FILE INTEGRITY" marginalia. They never
  alter a real fact or imply one.
- The private phone number never appears on any surface.
- Photograph is real; no synthetic alterations of the face.

## Surface roles (three placements, one photograph)

### S1 — Reception OS terminal (professional terminal) · "Identity section"
- Role: first, mostly-clean professional introduction.
- Treatment: small personnel/identity record card inside the existing
  terminal identity section (ReceptionTerminalUI): photograph (small,
  rectangular, ID style), name, role headline, education, status ACTIVE,
  verification PASSED. Decoration minimal: subtle archival header strip
  ("ARCHIVE PERSONNEL — IDENTITY RECORD"), one light scan artifact.
- Atmosphere 1/3 (cleanest).

### S2 — Personnel Wing notice board · "Physical personnel record"
- Role: strongest version; where the horror aesthetic lives.
- Treatment: upgrade the existing notice-board interaction (no new furniture)
  to open an in-world personnel file overlay: large embedded photograph,
  stamped header ("PERSONNEL / IDENTITY ARCHIVE", file no.), redacted lines,
  handwritten margin notes, inspection stamps, corrupted/partially-degraded
  text fragments, mismatched timestamps, faint "REVIEW REQUIRED" notation,
  "AUTHORIZED PERSONNEL ONLY" footer. Real professional details remain fully
  legible beneath the decay.
- Atmosphere 3/3.

### S3 — Elevator Lobby recruiter terminal · "Final condensed dossier"
- Role: recruiter-facing final record — professional information first,
  atmosphere second; the archive has finally pulled the visitor's record.
- Treatment: cleaner condensed dossier in the existing contact-terminal
  overlay: photograph + key real fields first (identity, education, role,
  Springer, GitHub/LinkedIn/Email, availability), restrained decoration only
  (file-corner clip, a single redaction line, "RECORD RETRIEVED" header).
- Atmosphere 2/3.

## Shared content blocks (real, from registry)

- Identity: Aryan Kapoor — Computer Science engineering student (HKBK College
  of Engineering, B.E. CSE, 2023–2027, Bengaluru).
- Department (diegetic field): Systems & Infrastructure.
- Status: ACTIVE. Verification: PASSED. Classification: ARCHIVE PERSONNEL.
- Contact channels (public-approved): GitHub, LinkedIn, Email
  (aryankapoor0303@gmail.com). No phone.
- Optional diegetic metrics (clearly decorative file-integrity metaphors, not
  personal metrics): e.g., "FILE INTEGRITY 97.4%", "LAST REVIEW: [date]" —
  rendered as archive stamps, framed by the personnel-file fiction.

## Implementation notes

- All three surfaces are existing overlays/terminals; no new rooms, no new
  world geometry, no new interaction systems.
- Photograph asset path (canonical, to be created at build): served from
  `/portfolio/...` via the existing asset manifest (identity record image).
  Format/webp conversion to match the manifest entry at integration time.
- Registry: `identity-biography` missing-images list ("Professional headshot")
  resolves once the image is wired to its manifest entry.
- Diegetic elements must be authored as decorative markup, not as data —
  keep the creep fully out of `portfolioData`.

## Out of scope (per V1 discipline)

- No fake patient/medical framing. No fabricated credentials, venues,
  records, or anomalies that read as facts. No changes to verified content
  wording beyond presentation.
