## Why

Users have reported that armor icons disappear as soon as an item is equipped, even though they appear correctly as placeholders in empty slots. This bug breaks the visual consistency of the "equipped" state and stems from the `getItemIconPath` utility expecting a `type` property on armor objects, while the actual data structure uses `kind`. Fix is required to restore persistent iconography across all equipment states.

## What Changes

- **Utility Logic Correction**: We will update `getItemIconPath` in `src/utils/itemIcons.js` to properly handle the `kind` property for both weapons and armor. 
- **Mapping Fallback**: The function will be updated to first check for weapon mappings and then fall back to armor mappings using the same `kind` identifier, ensuring that regardless of whether an item is being "placeholder-ed" (string) or "equipped" (object), the correct icon is returned.

## Capabilities

### New Capabilities
- N/A (Bug fix)

### Modified Capabilities
- `visual-armor-identifiers`: Ensuring icons remain persistent after selection.

## Impact

- **src/utils/itemIcons.js**: The core logic for resolving asset paths will be updated to handle the `kind` property correctly for all equipment types.
