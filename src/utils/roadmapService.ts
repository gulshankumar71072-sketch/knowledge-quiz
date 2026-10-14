import { QuizQuestion, UserAnswerRecord } from '../types';
import { schoolGrades, ClassGradeInfo, SubjectInfo } from '../data/schoolCurriculum';

export interface CategoryPerformance {
  category: string;
  correct: number;
  total: number;
  percentage: number;
  priority: 'high' | 'medium' | 'low';
  missedQuestions: string[];
}

export interface RecommendedChapter {
  id: string;
  chapterName: string;
  subjectName: string;
  gradeLabel: string;
  category: string;
  accuracy: number;
  priority: 'high' | 'medium' | 'low';
  estimatedMinutes: number;
  keyConcepts: string[];
  revisionGoal: string;
  isCompleted?: boolean;
}

export interface RoadmapData {
  studentClassGrade: string;
  subjectName: string;
  lowestCategories: CategoryPerformance[];
  masteredCategories: CategoryPerformance[];
  recommendedChapters: RecommendedChapter[];
  overallStatus: 'needs_urgent_focus' | 'needs_practice' | 'high_performer';
  summaryRemarksHindi: string;
  summaryRemarksEnglish: string;
}

const CATEGORY_HISTORY_KEY = 'vidya_gyan_category_quiz_history_v1';
const STUDIED_CHAPTERS_KEY = 'vidya_gyan_studied_chapters_v1';

// Domain knowledge mapping for general and school categories
const TOPIC_TO_CHAPTER_MAP: Record<string, { subject: string; chapters: string[]; concepts: string[] }> = {
  science: {
    subject: 'Science',
    chapters: ['Light: Reflection & Refraction', 'Chemical Reactions & Equations', 'Electricity & Ohm’s Law', 'Life Processes'],
    concepts: ['Fundamental laws of physics & chemistry', 'Chemical formula balancing', 'Circuit diagrams & Ohm’s Law']
  },
  physics: {
    subject: 'Physics',
    chapters: ['Laws of Motion & Gravitation', 'Electricity & Magnetism', 'Work, Energy & Power', 'Optics & Wave Optics'],
    concepts: ['Vector calculations & Newton’s laws', 'Conservation of mechanical energy', 'Snell’s Law & ray diagrams']
  },
  chemistry: {
    subject: 'Chemistry',
    chapters: ['Chemical Reactions & Equations', 'Acids, Bases & Salts', 'Periodic Classification & Structure of Atom', 'Organic Chemistry Basics'],
    concepts: ['pH scales & neutralization reactions', 'Valency and atomic orbitals', 'Molar mass & stoichiometry']
  },
  biology: {
    subject: 'Science / Biology',
    chapters: ['The Fundamental Unit of Life (Cell)', 'Life Processes (Nutrition & Respiration)', 'Heredity & Evolution', 'Human Physiology'],
    concepts: ['Cell organelle functions & ATP production', 'Mendelian genetics & Punnett squares', 'Photosynthesis dark & light reactions']
  },
  mathematics: {
    subject: 'Mathematics',
    chapters: ['Quadratic Equations', 'Linear Equations in 2 Variables', 'Trigonometry & Identities', 'Coordinate Geometry', 'Statistics & Probability'],
    concepts: ['Factoring polynomials & discriminant test', 'Trigonometric ratios (sin, cos, tan)', 'Pythagoras theorem applications']
  },
  math: {
    subject: 'Mathematics',
    chapters: ['Arithmetic Progressions', 'Fractions & Decimals', 'Mensuration & Surface Areas', 'Linear Equations'],
    concepts: ['Formula application & unit conversions', 'Ratio and proportions', 'Systematic step-by-step problem solving']
  },
  astronomy: {
    subject: 'General Science / Astronomy',
    chapters: ['Earth & Solar System', 'Stars, Galaxies & Planetary Motion', 'Gravitation & Kepler’s Laws'],
    concepts: ['Planetary characteristics and orbital distances', 'Life cycle of stars and nuclear fusion', 'Escape velocity and orbital dynamics']
  },
  technology: {
    subject: 'Computer Science & Technology',
    chapters: ['Computer Fundamentals & Architecture', 'Data Processing & Logic Gates', 'Internet & Cybersecurity Protocols'],
    concepts: ['CPU instruction cycles (Fetch-Decode-Execute)', 'Binary arithmetic & Boolean algebra', 'Network encryption & cloud fundamentals']
  },
  history: {
    subject: 'Social Science / History',
    chapters: ['Nationalism in India', 'Ancient Civilizations & Harappan Heritage', 'The Making of a Global World'],
    concepts: ['Chronology of Indian national movements', 'Major constitutional milestones', 'Colonial economic policies']
  },
  geography: {
    subject: 'Social Studies / Geography',
    chapters: ['Physical Features of India', 'Resources, Soil & Development', 'Climate Zones & Water Resources'],
    concepts: ['Monsoon mechanisms and geographical distribution', 'Renewable vs non-renewable energy resources', 'Topographic map reading']
  },
  english: {
    subject: 'English Language',
    chapters: ['Tenses & Subject-Verb Agreement', 'Active & Passive Voice', 'Direct & Indirect Speech', 'Analytical Vocabulary'],
    concepts: ['Grammatical concordance & modal auxiliaries', 'Tense shifting in reported speech', 'Idiomatic expressions in context']
  },
  'world trivia': {
    subject: 'General Knowledge',
    chapters: ['National Symbols & World Capitals', 'Famous Inventions & Discoveries', 'Global Organizations (UN, UNESCO)'],
    concepts: ['Key international treaties and world geography', 'Pioneering scientific inventions', 'Contemporary global milestones']
  }
};

