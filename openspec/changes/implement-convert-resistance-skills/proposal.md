## Why

 Endgame builds in Monster Hunter Wilds often leverage synergy between defense and offense. The "Convert Resistance" skills are the centerpiece of these builds, allowing hunters to translate high elemental resistance into significant elemental attack power. Without these skills, the Build Crafter cannot accurately represent "tanky" offensive builds that are popular in the current meta.

## What Changes

- **Reactive Skill Modifiers**: Implement "Convert Thunder Resistance" and "Convert Water Resistance" in the `SKILL_MODIFIERS` system.
- **Conversion Formula**: Apply a ratio where every 1 point of the specified resistance grants +5 to the matching elemental attack power (e.g., 40 Thunder Res = +200 Thunder Attack).
- **Element Validation**: The bonus will only be granted if the weapon's primary element matches the skill's type.

## Capabilities

### New Capabilities
- `dynamic-stat-conversion`: Support for skills that calculate their bonus based on other active stats.

### Modified Capabilities
- `skill-stat-mapping`: Extending the mapping system to handle reactive, non-static bonuses.

## Impact

- **App.jsx**: Two new functions added to `SKILL_MODIFIERS` that read from the `stats` object passed during calculation.
