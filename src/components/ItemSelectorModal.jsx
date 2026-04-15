import React, { useState } from 'react';
import { Shield, Sparkles, Search } from 'lucide-react';

function ItemSelectorModal({ isOpen, onClose, items, category, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Select {category}</h2>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
        
        <div className="modal-search">
          <Search size={18} style={{opacity: 0.5, marginRight: '10px'}} />
          <input 
            type="text" 
            placeholder="Search items..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="item-list">
          {filteredItems.map(item => (
            <div key={item.id} className="item-row" onClick={() => { onSelect(item); onClose(); }}>
              <div className="item-main">
                <span className="item-name">{item.name}</span>
                {item.defense?.base && <span className="item-stat"><Shield size={14} className="icon"/> {item.defense.base} Def</span>}
                {item.damage?.raw && <span className="item-stat"><Sparkles size={14} className="icon"/> {item.damage.raw} Atk</span>}
              </div>
              
              <div className="item-sub">
                 {item.slots && item.slots.length > 0 && (
                   <span className="slots-preview">Slots: [{item.slots.join(', ')}]</span>
                 )}
              </div>

              <div className="item-skills mt-1">
                {item.skills && item.skills.map((s, idx) => (
                  <span key={idx} className="skill-badge">{s.skill.name} +{s.level}</span>
                ))}
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && <div className="empty-state">No items found.</div>}
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }

        .modal-content {
          background: var(--bg-panel);
          border: 1px solid var(--border-gold);
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 40px rgba(0,0,0,0.8);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-header h2 { text-transform: capitalize; margin: 0; }

        .modal-search {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid var(--border-color);
          background: rgba(0,0,0,0.2);
        }
        
        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          font-family: var(--font-main);
          font-size: 1rem;
          outline: none;
        }

        .item-list {
          padding: 10px;
          overflow-y: auto;
          flex-grow: 1;
        }

        .item-row {
          padding: 15px;
          border-bottom: 1px solid #333;
          cursor: pointer;
          transition: background 0.2s;
        }

        .item-row:hover { background: rgba(255,255,255,0.05); }

        .item-main {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }

        .item-name {
          font-weight: 600;
          color: var(--text-highlight);
          flex-grow: 1;
          font-size: 1.05rem;
        }

        .item-stat {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-left: 15px;
        }

        .item-sub {
          color: #777;
          font-size: 0.8rem;
          margin-bottom: 6px;
        }

        .item-skills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .skill-badge {
          background: rgba(92, 184, 225, 0.15);
          color: var(--accent-blue);
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
        }
        
        .mt-1 { margin-top: 5px; }
        .icon { opacity: 0.7; }
      `}</style>
    </div>
  );
}

export default ItemSelectorModal;
