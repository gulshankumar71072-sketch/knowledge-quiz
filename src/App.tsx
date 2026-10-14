import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Brain,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Clock,
  Flame,
  FileText,
  Wand2,
  Trophy,
  Check,
  CheckCircle,
  X as CloseIcon,
  XCircle,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Layers,
  ArrowRight,
  Loader2,
  Calendar,
  Medal,
  Globe,
  Award,
  School,
  Share2,
  Compass,
  Zap,
} from 'lucide-react';
import { initialQuestions } from './data/curatedQuestions';
import { kidsGkQuestionsBank, getMindSharpenerQuestions, mindSharpenerThemes } from './data/kidsGkQuestions';
import {
  schoolGrades,
  classSyllabusQuestions,
  getSyllabusQuestionsForClassSubject,
  shuffleAndRandomizeQuestions,
  ClassGradeInfo,
  SubjectInfo,
} from './data/schoolCurriculum';
import { QuizQuestion, UserAnswerRecord, StudentProfile } from './types';
import { DeepThinkingDrawer } from './components/DeepThinkingDrawer';
import { AIGeneratorModal } from './components/AIGeneratorModal';
import { QuizReviewModal } from './components/QuizReviewModal';
import { ClassSelectorModal } from './components/ClassSelectorModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { ScorecardModal } from './components/ScorecardModal';
import { ShareScorecardModal } from './components/ShareScorecardModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { ClassPerformanceComparison } from './components/ClassPerformanceComparison';
import { ScoreTrendChart } from './components/ScoreTrendChart';
import { SmartStudyRoadmap } from './components/SmartStudyRoadmap';
import { RoadmapModal } from './components/RoadmapModal';
import { FlashcardModal } from './components/FlashcardModal';
import { Footer } from './components/Footer';
import { LegalInfoModal, LegalTabType } from './components/LegalInfoModal';
import { getStudentProfile, saveStudentProfile } from './utils/studentProfile';
import { LanguageMode, getDisplayQuestion, getDisplayOption, getDisplayExplanation, getUiLabels } from './utils/language';
import {
  todayCosmicQuestions,
  getTodayChallengeInfo,
  getTodayDateString,
  saveDailyProgress,
  loadDailyProgress,
  clearDailyProgress,
} from './utils/dailyChallenge';
import {
  playClickSound,
  playCorrectSound,
  playIncorrectSound,
  playVictoryFanfare,
} from './utils/sound';

