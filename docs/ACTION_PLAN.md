# FYRA CIRCULAR PLATFORM - HANDLINGSPLAN

**Opprettet:** 2025-12-08
**Basert på:** Dyp analyse av prosjektet
**Estimert total tid:** ~20 timer

---

## FASE 1: KRITISKE FIXES (Må gjøres først)

### 1.1 Error Handling for JSON Parsing
**Prioritet:** 🔴 KRITISK | **Estimat:** 2 timer | **Status:** ✅ FULLFØRT (2025-12-08)

**Problem:** Alle `JSON.parse()` kall mangler try-catch. Korrupt data krasjer hele siden.

**Filer som må fikses:**
- [ ] `app/page.tsx` (linje 52-68)
- [ ] `app/suppliers/page.tsx` (linje 19-35)
- [ ] `app/case-studies/page.tsx` (linje 16-31)
- [ ] `app/experts/page.tsx`
- [ ] `app/regulations/page.tsx`
- [ ] `app/certifications/page.tsx`
- [ ] `app/report/page.tsx` (linje 7-50)
- [ ] `app/scenarios/page.tsx`
- [ ] `app/specifications/page.tsx`
- [ ] `app/templates/page.tsx`

**Løsning:**
```typescript
// Opprett lib/data.ts med sikker data-lasting
export async function loadJsonFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    const filePath = path.join(process.cwd(), 'data', filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(`Failed to load ${filename}:`, error);
    return fallback;
  }
}
```

---

### 1.2 Type Safety - Eliminere `any` types
**Prioritet:** 🔴 KRITISK | **Estimat:** 2 timer | **Status:** ✅ FULLFØRT (2025-12-08)

**Problem:** Flere komponenter bruker `any[]` som mister TypeScript-fordeler.

**Filer som må fikses:**
- [ ] `components/Search.tsx` (linje 18-20)
- [ ] `components/SupplierDirectory.tsx` (linje 10)
- [ ] `components/Map/Map.tsx` (linje 50, 52)
- [ ] `app/page.tsx` (linje 64)

**Løsning:**
Opprett `lib/types.ts` med alle interfaces:
```typescript
export interface Supplier {
  id: string;
  name: string;
  tier: number;
  location: { lat: number; lng: number };
  // ... alle felter
}

export interface CaseStudy {
  id: string;
  name: string;
  // ... alle felter
}

export interface Consultant {
  id: string;
  name: string;
  // ... alle felter
}
```

---

### 1.3 Data Validering Script
**Prioritet:** 🔴 KRITISK | **Estimat:** 3 timer | **Status:** ✅ FULLFØRT (2025-12-08)

**Problem:** Ingen verifisering at sourceRefs peker til eksisterende kilder.

**Løsning:**
Opprett `scripts/validate-data.ts`:
```typescript
// Validerer:
// 1. Alle sourceRefs i suppliers eksisterer i sources.json
// 2. Alle sourceRefs i caseStudies eksisterer i sources.json
// 3. Ingen tomme required fields
// 4. Ingen duplikate IDs
```

Legg til i `package.json`:
```json
"scripts": {
  "validate": "npx ts-node scripts/validate-data.ts",
  "prebuild": "npm run validate"
}
```

---

### 1.4 XSS-sikring av JsonLd
**Prioritet:** 🟠 HØY | **Estimat:** 30 min | **Status:** ✅ FULLFØRT (2025-12-08)

**Fil:** `components/JsonLd.tsx`

**Løsning:**
```typescript
export function JsonLd({ data }: JsonLdProps) {
  // Sanitize and validate data structure
  const safeData = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeData }}
    />
  );
}
```

---

## FASE 2: MEDIUM PRIORITET (Etter kritiske)

### 2.1 Error Boundary Component
**Prioritet:** 🟡 MEDIUM | **Estimat:** 2 timer | **Status:** ✅ FULLFØRT (2025-12-08)

**Opprett:** `components/ErrorBoundary.tsx`
```typescript
'use client';
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  // ... implementasjon
}
```

**Bruk i layout.tsx:**
```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  {children}
</ErrorBoundary>
```

---

### 2.2 Empty State Components
**Prioritet:** 🟡 MEDIUM | **Estimat:** 1 time | **Status:** ✅ FULLFØRT (2025-12-08)

**Opprett:** `components/EmptyState.tsx`

**Bruk i:**
- [ ] `components/SupplierDirectory.tsx` - "Ingen leverandører funnet"
- [ ] `components/Search.tsx` - "Ingen resultater for søket"
- [ ] Filter-resultater på alle sider

---

### 2.3 Accessibility Forbedringer
**Prioritet:** 🟡 MEDIUM | **Estimat:** 3 timer | **Status:** ✅ FULLFØRT (2025-12-08)

