## Context

The `SkillSummary` component renders a list of active skills. Each skill item in the list has access to the full skill metadata via the `skillsDatabase` prop. Currently, this metadata is only used to determine the maximum level of the skill.

## Goals / Non-Goals

**Goals:**
- Provide clear, contextual information about each skill's effect.
- Maintain a clean UI by only showing details on interaction.
- Use smooth animations for the tooltip/hover state.

**Non-Goals:**
- Implementing a full skill-tree browser.
- Modifying the data structure of `skills.json`.

## Decisions

- **Custom Tooltip Implementation**: Instead of the browser-default `title` attribute, we will implement a custom React-based tooltip or a CSS-driven hover reveal. A CSS-driven reveal within the `skill-item` (expanding it or showing an absolute-positioned box) is often more robust and easier to style consistently.
- **Data Mapping**:
    - **Base Description**: `skillMeta.description`
    - **Current Rank Effect**: `skillMeta.ranks[Math.min(level, maxLevel) - 1].description`
- **Styling**: The tooltip will feature:
    - `background: rgba(10, 10, 10, 0.95)`
    - `backdrop-filter: blur(8px)`
    - `border: 1px solid rgba(255, 215, 0, 0.3)`
    - Subtle fade-in animation.

## Risks / Trade-offs

- **Z-Index**: Ensure the tooltip appears above other UI elements (like the equipment list).
- **Overflow**: On mobile or small screens, long descriptions might overflow. We will implement a `max-width` and word-wrap for the tooltip.
