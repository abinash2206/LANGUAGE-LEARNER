import type { LanguagePairId, CourseProgress, MistakeRecord } from '../types';

const PREFIX = 'tamil_learner_';

export class StorageService {
  public getActiveLanguagePair(): LanguagePairId {
    const saved = localStorage.getItem(PREFIX + 'active_pair');
    return (saved as LanguagePairId) || 'ta_ml';
  }

  public setActiveLanguagePair(pairId: LanguagePairId): void {
    localStorage.setItem(PREFIX + 'active_pair', pairId);
  }

  public getCourseProgress(pairId: LanguagePairId): CourseProgress {
    const data = localStorage.getItem(PREFIX + 'progress_' + pairId);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {}
    }

    const defaultProgress: CourseProgress = {
      languagePairId: pairId,
      wordsLearnedIds: [],
      sentencesLearnedIds: [],
      grammarCompletedIds: [],
      testsCompletedCount: 0,
      speakingPracticeCount: 0,
      totalAccuracy: 85,
      currentLevel: 'beginner',
      streakDays: 7,
      lastActiveDate: new Date().toISOString().split('T')[0],
      dailyGoalMinutes: 10,
      dailyMinutesSpentToday: 4
    };
    this.saveCourseProgress(pairId, defaultProgress);
    return defaultProgress;
  }

  public saveCourseProgress(pairId: LanguagePairId, progress: CourseProgress): void {
    localStorage.setItem(PREFIX + 'progress_' + pairId, JSON.stringify(progress));
  }

  public markWordLearned(pairId: LanguagePairId, wordId: string): void {
    const p = this.getCourseProgress(pairId);
    if (!p.wordsLearnedIds.includes(wordId)) {
      p.wordsLearnedIds.push(wordId);
      this.saveCourseProgress(pairId, p);
    }
  }

  public markSentenceLearned(pairId: LanguagePairId, sentenceId: string): void {
    const p = this.getCourseProgress(pairId);
    if (!p.sentencesLearnedIds.includes(sentenceId)) {
      p.sentencesLearnedIds.push(sentenceId);
      this.saveCourseProgress(pairId, p);
    }
  }

  public getBookmarks(pairId: LanguagePairId): string[] {
    const data = localStorage.getItem(PREFIX + 'bookmarks_' + pairId);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {}
    }
    return [];
  }

  public isBookmarked(pairId: LanguagePairId, itemId: string): boolean {
    const bm = this.getBookmarks(pairId);
    return bm.includes(itemId);
  }

  public toggleBookmark(pairId: LanguagePairId, itemId: string): boolean {
    const bm = this.getBookmarks(pairId);
    const index = bm.indexOf(itemId);
    let isAdded = false;

    if (index >= 0) {
      bm.splice(index, 1);
    } else {
      bm.push(itemId);
      isAdded = true;
    }

    localStorage.setItem(PREFIX + 'bookmarks_' + pairId, JSON.stringify(bm));
    return isAdded;
  }

  public getMistakes(pairId: LanguagePairId): MistakeRecord[] {
    const data = localStorage.getItem(PREFIX + 'mistakes_' + pairId);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {}
    }
    return [];
  }

  public addMistake(pairId: LanguagePairId, mistake: Omit<MistakeRecord, 'id' | 'dateTimestamp'>): MistakeRecord {
    const mistakes = this.getMistakes(pairId);
    const newRecord: MistakeRecord = {
      ...mistake,
      id: 'mistake_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      dateTimestamp: Date.now()
    };
    mistakes.unshift(newRecord);
    localStorage.setItem(PREFIX + 'mistakes_' + pairId, JSON.stringify(mistakes));
    return newRecord;
  }

  public deleteMistake(pairId: LanguagePairId, mistakeId: string): void {
    let mistakes = this.getMistakes(pairId);
    mistakes = mistakes.filter((m) => m.id !== mistakeId);
    localStorage.setItem(PREFIX + 'mistakes_' + pairId, JSON.stringify(mistakes));
  }

  public clearMistakes(pairId: LanguagePairId): void {
    localStorage.removeItem(PREFIX + 'mistakes_' + pairId);
  }

  public getSettings(): { theme: 'dark' | 'light'; soundSpeed: 'normal' | 'slow'; dailyGoal: number } {
    const data = localStorage.getItem(PREFIX + 'settings');
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {}
    }
    return { theme: 'dark', soundSpeed: 'normal', dailyGoal: 10 };
  }

  public saveSettings(settings: { theme: 'dark' | 'light'; soundSpeed: 'normal' | 'slow'; dailyGoal: number }): void {
    localStorage.setItem(PREFIX + 'settings', JSON.stringify(settings));
  }

  public exportData(): string {
    const exportObj: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PREFIX)) {
        exportObj[key] = localStorage.getItem(key);
      }
    }
    return JSON.stringify(exportObj, null, 2);
  }

  public importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      Object.keys(parsed).forEach((k) => {
        if (k.startsWith(PREFIX)) {
          localStorage.setItem(k, parsed[k]);
        }
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  public resetProgress(pairId: LanguagePairId): void {
    localStorage.removeItem(PREFIX + 'progress_' + pairId);
    localStorage.removeItem(PREFIX + 'bookmarks_' + pairId);
    localStorage.removeItem(PREFIX + 'mistakes_' + pairId);
  }
}

export const storageService = new StorageService();
