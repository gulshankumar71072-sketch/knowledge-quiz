import { QuizQuestion } from '../types';
import { allGradeQuestionBanks } from './gradeQuestionsBank';
import { generateChapterQuestions } from './questionVariationEngine';

export interface SubjectInfo {
  id: string;
  name: string;
  icon: string;
  chapters: string[];
}

export interface ClassGradeInfo {
  gradeNumber: number;
  gradeLabel: string;
  category: 'Primary' | 'Middle' | 'Secondary' | 'Senior Secondary';
  description: string;
  subjects: SubjectInfo[];
}

export const schoolGrades: ClassGradeInfo[] = [
  // Primary (1 - 5)
  {
    gradeNumber: 1,
    gradeLabel: 'Class 1',
    category: 'Primary',
    description: 'Foundational literacy, counting, simple shapes, and living world.',
    subjects: [
      { id: 'math', name: 'Mathematics', icon: '🔢', chapters: ['Numbers 1 to 50', 'Shapes & Space', 'Addition & Subtraction', 'Time & Money'] },
      { id: 'evs', name: 'EVS / My World', icon: '🌱', chapters: ['My Body', 'Animals & Plants', 'Good Habits', 'My Family & Home'] },
      { id: 'english', name: 'English', icon: '🔤', chapters: ['Phonics & Alphabet', 'Rhyming Words', 'Opposites', 'Simple Nouns'] },
      { id: 'gk', name: 'General Knowledge', icon: '🌟', chapters: ['Colors & Fruits', 'Days of Week', 'Our Country Basics', 'Vehicles'] },
    ],
  },
  {
    gradeNumber: 2,
    gradeLabel: 'Class 2',
    category: 'Primary',
    description: 'Basic arithmetic, sensory science, nature, and language skills.',
    subjects: [
      { id: 'math', name: 'Mathematics', icon: '➕', chapters: ['Counting up to 1000', 'Basic Shapes & Patterns', 'Measurement', 'Money & Time'] },
      { id: 'evs', name: 'EVS (Science & Nature)', icon: '🐾', chapters: ['Plant Types', 'Animal Habitats', 'Air & Water', 'Seasons & Clothes'] },
      { id: 'english', name: 'English', icon: '📖', chapters: ['Nouns & Verbs', 'Singular & Plural', 'Articles (A, An, The)', 'Sight Words'] },
      { id: 'gk', name: 'General Knowledge', icon: '🌍', chapters: ['Inventions', 'Famous Places', 'National Symbols', 'Solar System Basics'] },
    ],
  },
  {
    gradeNumber: 3,
    gradeLabel: 'Class 3',
    category: 'Primary',
    description: 'Multiplication, introductory environmental science, and social awareness.',
    subjects: [
      { id: 'math', name: 'Mathematics', icon: '✖️', chapters: ['Multiplication & Division', 'Fractions Basics', 'Perimeter & Area Intro', 'Data Handling'] },
      { id: 'science', name: 'General Science', icon: '🌿', chapters: ['Living & Non-living Things', 'Parts of Plants', 'Birds & Feathers', 'Soil & Rocks'] },
      { id: 'social', name: 'Social Studies', icon: '🗺️', chapters: ['Earth Our Home', 'Continents & Oceans', 'Means of Transport', 'Indian Heritage'] },
      { id: 'english', name: 'English', icon: '✍️', chapters: ['Adjectives & Pronouns', 'Prepositions', 'Punctuation', 'Reading Comprehension'] },
    ],
  },
  {
    gradeNumber: 4,
    gradeLabel: 'Class 4',
    category: 'Primary',
    description: 'Expanded math, states of matter, geography, and human body basics.',
    subjects: [
      { id: 'math', name: 'Mathematics', icon: '📐', chapters: ['Large Numbers', 'Fractions & Decimals', 'Angles & Geometry', 'Unitary Method'] },
      { id: 'science', name: 'General Science', icon: '🔬', chapters: ['States of Matter', 'Food & Digestion', 'Teeth & Microbes', 'Solar System & Earth'] },
      { id: 'social', name: 'Social Studies', icon: '🏛️', chapters: ['Physical Features of India', 'Natural Resources', 'States & Capitals', 'Forests & Wildlife'] },
      { id: 'english', name: 'English', icon: '📚', chapters: ['Tenses (Present/Past/Future)', 'Conjunctions', 'Synonyms & Antonyms', 'Composition'] },
    ],
  },
  {
    gradeNumber: 5,
    gradeLabel: 'Class 5',
    category: 'Primary',
    description: 'Advanced primary math, organ systems, ecosystems, and freedom struggle intro.',
    subjects: [
      { id: 'math', name: 'Mathematics', icon: '🧮', chapters: ['Operations on Decimals', 'HCF & LCM', 'Percentage Intro', 'Volume & Area'] },
      { id: 'science', name: 'Science / EVS', icon: '🫀', chapters: ['Skeletal & Nervous System', 'Simple Machines', 'Pollution & Conservation', 'Nutrients & Diseases'] },
      { id: 'social', name: 'Social Studies', icon: '🌐', chapters: ['Globe & Maps', 'Climate Zones', 'Freedom Movement Intro', 'United Nations Basics'] },
      { id: 'english', name: 'English', icon: '📝', chapters: ['Direct & Indirect Speech Intro', 'Active & Passive Voice Intro', 'Vocabulary', 'Idioms'] },
    ],
  },

  // Middle (6 - 8)
  {
    gradeNumber: 6,
    gradeLabel: 'Class 6',
    category: 'Middle',
    description: 'Transition to structured science, algebra, ancient history, and geography.',
    subjects: [
      { id: 'math', name: 'Mathematics', icon: '📊', chapters: ['Integers & Number Line', 'Algebra Intro', 'Fractions & Decimals', 'Ratio & Proportion'] },
      { id: 'science', name: 'Science', icon: '🧪', chapters: ['Components of Food', 'Separation of Substances', 'Light, Shadows & Reflections', 'Motion & Measurement'] },
      { id: 'social', name: 'Social Science', icon: '🏺', chapters: ['Ancient Civilizations (Indus Valley)', 'Earth in Solar System', 'Diversity & Discrimination', 'Major Landforms'] },
      { id: 'english', name: 'English Grammar', icon: '🖋️', chapters: ['Parts of Speech Mastery', 'Tenses', 'Subject-Verb Agreement', 'Clauses'] },
    ],
  },
  {
    gradeNumber: 7,
    gradeLabel: 'Class 7',
    category: 'Middle',
    description: 'Heat, chemical changes, linear equations, medieval history, and ecosystems.',
    subjects: [
      { id: 'math', name: 'Mathematics', icon: '📈', chapters: ['Rational Numbers', 'Simple Linear Equations', 'Lines & Angles', 'Triangle Properties'] },
      { id: 'science', name: 'Science', icon: '⚡', chapters: ['Heat & Temperature', 'Acids, Bases & Salts', 'Physical & Chemical Changes', 'Electric Current & Effects'] },
      { id: 'social', name: 'Social Science', icon: '🏰', chapters: ['Delhi Sultanate & Mughals', 'Our Environment', 'Role of Government in Health', 'Water & Air Circulation'] },
      { id: 'english', name: 'English', icon: '📜', chapters: ['Modal Auxiliaries', 'Reported Speech', 'Idioms & Phrases', 'Determiners'] },
    ],
  },
  {
    gradeNumber: 8,
    gradeLabel: 'Class 8',
    category: 'Middle',
    description: 'Foundations for high school physics, cell biology, modern history, and geometry.',
    subjects: [
      { id: 'math', name: 'Mathematics', icon: '📏', chapters: ['Linear Equations in 1 Variable', 'Understanding Quadrilaterals', 'Squares & Square Roots', 'Mensuration'] },
      { id: 'science', name: 'Science', icon: '🧫', chapters: ['Force & Pressure', 'Friction', 'Sound & Frequency', 'Cell Structure & Functions', 'Combustion & Flame'] },
      { id: 'social', name: 'Social Science', icon: '📜', chapters: ['Colonialism & Revolt of 1857', 'Indian Constitution & Secularism', 'Resources & Industries', 'Judiciary'] },
      { id: 'english', name: 'English', icon: '✒️', chapters: ['Voice & Narration', 'Conditional Sentences', 'Prefixes & Suffixes', 'Critical Comprehension'] },
    ],
  },

  // Secondary (9 - 10)
  {
    gradeNumber: 9,
    gradeLabel: 'Class 9',
    category: 'Secondary',
    description: 'Rigorous CBSE/NCERT curriculum in Newton mechanics, atomic structure, and coordinate geometry.',
    subjects: [
      { id: 'science', name: 'Science (Physics/Chem/Bio)', icon: '⚛️', chapters: ['Laws of Motion & Gravitation', 'Matter in Our Surroundings', 'Atoms & Molecules', 'The Fundamental Unit of Life (Cell)', 'Tissues'] },
      { id: 'math', name: 'Mathematics', icon: '📉', chapters: ['Number Systems & Irrationals', 'Polynomials', 'Coordinate Geometry', 'Linear Equations in 2 Variables', 'Lines, Angles & Triangles'] },
      { id: 'social', name: 'Social Science', icon: '🏛️', chapters: ['French Revolution', 'Nazism & Rise of Hitler', 'Drainage & Climate of India', 'Constitutional Design', 'Poverty as a Challenge'] },
      { id: 'english', name: 'English Language & Lit', icon: '📚', chapters: ['Reported Speech Rules', 'Integrated Grammar', 'Poetic Devices', 'Analytical Writing'] },
    ],
  },
  {
    gradeNumber: 10,
    gradeLabel: 'Class 10',
    category: 'Secondary',
    description: 'Board Exam curriculum: Electricity, Light optics, Chemical reactions, Trigonometry, and Heredity.',
    subjects: [
      { id: 'science', name: 'Science (Board Level)', icon: '🔬', chapters: ['Chemical Reactions & Equations', 'Acids, Bases & Salts', 'Metals & Non-metals', 'Life Processes (Nutrition, Respiration)', 'Light: Reflection & Refraction', 'Electricity & Ohm’s Law', 'Magnetic Effects of Current'] },
      { id: 'math', name: 'Mathematics', icon: '📐', chapters: ['Real Numbers', 'Polynomials & Quadratic Equations', 'Arithmetic Progressions', 'Introduction to Trigonometry', 'Coordinate Geometry', 'Surface Areas & Volumes', 'Statistics & Probability'] },
      { id: 'social', name: 'Social Science', icon: '🗳️', chapters: ['Rise of Nationalism in Europe', 'Nationalism in India', 'Resources & Development', 'Power Sharing & Federalism', 'Money & Credit', 'Globalization'] },
      { id: 'english', name: 'English Communicative', icon: '📖', chapters: ['Tenses & Modals', 'Reported Statements & Questions', 'Formal Letter Writing', 'Literary Analysis'] },
    ],
  },

  // Senior Secondary (11 - 12)
  {
    gradeNumber: 11,
    gradeLabel: 'Class 11',
    category: 'Senior Secondary',
    description: 'Pre-university specialization in Science, Commerce, and Humanities.',
    subjects: [
      { id: 'physics', name: 'Physics', icon: '⚡', chapters: ['Units & Measurements', 'Kinematics & Vectors', 'Laws of Motion', 'Work, Energy & Power', 'Gravitation', 'Thermodynamics', 'Oscillations & Waves'] },
      { id: 'chemistry', name: 'Chemistry', icon: '⚗️', chapters: ['Some Basic Concepts of Chemistry', 'Structure of Atom', 'Chemical Bonding & Molecular Structure', 'Thermodynamics', 'Equilibrium', 'Organic Chemistry Basics'] },
      { id: 'math', name: 'Mathematics', icon: '∫', chapters: ['Sets & Relations', 'Trigonometric Functions', 'Complex Numbers', 'Permutations & Combinations', 'Limits & Derivatives', 'Probability'] },
      { id: 'biology', name: 'Biology', icon: '🧬', chapters: ['Diversity in the Living World', 'Cell Structure & Cell Cycle', 'Plant Physiology (Photosynthesis)', 'Human Physiology (Circulation, Excretion)'] },
      { id: 'commerce', name: 'Commerce & Economics', icon: '💼', chapters: ['Accountancy Principles & Ledger', 'Microeconomics (Consumer Equilibrium)', 'Business Forms of Organization'] },
      { id: 'humanities', name: 'Humanities & History', icon: '🗿', chapters: ['Early Societies & Writing', 'Nomadic Empires', 'Political Theory & Justice', 'Psychological Foundations'] },
    ],
  },
  {
    gradeNumber: 12,
    gradeLabel: 'Class 12',
    category: 'Senior Secondary',
    description: 'Senior board exams and entrance prep (Electrostatics, Organic Chem, Calculus, Genetics).',
    subjects: [
      { id: 'physics', name: 'Physics', icon: '🧲', chapters: ['Electrostatics & Gauss Law', 'Current Electricity & Kirchhoff Rules', 'Magnetism & Moving Charges', 'Electromagnetic Induction & AC', 'Optics (Wave & Ray)', 'Dual Nature & Atoms', 'Semiconductor Electronics'] },
      { id: 'chemistry', name: 'Chemistry', icon: '🧪', chapters: ['Solutions & Raoult’s Law', 'Electrochemistry & Nernst Equation', 'Chemical Kinetics', 'd- and f-Block Elements', 'Coordination Compounds', 'Haloalkanes & Haloarenes', 'Alcohols, Phenols & Ethers', 'Biomolecules'] },
      { id: 'math', name: 'Mathematics', icon: '∑', chapters: ['Relations & Functions', 'Matrices & Determinants', 'Continuity & Differentiability', 'Application of Derivatives', 'Integrals & Differential Equations', 'Vectors & 3D Geometry', 'Linear Programming', 'Probability Distributions'] },
      { id: 'biology', name: 'Biology', icon: '🧫', chapters: ['Reproduction in Organisms', 'Principles of Inheritance & Variation', 'Molecular Basis of Inheritance (DNA)', 'Biotechnology & Principles', 'Ecology, Biodiversity & Environment'] },
      { id: 'commerce', name: 'Commerce (Accountancy & Macro)', icon: '📊', chapters: ['Partnership Firms Accounting', 'Company Accounts (Shares & Debentures)', 'National Income Accounting', 'Money & Banking', 'Government Budget & Balance of Payments'] },
      { id: 'humanities', name: 'History & Political Science', icon: '📜', chapters: ['Harappan Archaeology & Kings', 'Colonialism & Partition of India', 'Cold War Era & Contemporary World Politics', 'Democracy & Social Movements'] },
    ],
  },
];

