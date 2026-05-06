## 1. Asset Mapping Utility

- [x] 1.1 Create `src/utils/weaponIcons.js` with the mapping from `kind` to the specific `.webp` filenames in `/image/`.
- [x] 1.2 Implement a robust `getWeaponIconPath(kind)` helper function.

## 2. UI Implementation

- [x] 2.1 Update `EquipmentSlot.jsx` to import and use the mapping utility.
- [x] 2.2 Add an `<img>` tag next to the item name in `EquipmentSlot.jsx` (only if the item is a weapon).
- [x] 2.3 Update `ItemSelectorModal.jsx` to include weapon icons in the list items.
- [x] 2.4 Apply styling to ensure icons are vertically aligned and sized correctly (20-24px).

## 3. Verification

- [x] 3.1 Equip "Hope Rifle I" and verify the Light Bowgun icon appears.
- [x] 3.2 Equip "Iron Greatsword I" and verify the Great Sword icon appears (checking the misspelled filename mapping).
- [x] 3.3 Verify that armor pieces still show their default labels without any broken image icons.
