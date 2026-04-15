import React, { useState } from 'react';
import { Search } from 'lucide-react';

function DecoSelectorModal({ isOpen, onClose, decorations, kindFilter, maxSlot, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Filter decorations according to:
  // 1. Matches max slot bound
  // 2. Matches weapon/armor kind
  // 3. Search term
  const validDecos = decorations.filter(d => 
    d.slot <= maxSlot && 
    d.kind === kindFilter &&
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Select Level {maxSlot} {kindFilter === 'weapon' ? 'Weapon' : 'Armor'} Decoration</h2>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
        
        <div className="modal-search">
          <Search size={18} style={{opacity: 0.5, marginRight: '10px'}} />
          <input 
            type="text" 
            placeholder="Search decorations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="item-list">
          <div className="item-row" onClick={() => { onSelect(null); onClose(); }}>
            <span className="item-name" style={{fontStyle: 'italic', color: '#888'}}>Remove Decoration</span>
          </div>

          {validDecos.map(deco => (
            <div key={deco.id} className="item-row deco-row" onClick={() => { onSelect(deco); onClose(); }}>
              <div className="item-main">
                <span className={`deco-icon-circle level-${deco.slot}`}>
                  {deco.slot}
                </span>
                <span className="item-name">{deco.name}</span>
              </div>
              <div className="item-sub">
                 {deco.description}
              </div>
              <div className="item-skills mt-1">
                {deco.skills.map((s, idx) => (
                  <span key={idx} className="skill-badge">{s.skill.name} +{s.level}</span>
                ))}
              </div>
            </div>
          ))}
          {validDecos.length === 0 && <div className="empty-state">No matching decorations found.</div>}
        </div>
      </div>

      <style>{`
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 100; }
        .modal-content { background: var(--bg-panel); border: 1px solid var(--border-gold); border-radius: 8px; width: 90%; max-width: 600px; height: 80vh; display: flex; flex-direction: column; box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid var(--border-color); }
        .modal-header h2 { margin: 0; font-size: 1.2rem; }
        .modal-search { display: flex; align-items: center; padding: 15px 20px; border-bottom: 1px solid var(--border-color); background: rgba(0,0,0,0.2); }
        .search-input { flex: 1; background: transparent; border: none; color: white; font-family: var(--font-main); font-size: 1rem; outline: none; }
        .item-list { padding: 10px; overflow-y: auto; flex-grow: 1; }
        .item-row { padding: 15px; border-bottom: 1px solid #333; cursor: pointer; transition: background 0.2s; }
        .item-row:hover { background: rgba(255,255,255,0.05); }
        .item-main { display: flex; align-items: center; margin-bottom: 4px; gap: 10px; }
        .item-name { font-weight: 600; color: var(--text-highlight); flex-grow: 1; font-size: 1.05rem; }
        .item-sub { color: #777; font-size: 0.8rem; margin-bottom: 6px; padding-left: 34px; }
        .item-skills { display: flex; gap: 8px; flex-wrap: wrap; padding-left: 34px; }
        .skill-badge { background: rgba(92, 184, 225, 0.15); color: var(--accent-blue); padding: 3px 8px; border-radius: 12px; font-size: 0.75rem; }
        .mt-1 { margin-top: 5px; }

        .deco-icon-circle {
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; font-size: 0.8rem; font-weight: bold;
          border: 2px solid var(--text-muted);
          background: #111;
        }
        .deco-icon-circle.level-1 { border-color: #a7f3d0; color: #a7f3d0; }
        .deco-icon-circle.level-2 { border-color: #93c5fd; color: #93c5fd; }
        .deco-icon-circle.level-3 { border-color: #fca5a5; color: #fca5a5; }
      `}</style>
    </div>
  );
}

export default DecoSelectorModal;
