# FYRA CIRCULAR PLATFORM - Prosjektinventar

**Dato:** 2025-11-27
**Versjon:** 2.1
**Status:** Design Refresh Komplett - Live på GitHub Pages

---

## 1. DATAFILER (15 filer)

### Primære Datakilder (Beriket)
| Fil | Status | Datapunkter | Sist oppdatert |
|-----|--------|-------------|----------------|
| `consultants.json` | ⚠️ REVERTERT | 5 konsulenter (original data) | 2025-11-27 |
| `suppliers_enhanced.json` | ✅ BERIKET | 15 leverandører (+2 nye), hospitality tiers | 2025-11-27 |
| `caseStudies_clean.json` | ✅ BERIKET | 11 hoteller (+2 nye), tier/relevans scoring | 2025-11-27 |
| `certifications.json` | ✅ KOMPLETT | 8 sertifiseringer | - |

**MERKNAD:** consultants.json ble revertert pga. inkompatibilitet med ConsultantCard.tsx.
Berikede data er tilgjengelige i `/docs/MIRO_DOCS_FINDINGS.md` for fremtidig implementering.

### Sekundære Datakilder
| Fil | Status | Innhold |
|-----|--------|---------|
| `regulations_filtered.json` | ✅ OK | Regulatory framework |
| `fire_safety.json` | ✅ OK | Brannkrav & testlabber |
| `specifications.json` | ✅ OK | BVB spesifikasjoner |
| `templates.json` | ✅ OK | 6 downloadable maler |
| `sources.json` | ✅ OK | 106 verifiserte kilder |

### Filbruk Kartlagt
| Fil | Status | Brukes av |
|-----|--------|-----------|
| `consultants_enhanced.json` | ✅ AKTIV | `/experts` - Tier 1 konsulenter |
| `consultants.json` | ✅ AKTIV | `/experts` - Spesialister (tier='Specialist') |
| `caseStudies.json` | ⚠️ LEGACY | IKKE brukt - kan slettes |
| `regulations.json` | ⚠️ SJEKK | Trolig legacy |
| `scenarios.json` | ℹ️ REFERANSE | Kan beholdes |
| `implementation.json` | ℹ️ REFERANSE | Kan beholdes |
| `fyra-profile.json` | ℹ️ REFERANSE | Kan beholdes |

---

## 2. DOKUMENTASJON (5 filer)

| Fil | Formål | Status |
|-----|--------|--------|
| `CRITICAL_ANALYSIS.md` | Kvalitetsanalyse & gap-vurdering | ✅ OPPDATERT |
| `MIRO_DOCS_FINDINGS.md` | Sammendrag av MIRO research | ✅ NY |
| `IMPLEMENTATION_PLAN.md` | Implementeringsplan | ✅ OK |
| `PROGRESS.md` | Fremdriftslogg | ✅ OK |
| `DATA_COVERAGE_REPORT.md` | Datadekningsrapport | ✅ OK |
| `PROJECT_INVENTORY.md` | Dette dokumentet | ✅ NY |

---

## 3. APPLIKASJONSFILER (13 sider)

### Hovedsider
| Side | Route | Datafil |
|------|-------|---------|
| Home/Suppliers | `/` | suppliers_enhanced.json |
| Experts | `/experts` | consultants.json |
| Case Studies | `/case-studies` | caseStudies_clean.json |
| Regulations | `/regulations` | regulations_filtered.json |
| Certifications | `/certifications` | certifications.json |
| Specifications | `/specifications` | specifications.json |
| About | `/about` | - |

### Detaljsider
| Side | Route | Datafil |
|------|-------|---------|
| Supplier Detail | `/suppliers/[id]` | suppliers_enhanced.json |
| Case Study Detail | `/case-studies/[id]` | caseStudies_clean.json |
| Template Detail | `/templates/[id]` | templates.json |

### Utility-sider
| Side | Route |
|------|-------|
| Templates List | `/templates` |
| Scenarios | `/scenarios` |

---

## 4. KILDEMATERIALE (MIRO DOCS)

### Gjennomgått materiale
| PROMPT | Tema | Hovedfil | Status |
|--------|------|----------|--------|
| 1 | Konsulenter/PM | ChatGPT + Gemini | ✅ LEST |
| 2 | Leverandører | ChatGPT + Perplexity | ✅ LEST |
| 3 | Regulatory | ChatGPT | ✅ LEST |
| 4 | BVB | ChatGPT | ✅ LEST |
| 5 | Sertifiseringer | ChatGPT | ✅ LEST |
| 6 | Case Studies | ChatGPT | ✅ LEST |

### Ikke-prosessert materiale
- Citations-filer (for store, krever manuell gjennomgang)
- Noen Perplexity/Gemini outputs (delvis lest)

---

## 5. KVALITETSSTATUS

### Nåværende vurdering (Post Fase 2)
```
Datakvalitet:      8/10  (+2 fra baseline)
Actionability:     8/10  (+2 fra baseline)
Completeness:      8/10  (+3 fra baseline)
Verification:      8/10  (uendret)
────────────────────────
TOTALT:            8.0/10
```

### Fullført (2025-11-27)
| Oppgave | Status |
|---------|--------|
| ✅ Berike suppliers_enhanced.json | FERDIG - 15 leverandører med hospitality tiers |
| ✅ Berike caseStudies_clean.json | FERDIG - 11 cases med Fyra relevans scores |
| ⚠️ Berike consultants.json | REVERTERT - Build-feil, data i MIRO_DOCS_FINDINGS.md |
| ✅ Deploy til GitHub Pages | FERDIG - https://justaride.github.io/fyra-web-2.0/ |

### Gjenstående til 9/10
| Oppgave | Prioritet |
|---------|-----------|
| Oppdatere ConsultantCard.tsx for contacts-array | HØY |
| Integrere berikede konsulentdata | HØY |
| Verifisere kontaktinfo (email/telefon) | MEDIUM |
| Rydde opp legacy/duplikat filer | LAV |

---

## 6. NESTE PROSESS - FASE 3

### 6.1 Frontend-oppdatering (Prioritet 1)

**ConsultantCard.tsx oppdatering:**
- Endre fra `contact` (objekt) til `contacts` (array)
- Støtte visning av flere kontakter per konsulent
- Legge til scoring-visning

**Etter komponent-oppdatering:**
- Integrere berikede konsulentdata fra MIRO_DOCS_FINDINGS.md
- Oppdatere consultants.json med 11 konsulenter

### 6.2 Kvalitetssikring (Prioritet 2)

- Verifisere alle email-adresser
- Sjekke at alle sourceRefs peker til gyldige kilder
- Teste alle lenker i templates

### 6.3 Fremtidige forbedringer

- Søkefunksjonalitet på tvers av alt innhold
- Leverandør-sammenligningsverktøy
- Prosjektkostnadskalkulator

---

## 7. HANDOFF-SJEKKLISTE

For neste sesjon:

- [x] Les dette dokumentet først
- [x] Sjekk CRITICAL_ANALYSIS.md for bakgrunn
- [x] Sjekk MIRO_DOCS_FINDINGS.md for ekstraherte data
- [x] Berike suppliers_enhanced.json ✅ FERDIG
- [x] Berike caseStudies_clean.json ✅ FERDIG
- [ ] Oppdatere ConsultantCard.tsx for contacts-støtte
- [ ] Integrere berikede konsulentdata

---

*Generert: 2025-11-27 | Fyra Circular Platform v2.0*