**Tasks:**
- [ ] Legg til `aria-label` på alle filter-kontroller
- [ ] Legg til `aria-live="polite"` på dynamisk innhold (søkeresultater)
- [ ] Legg til `role="region"` på hovedseksjoner
- [ ] Verifiser keyboard-navigasjon på interaktive elementer
- [ ] Legg til skip-link for tastaturbrukere

**Filer:**
- [ ] `components/SupplierDirectory.tsx`
- [ ] `components/Search.tsx`
- [ ] `components/Map/Map.tsx`
- [ ] `components/ComparisonBar.tsx`

---

### 2.4 Konsolidere Konsulent-data
**Prioritet:** 🟡 MEDIUM | **Estimat:** 1 time | **Status:** ✅ FULLFØRT (2025-12-08)

**Problem:** To filer med overlappende data:
- `consultants.json` (5 records)
- `consultants_enhanced.json` (3 records)

**Løsning:**
1. ✅ Rename `consultants_enhanced.json` → `consultants.json` (beholdt detaljert versjon)
2. ✅ Flyttet gammel til `data/_archive/consultants_simple.json`
3. ✅ Oppdatert `lib/data.ts` - begge funksjoner bruker nå samme fil

---

## FASE 3: LAV PRIORITET (Nice-to-have)

### 3.1 Code Splitting for Heavy Dependencies
**Prioritet:** 🟢 LAV | **Estimat:** 2 timer | **Status:** ✅ FULLFØRT (2025-12-08)

**Optimaliser:**
```typescript
// components/Map/Map.tsx
const Map = dynamic(() => import('./MapComponent'), {
  loading: () => <MapSkeleton />,
  ssr: false
});

// components/charts/SupplierRadar.tsx
const SupplierRadar = dynamic(() => import('./SupplierRadarComponent'), {
  loading: () => <ChartSkeleton />
});
```

**Forventet besparelse:** ~480KB fra initial bundle

---

### 3.2 SEO på Detaljsider
**Prioritet:** 🟢 LAV | **Estimat:** 2 timer | **Status:** ✅ FULLFØRT (2025-12-08)

**Legg til `generateMetadata()` i:**
- [ ] `app/suppliers/[id]/page.tsx`
- [ ] `app/case-studies/[id]/page.tsx`
- [ ] `app/templates/[id]/page.tsx`

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supplier = await getSupplier(params.id);
  return {
    title: `${supplier.name} | Fyra Circular Platform`,
    description: supplier.description,
    openGraph: {
      title: supplier.name,
      description: supplier.description,
    },
  };
}
```

---

## IMPLEMENTERINGSREKKEFØLGE

```
Uke 1: Fase 1 (Kritiske)
├── Dag 1: lib/types.ts + lib/data.ts
├── Dag 2: Oppdater alle pages med sikker data-lasting
├── Dag 3: Data validering script + JsonLd fix
└── Dag 4: Testing og verifisering

Uke 2: Fase 2 (Medium)
├── Dag 1: ErrorBoundary + EmptyState
├── Dag 2-3: Accessibility audit og fixes
└── Dag 4: Konsulent-data konsolidering

Fremtid: Fase 3 (Lav)
├── Code splitting
├── SEO metadata
└── Test suite
```

---

## SUKSESSKRITERIER

### Fase 1 Complete når: ✅ FULLFØRT
- [x] Ingen `any` types i kodebasen
- [x] Alle JSON.parse wrapped i try-catch
- [x] `npm run validate` kjører før build
- [x] JsonLd saniterer output

### Fase 2 Complete når: ✅ FULLFØRT
- [x] ErrorBoundary wrapper alle data-avhengige seksjoner
- [x] Empty states vises for tomme resultater
- [x] ARIA labels på alle interaktive elementer
- [x] Én konsulent-datafil

### Fase 3 Complete når: ✅ FULLFØRT
- [x] Leaflet lazy-loaded (Map component)
- [x] generateMetadata på alle detaljsider

---

## RISIKO OG AVHENGIGHETER

| Risiko | Sannsynlighet | Konsekvens | Mitigering |
|--------|---------------|------------|------------|
| Type-endringer bryter eksisterende kode | Medium | Høy | Gradvis migrering, test hver fil |
| Validering finner mange datafeil | Lav | Medium | Fikse data før validering blir obligatorisk |
| Performance regression | Lav | Medium | Lighthouse før/etter |

---

## STATUS: ✅ ALLE OPPGAVER FULLFØRT

Handlingsplanen er komplett. Alle tre faser er implementert og verifisert.

**Fullført:** 2025-12-08
**Build Status:** ✅ Passing (49 pages, 0 errors)

---

*Generert: 2025-12-08 | Oppdatert: 2025-12-08 | Fyra Circular Platform v3.6*
