# Portfolio Launch Readiness

Batch 4D is the current launch-gate source of truth.

- Batch 2 remains frozen except for factual corrections.
- Batch 3 tiering is frozen except for the approved `Poseidon -> Metis` V1 flagship substitution.
- Batch 4D focuses on release readiness, not new discovery work.
- No synthetic screenshots, fake deployments, or placeholder public links are allowed.

## V1 Launch Set

### Flagship

1. `InfraMind`
2. `Auxilium Digital Archive`
3. `Metis`

### Detailed Dossier

- `Multi-Cloud Serverless Analytics`
- `DayOne AI`
- `Poseidon` - runtime-unverified for V1
- Other already-approved dossier candidates retained as previously frozen

### Deferred From V1

- `Ghost Protocol`
- `Word Extension`

## Batch 4D Decisions Applied

- `Metis` promoted from `DETAILED DOSSIER` to `FLAGSHIP EXHIBIT` for V1 presentation.
- `Poseidon` moved from `FLAGSHIP EXHIBIT` to `DETAILED DOSSIER`.
- `Poseidon` remains technically strong; the downgrade is a launch-readiness decision only.
- `Word Extension` remains deferred because a real Microsoft Word host transformation capture was not available during the final launch audit.

## Auxilium Release Gate

### Root cause

The fresh Auxilium runtime failure was not caused by the new portfolio manifest content itself.

- Turbopack crashed while processing `src/app/globals.css`.
- Tailwind source discovery was walking into `scratch/Poseidon/backend/node_modules/poseidon`, where a symlink loop triggered the Turbopack panic.
- The application TypeScript boundary was also too broad because `tsconfig.json` still included `scratch/**`.

### Fixes applied

- `src/app/globals.css`
  - changed Tailwind import to `@import "tailwindcss" source(none);`
  - added `@source "..";` so scanning stays inside the application source tree instead of wandering into scratch workspaces
- `tsconfig.json`
  - excluded `scratch/**` so unrelated experimental directories are not treated as part of the Auxilium application project

### Result

- The Turbopack panic is resolved.
- The repaired local build loads successfully again.
- The release-readiness blocker is no longer the crash itself.

## Verification Results

### Static checks

- `APPLICATION TYPECHECK: PASS`
  - `npx tsc --noEmit --pretty false -p tsconfig.json`
- `WORKSPACE-WIDE TYPECHECK: PASS`
  - `npx tsc --noEmit --pretty false`
- `ESLINT: PASS`
  - `npx eslint src/data/portfolioData.ts`
  - `npx eslint src/data/portfolioAssets.ts`

### Portfolio validator

- Validator execution: `PASS WITH KNOWN CONTENT WARNINGS`
- Current summary:
  - `contentEntries: 101`
  - `verified: 79`
  - `needsApproval: 11`
  - `needsSource: 7`
  - `privateEntries: 4`
  - `missingAssets: 28`
- The remaining warnings are manifest/content-registry items, not application runtime failures.
- Notable V1-adjacent warnings still open:
  - `contact-auxilium-url` remains `needs-source` until deployment
  - `project-auxilium` still lacks the remaining professional-room screenshot
  - `project-poseidon` still lacks public presentation images, which is acceptable for its runtime-unverified V1 dossier status
  - `project-word-extension` and `project-ghost-protocol` remain missing deferred-tier visuals

### Runtime smoke evidence

Fresh local runtime verification was rerun against `http://127.0.0.1:3013` on `2026-08-11`.

- `1. Application loads without runtime error: PASS`
- `2. Reception renders: PASS`
- `3. First-person navigation works: PASS`
  - repeated `KeyD` and `KeyW` movement probes visibly changed the live viewport
- `4. Room transition works: PARTIAL / NOT FULLY VERIFIED`
  - movement within Reception was confirmed, but an automated transition into the professional wing was not cleanly completed during this pass
- `5. Professional-content room renders: NOT YET VERIFIED`
  - the remaining authentic professional-room capture was not obtained
- `6. Document/terminal interaction opens: NOT YET VERIFIED`
  - interaction probes during the automated pass did not produce a confirmed terminal or document overlay opening
- `7. Portfolio data-backed content appears correctly: PARTIAL`
  - manifest-backed UI content already renders in approved reception/intro surfaces, but the intended professional-room content capture remains outstanding
- `8. Browser console has no new blocking errors: PASS IN EXTERNAL BROWSER / LIMITED IN IN-APP AUTOMATION`
  - external browser checks showed only non-blocking Three.js shadow-map deprecation warnings
  - in-app browser automation produced Pointer Lock API errors tied to the automation surface rather than the application code path

## Auxilium Status

- `AUXILIUM LIVE URL: BLOCKED - RESOLVES DURING FINAL DEPLOYMENT`
- `AUXILIUM PRE-DEPLOYMENT CONTENT: NOT READY YET`

The runtime regression is fixed, but the release gate is still waiting on:

- one authentic professional-content-room screenshot
- one successful professional-room or dossier interaction proof

## V1 Project Status

### Ready for V1

- `InfraMind`
- `Metis`
- `Multi-Cloud Serverless Analytics`
- `DayOne AI`
- approved archive records already frozen earlier

### Ready once Auxilium content gate closes

- `Auxilium Digital Archive`

### Publishable with explicit limitation

- `Poseidon`
  - Source and architecture evidence reviewed; full local runtime could not be independently reproduced during the V1 launch audit because the required Docker Linux engine was unavailable.

### Deferred

- `Word Extension`
- `Ghost Protocol`

## Files Changed In Batch 4D

- `src/app/globals.css`
- `tsconfig.json`
- `src/data/portfolioData.ts`
- `docs/portfolio-launch-readiness.md`

## CURRENT V1 BLOCKERS

### A. DESKTOP QA REQUIRED
1. **Normal Chrome First-Person Playtest**: Manual walkthrough from Start $\to$ Reception $\to$ Personnel Wing $\to$ Research Lab $\to$ Records Hall $\to$ Elevator Lobby per `docs/gameplay-qa.md`.
2. **Pointer Lock & Modal Transitions**: Perceptual confirmation of cursor release/re-lock on document, terminal, and escape actions.
3. **Audio & Movement Feel**: Perceptual check of walking acceleration, head bob, footstep cadence, and room ambience transitions.

### B. ASSET / EVIDENCE REQUIRED
1. **Resume PDF**: Verified `Resume.pdf` file to wire into `portfolioData.ts` and document viewers.
2. **Auxilium Visual Capture**: Authentic full-facility screenshot captured from normal Chrome runtime.

### C. DEPLOYMENT REQUIRED
1. **Production Deployment**: Deploy to production hosting (e.g. Vercel) and bind the live URL to `portfolioManifest.projects.flagshipExhibits[1]`.

### D. TECHNICAL DEFECTS
- **No known technical defects from automated/static validation**: All code-level static checks, TypeScript compilation, targeted ESLint, Next.js static build, and runtime state transitions are green with 0 errors. Runtime, perceptual, audio, and collision validation remain pending desktop playtest.

### E. OPTIONAL POST-V1
- Alternate exploratory routes and secret archival lockers.
- In-depth interactive 3D topology inspector for InfraMind.
- Accessibility settings menu (head bob slider, volume sliders, mouse sensitivity).