// Curated high quality syllabus questions by class & subject for immediate instant play
export const classSyllabusQuestions: Record<string, QuizQuestion[]> = {
  // Class 1 - Math
  'class-1-math': [
    {
      category: 'Class 1 • Mathematics',
      question: 'How many sides does a triangle have?',
      options: ['2', '3', '4', '5'],
      correct: 1,
      explanation: 'A triangle always has 3 straight sides and 3 corners (vertices).',
      deepThinking: {
        rationale: 'In basic planar geometry, "tri" means three. A triangle is the simplest closed polygon formed by connecting three non-collinear points with straight line segments.',
        distractorAnalysis: '2 sides cannot form a closed shape. 4 sides make a square or rectangle.',
        takeaway: 'Tri = 3 (Triangle, Tricycle).'
      }
    },
    {
      category: 'Class 1 • Mathematics',
      question: 'What is 5 + 4 equal to?',
      options: ['8', '9', '10', '7'],
      correct: 1,
      explanation: 'If you take 5 objects and add 4 more objects, you get 9 objects in total.',
      deepThinking: {
        rationale: 'Basic integer addition: 5 + 4 = 9. You can count forward 4 steps from 5 (6, 7, 8, 9).',
        distractorAnalysis: '8 is 5 + 3. 10 is 5 + 5. 7 is 5 + 2.',
        takeaway: 'Adding means putting quantities together into one sum.'
      }
    },
    {
      category: 'Class 1 • Mathematics',
      question: 'Which number comes right after 19?',
      options: ['18', '20', '21', '29'],
      correct: 1,
      explanation: 'In the counting sequence, 20 comes immediately after 19.',
      deepThinking: {
        rationale: '19 has 1 ten and 9 units. Adding 1 more unit completes a second ten, giving 2 tens (20).',
        distractorAnalysis: '18 comes before 19. 21 comes after 20.',
        takeaway: 'When units reach 9, the next count rolls over to the next decade number.'
      }
    },
  ],

  // Class 5 - Science
  'class-5-science': [
    {
      category: 'Class 5 • Science',
      question: 'Which gas do green plants absorb from the air during photosynthesis?',
      options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
      correct: 1,
      explanation: 'Plants take in carbon dioxide from the air and water from the soil to produce glucose and release oxygen.',
      deepThinking: {
        rationale: 'During photosynthesis, chlorophyll captures sunlight energy to convert carbon dioxide (CO2) and water (H2O) into chemical energy (glucose, C6H12O6). Oxygen is released as a byproduct.',
        distractorAnalysis: 'Oxygen is released by plants during the day, not absorbed for photosynthesis. Nitrogen makes up 78% of air but cannot be directly absorbed by leaves.',
        takeaway: 'Plants breathe in Carbon Dioxide to cook food, and give out Oxygen for animals to breathe.'
      }
    },
    {
      category: 'Class 5 • Science',
      question: 'Which vitamin is synthesized in our skin when exposed to sunlight?',
      options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'],
      correct: 2,
      explanation: 'Vitamin D is produced in the human body when skin absorbs ultraviolet rays from natural sunlight.',
      deepThinking: {
        rationale: 'Solar UVB rays convert 7-dehydrocholesterol in the skin epidermis into previtamin D3, which then undergoes thermal isomerization to vitamin D3 (cholecalciferol).',
        distractorAnalysis: 'Vitamin A is obtained from carrots and leafy greens. Vitamin C comes from citrus fruits. Vitamin K is synthesized by gut microbiota and green vegetables.',
        takeaway: 'Vitamin D is the "Sunshine Vitamin" crucial for calcium absorption and strong bones.'
      }
    },
    {
      category: 'Class 5 • Science',
      question: 'What type of simple machine is a pair of scissors?',
      options: ['Pulley', 'Lever', 'Wheel and Axle', 'Screw'],
      correct: 1,
      explanation: 'Scissors are a first-class double lever with the pivot (fulcrum) situated in the middle between the effort and the load.',
      deepThinking: {
        rationale: 'A first-class lever features the fulcrum between the applied effort (handles) and resistance load (blades cutting paper).',
        distractorAnalysis: 'Pulleys use grooved wheels with ropes. Screws are inclined planes wrapped around cylinders.',
        takeaway: 'In Class 1 levers: Effort — Fulcrum — Load.'
      }
    },
  ],

  // Class 8 - Science
  'class-8-science': [
    {
      category: 'Class 8 • Science',
      question: 'What is the SI unit of pressure?',
      options: ['Newton', 'Pascal', 'Joule', 'Watt'],
      correct: 1,
      explanation: 'Pressure is defined as force per unit area (P = F / A), and its SI unit is the Pascal (Pa), equivalent to 1 N/m².',
      deepThinking: {
        rationale: 'Named after French scientist Blaise Pascal, 1 Pascal equals one Newton of force applied uniformly over one square meter of surface area.',
        distractorAnalysis: 'Newton is the SI unit of force. Joule is the unit of work and energy. Watt is the unit of power (Joules per second).',
        takeaway: 'Pressure = Force ÷ Area. Reducing area increases pressure (why sharp knives cut better).'
      }
    },
    {
      category: 'Class 8 • Science',
      question: 'Which part of the eukaryotic cell is responsible for protein synthesis?',
      options: ['Golgi apparatus', 'Ribosomes', 'Lysosomes', 'Vacuoles'],
      correct: 1,
      explanation: 'Ribosomes read messenger RNA (mRNA) sequences and translate them into polypeptide chains (proteins).',
      deepThinking: {
        rationale: 'Ribosomes are ribonucleoprotein complexes consisting of rRNA and proteins that catalyze translation in both free cytoplasm and on the rough endoplasmic reticulum.',
        distractorAnalysis: 'Golgi apparatus modifies and packages proteins. Lysosomes contain digestive enzymes (suicide bags). Vacuoles store water and solutes.',
        takeaway: 'Ribosomes are the microscopic protein factories of the cell.'
      }
    },
  ],

  // Class 10 - Science (Board level)
  'class-10-science': [
    {
      category: 'Class 10 • Science (Board Exam)',
      question: 'According to Ohm\'s Law, what is the relationship between voltage (V) and current (I) across a conductor at constant temperature?',
      options: ['V is inversely proportional to I', 'V is directly proportional to I', 'V is proportional to I²', 'V is independent of I'],
      correct: 1,
      explanation: 'Ohm\'s Law states that electric current flowing through a conductor is directly proportional to the potential difference applied across its ends (V = I·R) at constant temperature.',
      deepThinking: {
        rationale: 'Formulated by Georg Simon Ohm in 1827: V ∝ I ⇒ V = I·R, where the constant of proportionality R is the electrical resistance of the ohmic conductor.',
        distractorAnalysis: 'Power is proportional to I² (P = I²R), but potential difference V scales linearly with current I.',
        takeaway: 'V = I × R is the foundational equation for all linear DC electric circuits.'
      }
    },
    {
      category: 'Class 10 • Science (Board Exam)',
      question: 'What type of chemical reaction is represented by: 2Mg + O₂ → 2MgO?',
      options: ['Decomposition reaction', 'Combination reaction', 'Displacement reaction', 'Double displacement reaction'],
      correct: 1,
      explanation: 'Two reactants (Magnesium and Oxygen) combine to form a single product (Magnesium Oxide), which defines a combination reaction.',
      deepThinking: {
        rationale: 'A combination (synthesis) reaction has the general form A + B → AB. Here, elemental magnesium undergoes vigorous exothermic oxidation in oxygen gas to yield white magnesium oxide powder.',
        distractorAnalysis: 'Decomposition breaks one reactant into multiple products (AB → A + B). Displacement swaps one element in a compound.',
        takeaway: 'Two or more reactants yielding one single product = Combination Reaction.'
      }
    },
    {
      category: 'Class 10 • Science (Board Exam)',
      question: 'Where does the complete digestion of carbohydrates, proteins, and fats take place in the human alimentary canal?',
      options: ['Stomach', 'Small Intestine', 'Large Intestine', 'Esophagus'],
      correct: 1,
      explanation: 'The small intestine (specifically the duodenum and ileum) receives bile, pancreatic juice, and intestinal juice to finalize digestion and nutrient absorption.',
      deepThinking: {
        rationale: 'Pancreatic amylase, trypsin, and lipase, along with bile salts for emulsification and intestinal succus entericus, degrade macronutrients into glucose, amino acids, and fatty acids/glycerol in the small intestine.',
        distractorAnalysis: 'The stomach only initiates protein digestion via pepsin and acid. The large intestine primarily absorbs excess water and minerals.',
        takeaway: 'The small intestine is the master organ for complete chemical digestion and villi-mediated absorption.'
      }
    },
  ],

  // Class 10 - Mathematics
  'class-10-math': [
    {
      category: 'Class 10 • Mathematics',
      question: 'What is the discriminant (D) of the quadratic equation ax² + bx + c = 0?',
      options: ['b² + 4ac', 'b² - 4ac', '√(b² - 4ac)', '2a / b'],
      correct: 1,
      explanation: 'The discriminant is D = b² - 4ac. It determines the nature of the roots (real & distinct if D > 0, real & equal if D = 0, no real roots if D < 0).',
      deepThinking: {
        rationale: 'In the quadratic formula x = (-b ± √(b² - 4ac)) / (2a), the expression under the square root governs whether roots are real or complex conjugate pairs.',
        distractorAnalysis: 'b² + 4ac has the wrong sign. The square root √(b² - 4ac) is the radical term itself, but the discriminant value itself is defined as b² - 4ac.',
        takeaway: 'D = b² - 4ac determines root nature before solving.'
      }
    },
    {
      category: 'Class 10 • Mathematics',
      question: 'What is the value of sin²(θ) + cos²(θ) for any real angle θ?',
      options: ['0', '1', '-1', 'tan(θ)'],
      correct: 1,
      explanation: 'sin²(θ) + cos²(θ) = 1 is the fundamental Pythagorean trigonometric identity derived directly from a right triangle with hypotenuse 1.',
      deepThinking: {
        rationale: 'On a unit circle centered at the origin, any point (x, y) = (cos θ, sin θ). By the Pythagorean theorem, x² + y² = 1, hence cos²(θ) + sin²(θ) = 1.',
        distractorAnalysis: '0 is sin(0). tan(θ) is sin(θ)/cos(θ).',
        takeaway: 'sin²(θ) + cos²(θ) = 1 holds true unconditionally for all angles.'
      }
    },
  ],

  // Class 12 - Physics
  'class-12-physics': [
    {
      category: 'Class 12 • Physics (CBSE / Entrance)',
      question: 'According to Gauss\'s Law in electrostatics, the total electric flux through any closed Gaussian surface enclosing charge q is:',
      options: ['q · ε₀', 'q / ε₀', 'ε₀ / q', 'q / (4πε₀)'],
      correct: 1,
      explanation: 'Gauss\'s Law states that ∮ E · dA = q_enclosed / ε₀, where ε₀ is the permittivity of free space.',
      deepThinking: {
        rationale: 'Gauss\'s Law is one of Maxwell\'s four foundational equations. It relates the divergence of the electric field to localized charge density via the divergence theorem.',
        distractorAnalysis: 'q · ε₀ inverts the permittivity units. q / (4πε₀) is missing the r² spatial factor from Coulomb field expressions.',
        takeaway: 'Total flux out of a closed surface depends solely on the net enclosed charge divided by ε₀.'
      }
    },
    {
      category: 'Class 12 • Physics (CBSE / Entrance)',
      question: 'What happens to the de Broglie wavelength of an electron if its kinetic energy is quadrupled (increased by 4 times)?',
      options: ['It is doubled', 'It is halved', 'It quadruples', 'It remains unchanged'],
      correct: 1,
      explanation: 'Since λ = h / p and kinetic energy K = p² / (2m), λ = h / √(2mK). Increasing K by 4 reduces the wavelength by a factor of √4 = 2 (halved).',
      deepThinking: {
        rationale: 'de Broglie wavelength λ scales inversely with the square root of kinetic energy: λ ∝ 1 / √K. If K\' = 4K, then λ\' = λ / √4 = λ / 2.',
        distractorAnalysis: 'Linear intuition might suggest dividing by 4, but momentum p depends on the square root of kinetic energy.',
        takeaway: 'λ ∝ 1 / √K for non-relativistic quantum particles.'
      }
    },
  ],

  // Class 12 - Chemistry
  'class-12-chemistry': [
    {
      category: 'Class 12 • Chemistry',
      question: 'Which equation relates the cell potential (E_cell) to the standard potential (E°_cell) and reaction quotient (Q)?',
      options: ['Arrhenius Equation', 'Nernst Equation', 'Gibbs-Helmholtz Equation', 'Henderson-Hasselbalch Equation'],
      correct: 1,
      explanation: 'The Nernst equation is E_cell = E°_cell - (RT / nF) · ln(Q), allowing calculation of electrochemical cell potential under non-standard concentrations.',
      deepThinking: {
        rationale: 'Derived from thermodynamics ΔG = ΔG° + RT·ln(Q). Substituting ΔG = -nFE gives the exact Nernst equation.',
        distractorAnalysis: 'Arrhenius relates rate constant k to temperature. Henderson-Hasselbalch calculates buffer pH.',
        takeaway: 'Nernst equation links chemical thermodynamics with non-equilibrium electrical potentials.'
      }
    },
  ],
};

