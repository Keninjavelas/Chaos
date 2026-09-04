# Batch 6E-A: Personnel Wing Controlled Vertical Slice — Product Requirements Document

## Overview
- **Summary**: Bring the Personnel Wing (east wing off Reception) to the frozen Reception quality bar as a disciplined, portfolio-first admin-archive vertical slice. Personnel inherits the Reception quality benchmark (material fidelity, dark-but-readable lighting, restrained horror, decay discipline, performance budget) but establishes its own distinct administrative / personnel-records / career-archive identity — never a "Reception clone with different props." The Developer Timeline is the protected primary focal point.
- **Purpose**: Reproduce the Reception benchmark in a second room with a different functional identity, locked to explicit acceptance gates and performance ceilings, so the remaining rooms (Research, Records, Hallways) have a reproducible two-room pattern. Reception is frozen; no Reception files are touched.
- **Target Users**: Portfolio reviewers evaluating visual/atmospheric consistency and controlled architecture; players reading identity, education, internship, and career-milestone content.

## Goals
- Match Reception on: material fidelity, dark-but-readability balance, restrained horror language, warm/cool lighting hierarchy, decay density and physical motivation, ceiling/floor/wall silhouette readability, interaction-binding reliability.
- Establish a clearly different admin-archive identity: heavier cabinet bank, no visitor waiting area, timeline-exhibit primary focal instead of a lobby desk, archival task lighting, slightly less decay density than Reception.
- Protect the Developer Timeline viewing cone (standoff prism + sightline) — no storage or maintenance prop enters that sightline.
- Clear 4-zone layout: (1) Timeline / Career Wall, (2) Personnel Admin Desk Area, (3) Filing / Archive Storage, (4) Restrained Human-Detail Zone.
- Preserve all verified portfolio content verbatim and without fabricated additions.
- Stay within explicit numerical performance ceilings (unique materials, texture resolution, shadow lights, decal count, repeat props).

## Non-Goals
- Do not modify any Reception-specific file: `ReceptionWing.tsx`, `ReceptionLighting.tsx`, `ReceptionAuthoredMaterials.tsx`, Reception props/decal components. (Shared systems — `FacilityMaterials`, `HorrorMaterial`, generic props like `FilingCabinet`, `DocumentProp`, `FacilityKit`, `FacilityLighting` — may be used or given a thin Personnel-specific wrapper that does not alter Reception behavior.)
- Do not proceed to Research, Records Hall, Communications, Elevator Lobby, Sublevel, or hallway additions. Personnel must be explicitly approved and frozen before any other room is touched.
- Do not add gore, saturated-red alarm lighting, sparks, frequent flicker, random debris fields, or heavy structural damage. Horror = abandonment + unfinished records + personal traces + "slightly wrong" furniture placement + dim atmosphere.
- Do not invent credentials, fake certifications, fake metrics, or achievements that are not in `portfolioManifest`.
- Do not cover every surface with decals, re-author full 4K texture sets, or pursue displacement-heavy geometry detail.
- Do not redesign the Developer Timeline into a wall of long paragraphs. Card-level detail lives in the VIEW dossier overlay.

## Background & Context
- Reception frozen baseline (for quality inheritance, not copy-paste): `src/game/World/rooms/ReceptionWing.tsx`, `src/game/World/rooms/ReceptionLighting.tsx`, `src/game/World/materials/ReceptionAuthoredMaterials.tsx`. Reception quality markers: 16-point layered rig with hemisphere+ambient charcoal base, warm focal pool + cool threshold spill, 5 decay decal families (physically motivated), shared 1K–2K PBR base maps cloned/tinted per surface, max 1 shadow-casting spotlight (reception desk), ~12 total decals max.
- Current Personnel file: `src/game/World/rooms/PersonnelWing.tsx` (281 lines). Current architecture uses generic `FacilityKit` surfaces (not authored PBR), a 4-desk engineering cubicle bullpen, a full kitchenette/refrigerator/microwave/vending cluster, a locker bank beside the timeline, a 4-panel blood trail, a tipped 90° cabinet, and 18 total InstancedDebris papers + 3 rubble pieces. Current lighting is 2 fluorescents + 2 task lights + 1 cool corridor spot (2.0 intensity @ 10 m / 60°). Timeline is correctly placed on the east wall but the lockers (zone 5) and filing/printing (zone 4) both intrude on the viewing standoff prism.
- Portfolio content source of truth: `src/data/portfolioData.ts` — `portfolioManifest.education[0]`, `portfolioManifest.timeline[]`, `portfolioManifest.experience[0]` (Springer Capital), plus Developer Journey / Developer Timeline framing.
- `DeveloperTimelineWall` component: `src/game/World/props/DeveloperTimelineWall.tsx` — hardwood/cork backing, standoffs, 4 cards, header plaque. Structurally retained; card text on the 3D plane trimmed to ≤3 short bullets per card (full text in VIEW overlay only).
- Shared prop families available (curated, not auto-included): `FilingCabinet`, `DocumentProp`, `InteractableObject`, `FloorScuffDecal`, `PaperworkStack`, `ArchiveBoxStack`, `ExperiencePlaque`, `FacilityFluorescent` / `FacilityTaskLight`, `CableConduitRun`, `NoticeBoard`, `WallSign`, `FacilitySignPanel`, and individual Clutter/PersonnelProps items as classified below.
- Room fixed geometry: 8.5 × 8.5 footprint, y=−0.5 floor, y≈2.9 ceiling, 3.2 m wall height, 3.0 m west-wall entry portal flush with east corridor end wall.

---

## Existing Personnel Prop Inventory (Pre-Implementation Classification)

Every existing prop in `PersonnelWing.tsx` is classified below. New props may be proposed only after this inventory is complete.

