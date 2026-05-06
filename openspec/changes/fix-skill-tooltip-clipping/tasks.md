## 1. Global CSS Fix

- [x] 1.1 In `index.css`, change the `.panel` class from `overflow: hidden` to `overflow: visible`.
- [x] 1.2 Verify that panel background effects (pseudo-elements) still render correctly.

## 2. SkillSummary Tooltip Optimization

- [x] 2.1 In `SkillSummary.jsx`, increase the `z-index` of `.skill-tooltip` to `1100`.
- [x] 2.2 Refine the tooltip `transform` and `transition` for a smoother pop-out effect.
- [x] 2.3 Ensure the `right: calc(100% + 15px)` positioning correctly places the tooltip in the gutter between panels.

## 3. Verification

- [x] 3.1 Equip "Convert Thunder Resistance" and hover over it in the Skills panel.
- [x] 3.2 Confirm that the tooltip is fully visible and contains both the base description and rank 1 effect.
- [x] 3.3 Verify that the tooltip renders on top of the Stats panel if the screen is narrow.
