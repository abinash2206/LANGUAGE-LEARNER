import { useState, useEffect } from 'react';
import type { LanguagePairId, WordRecord, QuestionRecord, MistakeRecord, CourseProgress } from './types';
import { storageService } from './services/storageService';
import { getDailyContentForPair } from './data/dailyContent';
import { Header } from './components/Header';
import { BottomNavigation, type NavTab } from './components/BottomNavigation';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { WhyExplanationModal } from './components/WhyExplanationModal';
import { WordDetailModal } from './components/WordDetailModal';
import { SpeakingPracticeModal } from './components/SpeakingPracticeModal';
import { QuizModal } from './components/QuizModal';

import { HomeView } from './views/HomeView';
import { LearnView } from './views/LearnView';
import { SpeakView } from './views/SpeakView';
import { TestView } from './views/TestView';
import { ProfileView } from './views/ProfileView';
import { SearchView } from './views/SearchView';

export function App() {
  const [activePairId, setActivePairId] = useState<LanguagePairId>('ta_ml');
  const [currentTab, setCurrentTab] = useState<NavTab | 'search'>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Course Progress & State
  const [progress, setProgress] = useState<CourseProgress>(() => storageService.getCourseProgress('ta_ml'));
  const [mistakes, setMistakes] = useState<MistakeRecord[]>(() => storageService.getMistakes('ta_ml'));
  const [bookmarks, setBookmarks] = useState<string[]>(() => storageService.getBookmarks('ta_ml'));

  // Modals state
  const [isLangSelectorOpen, setIsLangSelectorOpen] = useState(false);
  const [whyModalData, setWhyModalData] = useState<{ isOpen: boolean; title: string; explanation: string }>({
    isOpen: false,
    title: '',
    explanation: ''
  });
  const [wordDetailData, setWordDetailData] = useState<{ isOpen: boolean; word: WordRecord | null }>({
    isOpen: false,
    word: null
  });
  const [speakModalData, setSpeakModalData] = useState<{
    isOpen: boolean;
    tamilPrompt: string;
    target: string;
    romanization: string;
  }>({
    isOpen: false,
    tamilPrompt: '',
    target: '',
    romanization: ''
  });
  const [quizModalData, setQuizModalData] = useState<{
    isOpen: boolean;
    questions: QuestionRecord[];
    titleTamil: string;
  }>({
    isOpen: false,
    questions: [],
    titleTamil: ''
  });

  useEffect(() => {
    const savedPair = storageService.getActiveLanguagePair();
    setActivePairId(savedPair);

    const settings = storageService.getSettings();
    setTheme(settings.theme);
    document.documentElement.setAttribute('data-theme', settings.theme);

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  useEffect(() => {
    storageService.setActiveLanguagePair(activePairId);
    setProgress(storageService.getCourseProgress(activePairId));
    setMistakes(storageService.getMistakes(activePairId));
    setBookmarks(storageService.getBookmarks(activePairId));
  }, [activePairId]);

  const refreshData = () => {
    setProgress(storageService.getCourseProgress(activePairId));
    setMistakes(storageService.getMistakes(activePairId));
    setBookmarks(storageService.getBookmarks(activePairId));
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    storageService.saveSettings({ ...storageService.getSettings(), theme: nextTheme });
  };

  const handleToggleBookmark = (wordId: string) => {
    storageService.toggleBookmark(activePairId, wordId);
    setBookmarks(storageService.getBookmarks(activePairId));
  };

  const handleInstallApp = () => {
    // 1. Direct browser file download of the full app ZIP package
    const link = document.createElement('a');
    link.href = '/tamil_language_learner_app.zip';
    link.download = 'tamil_language_learner_app.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Also trigger PWA prompt if available
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('App install accepted');
        }
        setDeferredPrompt(null);
      });
    }
  };

  const dailyContent = getDailyContentForPair(activePairId);

  return (
    <div className="mobile-wrapper">
      <Header
        activePairId={activePairId}
        streakDays={progress.streakDays}
        onOpenLanguageSelector={() => setIsLangSelectorOpen(true)}
        onOpenSearch={() => setCurrentTab('search')}
        onOpenSettings={() => setCurrentTab('profile')}
      />

      <main className="app-content">
        {currentTab === 'home' && (
          <HomeView
            activePairId={activePairId}
            streakDays={progress.streakDays}
            dailyGoalMinutes={progress.dailyGoalMinutes}
            dailyMinutesSpent={progress.dailyMinutesSpentToday}
            wordOfTheDay={dailyContent.wordOfTheDay}
            phraseOfTheDay={dailyContent.phraseOfTheDay}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onOpenSearch={() => setCurrentTab('search')}
            onOpenWordDetail={(w) => setWordDetailData({ isOpen: true, word: w })}
            onOpenSpeak={(t, tg, r) => setSpeakModalData({ isOpen: true, tamilPrompt: t, target: tg, romanization: r })}
            onOpenMistakeNotebook={() => setCurrentTab('profile')}
            onOpenBookmarks={() => setCurrentTab('profile')}
            onOpenDaily={() => setQuizModalData({ isOpen: true, questions: dailyContent.dailyQuiz, titleTamil: 'தினசரி தேர்வு' })}
          />
        )}

        {currentTab === 'learn' && (
          <LearnView
            activePairId={activePairId}
            onOpenWordDetail={(w) => setWordDetailData({ isOpen: true, word: w })}
            onOpenSpeak={(t, tg, r) => setSpeakModalData({ isOpen: true, tamilPrompt: t, target: tg, romanization: r })}
            onOpenWhyExplanation={(title, exp) => setWhyModalData({ isOpen: true, title, explanation: exp })}
          />
        )}

        {currentTab === 'speak' && (
          <SpeakView
            activePairId={activePairId}
            onOpenSpeakModal={(t, tg, r) => setSpeakModalData({ isOpen: true, tamilPrompt: t, target: tg, romanization: r })}
          />
        )}

        {currentTab === 'test' && (
          <TestView
            activePairId={activePairId}
            onStartQuiz={(qs, title) => setQuizModalData({ isOpen: true, questions: qs, titleTamil: title })}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            activePairId={activePairId}
            progress={progress}
            mistakes={mistakes}
            bookmarks={bookmarks}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onRefreshData={refreshData}
            onInstallApp={handleInstallApp}
          />
        )}

        {currentTab === 'search' && (
          <SearchView
            activePairId={activePairId}
            onOpenWordDetail={(w) => setWordDetailData({ isOpen: true, word: w })}
            onOpenSpeak={(t, tg, r) => setSpeakModalData({ isOpen: true, tamilPrompt: t, target: tg, romanization: r })}
          />
        )}
      </main>

      <BottomNavigation
        currentTab={currentTab === 'search' ? 'home' : currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
      />

      {/* Modals */}
      <LanguageSelectorModal
        isOpen={isLangSelectorOpen}
        onClose={() => setIsLangSelectorOpen(false)}
        activePairId={activePairId}
        onSelectPair={(pairId) => setActivePairId(pairId)}
      />

      <WhyExplanationModal
        isOpen={whyModalData.isOpen}
        onClose={() => setWhyModalData((prev) => ({ ...prev, isOpen: false }))}
        titleTamil={whyModalData.title}
        whyExplanationTamil={whyModalData.explanation}
      />

      <WordDetailModal
        isOpen={wordDetailData.isOpen}
        word={wordDetailData.word}
        onClose={() => setWordDetailData({ isOpen: false, word: null })}
        onOpenSpeak={(w) => setSpeakModalData({ isOpen: true, tamilPrompt: w.tamilWord, target: w.targetWord, romanization: w.romanization })}
        isBookmarked={wordDetailData.word ? bookmarks.includes(wordDetailData.word.id) : false}
        onToggleBookmark={() => wordDetailData.word && handleToggleBookmark(wordDetailData.word.id)}
      />

      <SpeakingPracticeModal
        isOpen={speakModalData.isOpen}
        onClose={() => setSpeakModalData((prev) => ({ ...prev, isOpen: false }))}
        languagePairId={activePairId}
        tamilPrompt={speakModalData.tamilPrompt}
        targetSentence={speakModalData.target}
        romanization={speakModalData.romanization}
      />

      <QuizModal
        isOpen={quizModalData.isOpen}
        onClose={() => {
          setQuizModalData((prev) => ({ ...prev, isOpen: false }));
          refreshData();
        }}
        languagePairId={activePairId}
        questions={quizModalData.questions}
        testTitleTamil={quizModalData.titleTamil}
      />
    </div>
  );
}
export default App;
