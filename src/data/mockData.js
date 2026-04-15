// src/data/mockData.js

export const SKILL_DATA = {
  "attack_boost": { name: "Attack Boost", maxLevel: 7, description: "Increases Attack power." },
  "critical_eye": { name: "Critical Eye", maxLevel: 7, description: "Increases Affinity." },
  "weakness_exploit": { name: "Weakness Exploit", maxLevel: 3, description: "Increases Affinity when striking a monster's weak spots." },
  "agitator": { name: "Agitator", maxLevel: 5, description: "Grants Attack and Affinity during combat when the monster becomes enraged." },
  "focus": { name: "Focus", maxLevel: 3, description: "Increases the gauge fill rate and reduces charge times for specific weapons." }
};

export const WEAPON_DATA = [
  { id: "w_1", name: "Iron Greatsword I", type: "Greatsword", attack: 100, affinity: 0, slots: [1], rarity: 1 },
  { id: "w_2", name: "Buster Sword", type: "Greatsword", attack: 120, affinity: 5, slots: [2], rarity: 2 },
  { id: "w_3", name: "Defender Katana I", type: "Long Sword", attack: 150, affinity: 10, slots: [], rarity: 3 }
];

export const ARMOR_DATA = {
  helm: [
    { id: "h_0", name: "None", slots: [], skills: {} },
    { id: "h_1", name: "Hunter's Helm", defense: 10, slots: [1], skills: { "attack_boost": 1 } },
    { id: "h_2", name: "Bone Helm", defense: 12, slots: [2], skills: { "focus": 1 } },
    { id: "h_3", name: "Rathalos Helm", defense: 30, slots: [2, 1], skills: { "attack_boost": 2 } }
  ],
  chest: [
    { id: "c_0", name: "None", slots: [], skills: {} },
    { id: "c_1", name: "Hunter's Mail", defense: 10, slots: [1], skills: { "critical_eye": 1 } },
    { id: "c_2", name: "Bone Mail", defense: 12, slots: [1], skills: { "attack_boost": 1 } },
    { id: "c_3", name: "Rathalos Mail", defense: 30, slots: [2], skills: { "weakness_exploit": 1, "attack_boost": 1 } }
  ],
  arms: [
    { id: "a_0", name: "None", slots: [], skills: {} },
    { id: "a_1", name: "Hunter's Vambraces", defense: 10, slots: [], skills: { "critical_eye": 1 } },
    { id: "a_2", name: "Bone Vambraces", defense: 12, slots: [1], skills: { "focus": 1 } },
    { id: "a_3", name: "Rathalos Braces", defense: 30, slots: [2, 1], skills: { "weakness_exploit": 1 } }
  ],
  waist: [
    { id: "wst_0", name: "None", slots: [], skills: {} },
    { id: "wst_1", name: "Hunter's Coil", defense: 10, slots: [], skills: { "attack_boost": 1 } },
    { id: "wst_2", name: "Bone Coil", defense: 12, slots: [2], skills: { "focus": 1 } },
    { id: "wst_3", name: "Rathalos Coil", defense: 30, slots: [2, 1], skills: {} }
  ],
  legs: [
    { id: "l_0", name: "None", slots: [], skills: {} },
    { id: "l_1", name: "Hunter's Greaves", defense: 10, slots: [1], skills: { "critical_eye": 1 } },
    { id: "l_2", name: "Bone Greaves", defense: 12, slots: [1], skills: { "attack_boost": 1 } },
    { id: "l_3", name: "Rathalos Greaves", defense: 30, slots: [3], skills: { "weakness_exploit": 1 } }
  ]
};

export const DECORATION_DATA = [
  { id: "d_1", name: "Attack Jewel 1", slotLevel: 1, skill: "attack_boost", points: 1 },
  { id: "d_2", name: "Expert Jewel 1", slotLevel: 1, skill: "critical_eye", points: 1 },
  { id: "d_3", name: "Tenderizer Jewel 2", slotLevel: 2, skill: "weakness_exploit", points: 1 },
  { id: "d_4", name: "Charger Jewel 2", slotLevel: 2, skill: "focus", points: 1 }
];
