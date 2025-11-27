# Fyra Circular Platform

A Next.js platform for Nordic circular construction in the hospitality sector. Built as the deliverable for the NCH-Fyra collaboration agreement.

**Live Site:** [https://justaride.github.io/fyra-web-2.0/](https://justaride.github.io/fyra-web-2.0/)

---

## Overview

The Fyra Circular Platform provides Nordic hotels with a comprehensive resource for implementing circular construction practices. It connects suppliers, consultants, case studies, and regulatory guidance in one searchable interface.

### Key Features

- **Supplier Directory** - 16 verified circular furniture/materials suppliers with hospitality readiness tiers
- **Case Studies** - 14 Nordic hotel projects with quantified sustainability metrics
- **Expert Network** - Tier-1 consultants (Forsen, Sweco, Hifab) with contact information
- **Fire Safety Guidance** - BBR compliance tiers, testing costs, municipal timelines
- **Scenario Guides** - 5 project scenarios with regulatory pathways
- **BVB Specifications** - Material assessment templates and equivalency framework
- **Sustainability Certifications** - Nordic Swan, LEED, BREEAM comparison

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
│   ├── regulations/       # Fire safety + public procurement
│   ├── scenarios/         # Project scenario guides
│   ├── certifications/    # Sustainability certifications
│   ├── specifications/    # BVB specifications
│   ├── templates/         # Downloadable templates
│   └── about/             # Fyra company profile
├── components/            # Shared React components
├── data/                  # JSON data files
│   ├── suppliers_enhanced.json
│   ├── caseStudies_clean.json
│   ├── consultants_enhanced.json
│   ├── fire_safety.json
│   ├── public_procurement.json
│   └── ...
├── docs/                  # Project documentation
└── lib/                   # Utility functions
```

---

## Data Files

| File | Records | Description |
|------|---------|-------------|
| `suppliers_enhanced.json` | 16 | B2B circular suppliers with hospitality tiers |
| `caseStudies_clean.json` | 14 | Nordic hotel case studies with metrics |
| `consultants_enhanced.json` | 3 | Tier-1 PM consultants with contacts |
| `consultants.json` | 5 | Specialist consultants |
| `fire_safety.json` | 3 tiers | BBR compliance, testing costs, timelines |
| `public_procurement.json` | 7 sections | LOU framework, LCC evaluation |
| `certifications.json` | 8 | Sustainability certification comparison |
| `scenarios.json` | 5 | Project scenario guides |
| `templates.json` | 6 | Downloadable form templates |
| `sources.json` | 106 | Verified source references |

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

## Recent Updates (Session 7-8)

### Jan Thomas Feedback Implementation
1. **NCH Mapping** - Added "Platform Guide" section to About page linking objectives to pages
2. **Scenarios Context** - Added explanatory block clarifying scenarios vs regulations
3. **Case Study Justification** - Added `whyIncluded` field for pre-2018 case studies
4. **Regulatory Disclaimers** - Added verification notes to fire testing costs/timelines
5. **Fire Safety UX** - Collapsible section for detailed testing cost matrix

### Data Enrichments
- **Blique by Nobis** - Flagship case study with €8.6M materials reused, 3,600t CO2 saved
- **3 New Case Studies** - Hotel Skeppsholmen, Hobo Hotel, Ett Hem
- **SENAB Supplier** - Added with Blique by Nobis project reference
- **Fire Safety Data** - Testing cost matrix, municipal approval timelines

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

*Built with Next.js • Data verified 2025-11*
