# Batch 6E-A: Personnel Wing Controlled Vertical Slice — Implementation Plan

Implementation decomposes every Acceptance Criterion from `spec.md` into atomic, dependency-ordered tasks. Each task includes Test Requirements (`rule` = binary pass, `rubric` = 1–5 evaluative) that mirror or narrow the parent AC. Status transitions follow Spec Mode SOP: `pending → in_progress → completed` (or blocked/cancelled with required fields).

---

## Task 1: Remove gore, heavy damage, and identity-mismatch clutter (kitchenette, cubicle bullpen, lockers, rubble, tipped cabinet, blood trail, joke memos)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Delete the `#2b0202` blood-trail mesh cluster (4 meshes at exit: lines 71–86 of current PersonnelWing.tsx).
  - Delete `type="rubble"` InstancedDebris near `[-1.5, 2.0]` (line 68).
  - Delete the tipped-over FilingCabinet group at zone 4 with `rotation={[Math.PI/2, 0, 0.3]}` (lines 238–240) and its nearby 6-count spilled-paper debris (line 245).
  - Delete Zone 2 engineering cubicles entirely: both `CubicleDivider` crosses (lines 142–143); desks B/C/D/E meshes, CRTs, lamps, box chair placeholders (lines 146–203); but SALVAGE per the classification table: `DeskPhone`, `FamilyPhoto`, `Pen`, `CoffeeMug (inspect)`, `DOC-PASSWORD (Network Login)`, `DOC-MANIFESTO (Auxilium Engineering Manifesto)` — these are retained as import-level refs and re-placed in later tasks. Delete `DOC-SPRINT-GOALS` to avoid duplicate manifesto.
  - Delete Zone 3 kitchenette entirely (lines 206–227): `OldRefrigerator`, `Microwave`, `CoffeeMachine`, `VendingMachine`, `TrashBin`, `WallSign "KITCHEN"`, `DOC-MEMO blood-vials joke`, round table, 2 painted-metal chairs.
  - Delete Zone 5 lockers bank (lines 255–277): 3.0 m × 2.0 m painted-metal bank, 2 open doors, backpack, DOC-MEETING inside. Retain DOC-MEETING *content* string ("Department notice: verify development credentials on the central board") as a JS-level variable to re-place later; delete the locker placement itself.
  - Delete Zone 4 old `DOC-SECURITY "Lockdown overridden / Facility compromised"` floor text (line 242). Content for this position will be replaced in Task 5/6.
  - After deletion sweep, trim unused imports (but keep imports for salvaged components listed above: FilingCabinet, ArchiveBoxStack, OfficePrinter, DeskPhone, FamilyPhoto, Pen, CoffeeMug, AudioRecorder, CassetteTape, DeskLamp, CRTMonitor, Keyboard, NoticeBoard, DocumentProp + all portfolio-content-bearing docs). Do not delete DeveloperTimelineWall or ExperiencePlaque imports.
  - Tally remaining `InstancedDebris count={N}` across file. If paper debris total > 8, delete the Zone-3/Zone-4 clusters and any remaining random papers until total ≤ 8. (Target after Task 1: 0 paper debris, because Task 6/8 will place a small Reception-like 5–7 total intentionally.)
- **Acceptance Criteria Addressed**: AC-A2, AC-A3, AC-A9, AC-D1(c), partially AC-A5 (clutter removed sets up circulation)
- **Test Requirements**:
  - `rule` TR-1.1: `grep -c` / source audit: 0 matches for regex `#2b0202` in PersonnelWing.tsx; 0 `type="rubble"` InstancedDebris; 0 `rotation={[Math.PI/2` on FilingCabinet-scale groups; 0 JSX of components `OldRefrigerator | Microwave | CoffeeMachine | VendingMachine | CubicleDivider` (case-insensitive component/var names); 0 `locker` keyword as a component name (comment refs allowed); 0 `blood vials` string anywhere in Personnel scope.
  - `rule` TR-1.2: Sum of all `InstancedDebris count={N}` values (paper only) in PersonnelWing.tsx after Task 1 ≤ 8 (0 is fine).
  - `rule` TR-1.3: `npx tsc --noEmit` exit 0 after this task (no dangling references / broken imports / empty `<group>` shells left).
  - `rule` TR-1.4: Import lines in PersonnelWing.tsx reference only components that are used after Task 1 (or that will be used in Tasks 3–8 as classified salvage — listed salvage allowed). No unused imports flagged by TR-1.6 ESLint below.
  - `rule` TR-1.5: No orphan empty `<group position={...}></group>` shells remain from deleted Zone 2/3/5 JSX (close or delete empty wrapper groups).
  - `rule` TR-1.6: Targeted ESLint on PersonnelWing.tsx: `npx eslint src/game/World/rooms/PersonnelWing.tsx --max-warnings=0` exit 0 (unused-import / unused-var / render-purity checks).
  - `rubric` TR-1.7: Cleanliness of deletion sweep. Scale 1–5; 1 = dangling references, broken imports, 5+ empty group shells, warnings under eslint; 3 = components removed but unused imports / 1–2 empty shells remain; 5 = imports cleaned to salvage set, JSX wrapper groups either repurposed or closed cleanly, file compiles + lints with 0 warnings. Threshold ≥ 4.
- **Notes**: Salvaged component imports retained for later tasks are explicitly: DocumentProp (portfolio docs + manifesto + password + meeting), ExperiencePlaque, DeveloperTimelineWall, FilingCabinet, ArchiveBoxStack, OfficePrinter (optional), PaperworkStack, NoticeBoard, FacilitySignPanel, DeskPhone, FamilyPhoto, Pen, CoffeeMug (single), AudioRecorder, CassetteTape, DeskLamp × 1–2, CRTMonitor × 0–1, Keyboard × 0–1, SupervisorDesk + chair. Prefer keeping if the classification table says KEEP/MOVE/REPURPOSE; REMOVE items deleted.

---

