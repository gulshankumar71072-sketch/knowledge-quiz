export type LanguageMode = 'en' | 'hi' | 'both';

export function getDisplayQuestion(
  questionEn: string,
  questionHi: string | undefined,
  mode: LanguageMode
): { primary: string; secondary?: string } {
  if (mode === 'en') {
    return { primary: questionEn };
  }
  if (mode === 'hi') {
    return {
      primary: questionHi || questionEn,
    };
  }
  // Bilingual 'both' (English + Hindi)
  return {
    primary: questionEn,
    secondary: questionHi,
  };
}

export function getDisplayOption(
  optionEn: string,
  optionHi: string | undefined,
  mode: LanguageMode
): { primary: string; secondary?: string } {
  if (mode === 'en') {
    return { primary: optionEn };
  }
  if (mode === 'hi') {
    return {
      primary: optionHi || optionEn,
    };
  }
  return {
    primary: optionEn,
    secondary: optionHi,
  };
}

export function getDisplayExplanation(
  explanationEn: string,
  explanationHi: string | undefined,
  mode: LanguageMode
): { primary: string; secondary?: string } {
  if (mode === 'en') {
    return { primary: explanationEn };
  }
  if (mode === 'hi') {
    return {
      primary: explanationHi || explanationEn,
    };
  }
  return {
    primary: explanationEn,
    secondary: explanationHi,
  };
}

export interface UiLabels {
  questionLabel: (curr: number, total: number) => string;
  scoreLabel: (score: number) => string;
  newQuestionsBtn: string;
  nextQuestionBtn: string;
  finishQuizBtn: string;
  quizCompletedTitle: string;
  yourTotalScore: string;
  playAgainBtn: string;
  teacherExplanationTitle: string;
  hindiExplanationTitle: string;
  newSetBadge: string;
  changeQuestionsTitle: string;
  marksTitle: string;
}

export function getUiLabels(mode: LanguageMode): UiLabels {
  if (mode === 'hi') {
    return {
      questionLabel: (curr, total) => `सवाल ${curr} / ${total}`,
      scoreLabel: (s) => `स्कोर: ${s}`,
      newQuestionsBtn: 'नए सवाल 🔄',
      nextQuestionBtn: 'अगला सवाल',
      finishQuizBtn: 'क्विज़ समाप्त करें 🏆',
      quizCompletedTitle: 'क्विज़ समाप्त हुआ!',
      yourTotalScore: 'आपका कुल स्कोर',
      playAgainBtn: 'दोबारा खेलें (नए सवाल 🔄)',
      teacherExplanationTitle: "अध्यापक का स्पष्टीकरण:",
      hindiExplanationTitle: 'हिन्दी स्पष्टीकरण:',
      newSetBadge: 'नया सेट',
      changeQuestionsTitle: 'इस चैप्टर के नए सवाल लोड करें',
      marksTitle: 'पूर्णांक: 1.0 अंक',
    };
  }
  if (mode === 'both') {
    return {
      questionLabel: (curr, total) => `Question / सवाल ${curr} / ${total}`,
      scoreLabel: (s) => `Score / स्कोर: ${s}`,
      newQuestionsBtn: 'New Questions (नए सवाल 🔄)',
      nextQuestionBtn: 'Next Question (अगला सवाल)',
      finishQuizBtn: 'Finish Quiz (क्विज़ समाप्त करें) 🏆',
      quizCompletedTitle: 'Quiz Completed! (क्विज़ समाप्त हुआ!)',
      yourTotalScore: 'Your Total Score (आपका कुल स्कोर)',
      playAgainBtn: 'Play Again / दोबारा खेलें (New Questions 🔄)',
      teacherExplanationTitle: "Teacher's Explanation (अध्यापक स्पष्टीकरण):",
      hindiExplanationTitle: 'Hindi Explanation (हिन्दी व्याख्या):',
      newSetBadge: 'Fresh Set / नया सेट',
      changeQuestionsTitle: 'Load fresh questions for this chapter / नए सवाल लोड करें',
      marksTitle: 'Max Marks: 1.0',
    };
  }
  // Default 'en' (English)
  return {
    questionLabel: (curr, total) => `Question ${curr} / ${total}`,
    scoreLabel: (s) => `Score: ${s}`,
    newQuestionsBtn: 'New Questions 🔄',
    nextQuestionBtn: 'Next Question',
    finishQuizBtn: 'Finish Quiz 🏆',
    quizCompletedTitle: 'Quiz Completed!',
    yourTotalScore: 'Your Total Score',
    playAgainBtn: 'Play Again (New Questions 🔄)',
    teacherExplanationTitle: "Teacher's Explanation:",
    hindiExplanationTitle: 'Hindi Explanation:',
    newSetBadge: 'Fresh Questions',
    changeQuestionsTitle: 'Load fresh dynamic questions for this chapter',
    marksTitle: 'Max Marks: 1.0',
  };
}
