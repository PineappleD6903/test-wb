## Context

The application now contains high-quality `.webp` assets for all equipment categories. Weapon icons are already integrated, and we need to apply the same visual logic to Armor pieces to achieve a cohesive UI.

## Goals / Non-Goals

**Goals:**
- Create a unified utility to resolve icons for any item (Weapon or Armor).
- Integrate Armor icons into `EquipmentSlot` and `ItemSelectorModal`.
- Support visual placeholders for empty armor slots.

**Non-Goals:**
- Creating new icons (only using existing ones).
- Modifying the item data structure.

## Decisions

- **Unified Utility**: I will rename/refactor `src/utils/weaponIcons.js` to `src/utils/itemIcons.js`. It will export a primary function `getItemIconPath(itemOrType)` that determines the asset based on the following logic:
  - If the input has a `kind` (Weapon): resolve to `/image/weapons/<mapped_filename>`.
  - If the input is a string or has a `type` (Armor): resolve to `/image/armor/<mapped_filename>`.
    - `head` → `head.webp`
    - `chest` → `chest.webp`
    - `arms` → `arm.webp`
    - `waist` → `waist.webp`
    - `legs` → `lag.webp`
- **Placeholder Implementation**: In `EquipmentSlot.jsx`, if `item` is null, I will use the `type` prop to fetch and display a low-opacity icon as a visual cue.
- **Styling Parity**: Armor icons will share the same sizing and drop-shadow effects as weapon icons to maintain consistency.

## Risks / Trade-offs

- **Asset Naming**: The file `lag.webp` is a typo for "Legs". I will map it explicitly in the code rather than renaming the file to avoid potential broken references if other components depend on it (though currently none do).
