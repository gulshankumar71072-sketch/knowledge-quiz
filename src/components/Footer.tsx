import React from 'react';
import { School, Shield, Mail, FileText, AlertTriangle, Info, Heart, ExternalLink } from 'lucide-react';
import { LegalTabType } from './LegalInfoModal';
import { playClickSound } from '../utils/sound';

interface FooterProps {
  onOpenLegalTab: (tab: LegalTabType) => void;
  soundEnabled?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalTab, soundEnabled = true }) => {
  const handleOpen = (tab: LegalTabType) => {
    playClickSound(soundEnabled);
    onOpenLegalTab(tab);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-xl mt-6 pb-6 text-slate-400 text-xs">
      <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        {/* Top Academy Crest Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400/20 to-indigo-500/20 border border-amber-400/30 flex items-center justify-center text-lg">
              🏫
            </div>
            <div>
              <div className="font-extrabold text-white text-xs tracking-wide">
                VIDYA GYAN NATIONAL ACADEMY
              </div>
              <div className="text-[10px] text-slate-400">
                Vidya Gyan Evaluation Board, Chamba (H.P.)
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right text-[11px]">
            <span className="text-slate-400 block text-[10px]">Academic Director</span>
            <strong className="text-amber-300 font-serif italic text-xs">
              Mr. Budhia Ram
            </strong>
          </div>
        </div>

        {/* 5 Requested Links: About Us, Contact Us, Privacy Policy, Terms, Disclaimer */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => handleOpen('about')}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
          >
            <Info className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>About Us</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpen('contact')}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Contact Us</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpen('privacy')}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Privacy Policy</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpen('terms')}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
            <span>Terms of Use</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpen('disclaimer')}
            className="col-span-2 sm:col-span-1 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
            <span>Disclaimer</span>
          </button>
        </div>

        {/* Bottom Copyright & Support Desk info */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400 text-center sm:text-left">
          <div>
            © {currentYear} Vidya Gyan Evaluation Board, Chamba. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Support:</span>
            <a
              href="mailto:gulshankumar71072@gmail.com"
              className="text-indigo-300 hover:underline font-mono text-[10px]"
            >
              gulshankumar71072@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
