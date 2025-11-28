# SPRINT 11: REGULATORY FACT-CHECK & SOURCE VERIFICATION SYSTEM

**Created:** 2025-11-28
**Status:** PLANNING
**Priority:** HIGH
**Scope:** Full Implementation (Option D)

---

## EXECUTIVE SUMMARY

Implement comprehensive regulatory source verification system with:
- Direct links to official regulatory documents
- PDF downloads where available
- Visible legal text excerpts
- Interactive UI components
- Fact-check verification badges

---

## PHASE OVERVIEW

| Phase | Description | Duration | Fail-Safe |
|-------|-------------|----------|-----------|
| **Phase 1** | Data Schema & Source Research | 1-2 sessions | Rollback: No UI changes |
| **Phase 2** | Data Enhancement | 1-2 sessions | Rollback: Revert JSON |
| **Phase 3** | Component Development | 2-3 sessions | Feature flag: disabled |
| **Phase 4** | Page Integration | 1-2 sessions | Incremental deployment |
| **Phase 5** | Testing & Polish | 1 session | Final QA before merge |

---

## PHASE 1: DATA SCHEMA & SOURCE RESEARCH

### 1.1 Official Regulatory Sources to Verify

#### Swedish Building Regulations (BBR)
| Document | Official Source | URL Type | Status |
|----------|----------------|----------|--------|
| BBR (Consolidated) | Boverket | PDF | [ ] Verify |
| BBR Chapter 5 (Fire) | Boverket | HTML/PDF | [ ] Verify |
| Verksamhetsklasser | Boverket PBL-kunskapsbanken | HTML | [ ] Verify |
| BFS 2011:6 (BBR amendments) | Boverket | PDF | [ ] Verify |

**Expected URLs:**
- `https://www.boverket.se/sv/lag--ratt/boverkets-forfattningssamling/bfs-i-nummerordning/`
- `https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/`

#### European Standards (Fire Testing)
| Standard | Source | Access | Status |
|----------|--------|--------|--------|
| EN 13501-1 (Euroclass) | SIS.se | Paid | [ ] Verify link |
| EN 1021-1 (Cigarette test) | SIS.se | Paid | [ ] Verify link |
| EN 1021-2 (Match test) | SIS.se | Paid | [ ] Verify link |
| BS 5852 (Crib test) | BSI | Paid | [ ] Verify link |

**Note:** Standards are copyrighted. Link to purchase page, not full text.

#### Swedish Procurement Law
| Document | Source | URL Type | Status |
|----------|--------|----------|--------|
| LOU 2016:1145 | Riksdagen | HTML/PDF | [ ] Verify |
| LOU amendments | Riksdagen | HTML | [ ] Verify |
| Upphandlingsmyndigheten guides | Upphandlingsmyndigheten | PDF | [ ] Verify |

**Expected URLs:**
- `https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20161145-om-offentlig-upphandling_sfs-2016-1145/`
- `https://www.upphandlingsmyndigheten.se/`

#### Certification Bodies
| Certification | Official Source | Document Type | Status |
|---------------|----------------|---------------|--------|
| Nordic Swan Hotels | Svanen.se | Criteria PDF | [ ] Verify |
| LEED | USGBC | Criteria (registration) | [ ] Verify |
| BREEAM | BRE | Manual (paid) | [ ] Verify |
| Miljöbyggnad | SGBC | Criteria PDF | [ ] Verify |
| Green Key | Green Key Global | Criteria | [ ] Verify |
| ISO 14001 | ISO | Standard (paid) | [ ] Verify |

#### Fire Testing Labs
| Lab | Website | Contact | Status |
|-----|---------|---------|--------|
| RISE | ri.se | [ ] Verify | [ ] |
| SP (now RISE) | sp.se → ri.se | [ ] Verify | [ ] |

### 1.2 New Data Schema

```typescript
// New: regulatory_sources.json schema
interface RegulatorySource {
  id: string;                    // Unique identifier
  name: string;                  // Full name
  nameNO?: string;               // Norwegian translation
  shortName: string;             // Abbreviation (BBR, LOU, etc.)

  // Classification
  type: 'law' | 'regulation' | 'standard' | 'guideline' | 'certification';
  jurisdiction: 'SE' | 'NO' | 'DK' | 'FI' | 'EU' | 'International';
  category: 'fire_safety' | 'building' | 'procurement' | 'environmental' | 'certification';

  // Official Sources
  officialUrl: string;           // Primary official URL
  pdfUrl?: string;               // Direct PDF link if available
  purchaseUrl?: string;          // For paid standards

  // Content
  description: string;           // Brief description
  keyExcerpts?: {                // Important text excerpts
    section: string;             // Section/article reference
    text: string;                // Actual text (short)
    relevance: string;           // Why this matters
  }[];

  // Verification
  verification: {
    lastChecked: string;         // ISO date
    checkedBy: 'automated' | 'manual';
    urlValid: boolean;
    notes?: string;
  };

  // Relationships
  relatedSources?: string[];     // IDs of related sources
  implementedBy?: string[];      // Which laws implement this

  // UI Metadata
  icon: string;                  // Lucide icon name
  color: string;                 // Tailwind color
}
```

