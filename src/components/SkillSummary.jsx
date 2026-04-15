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
        
        return (
          <div key={skillName} className="skill-item">
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
          transition: border-color 0.2s;
        }

        .skill-item:hover {
          border-left-color: var(--accent-gold);
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