/**
 * Saves quiz category breakdown into persistent history
 */
export function recordQuizCategoryPerformance(
  questions: QuizQuestion[],
  userAnswers: UserAnswerRecord[],
  subjectName: string,
  classGrade: string
): CategoryPerformance[] {
  if (!questions || questions.length === 0) return [];

  // Group by category
  const catMap = new Map<string, { correct: number; total: number; missed: string[] }>();

  questions.forEach((q, idx) => {
    const rawCategory = q.category || subjectName || 'General';
    // Clean up category label (e.g. "Class 10 • Science" -> "Science")
    const cleanCategory = rawCategory.includes('•')
      ? rawCategory.split('•')[1].trim()
      : rawCategory.trim();

    const curr = catMap.get(cleanCategory) || { correct: 0, total: 0, missed: [] };
    curr.total += 1;

    const answer = userAnswers.find((a) => a.questionIndex === idx);
    const isCorrect = answer ? answer.isCorrect : false;

    if (isCorrect) {
      curr.correct += 1;
    } else {
      curr.missed.push(q.question);
    }

    catMap.set(cleanCategory, curr);
  });

  const performances: CategoryPerformance[] = Array.from(catMap.entries()).map(([category, stats]) => {
    const percentage = Math.round((stats.correct / Math.max(1, stats.total)) * 100);
    let priority: 'high' | 'medium' | 'low' = 'low';
    if (percentage < 50) priority = 'high';
    else if (percentage < 75) priority = 'medium';

    return {
      category,
      correct: stats.correct,
      total: stats.total,
      percentage,
      priority,
      missedQuestions: stats.missed,
    };
  });

  // Sort by lowest percentage first
  performances.sort((a, b) => a.percentage - b.percentage);

  // Store into history
  try {
    const storedRaw = localStorage.getItem(CATEGORY_HISTORY_KEY);
    const history = storedRaw ? JSON.parse(storedRaw) : [];
    history.push({
      timestamp: Date.now(),
      subject: subjectName,
      classGrade,
      categories: performances,
    });
    // Keep last 15 quiz sessions
    localStorage.setItem(CATEGORY_HISTORY_KEY, JSON.stringify(history.slice(-15)));
  } catch (err) {
    console.error('Error storing category history', err);
  }

  return performances;
}

/**
 * Gets aggregated recent performance across past quizzes
 */
