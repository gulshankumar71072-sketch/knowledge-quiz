import React, { useState } from 'react';
import { Sparkles, Brain, X, Loader2, Zap, GraduationCap, ShieldCheck, Flame, Compass } from 'lucide-react';
import { topicSuggestions } from '../data/curatedQuestions';
import { schoolGrades } from '../data/schoolCurriculum';
import { QuizQuestion, QuizDifficulty } from '../types';
import { playClickSound } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onQuizGenerated: (questions: QuizQuestion[], topic: string) => void;
  soundEnabled: boolean;
  initialClass?: string;
  initialSubject?: string;
}

export const AIGeneratorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onQuizGenerated,
  soundEnabled,
  initialClass,
  initialSubject,
}) => {
  const [selectedClass, setSelectedClass] = useState<string>(initialClass || '');
  const [subject, setSubject] = useState<string>(initialSubject || '');
  const [chapter, setChapter] = useState('');
  const [count, setCount] = useState(15);
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('Medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    playClickSound(soundEnabled);

    const isClassMode = Boolean(selectedClass);
    const finalTopic = isClassMode
      ? `${selectedClass} • ${subject || 'Syllabus'}${chapter ? ` (${chapter})` : ''}`
      : chapter || 'General Knowledge';

    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: finalTopic,
          classGrade: selectedClass || undefined,
          subject: subject || undefined,
          chapter: chapter || undefined,
          count,
          difficulty,
          attemptNumber: Math.floor(Math.random() * 50) + 1,
          seed: `${Date.now()}_${Math.random()}`,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate quiz with High Thinking.');
      }

      const data = await res.json();
      if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error('No questions returned by Gemini.');
      }

      onQuizGenerated(data.questions, finalTopic);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error communicating with Gemini High Thinking');
    } finally {
      setLoading(false);
    }
  };

  const currentGradeData = schoolGrades.find((g) => g.gradeLabel === selectedClass);

  const difficultyOptions: Array<{
    id: QuizDifficulty;
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    activeClass: string;
  }> = [
    {
      id: 'Easy',
      label: 'Easy',
      description: 'Definitions & direct core facts',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      color: 'emerald',
      activeClass: 'bg-emerald-600/30 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-500/10',
    },
    {
      id: 'Medium',
      label: 'Medium',
      description: 'Standard syllabus applications',
      icon: <Compass className="w-4 h-4 text-indigo-400" />,
      color: 'indigo',
      activeClass: 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/20',
    },
    {
      id: 'Hard',
      label: 'Hard',
      description: 'HOTS & deep conceptual reasoning',
      icon: <Flame className="w-4 h-4 text-rose-400" />,
      color: 'rose',
      activeClass: 'bg-rose-600/30 border-rose-400 text-rose-200 shadow-md shadow-rose-500/10',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl p-5 sm:p-7 relative overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-5">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                AI Syllabus Quiz Generator
              </h2>
              <span className="text-[11px] font-semibold text-indigo-400">
                Gemini 3.8 Flash • High Thinking Mode
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onClose();
            }}
            className="p-1.5 rounded-xl hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          {/* Class Grade selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Target Class / Standard</span>
            </label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                const g = schoolGrades.find((grade) => grade.gradeLabel === e.target.value);
                if (g) setSubject(g.subjects[0].name);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="">General Trivia / Non-Class</option>
              {schoolGrades.map((g) => (
                <option key={g.gradeNumber} value={g.gradeLabel}>
                  {g.gradeLabel} ({g.category})
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selection (if class selected) */}
          {selectedClass && currentGradeData && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {currentGradeData.subjects.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Specific Chapter or Topic */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              {selectedClass ? 'Chapter or Topic (Optional)' : 'Quiz Subject or Topic'}
            </label>
            <input
              type="text"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder={
                selectedClass
                  ? 'e.g. Light Reflection, Chemical Reactions, Fractions...'
                  : 'e.g. Quantum Physics, World History, Astrophysics...'
              }
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 placeholder:text-slate-500 transition-all"
            />

            {!selectedClass && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {topicSuggestions.slice(0, 5).map((t) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setChapter(t.name);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                      chapter === t.name
                        ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200'
                        : 'bg-slate-900/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Difficulty Toggle (Easy, Medium, Hard) */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Quiz Difficulty Level
              </label>
              <span className="text-[11px] font-bold text-indigo-300">
                Selected: {difficulty}
              </span>
            </div>

            {/* Segmented Toggle Control */}
            <div className="grid grid-cols-3 gap-2">
              {difficultyOptions.map((opt) => {
                const isSelected = difficulty === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setDifficulty(opt.id);
                    }}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? opt.activeClass
                        : 'bg-slate-900/70 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {opt.icon}
                      <span className="text-xs font-bold">{opt.label}</span>
                    </div>
                    <span className="text-[10px] opacity-75 line-clamp-1 hidden sm:block">
                      {opt.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Count Selector */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Questions Count
              </label>
              <span className="text-[11px] text-slate-400">{count} Questions</span>
            </div>
            <div className="flex gap-2">
              {[10, 15, 20].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setCount(num);
                  }}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    count === num
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {num} Qs
                </button>
              ))}
            </div>
          </div>

          {/* High Thinking Info Box */}
          <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2.5">
            <Brain className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <span className="font-bold text-indigo-200">
                Syllabus-Aligned High Thinking ({difficulty} Mode):
              </span>
              <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                {difficulty === 'Easy'
                  ? 'Generates clear, straightforward questions testing core definitions, foundational formulas, and memory concepts.'
                  : difficulty === 'Hard'
                  ? 'Generates challenging Higher-Order-Thinking (HOTS) questions with multi-step calculations, subtle distractors, and in-depth deductions.'
                  : 'Generates balanced standard syllabus questions testing conceptual understanding and application.'}
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {/* Action button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing {difficulty} Quiz...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Start {difficulty} Quiz ({count} Questions)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
