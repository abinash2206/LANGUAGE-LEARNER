import React from 'react';
import { Volume2, Mic, Star, X } from 'lucide-react';
import type { WordRecord } from '../types';
import { audioService, type AudioSpeed } from '../services/audioService';

interface WordDetailModalProps {
  word: WordRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSpeak: (word: WordRecord) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  word,
  isOpen,
  onClose,
  onOpenSpeak,
  isBookmarked,
  onToggleBookmark
}) => {
  if (!isOpen || !word) return null;

  const handleSpeakWord = (speed: AudioSpeed = 'medium') => {
    audioService.speak(word.targetWord, word.languagePairId, speed);
  };

  const usageChipClass =
    word.usageType === 'formal'
      ? 'chip-formal'
      : word.usageType === 'casual'
      ? 'chip-casual'
      : word.usageType === 'modern_spoken'
      ? 'chip-modern'
      : 'chip-normal';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`chip ${usageChipClass}`}>{word.usageType}</span>
            <span className="chip" style={{ background: 'var(--card-border)', color: 'var(--text-main)' }}>
              {word.partOfSpeech}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button className="btn-icon" onClick={onToggleBookmark} title="Bookmark">
              <Star size={18} fill={isBookmarked ? '#f59e0b' : 'none'} color={isBookmarked ? '#f59e0b' : 'currentColor'} />
            </button>
            <button className="btn-icon" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Word Display */}
        <div className="learning-card" style={{ marginBottom: '16px' }}>
          <div className="ta-text" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            தமிழ்:
          </div>
          <div className="ta-text" style={{ fontSize: '20px', fontWeight: '700', marginTop: '2px' }}>
            {word.tamilWord}
          </div>

          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '13px', color: 'var(--secondary)', fontWeight: '600' }}>Target Word:</div>
            <div className="target-script">{word.targetWord}</div>
            {word.romanization && <div className="romanization-text">{word.romanization}</div>}
          </div>

          <div className="ta-text" style={{ fontSize: '14px', marginTop: '10px', color: 'var(--text-muted)' }}>
            பொருள்: {word.meaningTamil}
          </div>

          {/* Action buttons (Slow, Medium, Deep speeds) */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={() => handleSpeakWord('medium')}>
              <Volume2 size={16} />
              <span>Normal</span>
            </button>

            <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={() => handleSpeakWord('slow')}>
              <Volume2 size={16} />
              <span>Slow (0.5x)</span>
            </button>

            <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={() => handleSpeakWord('deep')}>
              <Volume2 size={16} />
              <span>Deep</span>
            </button>

            <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={() => onOpenSpeak(word)}>
              <Mic size={16} />
              <span>Practice</span>
            </button>
          </div>
        </div>

        {/* Tamil Explanation */}
        <div className="tamil-explanation-box ta-text" style={{ marginBottom: '16px' }}>
          <strong>தமிழில் விளக்கம்:</strong>
          <p style={{ marginTop: '4px' }}>{word.explanationTamil}</p>
        </div>

        {/* Example Sentence */}
        {word.exampleTarget && (
          <div className="card" style={{ marginBottom: '16px' }}>
            <h4 className="ta-text" style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: 'var(--primary)' }}>
              உதாரண வாக்கியம் (Example Sentence)
            </h4>
            <div className="ta-text" style={{ fontSize: '15px' }}>
              தமிழ்: {word.exampleTamil}
            </div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--secondary)', marginTop: '4px' }}>
              Target: {word.exampleTarget}
            </div>
            {word.exampleRomanization && (
              <div className="romanization-text" style={{ fontSize: '14px' }}>
                {word.exampleRomanization}
              </div>
            )}
          </div>
        )}

        {/* Related Words */}
        {word.relatedWords && word.relatedWords.length > 0 && (
          <div className="card">
            <h4 className="ta-text" style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: 'var(--primary)' }}>
              தொடர்புடைய வார்த்தைகள் (Related Words)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {word.relatedWords.map((rw, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: 'var(--card-border)',
                    borderRadius: '10px',
                    fontSize: '14px'
                  }}
                >
                  <span className="ta-text">{rw.tamil}</span>
                  <span style={{ color: 'var(--secondary)', fontWeight: '600' }}>
                    {rw.target} {rw.romanization && `(${rw.romanization})`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
