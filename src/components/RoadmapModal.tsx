import React from 'react';
import { X, Compass } from 'lucide-react';
import { SmartStudyRoadmap } from './SmartStudyRoadmap';
import { QuizQuestion, UserAnswerRecord } from '../types';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions?: QuizQuestion[];
  userAnswers?: UserAnswerRecord[];
  subjectName?: string;
  classGrade?: string;
  onStartChapterPractice?: (gradeLabel: string, subjectName: string, chapterName: string) => void;
  onOpenFlashcards?: (gradeLabel: string, subjectName: string, chapterName: string) => void;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({
  isOpen,
  onClose,
  questions,
  userAnswers,
  subjectName,
  classGrade,
  onStartChapterPractice,
  onOpenFlashcards,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-indigo-500/40 rounded-3xl shadow-2xl shadow-indigo-950/70 overflow-hidden text-slate-100 animate-scaleUp">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 px-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500/30 to-amber-500/30 border border-indigo-400/50 flex items-center justify-center text-amber-300">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                Personalized Smart Study Roadmap
              </h3>
              <p className="text-[11px] text-slate-400">
                Targeted chapter recommendations based on your recent quiz performance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          <SmartStudyRoadmap
            questions={questions}
            userAnswers={userAnswers}
            subjectName={subjectName}
            classGrade={classGrade}
            onStartChapterPractice={(grade, subj, ch) => {
              onClose();
              if (onStartChapterPractice) {
                onStartChapterPractice(grade, subj, ch);
              }
            }}
            onOpenFlashcards={(grade, subj, ch) => {
              onClose();
              if (onOpenFlashcards) {
                onOpenFlashcards(grade, subj, ch);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
