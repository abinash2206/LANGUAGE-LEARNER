import React from 'react';
import { Home, BookOpen, Mic, Award, User } from 'lucide-react';

export type NavTab = 'home' | 'learn' | 'speak' | 'test' | 'profile';

interface BottomNavigationProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <Home size={22} />
        <span className="ta-text">முகப்பு</span>
      </button>

      <button
        className={`nav-item ${currentTab === 'learn' ? 'active' : ''}`}
        onClick={() => onTabChange('learn')}
      >
        <BookOpen size={22} />
        <span className="ta-text">கற்றல்</span>
      </button>

      <button
        className={`nav-item ${currentTab === 'speak' ? 'active' : ''}`}
        onClick={() => onTabChange('speak')}
      >
        <Mic size={22} />
        <span className="ta-text">பேசுதல்</span>
      </button>

      <button
        className={`nav-item ${currentTab === 'test' ? 'active' : ''}`}
        onClick={() => onTabChange('test')}
      >
        <Award size={22} />
        <span className="ta-text">தேர்வு</span>
      </button>

      <button
        className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`}
        onClick={() => onTabChange('profile')}
      >
        <User size={22} />
        <span className="ta-text">சுயவிவரம்</span>
      </button>
    </nav>
  );
};
