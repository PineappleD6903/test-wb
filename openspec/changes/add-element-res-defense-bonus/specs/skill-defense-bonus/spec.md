## ADDED Requirements

### Requirement: Level 3 Synergy Bonus
The application must correctly apply the +10 Defense bonus when any elemental resistance skill reaches Level 3.

#### Scenario: Fire Resistance Level 3
- **WHEN** the hunter has "Fire Resistance" at Level 3
- **THEN** the total Fire Resistance should increase by 20
- **AND** the total Defense should increase by 10

### Requirement: Independent Stat Accumulation
The defense bonus from resistance skills must stack with other defense-boosting skills (like Defense Boost).

#### Scenario: Defense Stacking
- **WHEN** the hunter has "Defense Boost" Level 1 (+5 Defense)
- **AND** "Water Resistance" Level 3 (+10 Defense)
- **THEN** the total Defense bonus from skills should be 15
