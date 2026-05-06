import sqlite3
import json
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
DB_PATH = ROOT_DIR / "mh_wilds.db"

class DatabaseManager:
    def __init__(self, db_path=DB_PATH):
        self.db_path = db_path
        self.conn = None
        self.cursor = None

    def connect(self):
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row
        self.cursor = self.conn.cursor()

    def close(self):
        if self.conn:
            self.conn.close()

    def create_schema(self):
        self.connect()
        
        # Skills table
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS skills (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                description TEXT
            )
        ''')

        # Skill Ranks table
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS skill_ranks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                skill_id INTEGER,
                level INTEGER,
                description TEXT,
                FOREIGN KEY (skill_id) REFERENCES skills (id),
                UNIQUE(skill_id, level)
            )
        ''')

        # Armor Sets table
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS armor_sets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                bonus_skill_id INTEGER,
                FOREIGN KEY (bonus_skill_id) REFERENCES skills (id)
            )
        ''')

        # Armor Set Bonuses (Piece thresholds)
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS armor_set_bonuses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                armor_set_id INTEGER,
                pieces_required INTEGER,
                skill_id INTEGER,
                level INTEGER,
                FOREIGN KEY (armor_set_id) REFERENCES armor_sets (id),
                FOREIGN KEY (skill_id) REFERENCES skills (id)
            )
        ''')

        # Weapons table
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS weapons (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                kind TEXT NOT NULL,
                rarity INTEGER,
                damage_raw INTEGER,
                damage_display INTEGER,
                affinity INTEGER,
                sharpness_json TEXT,
                slots_json TEXT,
                skills_json TEXT,
                specials_json TEXT
            )
        ''')

        # Armor table
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS armor (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                kind TEXT NOT NULL,
                rarity INTEGER,
                defense_base INTEGER,
                defense_max INTEGER,
                res_fire INTEGER,
                res_water INTEGER,
                res_ice INTEGER,
                res_thunder INTEGER,
                res_dragon INTEGER,
                slots_json TEXT,
                skills_json TEXT,
                armor_set_id INTEGER,
                FOREIGN KEY (armor_set_id) REFERENCES armor_sets (id)
            )
        ''')

        # Decorations table
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS decorations (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                rarity INTEGER,
                level INTEGER,
                skills_json TEXT
            )
        ''')

        self.conn.commit()
        self.close()

    def save_skill(self, skill_data):
        """Saves a skill and its ranks to the database."""
        name = skill_data.get('name')
        description = skill_data.get('description')
        
        self.cursor.execute('INSERT OR IGNORE INTO skills (name, description) VALUES (?, ?)', (name, description))
        self.cursor.execute('SELECT id FROM skills WHERE name = ?', (name,))
        skill_id = self.cursor.fetchone()[0]
        
        # Save ranks if present
        if 'ranks' in skill_data:
            for rank in skill_data['ranks']:
                self.cursor.execute('''
                    INSERT OR REPLACE INTO skill_ranks (skill_id, level, description)
                    VALUES (?, ?, ?)
                ''', (skill_id, rank.get('level'), rank.get('description')))
        
        return skill_id

    def save_armor_set(self, set_data):
        """Saves an armor set and its bonuses."""
        name = set_data.get('name')
        
        # Save bonus skill if present
        bonus_skill_id = None
        if 'bonus' in set_data:
            bonus_skill_id = self.save_skill(set_data['bonus']['skill'])
            
        self.cursor.execute('INSERT OR IGNORE INTO armor_sets (name, bonus_skill_id) VALUES (?, ?)', (name, bonus_skill_id))
        self.cursor.execute('SELECT id FROM armor_sets WHERE name = ?', (name,))
        set_id = self.cursor.fetchone()[0]

        # Save set bonuses (thresholds)
        if 'bonus' in set_data and 'ranks' in set_data['bonus']:
            for rank in set_data['bonus']['ranks']:
                skill_id = self.save_skill(rank['skill'])
                self.cursor.execute('''
                    INSERT OR REPLACE INTO armor_set_bonuses (armor_set_id, pieces_required, skill_id, level)
                    VALUES (?, ?, ?, ?)
                ''', (set_id, rank.get('pieces'), skill_id, rank.get('level')))
        
        return set_id

    def insert_weapon(self, weapon_data):
        """Inserts a weapon record into the database."""
        weapon_id = weapon_data.get('id') or f"w_{weapon_data.get('name')}"
        
        self.cursor.execute('''
            INSERT OR REPLACE INTO weapons (
                id, name, kind, rarity, damage_raw, damage_display, affinity, 
                sharpness_json, slots_json, skills_json, specials_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            weapon_id,
            weapon_data.get('name'),
            weapon_data.get('kind'),
            weapon_data.get('rarity'),
            weapon_data.get('damage', {}).get('raw'),
            weapon_data.get('damage', {}).get('display'),
            weapon_data.get('affinity'),
            json.dumps(weapon_data.get('sharpness')),
            json.dumps(weapon_data.get('slots')),
            json.dumps(weapon_data.get('skills')),
            json.dumps(weapon_data.get('specials'))
        ))

    def insert_armor(self, armor_data):
        """Inserts an armor record into the database."""
        armor_id = armor_data.get('id') or f"a_{armor_data.get('name')}"
        
        # Handle armor set
        set_id = None
        if 'armorSet' in armor_data:
            set_id = self.save_armor_set(armor_data['armorSet'])

        res = armor_data.get('resistances', {})
        self.cursor.execute('''
            INSERT OR REPLACE INTO armor (
                id, name, kind, rarity, defense_base, defense_max, 
                res_fire, res_water, res_ice, res_thunder, res_dragon, 
                slots_json, skills_json, armor_set_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            armor_id,
            armor_data.get('name'),
            armor_data.get('kind'),
            armor_data.get('rarity'),
            armor_data.get('defense', {}).get('base'),
            armor_data.get('defense', {}).get('max'),
            res.get('fire', 0),
            res.get('water', 0),
            res.get('ice', 0),
            res.get('thunder', 0),
            res.get('dragon', 0),
            json.dumps(armor_data.get('slots')),
            json.dumps(armor_data.get('skills')),
            set_id
        ))

    def insert_decoration(self, deco_data):
        """Inserts a decoration record."""
        deco_id = deco_data.get('id') or f"d_{deco_data.get('name')}"
        self.cursor.execute('''
            INSERT OR REPLACE INTO decorations (id, name, rarity, level, skills_json)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            deco_id,
            deco_data.get('name'),
            deco_data.get('rarity'),
            deco_data.get('level'),
            json.dumps(deco_data.get('skills'))
        ))

if __name__ == "__main__":
    db = DatabaseManager()
    print(f"Initializing database at {DB_PATH}...")
    db.create_schema()
    print("Success: Schema created successfully.")
