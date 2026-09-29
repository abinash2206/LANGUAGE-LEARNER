import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { QuestionRecord, LanguagePairId } from '../types';
import { storageService } from '../services/storageService';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  languagePairId: LanguagePairId;
  questions: QuestionRecord[];
  testTitleTamil: string;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  languagePairId,
  questions,
  testTitleTamil
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen || questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleSelectOption = (opt: string) => {
    if (isSubmitted) return;
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isSubmitted) return;

    setIsSubmitted(true);
    const isCorrect = selectedOption.trim() === currentQ.correctAnswer.trim();

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      storageService.addMistake(languagePairId, {
        languagePairId,
        question: currentQ.questionTamil,
        userAnswer: selectedOption,
        correctAnswer: currentQ.correctAnswer,
        mistakeType: 'Vocabulary',
        explanationTamil: currentQ.explanationTamil
      });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const parseOptionDisplay = (optionText: string) => {
    const match = optionText.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) {
      return {
        targetScript: match[1],
        romanization: match[2]
      };
    }
    return {
      targetScript: optionText,
      romanization: null
    };
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
            <Award size={24} />
            <h3 className="ta-text" style={{ fontSize: '18px', fontWeight: '700' }}>
              {testTitleTamil}
            </h3>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {!isCompleted ? (
          <div>
            {/* Progress Bar */}
            <div style={{ height: '6px', background: 'var(--card-border)', borderRadius: '3px', marginBottom: '16px' }}>
              <div
                style={{
                  height: '100%',
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  background: 'var(--primary)',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              கேள்வி {currentIndex + 1} / {questions.length}
            </div>

            {/* Question Card */}
            <div className="card" style={{ marginBottom: '16px' }}>
              <h4 className="ta-text" style={{ fontSize: '17px', fontWeight: '600', lineHeight: '1.4' }}>
                {currentQ.questionTamil}
              </h4>
            </div>

            {/* Options list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {currentQ.options?.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                let optBg = 'var(--card-bg)';
                let optBorder = 'var(--card-border)';

                if (isSubmitted) {
                  if (opt === currentQ.correctAnswer) {
                    optBg = 'var(--success-light)';
                    optBorder = 'var(--success)';
                  } else if (isSelected && opt !== currentQ.correctAnswer) {
                    optBg = 'var(--danger-light)';
                    optBorder = 'var(--danger)';
                  }
                } else if (isSelected) {
                  optBorder = 'var(--primary)';
                  optBg = 'rgba(99, 102, 241, 0.1)';
                }

                const parsed = parseOptionDisplay(opt);

                return (
                  <button
                    key={idx}
                    className="card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      marginBottom: 0,
                      background: optBg,
                      borderColor: optBorder,
                      cursor: isSubmitted ? 'default' : 'pointer',
                      textAlign: 'left'
                    }}
                    onClick={() => handleSelectOption(opt)}
                  >
                    <div>
                      <div style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-main)' }}>
                        {parsed.targetScript}
                      </div>
                      {parsed.romanization && (
                        <div className="romanization-text" style={{ fontSize: '13.5px', marginTop: '2px' }}>
                          {parsed.romanization}
                        </div>
                      )}
                    </div>
                    {isSubmitted && opt === currentQ.correctAnswer && <CheckCircle2 size={20} color="var(--success)" />}
                    {isSubmitted && isSelected && opt !== currentQ.correctAnswer && <XCircle size={20} color="var(--danger)" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box on submit */}
            {isSubmitted && (
              <div className="tamil-explanation-box ta-text" style={{ marginBottom: '20px' }}>
                <strong>விளக்கம்:</strong> {currentQ.explanationTamil}
              </div>
            )}

            {/* Bottom Action */}
            <div style={{ textAlign: 'right' }}>
              {!isSubmitted ? (
                <button className="btn-primary ta-text" disabled={!selectedOption} onClick={handleCheckAnswer}>
                  சரிபார்க்கவும்
                </button>
              ) : (
                <button className="btn-primary ta-text" onClick={handleNext}>
                  <span>அடுத்த கேள்வி</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Award size={64} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
            <h3 className="ta-text" style={{ fontSize: '22px', fontWeight: '700' }}>
              தேர்வு முடிவடைந்தது! 🎉
            </h3>
            <p className="ta-text" style={{ marginTop: '8px', color: 'var(--text-muted)', fontSize: '15px' }}>
              உங்கள் மதிப்பெண்: {score} / {questions.length} (
              {Math.round((score / questions.length) * 100)}%)
            </p>

            <div style={{ marginTop: '24px' }}>
              <button className="btn-primary ta-text" onClick={onClose}>
                முகப்பிற்கு திரும்பு
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
