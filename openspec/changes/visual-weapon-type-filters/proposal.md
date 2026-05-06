## Why

The current weapon category filters in the `ItemSelectorModal` rely entirely on text, which creates a cluttered interface and requires more cognitive effort to parse. Monster Hunter's visual language is built around iconic weapon symbols. By transitioning from text to icons for these filters, we create a more immersive and efficient selection experience that aligns with how players naturally identify their equipment.

## What Changes

- **Icon-Based Filters**: The weapon type filter buttons will no longer display text by default. Instead, they will show the high-quality weapon icons from the `/image/` directory.
- **Contextual Tooltips**: To ensure clarity, the name of the weapon type will be displayed via a tooltip or a subtle label on hover.
- **Grid Optimization**: The filter layout will be adjusted to a more compact grid to accommodate the icons without taking up excessive vertical space in the modal.
- **Active State Highlighting**: The "Active" state for a filter will be visually enhanced with a gold glow/border to clearly indicate the currently selected category.

## Capabilities

### New Capabilities
- `icon-driven-navigation`: Replacing text-based category navigation with visual symbols.

### Modified Capabilities
- `equipment-management`: Updating the weapon filtering interface for better UX.

## Impact

- **ItemSelectorModal.jsx**: Major refactor of the `kind-filters` rendering logic and associated styles.
- **weaponIcons.js**: Will be the primary source for filter assets.
