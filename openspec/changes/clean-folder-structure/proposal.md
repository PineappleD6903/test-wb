## Why

The root directory currently contains many Python source files (`fetch.py`, `export_data.py`, etc.), mixing them with configuration files, build outputs, and the frontend app directory. Moving these source files into the `src` folder (specifically into a `src/scripts` subdirectory or `src/` directly) will significantly clean up the root directory and organize the codebase.

## What Changes

- Move all Python source files (`db_manager.py`, `export_data.py`, `fetch.py`, `sync_data.py`, `verify_db.py`, `weapons.py`) from the root directory to `src/scripts/` (to keep them distinct from frontend React code).
- Update internal file paths in these scripts (like `mh_wilds.db` and `mh_wilds_data`) to use absolute paths based on `__file__` or relative paths that account for the new nested location, ensuring they still function correctly.
- Ensure the project remains runnable and data pipeline scripts can still execute successfully.

## Capabilities

### New Capabilities
- `folder-structure`: Establishes a clean root directory by organizing Python source files into the `src/scripts` directory.

### Modified Capabilities
- None

## Impact

- **Root Directory**: Will be much cleaner with only configuration, docs, and key folders (`src`, `public`, `docker`).
- **Data Pipeline**: Python scripts will run from `src/scripts/`. File paths internally rely on their location, so they must be updated to find data files in the root.
