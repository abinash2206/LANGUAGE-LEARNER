import type { ConversationScenario } from '../types';

export const CONVERSATIONS_DATABASE: ConversationScenario[] = [
  // ================= MALAYALAM (ta_ml) =================
  {
    id: 'conv_ml_001',
    languagePairId: 'ta_ml',
    titleTamil: 'அறிமுகம் (Self Introduction)',
    titleTarget: 'ആമുഖം',
    category: 'introduction',
    turns: [
      {
        speaker: 'நண்பர் (Friend)',
        tamil: 'உங்கள் பெயர் என்ன?',
        target: 'നിങ്ങളുടെ പേരെന്താണ്?',
        romanization: 'Ningalude perenthaanu?',
        explanationTamil: 'மரியாதையாகப் பெயர் கேட்க "நிங்ஙளுடே பேரெந்தாணு?" எனக் கேட்கலாம்.'
      },
      {
        speaker: 'நீங்கள் (You)',
        tamil: 'என் பெயர் கார்த்திக். நான் சென்னையிலிருந்து வருகிறேன்.',
        target: 'എന്റെ പേര് കാർത്തിക്. ഞാൻ ചെന്നൈയിൽ നിന്നാണ് വരുന്നത്.',
        romanization: 'Ente peru Karthik. Njaan Chennaiyil ninnaanu varunnathu.',
        explanationTamil: 'பெயரையும் ஊரையும் அறிமுகப்படுத்த இந்த வாக்கியத்தைப் பயன்படுத்தவும்.'
      }
    ]
  },

  // ================= HINDI (ta_hi) =================
  {
    id: 'conv_hi_001',
    languagePairId: 'ta_hi',
    titleTamil: 'கடை வீதியில் (Shopping)',
    titleTarget: 'दुकान में',
    category: 'shopping',
    turns: [
      {
        speaker: 'நீங்கள் (You)',
        tamil: 'இதன் விலை என்ன?',
        target: 'इसकी कीमत क्या है?',
        romanization: 'Iski keemat kya hai?',
        explanationTamil: 'பொருளின் விலையைக் கேட்க இந்த வாக்கியம் பயன்படுகிறது.'
      }
    ]
  },

  // ================= TELUGU (ta_te) =================
  {
    id: 'conv_te_001',
    languagePairId: 'ta_te',
    titleTamil: 'அறிமுகம் (Introduction)',
    titleTarget: 'పరిచయం',
    category: 'introduction',
    turns: [
      {
        speaker: 'நண்பர்',
        tamil: 'நீங்கள் எப்படி இருக்கிறீர்கள்?',
        target: 'మీరు ఎలా ఉన్నారు?',
        romanization: 'Meeru elaa unnaaru?',
        explanationTamil: 'நலம் விசாரிக்க தெலுங்கில் "மீரு எலா உன்னாரு?" எனக் கேட்பர்.'
      }
    ]
  },

  // ================= KANNADA (ta_kn) =================
  {
    id: 'conv_kn_001',
    languagePairId: 'ta_kn',
    titleTamil: 'பயணத்தின் போது (Travel)',
    titleTarget: 'ಪ್ರಯಾಣ',
    category: 'travel',
    turns: [
      {
        speaker: 'நீங்கள்',
        tamil: 'பேருந்து நிலையம் எங்கே உள்ளது?',
        target: 'ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?',
        romanization: 'Bus nildana ellide?',
        explanationTamil: 'இடத்தைக் கேட்க "எல்லிதே?" (எங்கே இருக்கிறது) பயன்படுகிறது.'
      }
    ]
  },

  // ================= ENGLISH (ta_en) =================
  {
    id: 'conv_en_001',
    languagePairId: 'ta_en',
    titleTamil: 'அலுவலகத்தில் (At Office)',
    titleTarget: 'At the Office',
    category: 'office',
    turns: [
      {
        speaker: 'Colleague',
        tamil: 'காலை வணக்கம், இன்றைய கூட்டம் எப்போது?',
        target: 'Good morning, when is the meeting today?',
        romanization: '',
        explanationTamil: 'அலுவலகத்தில் நேரம் கேட்க பயன்படுத்தப்படும் எளிய வாக்கியம்.'
      }
    ]
  }
];
