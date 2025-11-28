# Fyra Circular Platform

A Next.js platform for Nordic circular construction in the hospitality sector. Built as the deliverable for the NCH-Fyra collaboration agreement.

**Live Site:** [https://justaride.github.io/fyra-web-2.0/](https://justaride.github.io/fyra-web-2.0/)

---

## Overview

The Fyra Circular Platform provides Nordic hotels with a comprehensive resource for implementing circular construction practices. It connects suppliers, consultants, case studies, and regulatory guidance in one searchable interface.

### Key Features

- **Supplier Directory** - 13 verified circular furniture/materials suppliers with hospitality readiness tiers, B2B filters, and comparison tool
- **Case Studies** - 14 Nordic hotel projects with quantified sustainability metrics
- **Expert Network** - Tier-1 consultants (Forsen, Sweco, Hifab) with decision framework
- **Regulatory Compass** - Fire safety, building codes, enforcement levels by country
- **Scenario Guides** - 5 project scenarios with regulatory pathways
- **BVB Specifications** - Material assessment templates and equivalency framework
- **Sustainability Certifications** - Nordic Swan, LEED, BREEAM comparison
- **Printable Report** - Full platform documentation as PDF-ready page (`/report`)

---

## NCH Contract Alignment

| Objective | Description | Platform Coverage |
|-----------|-------------|-------------------|
| Obj 2 | Segment Analysis | `/suppliers`, `/experts`, `/case-studies`, `/certifications` |
| Obj 3 | Nordic Upscaling Strategy | `/regulations`, `/scenarios`, `/specifications` |
| Obj 4 | Implementation Support | `/templates`, consultant contacts |
| Obj 5 | Public Procurement | `/regulations` (LOU framework section) |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Maps:** Leaflet (supplier locations)
- **Charts:** Recharts (data visualizations)
- **Deployment:** GitHub Pages (static export)

---

## Project Structure

```
fyra-web-2.0/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── suppliers/         # Supplier directory + detail pages
│   ├── case-studies/      # Hotel case studies + detail pages
│   ├── experts/           # Consultant network
│   ├── regulations/       # Regulatory compass (fire, building codes)
│   ├── scenarios/         # Project scenario guides
│   ├── certifications/    # Sustainability certifications
│   ├── specifications/    # BVB specifications
│   ├── templates/         # Downloadable templates
│   ├── report/            # Printable full report
│   └── about/             # Fyra company profile
├── components/            # Shared React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site-wide footer
│   ├── SupplierCard.tsx   # Supplier display card
│   ├── ComparisonBar.tsx  # Supplier comparison tool
│   └── ...
├── data/                  # JSON data files (14 files)
│   ├── suppliers_enhanced.json
│   ├── caseStudies_clean.json
│   ├── consultants_enhanced.json
│   ├── regulatory_practice.json
│   └── ...
├── docs/                  # Project documentation
└── lib/                   # Utility functions + context
```

---

## Data Files

| File | Records | Description |
|------|---------|-------------|
| `suppliers_enhanced.json` | 13 | B2B circular suppliers with hospitality tiers |
| `caseStudies_clean.json` | 14 | Nordic hotel case studies with metrics |
| `consultants_enhanced.json` | 3 | Tier-1 PM consultants with decision framework |
| `consultants.json` | 5 | Specialist consultants |
| `fire_safety.json` | 3 tiers | BBR compliance, testing costs, timelines |
| `regulatory_practice.json` | 4 countries | Enforcement levels by jurisdiction |
| `public_procurement.json` | 7 sections | LOU framework, LCC evaluation |
| `certifications.json` | 8 | Sustainability certification comparison |
| `specifications.json` | - | BVB system, templates |
| `scenarios.json` | 5 | Project scenario guides |
| `templates.json` | 6 | Downloadable form templates |
| `sources.json` | 106+ | Verified source references |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/justaride/fyra-web-2.0.git
cd fyra-web-2.0

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.

### Build

```bash
# Production build
npm run build

# Static export (for GitHub Pages)
npm run build
```

---

## Recent Updates (November 2025)

### Sprint 9 - Data Visualizations
- **Chart Components** - Added Recharts-based visualizations
- **Supplier Radar** - 6-axis capability profile on supplier detail pages
- **Fire Safety Charts** - Cost vs timeline scatter plot on regulations page
- **Enforcement Heatmap** - Visual matrix of regulatory enforcement levels
- **Data Validation** - Script to verify all data points have source references

### Sprint 8 - Printable Report
- **Full Report Page** (`/report`) - Comprehensive PDF-ready documentation
- **Print CSS** - A4 page setup, page breaks, optimized typography
- **Table of Contents** - 8 chapters covering all platform content

### Sprint 7 - UX/UI Improvements
- **Footer Component** - Site-wide navigation and branding
- **Text Readability** - Increased minimum sizes (12px base)
- **Card Enhancements** - Tier-based gradient headers for visual variety

### Sprint 6 - Regulatory Practice
- **Enforcement Levels** - Country-by-country comparison (SE, NO, DK, FI)
- **Interior Renovation Pathway** - Simplified compliance for FF&E changes

### Sprint 5 - B2B Readiness Filters
- **Supplier Filters** - Stock availability, volume capacity, SLA guarantee
- **Comparison Tool** - Side-by-side supplier comparison (up to 4)

### Earlier Sprints (1-4)
- Initial MVP with all data integration
- Client-side search functionality
- Breadcrumb navigation
- Map/list view toggle

---

## Design System

### Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Fyra Teal | #0d9488 | Primary brand |
| Slate 900 | #0f172a | Text, dark backgrounds |
| Slate 50 | #f8fafc | Page backgrounds |

### Visual Indicators
- **Ratings:** Teal bar indicators (not emoji stars)
- **Tiers:** Dot indicators (●●○)
- **Fire Safety:** Lucide shield icons
- **Source Types:** Lucide icons (Building2, Newspaper, etc.)

---

## Documentation

- `/docs/PROGRESS.md` - Implementation changelog
- `/docs/DATA_COVERAGE_REPORT.md` - Data completeness analysis
- `/docs/ENRICHMENT_ACTION_PLAN.md` - Data enrichment roadmap
- `/docs/PROJECT_INVENTORY.md` - Full project inventory (Norwegian)

---

## Contributing

This platform is maintained by Fyra for the NCH collaboration. For inquiries, contact the Fyra team.

---

## License

Proprietary - NCH/Fyra Collaboration

---

*Built with Next.js 16 • 49 static pages • Data verified November 2025*
