## Why

Currently, the Monster Hunter Wilds Build Crafter only calculates base stats from equipment pieces. While it has minimal support for `Attack Boost` and `Critical Eye`, other critical defensive skills like `Defense Boost` and various `Elemental Resistance` skills (Fire, Thunder, etc.) do not influence the displayed hunter stats. 

Integrating these skills is essential for providing an accurate representation of a hunter's survivability and for allowing players to properly optimize their builds against specific monsters.

## What Changes

- **Enhanced Stat Engine**: Update the `useMemo` hooks in `App.jsx` to apply skill-based modifiers to base equipment stats.
- **Support for Defensive Skills**:
    - `Defense Boost`: Adds flat defense and potentially percentage bonuses based on skill level.
    - `Elemental Resistances` (Fire, Water, Ice, Thunder, Dragon): Adds flat resistance values and provides "Blight Resistance" thresholds.
- **UI Feedback**: Ensure the `StatsPanel` correctly displays these modified values, potentially highlighting boosted stats.

## Capabilities

### New Capabilities
- `skill-stat-mapping`: A system to map specific skill levels to numeric stat modifiers.

### Modified Capabilities
- `none`: We are adding to the existing calculation engine rather than changing its fundamental requirements.

## Impact

- **App.jsx**: The `activeStats` calculation will be refactored to be "skill-aware".
- **Data Structure**: We may need to ensure `skills.json` rank data is consistent enough to be parsed for these modifiers, or implement a lookup table for common stat-boosting skills.
