# Facility Level Design

## Implemented Route

```text
                         [ Personnel Wing ]
                                  ^
                                  |
[ Research Lab ] <- [ Left Wing ] <- [ Reception ] -> [ Right Wing ]
       |                  |                 |                 |
[ Records Hall ] ---------+                 v                 +
                                            [ Elevator Lobby ]
                                                   |
                                             [ Sublevel ]
```

The player spawns in Reception near the southern entry edge. The Reception desk is the first focal point. The west suite routes to Research and Records, the east suite routes to Personnel, and the north gate anticipates the Elevator Lobby and Sublevel. The main corridor is the longer quieter transition connecting the existing facility sections.

## Pacing Model

`Orientation -> discovery -> short choice -> content-dense room -> quieter transition -> next discovery.`

Reception keeps the first decision within sight. The suite corridors are approximately 8.5m long and now carry a practical light plus an integrated destination sign. The Main Corridor is intentionally the longest passage, but has light rhythm and a directional landmark every 5-7m. No new rooms are invented by this plan.

## Reception

- **Purpose:** Arrival, institution identity, and interaction onboarding.
- **Player learns:** This is an explorable professional archive; documents, the terminal, and desk objects respond to inspection.
- **Primary focal point:** Reception desk and active computer.
- **Secondary focal points:** West and east suite openings, north security gate, waiting area.
- **Main interaction:** `USE` Reception computer.
- **Expected time:** 45-90 seconds on first visit.
- **Entry sightline:** Desk centered ahead; side corridors stay visible at the perimeter.
- **Exit:** West for Records/Research, east for Personnel, north for Elevator.
- **5B change:** Suite openings now have a matching practical light and architectural sign panel. The desk remains the central orientation anchor; no new clutter was added.

## Main Corridor

- **Purpose:** Controlled transition and anticipation.
- **Player learns:** The archive has connected wings and a descending hierarchy.
- **Primary focal point:** Next practical-light pool and directional sign at the branch.
- **Secondary focal points:** Ceiling panels, pipe rhythm, doorway gaps.
- **Main interaction:** None; this is a pacing space.
- **Expected time:** 20-35 seconds.
- **Entry sightline:** First fluorescent fixture, then the first turn.
- **Exit:** Personnel, Records, Communications, or final approach.
- **5B change:** Existing practical-light rhythm and sign are treated as navigation landmarks; visual confirmation remains pending.

## Personnel Wing

- **Purpose:** Identity, development, education, and career progression.
- **Player learns:** The archive owner’s timeline and work habits.
- **Primary focal point:** Developer Timeline wall.
- **Secondary focal points:** Supervisor desk log, workstation cluster, records/printing area.
- **Main interaction:** `VIEW` Developer Timeline; desk documents and small objects remain secondary.
- **Expected time:** 90-150 seconds.
- **Entry sightline:** Timeline receives a warm task light from the right wall.
- **Exit:** West suite entrance back to Reception.
- **5B change:** The locker bank moves south to preserve a standing/viewing zone for the timeline; floor debris is reduced to retain readable circulation.

## Communications / Research Lab

- **Purpose:** Systems design, local-first experimentation, and engineering evidence.
- **Player learns:** Work is organized around an active workstation, architecture system, and compute support.
- **Primary focal point:** Main workstation.
- **Secondary focal points:** Whiteboard/architecture surface, compute rack pair, Hermes memo.
- **Main interaction:** `VIEW` Local-first systems diagram; Hermes memo is `READ` and compute equipment is a supporting `INSPECT` point.
- **Expected time:** 90-150 seconds.
- **Entry sightline:** Workstation before the whiteboard; rack silhouette remains left of the route.
- **Exit:** Same south suite transition, after a loop through board and compute zone.
- **5B change:** Racks are pulled away from the west service wall to create an approach/service lane. The intended route is `entry -> workstation -> whiteboard -> compute -> exit`.

## Records Hall

- **Purpose:** Accumulated body of work and chronological archive organization.
- **Player learns:** The archive is ordered, inspectable, and historically layered.
- **Primary focal point:** Central orientation table and aligned shelf aisles.
- **Secondary focal points:** Year-labelled inspection tables and back-wall cabinets.
- **Main interaction:** `VIEW` central archive catalogue; chronological dossiers remain secondary `READ` records.
- **Expected time:** 90-180 seconds.
- **Entry sightline:** Archive Records panel, central table, and symmetric shelving.
- **Exit:** North suite opening back toward Reception.
- **5B change:** Added a low central orientation table without closing shelf aisles and an integrated arrival panel. It prepares the hall for later project-record placement without adding final portfolio exhibits.

## Elevator Lobby And Sublevel

- **Purpose:** Chapter transition and eventual deeper archive reveal.
- **Primary focal point:** Elevator door and its lighting state.
- **Expected time:** 20-45 seconds in the lobby; Sublevel design remains outside the 5B target trio.
- **Status:** No 5B geometry change. Preserve existing progression.

## Interaction Placement Rules

- Primary interactables need a clear 0.9m approach space and a visible standing position.
- Place no more than one primary interaction in an immediate focal cone.
- Documents can remain secondary discoveries, but must not sit behind furniture or below comfortable inspection height.
- Candidate primary interactables are: Reception computer, Research systems diagram, Personnel timeline, and the Records archive catalogue.
- Shared interaction vocabulary is `INSPECT`, `READ`, `USE`, `OPEN`, and `VIEW`. See `docs/interaction-design.md` for targeting, ranges, and state behavior.

## Pending Desktop Visual QA

- Verify suite signs are readable but not dominant.
- Verify locker relocation fully clears the Personnel timeline sightline.
- Verify rack movement leaves believable service space without weakening the compute composition.
- Verify Records orientation table retains a usable central route.
- Confirm actual walking times, human scale, fog readability, and landmark visibility in normal desktop Chrome.
