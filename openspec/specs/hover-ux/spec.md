## ADDED Requirements

### Requirement: Interactive Skill Details
Each skill in the active list must provide detailed descriptions of its effects when interacted with.

#### Scenario: Hovering over a skill (Desktop)
- **WHEN** the user hovers their mouse over a skill item in the `SkillSummary`
- **THEN** a tooltip or overlay must appear containing:
    - The skill's name (header)
    - The skill's general description
    - The specific description for the currently active level

#### Scenario: Mobile Interaction
- **WHEN** the user taps on a skill item (or long-presses)
- **THEN** the description should be revealed (potentially by expanding the item or showing a modal/overlay)

### Requirement: Robust Data Handling
The UI must handle missing metadata or levels gracefully without crashing or showing empty boxes.

#### Scenario: Skill Missing in Database
- **WHEN** a skill name exists in equipment but not in the `skillsDatabase`
- **THEN** it should show a fallback description like "No detailed information available."
