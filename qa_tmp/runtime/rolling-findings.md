# Runtime QA — Rolling Findings (sub-agent)

## Scope
Drive 3D portfolio app at http://127.0.0.1:3113 (user Chrome, tab-vtab-1819857705, retained). Capture screenshots to C:\Users\aryan\OneDrive\Desktop\Chaos\qa_tmp\runtime. Deliver report runtime-qa.md.

Priorities:
1. P1 Personnel Wing room wide screenshot (personnel-wing.png) — TOP
2. P2 S2 personnel-file overlay ("Personnel file — Aryan Kapoor")
3. P3 S1 Reception computer terminal manifest
4. P4 S3 Elevator Lobby dossier / gate-block verification
5. P5 Records Hall + Research room sample interactions
6. P6 East-corridor re-walk (east-door.png)

## Status
- Tab open: tab-vtab-1819857705 @ http://127.0.0.1:3113 (title "Project Archive AK-27"). Retained.
- BLOCKED at INTRO ("LoadingDesktop" phase of IntroFlow). See below.
- Files saved so far: 00-boot-splash.png; probe.js/probe2.js/instrument.js (temp tools, workspace-relative).

## Observed facts (intro)
- Boot shows retro Win98-style desktop + IE "Aryan's Homepage" + "Skip Intro ▸" (fixed top-right) + visitor counter + "Loading Visitor Profile... 0%" bar.
- Skip button = React component src/components/intro/SkipButton.tsx (onClick=onSkip). Real trusted CDP clicks DO reach button (capture listener confirmed isTrusted=true). No DOM/propagation blocking (event bubbles BUTTON→DIV.win98-desktop→BODY→HTML).
- Code (read from dev chunks): IntroFlow.tsx phases: desktop → blackout → reflection → startscreen → game. handleSkip → setPhase("blackout"). LoadingDesktop: interval 100ms adds 0.1–0.6 to progressRef; at ≥100 freeze 1.5s → commitObservationAndComplete → onComplete (goBlackout). commitObservationAndComplete uses useArchiveStore addObservation.
- Timers NOT throttled (verified 5×100ms fired in 511ms; visibility=visible, hasFocus=true).
- Page FULL-RELOADS roughly every 45–60 s (~51 s cadence observed 3×) regardless of clicks → resets intro to desktop; visitor counter number changes on each fresh mount. During ~46 s after a fresh load, progress bar stayed at 0%/"Loading Visitor Profile" — i.e., progress interval does NOT advance even with healthy timers, OR every reload happens before ticks accumulate (unlikely — 46s at 10Hz would complete ~3×).
- Clicking Skip does NOT visibly advance phase (still desktop after click+snapshot within same load; no beforeunload right after click). Suspect: skip click handler not effective OR phase transitions happen but another mechanism (the periodic reload OR something else) resets. NOT yet proven.
- No JS errors captured so far (errors utility empty). Console mode B buffer empty (lost across reloads).
- Network noise: /__nextjs_font/geist-latin.woff2 → 403 aborted (2–12 s after each load). All app chunks 200. MetaMask extension warnings in console (ignore).

## Current instrumentation
- instrument.js just installed (sessionStorage __qaPhases): logs page_load/beforeunload/console IntroFlow renders/window errors/unhandledrejection across reloads.
- probe listener (__qaLog) still in old session only; will be lost on next reload.

## Next steps
1. Wait ~75 s through ≥1 natural reload, read sessionStorage __qaPhases → determine: does IntroFlow advance phases on its own? What triggers reload? Any errors?
2. If phase advances to game but reload loops only in intro desktop → try clicking skip again and IMMEDIATELY (sub-second) screenshot + phase read to catch blackout/reflection.
3. If reload source identified in code (another chunk) → read & understand; find bypass.
4. If intro cannot be bypassed by legit means after 2–3 more attempts → record UNREACHABLE with evidence and stop (do not fabricate).

## Blockers
- Unknown mechanism resets app to intro every ~51 s.
- Skip click does not appear to change visible phase.
- Cannot use built-in browser (disabled); using user Chrome.