// Merge in full 15-question sets for all classes and subjects
Object.assign(classSyllabusQuestions, allGradeQuestionBanks);

export function shuffleAndRandomizeQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  if (!questions || questions.length === 0) return [];
  const cloned = questions.map((q) => ({
    ...q,
    options: [...q.options],
    optionsHindi: q.optionsHindi ? [...q.optionsHindi] : undefined,
    deepThinking: q.deepThinking ? { ...q.deepThinking } : undefined,
  }));

  // Fisher-Yates shuffle question sequence
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }

  // Shuffle options A, B, C, D and recalculate correct index
  return cloned.map((q) => {
    const indices = [0, 1, 2, 3].slice(0, q.options.length);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const newOptions = indices.map((idx) => q.options[idx]);
    const optsHindi = q.optionsHindi;
    const newOptionsHindi = optsHindi ? indices.map((idx) => optsHindi[idx]) : undefined;
    const newCorrect = indices.indexOf(q.correct);
    return {
      ...q,
      options: newOptions,
      optionsHindi: newOptionsHindi,
      correct: newCorrect !== -1 ? newCorrect : q.correct,
    };
  });
}

export function getSyllabusQuestionsForClassSubject(
  gradeNumber: number,
  subjectId: string,
  chapter?: string,
  attemptNumber: number = 1
): QuizQuestion[] {
  // If specific chapter is requested, generate fresh chapter-specific questions
  if (chapter && chapter.trim().length > 0) {
    const chapterQuestions = generateChapterQuestions(
      `Class ${gradeNumber}`,
      subjectId,
      chapter,
      attemptNumber
    );
    if (chapterQuestions && chapterQuestions.length >= 10) {
      return shuffleAndRandomizeQuestions(chapterQuestions);
    }
  }

  const directKey = `class-${gradeNumber}-${subjectId}`;
  let baseQuestions: QuizQuestion[] = [];

  if (classSyllabusQuestions[directKey] && classSyllabusQuestions[directKey].length >= 15) {
    baseQuestions = classSyllabusQuestions[directKey];
  } else {
    // Graceful grade-appropriate fallback mapping
    let fallbackKey = 'class-10-science';
    if (gradeNumber <= 3) {
      fallbackKey = subjectId.includes('math') ? 'class-1-math' : 'class-1-evs';
    } else if (gradeNumber <= 5) {
      fallbackKey = subjectId.includes('math') ? 'class-5-math' : 'class-5-science';
    } else if (gradeNumber <= 8) {
      fallbackKey = subjectId.includes('math') ? 'class-5-math' : 'class-8-science';
    } else if (gradeNumber <= 10) {
      fallbackKey = subjectId.includes('math') ? 'class-10-math' : 'class-10-science';
    } else {
      // 11 or 12
      if (subjectId.includes('chem')) fallbackKey = 'class-12-chemistry';
      else if (subjectId.includes('math')) fallbackKey = 'class-10-math';
      else fallbackKey = 'class-12-physics';
    }

    const fallbackList = classSyllabusQuestions[fallbackKey] || classSyllabusQuestions['class-10-science'] || [];
    baseQuestions = fallbackList.map((q) => ({
      ...q,
      category: `Class ${gradeNumber} • ${subjectId.toUpperCase()}`,
    }));
  }

  // Shuffle and randomize questions & option orders dynamically
  return shuffleAndRandomizeQuestions(baseQuestions);
}

