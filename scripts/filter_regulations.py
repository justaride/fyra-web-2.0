import json
import os

BASE_PATH = "/Users/gabrielboen/Library/CloudStorage/GoogleDrive-gabriel@naturalstate.no/My Drive/Project Fyra Web 1.0 /fyra-web-2.0/data"
REGULATIONS_PATH = os.path.join(BASE_PATH, "regulations.json")
FILTERED_REGULATIONS_PATH = os.path.join(BASE_PATH, "regulations_filtered.json")

def filter_regulations():
    with open(REGULATIONS_PATH, 'r') as f:
        data = json.load(f)

    filtered_data = []
    
    # Define categories we want to keep and their display names
    categories = {
        "fireSafety": "Fire Safety & Insurance",
        "buildingCodes": "Building Codes (BBR)",
        "materialStandards": "Material Standards (CE Marking)",
        "documentation": "Documentation Requirements"
    }

    for key, title in categories.items():
        if key in data:
            section = data[key]
            items = section.get("items", [])
            
            relevant_items = []
            for item in items:
                t = item.get("title", "")
                d = item.get("description", "")
                
                # Filter logic:
                # 1. Exclude "Item Category" headers (table headers)
                # 2. Exclude specific pricing/lab details (too granular/risky)
                # 3. Keep "Barriers" and "Requirements"
                
                if "Item Category" in t:
                    continue
                if "Cost:" in t or "Price" in d:
                    continue
                if "Lab" in t and "Location" in d: # Lab list table header
                    continue
                    
                # Classify as EU vs National
                scope = "National (Sweden)" # Default
                if "EN " in t or "EN " in d or "EU" in d:
                    scope = "EU / International"
                
                relevant_items.append({
                    "title": t,
                    "description": d,
                    "scope": scope,
                    "confidence": "High" if "BBR" in t or "EN" in t else "Medium"
                })
            
            if relevant_items:
                filtered_data.append({
                    "id": key,
                    "title": title,
                    "items": relevant_items
                })

    with open(FILTERED_REGULATIONS_PATH, 'w') as f:
        json.dump(filtered_data, f, indent=2)
        
    print(f"Filtered regulations into {len(filtered_data)} categories.")

if __name__ == "__main__":
    filter_regulations()
