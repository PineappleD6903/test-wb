## 1. Refactor Calculation Engine

- [x] 1.1 In `App.jsx`, separate the base equipment stat summation from the skill-based modifiers.
- [x] 1.2 Implement a `finalStats` useMemo hook that takes both base stats and active skill levels as input.

## 2. Implement Skill Stat Modifiers

- [x] 2.1 Add logic for `Defense Boost` (Flat bonus based on level).
- [x] 2.2 Add logic for `Fire Resistance`, `Water Resistance`, `Ice Resistance`, `Thunder Resistance`, and `Dragon Resistance` (+6, +12, +20).
- [x] 2.3 Refactor existing `Attack Boost` and `Critical Eye` logic into the new unified calculation function.

## 3. UI and Verification

- [ ] 3.1 Verify that the `StatsPanel` correctly reflects the new totals.
- [ ] 3.2 Ensure "None" items (empty slots) do not break the calculation.
