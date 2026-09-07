# Runtime QA Report — Auxilium Digital Archive (http://127.0.0.1:3115, production build)

**Date:** 2026-09-07 | **Browser:** user Chrome | **Tab:** tab-vtab-1819857705 | **Method:** real-app driving (keyboard, raycast prompts, HTML overlay DOM reads, canvas screenshots). No project files modified.

## Environment note
- Production server (next build + start) is **stable — NO HMR reloads** (unlike dev port 3114). Boot completes: intro "Loading Visitor Profile…" advances when the tab is focused (background throttling stalls it), 0→100% then ENTER startscreen → 3D game. **BOOT = PASS** (`splash.png`, `game-enter.png`, `game2-orient.png`).
- Controls measured: heading is **fixed** (no camera yaw; Arrow keys do not turn); A/D strafe, W/S forward/back; overlays open via crosshair raycast + E; raw ESC **pauses** the game to "[ CLICK TO RESUME ]" (only a trusted click resumes; unrecoverable by automation → recovered by page reload once). Overlay close via the overlay's own "[ ESC ] PUT AWAY" button works cleanly; **movement confirmed to resume after each such close** (repositioning/interacting succeeded afterward).
- Pointer-lock console warnings ("Unable to use Pointer Lock API") observed as automation artifacts — excluded per task rules.

## Per-target results

| # | Target | Status | Evidence |
|---|---|---|---|
| BOOT | Intro → startscreen → 3D | **PASS** | Loading timer advanced (6→15→…→100%), Skip/ENTER worked; no reloads. Screens: `splash.png`, `game-enter.png`, `game2-orient.png` |
| P6 | East-corridor/doorway re-walk (both directions) | **PASS** | Reception → Personnel Wing doorway passable; walked out and re-entered the room via the same west opening (not sealed). Screenshot from doorway: `east-door.png` |
| P1 | Personnel Wing room wide capture | **PASS** | Room reached via Reception east doorway: intake desk w/ green-screen monitor + filing-cabinet bank "PERSONNEL RECORDS / …FILE CONSOLIDATION ACTIVE" + right-wall **"VERIFIED DEVELOPMENT TIMELINE"** display (2023 FOUNDATIONS / 2024 BACKEND & CLOUD / 2025 EVENTS & WORK + green contribution grid) + "DEVELOPER JOURNEY"/"TECH STACK — FRONTIER" plaques. Wide shot saved: `personnel-wing.png` (no overlay/HUD interference; crosshair dot present) |
| P2 | S2 personnel-file overlay ("Personnel file — Aryan Kapoor") | **UNREACHABLE** | Personnel records room fully explored at achievable raycast heights (intake desk swept left→right at multiple distances; cabinet row + desk front probed). The only intake-desk dossier that opened was **"AUXILIUM ENGINEERING — DEPARTMENT MANIFESTO"** (below). No overlay titled "Personnel file — Aryan Kapoor" was reachable; elevated/notice-board and east-wall (timeline) items sit above/beside the fixed horizontal raycast and could not be targeted without camera yaw. No fabrication: photo/HKBK/phone checks could not be performed. |
| P3 | S1 Reception AUXILIUM OS identity | **UNREACHABLE (partial evidence)** | Reception desk reached; the CRT and green "command" monitors sit above the fixed raycast line and never became interactable. Only desk-level dossier reachable: **VISITOR REGISTER** (below) — it contains register entries, **not** the OS MANIFEST identity UI (no photo/role/education/ACTIVE-PASSED-ARCHIVE states seen). |
| P4 | S3 security-gate block test | **PASS (blocked by design)** | North gate = outer arch (passable vestibule) + inner **barred gate**. Walk attempts: **center BLOCKED** (`gate-block-center.png`, `gate-block-center2.png`), **left jamb BLOCKED** (`gate-block-left.png`), **right jamb BLOCKED** (`gate-block-right.png`). S3 lobby recruiter-terminal dossier **unreachable behind gate (by design)** — verified visually through the bars: a green lobby terminal screen reading "SCRAMBLED COMPUTER TERMINAL — Establishing secure connection to SCP server…". No regression (gate not passable anywhere). |
| P5 | Records pedestal / Research whiteboard / Hermes memo | **UNREACHABLE** | Records Hall (west wing) and Research/Comms areas not entered within the run budget (navigation is keyboard-only with fixed heading; time-boxed). No claim made about content. |

