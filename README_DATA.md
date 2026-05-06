# MH Wilds Build Crafter - Data Pipeline

This project uses a structured SQLite database to manage game data, providing better integrity and queryability than raw JSON files.

## Pipeline Overview

The data flow is orchestrated by `sync_data.py`:

```
[External API] --(Fetch)--> [Python Scripts] --(Ingest)--> [SQLite DB] --(Export)--> [Frontend JSON]
```

## Scripts

- **`sync_data.py`**: The master script. Run this to update everything.
- **`db_manager.py`**: Handles database connection and schema creation.
- **`weapons.py`**: Fetches weapon data and ingests it into the `weapons` table.
- **`fetch.py`**: Fetches armor, sets, skills, and decorations and ingests them into the DB.
- **`export_data.py`**: Queries the SQLite database to generate the optimized JSON files in `public/data/`.
- **`verify_db.py`**: Run this to see current database statistics and verify integrity.

## Database Schema

- **`skills`**: Unique skill names and descriptions.
- **`skill_ranks`**: Level-specific descriptions for each skill.
- **`weapons`**: Main weapon stats including raw/display damage and affinity.
- **`armor`**: Individual armor pieces linked to armor sets.
- **`armor_sets`**: Collections of armor pieces and their associated set bonuses.
- **`decorations`**: Slotable gems and their skill effects.

## Local Development

To update the data locally:
1. Ensure you have Python installed.
2. Run `python sync_data.py`.
3. The script will fetch the latest data, update `mh_wilds.db`, and overwrite the JSON files in `public/data/`.
