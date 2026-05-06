const WEAPON_ICON_MAP = {
  'great-sword': 'great-sword.webp',
  'long-sword': 'long-sword.webp',
  'sword-shield': 'sword-and-shield.webp',
  'dual-blades': 'dual-blade.webp',
  'hammer': 'hammer.webp',
  'hunting-horn': 'hunting-horn.webp',
  'lance': 'lance.webp',
  'gunlance': 'gun-lance.webp',
  'switch-axe': 'switch-axe.webp',
  'charge-blade': 'charge-blade.webp',
  'insect-glaive': 'insect-glaive.webp',
  'light-bowgun': 'light-bowgun.webp',
  'heavy-bowgun': 'heavy-bowgun.webp',
  'bow': 'bow.webp'
};

const ARMOR_ICON_MAP = {
  'head': 'head.webp',
  'chest': 'chest.webp',
  'arms': 'arm.webp',
  'waist': 'waist.webp',
  'legs': 'lag.webp'
};

/**
 * Returns the public path to the item icon based on its kind (weapon) or type (armor).
 * @param {object|string} itemOrType - The item object or a type string
 * @returns {string|null} - The path to the icon or null if not found
 */
export const getItemIconPath = (itemOrType) => {
  if (!itemOrType) return null;

  // Extract the identifier: kind property, type property, or the string itself
  const identifier = typeof itemOrType === 'object' 
    ? (itemOrType.kind || itemOrType.type) 
    : itemOrType;

  if (!identifier) return null;

  // 1. Check Weapons Map
  if (WEAPON_ICON_MAP[identifier]) {
    return `/image/weapons/${WEAPON_ICON_MAP[identifier]}`;
  }

  // 2. Check Armor Map
  if (ARMOR_ICON_MAP[identifier]) {
    return `/image/armor/${ARMOR_ICON_MAP[identifier]}`;
  }

  return null;
};

// Maintain compatibility for components that might still look for weapon-specific path
export const getWeaponIconPath = (kind) => {
  const filename = WEAPON_ICON_MAP[kind];
  if (!filename) return null;
  return `/image/weapons/${filename}`;
};
