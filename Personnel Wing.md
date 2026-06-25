# Sector 4: Personnel Wing

**Purpose:** Identity
**Dimensions:** 8m x 8m
**Location:** Center `[12, 0, -5]` (Branches right from the Reception Wing via a 3.5m corridor)
**Atmosphere:** Claustrophobic, obsessive, abandoned but distinctly human. Warm incandescent lighting (`#ffe5cc`) contrasts heavily with the sterile, cold environments of the rest of the facility.

---

## Design Philosophy

The Personnel Wing is the narrative anchor for the player's understanding of **Aryan Kapoor**. Rather than a sprawling walking simulator or a heavy lore-dump, the room is constrained to an 8x8m footprint. 

It functions as an interactive portfolio. It answers the question *"What kind of person worked here?"* without ever breaking the immersion of a psychological horror game. Every object serves a precise function, allowing a recruiter to understand the core competencies (Backend, Cloud, Infrastructure, Security, Systems Thinking) in under 3 minutes.

The horror in this room is not madness or gore; it is **the inability to let a problem go**.

---

## The 5 Interactable Elements

The room contains exactly five points of interest. 

### 1. The Desk (Centerpiece)
The focal point of the room. A single desk illuminated by a harsh, warm lamp, casting deep shadows in the corners of the office.
* **The Engineering Notebook**: Represents *Personality*. It contains raw architectural thoughts: *"Most people build features. Some build systems. Systems last longer. Need more Kubernetes experience."*
* **The Personnel Folder**: Represents *Identity*. A clean, corporate dossier sitting slightly apart from the messy notes. It contains the hard facts: Graduation (2027), Location (Bangalore), Education (B.E. Computer Science), and Career Interests (Backend, Cloud, Security).
* **The Resume Envelope (Collectible)**: Tucked into the desk drawer. Hovering reveals the "Personnel Archive Package". When clicked, the physical envelope vanishes, `Resume.pdf` is added to the global inventory system (visible on the Map UI), and a cryptic note is left behind: *"Most people start here. They should have started with the records."*

### 2. The Locker Wall
Represents the *Human Element*. Tucked into the front-left corner of the room.
* A bank of four institutional lockers, with one door left slightly ajar.
* Inside sits an old laptop and scattered sticky notes.
* A planner note reads *"Apply for internships,"* but it is heavily crossed out in red ink. Right below it, a sticky note simply reads: *"Build something worth hiring."*
* **Hidden Reward**: Tucked away inside the open locker is a folded document labeled "Interview Preparation Notes." It outlines "Things to Improve" (Kubernetes, Open Source, Scale) and "Current Strengths" (Research, Communication, Systems Thinking).

### 3. The Whiteboard
Represents *Problem Solving* and the *Horror Layer*.
* Positioned on the rear wall.
* Covered in a frantic web of systems diagrams and root-cause investigations.
* The text reads obsessively: *"Why did it fail? Symptoms ≠ Root Cause."* pointing to a single box labeled **[Root Cause Unknown]**. Below it: *"Temporary Fix Applied. Investigation Continues."*

### 4. The Certificate Wall (Verified Competencies)
Represents *Accreditation*.
* Mounted on the right wall are 4 framed, physical certificates acting as environmental set dressing rather than floating UI badges.
* Clicking on any of the glass frames opens the Document Inspection UI, pulling from dynamic credentials:
  1. Certificate Frame 01: Cloud / Infrastructure
  2. Certificate Frame 02: Security / Platform
  3. Certificate Frame 03: Engineering Achievement
  4. Certificate Frame 04: Research Publication

---

## Navigation & Spatial Logic
The Personnel Wing acts as the counterbalance to the massive Records Hall. If the Records Hall is about *Capability* (what was built), the Personnel Wing is about *Identity* (who built it). The room is intentionally cramped so the player never feels lost, ensuring that the critical portfolio items are discovered organically and instantly.
