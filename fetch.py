import requests
import json
import time
from pathlib import Path

# Configuration
BASE_URL = "https://wilds.mhdb.io/en"  # Change 'en' to your preferred locale (e.g., 'ja')
OUTPUT_DIR = Path("mh_wilds_data")
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

def main():
    print("Starting data fetch from Monster Hunter Wilds API...\n")
    
    # 1. Fetch all armor pieces (individual pieces like head, chest, etc.)
    print("Fetching all armor pieces...")
    armor = fetch_all("armor")
    save_json(armor, "armor_pieces.json")
    
    # Optional: Fetch with projection to reduce size (useful for build calculator)
    # armor_light = fetch_all("armor", projection={"id": True, "name": True, "kind": True, "rarity": True,
    #                                             "slots": True, "skills": True, "armorSet": True})
    # save_json(armor_light, "armor_pieces_light.json")
    
    # 2. Fetch all armor sets
    print("\nFetching all armor sets...")
    armor_sets = fetch_all("armor/sets")
    save_json(armor_sets, "armor_sets.json")
    
    # 3. Fetch all decorations (armor + weapon decorations)
    print("\nFetching all decorations...")
    decorations = fetch_all("decorations")
    save_json(decorations, "decorations.json")
    
    # Optional: Filter only armor decorations
    print("\nFetching armor-only decorations...")
    armor_decor_params = {"q": json.dumps({"kind": "armor"})}
    armor_decorations = fetch_all("decorations", params=armor_decor_params)
    save_json(armor_decorations, "decorations_armor.json")
    
    # Bonus: Fetch skills (very useful for build crafting)
    print("\nFetching all skills...")
    skills = fetch_all("skills")
    save_json(skills, "skills.json")
    
    print("\n✅ All data fetched and saved successfully!")
    print(f"Output directory: {OUTPUT_DIR.resolve()}")
    print("\nRecommended files for your build craft site:")
    print(" - armor_pieces.json")
    print(" - armor_sets.json")
    print(" - decorations.json (or decorations_armor.json)")
    print(" - skills.json")

if __name__ == "__main__":
    try:
        main()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        print("Make sure you have internet access and the API is up.")