# Rolling Findings — Auxilium Runtime QA (port 3115, production build) — UPDATE 2

## Tab/URL
- Tab: tab-vtab-1819857705 — http://127.0.0.1:3115/ — in game. Heading fixed N; A/D strafe; overlays close via own "[ESC] PUT AWAY" button (never raw ESC = pause).

## Boot (PASS)
- Production server stable; intro 0→100% (needs tab focus), Skip→ENTER startscreen→3D. Evidence: splash.png, game-enter.png, game2-orient.png.

## Map knowledge (observed)
- Reception: black reception desk (center, items: VISITOR REGISTER folder, DEV GOAL NOTE, desk phone, monitors), round glass table NE, blue waiting chairs E side, tall cabinet/vending NE wall, water cooler. NORTH wall: gate vestibule arch (passable) → inner BARRED gate (S3) w/ lobby terminal behind bars (green "SCRAMBLED COMPUTER TERMINAL" screen). EAST side: doorway → PERSONNEL records room (found; entered via east probe from NE area S of wall). WEST: sign "WEST WING // ARCHIVES & RESEARCH" (not yet entered).
- Personnel records room: intake desk (north wall; green CRT monitor + white upright card/folder + dark blue tablet), 3 filing cabinets (PERSONNEL RECORDS sign above — sub-line low-res/unreliable), trash/shredder, security cam. RIGHT wall: big info display "VERIFIED DEVELOPMENT TIMELINE" (2023/2024/2025 columns + green contribution grid), "DEVELOPER JOURNEY", "TECH STACK — FRONTIER" plaques, glowing grid panel. Left wall sign "PERSONNEL // IDENTITY & RECORDS — DEPT xx AUTHORIZED ACCESS ONLY".

## Completed (count: ~9 evidence files)
1. Boot on 3115 PASS
2. Reception VISITOR REGISTER dossier (DOM + reception-visitor-register-overlay.png) — 09:15/11:42/13:20/14:50/16:00 register entries
3. P4 gate tests CENTER + LEFT + RIGHT — all BLOCKED (gate-block-center.png, gate-block-center2.png, gate-block-left.png, gate-block-right.png) → PASS-by-design; S3 lobby terminal visually verified beyond bars (scrambled green terminal) — UNREACHABLE by design
4. P1 personnel-wing.png — wide room composition (cabinets + PERSONNEL RECORDS + intake desk w/ green monitor + VERIFIED DEVELOPMENT TIMELINE display on right wall) — SAVED (overwritten w/ best wide shot)
5. AUXILIUM ENGINEERING — DEPARTMENT MANIFESTO overlay (manifesto-note.png) — DOM quoted; closed via PUT AWAY button; movement OK

## Remaining
1. P2 — S2 "Personnel file — Aryan Kapoor" overlay (IN PROGRESS — currently in personnel records room at intake desk right side; manifesto was one desk item; need to sweep desk/folders) + s2-file.png + DOM quote + close + movement verify
2. P3 — S1 Reception AUXILIUM OS/green-terminal identity (need to return to Reception; desk green monitor was hard to aim at; OS = green-text monitor? try again from proper distance) + s1-terminal.png + DOM quote
3. P6 — east-door.png: door Reception↔Personnel passable both ways (I passed Reception→Personnel; need to exit back & re-enter + doorway screenshot)
4. P5 — Records Hall pedestal (west wing), Research whiteboard "Local-first AI workbench", Hermes memo — best effort
5. Final: overwrite runtime-qa.md per-target table + console errors (none so far)

## Screenshots in C:\Users\aryan\OneDrive\Desktop\Chaos\qa_tmp\runtime\ (PASS evidence)
splash, game-enter, game2-orient, test-turn-left, reception-approach-1, reception-visitor-register-overlay, reception-desk-view, reception-desk-left, gate-block-center, gate-block-center2, gate-block-left, gate-block-right, personnel-wing, manifesto-note + unnamed orientation shots.

## Blockers / notes
- Raw ESC pauses game (avoid; use overlay buttons). Keep tab focused (loader throttles otherwise).
- In-canvas small text (sign sub-lines) OCR-unreliable — only quote DOM overlay text verbatim.
- S3 lobby dossier terminal physically unreachable behind bars (by design) — note only.
