# FYRA CIRCULAR PLATFORM - CRITICAL ANALYSIS & IMPLEMENTATION GUIDE

## EXECUTIVE SUMMARY

**Current State Assessment: ~75% Complete | Quality: HIGH | Remaining: Templates, JSON-LD, Search**

The Fyra Circular Platform has been significantly expanded from the original supplier directory. Major sections implemented:
- ✅ Supplier Directory with detail pages (12 suppliers)
- ✅ Case Study pages with detail pages (9 studies)
- ✅ Consultants/Experts with enhanced profiles
- ✅ Scenarios (5 project guides)
- ✅ Regulatory/Fire Safety with tier system
- ✅ Certifications
- ✅ Specifications/BVB system
- ✅ Source Library (85 sources)

**Remaining items:** P6 Templates/Downloads, JSON-LD structured data, Search functionality.

---

## SECTION 1: ARCHITECTURE ANALYSIS

### 1.1 Current Platform Structure (Observed)

```
fyra-web-2.0/
├── index.html (Main landing page with map)
├── /suppliers (Nordic Supplier Directory - partial)
├── /scenarios (Landing page only - no content)
└── [Missing sections]
```

### 1.2 Required Platform Structure (Based on Project Knowledge)

```
fyra-web-2.0/
├── index.html
├── /suppliers
│   ├── /tier-1 (YLLW Factory, Input/Greenified)
│   ├── /tier-2 (Kompanjonen, Återbruksfabriken, Rekomo)
│   ├── /tier-3 (Place2Place, DPJ, Brattöns)
│   └── capability-matrix.html
├── /consultants [MISSING - PRIORITY #1]
│   ├── /project-managers (Forsen, Sweco, Hifab)
│   ├── /sustainability (White Arkitekter, Piacon)
│   └── /specialists (RISE, IVL, SGBC)
├── /regulatory [MISSING - PRIORITY #3]
│   ├── fire-safety.html (BBR Chapter 5)
│   ├── bvb-compliance.html
│   ├── flowcharts.html
│   └── templates.html
├── /frontrunner-hotels [MISSING - PRIORITY #5-6]
│   ├── blique-nobis.html
│   ├── green-solution-house.html
│   ├── hotel-skeppsholmen.html
│   └── villa-copenhagen.html
├── /scenarios [EXISTS BUT EMPTY]
│   ├── urgent-replacement.html
│   ├── large-hotel-renovation.html
│   ├── fire-critical-requirements.html
│   └── finnish-swedish-cross-border.html
└── /library [NEW - FOR CLAUDE WEB MODE]
    ├── sources.json
    ├── contacts.json
    └── templates/
```

---

## SECTION 2: CRITICAL GAP ANALYSIS

### GAP 2.1: SUSTAINABILITY CONSULTANTS SECTION [PRIORITY #1 - MISSING]

**Impact:** Without consultant profiles, the platform cannot guide users through Swedish market entry. This is the highest-value missing content.

**Source Documents:**
- `3__SWEDISH_PROJECT_MANAGERS___TECHNICAL_CONSULTANTS.docx` (64KB)
- `6__STRATEGIC_IMPLEMENTATION_ROADMAP.docx` (152KB)

**Required Content - 6 Consultant Profiles:**

#### TIER 1: Project Managers (Full Profiles Needed)

**1. FORSEN AB - PRIORITY RANKING: ★★★★★**
```markdown
Contact:
- Website: forsen.com
- General Inquiry: via forsen.com contact form
- Coverage: Nationwide - offices from Luleå to Malmö
- Size: ~200 employees

Key Differentiator: Only consultant with 10+ documented hotel projects AND
Construction Management (CM) expertise enabling circular material procurement

Documented Hotel Projects:
1. Clarion Hotel Amaranten (461 rooms, live renovation) - Nordic Choice
2. Grow Hotel Solna (PROVEN circular procurement via CM)
3. Clarion Malmö Live
4. HTL Hotels projects (Scandic)
5. Best Western Bentleys
...10+ total

Hospitality Readiness: ★★★★★
Circular Economy: ★★★☆☆ (Emerging - Grow Hotel proves capability)
Fire Safety: ★★★★☆ (PBL Inspector certified)
```

