import React, { useState } from 'react';
import { Mic, Volume2, X, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { LanguagePairId } from '../types';
import { audioService, type AudioSpeed } from '../services/audioService';
import { speechRecognitionService, type SpeechResult } from '../services/speechRecognitionService';

interface SpeakingPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  languagePairId: LanguagePairId;
  tamilPrompt: string;
  targetSentence: string;
  romanization: string;
}

export const SpeakingPracticeModal: React.FC<SpeakingPracticeModalProps> = ({
  isOpen,
  onClose,
  languagePairId,
  tamilPrompt,
  targetSentence,
  romanization
}) => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<SpeechResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stopFn, setStopFn] = useState<(() => void) | null>(null);

  if (!isOpen) return null;

  const handleListenTarget = (speed: AudioSpeed = 'medium') => {
    audioService.speak(targetSentence, languagePairId, speed);
  };

  const handleStartSpeaking = () => {
    setErrorMessage(null);
    setResult(null);

    const isAvailable = speechRecognitionService.checkAvailability();
    if (!isAvailable) {
      setErrorMessage('இந்த சாதனத்தில் offline speech recognition கிடைக்கவில்லை. Audio கேட்டு practice செய்யவும்.');
      return;
    }

    setIsListening(true);
    const stop = speechRecognitionService.startListening(
      languagePairId,
      targetSentence,
      (res) => {
        setIsListening(false);
        setResult(res);
      },
      (err) => {
        setIsListening(false);
        setErrorMessage(err);
      }
    );
    setStopFn(() => stop);
  };

  const handleStopSpeaking = () => {
    if (stopFn) {
      stopFn();
      setStopFn(null);
    }
    setIsListening(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
            <Mic size={24} />
            <h3 className="ta-text" style={{ fontSize: '18px', fontWeight: '700' }}>
              பேச்சுப் பயிற்சி (Speaking Practice)
            </h3>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Prompt Card */}
        <div className="learning-card" style={{ marginBottom: '20px' }}>
          <span className="ta-text" style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            தமிழ்:
          </span>
          <div className="ta-text" style={{ fontSize: '17px', fontWeight: '600', marginTop: '2px' }}>
            {tamilPrompt}
          </div>

          <div style={{ marginTop: '14px' }}>
            <span style={{ color: 'var(--secondary)', fontSize: '13px', fontWeight: '600' }}>
              Target Language:
            </span>
            <div className="target-script">{targetSentence}</div>
            {romanization && <div className="romanization-text">{romanization}</div>}
          </div>

          {/* Audio controls for Slow, Medium, Deep */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={() => handleListenTarget('medium')}>
              <Volume2 size={16} />
              <span>Normal</span>
            </button>
            <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={() => handleListenTarget('slow')}>
              <Volume2 size={16} />
              <span>Slow (0.5x)</span>
            </button>
            <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={() => handleListenTarget('deep')}>
              <Volume2 size={16} />
              <span>Deep Voice</span>
            </button>
          </div>
        </div>

        {/* Speaking Controller */}
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          {!isListening ? (
            <button
              className="btn-primary recording-trigger"
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                fontSize: '18px',
                margin: '0 auto'
              }}
              onClick={handleStartSpeaking}
              title="பேசத் தொடங்க அழுத்தவும்"
            >
              <Mic size={32} />
            </button>
          ) : (
            <button
              className="btn-primary recording-pulse"
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'var(--danger)',
                margin: '0 auto'
              }}
              onClick={handleStopSpeaking}
            >
              <Mic size={32} />
            </button>
          )}

          <p className="ta-text" style={{ marginTop: '10px', fontSize: '13px', color: 'var(--text-muted)' }}>
            {isListening ? 'கேட்கப்படுகிறது... பேசுங்கள்! 🎤' : 'மைக் பொத்தானை அழுத்திப் பேசுங்கள்'}
          </p>
        </div>

        {/* Error / Fallback Notification Banner */}
        {errorMessage && (
          <div
            className="ta-text"
            style={{
              background: 'var(--danger-light)',
              color: '#991b1b',
              padding: '12px 16px',
              borderRadius: '14px',
              fontSize: '13.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px'
            }}
          >
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div
            style={{
              background: result.isSuccess ? 'var(--success-light)' : 'var(--accent-light)',
              color: result.isSuccess ? '#065f46' : '#92400e',
              padding: '16px',
              borderRadius: '16px',
              marginTop: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                {result.isSuccess ? <CheckCircle2 size={20} /> : <RefreshCw size={20} />}
                <span>துல்லியம்: {result.accuracyPercent}%</span>
              </div>
            </div>

            <div style={{ fontSize: '14px', marginTop: '8px' }}>
              <strong>நீங்கள் பேசியது:</strong> "{result.transcript}"
            </div>

            <div className="ta-text" style={{ marginTop: '8px', fontSize: '14px', lineHeight: '1.5' }}>
              {result.feedbackTamil}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
