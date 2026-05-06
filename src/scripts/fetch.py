import requests
import json
import time
from pathlib import Path
from db_manager import DatabaseManager

# Configuration
BASE_URL = "https://wilds.mhdb.io/en"  # Change 'en' to your preferred locale (e.g., 'ja')
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
OUTPUT_DIR = ROOT_DIR / "mh_wilds_data"
LIMIT = 200  # Max items per request (API supports high values; adjust if needed)
DELAY = 0.2   # Small delay to be respectful (caching is enabled on the API side)

OUTPUT_DIR.mkdir(exist_ok=True)

def fetch_all(endpoint: str, params: dict = None, projection: dict = None) -> list:
    """
    Fetch all items from a list endpoint with pagination.
    """
    all_data = []
    offset = 0
    params = params or {}
    
    if projection:
        params["p"] = json.dumps(projection)
    
    while True:
        query_params = {
            "limit": LIMIT,
            "offset": offset,
            **params
        }
        
        url = f"{BASE_URL}/{endpoint}"
        response = requests.get(url, params=query_params)
        response.raise_for_status()
        
        data = response.json()
        
        if not isinstance(data, list):
            print(f"Warning: Unexpected response format for {endpoint}")
            break
            
        all_data.extend(data)
        print(f"Fetched {len(data)} items from {endpoint} (offset {offset})")
        
        if len(data) < LIMIT:
            break  # Last page
            
        offset += LIMIT
        time.sleep(DELAY)  # Be nice to the server
    
    return all_data

def save_json(data: list, filename: str):
    filepath = OUTPUT_DIR / filename
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(data)} items to {filepath}")

def ingest_all_to_db(armor, armor_sets, decorations, skills):
    db = DatabaseManager()
    db.connect()
    
    print("\n📥 Ingesting into database...")
    
    print(" - Skills...")
    for s in skills:
        db.save_skill(s)
        
    print(" - Armor Sets...")
    for s in armor_sets:
        db.save_armor_set(s)
        
    print(" - Armor Pieces...")
    for a in armor:
        db.insert_armor(a)
        
    print(" - Decorations...")
    for d in decorations:
        db.insert_decoration(d)
        
    db.conn.commit()
    db.close()
    print("✅ All data ingested into database (mh_wilds.db).")

def main():
    print("Starting data fetch from Monster Hunter Wilds API...\n")
    
    # 1. Fetch skills first (dependencies for others)
    print("Fetching all skills...")
    skills = fetch_all("skills")
    save_json(skills, "skills.json")
    
    # 2. Fetch all armor pieces
    print("\nFetching all armor pieces...")
    armor = fetch_all("armor")
    save_json(armor, "armor_pieces.json")
    
    # 3. Fetch all armor sets
    print("\nFetching all armor sets...")
    armor_sets = fetch_all("armor/sets")
    save_json(armor_sets, "armor_sets.json")
    
    # 4. Fetch all decorations
    print("\nFetching all decorations...")
    decorations = fetch_all("decorations")
    save_json(decorations, "decorations.json")
    
    # Ingest everything to DB
    ingest_all_to_db(armor, armor_sets, decorations, skills)
    
    print("\n✅ All data fetched, saved, and ingested successfully!")

if __name__ == "__main__":
    try:
        main()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        print("Make sure you have internet access and the API is up.")