import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Minus, Award, Users } from 'lucide-react';
import { calculateRelativePerformance } from '../utils/classBenchmark';

interface ClassPerformanceComparisonProps {
  score: number;
  totalQuestions: number;
  subjectName?: string;
  classGrade?: string;
  isPrintFriendly?: boolean;
}

export const ClassPerformanceComparison: React.FC<ClassPerformanceComparisonProps> = ({
  score,
  totalQuestions,
  subjectName = 'Science',
  classGrade = 'Class 10',
  isPrintFriendly = false,
}) => {
  const stats = calculateRelativePerformance(score, totalQuestions, subjectName);

  return (
    <div
      className={`rounded-2xl p-3.5 sm:p-4 border transition-all ${
        isPrintFriendly
          ? 'bg-slate-50 border-slate-300 text-slate-900 print:bg-white print:border-slate-300'
          : 'bg-slate-950/80 border-indigo-500/30 text-slate-100 shadow-lg'
      }`}
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-700/70 print:border-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-100 print:text-slate-900 flex items-center gap-1.5">
              <span>Class Average Comparison</span>
            </h3>
            <span className="text-[10px] text-slate-400 print:text-slate-600">
              {stats.subjectName} • {classGrade}
            </span>
          </div>
        </div>

        {/* Relative Status Pill */}
        <div
          className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${stats.statusColor}`}
        >
          {stats.diffPercentage > 0 ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          ) : stats.diffPercentage < 0 ? (
            <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
          ) : (
            <Minus className="w-3.5 h-3.5 text-amber-400" />
          )}
          <span>{stats.statusBadge}</span>
        </div>
      </div>

      {/* Small Comparative Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 print:border-slate-200 text-[10px] uppercase tracking-wider text-slate-400 print:text-slate-600 bg-slate-900/60 print:bg-slate-100">
              <th className="py-2 px-2.5 font-bold rounded-l-lg">Metric</th>
              <th className="py-2 px-2.5 font-bold text-amber-300 print:text-amber-800 text-center">
                Your Score (You)
              </th>
              <th className="py-2 px-2.5 font-bold text-slate-300 print:text-slate-700 text-center">
                Class Average
              </th>
              <th className="py-2 px-2.5 font-bold text-slate-400 print:text-slate-600 text-center hidden sm:table-cell">
                Class Top
              </th>
              <th className="py-2 px-2.5 font-bold text-right rounded-r-lg">
                Gap vs Avg
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 print:divide-slate-200 text-slate-200 print:text-slate-800">
            {/* Row 1: Marks */}
            <tr className="hover:bg-slate-900/40 print:hover:bg-transparent">
              <td className="py-2.5 px-2.5 font-semibold text-slate-300 print:text-slate-700">
                Score (Marks)
              </td>
              <td className="py-2.5 px-2.5 text-center font-black text-amber-400 print:text-amber-800 text-sm">
                {stats.userScore} <span className="text-[10px] font-normal text-slate-400">/ {stats.totalQuestions}</span>
              </td>
              <td className="py-2.5 px-2.5 text-center font-bold text-slate-300 print:text-slate-700">
                {stats.classAvgScore} <span className="text-[10px] font-normal text-slate-500">/ {stats.totalQuestions}</span>
              </td>
              <td className="py-2.5 px-2.5 text-center text-slate-400 print:text-slate-600 hidden sm:table-cell">
                {stats.classTopScore} <span className="text-[10px] font-normal text-slate-500">/ {stats.totalQuestions}</span>
              </td>
              <td className="py-2.5 px-2.5 text-right font-black">
                <span
                  className={
                    stats.diffScore > 0
                      ? 'text-emerald-400'
                      : stats.diffScore < 0
                      ? 'text-rose-400'
                      : 'text-amber-400'
                  }
                >
                  {stats.diffScore > 0 ? `+${stats.diffScore}` : stats.diffScore} Marks
                </span>
              </td>
            </tr>

            {/* Row 2: Percentage */}
            <tr className="hover:bg-slate-900/40 print:hover:bg-transparent">
              <td className="py-2.5 px-2.5 font-semibold text-slate-300 print:text-slate-700">
                Percentage
              </td>
              <td className="py-2.5 px-2.5 text-center font-black text-amber-400 print:text-amber-800 text-sm">
                {stats.userPercentage}%
              </td>
              <td className="py-2.5 px-2.5 text-center font-bold text-slate-300 print:text-slate-700">
                {stats.classAvgPercentage}%
              </td>
              <td className="py-2.5 px-2.5 text-center text-slate-400 print:text-slate-600 hidden sm:table-cell">
                {stats.classTopPercentage}%
              </td>
              <td className="py-2.5 px-2.5 text-right font-black">
                <span
                  className={
                    stats.diffPercentage > 0
                      ? 'text-emerald-400'
                      : stats.diffPercentage < 0
                      ? 'text-rose-400'
                      : 'text-amber-400'
                  }
                >
                  {stats.diffPercentage > 0 ? `+${stats.diffPercentage}%` : `${stats.diffPercentage}%`}
                </span>
              </td>
            </tr>

            {/* Row 3: Class Standing */}
            <tr className="hover:bg-slate-900/40 print:hover:bg-transparent">
              <td className="py-2.5 px-2.5 font-semibold text-slate-300 print:text-slate-700">
                Class Standing
              </td>
              <td className="py-2.5 px-2.5 text-center font-bold text-amber-300 print:text-amber-800 text-xs">
                {stats.percentileRank}
              </td>
              <td className="py-2.5 px-2.5 text-center text-xs text-slate-400 print:text-slate-600">
                Class Benchmark
              </td>
              <td className="py-2.5 px-2.5 text-center text-xs text-slate-400 print:text-slate-600 hidden sm:table-cell">
                Top 5%
              </td>
              <td className="py-2.5 px-2.5 text-right text-[11px] font-semibold text-indigo-300 print:text-indigo-800">
                {stats.isAboveAverage ? 'Ahead of Average' : stats.isEqualAverage ? 'On Par' : 'Needs Practice'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Visual Relative Comparison Gauge Bar */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 print:border-slate-200">
        <div className="flex items-center justify-between text-[10px] text-slate-400 print:text-slate-600 mb-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
            Your Score: <strong className="text-amber-300 print:text-amber-800">{stats.userPercentage}%</strong>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span>
            Class Average: <strong className="text-indigo-300 print:text-indigo-800">{stats.classAvgPercentage}%</strong>
          </span>
          <span className="flex items-center gap-1 hidden sm:inline-flex">
            <Users className="w-3 h-3 text-slate-400" />
            Class Size: 45 Students
          </span>
        </div>

        {/* Dual Progress Bars */}
        <div className="space-y-1.5">
          {/* User Score Bar */}
          <div className="w-full bg-slate-900 rounded-full h-2.5 p-0.5 border border-slate-800 print:border-slate-300 relative overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                stats.isAboveAverage
                  ? 'bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-300 shadow-sm'
                  : 'bg-gradient-to-r from-rose-500 via-amber-400 to-amber-300'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, stats.userPercentage))}%` }}
            />
          </div>

          {/* Benchmark Indicator */}
          <div className="relative w-full h-1.5 bg-slate-800/60 rounded-full print:bg-slate-200">
            <div
              className="absolute top-0 bottom-0 bg-indigo-400/80 rounded-full"
              style={{ width: `${stats.classAvgPercentage}%` }}
            />
            <div
              className="absolute -top-1 w-2 h-3.5 bg-indigo-300 border border-indigo-100 rounded-sm shadow"
              style={{ left: `calc(${stats.classAvgPercentage}% - 4px)` }}
              title={`Class Average: ${stats.classAvgPercentage}%`}
            />
          </div>
        </div>
      </div>

      {/* Performance Insight Box */}
      <div className="mt-3 p-2.5 rounded-xl bg-slate-900/90 print:bg-slate-100 border border-slate-800 print:border-slate-200 text-left flex items-start gap-2">
        <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-[11px] leading-relaxed">
          <p className="font-semibold text-slate-200 print:text-slate-800">
            {stats.relativeRemarkEn}
          </p>
        </div>
      </div>
    </div>
  );
};
