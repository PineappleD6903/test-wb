## 1. Directory Setup

- [x] 1.1 Create `src/scripts/` directory.

## 2. Refactor Code Paths

- [x] 2.1 Update `db_manager.py` to resolve `DB_PATH` using `__file__` (e.g., `Path(__file__).resolve().parent.parent.parent / "mh_wilds.db"`).
- [x] 2.2 Update `fetch.py` to resolve `OUTPUT_DIR` using `__file__` (e.g., `Path(__file__).resolve().parent.parent.parent / "mh_wilds_data"`).
- [x] 2.3 Verify and update `export_data.py` data paths if necessary.
- [x] 2.4 Verify and update `sync_data.py` data paths if necessary.
- [x] 2.5 Verify and update `verify_db.py` data paths if necessary.
- [x] 2.6 Verify and update `weapons.py` data paths if necessary.

## 3. Move Files

- [x] 3.1 Move `db_manager.py`, `export_data.py`, `fetch.py`, `sync_data.py`, `verify_db.py`, `weapons.py` into `src/scripts/`.
- [x] 3.2 Verify no `.py` source files remain in the root directory.