export default function App() {
  const defaultClass10 = schoolGrades.find((g) => g.gradeNumber === 10)!;
  const defaultScience = defaultClass10.subjects[0];

  const todayInfo = getTodayChallengeInfo();
  const todayStr = getTodayDateString();

  // Mode and Syllabus State
  const [activeGrade, setActiveGrade] = useState<ClassGradeInfo | null>(defaultClass10);
  const [activeSubject, setActiveSubject] = useState<SubjectInfo | null>(defaultScience);
  const [activeChapter, setActiveChapter] = useState<string>('');
  const [isDailyMode, setIsDailyMode] = useState(false);
  const [dailyStartTime, setDailyStartTime] = useState<number>(Date.now());

  // Language Mode: 'en' (English by default) | 'hi' (Hindi) | 'both' (English + Hindi)
  const [langMode, setLangMode] = useState<LanguageMode>(() => {
    try {
      const saved = localStorage.getItem('vidya_gyan_language_mode');
      if (saved === 'en' || saved === 'hi' || saved === 'both') {
        return saved as LanguageMode;
      }
    } catch {}
    return 'en'; // Default English as requested
  });

  // Questions State (15 questions default)
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    return classSyllabusQuestions['class-10-science'] || initialQuestions;
  });
  const [activeTopic, setActiveTopic] = useState<string>('Class 10 • Science');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswerRecord[]>([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Screen state
  const [quizFinished, setQuizFinished] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Audio settings
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer settings
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Modals
  const [showClassSelector, setShowClassSelector] = useState(false);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showScorecardModal, setShowScorecardModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showStudentProfileModal, setShowStudentProfileModal] = useState(false);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [showFlashcardModal, setShowFlashcardModal] = useState(false);
  const [flashcardChapter, setFlashcardChapter] = useState<string>('');
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [legalInitialTab, setLegalInitialTab] = useState<LegalTabType>('about');
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => getStudentProfile());
  const [showRestoreNotice, setShowRestoreNotice] = useState(false);
  const [pendingLeaderboardScore, setPendingLeaderboardScore] = useState<{
    score: number;
    totalQuestions: number;
    timeSpentSeconds: number;
    topic: string;
  } | null>(null);

  // Track attempt numbers per chapter/subject so questions continually rotate and change
  const [chapterAttempts, setChapterAttempts] = useState<Record<string, number>>(() => {
    try {
      const raw = localStorage.getItem('vidya_gyan_chapter_attempts_v1');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Track past question signatures to guarantee exclusion on subsequent retakes
  const [pastQuestionSignatures, setPastQuestionSignatures] = useState<Record<string, string[]>>(() => {
    try {
      const raw = localStorage.getItem('vidya_gyan_past_question_signatures_v1');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Notice toast for fresh dynamic questions
  const [questionNotice, setQuestionNotice] = useState<string | null>(null);

  // Listen for student profile updates across tabs/windows
  useEffect(() => {
    const handleProfileEvent = (e: any) => {
      if (e.detail) setStudentProfile(e.detail);
    };
    window.addEventListener('studentProfileUpdated', handleProfileEvent);
    return () => window.removeEventListener('studentProfileUpdated', handleProfileEvent);
  }, []);

  const handleProfileUpdated = (updated: StudentProfile, switchClassQuiz?: boolean) => {
    setStudentProfile(updated);
    if (switchClassQuiz && updated.classGrade) {
      const gradeNum = parseInt(updated.classGrade.replace(/\D/g, ''));
      const matchedGrade = schoolGrades.find((g) => g.gradeNumber === gradeNum);
      if (matchedGrade && matchedGrade.subjects.length > 0) {
        handleSelectClassAndSubject(matchedGrade, matchedGrade.subjects[0]);
      }
    }
  };

  // Sync Daily Progress from localStorage on initial page load / refresh
  useEffect(() => {
    const saved = loadDailyProgress();
    if (saved && saved.isDailyMode) {
      setIsDailyMode(true);
      setActiveGrade(null);
      setActiveSubject(null);
      setActiveChapter('');
      setActiveTopic(`Daily Challenge: ${todayInfo.topic}`);
      setQuestions(todayCosmicQuestions);
      setCurrentQuestionIndex(saved.currentQuestionIndex);
      setScore(saved.score);
      setStreak(saved.streak);
      setMaxStreak(saved.maxStreak);
      setSelectedOption(saved.selectedOption);
      setUserAnswers(saved.userAnswers || []);
      setDailyStartTime(saved.dailyStartTime || Date.now());
      setQuizFinished(saved.quizFinished);

      if (!saved.quizFinished && saved.userAnswers && saved.userAnswers.length > 0) {
        setShowRestoreNotice(true);
      }

      if (saved.quizFinished) {
        const elapsed = Math.max(15, Math.round((Date.now() - saved.dailyStartTime) / 1000));
        setPendingLeaderboardScore({
          score: saved.score,
          totalQuestions: todayCosmicQuestions.length,
          timeSpentSeconds: elapsed,
          topic: todayInfo.topic,
        });
      }
    }
  }, []);

  // Save Daily Progress to localStorage on every state change
  useEffect(() => {
    if (isDailyMode) {
      saveDailyProgress({
        date: todayStr,
        isDailyMode: true,
        currentQuestionIndex,
        score,
        streak,
        maxStreak,
        selectedOption,
        userAnswers,
        dailyStartTime,
        quizFinished,
      });
    }
  }, [
    isDailyMode,
    currentQuestionIndex,
    score,
    streak,
    maxStreak,
    selectedOption,
    userAnswers,
    dailyStartTime,
    quizFinished,
    todayStr,
  ]);

  const currentQ = questions[currentQuestionIndex] || questions[0];

  // Timer effect
  useEffect(() => {
    if (!timerEnabled || quizFinished || selectedOption !== null) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimeLeft(25);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex, timerEnabled, quizFinished, selectedOption]);

  const handleTimeExpired = () => {
    if (selectedOption !== null || quizFinished) return;
    playIncorrectSound(soundEnabled);
    setSelectedOption(-1);
    setStreak(0);

    setUserAnswers((prev) => [
      ...prev,
      {
        questionIndex: currentQuestionIndex,
        selectedOption: -1,
        isCorrect: false,
        timeSpentSeconds: 25,
      },
    ]);
  };

  // सही जवाब और क्विज़ समाप्ति पर Confetti चलाने का फंक्शन
  const triggerConfetti = (isBig: boolean = false) => {
    try {
      confetti({
        particleCount: isBig ? 150 : 90,
        spread: isBig ? 100 : 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899', '#a855f7'],
      });
    } catch (_) {}
  };

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(index);
    const isCorrect = index === currentQ.correct;

    if (isCorrect) {
      playCorrectSound(soundEnabled);
      setScore((s) => s + 1);
      triggerConfetti(false); // सही जवाब पर सेलिब्रेशन
      setStreak((st) => {
        const newSt = st + 1;
        if (newSt > maxStreak) setMaxStreak(newSt);
        return newSt;
      });
    } else {
      playIncorrectSound(soundEnabled);
      setStreak(0);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionIndex: currentQuestionIndex,
        selectedOption: index,
        isCorrect,
        timeSpentSeconds: 25 - timeLeft,
      },
    ]);
  };

  const handleNextQuestion = () => {
    playClickSound(soundEnabled);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    const finalScore = score + (selectedOption === currentQ.correct ? 0 : 0);
    const percentage = Math.round((finalScore / questions.length) * 100);

    // क्विज़ खत्म होने पर बड़ा सेलिब्रेशन इफ़ेक्ट
    triggerConfetti(true);

    if (percentage >= 70) {
      playVictoryFanfare(soundEnabled);
    }

    const elapsedSeconds = Math.max(15, Math.round((Date.now() - dailyStartTime) / 1000));
    if (isDailyMode) {
      setPendingLeaderboardScore({
        score: finalScore,
        totalQuestions: questions.length,
        timeSpentSeconds: elapsedSeconds,
        topic: todayInfo.topic,
      });
    }
  };

  const handleRestartQuiz = () => {
    playClickSound(soundEnabled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setStreak(0);
    setQuizFinished(false);
    const now = Date.now();
    setDailyStartTime(now);

    if (isDailyMode) {
      saveDailyProgress({
        date: todayStr,
        isDailyMode: true,
        currentQuestionIndex: 0,
        score: 0,
        streak: 0,
        maxStreak: 0,
        selectedOption: null,
        userAnswers: [],
        dailyStartTime: now,
        quizFinished: false,
      });
    }
  };

  // Launch or Resume Daily Knowledge Challenge
  const handleStartDailyChallenge = () => {
    playClickSound(soundEnabled);
    const saved = loadDailyProgress();
    setIsDailyMode(true);
    setActiveGrade(null);
    setActiveSubject(null);
    setActiveChapter('');
    setActiveTopic(`Daily Challenge: ${todayInfo.topic}`);
    setQuestions(todayCosmicQuestions);

    if (saved && saved.isDailyMode && saved.userAnswers && saved.userAnswers.length > 0 && !saved.quizFinished) {
      setCurrentQuestionIndex(saved.currentQuestionIndex);
      setScore(saved.score);
      setStreak(saved.streak);
      setMaxStreak(saved.maxStreak);
      setSelectedOption(saved.selectedOption);
      setUserAnswers(saved.userAnswers);
      setDailyStartTime(saved.dailyStartTime || Date.now());
      setQuizFinished(false);
      setShowRestoreNotice(true);
    } else {
      handleRestartQuiz();
    }
  };

  // Launch Kids GK & Mind Sharpener Quiz
  const handleStartMindSharpener = (themeId: string = 'all') => {
    playClickSound(soundEnabled);
    handleSelectClassAndSubject(null, null, themeId);
  };

  // Switch Class & Subject
  const handleSelectClassAndSubject = async (
    grade: ClassGradeInfo | null,
    subject: SubjectInfo | null,
    chapter?: string
  ) => {
    setIsDailyMode(false);
    setActiveGrade(grade);
    setActiveSubject(subject);
    setActiveChapter(chapter || '');

    if (!grade || !subject) {
      // Kids GK & Mind Sharpener Mode (15 Questions)
      const themeId = chapter || 'all';
      const theme = mindSharpenerThemes.find((t) => t.id === themeId) || mindSharpenerThemes[0];
      const key = `mind_sharpener_${themeId}`;
      const attempt = chapterAttempts[key] || 1;
      const freshQuestions = getMindSharpenerQuestions(themeId, attempt);
      setQuestions(freshQuestions);
      setActiveTopic(`🧠 Mind Sharpener: ${theme.name}`);
      setActiveChapter(themeId);
      handleRestartQuiz();
      setQuestionNotice(`✨ ${theme.name} (प्रयास #${attempt}) के 15 प्रश्न लोड हो गए!`);
      setTimeout(() => setQuestionNotice(null), 4000);
      return;
    }

    const topicLabel = `${grade.gradeLabel} • ${subject.name}${chapter ? ` (${chapter})` : ''}`;
    setActiveTopic(topicLabel);

    fetchSyllabusQuestions(grade.gradeLabel, subject.name, chapter);
  };

  const fetchSyllabusQuestions = async (
    gradeLabel: string,
    subjectName: string,
    chapterName?: string,
    overrideAttempt?: number
  ) => {
    setLoadingQuestions(true);
    const key = `${gradeLabel}_${subjectName}_${chapterName || 'General'}`;
    const attempt = overrideAttempt || chapterAttempts[key] || 1;
    const prevQs = pastQuestionSignatures[key] || [];

    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(4500),
        body: JSON.stringify({
          classGrade: gradeLabel,
          subject: subjectName,
          chapter: chapterName,
          count: 15,
          difficulty: gradeLabel.includes('11') || gradeLabel.includes('12') ? 'Hard' : 'Medium',
          attemptNumber: attempt,
          seed: `${Date.now()}_${Math.random()}`,
          excludeQuestions: prevQs.slice(-30),
        }),
      });

      if (!res.ok) throw new Error('Failed to generate syllabus questions.');
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);

        // Record question titles so subsequent tests for this chapter rotate to new ones
        const newTitles = data.questions.map((q: QuizQuestion) => q.question);
        const updatedSignatures = {
          ...pastQuestionSignatures,
          [key]: [...(prevQs || []).slice(-30), ...newTitles],
        };
        setPastQuestionSignatures(updatedSignatures);
        try {
          localStorage.setItem('vidya_gyan_past_question_signatures_v1', JSON.stringify(updatedSignatures));
        } catch (_) {}

        setQuestionNotice(`✨ ${chapterName || subjectName} के नए प्रश्न लोड हो गए! (प्रयास #${attempt})`);
        setTimeout(() => setQuestionNotice(null), 4000);

        handleRestartQuiz();
        return;
      }
    } catch (e) {
      console.warn('Fallback to dynamic syllabus generation:', e);
      const gradeNum = parseInt(gradeLabel.replace(/\D/g, '')) || 10;
      const matchedSubjectId = activeSubject?.id || 'science';
      const fallbackList = getSyllabusQuestionsForClassSubject(gradeNum, matchedSubjectId, chapterName, attempt);
      setQuestions(fallbackList);
      setQuestionNotice(`✨ ${chapterName || subjectName} के नए प्रश्न लोड हो गए! (प्रयास #${attempt})`);
      setTimeout(() => setQuestionNotice(null), 4000);
      handleRestartQuiz();
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Generate and load a completely fresh, diverse set of questions for current chapter or subject
  const handleRetakeWithFreshQuestions = async () => {
    playClickSound(soundEnabled);
    if (activeGrade && activeSubject) {
      const key = `${activeGrade.gradeLabel}_${activeSubject.name}_${activeChapter || 'General'}`;
      const nextAttempt = (chapterAttempts[key] || 1) + 1;
      const updatedAttempts = { ...chapterAttempts, [key]: nextAttempt };
      setChapterAttempts(updatedAttempts);
      try {
        localStorage.setItem('vidya_gyan_chapter_attempts_v1', JSON.stringify(updatedAttempts));
      } catch (_) {}

      await fetchSyllabusQuestions(
        activeGrade.gradeLabel,
        activeSubject.name,
        activeChapter,
        nextAttempt
      );
    } else if (isDailyMode) {
      const freshDaily = shuffleAndRandomizeQuestions(todayCosmicQuestions);
      setQuestions(freshDaily);
      setQuestionNotice('✨ दैनिक चुनौती के नए प्रश्न लोड हो गए!');
      setTimeout(() => setQuestionNotice(null), 4000);
      handleRestartQuiz();
    } else {
      // Kids GK & Mind Sharpener retake with fresh dynamic questions
      const themeId = activeChapter || 'all';
      const key = `mind_sharpener_${themeId}`;
      const nextAttempt = (chapterAttempts[key] || 1) + 1;
      const updatedAttempts = { ...chapterAttempts, [key]: nextAttempt };
      setChapterAttempts(updatedAttempts);
      try {
        localStorage.setItem('vidya_gyan_chapter_attempts_v1', JSON.stringify(updatedAttempts));
      } catch (_) {}

      const freshQuestions = getMindSharpenerQuestions(themeId, nextAttempt);
      setQuestions(freshQuestions);
      const theme = mindSharpenerThemes.find((t) => t.id === themeId) || mindSharpenerThemes[0];
      setQuestionNotice(`✨ ${theme.name} के नए प्रश्न लोड हो गए! (प्रयास #${nextAttempt})`);
      setTimeout(() => setQuestionNotice(null), 4000);
      handleRestartQuiz();
    }
  };

  const handleStartChapterPractice = (gradeLabel: string, subjectName: string, chapterName: string) => {
    playClickSound(soundEnabled);
    const gradeNum = parseInt(gradeLabel.replace(/\D/g, '')) || 10;
    const matchedGrade = schoolGrades.find((g) => g.gradeNumber === gradeNum) || schoolGrades[9];
    const matchedSubject =
      matchedGrade.subjects.find((s) => s.name.toLowerCase() === subjectName.toLowerCase()) ||
      matchedGrade.subjects.find((s) => subjectName.toLowerCase().includes(s.name.toLowerCase())) ||
      matchedGrade.subjects[0];
    handleSelectClassAndSubject(matchedGrade, matchedSubject, chapterName);
  };

  const handleCustomQuizReady = (newQuestions: QuizQuestion[], topic: string) => {
    setIsDailyMode(false);
    setQuestions(newQuestions);
    setActiveTopic(topic);
    handleRestartQuiz();
  };

  useEffect(() => {
    try {
      localStorage.setItem('vidya_gyan_language_mode', langMode);
    } catch {}
  }, [langMode]);

  const toggleLanguageMode = () => {
    playClickSound(soundEnabled);
    if (langMode === 'en') setLangMode('hi');
    else if (langMode === 'hi') setLangMode('both');
    else setLangMode('en');
  };

  const handleOpenLegal = (tab: LegalTabType = 'about') => {
    playClickSound(soundEnabled);
    setLegalInitialTab(tab);
    setShowLegalModal(true);
  };

  const handleOpenFlashcards = (chapter?: string) => {
    playClickSound(soundEnabled);
    if (chapter) {
      setFlashcardChapter(chapter);
    } else if (activeChapter) {
      setFlashcardChapter(activeChapter);
    } else if (activeSubject?.chapters?.[0]) {
      setFlashcardChapter(activeSubject.chapters[0]);
    } else {
      setFlashcardChapter('Chemical Reactions & Equations');
    }
    setShowFlashcardModal(true);
  };

  const percentage = Math.round((score / questions.length) * 100);

  const getResultMessage = () => {
    if (isDailyMode) {
      if (percentage >= 90) return '👑 Mastermind performance on today’s Daily Challenge!';
      if (percentage >= 70) return '🌟 Great job! You conquered today’s trending topic!';
      return '💪 Good attempt! Study the Deep Thinking proofs and aim for top ranks!';
    }
    if (percentage === 100) return '🏆 Outstanding! Full marks in this syllabus test!';
    if (percentage >= 70) return '👏 Great performance! You have strong conceptual mastery.';
    if (percentage >= 40) return '👍 Good attempt! Review the Deep Thinking proofs to improve.';
    return "💪 Don't give up! Study the explanations and attempt again.";
  };

  const progressPercent = quizFinished
    ? 100
    : (currentQuestionIndex / questions.length) * 100;

  // Language displayed strings
  const ui = getUiLabels(langMode);
  const dispQ = getDisplayQuestion(currentQ.question, currentQ.questionHindi, langMode);
  const dispExp = getDisplayExplanation(currentQ.explanation, currentQ.explanationHindi, langMode);
  const totalElapsedSecs = Math.max(15, Math.round((Date.now() - dailyStartTime) / 1000));
  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s < 10 ? '0' : ''}${s}s` : `${s}s`;
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col items-center justify-center p-2.5 sm:p-5 md:p-6 font-['Inter',sans-serif] selection:bg-amber-500 selection:text-slate-950 relative">
      {/* School Background Aura */}
      <div className="fixed top-8 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-8 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container Card (School Academy Card) */}
      <main className="w-full max-w-xl bg-slate-800/95 border-2 border-indigo-500/30 rounded-3xl shadow-2xl overflow-hidden p-3.5 sm:p-6 md:p-8 relative transition-all duration-300">
        
        {/* School Crest & Academy Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-700/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏫</span>
            <div>
              <div className="font-extrabold text-amber-300 tracking-wide text-xs">
                VIDYA GYAN NATIONAL ACADEMY
              </div>
              <div className="text-[10px] text-slate-400">
                School Curriculum & Examination Portal • Class 1st to 12th
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Student Details Option Tab */}
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setShowStudentProfileModal(true);
              }}
              title="Student Details"
              className="px-2.5 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <span>🪪</span>
              <span>Student Details</span>
            </button>

            {/* Quick Language Switcher Pills */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-xl border border-indigo-400/30 text-xs">
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setLangMode('en');
                }}
                title="Switch to English"
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  langMode === 'en'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setLangMode('hi');
                }}
                title="Switch to Hindi (हिन्दी)"
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  langMode === 'hi'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🇮🇳</span>
                <span>हिन्दी</span>
              </button>
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setLangMode('both');
                }}
                title="Switch to Bilingual (EN + Hindi)"
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  langMode === 'both'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>Both</span>
              </button>
            </div>
          </div>
        </div>

        {/* Top Header */}
        <header className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/60 gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl" role="img" aria-label="brain">🧠</span>
            <div>
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-amber-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent leading-tight">
                Knowledge Quiz
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  Gemini High Thinking • Bilingual Questions
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Smart Study Roadmap Button */}
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setShowRoadmapModal(true);
              }}
              title="Personalized Smart Study Roadmap"
              className="p-1.5 px-2 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
            >
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Roadmap</span>
            </button>

            {/* Leaderboard Button */}
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setShowLeaderboardModal(true);
              }}
              title="View Leaderboard"
              className="p-1.5 px-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Ranks</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute sound' : 'Enable sound'}
              className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 border border-slate-600/60 text-slate-300 transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Timer Toggle */}
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setTimerEnabled(!timerEnabled);
              }}
              title={timerEnabled ? 'Disable 25s timer' : 'Enable 25s timer'}
              className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                timerEnabled
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-700/60 border-slate-600/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              {timerEnabled && <span className="hidden sm:inline">25s</span>}
            </button>
          </div>
        </header>

        {/* Student Details Interface Strip (Name, School Name, Age, Class) */}
        <div
          onClick={() => {
            playClickSound(soundEnabled);
            setShowStudentProfileModal(true);
          }}
          className="mb-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/80 border border-amber-400/40 hover:border-amber-400/80 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-lg transition-all cursor-pointer group hover:bg-slate-900/90"
          title="Click to view & edit Student Profile"
        >
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400/25 to-indigo-500/30 border border-amber-400/60 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform shadow-sm">
              {studentProfile.avatarEmoji || '👨‍🎓'}
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors truncate">
                  {studentProfile.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold shrink-0">
                  {studentProfile.classGrade}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-300 truncate mt-0.5">
                <span className="text-indigo-300 truncate flex items-center gap-1 font-medium">
                  🏫 {studentProfile.schoolName}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 shrink-0 font-medium">
                  🎂 {studentProfile.age} Yrs
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              className="text-[11px] font-bold text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-xl border border-amber-500/30 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <span>🪪 Student Profile</span>
              <span className="text-[9px] opacity-80 hidden sm:inline">(Edit)</span>
            </button>
          </div>
        </div>

        {/* Restore from localStorage notification */}
        {showRestoreNotice && isDailyMode && (
          <div className="mb-3 p-2.5 px-3 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-xs text-indigo-200 flex items-center justify-between gap-2 animate-fadeIn">
            <div className="flex items-center gap-2 truncate">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">
                <strong>Progress Preserved:</strong> Resumed Question {currentQuestionIndex + 1} of {questions.length} (Score: {score}, Streak: {streak})
              </span>
            </div>
            <button
              onClick={() => setShowRestoreNotice(false)}
              className="text-slate-400 hover:text-slate-200 p-0.5 rounded cursor-pointer shrink-0"
              title="Dismiss"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Daily Challenge Trending Banner */}
        <div className="mb-3 bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-blue-500/10 border border-amber-500/30 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-2.5 truncate">
            <span className="text-2xl shrink-0">{todayInfo.icon}</span>
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                  Daily Challenge
                </span>
                <span className="text-[10px] text-slate-400">{todayStr}</span>
              </div>
              <div className="text-xs font-bold text-slate-100 truncate mt-0.5">
                {todayInfo.topic} (15 Qs)
              </div>
            </div>
          </div>

          <button
            onClick={handleStartDailyChallenge}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md flex items-center gap-1 ${
              isDailyMode
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-amber-500/30 ring-2 ring-amber-400/50'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
            }`}
          >
            <span>
              {isDailyMode
                ? quizFinished
                  ? 'Completed 🏆'
                  : `Q ${currentQuestionIndex + 1}/15 • Active`
                : 'Play Today'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Kids GK & Mind Sharpener Featured Mode Banner */}
        <div className="mb-3.5 bg-gradient-to-r from-purple-900/35 via-indigo-900/40 to-amber-900/25 border-2 border-purple-500/35 hover:border-purple-400/60 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2.5 shadow-md transition-all">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-9 h-9 rounded-xl bg-purple-500/25 border border-purple-400/50 flex items-center justify-center text-xl shrink-0 shadow-sm">
              🧠
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-white truncate">
                  Kids GK & Mind Sharpener
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-purple-500/25 text-purple-200 border border-purple-400/40 font-bold shrink-0">
                  ⚡ IQ & Logic Booster
                </span>
              </div>
              <div className="text-[11px] text-amber-300 truncate mt-0.5 font-medium flex items-center gap-2">
                <span>पहेलियां • अंतरिक्ष • विश्व दर्शन • पशु-पक्षी • तेज गणित</span>
                {!activeGrade && !isDailyMode && (
                  <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/20 px-1.5 py-0.2 rounded border border-emerald-500/40 shrink-0">
                    Active Mode ✓
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => handleStartMindSharpener('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md flex items-center gap-1.5 ${
                !activeGrade && !isDailyMode
                  ? 'bg-purple-600 text-white ring-2 ring-purple-400 shadow-purple-600/30'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-indigo-600/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>{!activeGrade && !isDailyMode ? 'Replay Mix 🔄' : 'Start Mind Sharpener ⚡'}</span>
            </button>
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setShowClassSelector(true);
              }}
              title="Choose specific Mind Sharpener theme"
              className="p-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <span>Themes 🗂️</span>
            </button>
          </div>
        </div>

        {/* Class 1-12 Selection Bar */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-2.5 mb-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-slate-100 truncate flex items-center gap-1.5">
                <span>
                  {isDailyMode
                    ? 'Daily Trending Challenge'
                    : activeGrade
                    ? activeGrade.gradeLabel
                    : '🧠 Kids GK & Mind Sharpener'}
                </span>
                {!isDailyMode && activeSubject && (
                  <span className="text-amber-400">• {activeSubject.name}</span>
                )}
                {!isDailyMode && !activeGrade && (
                  <span className="text-purple-300 font-bold">
                    • {mindSharpenerThemes.find((t) => t.id === activeChapter)?.name || 'All-Round Mix'}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-slate-400 truncate flex items-center gap-1.5">
                {isDailyMode ? (
                  <span>Compete for today’s global leaderboard high score</span>
                ) : activeChapter && activeGrade ? (
                  <>
                    <span className="truncate">Chapter: {activeChapter}</span>
                    <span className="text-amber-300 font-semibold px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-500/30 text-[9px] shrink-0">
                      Set #{chapterAttempts[`${activeGrade?.gradeLabel}_${activeSubject?.name}_${activeChapter}`] || 1} • Dynamic Qs
                    </span>
                  </>
                ) : !activeGrade ? (
                  <>
                    <span>IQ & Logic Booster (15 Questions)</span>
                    <span className="text-purple-300 font-semibold px-1.5 py-0.2 rounded bg-purple-500/20 border border-purple-400/40 text-[9px] shrink-0">
                      Attempt #{chapterAttempts[`mind_sharpener_${activeChapter || 'all'}`] || 1} • Rotating Qs 🔄
                    </span>
                  </>
                ) : (
                  <span>{activeGrade.category} Curriculum (15 Questions)</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => handleOpenFlashcards(activeChapter || (activeSubject?.chapters?.[0] || 'Chemical Reactions & Equations'))}
              title="Flip chapter flashcards for quick revision before starting formal test"
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-400/40 text-xs font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1"
            >
              <span>🗂️</span>
              <span className="hidden sm:inline">Flashcards</span>
            </button>

            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setShowClassSelector(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1"
            >
              <span>Change Class</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Tools Navigation */}
        <nav aria-label="Quiz controls" className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 pb-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => handleStartMindSharpener('all')}
              className={`px-2.5 py-1.5 rounded-xl border text-[11px] sm:text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-[1.02] ${
                !activeGrade && !isDailyMode
                  ? 'bg-purple-600 border-purple-400 text-white shadow-purple-600/30'
                  : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border-purple-400/40'
              }`}
              title="Kids GK & Mind Sharpener Quiz"
            >
              <span>🧠</span>
              <span>Kids Mind Sharpener ⚡</span>
            </button>
            <button
              onClick={() => handleOpenFlashcards()}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-indigo-500/30 text-amber-300 border border-amber-500/40 text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              title="Flashcard Mode: Flip cards for quick revision before starting formal test"
            >
              <span>🗂️</span>
              <span>Flashcard Mode</span>
            </button>

            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setShowGeneratorModal(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Chapter Test</span>
            </button>

            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setShowRoadmapModal(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 border border-slate-600/50 text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Study Roadmap</span>
            </button>

            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setShowClassSelector(true);
              }}
              className="px-2 py-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 border border-slate-600/50 text-[11px] transition-colors cursor-pointer hidden sm:inline-flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3 text-slate-400" />
              <span>Class 1–12 List</span>
            </button>

            <button
              onClick={() => handleOpenLegal('about')}
              title="About Us, Contact Us, Privacy & Terms"
              className="px-2 py-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 border border-slate-600/50 text-[11px] transition-colors cursor-pointer hidden md:inline-flex items-center gap-1"
            >
              <span>ℹ️</span>
              <span>About & Policies</span>
            </button>
          </div>

          {streak > 1 && (
            <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20 animate-pulse text-[11px] sm:text-xs">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{streak} Streak!</span>
            </div>
          )}
        </nav>

        {loadingQuestions ? (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
            <h3 className="text-sm font-semibold text-slate-200">
              Generating 15 Syllabus Questions in English + Hindi...
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Creating bilingual questions, distractors, and High Thinking proofs
            </p>
          </div>
        ) : !quizFinished ? (
          /* QUIZ SCREEN (School Classroom Slate / Examination Style) */
          <div id="quiz-screen" className="space-y-4">
            
            {/* Language Selector Bar */}
            <div className="flex items-center justify-between bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-2 px-3 text-xs shadow-sm">
              <span className="font-bold text-slate-300 text-xs flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span>Language:</span>
              </span>
              <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-xl border border-slate-700">
                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setLangMode('en');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    langMode === 'en'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </button>
                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setLangMode('hi');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    langMode === 'hi'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>🇮🇳</span>
                  <span>हिन्दी</span>
                </button>
                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setLangMode('both');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    langMode === 'both'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Globe className="w-3 h-3" />
                  <span>Both (EN + HI)</span>
                </button>
              </div>
            </div>

            {/* Notice Toast when fresh questions are loaded */}
            {questionNotice && (
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-400/50 text-blue-200 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 shadow-lg animate-fadeIn">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-300 animate-spin" />
                  {questionNotice}
                </span>
                <span className="text-[10px] text-blue-300/80 bg-blue-900/50 px-2 py-0.5 rounded font-bold">{ui.newSetBadge}</span>
              </div>
            )}

            {/* Progress Info Header matching user design */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-800 border border-slate-700/80 px-3 py-1 rounded-full text-slate-200 font-semibold shadow-sm">
                    {ui.questionLabel(currentQuestionIndex + 1, questions.length)}
                  </span>
                  <button
                    onClick={handleRetakeWithFreshQuestions}
                    title={ui.changeQuestionsTitle}
                    className="text-xs px-2.5 py-1 rounded-full bg-blue-600/20 hover:bg-blue-600/35 border border-blue-400/40 text-blue-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{ui.newQuestionsBtn}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2.5">
                  {timerEnabled && selectedOption === null && (
                    <span
                      className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                        timeLeft <= 5
                          ? 'bg-rose-500/20 text-rose-400 animate-ping'
                          : 'bg-slate-800 text-amber-300 border border-slate-700'
                      }`}
                    >
                      ⏱ {timeLeft}s
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-yellow-400 font-bold bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs sm:text-sm">
                    <Award className="w-4 h-4 text-yellow-400" /> {ui.scoreLabel(score)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-700/80">
                <div
                  id="progress-bar"
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Text in English and Hindi (Chalkboard Test Card) */}
            <div className="space-y-3 bg-slate-900/90 p-4 sm:p-5 rounded-2xl border-2 border-indigo-500/30 animate-fadeIn shadow-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <span>🏫</span> {currentQ.category}
                </span>
                <span className="text-slate-400 text-[11px] font-semibold">
                  Max Marks: 1.0
                </span>
              </div>

              {/* English Question */}
              <h2
                id="question-text"
                className="text-base sm:text-lg font-bold text-slate-100 leading-snug"
                key={currentQuestionIndex}
              >
                {dispQ.primary}
              </h2>

              {/* Hindi Question in golden banner */}
              {dispQ.secondary && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs sm:text-sm font-medium leading-relaxed flex items-start gap-1.5 shadow-inner">
                  <span className="font-extrabold text-amber-400 shrink-0 text-xs">🇮🇳 प्रश्न:</span>
                  <span>{dispQ.secondary}</span>
                </div>
              )}

              {/* Options Container */}
              <div id="options-container" className="space-y-3 pt-2">
                {currentQ.options.map((option, index) => {
                  const optHi = currentQ.optionsHindi?.[index];
                  const dispOpt = getDisplayOption(option, optHi, langMode);

                  const isSelected = selectedOption === index;
                  const isCorrect = index === currentQ.correct;
                  const hasAnswered = selectedOption !== null;

                  let btnBg = 'bg-slate-800 hover:bg-slate-750 border-slate-700 hover:border-slate-500 text-slate-100';

                  if (hasAnswered) {
                    if (isCorrect) {
                      btnBg = 'bg-green-600 border-green-500 text-white font-medium shadow-md shadow-green-600/20'; // सही जवाब हरा
                    } else if (isSelected) {
                      btnBg = 'bg-red-600 border-red-500 text-white font-medium shadow-md shadow-red-600/20'; // गलत चुना हुआ लाल
                    } else {
                      btnBg = 'bg-slate-800 opacity-50 border-slate-700 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-4 rounded-xl border-2 font-medium transition duration-200 flex justify-between items-center cursor-pointer ${btnBg}`}
                    >
                      <div className="pr-3 leading-snug">
                        <span className="font-semibold text-xs sm:text-sm">{dispOpt.primary}</span>
                        {dispOpt.secondary && (
                          <div className={`text-xs mt-0.5 font-normal ${hasAnswered && (isCorrect || isSelected) ? 'text-white/90' : 'text-amber-300'}`}>
                            {dispOpt.secondary}
                          </div>
                        )}
                      </div>

                      {hasAnswered ? (
                        isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-white shrink-0 animate-bounce" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-white shrink-0" />
                        ) : (
                          <span className="w-6 h-6 rounded-full border border-slate-600 text-slate-500 flex items-center justify-center text-xs shrink-0 font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                        )
                      ) : (
                        <span className="w-6 h-6 rounded-full border border-slate-600 text-slate-300 bg-slate-700/50 flex items-center justify-center text-xs shrink-0 font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Teacher's Blackboard Explanation Box (Bilingual) */}
            {selectedOption !== null && (
              <div
                id="explanation-box"
                className="p-4 rounded-2xl bg-slate-900/95 border-2 border-amber-500/30 text-xs sm:text-sm text-slate-300 animate-fadeIn space-y-2 shadow-lg"
              >
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <span className="text-base">💡</span>
                  <span>Teacher's Explanation:</span>
                </div>
                <p id="explanation-text" className="leading-relaxed font-medium text-slate-200">
                  {dispExp.primary}
                </p>
                {dispExp.secondary && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 leading-relaxed font-medium">
                    <strong className="text-amber-300 block mb-0.5">🇮🇳 Hindi Explanation:</strong>
                    {dispExp.secondary}
                  </div>
                )}

                {/* Gemini High Thinking Drawer */}
                <DeepThinkingDrawer
                  question={currentQ}
                  userSelectedIndex={selectedOption}
                  soundEnabled={soundEnabled}
                />
              </div>
            )}

            {/* Next Question / Finish Quiz button */}
            {selectedOption !== null && (
              <button
                id="next-btn"
                onClick={handleNextQuestion}
                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition duration-200 shadow-xl shadow-blue-600/25 cursor-pointer text-base animate-fadeIn"
              >
                <span>
                  {currentQuestionIndex + 1 === questions.length
                    ? ui.finishQuizBtn
                    : ui.nextQuestionBtn}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        ) : (
          /* RESULT SCREEN - FULL OFFICIAL STUDENT SCORECARD / MARKSHEET */
          <div id="result-screen" className="py-2 space-y-5 animate-fadeIn">
            {/* Celebration Card (User's Quiz Finished Hero Card) */}
            <div className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-lg mx-auto w-full border border-slate-700 animate-fadeIn">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">{ui.quizCompletedTitle}</h2>
              <p className="text-slate-400 mb-2 text-sm">{ui.yourTotalScore}</p>
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-4">
                {score} / {questions.length}
              </div>

              {/* Kids Mind Sharpener Brainpower Badge */}
              {!activeGrade && !isDailyMode && (
                <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-amber-500/20 border border-purple-400/40 text-center space-y-1.5 shadow-md">
                  <div className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Brain Sharpness Rating / दिमागी स्कोर</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-white">
                    {percentage >= 90
                      ? '🧠⚡ Super Genius Brain! (सुपर जीनियस दिमाग)'
                      : percentage >= 70
                      ? '🌟🧠 Sharp Thinker! (तेज तर्रार दिमाग)'
                      : percentage >= 50
                      ? '💡🌱 Bright Explorer! (होशियार खोजी)'
                      : '💪📚 Curious Mind! (सीखने वाला दिमाग)'}
                  </div>
                  <p className="text-xs text-slate-300">
                    {percentage >= 70
                      ? 'शानदार तर्कशक्ति और स्मरण शक्ति! आपका दिमाग बहुत तेज है।'
                      : 'नियमित अभ्यास से दिमाग और भी तेज होगा। दोबारा खेलें और नया रिकॉर्ड बनाएं!'}
                  </p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleRetakeWithFreshQuestions}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition duration-200 shadow-xl shadow-blue-600/25 cursor-pointer text-base group"
                >
                  <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> {ui.playAgainBtn}
                </button>
                <button
                  onClick={() => handleOpenFlashcards(activeChapter || (activeSubject?.chapters?.[0] || 'Chemical Reactions & Equations'))}
                  className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-amber-300 font-semibold py-3.5 px-5 rounded-xl transition duration-200 border border-slate-600 cursor-pointer text-sm"
                >
                  <span>🗂️</span> {langMode === 'hi' ? 'फ्लैशकार्ड रिवीजन' : langMode === 'both' ? 'Flashcards Revision (रिवीजन)' : 'Flashcards Revision'}
                </button>
              </div>
            </div>

            {/* Top Scorecard Certificate Header */}
            <div className="border-2 border-amber-400/40 rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-center space-y-4 shadow-2xl relative">
              <div className="inline-flex items-center justify-center gap-2 mb-0.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-indigo-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-md">
                  🎓
                </div>
                <div className="text-left">
                  <span className="text-xs sm:text-sm uppercase font-extrabold tracking-wider text-amber-300 block">
                    {studentProfile.schoolName || 'VIDYA GYAN NATIONAL ACADEMY'}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-300 font-semibold block">
                    Vidya Gyan Evaluation Board, Chamba
                  </span>
                </div>
              </div>

              {/* Student Details Strip */}
              <div className="bg-slate-950/80 border border-slate-700 rounded-2xl p-3.5 text-xs text-left">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                    <span>🪪</span> STUDENT PROFILE & DETAILS
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setShowStudentProfileModal(true);
                    }}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                  >
                    Edit Profile
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
                    <strong className="text-slate-100 truncate block">
                      {studentProfile.name}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">School / Institution</span>
                    <strong className="text-indigo-300 truncate block" title={studentProfile.schoolName}>
                      {studentProfile.schoolName}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Class / Grade</span>
                    <strong className="text-amber-300 truncate block">
                      {activeGrade ? activeGrade.gradeLabel : studentProfile.classGrade}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Age</span>
                    <strong className="text-emerald-300 truncate block">
                      {studentProfile.age} Years
                    </strong>
                  </div>
                </div>
              </div>

              {/* Performance Summary Header with Time Tracking Badge */}
              <div className="flex items-center justify-between text-xs px-1 pt-0.5">
                <span className="text-[11px] uppercase font-extrabold tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  PERFORMANCE SUMMARY
                </span>
                
                {/* Small, Elegant Time-Tracking Badge */}
                <div
                  id="quiz-duration-badge"
                  title="Total Duration Spent on Quiz"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-indigo-400/30 text-indigo-300 text-xs font-semibold shadow-sm shadow-indigo-950/50 backdrop-blur-sm"
                >
                  <Clock className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  <span className="text-[10px] text-slate-400 font-medium">Total Time:</span>
                  <span className="font-bold text-indigo-200">{formatDuration(totalElapsedSecs)}</span>
                </div>
              </div>

              {/* Grand Marks & Grade Showcase */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                {/* Score */}
                <div className="bg-slate-950/80 border border-slate-700 rounded-2xl p-4 flex flex-col justify-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Marks</span>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-indigo-300 my-0.5">
                    {score} / {questions.length}
                  </div>
                  <span className="text-xs font-bold text-amber-300">
                    {percentage}% Accuracy
                  </span>
                </div>

                {/* Grade */}
                <div className="bg-amber-500/15 border-2 border-amber-400/60 rounded-2xl p-4 flex flex-col justify-center text-amber-300 shadow-md">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider">Overall Grade</span>
                  <div className="text-3xl sm:text-4xl font-black my-0.5">
                    {percentage >= 90 ? 'A+' : percentage >= 75 ? 'A' : percentage >= 60 ? 'B' : percentage >= 40 ? 'C' : 'D'}
                  </div>
                  <span className="text-xs font-bold">
                    {percentage >= 90 ? 'Distinction (Outstanding)' : percentage >= 75 ? 'First Division (Excellent)' : percentage >= 60 ? 'Second Division' : 'Satisfactory'}
                  </span>
                </div>

                {/* Performance Stats */}
                <div className="bg-slate-950/80 border border-slate-700 rounded-2xl p-3 space-y-1.5 text-xs text-left flex flex-col justify-center">
                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> Correct:</span>
                    <strong className="text-emerald-400">{score} Qs</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center gap-1"><CloseIcon className="w-3.5 h-3.5 text-rose-400" /> Incorrect:</span>
                    <strong className="text-rose-400">{questions.length - score} Qs</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300 pt-1 border-t border-slate-800/80">
                    <span className="flex items-center gap-1 text-slate-300 font-medium">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" /> Total Time:
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 font-bold text-[11px]">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      {formatDuration(totalElapsedSecs)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Class Performance Comparison Section */}
              <ClassPerformanceComparison
                score={score}
                totalQuestions={questions.length}
                subjectName={activeSubject?.name || activeTopic}
                classGrade={activeGrade ? activeGrade.gradeLabel : studentProfile.classGrade}
              />

              {/* D3.js Mini Bar Chart - Score Trends over Last 5 Attempts */}
              <ScoreTrendChart
                score={score}
                totalQuestions={questions.length}
                subjectName={activeSubject?.name || activeTopic}
              />

              {/* Smart Study Roadmap - Suggestions based on lowest scoring categories */}
              <SmartStudyRoadmap
                questions={questions}
                userAnswers={userAnswers}
                subjectName={activeSubject?.name || activeTopic}
                classGrade={activeGrade ? activeGrade.gradeLabel : studentProfile.classGrade}
                onStartChapterPractice={handleStartChapterPractice}
              />

              {/* Teacher's Evaluation & Remarks */}
              <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-3.5 text-left space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    Teacher's Evaluation & Remarks:
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    ✓ Verified Official Marksheet
                  </span>
                </div>
                <p className="text-xs text-slate-100 font-semibold leading-relaxed">
                  {percentage >= 90
                    ? '"Exceptional conceptual clarity and rigorous problem-solving accuracy! Outstanding performance!"'
                    : percentage >= 75
                    ? '"Commendable performance. Strong command over core principles, topics, and formulas."'
                    : percentage >= 60
                    ? '"Good effort. Review explanations of incorrect answers and continue regular practice."'
                    : '"Satisfactory foundation. Revise fundamental concepts from suggested roadmap chapters and retake the test."'}
                </p>
                <p className="text-[11px] text-slate-400 italic">
                  "{getResultMessage()}"
                </p>
              </div>

              {/* Official Seal Strip */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-700 text-[10px] text-slate-400">
                <span className="font-bold text-slate-300">
                  ID: VG-SCORE-{Date.now().toString().slice(-6)}
                </span>
                <div className="text-right">
                  <span className="font-serif italic font-bold text-amber-300 text-xs block">
                    Mr. Budhia Ram (Academic Director)
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Vidya Gyan Evaluation Board, Chamba
                  </span>
                </div>
              </div>
            </div>

            {/* Scorecard Action Buttons */}
            <div className="space-y-2.5">
              {/* Primary Callout: Take Fresh Quiz with NEW Questions */}
              <button
                onClick={handleRetakeWithFreshQuestions}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 group hover:scale-[1.01]"
                title="Generate completely new, different questions for this chapter"
              >
                <RotateCcw className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-500" />
                <span>Take Fresh Chapter Quiz (नए 15 प्रश्न लाओ) 🔄</span>
              </button>

              {/* Primary Share Scorecard Callout Button */}
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setShowShareModal(true);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 group hover:scale-[1.01]"
              >
                <Share2 className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Share Scorecard 📲</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setShowScorecardModal(true);
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-slate-950" />
                  <span>View Certificate & Print 🖨️</span>
                </button>

                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setShowReviewModal(true);
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Review All 15 Answers 📝</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <button
                onClick={() => handleOpenFlashcards(activeChapter || (activeSubject?.chapters?.[0] || 'Chemical Reactions & Equations'))}
                className="w-full py-3 px-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-indigo-500/30 text-amber-300 border border-amber-400/40 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                title="Review concepts using interactive flashcards"
              >
                <span>🗂️</span>
                <span>Revise Flashcards</span>
              </button>

              <button
                onClick={handleRestartQuiz}
                title="Retry current questions to practice incorrect ones"
                className="w-full py-3 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Retry Same Qs 🔁</span>
              </button>

              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setShowClassSelector(true);
                }}
                className="w-full py-3 px-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Switch Class 📚</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Institutional Footer (About Us, Contact Us, Privacy Policy, Terms, Disclaimer) */}
      <Footer onOpenLegalTab={handleOpenLegal} soundEnabled={soundEnabled} />

      {/* Class 1-12 Selector Modal */}
      <ClassSelectorModal
        isOpen={showClassSelector}
        onClose={() => setShowClassSelector(false)}
        selectedGradeNumber={activeGrade ? activeGrade.gradeNumber : null}
        selectedSubjectId={activeSubject ? activeSubject.id : null}
        onSelectClassAndSubject={handleSelectClassAndSubject}
        soundEnabled={soundEnabled}
      />

      {/* AI Quiz Generator Modal */}
      <AIGeneratorModal
        isOpen={showGeneratorModal}
        onClose={() => setShowGeneratorModal(false)}
        onQuizGenerated={handleCustomQuizReady}
        soundEnabled={soundEnabled}
        initialClass={activeGrade ? activeGrade.gradeLabel : undefined}
        initialSubject={activeSubject ? activeSubject.name : undefined}
      />

      {/* Detailed Review Modal */}
      <QuizReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        questions={questions}
        answers={userAnswers}
        soundEnabled={soundEnabled}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        pendingScore={pendingLeaderboardScore}
        onScoreSubmitted={() => setPendingLeaderboardScore(null)}
        soundEnabled={soundEnabled}
      />

      {/* Official School Student Scorecard Modal */}
      <ScorecardModal
        isOpen={showScorecardModal}
        onClose={() => setShowScorecardModal(false)}
        score={score}
        totalQuestions={questions.length}
        classGrade={activeGrade ? activeGrade.gradeLabel : studentProfile.classGrade}
        subject={activeSubject ? activeSubject.name : activeTopic}
        timeSpentSeconds={totalElapsedSecs}
        maxStreak={maxStreak}
        questions={questions}
        userAnswers={userAnswers}
        soundEnabled={soundEnabled}
        studentProfile={studentProfile}
        onOpenStudentProfile={() => setShowStudentProfileModal(true)}
        onReviewAnswers={() => setShowReviewModal(true)}
        onRetake={handleRetakeWithFreshQuestions}
      />

      {/* Share Scorecard Modal */}
      <ShareScorecardModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        score={score}
        totalQuestions={questions.length}
        classGrade={activeGrade ? activeGrade.gradeLabel : studentProfile.classGrade}
        subject={activeSubject ? activeSubject.name : activeTopic}
        studentProfile={studentProfile}
        timeSpentSeconds={totalElapsedSecs}
        soundEnabled={soundEnabled}
      />

      {/* Student Details & ID Card Modal */}
      <StudentProfileModal
        isOpen={showStudentProfileModal}
        onClose={() => setShowStudentProfileModal(false)}
        currentProfile={studentProfile}
        onProfileUpdated={handleProfileUpdated}
        soundEnabled={soundEnabled}
      />

      {/* Smart Study Roadmap Modal */}
      <RoadmapModal
        isOpen={showRoadmapModal}
        onClose={() => setShowRoadmapModal(false)}
        questions={questions}
        userAnswers={userAnswers}
        subjectName={activeSubject ? activeSubject.name : activeTopic}
        classGrade={activeGrade ? activeGrade.gradeLabel : studentProfile.classGrade}
        onStartChapterPractice={handleStartChapterPractice}
        onOpenFlashcards={handleOpenFlashcards}
      />

      {/* Interactive Chapter Flashcard Mode Modal */}
      <FlashcardModal
        isOpen={showFlashcardModal}
        onClose={() => setShowFlashcardModal(false)}
        chapterName={flashcardChapter || activeChapter || (activeSubject?.chapters?.[0] || 'Chemical Reactions & Equations')}
        subjectName={activeSubject ? activeSubject.name : 'Science'}
        gradeLabel={activeGrade ? activeGrade.gradeLabel : 'Class 10'}
        onStartQuizForChapter={(gradeLabel, subjectName, chapterName) => {
          handleStartChapterPractice(gradeLabel, subjectName, chapterName);
        }}
        soundEnabled={soundEnabled}
      />

      {/* Institutional Legal & Policies Modal (About Us, Contact Us, Privacy Policy, Terms, Disclaimer) */}
      <LegalInfoModal
        isOpen={showLegalModal}
        onClose={() => setShowLegalModal(false)}
        initialTab={legalInitialTab}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
