## ADDED Requirements

### Requirement: Asset URL Resolution
The system SHALL dynamically resolve image and static asset URLs based on the current environment's base URL configuration.

#### Scenario: Subpath deployment
- **WHEN** the application is deployed to a subpath (e.g., `/test-wb/`)
- **THEN** all weapon and armor icons load with the subpath prepended to their URLs

#### Scenario: Root deployment
- **WHEN** the application is deployed to a root domain or run locally
- **THEN** all weapon and armor icons load from the root domain directly
