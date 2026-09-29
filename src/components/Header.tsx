import React from 'react';
import { Flame, Search, Settings } from 'lucide-react';
import type { LanguagePairId } from '../types';
import { LANGUAGE_PAIRS } from '../data/languagePairs';

interface HeaderProps {
  activePairId: LanguagePairId;
  streakDays: number;
  onOpenLanguageSelector: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePairId,
  streakDays,
  onOpenLanguageSelector,
  onOpenSearch,
  onOpenSettings
}) => {
  const activePair = LANGUAGE_PAIRS[activePairId];

  return (
    <header className="app-header">
      <button className="lang-badge" onClick={onOpenLanguageSelector} title="மொழியை மாற்றவும்">
        <span>{activePair.flagEmoji}</span>
        <span className="ta-text">{activePair.nameTamil}</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--accent-light)',
            color: '#b45309',
            padding: '4px 10px',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: '700'
          }}
          title="Daily Streak"
        >
          <Flame size={16} fill="#f59e0b" color="#f59e0b" />
          <span>{streakDays} நாள்</span>
        </div>

        <button className="btn-icon" onClick={onOpenSearch} title="தேடுதல்">
          <Search size={18} />
        </button>

        <button className="btn-icon" onClick={onOpenSettings} title="அமைப்புகள்">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};
