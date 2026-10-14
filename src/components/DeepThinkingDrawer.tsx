import React, { useState } from 'react';
import { QuizQuestion, DeepAnalysisResult } from '../types';
import { Sparkles, Brain, HelpCircle, Send, Loader2, Lightbulb, Compass, ShieldAlert } from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface Props {
  question: QuizQuestion;
  userSelectedIndex: number | null;
  soundEnabled: boolean;
}

export const DeepThinkingDrawer: React.FC<Props> = ({
  question,
  userSelectedIndex,
  soundEnabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [dynamicAnalysis, setDynamicAnalysis] = useState<DeepAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Ask question state
  const [userQuery, setUserQuery] = useState('');
  const [askingQuery, setAskingQuery] = useState(false);
  const [queryAnswer, setQueryAnswer] = useState<string | null>(null);

  const fetchLiveDeepAnalysis = async () => {
    if (dynamicAnalysis || loadingAnalysis) return;
    setLoadingAnalysis(true);
    setAnalysisError(null);
    try {
      const res = await fetch('/api/quiz/deep-think', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.question,
          options: question.options,
          correct: question.correct,
          explanation: question.explanation,
          userChoice: userSelectedIndex,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to retrieve High Thinking analysis.');
      }
      const data = await res.json();
      if (data.analysis) {
        setDynamicAnalysis(data.analysis);
      } else {
        throw new Error(data.error || 'No analysis data returned.');
      }
    } catch (err: any) {
      console.error(err);
      setAnalysisError(err.message || 'Unable to connect to Gemini High Thinking reasoning.');
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleToggle = () => {
    playClickSound(soundEnabled);
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    if (willOpen && !question.deepThinking && !dynamicAnalysis) {
      fetchLiveDeepAnalysis();
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim() || askingQuery) return;
    playClickSound(soundEnabled);
    setAskingQuery(true);
    setQueryAnswer(null);

    try {
      const res = await fetch('/api/quiz/ask-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.question,
          options: question.options,
          correctOption: question.options[question.correct],
          userQuery: userQuery.trim(),
        }),
      });

      if (!res.ok) throw new Error('Failed to obtain Gemini High Thinking answer');
      const data = await res.json();
      setQueryAnswer(data.answer);
    } catch (err: any) {
      setQueryAnswer(`Error: ${err.message || 'Could not fetch response'}`);
    } finally {
      setAskingQuery(false);
    }
  };

  // Pre-baked deep thinking if available
  const baked = question.deepThinking;

  return (
    <div className="mt-4 border border-indigo-500/30 rounded-2xl bg-indigo-950/20 overflow-hidden transition-all duration-300">
      {/* Trigger Bar */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left hover:bg-indigo-900/20 transition-colors group cursor-pointer"
      >
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
            <Brain className="w-4 h-4 text-indigo-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-indigo-200">
                Deep Thinking Breakdown
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Gemini 3.8 Flash • High Thinking
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Examine step-by-step deductive logic, distractor traps, and mental models
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
          {isOpen ? 'Collapse ▲' : 'Explore Reasoning ▼'}
        </span>
      </button>

      {/* Expanded Reasoning Panel */}
      {isOpen && (
        <div className="p-4 sm:p-5 border-t border-indigo-500/20 bg-slate-900/70 space-y-4 text-sm animate-fadeIn">
          {/* Deductive Rationale */}
          <div className="space-y-1.5 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
            <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs uppercase tracking-wide">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>Deductive Proof & First Principles</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {baked?.rationale || dynamicAnalysis?.deductiveProof || (
                loadingAnalysis ? (
                  <span className="inline-flex items-center gap-2 text-indigo-300">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Gemini High Thinking synthesizing proof...
                  </span>
                ) : (
                  'Click below to generate live reasoning breakdown.'
                )
              )}
            </p>
          </div>

          {/* Distractor Trap Analysis */}
          <div className="space-y-1.5 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs uppercase tracking-wide">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Distractor Forensics (Why Other Choices Fail)</span>
            </div>
            {baked?.distractorAnalysis && (
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {baked.distractorAnalysis}
              </p>
            )}
            {dynamicAnalysis?.distractorAnalysis && (
              <div className="space-y-2 mt-1">
                {dynamicAnalysis.distractorAnalysis.map((item, idx) => (
                  <div key={idx} className="text-xs text-slate-300 border-l-2 border-amber-500/40 pl-2">
                    <strong className="text-amber-300">{item.option}:</strong> {item.whyIncorrect}
                  </div>
                ))}
              </div>
            )}
            {!baked?.distractorAnalysis && !dynamicAnalysis?.distractorAnalysis && loadingAnalysis && (
              <p className="text-slate-400 text-xs italic">Deconstructing deceptive options...</p>
            )}
          </div>

          {/* Mental Model / Takeaway */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold text-xs uppercase tracking-wide">
                <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mental Model</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                {baked?.takeaway || dynamicAnalysis?.mentalModel || 'Conceptual anchor will appear once calculated.'}
              </p>
            </div>

            {dynamicAnalysis?.bonusFact && (
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
                <div className="flex items-center space-x-1.5 text-cyan-400 font-semibold text-xs uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Bonus Insight</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {dynamicAnalysis.bonusFact}
                </p>
              </div>
            )}
          </div>

          {/* Fallback button if live analysis was not pre-baked or dynamic */}
          {!baked && !dynamicAnalysis && !loadingAnalysis && (
            <button
              onClick={fetchLiveDeepAnalysis}
              className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Brain className="w-3.5 h-3.5" />
              Run Deep Thinking Analysis with Gemini
            </button>
          )}

          {analysisError && (
            <p className="text-xs text-rose-400 bg-rose-950/30 p-2 rounded-lg border border-rose-800/40">
              {analysisError}
            </p>
          )}

          {/* Ask Grandmaster follow-up doubt */}
          <div className="pt-2 border-t border-slate-800">
            <form onSubmit={handleAskQuestion} className="space-y-2">
              <label className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-300">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Ask a Doubt or Challenge this Question</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="e.g. Why isn't Kyoto the capital? or What about Osmium?"
                  className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={askingQuery || !userQuery.trim()}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {askingQuery ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <span>Ask</span>
                      <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {queryAnswer && (
              <div className="mt-3 p-3 rounded-xl bg-indigo-900/30 border border-indigo-500/30 text-xs text-indigo-200 space-y-1 animate-fadeIn">
                <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>Gemini High Thinking Deep Answer:</span>
                </div>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{queryAnswer}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
