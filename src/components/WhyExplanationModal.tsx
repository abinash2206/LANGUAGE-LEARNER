import React from 'react';
import { HelpCircle, X } from 'lucide-react';

interface WhyExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleTamil: string;
  whyExplanationTamil: string;
}

export const WhyExplanationModal: React.FC<WhyExplanationModalProps> = ({
  isOpen,
  onClose,
  titleTamil,
  whyExplanationTamil
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
            <HelpCircle size={24} />
            <h3 className="ta-text" style={{ fontSize: '18px', fontWeight: '700' }}>
              ❓ ஏன் இந்த கட்டமைப்பு? ({titleTamil})
            </h3>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div
          className="ta-text"
          style={{
            background: 'var(--primary-light)',
            color: 'var(--text-main)',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '15px',
            lineHeight: '1.6',
            whiteSpace: 'pre-line'
          }}
        >
          {whyExplanationTamil}
        </div>

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button className="btn-primary ta-text" onClick={onClose}>
            புரிந்தது!
          </button>
        </div>
      </div>
    </div>
  );
};
