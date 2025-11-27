# FYRA CIRCULAR PLATFORM - Prosjektinventar

**Dato:** 2025-11-27
**Versjon:** 2.0
**Status:** Fase 1 Komplett - Klar for Fase 2

---

## 1. DATAFILER (15 filer)

### Primære Datakilder (Beriket)
| Fil | Status | Datapunkter | Sist oppdatert |
|-----|--------|-------------|----------------|
| `consultants.json` | ✅ BERIKET | 11 konsulenter, 30+ kontakter, scoring | 2025-11-27 |
| `suppliers_enhanced.json` | ✅ BERIKET | 15 leverandører (+2 nye), hospitality tiers | 2025-11-27 |
| `caseStudies_clean.json` | ✅ BERIKET | 11 hoteller (+2 nye), tier/relevans scoring | 2025-11-27 |
| `certifications.json` | ✅ KOMPLETT | 8 sertifiseringer | - |

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
| ✅ Berike consultants.json | FERDIG - 11 konsulenter med kontakter |

### Gjenstående til 9/10
| Oppgave | Prioritet |
|---------|-----------|
| Verifisere kontaktinfo (email/telefon) | MEDIUM |
| Legge til BVB spec-maler | LAV |
| Rydde opp legacy/duplikat filer | LAV |

---

## 6. NESTE PROSESS - FASE 2

### 6.1 Databerikelse (Prioritet 1)

**suppliers_enhanced.json:**
- Legge til hospitality-nivåer fra PROMPT 2
- Legge til kontaktinfo
- Legge til volum-kapasitet
- Legge til branntest-kapabilitet

**caseStudies_clean.json:**
- Legge til dypere profiler fra PROMPT 6
- Legge til arkitekt/designer kontakter
- Legge til sirkulære tiltak (kvantifisert)
- Legge til Fyra relevance score

### 6.2 Kodeintegrering (Prioritet 2)

- Oppdatere Experts-side til å bruke ny scoring
- Legge til filter på hospitality-erfaring
- Vise kontaktinfo på kort
- Implementere sammenligning-funksjon

### 6.3 Kvalitetssikring (Prioritet 3)

- Verifisere alle email-adresser
- Sjekke at alle sourceRefs peker til gyldige kilder
- Teste alle lenker i templates

---

## 7. HANDOFF-SJEKKLISTE

For neste sesjon:

- [ ] Les dette dokumentet først
- [ ] Sjekk CRITICAL_ANALYSIS.md for bakgrunn
- [ ] Sjekk MIRO_DOCS_FINDINGS.md for ekstraherte data
- [ ] Start med suppliers_enhanced.json berikelse
- [ ] Deretter caseStudies_clean.json
- [ ] Til slutt frontend-oppdateringer

---

*Generert: 2025-11-27 | Fyra Circular Platform v2.0*
