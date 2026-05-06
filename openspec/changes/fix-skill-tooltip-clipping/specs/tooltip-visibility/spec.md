## ADDED Requirements

### Requirement: Cross-Panel Tooltips
Skill tooltips must be rendered on a high z-layer that allows them to be fully visible even when they extend beyond the boundaries of their parent panel.

#### Scenario: Tooltip Hover
- **WHEN** a user hovers over a skill in the Active Skills panel
- **THEN** the tooltip should appear to the left of the item
- **AND** it should be clearly visible over the adjacent stats or passives panel
- **AND** it should not be clipped by the skills panel border

### Requirement: Information Density
The tooltip must provide comprehensive information about the skill's mechanics.

#### Scenario: Single-Level Skill Display
- **WHEN** a user hovers over "Convert Thunder Resistance" (a Level 1 skill)
- **THEN** the tooltip should show the base description: "Increases your weapon's elemental attack proportional to your thunder resistance."
- **AND** it should show the Level 1 effect: "Activates skill effect."
