## ADDED Requirements

### Requirement: Defense Boost Integration
Active levels of the "Defense Boost" skill must be added to the total hunter defense calculated from armor pieces.

#### Scenario: Defense Boost Level 3
- **WHEN** the hunter has "Defense Boost" Level 3 equipped
- **THEN** the total defense should increase by the value defined for Level 3 (typically +10 or similar)

### Requirement: Elemental Resistance Integration
Active levels of elemental resistance skills (Fire, Water, Ice, Thunder, Dragon) must be added to the corresponding resistance stat.

#### Scenario: Fire Resistance Level 1
- **WHEN** the hunter has "Fire Resistance" Level 1 equipped
- **THEN** the Fire Resistance stat should increase by +6

### Requirement: Cumulative Stat Calculation
The stat engine must correctly sum base equipment stats and all active skill bonuses before rendering.

#### Scenario: Multiple Stat Modifiers
- **WHEN** a hunter has a weapon with 0 affinity and "Critical Eye" Level 5 (+20% affinity)
- **THEN** the affinity stat in the StatsPanel should show 20%
