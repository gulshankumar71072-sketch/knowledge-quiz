import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Shuffle,
  Volume2,
  GraduationCap,
  ArrowRight,
  Layers,
  Lightbulb,
  Check,
  RotateCcw,
} from 'lucide-react';
import { ChapterFlashcard, getFlashcardsForChapter } from '../data/chapterFlashcards';
import { schoolGrades, ClassGradeInfo, SubjectInfo } from '../data/schoolCurriculum';
import { playClickSound, playCorrectSound } from '../utils/sound';

interface FlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapterName?: string;
  subjectName?: string;
  gradeLabel?: string;
  onStartQuizForChapter?: (gradeLabel: string, subjectName: string, chapterName: string) => void;
  soundEnabled?: boolean;
}

const MASTERED_CARDS_STORAGE_KEY = 'vidya_gyan_mastered_flashcards_v1';

export const FlashcardModal: React.FC<FlashcardModalProps> = ({
  isOpen,
  onClose,
  chapterName: initialChapter = 'Chemical Reactions & Equations',
  subjectName: initialSubject = 'Science',
  gradeLabel: initialGrade = 'Class 10',
  onStartQuizForChapter,
  soundEnabled = true,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<string>(initialGrade);
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [selectedChapter, setSelectedChapter] = useState<string>(initialChapter);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(MASTERED_CARDS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Keep state synced when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialGrade) setSelectedGrade(initialGrade);
      if (initialSubject) setSelectedSubject(initialSubject);
      if (initialChapter) setSelectedChapter(initialChapter);
      setIsFlipped(false);
      setCurrentIndex(0);
    }
  }, [isOpen, initialGrade, initialSubject, initialChapter]);

  // Retrieve grade curriculum info
  const gradeData = useMemo(() => {
    return (
      schoolGrades.find((g) => g.gradeLabel === selectedGrade) ||
      schoolGrades.find((g) => g.gradeLabel === 'Class 10') ||
      schoolGrades[9]
    );
  }, [selectedGrade]);

  const currentSubjectObj = useMemo(() => {
    return (
      gradeData.subjects.find((s) => s.name.toLowerCase() === selectedSubject.toLowerCase()) ||
      gradeData.subjects.find((s) => selectedSubject.toLowerCase().includes(s.id)) ||
      gradeData.subjects[0]
    );
  }, [gradeData, selectedSubject]);

  const availableChapters = useMemo(() => {
    return currentSubjectObj?.chapters || [selectedChapter];
  }, [currentSubjectObj, selectedChapter]);

  // Flashcards for the active chapter
  const cards: ChapterFlashcard[] = useMemo(() => {
    return getFlashcardsForChapter(selectedChapter, selectedSubject, selectedGrade);
  }, [selectedChapter, selectedSubject, selectedGrade]);

  const activeCard = cards[currentIndex] || cards[0];

  const handleNext = () => {
    playClickSound(soundEnabled);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    playClickSound(soundEnabled);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleFlip = () => {
    playClickSound(soundEnabled);
    setIsFlipped(!isFlipped);
  };

  const handleToggleMastered = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated: string[];
    const isNowMastered = !masteredIds.includes(id);

    if (isNowMastered) {
      playCorrectSound(soundEnabled);
      updated = [...masteredIds, id];
    } else {
      playClickSound(soundEnabled);
      updated = masteredIds.filter((m) => m !== id);
    }

    setMasteredIds(updated);
    try {
      localStorage.setItem(MASTERED_CARDS_STORAGE_KEY, JSON.stringify(updated));
    } catch (_) {}
  };

  const handleShuffle = () => {
    playClickSound(soundEnabled);
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * cards.length);
    setCurrentIndex(randomIndex);
  };

  const masteredInCurrentChapter = cards.filter((c) => masteredIds.includes(c.id)).length;
  const masteryPercentage = cards.length > 0 ? Math.round((masteredInCurrentChapter / cards.length) * 100) : 0;

  // Keyboard navigation (Left, Right, Space/Enter to flip)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ' || e.key === 'Enter') {
        // Prevent default spacebar scroll
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, cards.length]);

  if (!isOpen) return null;

  const isCurrentCardMastered = activeCard ? masteredIds.includes(activeCard.id) : false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl my-6 bg-slate-900 border-2 border-indigo-500/40 rounded-3xl shadow-2xl shadow-indigo-950/70 overflow-hidden text-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              🗂️
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-extrabold text-base sm:text-lg text-white">
                  Chapter Flashcard Mode
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  Pre-Quiz Revision
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Flip cards to review key definitions, formulas & facts before starting a formal test
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapter & Subject Selector Strip */}
        <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <span className="text-slate-400 text-[11px] font-bold shrink-0">Chapter:</span>
            <select
              value={selectedChapter}
              onChange={(e) => {
                playClickSound(soundEnabled);
                setSelectedChapter(e.target.value);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:border-amber-400 outline-none w-full max-w-xs font-semibold cursor-pointer"
            >
              {availableChapters.map((chap) => (
                <option key={chap} value={chap}>
                  {chap}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">
              {selectedGrade} • {selectedSubject}
            </span>
            <button
              onClick={handleShuffle}
              title="Shuffle Flashcards"
              className="p-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Shuffle</span>
            </button>
          </div>
        </div>

        {/* Main Flashcard Interactive Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center space-y-4">
          
          {/* Progress Tracker */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-bold text-amber-300">
              Card {currentIndex + 1} of {cards.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-emerald-400 font-semibold">
                {masteredInCurrentChapter}/{cards.length} Mastered ({masteryPercentage}%)
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-indigo-500 transition-all duration-300 rounded-full"
              style={{ width: `${cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0}%` }}
            />
          </div>

          {/* 3D Flashcard Flip Container */}
          <div
            onClick={handleFlip}
            className="w-full min-h-[300px] sm:min-h-[320px] rounded-3xl border-2 cursor-pointer transition-all duration-300 relative select-none flex flex-col justify-between p-5 sm:p-6 group hover:shadow-2xl hover:shadow-indigo-500/20 active:scale-[0.99] overflow-hidden"
            style={{
              background: isFlipped
                ? 'linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%)'
                : 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
              borderColor: isFlipped ? 'rgba(99, 102, 241, 0.6)' : 'rgba(245, 158, 11, 0.4)',
            }}
          >
            {/* Card Watermark Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top Bar of the Card */}
            <div className="flex items-center justify-between text-xs relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                  {activeCard.badge || 'Core Fact'}
                </span>
                {activeCard.difficulty && (
                  <span className="text-[10px] text-amber-300 font-semibold hidden sm:inline">
                    • {activeCard.difficulty}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleToggleMastered(activeCard.id, e)}
                  title={isCurrentCardMastered ? 'Mark as Need Practice' : 'Mark as Mastered'}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                    isCurrentCardMastered
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrentCardMastered ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{isCurrentCardMastered ? 'Mastered' : 'Mark Mastered'}</span>
                </button>

                <span className="p-1.5 rounded-lg bg-slate-800/60 text-slate-400 group-hover:text-amber-400 transition-colors">
                  <RotateCw className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Middle Content */}
            <div className="my-auto py-4 text-center relative z-10 space-y-3">
              {!isFlipped ? (
                /* FRONT SIDE */
                <div className="space-y-3 animate-fadeIn">
                  <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold block">
                    {activeCard.chapter}
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {activeCard.term}
                  </h3>

                  {activeCard.termHindi && (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs sm:text-sm font-semibold max-w-md mx-auto">
                      <span>🇮🇳 {activeCard.termHindi}</span>
                    </div>
                  )}

                  <div className="pt-2 text-xs text-slate-400 flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>Click card to reveal definition & facts</span>
                  </div>
                </div>
              ) : (
                /* BACK SIDE */
                <div className="text-left space-y-3 animate-fadeIn">
                  <div className="border-b border-indigo-500/20 pb-2">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 block tracking-wider">
                      DEFINITION & EXPLANATION
                    </span>
                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed mt-1">
                      {activeCard.definition}
                    </p>
                    {activeCard.definitionHindi && (
                      <p className="text-xs text-amber-200/90 leading-relaxed mt-1 font-normal bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                        <strong>🇮🇳 हिंदी:</strong> {activeCard.definitionHindi}
                      </p>
                    )}
                  </div>

                  {/* Key Facts list */}
                  {activeCard.keyFacts && activeCard.keyFacts.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                        KEY FACTS:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {activeCard.keyFacts.map((fact, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Formula or Example */}
                  {activeCard.formulaOrExample && (
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs">
                      <span className="font-bold text-amber-300 text-[10px] uppercase block mb-0.5">
                        FORMULA / EQUATION:
                      </span>
                      <code className="text-indigo-200 font-mono text-xs block whitespace-pre-wrap">
                        {activeCard.formulaOrExample}
                      </code>
                    </div>
                  )}

                  {/* Memory Tip */}
                  {activeCard.memoryTip && (
                    <div className="flex items-start gap-1.5 text-[11px] text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Memory Tip:</strong> {activeCard.memoryTip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Card Footer Hint */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800 relative z-10">
              <span className="flex items-center gap-1 text-[10px]">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[9px]">Space</kbd>
                <span>to flip</span>
              </span>
              <span className="text-amber-400/90 font-medium">
                {isFlipped ? 'Click to show question ↩' : 'Click to show answer ↪'}
              </span>
            </div>
          </div>

          {/* Interactive Navigation Control Bar */}
          <div className="w-full flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleFlip}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
            >
              <RotateCw className="w-4 h-4 text-slate-950" />
              <span>{isFlipped ? 'Show Front' : 'Flip Card 🔄'}</span>
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Bottom Action: Start Formal Chapter Quiz directly */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs">
          <div className="text-slate-400 text-center sm:text-left">
            Ready to test your knowledge on <span className="text-white font-bold">{selectedChapter}</span>?
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onStartQuizForChapter && (
              <button
                type="button"
                onClick={() => {
                  playClickSound(soundEnabled);
                  onClose();
                  onStartQuizForChapter(selectedGrade, selectedSubject, selectedChapter);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/25"
              >
                <span>Start Chapter Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
