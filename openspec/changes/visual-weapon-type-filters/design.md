## Context

The `ItemSelectorModal` uses a horizontal/grid filter bar to narrow down weapons by type. Currently, these filters are text-based buttons (e.g., "Great Sword"). While functional, they are visually heavy and don't match the premium, asset-rich look of the rest of the application.

## Goals / Non-Goals

**Goals:**
- Transition the weapon category filters from text to icon-based buttons.
- Create a compact, efficient grid for these icons.
- Maintain usability for players who may not recognize all icons immediately.

**Non-Goals:**
- Animating the icons.
- Changing the filtering logic (keeping the existing `setSelectedKind` behavior).

## Decisions

- **Icon Grid Layout**: The `kind-filters` container will be refactored to use a denser grid: `grid-template-columns: repeat(auto-fill, minmax(50px, 1fr))`. This allows all weapon types to fit within a small area.
- **Button Design**: Each button will contain an `<img>` tag using `getWeaponIconPath(kind)`. The button itself will act as a frame with `active` states providing a gold glow.
- **"All Types" Special Case**: The "All Types" button will be kept as a small text button ("ALL") to distinguish it from specific weapon categories.
- **Labels**: I will use the `title` attribute on each button to provide the weapon name on hover, ensuring the UI remains accessible.
- **Scaling**: Icons will be sized to `28px` to ensure they feel prominent but don't overwhelm the modal.

## Risks / Trade-offs

- **Cognitive Load**: For very new players, icons alone might be confusing. The hover tooltips are the primary mitigation for this.
- **Asset Loading**: We are adding ~14 more image requests to the modal open, but since they are small `.webp` files, the performance impact should be negligible.
