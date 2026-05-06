## Context

Data analysis of `skills.json` reveals that "Fire Resistance", "Water Resistance", "Ice Resistance", "Thunder Resistance", and "Dragon Resistance" all share a common progression:
- Level 1: +6 Res
- Level 2: +12 Res
- Level 3: +20 Res AND +10 Defense

Our current `SKILL_MODIFIERS` only implement the resistance portion.

## Goals / Non-Goals

**Goals:**
- Update all 5 elemental resistance modifiers to include the +10 defense bonus at Level 3.
- Ensure the +20 resistance bonus remains active at Level 3.

**Non-Goals:**
- Implementing the "Defense Boost" skill (which is already implemented separately).
- Changing the resistance values for levels 1 and 2.

## Decisions

- **Modifier Pattern Update**: The functions in `SKILL_MODIFIERS` will be updated to return a more complex object at Level 3.
  Example for Fire Resistance:
  ```javascript
  'Fire Resistance': (level) => {
    const res = [0, 6, 12, 20][level] || 0;
    const def = level === 3 ? 10 : 0;
    return { resistances: { fire: res }, defense: def };
  }
  ```
- **Engine Compatibility**: Since the `activeStats` hook already processes `mods.defense` and `mods.resistances` in parallel, this change is fully backward compatible and requires zero logic changes in the main loop.

## Risks / Trade-offs

- **Redundancy**: This adds a small amount of code to 5 modifier functions, but it's the cleanest way to represent the game's mechanics without over-complicating the skill system.
