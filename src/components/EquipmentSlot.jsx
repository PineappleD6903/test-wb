import React from 'react';

function EquipmentSlot({ label, type, item, onClick, onSlotClick }) {
  const hasItem = item && item.id !== `none_${type}`;
  
  return (
    <div className="equipment-slot" onClick={onClick}>
      <div className="slot-label">{label}</div>
      <div className="slot-content">
        {hasItem ? (
          <div className="item-details">
            <span className="item-name">{item.name}</span>
            {item.slots && item.slots.length > 0 && (
              <div className="slots-container" onClick={e => e.stopPropagation()}>
                {item.slots.map((s, idx) => {
                  const deco = item.slottedDecorations ? item.slottedDecorations[idx] : null;
                  return (
                    <div 
                      key={idx} 
                      className={`deco-slot level-${s} ${deco ? 'filled' : ''}`}
                      onClick={(e) => { e.stopPropagation(); onSlotClick(type, idx, s); }}
                      title={deco ? deco.name : `Level ${s} Slot`}
                    >
                      {deco ? 'D' : s}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <span className="empty-slot">Select {label}...</span>
        )}
      </div>

      <style>{`
        .equipment-slot {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 10px 15px;
          margin-bottom: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all 0.2s ease;
          min-height: 52px;
        }

        .equipment-slot:hover {
          border-color: var(--accent-gold);
          background: var(--accent-gold-glow);
        }

        .slot-label {
          width: 80px;
          color: var(--text-muted);
          text-transform: uppercase;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .slot-content {
          flex-grow: 1;
        }

        .item-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .item-name {
          color: var(--text-highlight);
          font-weight: 600;
        }

        .empty-slot {
          color: #6b7280;
          font-style: italic;
        }

        .slots-container {
          display: flex;
          gap: 5px;
        }

        .deco-slot {
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #111;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: bold;
          border: 2px solid var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }

        .deco-slot:hover {
          transform: scale(1.1);
          box-shadow: 0 0 5px rgba(255,255,255,0.3);
        }

        .deco-slot.filled {
          background: rgba(255, 255, 255, 0.1);
        }

        .deco-slot.level-1 { border-color: #a7f3d0; color: #a7f3d0; }
        .deco-slot.level-2 { border-color: #93c5fd; color: #93c5fd; }
        .deco-slot.level-3 { border-color: #fca5a5; color: #fca5a5; }
      `}</style>
    </div>
  );
}

export default EquipmentSlot;
