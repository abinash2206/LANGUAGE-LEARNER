import React from 'react';
import { Check, X } from 'lucide-react';
import type { LanguagePairId } from '../types';
import { LANGUAGE_PAIRS } from '../data/languagePairs';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePairId: LanguagePairId;
  onSelectPair: (pairId: LanguagePairId) => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  activePairId,
  onSelectPair
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 className="ta-text" style={{ fontSize: '18px', fontWeight: '700' }}>
              கற்கும் மொழியைத் தேர்ந்தெடுக்கவும்
            </h3>
            <p className="ta-text" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              (தமிழ் எப்போதும் மூல மொழியாக இருக்கும்)
            </p>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {(Object.keys(LANGUAGE_PAIRS) as LanguagePairId[]).map((pairId) => {
            const pair = LANGUAGE_PAIRS[pairId];
            const isSelected = pairId === activePairId;

            return (
              <div
                key={pairId}
                className="card card-hover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  marginBottom: 0,
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--card-border)',
                  background: isSelected ? 'rgba(99, 102, 241, 0.1)' : 'var(--card-bg)'
                }}
                onClick={() => {
                  onSelectPair(pairId);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '28px' }}>{pair.flagEmoji}</span>
                  <div>
                    <div className="ta-text" style={{ fontWeight: '700', fontSize: '16px' }}>
                      {pair.nameTamil}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {pair.targetNameNative} ({pair.targetNameEnglish})
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Check size={18} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
