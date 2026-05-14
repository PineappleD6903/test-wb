import React, { useState, useEffect, useMemo } from 'react';
import './index.css';
import EquipmentSlot from './components/EquipmentSlot';
import StatsPanel from './components/StatsPanel';
import SkillSummary from './components/SkillSummary';
import ArmorPassivePanel from './components/ArmorPassivePanel';
import ItemSelectorModal from './components/ItemSelectorModal';
import DecoSelectorModal from './components/DecoSelectorModal';

const createNoneItem = (id, defaultName = "None") => ({
  id,
  name: defaultName,
  slots: [],
  skills: [],
  damage: { raw: 0, display: 0 },
  affinity: 0,
  defense: { base: 0, max: 0 },
  slottedDecorations: []
});

// Helper to initialize slotted decorations correctly when a new item is picked
const prepItem = (item) => {
  if (!item.slottedDecorations) {
    item.slottedDecorations = new Array(item.slots?.length || 0).fill(null);
  }
  return item;
};

const SKILL_MODIFIERS = {
  'Attack Boost': (level) => ({ attack: level * 3 }),
  'Critical Eye': (level) => ({ affinity: level * 5 }),
  'Defense Boost': (level) => {
    const flat = [0, 5, 10, 20, 30, 40, 50, 60][level] || 0;
    return { defense: flat };
  },
  'Fire Resistance': (level) => {
    const res = [0, 6, 12, 20][level] || 0;
    const def = level === 3 ? 10 : 0;
    return { resistances: { fire: res }, defense: def };
  },
  'Water Resistance': (level) => {
    const res = [0, 6, 12, 20][level] || 0;
    const def = level === 3 ? 10 : 0;
    return { resistances: { water: res }, defense: def };
  },
  'Ice Resistance': (level) => {
    const res = [0, 6, 12, 20][level] || 0;
    const def = level === 3 ? 10 : 0;
    return { resistances: { ice: res }, defense: def };
  },
  'Thunder Resistance': (level) => {
    const res = [0, 6, 12, 20][level] || 0;
    const def = level === 3 ? 10 : 0;
    return { resistances: { thunder: res }, defense: def };
  },
  'Dragon Resistance': (level) => {
    const res = [0, 6, 12, 20][level] || 0;
    const def = level === 3 ? 10 : 0;
    return { resistances: { dragon: res }, defense: def };
  },
  
  // Elemental Attacks
  'Fire Attack': (level, stats) => stats.element.type === 'fire' ? { elementValue: level * 20 } : {},
  'Water Attack': (level, stats) => stats.element.type === 'water' ? { elementValue: level * 20 } : {},
  'Ice Attack': (level, stats) => stats.element.type === 'ice' ? { elementValue: level * 20 } : {},
  'Thunder Attack': (level, stats) => stats.element.type === 'thunder' ? { elementValue: level * 20 } : {},
  'Dragon Attack': (level, stats) => stats.element.type === 'dragon' ? { elementValue: level * 20 } : {},

  // Status Attacks
  'Poison Attack': (level, stats) => stats.element.type === 'poison' ? { elementValue: level * 10 } : {},
  'Sleep Attack': (level, stats) => stats.element.type === 'sleep' ? { elementValue: level * 10 } : {},
  'Paralysis Attack': (level, stats) => stats.element.type === 'paralysis' ? { elementValue: level * 10 } : {},
  'Blast Attack': (level, stats) => stats.element.type === 'blast' ? { elementValue: level * 10 } : {},

  // Conversion Skills
  'Convert Thunder Resistance': (level, stats) => {
    if (stats.element.type !== 'thunder') return {};
    return { elementValue: Math.max(0, stats.resistances.thunder) * 5 };
  },
  'Convert Water Resistance': (level, stats) => {
    if (stats.element.type !== 'water') return {};
    return { elementValue: Math.max(0, stats.resistances.water) * 5 };
  },
};

