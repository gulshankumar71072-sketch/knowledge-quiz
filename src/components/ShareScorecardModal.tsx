import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Award,
  Sparkles,
  School,
  ExternalLink,
  Send,
  MessageCircle,
  Clock,
} from 'lucide-react';
import { StudentProfile } from '../types';
import { playClickSound } from '../utils/sound';
import { calculateRelativePerformance } from '../utils/classBenchmark';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  classGrade: string;
  subject: string;
  studentProfile: StudentProfile;
  timeSpentSeconds?: number;
  soundEnabled: boolean;
}

export const ShareScorecardModal: React.FC<Props> = ({
  isOpen,
  onClose,
  score,
  totalQuestions,
  classGrade,
  subject,
  studentProfile,
  timeSpentSeconds = 60,
  soundEnabled,
}) => {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const percentage = Math.round((score / totalQuestions) * 100);
  const grade =
    percentage >= 90
      ? 'A+ (Distinction)'
      : percentage >= 75
      ? 'A (1st Division)'
      : percentage >= 60
      ? 'B (2nd Division)'
      : percentage >= 40
      ? 'C (Passing)'
      : 'D';

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://knowledgequiz.edu';

  const relStats = calculateRelativePerformance(score, totalQuestions, subject);

  const shareText = `🎓 *OFFICIAL SCORECARD & PERFORMANCE REPORT* 📜
━━━━━━━━━━━━━━━━━━━━
👤 *Student:* ${studentProfile.name}
🏫 *School:* ${studentProfile.schoolName}
📚 *Class / Grade:* ${classGrade || studentProfile.classGrade}
🎯 *Subject:* ${subject}
🎂 *Age:* ${studentProfile.age} Years

📊 *Score Obtained:* ${score} / ${totalQuestions} (${percentage}%)
📈 *Class Average Comparison:* ${percentage}% (Class Avg: ${relStats.classAvgPercentage}%) [${relStats.diffPercentage > 0 ? `+${relStats.diffPercentage}% Above Avg` : `${relStats.diffPercentage}%`}]
🏅 *Standing:* ${relStats.percentileRank} • ${relStats.statusBadge}
🏆 *Overall Grade:* ${grade}
⏱️ *Total Time:* ${Math.floor(timeSpentSeconds / 60)}m ${timeSpentSeconds % 60}s

🏛️ *Evaluation Board:* Vidya Gyan Evaluation Board, Chamba
✍️ *Academic Director:* Mr. Budhia Ram
━━━━━━━━━━━━━━━━━━━━
👉 Take this quiz and generate your verified scorecard:
${shareUrl}`;

  const handleCopy = async () => {
    playClickSound(soundEnabled);
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setShareSuccess('Scorecard Copied to Clipboard!');
      setTimeout(() => {
        setCopied(false);
        setShareSuccess(null);
      }, 3000);
    } catch (e) {
      console.error('Clipboard copy failed', e);
    }
  };

  const handleNativeShare = async () => {
    playClickSound(soundEnabled);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${studentProfile.name} Official Scorecard (${score}/${totalQuestions})`,
          text: shareText,
          url: shareUrl,
        });
        setShareSuccess('Scorecard Shared Successfully!');
        setTimeout(() => setShareSuccess(null), 3000);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    playClickSound(soundEnabled);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTelegramShare = () => {
    playClickSound(soundEnabled);
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
      `🎓 ${studentProfile.name} scored ${score}/${totalQuestions} (${percentage}%, Grade ${grade}) on Knowledge Quiz!`
    )}`;
    window.open(tgUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTwitterShare = () => {
    playClickSound(soundEnabled);
    const tweetText = `🎓 I scored ${score}/${totalQuestions} (${percentage}%, Grade ${grade}) on Knowledge Quiz! #SchoolQuiz #VidyaGyan`;
    const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border-2 border-amber-400/50 rounded-3xl shadow-2xl max-w-md w-full p-5 sm:p-6 text-slate-100 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Share2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5 leading-tight">
                <span>Share Scorecard</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Share results with teachers, parents & classmates
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

        {/* Mini Preview Card */}
        <div className="mb-4 p-4 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-amber-400/40 shadow-inner relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5 text-[10px]">
            <span className="font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <School className="w-3.5 h-3.5 text-amber-400" />
              {studentProfile.schoolName || 'Vidya Gyan National Academy'}
            </span>
            <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              GRADE {grade.split(' ')[0]}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400/20 to-indigo-500/20 border border-amber-400/50 flex items-center justify-center text-2xl shrink-0">
              {studentProfile.avatarEmoji || '👨‍🎓'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-sm text-white truncate">
                {studentProfile.name}
              </div>
              <div className="text-[11px] text-slate-300 flex items-center gap-1.5 truncate">
                <span>{classGrade || studentProfile.classGrade}</span>
                <span>•</span>
                <span>{subject}</span>
                <span>•</span>
                <span>{studentProfile.age} Years</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xl font-black text-amber-300">
                {score}/{totalQuestions}
              </div>
              <div className="text-[10px] text-slate-400">{percentage}% Marks</div>
              <div className="inline-flex items-center gap-1 text-[9px] text-indigo-300 font-medium mt-0.5">
                <Clock className="w-2.5 h-2.5 text-indigo-400" />
                <span>
                  {Math.floor(timeSpentSeconds / 60) > 0 ? `${Math.floor(timeSpentSeconds / 60)}m ` : ''}
                  {timeSpentSeconds % 60}s
                </span>
              </div>
            </div>
          </div>

          {/* Class Benchmark Comparison Pill */}
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">
              📊 Class Average: <strong className="text-indigo-300">{relStats.classAvgPercentage}%</strong>
            </span>
            <span className={`font-bold px-2 py-0.5 rounded-full border text-[9px] ${relStats.statusColor}`}>
              {relStats.diffPercentage > 0 ? `+${relStats.diffPercentage}%` : `${relStats.diffPercentage}%`} vs Avg
            </span>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-400">
            <span>Dir: Mr. Budhia Ram</span>
            <span>Vidya Gyan Evaluation Board, Chamba</span>
          </div>
        </div>

        {/* Success toast if any */}
        {shareSuccess && (
          <div className="mb-3 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{shareSuccess}</span>
          </div>
        )}

        {/* Primary Share Actions */}
        <div className="space-y-2.5 mb-4">
          {/* WhatsApp Direct Share */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-slate-950 fill-current" />
            <span>Share on WhatsApp</span>
          </button>

          {/* Native Web Share Sheet (Mobile / Tablet / Modern Desktops) */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share via Other Apps</span>
            </button>
          )}

          {/* Copy Full Text */}
          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Scorecard Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-indigo-400" />
                <span>Copy Scorecard Text</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Social Share Icons */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="text-[11px]">Quick Share:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleTelegramShare}
              className="px-2.5 py-1 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
              title="Share on Telegram"
            >
              <Send className="w-3 h-3" />
              <span>Telegram</span>
            </button>
            <button
              onClick={handleTwitterShare}
              className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
              title="Share on X / Twitter"
            >
              <span>𝕏 / Twitter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
