import React, { useState } from 'react';
import { Search, Volume2, Mic, ChevronRight } from 'lucide-react';
import type { LanguagePairId, WordRecord } from '../types';
import { searchService, type SearchResult } from '../services/searchService';
import { audioService } from '../services/audioService';
import { LANGUAGE_PAIRS } from '../data/languagePairs';

interface SearchViewProps {
  activePairId: LanguagePairId;
  onOpenWordDetail: (word: WordRecord) => void;
  onOpenSpeak: (promptTamil: string, target: string, romanization: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ activePairId, onOpenWordDetail, onOpenSpeak }) => {
  const [query, setQuery] = useState('');
  const [filterCat, setFilterCat] = useState<'all' | 'words' | 'sentences'>('all');
  const activePair = LANGUAGE_PAIRS[activePairId];

  const searchResults: SearchResult = searchService.search(query, activePairId, filterCat);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Search Input Box */}
      <div className="search-input-box">
        <Search size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--primary)' }} />
        <input
          type="text"
          className="search-input ta-text"
          placeholder={`தமிழ் / ${activePair.targetNameEnglish} / Thanglish தேடுக...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {/* Filter Options */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          className={`chip ${filterCat === 'all' ? 'chip-formal' : ''}`}
          style={{ background: filterCat === 'all' ? 'var(--primary)' : 'var(--card-border)', color: 'white', cursor: 'pointer' }}
          onClick={() => setFilterCat('all')}
        >
          அனைத்தும் ({searchResults.totalCount})
        </button>
        <button
          className={`chip ${filterCat === 'words' ? 'chip-formal' : ''}`}
          style={{ background: filterCat === 'words' ? 'var(--primary)' : 'var(--card-border)', color: 'white', cursor: 'pointer' }}
          onClick={() => setFilterCat('words')}
        >
          சொற்கள் ({searchResults.words.length})
        </button>
        <button
          className={`chip ${filterCat === 'sentences' ? 'chip-formal' : ''}`}
          style={{ background: filterCat === 'sentences' ? 'var(--primary)' : 'var(--card-border)', color: 'white', cursor: 'pointer' }}
          onClick={() => setFilterCat('sentences')}
        >
          வாக்கியங்கள் ({searchResults.sentences.length})
        </button>
      </div>

      {/* Results List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {searchResults.totalCount === 0 && query.trim().length > 0 ? (
          <div className="card ta-text" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
            "{query}" பற்றிய முடிவுகள் எதுவும் கிடைக்கவில்லை.
          </div>
        ) : (
          <>
            {/* Word Results */}
            {searchResults.words.map((w) => (
              <div key={w.id} className="learning-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="ta-text" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      தமிழ்: {w.tamilWord}
                    </span>
                    <div className="target-script">{w.targetWord}</div>
                    {w.romanization && <div className="romanization-text">{w.romanization}</div>}
                  </div>
                  <button className="btn-icon" onClick={() => onOpenWordDetail(w)}>
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="ta-text" style={{ fontSize: '13px', marginTop: '6px', color: 'var(--text-muted)' }}>
                  பொருள்: {w.meaningTamil}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button className="btn-secondary" onClick={() => audioService.speak(w.targetWord, activePairId)}>
                    <Volume2 size={16} />
                    <span>Listen</span>
                  </button>
                  <button className="btn-secondary" onClick={() => onOpenSpeak(w.tamilWord, w.targetWord, w.romanization)}>
                    <Mic size={16} />
                    <span>Practice</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Sentence Results */}
            {searchResults.sentences.map((s) => (
              <div key={s.id} className="learning-card">
                <div className="ta-text" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  தமிழ்: {s.tamilSentence}
                </div>

                <div className="target-script" style={{ fontSize: '20px' }}>{s.targetSentence}</div>
                {s.romanization && <div className="romanization-text">{s.romanization}</div>}

                {/* Word Breakdown */}
                {s.wordBreakdown && s.wordBreakdown.length > 0 && (
                  <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px' }}>
                    <div className="ta-text" style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)', marginBottom: '6px' }}>
                      சொல் பகுப்பாய்வு (Word Breakdown):
                    </div>
                    {s.wordBreakdown.map((wb, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                        <span className="ta-text">{wb.tamil}</span>
                        <span style={{ color: 'var(--secondary)', fontWeight: '600' }}>
                          {wb.target} {wb.romanization && `(${wb.romanization})`}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
