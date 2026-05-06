## Context

The current stat engine calculates active stats in a single pass. However, "Convert" skills depend on the results of other skills (e.g., "Thunder Resistance" must be added before "Convert Thunder Resistance" calculates its bonus).

## Goals / Non-Goals

**Goals:**
- Implement the conversion logic: `1 Point of Resistance = +5 Elemental Attack`.
- Ensure "Convert" skills use the post-modified resistance values.
- Support Thunder and Water conversion.

**Non-Goals:**
- Supporting conversion of negative resistance (bonuses should only apply for positive values).
- Implementing multi-stage conversion (where a converted stat is then converted again).

## Decisions

- **Two-Phase Calculation**: The `activeStats` hook in `App.jsx` will be split into two phases:
    1. **Base Modifiers**: Apply flat boosts and percentage increases (Attack Boost, Crit Eye, Elemental Resistances).
    2. **Reactive Modifiers**: Apply skills that depend on the results of Phase 1 (Convert skills).
- **Categorization**: Skills starting with "Convert" will be identified as reactive.
- **Conversion Formula**:
    ```javascript
    'Convert Thunder Resistance': (level, stats) => {
      if (stats.element.type !== 'thunder') return {};
      const res = Math.max(0, stats.resistances.thunder);
      return { elementValue: res * 5 };
    }
    ```

## Risks / Trade-offs

- **Performance**: Two passes over the active skills list is slightly less efficient, but necessary for correct dependency resolution and negligible for build crafter scales.
- **Dependency Chains**: If we ever add skills that convert element back to something else, we'd need a more robust DAG-based resolver, but for now, a two-phase approach is sufficient.
