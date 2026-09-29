import React, { useState } from 'react';
import { Volume2, Mic, HelpCircle, ChevronRight } from 'lucide-react';
import type { LanguagePairId, WordRecord } from '../types';
import { WORDS_DATABASE } from '../data/words';
import { SENTENCES_DATABASE } from '../data/sentences';
import { GRAMMAR_DATABASE } from '../data/grammar';
import { ALPHABETS_DATABASE } from '../data/alphabets';
import { CONVERSATIONS_DATABASE } from '../data/conversations';
import { audioService, type AudioSpeed } from '../services/audioService';

interface LearnViewProps {
  activePairId: LanguagePairId;
  onOpenWordDetail: (word: WordRecord) => void;
  onOpenSpeak: (promptTamil: string, target: string, romanization: string) => void;
  onOpenWhyExplanation: (title: string, explanation: string) => void;
}

type LearnSubTab = 'alphabet' | 'words' | 'sentences' | 'grammar' | 'conversations';

export const LearnView: React.FC<LearnViewProps> = ({
  activePairId,
  onOpenWordDetail,
  onOpenSpeak,
  onOpenWhyExplanation
}) => {
  const [subTab, setSubTab] = useState<LearnSubTab>('words');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const words = WORDS_DATABASE.filter((w) => w.languagePairId === activePairId);
  const sentences = SENTENCES_DATABASE.filter((s) => s.languagePairId === activePairId);
  const grammarTopics = GRAMMAR_DATABASE.filter((g) => g.languagePairId === activePairId);
  const alphabets = ALPHABETS_DATABASE.filter((a) => a.languagePairId === activePairId);
  const conversations = CONVERSATIONS_DATABASE.filter((c) => c.languagePairId === activePairId);

  const categories = Array.from(new Set(words.map((w) => w.category)));
  const filteredWords = selectedCategory === 'all' ? words : words.filter((w) => w.category === selectedCategory);

  const handleSpeak = (text: string, speed: AudioSpeed = 'medium') => {
    audioService.speak(text, activePairId, speed);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Sub Tabs Selector */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        <button
          className={`btn-secondary ${subTab === 'words' ? 'btn-primary' : ''}`}
          onClick={() => setSubTab('words')}
        >
          <span className="ta-text">சொற்கள்</span>
        </button>
        <button
          className={`btn-secondary ${subTab === 'sentences' ? 'btn-primary' : ''}`}
          onClick={() => setSubTab('sentences')}
        >
          <span className="ta-text">வாக்கியங்கள்</span>
        </button>
        <button
          className={`btn-secondary ${subTab === 'grammar' ? 'btn-primary' : ''}`}
          onClick={() => setSubTab('grammar')}
        >
          <span className="ta-text">இலக்கணம்</span>
        </button>
        <button
          className={`btn-secondary ${subTab === 'conversations' ? 'btn-primary' : ''}`}
          onClick={() => setSubTab('conversations')}
        >
          <span className="ta-text">உரையாடல்கள்</span>
        </button>
        <button
          className={`btn-secondary ${subTab === 'alphabet' ? 'btn-primary' : ''}`}
          onClick={() => setSubTab('alphabet')}
        >
          <span className="ta-text">எழுத்துக்கள்</span>
        </button>
      </div>

      {/* SubTab 1: Words & Vocabulary */}
      {subTab === 'words' && (
        <div>
          {/* Category Filter Chips */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginBottom: '14px', paddingBottom: '4px' }}>
            <button
              className={`chip ${selectedCategory === 'all' ? 'chip-formal' : ''}`}
              style={{ background: selectedCategory === 'all' ? 'var(--primary)' : 'var(--card-border)', color: 'white', cursor: 'pointer' }}
              onClick={() => setSelectedCategory('all')}
            >
              அனைத்தும்
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className="chip"
                style={{
                  background: selectedCategory === cat ? 'var(--primary)' : 'var(--card-border)',
                  color: 'white',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredWords.map((word) => (
              <div key={word.id} className="learning-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="ta-text" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      தமிழ்: {word.tamilWord}
                    </span>
                    <div className="target-script">{word.targetWord}</div>
                    {word.romanization && <div className="romanization-text">{word.romanization}</div>}
                  </div>
                  <button className="btn-icon" onClick={() => onOpenWordDetail(word)}>
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="ta-text" style={{ fontSize: '13.5px', marginTop: '8px', color: 'var(--text-muted)' }}>
                  பொருள்: {word.meaningTamil}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                  <button className="btn-secondary" onClick={() => handleSpeak(word.targetWord, 'medium')}>
                    <Volume2 size={16} />
                    <span>Listen</span>
                  </button>
                  <button className="btn-secondary" onClick={() => onOpenSpeak(word.tamilWord, word.targetWord, word.romanization)}>
                    <Mic size={16} />
                    <span>Practice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 2: Sentences & Word Breakdown */}
      {subTab === 'sentences' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {sentences.map((sent) => (
            <div key={sent.id} className="learning-card">
              <div className="ta-text" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                தமிழ்: {sent.tamilSentence}
              </div>

              <div className="target-script" style={{ fontSize: '22px' }}>{sent.targetSentence}</div>
              {sent.romanization && <div className="romanization-text">{sent.romanization}</div>}

              {/* Word Breakdown */}
              {sent.wordBreakdown && sent.wordBreakdown.length > 0 && (
                <div style={{ marginTop: '14px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>
                  <div className="ta-text" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>
                    சொல் பகுப்பாய்வு (Word Breakdown):
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {sent.wordBreakdown.map((wb, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span className="ta-text">{wb.tamil}</span>
                        <span style={{ color: 'var(--secondary)', fontWeight: '600' }}>
                          {wb.target} {wb.romanization && `(${wb.romanization})`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="tamil-explanation-box ta-text">
                {sent.explanationTamil}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                <button className="btn-secondary" onClick={() => handleSpeak(sent.targetSentence, 'medium')}>
                  <Volume2 size={16} />
                  <span>Listen</span>
                </button>
                <button className="btn-secondary" onClick={() => onOpenSpeak(sent.tamilSentence, sent.targetSentence, sent.romanization)}>
                  <Mic size={16} />
                  <span>Practice</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 3: Grammar Topics with "Why?" Button */}
      {subTab === 'grammar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {grammarTopics.map((gt) => (
            <div key={gt.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 className="ta-text" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)' }}>
                    {gt.titleTamil}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--secondary)', fontWeight: '600' }}>
                    {gt.titleTarget}
                  </div>
                </div>

                <button
                  className="btn-secondary"
                  style={{ background: 'var(--accent-light)', color: '#b45309' }}
                  onClick={() => onOpenWhyExplanation(gt.titleTamil, gt.whyExplanationTamil)}
                >
                  <HelpCircle size={16} />
                  <span className="ta-text">❓ ஏன்?</span>
                </button>
              </div>

              <div className="tamil-explanation-box ta-text" style={{ marginTop: '12px' }}>
                {gt.explanationTamil}
              </div>

              <div style={{ marginTop: '12px', padding: '10px 12px', background: 'var(--card-border)', borderRadius: '10px', fontSize: '13px' }}>
                <strong>வடிவம் (Pattern):</strong> {gt.structurePattern}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 4: Conversations */}
      {subTab === 'conversations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {conversations.map((conv) => (
            <div key={conv.id} className="card">
              <h3 className="ta-text" style={{ fontSize: '17px', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>
                🗣️ {conv.titleTamil} ({conv.titleTarget})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {conv.turns.map((turn, idx) => (
                  <div key={idx} style={{ background: 'var(--card-border)', padding: '12px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent)' }}>
                      {turn.speaker}
                    </div>
                    <div className="ta-text" style={{ fontSize: '14px', marginTop: '2px' }}>
                      தமிழ்: {turn.tamil}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--secondary)', marginTop: '4px' }}>
                      Target: {turn.target}
                    </div>
                    {turn.romanization && (
                      <div className="romanization-text" style={{ fontSize: '13px' }}>
                        {turn.romanization}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <button className="btn-secondary" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => handleSpeak(turn.target, 'medium')}>
                        <Volume2 size={14} />
                        <span>Listen</span>
                      </button>
                      <button className="btn-secondary" style={{ padding: '6px 10px', fontSize: '12px' }} onClick={() => onOpenSpeak(turn.tamil, turn.target, turn.romanization)}>
                        <Mic size={14} />
                        <span>Speak</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 5: Alphabet & Sounds */}
      {subTab === 'alphabet' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {alphabets.map((alpha) => (
            <div key={alpha.id} className="card" style={{ textAlign: 'center', marginBottom: 0 }}>
              <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--secondary)' }}>
                {alpha.letter}
              </div>
              <div className="romanization-text" style={{ fontSize: '16px' }}>{alpha.romanization}</div>
              <div className="ta-text" style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                தமிழ் ஒலி: {alpha.tamilSoundEquivalent}
              </div>
              <p className="ta-text" style={{ fontSize: '12px', marginTop: '6px', lineHeight: '1.4' }}>
                {alpha.tamilExplanation}
              </p>
              <button className="btn-secondary" style={{ width: '100%', marginTop: '10px', justifyContent: 'center' }} onClick={() => handleSpeak(alpha.letter, 'slow')}>
                <Volume2 size={16} />
                <span>ஒலி கேட்க</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
