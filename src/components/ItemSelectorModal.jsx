import React, { useState } from 'react';
import { Shield, Sparkles, Search } from 'lucide-react';
import { getItemIconPath } from '../utils/itemIcons';

function ItemSelectorModal({ isOpen, onClose, items, category, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKind, setSelectedKind] = useState(null);

  // Reset filters when modal opens/closes or category changes
  React.useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSelectedKind(null);
    }
  }, [isOpen, category]);

  if (!isOpen) return null;

  const kinds = category === 'weapon' ? [...new Set(items.map(item => item.kind).filter(Boolean))] : [];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKind = !selectedKind || item.kind === selectedKind;
    return matchesSearch && matchesKind;
  });

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

        {kinds.length > 0 && (
          <div className="kind-filters custom-scrollbar">
            <button 
              className={`kind-btn ${!selectedKind ? 'active' : ''}`}
              onClick={() => setSelectedKind(null)}
              title="All Weapon Types"
            >
              ALL
            </button>
            {kinds.map(kind => {
              const iconPath = getItemIconPath({ kind });
              const displayName = kind.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
              return (
                <button 
                  key={kind}
                  className={`kind-btn ${selectedKind === kind ? 'active' : ''}`}
                  onClick={() => setSelectedKind(kind)}
                  title={displayName}
                >
                  {iconPath ? (
                    <img src={iconPath} alt={displayName} className="filter-icon" />
                  ) : (
                    displayName
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div className="item-list custom-scrollbar">
          {filteredItems.map(item => {
            const itemIcon = getItemIconPath(item);
            return (
              <div key={item.id} className="item-row" onClick={() => { onSelect(item); onClose(); }}>
                <div className="item-main">
                  <div className="item-name-container">
                    {itemIcon && <img src={itemIcon} alt="" className="item-icon" />}
                    <span className="item-name">{item.name}</span>
                  </div>
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
            );
          })}
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
          z-index: 1000;
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
          flex-shrink: 0;
        }

        .modal-header h2 { text-transform: capitalize; margin: 0; }

        .modal-search {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid var(--border-color);
          background: rgba(0,0,0,0.2);
          flex-shrink: 0;
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
          background: var(--bg-panel);
          position: relative;
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

        .item-name-container {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-grow: 1;
        }

        .item-icon {
          height: 20px;
          width: auto;
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.1));
        }

        .item-name {
          font-weight: 600;
          color: var(--text-highlight);
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

        .kind-filters {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
          gap: 8px;
          padding: 12px 20px;
          background: rgba(0,0,0,0.3);
          border-bottom: 1px solid var(--border-color);
          max-height: 160px;
          overflow-y: auto;
          flex-shrink: 0;
        }

        .kind-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-muted);
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .filter-icon {
          height: 28px;
          width: auto;
          opacity: 0.6;
          transition: all 0.2s ease;
          filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
        }

        .kind-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        .kind-btn:hover .filter-icon {
          opacity: 1;
          transform: scale(1.1);
        }

        .kind-btn.active {
          background: rgba(212, 175, 55, 0.15);
          border-color: var(--accent-gold);
          color: var(--accent-gold);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.1), inset 0 0 5px rgba(212, 175, 55, 0.1);
        }

        .kind-btn.active .filter-icon {
          opacity: 1;
          filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </div>
  );
}

export default ItemSelectorModal;
