# PROJECT ARCHIVE AK-27
# IMPLEMENTATION SPECIFICATION
# AGENT EXECUTION GUIDE

## PURPOSE

This document converts the creative vision into an engineering specification.

## SUCCESS CRITERIA

- Functional portfolio
- Resume reachable in <= 2 clicks
- GitHub reachable in <= 2 clicks
- Research paper reachable in <= 2 clicks
- 60 FPS target
- Persistent degradation
- Psychological thriller atmosphere
- No gameplay blockers

## ROUTES

/
 /dossier
 /memory-archive
 /incidents
 /incidents/[slug]
 /observation-room
 /timeline
 /academic-records
 /personnel-records
 /archive-logs
 /correspondence
 /terminal
 /archive-origin

## CORE COMPONENTS

LoadingDesktop
QuoteScreen
ArchiveShell
ArchiveNavigation
DossierCard
MemoryCard
IncidentCard
ResearchCard
LetterComposer
CorruptionOverlay
ArchiveController
AudioManager
PersistenceManager

## GLOBAL STATE

degradationLevel
visitCount
incidentCount
archiveHealth
memoryIntegrity
favoriteSection
lastVisitedPage
totalSessionTime
idleEvents
panicEvents

## DEGRADATION RULES

Idle > 15s => +0.01
Idle > 30s => +0.02
Rapid movement => +0.03
Return visit => +0.01

Persist forever.

## PAGE LAYOUTS

Homepage:
Hero
Quick Facts
Current Investigation
Navigation

Dossier:
Confirmed Facts
Observer Notes
Unconfirmed Reports

Memory Archive:
Skills as memories

Incident Reports:
Projects
Architecture diagrams
GitHub links

Academic Records:
Publication
PDF
Citation

Personnel Records:
Resume
Certifications
Achievements

Correspondence:
Paper UI
Seal Letter
Envelope Animation

## AUDIO

Loading:
Retro cheerful

Blackout:
Silence

Archive:
Hum
Ventilation
Static

## PERSISTENCE

localStorage:
degradation
visits
favorites

IndexedDB:
history
incidents
events

## TECH STACK

Next.js
TypeScript
Tailwind
Framer Motion
Three.js
React Three Fiber
Zustand
Howler.js
Vercel

## PERFORMANCE

60 FPS

Prefer:
Shaders
Texture swaps
State mutations

Avoid:
Physics
Heavy particles

## PHASES

1. Routing
2. Content
3. Styling
4. State Engine
5. Audio
6. Corruption
7. Rare Events
8. Optimization

## VALIDATION

Intro works
Skip works
Quote works
Resume downloads
GitHub linked
Research linked
Persistence works
Audio works
Mobile works
60 FPS maintained
