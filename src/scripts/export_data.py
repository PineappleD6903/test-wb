import sqlite3
import json
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
DB_PATH = ROOT_DIR / "mh_wilds.db"
OUTPUT_DIR = ROOT_DIR / "public" / "data"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def export_skills():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM skills")
    skills = [dict(row) for row in cursor.fetchall()]
    for s in skills:
        cursor.execute("SELECT level, description FROM skill_ranks WHERE skill_id = ?", (s['id'],))
        s['ranks'] = [dict(r) for r in cursor.fetchall()]
        for r in s['ranks']:
            r['skill'] = {'id': s['id']}
    
    with open(OUTPUT_DIR / "skills.json", "w", encoding="utf-8") as f:
        json.dump(skills, f, ensure_ascii=False, indent=2)
    print(f"✅ Exported {len(skills)} skills")
    conn.close()

def export_weapons():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM weapons")
    rows = [dict(row) for row in cursor.fetchall()]
    for r in rows:
        r['sharpness'] = json.loads(r.pop('sharpness_json')) if r.get('sharpness_json') else None
        r['slots'] = json.loads(r.pop('slots_json')) if r.get('slots_json') else []
        r['skills'] = json.loads(r.pop('skills_json')) if r.get('skills_json') else []
        r['specials'] = json.loads(r.pop('specials_json')) if r.get('specials_json') else []
        r['damage'] = {'raw': r.pop('damage_raw'), 'display': r.pop('damage_display')}
    
    with open(OUTPUT_DIR / "weapons.json", "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
    print(f"✅ Exported {len(rows)} weapons")
    conn.close()

def export_armor():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM armor")
    rows = [dict(row) for row in cursor.fetchall()]
    for r in rows:
        r['slots'] = json.loads(r.pop('slots_json')) if r.get('slots_json') else []
        r['skills'] = json.loads(r.pop('skills_json')) if r.get('skills_json') else []
        r['defense'] = {'base': r.pop('defense_base'), 'max': r.pop('defense_max')}
        r['resistances'] = {
            'fire': r.pop('res_fire'),
            'water': r.pop('res_water'),
            'ice': r.pop('res_ice'),
            'thunder': r.pop('res_thunder'),
            'dragon': r.pop('res_dragon')
        }
        
        # Get armor set info
        if r.get('armor_set_id'):
            cursor.execute("SELECT name FROM armor_sets WHERE id = ?", (r['armor_set_id'],))
            set_row = cursor.fetchone()
            if set_row:
                r['armorSet'] = {'id': r.pop('armor_set_id'), 'name': set_row['name']}
            else:
                r.pop('armor_set_id')
        else:
            r.pop('armor_set_id')

    with open(OUTPUT_DIR / "armor.json", "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
    print(f"✅ Exported {len(rows)} armor pieces")
    conn.close()

def export_armor_sets():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM armor_sets")
    sets = [dict(row) for row in cursor.fetchall()]
    for s in sets:
        # Get bonuses
        cursor.execute('''
            SELECT pieces_required as pieces, level, skill_id 
            FROM armor_set_bonuses 
            WHERE armor_set_id = ?
        ''', (s['id'],))
        ranks = [dict(r) for r in cursor.fetchall()]
        
        # Reconstruct skill objects for bonuses
        for r in ranks:
            cursor.execute("SELECT name, description FROM skills WHERE id = ?", (r['skill_id'],))
            skill_info = cursor.fetchone()
            r['skill'] = {'id': r.pop('skill_id'), 'name': skill_info['name'], 'description': skill_info['description']}
        
        # Check if it has a primary bonus skill
        bonus_skill = None
        if s.get('bonus_skill_id'):
            cursor.execute("SELECT name, description FROM skills WHERE id = ?", (s['bonus_skill_id'],))
            skill_info = cursor.fetchone()
            bonus_skill = {'skill': {'id': s.pop('bonus_skill_id'), 'name': skill_info['name'], 'description': skill_info['description']}, 'ranks': ranks}
        else:
            s.pop('bonus_skill_id')
            
        s['bonus'] = bonus_skill

    with open(OUTPUT_DIR / "armor_sets.json", "w", encoding="utf-8") as f:
        json.dump(sets, f, ensure_ascii=False, indent=2)
    print(f"✅ Exported {len(sets)} armor sets")
    conn.close()

def export_decorations():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM decorations")
    rows = [dict(row) for row in cursor.fetchall()]
    for r in rows:
        r['skills'] = json.loads(r.pop('skills_json')) if r.get('skills_json') else []
        
    with open(OUTPUT_DIR / "decorations.json", "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
    print(f"✅ Exported {len(rows)} decorations")
    conn.close()

if __name__ == "__main__":
    if not Path(DB_PATH).exists():
        print(f"❌ Error: {DB_PATH} not found. Run ingestion scripts first.")
    else:
        export_skills()
        export_weapons()
        export_armor()
        export_armor_sets()
        export_decorations()
        print("\n🎉 All exports complete!")
