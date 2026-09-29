import type { SentenceRecord } from '../types';

export const SENTENCES_DATABASE: SentenceRecord[] = [
  // ================= MALAYALAM (ta_ml) =================
  {
    id: 's_ml_001',
    languagePairId: 'ta_ml',
    tamilSentence: 'நான் பள்ளிக்கு செல்கிறேன்.',
    targetSentence: 'ഞാൻ വിദ്യാലയത്തിലേക്ക് പോകുന്നു.',
    romanization: 'Njaan vidyaalayathilekku pokunnu.',
    level: 'beginner',
    category: 'daily_life',
    usageType: 'normal',
    wordBreakdown: [
      { tamil: 'நான்', target: 'ഞാൻ', romanization: 'Njaan', grammaticalRoleTamil: 'எழுவாய் (Subject)' },
      { tamil: 'பள்ளிக்கு', target: 'വിദ്യാലയത്തിലേക്ക്', romanization: 'Vidyaalayathilekku', grammaticalRoleTamil: 'இடவேற்றுமை (Destination - Towards School)' },
      { tamil: 'செல்கிறேன்', target: 'പോകുന്നു', romanization: 'Pokunnu', grammaticalRoleTamil: 'பயனிலை (Present Tense Verb)' }
    ],
    explanationTamil: 'தமிழ் மற்றும் மலையாளம் இரண்டிலும் SOV (Subject - Object - Verb) அமைப்பு பின்பற்றப்படுகிறது. "பள்ளிக்கு" என்பது மலையாளத்தில் "வித்யாலயத்திலேக்கு" என உருமாறுகிறது.',
    grammarNoteTamil: 'மலையாளத்தில் "-இலேக்கு" (-ilekku) விகுதி திசையைக் குறிக்கும் (நோக்கி / க்கு).'
  },
  {
    id: 's_ml_002',
    languagePairId: 'ta_ml',
    tamilSentence: 'எனக்கு மலையாளம் பேசத் தெரியும்.',
    targetSentence: 'എനിക്ക് മലയാളം സംസാരിക്കാൻ അറിയാം.',
    romanization: 'Enikku malayaalam samsaarikkaan ariyaam.',
    level: 'beginner',
    category: 'conversation',
    usageType: 'normal',
    wordBreakdown: [
      { tamil: 'எனக்கு', target: 'എനിക്ക്', romanization: 'Enikku' },
      { tamil: 'மலையாளம்', target: 'മലയാളം', romanization: 'Malayaalam' },
      { tamil: 'பேசத்', target: 'സംസാരിക്കാൻ', romanization: 'Samsaarikkaan' },
      { tamil: 'தெரியும்', target: 'അറിയാം', romanization: 'Ariyaam' }
    ],
    explanationTamil: 'இயல்பான பேச்சு வழக்கில் "அறியாம்" (Ariyaam) என்பது "தெரியும்" என்பதைக் குறிக்கும்.',
    grammarNoteTamil: '"பேச" என்னும் வினையெச்சம் மலையாளத்தில் "சம்சாரிக்கான்" (-aan விகுதி) என வரும்.'
  },

  // ================= HINDI (ta_hi) =================
  {
    id: 's_hi_001',
    languagePairId: 'ta_hi',
    tamilSentence: 'நான் பள்ளிக்கு செல்கிறேன்.',
    targetSentence: 'मैं विद्यालय जा रहा हूँ।',
    romanization: 'Main vidyalay ja raha hoon.',
    level: 'beginner',
    category: 'daily_life',
    usageType: 'normal',
    wordBreakdown: [
      { tamil: 'நான்', target: 'मैं', romanization: 'Main' },
      { tamil: 'பள்ளிக்கு', target: 'विद्यालय', romanization: 'Vidyalay' },
      { tamil: 'செல்கிறேன்', target: 'जा रहा हूँ', romanization: 'Ja raha hoon' }
    ],
    explanationTamil: 'ஆண் பேசும்போது "जा रहा हूँ" (Ja raha hoon) என்றும், பெண் பேசும்போது "जा रही हूँ" (Ja rahi hoon) என்றும் மாறும்.',
    grammarNoteTamil: 'ஹிந்தியில் பால் (Gender) வினைச்சொல்லை நேரடியாகப் பாதிக்கும்.'
  },

  // ================= TELUGU (ta_te) =================
  {
    id: 's_te_001',
    languagePairId: 'ta_te',
    tamilSentence: 'நான் பள்ளிக்கு செல்கிறேன்.',
    targetSentence: 'నేను పాఠశాలకు వెళ్తున్నాను.',
    romanization: 'Nenu paathasaalaku velthunnaanu.',
    level: 'beginner',
    category: 'daily_life',
    usageType: 'normal',
    wordBreakdown: [
      { tamil: 'நான்', target: 'నేను', romanization: 'Nenu' },
      { tamil: 'பள்ளிக்கு', target: 'పాఠశాలకు', romanization: 'Paathasaalaku' },
      { tamil: 'செல்கிறேன்', target: 'వెళ్తున్నాను', romanization: 'Velthunnaanu' }
    ],
    explanationTamil: 'தெலுங்கில் "-கு" (-ku) விகுதி தமிழ் "-க்கு" என்பதைப் போலவே பள்ளிக்குச் செல்வதைக் குறிக்கிறது.',
    grammarNoteTamil: 'நிகழ்கால வினையான "வெள்துன்னானு" (Velthunnaanu) என்பது தொடர் நிகழ்காலத்தைக் குறிக்கும்.'
  },

  // ================= KANNADA (ta_kn) =================
  {
    id: 's_kn_001',
    languagePairId: 'ta_kn',
    tamilSentence: 'நான் பள்ளிக்கு செல்கிறேன்.',
    targetSentence: 'ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.',
    romanization: 'Naanu shaalege hoguthiddeene.',
    level: 'beginner',
    category: 'daily_life',
    usageType: 'normal',
    wordBreakdown: [
      { tamil: 'நான்', target: 'ನಾನು', romanization: 'Naanu' },
      { tamil: 'பள்ளிக்கு', target: 'ಶಾಲೆಗೆ', romanization: 'Shaalege' },
      { tamil: 'செல்கிறேன்', target: 'ಹೋಗುತ್ತಿದ್ದೇನೆ', romanization: 'Hoguthiddeene' }
    ],
    explanationTamil: 'கன்னடத்தில் "ஷாலேகே" (Shaalege) என்றால் "பள்ளிக்கு" என்று பொருள்.',
    grammarNoteTamil: 'கன்னட நிகழ்கால வினை விகுதி "-தித்தேனே" (thiddeene) ஆகும்.'
  },

  // ================= ENGLISH (ta_en) =================
  {
    id: 's_en_001',
    languagePairId: 'ta_en',
    tamilSentence: 'நான் பள்ளிக்கு செல்கிறேன்.',
    targetSentence: 'I am going to school.',
    romanization: '',
    level: 'beginner',
    category: 'daily_life',
    usageType: 'normal',
    wordBreakdown: [
      { tamil: 'நான்', target: 'I', romanization: '' },
      { tamil: 'சென்று கொண்டிருக்கிறேன்', target: 'am going', romanization: '' },
      { tamil: 'பள்ளிக்கு', target: 'to school', romanization: '' }
    ],
    explanationTamil: 'ஆங்கிலத்தில் SVO (Subject - Verb - Object) வாக்கிய அமைப்பு பயன்படுத்தப்படுகிறது.',
    grammarNoteTamil: 'தற்போது நடக்கும் செயலுக்கு Present Continuous Tense (am + going) பயன்படுகிறது.'
  }
];
