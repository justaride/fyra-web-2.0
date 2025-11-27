# FYRA CIRCULAR PLATFORM - DATA COVERAGE REPORT

**Generated:** 2025-11-27
**Last Updated:** 2025-11-27 (data enrichment from MIRO DOCS research)
**Purpose:** Critical analysis of data completeness, source verification, and contact information coverage

---

## EXECUTIVE SUMMARY

| Category | Records | Complete | Coverage | Change |
|----------|---------|----------|----------|--------|
| Suppliers | 12 | 10 | 83% | - |
| Case Studies | 9 | 9 | 100% | +4 sources |
| Consultants (Enhanced) | 3 | 1 | 33% | +1 email |
| Consultants (Simple) | 5 | 2 | 40% | +1 website |
| Sources Registry | 100 | 100 | 100% | +15 sources |

**Overall Assessment:** Significant improvement after extracting data from MIRO DOCS research. All case studies now have source references. Consultant contact gaps reduced but still require additional research.

---

## 1. SUPPLIERS ANALYSIS (suppliers_enhanced.json)

### Coverage Summary
- **Total Suppliers:** 12
- **Complete Records:** 10 (83%)
- **Missing Source Refs:** 2

### Complete Records (Email + Phone + Website + Sources)
| Supplier | Email | Phone | Website | Sources |
|----------|-------|-------|---------|---------|
| YLLW FACTORY | ✓ | ✓ | ✓ | ✓ |
| INPUT INTERIÖR / GREENIFIED | ✓ | ✓ | ✓ | ✓ |
| REKOMO AB | ✓ | ✓ | ✓ | ✓ |
| KOMPANJONEN | ✓ | ✓ | ✓ | ✓ |
| RECYCLING PARTNER (RP) | ✓ | ✓ | ✓ | ✓ |
| ÅTERBRUKSFABRIKEN | ✓ | ✓ | ✓ | ✓ |
| PLACE2PLACE | ✓ | ✓ | ✓ | ✓ |
| DPJ WORKSPACE | ✓ | ✓ | ✓ | ✓ |
| SPIREC | ✓ | ✓ | ✓ | ✓ |
| MATER DESIGN | ✓ | ✓ | ✓ | ✓ |

### Incomplete Records
| Supplier | Issue |
|----------|-------|
| BRATTÖNS ÅTERBRUK | Missing sourceRefs |
| MALMÖ ÅTERBYGGDEPÅ | Missing sourceRefs |

### ACTION ITEMS - Suppliers
- [ ] Add sourceRefs for BRATTÖNS ÅTERBRUK
- [ ] Add sourceRefs for MALMÖ ÅTERBYGGDEPÅ

---

## 2. CASE STUDIES ANALYSIS (caseStudies_clean.json)

### Coverage Summary
- **Total Case Studies:** 9
- **With Source Refs:** 9 (100%) ✅
- **Missing Source Refs:** 0

### Complete Records (All Now Have Sources)
| Case Study | Website | Sources | Status |
|------------|---------|---------|--------|
| DOWNTOWN CAMPER BY SCANDIC | scandichotelsgroup.com | 2 | ✓ Complete |
| SCANDIC GO (CONCEPT) | scandichotels.com/go | 2 | ✓ Complete |
| VILLA COPENHAGEN - EARTH SUITE | materdesign.com | 2 | ✓ Complete |
| CLARION HOTEL THE HUB (OSLO) | strawberryhotels.com | 1 | ✓ Complete |
| THON HOTEL OSLO AIRPORT | thonhotels.com | 1 | ✓ Complete |
| OHBOY HOTEL MALMÖ | ohboy.se | 3 | ✓ **NEW** |
| HOTEL GREEN SOLUTION HOUSE | greensolutionhouse.dk | 2 | ✓ **NEW** |
| HOTEL HERMAN K (BRØCHNER) | hermank.dk | 6 | ✓ **NEW** |
| HOTEL OTTILIA (BRØCHNER) | brochner-hotels.com | 4 | ✓ **NEW** |

### Sources Added (2025-11-27)
**OHBOY HOTEL MALMÖ:**
- ohboy_website (ohboy.se/en/sustainable-hotel/)
- siegel_ohboy (siegel.nu/en/home/ohboy/)
- ekstrands_ohboy (ekstrands.com)

