import type { GrammarTopic } from '../types';

export const GRAMMAR_DATABASE: GrammarTopic[] = [
  // ================= MALAYALAM (ta_ml) =================
  {
    id: 'g_ml_001',
    languagePairId: 'ta_ml',
    titleTamil: 'நிகழ்காலம் (Present Tense)',
    titleTarget: 'വർത്തമാനകാലം',
    explanationTamil: 'தற்போது நடக்கும் செயல்களைக் குறிக்க மலையாளத்தில் வினைச்சொல்லுடன் "-உன்னு" (-unnu) என்னும் விகுதியைச் சேர்க்க வேண்டும்.',
    whyExplanationTamil: 'இங்கே ஏன் "-உன்னு" (unnu) விகுதி வந்துள்ளது?\n\nதமிழில் "செல்கிறேன் / போகிறேன்" என்பதில் "கிறேன்" வருவது போல, மலையாளத்தில் தற்போதைய செயலைக் குறிக்க "പോകുന്നു" (Pokunnu) என்பதில் "-unnu" விகுதி இணைகிறது.',
    structurePattern: 'வினைச்சொல் பகுதி + ുന്നു (unnu)',
    examples: [
      {
        tamil: 'நான் படிக்கிறேன்.',
        target: 'ഞാൻ പഠിക്കുന്നു.',
        romanization: 'Njaan padikkunnu.',
        explanation: 'படி (படிக்கிறது) + உன்னு = പഠിക്കുന്നു'
      }
    ],
    commonMistakes: [],
    quizQuestions: [
      {
        id: 'q_g_ml_1',
        languagePairId: 'ta_ml',
        type: 'multiple_choice',
        questionTamil: '"நான் படிக்கிறேன்" என்பதன் சரியான Malayalam வடிவம் எது?',
        options: [
          'ഞാൻ പഠിക്കുന്നു (Njaan padikkunnu)',
          'ഞാൻ പഠിച്ചു (Njaan padicchu)',
          'ഞാൻ പഠിക്കും (Njaan padikkum)',
          'ഞാൻ പഠിക്കുക (Njaan padikkuka)'
        ],
        correctAnswer: 'ഞാൻ പഠിക്കുന്നു (Njaan padikkunnu)',
        explanationTamil: 'நிகழ்காலத்தைக் குறிக்க "-unnu" விகுதியுடைய "படிக்கான்னு" (Njaan padikkunnu) என்பதே சரி.'
      }
    ]
  },

  // ================= HINDI (ta_hi) =================
  {
    id: 'g_hi_001',
    languagePairId: 'ta_hi',
    titleTamil: 'தொடர் நிகழ்காலம் (Present Continuous)',
    titleTarget: 'अपूर्ण वर्तमान काल',
    explanationTamil: 'ஹிந்தியில் ஒரு செயல் நடந்து கொண்டிருப்பதை உணர்த்த male என்றால் "रहा हूँ" (raha hoon) என்றும் female என்றால் "रही हूँ" (rahi hoon) என்றும் பயன்படுத்த வேண்டும்.',
    whyExplanationTamil: 'ஏன் "रहा हूँ" (raha hoon) பயன்படுத்தப்படுகிறது?\n\nஹிந்தியில் எழுவாயின் பாலைப் பொறுத்து வினைச்சொல் மாறும். ஆண் என்றால் रहा, பெண் என்றால் रही சேர்க்க வேண்டும்.',
    structurePattern: 'Subject + Verb Root + रहा/रही + हूँ/हैं',
    examples: [
      {
        tamil: 'நான் (ஆண்) படிக்கிறேன்.',
        target: 'मैं पढ़ रहा हूँ।',
        romanization: 'Main padh raha hoon.',
        explanation: 'ஆண் பேசுவதால் raha hoon வந்துள்ளது.'
      }
    ],
    commonMistakes: [],
    quizQuestions: [
      {
        id: 'q_g_hi_1',
        languagePairId: 'ta_hi',
        type: 'multiple_choice',
        questionTamil: 'ஒரு பெண் "நான் படிக்கிறேன்" என ஹிந்தியில் கூறும்போது எது சரி?',
        options: [
          'मैं पढ़ रही हूँ (Main padh rahi hoon)',
          'मैं पढ़ रहा हूँ (Main padh raha hoon)',
          'मैं पढ़ेगा (Main padhega)',
          'मैं पढ़ा (Main padha)'
        ],
        correctAnswer: 'मैं पढ़ रही हूँ (Main padh rahi hoon)',
        explanationTamil: 'பெண்பாலுக்கு "रही हूँ" (Main padh rahi hoon) பயன்படுத்த வேண்டும்.'
      }
    ]
  },

  // ================= TELUGU (ta_te) =================
  {
    id: 'g_te_001',
    languagePairId: 'ta_te',
    titleTamil: 'நிகழ்கால வினை (Present Tense)',
    titleTarget: 'వర్తమాన కాలం',
    explanationTamil: 'தெலுங்கில் நிகழ்காலச் செயலுக்கு வினை அடிச்சொல்லுடன் "-துன்னானு" (-thunnaanu) விகுதி சேர்க்கப்படும்.',
    whyExplanationTamil: 'ஏன் "-துன்னானு" விகுதி?\n\nதமிழில் "செல்கிறேன்" என்பதில் உள்ள "-கிறேன்" போன்றது தெலுங்கில் "வெள்துன்னானு" என்பதாகும்.',
    structurePattern: 'Verb Root + తున్నాను (thunnaanu)',
    examples: [],
    commonMistakes: [],
    quizQuestions: []
  },

  // ================= KANNADA (ta_kn) =================
  {
    id: 'g_kn_001',
    languagePairId: 'ta_kn',
    titleTamil: 'நிகழ்கால வினை (Present Tense)',
    titleTarget: 'ವರ್ತಮಾನ ಕಾಲ',
    explanationTamil: 'கன்னட மொழியில் "நான்" எனத் தொடங்கும் நிகழ்கால வாக்கியங்களில் வினைச்சொல் "-தித்தேனே" (-thiddeene) என முடியும்.',
    whyExplanationTamil: 'ஏன் "-தித்தேனே"?\n\nகன்னடத்தில் தன்மை ஒருமை நிகழ்கால விகுதி "-தித்தேனே" ஆகும்.',
    structurePattern: 'Verb Root + ುತ್ತಿದ್ದೇನೆ (uthiddeene)',
    examples: [],
    commonMistakes: [],
    quizQuestions: []
  },

  // ================= ENGLISH (ta_en) =================
  {
    id: 'g_en_001',
    languagePairId: 'ta_en',
    titleTamil: 'Simple Present Tense (எளிய நிகழ்காலம்)',
    titleTarget: 'Simple Present Tense',
    explanationTamil: 'வழக்கமான பழக்கவழக்கங்கள், உண்மைகளைக் குறிப்பிட Simple Present Tense பயன்படும். He/She/It வந்தால் வினைச்சொல்லுடன் s/es சேர்க்க வேண்டும்.',
    whyExplanationTamil: 'ஏன் s சேர்க்க வேண்டும்?\n\nஆங்கில இலக்கணத்தில் Third Person Singular (He, She, It) எழுவாயாக வரும்போது வினைச்சொல்லுடன் s/es சேர்ப்பது கட்டாயமாகும்.',
    structurePattern: 'Subject + Verb (add -s/-es for He/She/It)',
    examples: [],
    commonMistakes: [],
    quizQuestions: []
  }
];
