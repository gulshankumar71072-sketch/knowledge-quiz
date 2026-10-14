import React, { useState } from 'react';
import { X, GraduationCap, BookOpen, Sparkles, Check, ChevronRight, Layers, ArrowRight, Brain, Zap } from 'lucide-react';
import { schoolGrades, ClassGradeInfo, SubjectInfo } from '../data/schoolCurriculum';
import { mindSharpenerThemes } from '../data/kidsGkQuestions';
import { playClickSound } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedGradeNumber: number | null; // null for General Knowledge
  selectedSubjectId: string | null;
  onSelectClassAndSubject: (
    grade: ClassGradeInfo | null,
    subject: SubjectInfo | null,
    chapter?: string
  ) => void;
  onOpenFlashcards?: (gradeLabel: string, subjectName: string, chapterName: string) => void;
  soundEnabled: boolean;
}

export const ClassSelectorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedGradeNumber,
  selectedSubjectId,
  onSelectClassAndSubject,
  onOpenFlashcards,
  soundEnabled,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'Primary' | 'Middle' | 'Secondary' | 'Senior Secondary' | 'General'
  >(
    selectedGradeNumber
      ? selectedGradeNumber <= 5
        ? 'Primary'
        : selectedGradeNumber <= 8
        ? 'Middle'
        : selectedGradeNumber <= 10
        ? 'Secondary'
        : 'Senior Secondary'
      : 'Secondary'
  );

  const [activeGrade, setActiveGrade] = useState<ClassGradeInfo>(
    schoolGrades.find((g) => g.gradeNumber === selectedGradeNumber) ||
      schoolGrades.find((g) => g.gradeNumber === 10)!
  );

  const [activeSubject, setActiveSubject] = useState<SubjectInfo>(
    activeGrade.subjects.find((s) => s.id === selectedSubjectId) || activeGrade.subjects[0]
  );

  const [selectedChapter, setSelectedChapter] = useState<string>('');

  if (!isOpen) return null;

  const categories: Array<{
    id: 'Primary' | 'Middle' | 'Secondary' | 'Senior Secondary' | 'General';
    label: string;
    sublabel: string;
    icon: string;
  }> = [
    { id: 'Primary', label: 'Primary', sublabel: 'Class 1 – 5', icon: '🎒' },
    { id: 'Middle', label: 'Middle School', sublabel: 'Class 6 – 8', icon: '📐' },
    { id: 'Secondary', label: 'Secondary (Board)', sublabel: 'Class 9 – 10', icon: '🔬' },
    { id: 'Senior Secondary', label: 'Senior Secondary', sublabel: 'Class 11 – 12', icon: '🎓' },
    { id: 'General', label: 'Kids GK & Mind Sharpener', sublabel: 'दिमागी कसरत (IQ & Logic)', icon: '🧠' },
  ];

  const currentCategoryGrades = schoolGrades.filter((g) => g.category === activeCategory);

  const handleGradePick = (grade: ClassGradeInfo) => {
    playClickSound(soundEnabled);
    setActiveGrade(grade);
    setActiveSubject(grade.subjects[0]);
    setSelectedChapter('');
  };

  const handleSubjectPick = (subj: SubjectInfo) => {
    playClickSound(soundEnabled);
    setActiveSubject(subj);
    setSelectedChapter('');
  };

  const handleStartQuiz = (chapterOverride?: string) => {
    playClickSound(soundEnabled);
    if (activeCategory === 'General') {
      onSelectClassAndSubject(null, null, chapterOverride || selectedChapter || 'all');
    } else {
      onSelectClassAndSubject(activeGrade, activeSubject, chapterOverride || selectedChapter);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[92vh] bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-700/80 flex items-center justify-between bg-slate-800/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <GraduationCap className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Choose Class & Subject
              </h2>
              <p className="text-xs text-slate-400">
                Class 1st to 12th syllabus-aligned quizzes and chapter tests
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onClose();
            }}
            className="p-1.5 rounded-xl hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level Category Tabs */}
        <div className="p-3 bg-slate-900/60 border-b border-slate-700/60 flex gap-1.5 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playClickSound(soundEnabled);
                setActiveCategory(cat.id);
                if (cat.id !== 'General') {
                  const firstOfCat = schoolGrades.find((g) => g.category === cat.id);
                  if (firstOfCat) {
                    setActiveGrade(firstOfCat);
                    setActiveSubject(firstOfCat.subjects[0]);
                    setSelectedChapter('');
                  }
                }
              }}
              className={`px-3 py-2 rounded-xl text-left transition-all shrink-0 cursor-pointer flex items-center gap-2 border ${
                activeCategory === cat.id
                  ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200 shadow-sm'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <div>
                <div className="text-xs font-bold leading-tight">{cat.label}</div>
                <div className="text-[10px] opacity-75">{cat.sublabel}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeCategory === 'General' ? (
            /* Kids GK & Mind Sharpener Selection Hub */
            <div className="space-y-4 animate-fadeIn">
              {/* Hero Banner */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-amber-900/20 border-2 border-indigo-500/40 text-center space-y-3 relative overflow-hidden shadow-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-extrabold uppercase tracking-wider">
                  <Brain className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kids Mind Sharpener & General Knowledge</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  बच्चों का दिमाग तेज करने वाला सामान्य ज्ञान (IQ & Logic) ⚡
                </h3>
                <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                  दिमागी पहेलियां, अंतरिक्ष के रहस्य, विश्व भूगोल, पशु-पक्षियों के सुपरपावर्स, भारत का इतिहास, तेज गणित ट्रिक्स और दैनिक विज्ञान!
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => handleStartQuiz('all')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-black shadow-xl shadow-indigo-600/30 transition-all cursor-pointer inline-flex items-center gap-2 group hover:scale-[1.02]"
                  >
                    <span>🚀 सभी विषयों का मिक्स खेलें (Recommended)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Individual Mind-Sharpening Themes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>विषय चुनकर खेलें (Choose Special Theme):</span>
                  <span className="text-[11px] text-amber-400">हर बार नए सवाल 🔄</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {mindSharpenerThemes.map((theme) => (
                    <div
                      key={theme.id}
                      onClick={() => handleStartQuiz(theme.id)}
                      className="p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-indigo-400/60 transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-indigo-500/10"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/25 shrink-0 group-hover:scale-110 transition-transform">
                          {theme.icon}
                        </span>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-white group-hover:text-amber-300 transition-colors">
                              {theme.name}
                            </span>
                          </div>
                          <div className="text-[11px] text-amber-300/90 font-medium">
                            {theme.nameHindi}
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                            {theme.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 font-bold border border-indigo-500/30">
                          {theme.badge}
                        </span>
                        <span className="text-blue-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Play <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Select Grade within Category */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  1. Select Class
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentCategoryGrades.map((grade) => (
                    <button
                      key={grade.gradeNumber}
                      onClick={() => handleGradePick(grade)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        activeGrade.gradeNumber === grade.gradeNumber
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30 font-bold scale-[1.02]'
                          : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:bg-slate-700/60'
                      }`}
                    >
                      <div className="text-sm font-bold">{grade.gradeLabel}</div>
                      <div
                        className={`text-[10px] mt-0.5 truncate ${
                          activeGrade.gradeNumber === grade.gradeNumber
                            ? 'text-indigo-100'
                            : 'text-slate-400'
                        }`}
                      >
                        {grade.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Subject */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  2. Select Subject ({activeGrade.gradeLabel})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {activeGrade.subjects.map((subj) => (
                    <button
                      key={subj.id}
                      onClick={() => handleSubjectPick(subj)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        activeSubject.id === subj.id
                          ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 font-bold'
                          : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-lg">{subj.icon}</span>
                        <span className="text-xs truncate">{subj.name}</span>
                      </div>
                      {activeSubject.id === subj.id && (
                        <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 ml-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Choose Chapter / Topic (Optional) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    3. Select Chapter / Topic (Syllabus)
                  </label>
                  {selectedChapter && (
                    <button
                      onClick={() => setSelectedChapter('')}
                      className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                    >
                      Clear Chapter Filter
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
                  <button
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setSelectedChapter('');
                    }}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      !selectedChapter
                        ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200 font-semibold'
                        : 'bg-slate-900/50 border-slate-700/70 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ✨ All Chapters (Comprehensive)
                  </button>

                  {activeSubject.chapters.map((chap) => (
                    <button
                      key={chap}
                      onClick={() => {
                        playClickSound(soundEnabled);
                        setSelectedChapter(chap);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        selectedChapter === chap
                          ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200 font-semibold'
                          : 'bg-slate-900/50 border-slate-700/70 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                      }`}
                    >
                      {chap}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {activeCategory !== 'General' && (
          <div className="p-4 border-t border-slate-700 bg-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-300">
              Selected:{' '}
              <span className="font-bold text-indigo-300">
                {activeGrade.gradeLabel} • {activeSubject.name}
              </span>
              {selectedChapter && (
                <span className="text-slate-400"> ({selectedChapter})</span>
              )}
            </div>

            <button
              onClick={() => handleStartQuiz()}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Start {activeGrade.gradeLabel} Quiz</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