| # | Prop / Component | Current Zone | Lines | Classification | Rationale |
|---|---|---|---|---|---|
| 1 | `FacilityFloorSection args=[8.5, 8.5]` | Architecture | 27 | REPURPOSE | Replace with Personnel-authored PBR hero floor (reuse Reception base families, admin tint). |
| 2 | `FacilityCeilingGrid hasLights=false` | Architecture | 28 | REPURPOSE | Replace with Personnel-authored PBR hero ceiling; add dark portal frame at west entry. |
| 3 | `FacilityWallSegment × 3 main` (rear/front/right) | Architecture | 31–33 | REPURPOSE | Replace with Personnel-authored PBR hero walls; keep geometry sizes identical. |
| 4 | `FacilityWallSegment × 2 west partial` (above entry) | Architecture | 36–37 | KEEP (rewire) | Keep as entry-side wall segments; re-materialize with PBR hero walls. |
| 5 | `DeveloperTimelineWall` + `InteractableObject` wrapper | East wall (Timeline) | 40–55 | KEEP | Primary focal. Preserve interaction bindings exactly. Only trim 3D card bullet count per AC. |
| 6 | `FacilityFluorescent × 2` | Lighting | 58–59 | REPURPOSE | Replace with Personnel-authored layered rig; 0–2 fluorescents allowed within performance ceiling. |
| 7 | `FacilityTaskLight × 2` | Lighting | 60–61 | REPURPOSE | Reuse or replace as desk/timeline task lights within new hierarchy rig. |
| 8 | `spotLight entry` intensity=2.0, dist=10, color=#aaccff | Corridor spill | 63–64 | REMOVE | Too bright + too large cone + wrong temperature. Replace with cool-neutral threshold point per Task 7/9. |
| 9 | `InstancedDebris type=paper count=6` near [2.5, 2.5] | Floor scatter | 67 | REMOVE | Random scatter near old break area; doesn't fit admin-archive. Total paper debris after all removals trimmed to ≤ 8. |
| 10 | `InstancedDebris type=rubble count=3` near [-1.5, 2.0] | Floor scatter | 68 | REMOVE | Rubble = heavy damage; forbidden for admin tone. |
| 11 | Blood-trail mesh cluster × 4 (#2b0202, toward exit) | Floor horror | 71–86 | REMOVE | Gore / hard horror; violates portfolio safety + NFR-1 restraint. |
| 12 | Zone 1 group `SupervisorDesk` + desk contents | Zone 1 (old) | 89–137 | REPURPOSE (zone relabel) | `SupervisorDesk` prop itself KEEP as Desk B-1; rezone to Zone B (Admin Desks). Individual items reclassified per rows below. |
| 13 | `SupervisorDesk` component mesh (L-shape) | Inside Zone 1 | 90 | KEEP (move to Zone B) | Appropriate admin furniture; relocate to Zone B around `[-1.5, 0, -2.0]` (rear-left, away from timeline prism). |
| 14 | `DeskLamp` on Supervisor | Z1 desk | 91 | KEEP | Admin-appropriate; stays on B-1. |
| 15 | `CRTMonitor` (off) on Supervisor | Z1 desk | 92 | KEEP (optional) | Subtle abandoned-workstation cue; Reception pattern uses dead CRT + standby LED. Keep or demote to just paper. |
| 16 | `Keyboard` on Supervisor | Z1 desk | 93 | MOVE (to B-2 or remove) | Optional — if 2 desks keep 1 keyboard. Avoid duplicate clutter. |
| 17 | `ExperiencePlaque` Springer Capital (portfolioManifest.experience[0]) | Z1 desk | 97–102 | KEEP (stay on B-1) | Verified portfolio content; MUST remain. |
| 18 | `CassetteTape` on Supervisor | Z1 desk | 103 | KEEP | Small human trace; ≤1 allowed; stays with audio recorder. |
| 19 | `AudioRecorder` + INSPECT "Tape log" / researching intelligence | Z1 desk | 105–111 | KEEP | Institutional-horror appropriate; no gore; interaction binding valuable. |
| 20 | `NoticeBoard` behind Supervisor | Z1 wall | 113 | MOVE to Zone D or filing wall | Small memo board acceptable; not beside Supervisor wall; prefer by filing or by entry. |
| 21 | `DocumentProp` ACADEMIC & EDUCATION RECORD (HKBK / CSE / 2023–2027 / CGPA 8.93) | Z1 desk / board | 114–134 | KEEP (move to B-1 surface or B-2) | Verified portfolio content; MUST remain. |
| 22 | Placeholder Supervisor Chair (box geom #1a2228) | Z1 desk | 136 | KEEP (with B-1) | Chair-per-desk discipline; one of the exactly-2 allowed chairs. |
| 23 | Zone 2 group: `CubicleDivider` cross (2 dividers, length=4 each) | Z2 cubicle bullpen | 140–143 | REMOVE | Engineering bullpen identity wrong for Personnel; intrudes on center circulation. |
| 24 | Desk B mesh (cubicle) + contents (CRT on / spilled mug / Sprint Goals doc / keyboard / lamp) | Z2 NW | 146–161 | REMOVE (salvage 1 item) | 4-desk bullpen → 2 admin desks. Desk B deleted; salvage DOC-SPRINT-GOALS text if it can become "Developer Manifesto" equivalent, or keep Desk E manifesto instead (avoid duplicate manifestos). |
| 25 | `DocumentProp` DOC-SPRINT-GOALS / "Sleep later. Keep building." | Z2 Desk B | 152–159 | REPURPOSE | Merge into single manifesto-style file on B-2 or remove; do not duplicate. |
| 26 | `CoffeeMug spilled=true` Desk B | Z2 Desk B | 151 | REMOVE | Already have 1 mug candidate from Desk C / Zone D; ≤1 total. |
| 27 | Desk C mesh (cubicle) + CRT off / DeskPhone / CoffeeMug (spilled, INSPECT) + chair | Z2 SW | 163–172 | REMOVE (salvage 2 items) | Desk C deleted; salvage `DeskPhone` + `CoffeeMug inspect` for B-2 identity desk and Zone D respectively. |
| 28 | `DeskPhone` Desk C | Z2 | 167 | KEEP (move to B-2) | Intake-desk appropriate. |
| 29 | `CoffeeMug` Desk C (INSPECT "Late-night debugging sessions.") | Z2 | 168–170 | KEEP (Zone D single mug or B-2) | ≤1 total; choose one location. |
| 30 | Desk D mesh (cubicle) + FamilyPhoto / DeskLamp off / Pen / NETWORK LOGIN credentials doc + chair | Z2 NE | 174–189 | REMOVE (salvage 4 items) | Desk D deleted; salvage FamilyPhoto, Pen, DeskLamp off, DOC-PASSWORD for B-2 identity desk. |
| 31 | `FamilyPhoto` Desk D | Z2 | 177 | KEEP (move to B-2) | Small human detail on identity intake desk. |
| 32 | `Pen` Desk D | Z2 | 179 | KEEP (B-2) | Tiny detail; fine. |
| 33 | `DocumentProp` DOC-PASSWORD / Network Login kapoor.a + clues (ICETM2026 / LOCALFIRST / NOCLOUD) | Z2 Desk D | 180–187 | KEEP (move to B-2 or filing) | Gameplay clue appropriate for admin/identity. |
| 34 | `DeskLamp off` Desk D | Z2 | 178 | REPURPOSE or REMOVE | If 2nd lamp isn't needed on B-2, remove. |
| 35 | Desk E mesh (cubicle) + DEVELOPER MANIFESTO doc (3 rules + Don't forget why you started) + chair | Z2 SE | 191–203 | REMOVE (salvage doc) | Desk E deleted; keep the manifesto doc as single developer-culture item on B-1 or B-2; avoid duplicate with Sprint Goals. |
| 36 | `DocumentProp` DOC-MANIFESTO AUXILIUM ENGINEERING MANIFESTO | Z2 Desk E | 194–201 | KEEP (singleton on B-1) | Prefer this over Sprint-Goals for tone; delete the Sprint-Goals doc to avoid duplicate. |
| 37 | Zone 3 kitchenette group: `OldRefrigerator` + countertop + `Microwave` + `CoffeeMachine` + `VendingMachine` + `TrashBin` + `WallSign "KITCHEN"` + Warning Memo (blood vials joke) + round table + 2 chairs | Z3 | 206–227 | REMOVE (entire cluster) | Kitchenette identity is wrong for admin/personnel; fridge/microwave/vending/trash do not belong. Also delete the "blood vials in fridge" memo (content joke not portfolio-safe). |
| 38 | `DocumentProp` DOC-MEMO "Warning — blood vials in fridge" | Z3 kitchen counter | 216 | REMOVE | Gore joke; portfolio content safety violation. |
| 39 | Zone 4 filing/printing group (current): `OfficePrinter` + 2 upright `FilingCabinet` + `ArchiveBoxStack PERSONNEL 2024–2025` + tipped 90° FilingCabinet + `DocumentProp` SECURITY NOTICE lockdown + `InstancedDebris` paper × 6 near tipped cab | Z4 (old) | 229–246 | REPURPOSE entirely | Move to a non-timeline wall; keep ONLY the upright cabinet hardware + one printer if we still want it; delete tipped cabinet + security doc text (replace with personnel-appropriate notice) + debris cluster. |
| 40 | `OfficePrinter` old Zone 4 | Z4 | 231 | MOVE (near new Zone C or REMOVE) | Printer is optional; keep 1 near cabinet bank if space allows and doesn't intrude on timeline prism; otherwise REMOVE. |
| 41 | `FilingCabinet × 2 upright` (old Zone 4, rotation=Math.PI) | Z4 | 233–234 | KEEP (rezone to Zone C on north/south wall + add 1 more) | Good hardware; flush to wall, consistent orientation; add 1 cabinet → bank of 3. |
| 42 | `ArchiveBoxStack count=3 label=PERSONNEL 2024–2025` old Zone 4 | Z4 | 235 | KEEP (move on top of new Zone C cabinet bank) | Good label-appropriate hardware; reduce count to 1–2 if 3 feels crowded on top of cabinets. |
| 43 | Tipped 90° FilingCabinet (rotation=[π/2,0,0.3]) | Z4 | 238–240 | REMOVE | Heavy damage; forbidden. Substitute storytelling with exactly 1 slightly ajar drawer on the upright bank. |
| 44 | `DocumentProp` DOC-SECURITY "Lockdown overridden. Facility compromised." | Z4 floor tipped cab | 242 | REMOVE (replace text) | Compromised-evac content is Reception-gate level tone; Personnel = abandoned admin, not "active breach." Replace with personnel-appropriate notice if needed (e.g., "Section-02 file consolidation memo"). |
| 45 | `InstancedDebris paper count=6` at tipped cabinet | Z4 | 245 | REMOVE | Debris cluster tied to tipped damage; total paper debris trimmed to ≤ 8 room-wide. |
| 46 | `FloorScuffDecal` near [-2.0, -2.5] | Surface wear | 249 | KEEP or RELOCATE | Physically motivated scuffs are allowed; reassign to cabinet-bank front + intake desk front + entry threshold (total ≤ 5). |
| 47 | `FloorScuffDecal` center [0.5, -0.5] | Surface wear | 250 | REPURPOSE | Reassign to specific heavy-use spots (see Task 8). |
| 48 | `WaterStainDecal` ceiling [-1.5, 2.88, 2.0] | Ceiling decay | 251 | KEEP | Single physically-plausible ceiling damp; ≤ 2 ceiling water stains total allowed. |
| 49 | `CableConduitRun` rear ceiling 7.5 m | MEP surface | 252 | KEEP | Low-cost architectural detail; doesn't obstruct. |
| 50 | `PaperworkStack` random rear wall [-1.7, 0.8, -3.1] (floats, no desk/shelf) | Clutter | 253 | MOVE to Zone C cabinet top | Place only on supported surfaces; pair with archive boxes. |
| 51 | Zone 5 lockers bank (3.0m wide × 2.0m tall painted-metal) + 2 open doors + backpack inside + `DocumentProp` MEETING MINUTES "System consolidation / verify credentials" | Z5 (east wall, beside timeline) | 255–277 | REMOVE (bank) + REPURPOSE (1 doc text) | Lockers intrude on timeline viewing prism (x≈3.55, z≈-3.15 → within standoff rectangle x∈[1..3.5] z∈[-2..2]); entire bank must go. The "verify credentials" meeting minutes text is good admin-appropriate content; move it to a NoticeBoard or small memo elsewhere. |
| 52 | `DocumentProp` DOC-MEETING "Department notice: verify development credentials on the central board" | Z5 inside locker | 273 | KEEP (relocate — Zone D memo by entry or filing NoticeBoard) | Content appropriate; placement only was wrong. |

**Summary of classifications**:
- **KEEP (with or without relocation)**: ~24 items (incl. Timeline, SupervisorDesk, 2 upright FilingCabinets, ArchiveBoxStack, portfolio docs x4, small trace items x5, 1 ceiling stain, 1 cable conduit, printer/keyboard/scuff candidates)
- **MOVE**: ~8 items (upright cabinets, 2 desk lamps, NoticeBoard, FamilyPhoto, DeskPhone, Pen, Meeting Minutes doc, PaperworkStack, keyboard/printer options)
- **REMOVE**: ~20 items (incl. full kitchenette cluster, 4 cubicle desks, cross-dividers, lockers bank, tipped cabinet, blood trail x4, rubble debris, 2 paper debris clusters, security-breach memo, blood-vials joke memo, duplicate manifesto/Sprint doc, placeholder chair x3 from deleted desks)
- **REPURPOSE**: ~8 items (FacilityKit floor/walls/ceiling → PBR hero surfaces, overhead lights → new hierarchy rig, entry spot → threshold point, scuffs → new positions, old Zone 2/4/5 shells → new zoning plan, DOC-MANIFESTO retained vs Sprint-Goals discarded)

---

## Functional Requirements

- **FR-1 Timeline Protected Primary Focal**: `DeveloperTimelineWall` remains east-wall career exhibit. No cabinet, prop, chair, storage, service, or maintenance object may be placed within the viewing prism (defined in AC-1). Interaction wrapper preserved exactly: `label="Developer timeline"`, `interactionKind="VIEW"`, `interactionRange=3.2`, `priority=3`, `inspectDocument` payload mapping `portfolioManifest.timeline` to dossier `VIEW-DEVELOPER-TIMELINE`.
- **FR-2 Four Functional Zones (Non-overlapping)**: (1) Timeline / Career Wall (east wall only + standoff), (2) Personnel Admin Desk Area (2 desks max: supervisor/records + identity/intake — no 4-desk bullpen), (3) Filing / Archive Storage (≥3 flush-to-wall cabinet bank + archive boxes/paperwork stacks + ≤1 optional printer nearby), (4) Restrained Human-Detail Zone (≤1 coffee mug, ≤1 personal photo, ≤1 cassette/audio log, ≤1 wall memo — no full kitchenette/fridge/microwave/vending).
- **FR-3 Spatial Sanity & Circulation**: From west entry (player at x≈−4, y=1.6, z=0 facing +x), three 0.8 m-wide unobstructed paths: (a) entry→timeline standoff, (b) entry→admin desks, (c) desks→exit/rear. Minimum 1.2 m-wide center circulation corridor preserved. Every desk ≥ 0.8 m knee/seat standoff; cabinet bank ≥ 0.8 m drawer standoff.
- **FR-4 Chair Discipline**: Exactly 2 chairs total (1 per desk); chair center within 0.9 m of desk front edge; ≤ 1 chair deliberately displaced (rotated > 0.35 rad off desk axis or pulled > 0.25 m out) for abandoned storytelling; 0 purpose-less wall-parked chairs.
- **FR-5 Filing Cabinet Bank**: ≥ 3 cabinets on a non-timeline wall; uniform orientation (drawers face room interior); adjacent spacing ≤ 0.05 m (flush); ≥ 0.8 m drawer standoff free of geometry. Exactly 0 or 1 drawers slightly ajar (≤ 0.08 m pull) used subtly. 0 tipped / rotated / damaged cabinets.
- **FR-6 Cleaning / Service / Maintenance Prop Discipline**: Either 0 cleaning/service props, OR exactly 1 cleaning trolley placed in a deep corner, outside the 1.2 m center circulation corridor, > 1.5 m away from both the timeline and the primary admin desk. No loose mops, buckets, or janitorial clutter beside portfolio focal objects.
- **FR-7 Horror Restraint (Zero Gore, Zero Saturation-Red, Zero Sparks)**: 0 gore (blood, body parts, bio evidence of harm); 0 rubble / ceiling-collapse debris; 0 sparks / arc effects; ≤ 1 unreliable fluorescent at Reception rarity (22–54 s gaps, only dip sag, never strobe); 0 frequent-flicker fixtures. Horror conveyed by abandonment, unfinished records, personal traces, slight misalignment, dim atmosphere.
- **FR-8 Portfolio Content Integrity**: Six required phrases or portfolioManifest-sourced equivalents preserved verbatim: (a) "HKBK College of Engineering", (b) Computer Science / CSE credential, (c) "2023–2027" duration, (d) "Current CGPA: 8.93/10", (e) "Springer Capital" backend internship, (f) a "Developer Journey" / "Developer Timeline" framing phrase. 0 fabricated credentials, 0 fabricated certs, 0 fabricated metrics.
- **FR-9 Timeline As Physical Exhibit (No Long Wall Text)**: The 3D board preserves hardwood/cork backing + standoffs + 4 cards + header plaque. Per card on the 3D plane: ≤ 3 short bullets (each ≤ 80 chars); full `entry.bullets[]` only in the VIEW dossier overlay; header fits inside plaque bounds.
- **FR-10 Environmental Storytelling Caps (max counts)**: ≤ 1 folder left open; ≤ 1 coffee mug used for storytelling; ≤ 1 chair pulled away; ≤ 1 drawer not fully closed; ≤ 1 personnel file left on a work surface (not the floor); ≤ 1 wall memo slightly tilted / edge-peel visual; not every object is an interactable.
- **FR-11 Frozen Baseline Immutability**: The following Reception-specific files are byte-identical after this pass: `ReceptionWing.tsx`, `ReceptionLighting.tsx`, `ReceptionAuthoredMaterials.tsx`. The following other rooms are byte-identical: `RecordsHall.tsx`, `CommunicationsOffice.tsx`, `ElevatorLobby.tsx`, `Sublevel.tsx`, plus corridor / portal code. Out-of-scope edits allowed only if a genuine shared-system regression exists AND the rationale is documented AND the same edit benefits Personnel without degrading Reception.
- **FR-12 Validation Gates**: `npx tsc --noEmit` exit 0; targeted ESLint on every modified Personnel file with `--max-warnings=0` exit 0; `npm run build` exit 0.
- **FR-13 Visual Acceptance Screenshot Requirement**: Four required screenshots before completion claim: (1) Entrance view (from west portal looking east into room), (2) Timeline straight-on (board fills frame roughly), (3) Desk + storage zone side angle, (4) Reverse / exit view. Pass is not complete without all four.
- **FR-14 Stop At Personnel (No Scope Creep)**: After this pass, do not proceed to Research, Records, Communications, Elevator, Sublevel, or Hallway additions. Personnel code + screenshots are presented for explicit approval and freeze; subsequent rooms require a new spec.

## Non-Functional Requirements

- **NFR-1 Quality Bar Parity (Inherit, Don't Copy)**: Personnel matches Reception on material fidelity, darkness/readability, horror restraint, warm/cool lighting hierarchy, texture sharpness, decay density (or slightly less for admin), silhouette readability, but has a distinct composition (cabinet-dominant vs. desk-dominant, timeline focal vs. lobby focal, archival task pools vs. a single lobby pool).
- **NFR-2 Identity Differentiation ("Same Facility, Different Wing")**: Immediately recognizable as same facility (institutional plaster/metal family, charcoal trim, restrained horror, cool→warm threshold→task temperature gradient) but clearly "old admin-records office": heavier cabinet bank, no visitor waiting, no kitchenette, no lockers, timeline-exhibit primary focal.
- **NFR-3 Lighting Hierarchy (Strict Ordered Brightness)**: Brightness order enforced per single-light peak: (1) Timeline primary, (2) Main admin desk / record point, (3) Filing / storage, (4) Entry threshold, (5) Peripheral corners (no dedicated lights). Timeline never appears as a blown-out glowing white rectangle; cards are lit by external lights, not by card-level self-emission beyond faint paper base color.
- **NFR-4 Performance Ceilings (Hard Numerical Limits)**: See explicit ceilings table in Constraints §Performance. Personnel stays at-or-below Reception on every metric unless the ceiling explicitly allows a small delta (≤ +10%).
- **NFR-5 Decay Density Sparse Admin-Appropriate**: Personnel total decay decal count ≤ Reception total decay decal count. Only physically motivated decays: mild damp staining near door/plumbing penetrations, ≤ 1 plaster repair patch, ≤ 1 subtle peeling zone, footwear scuff bands in front of cabinets/desks/entry, possible ≤ 1 ceiling pipe discoloration IF a pipe or conduit actually runs over that spot. No destroyed-room look, no grime skirts, no every-corner symmetry.
- **NFR-6 Admin Palette**: Walls aged beige-grey / faded institutional green-grey / old admin plaster (tint families around #9a937d or slightly more olive; never Reception-exact tints); trim dark brown-black / charcoal; cabinets worn painted steel (dark grey-blue, #354248 family); desks aged laminate / dark wood; paper yellowed/off-white; lighting warmer archival/admin practicals near desks, faint cool-neutral only at corridor threshold.
- **NFR-7 Robustness & Interaction Preservation**: All existing working interaction bindings preserved (or replaced with equivalent new ones using identical `id`, `label`, `interactionKind`, range, and payload where portfolio content is involved); zero runtime console errors from Personnel scope; walkable colliders free of stuck spots; rigid bodies don't block required paths.

## Constraints

### Technical
- TypeScript strict mode; `npx tsc --noEmit` exit 0 required.
- ESLint project rules (no render-phase side effects; purity on React components) on all modified Personnel files with `--max-warnings=0`.
- Next.js variant build succeeds (per AGENTS.md — do not assume conventional Next APIs; `npm run build` is authoritative).
- Personnel geometry remains inside 8.5 × 8.5 × 3.2 m envelope with 3.0 m west entry portal.

### Performance Ceilings (Hard Numerical Limits)

Metric | Reception Baseline (approx, from code audit) | Personnel Ceiling (must NOT exceed)
---|---|---
Unique new GPU-texture directories introduced | 1 (`/textures/reception/*`) | 0 (reuse Reception base paths; zero new texture directories)
Shadow-casting lights (`castShadow=true`) | 1 (reception desk spot) | 3 (max; prefer 1–2)
Active point/spot/area lights total (not hemisphere/ambient) | ~15 (ReceptionLighting.tsx lines 125–333) | 12 (max; favor hierarchy tiers over blanket coverage)
Unreliable / flickering fixtures | 1 (UnstableFluorescent, 22–54s gaps, sag-only dip) | 1 (optional; 0 also acceptable)
Spark / arc emitters | 1 (Reception SparkingCable) | 0 (forbidden entirely in Personnel)
Decals total (every wall/water/peel/repair/scuff/rust/ceiling family counts as 1) | ~12 (ReceptionWing inventory) | 12
Decal single-family max (per type) | Scuff ≤ 8, Damp ≤ 2, Peel ≤ 1, Repair ≤ 1, Rust ≤ 2, WaterStreak ≤ 2, CeilingPipe ≤ 1 | Scuff ≤ 5, Damp ≤ 2, Peel ≤ 1, Repair ≤ 1, Rust ≤ 1 (only if ferrous hardware exists), WaterStreak ≤ 2, CeilingPipe ≤ 1 (only if pipe/conduit above)
`InstancedDebris paper` total (count sum across all) | ~11 (Reception totals) | 8
`InstancedDebris rubble` total | 1 | 0
Total meshes (visible + collider-only, excluding instanced leaves) | ~220 (rough estimate of ReceptionWing) | ≤ +10% vs. Reception baseline
`castShadow` on arbitrary non-focal clutter meshes | Disciplined (only architecture + focal desk) | Same discipline: only architecture + primary focal plane objects; clutter props avoid `castShadow`

### Business
- Portfolio-first: portfolio content readability trumps any horror or aesthetic choice.
- Claim safety: zero fabricated credentials or misleading metrics; content is strict source-of-truth from `portfolioManifest`.

### Dependencies
- Existing prop ecosystem: shared `FacilityMaterial` presets; `HorrorMaterial`; `FilingCabinet`; `DocumentProp`; `InteractableObject`; `FloorScuffDecal`; `PaperworkStack`; `ArchiveBoxStack`; `ExperiencePlaque`; `DeveloperTimelineWall`; `FacilityFluorescent` / `FacilityTaskLight`; `CableConduitRun`; `NoticeBoard`; `WallSign`; `FacilitySignPanel`; prop families from `Clutter` (curated) and `PersonnelProps` (curated per classification table above).
- `useGameState` for `inspectDocument` / `setInteractionMessage` (already used; preserve IDs exactly).
- Reception base texture directories (`/textures/reception/floor`, `/textures/reception/ceiling`, `/textures/reception/wall`) as the ONLY PBR base map sources. Personnel authored wrappers clone/tint existing maps. No new texture files or directories.

## Assumptions

- The `ReceptionAuthoredMaterials` hook pattern (`useClonedPbrMaps` with cloned PBR map tuning) can be wrapped into a thin `PersonnelAuthoredMaterials.tsx` that reuses exactly the same `/textures/reception/*` base map directories, producing zero new GPU-texture directory additions (browser cache + module-level texture map dicts share load). If extracting the hook into a tiny shared helper is cleaner, do so only if it doesn't touch Reception files (prefer: copy the hook pattern inside Personnel-authored wrapper with same base paths).
- Removing the 4-desk engineering bullpen, kitchenette, and lockers is approved because none serve the personnel/admin/archive function and because the classification table explicitly marks each REMOVE with rationale.
- Replacing FacilityKit generic surfaces (FloorSection/CeilingGrid/WallSegment) with Personnel-authored PBR hero surfaces is required to reach Reception quality, and doing so without adding new textures keeps the performance ceiling intact.
- DeveloperTimelineWall 3D card text currently includes full `entry.bullets[]` content; trimming it to ≤ 3 short bullets per card on the 3D plane while keeping full text in the VIEW payload is necessary for FR-9 and is not considered content loss (user explicitly forbade "webpage mounted in 3D" look).
- Visual acceptance requires screenshots. Code-only "done" without the four screenshots is rejected. Screenshots are reviewed before Personnel is frozen.

## Open Questions

- None. All ambiguity resolved by: the 10-constraint instruction, the Reception frozen benchmark, the prop classification table, and the performance ceilings table.

---

## Acceptance Criteria (4 Required Categories)

### CATEGORY A: STRUCTURAL / CODE-VERIFIABLE (Binary Rules, Evidence = Static Code + Commands)

#### AC-A1: Timeline viewing prism clear of obstructions
- **Type**: `rule`
- **Given**: PersonnelWing source code positions/orientations
- **When**: Enumerating every placed mesh (chair, cabinet, desk, box, trolley, locker, divider, printer, prop) with x/z footprint and y-extent > 0.1 m
- **Then**: 0 such mesh has any bounding-box overlap with the viewing prism: x ∈ [1.0, 3.88] (from standoff line to timeline plane), z ∈ [−2.0, 2.0], y ∈ [0.0, 2.8]. The timeline board title "VERIFIED DEVELOPMENT TIMELINE // …" plus all 4 cards remain on the east-wall plane within the board's visible frame (no clipping off plaque edges). Interaction wrapper preserved: `id="VIEW-DEVELOPER-TIMELINE"`, `label="Developer timeline"`, `interactionKind="VIEW"`, `interactionRange=3.2`, `priority=3`.
- **Pass Condition**: 0 obstructions in prism; interaction binding matches exactly.
- **Evidence**: Code-position bounding-box ledger for all placed furniture/props; grep of interaction-id/label/range/priority strings.

#### AC-A2: Functional zoning — 4 zones, no identity-mismatch clusters remain
- **Type**: `rule`
- **Given**: Final PersonnelWing source
- **When**: Classifying every placed prop into one of {Timeline, AdminDesks, Filing, HumanDetail} or per-room architecture/lighting/surface-wear
- **Then**: (a) No `OldRefrigerator` / `Microwave` / `CoffeeMachine` / `VendingMachine` / `TrashBin` / kitchenette signage or table/chair kitchen group exists; (b) No `CubicleDivider` cross or 4-way cubicle exists; (c) No locker bank (≥ 2.0 m tall × ≥ 2.0 m wide painted-metal bank) exists anywhere in the room; (d) Desk count exactly = 2 (1 supervisor/admin, 1 identity/intake); (e) Every placed prop belongs to exactly one of the 4 functional zones or to architecture/lighting/surface-wear.
- **Pass Condition**: All five sub-clauses (a)–(e) true simultaneously.
- **Evidence**: grep for component names (`OldRefrigerator|Microwave|CoffeeMachine|VendingMachine|CubicleDivider|locker` case-insensitive); desk inventory count; zone-to-prop assignment list.

#### AC-A3: No gore, no heavy damage, rubble zero, paper debris ≤ 8
- **Type**: `rule`
- **Given**: Final PersonnelWing source
- **When**: Enumerating horror-trope meshes and debris counts
- **Then**: (a) 0 `#2b0202` or equivalent gore-trail materials; (b) 0 tipped / rotated > 45° / upside-down filing cabinets or furniture (rotation with π/2 on a horizontal axis on cabinet-scale geometry); (c) `InstancedDebris type="rubble"` total count = 0; (d) Sum of all `InstancedDebris count={N}` (paper type) across the whole room ≤ 8; (e) 0 spark / arc emitter components or bare point-lights with per-frame random-intensity ranges > 2x base inside Personnel scope (SparkingCable component forbidden in Personnel); (f) Unreliable flicker fixtures (random dip / flicker pattern that activates more than once per 20 s on average) count ≤ 1.
- **Pass Condition**: All six sub-clauses true.
- **Evidence**: grep for `#2b0202`, `type="rubble"`, `rotation={[Math.PI/2` on cabinet-scale groups, `InstancedDebris count=`, `SparkingCable`, unreliable flicker pattern ledger; sum paper debris across room.

#### AC-A4: Portfolio content preserved verbatim + zero fabricated additions
- **Type**: `rule`
- **Given**: PersonnelWing runtime-accessible string corpus (DocumentProp titles + contents, ExperiencePlaque, FacilitySignPanel title/subtitle, interaction inspectDocument payloads, setInteractionMessage strings)
- **When**: Extracting all strings and checking membership and absence
- **Then**: All six required phrases (or direct `portfolioManifest.*` references producing them) are present: (1) "HKBK College of Engineering", (2) CSE / "Computer Science", (3) "2023-2027", (4) "Current CGPA: 8.93/10", (5) "Springer Capital", (6) "Developer Journey" or "Developer Timeline" framing. Absent: any string matching AWS / "Certified" / course-name acronym certs / fabricated CGPA > 8.93 / fake employment stubs not equal to Springer Capital + HKBK.
- **Pass Condition**: 6/6 present; 0 fabricated matches.
- **Evidence**: grep output of all string literal content sites in PersonnelWing (and any touched Personnel-authored wrapper / sign panel / DeveloperTimelineWall text) plus `portfolioManifest` access sites.

#### AC-A5: Spatial circulation — 3 paths + center corridor all clear
- **Type**: `rule`
- **Given**: Furniture placement positions (x, z footprint bounding boxes, assuming axis-aligned or worst-case rotated extents)
- **When**: Checking three 0.8 m-wide path corridors and one 1.2 m-wide center circulation band
- **Then**: (a) Entry→Timeline path: x from −4.0 to 3.5, z ∈ [−0.4, 0.4], y ∈ [0.1, 1.8], 0 solid-furniture intersections (walls exempt). (b) Entry→Desks: x from −4.0 to −1.0, z ∈ [−0.6, 0.6], same y band, 0 intersections. (c) Desks→Rear/Exit: x from −1.5 to 3.5, z ∈ [−0.6, 0.6], 0 intersections. (d) Center 1.2 m band: x ∈ [−3.2, 1.0], z ∈ [−0.6, 0.6], 0 solid-furniture intersections. (e) Each of the 2 desks has ≥ 0.8 m standoff rectangle (front of desk extending 0.8 m outward) free of other geometry. (f) Cabinet bank front has ≥ 0.8 m standoff free of geometry.
- **Pass Condition**: All six sub-clauses (a)–(f) true.
- **Evidence**: Per-furniture x/z extent ledger vs. the five rectangle/band regions; per-desk standoff rectangles; cabinet bank standoff rectangle.

#### AC-A6: Chair discipline (2 total, 0 orphan, ≤ 1 displaced)
- **Type**: `rule`
- **Given**: All chair-scale meshes (whether named "chair" or box-geometry seat objects with height 0.3–0.9 m and x/z 0.25–0.6 m)
- **When**: Counting chairs, pairing with nearest desk, measuring offset + rotation
- **Then**: (a) Total chair count = 2. (b) Each chair has a nearest desk with chair-center to desk-front-edge distance ≤ 0.9 m. (c) Displaced chair count (|rot_off_axis| > 0.35 rad OR pull_dist > 0.25 m relative to desk axis) ≤ 1. (d) 0 chairs located within the timeline viewing prism from AC-A1.
- **Pass Condition**: All four sub-clauses true.
- **Evidence**: Chair inventory with nearest desk distances and rotation offsets.

#### AC-A7: Cabinet bank meets layout rules (≥ 3, flush, 0–1 ajar, no timeline overlap)
- **Type**: `rule`
- **Given**: Cabinet bank instances in PersonnelWing
- **When**: Measuring positions, orientations, drawer-open offsets, and footprint overlaps with timeline prism
- **Then**: (a) Upright `FilingCabinet` count ≥ 3. (b) All bank cabinets on the same wall share the same face-normal orientation (drawers face ±x or ±z consistently, not mixed). (c) Center-to-wall distance for the bank ≤ 0.35 m (flush to wall). (d) Adjacent cabinet center-to-center distance ≤ (nominal cabinet width + 0.05 m) — no floating gaps. (e) Exactly 0 or 1 drawer-ajar visual meshes extend beyond the cabinet face by > 0.03 m AND ≤ 0.08 m in the drawer-open direction. (f) 0 cabinet in the bank has any footprint (x, z) inside timeline viewing prism x∈[1,3.88] z∈[−2,2].
- **Pass Condition**: All six sub-clauses true.
- **Evidence**: Per-cabinet position/orientation ledger; ajar-drawer protrusion measurements; overlap check vs prism.

#### AC-A8: Validation gates pass
- **Type**: `rule`
- **Given**: Working tree post-implementation
- **When**: Running three commands
- **Then**: (a) `npx tsc --noEmit` exit 0. (b) `npx eslint <each modified Personnel file> --max-warnings=0` exit 0. (c) `npm run build` exit 0.
- **Pass Condition**: All three commands exit 0.
- **Evidence**: Terminal outputs (stdout + exit codes) for each command, recorded in task completion evidence.

#### AC-A9: Reception frozen + other rooms untouched
- **Type**: `rule`
- **Given**: Full diff of changes vs. pre-Personnel baseline
- **When**: Listing modified files and cross-checking against forbidden list
- **Then**: Forbidden-set files `ReceptionWing.tsx`, `ReceptionLighting.tsx`, `ReceptionAuthoredMaterials.tsx`, `RecordsHall.tsx`, `CommunicationsOffice.tsx`, `ElevatorLobby.tsx`, `Sublevel.tsx` are byte-identical unless: (i) a genuine shared-system regression is documented, (ii) the edit addresses the same bug in both Reception and Personnel, and (iii) the edit does not degrade any Reception AC. Any shared out-of-scope file modified MUST have a documented rationale.
- **Pass Condition**: 0 un-justified out-of-scope modified files.
- **Evidence**: `git diff --name-only` equivalent modified-files list; byte-identity or rationale per out-of-scope file.

---

### CATEGORY B: VISUAL / SCREENSHOT-VERIFIABLE (Rubrics + Screenshot Rules)

#### AC-B1: Four required screenshots produced
- **Type**: `rule`
- **Given**: Post-implementation working tree with running dev server
- **When**: Capturing from standard camera heights (1.6 m eye)
- **Then**: Four distinct screenshots exist: (1) Entrance — camera at west portal, x≈−4, facing +x, room in view; (2) Timeline straight-on — camera at standoff distance ~2.4 m from board, board fills ~50–75% of frame, all 4 cards visible; (3) Desk + storage zone — side angle showing the 2 admin desks + cabinet bank; (4) Reverse / exit — camera near east wall looking west toward the exit portal, showing circulation and entry framing.
- **Pass Condition**: 4 screenshot references exist (file paths or attachment references) with viewpoint captions.
- **Evidence**: 4 screenshot files referenced in task completion evidence.

#### AC-B2: Identity differentiation (admin-archive ≠ Reception clone)
- **Type**: `rubric`
- **Dimension**: Same-facility cohesion with distinct wing identity.
- **Scale**: 1–5
- **Anchors**: 1 = Clone — same stain positions, same furniture plan ratio, same lighting placements as Reception; 3 = Different objects but same palette ratios and indistinguishable first-glance identity; 5 = Immediately "same facility" (institutional plaster/metal family, charcoal trim, restrained horror, cool→warm threshold→task gradient) but clearly "old admin records office": heavier cabinet-dominant vs. desk-dominant, timeline-exhibit primary focal instead of lobby-desk focal, no visitor waiting group, no front-reception desk layout, archival task lighting pools instead of a single lobby pool, decay ≤ Reception density.
- **Pass Threshold**: ≥ 4
- **Evidence**: Side-by-side of existing Reception screenshot + new Personnel screenshots 1 & 3; zoning + cabinet/desk balance inventory.

#### AC-B3: Lighting hierarchy, quality, admin-archive intimacy
- **Type**: `rubric`
- **Dimension**: Personnel lighting meets Reception readability with correct focal hierarchy and admin tone.
- **Scale**: 1–5
- **Anchors**: 1 = Old pre-rebalance Reception — only bright hotspots, rest crushed to RGB black; 3 = Generally readable but no hierarchy (signs brighter than focal content, timeline is a blown white rectangle, desk task brighter than timeline); 5 = Strict ordered brightness (Timeline primary > Admin desk > Filing > Entry threshold > Corners), warm archival/admin task tone near desks, faint cool-neutral corridor spill ONLY at threshold, hemisphere+ambient charcoal base so shadows are charcoal not black, ceiling silhouette + fixture housings read faintly, zero saturated reds, timeline readable but never a glowing white rectangle.
- **Pass Threshold**: ≥ 4
- **Evidence**: Screenshots 1, 2, 3, 4; per-light ordered intensity ledger (single-light peak values, tier check).

#### AC-B4: Material fidelity + palette + decay (Reception-quality admin-archive)
- **Type**: `rubric`
- **Dimension**: Surface quality matches Reception; decay is sparse, physically motivated, admin-appropriate.
- **Scale**: 1–5
- **Anchors**: 1 = Bare generic FacilityKit walls/floor/ceiling, no authored PBR, all grey; 3 = PBR surfaces present but wrong palette / over-decayed / grime bands / every corner has a stain; 5 = Reception-quality shared PBR (shared 1K–2K Reception base families cloned/tuned, normalScale/roughness/aoMapIntensity per surface, zero new tex dirs), aged beige-grey/faded-admin walls, dark trim, yellowed paper tones, dark-laminate/aged-wood desks, warm painted-steel cabinets. Decay ≤ Reception count: 1 damp corner near door/plumbing, ≤ 1 repair patch under it, ≤ 1 subtle peel there, 2–5 footwear scuff bands only at heavy-use spots, ≤ 1 ceiling pipe stain IF pipe/conduit actually over that spot. No full-wall grime, no procedural symmetry.
- **Pass Threshold**: ≥ 4
- **Evidence**: Screenshots 1, 3, 4; decal inventory with per-decal physical-cause annotation comment references; material tint ledger vs. Reception tints.

#### AC-B5: Timeline as physical institutional exhibit (not a webpage)
- **Type**: `rubric`
- **Dimension**: Timeline 3D board reads as a mounted institutional exhibit, with readable but compact card content and clean framing.
- **Scale**: 1–5
- **Anchors**: 1 = Cards overflow plaque, header clipped, text tiny or cards blown rectangle, no standoff/hardwood feel; 3 = Text fits but webpage-ish (perfectly centered, all flush, no physicality cues); 5 = Text fits cleanly within card bounds, headings uppercase institutional tone, pins/standoffs/hardwood-cork backing clearly reads as physical, subtle side-context plaques or sign (IDENTITY ARCHIVES / DEVELOPER JOURNEY) do not compete, lighting on the board reads the cards without glowing.
- **Pass Threshold**: ≥ 4
- **Evidence**: Screenshot 2 (timeline straight-on); bullet count per card (≤ 3 short each); header fits check.

#### AC-B6: Entry-first-glance circulation (Timeline → Desks → Exit instantly readable)
- **Type**: `rubric`
- **Dimension**: Compositional clarity of circulation from the first player glance.
- **Scale**: 1–5
- **Anchors**: 1 = Confused — wander required to find timeline, desks, exit; 3 = Oriented but center feels cluttered; 5 = Instant from entry: first the east timeline board draws eye, then left pair of admin desks below/left, rear/left filing/records at the back wall, exit portal visible behind/left. No detour around any single piece of furniture.
- **Pass Threshold**: ≥ 4
- **Evidence**: Screenshot 1 (entrance view).

---

### CATEGORY C: PERFORMANCE (Hard Numerical Ceilings)

#### AC-C1: Performance ceilings respected
- **Type**: `rule`
- **Given**: Final PersonnelWing + any new Personnel-authored wrapper source
- **When**: Measuring each metric from Constraints §Performance Ceilings table
- **Then**: Personnel actual ≤ Personnel ceiling on every row of the table. Specifically checked items: (a) New GPU-texture directories introduced = 0 (no new `/textures/*` dir paths referenced that weren't already referenced by Reception). (b) `castShadow=true` lights ≤ 3. (c) Active point/spot/area lights (excluding hemisphere/ambient) ≤ 12. (d) Unreliable flicker fixtures ≤ 1. (e) Spark / arc emitters = 0. (f) All decals (any family) total ≤ 12. (g) `InstancedDebris type=rubble` = 0. (h) `InstancedDebris type=paper` sum count ≤ 8.
- **Pass Condition**: All eight sub-clauses true.
- **Evidence**: Inventory ledgers for each metric; grep of new texture path strings; grep of `castShadow` on `<*Light` components; light count; decal count; debris count sums.

#### AC-C2: Performance discipline rubric (reuse vs. bloat)
- **Type**: `rubric`
- **Dimension**: Personnel GPU budget vs. Reception budget — disciplined reuse of shared assets, no unique bloat.
- **Scale**: 1–5
- **Anchors**: 1 = > 40% more draw calls / lights / meshes / textures than Reception; unique 4K maps per wall; 6+ shadow casters; 3 = Some reuse but several unique un-cached materials; 3–5 extra shadow casters over Reception; 5 = Heavy reuse of Reception-authored PBR via cloned-tuning (no new base texture buffers possible), ≤ 3 shadow-casting lights (prefer 1–2), decals ≤ 12 total, debris paper ≤ 8, rubble zero, props reuse shared meshes with orientation/scale-only variance, Personnel total mesh count and draw count within +10% of Reception baseline.
- **Pass Threshold**: ≥ 4
- **Evidence**: Count of `castShadow` lights; count of unique `getBasePbrTextures` / base-map directory paths; decal inventory total; debris sum; mesh count approximate (or draw count proxy from scene graph if available).

---

### CATEGORY D: CONTENT / CLAIM SAFETY (Portfolio + Claim Audit)

#### AC-D1: Portfolio claim safety audit
- **Type**: `rule`
- **Given**: All Personnel user-facing text strings (UI dossiers, inspect message text, wall plaque text, document prop content) reachable from runtime interaction or view
- **When**: Performing a claim-audit pass against `portfolioManifest` ground truth
- **Then**: (a) Every claim that appears to be an education credential, CGPA, institution name, employment, or timeline milestone is present verbatim (or a strict substring) in `portfolioManifest.education[0]`, `portfolioManifest.experience[0]`, or `portfolioManifest.timeline[*]` respectively. (b) No AWS / Azure / GCP / "Certified" / "Top 5%" / course-cert acronym claims exist unless they are a literal entry in `portfolioManifest.certifications` or a literal coursework line inside `education[0].coursework`. (c) No gore jokes, blood-vial fridge memos, or body-horror punchlines.
- **Pass Condition**: All three sub-clauses true.
- **Evidence**: String-by-string claim audit list; each claim mapped to its portfolioManifest ground-truth line.
