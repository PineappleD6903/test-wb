import sqlite3

from pathlib import Path

def verify():
    db_path = Path(__file__).resolve().parent.parent.parent / "mh_wilds.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    tables = ["skills", "skill_ranks", "weapons", "armor", "armor_sets", "decorations"]
    print("========================================")
    print("📊 Monster Hunter Wilds DB Verification")
    print("========================================")
    
    for table in tables:
        try:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f" - {table:15}: {count:4} records")
        except sqlite3.OperationalError as e:
            print(f" - {table:15}: ❌ Error (Table might not exist)")

    print("\n🔗 Relationship Check:")
    cursor.execute("SELECT COUNT(*) FROM armor WHERE armor_set_id IS NOT NULL")
    armored_pieces = cursor.fetchone()[0]
    print(f" - Armor with sets: {armored_pieces}")
    
    cursor.execute("SELECT COUNT(*) FROM armor_set_bonuses")
    bonuses = cursor.fetchone()[0]
    print(f" - Set bonus ranks: {bonuses}")

    conn.close()

if __name__ == "__main__":
    verify()
