# Auxilium Digital Archive

An immersive 3D interactive portfolio experience built with Next.js, React Three Fiber, and Three.js. Visitors explore a decaying digital archive facility to discover projects, publications, experience, and contact information through environmental storytelling and interactive exhibits.

## Project Overview

Auxilium Digital Archive is not a traditional portfolio website—it's an interactive 3D environment where visitors navigate through rooms, interact with objects, collect items, and uncover content through exploration. The experience combines first-person navigation with document inspection, creating a memorable and engaging way to present professional work.

### Key Features

- **First-Person Navigation:** WASD movement with mouse look using pointer lock
- **Interactive Exhibits:** 14 project exhibits across flagship and detailed tiers
- **Document System:** In-game document overlay for reading project dossiers, publications, and notes
- **Inventory System:** Collect keycards, flashlights, and other items
- **Contact Form:** Real SMTP-backed contact form integrated into the 3D environment
- **Persistence:** localStorage-based save system for inventory and progress
- **Narrative Elements:** Environmental storytelling through room design and degradation effects

## Tech Stack

### Frontend Framework
- **Next.js 16.2.9** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5** - Type-safe development

### 3D Rendering
- **React Three Fiber 9.6.1** - React renderer for Three.js
- **Three.js 0.184.0** - 3D graphics library
- **@react-three/drei 10.7.7** - Useful helpers for R3F
- **@react-three/rapier 2.2.0** - Physics engine for collision detection
- **@react-three/postprocessing 3.0.4** - Post-processing effects (bloom, vignette, noise, chromatic aberration)

### State Management
- **Zustand 5.0.14** - Lightweight state management with persistence middleware

### Backend/API
- **Next.js API Routes** - Serverless API endpoints
- **Nodemailer 10.0.0** - SMTP email transport for contact form
- **idb 8.0.3** - IndexedDB wrapper for complex data persistence

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Development Tools
- **ESLint 9** - Code linting
- **TypeScript Compiler** - Type checking
- **Turbopack** - Fast bundler (Next.js default)

## Architecture

### Application Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (contact, repos)
│   ├── correspondence/    # Correspondence page
│   ├── hallway/          # Hallway archive page
│   ├── library/          # Library archive page
│   ├── memory-archive/   # Memory archive page
│   ├── mirror-room/      # Mirror room archive page
│   ├── timeline/         # Timeline page
│   ├── workshop/         # Workshop archive page
│   └── page.tsx          # Main entry point (intro flow)
├── components/            # React components
│   ├── archive/          # Archive page components
│   └── intro/            # Intro flow components
├── data/                 # Data and validation
│   ├── portfolioData.ts  # Portfolio manifest
│   └── validatePortfolioData.ts # Data validator
├── game/                 # 3D game engine
│   ├── Engine/           # Renderer and core systems
│   ├── Gameplay/         # Player controller and input
│   ├── Interactables/    # Interaction system
│   ├── Narrative/        # Story and anomaly engine
│   ├── UI/               # Game UI components
│   ├── World/            # 3D world content
│   │   ├── props/        # Interactive objects
│   │   └── rooms/        # Room definitions
│   └── useGameState.ts   # Zustand store
└── lib/                  # Utility libraries
    ├── PersistenceManager.ts # IndexedDB persistence
    └── state.ts          # Archive state store
