import React, { useState, useEffect } from 'react';
import { Trophy, Medal, X, Flame, Clock, Award, CheckCircle2, User, Sparkles } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { getLeaderboard, saveUserScoreToLeaderboard, getTodayChallengeInfo, getTodayDateString } from '../utils/dailyChallenge';
import { playClickSound, playVictoryFanfare } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pendingScore?: {
    score: number;
    totalQuestions: number;
    timeSpentSeconds: number;
    topic: string;
  } | null;
  onScoreSubmitted?: () => void;
  soundEnabled: boolean;
}

export const LeaderboardModal: React.FC<Props> = ({
  isOpen,
  onClose,
  pendingScore,
  onScoreSubmitted,
  soundEnabled,
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userName, setUserName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState<'today' | 'all'>('today');

  const todayInfo = getTodayChallengeInfo();
  const todayStr = getTodayDateString();

  useEffect(() => {
    if (isOpen) {
      setEntries(getLeaderboard());
      const savedName = localStorage.getItem('quiz_student_name') || localStorage.getItem('quiz_username') || '';
      if (savedName) setUserName(savedName);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !pendingScore) return;

    playClickSound(soundEnabled);
    localStorage.setItem('quiz_username', userName.trim());

    const accuracy = Math.round((pendingScore.score / pendingScore.totalQuestions) * 100);
    const updated = saveUserScoreToLeaderboard({
      userName: userName.trim(),
      score: pendingScore.score,
      totalQuestions: pendingScore.totalQuestions,
      accuracy,
      timeSpentSeconds: pendingScore.timeSpentSeconds,
      date: todayStr,
      topic: pendingScore.topic,
    });

    setEntries(updated);
    setSubmitted(true);
    playVictoryFanfare(soundEnabled);
    if (onScoreSubmitted) onScoreSubmitted();
  };

  const filteredEntries = filter === 'today'
    ? entries.filter((e) => e.date === todayStr)
    : entries;

  const topThree = filteredEntries.slice(0, 3);
  const userStreak = parseInt(localStorage.getItem('daily_challenge_streak') || '1', 10);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl max-h-[92vh] bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-700/80 flex items-center justify-between bg-slate-800/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Daily Challenge Leaderboard
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-400">
                  {todayInfo.icon} {todayInfo.topic}
                </span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30 font-semibold">
                  {todayStr}
                </span>
              </div>
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

        {/* Pending Score Submission Form Banner */}
        {pendingScore && !submitted && (
          <div className="p-4 bg-gradient-to-r from-indigo-950/80 to-blue-950/80 border-b border-indigo-500/30">
            <form onSubmit={handleSubmitScore} className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Your Challenge Score: {pendingScore.score} / {pendingScore.totalQuestions} ({Math.round((pendingScore.score / pendingScore.totalQuestions) * 100)}%)
                </span>
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {pendingScore.timeSpentSeconds}s
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name / nickname for leaderboard..."
                  maxLength={25}
                  required
                  className="flex-1 bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!userName.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md shadow-amber-500/20"
                >
                  Submit Rank 🚀
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters & Streak Banner */}
        <div className="px-5 py-3 bg-slate-900/60 border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex gap-1.5">
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setFilter('today');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'today'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Today's Standings
            </button>
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setFilter('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              All-Time Top Scores
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{userStreak} Day Streak</span>
          </div>
        </div>

        {/* Scrollable Leaderboard Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Top 3 Podium Cards */}
          {topThree.length >= 3 && (
            <div className="grid grid-cols-3 gap-2 pt-1 pb-2">
              {/* 2nd Place */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-3 text-center flex flex-col justify-end order-1">
                <span className="text-2xl mb-1">🥈</span>
                <div className="text-xs font-bold text-slate-200 truncate">{topThree[1].userName}</div>
                <div className="text-[11px] text-indigo-400 font-semibold">{topThree[1].score}/15</div>
                <div className="text-[10px] text-slate-500">{topThree[1].timeSpentSeconds}s</div>
              </div>

              {/* 1st Place */}
              <div className="bg-gradient-to-b from-amber-500/20 to-slate-900 border border-amber-500/40 rounded-2xl p-3.5 text-center flex flex-col justify-end order-2 shadow-lg scale-105 z-10">
                <span className="text-3xl mb-1">👑</span>
                <div className="text-xs font-extrabold text-amber-300 truncate">{topThree[0].userName}</div>
                <div className="text-xs text-amber-400 font-bold">{topThree[0].score}/15</div>
                <div className="text-[10px] text-slate-400">{topThree[0].timeSpentSeconds}s</div>
              </div>

              {/* 3rd Place */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-3 text-center flex flex-col justify-end order-3">
                <span className="text-2xl mb-1">🥉</span>
                <div className="text-xs font-bold text-slate-200 truncate">{topThree[2].userName}</div>
                <div className="text-[11px] text-indigo-400 font-semibold">{topThree[2].score}/15</div>
                <div className="text-[10px] text-slate-500">{topThree[2].timeSpentSeconds}s</div>
              </div>
            </div>
          )}

          {/* Detailed Entries List */}
          <div className="space-y-2">
            {filteredEntries.map((entry, idx) => {
              const rank = idx + 1;
              let badgeColor = 'bg-slate-800 text-slate-400 border-slate-700';
              if (rank === 1) badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold';
              else if (rank === 2) badgeColor = 'bg-slate-300/20 text-slate-200 border-slate-400/40 font-bold';
              else if (rank === 3) badgeColor = 'bg-amber-700/20 text-amber-500 border-amber-700/40 font-bold';

              return (
                <div
                  key={entry.id || idx}
                  className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                    entry.isCurrentUser
                      ? 'bg-indigo-950/50 border-indigo-500/60 shadow-md ring-1 ring-indigo-500/30'
                      : 'bg-slate-900/60 border-slate-700/60 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span
                      className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs shrink-0 ${badgeColor}`}
                    >
                      {rank}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-slate-200 truncate flex items-center gap-1.5">
                        <span className="truncate">{entry.userName}</span>
                        {entry.isCurrentUser && (
                          <span className="px-1.5 py-0.2 bg-indigo-500 text-white rounded text-[9px] font-bold">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate flex items-center gap-2">
                        <span>{entry.topic}</span>
                        <span>• {entry.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-indigo-300">
                      {entry.score} / {entry.totalQuestions}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1">
                      <span>{entry.accuracy}%</span>
                      <span>({entry.timeSpentSeconds}s)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-800 text-center">
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};
