import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import { generateChapterQuestions } from './src/data/questionVariationEngine.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: Generate custom quiz questions with High Thinking
app.post('/api/quiz/generate', async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured, using dynamic engine');
    }

    const {
      topic = 'General Knowledge',
      classGrade,
      subject,
      chapter,
      count = 15,
      difficulty = 'Medium',
      attemptNumber = 1,
      seed = Date.now().toString(),
      excludeQuestions = [],
    } = req.body;

    let targetContext = `topic "${topic}"`;
    if (classGrade && subject) {
      targetContext = `${classGrade}, Subject: ${subject}${chapter ? `, Chapter: "${chapter}"` : ''}`;
    }

    let difficultyInstruction = '';
    if (difficulty === 'Easy') {
      difficultyInstruction = 'Difficulty: EASY (Direct definitions, fundamental facts, primary formulas, clear straightforward questions).';
    } else if (difficulty === 'Hard') {
      difficultyInstruction = 'Difficulty: HARD (HOTS - Higher Order Thinking Skills, tricky multi-step reasoning, subtle conceptual traps, competitive exam level).';
    } else {
      difficultyInstruction = 'Difficulty: MEDIUM (Standard conceptual application, balanced board exam level problems).';
    }

    const excludeSnippet =
      Array.isArray(excludeQuestions) && excludeQuestions.length > 0
        ? `\nPREVIOUS QUESTIONS TO EXCLUDE (DO NOT REPEAT THESE):\n${excludeQuestions.slice(0, 30).map((q: string) => `- "${q.slice(0, 90)}"`).join('\n')}\n`
        : '';

    const focusRotations = [
      'FOCUS FOR THIS ATTEMPT: Core definitions, historical/discovery context, and foundational laws.',
      'FOCUS FOR THIS ATTEMPT: Numerical problem solving, units & dimensional formulas, and mathematical equations.',
      'FOCUS FOR THIS ATTEMPT: Real-world practical applications, everyday phenomena, and case-study scenarios.',
      'FOCUS FOR THIS ATTEMPT: Higher Order Thinking Skills (HOTS), experimental setups, and subtle conceptual distractor traps.',
      'FOCUS FOR THIS ATTEMPT: Comparative analysis, exceptions to standard rules, and cause-and-effect reasoning.',
    ];
    const attemptFocus = focusRotations[(Number(attemptNumber) - 1) % focusRotations.length] || focusRotations[0];

    const prompt = `You are an expert school teacher and curriculum developer for Indian and international schools.
Create exactly ${count} engaging, factually accurate, multi-choice questions tailored strictly for ${targetContext}.
${difficultyInstruction}

CRITICAL DYNAMIC ROTATION & FRESHNESS DIRECTIVE:
- Attempt Number: #${attemptNumber} (Random Seed: ${seed})
- ${attemptFocus}
- ${excludeSnippet}
- The student is taking/retaking a quiz for this chapter. You MUST provide a COMPLETELY NEW, FRESH, and UNREPEATABLE set of questions.
- Vary the specific numbers, equations, historical events, chemical species, or scenarios so the questions differ completely from any standard template or previous attempts.

CRITICAL BILINGUAL REQUIREMENT:
Provide BOTH English and Hindi for every question, option, and explanation so students can read in both languages.
- question: English question
- questionHindi: Accurate, natural Hindi translation of the question (in Devanagari script)
- options: 4 distinct English options
- optionsHindi: 4 corresponding Hindi options
- explanation: Clear explanation in English
- explanationHindi: Clear explanation in Hindi
Ensure the concepts and vocabulary are strictly aligned with the school syllabus (NCERT / CBSE / standard school curriculum for this specific grade).
Each question must have a 0-indexed correct option (0, 1, 2, or 3) and a high-thinking reasoning breakdown.
Avoid "All of the above" or "None of the above".`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          description: 'A list of generated bilingual quiz questions with high thinking analysis',
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              question: { type: Type.STRING },
              questionHindi: { type: Type.STRING, description: 'Question in Hindi' },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Four distinct options in English',
              },
              optionsHindi: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Four corresponding options in Hindi',
              },
              correct: {
                type: Type.INTEGER,
                description: '0-based index of the correct answer (0, 1, 2, or 3)',
              },
              explanation: {
                type: Type.STRING,
                description: 'Clear concise explanation in English',
              },
              explanationHindi: {
                type: Type.STRING,
                description: 'Clear concise explanation in Hindi',
              },
              deepThinking: {
                type: Type.OBJECT,
                properties: {
                  rationale: {
                    type: Type.STRING,
                    description: 'In-depth deductive reasoning and core scientific/historical rationale',
                  },
                  distractorAnalysis: {
                    type: Type.STRING,
                    description: 'Why the other options are plausible misconceptions and why they fail',
                  },
                  takeaway: {
                    type: Type.STRING,
                    description: 'Core mental model or memorable takeaway rule',
                  },
                },
                required: ['rationale', 'distractorAnalysis', 'takeaway'],
              },
            },
            required: ['category', 'question', 'questionHindi', 'options', 'optionsHindi', 'correct', 'explanation', 'explanationHindi', 'deepThinking'],
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('No response text received from Gemini');
    }

    const questions = JSON.parse(text);
    res.json({ questions, attemptNumber });
  } catch (error: any) {
    console.warn('Gemini generation unavailable or failed, generating dynamic chapter questions:', error?.message);
    try {
      const { classGrade, subject, chapter, topic = 'General Knowledge', attemptNumber = 1 } = req.body;
      const gradeNum = parseInt((classGrade || '').replace(/\D/g, '')) || 10;
      const fallbackQuestions = generateChapterQuestions(
        classGrade || `Class ${gradeNum}`,
        subject || 'Science',
        chapter || topic || 'General Science',
        Number(attemptNumber) || 1
      );
      res.json({ questions: fallbackQuestions, isDynamicFallback: true, attemptNumber });
    } catch (fallbackError: any) {
      console.error('Error generating fallback quiz:', fallbackError);
      res.status(500).json({
        error: error?.message || 'Failed to generate quiz',
      });
    }
  }
});

