## ADDED Requirements

### Requirement: SQLite Database Creation
The system must initialize a local SQLite database file named `mh_wilds.db` in the project root if it does not already exist.

#### Scenario: First-time setup
- **WHEN** the setup script is run for the first time
- **THEN** a `mh_wilds.db` file is created and schema initialization begins

### Requirement: Weapon Data Storage
The database must store weapon data including name, kind, damage (raw/display), affinity, slots, and skills.

#### Scenario: Inserting weapon data
- **WHEN** a weapon record is fetched from the API
- **THEN** it is inserted or updated in the `weapons` table with all relevant fields mapped

### Requirement: Armor Data Storage
The database must store armor data including kind (head, chest, etc.), defense (base/max), resistances, slots, and skills.

#### Scenario: Querying armor by kind
- **WHEN** querying for "head" armor pieces
- **THEN** only records with `kind = 'head'` are returned

### Requirement: Set Bonus Relationships
The database must maintain relationships between armor pieces and their set bonuses.

#### Scenario: Retrieving set bonus for an armor piece
- **WHEN** an armor piece ID is provided
- **THEN** the corresponding set bonus ranks and requirements can be retrieved via a JOIN