**2. SWECO AB - PRIORITY RANKING: ★★★★☆**
```markdown
Contact:
- Phone: +46 8 695 60 00
- Circular Economy Expert: Amanda Borneke (linkedin.com/in/amanda-borneke)
- Size: 22,000 employees (2,000+ in Sweden)

FLAGSHIP PROJECT - Blique by Nobis (249 rooms):
- €8.6 MILLION materials reused
- 3,600 TONS CO₂ SAVED
- €120 MILLION total savings vs demolition
- LEED Gold + Nordic Swan certified

Tools: C3 Circular Economy ROI Calculator (cirkulärekonomi.se/c3)
```

**3. HIFAB AB - PRIORITY RANKING: ★★★☆☆**
```markdown
Contact:
- Website: hifab.se
- Key Contact: Christian Horn (Head of PM Stockholm)
- Size: 400 employees, 15 offices nationwide

Value: 70 years PM experience, cost-effective, strong regulatory navigation
Best For: Budget projects, public sector, complex permits
```

#### TIER 2: Sustainability Specialists

**4. WHITE ARKITEKTER - Strategic Knowledge Partner**
```markdown
Contact:
- Raimo Joss: raimo.joss@white.se, +46 8 402 26 59
- Rickard Nygren: [Sustainability Strategist] +46 8 402 25 29
- Size: 900 employees (employee-owned)

Hotel Projects:
- House of Choice (Scandinavia's first zero-energy hotel, 70% recycled materials)
- Sara Kulturhus (20-story timber hotel)
- Stockholm Waterfront Congress Centre

Role: Strategic knowledge partner, not primary PM (architect firm)
```

**5. PIACON AB - Certification Specialist**
```markdown
Role: LEED, BREEAM, MiljöByggnad certification
Fire Safety Expertise: Confirmed
Use Case: Project certification when PM lacks in-house capability
```

**6. RISE Fire Research**
```markdown
Website: ri.se
Location: Borås (primary), Stockholm (SP)
Service: Fire testing, training workshops
Cost: €3,000-5,000 (training), €500-2,000 per test
Timeline: 2-4 weeks per test
```

---

### GAP 2.2: REGULATORY GUIDANCE SECTION [PRIORITY #3 - MISSING]

**Impact:** Users cannot navigate Swedish fire safety compliance without this section. This is the #1 technical barrier to circular hospitality projects.

**Source Document:** `5__PRACTICAL_REGULATORY_GUIDE.docx` (86KB)

**Required Content:**

#### A. BBR Chapter 5 Fire Safety Framework
```markdown
## Hotel Classification: Verksamhetsklass 4 (Assembly Facilities)
STRICTEST fire requirements apply

### Fire Classifications by Area:

| Location | Fire Class | Standard | Enforcement |
|----------|------------|----------|-------------|
| Escape Routes (Corridors) | B-s1,d0 | EN 13501-1 | VERY HIGH |
| Lobbies/Restaurants | B-s1,d0 or D-s2,d0 | EN 13501-1 | HIGH |
| Guest Rooms | EN 1021-1/2 | Upholstery | MEDIUM |
| Back-of-House | Standard commercial | Varies | LOW |

### Testing Standards:
- EN 1021-1: Cigarette ignition test (MINIMUM for hotels)
- EN 1021-2: Match equivalent test (REQUIRED for public areas)
- BS 5852 Crib 5: May be required for large hotel chains
- EN 13501-1: Euroclass for wall materials

### Testing Costs:
- Upholstered furniture: 18,000-30,000 SEK per type
- Wall materials: 45,000-60,000 SEK per type
- Timeline: 3-8 weeks

### Testing Labs:
- RISE Fire Research (Borås): ri.se
- SP Technical Research Institute (Stockholm)
```

