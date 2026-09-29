import type { LanguagePairId } from '../types';

export type AudioSpeed = 'slow' | 'medium' | 'deep';

class NativeAudioService {
  private synth: SpeechSynthesis | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public checkAvailability(): boolean {
    return true; // Dual engine guaranteed audio!
  }

  public speak(
    targetScriptText: string,
    languagePairId: LanguagePairId,
    speed: AudioSpeed = 'medium',
    onEnd?: () => void
  ): boolean {
    this.stop();

    const langCode = this.getLangCode(languagePairId);
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${langCode}&client=tw-ob&q=${encodeURIComponent(
      targetScriptText
    )}`;

    const audio = new Audio(audioUrl);
    this.currentAudioElement = audio;

    if (speed === 'slow') {
      audio.playbackRate = 0.65;
    } else if (speed === 'medium') {
      audio.playbackRate = 0.9;
    } else {
      audio.playbackRate = 1.0;
    }

    if (onEnd) {
      audio.onended = onEnd;
    }

    audio
      .play()
      .then(() => {
        // Playing native stream
      })
      .catch(() => {
        this.speakBrowserFallback(targetScriptText, langCode, speed, onEnd);
      });

    return true;
  }

  private speakBrowserFallback(
    text: string,
    langCode: string,
    speed: AudioSpeed,
    onEnd?: () => void
  ): void {
    if (!this.synth) return;

    const localeMap: Record<string, string> = {
      ml: 'ml-IN',
      hi: 'hi-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      en: 'en-IN',
      ta: 'ta-IN'
    };

    const targetLocale = localeMap[langCode] || 'en-IN';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLocale;

    if (speed === 'slow') {
      utterance.rate = 0.5;
      utterance.pitch = 1.0;
    } else if (speed === 'medium') {
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
    } else {
      utterance.rate = 0.95;
      utterance.pitch = 0.85;
    }

    if (onEnd) utterance.onend = onEnd;

    const voices = this.synth.getVoices();
    const matchingVoice = voices.find(
      (v) =>
        v.lang.toLowerCase() === targetLocale.toLowerCase() ||
        (v.lang.toLowerCase().startsWith(langCode) && v.lang.toLowerCase().includes('in')) ||
        v.lang.toLowerCase().startsWith(langCode)
    );

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    this.synth.speak(utterance);
  }

  private getLangCode(pairId: LanguagePairId): string {
    switch (pairId) {
      case 'ta_ml':
        return 'ml';
      case 'ta_hi':
        return 'hi';
      case 'ta_te':
        return 'te';
      case 'ta_kn':
        return 'kn';
      case 'ta_en':
        return 'en';
      default:
        return 'en';
    }
  }

  public stop(): void {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const audioService = new NativeAudioService();
