# PHASE 16: MANUAL BROWSER QA
# Functional QA Audit - Auxilium Digital Archive V1

**Date:** 2026-09-06  
**Scope:** Perform actual browser QA  
**Method:** Manual testing checklist (requires user execution)

---

## MANUAL QA REQUIREMENTS

This phase requires manual browser testing that cannot be automated through code analysis. The following checklist should be executed by the user in a browser environment.

---

## PRE-TEST SETUP

### Environment
- [ ] Run `npm run dev` to start development server
- [ ] Open browser to http://localhost:3000
- [ ] Clear browser cache and localStorage
- [ ] Test in Chrome/Edge (primary target)
- [ ] Test in Firefox (secondary target)
- [ ] Test in Safari (if available)

---

## INTRO FLOW TESTING

### Desktop Phase
- [ ] Loading desktop renders correctly
- [ ] Desktop icons display properly
- [ ] Clicking Auxilium Archive icon starts intro
- [ ] Skip button appears and works

### Blackout Phase
- [ ] Screen transitions to black
- [ ] Text appears correctly
- [ ] Transition timing is appropriate

### Reflection Phase
- [ ] Reflection silhouette appears
- [ ] Quote sequence displays correctly
- [ ] Glass cracks appear at correct timing

### Start Screen
- [ ] Start button appears
- [ ] Clicking start enters game
- [ ] Pointer lock engages correctly

---

## FIRST-PERSON MOVEMENT

### WASD Movement
- [ ] W moves forward
- [ ] S moves backward
- [ ] A strafes left
- [ ] D strafes right
- [ ] Shift does not currently sprint (verify expected behavior)

### Mouse Look
- [ ] Mouse movement rotates camera
- [ ] Pointer lock engages on click
- [ ] Pointer lock releases on Escape
- [ ] Camera rotation feels smooth

### Movement Physics
- [ ] Movement speed is reasonable
- [ ] Acceleration feels natural
- [ ] Deceleration feels natural
- [ ] Camera bobbing is present but not excessive
- [ ] Collision with walls prevents walking through

---

## ROOM NAVIGATION

### Reception Wing
- [ ] Spawn in reception wing
- [ ] Reception desk is visible
- [ ] Filing cabinets are visible
- [ ] Documents are visible on desk
- [ ] Computer terminal is visible
- [ ] Can walk to east corridor
- [ ] Can walk to west corridor

### Records Hall
- [ ] Enter from reception east corridor
- [ ] Flagship exhibits are visible
- [ ] Dossier binders are visible
- [ ] Research folios are visible
- [ ] Master catalogue is visible
- [ ] Can walk back to reception

### Personnel Wing
- [ ] Enter from reception west corridor
- [ ] Developer timeline is visible
- [ ] Experience plaque is visible
- [ ] Supervisor desk is visible
- [ ] Intake desk is visible
- [ ] Filing cabinets are visible
- [ ] Can walk back to reception

### Communications Office
- [ ] Enter from personnel west corridor
- [ ] Whiteboard is visible
- [ ] Server racks are visible
- [ ] Project memos are visible
- [ ] Technical bench is visible
- [ ] Keycard is visible on bench
- [ ] Can walk back to personnel

### Elevator Lobby
- [ ] Enter from communications east corridor
- [ ] Elevator door is visible
- [ ] Call panel is visible
- [ ] Contact terminal is visible
- [ ] Can walk back to communications

---

## INTERACTION TESTING

### Reception Desk
- [ ] Can interact with reception computer (E key)
- [ ] Terminal UI opens correctly
- [ ] Can navigate tabs (MANIFEST, OPEN SOURCE, RESEARCH, SYSTEM)
- [ ] Can close terminal (Escape or button)
- [ ] Can interact with desk drawer
- [ ] Drawer opens/closes correctly
- [ ] Can pick up keycard from drawer
- [ ] Keycard appears in inventory
- [ ] Can pick up flashlight from drawer
- [ ] Flashlight appears in inventory

### Records Hall
- [ ] Can interact with flagship exhibits (3)
- [ ] Project dossiers open correctly
- [ ] Document content displays correctly
- [ ] Can close documents (Escape)
- [ ] Can interact with dossier binders (11)
- [ ] Project dossiers open correctly
- [ ] Can interact with research folios (2)
- [ ] Publication documents open correctly
- [ ] Can interact with master catalogue
- [ ] Catalogue displays correctly

### Personnel Wing
- [ ] Can interact with developer timeline
- [ ] Timeline displays correctly
- [ ] Can interact with experience plaque
- [ ] Experience document opens correctly
- [ ] Can interact with context plaques (5)
- [ ] Plaque documents open correctly

### Communications Office
- [ ] Can interact with whiteboard
- [ ] Whiteboard document opens correctly
- [ ] Can interact with server rack
- [ ] Inspection note opens correctly
- [ ] Can interact with project memos
- [ ] Memo documents open correctly
- [ ] Can interact with technical bench
- [ ] Workbench status opens correctly
- [ ] Can pick up personal archive keycard
- [ ] Keycard appears in inventory
- [ ] Milestone is set

