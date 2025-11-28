# VISUALIZATION ANALYSIS & RECOMMENDATIONS

**Date:** 2025-11-28
**Scope:** Data enhancement opportunities for Fyra Circular Platform

---

## EXECUTIVE SUMMARY

The Fyra platform contains rich structured data across 14 JSON files. Currently visualized primarily through cards, lists, and a Leaflet map. This analysis identifies **15 high-impact visualization opportunities** that would enhance data comprehension and user engagement.

**Recommended Library:** [Recharts](https://recharts.org/) - React-based, simple API, good SSR support with Next.js

---

## DATA INVENTORY FOR VISUALIZATION

| Dataset | Records | Quantifiable Fields | Visualization Potential |
|---------|---------|---------------------|------------------------|
| Suppliers | 13 | tiers, countries, services, b2bReadiness | High |
| Case Studies | 14 | tiers, years, room counts, CO2 metrics | High |
| Certifications | 8 | scores, adoption levels, criteria | Medium |
| Fire Safety | 3 tiers | costs, timelines, risk levels | Medium |
| Regulatory Practice | 7 items | enforcement levels | Medium |
| Consultants | 5 | specializations | Low |

---

## HIGH-PRIORITY VISUALIZATIONS

### 1. Supplier Distribution Map Enhancement
**Current:** Leaflet map with markers
**Enhancement:** Add choropleth shading showing supplier density by Nordic region

```
Type: Choropleth overlay on Leaflet map
Data: suppliers_enhanced.json → country, regions
Colors: Heat map (0 suppliers = gray, 5+ = dark teal)
Value: Shows geographic gaps at a glance
```

---

### 2. Supplier Capability Radar Chart
**Page:** `/suppliers/[id]` detail page
**Type:** Radar/Spider chart

```
Axes (5-6 dimensions):
- Volume Capacity (small/medium/enterprise → 1/2/3)
- Lead Time (12+ weeks = 1, 1-3 weeks = 3)
- Hospitality Tier (Tier 3/2/1 → 1/2/3)
- Nordic Reach (no/yes → 1/2)
- Service Breadth (count of services)
- Fire Safety Capability (testing coordination → +1)

Example: YLLW Factory would score high on all axes
```

**Implementation:** Recharts `<RadarChart>` component

---

### 3. Case Study Timeline
**Page:** `/case-studies`
**Type:** Horizontal timeline with scatter plot

```
X-axis: Year (2013-2025)
Y-axis: Room count
Bubble size: Circular content % (if available)
Color: Tier (Flagship=teal, Proven=blue, Emerging=amber)

Data points:
- Green Solution House (2015, 59 rooms, Flagship)
- Scandic GO (2024, 358 rooms, Flagship)
- Blique by Nobis (2019, 249 rooms, Flagship)
- etc.
```

**Value:** Shows market momentum and scale of circular projects over time

---

### 4. Fire Safety Decision Tree / Flowchart
**Page:** `/regulations`
**Type:** Interactive flowchart/decision tree

```
Start: "What furniture type?"
├── Metal/Glass/Stone → Tier 1 (Low Risk) → "No testing needed"
├── Reupholstered → Tier 2 (Medium) → "EN 1021-1/2 test" → Cost: 18-30k SEK
└── Fully Upholstered → Tier 3 (High) → "BS 5852 Crib 5" → Cost: 60-150k SEK
```

**Implementation:** Could use a library like `react-flow` or simple SVG

---

### 5. Enforcement Level Heatmap
**Page:** `/regulations`
**Type:** Matrix/heatmap chart

```
         | Sweden | Norway | Denmark | Finland
---------|--------|--------|---------|--------
Fire (walls)    | HIGH   | HIGH   | HIGH    | HIGH
Fire (furniture)| MEDIUM | MEDIUM | MEDIUM  | MEDIUM
Building Permit | MEDIUM | MEDIUM | LOW     | MEDIUM
Accessibility   | MEDIUM | LOW    | MEDIUM  | MEDIUM
EPD Required    | LOW    | LOW    | LOW     | LOW
```

**Colors:** Red=HIGH, Yellow=MEDIUM, Green=LOW

---

### 6. Certification Comparison Spider Chart
**Page:** `/certifications`
**Type:** Multi-series radar chart

```
Axes:
- Furniture Criteria Strength
- Textile Criteria Strength
- Circular Economy Score
- Market Adoption (Nordics)
- Cost/Complexity

Series:
- Nordic Swan (high adoption, medium circularity)
- BREEAM (medium adoption, high circularity)
- LEED (low adoption, medium circularity)
```

---

### 7. Supplier Service Coverage Matrix
**Page:** `/suppliers`
**Type:** Heatmap matrix

```
                    | YLLW | Input | Rekomo | etc.
--------------------|------|-------|--------|-----
Refurbishment       | ✓    | ✓     | ○      |
Buy-back programs   | ✓    | ✓     | ✓      |
Fire testing coord  | ✓    | ○     | ○      |
Logistics/Install   | ✓    | ✓     | ✓      |
Warranty            | ✓    | ○     | ○      |
CO2 documentation   | ✓    | ✓     | ○      |
```

**Value:** Quick comparison of service coverage

---

### 8. B2B Readiness Dashboard
**Page:** `/suppliers`
**Type:** Bar chart grouped by capability

```
Chart 1: Volume Capacity Distribution
- Enterprise: 4 suppliers
- Medium: 5 suppliers
- Small: 4 suppliers

Chart 2: Lead Time Comparison
Horizontal bars showing stock lead time for each supplier

Chart 3: B2B Features Coverage
Stacked bar showing % with: Stock, Sourcing, SLA, Volume
```

---

### 9. Cost-Timeline Scatter Plot (Fire Safety)
**Page:** `/regulations`
**Type:** Scatter plot

```
X-axis: Timeline (weeks)
Y-axis: Cost (SEK)
Bubbles:
- Tier 1: (2 weeks, 5k SEK) - small green
- Tier 2: (10 weeks, 25k SEK) - medium yellow
- Tier 3: (16 weeks, 100k SEK) - large red
```

---

### 10. Case Study Metrics Cards with Sparklines
**Page:** `/case-studies`
**Type:** Enhanced stat cards with mini-charts

```
┌─────────────────────────────┐
│ CO2 Saved                   │
│ ▁▂▃▅▇ 3,600 tonnes          │
│ Blique by Nobis (highest)   │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Materials Reused            │
│ ▁▃▅▇ €8.6M value            │
│ Blique by Nobis (highest)   │
└─────────────────────────────┘
```

---

## MEDIUM-PRIORITY VISUALIZATIONS

### 11. Consultant Decision Matrix
Visual flowchart for "When to use Forsen vs Sweco vs Hifab"

### 12. Circular Content Gauge
Semicircle gauge showing % circular content for case studies

### 13. Certification Coverage Venn Diagram
Overlap between Nordic Swan, BREEAM, LEED requirements

### 14. Supplier Network Graph
Force-directed graph showing supplier → project → architect connections

### 15. Regulatory Compliance Checklist Progress Bar
Interactive checklist showing compliance progress for a hypothetical project

---

## IMPLEMENTATION RECOMMENDATIONS

### Phase 1 (Quick Wins)
1. **Supplier Capability Radar** - Single component, high visual impact
2. **Fire Safety Cost-Timeline Scatter** - Simple data, clear message
3. **Enforcement Heatmap** - Already have data, just needs visualization

### Phase 2 (Medium Effort)
4. **Case Study Timeline** - Requires data normalization for years
5. **Service Coverage Matrix** - Needs service standardization
6. **B2B Readiness Dashboard** - Multiple small charts

### Phase 3 (Higher Effort)
7. **Interactive Decision Tree** - Requires new component architecture
8. **Map Choropleth Enhancement** - Custom Leaflet layers
9. **Network Graph** - Complex data relationships

---

## TECHNICAL APPROACH

### Recommended Stack
```
Charts: Recharts (already React-based, SSR-friendly)
Maps: Leaflet (already in use)
Flowcharts: react-flow or custom SVG
Gauges: Simple SVG or recharts customization
```

### Data Transformations Needed
1. **Normalize years** - Parse "2019-2021" to single year (2021)
2. **Quantify tiers** - Map Tier 1/2/3 to numeric 3/2/1
3. **Aggregate services** - Standardize service names for matrix
4. **Extract metrics** - Parse CO2 values from strings

### Component Structure
```
components/
├── charts/
│   ├── SupplierRadar.tsx
│   ├── CostTimeline.tsx
│   ├── EnforcementHeatmap.tsx
│   ├── CaseStudyTimeline.tsx
│   └── ServiceMatrix.tsx
└── visualizations/
    └── DecisionTree.tsx
```

---

## EXPECTED IMPACT

| Visualization | User Value | Implementation Effort |
|---------------|------------|----------------------|
| Supplier Radar | Instant capability assessment | Low |
| Case Study Timeline | Market trend visibility | Medium |
| Fire Safety Scatter | Cost/time planning | Low |
| Enforcement Heatmap | Country comparison | Low |
| Service Matrix | Gap identification | Medium |
| Decision Tree | Actionable guidance | High |

---

## NEXT STEPS

1. **Install Recharts:** `npm install recharts`
2. **Create charts/ directory** with reusable components
3. **Start with Supplier Radar** on detail pages
4. **Add Enforcement Heatmap** to regulations page
5. **Build Case Study Timeline** for visual impact

---

*Analysis prepared for Sprint 9 planning*
