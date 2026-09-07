# PHASE 6: EXPERIENCE / PERSONNEL CONTENT VERIFICATION
# Functional QA Audit - Auxilium Digital Archive V1

**Date:** 2026-09-06  
**Scope:** Verify developer identity content  
**Method:** Code path analysis of experience, education, and personnel room rendering

---

## EXPERIENCE DATA STRUCTURE

### ExperienceEntry Interface
**File:** `src/data/portfolioData.ts` (lines 79-87)

**Required Fields:**
- company: Company name
- role: Job title
- duration: Employment duration
- location: Work location
- bullets: Array of responsibility bullets
- factualDescription: Technical description
- publicWording: Public-safe description
- verificationStatus: verified | needs-approval | needs-source | private
- sourceLabel: Evidence source
- sourceUrl: Evidence URL
- lastVerified: Verification date

**Status:** PASS (code review)

---

## EXPERIENCE ENTRIES (1 Total)

### Experience 1: Springer Capital Backend Internship
**Company:** Springer Capital  
**Role:** Backend Intern  
**Duration:** August 2025-November 2025  
**Location:** Remote  
**Verification Status:** verified  
**Source:** Explicit user confirmation in Batch 1 decisions  
**Last Verified:** 2026-08-07

#### Data Verification
**Bullets:**
- Developed Flask microservices using SQLAlchemy
- Designed and tested REST APIs and database schemas
- Created mock services for integration testing
- Resolved dependency conflicts
- Supported debugging and deployment reliability across a multi-service backend platform

**Factual Description:** Backend internship focused on Flask microservices, SQLAlchemy, REST APIs, schema design, integration testing, and deployment reliability across a multi-service backend platform

**Public Wording:** Backend Intern - Springer Capital | Remote | August 2025-November 2025. Developed Flask microservices using SQLAlchemy, designed and tested REST APIs and database schemas, created mock services for integration testing, resolved dependency conflicts, and supported debugging and deployment reliability across a multi-service backend platform.

**Status:** PASS (data review)

#### Rendering Implementation
**Component:** ExperiencePlaque (PortfolioExhibits.tsx lines 341-408)  
**Position:** PersonnelWing.tsx lines 319-327 (supervisor desk)  
**Interaction:** Press E to read experience document  
**Document ID:** EXPERIENCE-SPRINGER-CAPITAL  
**Content:** formatExperienceDocument(experience)

**Status:** PASS (code review)

#### Viewing Path
1. Player walks to Personnel Wing
2. Player focuses on Springer Capital experience plaque on supervisor desk
3. InteractionPrompt shows "[E] READ Springer Capital experience"
4. Player presses E
5. inspectDocument() called with experience document content
6. DocumentOverlay opens with formatted experience document
7. Player reads experience details
8. Player presses Escape to close

**Status:** PASS (code review)

#### Content Verification
**Company:** Springer Capital  
**Role:** Backend Intern  
**Duration:** August 2025-November 2025  
**Location:** Remote  
**Bullets:** 5 responsibility items  
**Public Wording:** Complete and professional  
**Known Limitations:** None identified

**Status:** PASS (data review)

---

## EDUCATION DATA STRUCTURE

### EducationEntry Interface
**File:** `src/data/portfolioData.ts` (lines 89-98)

**Required Fields:**
- institution: Institution name
- credential: Degree/certificate name
- duration: Education duration
- location: Institution location
- detail: Additional details (optional)
- coursework: Array of courses (optional)
- factualDescription: Technical description
- publicWording: Public-safe description
- verificationStatus: verified | needs-approval | needs-source | private
- sourceLabel: Evidence source
- sourceUrl: Evidence URL
- lastVerified: Verification date

**Status:** PASS (code review)

---

## EDUCATION ENTRIES (2 Total)

### Education 1: HKBK College of Engineering
**Institution:** HKBK College of Engineering  
**Credential:** Bachelor of Engineering in Computer Science  
**Duration:** 2023-2027  
**Location:** Bengaluru  
**Detail:** Current CGPA: 8.93/10  
**Verification Status:** verified  
**Source:** Explicit user confirmation in Batch 1 decisions  
**Last Verified:** 2026-08-07

#### Data Verification
**Coursework:**
- Data Structures and Algorithms
- Operating Systems
- Computer Networks
- Database Systems
- Cloud Computing
- Artificial Intelligence
- Cybersecurity
- Distributed Systems

**Factual Description:** Primary degree record with CGPA and a compact list of relevant focus areas rather than an exhaustive course list

**Public Wording:** Bachelor of Engineering in Computer Science at HKBK College of Engineering, 2023-2027. Current CGPA: 8.93/10.