## Verbatim overlay text (DOM-quoted, exact)

**VISITOR REGISTER** (Reception desk dossier, `reception-visitor-register-overlay.png`) — overlay header "[ INSPECTION MODE // DOSSIER ]":
> **VISITOR REGISTER** · DOSSIER
> AUXILIUM DIGITAL ARCHIVE - VERIFIED VISITOR REGISTER
> 09:15 - Recruiter review requested · 11:42 - Open-source activity reviewed · 13:20 - Research publication status checked · 14:50 - Resume and contact surfaces verified · 16:00 - Optional Personal Archive access noted
> [ ESC ] PUT AWAY

**AUXILIUM ENGINEERING — DEPARTMENT MANIFESTO** (Personnel intake desk, `manifesto-note.png`) — overlay header "[ INSPECTION MODE // NOTE ]":
> **AUXILIUM ENGINEERING — DEPARTMENT MANIFESTO**
> 1. Engineering discipline exists to serve human clarity.
> 2. Simplicity without capability is hollow. Capability without restraint is harm.
> 3. The system is honest only when its failures are visible.
> "Don't forget why you started."
> [ ESC ] PUT AWAY

## In-world sign text (canvas; vision-OCR, cross-checked over multiple shots)
- Reception east-wing sign: "EAST WING // PERSONNEL — IDENTITY ARCHIVES // TIMELINE"; west: "WEST WING // ARCHIVES & RESEARCH — RECORDS HALL SOUTH // COMMUNICATIONS LAB NORTH".
- Personnel room: "PERSONNEL RECORDS — [sub-line, low-res: reads as e.g. 'SECTION-02 / FILE CONSOLIDATION ACTIVE' or 'SERVER-02 …' — treat as decorative sub-line, not verbatim]"; "PERSONNEL // IDENTITY & RECORDS — DEPARTMENT xx - AUTHORIZED ACCESS ONLY"; "VERIFIED DEVELOPMENT TIMELINE — 2023 FOUNDATIONS AND CORE START · 2024 BACKEND AND CLOUD FOUNDATIONS · 2025 EVENTS & WORK" (columns + GitHub-style green grid); "DEVELOPER JOURNEY"; "TECH STACK — FRONTIER" (Three.js · React Three Fiber …).

## Console errors
- **None captured** (page console error buffer empty; pointer-lock warnings excluded per instructions).

## Screenshot files (C:\Users\aryan\OneDrive\Desktop\Chaos\qa_tmp\runtime\)
`splash.png`, `game-enter.png`, `game2-orient.png`, `test-turn-left.png`, `reception-approach-1.png`, `reception-visitor-register-overlay.png`, `reception-desk-view.png`, `reception-desk-left.png`, `gate-block-center.png`, `gate-block-center2.png`, `gate-block-left.png`, `gate-block-right.png`, `east-door.png`, `personnel-wing.png`, `manifesto-note.png` (+ unnamed orientation shots used during navigation).

## Summary
Boot, P1 (room capture), P4 (gate block, by-design pass) and P6 (doorway passable) are **PASS with screenshots**. P2/P3 target overlays were **not reachable** under the fixed-heading, no-camera-yaw constraint of the automated session (raycast never crossed elevated terminal/notice-board items); the two dossiers actually reachable and opened were the Reception **VISITOR REGISTER** and the Personnel intake-desk **DEPARTMENT MANIFESTO** (both DOM-quoted above). P5 areas not entered (time-boxed). No console errors; no project modifications.
