import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  School,
  GraduationCap,
  Calendar,
  Sparkles,
  CheckCircle2,
  Award,
  Hash,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { StudentProfile } from '../types';
import {
  DEFAULT_STUDENT_PROFILE,
  AVAILABLE_CLASSES,
  POPULAR_SCHOOLS,
  AVATAR_OPTIONS,
  saveStudentProfile,
} from '../utils/studentProfile';
import { playClickSound } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  onProfileUpdated: (updatedProfile: StudentProfile, switchClassQuiz?: boolean) => void;
  soundEnabled: boolean;
}

export const StudentProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentProfile,
  onProfileUpdated,
  soundEnabled,
}) => {
  const [formData, setFormData] = useState<StudentProfile>(currentProfile);
  const [shouldSwitchQuiz, setShouldSwitchQuiz] = useState<boolean>(true);
  const [showSavedFeedback, setShowSavedFeedback] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(currentProfile || DEFAULT_STUDENT_PROFILE);
      setShowSavedFeedback(false);
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playClickSound(soundEnabled);

    const cleaned: StudentProfile = {
      ...formData,
      name: formData.name.trim() || 'Aditya Sharma',
      schoolName: formData.schoolName.trim() || 'Kendriya Vidyalaya',
      age: Math.min(22, Math.max(4, Number(formData.age) || 15)),
      classGrade: formData.classGrade || 'Class 10',
      rollNumber: formData.rollNumber?.trim() || 'KV-2025-042',
      section: formData.section?.trim() || 'A',
      avatarEmoji: formData.avatarEmoji || '👨‍🎓',
    };

    saveStudentProfile(cleaned);
    try {
      localStorage.setItem('quiz_student_registered', 'true');
      sessionStorage.setItem('hasSeenStudentPromptOnOpen', 'true');
    } catch (_) {}
    setShowSavedFeedback(true);
    onProfileUpdated(cleaned, shouldSwitchQuiz);

    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border-2 border-indigo-500/40 rounded-3xl shadow-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 relative text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-indigo-500 flex items-center justify-center text-xl shadow-lg shadow-amber-500/10">
              🪪
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5 leading-tight">
                <span>Student Details & Profile</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                School ID Card & Profile • Name, Institution, Age & Grade
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onClose();
            }}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Welcome Onboarding Hint Banner */}
        <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-indigo-500/15 to-amber-500/10 border border-amber-400/40 text-xs text-amber-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <span className="font-extrabold text-white block">
              👋 Welcome Student!
            </span>
            <span className="text-slate-300">
              Enter your student details to generate your verified student profile and official marksheet.
            </span>
          </div>
        </div>

        {/* Live Student Identity Card Preview */}
        <div className="mb-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-2 border-amber-400/40 rounded-2xl p-4 shadow-xl relative overflow-hidden">
          {/* Watermark seal */}
          <div className="absolute -right-6 -bottom-6 text-slate-800/30 text-8xl pointer-events-none select-none font-serif">
            🏫
          </div>

          <div className="flex items-center justify-between border-b border-amber-400/20 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🎓</span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                  {formData.schoolName || 'Kendriya Vidyalaya'}
                </span>
                <span className="text-[9px] text-slate-400 block">
                  STUDENT IDENTITY CARD • Session 2025-2026
                </span>
              </div>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> VERIFIED
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Avatar with selector */}
            <div className="relative group shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400/20 to-indigo-500/30 border-2 border-amber-400/60 flex items-center justify-center text-3xl shadow-inner">
                {formData.avatarEmoji || '👨‍🎓'}
              </div>
              <span className="absolute -bottom-1 -right-1 text-[9px] bg-slate-800 border border-slate-600 rounded-full px-1 text-slate-300">
                Edit
              </span>
            </div>

            {/* Quick Details on Card */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-extrabold text-white truncate flex items-center gap-1">
                <span>{formData.name || 'Aditya Sharma'}</span>
              </h3>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-1 text-[11px]">
                <div>
                  <span className="text-slate-400 text-[10px]">Class / Grade:</span>
                  <div className="font-bold text-amber-300 truncate">{formData.classGrade}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Age:</span>
                  <div className="font-bold text-indigo-300">{formData.age} Years</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Roll No:</span>
                  <div className="font-bold text-slate-300">{formData.rollNumber || 'KV-2025-042'}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Section:</span>
                  <div className="font-bold text-slate-300">Section {formData.section || 'A'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Avatar Picker */}
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[10px] text-slate-400 shrink-0">Avatar:</span>
            {AVATAR_OPTIONS.map((av) => (
              <button
                key={av}
                type="button"
                onClick={() => {
                  playClickSound(soundEnabled);
                  setFormData((prev) => ({ ...prev, avatarEmoji: av }));
                }}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-transform cursor-pointer shrink-0 ${
                  formData.avatarEmoji === av
                    ? 'bg-amber-500 text-slate-950 scale-110 shadow-sm ring-1 ring-amber-300'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {/* 1. Student Name */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Student Full Name</span>
              </span>
              <span className="text-[10px] text-amber-400 font-semibold">Required</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Aditya Sharma, Priya Patel..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 outline-none transition-all text-xs font-medium"
            />
          </div>

          {/* 2. School Name */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-indigo-400" />
                <span>School / Institution Name</span>
              </span>
              <span className="text-[10px] text-indigo-400 font-semibold">Affiliated School</span>
            </label>
            <input
              type="text"
              required
              value={formData.schoolName}
              onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
              placeholder="e.g. Kendriya Vidyalaya, Delhi Public School..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/50 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-500 outline-none transition-all text-xs font-medium"
            />

            {/* Popular School Suggestion Pills */}
            <div className="flex items-center gap-1.5 flex-wrap mt-2">
              <span className="text-[10px] text-slate-400">Quick select:</span>
              {POPULAR_SCHOOLS.slice(0, 4).map((sch) => (
                <button
                  key={sch}
                  type="button"
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setFormData({ ...formData, schoolName: sch });
                  }}
                  className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                    formData.schoolName === sch
                      ? 'bg-indigo-600 text-white border-indigo-400 font-bold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {sch}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Age & Roll Number Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Age</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      age: Math.max(5, (prev.age || 15) - 1),
                    }))
                  }
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center cursor-pointer border border-slate-700"
                >
                  -
                </button>
                <input
                  type="number"
                  min={5}
                  max={25}
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      age: parseInt(e.target.value) || 15,
                    })
                  }
                  className="flex-1 bg-slate-950 border border-slate-700 focus:border-emerald-400 text-center rounded-xl py-1.5 text-slate-100 font-bold text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      age: Math.min(22, (prev.age || 15) + 1),
                    }))
                  }
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center cursor-pointer border border-slate-700"
                >
                  +
                </button>
                <span className="text-xs text-slate-400 shrink-0">Years</span>
              </div>
            </div>

            {/* Roll Number & Section */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-amber-400" />
                <span>Roll No & Section</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.rollNumber || ''}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  placeholder="Roll No (e.g. 42)"
                  className="flex-1 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl px-2.5 py-1.5 text-slate-100 text-xs outline-none"
                />
                <input
                  type="text"
                  maxLength={2}
                  value={formData.section || ''}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value.toUpperCase() })}
                  placeholder="Sec"
                  className="w-12 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl text-center py-1.5 text-slate-100 text-xs font-bold uppercase outline-none"
                />
              </div>
            </div>
          </div>

          {/* 4. Class / Grade (Class 1 to 12) */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>Class / Grade (Class 1 to 12)</span>
              </span>
              <span className="text-[10px] text-amber-300 font-bold">
                Selected: {formData.classGrade}
              </span>
            </label>

            {/* Visual Class Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-40 overflow-y-auto pr-1">
              {AVAILABLE_CLASSES.map((cls) => {
                const isSelected = formData.classGrade === cls.id;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setFormData({ ...formData, classGrade: cls.id });
                    }}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-300 font-extrabold shadow-md ring-2 ring-amber-400/50'
                        : 'bg-slate-950/70 border-slate-700/80 hover:border-slate-500 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{cls.labelEn}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                    </div>
                    <span
                      className={`text-[9px] mt-0.5 truncate ${
                        isSelected ? 'text-slate-900 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {cls.id.replace('Class ', 'Grade ')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Switch Quiz Sync Option */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="text-[11px] text-slate-300">
                <strong>Sync Quiz to {formData.classGrade}:</strong>
                <span className="text-slate-400 block text-[10px]">
                  Automatically switch to this grade's 15-question syllabus quiz after saving
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              id="syncQuiz"
              checked={shouldSwitchQuiz}
              onChange={(e) => setShouldSwitchQuiz(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playClickSound(soundEnabled);
                onClose();
              }}
              className="flex-1 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              {showSavedFeedback ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                  <span>Profile Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Save & Continue</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
