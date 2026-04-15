import React from 'react';

function StatsPanel({ activeStats }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-label">Attack</div>
        <div className="stat-val attack">{Math.floor(activeStats.attack)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Affinity</div>
        <div className="stat-val affinity">{activeStats.affinity}%</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Defense</div>
        <div className="stat-val defense">{activeStats.defense}</div>
      </div>

      <style>{`
        .stat-card {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 15px;
          text-align: center;
        }

        .stat-label {
          color: var(--text-muted);
          font-size: 0.85rem;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .stat-val {
          font-size: 1.8rem;
          font-weight: 800;
          font-family: var(--font-serif);
        }

        .stat-val.attack { color: var(--accent-red); }
        .stat-val.affinity { color: var(--accent-blue); }
        .stat-val.defense { color: var(--accent-gold); }
      `}</style>
    </div>
  );
}

export default StatsPanel;
