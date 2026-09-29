import type { LanguagePairId } from '../types';
import { LANGUAGE_PAIRS } from '../data/languagePairs';

export interface SpeechResult {
  transcript: string;
  accuracyPercent: number;
  feedbackTamil: string;
  isSuccess: boolean;
}

class SpeechRecognitionService {
  private recognition: any = null;
  private isAvailable: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.isAvailable = true;
      }
    }
  }

  public checkAvailability(): boolean {
    return this.isAvailable && this.recognition !== null;
  }

  public startListening(
    languagePairId: LanguagePairId,
    targetText: string,
    onResult: (result: SpeechResult) => void,
    onError: (errorMessageTamil: string) => void
  ): () => void {
    if (!this.checkAvailability()) {
      onError('இந்த சாதனத்தில் offline speech recognition கிடைக்கவில்லை. Audio கேட்டு practice செய்யவும்.');
      return () => {};
    }

    const locale = LANGUAGE_PAIRS[languagePairId]?.speechLocale || 'en-US';
    this.recognition.lang = locale;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      const accuracyPercent = this.calculateAccuracy(transcript, targetText, confidence);
      
      const isSuccess = accuracyPercent >= 70;
      let feedbackTamil = '';

      if (accuracyPercent >= 90) {
        feedbackTamil = 'அற்புதம்! உங்கள் உச்சரிப்பு மிகத் தெளிவாகவும் இயல்பாகவும் உள்ளது. 🌟';
      } else if (accuracyPercent >= 70) {
        feedbackTamil = 'நன்றாக உள்ளது! சில ஒலிகளை மட்டும் இன்னும் சற்றே அழுத்தமாக உச்சரிக்கலாம். 👍';
      } else {
        feedbackTamil = 'உச்சரிப்பில் சில மாற்றங்கள் தேவை. Audio-வை மீண்டும் கேட்டு முயற்சி செய்யுங்கள். 🔄';
      }

      onResult({
        transcript,
        accuracyPercent,
        feedbackTamil,
        isSuccess
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        onError('ஒலி எதுவும் கேட்கவில்லை. மீண்டும் பேச முயற்சி செய்யுங்கள்.');
      } else if (event.error === 'not-allowed') {
        onError('Microphone அனுமதி மறுக்கப்பட்டுள்ளது. Settings-ல் அனுமதியை அளிக்கவும்.');
      } else {
        onError('பேச்சை அறிவதில் சிரமம் ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.');
      }
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.error('Start error', e);
    }

    return () => {
      try {
        this.recognition.stop();
      } catch (e) {}
    };
  }

  private calculateAccuracy(spoken: string, target: string, confidence: number): number {
    const cleanSpoken = spoken.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    const cleanTarget = target.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');

    if (cleanSpoken === cleanTarget) return 100;

    const distance = this.levenshteinDistance(cleanSpoken, cleanTarget);
    const maxLen = Math.max(cleanSpoken.length, cleanTarget.length);
    if (maxLen === 0) return 100;
    
    const similarity = 1 - distance / maxLen;
    let score = Math.round(similarity * 100);

    if (confidence && confidence > 0) {
      score = Math.round(score * 0.8 + confidence * 20);
    }

    return Math.max(0, Math.min(100, score));
  }

  private levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }
}

export const speechRecognitionService = new SpeechRecognitionService();
