export interface SubjectBenchmark {
  subjectId: string;
  subjectName: string;
  subjectNameHi: string;
  classAveragePercentage: number;
  classTopPercentage: number;
  studentsCount: number;
}

export const subjectBenchmarks: Record<string, SubjectBenchmark> = {
  science: {
    subjectId: 'science',
    subjectName: 'Science',
    subjectNameHi: 'विज्ञान',
    classAveragePercentage: 66,
    classTopPercentage: 94,
    studentsCount: 45,
  },
  math: {
    subjectId: 'math',
    subjectName: 'Mathematics',
    subjectNameHi: 'गणित',
    classAveragePercentage: 62,
    classTopPercentage: 96,
    studentsCount: 45,
  },
  social: {
    subjectId: 'social',
    subjectName: 'Social Science',
    subjectNameHi: 'सामाजिक विज्ञान',
    classAveragePercentage: 69,
    classTopPercentage: 92,
    studentsCount: 45,
  },
  english: {
    subjectId: 'english',
    subjectName: 'English',
    subjectNameHi: 'अंग्रेज़ी',
    classAveragePercentage: 72,
    classTopPercentage: 95,
    studentsCount: 45,
  },
  hindi: {
    subjectId: 'hindi',
    subjectName: 'Hindi',
    subjectNameHi: 'हिन्दी',
    classAveragePercentage: 74,
    classTopPercentage: 96,
    studentsCount: 45,
  },
  evs: {
    subjectId: 'evs',
    subjectName: 'EVS / Environmental Studies',
    subjectNameHi: 'पर्यावरण अध्ययन',
    classAveragePercentage: 71,
    classTopPercentage: 93,
    studentsCount: 42,
  },
  gk: {
    subjectId: 'gk',
    subjectName: 'General Knowledge',
    subjectNameHi: 'सामान्य ज्ञान',
    classAveragePercentage: 68,
    classTopPercentage: 95,
    studentsCount: 45,
  },
};

/**
 * Returns subject benchmark based on subject name or subject ID
 */
export function getSubjectBenchmark(subjectInput?: string): SubjectBenchmark {
  if (!subjectInput) {
    return {
      subjectId: 'general',
      subjectName: 'General Studies',
      subjectNameHi: 'सामान्य अध्ययन',
      classAveragePercentage: 67,
      classTopPercentage: 94,
      studentsCount: 45,
    };
  }

  const normalized = subjectInput.toLowerCase();

  if (normalized.includes('math') || normalized.includes('गणित')) {
    return subjectBenchmarks.math;
  }
  if (normalized.includes('sci') || normalized.includes('विज्ञान') || normalized.includes('phys') || normalized.includes('chem') || normalized.includes('bio')) {
    return subjectBenchmarks.science;
  }
  if (normalized.includes('soc') || normalized.includes('सामाजिक') || normalized.includes('hist') || normalized.includes('geo') || normalized.includes('civic')) {
    return subjectBenchmarks.social;
  }
  if (normalized.includes('eng') || normalized.includes('अंग्रे')) {
    return subjectBenchmarks.english;
  }
  if (normalized.includes('hin') || normalized.includes('हिन्')) {
    return subjectBenchmarks.hindi;
  }
  if (normalized.includes('evs') || normalized.includes('पर्यावरण')) {
    return subjectBenchmarks.evs;
  }
  if (normalized.includes('gk') || normalized.includes('knowledge') || normalized.includes('ज्ञान')) {
    return subjectBenchmarks.gk;
  }

  return {
    subjectId: 'general',
    subjectName: subjectInput,
    subjectNameHi: subjectInput,
    classAveragePercentage: 68,
    classTopPercentage: 94,
    studentsCount: 45,
  };
}

export interface RelativePerformanceStats {
  subjectName: string;
  subjectNameHi: string;
  userScore: number;
  totalQuestions: number;
  userPercentage: number;
  classAvgScore: number;
  classAvgPercentage: number;
  classTopScore: number;
  classTopPercentage: number;
  diffScore: number;
  diffPercentage: number;
  isAboveAverage: boolean;
  isEqualAverage: boolean;
  statusBadge: string;
  statusColor: string;
  percentileRank: string;
  relativeRemarkHi: string;
  relativeRemarkEn: string;
}

