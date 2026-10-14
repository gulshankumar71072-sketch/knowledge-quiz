import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, XCircle, Printer, X, Sparkles, School, User, Calendar, BookOpen, Clock, Flame, Check, ShieldCheck, Edit3, Share2 } from 'lucide-react';
import { QuizQuestion, UserAnswerRecord, StudentProfile } from '../types';
import { getStudentProfile, saveStudentProfile } from '../utils/studentProfile';
import { playClickSound } from '../utils/sound';
import { ShareScorecardModal } from './ShareScorecardModal';
import { ClassPerformanceComparison } from './ClassPerformanceComparison';
import { ScoreTrendChart } from './ScoreTrendChart';
import { SmartStudyRoadmap } from './SmartStudyRoadmap';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  classGrade: string;
  subject: string;
  timeSpentSeconds: number;
  maxStreak: number;
  questions: QuizQuestion[];
  userAnswers: UserAnswerRecord[];
  soundEnabled: boolean;
  studentProfile?: StudentProfile;
  onOpenStudentProfile?: () => void;
  onReviewAnswers: () => void;
  onRetake: () => void;
}

export const ScorecardModal: React.FC<Props> = ({
  isOpen,
  onClose,
  score,
  totalQuestions,
  classGrade,
  subject,
  timeSpentSeconds,
  maxStreak,
  questions,
  userAnswers,
  soundEnabled,
  studentProfile: initialProfile,
  onOpenStudentProfile,
  onReviewAnswers,
  onRetake,
}) => {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    return initialProfile || getStudentProfile();
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    } else {
      setProfile(getStudentProfile());
    }
  }, [initialProfile, isOpen]);

  if (!isOpen) return null;

  const percentage = Math.round((score / totalQuestions) * 100);

  // Calculate Grade & Division
  let gradeBadge = 'A+';
  let gradeTitleEn = 'Outstanding (First Division with Distinction)';
  let gradeTitleHi = 'उत्कृष्ट प्रदर्शन • प्रथम श्रेणी विशेष योग्यता';
  let badgeColor = 'text-amber-300 bg-amber-500/20 border-amber-400';
  let remarksEn = 'Exceptional conceptual understanding and analytical problem-solving!';
  let remarksHi = 'असाधारण वैचारिक समझ और सटीक समस्या समाधान क्षमता! शाबाश!';
  let divisionLabel = 'DISTINCTION';

  if (percentage >= 90) {
    gradeBadge = 'A+';
    gradeTitleEn = 'Outstanding (Distinction)';
    gradeTitleHi = 'उत्कृष्ट प्रदर्शन • विशेष योग्यता';
    badgeColor = 'text-amber-300 bg-amber-500/20 border-amber-400';
    remarksEn = 'Exceptional conceptual understanding and first-principles mastery!';
    remarksHi = 'उत्कृष्ट प्रदर्शन! कठिन अवधारणाओं पर बहुत मजबूत पकड़ है।';
    divisionLabel = 'FIRST DIVISION (DISTINCTION)';
  } else if (percentage >= 75) {
    gradeBadge = 'A';
    gradeTitleEn = 'Excellent (First Division)';
    gradeTitleHi = 'अति उत्तम • प्रथम श्रेणी';
    badgeColor = 'text-emerald-300 bg-emerald-500/20 border-emerald-400';
    remarksEn = 'Very good performance. Strong grasp over core syllabus topics.';
    remarksHi = 'अति उत्तम प्रदर्शन। मुख्य विषयों पर अच्छी पकड़ है।';
    divisionLabel = 'FIRST DIVISION';
  } else if (percentage >= 60) {
    gradeBadge = 'B';
    gradeTitleEn = 'Good (Second Division)';
    gradeTitleHi = 'सराहनीय • द्वितीय श्रेणी';
    badgeColor = 'text-blue-300 bg-blue-500/20 border-blue-400';
    remarksEn = 'Good attempt. Review the Deep Thinking proofs to improve further.';
    remarksHi = 'सराहनीय प्रयास। कठिन प्रश्नों के विश्लेषण को दोबारा पढ़ें।';
    divisionLabel = 'SECOND DIVISION';
  } else if (percentage >= 40) {
    gradeBadge = 'C';
    gradeTitleEn = 'Pass (Third Division)';
    gradeTitleHi = 'संतोषजनक • तृतीय श्रेणी';
    badgeColor = 'text-yellow-300 bg-yellow-500/20 border-yellow-400';
    remarksEn = 'Satisfactory. Needs practice on foundational syllabus concepts.';
    remarksHi = 'संतोषजनक। मूलभूत सूत्रों और अवधारणाओं का पुनः अभ्यास करें।';
    divisionLabel = 'THIRD DIVISION';
  } else {
    gradeBadge = 'D';
    gradeTitleEn = 'Needs Practice';
    gradeTitleHi = 'सुधार की आवश्यकता';
    badgeColor = 'text-rose-300 bg-rose-500/20 border-rose-400';
    remarksEn = 'Needs improvement. Take chapter tests and read explanations carefully.';
    remarksHi = 'कठिन परिश्रम की आवश्यकता है। व्याख्याओं को ध्यान से पढ़ें और पुनः प्रयास करें।';
    divisionLabel = 'NEEDS IMPROVEMENT';
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handlePrint = () => {
    playClickSound(soundEnabled);
    window.print();
  };

  const handleSaveName = (newName: string) => {
    const cleaned = newName.trim() || 'Student';
    const updated = { ...profile, name: cleaned };
    setProfile(updated);
    saveStudentProfile(updated);
  };

  const currentClassLabel = classGrade || profile.classGrade;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-xl bg-slate-800 border-2 border-amber-400/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Printable Scorecard Container */}
        <div id="printable-scorecard" className="p-5 sm:p-7 space-y-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 print:bg-white print:text-black">
          
          {/* School Header Banner with Gold Trim */}
          <div className="border-b-2 border-amber-400/40 pb-4 text-center relative print:border-amber-600">
            <div className="absolute right-0 top-0 flex items-center gap-1.5 print:hidden">
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setShowShareModal(true);
                }}
                className="p-1.5 px-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                title="Share Scorecard"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Share</span>
              </button>
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

            <div className="inline-flex items-center justify-center gap-2 mb-1.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-indigo-500 flex items-center justify-center text-slate-950 font-black text-base shadow-md">
                {profile.avatarEmoji || '🎓'}
              </div>
              <div className="text-left">
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300 block print:text-amber-800">
                  {profile.schoolName || 'VIDYA GYAN NATIONAL ACADEMY'}
                </span>
                <span className="text-[10px] text-slate-300 print:text-slate-700 font-semibold block">
                  Vidya Gyan Evaluation Board, Chamba
                </span>
              </div>
            </div>

            <div className="mt-2 py-1 px-3 bg-amber-500/10 border border-amber-500/30 rounded-xl inline-block">
              <h1 className="text-base sm:text-lg font-black bg-gradient-to-r from-amber-300 via-amber-200 to-indigo-200 bg-clip-text text-transparent print:text-slate-900 leading-tight">
                STUDENT OFFICIAL MARKSHEET & REPORT CARD
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 print:text-slate-600 mt-1">
              Affiliated to CBSE / State Board Curriculum • Session 2025-2026
            </p>
          </div>

          {/* Student Profile Strip with all requested fields: Name, School Name, Age, Class */}
          <div className="bg-slate-950/70 border border-slate-700/80 rounded-2xl p-3.5 text-xs print:bg-slate-50 print:border-slate-300 print:text-black">
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800 print:border-slate-300">
              <span className="text-[10px] uppercase font-bold text-amber-400 print:text-amber-800 flex items-center gap-1">
                <span>🪪</span> STUDENT DETAILS & PROFILE
              </span>
              {onOpenStudentProfile && (
                <button
                  type="button"
                  onClick={() => {
                    playClickSound(soundEnabled);
                    onOpenStudentProfile();
                  }}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 print:hidden cursor-pointer hover:underline"
                >
                  <Edit3 className="w-3 h-3" /> Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* 1. Student Name */}
              <div>
                <span className="text-slate-400 print:text-slate-500 block text-[10px] uppercase font-bold">
                  Student Name
                </span>
                {isEditingName ? (
                  <div className="flex items-center gap-1 mt-0.5">
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleSaveName(e.target.value)}
                      className="bg-slate-800 border border-amber-500/50 rounded px-1.5 py-0.5 text-xs text-white w-full"
                      autoFocus
                    />
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="text-[10px] bg-amber-500 px-2 py-0.5 rounded text-slate-950 font-bold"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => setIsEditingName(true)}
                    className="font-bold text-slate-100 print:text-slate-900 flex items-center gap-1 cursor-pointer hover:underline truncate"
                    title="Click to edit student name"
                  >
                    <span className="truncate">{profile.name}</span>
                    <span className="text-[10px] text-amber-400 print:hidden">✏️</span>
                  </div>
                )}
              </div>

              {/* 2. School Name */}
              <div>
                <span className="text-slate-400 print:text-slate-500 block text-[10px] uppercase font-bold">
                  School / Institution
                </span>
                <span className="font-bold text-indigo-300 print:text-indigo-900 truncate block" title={profile.schoolName}>
                  {profile.schoolName}
                </span>
              </div>

              {/* 3. Class */}
              <div>
                <span className="text-slate-400 print:text-slate-500 block text-[10px] uppercase font-bold">
                  Class / Grade
                </span>
                <span className="font-bold text-amber-300 print:text-amber-800">
                  {currentClassLabel}
                </span>
              </div>

              {/* 4. Age */}
              <div>
                <span className="text-slate-400 print:text-slate-500 block text-[10px] uppercase font-bold">
                  Age
                </span>
                <span className="font-bold text-emerald-300 print:text-emerald-800">
                  {profile.age} Years
                </span>
              </div>
            </div>

            {/* Additional Sub-strip for Subject & Date */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2.5 mt-2.5 border-t border-slate-800/80 print:border-slate-200 text-[11px]">
              <div>
                <span className="text-slate-400 print:text-slate-500 text-[10px] block">Subject:</span>
                <span className="font-bold text-slate-200 print:text-slate-800 truncate block">{subject}</span>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-500 text-[10px] block">Roll No & Sec:</span>
                <span className="font-bold text-slate-300 print:text-slate-700">
                  {profile.rollNumber || 'KV-2025-042'} ({profile.section || 'A'})
                </span>
              </div>
              <div>
                <span className="text-slate-400 print:text-slate-500 text-[10px] block">Exam Date:</span>
                <span className="font-bold text-slate-300 print:text-slate-700">
                  {new Date().toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Summary Header with Time Tracking Badge */}
          <div className="flex items-center justify-between text-xs px-1 print:text-slate-800">
            <span className="text-[11px] uppercase font-extrabold tracking-wider text-slate-400 print:text-slate-600 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400 print:text-amber-600" />
              PERFORMANCE SUMMARY
            </span>
            
            {/* Elegant Time-Tracking Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-indigo-400/30 text-indigo-300 text-xs font-semibold shadow-sm shadow-indigo-950/50 print:bg-indigo-50 print:border-indigo-300 print:text-indigo-800"
            >
              <Clock className="w-3.5 h-3.5 text-indigo-400 print:text-indigo-600" />
              <span className="text-[10px] text-slate-400 print:text-slate-600 font-medium">Total Time:</span>
              <span className="font-bold text-indigo-200 print:text-indigo-900">{formatTime(timeSpentSeconds)}</span>
            </div>
          </div>

          {/* Marks & Grade Grand Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Score Box */}
            <div className="bg-slate-950/70 border border-slate-700/80 rounded-2xl p-4 text-center flex flex-col justify-center print:border-slate-300 print:bg-slate-50">
              <span className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-600">
                Marks Obtained
              </span>
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-indigo-300 print:text-amber-700 my-0.5">
                {score} / {totalQuestions}
              </div>
              <span className="text-xs font-bold text-amber-300 print:text-amber-800">
                {percentage}% Score ({percentage >= 40 ? 'PASS' : 'RE-TEST'})
              </span>
            </div>

            {/* Grade Award Box */}
            <div className={`rounded-2xl p-4 text-center border-2 flex flex-col justify-center ${badgeColor} print:border-slate-400 print:bg-white shadow-md`}>
              <span className="text-[10px] uppercase font-extrabold tracking-wider">
                Overall Grade
              </span>
              <div className="text-4xl font-black my-0.5">
                {gradeBadge}
              </div>
              <div className="text-xs font-bold leading-tight">
                {divisionLabel}
              </div>
            </div>

            {/* Stats Summary Box */}
            <div className="bg-slate-950/70 border border-slate-700/80 rounded-2xl p-3 space-y-2 text-xs flex flex-col justify-center print:border-slate-300 print:bg-slate-50">
              <div className="flex justify-between items-center text-slate-300 print:text-slate-800">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Correct:</span>
                <strong className="text-emerald-400">{score} Qs</strong>
              </div>
              <div className="flex justify-between items-center text-slate-300 print:text-slate-800">
                <span className="flex items-center gap-1"><XCircle className="w-3.5 h-3.5 text-rose-400" /> Incorrect:</span>
                <strong className="text-rose-400">{totalQuestions - score} Qs</strong>
              </div>
              <div className="flex justify-between items-center text-slate-300 print:text-slate-800 pt-1 border-t border-slate-800/60 print:border-slate-200">
                <span className="flex items-center gap-1 text-slate-300 print:text-slate-700 font-medium">
                  <Clock className="w-3.5 h-3.5 text-indigo-400 print:text-indigo-600" /> Total Time:
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 font-bold text-[11px] print:bg-indigo-50 print:border-indigo-300 print:text-indigo-800">
                  <Clock className="w-3 h-3 text-indigo-400 print:text-indigo-600" />
                  {formatTime(timeSpentSeconds)}
                </span>
              </div>
              {maxStreak > 1 && (
                <div className="flex justify-between items-center text-slate-300 print:text-slate-800">
                  <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-amber-400" /> Streak:</span>
                  <strong className="text-amber-400">{maxStreak} in a row</strong>
                </div>
              )}
            </div>
          </div>

          {/* Class Performance Comparison Section */}
          <ClassPerformanceComparison
            score={score}
            totalQuestions={totalQuestions}
            subjectName={subject}
            classGrade={currentClassLabel}
            isPrintFriendly={true}
          />

          {/* D3.js Mini Bar Chart - Score Trends over Last 5 Attempts */}
          <ScoreTrendChart
            score={score}
            totalQuestions={totalQuestions}
            subjectName={subject}
            isPrintFriendly={true}
          />

          {/* Smart Study Roadmap - Suggestions based on lowest scoring categories */}
          <SmartStudyRoadmap
            questions={questions}
            userAnswers={userAnswers}
            subjectName={subject}
            classGrade={currentClassLabel}
            isPrintFriendly={true}
          />

          {/* Teacher's Evaluation & Remarks Box in English */}
          <div className="bg-slate-950/70 border border-amber-500/30 rounded-2xl p-4 space-y-1.5 print:border-slate-300 print:bg-slate-50">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1.5 print:text-amber-700">
                <Award className="w-4 h-4 text-amber-400" />
                Teacher's Evaluation & Remarks:
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold print:text-emerald-700">
                ✓ Verified
              </span>
            </div>
            <p className="text-xs text-slate-100 print:text-slate-900 leading-relaxed font-semibold">
              "{remarksEn}"
            </p>
          </div>

          {/* Official Verification Seal & Signatures */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-700/80 text-[10px] text-slate-400 print:border-slate-300 print:text-slate-600">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-bold text-xs shadow-inner">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <span className="font-bold block text-slate-200 print:text-slate-900">VERIFIED OFFICIAL RESULT</span>
                <span>Roll No: {profile.rollNumber || `VG-2026-${Math.abs(profile.name.split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 1000)).toString().slice(0, 4)}`}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif italic font-bold text-amber-300 print:text-amber-800 text-xs">
                Mr. Budhia Ram
              </div>
              <div className="text-[10px] text-slate-300 print:text-slate-700 font-semibold">
                Academic Director
              </div>
              <span className="text-[10px] text-slate-400 print:text-slate-600 block">
                Vidya Gyan Evaluation Board, Chamba
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Controls (Hidden on Print) */}
        <div className="p-4 border-t border-slate-700 bg-slate-900/95 flex flex-wrap items-center justify-between gap-2.5 print:hidden">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>Print Marksheet 🖨️</span>
            </button>

            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setShowShareModal(true);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <Share2 className="w-4 h-4 text-slate-950" />
              <span>Share Scorecard 📲</span>
            </button>

            <button
              onClick={() => {
                playClickSound(soundEnabled);
                onReviewAnswers();
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Review Answers 📝
            </button>
          </div>

          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onRetake();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            Retake with Fresh Quiz 🔄
          </button>
        </div>
      </div>

      {/* Share Scorecard Modal */}
      <ShareScorecardModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        score={score}
        totalQuestions={totalQuestions}
        classGrade={currentClassLabel}
        subject={subject}
        studentProfile={profile}
        timeSpentSeconds={timeSpentSeconds}
        soundEnabled={soundEnabled}
      />
    </div>
  );
};
