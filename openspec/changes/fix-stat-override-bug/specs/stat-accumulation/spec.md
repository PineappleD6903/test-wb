## ADDED Requirements

### Requirement: Strict Additive Stats
The stat engine must ensure that skill modifiers always add to the existing base values rather than replacing them.

#### Scenario: Defense Accumulation
- **WHEN** an armor piece provides 10 Defense
- **AND** a "Defense Boost" skill provides 5 Defense
- **THEN** the total Defense displayed in the StatsPanel must be 15

### Requirement: Resistance Accumulation
Elemental resistances from skills must be added to the base resistances provided by armor.

#### Scenario: Fire Resistance Summation
- **WHEN** an armor set has -5 Fire Resistance
- **AND** a "Fire Resistance" skill provides +6 Fire Resistance
- **THEN** the resulting Fire Resistance must be 1

### Requirement: State Isolation
Modifying a stat via a skill must not mutate the original equipment data or the base stat calculation object.