#### B. Fire Safety Decision Flowchart (Critical - Source: Document 5, Appendix B3)
```
STEP 1: What AREA will furniture be placed?
├─ ESCAPE ROUTE (corridor, stairwell, lobby exit path)
│   └─ HIGHEST RISK → EN 1021-2 REQUIRED or B-s1,d0
├─ PUBLIC AREA (lobby seating, restaurant, conference)
│   └─ HIGH RISK → EN 1021-2 REQUIRED
├─ GUEST ROOM
│   └─ MEDIUM RISK → EN 1021-1 REQUIRED
└─ BACK-OF-HOUSE (staff areas, offices)
    └─ LOWER RISK → Standard commercial

STEP 2: What MATERIAL TYPE?
├─ NON-COMBUSTIBLE (metal, glass, stone)
│   └─ ✓ PROCEED (no flame testing needed)
├─ SOLID WOOD (thick hardwood)
│   └─ ✓ PROCEED (naturally fire-resistant)
├─ UPHOLSTERED FURNITURE
│   └─ → GO TO STEP 3
└─ ENGINEERED WOOD (chipboard, MDF, plywood)
    └─ → STEP 4

STEP 3: Does upholstered item have ORIGINAL fire certificate?
├─ YES (EN 1021 marked, certificate available)
│   ├─ Certificate valid (not expired)
│   │   └─ ✓ PROCEED
│   └─ Certificate expired/unknown
│       └─ → STEP 5
└─ NO (vintage, unknown origin)
    └─ → STEP 5

STEP 5: Fire Testing OR Treatment?
├─ OPTION A: TEST FIRST (leather/wool, large quantity)
│   └─ Submit to RISE/SP → IF PASS → PROCEED
│                        → IF FAIL → Treatment → Re-test
└─ OPTION B: TREAT FIRST (cotton/linen, certainty priority)
    └─ Fire retardant via Artex → Test → IF PASS → PROCEED
```

#### C. BVB Compliance Framework
```markdown
## BVB (ByggVarubedömningen) System

BVB is Sweden's construction product database managed by IVL Svenska Miljöinstitutet.

### The Problem for Reused Materials:
- BVB designed for NEW products with manufacturer documentation
- Reused items lack BVB ratings → default rejection by property owners

### BVB Equivalency Framework (Fyra Solution):

DOCUMENTATION REQUIRED:
1. Chemical Content Declaration
   - No SVHC substances per REACH Annex XVII
   - Heavy metals tested if painted (pre-2000)

2. Fire Safety Documentation
   - Test certificate OR treatment certificate
   - Specifies EN standard achieved

3. Structural Safety Assessment
   - Visual inspection report
   - Load testing if seating

4. Environmental Data
   - Simplified LCA calculation
   - Embodied carbon estimate

### Property Owner Approach:
Schedule dedicated meeting with property owner sustainability team
+ project coordinator BEFORE design finalized
```

---

### GAP 2.3: FRONTRUNNER HOTELS SECTION [PRIORITY #5-6 - MISSING]

**Impact:** Without documented case studies, Fyra lacks proof points for client pitches.

**Source Document:** `4__FRONTRUNNER_HOTELS_-_COMPLETE_EXTRACTION.docx` (141KB)

**Required Profiles (8 Hotels):**

#### 1. BLIQUE BY NOBIS - ★★★★★ (Swedish Flagship)
```markdown
Location: Stockholm, Sweden
Rooms: 249
Opening: 2019
Type: Design hotel (adaptive reuse of 1930s Lewerentz warehouse)

QUANTIFIED OUTCOMES:
- €8.6 MILLION materials reused
- 3,600 TONS CO₂ saved
- €120 MILLION savings vs demolition + new build
- €63/m² demolition waste avoidance

Certifications: LEED Gold, Nordic Swan

Key Team:
- Architect: Sweco (Ewa Buhr-Berg, Karin Hurtig)
- Circular Economy: Amanda Borneke (Sweco)
- Client: Nobis Hospitality Group

Contact: info@bliquebynobis.se
Website: bliquebynobis.se
```

#### 2. GREEN SOLUTION HOUSE - ★★★★★ (Danish Benchmark)
```markdown
Location: Bornholm, Denmark
Rooms: 59
Opening: 2015
Category: Conference/Sustainability showcase

QUANTIFIED OUTCOMES:
- 43% circular material content (HIGHEST documented)
- 17% direct reuse
- <5% waste to landfill
- CLIMATE-POSITIVE operation

Methodology: GXN Architects circular economy framework

Key Contacts:
- Hotel Director: Trine Richter
- Architect: Kasper Guldager Jensen (GXN/3XN)

IMMEDIATE FYRA ACTION: Contact for site visit, methodology study
```

#### 3. VILLA COPENHAGEN (Earth Suite)
```markdown
Location: Copenhagen, Denmark
Rooms: 390
Opening: 2020
Suite: "Earth Suite" - circular showcase room

Features:
- 70% upcycled materials
- Leftover textiles from production
- Waste-derived concrete floor
- Recycled plastic lighting
- End-of-life carpet tiles

Contact: info@villacopenhagen.com
```

