# VISUALIZATION IMPLEMENTATION WORKPLAN

**Created:** 2025-11-28
**Status:** Ready for Implementation
**Scope:** Visualization features + Data verification system

---

## OVERVIEW

This workplan outlines the implementation of data visualizations and ensures all displayed data is traceable to verified sources.

### Goals
1. Implement 10 high-impact visualizations across the platform
2. Ensure every data point is linked to verifiable sources
3. Create reusable chart components for future expansion
4. Maintain print-friendliness for the `/report` page

---

## PHASE 0: FOUNDATION SETUP

### Task 0.1: Install Dependencies
```bash
npm install recharts
npm install --save-dev @types/recharts
```

### Task 0.2: Create Chart Component Structure
```
components/
├── charts/
│   ├── index.ts                 # Re-exports all charts
│   ├── SupplierRadar.tsx        # Capability radar chart
│   ├── CostTimelineScatter.tsx  # Fire safety costs
│   ├── EnforcementHeatmap.tsx   # Regulation enforcement
│   ├── CaseStudyTimeline.tsx    # Project timeline
│   ├── ServiceMatrix.tsx        # Service coverage
│   └── B2BDashboard.tsx         # B2B readiness charts
└── shared/
    ├── ChartWrapper.tsx         # Print-friendly wrapper
    └── ChartTooltip.tsx         # Consistent tooltips
```

### Task 0.3: Create Chart Wrapper Component
```tsx
// components/shared/ChartWrapper.tsx
'use client';

interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  sourceRef?: string;  // Link to source for verification
  children: React.ReactNode;
}

export function ChartWrapper({ title, subtitle, sourceRef, children }: ChartWrapperProps) {
  return (
    <div className="bg-white rounded-xl border p-6 print:break-inside-avoid">
      <div className="mb-4">
        <h3 className="font-bold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      <div className="min-h-[300px]">
        {children}
      </div>
      {sourceRef && (
        <p className="text-xs text-slate-400 mt-4">
          Source: <a href={`#source-${sourceRef}`} className="underline">{sourceRef}</a>
        </p>
      )}
    </div>
  );
}
```

---

## PHASE 1: QUICK WINS (Sprint 9)

### 1.1 Supplier Capability Radar Chart

**Location:** `/suppliers/[id]` detail page

**Data Transformation:**
```typescript
interface RadarData {
  axis: string;
  value: number;  // 0-100 scale
  fullMark: 100;
}

