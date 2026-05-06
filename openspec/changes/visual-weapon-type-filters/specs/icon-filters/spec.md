## ADDED Requirements

### Requirement: Visual Filter Buttons
The weapon selection modal must use category icons for filtering instead of plain text labels.

#### Scenario: Icon Display
- **WHEN** the weapon selection modal is open
- **THEN** the filter bar should display a series of weapon category icons
- **AND** clicking an icon should filter the list to only that weapon type.

### Requirement: Discoverability
The user must be able to see the name of the weapon type if they are unsure which icon represents which category.

#### Scenario: Hover Tooltip
- **WHEN** the user hovers over a weapon icon in the filter bar
- **THEN** a tooltip (or title text) should appear showing the name (e.g., "Long Sword").

### Requirement: Selection Feedback
The UI must clearly communicate which filter is currently active.

#### Scenario: Active State
- **WHEN** a specific weapon category is selected
- **THEN** that icon's button should have a distinct "Active" style (e.g., gold border/glow)
- **AND** the "ALL" button should lose its active state.
