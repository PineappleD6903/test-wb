import requests
import json
import time
from pathlib import Path
from db_manager import DatabaseManager

# ================== CONFIG ==================
BASE_URL = "https://wilds.mhdb.io/en"
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
OUTPUT_DIR = ROOT_DIR / "mh_wilds_data"
LIMIT = 200
DELAY = 0.25

OUTPUT_DIR.mkdir(exist_ok=True)

def fetch_weapons_minimal():
    """Fetch only the fields you need: name, kind, skills, sharpness, slots, damage, affinity, element (via specials)"""
    all_weapons = []
    offset = 0
    
    # Safe projection using exact field names from the API
    projection = {
        "id": True,
        "name": True,
        "kind": True,
        "skills": True,
        "sharpness": True,
        "slots": True,
        "damage": True,      # contains raw and display damage
        "affinity": True,
        "specials": True,    # contains element / status (kind, damage, hidden, etc.)
        "rarity": True
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
            
        all_data = []
        for w in data:
            # Flatten or clean if needed, but for now we trust db_manager handles it
            all_data.append(w)

        all_weapons.extend(all_data)
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

def ingest_to_db(weapons):
    db = DatabaseManager()
    db.connect()
    print(f"📥 Ingesting {len(weapons)} weapons into database...")
    for w in weapons:
        db.insert_weapon(w)
    db.conn.commit()
    db.close()
    print("✅ Database ingestion complete.")

# ================== MAIN ==================
if __name__ == "__main__":
    try:
        weapons = fetch_weapons_minimal()
        save_json(weapons, "weapons_minimal.json")
        ingest_to_db(weapons)
        
        print("\n🎉 Success!")
        print(f"File saved at: {OUTPUT_DIR.resolve()}/weapons_minimal.json")
        print("Database updated: mh_wilds.db")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Network error: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")