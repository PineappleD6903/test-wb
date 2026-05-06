## 1. Utility Fix

- [x] 1.1 Update `getItemIconPath` in `src/utils/itemIcons.js` to correctly extract the identifier.
- [x] 1.2 Implement the fallback logic: check `WEAPON_ICON_MAP` first, then `ARMOR_ICON_MAP` using the same key.

## 2. Verification

- [x] 2.1 Equip any armor piece (Helm, Chest, etc.) and verify the icon remains visible in the slot.
- [x] 2.2 Verify that weapon icons still appear correctly when equipped.
- [x] 2.3 Verify that empty slots still display the correct placeholder icons.