#### 4. HOTEL SKEPPSHOLMEN (Heritage Model)
```markdown
Location: Skeppsholmen island, Stockholm
Rooms: ~80
Building: 1699 (Byggnadsminnesmärkt - listed monument)
Category: Boutique heritage

Circular Approach: Heritage preservation = automatic circularity
- Original 17th century structure retained
- Reversible contemporary interventions
- Antique and vintage furniture integration

Contact: Joachim Olausson (Managing Director)
Email: info@hotelskeppsholmen.se
Phone: +46 8-407 23 00
```

---

### GAP 2.4: SCENARIOS SECTION [EXISTS AS LANDING PAGE - NO CONTENT]

**Impact:** This section contains the most immediately actionable content but is empty.

**Source Documents:**
- `2__FYRA_B2B_OPERATOR_CAPABILITY_MATRIX.docx` (101KB)
- `6__STRATEGIC_IMPLEMENTATION_ROADMAP.docx` (152KB)

**Required Scenarios (4):**

#### SCENARIO 1: Urgent Replacement (2-4 Week Timeline)
```markdown
## QUALIFIED OPERATORS:
| Operator | Lead Time | Volume | Rating |
|----------|-----------|--------|--------|
| YLLW Factory | 2-4 weeks | HIGH | ★★★★★ |
| Input/Greenified | 2-4 weeks | HIGH | ★★★★☆ |
| Rekomo | 1-2 weeks | MEDIUM | ★★★☆☆ |

## CRITICAL SUCCESS FACTORS:
- Contact within 48 hours of need identification
- Accept "family of styles" vs perfect matching
- Budget 10-20% premium on rush orders
- Pre-approve condition grades (B-grade acceptable)

## FIRE CERTIFICATION GAP:
Rush timeline may not allow testing (3-8 weeks)
MITIGATION: Use items in guest rooms (lower requirements)
```

#### SCENARIO 2: Large Hotel Renovation (100-200 Rooms)
```markdown
## VOLUME CAPACITY REQUIREMENTS:
- 100+ matching items per category (chairs, desks, beds)
- Project management capability
- Phased delivery coordination

## RECOMMENDED STRATEGY:
PRIMARY: YLLW Factory (65,000 items, 30K chairs historically)
SECONDARY: Input/Greenified (enterprise scale, 1,000+ employees)

## CRITICAL GAP: HOTEL BEDS
No operator currently supplies refurbished hotel beds at scale
SOLUTION: Co-develop with YLLW Factory (see partnership roadmap)
```

#### SCENARIO 3: Fire-Critical Public Areas
```markdown
## THREE-TIER APPROACH:

### TIER 1 - Low-Risk (Minimal Testing):
- Metal/glass furniture (non-combustible)
- Solid hardwood furniture
- Stone/concrete décor
- Placement: Any area
- Testing: MSDS only

### TIER 2 - Medium-Risk (Strategic Testing):
- Reupholstered furniture (new fire-rated fabric)
- Case goods with minimal textile
- Placement: Restaurants, conference rooms
- Testing: Fabric certification

### TIER 3 - High-Risk (Full Testing):
- Unknown vintage upholstery
- Placement: Escape routes ONLY after testing
- Testing: Full EN 1021-2
- Cost: 18,000-30,000 SEK per type
```

#### SCENARIO 4: Finnish-Swedish Cross-Border
```markdown
## RECOMMENDED STRATEGY:
Primary: Input/Greenified (Nordic network logistics)
Specialist: Kompanjonen (Swedish regulatory navigation)

## PROCUREMENT SPLIT:
- Swedish-sourced (80-90%): Via Input/YLLW/Kompanjonen
- Finnish-imported (10-20%): Signature pieces

## KEY REGULATORY DIFFERENCES:
- Swedish BBR Chapter 5 (fire) STRICTER than Finnish building code
- All fire testing must use EN standards (valid EU-wide)
- BVB compliance required for Swedish property owners
```

---

## SECTION 3: B2B SUPPLIERS - ENHANCEMENT REQUIREMENTS

The current suppliers section needs enhancement from `1__COMPREHENSIVE_B2B_REUSE_OPERATORS.docx` (181KB).

### 3.1 Complete Operator Profiles Required