### 1.3 Fail-Safe Checkpoints

- [ ] **Checkpoint 1A:** All URLs manually verified before adding to data
- [ ] **Checkpoint 1B:** Schema validated with TypeScript interface
- [ ] **Checkpoint 1C:** Backup of existing sources.json before modifications

---

## PHASE 2: DATA ENHANCEMENT

### 2.1 Files to Modify

| File | Changes | Backup |
|------|---------|--------|
| `data/regulatory_sources.json` | NEW FILE | N/A |
| `data/certifications.json` | Add officialDocs field | Yes |
| `data/fire_safety.json` | Add sourceLinks field | Yes |
| `data/public_procurement.json` | Add legalRefs field | Yes |
| `data/regulations_filtered.json` | Add sourceLinks field | Yes |
| `data/sources.json` | Add official URLs | Yes |

### 2.2 Enhancement Strategy

**Step 1: Create regulatory_sources.json**
New master file containing all verified regulatory sources.

**Step 2: Update certifications.json**
```json
{
  "id": "nordic-swan",
  "officialDocs": {
    "criteriaUrl": "https://www.svanen.se/...",
    "criteriaPdf": "https://www.svanen.se/.../criteria.pdf",
    "lastUpdated": "2024-03",
    "version": "v6.0"
  }
}
```

**Step 3: Update fire_safety.json**
```json
{
  "complianceFramework": {
    "regulations": [{
      "code": "BBR Chapter 5",
      "sourceLinks": {
        "officialUrl": "https://www.boverket.se/...",
        "pdfUrl": "https://www.boverket.se/.../bbr.pdf",
        "excerpt": {
          "section": "5:3",
          "text": "Verksamhetsklass 4 omfattar...",
          "lastVerified": "2025-11-28"
        }
      }
    }]
  }
}
```

### 2.3 Fail-Safe Checkpoints

- [ ] **Checkpoint 2A:** Create backup copies before each file modification
- [ ] **Checkpoint 2B:** Validate JSON syntax after each edit
- [ ] **Checkpoint 2C:** Build test after each major file change
- [ ] **Checkpoint 2D:** Git commit after each successful phase

---

## PHASE 3: COMPONENT DEVELOPMENT

### 3.1 New Components

#### Component: RegulatorySourceCard
```
Location: components/RegulatorySourceCard.tsx
Purpose: Display single regulatory source with links
Features:
- Official source link with external icon
- PDF download button (if available)
- Verification badge (last checked date)
- Expandable excerpt section
```

#### Component: LegalExcerpt
```
Location: components/LegalExcerpt.tsx
Purpose: Collapsible legal text display
Features:
- Section/article reference header
- Quoted legal text
- "Read full document" link
- Copy to clipboard
```

#### Component: SourceVerificationBadge
```
Location: components/SourceVerificationBadge.tsx
Purpose: Show verification status
Features:
- Green/yellow/red status
- Last verified date
- Tooltip with details
- Click to view source
```

#### Component: PDFDownloadButton
```
Location: components/PDFDownloadButton.tsx
Purpose: Consistent PDF download UI
Features:
- File size display (if available)
- External link icon
- Accessible naming
```

#### Component: RegulatoryQuickRef
```
Location: components/RegulatoryQuickRef.tsx
Purpose: Inline tooltip for regulatory references
Features:
- Hover to see summary
- Click to expand details
- Link to full source
```

### 3.2 Feature Flag Implementation

```typescript
// lib/features.ts
export const FEATURES = {
  REGULATORY_SOURCES: process.env.NEXT_PUBLIC_FEATURE_REGULATORY_SOURCES === 'true',
};

// Usage in components
if (FEATURES.REGULATORY_SOURCES) {
  return <RegulatorySourceCard source={source} />;
}
return <LegacySourceDisplay source={source} />;
```

### 3.3 Fail-Safe Checkpoints

- [ ] **Checkpoint 3A:** Each component has TypeScript types
- [ ] **Checkpoint 3B:** Each component works in isolation (Storybook-style test)
- [ ] **Checkpoint 3C:** Feature flag allows disable without code changes
- [ ] **Checkpoint 3D:** Build passes after each component

---

## PHASE 4: PAGE INTEGRATION

### 4.1 Pages to Update

| Page | Integration | Priority |
|------|-------------|----------|
| `/regulations` | Full regulatory source section | HIGH |
| `/certifications` | Official docs for each cert | HIGH |
| `/certifications/[id]` | (Future) Detail page | MEDIUM |
| `/specifications` | BVB reference links | MEDIUM |
| `/scenarios` | Regulatory pathway links | LOW |

### 4.2 Integration Strategy

**Step 1: Regulations Page**
- Add "Official Sources" section
- Each fire safety tier links to relevant BBR section
- Testing standards link to SIS/purchase pages
- LOU section links to riksdagen.se

**Step 2: Certifications Page**
- Each certification card gets "Official Criteria" button
- Expandable excerpt showing key requirements
- Verification badge on each card

