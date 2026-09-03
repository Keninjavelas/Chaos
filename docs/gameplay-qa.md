# Auxilium: Manual Desktop QA & Gameplay Validation Protocol (Batch 5F)

This document provides the standard desktop QA verification procedure for the Auxilium Digital Archive under normal Google Chrome conditions.

---

## 1. Environment & Setup Checklist

- **Browser**: Google Chrome (Latest Desktop Version)
- **Viewport Resolution**: $1920 \times 1080$ (standard test baseline)
- **Audio**: Web Audio API enabled, user-gesture unlock active
- **Controls**: Mouse (Look / Camera Direction), WASD / Arrow Keys (Movement), E (Interact), ESC (Put away / Release Pointer Lock)

---

## 2. Walkthrough Checklist by Area

### A. Initialization & Reception Wing
- [ ] **Pointer Lock Acquisition**: Left click on canvas acquires pointer lock cleanly without jitter.
- [ ] **Movement Feel**: Acceleration and deceleration are smooth ($14\,\text{m/s}^2$ / $16\,\text{m/s}^2$) with no instant ice-skating or snapping.
- [ ] **Head Bob & Flashlight Sway**: Very subtle camera motion accompanies walking; stops smoothly when letting go of keys.
- [ ] **Procedural Audio**: 120 Hz fluorescent ballast buzz audible; footstep sound rhythms match walking speed.
- [ ] **Front Desk Tablet**: Approaching tablet presents `[ E ] READ Orientation tablet`; pressing E opens verified developer profile.
- [ ] **Visitor Register & Goal Note**: Inspectable without clipping.
- [ ] **Escape Recovery**: Pressing `ESC` closes the document overlay immediately without reloading or breaking state.

### B. Personnel Wing & Developer Timeline
- [ ] **Doorway Passage**: Player navigates through the corridor into Personnel Wing without snagging on doorframe colliders.
- [ ] **Supervisor Desk A (Springer Capital)**: Plaque interaction opens verified internship record (Flask microservices, SQLAlchemy, REST APIs, integration testing).
- [ ] **Notice Board**: Academic record displays HKBK College of Engineering, B.E. Computer Science, 8.93 CGPA.
- [ ] **Developer Timeline Sightlines**: Unobstructed view of the full timeline board from room entrance.
- [ ] **Certifications Check**: Zero unverified AWS certification badges exist in the room.

### C. Research Lab (Communications Office)
- [ ] **Lighting & Fan Ambience**: Cross-fades smoothly into dual-band cooling fan sound profile.
- [ ] **Glass Whiteboard**: `[ E ] VIEW Local-first systems diagram` triggers systems architecture case study.
- [ ] **Compute Racks**: Inference cluster and local context cache racks are inspectable; descriptions reflect local-first engineering.
- [ ] **Desk Workstation**: Task lamp, CRT monitor, and Hermes local model iteration memo open cleanly.

### D. Records Hall (Project Repository)
- [ ] **Acoustic Stillness**: Audio cross-fades into damped acoustic reverb.
- [ ] **Flagship Exhibits**:
  - `InfraMind` Pedestal (West): Holographic indicator, status plate, and full case study overlay with verified live demo link.
  - `Auxilium Digital Archive` Pedestal (Center): Emerald lighting, Next.js / R3F architectural dossier.
  - `Metis` Pedestal (East): Amber lighting and verified manifest case study.
- [ ] **Detailed Dossier Tables**:
  - `Multi-Cloud Serverless Analytics` & `DayOne AI` dossiers readable on West table.
  - `Poseidon` simulation dossier readable on East table with bounded non-flagship wording.
- [ ] **Archive Shelves**:
  - `Student OS`, `YatinVeda`, `Reconcilyx`, `GCP OmniStream`, `AWS CloudOps`, `AWS Helix Data Lakehouse`, `Fashion Feet`, and `Odysseus` (with clear upstream fork attribution).
- [ ] **Research Publications**:
  - Post-Quantum Cryptography (Zenodo) and AI Systems Survey (ICETM 2026) readable on central table.

### E. Elevator Lobby & Recruiter Compression
- [ ] **Contact Terminal Station**: Interacting opens the Recruiter Terminal summary.
- [ ] **Contact Channels**: Displays GitHub (`https://github.com/Keninjavelas`), LinkedIn (`https://www.linkedin.com/in/kapoor-aryan`), Email (`aryankapoor0303@gmail.com`), with Phone omitted.
- [ ] **Elevator Interaction**: Call button panel triggers elevator descent / sublevel transition.

---

## 3. Systems Failure Recovery Tests

| Test Case | Procedure | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- |
| **Tab Switching** | Switch to another browser tab and return | Audio pauses/resumes gracefully; no runaway physics delta | **PASS** |
| **Rapid Escape Key** | Press ESC multiple times while viewing a document | Single document closes; game remains in stable state | **PASS** |
| **Window Resize** | Resize browser window during inspection | Canvas and 2D overlays adapt responsively without overflow | **PASS** |
| **Wall Sliding** | Walk diagonally against room walls | Smooth sliding along collision plane; footsteps stop if blocked | **PASS** |
