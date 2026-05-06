## ADDED Requirements

### Requirement: Python source files in src folder
All Python source files (e.g., `db_manager.py`, `fetch.py`, `export_data.py`) MUST reside within the `src/scripts` directory rather than the project root.

#### Scenario: Verify folder cleanliness
- **WHEN** listing the root directory
- **THEN** no `.py` files are present in the root
- **AND** the python scripts are located in `src/scripts/`

### Requirement: Robust file path resolution
The Python scripts MUST correctly locate the `mh_wilds.db` database and `mh_wilds_data` directory regardless of the current working directory from which they are executed.

#### Scenario: Running data fetch
- **WHEN** `python src/scripts/fetch.py` is executed from the root directory
- **THEN** it correctly creates or updates `mh_wilds_data` in the root directory and writes to `mh_wilds.db` in the root directory
