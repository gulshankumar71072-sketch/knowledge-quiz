import React, { useState } from 'react';
import {
  X,
  Info,
  Mail,
  Shield,
  FileText,
  AlertTriangle,
  School,
  CheckCircle2,
  Send,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { playClickSound } from '../utils/sound';

export type LegalTabType = 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer';

interface LegalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTabType;
  soundEnabled?: boolean;
}

export const LegalInfoModal: React.FC<LegalInfoModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'about',
  soundEnabled = true,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: 'gulshankumar71072@gmail.com',
    classGrade: 'Class 10',
    subject: 'General Inquiry / Feedback',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sync tab when opened with specific initialTab
  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
      setFormSubmitted(false);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleTabSwitch = (tab: LegalTabType) => {
    playClickSound(soundEnabled);
    setActiveTab(tab);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound(soundEnabled);
    setFormSubmitted(true);
    setTimeout(() => {
      setContactForm((prev) => ({ ...prev, message: '' }));
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl my-6 bg-slate-900 border border-indigo-500/40 rounded-3xl shadow-2xl shadow-indigo-950/70 overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-amber-500/20 border border-indigo-400/40 flex items-center justify-center text-xl shadow-inner">
              🏫
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                <span>Vidya Gyan National Academy</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Vidya Gyan Evaluation Board, Chamba • Official Institutional Policies
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="px-3 sm:px-5 py-2.5 bg-slate-950 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => handleTabSwitch('about')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'about'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About Us</span>
          </button>

          <button
            onClick={() => handleTabSwitch('contact')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </button>

          <button
            onClick={() => handleTabSwitch('privacy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => handleTabSwitch('terms')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </button>

          <button
            onClick={() => handleTabSwitch('disclaimer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'disclaimer'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Disclaimer</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
          
          {/* TAB 1: ABOUT US */}
          {activeTab === 'about' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-amber-950/30 border border-indigo-500/30 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 shrink-0">
                  <School className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">About Vidya Gyan National Academy</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Vidya Gyan Evaluation Board, Chamba (Himachal Pradesh) is dedicated to empowering school students with standardized syllabus-aligned interactive assessments and diagnostic learning tools.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Our Educational Mission
                </h4>
                <p>
                  Knowledge Quiz was created under the academic leadership of <strong>Mr. Budhia Ram (Academic Director)</strong> to bridge the gap between classroom textbooks and diagnostic test preparation. Every question is curated to test both core definitions and application-level Higher Order Thinking Skills (HOTS).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span className="text-base">📚</span>
                    <span>Class 1st to 12th Syllabus</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Comprehensive chapter coverage across Science, Mathematics, Social Studies, English, and General Knowledge.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span className="text-base">🧠</span>
                    <span>Gemini High Thinking Proofs</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Step-by-step deductive explanations, first-principles logic, and forensic distractor analysis for every question.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span className="text-base">🗺️</span>
                    <span>Smart Study Roadmap</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Analyzes your lowest-scoring categories and recommends targeted revision chapters to boost exam scores.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span className="text-base">🎓</span>
                    <span>Verified Digital Marksheets</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Official printable student scorecards with time-tracking, grade benchmarks, and academic director verification.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT US */}
          {activeTab === 'contact' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <div className="font-bold text-white text-xs">Campus Location</div>
                  <p className="text-xs text-slate-400">
                    Vidya Gyan Evaluation Board, Chamba, Himachal Pradesh, India
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <div className="font-bold text-white text-xs">Email Desk</div>
                  <a
                    href="mailto:gulshankumar71072@gmail.com"
                    className="text-xs text-indigo-300 hover:underline block break-all font-mono"
                  >
                    gulshankumar71072@gmail.com
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <div className="font-bold text-white text-xs">Academic Help Desk</div>
                  <p className="text-xs text-slate-400">
                    Mon – Sat: 9:00 AM – 5:00 PM IST
                  </p>
                </div>
              </div>

              {/* Contact Message Form */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-xs flex items-center gap-1.5 uppercase tracking-wide">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  Send an Academic Inquiry or Feedback
                </h4>

                {formSubmitted ? (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Thank you! Your message has been sent to our academic desk ({contactForm.email}).</span>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="e.g. Student / Teacher Name"
                          className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">Your Email</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">Class / Standard</label>
                        <select
                          value={contactForm.classGrade}
                          onChange={(e) => setContactForm({ ...contactForm, classGrade: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none"
                        >
                          <option>Class 1–5 (Primary)</option>
                          <option>Class 6–8 (Middle)</option>
                          <option>Class 9 (Secondary)</option>
                          <option>Class 10 (Secondary Board)</option>
                          <option>Class 11–12 (Sr. Secondary)</option>
                          <option>General Knowledge / Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">Subject</label>
                        <input
                          type="text"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="e.g. Science question inquiry, syllabus feedback..."
                          className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">Message</label>
                      <textarea
                        required
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Write your question, syllabus suggestion, or feedback here..."
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl p-3 text-xs text-white outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Last Updated: October 2026</span>
                <h3 className="font-bold text-white text-sm mt-0.5">Student Privacy & Data Protection Policy</h3>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wide">1. Information We Collect</h4>
                <p>
                  Vidya Gyan National Academy is strictly committed to protecting the privacy of school students and educators. All student profile details entered (such as name, school name, age, and class grade) are stored <strong>locally in your browser's LocalStorage</strong>.
                </p>
                <p>
                  We do not collect government identification numbers, biometric records, or financial information.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wide">2. How Information is Used</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li>To personalize your exam marksheet, printable report card, and student identity badge.</li>
                  <li>To provide your personalized Smart Study Roadmap based on recent quiz scores.</li>
                  <li>To compute performance trends across your last 5 attempts in a given subject.</li>
                  <li>No personal student data is ever sold, leased, or distributed to advertising networks.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wide">3. Cookies and Local Storage</h4>
                <p>
                  This application utilizes browser storage mechanisms (localStorage) solely to preserve your in-progress quiz state, streak counter, and scorecard history. You can clear this data at any time by clearing your browser cache or clicking "Reset Profile" in settings.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wide">4. Child & Student Safety Compliance</h4>
                <p>
                  As an educational resource catering to students from Class 1 through Class 12, our application contains no external advertising, intrusive trackers, or unmoderated chat platforms.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Terms of Service • Session 2025–2026</span>
                <h3 className="font-bold text-white text-sm mt-0.5">Terms & Conditions of Educational Use</h3>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wide">1. Acceptance of Terms</h4>
                <p>
                  By accessing and using Knowledge Quiz (Vidya Gyan National Academy), students, teachers, and guardians agree to abide by these terms. This platform is provided free of charge for non-commercial educational learning and self-assessment.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wide">2. Academic Integrity & Fair Play</h4>
                <p>
                  Assessments, daily challenges, and leaderboard submissions are designed to foster intellectual curiosity and genuine learning. Automated scripts, exploitation of answer keys, or deceptive submissions to the leaderboard are strictly prohibited.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wide">3. Intellectual Property</h4>
                <p>
                  The curriculum classifications, interactive questions, Deep Thinking reasoning frameworks, and visual marksheet layouts are proprietary educational assets of Vidya Gyan Evaluation Board, Chamba. Textbooks and national board syllabi remain under the copyright of their respective education boards (CBSE / NCERT / State Boards).
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wide">4. Marksheet & Certificate Usage</h4>
                <p>
                  The generated certificates and report cards serve as self-assessment achievements. They celebrate academic effort and practice milestones but do not substitute for official marksheets issued by state or central examination boards.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-amber-500/30 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-300 text-sm">Educational Assessment Disclaimer</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Please read this important notice regarding the diagnostic nature of our quiz platform.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wide">1. Diagnostic Nature of Quizzes</h4>
                <p>
                  Knowledge Quiz is an auxiliary, self-assessment and educational revision tool. While question banks and curriculum blueprints are aligned with standard CBSE, NCERT, and State Board standards, syllabi, exam schedules, and weightages may be periodically revised by official boards.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wide">2. Benchmark & Comparative Analytics</h4>
                <p>
                  The "Class Average Comparison" and "Class Benchmark" figures are statistical reference models derived from standardized student cohorts (e.g. 45 students per class). They serve solely to help students gauge relative topic mastery and should not be construed as actual real-time school rankings.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wide">3. AI Reasoning Proofs (Gemini High Thinking)</h4>
                <p>
                  Explanations and deductive proofs are generated to enhance conceptual clarity. While reviewed for academic rigor, students should cross-reference complex derivations and formula constants with official prescribed school textbooks.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400">
                Vidya Gyan Evaluation Board, Chamba assumes no liability for any discrepancies between practice test results and official board examination outcomes.
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
          <div className="text-slate-400 text-[11px]">
            Academic Director: <span className="text-amber-300 font-semibold">Mr. Budhia Ram</span> • Chamba, H.P.
          </div>

          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
