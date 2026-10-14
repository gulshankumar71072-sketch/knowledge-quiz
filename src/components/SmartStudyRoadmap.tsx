import React, { useState, useMemo } from 'react';
import {
  Compass,
  BookOpen,
  Target,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Lightbulb,
  Award,
  ChevronRight,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { QuizQuestion, UserAnswerRecord } from '../types';
import {
  generateSmartStudyRoadmap,
  toggleChapterStudied,
  getStudiedChapters,
  RecommendedChapter,
} from '../utils/roadmapService';

interface SmartStudyRoadmapProps {
  questions?: QuizQuestion[];
  userAnswers?: UserAnswerRecord[];
  subjectName?: string;
  classGrade?: string;
  onStartChapterPractice?: (gradeLabel: string, subjectName: string, chapterName: string) => void;
  onOpenFlashcards?: (gradeLabel: string, subjectName: string, chapterName: string) => void;
  className?: string;
  isPrintFriendly?: boolean;
}

export const SmartStudyRoadmap: React.FC<SmartStudyRoadmapProps> = ({
  questions,
  userAnswers,
  subjectName = 'General Knowledge',
  classGrade = 'Class 10',
  onStartChapterPractice,
  onOpenFlashcards,
  className = '',
  isPrintFriendly = false,
}) => {
  const [studiedIds, setStudiedIds] = useState<string[]>(() => getStudiedChapters());
  const [activeTab, setActiveTab] = useState<'all' | 'priority' | 'studied'>('all');

  // Generate roadmap data
  const roadmapData = useMemo(() => {
    return generateSmartStudyRoadmap(questions, userAnswers, subjectName, classGrade);
  }, [questions, userAnswers, subjectName, classGrade]);

  const handleToggleStudied = (chapterId: string) => {
    const isNowStudied = toggleChapterStudied(chapterId);
    if (isNowStudied) {
      setStudiedIds((prev) => [...prev, chapterId]);
    } else {
      setStudiedIds((prev) => prev.filter((id) => id !== chapterId));
    }
  };

  const completedCount = roadmapData.recommendedChapters.filter((c) =>
    studiedIds.includes(c.id)
  ).length;
  const totalChapters = roadmapData.recommendedChapters.length;
  const progressPercent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  const filteredChapters = useMemo(() => {
    if (activeTab === 'priority') {
      return roadmapData.recommendedChapters.filter((c) => c.priority === 'high');
    }
    if (activeTab === 'studied') {
      return roadmapData.recommendedChapters.filter((c) => studiedIds.includes(c.id));
    }
    return roadmapData.recommendedChapters;
  }, [roadmapData.recommendedChapters, activeTab, studiedIds]);

  return (
    <div
      className={`rounded-2xl transition-all ${
        isPrintFriendly
          ? 'bg-white border-2 border-slate-300 text-slate-800 p-4'
          : 'bg-slate-900/90 border border-indigo-500/30 p-4 sm:p-5 shadow-xl shadow-indigo-950/40 text-slate-100'
      } ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60 print:border-slate-300">
        <div className="flex items-start sm:items-center gap-3">
          <div
            className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 ${
              isPrintFriendly
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-amber-500/20 border border-indigo-400/40 text-indigo-300 shadow-inner'
            }`}
          >
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight flex items-center gap-1.5 text-white print:text-slate-900">
                <span>Smart Study Roadmap</span>
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  roadmapData.overallStatus === 'needs_urgent_focus'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 print:bg-rose-100 print:text-rose-700'
                    : roadmapData.overallStatus === 'needs_practice'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 print:bg-amber-100 print:text-amber-700'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 print:bg-emerald-100 print:text-emerald-700'
                }`}
              >
                {roadmapData.overallStatus === 'needs_urgent_focus'
                  ? '⚠️ High Priority Chapters'
                  : roadmapData.overallStatus === 'needs_practice'
                  ? '🎯 Targeted Revision'
                  : '🚀 Advanced Booster'}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 print:text-slate-600 mt-0.5">
              Personalized chapter recommendations based on lowest-scoring categories in your recent quizzes
            </p>
          </div>
        </div>

        {/* Completion Counter */}
        {!isPrintFriendly && (
          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-1.5 text-right">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Roadmap Progress</div>
              <div className="text-xs font-black text-amber-400">
                {completedCount}/{totalChapters} Chapters ({progressPercent}%)
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[11px] text-indigo-300 border border-indigo-400/40">
              {progressPercent}%
            </div>
          </div>
        )}
      </div>

      {/* Category Performance Diagnostic Meter */}
      <div className="my-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-200">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="flex items-center gap-1.5 text-slate-200 print:text-slate-800">
            <Target className="w-3.5 h-3.5 text-indigo-400 print:text-indigo-600" />
            Category Performance Breakdown:
          </span>
          <span className="text-[10px] text-slate-400 print:text-slate-500">
            Based on recent tests
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {roadmapData.lowestCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between ${
                cat.priority === 'high'
                  ? 'bg-rose-950/30 border-rose-500/30 text-rose-200 print:bg-rose-50 print:border-rose-200 print:text-rose-900'
                  : 'bg-amber-950/30 border-amber-500/30 text-amber-200 print:bg-amber-50 print:border-amber-200 print:text-amber-900'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-semibold truncate max-w-[170px]" title={cat.category}>
                  {cat.category}
                </span>
                <span
                  className={`text-[10px] font-black px-1.5 py-0.2 rounded font-mono ${
                    cat.priority === 'high'
                      ? 'bg-rose-500/30 text-rose-300 print:bg-rose-200 print:text-rose-800'
                      : 'bg-amber-500/30 text-amber-300 print:bg-amber-200 print:text-amber-800'
                  }`}
                >
                  {cat.percentage}% ({cat.correct}/{cat.total})
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden print:bg-slate-300">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    cat.priority === 'high' ? 'bg-rose-500' : 'bg-amber-400'
                  }`}
                  style={{ width: `${Math.max(8, cat.percentage)}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 print:text-slate-500 mt-1 flex items-center gap-1">
                {cat.priority === 'high' ? (
                  <>
                    <AlertTriangle className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                    Urgent Focus Needed
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                    Revision Recommended
                  </>
                )}
              </span>
            </div>
          ))}

          {/* Mastered category badge if available */}
          {roadmapData.masteredCategories.slice(0, 1).map((cat, idx) => (
            <div
              key={`m-${idx}`}
              className="p-2.5 rounded-lg border bg-emerald-950/30 border-emerald-500/30 text-emerald-200 print:bg-emerald-50 print:border-emerald-200 print:text-emerald-900 text-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-semibold truncate max-w-[170px]" title={cat.category}>
                  {cat.category}
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded font-mono bg-emerald-500/30 text-emerald-300 print:bg-emerald-200 print:text-emerald-800">
                  {cat.percentage}% ({cat.correct}/{cat.total})
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden print:bg-slate-300">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{ width: `${Math.max(8, cat.percentage)}%` }}
                />
              </div>
              <span className="text-[10px] text-emerald-400 print:text-emerald-700 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
                Mastered Strength
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs (Full screen only) */}
      {!isPrintFriendly && roadmapData.recommendedChapters.length > 1 && (
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Recommended ({totalChapters})
          </button>
          <button
            onClick={() => setActiveTab('priority')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'priority'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Highest Priority
          </button>
          <button
            onClick={() => setActiveTab('studied')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'studied'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Marked Studied ({completedCount})
          </button>
        </div>
      )}

      {/* Chapter Steps List */}
      <div className="space-y-3">
        {filteredChapters.map((chapter: RecommendedChapter, idx: number) => {
          const isStudied = studiedIds.includes(chapter.id);

          return (
            <div
              key={chapter.id}
              className={`relative rounded-xl border p-3.5 sm:p-4 transition-all ${
                isStudied
                  ? 'bg-emerald-950/20 border-emerald-500/40 print:bg-emerald-50 print:border-emerald-300'
                  : chapter.priority === 'high'
                  ? 'bg-slate-950/80 border-rose-500/40 shadow-sm print:bg-slate-50 print:border-rose-300'
                  : 'bg-slate-950/80 border-indigo-500/30 print:bg-slate-50 print:border-slate-300'
              }`}
            >
              {/* Top row: Step & badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${
                      isStudied
                        ? 'bg-emerald-500 text-slate-950'
                        : chapter.priority === 'high'
                        ? 'bg-rose-500 text-white'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-bold text-indigo-300 print:text-indigo-700 uppercase tracking-wider">
                    {chapter.subjectName} • {chapter.gradeLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Accuracy & Priority Badge */}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      chapter.priority === 'high'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 print:bg-rose-100 print:text-rose-800'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 print:bg-amber-100 print:text-amber-800'
                    }`}
                  >
                    Recent Score: {chapter.accuracy}%
                  </span>

                  {/* Estimated time */}
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-300 bg-slate-800/80 print:bg-slate-200 print:text-slate-700 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {chapter.estimatedMinutes} mins study
                  </span>
                </div>
              </div>

              {/* Chapter Title */}
              <div className="mb-2">
                <h4 className="text-sm sm:text-base font-extrabold text-white print:text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400 shrink-0 print:text-amber-600" />
                  <span>{chapter.chapterName}</span>
                  {isStudied && (
                    <span className="text-emerald-400 print:text-emerald-600 text-xs font-bold inline-flex items-center gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Revision Completed
                    </span>
                  )}
                </h4>
                <p className="text-xs text-amber-300/90 print:text-amber-800 mt-0.5 font-medium">
                  {chapter.revisionGoal}
                </p>
              </div>

              {/* Key Concepts to Review */}
              <div className="bg-slate-900/60 print:bg-slate-100 rounded-lg p-2.5 mb-3 border border-slate-800 print:border-slate-200">
                <div className="text-[11px] font-bold text-slate-300 print:text-slate-700 mb-1 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-amber-400" />
                  Key Concepts to Revise:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-300 print:text-slate-600">
                  {chapter.keyConcepts.map((concept, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-1.5">
                      <span className="text-indigo-400 print:text-indigo-600 mt-0.5">•</span>
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 print:border-slate-200">
                {/* Mark as Studied Toggle */}
                <button
                  type="button"
                  onClick={() => handleToggleStudied(chapter.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    isStudied
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 print:bg-emerald-100 print:text-emerald-800'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white print:bg-slate-200 print:text-slate-800'
                  }`}
                >
                  {isStudied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Revision Completed</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Mark as Completed</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  {onOpenFlashcards && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenFlashcards(
                          chapter.gradeLabel,
                          chapter.subjectName,
                          chapter.chapterName
                        )
                      }
                      className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/40 text-indigo-300 transition-all cursor-pointer"
                      title="Flip quick flashcards for this chapter before testing"
                    >
                      <span>🗂️</span>
                      <span>Flashcards</span>
                    </button>
                  )}

                  {/* Practice Quiz Trigger */}
                  {onStartChapterPractice && (
                    <button
                      type="button"
                      onClick={() =>
                        onStartChapterPractice(
                          chapter.gradeLabel,
                          chapter.subjectName,
                          chapter.chapterName
                        )
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md transition-all cursor-pointer group"
                    >
                      <Zap className="w-3.5 h-3.5 text-slate-950 group-hover:scale-110 transition-transform" />
                      <span>Practice Chapter Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Roadmap Conclusion & Guidance Strip */}
      <div className="mt-4 pt-3 border-t border-slate-700/60 print:border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-300 print:text-slate-700">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="italic leading-relaxed">
            "{roadmapData.summaryRemarksEnglish}"
          </span>
        </div>
        <div className="text-[10px] text-slate-400 print:text-slate-500 shrink-0 font-medium">
          Vidya Gyan Smart Study Engine • Chamba Board
        </div>
      </div>
    </div>
  );
};
