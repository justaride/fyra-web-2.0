#!/usr/bin/env python3
"""
COMPLETE FINAL extraction with paragraph parsing for case studies.
"""

import json
import re
from pathlib import Path
from docx import Document

BASE_DIR = Path("/Users/gabrielboen/Downloads/drive-download-20251108T110451Z-1-001")
DATA_DIR = BASE_DIR / "fyra-circular-platform/data"

def clean_text(text):
    if not text:
        return ""
    return text.strip().replace('\u200b', '').replace('\u2705', '').replace('\u26a0\ufe0f', '').replace('  ', ' ').strip()

def extract_case_studies():
    """Extract case studies from paragraphs."""
    doc_path = BASE_DIR / "4. FRONTRUNNER HOTELS - COMPLETE EXTRACTION.docx"
    doc = Document(doc_path)

    case_studies = []
    current_case = None
    current_section = None

    for para in doc.paragraphs:
        text = clean_text(para.text)
        if not text:
            continue

        # H3 headings are hotel names
        if para.style.name == 'Heading 3':
            if any(skip in text.lower() for skip in ['continuation required', 'see full details']):
                continue

            # Save previous case
            if current_case:
                case_studies.append(current_case)

            # Create new case
            hotel_name = re.sub(r'\s*-\s*RELEVANCE SCORE:.*$', '', text, flags=re.IGNORECASE)

            current_case = {
                "id": hotel_name.lower().replace(' ', '_').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').replace('-', '_').replace('/', '_').replace('(', '').replace(')', '').replace('.', '').replace('&', 'and')[:50],
                "hotelName": hotel_name,
                "location": "",
                "year": "",
                "projectSize": "",
                "category": "",
                "circularElements": [],
                "impact": {"co2Savings": "", "circularPercentage": "", "costSavings": ""},
                "architects": [],
                "partners": [],
                "challenges": [],
                "outcomes": [],
                "relevance": ""
            }
            current_section = None

        # Track sections within hotel
        elif current_case and para.style.name == 'normal':
            text_lower = text.lower()

            # Section headers
            if text_lower in ['profile', 'circular economy implementation', 'impact metrics', 'team', 'sources', 'market acceptance']:
                current_section = text_lower
                continue

            # Parse labeled fields
            if ':' in text:
                label, value = text.split(':', 1)
                label_lower = label.lower().strip()
                value = clean_text(value)

                if 'location' in label_lower or 'address' in label_lower:
                    current_case["location"] = value
                elif 'opening' in label_lower or 'year' in label_lower or 'completed' in label_lower:
                    year_match = re.search(r'\b(19|20)\d{2}\b', value)
                    if year_match:
                        current_case["year"] = year_match.group()
                    else:
                        current_case["year"] = value
                elif 'size' in label_lower or 'rooms' in label_lower:
                    current_case["projectSize"] = value
                elif 'category' in label_lower or 'segment' in label_lower:
                    current_case["category"] = value

                # Circular elements
                elif 'circular' in label_lower or 'reused' in label_lower or 'reuse' in label_lower or 'upcycled' in label_lower:
                    if value and value != 'Not documented':
                        current_case["circularElements"].append(f"{label}: {value}")

                # Impact
                elif 'co2' in label_lower or 'carbon' in label_lower or 'emission' in label_lower:
                    current_case["impact"]["co2Savings"] = value
                elif 'circular' in label_lower and '%' in text:
                    current_case["impact"]["circularPercentage"] = value
                elif 'cost' in label_lower and ('saving' in label_lower or 'impact' in label_lower):
                    current_case["impact"]["costSavings"] = value

                # Team
                elif 'architect' in label_lower or 'designer' in label_lower or 'interior' in label_lower:
                    if value and value.lower() not in ['not documented', 'none', 'n/a']:
                        current_case["architects"].append(value)
                elif 'sustainability consultant' in label_lower or 'material supplier' in label_lower or 'contractor' in label_lower:
                    if value and value.lower() not in ['not documented', 'none', 'n/a']:
                        current_case["partners"].append(value)

                # Relevance/justification
                elif 'justification' in label_lower or 'relevance' in label_lower or 'differentiation' in label_lower:
                    current_case["relevance"] = value

            # Bullet points under current section
            elif text.startswith('✅') or text.startswith('⚠️') or text.startswith('•') or text.startswith('-'):
                item = clean_text(text[1:].strip())

                if current_section == 'circular economy implementation' or 'reuse' in text.lower() or 'circular' in text.lower():
                    current_case["circularElements"].append(item)
                elif current_section == 'impact metrics':
                    if 'co2' in text.lower() or 'carbon' in text.lower():
                        current_case["impact"]["co2Savings"] = item
                    elif '%' in text:
                        current_case["impact"]["circularPercentage"] = item

    # Save last case
    if current_case:
        case_studies.append(current_case)

    return case_studies

def main():
    print("=" * 80)
    print("COMPLETE FINAL EXTRACTION - CASE STUDIES")
    print("=" * 80)

    case_studies = extract_case_studies()

    print(f"\n✓ Extracted {len(case_studies)} case studies")

    # Save
    output_path = DATA_DIR / "case_studies.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(case_studies, f, indent=2, ensure_ascii=False)

    size = output_path.stat().st_size / 1024
    print(f"✓ Saved to case_studies.json ({size:.1f} KB)")

    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)

    for cs in case_studies:
        year = cs['year'][:4] if cs['year'] else 'n/a '
        loc = (cs['location'][:25] + '...') if len(cs['location']) > 25 else cs['location'] or 'N/A'
        circ = len(cs['circularElements'])
        co2 = "✓" if cs['impact']['co2Savings'] else "✗"

        print(f"{cs['hotelName'][:35]:35s} | {year} | {loc:28s} | Circ:{circ:2d} | CO2:{co2}")

    print("\n" + "=" * 80)
    print("✓ COMPLETE")
    print("=" * 80)

if __name__ == "__main__":
    main()
