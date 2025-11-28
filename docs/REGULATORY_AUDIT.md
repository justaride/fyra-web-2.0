# REGULATORY PAGE ACCURACY AUDIT

**Created:** 2025-11-28
**Status:** PRIORITY 1 & 2 COMPLETE - Remaining items pending
**Source Document:** `/Users/gabrielboen/Downloads/A. Fire Safety Tier System _ Hotel Classification.md`
**Scope:** Verify and correct 36 identified issues on `/regulations` page

---

## OVERVIEW

External analysis identified 36 corrections needed across 7 categories on the `/regulations` page.
This document tracks verification of sources and implementation of corrections.

### Files to Modify
- `app/regulations/page.tsx` - Main regulations page
- `data/fire_safety.json` - Fire safety tier data
- `data/regulatory_practice.json` - Regulatory practice data
- `data/public_procurement.json` - Public procurement data

---

## PRIORITY 1: CRITICAL FACTUAL ERRORS

### FS-01: "Strictest fire requirements" - INCORRECT
- **Current:** "Hotels fall under the strictest fire requirements" (page.tsx:412)
- **Issue:** Hotels are Verksamhetsklass 4, but Vk5 (care) is stricter
- **Fix:** Change "strictest" to "stringent" and add clarification
- **Source:** https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/dimensionerande-forutsattningar/verksamhetsklasser/
- **Status:** [x] Verified 2025-11-28 [x] Implemented 2025-11-28
- **Verification notes:** Confirmed via Boverket. Vk4=hotels (can save themselves), Vk5=care (limited/no ability to save themselves=stricter)
- **Implementation:** Changed "strictest" to "stringent" in page.tsx:412, added clarification about Vk4

### FS-04: "Naturally fire-resistant" wood - CORRECTED
- **Current:** fire_safety.json:7, :11 "naturally fire-resistant materials"
- **Issue:** Wood is combustible (Euroclass D), not "fire-resistant"
- **Fix:** Change to "combustible but with predictable charring behavior"
- **Source:** EN 13501-1 classification - Wood is Class D (normally flammable, combustible)
- **Status:** [x] Verified 2025-11-28 [x] Implemented 2025-11-28
- **Verification notes:** EN 13501-1 defines wood as Euroclass D (combustible). Classes A1/A2 are non-combustible. B-F are combustible. D/E are "normally flammable". Wood burns predictably via charring but is NOT "fire-resistant".
- **Implementation:** Updated description to "wood with predictable charring behavior", product type to "thick sections char predictably, low flame spread"

### FS-07: "Euroclass BS 5852" - CORRECTED
- **Current:** fire_safety.json:96 "Full Euroclass BS 5852 Crib 5"
- **Issue:** BS 5852 is British standard, NOT part of EN 13501 Euroclass system
- **Fix:** Change to "BS 5852 Crib 5 (British standard for upholstered furniture)"
- **Source:** EN 13501-1 defines Euroclasses for building products; BS 5852 is UK standard for furniture composites
- **Status:** [x] Verified 2025-11-28 [x] Implemented 2025-11-28
- **Verification notes:** BS 5852 = British standard for upholstered furniture testing (fabric/foam composites). EN 13501 = European building products classification. Different systems for different applications. Cannot mix terminology.
- **Implementation:** Changed to "BS 5852 Crib 5 testing (British standard for high-hazard upholstery)"

### AR-06: "Hotels = samlingslokaler" - N/A
- **Current:** Not found in current code (possibly removed)
- **Issue:** Hotels are Vk4 (Hotell m.m.), samlingslokaler are Vk2
- **Fix:** N/A if not present
- **Source:** Boverket verksamhetsklasser
- **Status:** [x] Verified 2025-11-28 [x] N/A - not present in codebase
- **Verification notes:** Hotels = Vk4, Samlingslokaler = Vk2. Different classifications confirmed.

---

## PRIORITY 2: OVERLY ABSOLUTE STATEMENTS

### FS-05: "MSDS only - no flame testing needed" - CORRECTED
- **Issue:** BBR requires verification, not just MSDS
- **Fix:** Add "developer responsible for verifying compliance"
- **Status:** [x] Verified [x] Implemented 2025-11-28
- **Implementation:** Changed to "MSDS typically sufficient; developer responsible for verifying material compliance"

### FS-06: "Test certificate = approved system" - CORRECTED
- **Issue:** EN 1021 tests combination; fabric cert alone doesn't approve furniture
- **Fix:** Add nuance about final configuration
- **Status:** [x] Verified [x] Implemented 2025-11-28
- **Implementation:** Changed to "Textile test certificate supports compliance; final furniture configuration may require verification"

### FS-09: Guest rooms lower requirements - CORRECTED
- **Issue:** Still needs overall fire strategy context
- **Status:** [x] Verified [x] Implemented 2025-11-28
- **Implementation:** Added "must meet overall fire safety strategy" to guest room description

### FS-10: Sprinkler equivalence - CORRECTED
- **Issue:** Equivalence is case-by-case, not automatic
- **Status:** [x] Verified [x] Implemented 2025-11-28
- **Implementation:** Changed to "may apply for alternative compliance via analytisk dimensionering (case-by-case)"

