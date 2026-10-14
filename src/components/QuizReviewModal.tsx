import React from 'react';
import { QuizQuestion, UserAnswerRecord } from '../types';
import { X, CheckCircle2, XCircle, Brain } from 'lucide-react';
import { DeepThinkingDrawer } from './DeepThinkingDrawer';
import { playClickSound } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
  answers: UserAnswerRecord[];
  soundEnabled: boolean;
}

export const QuizReviewModal: React.FC<Props> = ({
  isOpen,
  onClose,
  questions,
  answers,
  soundEnabled,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[90vh] bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-700/80 flex items-center justify-between bg-slate-800/90">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>Quiz Detailed Review</span>
            </h2>
            <p className="text-xs text-slate-400">
              Analyze your decisions, correct answers, and Deep Thinking proofs
            </p>
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

        {/* Scrollable Questions List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {questions.map((q, idx) => {
            const ans = answers.find((a) => a.questionIndex === idx);
            const userPick = ans ? ans.selectedOption : null;
            const isCorrect = ans ? ans.isCorrect : false;

            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 space-y-3.5"
              >
                {/* Question Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                    Question {idx + 1} • {q.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-400">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Title (English + Hindi) */}
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-100">
                    {q.question}
                  </h3>
                  {q.questionHindi && (
                    <p className="text-xs text-amber-300 font-medium leading-relaxed bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                      <strong className="text-amber-400">🇮🇳 प्रश्न:</strong> {q.questionHindi}
                    </p>
                  )}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, optIdx) => {
                    const isTheCorrectOne = optIdx === q.correct;
                    const isTheUserChoice = optIdx === userPick;
                    const optHi = q.optionsHindi?.[optIdx];

                    let style = 'bg-slate-800/60 border-slate-700/60 text-slate-300';
                    if (isTheCorrectOne) {
                      style = 'bg-emerald-600/20 border-emerald-500/80 text-emerald-300 font-semibold';
                    } else if (isTheUserChoice && !isCorrect) {
                      style = 'bg-rose-600/20 border-rose-500/80 text-rose-300 font-semibold';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between ${style}`}
                      >
                        <div className="pr-2 leading-tight">
                          <span className="font-semibold">{String.fromCharCode(65 + optIdx)}. {opt}</span>
                          {optHi && <div className="text-[11px] text-amber-300 font-normal">{optHi}</div>}
                        </div>
                        <div className="shrink-0 text-[10px]">
                          {isTheCorrectOne && <span className="text-emerald-400">✓ Correct</span>}
                          {isTheUserChoice && !isTheCorrectOne && <span className="text-rose-400">✗ Your Pick</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation text */}
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700/60 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-amber-400 block mb-0.5">💡 Teacher's Explanation:</span>
                  <p className="text-slate-200">{q.explanation}</p>
                  {q.explanationHindi && (
                    <p className="text-[11px] text-amber-200/90 pt-1 border-t border-slate-700/60">
                      <strong className="text-amber-300">Hindi Explanation:</strong> {q.explanationHindi}
                    </p>
                  )}
                </div>

                {/* High Thinking Drawer attached to this reviewed question */}
                <DeepThinkingDrawer
                  question={q}
                  userSelectedIndex={userPick}
                  soundEnabled={soundEnabled}
                />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-800 text-center">
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};
