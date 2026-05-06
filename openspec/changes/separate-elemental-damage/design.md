## Context

Weapons in Monster Hunter Wilds can have Elemental or Status damage found in their `specials` array. This data is currently loaded into the application but ignored during stat calculation and rendering.

## Goals / Non-Goals

**Goals:**
- Extract primary element/status damage from the weapon.
- Display this stat in the `StatsPanel`.
- Support skills that modify elemental values.

**Non-Goals:**
- Implementing "Hidden" elements (elements that require a specific skill to activate).
- Supporting weapons with dual elements (multiple entries in `specials`) in this phase.

## Decisions

- **Stat Object Update**: The `baseStats` object in `App.jsx` will be extended with:
    ```javascript
    element: { 
      type: string | null, 
      value: number, 
      hidden: boolean 
    }
    ```
- **Parsing Logic**: We will use the `display` value from the `damage` object within the first `specials` entry, as this matches what players see in-game.
- **Modifier Strategy**: Elemental Attack skills will be added to `SKILL_MODIFIERS`. They will check if the weapon's `element.type` matches the skill's target element before applying bonuses.
- **UI Enhancement**: In `StatsPanel.jsx`, we will add a new row to the `mainStats` array if an element is present.

## Risks / Trade-offs

- **Hidden Elements**: If a weapon has a hidden element, it will currently be ignored. This is acceptable as we don't yet have the "Free Elem/Ammo Up" skill implemented.
- **Display vs Raw**: We will store the `display` value to ensure consistency with the UI, but this might lead to confusion if internal calculations (not yet implemented) require the `raw` value.