#### YLLW FACTORY (f.k.a. Soeco) - TIER 1 PRIMARY
```markdown
Company: YLLW Factory AB (formerly Soeco Kontorsmöbler AB)
Type: Aktiebolag (AB)
HQ: Dalby, Skåne, Sweden
Secondary: Jönköping warehouse
Sales Office: Stockholm

Website: https://www.yllw.com
Email: ola@yllw.com (CEO), sales@yllw.com
Phone: +46 (0)413-21 80 70

Key Contact: Ola Sjödin (CEO & Founder)
Employees: Not documented
Founded: Early 2000s era

INVENTORY:
- 65,000 items total
- 30,000 chairs processed historically
- 6,000m² refurbishment factory (Nordens största)

SERVICE TIERS:
├─ Basic (Grade B, minimal intervention)
├─ Standard (Grade A-, cleaning + minor repairs)
└─ Premium (Grade A, full refurbishment, custom finishes)

FIRE SAFETY: ★★★★★
- Pro2Type custom furniture line (fire-rated fabrics)
- In-house reupholstery capability
- Hotel delivery experience (fire compliance implied)

HOSPITALITY READINESS: ★★★★★
- Nobis Hotels (international group)
- Framework supplier agreements
- "Turnkey" project execution capability

CERTIFICATIONS:
- Kammarkollegiet framework supplier (Swedish government)
- CO₂ tracking per item

LOGISTICS:
- Nordic-wide delivery
- Installation services
- Phased delivery for live renovations

PRICING MODEL:
- 40-70% of new equivalent (typical)
- Framework agreements for volume

GAP: Hotel beds not currently offered
OPPORTUNITY: Co-develop hotel bed refurbishment line
```

#### INPUT INTERIÖR / GREENIFIED - TIER 1 SECONDARY
```markdown
Company: Input Interiör AB / Greenified (circular brand)
Type: Aktiebolag - "Scandinavia's largest independent interior solutions firm"
HQ: Stockholm, Sweden

Website: https://www.inputinterior.se | https://greenified.se
Email: info@inputinterior.se
Phone: +46 200 77 00 25

Employees: 1,000+
Showrooms: 41 nationwide

PRODUCT CATEGORIES:
✅ Office furniture (all categories)
✅ Hotel/Hospitality furniture
✅ Premium design brands (Fritz Hansen, Vitra, Herman Miller via Greenified)

SERVICE MODEL:
- Full-service dealer (new + reused)
- Greenified: Dedicated circular marketplace
- "Take-back" agreements with clients

FIRE SAFETY: ★★★★☆
- Professional compliance standards
- Tests for compliant clients
- Enterprise-level documentation

HOSPITALITY READINESS: ★★★★☆
- Regularly fits out hotels
- Corporate project experience
- E.ON 195-tonne circular project (enterprise scale proof)

LOGISTICS:
- Professional delivery infrastructure
- Multi-location coordination
- Enterprise project management
```

#### KOMPANJONEN - TIER 2 SPECIALIST
```markdown
Company: Kompanjonen
Type: Compliance consultant + sourcing specialist
Location: Sweden

Website: kompanjonen.com

ROLE: NOT a furniture supplier
- Regulatory navigation specialist
- Sourcing coordinator (finds items from multiple suppliers)
- Fire testing coordination
- BVB compliance documentation

IDEAL USE CASE:
- Embed as "Reuse Coordinator" on projects
- Interface with RISE/SP for testing
- BVB equivalency documentation
- Building permit support

HOURLY MODEL:
- Project fees (not inventory sales)
- €5,000-15,000 per project typical

FIRE SAFETY: ★★★★★ (Core competency)
HOSPITALITY: ★★★☆☆ (General construction focus)
```

---

## SECTION 4: SOURCE LIBRARY REQUIREMENTS

For Claude Web Mode functionality, the platform needs a structured source library.

### 4.1 Official Regulatory Sources
```json
{
  "regulatory_sources": [
    {
      "name": "BBR (Boverkets Byggregler)",
      "url": "https://www.boverket.se/sv/lag--ratt/forfattningssamling/gallande/bbr---bfs-20116/",
      "description": "Swedish Building Regulations - Chapter 5 Fire Safety critical",
      "language": "Swedish"
    },
    {
      "name": "BVB Database",
      "url": "https://byggvarubedomningen.se/",
      "description": "Construction product environmental assessment database",
      "managed_by": "IVL Svenska Miljöinstitutet"
    },
    {
      "name": "RISE Fire Research",
      "url": "https://www.ri.se/en/what-we-do/expertises/fire-research",
      "description": "Primary fire testing laboratory"
    },
    {
      "name": "SGBC",
      "url": "https://www.sgbc.se/",
      "description": "Sweden Green Building Council - certification training"
    },
    {
      "name": "Riksantikvarieämbetet",
      "url": "https://www.raa.se/",
      "description": "Swedish National Heritage Board - heritage building compliance"
    }
  ]
}
```

