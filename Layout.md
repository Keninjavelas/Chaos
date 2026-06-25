# The Archive — Facility Layout

This document formally defines the layout, coordinates, narrative hierarchy, and physical dimensions of all implemented rooms in the facility to ensure spatial consistency.

## Narrative Hierarchy

Every prop, document, collectible, and interaction must support the room's core purpose:

* **Reception Wing** — *Purpose: Orientation*
* **Personnel Wing** — *Purpose: Identity*
* **Records Hall** — *Purpose: Capability*
* **Communications Office** — *Purpose: Contact*
* **Sublevel -1** — *Purpose: Reward*

## Master Blueprint (Top-Down View)

```txt
                              [ SUBLEVEL -1 ]
                                     |
                             [ ELEVATOR LOBBY ]
                                   Z = -8
                                     |
                               (Security Gate)
                                     |
   [ PERSONNEL ] ------------ [ RECEPTION ] ------------ [ RECORDS ]
    X = 12, Z = -8               Center                    X = -15
         |                                                   |
         |                                            [ COMMUNICATIONS ]
                                                         X = -15, Z = -12
```

## Sector 1: Reception Wing
* **Purpose**: Orientation
* **Status**: Complete
* **Position**: `[0, 0, 0]`
* **Dimensions**: 9m x 11m
* **Description**: The player spawn point. Features the central reception desk, right-side waiting area, missing acoustic panels, and the sparking ceiling cable.
* **Structural Role**: The central hub. The rear wall (Z=-5.5) now features a massive Security Gate separating the player from the Elevator Lobby.

## Sector 2: Records Hall
* **Purpose**: Capability
* **Status**: Complete (Requires Secondary Archive Split)
* **Position**: `[-15, 0, 0]` (Left Corridor)
* **Dimensions**: 14m x 18m
* **Structure**:
  * **Primary Archive** (14m x 12m): Recruiter-facing material.
  * **Restricted Archive** (14m x 6m): Separated by a security gate/chain fence. Contains Experimental Projects, Research Papers, and Hidden Content.
* **Description**: The largest room in the facility. Functions as a Crime Scene rather than a gallery.

## Sector 3: Elevator Lobby
* **Purpose**: Reward
* **Status**: Blockout
* **Position**: `[0, 0, -8]`
* **Dimensions**: 6m x 6m
* **Description**: Sits directly behind the Reception Security Gate. The elevator itself is hidden in the dark, but the red warning light pulses visibly through the gate. It creates an aura of temptation—always visible, always locked.

## Sector 4: Personnel Wing
* **Purpose**: Identity
* **Status**: Next Milestone (Revised 8x8m Concept)
* **Center**: `[12, 0, -5]`
* **Dimensions**: 8m x 8m
* **Description**: A cramped, abandoned single office branching off to the right of Reception. Contains exactly four highly deliberate storytelling items that communicate identity and engineering obsession without overwhelming the player.

## Sector 5: Communications Office
* **Purpose**: Contact
* **Status**: Blockout
* **Position**: `[-15, 0, -12]`
* **Description**: Branches off from the Records Hall corridor. A believable architectural placement deep within the facility's administrative sector.

---

## Technical Constraints
- **Culling**: `Environment.tsx` automatically mounts/unmounts these rooms based on distance to the camera, ensuring maximum draw calls stay under the 200 budget. 
- **Coordinates**: All coordinates are defined in global space relative to the Reception Wing center `[0, 0, 0]`.
