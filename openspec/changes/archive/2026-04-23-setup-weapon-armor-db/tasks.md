## 1. Database Infrastructure

- [x] 1.1 Create `db_manager.py` to handle SQLite connection and table creation.
- [x] 1.2 Define the SQL schema for `weapons`, `armor`, `skills`, `decorations`, and `armor_sets` tables.
- [x] 1.3 Implement a basic migration system to handle schema updates.

## 2. Data Ingestion Updates

- [x] 2.1 Refactor `weapons.py` to insert/update records in the `weapons` table.
- [x] 2.2 Create a utility to parse and ingest skill data into the `skills` and `skill_ranks` tables.
- [x] 2.3 Implement armor set bonus ingestion, linking pieces to their respective bonuses.

## 3. Frontend Integration & Export

- [x] 3.1 Create an `export_data.py` script that queries the SQLite database and generates the optimized JSON files for the `public/data` directory.
- [x] 3.2 Ensure the exported JSON format matches the existing structure used by `App.jsx`.
- [x] 3.3 Add a master script `sync_data.py` that runs the full pipeline: Fetch -> DB Ingest -> JSON Export.

## 4. Verification & Testing

- [x] 4.1 Verify database integrity by performing sample queries (e.g., counting items, checking relationships).
- [x] 4.2 Validate that the React frontend loads correctly with the newly exported data.
- [x] 4.3 Document the new data pipeline in a `README_DATA.md`.
