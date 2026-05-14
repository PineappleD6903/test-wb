## Context

The application is hosted on GitHub Pages in a repository subpath (`https://pineappled6903.github.io/test-wb/`). The Vite `base` configuration is set to `/test-wb/`. However, image references in `src/utils/itemIcons.js` are currently absolute paths rooted at the domain (`/image/weapons/...`), causing 404 Not Found errors on GitHub Pages because it tries to load from `https://pineappled6903.github.io/image/...` instead of `https://pineappled6903.github.io/test-wb/image/...`.

## Goals / Non-Goals

**Goals:**
- Fix the icon loading issue on GitHub Pages without breaking the local development environment.
- Ensure the solution automatically adapts to the configured Vite `base` path.

**Non-Goals:**
- Refactoring the `WEAPON_ICON_MAP` and `ARMOR_ICON_MAP` structures.
- Moving assets from the `public/` folder into the `src/` folder for Vite to process them statically.

## Decisions

**Decision 1: Use `import.meta.env.BASE_URL`**
We will prepend `import.meta.env.BASE_URL` to all absolute paths returned by `itemIcons.js`. Vite automatically injects this variable to match the `base` property configured in `vite.config.js` (`/test-wb/` for production builds, `/` for local development).

*Alternative considered*: Moving all images to `src/assets/` and using `new URL(..., import.meta.url).href`. *Rejected* because dynamically constructing URLs with variables is error-prone in Vite's static asset pipeline, and the current mapping approach relies on dynamic identifiers.

## Risks / Trade-offs

- **Risk:** Double-slashes in the generated paths if not concatenated carefully.
  - **Mitigation:** The `import.meta.env.BASE_URL` always ends with a slash (e.g., `/test-wb/` or `/`), so we must ensure we append the path without a leading slash (e.g., `` `${import.meta.env.BASE_URL}image/weapons/...` ``).
