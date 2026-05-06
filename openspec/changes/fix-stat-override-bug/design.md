## Context

The stat engine follows a pipeline: `Raw Equipment Stats` -> `Skill Modifiers` -> `Final Stats`. The user reports that skill modifiers are overriding rather than adding to the equipment stats.

## Goals / Non-Goals

**Goals:**
- Ensure all stat modifications are strictly additive.
- Verify that `baseStats` are correctly preserved during the `activeStats` calculation.
- Fix any potential state mutation bugs.

**Non-Goals:**
- Changing the UI layout of the `StatsPanel`.
- Implementing percentage-based multipliers (these will be added later).

## Decisions

- **Additive Accumulation**: We will audit the `activeStats` loop and ensure it uses a clean accumulation pattern.
- **Deep Cloning**: We will double-check that `resistances` and `element` sub-objects are deeply cloned from `baseStats` to prevent reference sharing that might cause "overriding" behavior if multiple skills modify the same nested object.
- **Null Checks**: Ensure that skills with value `0` do not accidentally cause the engine to skip the addition logic if the base stat is already non-zero.

## Risks / Trade-offs

- **Redundant Clones**: Deep cloning on every render (or memoized change) has a tiny performance cost, but it's negligible for this scale and prevents hard-to-debug mutation bugs.
