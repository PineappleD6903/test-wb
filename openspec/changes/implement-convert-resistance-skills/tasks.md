## 1. Engine Refactor: Two-Pass Skill Application

- [x] 1.1 In `App.jsx`, refactor the `activeStats` hook to split skill application into two distinct phases.
- [x] 1.2 Identify "Reactive" skills (those starting with "Convert") and defer them to the second phase.
- [x] 1.3 Ensure that Phase 2 receives the fully modified stats from Phase 1.

## 2. Implement Conversion Modifiers

- [x] 2.1 Add `Convert Thunder Resistance` to `SKILL_MODIFIERS`. Formula: `max(0, thunderRes) * 5`.
- [x] 2.2 Add `Convert Water Resistance` to `SKILL_MODIFIERS`. Formula: `max(0, waterRes) * 5`.
- [x] 2.3 Implement the element matching check (e.g., only boost Thunder element if the skill is Thunder Convert).

## 3. Verification

- [x] 3.1 Verify "Convert Thunder Resistance" with 18 Thunder Res yields +90 Elemental Attack.
- [x] 3.2 Verify that "Thunder Resistance" Level 1 (+6) correctly increases the converted bonus by +30.
- [x] 3.3 Verify that negative resistance results in a 0 bonus.
