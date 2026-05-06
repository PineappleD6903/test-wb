## ADDED Requirements

### Requirement: Armor Category Visuals
The equipment interface must provide a unique icon for every armor slot (Head, Chest, Arms, Waist, Legs).

#### Scenario: Chest Icon
- **WHEN** a chest piece is equipped
- **THEN** the icon "/image/chest.webp" must be visible next to the item name in the Equipment slot.

### Requirement: Placeholder Icons
Empty slots should provide visual context for the type of equipment they hold.

#### Scenario: Empty Helm Slot
- **WHEN** no head armor is equipped
- **THEN** a low-opacity version of "/image/head.webp" should be visible in the slot background or prefix.

### Requirement: Consistent Selection UI
The armor selection modal must show icons for each piece in the list.

#### Scenario: Selection Modal List
- **WHEN** the user opens the "Head" selector
- **THEN** every helm entry in the list should be prefixed with the helm icon.
