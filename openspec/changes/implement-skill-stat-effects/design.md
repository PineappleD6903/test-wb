## Context

The current stat calculation in `App.jsx` is split between `activeStats` (base equipment stats) and `activeSkills` (where some skills are manually applied to the `activeStats` object). This mutation of the `activeStats` object inside the `activeSkills` hook is brittle and hard to extend for defensive skills.

## Goals / Non-Goals

**Goals:**
- Implement a clean, unified stat calculation pipeline.
- Support `Defense Boost`, `Fire Resistance`, `Water Resistance`, `Ice Resistance`, `Thunder Resistance`, and `Dragon Resistance`.
- Allow for easy addition of new skill effects in the future.

**Non-Goals:**
- Implementing complex conditional skills (e.g., "Attack Up when health is low") in this phase.
- Changing the `StatsPanel` UI layout (only updating the data it receives).

## Decisions

- **Pipeline Refactor**:
    1. Calculate `rawEquipmentStats` (sum of all armor/weapon base stats).
    2. Calculate `activeSkills` (sum of all inherent and slotted skills).
    3. Calculate `finalStats` by applying `activeSkills` modifiers to `rawEquipmentStats`.
- **Modifier Lookup Table**: Use a configuration object to define how each skill level affects specific stats.
    - Example: `Fire Resistance: { 1: { res_fire: 6 }, 2: { res_fire: 12 }, 3: { res_fire: 20 } }`
- **Immutability**: Ensure we are creating new objects during each step of the memoized calculation to prevent React render issues.

## Risks / Trade-offs

- **Performance**: Recalculating the entire stat block on every equipment change is fast enough for 6-8 items, but we should keep the lookup logic efficient.
- **Data Consistency**: Some skills in Wilds might have non-linear scaling. The lookup table approach handles this better than simple multiplication.
