## 1. Stat Engine Refactor

- [x] 1.1 In `App.jsx`, refactor the `baseStats` hook to parse the weapon's `specials` array.
- [x] 1.2 Store the first non-hidden special as an `element` object: `{ type, value, hidden }`.
- [x] 1.3 Update the `activeStats` hook to handle `element` and apply relevant skill modifiers.

## 2. Implement Elemental Skills

- [x] 2.1 Add modifier functions to `SKILL_MODIFIERS` for: Fire Attack, Water Attack, Ice Attack, Thunder Attack, and Dragon Attack.
- [x] 2.2 Add modifier functions for status effects: Poison Attack, Sleep Attack, Paralysis Attack, and Blast Attack.
- [x] 2.3 Ensure modifiers only apply if `finalStats.element.type` matches the skill's target element.

## 3. UI Updates

- [x] 3.1 In `StatsPanel.jsx`, update the `mainStats` array construction to include the weapon's element if `activeStats.element.type` is present.
- [x] 3.2 Add a color mapping or icons for the various elements/statuses in `StatsPanel`.

## 4. Verification

- [x] 4.1 Verify "Nihil Bow I" (Water) correctly shows Water damage.
- [x] 4.2 Verify "Fire Attack" skill increases Fire damage on a Fire weapon but NOT on a Water weapon.
