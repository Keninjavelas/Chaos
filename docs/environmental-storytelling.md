# Auxilium: Environmental Storytelling & Audio Systems

## 1. Environmental Storytelling Philosophy

Environmental storytelling in Auxilium answers core questions through architectural context and physical placement:
- **What was this room used for?** (Functional zoning, clear utility equipment).
- **Who worked here?** (Artifacts of daily engineering: coffee cups, notes, manuals, badge access).
- **What happened here?** (Sudden abandonment, hurried packing, security lockouts, severed lines).
- **Why was this object left here?** (Active debugging sessions, half-finished tasks, interrupted workflows).
- **What does this reveal about the facility and portfolio work?** (Subtle contextual alignment with systems engineering, local-first AI experimentation, and high-performance computing).

---

## 2. Reusable Prop Language & Taxonomy

Auxilium uses a modular institutional prop library located in `src/game/World/props/`:

| Prop Family | Components | Story Role | Density / Placement Rule |
| :--- | :--- | :--- | :--- |
| **Archive Storage** | `ArchiveBoxStack`, `FilingCabinet` | Long-term record keeping and chronological milestones | High in Records Hall & Personnel Wing; Low in Corridors |
| **Workstation Stationery** | `PaperworkStack`, `StickyNote`, `Pen`, `DeskLamp` | Active developer task tracking and engineering habits | Medium on active desks; strictly off player circulation routes |
| **Industrial Utilities** | `CableConduitRun`, `ServerCableBundle`, `HVACVent` | Facility electrical & compute distribution | High on compute walls and ceilings; subtle along corridors |
| **Surface Wear & Decals** | `FloorScuffDecal`, `WaterStainDecal`, `InstancedDebris` | Realistic material age, floor wear near seating | Under chairs, below pipe drops, around doorways |
| **Whiteboard Context** | `GlassWhiteboard`, `MarkerTray` | Systems planning, live architecture diagramming | Central focus in Research Lab; clear standing zone |
| **Visitor Amenities** | `CoatRack`, `VendingMachine`, `WaterDispenser` | Administrative hospitality and institutional order | Reception Wing waiting lounge and staff break areas |

---

## 3. Room-by-Room Storytelling Blueprint

### Reception Wing
- **Theme**: "Orderly visitor and personnel processing before abrupt facility seal."
- **Story Beats**:
  - Front Desk: Visitor register ledger, dead desk phone line, level 2 keycard, emergency lantern.
  - Waiting Area: Coat rack with abandoned lab coat, water cooler, institutional vending unit, scattered visitor magazines.
  - Surface Wear: Chair scuff marks behind reception desk, overhead electrical conduit runs.

### Personnel Wing
- **Theme**: "Engineering habits, personal workstations, and verified career milestones."
- **Story Beats**:
  - Developer Timeline Wall: High-contrast, completely unobstructed sightline and viewing area.
  - Supervisor Office: Engineering logbook, audio tape recorder, sprint whiteboard.
  - Cubicle Stations: Developer log, personal desk lamps, debug coffee cups.
  - Filing & Lockers: Cardboard archive stacks (`PERSONNEL // 2024-2025`), tipped cabinets, subtle blood trail leading toward the corridor exit.

### Research Lab (Communications Office)
- **Theme**: "Local-first AI experimentation node and active inference hardware."
- **Story Beats**:
  - Compute Zone: Dual server racks (`INFERENCE CLUSTER` and `LOCAL CONTEXT CACHE`) with heavy floor cable bundles and breakout looms.
  - Glass Whiteboard: Systems architecture diagrams accompanied by an aluminum marker tray with multi-colored pens and eraser.
  - Engineering Workstation: Active CRT diagnostic terminal, task lamp, and experiment dossiers.

### Records Hall
- **Theme**: "Historical technical archive organized by engineering disciplines."
- **Story Beats**:
  - Shelf Categorization: Labeled stacks (`BACKEND // 2023-2024`, `SYSTEMS // 2025-2026`).
  - Central Catalogue Table: Low inspection desk with active binder paperwork batches.
  - Architectural Lighting: Warm amber reading spots balancing cool corridor transitions.

---

## 4. Procedural Audio & Ambience Architecture

The environmental sound system is 100% procedural, synthesized in real time via the Web Audio API (`src/game/Audio/AudioManager.ts` and `src/game/Audio/AudioController.tsx`), with zero external audio assets and zero copyright risk.

### Ambience Layering

1. **Global Facility Drone**:
   - $55\,\text{Hz}$ sine sub-rumble combined with lowpass-filtered Brownian noise ($110\,\text{Hz}$ center frequency) creating constant architectural weight.
   - Master volume kept low ($3-5\%$) to maintain negative space and quiet atmospheric tension.

2. **Room Profile Cross-fading**:
   - `RECEPTION`: $120\,\text{Hz}$ fluorescent ballast hum with $240\,\text{Hz}$ harmonic resonance.
   - `RESEARCH`: Dual-band server rack air rush ($450\,\text{Hz}$ and $850\,\text{Hz}$ peaking filters).
   - `PERSONNEL`: Subdued $160\,\text{Hz}$ room draft tone.
   - `RECORDS`: $48\,\text{Hz}$ damped acoustic room still.
   - Profile transitions cross-fade linearly over $2.5\,\text{s}$ based on player camera coordinates.

3. **Dynamic Ambience Ducking**:
   - Ambience volume automatically ducks by $70\%$ whenever the player enters `INSPECTING` or `INTERACTING` modes (e.g. reading documents or using terminals) to maximize readability.

4. **Footstep Synthesis**:
   - Player velocity and movement inputs trigger footsteps at a standard $440\,\text{ms}$ cadence.
   - Surface modulation: Muffled concrete thuds in standard rooms, higher-pitch metallic clicks in compute/sublevel zones.
   - Footsteps instantly silence when the player stops moving or opens an overlay.

5. **Autoplay Policy Resilience**:
   - AudioContext initializes in a clean suspended state and unlocks smoothly on the player's first user gesture (pointer down, click, or key press).
