import React from 'react';
import { Mic, Volume2 } from 'lucide-react';
import type { LanguagePairId } from '../types';
import { WORDS_DATABASE } from '../data/words';
import { SENTENCES_DATABASE } from '../data/sentences';
import { audioService } from '../services/audioService';

interface SpeakViewProps {
  activePairId: LanguagePairId;
  onOpenSpeakModal: (promptTamil: string, target: string, romanization: string) => void;
}

export const SpeakView: React.FC<SpeakViewProps> = ({ activePairId, onOpenSpeakModal }) => {
  const words = WORDS_DATABASE.filter((w) => w.languagePairId === activePairId);
  const sentences = SENTENCES_DATABASE.filter((s) => s.languagePairId === activePairId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Mic size={32} />
          <div>
            <h2 className="ta-text" style={{ fontSize: '20px', fontWeight: '700' }}>
              உச்சரிப்புப் பயிற்சி (Pronunciation Coach)
            </h2>
            <p className="ta-text" style={{ fontSize: '13px', opacity: 0.9 }}>
              வாக்கியங்களையும் வார்த்தைகளையும் பேசிப் பயிற்சி செய்யுங்கள்.
            </p>
          </div>
        </div>
      </div>

      <h3 className="ta-text" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>
        சொற்களின் உச்சரிப்புப் பயிற்சி
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {words.map((w) => (
          <div key={w.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="ta-text" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                தமிழ்: {w.tamilWord}
              </div>
              <div className="target-script" style={{ fontSize: '20px' }}>{w.targetWord}</div>
              {w.romanization && <div className="romanization-text" style={{ fontSize: '13px' }}>{w.romanization}</div>}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-icon" onClick={() => audioService.speak(w.targetWord, activePairId)}>
                <Volume2 size={18} />
              </button>
              <button className="btn-primary" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={() => onOpenSpeakModal(w.tamilWord, w.targetWord, w.romanization)}>
                <Mic size={16} />
                <span>Speak</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="ta-text" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)', marginTop: '10px' }}>
        வாக்கியப் பேச்சுப் பயிற்சி
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sentences.map((s) => (
          <div key={s.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="ta-text" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                தமிழ்: {s.tamilSentence}
              </div>
              <div className="target-script" style={{ fontSize: '18px' }}>{s.targetSentence}</div>
              {s.romanization && <div className="romanization-text" style={{ fontSize: '13px' }}>{s.romanization}</div>}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-icon" onClick={() => audioService.speak(s.targetSentence, activePairId)}>
                <Volume2 size={18} />
              </button>
              <button className="btn-primary" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={() => onOpenSpeakModal(s.tamilSentence, s.targetSentence, s.romanization)}>
                <Mic size={16} />
                <span>Speak</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
