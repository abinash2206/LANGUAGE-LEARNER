export type LanguagePairId = 'ta_en' | 'ta_ml' | 'ta_hi' | 'ta_te' | 'ta_kn';

export interface LanguagePairInfo {
  id: LanguagePairId;
  nameTamil: string;
  targetNameNative: string;
  targetNameEnglish: string;
  flagEmoji: string;
  targetScriptCode: string;
  speechLocale: string;
}

export type UsageType = 'formal' | 'normal' | 'casual' | 'modern_spoken';
export type LevelType = 'beginner' | 'elementary' | 'intermediate' | 'advanced';
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'phrase' | 'conjunction';

export interface WordRecord {
  id: string;
  languagePairId: LanguagePairId;
  tamilWord: string;
  targetWord: string;
  romanization: string; // Learner-friendly Thanglish/Romanized guide for ML/HI/TE/KN; null/IPA for EN
  meaningTamil: string;
  partOfSpeech: PartOfSpeech;
  level: LevelType;
  category: string;
  usageType: UsageType;
  isCommon: boolean;
  isPreferred: boolean;
  alternativeWords?: string[];
  synonyms?: string[];
  exampleTamil: string;
  exampleTarget: string;
  exampleRomanization: string;
  explanationTamil: string;
  audioAsset?: string;
  difficulty: number; // 1-5
  tags: string[];
  relatedWords?: { tamil: string; target: string; romanization: string }[];
}

export interface WordBreakdownItem {
  tamil: string;
  target: string;
  romanization: string;
  grammaticalRoleTamil?: string;
}

export interface SentenceRecord {
  id: string;
  languagePairId: LanguagePairId;
  tamilSentence: string;
  targetSentence: string;
  romanization: string;
  level: LevelType;
  category: string;
  usageType: UsageType;
  wordBreakdown: WordBreakdownItem[];
  explanationTamil: string;
  grammarNoteTamil?: string;
  audioAsset?: string;
}

export interface AlphabetRecord {
  id: string;
  languagePairId: LanguagePairId;
  letter: string;
  letterType: 'vowel' | 'consonant' | 'combined' | 'special';
  romanization: string;
  tamilSoundEquivalent: string;
  tamilExplanation: string;
  exampleWordTarget: string;
  exampleWordTamil: string;
  exampleWordRomanization: string;
  audioAsset?: string;
}

export interface GrammarExample {
  tamil: string;
  target: string;
  romanization: string;
  explanation: string;
}

export interface GrammarTopic {
  id: string;
  languagePairId: LanguagePairId;
  titleTamil: string;
  titleTarget: string;
  explanationTamil: string;
  whyExplanationTamil: string; // Used for "❓ ஏன்?" modal
  structurePattern: string;
  examples: GrammarExample[];
  commonMistakes: { mistakeTarget: string; correctTarget: string; explanationTamil: string }[];
  quizQuestions: QuestionRecord[];
}

export interface DialogueTurn {
  speaker: string;
  tamil: string;
  target: string;
  romanization: string;
  explanationTamil: string;
}

export interface ConversationScenario {
  id: string;
  languagePairId: LanguagePairId;
  titleTamil: string;
  titleTarget: string;
  category: string;
  turns: DialogueTurn[];
}

export type QuestionType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'match_words'
  | 'translate'
  | 'rearrange_sentence'
  | 'listen_choose'
  | 'speaking';

export interface QuestionRecord {
  id: string;
  languagePairId: LanguagePairId;
  type: QuestionType;
  questionTamil: string;
  promptTarget?: string;
  promptRomanization?: string;
  options?: string[];
  correctAnswer: string;
  explanationTamil: string;
  audioTarget?: string;
  wordsToArrange?: string[];
}

export interface DailyContent {
  languagePairId: LanguagePairId;
  wordOfTheDay: WordRecord;
  phraseOfTheDay: SentenceRecord;
  sentenceOfTheDay: SentenceRecord;
  grammarTipTamil: string;
  dailyQuiz: QuestionRecord[];
}

export type MistakeCategory =
  | 'Vocabulary'
  | 'Grammar'
  | 'Translation'
  | 'Sentence Structure'
  | 'Pronunciation'
  | 'Spelling'
  | 'Word Choice';

export interface MistakeRecord {
  id: string;
  languagePairId: LanguagePairId;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  mistakeType: MistakeCategory;
  explanationTamil: string;
  dateTimestamp: number;
}

export interface CourseProgress {
  languagePairId: LanguagePairId;
  wordsLearnedIds: string[];
  sentencesLearnedIds: string[];
  grammarCompletedIds: string[];
  testsCompletedCount: number;
  speakingPracticeCount: number;
  totalAccuracy: number;
  currentLevel: LevelType;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  dailyGoalMinutes: number;
  dailyMinutesSpentToday: number;
}

export interface Achievement {
  id: string;
  titleTamil: string;
  descriptionTamil: string;
  icon: string;
  isUnlocked: boolean;
  unlockedDate?: string;
}
