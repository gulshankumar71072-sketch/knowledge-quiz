export interface DeepThinkingData {
  rationale: string;
  distractorAnalysis: string;
  takeaway: string;
}

export interface QuizQuestion {
  id?: string;
  category: string;
  question: string;
  questionHindi?: string;
  options: string[];
  optionsHindi?: string[];
  correct: number;
  explanation: string;
  explanationHindi?: string;
  deepThinking?: DeepThinkingData;
}

export interface StudentProfile {
  name: string;
  schoolName: string;
  age: number;
  classGrade: string; // e.g. 'Class 10'
  rollNumber?: string;
  section?: string;
  avatarEmoji?: string;
}

export interface StudentScorecard {
  studentName: string;
  schoolName?: string;
  age?: number;
  rollNumber?: string;
  classGrade: string;
  subject: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  gradeBadge: string;
  gradeLevel: 'A+' | 'A' | 'B' | 'C' | 'Needs Improvement';
  timeSpent: string;
  date: string;
  verdict: string;
  teacherRemarksHindi: string;
}

export interface DeepAnalysisResult {
  deductiveProof: string;
  distractorAnalysis: {
    option: string;
    whyIncorrect: string;
  }[];
  mentalModel: string;
  bonusFact: string;
}

export interface UserAnswerRecord {
  questionIndex: number;
  selectedOption: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export type QuizMode = 'classic' | 'ai-generator' | 'timed' | 'daily';

export type QuizDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface LeaderboardEntry {
  id: string;
  userName: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeSpentSeconds: number;
  date: string; // YYYY-MM-DD
  topic: string;
  isCurrentUser?: boolean;
}

export interface DailyChallengeInfo {
  date: string;
  topic: string;
  headline: string;
  description: string;
  icon: string;
  category: string;
  totalQuestions: number;
}

export interface QuizConfig {
  mode: QuizMode;
  topic: string;
  difficulty: QuizDifficulty;
  questionCount: number;
  timerPerQuestion: number; // 0 for off, or e.g. 20 seconds
}