```

## Rooms and Functions

### Reception Wing

The starting room where visitors first enter the archive. Contains the reception desk with interactive elements and access corridors to other areas.

**Features:**
- Reception desk with interactive computer terminal
- Filing cabinets with documents
- Desk drawer containing collectible items (security keycard, flashlight)
- East corridor leading to Records Hall
- West corridor leading to Personnel Wing

**Interactables:**
- Reception computer terminal (access to project manifest)
- Desk drawer (collect keycard and flashlight)
- Filing cabinets (inspect documents)
- Documents on desk

### Records Hall

The main exhibition space showcasing portfolio projects through flagship exhibits and detailed dossiers.

**Features:**
- 3 flagship exhibit pedestals with project displays
- 11 dossier binders for detailed project information
- 2 research folios for publications
- Master catalogue for project overview
- Archive shelves with environmental props

**Interactables:**
- Flagship exhibits (InfraMind, Auxilium Digital Archive, Metis)
- Dossier binders (Poseidon, Multi-Cloud Serverless Analytics, DayOne AI, etc.)
- Research folios (Post-Quantum Cryptography, AI Agent Systems)
- Master catalogue

### Personnel Wing

Professional experience and identity content displayed through interactive exhibits and timeline.

**Features:**
- Developer timeline interactable display
- Experience plaque with internship details
- Supervisor desk with experience context
- Intake desk with login worksheet
- Filing cabinets with personnel documents
- 5 context plaques with additional information

**Interactables:**
- Developer timeline
- Experience plaque (Springer Capital Backend Internship)
- Context plaques (5 total)
- Filing cabinets

### Communications Office

Technical workspace showcasing project documentation and development environment.

**Features:**
- Interactive whiteboard with project notes
- Server racks with inspection capability
- Project memos on display
- Technical bench with workbench status
- Personal archive keycard pickup (optional mechanic)

**Interactables:**
- Whiteboard (project documentation)
- Server rack (inspection note)
- Project memos (multiple)
- Technical bench (workbench status)
- Personal archive keycard (unlocks optional content)

### Elevator Lobby

Transition area with contact terminal and elevator access.

**Features:**
- Elevator door with call panel
- Contact terminal station (SMTP-backed contact form)
- Environmental debris and props

**Interactables:**
- Elevator call panel (elevator state management)
- Contact terminal (live contact form with SMTP)

### Sublevel

Lower level accessible via teleportation, containing additional content and secrets.

**Features:**
- Teleportation access from main facility
- Additional exhibits and content
- Environmental storytelling elements

## Interaction System

### Core Mechanics

**Movement:**
- WASD keys for directional movement
- Mouse look with pointer lock
- Shift key (reserved for future sprint functionality)
- Collision detection with walls and objects
- Camera bobbing for immersion
- Flashlight sway animation

**Interaction:**
- E key to interact with objects
- Mouse click as alternative interaction method
- Distance-based interaction detection
- Visual feedback on object focus (scale changes)
- Audio feedback on interactions

**Game Modes:**
- `PLAYING` - Normal navigation and interaction
- `INSPECTING` - Reading documents (movement disabled)
- `INTERACTING` - Using terminals/keypads (movement disabled)
- `RESUMING` - Transition back to playing

### Document Overlay

In-game modal system for displaying documents with styled content.

**Features:**
- Type-specific styling (notes, dossiers, publications)
- Title, author, and content display
- Interactive links (repository URLs, publication links)
- Close via Escape key or button
- Pointer lock management (release on open, re-engage on close)

**Document Types:**
- Notes (archival documents, observations)
- Dossiers (project information)
- Publications (research papers)
- Context (experience and identity)

### Inventory System

Collectible items stored in player inventory with persistence.

**Items:**
- Security keycard (access to restricted areas)
- Level2 keycard (elevated access)
- Flashlight (environmental illumination)
- Personal archive keycard (optional content unlock)

**Features:**
- Tab/M key to open inventory
- Item display with names and icons
- Persistence across sessions
- Milestone tracking for keycard pickups

## Contact System

### SMTP-Backed Contact Form

Real email delivery through Gmail SMTP with secure credential management.

**Features:**
- Client-side validation (required fields, email format, length limits)
- Server-side validation (duplicate validation, security checks)
- SMTP transport via Nodemailer
- Environment variable configuration (no hardcoded credentials)
- Reply-To header set to visitor email
- Success confirmation only after SMTP server acceptance

**Configuration:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_TO_EMAIL=your-email@gmail.com
```

**Security:**
- Credentials never exposed to client
- From address always SMTP user (no spoofing)
- Visitor email used only as Reply-To
- Request body size limits (16KB max)
- Field length limits enforced

## Portfolio Content

### Projects (14 Total)

**Flagship Exhibits (3):**
1. InfraMind - 3D topology visualization platform
2. Auxilium Digital Archive - This portfolio project
3. Metis - AI-powered analytics platform

