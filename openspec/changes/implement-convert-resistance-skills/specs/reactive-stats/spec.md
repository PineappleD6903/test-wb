## ADDED Requirements

### Requirement: Thunder Resistance Conversion
The application must correctly convert positive Thunder Resistance into Thunder Elemental attack power.

#### Scenario: Basic Thunder Conversion
- **WHEN** the hunter has 18 Thunder Resistance
- **AND** "Convert Thunder Resistance" is active
- **AND** the weapon has the "Thunder" element
- **THEN** the weapon's Thunder attack should increase by 90 (18 * 5)

### Requirement: Dependency Resolution
"Convert" skills must calculate their bonus using the final resistance values, including bonuses from other skills.

#### Scenario: Stacked Thunder Resistance
- **WHEN** the hunter has 10 base Thunder Resistance
- **AND** has "Thunder Resistance" Level 1 (+6 Resistance)
- **AND** "Convert Thunder Resistance" is active
- **THEN** the conversion should be based on 16 Resistance (10 + 6)
- **AND** the total Thunder attack bonus should be 80 (16 * 5)

### Requirement: Positive Clipping
Resistance values below zero must not reduce elemental attack power via conversion skills.

#### Scenario: Negative Resistance
- **WHEN** the hunter has -5 Thunder Resistance
- **AND** "Convert Thunder Resistance" is active
- **THEN** the elemental attack bonus should be 0