export function getRecentCategoriesAggregated(
  currentQuizPerformances?: CategoryPerformance[]
): CategoryPerformance[] {
  let pastHistory: { categories: CategoryPerformance[] }[] = [];
  try {
    const storedRaw = localStorage.getItem(CATEGORY_HISTORY_KEY);
    if (storedRaw) {
      pastHistory = JSON.parse(storedRaw);
    }
  } catch {
    // ignore
  }

  // Combine past history and current quiz
  const combinedMap = new Map<string, { correct: number; total: number; missed: string[] }>();

  // If current quiz is available, include it
  if (currentQuizPerformances && currentQuizPerformances.length > 0) {
    currentQuizPerformances.forEach((p) => {
      const curr = combinedMap.get(p.category) || { correct: 0, total: 0, missed: [] };
      curr.correct += p.correct;
      curr.total += p.total;
      curr.missed.push(...p.missedQuestions);
      combinedMap.set(p.category, curr);
    });
  }

  // Add historical runs
  const recentRuns = pastHistory.slice(-5);
  recentRuns.forEach((run) => {
    run.categories.forEach((c) => {
      const curr = combinedMap.get(c.category) || { correct: 0, total: 0, missed: [] };
      curr.correct += c.correct;
      curr.total += c.total;
      curr.missed.push(...(c.missedQuestions || []));
      combinedMap.set(c.category, curr);
    });
  });

  if (combinedMap.size === 0) {
    // Return standard diagnostic baseline if no quizzes yet taken
    return [
      {
        category: 'Science & Physics',
        correct: 1,
        total: 3,
        percentage: 33,
        priority: 'high',
        missedQuestions: ['Laws of Motion and Optics formulas'],
      },
      {
        category: 'Mathematics & Equations',
        correct: 2,
        total: 4,
        percentage: 50,
        priority: 'medium',
        missedQuestions: ['Quadratic equations & word problems'],
      },
      {
        category: 'General Knowledge & Environment',
        correct: 4,
        total: 5,
        percentage: 80,
        priority: 'low',
        missedQuestions: [],
      },
    ];
  }

  const results: CategoryPerformance[] = Array.from(combinedMap.entries()).map(([cat, stats]) => {
    const pct = Math.round((stats.correct / Math.max(1, stats.total)) * 100);
    return {
      category: cat,
      correct: stats.correct,
      total: stats.total,
      percentage: pct,
      priority: pct < 50 ? 'high' : pct < 75 ? 'medium' : 'low',
      missedQuestions: Array.from(new Set(stats.missed)).slice(0, 3),
    };
  });

  results.sort((a, b) => a.percentage - b.percentage);
  return results;
}

/**
 * Generates the Smart Study Roadmap based on lowest scoring categories
 */
