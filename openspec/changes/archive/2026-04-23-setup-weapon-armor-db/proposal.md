## Why

The current implementation of the Monster Hunter Wilds Build Crafter relies on static JSON files (~10MB total) for weapon and armor data. This approach has several drawbacks:
- **Inefficiency**: Loading and parsing large JSON files on every page load is slow.
- **Limited Querying**: Filtering and searching are performed in-memory on the client side, which is limited by browser performance.
- **Data Maintenance**: Updating or merging new data is error-prone when dealing with massive flat files.

Moving to a structured SQLite database on the local machine will enable:
- Efficient data management and relationships (e.g., armor set bonuses).
- Complex querying and filtering during the data processing phase.
- A foundation for a more robust backend or local API.

## What Changes

- **Database Initialization**: Create a SQLite database (`mh_wilds.db`) in the project root.
- **Schema Design**: Define tables for `weapons`, `armor`, `skills`, `decorations`, and `armor_sets`.
- **Data Migration**: Update the existing Python scripts (`weapons.py`, `fetch.py`) to insert fetched data into the database instead of (or in addition to) JSON files.
- **Export Utility**: A script to generate optimized JSON snapshots from the database for the frontend to consume (maintaining current frontend functionality while improving the data pipeline).

## Capabilities

### New Capabilities
- `database-storage`: A centralized SQLite database for all MH Wilds data.
- `schema-management`: Structured tables for weapons, armor, and skills.
- `data-ingestion-v2`: Updated ingestion scripts that handle SQL inserts/updates.

### Modified Capabilities
- `none`: No existing core capabilities are being fundamentally redefined.

## Impact

- **Build Pipeline**: The data update process will now involve a SQL ingestion step.
- **Dependencies**: Adds `sqlite3` (built-in to Python) to the data pipeline requirements.
- **File Structure**: New `.db` file and potentially SQL schema files in the project root.