// Endpoint: Deep Thinking Analysis for a specific question on demand
app.post('/api/quiz/deep-think', async (req, res) => {
  try {
    const { question, options, correct, explanation, userChoice } = req.body;

    const prompt = `Analyze this quiz question using your deepest analytical and pedagogical reasoning.
Question: "${question}"
Options:
${options.map((opt: string, i: number) => `${String.fromCharCode(65 + i)}: ${opt}${i === correct ? ' [CORRECT]' : ''}${userChoice === i ? ' [USER PICKED]' : ''}`).join('\n')}

Standard Explanation: "${explanation}"

Provide a comprehensive High-Thinking dissection:
1. Systematic deductive proof: Break down step-by-step why the correct answer is undeniably true.
2. Distractor forensics: Dissect why each incorrect option is a common trap or misconception.
3. First-principles mental model: Provide an underlying rule or heuristic so the learner never forgets.
4. Tangential fascinating trivia: One surprising related historical or scientific fact.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            deductiveProof: {
              type: Type.STRING,
              description: 'Step-by-step deductive proof of why the correct answer holds',
            },
            distractorAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  option: { type: Type.STRING },
                  whyIncorrect: { type: Type.STRING },
                },
                required: ['option', 'whyIncorrect'],
              },
            },
            mentalModel: {
              type: Type.STRING,
              description: 'A sticky mnemonic, heuristic, or first-principles framework',
            },
            bonusFact: {
              type: Type.STRING,
              description: 'A fascinating mind-blowing fact related to this topic',
            },
          },
          required: ['deductiveProof', 'distractorAnalysis', 'mentalModel', 'bonusFact'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('No response text received from Gemini');
    }

    const analysis = JSON.parse(text);
    res.json({ analysis });
  } catch (error: any) {
    console.error('Error in deep thinking analysis:', error);
    res.status(500).json({
      error: error?.message || 'Failed to complete High Thinking analysis',
    });
  }
});

// Endpoint: Ask a Question / Follow-up doubt on a quiz question
app.post('/api/quiz/ask-question', async (req, res) => {
  try {
    const { question, options, correctOption, userQuery } = req.body;

    const prompt = `The user is studying this quiz question:
Question: "${question}"
Options: ${options.join(', ')}
Correct Answer: "${correctOption}"

The user has this specific question or counter-argument:
"${userQuery}"

Provide an authoritative, clear, illuminating answer with rigorous reasoning using Gemini High Thinking. Address their exact question directly, point out any subtleties, and explain why the original answer holds or clarify any nuances.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      },
    });

    const answer = response.text || 'Unable to generate response.';
    res.json({ answer });
  } catch (error: any) {
    console.error('Error in ask-question:', error);
    res.status(500).json({
      error: error?.message || 'Failed to answer user question',
    });
  }
});

// Vite Middleware & Static Serving setup
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Quiz server running at http://localhost:${port}`);
  });
}

startServer();
