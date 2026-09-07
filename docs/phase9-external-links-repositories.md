# PHASE 9: EXTERNAL LINKS / REPOSITORIES AUDIT
# Functional QA Audit - Auxilium Digital Archive V1

**Date:** 2026-09-06  
**Scope:** Audit every external link  
**Method:** Code path analysis of all URLs in the codebase

---

## EXTERNAL LINKS INVENTORY

### GitHub Repository Links (9)

#### 1. InfraMind
**URL:** https://github.com/Keninjavelas/InfraMind  
**Location:** portfolioData.ts (line 388)  
**Project:** InfraMind  
**Display:** Text-only in dossier content  
**Status:** PASS (valid format)

#### 2. Poseidon
**URL:** https://github.com/Keninjavelas/Poseidon  
**Location:** portfolioData.ts (line 456)  
**Project:** Poseidon  
**Display:** Text-only in dossier content  
**Status:** PASS (valid format)

#### 3. Multi-Cloud Serverless Analytics
**URL:** https://github.com/Keninjavelas/MultiCloud-Serverless-Analytics  
**Location:** portfolioData.ts (line 510)  
**Project:** Multi-Cloud Serverless Analytics  
**Display:** Text-only in dossier content  
**Status:** PASS (valid format)

#### 4. DayOne AI
**URL:** https://github.com/Keninjavelas/DayOne-AI  
**Location:** portfolioData.ts (line 608)  
**Project:** DayOne AI  
**Display:** Text-only in dossier content  
**Status:** PASS (valid format)

#### 5. Ghost Protocol
**URL:** https://github.com/Keninjavelas/Ghost-Protocol  
**Location:** portfolioData.ts (line 659)  
**Project:** Ghost Protocol (deferred)  
**Display:** Text-only in dossier content  
**Status:** PASS (valid format, but project deferred)

#### 6. Student OS
**URL:** https://github.com/Keninjavelas/Student-OS  
**Location:** portfolioData.ts (line 710)  
**Project:** Student OS  
**Display:** Text-only in dossier content  
**Status:** PASS (valid format)

#### 7. GCP OmniStream
**URL:** https://github.com/Keninjavelas/GCP-OmniStream  
**Location:** portfolioData.ts (line 837)  
**Project:** GCP OmniStream  
**Display:** Text-only in dossier content  
**Status:** PASS (valid format)

#### 8. AWS CloudOps
**URL:** https://github.com/Keninjavelas/AWS-CloudOps  
**Location:** portfolioData.ts (line 882)  
**Project:** AWS CloudOps  
**Display:** Text-only in dossier content  
**Status:** PASS (valid format)

#### 9. AWS Helix Data Lakehouse
**URL:** https://github.com/Keninjavelas/AWS-Helix-Data-Lakehouse  
**Location:** portfolioData.ts (line 927)  
**Project:** AWS Helix Data Lakehouse  
**Display:** Text-only in dossier content  
**Status:** PASS (valid format)

#### 10. Odysseus
**URL:** https://github.com/Keninjavelas/odysseus  
**Location:** portfolioData.ts (line 1013)  
**Project:** Odysseus  
**Display:** Text-only in dossier content  
**Status:** PASS (valid format)

---

### Publication Source Links (1)

#### 1. Post-Quantum Cryptography
**URL:** https://zenodo.org/records/20002606  
**Location:** portfolioData.ts (line 2024)  
**Publication:** A Decision Framework for Post-Quantum Cryptography Deployment in Zero Trust Architecture  
**Display:** Text-only in publication document  
**Status:** PASS (valid format)

---

### LinkedIn Link (1)

#### 1. LinkedIn Profile
**URL:** https://linkedin.com/in/aryan-kapoor-portfolio  
**Location:** PortfolioExhibits.tsx (line 497)  
**Display:** Text-only in contact terminal content  
**Status:** PASS (valid format)

---

## LINK FORMAT ANALYSIS

### GitHub URL Format
**Pattern:** https://github.com/Keninjavelas/{repository-name}  
**Consistency:** All GitHub URLs follow consistent pattern  
**Case Sensitivity:** Repository names use kebab-case consistently  
**Status:** PASS (consistent formatting)

### Zenodo URL Format
**Pattern:** https://zenodo.org/records/{record-id}  
**Consistency:** Single Zenodo URL follows standard pattern  
**Status:** PASS (valid format)

### LinkedIn URL Format
**Pattern:** https://linkedin.com/in/{profile-name}  
**Consistency:** Standard LinkedIn profile URL format  
**Status:** PASS (valid format)

---

## LINK ACCESSIBILITY

### Clickable Links
**Count:** 0  
**Status:** All links are text-only in document content  
**Issue:** Users must manually copy-paste URLs  
**Mitigation:** DocumentOverlay supports interactiveLink feature but not currently used  
**Status:** LOW RISK (acceptable for V1, feature available for future)