**HOTEL GREEN SOLUTION HOUSE:**
- archdaily_gsh (ArchDaily article on 3XN climate-positive design)
- greensolutionhouse_website

**HOTEL HERMAN K:**
- hoteldesigns_hermank, thespaces_hermank, hermank_website
- hotelnewsresource_hermank, brochner_sustainability, greenkey_hermank

**HOTEL OTTILIA:**
- selectedbyrg_ottilia, brochner_ottilia
- brochner_sustainability, northabroad_copenhagen

### ACTION ITEMS - Case Studies
- [x] ~~Research and add sources for OHBOY HOTEL MALMÖ~~ ✅
- [x] ~~Research and add sources for HOTEL GREEN SOLUTION HOUSE~~ ✅
- [x] ~~Research and add sources for HOTEL HERMAN K~~ ✅
- [x] ~~Research and add sources for HOTEL OTTILIA~~ ✅
- [ ] Add scope description for SCANDIC GO (minor)

---

## 3. CONSULTANTS ANALYSIS

### 3.1 Enhanced Consultants (consultants_enhanced.json)

| Consultant | Website | Sources | Phone | Email | Contact Name |
|------------|---------|---------|-------|-------|--------------|
| FORSEN AB | ✓ | 4 | ✗ | ✗ | ✗ |
| SWECO | ✓ | 6 | ✓ | ✓ **NEW** | ✓ (Amanda Borneke, Anna Joelsson) |
| HIFAB AB | ✓ | 3 | ✗ | ✗ | ✓ (Several names) |

#### FORSEN AB
- **Website:** https://forsen.com/
- **Sources:** 4 references
- **GAPS:**
  - No direct phone number
  - No direct email
  - No named contact person
- **Available:** Contact form only

#### SWECO ✅ IMPROVED
- **Website:** https://swecogroup.com/ | https://sweco.se/
- **Sources:** 6 references
- **Available:**
  - Stockholm Office: +46 8 695 60 00
  - Amanda Borneke (Circular Economy Expert) - LinkedIn profile
  - **Anna Joelsson (Hållbarhetschef Buildings): anna.joelsson@sweco.se** ✅ NEW
  - Ulrika Francke (CEO)
- **Status:** Direct email contact now available

#### HIFAB AB
- **Website:** https://hifab.se/
- **Sources:** 3 references
- **Available Names:**
  - Nicke Rydgren (CEO)
  - Christian Horn (Head of PM West/Stockholm)
  - Anna Larsson (Strategic Consultant Energy)
- **GAPS:**
  - No direct phone numbers
  - No direct email addresses

### 3.2 Simple Consultants (consultants.json)

| Consultant | Contact Name | Email | Phone | Website |
|------------|--------------|-------|-------|---------|
| White Arkitekter | Raimo Joss | raimo.joss@white.se | +46 8 402 26 59 | ✓ **NEW** |
| Forsen AB | - | - | - | forsen.com |
| Kompanjonen | Per Håkansson | - | - | dackeconsulting.com |
| Sweco | - | - | - | - |
| Hifab | - | - | - | - |

### ACTION ITEMS - Consultants
- [x] ~~Add White Arkitekter website URL~~ ✅
- [x] ~~Research direct contact emails for SWECO~~ ✅ (Anna Joelsson: anna.joelsson@sweco.se)
- [ ] Research direct contact emails for FORSEN
- [ ] Research direct contact emails for HIFAB
- [ ] Add phone numbers for HIFAB contacts
- [ ] Verify Kompanjonen website (dackeconsulting.com vs kompanjonen.se)

---

## 4. SOURCES REGISTRY ANALYSIS (sources.json)

### Summary
- **Total Sources:** 100 (+15 NEW)
- **Source Types:** 18 categories
- **Coverage:** Excellent

### Source Distribution by Type
| Type | Count | Examples |
|------|-------|----------|
| company_website | 20+ | Sweco, Forsen, Hifab, YLLW, Ohboy, Brøchner |
| project_page | 15+ | White House of Choice, Sweco Blique, Siegel Ohboy |
| press_release | 5+ | Forsen Amaranten, Nordic Choice |
| news_article | 10+ | ArchDaily, Hotel Designs, The Spaces, Hotel News Resource |
| certification_website | 8 | LEED, BREEAM, Nordic Swan, Miljöbyggnad |
| regulation | 6 | BBR, REACH, EU Taxonomy |
| standard | 4 | EN 1021, EN 13501, EN 16139 |
| organization_website | 8 | CCBuild, SGBC, IVL, BVB |
| social_media | 3 | LinkedIn, Instagram profiles |