### 4.2 Key Contact Database
```json
{
  "priority_contacts": [
    {
      "name": "Ola Sjödin",
      "organization": "YLLW Factory",
      "role": "CEO & Founder",
      "email": "ola@yllw.com",
      "phone": "+46 (0)413-21 80 70",
      "priority": "P1-CRITICAL"
    },
    {
      "name": "Raimo Joss",
      "organization": "White Arkitekter",
      "role": "Lead Architect (Hospitality Sustainability)",
      "email": "raimo.joss@white.se",
      "phone": "+46 8 402 26 59",
      "priority": "P1-CRITICAL"
    },
    {
      "name": "Amanda Borneke",
      "organization": "Sweco",
      "role": "Circular Economy Specialist",
      "linkedin": "linkedin.com/in/amanda-borneke",
      "profile": "swecogroup.com/urban-insight/circularity/expert-insights-amanda-borneke",
      "priority": "P2"
    },
    {
      "name": "Trine Richter",
      "organization": "Green Solution House",
      "role": "Hotel Director",
      "priority": "P1-CRITICAL",
      "notes": "Request site visit, methodology study"
    },
    {
      "name": "Kasper Guldager Jensen",
      "organization": "GXN/3XN Architects",
      "role": "Circular Economy Methodology Developer",
      "priority": "P1-CRITICAL",
      "notes": "Green Solution House architect - study methodology"
    }
  ]
}
```

---

## SECTION 5: IMPLEMENTATION PRIORITY MATRIX

| Priority | Section | Status | Commit |
|----------|---------|--------|--------|
| **P1** | Consultants/Experts | ✅ DONE | `b32c0db` |
| **P2** | Scenarios (5 guides) | ✅ DONE | `b32c0db` |
| **P3** | Regulatory/Fire Safety | ✅ DONE | `b32c0db` |
| **P4** | Case Study Detail Pages | ✅ DONE | `34a0d6b` |
| **P4** | Supplier Detail Pages | ✅ DONE | `34a0d6b` |
| **P5** | Source Library (JSON) | ✅ DONE | `9e00c1a` |
| **P6** | Templates/Downloads | ✅ DONE | `145bfed` |
| - | JSON-LD Structured Data | ✅ DONE | `145bfed` |
| - | Search Functionality | 🔜 PENDING | - |

---

## SECTION 6: QUALITY REQUIREMENTS FOR CLAUDE WEB MODE

For the platform to function effectively as a knowledge source for Claude Web Mode queries:

### 6.1 Semantic Structure Requirements

```html
<!-- Every profile page should include structured data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "YLLW Factory",
  "url": "https://www.yllw.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dalby",
    "addressRegion": "Skåne",
    "addressCountry": "SE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+46-413-21-80-70",
    "email": "sales@yllw.com"
  }
}
</script>
```

### 6.2 Citation Requirements

Every data point must link to source:
```markdown
**€8.6 MILLION materials reused**
[Source: Sweco Case Study](https://swecogroup.com/urban-insight/circularity)

**Fire testing cost: 18,000-30,000 SEK**
[Source: RISE Fire Research price list](https://ri.se)
```

### 6.3 URL Structure for Semantic Queries

```
/suppliers/yllw-factory           → Full operator profile
/suppliers/yllw-factory/fire      → Fire safety capabilities
/suppliers/yllw-factory/contact   → Contact information

/regulatory/fire-safety           → Full guide
/regulatory/fire-safety/en-1021   → Specific standard
/regulatory/fire-safety/flowchart → Decision tool

/scenarios/large-hotel            → Scenario guide
/scenarios/large-hotel/operators  → Qualified operators for scenario
```

---

## SECTION 7: DOWNLOADABLE TEMPLATES (PDF Generation)

The platform should offer downloadable templates from source documents:

### 7.1 Templates to Create

