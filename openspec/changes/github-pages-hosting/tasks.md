## 1. Vite Configuration

- [x] 1.1 Update `vite.config.js` to include the `base: './'` property so that built assets use relative paths.
- [x] 1.2 Modify `fetch` calls in `src/App.jsx` (e.g., `/data/weapons.json`) to use relative paths (`./data/weapons.json`) or prepend the base URL so they resolve correctly when hosted in a sub-directory.

## 2. GitHub Actions Setup

- [x] 2.1 Create the directory structure `.github/workflows/` in the project root.
- [x] 2.2 Create a `deploy.yml` file within the workflows directory containing the standard Vite deployment action (checkout, setup node, install, build, and deploy to Pages).

## 3. Verification

- [x] 3.1 Run `npm run build` and `npm run preview` locally to ensure the built application still loads all assets and data correctly.
- [x] 3.2 Commit and push the changes to the `main` branch to trigger the GitHub Actions workflow, then verify the deployed site on GitHub Pages.
