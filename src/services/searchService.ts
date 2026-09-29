import type { LanguagePairId, WordRecord, SentenceRecord } from '../types';
import { WORDS_DATABASE } from '../data/words';
import { SENTENCES_DATABASE } from '../data/sentences';

export interface SearchResult {
  words: WordRecord[];
  sentences: SentenceRecord[];
  query: string;
  totalCount: number;
}

export class SearchService {
  public search(
    query: string,
    languagePairId: LanguagePairId,
    filterCategory: 'all' | 'words' | 'sentences' = 'all',
    filterLevel?: string
  ): SearchResult {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        words: WORDS_DATABASE.filter((w) => w.languagePairId === languagePairId),
        sentences: SENTENCES_DATABASE.filter((s) => s.languagePairId === languagePairId),
        query: '',
        totalCount: 0
      };
    }

    const pairWords = WORDS_DATABASE.filter((w) => w.languagePairId === languagePairId);
    const pairSentences = SENTENCES_DATABASE.filter((s) => s.languagePairId === languagePairId);

    let matchedWords: WordRecord[] = [];
    if (filterCategory === 'all' || filterCategory === 'words') {
      matchedWords = pairWords.filter((w) => {
        const matchesTamil = w.tamilWord.toLowerCase().includes(q) || w.meaningTamil.toLowerCase().includes(q);
        const matchesTarget = w.targetWord.toLowerCase().includes(q);
        const matchesRomanization = w.romanization && w.romanization.toLowerCase().includes(q);
        const matchesAlt = w.alternativeWords?.some((alt) => alt.toLowerCase().includes(q));
        const matchesSyn = w.synonyms?.some((syn) => syn.toLowerCase().includes(q));
        const matchesCategory = w.category.toLowerCase().includes(q);
        const matchesTags = w.tags?.some((t) => t.toLowerCase().includes(q));
        const matchesExample = w.exampleTamil.toLowerCase().includes(q) || w.exampleTarget.toLowerCase().includes(q);

        const levelMatches = !filterLevel || filterLevel === 'all' || w.level === filterLevel;

        return (
          levelMatches &&
          (matchesTamil ||
            matchesTarget ||
            matchesRomanization ||
            matchesAlt ||
            matchesSyn ||
            matchesCategory ||
            matchesTags ||
            matchesExample)
        );
      });
    }

    let matchedSentences: SentenceRecord[] = [];
    if (filterCategory === 'all' || filterCategory === 'sentences') {
      matchedSentences = pairSentences.filter((s) => {
        const matchesTamil = s.tamilSentence.toLowerCase().includes(q);
        const matchesTarget = s.targetSentence.toLowerCase().includes(q);
        const matchesRomanization = s.romanization && s.romanization.toLowerCase().includes(q);
        const matchesBreakdown = s.wordBreakdown.some(
          (wb) =>
            wb.tamil.toLowerCase().includes(q) ||
            wb.target.toLowerCase().includes(q) ||
            wb.romanization.toLowerCase().includes(q)
        );

        const levelMatches = !filterLevel || filterLevel === 'all' || s.level === filterLevel;

        return levelMatches && (matchesTamil || matchesTarget || matchesRomanization || matchesBreakdown);
      });
    }

    return {
      words: matchedWords,
      sentences: matchedSentences,
      query: q,
      totalCount: matchedWords.length + matchedSentences.length
    };
  }
}

export const searchService = new SearchService();