**Step 3: Cross-Page Consistency**
- All regulatory references use RegulatoryQuickRef component
- Consistent styling across pages
- Same verification badge pattern

### 4.3 Fail-Safe Checkpoints

- [ ] **Checkpoint 4A:** One page at a time (commit after each)
- [ ] **Checkpoint 4B:** Mobile responsiveness verified
- [ ] **Checkpoint 4C:** All external links open in new tab
- [ ] **Checkpoint 4D:** Build and deploy test after each page

---

## PHASE 5: TESTING & POLISH

### 5.1 Testing Checklist

**Functional Testing:**
- [ ] All external links work (200 status)
- [ ] PDF links download correctly
- [ ] Verification badges display correctly
- [ ] Expandable sections work
- [ ] Mobile layout correct
- [ ] Accessibility (screen reader, keyboard nav)

**Data Validation:**
- [ ] All URLs verified against official sources
- [ ] All excerpts are accurate quotes
- [ ] All dates are correct
- [ ] No broken references

**Performance:**
- [ ] Page load time acceptable
- [ ] No layout shift from async loading
- [ ] Images optimized

### 5.2 Documentation Updates

- [ ] Update README.md with new features
- [ ] Update PROGRESS.md with Sprint 11
- [ ] Update PROJECT_INVENTORY.md
- [ ] Create user guide section

### 5.3 Final Fail-Safe

- [ ] **Checkpoint 5A:** Full regression test
- [ ] **Checkpoint 5B:** Stakeholder review
- [ ] **Checkpoint 5C:** Git tag for release
- [ ] **Checkpoint 5D:** Deploy to production

---

## ROLLBACK PROCEDURES

### If Phase 1 Fails
- No code changes made
- Delete draft regulatory_sources.json
- Continue with existing system

### If Phase 2 Fails
- Restore JSON files from backup
- `git checkout -- data/*.json`
- Build and verify

### If Phase 3 Fails
- Set feature flag to false
- Components exist but aren't rendered
- No user-visible changes

### If Phase 4 Fails
- Revert page changes: `git checkout -- app/*/page.tsx`
- Feature flag remains false
- Build and verify

### If Phase 5 Fails (post-deploy)
- Immediate: Set feature flag to false
- Fix issues in development
- Re-enable when fixed

---

## OFFICIAL SOURCE URLS (TO VERIFY)

### Swedish Building Regulations
```
BBR Consolidated:
https://www.boverket.se/globalassets/publikationer/dokument/2020/konsoliderad-bbr-2011-6-tom-2020-4.pdf

Verksamhetsklasser:
https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/dimensionerande-forutsattningar/verksamhetsklasser/

Fire Safety Overview:
https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/
```

### Swedish Law
```
LOU 2016:1145:
https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20161145-om-offentlig-upphandling_sfs-2016-1145/

Plan- och bygglagen (PBL):
https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/plan--och-bygglag-2010900_sfs-2010-900/
```

### European Standards (Purchase Links)
```
EN 13501-1:
https://www.sis.se/produkter/byggmaterial-och-byggnader/skydd-mot-brand/brandklassificering/ss-en-135011/

EN 1021-1:
https://www.sis.se/produkter/soffmobel-madrasser/ss-en-10211/

EN 1021-2:
https://www.sis.se/produkter/soffmobel-madrasser/ss-en-10212/
```

### Certification Bodies
```
Nordic Swan Hotels Criteria:
https://www.svanen.se/kriterier/hotell-restaurang-och-konferens/

LEED:
https://www.usgbc.org/leed

BREEAM:
https://www.breeam.com/

Miljöbyggnad:
https://www.sgbc.se/certifiering/miljobyggnad/
```

### Fire Testing
```
RISE Fire Research:
https://www.ri.se/sv/expertiser/brand-och-raddning

MSB Fire Safety:
https://www.msb.se/sv/amnesomraden/skydd-mot-olyckor-och-farliga-amnen/brandskydd/
```

---

## IMPLEMENTATION TIMELINE

| Session | Phase | Deliverable | Checkpoint |
|---------|-------|-------------|------------|
| 1 | Phase 1 | Verified URLs, schema defined | 1A-1C |
| 2 | Phase 2 | regulatory_sources.json, updated data files | 2A-2D |
| 3 | Phase 3a | RegulatorySourceCard, LegalExcerpt components | 3A-3B |
| 4 | Phase 3b | SourceVerificationBadge, feature flag | 3C-3D |
| 5 | Phase 4a | /regulations page integration | 4A-4B |
| 6 | Phase 4b | /certifications page integration | 4C-4D |
| 7 | Phase 5 | Testing, polish, documentation | 5A-5D |

---

## SUCCESS CRITERIA

1. **Accessibility:** All regulatory sources one click away
2. **Verifiability:** Each claim has traceable source
3. **Currency:** Verification dates visible to users
4. **Usability:** Non-technical users can find official docs
5. **Maintainability:** Easy to update when regulations change

---

*Plan created: 2025-11-28 | Sprint 11 | Fyra Circular Platform*