**Status:** PASS (data review)

#### Rendering Implementation
**Status:** NOT RENDERED as standalone plaque  
**Reason:** Education is part of identity section, not a separate exhibit  
**Appears In:** Personnel Wing context plaques, Reception terminal, Resume interface

**Status:** PASS (intentional design)

---

### Education 2: VIBGYOR High
**Institution:** VIBGYOR High  
**Credential:** High School Diploma  
**Duration:** 2019-2021  
**Location:** Bengaluru  
**Verification Status:** verified  
**Source:** Explicit user confirmation in Batch 1 decisions  
**Last Verified:** 2026-08-07

#### Data Verification
**Factual Description:** Secondary education entry intended only for a concise archive timeline mention and the full resume, not a major room exhibit

**Public Wording:** High School Diploma, VIBGYOR High, 2019-2021.

**Status:** PASS (data review)

#### Rendering Implementation
**Status:** NOT RENDERED as standalone plaque  
**Reason:** Secondary education, intended for timeline and resume only  
**Appears In:** Archive timeline, Resume interface

**Status:** PASS (intentional design)

---

## EXPERIENCE PLAQUE COMPONENT IMPLEMENTATION

### ExperiencePlaque Component
**File:** PortfolioExhibits.tsx (lines 341-408)

### Implementation Details
```typescript
- Renders as a plaque/mounted document visual
- Uses InteractableObject wrapper
- Interaction kind: "READ"
- Interaction range: 2.2
- Priority: 3
- Calls formatExperienceDocument on interaction
- Passes formatted content to inspectDocument
```

**Status:** PASS (code review)

### Visual Representation
**Geometry:** Plaque/mounted document shape  
**Material:** Metal/plaque-like texture  
**Position:** Supervisor desk surface  
**Scale:** Appropriate for desk-mounted plaque

**Status:** PASS (code review)

---

## EXPERIENCE FORMATTING VERIFICATION

### formatExperienceDocument Function
**File:** PortfolioExhibits.tsx (lines 74-93)

### Output Structure
```
EXPERIENCE: [role] at [company]
DURATION: [duration]
LOCATION: [location]

RESPONSIBILITIES:
• [bullet1]
• [bullet2]
• [bullet3]
• [bullet4]
• [bullet5]

SUMMARY:
[factualDescription]
```

**Status:** PASS (code review)

### Formatting Issues
**Issue 1:** No company website link  
**Analysis:** Company name appears as text only  
**Risk:** Users cannot easily navigate to company website  
**Mitigation:** Consider adding company link  
**Status:** LOW RISK (acceptable for V1)

---

## PERSONNEL WING LAYOUT

### Zone A - Developer Timeline (East Wall)
**Location:** PersonnelWing.tsx lines 289-307  
**Components:**
- Developer timeline wall (interactive)
- Context plaques (Developer Journey, Identity Archives)
- Milestone plaques (Tech Stack, Systems, Roadmap)

**Status:** PASS (code review)

### Zone B - Supervisor Desk (South-East)
**Location:** PersonnelWing.tsx lines 309-338  
**Components:**
- Institutional desk
- CRT monitor (on)
- Keyboard
- Springer Capital experience plaque (interactive)
- Auxilium manifesto document
- Family photo
- Employee chair

**Status:** PASS (code review)

### Zone C - Intake Desk (West-North)
**Location:** PersonnelWing.tsx lines 340-368  
**Components:**
- Institutional desk
- Monitor
- Password login worksheet document
- Desk phone
- Pen
- Coffee mug
- Employee chair

**Status:** PASS (code review)

### Filing Bank (South Wall)
**Location:** PersonnelWing.tsx lines 370-416  
**Components:**
- 3 filing cabinets
- Archive box stack
- Paperwork stack
- Office printer

**Status:** PASS (code review)

---

## DEVELOPER TIMELINE IMPLEMENTATION

### Timeline Component
**File:** PersonnelWing.tsx (lines 289-307)

### Implementation Details
```typescript
- Renders as wall-mounted timeline
- Uses InteractableObject wrapper
- Interaction kind: "READ"
- Interaction range: 3.0
- Displays career chronology
- Shows milestone plaques
```

**Status:** PASS (code review)

### Timeline Content
**Milestones:**
- Tech Stack
- Systems
- Roadmap

**Context:**
- Developer Journey
- Identity Archives

**Status:** PASS (code review)

---

## IDENTITY CONTENT IN PERSONNEL WING

### Context Plaques
**Developer Journey Plaque:**
- Location: East wall
- Content: Career development narrative
- Interaction: Press E to read

