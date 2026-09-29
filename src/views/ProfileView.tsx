import React, { useState } from 'react';
import { User, Download, Upload, Trash2, Moon, Sun, Smartphone } from 'lucide-react';
import type { LanguagePairId, CourseProgress, MistakeRecord } from '../types';
import { LANGUAGE_PAIRS } from '../data/languagePairs';
import { storageService } from '../services/storageService';
import { WORDS_DATABASE } from '../data/words';

interface ProfileViewProps {
  activePairId: LanguagePairId;
  progress: CourseProgress;
  mistakes: MistakeRecord[];
  bookmarks: string[];
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onRefreshData: () => void;
  onInstallApp?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  activePairId,
  progress,
  mistakes,
  bookmarks,
  theme,
  onToggleTheme,
  onRefreshData,
  onInstallApp
}) => {
  const [activeTab, setActiveTab] = useState<'progress' | 'mistakes' | 'bookmarks' | 'settings'>('progress');
  const activePair = LANGUAGE_PAIRS[activePairId];

  const bookmarkedWords = WORDS_DATABASE.filter((w) => w.languagePairId === activePairId && bookmarks.includes(w.id));

  const handleExportData = () => {
    const json = storageService.exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tamil_learner_backup_${activePairId}_${Date.now()}.json`;
    a.click();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (storageService.importData(content)) {
          alert('தரவு வெற்றிகரமாக இறக்குமதி செய்யப்பட்டது!');
          onRefreshData();
        } else {
          alert('பிழை: செல்லுபடியாகாத கோப்பு.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDeleteMistake = (id: string) => {
    storageService.deleteMistake(activePairId, id);
    onRefreshData();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Profile Banner */}
      <div className="card" style={{ textAlign: 'center', padding: '24px 16px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            margin: '0 auto 12px'
          }}
        >
          <User size={36} />
        </div>
        <h2 className="ta-text" style={{ fontSize: '20px', fontWeight: '700' }}>
          கற்பவர் சுயவிவரம்
        </h2>
        <div className="lang-badge" style={{ marginTop: '8px' }}>
          <span>{activePair.flagEmoji}</span>
          <span className="ta-text">{activePair.nameTamil}</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
        <button className={`btn-secondary ${activeTab === 'progress' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('progress')}>
          <span className="ta-text">முன்னேற்றம்</span>
        </button>
        <button className={`btn-secondary ${activeTab === 'mistakes' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('mistakes')}>
          <span className="ta-text">பிழை ஏடு ({mistakes.length})</span>
        </button>
        <button className={`btn-secondary ${activeTab === 'bookmarks' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('bookmarks')}>
          <span className="ta-text">சேமித்தவை ({bookmarks.length})</span>
        </button>
        <button className={`btn-secondary ${activeTab === 'settings' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('settings')}>
          <span className="ta-text">அமைப்புகள்</span>
        </button>
      </div>

      {/* Tab 1: Progress */}
      {activeTab === 'progress' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', textAlign: 'center' }}>
            <div style={{ padding: '12px', background: 'var(--card-border)', borderRadius: '14px' }}>
              <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--primary)' }}>{progress.wordsLearnedIds.length}</div>
              <div className="ta-text" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>கற்ற வார்த்தைகள்</div>
            </div>
            <div style={{ padding: '12px', background: 'var(--card-border)', borderRadius: '14px' }}>
              <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--accent)' }}>🔥 {progress.streakDays}</div>
              <div className="ta-text" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>தொடர் நாட்கள் (Streak)</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Mistake Notebook */}
      {activeTab === 'mistakes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {mistakes.length === 0 ? (
            <div className="card ta-text" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
              பிழைகள் எதுவும் இல்லை! அற்புதம்! 🌟
            </div>
          ) : (
            mistakes.map((m) => (
              <div key={m.id} className="card" style={{ borderColor: 'var(--danger)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="chip chip-casual">{m.mistakeType}</span>
                  <button className="btn-icon" onClick={() => handleDeleteMistake(m.id)}>
                    <Trash2 size={16} color="var(--danger)" />
                  </button>
                </div>

                <div className="ta-text" style={{ marginTop: '8px', fontSize: '15px', fontWeight: '600' }}>
                  கேள்வி: {m.question}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--danger)', marginTop: '4px' }}>
                  உங்கள் பதில்: {m.userAnswer}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--success)', marginTop: '2px', fontWeight: '600' }}>
                  சரியான பதில்: {m.correctAnswer}
                </div>
                <div className="tamil-explanation-box ta-text" style={{ marginTop: '8px' }}>
                  {m.explanationTamil}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {bookmarkedWords.length === 0 ? (
            <div className="card ta-text" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
              சேமிக்கப்பட்ட வார்த்தைகள் எதுவும் இல்லை.
            </div>
          ) : (
            bookmarkedWords.map((w) => (
              <div key={w.id} className="card">
                <div className="ta-text" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>தமிழ்: {w.tamilWord}</div>
                <div className="target-script">{w.targetWord}</div>
                {w.romanization && <div className="romanization-text">{w.romanization}</div>}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: Settings & Offline Backup */}
      {activeTab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Download / Install App */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: 'white', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Smartphone size={28} />
              <div>
                <h4 className="ta-text" style={{ fontSize: '16px', fontWeight: '700' }}>செயலியைத் தரவிறக்கம் செய்க (Install App)</h4>
                <p className="ta-text" style={{ fontSize: '12px', opacity: 0.9 }}>சாதனத்தில் 100% Offline-ஆகப் பயன்படுத்தலாம்.</p>
              </div>
            </div>
            <button className="btn-primary" style={{ marginTop: '12px', width: '100%', background: 'white', color: '#4f46e5' }} onClick={onInstallApp}>
              <Download size={18} />
              <span className="ta-text">Install App / தரவிறக்குக</span>
            </button>
          </div>

          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              <span className="ta-text">Dark Mode (இருண்ட பயன்முறை)</span>
            </div>
            <button className="btn-secondary" onClick={onToggleTheme}>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 className="ta-text" style={{ fontSize: '15px', fontWeight: '700' }}>தரவு மேலாண்மை (Data Backup)</h4>
            <button className="btn-secondary" onClick={handleExportData}>
              <Download size={16} />
              <span className="ta-text">தரவை ஏற்றுமதி செய்க (Export JSON)</span>
            </button>
            <label className="btn-secondary" style={{ cursor: 'pointer', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
              <Upload size={16} />
              <span className="ta-text">தரவை இறக்குமதி செய்க (Import JSON)</span>
              <input type="file" accept=".json" style={{ display: 'none' }} onChange={handleImportData} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
