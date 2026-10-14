import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TrendingUp, TrendingDown, Minus, BarChart3, Award, Sparkles } from 'lucide-react';
import { getSubjectAttempts, calculateGrowthMetrics, SubjectAttempt } from '../utils/scoreHistory';

interface ScoreTrendChartProps {
  score: number;
  totalQuestions: number;
  subjectName: string;
  isPrintFriendly?: boolean;
}

export const ScoreTrendChart: React.FC<ScoreTrendChartProps> = ({
  score,
  totalQuestions,
  subjectName,
  isPrintFriendly = false,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [attempts, setAttempts] = useState<SubjectAttempt[]>([]);
  const [hoveredAttempt, setHoveredAttempt] = useState<SubjectAttempt | null>(null);

  useEffect(() => {
    const data = getSubjectAttempts(subjectName, score, totalQuestions);
    setAttempts(data);
  }, [subjectName, score, totalQuestions]);

  const metrics = calculateGrowthMetrics(attempts);

  // Render D3.js Bar Chart
  useEffect(() => {
    if (!svgRef.current || attempts.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Chart dimensions
    const width = 460;
    const height = 180;
    const margin = { top: 28, right: 20, bottom: 32, left: 34 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');

    // Defs for gradients & filters
    const defs = svg.append('defs');

    // Previous attempt bar gradient
    const gradPast = defs
      .append('linearGradient')
      .attr('id', 'pastBarGrad')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');
    gradPast.append('stop').attr('offset', '0%').attr('stop-color', '#4338ca').attr('stop-opacity', 0.85);
    gradPast.append('stop').attr('offset', '100%').attr('stop-color', '#6366f1').attr('stop-opacity', 1);

    // Current attempt bar gradient (Amber / Gold spotlight)
    const gradCurrent = defs
      .append('linearGradient')
      .attr('id', 'currentBarGrad')
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');
    gradCurrent.append('stop').attr('offset', '0%').attr('stop-color', '#d97706').attr('stop-opacity', 0.95);
    gradCurrent.append('stop').attr('offset', '100%').attr('stop-color', '#fbbf24').attr('stop-opacity', 1);

    // Glow filter for current bar
    const filter = defs.append('filter').attr('id', 'glow').attr('x', '-20%').attr('y', '-20%').attr('width', '140%').attr('height', '140%');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'blur');
    filter.append('feComposite').attr('in', 'SourceGraphic').attr('in2', 'blur').attr('operator', 'over');

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale
    const xScale = d3
      .scaleBand<string>()
      .domain(attempts.map((d) => `A${d.attemptNumber}`))
      .range([0, innerWidth])
      .padding(0.38);

    // Y Scale (0% - 100%)
    const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

    // Horizontal Grid Lines
    const gridTicks = [25, 50, 75, 100];
    g.append('g')
      .attr('class', 'grid-lines')
      .selectAll('line')
      .data(gridTicks)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', isPrintFriendly ? '#cbd5e1' : '#334155')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3')
      .attr('stroke-opacity', isPrintFriendly ? 0.8 : 0.6);

    // Y Axis Labels
    g.append('g')
      .attr('class', 'y-axis-labels')
      .selectAll('text')
      .data(gridTicks)
      .enter()
      .append('text')
      .attr('x', -6)
      .attr('y', (d) => yScale(d) + 3)
      .attr('text-anchor', 'end')
      .attr('fill', isPrintFriendly ? '#64748b' : '#94a3b8')
      .attr('font-size', '9px')
      .attr('font-weight', '600')
      .attr('font-family', 'sans-serif')
      .text((d) => `${d}%`);

    // Average line across all 5 attempts
    if (metrics.averagePercentage > 0) {
      const avgY = yScale(metrics.averagePercentage);
      g.append('line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', avgY)
        .attr('y2', avgY)
        .attr('stroke', '#10b981')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '4,2')
        .attr('stroke-opacity', 0.85);

      g.append('text')
        .attr('x', innerWidth - 4)
        .attr('y', avgY - 4)
        .attr('text-anchor', 'end')
        .attr('fill', '#10b981')
        .attr('font-size', '8.5px')
        .attr('font-weight', '700')
        .text(`Avg: ${metrics.averagePercentage}%`);
    }

    // Bars
    const barGroups = g
      .selectAll('.bar-group')
      .data(attempts)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', (d) => `translate(${xScale(`A${d.attemptNumber}`) || 0}, 0)`)
      .style('cursor', 'pointer')
      .on('mouseenter', (_, d) => setHoveredAttempt(d))
      .on('mouseleave', () => setHoveredAttempt(null));

    // Bar Rectangles
    barGroups
      .append('rect')
      .attr('x', 0)
      .attr('width', xScale.bandwidth())
      .attr('y', (d) => yScale(d.percentage))
      .attr('height', (d) => innerHeight - yScale(d.percentage))
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('fill', (d) => {
        if (isPrintFriendly) {
          return d.isCurrent ? '#f59e0b' : '#6366f1';
        }
        return d.isCurrent ? 'url(#currentBarGrad)' : 'url(#pastBarGrad)';
      })
      .attr('stroke', (d) => (d.isCurrent ? '#fef08a' : '#818cf8'))
      .attr('stroke-width', (d) => (d.isCurrent ? 2 : 1))
      .attr('filter', (d) => (!isPrintFriendly && d.isCurrent ? 'url(#glow)' : null));

    // Value Labels on top of bars
    barGroups
      .append('text')
      .attr('x', xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.percentage) - 6)
      .attr('text-anchor', 'middle')
      .attr('fill', (d) => (d.isCurrent ? '#fbbf24' : isPrintFriendly ? '#1e293b' : '#f8fafc'))
      .attr('font-size', '10.5px')
      .attr('font-weight', '800')
      .attr('font-family', 'sans-serif')
      .text((d) => `${d.percentage}%`);

    // X Axis Labels (bottom)
    barGroups
      .append('text')
      .attr('x', xScale.bandwidth() / 2)
      .attr('y', innerHeight + 15)
      .attr('text-anchor', 'middle')
      .attr('fill', (d) => (d.isCurrent ? '#fbbf24' : isPrintFriendly ? '#475569' : '#94a3b8'))
      .attr('font-size', '9.5px')
      .attr('font-weight', (d) => (d.isCurrent ? '800' : '600'))
      .attr('font-family', 'sans-serif')
      .text((d) => (d.isCurrent ? `Att ${d.attemptNumber}★` : `Att ${d.attemptNumber}`));

    // "Current" tag below current bar
    barGroups
      .filter((d) => Boolean(d.isCurrent))
      .append('text')
      .attr('x', xScale.bandwidth() / 2)
      .attr('y', innerHeight + 26)
      .attr('text-anchor', 'middle')
      .attr('fill', '#f59e0b')
      .attr('font-size', '8px')
      .attr('font-weight', '800')
      .text('(Current)');
  }, [attempts, isPrintFriendly, metrics.averagePercentage]);

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl p-4 border transition-all ${
        isPrintFriendly
          ? 'bg-slate-50 border-slate-300 text-slate-800'
          : 'bg-slate-950/80 border-slate-700/80 text-slate-100 shadow-xl'
      }`}
    >
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2 border-b border-slate-800/80 print:border-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center text-indigo-400 print:bg-indigo-50 print:border-indigo-300 print:text-indigo-700">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black flex items-center gap-1.5 uppercase tracking-wide">
              <span>Score Trends & Performance Growth</span>
            </div>
            <div className="text-[10px] text-slate-400 print:text-slate-600">
              {subjectName} — Progress Over Last 5 Attempts
            </div>
          </div>
        </div>

        {/* Growth Metric Badge */}
        <div className="flex items-center gap-1.5">
          {metrics.growthDelta !== 0 ? (
            <div
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold border shadow-sm ${
                metrics.isPositive
                  ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300 print:bg-emerald-50 print:border-emerald-300 print:text-emerald-800'
                  : 'bg-rose-500/15 border-rose-400/40 text-rose-300 print:bg-rose-50 print:border-rose-300 print:text-rose-800'
              }`}
            >
              {metrics.isPositive ? (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 print:text-emerald-600" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-rose-400 print:text-rose-600" />
              )}
              <span>
                {metrics.growthDelta > 0 ? `+${metrics.growthDelta}%` : `${metrics.growthDelta}%`} Growth
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border bg-indigo-500/15 border-indigo-400/30 text-indigo-300">
              <Minus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Consistent Performance</span>
            </div>
          )}
        </div>
      </div>

      {/* D3 SVG Canvas */}
      <div className="relative w-full overflow-hidden flex justify-center">
        <svg ref={svgRef} className="w-full max-w-[480px] h-[180px] overflow-visible" />
      </div>

      {/* Interactive Tooltip / Hover Callout */}
      {hoveredAttempt && (
        <div className="mt-2 py-1.5 px-3 rounded-xl bg-indigo-950/90 border border-indigo-400/40 text-xs flex items-center justify-between animate-fadeIn text-indigo-200">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{hoveredAttempt.dateLabel}:</span>
            <strong className="text-amber-300">{hoveredAttempt.score}/{hoveredAttempt.totalQuestions} Correct</strong>
          </div>
          <span className="font-extrabold text-white bg-indigo-600/60 px-2 py-0.5 rounded-md">
            {hoveredAttempt.percentage}% Score
          </span>
        </div>
      )}

      {/* Legend & Takeaway Summary */}
      <div className="mt-2.5 pt-2 border-t border-slate-800/60 print:border-slate-300 flex flex-wrap items-center justify-between text-[10px] text-slate-400 print:text-slate-600 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" />
            <span>Past Attempts</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />
            <strong className="text-amber-300 print:text-amber-700">Current Attempt</strong>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-emerald-400 inline-block border-t border-dashed" />
            <span>Average ({metrics.averagePercentage}%)</span>
          </span>
        </div>

        <div className="font-semibold text-slate-300 print:text-slate-700 flex items-center gap-1">
          <Award className="w-3 h-3 text-amber-400 print:text-amber-600" />
          <span>
            {metrics.isPositive
              ? `+${metrics.growthDelta}% progress demonstrated across recent attempts!`
              : `Consistent focus will push your score higher on the next test!`}
          </span>
        </div>
      </div>
    </div>
  );
};
