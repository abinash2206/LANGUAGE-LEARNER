import type { DailyContent, LanguagePairId } from '../types';
import { WORDS_DATABASE } from './words';
import { SENTENCES_DATABASE } from './sentences';

export function getDailyContentForPair(pairId: LanguagePairId): DailyContent {
  const wordsForPair = WORDS_DATABASE.filter((w) => w.languagePairId === pairId);
  const sentencesForPair = SENTENCES_DATABASE.filter((s) => s.languagePairId === pairId);

  const wordOfTheDay = wordsForPair[0] || {
    id: 'default_word',
    languagePairId: pairId,
    tamilWord: 'வணக்கம்',
    targetWord: 'Hello',
    romanization: 'Namaste',
    meaningTamil: 'வணக்கம்',
    partOfSpeech: 'phrase',
    level: 'beginner',
    category: 'greetings',
    usageType: 'normal',
    isCommon: true,
    isPreferred: true,
    exampleTamil: 'அனைவருக்கும் வணக்கம்.',
    exampleTarget: 'Hello everyone.',
    exampleRomanization: '',
    explanationTamil: 'இன்றைய முதன்மை வாழ்த்துச் சொல்.',
    difficulty: 1,
    tags: ['daily']
  };

  const sentenceOfTheDay = sentencesForPair[0] || {
    id: 'default_sent',
    languagePairId: pairId,
    tamilSentence: 'நான் பள்ளிக்கு செல்கிறேன்.',
    targetSentence: 'I am going to school.',
    romanization: 'Njaan vidyaalayathilekku pokunnu.',
    level: 'beginner',
    category: 'daily',
    usageType: 'normal',
    wordBreakdown: [],
    explanationTamil: 'இன்றைய பயன்பாட்டு வாக்கியம்.'
  };

  const correctOptionText = wordOfTheDay.romanization
    ? `${wordOfTheDay.targetWord} (${wordOfTheDay.romanization})`
    : wordOfTheDay.targetWord;

  const distractors = wordsForPair
    .filter((w) => w.id !== wordOfTheDay.id)
    .map((w) => (w.romanization ? `${w.targetWord} (${w.romanization})` : w.targetWord))
    .slice(0, 3);

  const options = [correctOptionText, ...distractors].sort(() => Math.random() - 0.5);

  return {
    languagePairId: pairId,
    wordOfTheDay,
    phraseOfTheDay: sentenceOfTheDay,
    sentenceOfTheDay,
    grammarTipTamil:
      'தினமும் 10 நிமிடங்கள் பயிற்சி செய்வது புதிய மொழியின் சொற்களை நீண்ட காலம் நினைவில் வைக்க உதவும்.',
    dailyQuiz: [
      {
        id: 'dq_1',
        languagePairId: pairId,
        type: 'multiple_choice',
        questionTamil: `"${wordOfTheDay.tamilWord}" என்பதன் சரியான target வார்த்தை எது?`,
        options,
        correctAnswer: correctOptionText,
        explanationTamil: `காரணம்: ${wordOfTheDay.explanationTamil}`
      }
    ]
  };
}
