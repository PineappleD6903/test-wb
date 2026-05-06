## Why

With the successful integration of weapon icons, the application now has a high-quality visual standard. However, the armor slots remain text-only, creating a visual imbalance. Adding specific icons for Head, Chest, Arms, Waist, and Legs will provide a consistent and premium experience across the entire equipment suite, making the build crafter feel like a unified "Guild Hub" tool.

## What Changes

- **Asset Mapping Expansion**: We will extend our icon mapping utility to include the new armor assets (`head.webp`, `chest.webp`, `arm.webp`, etc.).
- **Unified Icon Helper**: We will refactor the existing `getWeaponIconPath` logic into a more flexible `getItemIconPath` that handles both weapon types and armor categories.
- **UI Integration**:
  - `EquipmentSlot` will display the armor icon next to the equipped piece's name.
  - `ItemSelectorModal` will display the category icon next to each entry in the selection list.
- **Placeholder Visuals**: Empty slots in the main view will now show a subtle, themed icon placeholder instead of just text.

## Capabilities

### New Capabilities
- `visual-armor-identifiers`: Providing graphical representations for all armor categories.

### Modified Capabilities
- `equipment-management`: Enhancing the overall equipment display with a complete set of visual assets.

## Impact

- **EquipmentSlot.jsx**: Addition of armor icon rendering and placeholder styling.
- **ItemSelectorModal.jsx**: Integration of armor icons into the item list rows.
- **src/utils/itemIcons.js**: Creation of a unified mapping utility (refactored from `weaponIcons.js`).
