export interface ChapterFlashcard {
  id: string;
  chapter: string;
  subject: string;
  gradeLabel: string;
  term: string; // The concept or question prompt on the front
  termHindi?: string;
  badge?: string; // e.g. "Core Law", "Definition", "Formula", "High-Yield Fact"
  difficulty?: 'Core Concept' | 'Formula' | 'Key Fact' | 'Exam Trap';
  definition: string; // Detailed clear explanation on the back
  definitionHindi?: string;
  keyFacts: string[]; // 2-3 quick bullet facts
  formulaOrExample?: string; // Formula or concrete example
  memoryTip?: string; // Memory aid or tip
}

// Curated high-yield chapter flashcard sets for school syllabus
export const curatedChapterFlashcards: Record<string, ChapterFlashcard[]> = {
  // Class 10 Science - Chemical Reactions & Equations
  'Class 10_Chemical Reactions & Equations': [
    {
      id: 'cr-1',
      chapter: 'Chemical Reactions & Equations',
      subject: 'Science',
      gradeLabel: 'Class 10',
      term: 'Law of Conservation of Mass',
      termHindi: 'द्रव्यमान संरक्षण का नियम',
      badge: 'Core Law',
      difficulty: 'Core Concept',
      definition: 'Mass can neither be created nor destroyed in a chemical reaction. The total mass of reactants must equal the total mass of products.',
      definitionHindi: 'किसी भी रासायनिक अभिक्रिया में द्रव्यमान का न तो निर्माण होता है और न ही विनाश। अभिकारकों का कुल द्रव्यमान उत्पादों के कुल द्रव्यमान के बराबर होता है।',
      keyFacts: [
        'Explains why all chemical equations must be balanced.',
        'Number of atoms of each element remains identical before and after reaction.'
      ],
      formulaOrExample: 'Total Mass of Reactants = Total Mass of Products',
      memoryTip: 'Think "What goes in must come out" — count atom by atom.'
    },
    {
      id: 'cr-2',
      chapter: 'Chemical Reactions & Equations',
      subject: 'Science',
      gradeLabel: 'Class 10',
      term: 'Exothermic vs Endothermic Reactions',
      termHindi: 'ऊष्माक्षेपी बनाम ऊष्माशोषी अभिक्रियाएं',
      badge: 'Definition',
      difficulty: 'Core Concept',
      definition: 'Exothermic reactions release energy (usually as heat) to the surroundings (e.g. Respiration, Burning of natural gas). Endothermic reactions absorb energy from surroundings (e.g. Photosynthesis, Thermal decomposition).',
      definitionHindi: 'ऊष्माक्षेपी अभिक्रियाओं में ऊर्जा (ऊष्मा) बाहर निकलती है (उदा. श्वसन, दहन)। ऊष्माशोषी अभिक्रियाओं में ऊर्जा अवशोषित होती है (उदा. प्रकाश संश्लेषण)।',
      keyFacts: [
        'Respiration is exothermic because glucose oxidizes to release ATP and heat.',
        'Decomposition of calcium carbonate (lime kiln) is endothermic.'
      ],
      formulaOrExample: 'Exo: C + O₂ → CO₂ + Heat | Endo: CaCO₃ + Heat → CaO + CO₂',
      memoryTip: 'Exo = "Exit" heat exits | Endo = "Enter" heat enters.'
    },
    {
      id: 'cr-3',
      chapter: 'Chemical Reactions & Equations',
      subject: 'Science',
      gradeLabel: 'Class 10',
      term: 'Redox Reaction (Oxidation & Reduction)',
      termHindi: 'रेडॉक्स अभिक्रिया (उपचयन एवं अपचयन)',
      badge: 'Exam Trap',
      difficulty: 'Exam Trap',
      definition: 'Oxidation is the gain of oxygen or loss of hydrogen/electrons (OIL). Reduction is the loss of oxygen or gain of hydrogen/electrons (RIG). Both processes occur simultaneously.',
      definitionHindi: 'ऑक्सीजन का जुड़ना या हाइड्रोजन का निकलना उपचयन (ऑक्सीकरण) कहलाता है। ऑक्सीजन का निकलना या हाइड्रोजन का जुड़ना अपचयन कहलाता है।',
      keyFacts: [
        'The substance that gets oxidized acts as the reducing agent.',
        'The substance that gets reduced acts as the oxidizing agent.'
      ],
      formulaOrExample: 'CuO + H₂ → Cu + H₂O (CuO is reduced to Cu; H₂ is oxidized to H₂O)',
      memoryTip: 'Remember OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons).'
    },
    {
      id: 'cr-4',
      chapter: 'Chemical Reactions & Equations',
      subject: 'Science',
      gradeLabel: 'Class 10',
      term: 'Corrosion and Rancidity Prevention',
      termHindi: 'संक्षारण एवं विकृतगंधिता से बचाव',
      badge: 'Key Fact',
      difficulty: 'Key Fact',
      definition: 'Corrosion is the gradual deterioration of metals by moisture and airborne gases (e.g. rusting of iron: hydrated ferric oxide). Rancidity is oxidation of fats and oils leading to foul smell and taste.',
      definitionHindi: 'संक्षारण नम वायु द्वारा धातुओं का क्षरण है (जंग लगना)। वसा और तेलों का ऑक्सीकरण होकर अप्रिय गंध और स्वाद उत्पन्न करना विकृतगंधिता कहलाता है।',
      keyFacts: [
        'Iron rust formula: Fe₂O₃·xH₂O (reddish-brown powder).',
        'Chips packets are flushed with unreactive Nitrogen gas (N₂) to prevent oxidation.'
      ],
      formulaOrExample: 'Prevention: Galvanization (coating zinc), Painting, Nitrogen flushing',
      memoryTip: 'Nitrogen gas acts as an inert shield stopping oxygen from spoiling fats.'
    }
  ],

  // Class 10 Science - Electricity & Ohm’s Law
  'Class 10_Electricity & Ohm’s Law': [
    {
      id: 'el-1',
      chapter: 'Electricity & Ohm’s Law',
      subject: 'Science',
      gradeLabel: 'Class 10',
      term: 'Ohm’s Law',
      termHindi: 'ओम का नियम',
      badge: 'Core Law',
      difficulty: 'Formula',
      definition: 'At constant temperature, the electric current flowing through a metallic conductor is directly proportional to the potential difference across its terminals.',
      definitionHindi: 'नियत ताप पर, किसी चालक तार में प्रवाहित विद्युत धारा उसके सिरों के बीच विभवांतर के समानुपाती होती है।',
      keyFacts: [
        'V-I graph for an ohmic conductor is a straight line passing through origin.',
        'Slope of V vs I graph gives Resistance (R).'
      ],
      formulaOrExample: 'V = I × R (V: Volts, I: Amperes, R: Ohms Ω)',
      memoryTip: 'Remember the triangle: V on top, I and R on the bottom.'
    },
    {
      id: 'el-2',
      chapter: 'Electricity & Ohm’s Law',
      subject: 'Science',
      gradeLabel: 'Class 10',
      term: 'Factors Affecting Resistance (Resistivity ρ)',
      termHindi: 'प्रतिरोध को प्रभावित करने वाले कारक (प्रतिरोधकता ρ)',
      badge: 'Formula',
      difficulty: 'Formula',
      definition: 'Resistance of a uniform conductor is directly proportional to its length (L), inversely proportional to cross-sectional area (A), and depends on material resistivity (ρ) and temperature.',
      definitionHindi: 'चालक का प्रतिरोध उसकी लम्बाई (L) के समानुपाती और अनुप्रस्थ काट के क्षेत्रफल (A) के व्युत्क्रमानुपाती होता है।',
      keyFacts: [
        'Thicker wire (larger A) has less resistance.',
        'Longer wire (larger L) has greater resistance.',
        'SI unit of resistivity is Ohm-meter (Ω·m).'
      ],
      formulaOrExample: 'R = ρ × (L / A)',
      memoryTip: 'Think of water in a pipe: longer pipes resist flow, wider pipes let water flow easily.'
    },
    {
      id: 'el-3',
      chapter: 'Electricity & Ohm’s Law',
      subject: 'Science',
      gradeLabel: 'Class 10',
      term: 'Series vs Parallel Combinations',
      termHindi: 'श्रेणीक्रम बनाम समांतर क्रम संयोजन',
      badge: 'Key Fact',
      difficulty: 'Core Concept',
      definition: 'In Series: Same current flows through all resistors, voltages add up (R_eq = R₁ + R₂ + ...). In Parallel: Same voltage across all branches, currents split (1/R_eq = 1/R₁ + 1/R₂ + ...).',
      definitionHindi: 'श्रेणीक्रम में प्रत्येक प्रतिरोधक से समान धारा प्रवाहित होती है। समांतर क्रम में प्रत्येक प्रतिरोधक के सिरों पर समान विभवांतर होता है।',
      keyFacts: [
        'Domestic household circuits are always connected in Parallel.',
        'If one bulb fuses in parallel, other bulbs continue operating unaffected.'
      ],
      formulaOrExample: 'Series: R_s = R₁ + R₂ | Parallel: 1/R_p = 1/R₁ + 1/R₂',
      memoryTip: 'Parallel circuits offer multiple paths; equivalent resistance is always smaller than the smallest branch resistor.'
    },
    {
      id: 'el-4',
      chapter: 'Electricity & Ohm’s Law',
      subject: 'Science',
      gradeLabel: 'Class 10',
      term: 'Joule’s Law of Heating & Electric Power',
      termHindi: 'जूल का तापन नियम एवं विद्युत शक्ति',
      badge: 'Formula',
      difficulty: 'Formula',
      definition: 'The heat produced in a resistor is directly proportional to the square of current (I²), resistance (R), and time (t). Electric power is the rate of electrical energy consumption.',
      definitionHindi: 'किसी प्रतिरोधक में उत्पन्न ऊष्मा धारा के वर्ग (I²), प्रतिरोध (R) और समय (t) के समानुपाती होती है।',
      keyFacts: [
        'Commercial unit of electric energy is Kilowatt-hour (kWh) or "1 Board of Trade Unit".',
        '1 kWh = 3.6 × 10⁶ Joules.'
      ],
      formulaOrExample: 'H = I²·R·t | P = V·I = I²·R = V²/R',
      memoryTip: 'Heating devices (electric iron, geyser, toaster) use nichrome alloys with high resistivity and high melting points.'
    }
  ],

  // Class 10 Science - Light: Reflection & Refraction
  'Class 10_Light: Reflection & Refraction': [
    {
      id: 'lt-1',
      chapter: 'Light: Reflection & Refraction',
      subject: 'Science',
      gradeLabel: 'Class 10',
      term: 'Mirror Formula & Magnification',
      termHindi: 'दर्पण सूत्र एवं आवर्धन',
      badge: 'Formula',
      difficulty: 'Formula',
      definition: 'Relates object distance (u), image distance (v), and focal length (f) for spherical mirrors under Cartesian sign convention. Magnification (m) expresses ratio of image height to object height.',
      definitionHindi: 'गोलीय दर्पणों के लिए बिम्ब दूरी (u), प्रतिबिम्ब दूरी (v) और फोकस दूरी (f) के बीच का संबंध।',
      keyFacts: [
        'Sign convention: Object distance (u) is always negative.',
        'Concave mirror focal length (f) is negative; Convex mirror f is positive.'
      ],
      formulaOrExample: '1/v + 1/u = 1/f | m = h\'/h = -v/u',
      memoryTip: 'Mirror formula has a PLUS sign (1/v + 1/u); Lens formula has a MINUS sign (1/v - 1/u).'
    },
    {
      id: 'lt-2',
      chapter: 'Light: Reflection & Refraction',
      subject: 'Science',
      gradeLabel: 'Class 10',
      term: 'Snell’s Law of Refraction',
      termHindi: 'स्नेल का अपवर्तन नियम',
      badge: 'Core Law',
      difficulty: 'Core Concept',
      definition: 'The ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant for a given pair of media and color of light.',
      definitionHindi: 'आपतन कोण की ज्या (sin i) और अपवर्तन कोण की ज्या (sin r) का अनुपात एक नियतांक (अपवर्तनांक) होता है।',
      keyFacts: [
        'When light enters a denser medium from rarer, it bends TOWARDS the normal.',
        'When light enters rarer from denser, it bends AWAY from normal.'
      ],
      formulaOrExample: 'sin(i) / sin(r) = n₂ / n₁ (Refractive index n₂₁)',
      memoryTip: 'Denser = Slower speed = Closer to normal.'
    },
    {
      id: 'lt-3',
      chapter: 'Light: Reflection & Refraction',
      subject: 'Science',
      gradeLabel: 'Class 10',
      term: 'Power of a Lens (Dioptre D)',
      termHindi: 'लेंस की क्षमता (डायऑप्टर D)',
      badge: 'Key Fact',
      difficulty: 'Formula',
      definition: 'The power of a lens is defined as the reciprocal of its focal length in meters. It measures the degree of convergence or divergence of light rays.',
      definitionHindi: 'लेंस की क्षमता उसकी मीटर में फोकस दूरी का व्युत्क्रम होती है (P = 1/f)। इसका SI मात्रक डायऑप्टर (D) है।',
      keyFacts: [
        'Convex lens has POSITIVE power (+D) used to correct Hypermetropia (far-sightedness).',
        'Concave lens has NEGATIVE power (-D) used to correct Myopia (near-sightedness).'
      ],
      formulaOrExample: 'P = 1 / f(in meters) | 1 Dioptre = 1 m⁻¹',
      memoryTip: 'Always convert focal length in centimeters to meters before calculating power!'
    }
  ],

  // Class 10 Math - Introduction to Trigonometry
  'Class 10_Introduction to Trigonometry': [
    {
      id: 'tr-1',
      chapter: 'Introduction to Trigonometry',
      subject: 'Mathematics',
      gradeLabel: 'Class 10',
      term: 'Trigonometric Ratios (T-Ratios)',
      termHindi: 'त्रिकोणमितीय अनुपात',
      badge: 'Core Concept',
      difficulty: 'Core Concept',
      definition: 'In a right-angled triangle, ratios of sides defined with respect to an acute angle θ: sin θ = Opposite/Hypotenuse, cos θ = Adjacent/Hypotenuse, tan θ = Opposite/Adjacent.',
      definitionHindi: 'समकोण त्रिभुज में न्यूनकोण के सापेक्ष भुजाओं का अनुपात: sin = लम्ब/कर्ण, cos = आधार/कर्ण, tan = लम्ब/आधार।',
      keyFacts: [
        'cosec θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ.',
        'tan θ = sin θ / cos θ.'
      ],
      formulaOrExample: 'sin θ = Opp/Hyp | cos θ = Adj/Hyp | tan θ = Opp/Adj',
      memoryTip: 'Mnemonic: "Some People Have / Curly Brown Hair / Turned Permanent Black" (S=P/H, C=B/H, T=P/B).'
    },
    {
      id: 'tr-2',
      chapter: 'Introduction to Trigonometry',
      subject: 'Mathematics',
      gradeLabel: 'Class 10',
      term: 'Fundamental Trigonometric Identities',
      termHindi: 'सर्वसमिकाएं (Identities)',
      badge: 'Formula',
      difficulty: 'Formula',
      definition: 'Three primary trigonometric identities holding true for all angles 0° ≤ θ ≤ 90° derived directly from the Pythagorean theorem (a² + b² = c²).',
      definitionHindi: 'पाइथागोरस प्रमेय पर आधारित तीन मुख्य त्रिकोणमितीय सर्वसमिकाएं जो सभी कोणों के लिए सत्य होती हैं।',
      keyFacts: [
        '1 + tan² θ = sec² θ (valid for θ ≠ 90°)',
        '1 + cot² θ = cosec² θ (valid for θ ≠ 0°)'
      ],
      formulaOrExample: '1) sin² θ + cos² θ = 1\n2) sec² θ - tan² θ = 1\n3) cosec² θ - cot² θ = 1',
      memoryTip: 'sin² + cos² is always 1. For tan and cot, subtract them from their co-partners (sec² - tan² = 1).'
    },
    {
      id: 'tr-3',
      chapter: 'Introduction to Trigonometry',
      subject: 'Mathematics',
      gradeLabel: 'Class 10',
      term: 'Standard Trigonometric Values (0°, 30°, 45°, 60°, 90°)',
      termHindi: 'विशिष्ट कोणों के त्रिकोणमितीय मान',
      badge: 'Key Fact',
      difficulty: 'Key Fact',
      definition: 'Fixed exact values for acute angles frequently evaluated in board examinations without tables.',
      definitionHindi: '0°, 30°, 45°, 60° और 90° के निश्चित संख्यात्मक मान।',
      keyFacts: [
        'sin 0° = 0, sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2, sin 90° = 1',
        'cos values are simply the reverse sequence of sin values.',
        'tan 45° = 1, tan 30° = 1/√3, tan 60° = √3.'
      ],
      formulaOrExample: 'Trick: √0/4, √1/4, √2/4, √3/4, √4/4 gives sin 0° to 90°!',
      memoryTip: 'Just write 0, 1, 2, 3, 4, divide all by 4 and take square root for sin values!'
    }
  ],

  // Class 9 Science - Laws of Motion & Gravitation
  'Class 9_Laws of Motion & Gravitation': [
    {
      id: 'lm-1',
      chapter: 'Laws of Motion & Gravitation',
      subject: 'Science',
      gradeLabel: 'Class 9',
      term: 'Newton’s Three Laws of Motion',
      termHindi: 'न्यूटन के गति के तीन नियम',
      badge: 'Core Law',
      difficulty: 'Core Concept',
      definition: '1st Law: Law of Inertia (an object maintains state of rest or uniform motion unless acted by external unbalanced force). 2nd Law: F = m·a (rate of change of momentum is proportional to force). 3rd Law: For every action, there is an equal and opposite reaction.',
      definitionHindi: 'प्रथम नियम: जड़त्व का नियम। द्वितीय नियम: F = ma (संवेग परिवर्तन की दर बल के बराबर)। तृतीय नियम: प्रत्येक क्रिया के बराबर और विपरीत प्रतिक्रिया होती है।',
      keyFacts: [
        'Mass is the quantitative measure of an object’s inertia.',
        'Action and reaction forces act on two DIFFERENT objects, so they never cancel each other out.'
      ],
      formulaOrExample: '1st: Inertia | 2nd: F = dp/dt = m·a | 3rd: F_AB = -F_BA',
      memoryTip: 'Law 1 defines force; Law 2 measures force; Law 3 reveals force reciprocity.'
    },
    {
      id: 'lm-2',
      chapter: 'Laws of Motion & Gravitation',
      subject: 'Science',
      gradeLabel: 'Class 9',
      term: 'Universal Law of Gravitation & Acceleration \'g\'',
      termHindi: 'सार्वत्रिक गुरुत्वाकर्षण नियम एवं गुरुत्वीय त्वरण \'g\'',
      badge: 'Formula',
      difficulty: 'Formula',
      definition: 'Every mass in the universe attracts every other mass with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them.',
      definitionHindi: 'ब्रह्मांड का प्रत्येक पिंड अन्य पिंड को अपनी ओर आकर्षित करता है, जो द्रव्यमानों के गुणनफल के समानुपाती तथा दूरी के वर्ग के व्युत्क्रमानुपाती होता है।',
      keyFacts: [
        'Universal constant G = 6.67 × 10⁻¹¹ N·m²/kg² (constant everywhere).',
        'Acceleration due to gravity on Earth g ≈ 9.8 m/s² (varies: minimum at equator, maximum at poles).'
      ],
      formulaOrExample: 'F = G × (m₁·m₂) / r² | g = G·M / R²',
      memoryTip: 'Mass (m) is constant anywhere in the universe; Weight (W = m·g) changes with local gravity.'
    }
  ],

  // General Knowledge - Earth & Solar System
  'General Knowledge_Earth & Solar System': [
    {
      id: 'gk-1',
      chapter: 'Earth & Solar System',
      subject: 'General Knowledge',
      gradeLabel: 'All Classes',
      term: 'Planetary Order & Features',
      termHindi: 'सौरमंडल के ग्रह और विशेषताएं',
      badge: 'Key Fact',
      difficulty: 'Key Fact',
      definition: 'The solar system comprises 8 planets orbiting the Sun: Mercury, Venus, Earth, Mars (Terrestrial rocky planets); Jupiter, Saturn, Uranus, Neptune (Gas/Ice Giants).',
      definitionHindi: 'सूर्य से दूरी के क्रम में 8 ग्रह: बुध, शुक्र, पृथ्वी, मंगल, बृहस्पति, शनि, अरुण (यूरेनस), वरुण (नेपच्यून)।',
      keyFacts: [
        'Venus is the hottest planet due to dense CO₂ greenhouse effect, and rotates clockwise.',
        'Jupiter is the largest planet and has the Great Red Spot storm.',
        'Mars is called the Red Planet due to iron oxide (rust) on its surface.'
      ],
      formulaOrExample: 'Order: Mercury → Venus → Earth → Mars → Jupiter → Saturn → Uranus → Neptune',
      memoryTip: 'Mnemonic: "My Very Educated Mother Just Served Us Noodles".'
    },
    {
      id: 'gk-2',
      chapter: 'Earth & Solar System',
      subject: 'General Knowledge',
      gradeLabel: 'All Classes',
      term: 'Earth Rotation vs Revolution',
      termHindi: 'घूर्णन (दैनिक गति) बनाम परिक्रमण (वार्षिक गति)',
      badge: 'Core Concept',
      difficulty: 'Core Concept',
      definition: 'Rotation is Earth spinning on its axis (takes 24 hours), causing Day and Night. Revolution is Earth orbiting around the Sun (takes 365.25 days), which combined with the 23.5° axial tilt causes Seasons.',
      definitionHindi: 'घूर्णन पृथ्वी का अपनी धुरी पर घूमना है (24 घंटे, जिससे दिन-रात बनते हैं)। परिक्रमण सूर्य के चारों ओर चक्कर लगाना है (365.25 दिन, जिससे ऋतुएं बदलती हैं)।',
      keyFacts: [
        'Earth rotates from West to East (why the Sun rises in the East).',
        'Leap year adds 1 day every 4 years to account for the extra 0.25 day (6 hours).'
      ],
      formulaOrExample: 'Rotation = 24 hrs (Day/Night) | Revolution = 365.25 days (Seasons)',
      memoryTip: 'Rotation has "t" for 24hr Time; Revolution has "v" for Voyage around the Sun.'
    }
  ]
};

