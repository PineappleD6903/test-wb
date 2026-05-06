## Why

The current skill list in the Build Crafter is functional but lacks context. Players often need to know the specific effects of a skill (e.g., how much attack "Attack Boost Level 3" actually provides) while browsing their build summary. Providing this information on hover makes the application more self-contained and professional.

## What Changes

- **Skill Tooltips**: Implement a dynamic tooltip system in the `SkillSummary` component.
- **Contextual Data**: When hovering over a skill, display:
    - The overall description of the skill.
    - The specific effect/description of the *current* active level of that skill.
- **Visual Refinement**: Add smooth transitions and premium styling for the hover state to maintain the "WOW" factor.

## Capabilities

### New Capabilities
- `ui-tooltip-system`: A reusable pattern for displaying metadata on hover across the application.

### Modified Capabilities
- `none`: This is a UI enhancement and does not change core requirements.

## Impact

- **SkillSummary.jsx**: Logic update to pull rank-specific descriptions from the `skillsDatabase`.
- **Styling**: Addition of tooltip CSS or hover-expansion styles.