### Elevator Lobby
- [ ] Can interact with contact terminal
- [ ] Candidate summary opens correctly
- [ ] LinkedIn URL is visible
- [ ] Can interact with elevator call panel
- [ ] Elevator state changes

---

## DOCUMENT OVERLAY TESTING

### Document Display
- [ ] Documents open with correct title
- [ ] Document type displays correctly
- [ ] Content displays with proper formatting
- [ ] Author signature displays (if present)
- [ ] Close button works
- [ ] Escape key closes document
- [ ] Click outside closes document
- [ ] Pointer lock releases on open
- [ ] Pointer lock re-engages on close

### Document Types
- [ ] Note type displays with correct styling
- [ ] Dossier type displays with correct styling
- [ ] Text is readable
- [ ] Contrast is good

---

## INVENTORY TESTING

### Inventory UI
- [ ] Press Tab or M to open inventory
- [ ] Inventory displays collected items
- [ ] Items show correct names
- [ ] Items show correct icons (if implemented)
- [ ] New item notification appears
- [ ] Can close inventory

### Items
- [ ] Security keycard appears in inventory
- [ ] Level2 keycard appears in inventory
- [ ] Flashlight appears in inventory
- [ ] Items persist after page refresh

---

## PERSISTENCE TESTING

### localStorage
- [ ] Inventory persists after refresh
- [ ] Unlocked rooms persist after refresh
- [ ] Milestones persist after refresh
- [ ] Elevator state persists after refresh
- [ ] Active document does NOT persist (intentional)
- [ ] Active terminal does NOT persist (intentional)

---

## BROWSER COMPATIBILITY

### Chrome/Edge
- [ ] Application loads correctly
- [ ] WebGL renders correctly
- [ ] Pointer lock works
- [ ] Performance is acceptable
- [ ] No console errors

### Firefox
- [ ] Application loads correctly
- [ ] WebGL renders correctly
- [ ] Pointer lock works
- [ ] Performance is acceptable
- [ ] No console errors

### Safari (if available)
- [ ] Application loads correctly
- [ ] WebGL renders correctly
- [ ] Pointer lock works
- [ ] Performance is acceptable
- [ ] No console errors

---

## PERFORMANCE TESTING

### Frame Rate
- [ ] FPS is stable (60+ FPS target)
- [ ] No stuttering during movement
- [ ] No stuttering during interactions
- [ ] Post-processing effects don't cause lag

### Memory
- [ ] Memory usage is stable
- [ ] No memory leaks over time
- [ ] Page remains responsive

---

## ACCESSIBILITY TESTING

### Keyboard Navigation
- [ ] WASD works for movement
- [ ] E key works for interaction
- [ ] Escape works for closing
- [ ] Tab works for inventory
- [ ] M works for inventory

### Visual
- [ ] Text is readable
- [ ] Contrast is good
- [ ] Font sizes are appropriate

---

## EXTERNAL LINKS TESTING

### Repository URLs
- [ ] GitHub URLs are correct format
- [ ] Links are visible in documents
- [ ] (Optional) Test if repositories are accessible

### Publication URLs
- [ ] Zenodo URL is correct format
- [ ] Link is visible in publication document
- [ ] (Optional) Test if Zenodo record is accessible

### LinkedIn URL
- [ ] LinkedIn URL is correct format
- [ ] Link is visible in contact terminal
- [ ] (Optional) Test if LinkedIn profile is accessible

---

## EDGE CASES

### Rapid Interactions
- [ ] Rapidly pressing E doesn't cause issues
- [ ] Rapidly opening/closing documents doesn't cause issues
- [ ] Rapidly switching tabs in terminal doesn't cause issues

### State Transitions
- [ ] Opening document while another is open works correctly
- [ ] Opening terminal while document is open works correctly
- [ ] Pointer lock behavior is consistent

### Missing Assets
- [ ] No broken images (if any images added)
- [ ] No missing 3D models
- [ ] No missing sounds

---

## CONSOLE ERRORS

### Browser Console
- [ ] No JavaScript errors
- [ ] No WebGL errors
- [ ] No React warnings (except known ESLint issues)
- [ ] No network errors

---

## MOBILE TESTING (Optional)

### Mobile Browser
- [ ] Application loads (may not be functional due to pointer lock)
- [ ] Appropriate message displayed if not supported

---

## SUMMARY

### Manual QA Status
**Completed:** [ ]  
**Total Checks:** [ ] / [ ]  
**Passed:** [ ]  
**Failed:** [ ]  
**Deferred:** [ ]

### Critical Issues Found
- [ ] List any P0 issues found

### High Priority Issues Found
- [ ] List any P1 issues found

### Medium Priority Issues Found
- [ ] List any P2 issues found

### Low Priority Issues Found
- [ ] List any P3 issues found

---

## NOTES

Add any additional observations or issues found during manual testing:

---

## NEXT STEPS

After completing manual QA, proceed to **Phase 17: Fix Only Verified Problems** to fix P0/P1 issues.
