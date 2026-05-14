## Context

The "Monster Hunter Wilds Build Crafter" is a static React application built with Vite. Since it has no backend dependencies and relies entirely on static JSON files for data, it is a perfect candidate for static site hosting. GitHub Pages provides free hosting for static sites and integrates seamlessly with GitHub repositories.

## Goals / Non-Goals

**Goals:**
- Automate the deployment process so that pushing to the `main` branch updates the live site.
- Ensure all assets (JS, CSS, JSON data) resolve correctly on the deployed site.
- Utilize GitHub Actions for the CI/CD pipeline.

**Non-Goals:**
- Setting up a custom domain (can be configured by the user via GitHub settings later).
- Ejecting from Vite or changing the core build process.

## Decisions

- **CI/CD Tooling**: Use GitHub Actions with the standard `actions/checkout`, `actions/setup-node`, and a deployment action (or Vite's recommended `actions/configure-pages` and `actions/deploy-pages`) to build and deploy.
- **Vite Configuration**: We need to configure the `base` property in `vite.config.js`. By default, Vite assumes deployment to the root domain (`/`). If the GitHub repository is named `test-wb` (for example), it will be hosted at `https://<username>.github.io/test-wb/`. The `base` needs to match the repository name, or we can set it to `'./'` to use relative paths for all assets. Using `base: './'` is usually the safest and most flexible approach for SPAs without complex client-side routing.
- **Data Fetching**: The `App.jsx` uses `fetch('/data/weapons.json')`. If we use a subpath, `/data/...` will resolve to the root domain (breaking the fetch). We need to change these to relative paths (e.g., `fetch('./data/weapons.json')` or use `import.meta.env.BASE_URL`) to ensure they work regardless of the hosting subpath.

## Risks / Trade-offs

- **Risk**: Absolute paths in `fetch()` calls or image `src` attributes might break on GitHub Pages if the repository is not a user/org page (i.e., not hosted at the root). → **Mitigation**: Update all absolute `/` paths to be relative `./` or prepend Vite's `BASE_URL`.
