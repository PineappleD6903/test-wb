## ADDED Requirements

### Requirement: Weapon Type Visuals
The equipment interface must provide a unique icon for every weapon category to aid in quick identification.

#### Scenario: Great Sword Icon
- **WHEN** a weapon of kind "great-sword" is equipped
- **THEN** the icon "/image/grate-sword.webp" must be visible next to the weapon name.

### Requirement: Consistent Selection UI
The weapon selection modal must maintain parity with the main equipment slots by showing weapon icons in the search results.

#### Scenario: Selection Modal List
- **WHEN** the user opens the "Weapon" selector
- **THEN** every weapon entry in the list should be prefixed with its corresponding weapon category icon.
