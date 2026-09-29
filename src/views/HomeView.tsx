import React from 'react';
import { BookOpen, Mic, Award, Search, Calendar, BookMarked, AlertCircle, Play, Sparkles } from 'lucide-react';
import type { LanguagePairId, WordRecord, SentenceRecord } from '../types';
import { LANGUAGE_PAIRS } from '../data/languagePairs';

interface HomeViewProps {
  activePairId: LanguagePairId;
  streakDays: number;
  dailyGoalMinutes: number;
  dailyMinutesSpent: number;
  wordOfTheDay: WordRecord;
  phraseOfTheDay: SentenceRecord;
  onNavigateTab: (tab: 'learn' | 'speak' | 'test' | 'profile') => void;
  onOpenSearch: () => void;
  onOpenWordDetail: (word: WordRecord) => void;
  onOpenSpeak: (promptTamil: string, target: string, romanization: string) => void;
  onOpenMistakeNotebook: () => void;
  onOpenBookmarks: () => void;
  onOpenDaily: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  activePairId,
  streakDays,
  dailyGoalMinutes,
  dailyMinutesSpent,
  wordOfTheDay,
  onNavigateTab,
  onOpenSearch,
  onOpenWordDetail,
  onOpenSpeak,
  onOpenMistakeNotebook,
  onOpenBookmarks,
  onOpenDaily
}) => {
  const activePair = LANGUAGE_PAIRS[activePairId];
  const progressPercent = Math.min(100, Math.round((dailyMinutesSpent / dailyGoalMinutes) * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Welcome Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '13px', opacity: 0.9 }}>வணக்கம்! 👋</span>
            <h2 className="ta-text" style={{ fontSize: '22px', fontWeight: '700', marginTop: '2px' }}>
              இன்றைய கற்றலைத் தொடங்குங்கள்
            </h2>
            <p className="ta-text" style={{ fontSize: '13px', marginTop: '4px', opacity: 0.9 }}>
              தாய்மொழி தமிழ் மூலம் {activePair.targetNameEnglish} கற்போம்.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: '700' }}>
            🔥 {streakDays} நாள்
          </div>
        </div>

        {/* Daily Goal Bar */}
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
            <span className="ta-text">இன்றைய இலக்கு: {dailyMinutesSpent} / {dailyGoalMinutes} நிமிடங்கள்</span>
            <span>{progressPercent}%</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: '#ffffff',
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      </div>

      {/* Quick Search Action Bar */}
      <button
        className="card card-hover"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 18px',
          marginBottom: 0,
          background: 'var(--card-bg)',
          cursor: 'pointer',
          textAlign: 'left'
        }}
        onClick={onOpenSearch}
      >
        <Search size={20} color="var(--primary)" />
        <span className="ta-text" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          தமிழ் வார்த்தை / {activePair.targetNameEnglish} / Thanglish தேடுக...
        </span>
      </button>

      {/* Primary Feature Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        <button
          className="card card-hover"
          style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', marginBottom: 0 }}
          onClick={() => onNavigateTab('learn')}
        >
          <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={20} />
          </div>
          <div className="ta-text" style={{ fontWeight: '700', fontSize: '15px' }}>📖 Learn Today</div>
          <div className="ta-text" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>சொற்கள் & இலக்கணம்</div>
        </button>

        <button
          className="card card-hover"
          style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', marginBottom: 0 }}
          onClick={() => onNavigateTab('speak')}
        >
          <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'var(--secondary-light)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mic size={20} />
          </div>
          <div className="ta-text" style={{ fontWeight: '700', fontSize: '15px' }}>🎤 Speak Practice</div>
          <div className="ta-text" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>உச்சரிப்புப் பயிற்சி</div>
        </button>

        <button
          className="card card-hover"
          style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', marginBottom: 0 }}
          onClick={() => onNavigateTab('test')}
        >
          <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'var(--accent-light)', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={20} />
          </div>
          <div className="ta-text" style={{ fontWeight: '700', fontSize: '15px' }}>📝 Take Test</div>
          <div className="ta-text" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>சுய மதிப்பீடு</div>
        </button>

        <button
          className="card card-hover"
          style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', marginBottom: 0 }}
          onClick={onOpenDaily}
        >
          <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'var(--success-light)', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={20} />
          </div>
          <div className="ta-text" style={{ fontWeight: '700', fontSize: '15px' }}>📅 Daily Learning</div>
          <div className="ta-text" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>தினசரி பயிற்சிகள்</div>
        </button>
      </div>

      {/* Word of the Day Card */}
      <div className="learning-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)' }}>
            <Sparkles size={18} />
            <span className="ta-text" style={{ fontSize: '13px', fontWeight: '700' }}>இன்றைய சிறப்புச் சொல் (Word of the Day)</span>
          </div>
          <span className="chip chip-normal">Common</span>
        </div>

        <div className="ta-text" style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
          தமிழ்: {wordOfTheDay.tamilWord}
        </div>
        <div className="target-script">{wordOfTheDay.targetWord}</div>
        {wordOfTheDay.romanization && <div className="romanization-text">{wordOfTheDay.romanization}</div>}

        <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
          <button className="btn-primary" onClick={() => onOpenWordDetail(wordOfTheDay)}>
            <Play size={16} />
            <span>விவரம் பார்</span>
          </button>

          <button
            className="btn-secondary"
            onClick={() => onOpenSpeak(wordOfTheDay.tamilWord, wordOfTheDay.targetWord, wordOfTheDay.romanization)}
          >
            <Mic size={16} />
            <span>பேசிப்பார்</span>
          </button>
        </div>
      </div>

      {/* Secondary Actions: Mistake Notebook & Bookmarks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        <button
          className="card card-hover"
          style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: 0 }}
          onClick={onOpenMistakeNotebook}
        >
          <AlertCircle size={20} color="var(--danger)" />
          <div style={{ textAlign: 'left' }}>
            <div className="ta-text" style={{ fontWeight: '700', fontSize: '14px' }}>பிழைத் திருத்தம்</div>
            <div className="ta-text" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Mistake Notebook</div>
          </div>
        </button>

        <button
          className="card card-hover"
          style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: 0 }}
          onClick={onOpenBookmarks}
        >
          <BookMarked size={20} color="var(--accent)" />
          <div style={{ textAlign: 'left' }}>
            <div className="ta-text" style={{ fontWeight: '700', fontSize: '14px' }}>சேமித்தவை</div>
            <div className="ta-text" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Bookmarks</div>
          </div>
        </button>
      </div>
    </div>
  );
};
