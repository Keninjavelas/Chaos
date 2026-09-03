# Environment Art Direction

## Facility Identity

Auxilium is an aged institutional survival-horror facility: maintained enough to be navigable, decayed enough to imply time and interrupted work. It is not a clean science-fiction office, an empty grey-box, a pitch-black maze, or a collapsed post-apocalyptic ruin.

## Scale And Architecture

- Player eye height is 1.65m. Door clearances are at least 2m wide where traversal is expected.
- Walls use painted plaster or concrete, a dark lower trim, and restrained staining near corners, floor edges, vents, and service areas.
- Ceilings use 1.2m institutional panels, recessed fixtures, ducts, and exposed utilities only where the room function supports them.
- Floors are worn tile or sealed concrete with localized scuffing and grime, never featureless black planes.

## Material Palette

- Shared materials live in `src/game/World/materials/FacilityMaterials.tsx`; rooms must not introduce one-off wall or floor material definitions.
- Painted plaster is green-grey and desaturated. Personnel can use warmer paper and brass accents; Research uses restrained cyan-green technical accents.
- Rust, stains, and grime are concentrated around maintenance points and high-contact edges. Decay is evidence, not wallpaper.
- Use 512-1024px source maps for repeated surfaces, 1024-2048px for focal assets, and reserve larger maps for rare hero surfaces. Enable mipmaps and anisotropy for imported raster maps.

## Lighting Rules

Lighting hierarchy is navigation, focal area, interactable, then atmosphere. Corridors receive practical pools every 5-7m and an identifiable sign or fixture at meaningful turns. Rooms retain dark corners, but primary boards, desks, terminals, racks, and exit routes must remain readable.

- Limit active local lights to roughly 8 per medium room and 3 per corridor segment.
- Limit shadow-casting local lights to 1-2 in a focal area; most practicals should not cast shadows.
- Fluorescent fixtures establish space; emergency lights mark risk or routing; task and server lights identify function.

## Clutter And Interaction

Every prop must support function, history, or navigation. Keep a usable approach path of about 0.9m around focal interactables. Interactive objects use the shared hover, crosshair, range prompt, and response language; do not add loud floating markers unless accessibility testing requires them.

## Performance Budget

- Reuse facility materials and kit parts; prefer instancing for repeated debris, shelving, and fixtures.
- Favor lightweight primitives and 512-1024px repeated maps over unique high-resolution assets.
- Keep real-time shadows reserved for player flashlight and focal lighting.
- Avoid full-screen blur. Bloom, grain, chromatic aberration, and fog must remain controlled enough to preserve document and silhouette clarity.
- Target 60 FPS on a desktop GPU; profile draw calls, texture memory, and postprocessing before adding dense animated props.

## Visual Sign-off

Code completion is not visual completion. Desktop screenshots must confirm material detail, ceiling readability, coherent scale, comfortable navigation, controlled repetition, sharp output, and room-specific identity before an environment pass is closed.
