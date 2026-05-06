## Why

Players have reported that skill-based stat bonuses (like Defense Boost or Elemental Resistances) are overriding the base stats provided by their armor and weapons. This results in displayed totals that are far lower than they should be, making the build crafter unreliable for actual optimization. We need to ensure that the stat engine correctly sums base equipment values and all active skill modifiers.

## What Changes

- **Logic Audit**: Verify and correct the `activeStats` calculation loop in `App.jsx`.
- **Initialization Fix**: Ensure `finalStats` is fully populated with all base values (Attack, Affinity, Defense, Resistances, Element) before any skill modifiers are processed.
- **Modifier consistency**: Ensure all `SKILL_MODIFIERS` return delta values that are added to the total, rather than replacement values.

## Capabilities

### New Capabilities
- `none`: This is a bug fix for an existing capability.

### Modified Capabilities
- `skill-stat-mapping`: Refining how skill levels map to cumulative stat changes.

## Impact

- **App.jsx**: The `activeStats` hook will be updated to guarantee additive accumulation of stats.
- **StatsPanel.jsx**: No changes expected, as it simply renders the provided data.