// Generates fallback dynamic flashcards for any chapter based on its title and subject
export function getFlashcardsForChapter(
  chapterName: string,
  subjectName: string = 'General Knowledge',
  gradeLabel: string = 'Class 10'
): ChapterFlashcard[] {
  // Check exact key match
  const exactKey = `${gradeLabel}_${chapterName}`;
  if (curatedChapterFlashcards[exactKey]) {
    return curatedChapterFlashcards[exactKey];
  }

  // Check fuzzy key match
  for (const [key, cards] of Object.entries(curatedChapterFlashcards)) {
    const [cGrade, cChap] = key.split('_');
    if (
      (cChap && chapterName.toLowerCase().includes(cChap.toLowerCase())) ||
      (cChap && cChap.toLowerCase().includes(chapterName.toLowerCase()))
    ) {
      return cards;
    }
  }

  // Clean chapter name
  const cleanName = chapterName.replace(/^Chapter\s*\d*:\s*/i, '').trim();

  // Dynamic synthesized high-yield syllabus flashcard set for any custom chapter
  return [
    {
      id: `dyn-${cleanName}-1`,
      chapter: cleanName,
      subject: subjectName,
      gradeLabel,
      term: `Fundamental Concept of ${cleanName}`,
      termHindi: `${cleanName} की मूलभूत अवधारणा`,
      badge: 'Core Definition',
      difficulty: 'Core Concept',
      definition: `${cleanName} represents a foundational pillar in ${subjectName} for ${gradeLabel}. It introduces core terminology, underlying physical or mathematical principles, and practical real-world applications.`,
      definitionHindi: `यह अध्याय ${subjectName} में ${cleanName} के मूलभूत सिद्धांतों, परिभाषाओं और सूत्रों की विस्तृत व्याख्या करता है।`,
      keyFacts: [
        `Essential for board exam objective MCQs and conceptual derivations.`,
        `Focuses on first-principles definitions and standard syllabus conventions.`
      ],
      formulaOrExample: `Key Theme: Systematic study and problem-solving application of ${cleanName}`,
      memoryTip: `Review the summary theorems and definitions at the end of the chapter before testing.`
    },
    {
      id: `dyn-${cleanName}-2`,
      chapter: cleanName,
      subject: subjectName,
      gradeLabel,
      term: `Key Formula & Governing Principles in ${cleanName}`,
      termHindi: `प्रमुख सूत्र एवं नियम`,
      badge: 'Formula & Law',
      difficulty: 'Formula',
      definition: `Mastery of mathematical relationships, dimensional formulas, and balanced equations is critical to solving numerical problems in ${cleanName}.`,
      definitionHindi: `इस अध्याय के आंकिक प्रश्नों को हल करने के लिए मानक इकाइयों और गणितीय सूत्रों का सटीक प्रयोग आवश्यक है।`,
      keyFacts: [
        `Always verify SI units before substituting values into numerical formulas.`,
        `Dimensional consistency ensures your calculated answer is valid.`
      ],
      formulaOrExample: `Standard Equation: Apply standard ${subjectName} laws step-by-step`,
      memoryTip: `Write down given values (Given / To Find / Formula) first to avoid calculation traps.`
    },
    {
      id: `dyn-${cleanName}-3`,
      chapter: cleanName,
      subject: subjectName,
      gradeLabel,
      term: `High-Yield Exam Distractor & Pitfall Forensics`,
      termHindi: `परीक्षा में सामान्य गलतियाँ एवं सावधानियाँ`,
      badge: 'Exam Trap',
      difficulty: 'Exam Trap',
      definition: `In examination multiple-choice questions on ${cleanName}, examiners frequently set distractor options using sign errors, inverted ratios, or confusing definitions.`,
      definitionHindi: `परीक्षा में प्रश्नों को हल करते समय मात्रक परिवर्तन और विपरीत अनुपातों से संबंधित भ्रामक विकल्पों से सावधान रहें।`,
      keyFacts: [
        `Carefully inspect qualifying words: "NOT true", "EXCEPT", "INCREASES", or "INVERSE".`,
        `Eliminate obviously incorrect boundary conditions first.`
      ],
      formulaOrExample: `Rule: Check whether problem asks for radius or diameter, mass or weight, meters or centimeters.`,
      memoryTip: `Re-read the question prompt twice before finalizing your choice.`
    },
    {
      id: `dyn-${cleanName}-4`,
      chapter: cleanName,
      subject: subjectName,
      gradeLabel,
      term: `Practical Real-World Application of ${cleanName}`,
      termHindi: `दैनिक जीवन एवं व्यावहारिक अनुप्रयोग`,
      badge: 'Key Fact',
      difficulty: 'Key Fact',
      definition: `The principles learned in ${cleanName} directly apply to everyday technology, natural phenomena, and engineering systems.`,
      definitionHindi: `इस अध्याय के सिद्धांत हमारे दैनिक जीवन, प्राकृतिक परिघटनाओं और आधुनिक वैज्ञानिक तकनीकों में प्रत्यक्ष रूप से लागू होते हैं।`,
      keyFacts: [
        `Connects textbook theory to observable phenomena around you.`,
        `Enhances Higher Order Thinking Skills (HOTS) comprehension.`
      ],
      formulaOrExample: `Application: Case-study based questions in recent board examinations`,
      memoryTip: `Associate every abstract formula with at least one tangible everyday example.`
    }
  ];
}