### Link Visibility
**Repository Links:** Visible in project dossiers  
**Publication Links:** Visible in publication documents  
**LinkedIn Link:** Visible in contact terminal  
**Status:** PASS (links are discoverable)

---

## LINK VALIDATION

### GitHub Repository Validation
**Method:** Code review only (no actual HTTP requests)  
**Validation:** URL format validation only  
**Status:** PASS (all URLs have valid GitHub format)

### Repository Existence
**Method:** Not verified (requires HTTP requests)  
**Status:** DEFERRED (Phase 16 manual browser QA)

### Zenodo Record Validation
**Method:** Code review only (no actual HTTP requests)  
**Validation:** URL format validation only  
**Status:** PASS (valid Zenodo format)

### Record Existence
**Method:** Not verified (requires HTTP requests)  
**Status:** DEFERRED (Phase 16 manual browser QA)

### LinkedIn Profile Validation
**Method:** Code review only (no actual HTTP requests)  
**Validation:** URL format validation only  
**Status:** PASS (valid LinkedIn format)

### Profile Existence
**Method:** Not verified (requires HTTP requests)  
**Status:** DEFERRED (Phase 16 manual browser QA)

---

## LINK SECURITY

### External Link Security
**Target Blank:** Not applicable (links are text-only)  
**Rel Attributes:** Not applicable (links are text-only)  
**Status:** N/A (no clickable links currently)

### Future Clickable Link Security
**Recommendation:** When adding clickable links, use:
- target="_blank"
- rel="noopener noreferrer"
- For security against tabnabbling and referrer leakage

**Status:** DEFERRED (when clickable links are added)

---

## REDUNDANT OR BROKEN LINKS

### Redundant Links
**Count:** 0  
**Status:** No duplicate URLs identified

### Potentially Broken Links
**Count:** 0 (format validation only)  
**Status:** No format issues identified  
**Note:** Actual link health requires HTTP verification (deferred to Phase 16)

---

## LINK CONTEXT

### Repository Links Context
**Location:** Project dossier documents  
**Label:** "REPOSITORY: {url}"  
**Purpose:** Provide access to source code  
**Status:** PASS (clear context)

### Publication Links Context
**Location:** Publication documents  
**Label:** "SOURCE: {url}"  
**Purpose:** Provide access to publication record  
**Status:** PASS (clear context)

### LinkedIn Link Context
**Location:** Contact terminal  
**Label:** "LinkedIn: {url}"  
**Purpose:** Provide professional contact channel  
**Status:** PASS (clear context)

---

## MISSING LINKS

### Live Demo Links
**Count:** 0 projects have liveDemoUrl  
**Status:** ACCEPTABLE (no live deployments currently)

### Verification URLs
**Certifications:** 4 certifications, all have null verificationUrl  
**Open Source:** 2 entries, both have null repositoryUrl and pullRequestUrl  
**Status:** ACCEPTABLE (marked needs-source, not rendered)

---

## LINK CONSISTENCY

### Repository URL Field
**Public Repositories:** 9 have repositoryUrl  
**Private Repositories:** 4 have null repositoryUrl  
**Deferred Projects:** 2 have null repositoryUrl  
**Status:** PASS (appropriate null values for private/deferred projects)

### Source URL Field
**Publications:** 1 has sourceUrl, 1 has null sourceUrl  
**Status:** PASS (ICETM proceedings conditional on registration)

---

## LINK MAINTENANCE

### Link Updates
**Current Process:** Manual update in portfolioData.ts  
**Automation:** None  
**Status:** ACCEPTABLE (manual process for V1)

### Link Validation Schedule
**Current Process:** None  
**Recommendation:** Periodic link health checks  
**Status:** DEFERRED (post-launch maintenance)

---

## SUMMARY STATISTICS

**Total External Links:** 11  
**GitHub Repository Links:** 10  
**Publication Source Links:** 1  
**LinkedIn Links:** 1  
**Clickable Links:** 0 (all text-only)  
**Format Issues:** 0  
**Broken Links:** 0 (format validation only)  
**Redundant Links:** 0  
**Missing Links:** 0 (intentionally null where appropriate)

**Overall Assessment:** All external links have valid URL formats. Links are consistently formatted and properly contextualized. All links are text-only (not clickable), which is acceptable for V1. Link health verification requires HTTP requests (deferred to Phase 16 manual browser QA). No critical issues identified.

---

## RECOMMENDED IMPROVEMENTS

1. **Add clickable repository links** using DocumentOverlay interactiveLink feature
2. **Add clickable publication links** using DocumentOverlay interactiveLink feature
3. **Add clickable LinkedIn link** using DocumentOverlay interactiveLink feature
4. **Implement periodic link health checks** for post-launch maintenance
5. **Consider adding live demo links** when deployments become available
6. **Add URL validation** at runtime to detect malformed links

---

## NEXT STEPS

Proceed to **Phase 10: Optional Personal Archive / Keycard** to verify optional mechanic.
