## ADDED Requirements

### Requirement: Elemental Damage Extraction
The application must extract elemental or status damage from the active weapon's `specials` metadata.

#### Scenario: Fire Weapon Selected
- **WHEN** a weapon with a "Fire" element of value 11 is selected
- **THEN** the internal state should reflect a "fire" element with a display value of 110 (11 * 10 or from the data's `display` field)

### Requirement: Conditional Elemental Boosting
Skills that boost specific elements must only apply their bonuses if the weapon's element type matches.

#### Scenario: Fire Attack skill with Water Weapon
- **WHEN** the hunter has the "Fire Attack" skill and a "Water" weapon equipped
- **THEN** the Fire Attack skill should provide no bonus to the weapon's elemental damage

#### Scenario: Fire Attack skill with Fire Weapon
- **WHEN** the hunter has "Fire Attack" Level 1 (+20 Fire) and a weapon with 100 Fire damage
- **THEN** the total Fire damage displayed should be 120

### Requirement: StatsPanel Display
The `StatsPanel` must dynamically show the weapon's primary element if one exists.

#### Scenario: Weapon with Element
- **WHEN** the active weapon has 150 Thunder damage
- **THEN** the StatsPanel should display a "Thunder" row with the value "150"
