# FYRA CIRCULAR PLATFORM - DATA COVERAGE REPORT

**Generated:** 2025-11-27
**Purpose:** Critical analysis of data completeness, source verification, and contact information coverage

---

## EXECUTIVE SUMMARY

| Category | Records | Complete | Coverage |
|----------|---------|----------|----------|
| Suppliers | 12 | 10 | 83% |
| Case Studies | 9 | 5 | 56% |
| Consultants (Enhanced) | 3 | 0 | 0% |
| Consultants (Simple) | 5 | 1 | 20% |
| Sources Registry | 85 | 85 | 100% |

**Overall Assessment:** Data foundation is strong for suppliers, but contact information gaps exist for consultants and some case studies lack source references.

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
- **With Source Refs:** 5 (56%)
- **Missing Source Refs:** 4

### Complete Records
| Case Study | Website | Sources | Notes |
|------------|---------|---------|-------|
| DOWNTOWN CAMPER BY SCANDIC | scandichotelsgroup.com | 2 | ✓ Complete |
| SCANDIC GO (CONCEPT) | scandichotels.com/go | 2 | Missing scope |
| VILLA COPENHAGEN - EARTH SUITE | materdesign.com | 2 | ✓ Complete |
| CLARION HOTEL THE HUB (OSLO) | strawberryhotels.com | 1 | ✓ Complete |
| THON HOTEL OSLO AIRPORT | thonhotels.com | 1 | ✓ Complete |

### Incomplete Records - Missing Source Refs
| Case Study | Website | Gap |
|------------|---------|-----|
| OHBOY HOTEL MALMÖ | ohboy.se | No sourceRefs |
| HOTEL GREEN SOLUTION HOUSE | upchair.dk | No sourceRefs |
| HOTEL HERMAN K (BRØCHNER) | brochner-hotels.com | No sourceRefs |
| HOTEL OTTILIA (BRØCHNER) | brochner-hotels.com/ottilia | No sourceRefs |

### ACTION ITEMS - Case Studies
- [ ] Research and add sources for OHBOY HOTEL MALMÖ
- [ ] Research and add sources for HOTEL GREEN SOLUTION HOUSE
- [ ] Research and add sources for HOTEL HERMAN K
- [ ] Research and add sources for HOTEL OTTILIA
- [ ] Add scope description for SCANDIC GO

---

## 3. CONSULTANTS ANALYSIS

### 3.1 Enhanced Consultants (consultants_enhanced.json)

| Consultant | Website | Sources | Phone | Email | Contact Name |
|------------|---------|---------|-------|-------|--------------|
| FORSEN AB | ✓ | 4 | ✗ | ✗ | ✗ |
| SWECO | ✓ | 6 | ✓ | ✗ | ✓ (Amanda Borneke) |
| HIFAB AB | ✓ | 3 | ✗ | ✗ | ✓ (Several names) |

#### FORSEN AB
- **Website:** https://forsen.com/
- **Sources:** 4 references
- **GAPS:**
  - No direct phone number
  - No direct email
  - No named contact person
- **Available:** Contact form only

#### SWECO
- **Website:** https://swecogroup.com/ | https://sweco.se/
- **Sources:** 6 references
- **Available:**
  - Stockholm Office: +46 8 695 60 00
  - Amanda Borneke (Circular Economy Expert) - LinkedIn profile
  - Anna Joelsson (Project Architect, Blique)
  - Ulrika Francke (CEO)
- **GAPS:**
  - No direct email addresses

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
| White Arkitekter | Raimo Joss | raimo.joss@white.se | +46 8 402 26 59 | Missing |
| Forsen AB | - | - | - | forsen.com |
| Kompanjonen | Per Håkansson | - | - | dackeconsulting.com |
| Sweco | - | - | - | - |
| Hifab | - | - | - | - |

