## Why

Active skill descriptions are currently inaccessible because the tooltips in the `SkillSummary` component are being clipped by the parent panel's `overflow: hidden` property. This is a critical UX issue as players need to see the exact effects of complex skills (like "Convert Resistance") to optimize their builds.

## What Changes

- **Clipping Fix**: Remove the `overflow: hidden` constraint from the `.panel` class in `index.css` to allow absolute-positioned tooltips to render outside their parent containers.
- **Tooltip Layout Optimization**: Adjust the `SkillSummary` tooltip positioning to ensure they appear reliably within the viewport and don't overlap other critical UI elements.
- **Visibility Assurance**: Verify that all skills (especially single-rank skills like "Convert Thunder Resistance") correctly display both their base description and their current level effect.

## Capabilities

### New Capabilities
- `none`: This is a UI/UX bug fix.

### Modified Capabilities
- `skill-summary-hover`: Improving the reliability and visibility of the skill hover state.

## Impact

- **index.css**: Update the `.panel` global style.
- **SkillSummary.jsx**: Adjust the tooltip CSS positioning and z-index.
