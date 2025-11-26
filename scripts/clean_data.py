import json
import re
import os

BASE_PATH = "/Users/gabrielboen/Library/CloudStorage/GoogleDrive-gabriel@naturalstate.no/My Drive/Project Fyra Web 1.0 /fyra-web-2.0/data"
CASE_STUDIES_PATH = os.path.join(BASE_PATH, "caseStudies.json")
SUPPLIERS_PATH = os.path.join(BASE_PATH, "suppliers_enhanced.json")
CLEAN_CASE_STUDIES_PATH = os.path.join(BASE_PATH, "caseStudies_clean.json")
AUDIT_REPORT_PATH = os.path.join(BASE_PATH, "data_audit_report.md")

def clean_case_studies():
    with open(CASE_STUDIES_PATH, 'r') as f:
        raw_data = json.load(f)

    cleaned_cases = []
    current_case = {}

    for item in raw_data:
        name = item.get("name", "")
        
        # Heuristic: Uppercase name usually indicates start of a new case
        # But exclude "Name: ..." or "Category: ..." which might be uppercase but are details
        is_header = name.isupper() and ":" not in name and len(name) > 3
        
        if is_header:
            # Save previous case if valid
            if current_case:
                cleaned_cases.append(current_case)
            current_case = {
                "id": name.lower().replace(" ", "_"),
                "title": name,
                "type": item.get("type", "Case Study"),
                "details": {}
            }
        elif current_case:
            # Merge details
            # If name contains ":", split it
            if ":" in name:
                key, val = name.split(":", 1)
                key = key.strip().lower()
                val = val.strip()
                current_case["details"][key] = val
            else:
                # Just append to a generic 'notes' list or try to infer
                if "notes" not in current_case:
                    current_case["notes"] = []
                current_case["notes"].append(name)
            
            # Merge other keys from the item
            for k, v in item.items():
                if k not in ["name", "type", "circularElements", "materials"] and v:
                     current_case[k] = v

    # Append last case
    if current_case:
        cleaned_cases.append(current_case)

    # Filter by Year >= 2018
    filtered_cases = []
    for case in cleaned_cases:
        year_str = case.get("year", "") or case.get("details", {}).get("year", "")
        # Extract year digits
        years = re.findall(r"20\d\d", str(year_str))
        if years:
            # Take the max year found (e.g. "2016-2018" -> 2018)
            max_year = max(int(y) for y in years)
            if max_year >= 2018:
                case["year_verified"] = max_year
                filtered_cases.append(case)
        else:
            # Keep if no year found? Or discard? 
            # User said "cut-off 2018 kanskje", implying strictness. 
            # But let's keep "ongoing" or recent looking ones if unsure, but flag them.
            # For now, strict filter if year is present, otherwise maybe keep for manual review?
            # Let's be strict: if we can't find a recent year, drop it (or put in a 'review' pile).
            # Actually, let's keep them but mark as "Year Unknown" for the report.
            case["year_verified"] = "Unknown"
            # filtered_cases.append(case) # Uncomment to keep unknown years
            pass 

    print(f"Case Studies: Raw {len(raw_data)} -> Merged {len(cleaned_cases)} -> Filtered (>=2018) {len(filtered_cases)}")
    
    with open(CLEAN_CASE_STUDIES_PATH, 'w') as f:
        json.dump(filtered_cases, f, indent=2)

    return cleaned_cases, filtered_cases

def audit_suppliers():
    with open(SUPPLIERS_PATH, 'r') as f:
        suppliers = json.load(f)
    
    audit_log = []
    for s in suppliers:
        desc = s.get("description", "").lower()
        services = " ".join(s.get("services", [])).lower()
        
        flags = []
        if "new furniture" in desc or "new furniture" in services:
            flags.append("Mentions 'new furniture'")
        if "hybrid" in desc:
            flags.append("Hybrid model")
            
        if flags:
            audit_log.append(f"- **{s.get('name')}**: {', '.join(flags)}")
            
    return audit_log

if __name__ == "__main__":
    _, filtered_cases = clean_case_studies()
    supplier_issues = audit_suppliers()
    
    with open(AUDIT_REPORT_PATH, 'w') as f:
        f.write("# Data Hygiene Audit Report\n\n")
        f.write("## Case Studies\n")
        f.write(f"- **Filtered Count**: {len(filtered_cases)} (from original merged set)\n")
        f.write("- **Criteria**: Year >= 2018\n\n")
        
        f.write("## Supplier Audit (Potential 'New' vs 'Reuse' Conflicts)\n")
        for issue in supplier_issues:
            f.write(f"{issue}\n")
            
    print("Audit complete. Report generated.")