export function generateSmartStudyRoadmap(
  questions?: QuizQuestion[],
  userAnswers?: UserAnswerRecord[],
  subjectName: string = 'General Knowledge',
  classGrade: string = 'Class 10'
): RoadmapData {
  let performances: CategoryPerformance[] = [];

  if (questions && userAnswers && questions.length > 0) {
    performances = recordQuizCategoryPerformance(questions, userAnswers, subjectName, classGrade);
  } else {
    performances = getRecentCategoriesAggregated();
  }

  // Read studied chapters
  const studiedChapters = getStudiedChapters();

  // Find lowest scoring categories (priority 'high' or 'medium' or lowest 3)
  const lowestCategories = performances.filter((p) => p.priority === 'high' || p.priority === 'medium');
  const masteredCategories = performances.filter((p) => p.priority === 'low');

  const categoriesToFocus = lowestCategories.length > 0
    ? lowestCategories.slice(0, 4)
    : performances.slice(0, 2);

  // Extract grade number if possible
  const gradeNum = parseInt(classGrade.replace(/\D/g, '')) || 10;
  const gradeInfo = schoolGrades.find((g) => g.gradeNumber === gradeNum) || schoolGrades[9]; // default class 10

  const recommendedChapters: RecommendedChapter[] = [];

  categoriesToFocus.forEach((catPerf, index) => {
    const catLower = catPerf.category.toLowerCase();
    
    // Attempt 1: Match category with schoolCurriculum grade subjects
    let matchedSubject: SubjectInfo | undefined;
    let matchedChapters: string[] = [];
    let matchedConcepts: string[] = [];

    // Check subjects in the user's grade
    matchedSubject = gradeInfo.subjects.find((s) => {
      const sNameLower = s.name.toLowerCase();
      const sIdLower = s.id.toLowerCase();
      return (
        catLower.includes(sNameLower) ||
        sNameLower.includes(catLower) ||
        catLower.includes(sIdLower) ||
        sIdLower.includes(catLower)
      );
    });

    if (matchedSubject && matchedSubject.chapters.length > 0) {
      matchedChapters = matchedSubject.chapters;
    } else {
      // Attempt 2: Lookup in TOPIC_TO_CHAPTER_MAP
      for (const [key, mapping] of Object.entries(TOPIC_TO_CHAPTER_MAP)) {
        if (catLower.includes(key) || key.includes(catLower)) {
          matchedChapters = mapping.chapters;
          matchedConcepts = mapping.concepts;
          break;
        }
      }
    }

    // Fallback if still empty: pick chapters from gradeInfo
    if (matchedChapters.length === 0) {
      const firstSub = gradeInfo.subjects[0];
      matchedChapters = firstSub ? firstSub.chapters : ['Fundamentals & Practice Problems'];
    }

    // Select the best 1-2 chapters for this category
    const chapterName = matchedChapters[index % matchedChapters.length];
    const chapterId = `${gradeInfo.gradeLabel}-${catPerf.category}-${chapterName}`.replace(/\s+/g, '_');

    let estimatedMinutes = 30;
    if (catPerf.percentage < 40) estimatedMinutes = 45;
    else if (catPerf.percentage < 65) estimatedMinutes = 30;
    else estimatedMinutes = 20;

    const concepts = matchedConcepts.length > 0
      ? matchedConcepts
      : [
          `Key formulas, theoretical definitions & principles of ${chapterName}`,
          `Common error pitfalls observed in recent quiz responses`,
          `High-yield numerical & conceptual practice MCQs with explanations`,
        ];

    const revisionGoal = catPerf.percentage < 50
      ? `Goal: Review core formulas and fundamental concepts to achieve 80%+ accuracy`
      : `Goal: Strengthen conceptual depth and problem-solving speed by 15%`;

    recommendedChapters.push({
      id: chapterId,
      chapterName,
      subjectName: matchedSubject ? matchedSubject.name : (catPerf.category || subjectName),
      gradeLabel: gradeInfo.gradeLabel,
      category: catPerf.category,
      accuracy: catPerf.percentage,
      priority: catPerf.priority,
      estimatedMinutes,
      keyConcepts: concepts,
      revisionGoal,
      isCompleted: studiedChapters.includes(chapterId),
    });
  });

  // Calculate overall roadmap status
  let overallStatus: 'needs_urgent_focus' | 'needs_practice' | 'high_performer' = 'needs_practice';
  if (recommendedChapters.some((c) => c.priority === 'high')) {
    overallStatus = 'needs_urgent_focus';
  } else if (recommendedChapters.length === 0 || performances.every((p) => p.percentage >= 80)) {
    overallStatus = 'high_performer';
  }

  // Summary remarks in Hindi and English
  let summaryRemarksHindi = '';
  let summaryRemarksEnglish = '';

  if (overallStatus === 'needs_urgent_focus') {
    summaryRemarksHindi = `हालिया क्विज़ विश्लेषण के अनुसार, आपको ${recommendedChapters.map(c => c.chapterName).slice(0, 2).join(' तथा ')} पर विशेष ध्यान देने की आवश्यकता है। इन अध्यायों का व्यवस्थित रिवीजन करने से आपका स्कोर 'A+' ग्रेड तक पहुँच सकता है।`;
    summaryRemarksEnglish = `Based on your lowest-scoring quiz categories, prioritizing ${recommendedChapters.map(c => c.chapterName).slice(0, 2).join(' & ')} will yield the fastest grade improvement.`;
  } else if (overallStatus === 'needs_practice') {
    summaryRemarksHindi = `आपकी समग्र तैयारी सुदृढ़ है! कमजोर अवधारणाओं के दैनिक 20-30 मिनट के अभ्यास से आप 90%+ अंक आसानी से अर्जित कर सकते हैं।`;
    summaryRemarksEnglish = `Good foundation! A focused 20-30 min revision on these targeted chapters will boost your overall accuracy past 90%.`;
  } else {
    summaryRemarksHindi = `उत्कृष्ट प्रदर्शन! आपकी अधिकांश श्रेणियों में पकड़ बहुत मजबूत है। बोर्ड एवं प्रतियोगी स्तर के लिए अग्रिम अध्यायों का अभ्यास जारी रखें।`;
    summaryRemarksEnglish = `Outstanding mastery! Keep revising advanced problem-solving chapters to maintain your A+ distinction.`;
  }

  return {
    studentClassGrade: gradeInfo.gradeLabel,
    subjectName,
    lowestCategories,
    masteredCategories,
    recommendedChapters,
    overallStatus,
    summaryRemarksHindi,
    summaryRemarksEnglish,
  };
}

/**
 * Studied chapters management
 */
export function getStudiedChapters(): string[] {
  try {
    const raw = localStorage.getItem(STUDIED_CHAPTERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleChapterStudied(chapterId: string): boolean {
  try {
    const current = getStudiedChapters();
    const index = current.indexOf(chapterId);
    let next: string[] = [];
    if (index >= 0) {
      next = current.filter((id) => id !== chapterId);
    } else {
      next = [...current, chapterId];
    }
    localStorage.setItem(STUDIED_CHAPTERS_KEY, JSON.stringify(next));
    return index < 0; // true if now studied
  } catch {
    return false;
  }
}