function transformSupplierToRadar(supplier: Supplier): RadarData[] {
  return [
    {
      axis: 'Volume Capacity',
      value: supplier.b2bReadiness?.volumeCapacity === 'enterprise' ? 100 :
             supplier.b2bReadiness?.volumeCapacity === 'medium' ? 66 : 33,
      fullMark: 100
    },
    {
      axis: 'Lead Time',
      value: parseLeadTime(supplier.b2bReadiness?.leadTimeStock), // Inverse: faster = higher
      fullMark: 100
    },
    {
      axis: 'Hospitality Tier',
      value: supplier.hospitalityReadiness?.tier === 'Tier 1' ? 100 :
             supplier.hospitalityReadiness?.tier === 'Tier 2' ? 66 : 33,
      fullMark: 100
    },
    {
      axis: 'Nordic Reach',
      value: supplier.nordicReach ? 100 : 50,
      fullMark: 100
    },
    {
      axis: 'Service Breadth',
      value: Math.min((supplier.services?.length || 0) * 10, 100),
      fullMark: 100
    },
    {
      axis: 'Fire Safety',
      value: hasFireSafetyCapability(supplier) ? 100 : 30,
      fullMark: 100
    }
  ];
}
```

**Data Verification:**
- Each supplier has `sourceRefs` array pointing to sources.json entries
- Display source count on radar: "Based on X verified sources"
- Link to sources section on detail page

**Component:**
```tsx
// components/charts/SupplierRadar.tsx
'use client';

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export function SupplierRadar({ supplier }: { supplier: Supplier }) {
  const data = transformSupplierToRadar(supplier);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
        <Radar
          name={supplier.name}
          dataKey="value"
          stroke="#0d9488"
          fill="#0d9488"
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
```

---

### 1.2 Fire Safety Cost-Timeline Scatter

**Location:** `/regulations` page

**Data Source:** `fire_safety.json`

**Verification:**
- Each tier has `sourceRefs` pointing to BBR, EN standards
- Display: "Costs based on RISE/SP testing lab estimates"

**Component:**
```tsx
// components/charts/CostTimelineScatter.tsx
'use client';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const TIER_COLORS = {
  1: '#10b981', // emerald
  2: '#f59e0b', // amber
  3: '#ef4444'  // red
};

export function CostTimelineScatter({ tiers }: { tiers: FireSafetyTier[] }) {
  const data = tiers.map(tier => ({
    name: tier.name,
    tier: tier.tier,
    timeline: parseTimeline(tier.timeline), // weeks as number
    cost: parseCost(tier.costRange),         // midpoint in SEK
    costRange: tier.costRange,
    timelineText: tier.timeline
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timeline"
          name="Timeline"
          unit=" weeks"
          label={{ value: 'Timeline (weeks)', position: 'bottom' }}
        />
        <YAxis
          dataKey="cost"
          name="Cost"
          unit=" SEK"
          tickFormatter={(v) => `${v/1000}k`}
          label={{ value: 'Cost (SEK)', angle: -90, position: 'left' }}
        />
        <Tooltip
          content={({ payload }) => {
            if (!payload?.[0]) return null;
            const d = payload[0].payload;
            return (
              <div className="bg-white p-3 rounded shadow border">
                <p className="font-bold">{d.name}</p>
                <p className="text-sm">Timeline: {d.timelineText}</p>
                <p className="text-sm">Cost: {d.costRange}</p>
              </div>
            );
          }}
        />
        <Scatter data={data}>
          {data.map((entry, index) => (
            <Cell key={index} fill={TIER_COLORS[entry.tier]} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
```

---

### 1.3 Enforcement Level Heatmap

**Location:** `/regulations` page

**Data Source:** `regulatory_practice.json`

**Component:**
```tsx
// components/charts/EnforcementHeatmap.tsx
'use client';

const LEVELS = {
  high: { color: '#ef4444', label: 'HIGH' },
  medium: { color: '#f59e0b', label: 'MED' },
  low: { color: '#10b981', label: 'LOW' },
  future: { color: '#6b7280', label: 'FUTURE' }
};

interface EnforcementData {
  category: string;
  enforcementLevel: 'high' | 'medium' | 'low' | 'future';
}

export function EnforcementHeatmap({ data }: { data: EnforcementData[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-100">
            <th className="text-left p-3">Category</th>
            <th className="text-center p-3">Enforcement Level</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-b">
              <td className="p-3">{item.category}</td>
              <td className="p-3 text-center">
                <span
                  className="px-3 py-1 rounded text-white text-xs font-bold"
                  style={{ backgroundColor: LEVELS[item.enforcementLevel].color }}
                >
                  {LEVELS[item.enforcementLevel].label}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## PHASE 2: MEDIUM EFFORT (Sprint 10)

### 2.1 Case Study Timeline

**Location:** `/case-studies` page

**Data Transformation Required:**
```typescript
// Parse year strings like "2019-2021" to single year
function parseYear(yearStr: string): number {
  const match = yearStr.match(/(\d{4})/);
  if (match) return parseInt(match[1]);
  return 2020; // fallback
}

// Parse room counts like "358 rooms total (124 + 234)"
function parseRooms(sizeStr: string): number {
  const match = sizeStr.match(/(\d+)\s*rooms/i);
  if (match) return parseInt(match[1]);
  return 100; // fallback
}
```

**Verification:**
- Each case study has `sourceRefs` array
- Display verified source count per project
- Link "See sources" to bottom of page

---

### 2.2 Service Coverage Matrix

**Location:** `/suppliers` page

**Data Processing:**
```typescript
// Standardize service names across suppliers
const SERVICE_CATEGORIES = [
  'Refurbishment',
  'Buy-back/Trade-in',
  'Fire Testing Coordination',
  'Logistics & Installation',
  'Warranty',
  'CO2 Documentation',
  'Rental Options',
  'Project Management'
];

function hasService(supplier: Supplier, category: string): boolean {
  const services = supplier.services || [];
  // Fuzzy match service category
  return services.some(s =>
    s.toLowerCase().includes(category.toLowerCase().split('/')[0])
  );
}
```

---

### 2.3 B2B Readiness Dashboard

**Location:** `/suppliers` page (new section)

**Charts:**
1. **Volume Distribution** - Pie chart of enterprise/medium/small
2. **Lead Time Comparison** - Horizontal bar chart
3. **Feature Coverage** - Stacked bar showing % with each B2B feature

---

## PHASE 3: HIGHER EFFORT (Sprint 11+)

### 3.1 Interactive Fire Safety Decision Tree

**Library:** `react-flow` or custom SVG

**Structure:**
```
[Start: What furniture?]
    |
    ├── Metal/Glass → [Tier 1] → "No testing needed"
    |
    ├── Reupholstered → [Tier 2] → "EN 1021 test"
    |                            → [Cost: 18-30k]
    |                            → [Time: 8-12 weeks]
    |
    └── Fully Upholstered → [Tier 3] → "BS 5852 Crib 5"
                                     → [Cost: 60-150k]
                                     → [Time: 14-20 weeks]
```

### 3.2 Map Choropleth Enhancement

**Extension of existing Leaflet map**
- Add GeoJSON boundaries for Nordic regions
- Color intensity based on supplier count per region
- Legend showing density scale

---

## DATA VERIFICATION SYSTEM

### Current System
```
suppliers_enhanced.json
├── sourceRefs: ["yllw_website", "rise_fire_research"]
│
└── sources.json
    ├── id: "yllw_website"
    ├── url: "https://www.yllw.com"
    ├── verifies: ["yllw_factory"]
    └── keyFacts: [...]
```

### Verification Requirements for Visualizations

| Visualization | Data Points | Verification Method |
|--------------|-------------|---------------------|
| Supplier Radar | 6 axes × 13 suppliers | sourceRefs per supplier |
| Cost-Timeline | 3 tiers | fire_safety.json sourceRefs |
| Enforcement | 7 categories | regulatory_practice.json |
| Case Timeline | 14 projects | caseStudies sourceRefs |
| Service Matrix | ~100 cells | services array → sources |

### Adding Source Citations to Charts

**Pattern:**
```tsx
<ChartWrapper
  title="Supplier Capability Profile"
  subtitle="Based on verified public sources"
  sourceRef={supplier.sourceRefs?.join(', ')}
>
  <SupplierRadar supplier={supplier} />
</ChartWrapper>

// Footer shows:
// "Sources: yllw_website, rise_fire_research → View all sources"
```

### Data Quality Checks

**Create validation script:** `scripts/validate-chart-data.ts`
```typescript
// Validates that all data points used in charts have source references

import suppliers from '../data/suppliers_enhanced.json';
import sources from '../data/sources.json';

const errors: string[] = [];

// Check each supplier has sourceRefs
suppliers.forEach(s => {
  if (!s.sourceRefs || s.sourceRefs.length === 0) {
    errors.push(`Supplier ${s.id} has no sourceRefs`);
  }

  // Verify each sourceRef exists in sources.json
  s.sourceRefs?.forEach(ref => {
    const source = sources.sources.find(src => src.id === ref);
    if (!source) {
      errors.push(`Supplier ${s.id} references non-existent source: ${ref}`);
    }
  });
});

if (errors.length > 0) {
  console.error('Data validation errors:', errors);
  process.exit(1);
}

console.log('✓ All chart data is properly sourced');
```

**Add to package.json:**
```json
{
  "scripts": {
    "validate:data": "npx ts-node scripts/validate-chart-data.ts"
  }
}
```

---

## IMPLEMENTATION CHECKLIST

### Sprint 9: Foundation + Quick Wins
- [ ] Install recharts
- [ ] Create `components/charts/` directory
- [ ] Create ChartWrapper component
- [ ] Implement SupplierRadar component
- [ ] Add radar to `/suppliers/[id]` page
- [ ] Implement CostTimelineScatter
- [ ] Add scatter to `/regulations` page
- [ ] Implement EnforcementHeatmap
- [ ] Add heatmap to `/regulations` page
- [ ] Create data validation script
- [ ] Run validation, fix any missing sources
- [ ] Test print output for `/report`
- [ ] Commit and push

### Sprint 10: Medium Effort
- [ ] Implement CaseStudyTimeline
- [ ] Add timeline to `/case-studies` page
- [ ] Implement ServiceMatrix
- [ ] Add matrix to `/suppliers` page
- [ ] Implement B2BDashboard (3 mini-charts)
- [ ] Add dashboard section to `/suppliers`
- [ ] Update `/report` with new visualizations
- [ ] Commit and push

### Sprint 11: Higher Effort
- [ ] Implement DecisionTree for fire safety
- [ ] Add choropleth to supplier map
- [ ] Add certification spider chart
- [ ] Final polish and testing
- [ ] Commit and push

---

## SUCCESS METRICS

| Metric | Target |
|--------|--------|
| Chart components created | 10 |
| Pages with visualizations | 4 (/suppliers, /regulations, /case-studies, /report) |
| Data points with source refs | 100% |
| Source validation passing | 0 errors |
| Print compatibility | All charts render in PDF |

---

## RISK MITIGATION

| Risk | Mitigation |
|------|------------|
| Recharts SSR issues | Use 'use client' directive, ResponsiveContainer |
| Print rendering | Test each chart in print preview, fallback to table |
| Missing source refs | Run validation script in CI/build |
| Complex data transforms | Unit test transformation functions |
| Mobile responsiveness | Use ResponsiveContainer, test on mobile |

---

## APPENDIX: Component APIs

### SupplierRadar
```tsx
<SupplierRadar
  supplier={supplierData}
  showLegend={true}
  height={300}
/>
```

### CostTimelineScatter
```tsx
<CostTimelineScatter
  tiers={fireSafetyTiers}
  showLabels={true}
/>
```

### EnforcementHeatmap
```tsx
<EnforcementHeatmap
  data={regulatoryPractice.enforcementLevels}
  showDescriptions={false}
/>
```

### CaseStudyTimeline
```tsx
<CaseStudyTimeline
  studies={caseStudies}
  colorByTier={true}
  sizeByRooms={true}
/>
```

---

*Workplan prepared for Sprint 9-11 implementation*
