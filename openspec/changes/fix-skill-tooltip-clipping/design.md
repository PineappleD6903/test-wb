## Context

The UI layout uses a grid where the `SkillSummary` is located in the bottom-right panel. The current CSS positions tooltips to the left of the skill items using `right: 100%`. Because the parent `.panel` has `overflow: hidden`, these tooltips are cut off as soon as they cross the panel boundary.

## Goals / Non-Goals

**Goals:**
- Make skill tooltips fully visible on hover.
- Ensure tooltips render on top of adjacent panels.
- Maintain the "Gold Glow" border effects of the panels.

**Non-Goals:**
- Changing the overall grid layout.
- Implementing a generic tooltip library (keeping it lightweight with custom CSS).

## Decisions

- **CSS Overflow**: Change `.panel` to `overflow: visible`. The background gradient and pseudo-elements will still work, but child elements will no longer be clipped.
- **Enhanced Tooltip Positioning**: In `SkillSummary.jsx`, keep the `right: 100%` positioning but ensure `z-index` is high enough to cross panel boundaries.
- **Alignment Refinement**: Adjust the tooltip's `transform` to ensure it aligns perfectly with the hovered item, providing a premium "docked" feel.

## Risks / Trade-offs

- **Background Clipping**: Removing `overflow: hidden` from panels might cause some background effects to "leak" if they aren't properly contained. I will verify that the `::before` pseudo-element doesn't cause visual artifacts.
