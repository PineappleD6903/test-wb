## Why

To make the "Monster Hunter Wilds Build Crafter" accessible to users, we need to host it on the internet. Since the application is a completely static React Single-Page Application (SPA) with no backend requirements, GitHub Pages offers a free, automated, and zero-maintenance hosting solution. This is a vastly superior alternative to managing an AWS EC2 instance.

## What Changes

- Add a GitHub Actions workflow to automatically build and deploy the application to GitHub Pages upon pushing to the `main` branch.
- Update `vite.config.js` to define the correct `base` path for GitHub Pages deployment.

## Capabilities

### New Capabilities
- `github-pages-deployment`: Automated CI/CD pipeline and configuration for deploying the static site to GitHub Pages.

### Modified Capabilities

## Impact

- **Infrastructure**: The site will be hosted on GitHub infrastructure for free.
- **Code**: `vite.config.js` will be modified to support the GitHub Pages base URL if necessary.
- **CI/CD**: A new `.github/workflows/deploy.yml` file will be introduced to handle automated deployments.
