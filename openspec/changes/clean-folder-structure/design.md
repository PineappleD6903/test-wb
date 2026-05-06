## Context

The current root directory contains multiple Python source files (`db_manager.py`, `export_data.py`, `fetch.py`, `sync_data.py`, `verify_db.py`, `weapons.py`) alongside configuration files like `package.json`, `vite.config.js`, and the frontend codebase in `src/`. This clutters the root directory and mixes backend data-pipeline scripts with the frontend entry points.

## Goals / Non-Goals

**Goals:**
- Move all Python source files to `src/scripts/` to clean up the root.
- Update internal file paths in these scripts so they can still locate the SQLite database (`mh_wilds.db`) and output data directories (`mh_wilds_data`) which should remain in the root directory.

**Non-Goals:**
- Refactoring the internal logic of the Python scripts.
- Moving the SQLite database (`mh_wilds.db`) or the `mh_wilds_data` directory out of the root (these are data, not source code).

## Decisions

- **Location:** The scripts will be moved to `src/scripts/` rather than directly into `src/` to prevent mixing Python files directly with React components and frontend entry points.
- **Path Resolution:** The scripts currently use `Path("mh_wilds.db")` which relies on the Current Working Directory (CWD). To make them robust regardless of where they are executed from, we will update them to resolve relative to `__file__`. For example:
  `ROOT_DIR = Path(__file__).resolve().parent.parent.parent`
  `DB_PATH = ROOT_DIR / "mh_wilds.db"`
  `OUTPUT_DIR = ROOT_DIR / "mh_wilds_data"`

## Risks / Trade-offs

- [Risk] Python scripts imported from other Python scripts might break if imports aren't updated correctly.
  - Mitigation: All Python scripts are moved together to `src/scripts/`, so relative imports or sibling module resolutions will continue to work naturally.
- [Risk] Existing documentation or external workflows might expect scripts to be in the root directory.
  - Mitigation: The change will be clearly documented. If there are GitHub actions or npm scripts running these, they might need updates (but currently none appear to be configured in `package.json`).
