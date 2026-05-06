## 1. JSX Refactor

- [x] 1.1 In `ItemSelectorModal.jsx`, update the `kinds.map` loop to include an `<img>` tag within each button.
- [x] 1.2 Use `getWeaponIconPath(kind)` for the image source.
- [x] 1.3 Add a `title` attribute to each button with the human-readable weapon name.
- [x] 1.4 Update the "All Types" button to just say "ALL" or use a distinctive style.

## 2. CSS Styling

- [x] 2.1 Update `.kind-filters` to a more compact grid: `grid-template-columns: repeat(auto-fill, minmax(48px, 1fr))`.
- [x] 2.2 Style `.kind-btn` to be square/circular and centered, removing the text-alignment and padding constraints of the old text buttons.
- [x] 2.3 Add a `transition` and `hover` effect that scales the icon slightly and enhances the border glow.
- [x] 2.4 Ensure the `.weapon-icon` inside the button is sized to `28px`.

## 3. Verification

- [x] 3.1 Open the weapon selection modal and verify the new icon-based filter bar.
- [x] 3.2 Click on the "Charge Blade" icon and verify that only Charge Blades are listed.
- [x] 3.3 Hover over the "Insect Glaive" icon and verify the "Insect Glaive" tooltip appears.
- [x] 3.4 Click "ALL" to return to the full list.
