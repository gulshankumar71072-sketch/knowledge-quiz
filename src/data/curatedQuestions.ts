import { QuizQuestion } from '../types';

export const initialQuestions: QuizQuestion[] = [
  {
    category: "Science",
    question: "Which element on the periodic table has the chemical symbol 'O'?",
    questionHindi: "आवर्त सारणी (Periodic Table) पर किस तत्व का रासायनिक प्रतीक 'O' है?",
    options: ["Gold", "Oxygen", "Osmium", "Silver"],
    optionsHindi: ["सोना (Gold)", "ऑक्सीजन (Oxygen)", "ओस्मियम (Osmium)", "चांदी (Silver)"],
    correct: 1,
    explanation: "The chemical symbol 'O' stands for Oxygen, which is essential for human respiration and makes up about 21% of Earth's atmosphere.",
    explanationHindi: "'O' रासायनिक प्रतीक ऑक्सीजन के लिए है, जो मानव श्वसन के लिए आवश्यक है और पृथ्वी के वायुमंडल का लगभग 21% हिस्सा बनाता है।",
    deepThinking: {
      rationale: "Oxygen is atomic number 8, belonging to the chalcogen group (group 16) on the periodic table. Symbol 'O' directly derives from the Greek roots 'oxys' (acid) and 'genes' (forming), coined by Antoine Lavoisier.",
      distractorAnalysis: "Gold is 'Au' (aurum in Latin), Osmium is 'Os', and Silver is 'Ag' (argentum in Latin).",
      takeaway: "Single-letter symbols are reserved for abundant, historically primary elements (H, C, N, O, P, S, K, F, I, B, U, Y, V, W)."
    }
  },
  {
    category: "Technology",
    question: "In computer science, what does 'CPU' stand for?",
    questionHindi: "कंप्यूटर विज्ञान में 'CPU' का पूर्ण रूप (Full Form) क्या है?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Peripheral Utility",
      "Core Processing Control"
    ],
    optionsHindi: [
      "सेंट्रल प्रोसेसिंग यूनिट (Central Processing Unit)",
      "कंप्यूटर पर्सनल यूनिट",
      "सेंट्रल पेरिफेरल यूटिलिटी",
      "कोर प्रोसेसिंग कंट्रोल"
    ],
    correct: 0,
    explanation: "CPU stands for Central Processing Unit. It acts as the primary processor and brain of a computer.",
    explanationHindi: "CPU का पूर्ण रूप Central Processing Unit है। यह कंप्यूटर का मुख्य प्रोसेसर और मस्तिष्क (Brain) कहलाता है।",
    deepThinking: {
      rationale: "The CPU executes program instructions via the fetch-decode-execute cycle. It houses the Arithmetic Logic Unit (ALU), Control Unit (CU), and registers.",
      distractorAnalysis: "'Computer Personal Unit' conflates PC (Personal Computer). 'Peripheral' refers to external I/O devices (like mice or keyboards).",
      takeaway: "The CPU is 'central' because all system buses converge on its instruction scheduler."
    }
  },
  {
    category: "Astronomy",
    question: "Which planet in our solar system is known as the Red Planet?",
    questionHindi: "हमारे सौर मंडल में किस ग्रह को 'लाल ग्रह' (Red Planet) कहा जाता है?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    optionsHindi: ["शुक्र (Venus)", "मंगल (Mars)", "बृहस्पति (Jupiter)", "शनि (Saturn)"],
    correct: 1,
    explanation: "Mars is often called the Red Planet because iron oxide (rust) on its surface gives it a reddish appearance.",
    explanationHindi: "मंगल ग्रह की सतह पर प्रचुर मात्रा में मौजूद आयरन ऑक्साइड (जंग) के कारण यह लाल रंग का दिखाई देता है।",
    deepThinking: {
      rationale: "Regolith on Mars is saturated with iron(III) oxide (Fe2O3). Solar radiation and ancient oxidation cycles transformed surface minerals into fine ferric dust.",
      distractorAnalysis: "Venus appears brilliant yellow-white due to reflective sulfuric acid clouds. Jupiter is banded ochre and white.",
      takeaway: "Mars is literally rusted on its outer crust, giving it a distinct reddish hue."
    }
  },
  {
    category: "World Trivia",
    question: "What is the capital city of Japan?",
    questionHindi: "जापान देश की आधिकारिक राजधानी कौन सा शहर है?",
    options: ["Kyoto", "Osaka", "Tokyo", "Hiroshima"],
    optionsHindi: ["क्योटो (Kyoto)", "ओसाका (Osaka)", "टोक्यो (Tokyo)", "हिरोशिमा (Hiroshima)"],
    correct: 2,
    explanation: "Tokyo is the official capital city of Japan and is the most populous metropolitan area in the world.",
    explanationHindi: "टोक्यो जापान की आधिकारिक राजधानी और विश्व का सबसे बड़ा महानगरीय क्षेत्र है।",
    deepThinking: {
      rationale: "Tokyo (historically Edo) became the de facto seat of power in 1603. In 1868, Emperor Meiji relocated the imperial seat from Kyoto to Edo, renaming it Tokyo ('Eastern Capital').",
      distractorAnalysis: "Kyoto was Japan's imperial capital for over a millennium (794 to 1868). Osaka is a historic mercantile hub.",
      takeaway: "Tokyo translates literally to 'Eastern Capital' (To = East, Kyo = Capital)."
    }
  },
  {
    category: "Geography",
    question: "How many continents are there on Earth?",
    questionHindi: "पृथ्वी पर कुल कितने महाद्वीप (Continents) स्थित हैं?",
    options: ["5", "6", "7", "8"],
    optionsHindi: ["5 महाद्वीप", "6 महाद्वीप", "7 महाद्वीप", "8 महाद्वीप"],
    correct: 2,
    explanation: "The 7 traditionally recognized continents are Asia, Africa, North America, South America, Antarctica, Europe, and Australia.",
    explanationHindi: "पृथ्वी पर 7 पारंपरिक महाद्वीप हैं: एशिया, अफ्रीका, उत्तरी अमेरिका, दक्षिण अमेरिका, अंटार्कटिका, यूरोप और ऑस्ट्रेलिया।",
    deepThinking: {
      rationale: "Under the standard 7-continent geographic model taught internationally, the landmasses are Asia, Africa, North America, South America, Antarctica, Europe, and Australia.",
      distractorAnalysis: "Olympic rings use 5 inhabited continents. Some models combine Eurasia to count 6.",
      takeaway: "Continental definitions are cultural-geological conventions."
    }
  },
  {
    category: "Physics",
    question: "What is the approximate speed of light in a vacuum?",
    questionHindi: "निर्वात (Vacuum) में प्रकाश की अनुमानित चाल कितनी होती है?",
    options: ["300,000 km/s", "150,000 km/s", "30,000 km/s", "3,000,000 km/s"],
    optionsHindi: ["300,000 किमी/सेकंड", "150,000 किमी/सेकंड", "30,000 किमी/सेकंड", "3,000,000 किमी/सेकंड"],
    correct: 0,
    explanation: "Light travels in a vacuum at exactly 299,792,458 meters per second, which rounds to approximately 300,000 km/s.",
    explanationHindi: "प्रकाश निर्वात में 299,792,458 मीटर प्रति सेकंड (लगभग 3 लाख किलोमीटर प्रति सेकंड) की गति से गमन करता है।",
    deepThinking: {
      rationale: "In special relativity, 'c' is the universal speed limit for causality. The meter is defined based on this constant.",
      distractorAnalysis: "150,000 km/s is half the speed of light. 30,000 km/s is too slow.",
      takeaway: "Light circles the Earth ~7.5 times in a single second."
    }
  },
  {
    category: "Biology",
    question: "Which organelle is widely known as the 'powerhouse of the cell'?",
    questionHindi: "कोशिका का 'पावरहाउस' (ऊर्जा घर) किस कोशिकांग को कहा जाता है?",
    options: ["Ribosome", "Nucleus", "Mitochondria", "Endoplasmic Reticulum"],
    optionsHindi: ["राइबोसोम", "केंद्रक (Nucleus)", "माइटोकॉन्ड्रिया (Mitochondria)", "अंतःप्रद्रव्यी जालिका"],
    correct: 2,
    explanation: "Mitochondria produce the chemical energy currency of the cell (Adenosine Triphosphate, or ATP) through cellular respiration.",
    explanationHindi: "माइटोकॉन्ड्रिया कोशिकीय श्वसन द्वारा ऊर्जा मुद्रा (ATP) का निर्माण करता है, इसलिए इसे पावरहाउस कहते हैं।",
    deepThinking: {
      rationale: "Through oxidative phosphorylation across their inner cristae membrane, mitochondria synthesize ~90% of cellular ATP via the electron transport chain.",
      distractorAnalysis: "Ribosomes synthesize proteins. The nucleus houses genomic DNA.",
      takeaway: "Mitochondria possess their own distinct circular mtDNA."
    }
  },
  {
    category: "History",
    question: "In what year did the Apollo 11 mission successfully land humans on the Moon?",
    questionHindi: "अपोलो 11 मिशन ने किस वर्ष इंसान को चंद्रमा की सतह पर उतारा था?",
    options: ["1965", "1969", "1972", "1961"],
    optionsHindi: ["1965 में", "1969 में", "1972 में", "1961 में"],
    correct: 1,
    explanation: "On July 20, 1969, Neil Armstrong and Buzz Aldrin stepped onto the lunar surface from the Lunar Module Eagle.",
    explanationHindi: "20 जुलाई 1969 को नील आर्मस्ट्रांग और बज़ एल्ड्रिन ने चंद्रमा की सतह पर कदम रखकर इतिहास रचा था।",
    deepThinking: {
      rationale: "Apollo 11 touched down in the Sea of Tranquility on July 20, 1969, fulfilling JFK's 1961 challenge.",
      distractorAnalysis: "1961 was Yuri Gagarin's orbital flight. 1972 was Apollo 17, the final crewed lunar mission.",
      takeaway: "1969 capped the Space Race within 8 years of the first human spaceflight."
    }
  },
  {
    category: "Computer Science",
    question: "What is the worst-case time complexity of binary search on a sorted array of size N?",
    questionHindi: "N तत्वों की सॉर्टेड ऐरे पर बाइनरी सर्च (Binary Search) की सबसे खराब समय जटिलता क्या है?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    optionsHindi: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correct: 1,
    explanation: "Binary search repeatedly divides the search interval in half, leading to a logarithmic runtime complexity of O(log N).",
    explanationHindi: "बाइनरी सर्च हर तुलना पर खोज सीमा को आधा कर देता है, जिससे O(log N) समय जटिलता मिलती है।",
    deepThinking: {
      rationale: "At each comparison step, half of the remaining elements are eliminated: T(N) = T(N/2) + O(1), which solves to O(log2 N).",
      distractorAnalysis: "O(1) is best-case when the middle element matches immediately. O(N) is linear scan complexity.",
      takeaway: "For 1 billion items, binary search takes at most ~30 comparisons (2^30 ≈ 1.07 billion)."
    }
  },
  {
    category: "Literature & Art",
    question: "Who painted the iconic masterpiece 'The Starry Night'?",
    questionHindi: "प्रसिद्ध कलाकृति 'द स्टारी नाइट' (The Starry Night) किसने बनाई थी?",
    options: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh", "Salvador Dalí"],
    optionsHindi: ["पाब्लो पिकासो", "क्लॉड मोने", "विंसेंट वैन गॉग", "साल्वाडोर डाली"],
    correct: 2,
    explanation: "Vincent van Gogh painted 'The Starry Night' in June 1889 while staying at the Saint-Paul-de-Mausole asylum.",
    explanationHindi: "विंसेंट वैन गॉग ने जून 1889 में सेंट-रेमी के आश्रम में इस प्रसिद्ध पेंटिंग को बनाया था।",
    deepThinking: {
      rationale: "Van Gogh's post-impressionist masterpiece captures his view just before sunrise with expressive swirling brushstrokes and glowing celestial bodies.",
      distractorAnalysis: "Picasso is the father of Cubism. Monet is the pioneer of Impressionism. Dalí is famous for Surrealism.",
      takeaway: "Van Gogh's swirling sky has been analyzed by physicists for closely matching turbulent fluid dynamics."
    }
  },
  {
    category: "World Geography",
    question: "Which is the longest river in the world by total length?",
    questionHindi: "विश्व की सबसे लंबी नदी कौन सी है?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    optionsHindi: ["अमेज़न नदी (Amazon)", "नील नदी (Nile)", "यांग्त्ज़ी नदी (Yangtze)", "मिसिसिपी नदी (Mississippi)"],
    correct: 1,
    explanation: "The Nile River in northeastern Africa is traditionally recognized as the longest river in the world, spanning approximately 6,650 kilometers.",
    explanationHindi: "अफ्रीका की नील नदी लगभग 6,650 किलोमीटर लंबाई के साथ विश्व की सबसे लंबी नदी मानी जाती है।",
    deepThinking: {
      rationale: "Flowing northwards through 11 countries into the Mediterranean Sea, the Nile has been measured at ~6,650 km.",
      distractorAnalysis: "Amazon is the largest by discharge volume and width. Yangtze is the longest river entirely in China.",
      takeaway: "Nile is the longest river; Amazon is the widest and has the highest water volume."
    }
  },
  {
    category: "Chemistry",
    question: "What is the pH value of pure water at 25°C?",
    questionHindi: "25°C पर शुद्ध जल का pH मान कितना होता है?",
    options: ["5", "7", "9", "14"],
    optionsHindi: ["5 (अम्लीय)", "7 (उदासीन / Neutral)", "9 (क्षारीय)", "14"],
    correct: 1,
    explanation: "Pure water has an equal concentration of hydronium (H3O+) and hydroxide (OH-) ions, resulting in a neutral pH of exactly 7 at 25°C.",
    explanationHindi: "शुद्ध जल उदासीन होता है क्योंकि इसमें H+ और OH- आयनों की सांद्रता बराबर होती है, जिससे pH ठीक 7 होता है।",
    deepThinking: {
      rationale: "The autoionization constant of water Kw = [H+][OH-] = 1.0 × 10^-14 at 25°C. -log10(1.0 × 10^-7) = 7.0.",
      distractorAnalysis: "pH < 7 indicates acidity. pH > 7 indicates basicity. 14 is the maximum standard alkaline value.",
      takeaway: "pH 7 represents pure neutral equilibrium at standard room temperature."
    }
  },
  {
    category: "Ancient History",
    question: "Which ancient wonder of the world is the only one still largely intact today?",
    questionHindi: "प्राचीन विश्व के सात अजूबों में से एकमात्र कौन सा अजूबा आज भी सुरक्षित खड़ा है?",
    options: ["Hanging Gardens of Babylon", "Colossus of Rhodes", "Great Pyramid of Giza", "Lighthouse of Alexandria"],
    optionsHindi: ["बेबीलोन के हैंगिंग गार्डन्स", "रोड्स का कोलोसस", "गीज़ा का महान पिरामिड", "सिकंदरिया का लाइटहाउस"],
    correct: 2,
    explanation: "The Great Pyramid of Giza in Egypt, built as a tomb for Pharaoh Khufu around 2560 BCE, is the oldest and only surviving ancient wonder.",
    explanationHindi: "मिस्र का गीज़ा का महान पिरामिड (लगभग 2560 ईसा पूर्व निर्मित) 4,500 से अधिक वर्षों बाद भी आज भी खड़ा है।",
    deepThinking: {
      rationale: "Built with an estimated 2.3 million stone blocks, its massive geometry allowed it to withstand thousands of years of weathering.",
      distractorAnalysis: "The Colossus was destroyed by an earthquake in 226 BCE. The Lighthouse collapsed after medieval quakes.",
      takeaway: "Giza is the oldest (over 4,500 years old) and the sole surviving ancient wonder."
    }
  },
  {
    category: "Neuroscience",
    question: "Which region of the human brain is considered the primary center for forming new long-term memories?",
    questionHindi: "मानव मस्तिष्क का कौन सा भाग नई दीर्घकालिक यादें (Long-term memories) बनाने का मुख्य केंद्र है?",
    options: ["Cerebellum", "Hippocampus", "Medulla Oblongata", "Occipital Lobe"],
    optionsHindi: ["अनुमस्तिष्क (Cerebellum)", "हिप्पोकैम्पस (Hippocampus)", "मेडुला ऑबलोंगाटा", "ओसीसीपिटल लोब"],
    correct: 1,
    explanation: "The hippocampus, located in the medial temporal lobe, plays a vital role in memory consolidation from short-term to long-term memory.",
    explanationHindi: "हिप्पोकैम्पस अल्पकालिक यादों को दीर्घकालिक स्मृति में बदलने (Memory Consolidation) का मुख्य केंद्र है।",
    deepThinking: {
      rationale: "Famous neurological case studies proved that bilateral hippocampal removal prevents consolidation of declarative memories.",
      distractorAnalysis: "The cerebellum coordinates motor balance. The medulla controls autonomic vitals (heart rate, respiration).",
      takeaway: "Hippocampus = memory consolidation center (shaped like a seahorse)."
    }
  },
  {
    category: "Economics & Logic",
    question: "What economic concept describes the cost of the next best alternative foregone when making a choice?",
    questionHindi: "किसी विकल्प को चुनते समय छोड़े गए सर्वोत्तम अगले विकल्प के मूल्य को क्या कहते हैं?",
    options: ["Sunk Cost", "Opportunity Cost", "Marginal Utility", "Fixed Cost"],
    optionsHindi: ["डूबत लागत (Sunk Cost)", "अवसर लागत (Opportunity Cost)", "सीमांत उपयोगिता", "निश्चित लागत"],
    correct: 1,
    explanation: "Opportunity cost represents the potential benefits that an individual or business misses out on when choosing one alternative over another.",
    explanationHindi: "अवसर लागत (Opportunity Cost) उस लाभ का त्याग है जो किसी अन्य श्रेष्ठ विकल्प को न चुनने पर होता है।",
    deepThinking: {
      rationale: "Because resources are finite, every choice has an implicit trade-off: the value of the highest-valued forgone alternative.",
      distractorAnalysis: "Sunk costs are irrecoverable past expenses. Marginal utility is the satisfaction gained from one more unit.",
      takeaway: "Opportunity cost is not what you pay; it is what you sacrifice."
    }
  }
];

export const topicSuggestions = [
  { name: "General Knowledge", icon: "🧠" },
  { name: "Quantum Physics", icon: "⚛️" },
  { name: "Computer Science & AI", icon: "💻" },
  { name: "Astrophysics & Cosmos", icon: "🌌" },
  { name: "World History & Enigmas", icon: "🏛️" },
  { name: "Human Biology & Neuroscience", icon: "🧬" },
  { name: "Philosophy & Logic Puzzles", icon: "🤔" },
  { name: "Earth & Geography", icon: "🌍" },
];
