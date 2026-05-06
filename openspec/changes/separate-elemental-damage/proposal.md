## Why

In Monster Hunter, weapons are defined by more than just their raw attack power. Elemental damage and status effects are critical components of a weapon's identity and performance. Currently, the Build Crafter ignores these "special" damage types, providing an incomplete picture of a hunter's offensive capabilities. Separating these stats is necessary for accurate build theorizing and for the future implementation of elemental-specific skills.

## What Changes

- **Elemental Stat Ingestion**: The stat engine will now parse the `specials` array from weapon data to identify active elements or status effects.
- **Multi-Channel Stat Display**: The `StatsPanel` will be updated to show the weapon's primary element/status alongside its raw attack.
- **Elemental Skill Modifiers**: The `SKILL_MODIFIERS` lookup table will be extended to support skills that provide flat or percentage-based bonuses to specific elements (e.g., Fire Attack, Water Attack).

## Capabilities

### New Capabilities
- `elemental-damage-tracking`: Support for tracking, calculating, and displaying non-raw damage types (Fire, Water, Ice, Thunder, Dragon, Poison, Sleep, Paralysis, Blast).

### Modified Capabilities
- `none`: This enhances the existing stat engine without changing core equipment requirements.

## Impact

- **App.jsx**: `baseStats` will now include an `element` object (e.g., `{ type: 'fire', value: 110 }`).
- **StatsPanel.jsx**: New UI elements to display the weapon's element and its modified value.
- **SKILL_MODIFIERS**: Addition of elemental-specific logic.