### Key Sources by Entity Type
- **Suppliers:** 10+ dedicated company website sources
- **Consultants:** 15+ sources (websites, project pages, press)
- **Case Studies:** 20+ sources (including 15 NEW hotel sources)
- **Certifications:** 8 official certification body sources
- **Regulations:** 6 government/EU regulation sources
- **Standards:** 4 EN standard references

### Previously Missing - Now Complete ✅
- ~~OHBOY HOTEL - No sources in registry~~ → 3 sources added
- ~~BRØCHNER HOTELS (Herman K, Ottilia) - No sources~~ → 10 sources added
- ~~GREEN SOLUTION HOUSE - No sources~~ → 2 sources added

---

## 5. CRITICAL GAPS SUMMARY (UPDATED 2025-11-27)

### HIGH PRIORITY - RESOLVED ✅
1. ~~**4 Case Studies** - No source references~~ → ALL RESOLVED (15 sources added)
2. ~~**SWECO** - No direct email~~ → RESOLVED (Anna Joelsson email added)
3. ~~**White Arkitekter** - Missing website~~ → RESOLVED

### MEDIUM PRIORITY (Remaining)
1. **FORSEN AB** - No direct email/phone. Only contact form.
2. **HIFAB AB** - Names available but no direct emails/phones
3. **2 Suppliers** - Missing sourceRefs (Brattöns, Malmö Återbyggdepå)
4. **SCANDIC GO** - Missing project scope description

### LOW PRIORITY (Enhancement)
1. Source links could be verified for validity
2. Kompanjonen website verification (dackeconsulting.com vs kompanjonen.se)

---

## 6. DATA QUALITY SCORE (UPDATED)

| Category | Score | Previous | Notes |
|----------|-------|----------|-------|
| Suppliers | 9/10 | 9/10 | Only 2 missing sourceRefs |
| Case Studies | 10/10 | 6/10 | ✅ ALL now have sources (+15 added) |
| Consultants Enhanced | 8/10 | 7/10 | ✅ SWECO email added |
| Consultants Simple | 5/10 | 3/10 | ✅ White website added |
| Sources Registry | 10/10 | 10/10 | Expanded to 100 sources |

**Overall Data Quality: 8.5/10** (improved from 7/10)

---

## 7. RECOMMENDED ACTIONS

### Completed (2025-11-27) ✅
1. ~~Research and add source references for case studies~~ → DONE
   - ✅ OHBOY HOTEL MALMÖ (3 sources)
   - ✅ HOTEL GREEN SOLUTION HOUSE (2 sources)
   - ✅ HOTEL HERMAN K (6 sources)
   - ✅ HOTEL OTTILIA (4 sources)

2. ~~Find direct contact for SWECO~~ → DONE
   - ✅ Anna Joelsson (Hållbarhetschef): anna.joelsson@sweco.se

3. ~~Add White Arkitekter website~~ → DONE
   - ✅ https://whitearkitekter.com

### Remaining (Medium Priority)
4. Find direct contact information for:
   - FORSEN AB (general inquiry email)
   - Christian Horn @ HIFAB (email/phone)

5. Add sourceRefs for remaining suppliers:
   - BRATTÖNS ÅTERBRUK
   - MALMÖ ÅTERBYGGDEPÅ

### Ongoing (Maintenance)
6. Validate all URLs in sources.json periodically
7. Update contact information when discovered
8. Add new sources as projects are verified

---

## 8. LINK VALIDATION STATUS

All links should be tested for 404 errors. Known issues:
- ✓ Case study URLs fixed (special character encoding resolved)
- ⚠ External source URLs not validated in this report

### Recommended: Periodic Link Check
```bash
# Example link validation script would go here
# Check all URLs in sources.json
# Check all website fields in data files
```

---

**Report End**
*Generated for Fyra Circular Platform data quality assessment*
