# Sector 6: Sublevel -1

**Purpose:** Reward / The Grand Finale
**Dimensions:** 10m x 10m
**Location:** Deep underground (`[0, -50, 0]`), accessed via the Reception Elevator.
**Atmosphere:** Silent. No humming. No flickering. No warnings. For the first time in the facility, everything is perfectly still and warmly lit, surrounded by dark walnut paneling, warm concrete, and low‑key bookshelf lighting.

---

## Design Philosophy
The finale should *linger* – the player must spend a brief moment wondering whether this is the source of the facility before the deeper meaning clicks. By stripping away the sterile white, we give a hidden‑workshop feel, guiding the mind from past attempts → current work → future roadmap.

---

## Discovery Order (as you walk in)
1. **Elevator Opens** – you are dropped into a warm, subtly lit chamber.
2. **Workstation** – a desk with a monitor showing:
   ```
   PROJECT STATUS
   ACTIVE
   Last Updated:
   Today
   ```
3. **Prototype Shelf (left wall, near whiteboard)** – three abandoned prototypes, each labelled with its real‑world project name and fate.
4. **Blueprint Wall (right wall)** – annotated photos of the four earlier rooms, with an escalating tone:
   - Reception – *Needs Improvement*   
   - Personnel – *Still Incomplete*   
   - Records – *Not Good Enough*   
   - Communications – *Try Again*
5. **Scale‑Model Shelf (right side)** – tiny architectural mock‑ups of the four main wings, hinting that the whole facility is itself a prototype.
6. **Corkboard (offset behind & right of the workstation)** – a 2027 roadmap with check‑boxes:
   ```
   Platform Engineering   ☐
   Distributed Systems    ☐
   Cloud Infrastructure    ☐
   Security Engineering    ☑
   Open Source            ☐
   ```
7. **Personal Log (shortened)** –
   > If you're reading this,\n>\n> the elevator finally opened.\n>\n> Good.\n>\n> There's still a lot left to build.
8. **Final Sign on Elevator** –
   ```
   ACCESS GRANTED
   WORK IN PROGRESS
   ```

---

## Core Elements
### 1. Atmosphere & Materials
- **Walls:** Dark walnut paneling (`#3b2f2f`).
- **Floor:** Warm concrete (`#8b5a2b`).
- **Ceiling:** Light concrete (`#a58c7b`).
- **Lighting:** Soft amber desk lamp, subtle ambient glow.
- **Bookshelves:** Simple shelves on the left‑back wall, filled with placeholder books.

### 2. Workstation
- Desk, chair, lamp remain, but the monitor now reads *ACTIVE* and *Last Updated: Today*.

### 3. Prototype Shelf
- **Prototype A – Portfolio Website v1** → *ABANDONED*
- **Prototype B – Traditional Dashboard Concept** → *REPLACED*
- **Prototype C – Archive Facility Alpha** → *INSUFFICIENT*

### 4. Blueprint Wall
- Updated annotations (see Discovery Order).

### 5. Scale‑Model Shelf
- Tiny rectangular models of Reception, Personnel, Records, and Communications wings, hinting the whole place is a prototype.

### 6. Corkboard Roadmap
- Hidden behind the workstation; the player must walk around to see it, creating a natural pause.

### 7. Personal Log
- Concise, no meta‑explanation.

### 8. Final Elevator Sign
- Updated to *WORK IN PROGRESS*.

---

## Narrative Takeaway
The player eventually sees:
> "The Archive is not a record.\n> It is a roadmap."

The facility never contained a monster – it contained **iterations**, **failed prototypes**, and **unfinished work**. This mirrors an engineer’s portfolio: a living, evolving system rather than a finished product.

---

## Technical Changes (summary)
- Rewrote `src/game/rooms/Sublevel.tsx` to implement walnut walls, bookshelves, prototype shelf, scale‑model shelf, updated monitor text, shortened personal log, corkboard, and final sign text.
- Updated `Sublevel.md` (this file) to describe the new visual and narrative flow.
- Adjusted blueprint wall annotations and added the final sign.

---

**Next Steps** – Run the development server (`npm run dev`) and walk through Sublevel –1 to verify the discovery order and visual feel.