| Template | Source | Format |
|----------|--------|--------|
| Material Passport | Doc 6, Appendix B2 | PDF/DOCX |
| BVB Equivalency Form | Doc 5, Section 4 | PDF/DOCX |
| Fire Testing Checklist | Doc 6, Appendix B3 | PDF |
| Supplier RFQ Template | Doc 6, Appendix B4 | DOCX |
| Quality Inspection Form | Doc 5, Section 4 | PDF |
| Circular Procurement Clauses | Doc 5, Section 4 | DOCX |

---

## SECTION 8: TESTING & VALIDATION

### 8.1 Content Validation Checklist

```markdown
For each supplier profile:
□ Company name correct
□ Contact information verified against source
□ Website URL functional
□ Email format valid
□ Phone number includes country code
□ Ratings justified by source evidence
□ Source citations included

For each regulatory section:
□ BBR chapter references accurate
□ EN standard numbers correct
□ Cost estimates include SEK amounts
□ Timeline estimates realistic
□ Source links to official documents

For each hotel case study:
□ Quantified outcomes verified
□ Contact information current
□ Project team credited
□ Source documentation linked
```

### 8.2 Claude Web Mode Testing

```markdown
Test queries the platform should answer:

1. "Who are the top B2B reuse operators in Sweden for hotel furniture?"
   → Should return YLLW Factory, Input/Greenified with contact details

2. "What fire safety standards apply to hotel lobby furniture in Sweden?"
   → Should return BBR Chapter 5, EN 1021-2, B-s1,d0 requirements

3. "How much did Blique by Nobis save through circular construction?"
   → Should return €8.6M materials, 3,600 tons CO2, €120M total

4. "Who should I contact at White Arkitekter for circular hospitality?"
   → Should return Raimo Joss, raimo.joss@white.se, +46 8 402 26 59
```

---

## SECTION 9: IMMEDIATE ACTION ITEMS

### Phase 1: Foundation (Week 1)
1. Create missing directory structure for new sections
2. Generate data files from project knowledge
3. Update navigation configuration

### Phase 2: Content Population (Week 1-2)
1. Generate all operator profile pages (Priority: YLLW Factory, Input/Greenified, Kompanjonen)
2. Generate all consultant profile pages (Priority: Forsen AB, Sweco, White Arkitekter)
3. Create regulatory guide pages (Priority: Fire Safety flowchart, BVB framework)
4. Populate scenarios with full content (All 4 scenarios)

### Phase 3: Enhancement (Week 2-3)
1. Add structured data (JSON-LD) to all pages
2. Create downloadable PDF templates
3. Add source citation links throughout
4. Implement search functionality
5. Add comparison tools (operator matrix, PM decision framework)

---

## APPENDIX A: SOURCE DOCUMENT MAPPING

| Section | Primary Source | Pages | Key Content |
|---------|---------------|-------|-------------|
| Suppliers Tier 1 | Doc 1 | 1-30 | YLLW, Input profiles |
| Suppliers Tier 2-3 | Doc 1 | 31-50 | Kompanjonen, Rekomo |
| Capability Matrix | Doc 2 | Full | Scenario-based recommendations |
| PM Consultants | Doc 3 | 1-25 | Forsen, Sweco, Hifab |
| Sustainability Consultants | Doc 3 | 26-40 | White, Piacon |
| Frontrunner Hotels | Doc 4 | Full | 8 hotel case studies |
| Fire Safety | Doc 5 | 1-20 | BBR Ch.5, flowcharts |
| BVB Compliance | Doc 5 | 21-35 | Equivalency framework |
| Templates | Doc 5 | 36-50 | Contract language, forms |
| Implementation Roadmap | Doc 6 | Full | Contact details, timelines |

---

## APPENDIX B: CRITICAL MISSING LINKS

These source URLs must be added to the platform:

| Name | URL | Context |
|------|-----|---------|
| Sweco C3 Calculator | cirkulärekonomi.se/c3 | ROI calculation tool |
| YLLW Factory | yllw.com | Primary supplier |
| Greenified | greenified.se | Input's circular platform |
| BVB Database | byggvarubedomningen.se | Product database |
| Blique by Nobis | bliquebynobis.se | Flagship case study |
| Green Solution House | greensolutionhouse.dk | 43% circular benchmark |

---

*This comprehensive analysis provides all necessary context, data structures, and implementation guidance to develop the Fyra Circular Platform into a fully functional knowledge hub for circular hospitality in the Swedish market.*
