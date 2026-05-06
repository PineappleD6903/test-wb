## Why

In Monster Hunter Wilds, elemental resistance skills provide a defensive synergy at their maximum level (Level 3). While Levels 1 and 2 purely boost elemental resistance, Level 3 provides both a significant resistance jump and a flat +10 Defense bonus. Currently, the Build Crafter ignores this defense bonus, resulting in incorrect total defense values for builds that utilize these protection skills.

## What Changes

- **Skill Modifier Refinement**: The `SKILL_MODIFIERS` for Fire, Water, Ice, Thunder, and Dragon Resistance will be updated.
- **Dual-Stat Support**: These modifiers will now return both `resistances` and `defense` deltas when the skill level is 3.

## Capabilities

### New Capabilities
- `none`: This is an enhancement of existing skill mappings.

### Modified Capabilities
- `skill-stat-mapping`: Extending the mapping to support multi-stat deltas from a single skill.

## Impact

- **App.jsx**: The `SKILL_MODIFIERS` lookup table will be updated to include the defense bonus for Level 3 resistance skills.
