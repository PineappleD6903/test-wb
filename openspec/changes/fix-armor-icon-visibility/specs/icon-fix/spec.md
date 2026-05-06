## ADDED Requirements

### Requirement: Persistent Armor Icons
Armor icons must persist in the `EquipmentSlot` once an armor piece is selected and equipped.

#### Scenario: Equipped Armor Icon
- **WHEN** an armor piece (e.g., "Conga Helm α") is equipped
- **AND** the component passes the item object to `getItemIconPath`
- **THEN** the function must correctly resolve the icon path based on the item's `kind` property.

### Requirement: Unified Property Support
The icon utility must handle variations in data structures between weapons and armor.

#### Scenario: Armor Object Lookup
- **WHEN** an object with `{ kind: "head" }` is passed to `getItemIconPath`
- **THEN** it must return `/image/armor/head.webp`.
