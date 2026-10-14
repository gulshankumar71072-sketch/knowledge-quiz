import { QuizQuestion } from '../types';
import { curatedChapterFlashcards } from './chapterFlashcards';

/**
 * Question Variation Engine
 * Generates dynamic, multi-attempt, chapter-specific quiz questions for Class 1 to 12.
 * Ensures that when a student finishes a quiz or retakes a chapter, questions rotate
 * and vary every attempt (definitions, numericals with varied values, applications, HOTS).
 */

// Procedural numerical & conceptual question generators for high-demand topics
interface ChapterVariationTemplate {
  generateQuestions: (attempt: number, seed: number) => QuizQuestion[];
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate distinct questions for a given chapter and attempt
export function generateChapterQuestions(
  gradeLabel: string,
  subjectName: string,
  chapterName: string,
  attemptNumber: number = 1
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const seedBase = (attemptNumber * 97) + (chapterName.length * 13) + (gradeLabel.length * 7);

  // Normalize chapter name for matching
  const chLower = chapterName.toLowerCase();

  // Attempt focus labels for pedagogical clarity
  const focusTitles = [
    'Core Laws & Fundamentals',
    'Quantitative & Formula Problems',
    'Real-World Applications & Experiments',
    'HOTS (Higher Order Thinking)',
    'Advanced Comprehensive Mastery'
  ];
  const attemptFocus = focusTitles[(attemptNumber - 1) % focusTitles.length];

  // 1. Check if we have curated flashcards for this chapter
  const flashcardKey = Object.keys(curatedChapterFlashcards).find((k) =>
    k.toLowerCase().includes(chLower) || chLower.includes(k.split('_')[1]?.toLowerCase() || '___')
  );

  const flashcards = flashcardKey ? curatedChapterFlashcards[flashcardKey] : [];

  // 2. Generate questions from flashcards with rotating angles based on attemptNumber
  if (flashcards && flashcards.length > 0) {
    flashcards.forEach((fc, idx) => {
      const qIndex = (idx + attemptNumber) % flashcards.length;
      const targetCard = flashcards[qIndex];
      const otherCards = flashcards.filter((_, i) => i !== qIndex);

      // Angle 1: Direct definition / concept
      if ((idx + attemptNumber) % 3 === 0) {
        const wrongDefs = otherCards.slice(0, 3).map((c) => c.definition);
        while (wrongDefs.length < 3) {
          wrongDefs.push(`Process unrelated to ${chapterName} involving inert state.`);
        }
        const options = [targetCard.definition, ...wrongDefs];
        const optionsHindi = [
          targetCard.definitionHindi || targetCard.definition,
          ...otherCards.slice(0, 3).map((c) => c.definitionHindi || c.definition),
        ];
        while (optionsHindi.length < 4) {
          optionsHindi.push('उपरोक्त में से कोई नहीं');
        }

        questions.push({
          category: `${gradeLabel} • ${chapterName}`,
          question: `According to ${targetCard.term}, which of the following statements is scientifically correct?`,
          questionHindi: `${targetCard.termHindi || targetCard.term} के अनुसार, निम्नलिखित में से कौन सा कथन सही है?`,
          options,
          optionsHindi,
          correct: 0,
          explanation: `${targetCard.definition} ${targetCard.keyFacts?.[0] || ''}`,
          explanationHindi: `${targetCard.definitionHindi || targetCard.definition}`,
          deepThinking: {
            rationale: `This addresses the core tenet of ${targetCard.term}. ${targetCard.formulaOrExample ? `Key formulation: ${targetCard.formulaOrExample}.` : ''}`,
            distractorAnalysis: 'The distractors describe related but distinct physical/chemical mechanisms from other topics.',
            takeaway: targetCard.memoryTip || `${targetCard.term} is a cornerstone concept for this chapter.`
          }
        });
      }
      // Angle 2: Identification / Practical example
      else if ((idx + attemptNumber) % 3 === 1) {
        const targetExample = targetCard.formulaOrExample || targetCard.keyFacts?.[0] || targetCard.definition;
        const wrongExamples = otherCards.slice(0, 3).map((c) => c.formulaOrExample || c.keyFacts?.[0] || 'Constant reference state');
        while (wrongExamples.length < 3) {
          wrongExamples.push('Standard STP equilibrium state');
        }

        questions.push({
          category: `${gradeLabel} • ${chapterName}`,
          question: `Which of the following serves as the best real-world demonstration or formulation of "${targetCard.term}"?`,
          questionHindi: `निम्नलिखित में से कौन "${targetCard.termHindi || targetCard.term}" का सबसे सटीक वास्तविक उदाहरण या सूत्र है?`,
          options: [targetExample, ...wrongExamples],
          optionsHindi: [
            targetExample,
            ...wrongExamples.map((w) => w)
          ],
          correct: 0,
          explanation: `Demonstration of ${targetCard.term}: ${targetExample}. Memory tip: ${targetCard.memoryTip || 'Review foundational principles.'}`,
          explanationHindi: `${targetCard.termHindi || targetCard.term} का सटीक उदाहरण: ${targetExample}`,
          deepThinking: {
            rationale: `Practical grounding: ${targetCard.definition}`,
            distractorAnalysis: 'Distractors are valid physical principles elsewhere, but do not satisfy this concept.',
            takeaway: targetCard.memoryTip || 'Always tie the abstract formula to its physical manifestation.'
          }
        });
      }
      // Angle 3: Key Fact / Exam Trap reasoning
      else {
        const correctFact = targetCard.keyFacts?.[0] || targetCard.definition;
        const fakeFacts = [
          `It only occurs in deep vacuum with no energy transfer.`,
          `It is completely unaffected by temperature, pressure, or concentration.`,
          `It produces zero resultant change in any physical quantity under all conditions.`
        ];

        questions.push({
          category: `${gradeLabel} • ${chapterName}`,
          question: `What critical exam insight must a student remember regarding "${targetCard.term}"?`,
          questionHindi: `"${targetCard.termHindi || targetCard.term}" के संबंध में परीक्षा के लिए सबसे महत्वपूर्ण तथ्य क्या है?`,
          options: [correctFact, ...fakeFacts],
          optionsHindi: [
            targetCard.keyFacts?.[0] || targetCard.definitionHindi || correctFact,
            'यह केवल निर्वात में बिना ऊर्जा स्थानांतरण के होता है।',
            'यह तापमान या दबाव से बिल्कुल प्रभावित नहीं होता।',
            'यह किसी भी परिस्थिति में कोई परिणामी परिवर्तन नहीं लाता।'
          ],
          correct: 0,
          explanation: `${correctFact}. Practical note: ${targetCard.memoryTip || ''}`,
          explanationHindi: `${targetCard.definitionHindi || correctFact}`,
          deepThinking: {
            rationale: `Exam insight: ${targetCard.definition}`,
            distractorAnalysis: 'Common student traps often generalize zero-entropy or independent isolation assumptions which fail.',
            takeaway: targetCard.memoryTip || 'Watch out for boundary conditions and conservation laws.'
          }
        });
      }
    });
  }

  // 3. Mathematical & Numerical dynamically parameterized questions
  // Depending on whether math, physics, or chemistry:
  const isMathOrPhysics = chLower.includes('math') || chLower.includes('electricity') || chLower.includes('motion') || chLower.includes('number') || chLower.includes('light') || chLower.includes('force');

  if (isMathOrPhysics || questions.length < 15) {
    // Generate numerical & conceptual questions with varied numbers per attempt
    for (let i = 0; i < 15; i++) {
      if (questions.length >= 15) break;

      const numA = ((i * 3 + attemptNumber * 7) % 20) + 2;
      const numB = ((i * 5 + attemptNumber * 11) % 15) + 3;
      const multiplier = (attemptNumber % 4) + 1;

      // Electricity / Ohm's Law variation
      if (chLower.includes('electric') || chLower.includes('ohm')) {
        const v = numA * multiplier * 2;
        const r = numB * multiplier;
        const currentAns = (v / r).toFixed(1);
        const distractors = [
          (v * r).toFixed(1),
          (r / v).toFixed(2),
          ((v + r) / 2).toFixed(1)
        ];

        questions.push({
          category: `${gradeLabel} • Electricity`,
          question: `A potential difference of ${v} V is applied across a resistor of ${r} Ω. What is the electric current flowing through it?`,
          questionHindi: `एक ${r} Ω के प्रतिरोधक के सिरों पर ${v} V का विभवांतर लगाया गया है। इसमें प्रवाहित विद्युत धारा (I) का मान क्या होगा?`,
          options: [`${currentAns} A`, `${distractors[0]} A`, `${distractors[1]} A`, `${distractors[2]} A`],
          optionsHindi: [`${currentAns} एम्पीयर (A)`, `${distractors[0]} A`, `${distractors[1]} A`, `${distractors[2]} A`],
          correct: 0,
          explanation: `Using Ohm's Law: I = V / R = ${v} / ${r} = ${currentAns} A.`,
          explanationHindi: `ओम के नियम के अनुसार: I = V / R = ${v} / ${r} = ${currentAns} A.`,
          deepThinking: {
            rationale: `Ohm's law gives direct linear proportionality between voltage and current: V = I * R, so I = V / R.`,
            distractorAnalysis: `${distractors[0]} A is obtained by multiplying V * R, a common formula mixup.`,
            takeaway: 'I = V / R. Current increases with voltage, decreases with resistance.'
          }
        });
      }
      // Light / Optics variation
      else if (chLower.includes('light') || chLower.includes('reflection') || chLower.includes('refraction')) {
        const f = 10 + (attemptNumber * 5 + i * 2) % 25;
        const radiusAns = f * 2;
        questions.push({
          category: `${gradeLabel} • Light`,
          question: `What is the radius of curvature (R) of a spherical mirror having a focal length (f) of ${f} cm?`,
          questionHindi: `एक गोलीय दर्पण की फोकस दूरी (f) ${f} सेमी है। उसकी वक्रता त्रिज्या (R) क्या होगी?`,
          options: [`${radiusAns} cm`, `${f} cm`, `${(f / 2).toFixed(1)} cm`, `${radiusAns + 5} cm`],
          optionsHindi: [`${radiusAns} सेमी`, `${f} सेमी`, `${(f / 2).toFixed(1)} सेमी`, `${radiusAns + 5} सेमी`],
          correct: 0,
          explanation: `For spherical mirrors of small aperture: Radius of Curvature R = 2f = 2 × ${f} = ${radiusAns} cm.`,
          explanationHindi: `गोलीय दर्पण के लिए: वक्रता त्रिज्या R = 2 × f = 2 × ${f} = ${radiusAns} सेमी।`,
          deepThinking: {
            rationale: 'Focal point F lies exactly midway between Pole P and Center of Curvature C on principal axis.',
            distractorAnalysis: `${(f / 2).toFixed(1)} cm is a trap where students mistakenly divide by 2 instead of multiplying.`,
            takeaway: 'R = 2f (Radius is always twice the focal length).'
          }
        });
      }
      // Chemical Reactions variation
      else if (chLower.includes('chemical') || chLower.includes('reaction') || chLower.includes('acid') || chLower.includes('base')) {
        const phValue = (attemptNumber + i) % 2 === 0 ? 3 : 11;
        const isAcid = phValue < 7;
        questions.push({
          category: `${gradeLabel} • Chemistry`,
          question: `An unknown aqueous solution X has a measured pH of ${phValue}. What is the nature of this solution and its effect on litmus paper?`,
          questionHindi: `एक अज्ञात जलीय विलयन X का pH मान ${phValue} है। इस विलयन की प्रकृति क्या है और लिटमस पर क्या प्रभाव पड़ेगा?`,
          options: [
            isAcid ? 'Acidic: Turns blue litmus to red' : 'Basic: Turns red litmus to blue',
            isAcid ? 'Basic: Turns red litmus to blue' : 'Acidic: Turns blue litmus to red',
            'Neutral: No color change on any indicator',
            'Amphoteric with pH > 14'
          ],
          optionsHindi: [
            isAcid ? 'अम्लीय: नीले लिटमस को लाल कर देता है' : 'क्षारीय: लाल लिटमस को नीला कर देता है',
            isAcid ? 'क्षारीय: लाल लिटमस को नीला कर देता है' : 'अम्लीय: नीले लिटमस को लाल कर देता है',
            'उदासीन: किसी लिटमस पर कोई प्रभाव नहीं',
            'उभयधर्मी (pH > 14)'
          ],
          correct: 0,
          explanation: `pH ${phValue} is ${isAcid ? 'less than 7, hence acidic (turns blue litmus red)' : 'greater than 7, hence basic/alkaline (turns red litmus blue)'}.`,
          explanationHindi: `pH मान ${phValue} ${isAcid ? '7 से कम है, अतः यह अम्लीय है (नीले लिटमस को लाल करता है)' : '7 से अधिक है, अतः यह क्षारीय है (लाल लिटमस को नीला करता है)'}।`,
          deepThinking: {
            rationale: 'pH scale measures hydronium ion concentration. pH < 7 is acidic; pH = 7 is neutral; pH > 7 is alkaline.',
            distractorAnalysis: 'Confusing litmus color transitions (Blue to Red vs Red to Blue) is a classic examination slip.',
            takeaway: 'Acid = Blue to Red | Base = Red to Blue (B for Base, B for Blue).'
          }
        });
      }
      // Mathematics Real Numbers / Algebra / Arithmetic variation
      else if (chLower.includes('real number') || chLower.includes('polynomial') || chLower.includes('linear') || chLower.includes('math')) {
        const val1 = (attemptNumber * 3 + i * 2) + 6;
        const val2 = (attemptNumber * 2 + i * 3) + 4;
        const sum = val1 + val2;
        questions.push({
          category: `${gradeLabel} • Mathematics`,
          question: `If a linear equation is given by x + ${val2} = ${sum}, what is the exact value of x?`,
          questionHindi: `यदि रैखिक समीकरण x + ${val2} = ${sum} दिया गया है, तो x का सटीक मान क्या होगा?`,
          options: [`${val1}`, `${val1 + 2}`, `${val1 - 2}`, `${sum * 2}`],
          optionsHindi: [`${val1}`, `${val1 + 2}`, `${val1 - 2}`, `${sum * 2}`],
          correct: 0,
          explanation: `Subtracting ${val2} from both sides: x = ${sum} - ${val2} = ${val1}.`,
          explanationHindi: `दोनों पक्षों से ${val2} घटाने पर: x = ${sum} - ${val2} = ${val1}.`,
          deepThinking: {
            rationale: 'Linear equations preserve equality under identical operations on both sides.',
            distractorAnalysis: `${val1 + 2} comes from calculation slippage.`,
            takeaway: 'Transpose terms with sign reversal to isolate the unknown variable.'
          }
        });
      }
      // General dynamic questions for other subjects (History, Geography, Biology, etc.)
      else {
        const topics = [
          { q: `What is the principal biological function of mitochondria in living eukaryotic cells?`, qHi: `यूकेरियोटिक कोशिकाओं में माइटोकॉन्ड्रिया का मुख्य जैविक कार्य क्या है?`, ans: `Cellular respiration and synthesis of ATP (Powerhouse of the cell)`, ansHi: `कोशिकीय श्वसन और ATP का निर्माण (कोशिका का ऊर्जाघर)`, dist: [`Protein packaging in Golgi body`, `Photosynthesis in chloroplasts`, `DNA translation in ribosomes`] },
          { q: `Which atmospheric layer contains the ozone layer that protects Earth from harmful UV rays?`, qHi: `पृथ्वी को हानिकारक पराबैंगनी (UV) किरणों से बचाने वाली ओजोन परत किस वायुमंडलीय परत में स्थित है?`, ans: `Stratosphere (समताप मंडल)`, ansHi: `समताप मंडल (Stratosphere)`, dist: [`Troposphere (क्षोभमंडल)`, `Mesosphere (मध्यमंडल)`, `Thermosphere (तापमंडल)`] },
          { q: `What is the fundamental SI unit for measuring electric current?`, qHi: `विद्युत धारा मापने की मूल SI इकाई क्या है?`, ans: `Ampere (A)`, ansHi: `एम्पीयर (A)`, dist: [`Volt (V)`, `Ohm (Ω)`, `Watt (W)`] },
          { q: `In plant leaves, through which microscopic pores does gas exchange primarily take place?`, qHi: `पौधों की पत्तियों में गैसीय विनिमय मुख्य रूप से किन सूक्ष्म छिद्रों द्वारा होता है?`, ans: `Stomata (रंध्र)`, ansHi: `रंध्र (Stomata)`, dist: [`Xylem vessels`, `Phloem sieve tubes`, `Chloroplast stroma`] },
          { q: `What is the universal law stating that for every action there is an equal and opposite reaction?`, qHi: `प्रत्येक क्रिया के बराबर और विपरीत प्रतिक्रिया होती है - यह कौन सा नियम है?`, ans: `Newton's Third Law of Motion`, ansHi: `न्यूटन का गति का तीसरा नियम`, dist: [`Newton's First Law`, `Newton's Second Law`, `Law of Universal Gravitation`] },
        ];
        const selectedTopic = topics[(i + attemptNumber) % topics.length];
        questions.push({
          category: `${gradeLabel} • ${chapterName}`,
          question: selectedTopic.q,
          questionHindi: selectedTopic.qHi,
          options: [selectedTopic.ans, ...selectedTopic.dist],
          optionsHindi: [selectedTopic.ansHi, ...selectedTopic.dist.map((d) => d)],
          correct: 0,
          explanation: `Key syllabus fact for attempt #${attemptNumber} (${attemptFocus}): ${selectedTopic.ans}.`,
          explanationHindi: `सटीक उत्तर: ${selectedTopic.ansHi}।`,
          deepThinking: {
            rationale: `Standard curriculum foundation for ${chapterName}.`,
            distractorAnalysis: 'The distractors represent other distinct components of cell biology or physical systems.',
            takeaway: 'Focus on primary functional roles and distinct definitions.'
          }
        });
      }
    }
  }

  // Shuffle options for all questions and update correct index
  const randomizedQuestions = questions.slice(0, 15).map((q, qIndex) => {
    const indices = [0, 1, 2, 3].slice(0, q.options.length);
    // Deterministic or pseudo-random shuffle seeded by attemptNumber and question index
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(pseudoRandom(seedBase + qIndex * 17 + i) * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const newOptions = indices.map((idx) => q.options[idx]);
    const newOptionsHindi = q.optionsHindi
      ? indices.map((idx) => q.optionsHindi![idx])
      : undefined;
    const newCorrect = indices.indexOf(q.correct);

    return {
      ...q,
      options: newOptions,
      optionsHindi: newOptionsHindi,
      correct: newCorrect !== -1 ? newCorrect : 0,
    };
  });

  return randomizedQuestions;
}
