import json
import os

BASE_PATH = "/Users/gabrielboen/Library/CloudStorage/GoogleDrive-gabriel@naturalstate.no/My Drive/Project Fyra Web 1.0 /fyra-web-2.0/data"
SUPPLIERS_PATH = os.path.join(BASE_PATH, "suppliers_enhanced.json")

def tag_suppliers():
    with open(SUPPLIERS_PATH, 'r') as f:
        suppliers = json.load(f)
    
    updated_count = 0
    for s in suppliers:
        desc = s.get("description", "").lower()
        services = " ".join(s.get("services", [])).lower()
        
        # Default to Circular
        model = "Circular"
        
        # Check for Hybrid indicators
        if "new furniture" in desc or "new furniture" in services or "hybrid" in desc:
            model = "Hybrid"
            updated_count += 1
            
        s["businessModel"] = model
        
    with open(SUPPLIERS_PATH, 'w') as f:
        json.dump(suppliers, f, indent=2)
        
    print(f"Updated {len(suppliers)} suppliers. {updated_count} tagged as Hybrid.")

if __name__ == "__main__":
    tag_suppliers()