**Detailed Dossiers (11):**
1. Poseidon - Multi-cloud infrastructure (runtime-unverified for V1)
2. Multi-Cloud Serverless Analytics - AWS/GCP analytics pipeline
3. DayOne AI - AI agent systems
4. Student OS - Academic project management
5. YatinVeda - Educational platform
6. Reconcilyx - Financial reconciliation tool
7. GCP OmniStream - Google Cloud streaming
8. AWS CloudOps - AWS infrastructure automation
9. AWS Helix Data Lakehouse - Data lakehouse architecture
10. Fashion Feet - E-commerce platform
11. Odysseus - Navigation system

**Deferred (2):**
- Ghost Protocol - Security research project
- Word Extension - Microsoft Word integration

### Publications (2 Total)

1. Post-Quantum Cryptography - Zenodo publication
2. AI Agent Systems - ICETM 2026 accepted paper

### Experience (1 Total)

- Springer Capital Backend Internship - Complete with bullets and context

## Development

### Getting Started

**Prerequisites:**
- Node.js 20+
- npm, yarn, pnpm, or bun

**Installation:**
```bash
npm install
```

**Development Server:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production Build:**
```bash
npm run build
npm start
```

**Linting:**
```bash
npm run lint
```

### Environment Variables

Create `.env.local` in the project root:

```env
# SMTP Configuration (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_TO_EMAIL=your-email@gmail.com
```

### Data Validation

The portfolio data is validated on application startup. Run the validator:

```bash
node -e "require('./src/data/validatePortfolioData')"
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

**Environment Variables in Vercel:**
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASSWORD
- CONTACT_TO_EMAIL

### Other Platforms

Any platform supporting Next.js deployment:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## Publishing Rules Compliance

The portfolio adheres to strict publishing rules:

- No fictional certifications, GitHub streaks, or pull requests
- No gating of professional content behind collectibles
- No precise address (Bengaluru, India only)
- Phone number excluded from public bundle
- CGPA displayed as "Current CGPA: 8.93/10"
- No company logos or internal screenshots
- Resume download hidden until PDF exists
- Auxilium live-link not shown until deployment
- Skills presented with appropriate prominence
- JavaScript as supporting language beneath TypeScript
- Azure in learning context only
- GitHub and npm as supporting tools

## Performance Optimization

### Rendering
- Reusable math vectors to prevent per-frame allocations
- Efficient state updates with Zustand selectors
- Minimal re-renders through careful component design
- Suspense boundaries for loading states

### Physics
- Continuous collision detection (CCD) enabled
- Delta time clamping to prevent large time steps
- Minimal physics bodies (1 player + room colliders)

### Asset Loading
- No external 3D model loading (all procedural)
- No texture loading (procedural materials)
- Minimal audio file size

## Accessibility

### Current State
- Basic keyboard navigation (WASD, E, Escape, Tab/M)
- Good color contrast ratios
- Responsive font sizes
- Screen reader support needs improvement (semantic HTML, ARIA labels)

### Planned Improvements
- Alternative key bindings (arrow keys, Enter)
- Focus management for overlays
- ARIA labels for interactive elements
- Motion disable toggle
- Audio mute toggle

## Documentation

Comprehensive QA documentation is available in the `docs/` directory:

- `phase1-interaction-inventory.md` - Interaction system inventory
- `phase2-room-flow-verification.md` - Room navigation verification
- `phase3-interaction-system-audit.md` - Interaction system audit
- `phase4-project-viewing-system.md` - Project viewing verification
- `phase5-research-publication-viewing.md` - Publication viewing verification
- `phase6-experience-personnel-content.md` - Experience content verification
- `phase7-contact-terminal.md` - Contact system verification
- `phase8-document-overlay-system.md` - Document overlay audit
- `phase9-external-links-repositories.md` - External links audit
- `phase10-personal-archive-keycard.md` - Optional mechanic verification
- `phase11-input-state-management.md` - State management audit
- `phase12-error-missing-asset-handling.md` - Error handling verification
- `phase13-accessibility-basic-ux.md` - Accessibility verification
- `phase14-performance-functional-regression.md` - Performance verification
- `phase15-automated-validation.md` - Automated validation results
- `phase16-manual-browser-qa.md` - Manual QA checklist
- `phase17-fix-verified-problems.md` - Code quality fixes
- `portfolio-launch-readiness.md` - Launch readiness report

## License

This project is private and proprietary.

## Contact

For inquiries, use the contact form in the Auxilium Digital Archive or email: aryankapoor0303@gmail.com
