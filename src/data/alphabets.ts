import type { AlphabetRecord } from '../types';

export const ALPHABETS_DATABASE: AlphabetRecord[] = [
  // ================= MALAYALAM (ta_ml) =================
  {
    id: 'alpha_ml_001',
    languagePairId: 'ta_ml',
    letter: 'അ',
    letterType: 'vowel',
    romanization: 'A',
    tamilSoundEquivalent: 'அ',
    tamilExplanation: 'இது மலையாளத்தின் முதல் உயிரெழுத்து. தமிழில் "அ" ஒலியைப் போன்றது.',
    exampleWordTarget: 'അമ്മ',
    exampleWordTamil: 'அம்மா',
    exampleWordRomanization: 'Amma'
  },
  {
    id: 'alpha_ml_002',
    languagePairId: 'ta_ml',
    letter: 'ആ',
    letterType: 'vowel',
    romanization: 'Aa',
    tamilSoundEquivalent: 'ஆ',
    tamilExplanation: 'நெடில் உயிரெழுத்து. தமிழில் "ஆ" ஒலியைப் போன்றது.',
    exampleWordTarget: 'ആന',
    exampleWordTamil: 'யானை',
    exampleWordRomanization: 'Aana'
  },
  {
    id: 'alpha_ml_003',
    languagePairId: 'ta_ml',
    letter: 'ക',
    letterType: 'consonant',
    romanization: 'Ka',
    tamilSoundEquivalent: 'க',
    tamilExplanation: 'மெய்யெழுத்து. தமிழில் "க" ஒலியைப் போன்றது.',
    exampleWordTarget: 'കണ്ണ്',
    exampleWordTamil: 'கண்',
    exampleWordRomanization: 'Kannu'
  },

  // ================= HINDI (ta_hi) =================
  {
    id: 'alpha_hi_001',
    languagePairId: 'ta_hi',
    letter: 'अ',
    letterType: 'vowel',
    romanization: 'A',
    tamilSoundEquivalent: 'அ',
    tamilExplanation: 'ஹிந்தி தேவநாகரி எழுத்து வரிசையில் முதல் உயிரெழுத்து.',
    exampleWordTarget: 'अनार',
    exampleWordTamil: 'மாதுளை',
    exampleWordRomanization: 'Anaar'
  },

  // ================= TELUGU (ta_te) =================
  {
    id: 'alpha_te_001',
    languagePairId: 'ta_te',
    letter: 'అ',
    letterType: 'vowel',
    romanization: 'A',
    tamilSoundEquivalent: 'அ',
    tamilExplanation: 'தெலுங்கு உயிரெழுத்தின் முதல் எழுத்து.',
    exampleWordTarget: 'అమ్మ',
    exampleWordTamil: 'அம்மா',
    exampleWordRomanization: 'Amma'
  },

  // ================= KANNADA (ta_kn) =================
  {
    id: 'alpha_kn_001',
    languagePairId: 'ta_kn',
    letter: 'ಅ',
    letterType: 'vowel',
    romanization: 'A',
    tamilSoundEquivalent: 'அ',
    tamilExplanation: 'கன்னட உயிரெழுத்து வரிசையின் முதல் எழுத்து.',
    exampleWordTarget: 'ಅಮ್ಮ',
    exampleWordTamil: 'அம்மா',
    exampleWordRomanization: 'Amma'
  },

  // ================= ENGLISH (ta_en) =================
  {
    id: 'alpha_en_001',
    languagePairId: 'ta_en',
    letter: 'A a',
    letterType: 'vowel',
    romanization: 'Ei / A',
    tamilSoundEquivalent: 'ஏ / அ',
    tamilExplanation: 'ஆங்கில நெடில் மற்றும் குறில் ஒலிகளுக்குப் பயன்படும் முதல் எழுத்து.',
    exampleWordTarget: 'Apple',
    exampleWordTamil: 'ஆப்பிள்',
    exampleWordRomanization: 'Apple'
  }
];
