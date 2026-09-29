import React from 'react';
import { Award, BookOpen, Layers, CheckSquare, ArrowRight } from 'lucide-react';
import type { LanguagePairId, QuestionRecord } from '../types';
import { WORDS_DATABASE } from '../data/words';
import { GRAMMAR_DATABASE } from '../data/grammar';

interface TestViewProps {
  activePairId: LanguagePairId;
  onStartQuiz: (questions: QuestionRecord[], titleTamil: string) => void;
}

export const TestView: React.FC<TestViewProps> = ({ activePairId, onStartQuiz }) => {
  const words = WORDS_DATABASE.filter((w) => w.languagePairId === activePairId);

  const generateVocabQuiz = (): QuestionRecord[] => {
    return words.map((w, idx) => {
      const formattedCorrect = w.romanization
        ? `${w.targetWord} (${w.romanization})`
        : w.targetWord;

      // Select other real words from the same language pair as distractor options
      const distractors = words
        .filter((item) => item.id !== w.id)
        .map((item) =>
          item.romanization ? `${item.targetWord} (${item.romanization})` : item.targetWord
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const allOptions = [formattedCorrect, ...distractors].sort(() => Math.random() - 0.5);

      return {
        id: `vq_${idx}`,
        languagePairId: activePairId,
        type: 'multiple_choice',
        questionTamil: `"${w.tamilWord}" என்பதன் சரியான சொல் எது?`,
        options: allOptions,
        correctAnswer: formattedCorrect,
        explanationTamil: `${w.explanationTamil} (${w.tamilWord} = ${formattedCorrect})`
      };
    });
  };

  const generateGrammarQuiz = (): QuestionRecord[] => {
    const grammarTopics = GRAMMAR_DATABASE.filter((g) => g.languagePairId === activePairId);
    let questions: QuestionRecord[] = [];
    grammarTopics.forEach((gt) => {
      questions = questions.concat(gt.quizQuestions);
    });
    return questions;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Award size={32} />
          <div>
            <h2 className="ta-text" style={{ fontSize: '20px', fontWeight: '700' }}>
              சுய மதிப்பீட்டுத் தேர்வுகள் (Tests)
            </h2>
            <p className="ta-text" style={{ fontSize: '13px', opacity: 0.9 }}>
              உங்கள் கற்றல் நிலையைச் சோதித்துப் பிழைகளைத் திருத்துங்கள்.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Vocabulary Test */}
        <div className="card card-hover" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} />
            </div>
            <div>
              <div className="ta-text" style={{ fontWeight: '700', fontSize: '16px' }}>சொற்களஞ்சியத் தேர்வு</div>
              <div className="ta-text" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Vocabulary Test</div>
            </div>
          </div>
          <button className="btn-primary" onClick={() => onStartQuiz(generateVocabQuiz(), 'சொற்களஞ்சியத் தேர்வு')}>
            <span>Start</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Grammar Test */}
        <div className="card card-hover" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--accent-light)', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={20} />
            </div>
            <div>
              <div className="ta-text" style={{ fontWeight: '700', fontSize: '16px' }}>இலக்கணத் தேர்வு</div>
              <div className="ta-text" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Grammar Test</div>
            </div>
          </div>
          <button className="btn-primary" onClick={() => onStartQuiz(generateGrammarQuiz(), 'இலக்கணத் தேர்வு')}>
            <span>Start</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Full Assessment Test */}
        <div className="card card-hover" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--success-light)', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckSquare size={20} />
            </div>
            <div>
              <div className="ta-text" style={{ fontWeight: '700', fontSize: '16px' }}>முழு மதிப்பீட்டுத் தேர்வு</div>
              <div className="ta-text" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Full Assessment Test</div>
            </div>
          </div>
          <button className="btn-primary" onClick={() => onStartQuiz(generateVocabQuiz().concat(generateGrammarQuiz()), 'முழு மதிப்பீட்டுத் தேர்வு')}>
            <span>Start</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
