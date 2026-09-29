import type { LanguagePairInfo, LanguagePairId } from '../types';

export const LANGUAGE_PAIRS: Record<LanguagePairId, LanguagePairInfo> = {
  ta_en: {
    id: 'ta_en',
    nameTamil: 'தமிழ் → English',
    targetNameNative: 'English',
    targetNameEnglish: 'English',
    flagEmoji: '🇬🇧',
    targetScriptCode: 'Latn',
    speechLocale: 'en-IN'
  },
  ta_ml: {
    id: 'ta_ml',
    nameTamil: 'தமிழ் → മലയാളം',
    targetNameNative: 'മലയാളം',
    targetNameEnglish: 'Malayalam',
    flagEmoji: '🇮🇳',
    targetScriptCode: 'Mlym',
    speechLocale: 'ml-IN'
  },
  ta_hi: {
    id: 'ta_hi',
    nameTamil: 'தமிழ் → हिन्दी',
    targetNameNative: 'हिन्दी',
    targetNameEnglish: 'Hindi',
    flagEmoji: '🇮🇳',
    targetScriptCode: 'Deva',
    speechLocale: 'hi-IN'
  },
  ta_te: {
    id: 'ta_te',
    nameTamil: 'தமிழ் → తెలుగు',
    targetNameNative: 'తెలుగు',
    targetNameEnglish: 'Telugu',
    flagEmoji: '🇮🇳',
    targetScriptCode: 'Telu',
    speechLocale: 'te-IN'
  },
  ta_kn: {
    id: 'ta_kn',
    nameTamil: 'தமிழ் → ಕನ್ನಡ',
    targetNameNative: 'ಕನ್ನಡ',
    targetNameEnglish: 'Kannada',
    flagEmoji: '🇮🇳',
    targetScriptCode: 'Knda',
    speechLocale: 'kn-IN'
  }
};
