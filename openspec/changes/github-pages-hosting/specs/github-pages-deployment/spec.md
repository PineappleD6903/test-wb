## ADDED Requirements

### Requirement: Automated Build and Deployment
The application SHALL be automatically built and deployed to GitHub Pages whenever changes are pushed to the main branch.

#### Scenario: Code push to main
- **WHEN** a developer pushes new code to the `main` branch
- **THEN** a GitHub Actions workflow must automatically run `npm run build` and deploy the `dist` folder to the `gh-pages` branch.

### Requirement: Base URL Configuration
The application's routing and asset paths SHALL correctly resolve when hosted under a GitHub Pages repository subpath.

#### Scenario: Accessing the deployed site
- **WHEN** a user navigates to the GitHub Pages URL (e.g., `https://<username>.github.io/<repo-name>/`)
- **THEN** all assets (JSON data, CSS, images) must load correctly without 404 errors.
