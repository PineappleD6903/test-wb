## Context

The application identifies weapons using a `kind` field. We have a set of high-quality `.webp` icons in the `/image/` folder, but their filenames don't always match the `kind` values exactly (due to pluralization or typos).

## Goals / Non-Goals

**Goals:**
- Provide a consistent visual representation of weapon types.
- Correctly map data-level identifiers to file-level assets.
- Ensure the icons are integrated into both the "equipped" view and the "selection" view.

**Non-Goals:**
- Adding icons for Armor (Heads, Chests, etc.) in this pass.
- Creating new icons (only using existing ones).

## Decisions

- **Mapping Utility**: I will implement a `getWeaponIcon(kind)` function that maps internal `kind` values to the actual filenames:
  - `great-sword` → `grate-sword.webp`
  - `long-sword` → `long-sword.webp`
  - `sword-and-shield` → `sowrd-and-shield.webp`
  - `dual-blades` → `dual-blade.webp`
  - `hammer` → `hamer.webp`
  - `hunting-horn` → `hunting-horn.webp`
  - `lance` → `lance.webp`
  - `gunlance` → `gun-lance.webp`
  - `switch-axe` → `swithc-axe.webp`
  - `charge-blade` → `charge-blade.webp`
  - `insect-glaive` → `insec-glave.webp`
  - `light-bowgun` → `light-bowgun.webp`
  - `heavy-bowgun` → `heavy-bowgun.webp`
  - `bow` → `bow.webp`
- **Icon Sizing**: Icons will be restricted to a height of `20px` in lists and `24px` in the main slots to ensure they don't break line heights.
- **Fallbacks**: If a `kind` is not found (e.g., for armor categories), no icon will be displayed.

## Risks / Trade-offs

- **Asset Reliance**: If the filenames in `/image/` change, the mapping will break. I've documented the current filenames explicitly to mitigate this.