**Identity Archives Plaque:**
- Location: East wall
- Content: Archive system narrative
- Interaction: Press E to read

**Status:** PASS (code review)

### Milestone Plaques
**Tech Stack Plaque:**
- Location: East wall
- Content: Technology overview
- Interaction: Press E to read

**Systems Plaque:**
- Location: East wall
- Content: Systems engineering focus
- Interaction: Press E to read

**Roadmap Plaque:**
- Location: East wall
- Content: Career roadmap
- Interaction: Press E to read

**Status:** PASS (code review)

---

## DOCUMENTS IN PERSONNEL WING

### Auxilium Manifesto Document
**Location:** Supervisor desk  
**Content:** Auxilium Digital Archive manifesto  
**Interaction:** Press E to read

**Status:** PASS (code review)

### Password Login Worksheet
**Location:** Intake desk  
**Content:** Login worksheet (atmospheric)  
**Interaction:** Press E to read

**Status:** PASS (code review)

---

## IDENTITY DATA IN PORTFOLIO MANIFEST

### Identity Section
**File:** portfolioData.ts (lines 1304-1453)

### Identity Fields
**Name:** Aryan Kapoor  
**Location:** Bengaluru, India  
**Status:** Computer Science and Engineering student graduating in 2027  
**Institution:** HKBK College of Engineering  
**Degree:** Bachelor of Engineering in Computer Science  
**Duration:** 2023-2027  
**CGPA:** 8.93/10  
**Headline:** Software Engineering Student focused on Backend Systems, Cloud Infrastructure, AI Systems and Interactive WebGL Experiences  
**Short Intro:** Computer Science engineering student in Bengaluru building backend systems, cloud infrastructure, local AI tools and interactive WebGL experiences  
**Biography:** Full biography paragraph  
**Availability:** Open to software engineering internships, open-source collaboration and 2027 graduate opportunities

**Status:** PASS (data review)

### Identity Approval Items
**Total Entries:** 8  
**All Verified:** Yes  
**Appears In:** Reception terminal, Personnel Wing, Final showcase, Resume interface

**Status:** PASS (data review)

---

## SKILLS DATA IN PORTFOLIO MANIFEST

### Skills Section
**File:** portfolioData.ts (lines 1657-1931)

### Skills Categories
**Languages:** Python, TypeScript, Java, Bash, C, C++  
**Frameworks & Libraries:** Flask, FastAPI, React, Next.js, Three.js, React Three Fiber, Zustand, Tailwind CSS  
**Engineering Concepts:** Backend engineering, REST API design, Microservices, Distributed systems, Event-driven architecture, Infrastructure as Code, Cloud infrastructure, High availability, WebGL development, Local AI experimentation

**Status:** PASS (data review)

### Skill Levels
**completed-project:** 15 skills  
**coursework:** 5 skills  
**learning:** 2 skills

**Status:** PASS (data review)

---

## PERSONNEL WING ACCESSIBILITY

### Entry Path
**From:** Reception East Wing Corridor  
**To:** Personnel Wing entrance at [17, 0, 0]  
**Doorway:** 3.0m opening

**Status:** PASS (code review)

### Room Layout
**Primary Focus Areas:**
- Developer timeline (east wall) - first visible on entry
- Supervisor desk (south-east) - experience plaque
- Intake desk (west-north) - atmospheric documents

**Status:** PASS (code review)

### Visibility
**Timeline:** Visible from doorway  
**Experience Plaque:** Visible from doorway  
**Context Plaques:** Visible from doorway

**Status:** PASS (code review)

---

## SUMMARY STATISTICS

**Total Experience Entries:** 1  
**Rendered in 3D World:** 1  
**Total Education Entries:** 2  
**Rendered as Plaques:** 0 (intentional - part of identity)  
**Identity Fields:** 8  
**All Verified:** Yes  
**Skills Categories:** 3  
**Total Skills:** 22  
**Data Structure Issues:** 0  
**Rendering Issues:** 0  
**Content Issues:** 0

**Overall Assessment:** Experience and personnel content is well-structured with complete metadata. Experience entry is properly rendered in Personnel Wing. Education entries are appropriately integrated into identity section. Skills are categorized by level and type. All content is verified and appropriately displayed.

---

## RECOMMENDED IMPROVEMENTS

1. **Add company website link** to experience plaque
2. **Consider adding education plaques** for primary degree
3. **Add skill badges** to timeline plaques
4. **Consider adding LinkedIn profile link** to identity section

---

## NEXT STEPS

Proceed to **Phase 7: Contact Terminal** to test contact system thoroughly.
