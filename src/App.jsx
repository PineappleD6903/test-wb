import React, { useState, useEffect, useMemo } from 'react';
import './index.css';
import EquipmentSlot from './components/EquipmentSlot';
import StatsPanel from './components/StatsPanel';
import SkillSummary from './components/SkillSummary';
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

function App() {
  const [data, setData] = useState({
    weapon: [],
    head: [],
    chest: [],
    arms: [],
    waist: [],
    legs: [],
    skillsMap: {},
    decorations: []
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
        const [weaponsRes, armorRes, skillsRes, decosRes] = await Promise.all([
          fetch('/data/weapons.json'),
          fetch('/data/armor.json'),
          fetch('/data/skills.json'),
          fetch('/data/decorations.json')
        ]);
        
        const weaponsData = await weaponsRes.json();
        const armorData = await armorRes.json();
        const skillsData = await skillsRes.json();
        const decorations = await decosRes.json();

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
          decorations
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

  const activeStats = useMemo(() => {
    let attack = equipment.weapon?.damage?.raw || 0;
    let affinity = equipment.weapon?.affinity || 0;
    let defense = 0;

    Object.keys(equipment).forEach(key => {
      const item = equipment[key];
      if (item && item.defense?.base) defense += item.defense.base;
    });

    return { attack, affinity, defense };
  }, [equipment]);

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

    if (skills['Attack Boost']) {
      activeStats.attack += skills['Attack Boost'] * 3;
    }
    if (skills['Critical Eye']) {
      activeStats.affinity += skills['Critical Eye'] * 5;
    }

    return skills;
  }, [equipment, activeStats]);

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
        <div className="grid-layout">
          {/* Left Column: Equipment Slots */}
          <div className="equipment-column panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
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

          {/* Right Column: Stats and Skills */}
          <div className="stats-column animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="panel stats-panel mb-4">
              <h2>Hunter Stats</h2>
              <StatsPanel activeStats={activeStats} />
            </div>
            
            <div className="panel skills-panel">
              <h2>Active Skills</h2>
              <SkillSummary activeSkills={activeSkills} skillsDatabase={data.skillsMap} />
            </div>
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
        .grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .mb-4 { margin-bottom: 30px; }
        .mt-3 { margin-top: 20px; }
        .header-content h1 { font-size: 2.5rem; text-transform: uppercase; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        
        @media (max-width: 900px) {
          .grid-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default App;