function App() {
  const [data, setData] = useState({
    weapon: [],
    head: [],
    chest: [],
    arms: [],
    waist: [],
    legs: [],
    skillsMap: {},
    decorations: [],
    armorSets: []
  });
  const [loading, setLoading] = useState(true);

  const [equipment, setEquipment] = useState({
    weapon: createNoneItem('none_w', "Iron Greatsword I"), 
    head: createNoneItem('none_h'),
    chest: createNoneItem('none_c'),
    arms: createNoneItem('none_a'),
    waist: createNoneItem('none_wst'),
    legs: createNoneItem('none_l'),
  });

  const [itemModalState, setItemModalState] = useState({
    isOpen: false,
    category: null,
    items: []
  });

  const [decoModalState, setDecoModalState] = useState({
    isOpen: false,
    type: null,
    slotIndex: null,
    maxSlotLevel: null
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [weaponsRes, armorRes, skillsRes, decosRes, armorSetsRes] = await Promise.all([
          fetch(`${import.meta.env.BASE_URL}data/weapons.json`),
          fetch(`${import.meta.env.BASE_URL}data/armor.json`),
          fetch(`${import.meta.env.BASE_URL}data/skills.json`),
          fetch(`${import.meta.env.BASE_URL}data/decorations.json`),
          fetch(`${import.meta.env.BASE_URL}data/armor_sets.json`)
        ]);
        
        const weaponsData = await weaponsRes.json();
        const armorData = await armorRes.json();
        const skillsData = await skillsRes.json();
        const decorations = await decosRes.json();
        const armorSetsData = await armorSetsRes.json();

        // Process weapons
        const weapons = [createNoneItem('none_w', 'None'), ...weaponsData.map((w, i) => prepItem({...w, id: `w_${i}`}))];
        
        // Process armor
        const armorMap = { head: [], chest: [], arms: [], waist: [], legs: [] };
        armorData.forEach((a, i) => {
          if (armorMap[a.kind]) {
            armorMap[a.kind].push(prepItem({...a, id: `a_${i}`}));
          }
        });

        // Add 'None' options
        Object.keys(armorMap).forEach(key => {
          armorMap[key] = [prepItem(createNoneItem(`none_${key}`)), ...armorMap[key]];
        });

        // Process skills map
        const skillsMap = {};
        skillsData.forEach(s => {
          skillsMap[s.name] = s;
        });

        setData({
          weapon: weapons,
          ...armorMap,
          skillsMap,
          decorations,
          armorSets: armorSetsData
        });

        // Set initial default (first real item if exists)
        setEquipment({
          weapon: weapons.length > 1 ? weapons[1] : weapons[0],
          head: armorMap.head[0],
          chest: armorMap.chest[0],
          arms: armorMap.arms[0],
          waist: armorMap.waist[0],
          legs: armorMap.legs[0],
        });

      } catch (err) {
        console.error("Failed to load MH data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const baseStats = useMemo(() => {
    let attack = equipment.weapon?.damage?.raw || 0;
    let affinity = equipment.weapon?.affinity || 0;
    let defense = 0;
    let resistances = { fire: 0, water: 0, ice: 0, thunder: 0, dragon: 0 };
    let sharpness = equipment.weapon?.sharpness || null;

    const element = { type: null, value: 0, hidden: false };
    if (equipment.weapon?.specials?.length > 0) {
      const special = equipment.weapon.specials.find(s => !s.hidden);
      if (special) {
        element.type = special.element;
        element.value = special.damage.display;
        element.hidden = special.hidden;
      }
    }

    Object.keys(equipment).forEach(key => {
      const item = equipment[key];
      if (item) {
        if (item.defense?.base) defense += item.defense.base;
        if (item.resistances) {
          Object.keys(resistances).forEach(res => {
            resistances[res] += (item.resistances[res] || 0);
          });
        }
      }
    });

    return { attack, affinity, defense, resistances, sharpness, element };
  }, [equipment]);

  const activePassives = useMemo(() => {
    if (!data.armorSets || data.armorSets.length === 0) return [];

    const setCounts = {};
    const groupCounts = {};

    // Count pieces
    Object.values(equipment).forEach(item => {
      if (!item || !item.armorSet) return;
      
      // Set Bonus pieces
      const setId = item.armorSet.id;
      setCounts[setId] = (setCounts[setId] || 0) + 1;

      // Find the set in our database to get group bonus
      const armorSetData = data.armorSets.find(s => s.id === setId);
      if (armorSetData && armorSetData.groupBonus) {
        const groupId = armorSetData.groupBonus.id;
        groupCounts[groupId] = (groupCounts[groupId] || 0) + 1;
      }
    });

    const passives = [];

    // Calculate Set Bonuses
    Object.keys(setCounts).forEach(setId => {
      const count = setCounts[setId];
      const armorSetData = data.armorSets.find(s => s.id === parseInt(setId));
      if (armorSetData && armorSetData.bonus) {
        const bonus = armorSetData.bonus;
        bonus.ranks.forEach(rank => {
          passives.push({
            name: rank.skill.name || bonus.skill.name,
            description: rank.skill.description,
            count: count,
            required: rank.pieces,
            active: count >= rank.pieces,
            type: 'set'
          });
        });
      }
    });

    // Calculate Group Bonuses
    Object.keys(groupCounts).forEach(groupId => {
      const count = groupCounts[groupId];
      const armorSetData = data.armorSets.find(s => s.groupBonus && s.groupBonus.id === parseInt(groupId));
      if (armorSetData && armorSetData.groupBonus) {
        const groupBonus = armorSetData.groupBonus;
        groupBonus.ranks.forEach(rank => {
          passives.push({
            name: rank.skill.name || groupBonus.skill.name,
            description: rank.skill.description,
            count: count,
            required: rank.pieces,
            active: count >= rank.pieces,
            type: 'group'
          });
        });
      }
    });

    // Sort: Active first, then by required pieces
    return passives.sort((a, b) => {
      if (a.active !== b.active) return b.active ? 1 : -1;
      return a.required - b.required;
    });
  }, [equipment, data.armorSets]);

  const activeSkills = useMemo(() => {
    const skills = {};
    
    Object.values(equipment).forEach(item => {
      if (!item) return;
      
      // Add inherent skills
      if (item.skills) {
        item.skills.forEach(s => {
          const skillName = s.skill.name;
          skills[skillName] = (skills[skillName] || 0) + s.level;
        });
      }
      
      // Add decoration skills
      if (item.slottedDecorations) {
        item.slottedDecorations.forEach(deco => {
          if (deco && deco.skills) {
            deco.skills.forEach(s => {
              const skillName = s.skill.name;
              skills[skillName] = (skills[skillName] || 0) + s.level;
            });
          }
        });
      }
    });

    return skills;
  }, [equipment]);

  const activeStats = useMemo(() => {
    // Deep clone base stats to avoid mutation
    const finalStats = { 
      ...baseStats, 
      resistances: { ...baseStats.resistances },
      element: { ...baseStats.element }
    };

    const applySkill = (skillName) => {
      const level = activeSkills[skillName];
      const modifierFn = SKILL_MODIFIERS[skillName];
      
      if (modifierFn) {
        const mods = modifierFn(level, finalStats);
        
        // Strict additive accumulation using explicit type checks
        if (typeof mods.attack === 'number') finalStats.attack += mods.attack;
        if (typeof mods.affinity === 'number') finalStats.affinity += mods.affinity;
        if (typeof mods.defense === 'number') finalStats.defense += mods.defense;
        
        if (mods.resistances) {
          Object.keys(mods.resistances).forEach(res => {
            if (typeof mods.resistances[res] === 'number') {
              finalStats.resistances[res] += mods.resistances[res];
            }
          });
        }
        
        if (typeof mods.elementValue === 'number') {
          finalStats.element.value += mods.elementValue;
        }
      }
    };

    const skillNames = Object.keys(activeSkills);
    
    // Pass 1: Primary Modifiers (Stats, Resistances)
    skillNames
      .filter(name => !name.startsWith('Convert'))
      .forEach(applySkill);

    // Pass 2: Reactive Modifiers (Conversions)
    skillNames
      .filter(name => name.startsWith('Convert'))
      .forEach(applySkill);

    return finalStats;
  }, [baseStats, activeSkills]);

  const openItemModal = (category) => {
    const items = data[category];
    setItemModalState({ isOpen: true, category, items });
  };

  const handleSelectItem = (item) => {
    // We clone item and ensure slottedDecorations is initialized
    const newItem = prepItem({...item});
    setEquipment(prev => ({
      ...prev,
      [itemModalState.category]: newItem
    }));
  };

  const openDecoModal = (type, slotIndex, maxSlotLevel) => {
    setDecoModalState({
      isOpen: true,
      type,
      slotIndex,
      maxSlotLevel
    });
  };

  const handleSelectDeco = (deco) => {
    const { type, slotIndex } = decoModalState;
    setEquipment(prev => {
      const updatedItem = { ...prev[type] };
      updatedItem.slottedDecorations = [...(updatedItem.slottedDecorations || [])];
      updatedItem.slottedDecorations[slotIndex] = deco;
      return { ...prev, [type]: updatedItem };
    });
  };

  if (loading) {
    return <div className="layout"><div className="header"><h2>Loading Guild Data...</h2></div></div>;
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1>Monster Hunter Wilds Build Crafter</h1>
          <p className="subtitle">Optimize your hunts, master the Wilds.</p>
        </div>
      </header>

      <main className="main-content">
        <div className="layout-grid">
          {/* Top Row */}
          <div className="panel equipment-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2>Equipment</h2>
            <div className="equipment-slots mt-3">
              <EquipmentSlot label="Weapon" type="weapon" item={equipment.weapon} onClick={() => openItemModal('weapon')} onSlotClick={openDecoModal} />
              <EquipmentSlot label="Helm" type="head" item={equipment.head} onClick={() => openItemModal('head')} onSlotClick={openDecoModal} />
              <EquipmentSlot label="Chest" type="chest" item={equipment.chest} onClick={() => openItemModal('chest')} onSlotClick={openDecoModal} />
              <EquipmentSlot label="Arms" type="arms" item={equipment.arms} onClick={() => openItemModal('arms')} onSlotClick={openDecoModal} />
              <EquipmentSlot label="Waist" type="waist" item={equipment.waist} onClick={() => openItemModal('waist')} onSlotClick={openDecoModal} />
              <EquipmentSlot label="Legs" type="legs" item={equipment.legs} onClick={() => openItemModal('legs')} onSlotClick={openDecoModal} />
            </div>
            <button className="btn btn-primary" onClick={() => {
              setEquipment({
                weapon: data.weapon[0], head: data.head[0], chest: data.chest[0],
                arms: data.arms[0], waist: data.waist[0], legs: data.legs[0]
              });
            }} style={{marginTop: '10px', width: '100%'}}>Reset Build</button>
          </div>

          <div className="panel stats-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2>Hunter Stats</h2>
            <StatsPanel activeStats={activeStats} />
          </div>

          {/* Bottom Row */}
          <div className="panel passives-panel animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2>Armor Passives</h2>
            <ArmorPassivePanel passives={activePassives} />
          </div>
          
          <div className="panel skills-panel animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2>Active Skills</h2>
            <SkillSummary activeSkills={activeSkills} skillsDatabase={data.skillsMap} />
          </div>
        </div>
      </main>

      <ItemSelectorModal 
        isOpen={itemModalState.isOpen} 
        onClose={() => setItemModalState(prev => ({...prev, isOpen: false}))}
        items={itemModalState.items}
        category={itemModalState.category}
        onSelect={handleSelectItem}
      />

      <DecoSelectorModal
        isOpen={decoModalState.isOpen}
        onClose={() => setDecoModalState(prev => ({...prev, isOpen: false}))}
        decorations={data.decorations}
        kindFilter={decoModalState.type === 'weapon' ? 'weapon' : 'armor'}
        maxSlot={decoModalState.maxSlotLevel}
        onSelect={handleSelectDeco}
      />

      <style>{`
        .layout { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid var(--border-color); }
        .subtitle { color: var(--accent-gold); font-style: italic; opacity: 0.8; margin-top: 5px; }
        .layout-grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          grid-template-rows: auto auto;
          gap: 30px; 
        }
        .mb-4 { margin-bottom: 30px; }
        .mt-3 { margin-top: 20px; }
        .header-content h1 { font-size: 2.5rem; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        
        @media (max-width: 1000px) {
          .layout-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default App;
