import requests
import json
import time
from pathlib import Path

# ================== CONFIG ==================
BASE_URL = "https://wilds.mhdb.io/en"
OUTPUT_DIR = Path("mh_wilds_data")
LIMIT = 200
DELAY = 0.25

OUTPUT_DIR.mkdir(exist_ok=True)

def fetch_weapons_minimal():
    """Fetch only the fields you need: name, kind, skills, sharpness, slots, damage, affinity, element (via specials)"""
    all_weapons = []
    offset = 0
    
    # Safe projection using exact field names from the API
    projection = {
        "name": True,
        "kind": True,
        "skills": True,
        "sharpness": True,
        "slots": True,
        "damage": True,      # contains raw and display damage
        "affinity": True,
        "specials": True     # contains element / status (kind, damage, hidden, etc.)
    }
    
    print("🚀 Fetching minimal weapon data for your build craft site...\n")
    print("Fields included: name, kind, skills, sharpness, slots, damage, affinity, specials (element)\n")
    
    while True:
        params = {
            "limit": LIMIT,
            "offset": offset,
            "p": json.dumps(projection)
        }
        
        url = f"{BASE_URL}/weapons"
        response = requests.get(url, params=params, timeout=30)
        
        # Auto-fallback if 500 error occurs
        if response.status_code == 500:
            print("⚠️ 500 Error → retrying without projection")
            del params["p"]
            response = requests.get(url, params=params, timeout=30)
        
        response.raise_for_status()
        data = response.json()
        
        if not isinstance(data, list):
            print("⚠️ Unexpected response")
            break
            
        all_weapons.extend(data)
        print(f"✅ Fetched {len(data)} weapons (offset {offset}) → Total: {len(all_weapons)}")
        
        if len(data) < LIMIT:
            break  # Last page
            
        offset += LIMIT
        time.sleep(DELAY)
    
    return all_weapons

def save_json(data, filename):
    filepath = OUTPUT_DIR / filename
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"💾 Saved {len(data):,} weapons → {filepath.name}")

# ================== MAIN ==================
if __name__ == "__main__":
    try:
        weapons = fetch_weapons_minimal()
        save_json(weapons, "weapons_minimal.json")
        
        print("\n🎉 Success!")
        print(f"File saved at: {OUTPUT_DIR.resolve()}/weapons_minimal.json")
        print("\nThis file is optimized for your build craft site and contains:")
        print("   • name")
        print("   • kind (weapon type)")
        print("   • skills")
        print("   • sharpness")
        print("   • slots (decoration slots)")
        print("   • damage (raw + display)")
        print("   • affinity")
        print("   • specials → element/status damage")
        
        # Quick example of the structure
        if weapons:
            print("\nExample structure of one weapon:")
            example = {k: v for k, v in weapons[0].items() if k in ["name", "kind", "damage", "affinity", "specials"]}
            print(json.dumps(example, indent=2, ensure_ascii=False))
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Network error: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")