## Task 2: Create PersonnelAuthoredMaterials.tsx (PBR hero-surface thin wrapper reusing Reception base families with admin tints)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None (parallel-safe; independent of Task 1 deletions)
- **Description**:
  - New file: `src/game/World/materials/PersonnelAuthoredMaterials.tsx`.
  - Re-uses EXACTLY the same base map directories as Reception (`/textures/reception/floor`, `/textures/reception/ceiling`, `/textures/reception/wall`) — ZERO new texture directories, ZERO new image files.
  - Pattern: Either (a) import the existing `useClonedPbrMaps` hook pattern from `ReceptionAuthoredMaterials.tsx` and re-wrap it with Personnel tint/normalScale/roughness/aoMapIntensity overrides, OR (b) if importing that hook would require editing a Reception-specific file, duplicate the hook pattern into PersonnelAuthoredMaterials with the same `/textures/reception/...` base paths (same browser cache dedup; zero new GPU dirs because the path strings are identical). Choose the approach that DOES NOT edit any Reception-specific file.
  - Exports (drop-in same positional/args API as Reception hero components): `PersonnelHeroFloor`, `PersonnelHeroCeiling`, `PersonnelHeroWall`. Admin palette per NFR-6: walls beige-grey / faded-admin (~#9a937d, slightly more olive than Reception's #989380); floor deeper/warmer than Reception vinyl; ceiling same acoustic grid family but less discoloration than Reception (admin ceiling less leaky). Tint values are parameters, not hard-coded image files.
  - Re-export decay decal families EITHER (a) directly from `ReceptionAuthoredMaterials` through this file as re-exports (e.g. `export { ReceptionWaterStreak as PersonnelWaterStreak, ... }`) — chosen because it's cheap — OR (b) re-use them directly in the room file from ReceptionAuthoredMaterials. Pick one strategy and keep imports clean. Do NOT define new canvas decal types.
  - New export names for Personnel if re-exported: `PersonnelWaterStreak`, `PersonnelDampPatch`, `PersonnelRepairPatch`, `PersonnelPeelingPaint`, `PersonnelRustBleed`, `PersonnelCeilingPipeStain` — all thin parameter defaults with admin-appropriate opacities/scales if desired, or straight re-exports (both fine).
- **Acceptance Criteria Addressed**: AC-B2, AC-B4, AC-C1 (0 new tex dirs), AC-C2, partially AC-B3 (surface quality sets up lighting readability)
- **Test Requirements**:
  - `rule` TR-2.1: PersonnelAuthoredMaterials.tsx references only `/textures/reception/*` base-map directory paths (floor/ceiling/wall); `grep` for `/textures/` shows ONLY reception paths.
  - `rule` TR-2.2: All three exports `PersonnelHeroFloor / PersonnelHeroCeiling / PersonnelHeroWall` exist and accept `(position, args)` with same convention as Reception hero components (args = [width, depth] for floor, [width, thick, depth] for ceiling, [width, height, thick] for wall) — so they drop in as 1:1 replacements for FacilityFloorSection/FacilityCeilingGrid/FacilityWallSegment in Task 3.
  - `rule` TR-2.3: `npx tsc --noEmit` exit 0; `npx eslint src/game/World/materials/PersonnelAuthoredMaterials.tsx --max-warnings=0` exit 0.
  - `rubric` TR-2.4: Admin palette identity vs. Reception clone. Scale 1–5; 1 = identical tints to Reception (color values diff < 2 on 0–255 per channel across walls/floor/ceiling); 3 = tints differ but PBR parameters read flat (normalScale too low or roughness too high so surface detail lost); 5 = same PBR fidelity as Reception, clearly same facility family (charcoal shadows, tile relief, acoustic grid normal), clearly "older admin plaster" distinct tint vector (wall more beige-olive, floor warmer/deeper) so side-by-side with Reception screenshot never reads as clone. Threshold ≥ 4.
  - `rule` TR-2.5: Zero edits to `ReceptionAuthoredMaterials.tsx` (byte-identical check per AC-A9 evidence). Confirms Task 2 did not touch a Reception-specific file.
- **Notes**: Extracting a shared PBR helper across both wings would edit Reception scope → forbidden. If hook code must be duplicated with identical paths, duplicate in Personnel file rather than modifying Reception. Performance ceiling (AC-C1) cares about new texture DIRECTORIES introduced, not about helper code duplication.

---

## Task 3: Rewire architecture (FacilityKit → PBR hero surfaces + west portal frame + preserve room envelope)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1 (deleted clutter so clean architecture block) + Task 2 (Personnel hero surfaces available)
- **Description**:
  - Replace architecture block lines 26–37:
    - Out: `FacilityFloorSection args=[8.5, 8.5] position=[-0.25, -0.5, 0]`
    - In: `PersonnelHeroFloor args=[8.5, 8.5] position=[-0.25, -0.5, 0]`
    - Out: `FacilityCeilingGrid args=[8.5, 0.1, 8.5] position=[-0.25, 2.9, 0] hasLights=false`
    - In: `PersonnelHeroCeiling args=[8.5, 0.1, 8.5] position=[-0.25, 2.9, 0] hasLights=false` (or same convention — ceiling grid allowed; PBR surface on top)
    - Out: three `FacilityWallSegment` (rear/front/right at lines 31–33)
    - In: three `PersonnelHeroWall` at same positions and args
    - West partial wall segments above entry at lines 36–37: keep as `PersonnelHeroWall` with same args (0.2 × 3.2 × 2.5 halves; 3.0 m portal preserved). Geometry sizes MUST stay identical to current (8.5 × 8.5 floor, 3.0 m west entry).
  - Add west entry portal dark-metal frame, exactly matching the Reception wing-portal pattern (ReceptionWing.tsx lines 123–134 style): 1 lintel across the 3.0 m opening top, 2 vertical casings at the 1.5 m left/right jambs. Use `FacilityMaterial kind="painted-metal"` color `#14191d` (same dark charcoal as Reception portals for facility family coherence). Do NOT add a new FacilitySignPanel inside the room here (that's done in Task 5/6 if desired) — the east-corridor sign already exists in ReceptionWing.tsx outside Personnel scope and is untouchable.
  - Keep CableConduitRun and any low-cost MEP surfaces that don't obstruct (classification item 49 KEEP).
- **Acceptance Criteria Addressed**: AC-B2, AC-B4, AC-B6 (entry framing → first glance readability), AC-C2, AC-A9
- **Test Requirements**:
  - `rule` TR-3.1: 0 references to `FacilityFloorSection | FacilityCeilingGrid | FacilityWallSegment` remain inside PersonnelWing.tsx for the room hero architecture (FacilityKit props at furniture/fixture level like FacilityFluorescent are allowed and not counted here).
  - `rule` TR-3.2: West entry portal frame exists: ≥ 1 lintel mesh + ≥ 2 casing meshes; all `FacilityMaterial kind="painted-metal"`; opening width between partial wall ends = 3.0 m (matches `z∈[-1.5, 1.5]` between wall segments ends at x=−4).
  - `rule` TR-3.3: Room envelope unchanged — floor args [8.5, 8.5], wall height 3.2, ceiling y≈2.9; west entry 3.0 m open portal preserved.
  - `rubric` TR-3.4: Architectural surface quality vs. Reception clone bar. Scale 1–5; 1 = bare walls with no PBR detail (wrong fallback), or palette identical to Reception; 3 = PBR present but portal frame missing / misaligned; 5 = PBR detail matches Reception, frame identical to Reception portal pattern (dark charcoal, consistent facility-family), ceiling/wall/floor silhouettes readable in low light (will be further validated in Task 7 lighting screenshots). Threshold ≥ 4.
  - `rule` TR-3.5: `npx tsc --noEmit` exit 0; targeted ESLint `--max-warnings=0` exit 0 on modified Personnel files.

---

## Task 4: Zone A — Timeline Wall (protected sightline enforcement + card text trim + subtle side context plaques)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1 (lockers/old-Zone4 obstructions deleted) + optionally Task 3 (hero walls in place, but timeline JSX can be edited in parallel with Task 3)
- **Description**:
  - Keep the `InteractableObject` wrapper for `DeveloperTimelineWall` exactly preserved: `label="Developer timeline"`, `interactionKind="VIEW"`, `interactionRange=3.2`, `priority=3`, `onInteract` payload mapping `portfolioManifest.timeline → VIEW-DEVELOPER-TIMELINE` dossier with full bullets. Do NOT delete or modify the interaction wrapper. Keep board JSX position `[3.88, 1.6, 0]` rotation `[0, -π/2, 0]` unchanged.
  - **Read and edit** `DeveloperTimelineWall.tsx` if (and ONLY if) the 3D card surface renders the full long `entry.bullets[]` array text onto the 3D plane. Trim per FR-9: per card on the 3D plane, render ≤ 3 short bullets of ≤ 80 chars each. The `inspectDocument` VIEW payload (the dossier overlay) still passes the full bullets list losslessly. If DeveloperTimelineWall already complies (only headings + 2 short bullets per card on the 3D plane), mark this sub-task "no change required" and record in evidence.
  - Add subtle secondary side-context plaques flanking the timeline board (NOT above / covering / overlapping the 4 cards or header plaque). Use existing `FacilitySignPanel` component, already used by Reception above wing portals (import if needed). Left plaque: `IDENTITY ARCHIVES`, subtitle `PERSONNEL RECORDS // SECTION-02`, accent `#c9b98f` (same warm gold as Reception east-personnel accent). Right plaque: `DEVELOPER JOURNEY`, subtitle `VERIFIED CAREER TIMELINE`, same accent. Place them on the north/south ends of the east wall OUTSIDE the 4-card visible frame. Keep brightness hierarchy: these plaques are secondary (≤ ½ timeline's light budget on their surfaces); never brighter than timeline cards.
  - Add a JSX block comment above the timeline group documenting the PROTECTED VIEWING PRISM boundaries: `x∈[1.0, 3.88], z∈[-2.0, 2.0], y∈[0.0, 2.8]`. No prop placed hereafter may violate this prism.
- **Acceptance Criteria Addressed**: AC-A1, AC-B5, AC-B3 (hierarchy check — timeline brightest), partially AC-A4 (Developer Journey framing phrase), FR-9
- **Test Requirements**:
  - `rule` TR-4.1: Bounding-box code check — all furniture/prop placements after Task 4 (and remainder of plan) have (x, z) outside `(x∈[1.0, 3.88], z∈[-2.0, 2.0])` footprint OR are themselves the timeline board (position x=3.88 → on the far plane of the prism, allowed). Tiny debris ≤ 3 allowed only if each instance is < 0.04 m³ extent (no furniture/cabinets/chairs allowed).
  - `rule` TR-4.2: Per-card on-3D-plane bullet count ≤ 3 short bullets; each bullet ≤ 80 chars on the 3D plane (measured by reading DeveloperTimelineWall.tsx card bullet source). The `inspectDocument` VIEW payload still contains full-length bullets for each entry (lossless).
  - `rule` TR-4.3: Interaction wrapper preserved exactly — grep confirms: `label="Developer timeline"`, `id="VIEW-DEVELOPER-TIMELINE"`, `interactionKind="VIEW"`, `interactionRange={3.2}`, `priority={3}` all match byte-for-byte.
  - `rule` TR-4.4: PROTECTED VIEWING PRISM comment exists in PersonnelWing.tsx.
  - `rubric` TR-4.5: Timeline polish quality (physical exhibit vs. webpage feel). Scale 1–5; 1 = text clips / header overflows plaque / cards blown rectangle / no side plaques; 3 = text fits but side plaques absent or positioned incorrectly (inside card viewing area); 5 = text fits cleanly, headings uppercase, hardwood/cork/standoff backing reads as physical, side-context plaques flank the board at north/south ends (outside card frame), accent matches facility, hierarchy "cards first, plaques second" reads visually. Threshold ≥ 4.

---

## Task 5: Zone B — Personnel Admin Desks (2 desks max; chair discipline; portfolio content placement)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1 (bullpen deleted) + Task 3 (architecture set so desk footprints don't collide with circulation bands)
- **Description**:
  - Desk B-1 (Supervisor / Senior Personnel Admin desk): Place `SupervisorDesk` prop (from PersonnelProps, L-shape, reused) at approximately `[-1.6, 0, -2.0]` — rear-left (southwest) quadrant, FACING into center of room slightly (rotation ~π/2). Verify desk x/z footprint does NOT enter the center 1.2 m circulation band (Task 9 rectangle `x∈[-3.2, 1.0], z∈[-0.6, 0.6]`). Place:
    - `ExperiencePlaque` (Springer Capital, `portfolioManifest.experience[0]`)
    - `DocumentProp` Academic & Education Record (HKBK, CSE, 2023–2027, CGPA 8.93/10) — the verified portfolio strings all present here OR in the plaque + B-2 combined (FR-8 requires 6/6 total, not all on one desk)
    - `DocumentProp` Developer Manifesto (Auxilium Engineering Manifesto: 3 rules + "Don't forget why you started") → single developer-culture document on B-1 (avoid duplicate with Sprint Goals deleted in Task 1)
    - `AudioRecorder` + `CassetteTape` + INSPECT "Tape log" message (institutional-horror appropriate, preserved exactly)
    - `DeskLamp` on
    - Optional `CRTMonitor` off (Reception standby LED pattern = subtle; single faint green LED on bezel; not glow — toneMapped false, emissiveIntensity ~2.4 like Reception) OR omit — ≤ 1 CRT in the room total (avoid 2 CRTs if not needed).
    - Optional `Keyboard` — ≤ 1 total across both desks; not mandatory.
    - Placeholder Supervisor Chair (box geom from old zone 1): chair-center within 0.9 m of desk front edge; displaced ≤ 0.25 m / ≤ 0.35 rad (either chair 1 or 2 can be the single displaced one, not both)
  - Desk B-2 (Identity / Intake desk): Place a simple rectangular desk surface ~same height as B-1 (y=0.75 top, z=+1.8 area — northwest-ish quadrant). Use a box-geometry top with `FacilityMaterial kind="wood"` tinted dark-laminate `#443628` or equivalent admin desk tone, plus metal legs. Or reuse a second SupervisorDesk if it fits the footprint without overwhelming. Ensure both desks together do not block center 1.2 m band. Place:
    - `DeskPhone` (salvaged from old Desk C; dropped receiver subtle if desired)
    - `FamilyPhoto` (salvaged from old Desk D; small human-trace on intake desk)
    - `Pen` (salvaged from old Desk D; tiny surface detail)
    - `DocumentProp` Network Login Credentials (kapoor.a, 3 clues ICETM2026 / LOCALFIRST / NOCLOUD) OR alternatively place this on cabinet bank top in Zone C (choose one location; not both). Gameplay clues appropriate for admin identity/intake area.
    - ≤ 1 `CoffeeMug` total across BOTH desks combined (from old Desk C INSPECT "Late-night debugging sessions"). Place on ONE desk only; upright or spilled allowed; single total.
    - Second chair (placeholder box geom; mate to B-2 front edge; within 0.9 m). If B-1's chair was flush, this one can be the ≤ 1 displaced chair (rotated slightly / pulled back ≤ 0.25 m) for abandonment storytelling.
  - Content audit after placement: confirm 6/6 FR-8 phrases present across (ExperiencePlaque + AcademicDoc + ViewTimeline framing + side-context DEVELOPER JOURNEY plaque from Task 4): HKBK, CSE, 2023–2027, CGPA 8.93, Springer Capital, Developer Journey/Timeline framing.
  - Chair count MUST be exactly = 2 after placement (no extras floating; no deleted-desk chair placeholders remaining from Task 1).
- **Acceptance Criteria Addressed**: AC-A2 (desk count = 2), AC-A4 (content), AC-A5 (paths + standoffs), AC-A6 (chair discipline: 2 total, ≤1 displaced, no orphan), AC-B6 (entry-first-glance — desks read left pair), AC-D1 (content + no fabricated certs)
- **Test Requirements**:
  - `rule` TR-5.1: Desk count exactly = 2 admin-desk surfaces in Zone B; chair count exactly = 2; displaced chair count ≤ 1; every chair center-to-nearest-desk-front-edge distance ≤ 0.9 m; 0 chairs in timeline viewing prism.
  - `rule` TR-5.2: Per-desk standoff ≥ 0.8 m front rectangle clear of other geometry; combined center corridor ≥ 1.2 m clean (verified per positions).
  - `rule` TR-5.3: 6/6 FR-8 required portfolio strings confirmed present via grep/audit (grep listing each string + its source site); 0 strings matching AWS / "Certified" / non-HKBK fabricated institutions / employment other than Springer Capital.
  - `rule` TR-5.4: 0 CoffeeMug JSX instances where count > 1 total; CoffeeMug component used ≤ 1 time in PersonnelWing.tsx after this task.
  - `rubric` TR-5.5: Admin desk believability vs. generic clutter. Scale 1–5; 1 = props random / every object interactive / crowded / sparse; 3 = desks present but no B-1/B-2 role differentiation; 5 = placement clearly reads supervisor/admin (internship + education plaques + audio log on B-1) vs. front identity/intake (photo, phone, login clue, single mug on B-2), items per desk not crowded, both desks clearly useable. Threshold ≥ 4.

---

## Task 6: Zone C — Filing / Archive Storage (3-cabinet flush bank + 1 ajar drawer + boxes + sign + scuffs + optional printer)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1 (old Zone 4 deleted) + Task 4 (timeline prism locked, so bank placement avoids it)
- **Description**:
  - Choose a NON-TIMELINE WALL: either NORTH (rear, z≈−3.9 facing +z) or SOUTH (front, z≈+3.9 facing −z) or WEST (partial wall areas flanking entry flanking, facing +x). NORTH preferred for admin-archive back-of-room feel.
  - Place clean bank of 3 `FilingCabinet`: 2 salvaged upright from old Zone 4 (both reuse) + 1 new instance of the same component (adds to 3). All three flush to the chosen wall, uniform orientation (drawers face ±z or ±x consistently — bank rule), adjacent spacing ≤ 0.05 m between cabinet centers (no floating gaps), each unique cabinetId like `PERSONNEL_CABINET_1 / _2 / _3`.
  - Exactly ONE drawer slightly ajar (pulled ~0.06 m out), following Reception's open-drawer visual pattern: small 0.06 m extruded drawer mesh + inside-gap paper-color mesh peeking through (already patterned in ReceptionWing.tsx lines 342–358; replicate the JSX pattern here for one cabinet). Subtle storytelling — not a 90° tipped cabinet.
  - Above the cabinet bank top surface: 1 or 2 `ArchiveBoxStack` (count=1 each, so total 1–2 archive boxes on top; old "PERSONNEL // 2024–2025" label reused or relabeled to "PERSONNEL // IDENTITY FILES" admin-appropriate). Plus 1 `PaperworkStack` with folder color `#44382c` (darker admin brown), sheets=8–12 (not 16+). Also relocate the old floating PaperworkStack from line 253 `[-1.7, 0.8, -3.1]` (from Task 1 classification) onto this cabinet top.
  - Add `FacilitySignPanel` above the cabinet bank or to one side on the same wall: title `PERSONNEL RECORDS // IDENTITY ARCHIVE`, subtitle `SECTION-02 // FILE CONSOLIDATION ACTIVE`, accent `#c9b98f` (matching Task 4 timeline side plaques and Reception east-wing signage color).
  - Optional ONE `OfficePrinter` placed NEAR the bank but NOT in the 0.8 m drawer standoff path (e.g., to the side of the bank in a corner, still on the north/south wall line, offset so standoff rectangle remains clear). If printer feels crowded, REMOVE it (Task 1 classification MOVE-or-REMOVE; choose based on space).
  - On floor in front of cabinet bank standoff: 2 small `FloorScuffDecal` (scale 0.4–0.8, opacity 0.38–0.48, rotated) to imply drawer-kick footwear wear (physically motivated). These count toward Task 8's decal total of ≤ 12.
  - Relocate DOC-MEETING content (salvaged "Department notice: verify development credentials on the central board") onto a small `NoticeBoard` near the cabinet bank wall OR onto the Zone D entry-memo position (choose one location per Task 6/7 plan; keep ≤ 1 wall memo total per FR-10 cap).
- **Acceptance Criteria Addressed**: AC-A2 (Zone C zoning), AC-A5 (cabinet standoff ≥0.8 m), AC-A7 (cabinet bank ≥3, flush, 0–1 ajar, no timeline overlap), AC-B2 (cabinet-dominant vs. Reception desk-dominant), AC-B6 (first-glance reads "filing at rear"), partially AC-B4 (cabinet scuff decals = physically motivated wear)
- **Test Requirements**:
  - `rule` TR-6.1: Upright FilingCabinet count ≥ 3; uniform orientation; center-to-wall ≤ 0.35 m flush; adjacent spacing ≤ (cabinet width + 0.05 m); exactly 0 or 1 ajar-drawer visuals (extension > 0.03 m AND ≤ 0.08 m); zero rotated/damaged cabinets.
  - `rule` TR-6.2: ≥ 0.8 m drawer standoff zone clear of furniture/printer geometry; zero cabinet bank footprint overlap with timeline viewing prism x∈[1,3.88] z∈[−2,2].
  - `rule` TR-6.3: ArchiveBoxStack count ≥ 1 on cabinet top; PaperworkStack count ≥ 1 on cabinet top (relocated floating stack counts).
  - `rubric` TR-6.4: Filing zone balance (not empty, not hoard). Scale 1–5; 1 = 1 lonely cabinet or 5+ dense unflush wall; 3 = OK but no labels / no scuffs / no ajar drawer; 5 = 3 flush cabinets, 1 ajar drawer with paper peek, 1–2 archive boxes + 1 paperwork stack on top, sign plaque labels section, 2 small scuffs in front, printer either absent or cleanly offset to side — reads as personnel records, not storage closet, not cubicle mess. Threshold ≥ 4.

---

## Task 7: Zone D — Small Human-Trace Area + optional single cleaning trolley (FR caps enforced)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Tasks 5, 6 (desks + filing placed, so human-trace items are placed around them; avoid duplicate placement)
- **Description**:
  - FR-10 / FR-6 caps (max quantities already partially enforced by Tasks 5/6; this task audits and adds any remaining Zone D items to reach the restrained "abandoned admin silence" feel without re-breaking caps):
    - CoffeeMug total: already placed = 1 on B-1 or B-2 (Task 5 rule). Audit: still = 1, good.
    - FamilyPhoto total: 1 on B-2 identity desk (Task 5 rule). Good.
    - CassetteTape + AudioRecorder pair: 1 pair on B-1 (Task 5 rule). Good.
    - Wall memo ≤ 1 total (DOC-MEETING "verify credentials on central board" — this task mounts it on a small NoticeBoard or tiny tilted DocumentProp at WEST WALL near entry (not beside timeline / not beside B-1 / not beside filing sign if that's already cluttered). Small edge-peel visual allowed; peel = subtle, not torn. Place at `x≈−3.9, z≈−1.0` on the south-west partial wall face (outside center circulation corridor, > 1.5 m from timeline and B-1 desk per FR-6). If Tasks 5/6 already placed this memo on filing wall NoticeBoard, SKIP duplicate.
  - Cleaning trolley / service prop: CHOOSE (0) or (1). If (1), place `CleaningTrolley` (shared Reception prop component, import if needed) in DEEP service corner — e.g. `[-4.0, 0, 4.0]` (south-west corner, outside center circulation corridor z∈[−0.6, 0.6], > 1.5 m from timeline (x=3.88) and > 1.5 m from B-1 supervisor desk (~x=−1.6, z=−2.0). If the corner feels genuinely empty without it, use 0. Default choice: 1 trolley ONLY if corner is genuinely empty; otherwise 0 trolley preferred (less is more for admin silence). No loose mops / buckets / janitorial small clutter beyond the trolley.
  - Final cap audit after Task 7: ≤ 1 mug, ≤ 1 family photo, ≤ 1 cassette/audio pair, ≤ 1 wall memo slightly tilted/peel, ≤ 1 trolley (or 0). No re-introduction of vending, fridge, microwave, lockers.
- **Acceptance Criteria Addressed**: AC-A2 (Zone D 4th zone), AC-A6 (service prop placement outside circulation & >1.5 m from focal portfolio), AC-B6 (entry first-glance doesn't hit trolley), FR-10 storytelling caps
- **Test Requirements**:
  - `rule` TR-7.1: CoffeeMug count ≤ 1; FamilyPhoto ≤ 1; CassetteTape/AudioRecorder ≤ 1 pair; cleaning trolley/mop/bucket count ≤ 1 trolley; no other service props. Wall memo (NoticeBoard + DocumentProp memo) count ≤ 1; memo position corner/entry side, outside center 1.2 m circulation band, > 1.5 m from timeline prism boundary (x<2.388) AND > 1.5 m from supervisor desk (distance calc using positions).
  - `rule` TR-7.2: Grep for `OldRefrigerator | Microwave | CoffeeMachine | VendingMachine | TrashBin | KITCHEN` strings in PersonnelWing.tsx after this task → 0 matches (Task 1 deletion confirmed no re-introduction).
  - `rubric` TR-7.3: Human-trace quality. Scale 1–5; 1 = none or crowded (every surface has an item, every object interactive, trolley front-and-center blocking path); 3 = present but generic (mug same side as photo — no narrative role); 5 = sparse, each item tied to a narrative role (identity photo on intake desk, cassette interview log on supervisor desk, ≤ 1 tiny tilted memo by door, maybe 1 trolley deep in service corner) — "abandoned admin silence" not "messy break room". Threshold ≥ 4.

---

## Task 8: Personnel Lighting Rebalance — layered rig (Reception 16-point pattern mirrored with correct admin hierarchy)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Tasks 3, 4, 5, 6 (all zones placed so lights target correct surfaces)
- **Description**:
  - Build the rig either (a) inlined inside a `<group>` in PersonnelWing.tsx or (b) new dedicated file `src/game/World/rooms/PersonnelLighting.tsx` if the group exceeds 60 lines. Option (b) preferred for maintainability (mirrors Reception structure without editing ReceptionLighting).
  - Layered rig spec:
    - **Global base**: `hemisphereLight args=["#b5a789", "#3a3126", 0.85]` or similar warm sky + charcoal ground. Tiny `ambientLight intensity=0.22 color="#a89980"`. No absolute black shadows.
    - **Ceiling silhouette read fill**: 1 point at y≈2.8, room center-ish, `intensity≈0.7 distance≈6.5 color="#a5977e"` — faint enough so ceiling grid, pipes, conduits, fixture housings read.
    - **Overhead fluorescents**: 1 or 2 `FacilityFluorescent` OR inline `StableFluorescent` (copied pattern, not imported from ReceptionLighting.tsx to avoid edit). Place one over Zone B desks, one optional near center. Position NOT directly above timeline board (timeline gets its dedicated primary light). 0 unreliable flicker fixtures (Personnel = calmer admin area, not reception lobby with broken equipment) OR 1 max at Reception rarity (22–54s gaps, sag-only dip). Default: 0 flicker. 0 sparks anywhere in Personnel.
    - **Zone A Timeline PRIMARY — brightest single light in room**: 1 broad soft `spotLight` slightly warm archival tint `#d6bf94`, `intensity≈8.0–9.5 angle≈0.85 penumbra≈0.88, decay≈1.85`, target=timeline center `[3.88, 1.6, 0]`, position high in front of board `[2.6, 2.4, 0]` so cone covers card plane, not floor. Optionally `castShadow=true` (1 of ≤ 3 shadow lights allowed). Shadow mapSize 2048×2048 if enabled; shadow bias −0.0005.
    - **Zone A board card-edge grazing**: 1 small point light at `[3.6, 1.6, ±0.6]` (choose one side or averaged pos), radius≈2.2 m, intensity≈0.8, warm tint — catches standoff/hardwood edges.
    - **Zone A board surface bounce**: 1 point at board center y≈1.6, intensity≈1.6, distance≈3.5, warm — cards read by surface light, NOT by self-emission.
    - **Zone B desks (2 task lights)**: `FacilityTaskLight` × 2 or small point sources above each desk. Intensity ~0.9–1.1 each; warm tungsten tint ~#e4d6ad per Personnel old task-light color. Second brightest tier (each < Timeline primary).
    - **Zone C filing cabinet bank**: 1 soft warm point above bank center, ~intensity 0.75, radius ~3.0 m — dimmer than desks.
    - **Entry threshold (cool neutral)**: 1 point just inside west portal `x≈−4.75, y≈2.3, z≈0`, `color="#8a99a8"`, `intensity≈1.1`, `distance≈4.5`, `decay≈2.15`. Player sees "corridor spill → doorway → interior darkness." No bright corridor wash.
    - **Optional mid-room warm texture fill**: 1 broad low point at y≈1.5 center-ish, `intensity≈0.8–1.0 distance≈8 color="#9c8f78"` — prevents foreground crushing on first step in.
    - **Optional dark metal entry frame highlight**: 1 faint point on portal lintel, < 0.6 intensity — shows frame without dominating.
    - **Hierarchy ledger (per-light peak ordered) MUST be**: Timeline spot (8–9.5) > each Zone B desk task ×2 (0.9–1.1 each) ≈ Entry threshold (1.1) > Zone C filing (0.75) > mid-fill (0.8) ≈ ceiling silhouette (0.7) > hemisphere + ambient (no direct peak) > periphery (zero dedicated lights).
    - **`castShadow=true` count ≤ 3**: Typical: (1) Timeline spot, (2) maybe B-1 desk task if needed, (3) optional. Most point lights do NOT cast shadows.
    - Remove the OLD Personnel entry `spotLight` at line 63 (intensity 2.0, distance 10, color `#aaccff`, angle 0.8) — its job is replaced by the new cool-neutral threshold point above, and the old spot aimed at `[0,0,0]` would fight hierarchy (it was lighting generic center, not a focal plane).
    - **Timeline NOT a glowing rectangle**: If DeveloperTimelineWall cards use `meshBasicMaterial toneMapped={false}` with strong emissive/base, nudge to `meshStandardMaterial color=<paper color> roughness≈0.95 metalness=0` (zero emissive) so the cards respond to Zone A lights. Text can stay `toneMapped={false}` for readability (standard pattern).
    - **Zero saturated reds**: No Personnel light with color R-channel hex > `0x44` AND G/B < 0.5×R (Personnel has no rear-gate-guard scenario; Reception-only). Personnel avoids even Reception's faint gate red.
- **Acceptance Criteria Addressed**: AC-B3 (hierarchy & quality rubric), AC-B5 (timeline polish lighting), AC-A3 (no sparks / flicker ≤ 1 / rubble zero already Task 1), AC-C1 (shadow lights ≤ 3 / total lights ≤ 12 / sparks zero)
- **Test Requirements**:
  - `rule` TR-8.1: Old entry spotlight `{ intensity: 2.0, distance: 10, color: "#aaccff" }` removed (grep for those param values or near-equivalent, or confirm that exact `spotLight` line no longer exists). New threshold point ≤ 1.3 intensity.
  - `rule` TR-8.2: `castShadow=true` on Personnel scoped lights ≤ 3.
  - `rule` TR-8.3: Count of point/spot/area light components in Personnel rig (excluding hemisphereLight + ambientLight, but including DeskLamp integrated spotlights if they add lights) ≤ 12 total.
  - `rule` TR-8.4: Hierarchy ordering — timeline primary peak intensity > each Zone B desk task light intensity individually; Zone C filing intensity ≤ each Zone B desk intensity; entry threshold intensity ≤ Zone B desk intensities. Measured by numeric source peak values on each light (intensity props).
  - `rule` TR-8.5: Unreliable flicker fixtures ≤ 1 (0 preferred). Spark emitter components / SparkingCable-like per-frame arcs = 0.
  - `rule` TR-8.6: Zero Personnel lights with `color` R > 0x44 and G/B ratio < 0.5 (prevents alarm-red aesthetic).
  - `rubric` TR-8.7: Cinematic institutional darkness, not underexposure. Scale 1–5; 1 = crushed foreground black / only focal planes lit, rest void; 3 = Readable but only 3 of 5 surface families read well; 5 = Dark but readable everywhere (floor tile relief, plaster wall relief normal/ao reads, ceiling grid + pipes/conduit silhouette, desk form factors, timeline header + all 4 cards read, cabinet bank drawer fronts read). Shadows charcoal not RGB black; warmth near archival tasks, cool only at threshold; clear focal hierarchy. Threshold ≥ 4. Evidence support: Screenshots 1 (entrance) + 2 (timeline) + 3 (desk/storage).

---

## Task 9: Sparse physically-motivated Personnel decals (≤ 12 total, all with causes)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 3 (hero surfaces present) + Task 6 (cabinet scuffs already placed 2 → count toward total) + Task 8 (lighting so decals read)
- **Description**:
  - Total decal cap = 12 (AC-C1). Typical target plan = 9–11 (leaves margin):
    1. Damp patch near west entry (door/window leak plausible): 1 `PersonnelDampPatch` (or WaterStainDecal existing ceiling variant reused for wall; DampPatch Reception family). Position at `x≈−4.88, y≈0.6, z≈±3.0` on south-west or north-west inside-corner. Scale ~0.8×0.6, opacity ~0.45.
    2. Plaster repair patch under damp (cause → effect): 1 `PersonnelRepairPatch` same corner, centered ~0.2 m above damp peak (leak was once fixed).
    3. Subtle peeling paint in same damp corner: 1 `PersonnelPeelingPaint`, only in that corner (cause → effect).
    4. Short water streak descending entry door lintel or wall edge above damp: 1 `PersonnelWaterStreak` in same corner (descending vertical run above damp, source = lintel).
    5–6. Cabinet bank front footwear scuffs (Task 6 already placed 2): count them here, keep = 2.
    7. Front of B-2 identity/intake desk footwear scuff: 1 `FloorScuffDecal`.
    8. Entry threshold circulation wear scuff: 1 `FloorScuffDecal` near portal `x≈−3.6, z≈0` area, scale ~1.2×0.8, opacity ~0.35.
    9. Ceiling pipe/conduit stain above CableConduitRun path (only if conduit/pipes actually run there — Task 3 kept CableConduitRun at rear ceiling, so stain allowed on that line): 1 `PersonnelCeilingPipeStain` (0 if no pipe/conduit actually over the spot).
    10. Optional: 1 extra small scuff near center of long circulation path (or skip to stay at 9).
    11. Optional: 1 extra `PersonnelWaterStreak` small above the damp corner (if two sources plausible; or 0).
    12. Do NOT add: grime bands, rust bleeds (no lockbox/ferrous gate hardware in Personnel admin area unless we add hardware → so 0 rust), symmetrical every-corner damp, procedural full-wall grime strips.
  - Every decal MUST have a JSX inline comment stating its PHYSICAL CAUSE (source of water / source of wear — see Reception examples: "under ceiling pipe penetrations," "drawer-kick footwear wear," etc.).
- **Acceptance Criteria Addressed**: AC-B4 (decay density, physical cause, palette), AC-C1 (decal total ≤ 12), partially AC-B2 (admin-archive decay ≤ Reception)
- **Test Requirements**:
  - `rule` TR-9.1: Decal total count ≤ 12. Count each individual WaterStreak / DampPatch / RepairPatch / PeelingPaint / Scuff / RustBleed / CeilingPipe as 1.
  - `rule` TR-9.2: Per-family caps respected: Damp ≤ 2; Repair ≤ 1; Peel ≤ 1; Scuff ≤ 5; WaterStreak ≤ 2; RustBleed ≤ 1 (0 allowed too; typical Personnel = 0); CeilingPipe ≤ 1.
  - `rule` TR-9.3: Every decal JSX is preceded or followed by a 1-line comment with its physical cause annotation.
  - `rubric` TR-9.4: Decay appropriateness for admin office. Scale 1–5; 1 = none or overdone (>12, every corner wet/stained); 3 = Decay present but generic (symmetric, no cause chain); 5 = Sparse, reads as "years of abandoned admin" — damp+repair+peel+streak clustered near one entry corner (cause→effect), scuffs only at heavy-use furniture fronts (cabinets, B-2 desk, entry threshold), ceiling stain only over actual conduit, no grime bands, no rust — clearly ≤ Reception decay density visually. Threshold ≥ 4.

---

## Task 10: Center corridor & doorway framing final polish + old floating PaperworkStack relocation + debris final tally
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Tasks 3–9 inclusive (all zones and rigs in place)
- **Description**:
  - Circulation rectangle audit: walk the 1.2 m center band `x∈[−3.2, 1.0], z∈[−0.6, 0.6]` against every placed furniture footprint (B-1, B-2 desks + chairs + cabinet bank + printer (if any) + trolley (if any)). Nudge any desk/cabinet/printer/trolley 0.05–0.15 m outward to clear the band if marginal intersections exist. Do NOT push furniture INTO the timeline prism.
  - Verify west entry portal frame (from Task 3) is visually integrated: lintel height = 3.0 m, casings run y = 0.2 → 3.0, dark charcoal painted-metal. If casings/lintel are misaligned, fix.
  - Remove the `visible=false` target mesh `<boxGeometry args=[0.1,0.1,0.1]>` that accompanied the OLD deleted entry spot (Task 8 already removed the spot; clean up any orphan target mesh).
  - Audit: the floating PaperworkStack (old line 253) confirmed relocated onto Zone C cabinet bank top (Task 6 rule). Audit: no document/box/paper prop floats mid-air without a supporting desk/shelf/cabinet top surface at same y + small offset.
  - Final debris tally: sum of all `InstancedDebris count={N}` paper ≤ 8 total (0 = fine too; or place 5–7 tiny reception-like scatters only if the abandonment feel reads sparse but not sterile — 2–3 near B-2 desk, 2–3 near cabinet bank ajar drawer). Never exceed 8. Rubble = 0 (Task 1 already ensured).
- **Acceptance Criteria Addressed**: AC-A5 (circulation final), AC-B6 (first-glance readability), AC-A3 (debris caps final)
- **Test Requirements**:
  - `rule` TR-10.1: Center band rectangle `(x∈[-3.2, 1.0], z∈[-0.6, 0.6], y∈[0.1, 1.8])` contains zero solid furniture geometry. Verified via per-furniture x/z extent list.
  - `rule` TR-10.2: No orphan target-mesh dummy boxes for deleted lights.
  - `rule` TR-10.3: InstancedDebris paper total ≤ 8; rubble = 0.
  - `rubric` TR-10.4: Entry-first-glance compositional clarity. Scale 1–5; 1 = player enters confused, must wander; 3 = oriented but center band feels tight / one desk juts; 5 = instant from portal: first → east timeline board draws eye, second → left pair of admin desks below/left, third → rear/left filing bank at back wall, fourth → exit/frame behind/left visible, no single furniture piece requires detour. Threshold ≥ 4.

---

## Task 11: Validation pass (tsc / eslint / build) + screenshots + Reception frozen audit + final content claim-safety audit
- **Status**: `pending`
- **Priority**: high
- **Depends On**: All tasks 1–10 (queue fully drained except this)
- **Description**:
  - **TypeScript**: `npx tsc --noEmit`. Record output + exit code. If errors: fix locally within Personnel scope only. If a TS error is caused by a shared-system bug that genuinely also affects Reception: document rationale per AC-A9 before even considering any shared edit; default = fix in the Personnel wrapper instead.
  - **ESLint**: `npx eslint <each modified Personnel file> --max-warnings=0`. Likely files: `PersonnelWing.tsx`, `PersonnelAuthoredMaterials.tsx`, `PersonnelLighting.tsx` (if new), `DeveloperTimelineWall.tsx` (only if Task 4 edited card bullets). Fix any `Math.random()` in render, unused vars, React purity, import-order warnings.
  - **Build**: `npm run build`. Should exit 0; all routes prerender cleanly; 0 Personnel-related warnings.
  - **Reception frozen + other rooms untouched audit**: `git diff --name-only` or file-by-file byte comparison. Confirmed untouched: `ReceptionWing.tsx`, `ReceptionLighting.tsx`, `ReceptionAuthoredMaterials.tsx`, `RecordsHall.tsx`, `CommunicationsOffice.tsx`, `ElevatorLobby.tsx`, `Sublevel.tsx`. Any shared file modified (e.g. a new shared Personnel file but NOT a Reception file) = allowed as long as it's a Personnel-authored wrapper and not a Reception edit. If ANY out-of-scope forbidden file differs, document the genuine shared-regression rationale and confirm same fix is needed for both wings (per AC-A9 rules).
  - **Content claim-safety audit (AC-D1)**: Build a list of every user-facing string literal in Personnel scope: DocumentProp title+content; ExperiencePlaque text references; FacilitySignPanel title+subtitle; interaction messages (setInteractionMessage); inspectDocument dossier strings from portfolioManifest access; DeveloperTimelineWall card headers + bullet text on the 3D plane. Map each claim-bearing string to a portfolioManifest ground-truth line. Confirm 0 AWS/certified/fabricated metrics and 0 gore joke punchlines.
  - **4 Screenshots capture**:
    1. Entrance view: camera at west portal, x≈−4, y=1.6, facing +x (into room) — entire Personnel wing visible.
    2. Timeline straight-on: camera at standoff ~x=1.5, y=1.6, z=0, facing +x (toward board) — board fills ~50–75% of frame horizontally, all 4 cards visible.
    3. Desk + storage zone side angle: camera at south/north corner looking diagonally across both B-1 and B-2 desks + cabinet bank.
    4. Reverse / exit view: camera near east wall (x≈3.0, y=1.6, z=0), facing −x toward the west exit portal — shows entry framing + circulation from inside looking out.
  - Attach or reference the 4 screenshot file paths in Task 11 Completion Evidence section.
- **Acceptance Criteria Addressed**: AC-A8, AC-A9, AC-B1, AC-D1, AC-C1 (audit metrics final), AC-A3 (debris final), AC-A4 (content final)
- **Test Requirements**:
  - `rule` TR-11.1: `npx tsc --noEmit` exit 0.
  - `rule` TR-11.2: Targeted ESLint on each modified Personnel file with `--max-warnings=0` exit 0.
  - `rule` TR-11.3: `npm run build` exit 0, 0 build-time Personnel import errors.
  - `rule` TR-11.4: 4 screenshot references exist with clear viewpoint captions (1 entrance, 2 timeline, 3 desk/storage, 4 reverse/exit).
  - `rule` TR-11.5: Frozen-set files (`ReceptionWing.tsx / ReceptionLighting.tsx / ReceptionAuthoredMaterials.tsx / RecordsHall.tsx / CommunicationsOffice.tsx / ElevatorLobby.tsx / Sublevel.tsx`) = 0 un-justified changes; any shared out-of-scope modification has a documented rationale AND benefits both wings AND doesn't degrade Reception AC.
  - `rule` TR-11.6: Claim safety audit complete and passing (6/6 portfolio claims mapped; 0 fabricated; 0 gore jokes; 0 AWS/cert/non-HKBK/non-Springer claims).
