import React from 'react';
import { ShieldAlert, Users } from 'lucide-react';

function ArmorPassivePanel({ passives }) {
  if (passives.length === 0) {
    return (
      <div className="empty-passives">
        <p>Equip armor pieces to discover set passives.</p>
      </div>
    );
  }

  return (
    <div className="passives-list">
      {passives.map((p, idx) => (
        <div key={idx} className={`passive-item ${p.active ? 'active' : 'potential'}`}>
          <div className="passive-header">
            <div className="passive-title-area">
              {p.type === 'set' ? <ShieldAlert size={16} className="passive-icon set-icon" /> : <Users size={16} className="passive-icon group-icon" />}
              <span className="passive-name">{p.name}</span>
            </div>
            <span className="passive-count">{p.count} / {p.required}</span>
          </div>
          <div className="passive-progress-bg">
            <div 
              className="passive-progress-fill" 
              style={{ width: `${Math.min(100, (p.count / p.required) * 100)}%`, background: p.type === 'set' ? 'var(--accent-gold)' : 'var(--accent-blue)' }}
            />
          </div>
          <p className="passive-description">{p.description}</p>
          {p.active && <div className="active-tag" style={{ background: p.type === 'set' ? 'var(--accent-gold)' : 'var(--accent-blue)' }}>Active</div>}
        </div>
      ))}
      
      <style>{`
        .passives-list { display: flex; flex-direction: column; gap: 15px; margin-top: 15px; }
        
        .passive-item {
          position: relative;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.02);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        
        .passive-item.active {
          border-color: rgba(212, 175, 55, 0.5);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.02);
        }
        
        .passive-item.potential {
          opacity: 0.6;
          filter: grayscale(0.5);
        }
        
        .passive-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .passive-title-area {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .passive-icon { opacity: 0.8; }
        .set-icon { color: var(--accent-gold); }
        .group-icon { color: var(--accent-blue); }
        
        .passive-name {
          font-weight: 700;
          color: var(--text-highlight);
          letter-spacing: 0.5px;
        }
        
        .passive-count {
          font-size: 0.75rem;
          color: var(--text-highlight);
          font-family: monospace;
          background: rgba(0,0,0,0.3);
          padding: 2px 8px;
          border-radius: 10px;
        }
        
        .passive-progress-bg {
          height: 3px;
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
          margin-bottom: 10px;
          overflow: hidden;
        }
        
        .passive-progress-fill {
          height: 100%;
          transition: width 0.8s ease-out;
        }
        
        .passive-description {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }
        
        .active-tag {
          position: absolute;
          top: 0;
          right: 0;
          color: black;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 2px 10px;
          border-bottom-left-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .empty-passives {
          text-align: center;
          padding: 30px;
          color: #666;
          font-style: italic;
          border: 1px dashed #333;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

export default ArmorPassivePanel;
