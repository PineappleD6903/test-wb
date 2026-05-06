import React from 'react';
import { Flame, Droplets, Snowflake, Zap, Skull, Shield, Sword, Percent } from 'lucide-react';

function StatsPanel({ activeStats }) {
  const resistances = activeStats.resistances || { fire: 0, water: 0, ice: 0, thunder: 0, dragon: 0 };
  const sharpness = activeStats.sharpness;

  const elementColors = {
    fire: '#ff4d4d',
    water: '#4da6ff',
    ice: '#80ffff',
    thunder: '#ffff4d',
    dragon: '#a64dff',
    poison: '#cc33ff',
    sleep: '#e6e6e6',
    paralysis: '#ffff99',
    blast: '#ff9933'
  };

  const elementIcons = {
    fire: <Flame size={18} />,
    water: <Droplets size={18} />,
    ice: <Snowflake size={18} />,
    thunder: <Zap size={18} />,
    dragon: <Skull size={18} />,
    poison: <Skull size={18} />,
    sleep: <Droplets size={18} />,
    paralysis: <Zap size={18} />,
    blast: <Flame size={18} />
  };

  const mainStats = [
    { label: 'Attack', value: Math.floor(activeStats.attack), color: 'var(--accent-red)', icon: <Sword size={18} /> },
    { label: 'Affinity', value: `${activeStats.affinity}%`, color: 'var(--accent-blue)', icon: <Percent size={18} /> },
    { label: 'Defense', value: activeStats.defense, color: 'var(--accent-gold)', icon: <Shield size={18} /> },
  ];

  if (activeStats.element && activeStats.element.type) {
    const type = activeStats.element.type;
    mainStats.push({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      value: activeStats.element.value,
      color: elementColors[type] || 'var(--text-main)',
      icon: elementIcons[type] || <Sword size={18} />
    });
  }

  const resStats = [
    { label: 'Fire', value: resistances.fire, color: '#ff4d4d', icon: <Flame size={16} /> },
    { label: 'Water', value: resistances.water, color: '#4da6ff', icon: <Droplets size={16} /> },
    { label: 'Ice', value: resistances.ice, color: '#80ffff', icon: <Snowflake size={16} /> },
    { label: 'Thunder', value: resistances.thunder, color: '#ffff4d', icon: <Zap size={16} /> },
    { label: 'Dragon', value: resistances.dragon, color: '#a64dff', icon: <Skull size={16} /> },
  ];

  const sharpnessColors = {
    red: '#ff4d4d',
    orange: '#ffa64d',
    yellow: '#ffff4d',
    green: '#4dff4d',
    blue: '#4da6ff',
    white: '#ffffff',
    purple: '#a64dff'
  };

  const renderSharpness = () => {
    if (!sharpness) return null;

    // We use a fixed total width representation (e.g. 400 units) to show relative sharpness
    // Or just proportional to the total sharpness of that specific weapon.
    // The user said "amount represented by the width of the section it takes in the bar"
    const total = Object.values(sharpness).reduce((a, b) => a + b, 0);
    if (total === 0) return null;

    return (
      <div className="sharpness-section">
        <div className="stat-label">Sharpness</div>
        <div className="sharpness-bar">
          {['red', 'orange', 'yellow', 'green', 'blue', 'white', 'purple'].map((color) => {
            const val = sharpness[color];
            if (!val || val <= 0) return null;
            return (
              <div 
                key={color} 
                className={`sharpness-segment ${color}`}
                style={{ 
                  width: `${(val / total) * 100}%`,
                  backgroundColor: sharpnessColors[color]
                }}
              />
            );
          })}
        </div>
        <div className="sharpness-total">
          <span className="total-label">Total Gauge:</span>
          <span className="total-val">{total}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="stats-container">
      <div className="main-stats">
        {mainStats.map((s, i) => (
          <div key={i} className="stat-card main">
            <div className="stat-icon-wrap" style={{ color: s.color }}>{s.icon}</div>
            <div className="stat-info">
              <div className="stat-label">{s.label}</div>
              <div className="stat-val" style={{ color: s.color }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {renderSharpness()}

      <div className="divider"></div>

      <div className="res-stats">
        {resStats.map((s, i) => (
          <div key={i} className="stat-card res">
            <div className="stat-icon-wrap" style={{ color: s.color }}>{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-val ${s.value < 0 ? 'negative' : ''}`}>
              {s.value > 0 ? `+${s.value}` : s.value}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .stats-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          height: 100%;
        }

        .main-stats {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sharpness-section {
          margin: 5px 0;
        }

        .sharpness-total {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }

        .total-label {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .total-val {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-gold);
          font-family: monospace;
        }

        .sharpness-bar {
          height: 12px;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          display: flex;
          overflow: hidden;
          margin-top: 4px;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
        }

        .sharpness-segment {
          height: 100%;
          transition: width 0.5s ease-in-out;
          box-shadow: inset 0 2px 2px rgba(255,255,255,0.2), inset 0 -2px 2px rgba(0,0,0,0.2);
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-color), transparent);
          margin: 5px 0;
        }

        .res-stats {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
        }

        .stat-card {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          display: flex;
          align-items: center;
          padding: 10px;
        }

        .stat-card.main {
          padding: 12px;
          gap: 12px;
        }

        .stat-card.res {
          flex-direction: column;
          padding: 8px 2px;
          gap: 4px;
          text-align: center;
        }

        .stat-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          color: var(--text-muted);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-val {
          font-size: 1.3rem;
          font-weight: 800;
          font-family: var(--font-serif);
        }

        .stat-card.res .stat-val {
          font-size: 1rem;
        }

        .stat-val.negative {
          color: var(--accent-red);
        }

        @media (max-width: 400px) {
          .res-stats { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  );
}

export default StatsPanel;