### FS-11: Case study precedents - CORRECTED
- **Issue:** Project-specific approvals, not general rules
- **Status:** [x] Verified [x] Implemented 2025-11-28
- **Implementation:** Changed to "obtained project-specific approvals; each case evaluated individually"

### RP-02: "Insurance premium 10-30%"
- **Issue:** No fixed percentage in law
- **Fix:** Change to "depends on insurer and policy"
- **Status:** [ ] Pending - needs location in codebase

### AR-02: Same as RP-02
- **Status:** [ ] Pending

---

## PRIORITY 3: CLARIFICATIONS NEEDED

### FS-02: B-s1,d0 for corridor walls/ceilings
- **Issue:** Requirements vary by building class
- **Fix:** Add "typically" and mention variation
- **Status:** [ ] Verified [ ] Implemented

### FS-03: D-s2,d0 for guest rooms
- **Issue:** This is lower bound, not only class
- **Fix:** Clarify as minimum requirement
- **Status:** [ ] Verified [ ] Implemented

### FS-08: RISE/SP cost numbers
- **Issue:** Reads like official price list
- **Fix:** Add "indicative estimates, confirm with lab"
- **Status:** [ ] Verified [ ] Implemented

### FS-09: Guest rooms lower requirements
- **Issue:** Still needs overall fire strategy
- **Fix:** Add context about overall safety level
- **Status:** [ ] Verified [ ] Implemented

### FS-10: Sprinkler equivalence precedents
- **Issue:** Case studies aren't legal precedents
- **Fix:** Clarify as "illustrative examples, not binding"
- **Status:** [ ] Verified [ ] Implemented

### FS-11: Case study claims
- **Issue:** Project-specific approvals, not general rules
- **Fix:** Add "for this specific project"
- **Status:** [ ] Verified [ ] Implemented

---

## PRIORITY 4: REGULATORY PRACTICE SECTION

### RP-01: "No flexibility" on fire safety
- **Fix:** Add mention of analytisk dimensionering
- **Status:** [ ] Verified [ ] Implemented

### RP-03: Interior renovation permit-exempt
- **Fix:** Add caveats about structural/use changes
- **Status:** [ ] Verified [ ] Implemented

### RP-04: Grandfathered accessibility
- **Fix:** Add BBR 3:5 trigger conditions
- **Status:** [ ] Verified [ ] Implemented

### RP-05: Material passports "2-3 years"
- **Fix:** Remove specific timeline, say "future requirements emerging"
- **Status:** [ ] Verified [ ] Implemented

---

## PRIORITY 5: INTERIOR RENOVATION PATHWAY

### IP-01 to IP-05
- General: Add more caveats about when permits/requirements triggered
- **Status:** [ ] Verified [ ] Implemented

---

## PRIORITY 6: PUBLIC PROCUREMENT

### PP-01 to PP-07
- Main issue: Examples presented as rules
- **Fix:** Add "example" language throughout
- **Status:** [ ] Verified [ ] Implemented

---

## PRIORITY 7: CE MARKING & DOCUMENTATION

### CE-01, CE-02, DR-01 to DR-04
- Nuance needed on legal status and insurance requirements
- **Status:** [ ] Verified [ ] Implemented

---

## KEY SOURCES TO VERIFY

| Source | URL | Status |
|--------|-----|--------|
| Boverket Verksamhetsklasser | https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/dimensionerande-forutsattningar/verksamhetsklasser/ | [ ] |
| BBR Kap 5 (Brandskydd) | https://www.boverket.se/globalassets/publikationer/dokument/2020/konsoliderad-bbr-2011-6-tom-2020-4.pdf | [ ] |
| MSB Brandkrav lös inredning | https://rib.msb.se/Filer/pdf/21571.pdf | [ ] |
| RISE EN 1021 | RISE website | [ ] |
| PBL 9 kap | Boverket PBL-kunskapsbanken | [ ] |
| LOU 2016:1145 | Legal text | [ ] |
| Upphandlingsmyndigheten cirkulär | https://www.upphandlingsmyndigheten.se/branscher/bygg-och-anlaggning/miljomassig-hallbarhet-inom-bygg/cirkular-omstallning/ | [ ] |

---

## IMPLEMENTATION CHECKLIST

After source verification:
1. [ ] Update `fire_safety.json` with corrected tier descriptions
2. [ ] Update `regulatory_practice.json` with nuanced statements
3. [ ] Update `public_procurement.json` with example language
4. [ ] Update `app/regulations/page.tsx` text content
5. [ ] Add disclaimers where appropriate
6. [ ] Build and test
7. [ ] Commit and push

---

## NEXT STEPS FOR CONTINUATION

**If autocompact occurs, read this document first:**

1. Read `/Users/gabrielboen/Downloads/A. Fire Safety Tier System _ Hotel Classification.md` for full analysis
2. Read `docs/REGULATORY_AUDIT.md` (this file) for progress tracking
3. Read `app/regulations/page.tsx` to see current content
4. Read `data/fire_safety.json` for tier data structure
5. Continue with unchecked items above

---

*Audit initiated 2025-11-28*
