import React from 'react';

function SkillSummary({ activeSkills, skillsDatabase }) {
  const activeSkillNames = Object.keys(activeSkills);

  if (activeSkillNames.length === 0) {
    return <div className="empty-state">No active skills from equipment.</div>;
  }

  return (
    <div className="skills-list">
      {activeSkillNames.map(skillName => {
        const level = activeSkills[skillName];
        const skillMeta = skillsDatabase[skillName];
        
        // If skill not in our database for some reason, provide fallbacks
        const maxLevel = skillMeta ? skillMeta.ranks.length : 5;
        const displayName = skillMeta ? skillMeta.name : skillName;
        
        const isMaxed = level >= maxLevel;
        const description = skillMeta?.description || "No detailed information available.";
        const rankDescription = skillMeta?.ranks?.[Math.min(level, maxLevel) - 1]?.description || "";
        
        return (
          <div key={skillName} className="skill-item" tabIndex="0">
            <div className="skill-header">
              <span className="skill-name">{displayName}</span>
              <span className={`skill-level ${isMaxed ? 'maxed' : ''}`}>
                Lv {Math.min(level, maxLevel)} <span className="max-level">/ {maxLevel}</span>
              </span>
            </div>
            
            <div className="skill-progress-bar">
              <div 
                className={`skill-progress-fill ${isMaxed ? 'maxed' : ''}`} 
                style={{ width: `${Math.min((level / maxLevel) * 100, 100)}%` }}
              ></div>
            </div>

            <div className="skill-tooltip">
              <div className="tooltip-title">{displayName}</div>
              <div className="tooltip-desc">{description}</div>
              {rankDescription && (
                <div className="tooltip-rank-effect">
                  <span className="rank-label">Current Level Effect:</span>
                  <p>{rankDescription}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <style>{`
        .skills-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .skill-item {
          background: rgba(0, 0, 0, 0.2);
          padding: 10px 15px;
          border-radius: 4px;
          border-left: 3px solid var(--border-color);
          transition: all 0.2s;
          position: relative;
          cursor: help;
        }

        .skill-item:hover, .skill-item:focus {
          border-left-color: var(--accent-gold);
          background: rgba(255, 255, 255, 0.05);
          outline: none;
        }

        .skill-tooltip {
          position: absolute;
          right: calc(100% + 15px);
          top: 50%;
          transform: translateY(-50%) translateX(10px);
          width: 280px;
          background: rgba(12, 14, 15, 0.98);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(206, 158, 75, 0.4);
          border-radius: 8px;
          padding: 16px;
          z-index: 1100;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(206, 158, 75, 0.05);
          pointer-events: none;
          text-align: left;
        }

        .skill-item:hover .skill-tooltip,
        .skill-item:focus .skill-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateY(-50%) translateX(0);
        }

        .tooltip-title {
          font-family: var(--font-serif);
          color: var(--accent-gold);
          font-size: 1.1rem;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(206, 158, 75, 0.2);
          padding-bottom: 4px;
        }

        .tooltip-desc {
          font-size: 0.85rem;
          color: var(--text-main);
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .tooltip-rank-effect {
          background: rgba(206, 158, 75, 0.1);
          padding: 8px 12px;
          border-radius: 4px;
          border-left: 2px solid var(--accent-gold);
        }

        .rank-label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--accent-gold);
          font-weight: 700;
          margin-bottom: 4px;
          letter-spacing: 0.5px;
        }

        .tooltip-rank-effect p {
          font-size: 0.85rem;
          margin: 0;
          color: var(--text-highlight);
          font-style: italic;
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .skill-name {
          font-weight: 600;
          color: var(--text-highlight);
        }

        .skill-level {
          font-size: 0.9rem;
          color: var(--text-muted);
          font-family: var(--font-main);
          font-weight: 600;
        }

        .skill-level.maxed {
          color: var(--accent-gold);
        }

        .max-level {
          opacity: 0.5;
          font-size: 0.8rem;
        }

        .skill-progress-bar {
          height: 6px;
          background: #111;
          border-radius: 3px;
          overflow: hidden;
        }

        .skill-progress-fill {
          height: 100%;
          background: var(--accent-blue);
          border-radius: 3px;
          transition: width 0.3s ease, background-color 0.3s ease;
        }

        .skill-progress-fill.maxed {
          background: var(--accent-gold);
        }
      `}</style>
    </div>
  );
}

export default SkillSummary;