export function calculateRelativePerformance(
  score: number,
  totalQuestions: number,
  subjectInput?: string
): RelativePerformanceStats {
  const benchmark = getSubjectBenchmark(subjectInput);
  const total = Math.max(1, totalQuestions);
  const userPercentage = Math.round((score / total) * 100);

  const classAvgScore = Number(((benchmark.classAveragePercentage / 100) * total).toFixed(1));
  const classTopScore = Number(((benchmark.classTopPercentage / 100) * total).toFixed(1));

  const diffScore = Number((score - classAvgScore).toFixed(1));
  const diffPercentage = userPercentage - benchmark.classAveragePercentage;

  const isAboveAverage = diffPercentage > 0;
  const isEqualAverage = diffPercentage === 0;

  let statusBadge = '';
  let statusColor = '';
  let percentileRank = '';
  let relativeRemarkHi = '';
  let relativeRemarkEn = '';

  if (diffPercentage >= 20) {
    statusBadge = 'Top Tier';
    statusColor = 'text-emerald-400 bg-emerald-500/15 border-emerald-400/40';
    percentileRank = 'Top 10%';
    relativeRemarkHi = `कक्षा के औसत (${benchmark.classAveragePercentage}%) से +${diffPercentage}% अधिक अंक! आप कक्षा में शीर्ष स्थान पर हैं।`;
    relativeRemarkEn = `+${diffPercentage}% higher than class average (${benchmark.classAveragePercentage}%). Top tier performance!`;
  } else if (diffPercentage >= 5) {
    statusBadge = 'Above Average';
    statusColor = 'text-blue-400 bg-blue-500/15 border-blue-400/40';
    percentileRank = 'Top 25%';
    relativeRemarkHi = `कक्षा के औसत (${benchmark.classAveragePercentage}%) से +${diffPercentage}% बेहतर प्रदर्शन। बहुत अच्छा!`;
    relativeRemarkEn = `+${diffPercentage}% above the class average of ${benchmark.classAveragePercentage}%. Well done!`;
  } else if (diffPercentage >= -5) {
    statusBadge = 'On Par with Average';
    statusColor = 'text-amber-400 bg-amber-500/15 border-amber-400/40';
    percentileRank = 'Middle 50%';
    relativeRemarkHi = `आपका प्रदर्शन कक्षा के औसत (${benchmark.classAveragePercentage}%) के अनुरूप है। थोड़े और अभ्यास से शीर्ष पर पहुँच सकते हैं।`;
    relativeRemarkEn = `Performance is on par with the class average (${benchmark.classAveragePercentage}%). Regular practice will help you achieve top tier.`;
  } else {
    statusBadge = 'Needs Practice';
    statusColor = 'text-rose-400 bg-rose-500/15 border-rose-400/40';
    percentileRank = 'Needs Boost';
    relativeRemarkHi = `कक्षा के औसत (${benchmark.classAveragePercentage}%) से ${Math.abs(diffPercentage)}% पीछे। इस विषय के मुख्य पाठों का दोबारा अभ्यास करें।`;
    relativeRemarkEn = `${Math.abs(diffPercentage)}% below the class average (${benchmark.classAveragePercentage}%). Review key concepts from the roadmap to improve.`;
  }

  return {
    subjectName: benchmark.subjectName,
    subjectNameHi: benchmark.subjectNameHi,
    userScore: score,
    totalQuestions: total,
    userPercentage,
    classAvgScore,
    classAvgPercentage: benchmark.classAveragePercentage,
    classTopScore,
    classTopPercentage: benchmark.classTopPercentage,
    diffScore,
    diffPercentage,
    isAboveAverage,
    isEqualAverage,
    statusBadge,
    statusColor,
    percentileRank,
    relativeRemarkHi,
    relativeRemarkEn,
  };
}
