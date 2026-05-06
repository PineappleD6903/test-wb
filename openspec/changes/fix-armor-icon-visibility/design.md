## Context

The `getItemIconPath` utility was designed with a logical split between weapons (using `kind`) and armor (using `type`). However, the actual application data for armor pieces also uses the `kind` property. This caused a breakdown in icon resolution once an armor piece was equipped, as the function would fail to find a `type` property on the armor object.

## Goals / Non-Goals

**Goals:**
- Fix the regression where armor icons disappear upon selection.
- Simplify the lookup logic to be property-agnostic (focusing on the "identifier" rather than the specific field name).

**Non-Goals:**
- Changing the folder structure.
- Modifying component-level rendering.

## Decisions

- **Property Normalization**: I will refactor `getItemIconPath` to consolidate the identifier extraction. It will look for `itemOrType.kind` OR `itemOrType.type` OR the string itself.
- **Hierarchical Lookup**:
  1. Extract the identifier (e.g., "head" or "great-sword").
  2. Check against `WEAPON_ICON_MAP`. If found, return the weapons path.
  3. Check against `ARMOR_ICON_MAP`. If found, return the armor path.
- **Support for All Inputs**: This approach correctly handles:
  - Equipped Weapons (objects with `kind`)
  - Equipped Armor (objects with `kind`)
  - Empty Slots (type strings like "head" passed as the argument)

## Risks / Trade-offs

- **Collision Risk**: There is a theoretical risk if a weapon `kind` matches an armor `kind`. However, since the lists are manually curated in the mapping file, this is easily avoided and currently doesn't exist.
