## Why

After deploying the application to GitHub Pages under a repository subpath (`/test-wb/`), the weapon and armor icons stopped rendering correctly. The application currently uses root-relative paths for the icons (e.g. `/image/weapons/charge_blade.png`), which resolves to the root domain (`https://username.github.io/image/...`) rather than the Vite base path (`https://username.github.io/test-wb/image/...`). We need to prepend the Vite base path to ensure these assets are found correctly.

## What Changes

- Update `src/utils/itemIcons.js` to prefix all image paths with the Vite environment base URL (`import.meta.env.BASE_URL`) or an equivalent logic to preserve the correct relative paths.
- Ensure all icons (weapons and armor) are properly referenced in the application.

## Capabilities

### New Capabilities
- `github-pages-compatibility`: Ensures all assets are loaded relative to the environment's base URL, supporting both root domain and subpath deployments.

### Modified Capabilities
None. (This is an implementation-level bug fix; no core feature requirements change).

## Impact

- **Affected Code**: `src/utils/itemIcons.js`.
- **System Impact**: This will fix broken image references across the application, making it fully functional on GitHub Pages and local development servers alike.
