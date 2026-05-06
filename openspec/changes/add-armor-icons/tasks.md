## 1. Unified Utility Refactor

- [x] 1.1 Create `public/image/armor` directory and reorganize assets:
  - Move weapon icons to `public/image/weapons/`.
  - Move armor icons to `public/image/armor/`.
- [x] 1.2 Rename `src/utils/weaponIcons.js` to `src/utils/itemIcons.js`.
- [x] 1.3 Update the utility to include `ARMOR_ICON_MAP` (head, chest, arms, waist, legs -> lag.webp).
- [x] 1.4 Implement `getItemIconPath(itemOrType)` to handle both weapons (by kind) and armor (by type/string).

## 2. UI Updates

- [x] 2.1 Update all imports of `weaponIcons.js` to `itemIcons.js` (in `EquipmentSlot.jsx` and `ItemSelectorModal.jsx`).
- [x] 2.2 In `EquipmentSlot.jsx`, implement the icon display for armor pieces.
- [x] 2.3 In `EquipmentSlot.jsx`, add a dimmed placeholder icon for empty slots based on the category.
- [x] 2.4 In `ItemSelectorModal.jsx`, ensure armor icons are displayed in the selection list.

## 3. Verification

- [x] 3.1 Verify that equipping "Iron Helm" shows the Helm icon.
- [x] 3.2 Verify that an empty "Chest" slot shows a dimmed Chest icon placeholder.
- [x] 3.3 Verify that "Iron Legs" correctly maps to `lag.webp`.
- [x] 3.4 Verify that weapons still show their correct icons (GS, Bow, etc.).