### ACTION ITEMS - Consultants
- [ ] Add White Arkitekter website URL
- [ ] Research direct contact emails for FORSEN
- [ ] Research direct contact emails for SWECO (Amanda Borneke, etc.)
- [ ] Research direct contact emails for HIFAB
- [ ] Add phone numbers for HIFAB contacts
- [ ] Verify Kompanjonen website (dackeconsulting.com vs kompanjonen.se)

---

## 4. SOURCES REGISTRY ANALYSIS (sources.json)

### Summary
- **Total Sources:** 85
- **Source Types:** 18 categories
- **Coverage:** Excellent

### Source Distribution by Type
| Type | Count | Examples |
|------|-------|----------|
| company_website | 15+ | Sweco, Forsen, Hifab, YLLW |
| project_page | 10+ | White House of Choice, Sweco Blique |
| press_release | 5+ | Forsen Amaranten, Nordic Choice |
| certification_website | 8 | LEED, BREEAM, Nordic Swan, Miljöbyggnad |
| regulation | 6 | BBR, REACH, EU Taxonomy |
| standard | 4 | EN 1021, EN 13501, EN 16139 |
| organization_website | 8 | CCBuild, SGBC, IVL, BVB |
| social_media | 3 | LinkedIn, Instagram profiles |

### Key Sources by Entity Type
- **Suppliers:** 10+ dedicated company website sources
- **Consultants:** 15+ sources (websites, project pages, press)
- **Certifications:** 8 official certification body sources
- **Regulations:** 6 government/EU regulation sources
- **Standards:** 4 EN standard references

### Missing/Weak Coverage
- OHBOY HOTEL - No sources in registry
- BRØCHNER HOTELS (Herman K, Ottilia) - No sources
- GREEN SOLUTION HOUSE - No sources

---

## 5. CRITICAL GAPS SUMMARY

### HIGH PRIORITY (Missing Contact Info)
1. **FORSEN AB** - No direct email/phone. Only contact form.
2. **HIFAB AB** - Names available but no direct emails/phones
3. **4 Case Studies** - No source references for verification

### MEDIUM PRIORITY (Incomplete Data)
1. **2 Suppliers** - Missing sourceRefs (Brattöns, Malmö Återbyggdepå)
2. **Consultants (Simple)** - 4/5 missing email addresses
3. **SCANDIC GO** - Missing project scope description

### LOW PRIORITY (Enhancement)
1. White Arkitekter - Missing website URL in simple consultants
2. Source links could be verified for validity

---

## 6. DATA QUALITY SCORE

| Category | Score | Notes |
|----------|-------|-------|
| Suppliers | 9/10 | Excellent. Only 2 missing sourceRefs |
| Case Studies | 6/10 | Good websites, 4 missing sources |
| Consultants Enhanced | 7/10 | Good detail, lacking direct contacts |
| Consultants Simple | 3/10 | Significant gaps |
| Sources Registry | 10/10 | Comprehensive and well-structured |

**Overall Data Quality: 7/10**

---

## 7. RECOMMENDED ACTIONS

### Immediate (High Priority)
1. Research and add source references for:
   - OHBOY HOTEL MALMÖ
   - HOTEL GREEN SOLUTION HOUSE
   - HOTEL HERMAN K
   - HOTEL OTTILIA

2. Find direct contact information for:
   - FORSEN AB (general inquiry email)
   - Amanda Borneke @ SWECO (email)
   - Christian Horn @ HIFAB (email/phone)

### Short-term (Medium Priority)
3. Add sourceRefs for remaining suppliers:
   - BRATTÖNS ÅTERBRUK
   - MALMÖ ÅTERBYGGDEPÅ

4. Complete consultants.json with:
   - White Arkitekter website
   - Sweco direct contacts
   - Hifab direct contacts

### Ongoing (Maintenance)
5. Validate all URLs in sources.json periodically
6. Update contact information when discovered
7. Add new sources as projects are verified

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
