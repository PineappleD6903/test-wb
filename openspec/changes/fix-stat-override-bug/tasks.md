## 1. Engine Logic Fix

- [x] 1.1 In `App.jsx`, audit the `activeStats` calculation loop to ensure absolute additive accumulation.
- [x] 1.2 Implement a more explicit merging strategy for the `resistances` sub-object during the skill modifier phase.
- [x] 1.3 Add defensive checks to ensure `modifierFn` results are treated as deltas.

## 2. Verification

- [x] 2.1 Equip an armor piece with inherent defense and a "Defense Boost" decoration.
- [x] 2.2 Verify that the "Defense" stat in the StatsPanel correctly shows the sum of both.
- [x] 2.3 Verify elemental resistance summation with negative base values.
