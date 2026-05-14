## Why

Visual cues are essential for a fast and intuitive user interface. In a Monster Hunter build crafter, the icon for each weapon type (Great Sword, Hammer, etc.) is as recognizable as its name. By adding these icons to the equipment menu and selection modal, we significantly improve the "scannability" of the app and bring it closer to the visual language of the actual game.

## What Changes

- **Asset Mapping**: We will implement a robust mapping utility to link weapon `kind` identifiers to their respective `.webp` assets in the `/image/` directory.
- **UI Integration (Main View)**: The `EquipmentSlot` component will be updated to display the weapon icon next to the weapon's name when a weapon is equipped.
- **UI Integration (Selection Modal)**: The `ItemSelectorModal` will be updated to show weapon icons in the search results, making it easier to distinguish between different weapon categories at a glance.

## Capabilities

### New Capabilities
- `visual-weapon-identifiers`: Adding graphical representation of weapon types to the UI.

### Modified Capabilities
- `equipment-management`: Enhancing the equipment display with visual assets.

## Impact

- **EquipmentSlot.jsx**: Addition of an `<img>` tag and associated styles for weapon icons.
- **ItemSelectorModal.jsx**: Addition of weapon icons to the item list rows.
- **Public Assets**: The existing `.webp` icons in `/image/` will be utilized.