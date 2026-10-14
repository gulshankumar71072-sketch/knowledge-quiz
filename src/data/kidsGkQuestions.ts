import { QuizQuestion } from '../types';

export interface MindSharpenerTheme {
  id: string;
  name: string;
  nameHindi: string;
  icon: string;
  description: string;
  badge: string;
}

export const mindSharpenerThemes: MindSharpenerTheme[] = [
  {
    id: 'all',
    name: 'All-Round Mind Sharpener Mix',
    nameHindi: 'सम्पूर्ण दिमागी कसरत (मिक्स)',
    icon: '🧠',
    description: 'A super mix of brain teasers, space curiosities, world trivia, logic riddles, and science wonders.',
    badge: 'Ultimate IQ Challenge'
  },
  {
    id: 'brain-teasers',
    name: 'Brain Teasers & Logic Riddles',
    nameHindi: 'तर्कशक्ति और दिमागी पहेलियां',
    icon: '🧩',
    description: 'Tricky riddles and logic puzzles to train critical thinking and lateral problem solving.',
    badge: 'Sharp Logic'
  },
  {
    id: 'space',
    name: 'Space, Planets & Universe',
    nameHindi: 'अंतरिक्ष और ब्रह्मांड की सैर',
    icon: '🚀',
    description: 'Fascinating facts about our solar system, astronauts, stars, and galaxies.',
    badge: 'Cosmic Knowledge'
  },
  {
    id: 'world',
    name: 'World Wonders & Geography',
    nameHindi: 'विश्व दर्शन और भूगोल',
    icon: '🌍',
    description: 'Continents, oceans, famous monuments, natural wonders, and world capitals.',
    badge: 'Global Explorer'
  },
  {
    id: 'wildlife',
    name: 'Animals & Nature Superpowers',
    nameHindi: 'रोचक जीव-जंतु और प्रकृति',
    icon: '🦁',
    description: 'Incredible adaptations, animal superpowers, and nature secrets that amaze children.',
    badge: 'Nature Expert'
  },
  {
    id: 'india',
    name: 'Incredible India & Great Heroes',
    nameHindi: 'हमारा भारत और महान नायक',
    icon: '🇮🇳',
    description: 'National symbols, freedom heroes, visionary scientists, and rich heritage of India.',
    badge: 'Proud Indian'
  },
  {
    id: 'math',
    name: 'Speed Mental Math & Number Magic',
    nameHindi: 'तेज गणित और नंबर पहेलियां',
    icon: '⚡',
    description: 'Quick mental math puzzles, clever number patterns, and brain workouts.',
    badge: 'Math Wizard'
  },
  {
    id: 'science',
    name: 'Everyday Science & Smart Inventions',
    nameHindi: 'दैनिक विज्ञान और आविष्कार',
    icon: '💡',
    description: 'Why things work, famous inventors, and scientific wonders all around us.',
    badge: 'Young Scientist'
  }
];

export const kidsGkQuestionsBank: QuizQuestion[] = [
  // ==========================================
  // 1. BRAIN TEASERS & LOGIC RIDDLES (🧩)
  // ==========================================
  {
    category: 'Brain Teasers & Logic',
    question: 'If you have 5 apples in a basket and you take away 3 apples, how many apples do YOU have?',
    questionHindi: 'यदि एक टोकरी में 5 सेब हैं और आप उनमें से 3 सेब निकाल लेते हैं, तो आपके पास कितने सेब हैं?',
    options: ['3 apples', '2 apples', '5 apples', '0 apples'],
    optionsHindi: ['3 सेब', '2 सेब', '5 सेब', '0 सेब'],
    correct: 0,
    explanation: 'You took 3 apples, so YOU have 3 apples! The basket is left with 2 apples.',
    explanationHindi: 'आपने 3 सेब निकाले, इसलिए आपके पास 3 सेब हैं! टोकरी में 2 सेब बचे हैं।',
    deepThinking: {
      rationale: 'This riddle tests careful reading. The question asks how many apples YOU have (the ones you took), not how many remain in the basket.',
      distractorAnalysis: '2 apples is the number remaining in the basket, which is the common trap answer.',
      takeaway: 'Always read logic questions carefully to identify the exact subject being asked about.'
    }
  },
  {
    category: 'Brain Teasers & Logic',
    question: 'Which is heavier: 1 kilogram of iron or 1 kilogram of cotton feathers?',
    questionHindi: 'कौन सा अधिक भारी है: 1 किलोग्राम लोहा या 1 किलोग्राम रुई (कपास)?',
    options: ['Both weigh exactly the same (1 kg)', '1 kg of iron', '1 kg of cotton feathers', 'Depends on gravity'],
    optionsHindi: ['दोनों का वजन बिल्कुल बराबर (1 किग्रा) है', '1 किग्रा लोहा', '1 किग्रा रुई', 'गुरुत्वाकर्षण पर निर्भर करता है'],
    correct: 0,
    explanation: 'Both weigh exactly 1 kilogram! Although iron is much denser and takes up less space, 1 kg is 1 kg.',
    explanationHindi: 'दोनों का वजन ठीक 1 किलोग्राम ही है! यद्यपि लोहा अधिक घना होता है, पर दोनों का द्रव्यमान 1 किग्रा ही है।',
    deepThinking: {
      rationale: 'Mass is an absolute measure of matter. One kilogram is equal to one kilogram regardless of volume or density.',
      distractorAnalysis: 'People confuse density (compactness) with mass (total weight).',
      takeaway: 'Density affects volume, but mass defines weight. 1 kg always equals 1 kg.'
    }
  },
  {
    category: 'Brain Teasers & Logic',
    question: 'What gets wetter and wetter the more it dries?',
    questionHindi: 'वह कौन सी चीज है जो जितना अधिक सुखाती है, उतनी ही अधिक गीली होती जाती है?',
    options: ['A towel', 'A sponge', 'The Sun', 'An umbrella'],
    optionsHindi: ['तौलिया (Towel)', 'स्पंज (Sponge)', 'सूर्य (Sun)', 'छाता (Umbrella)'],
    correct: 0,
    explanation: 'A towel absorbs water to dry your body, which makes the towel itself wetter!',
    explanationHindi: 'तौलिया जब आपके शरीर को सुखाता है, तो वह पानी सोखकर खुद गीला हो जाता है!',
    deepThinking: {
      rationale: 'This classic lateral-thinking riddle plays on the dual meaning of "drying" (acting as a drying agent vs. becoming dry).',
      distractorAnalysis: 'Sponges hold water, but towels are specifically designed for drying things while getting wet.',
      takeaway: 'Lateral thinking looks at actions from both the giver and receiver perspective.'
    }
  },
  {
    category: 'Brain Teasers & Logic',
    question: 'Mary’s father has 5 daughters: Nana, Nene, Nini, and Nono. What is the name of the fifth daughter?',
    questionHindi: 'मैरी (Mary) के पिता की 5 बेटियां हैं: नाना, नेने, नीनी और नोनो। पांचवीं बेटी का नाम क्या है?',
    options: ['Mary', 'Nunu', 'Nina', 'Nora'],
    optionsHindi: ['मैरी (Mary)', 'नूनू (Nunu)', 'नीना (Nina)', 'नोरा (Nora)'],
    correct: 0,
    explanation: 'The fifth daughter is Mary! The riddle starts by saying "Mary\'s father has 5 daughters".',
    explanationHindi: 'पांचवीं बेटी का नाम मैरी (Mary) है! पहेली की पहली पंक्ति में ही कहा गया है कि "मैरी के पिता की 5 बेटियां हैं"।',
    deepThinking: {
      rationale: 'Our brains look for vowel patterns (A, E, I, O -> U) and anticipate "Nunu", but the prompt explicitly states whose father it is: Mary!',
      distractorAnalysis: 'Nunu is the phonetic trap based on the vowel sequence A-E-I-O-U.',
      takeaway: 'Do not let pattern-matching blind you to explicitly stated facts.'
    }
  },
  {
    category: 'Brain Teasers & Logic',
    question: 'What has a face and two hands, but no arms or legs?',
    questionHindi: 'किसके पास एक चेहरा (Face) और दो हाथ (Hands) होते हैं, लेकिन कोई पैर या बाजू नहीं होते?',
    options: ['A clock', 'A coin', 'A doll', 'A robot'],
    optionsHindi: ['दीवार घड़ी (Clock)', 'सिक्का (Coin)', 'गुड़िया (Doll)', 'रोबोट (Robot)'],
    correct: 0,
    explanation: 'A clock has a clock face (dial) and an hour hand and minute hand, but no arms or legs!',
    explanationHindi: 'घड़ी का एक डायल (चेहरा) होता है और घंटे व मिनट की दो सुइयां (हाथ) होती हैं!',
    deepThinking: {
      rationale: 'Anthropomorphic vocabulary (face, hands) is commonly used to describe mechanical objects.',
      distractorAnalysis: 'A coin has heads/tails (a face), but no hands.',
      takeaway: 'Language metaphors often give everyday instruments human features.'
    }
  },
  {
    category: 'Brain Teasers & Logic',
    question: 'A doctor gives you 3 pills and tells you to take one every 30 minutes. How long will the pills last?',
    questionHindi: 'एक डॉक्टर आपको 3 गोलियां देता है और हर 30 मिनट में एक गोली लेने को कहता है। गोलियां कितने समय तक चलेंगी?',
    options: ['60 minutes (1 hour)', '90 minutes (1.5 hours)', '30 minutes', '120 minutes (2 hours)'],
    optionsHindi: ['60 मिनट (1 घंटा)', '90 मिनट (1.5 घंटे)', '30 मिनट', '120 मिनट (2 घंटे)'],
    correct: 0,
    explanation: 'You take the 1st pill immediately (0 min), the 2nd pill at 30 min, and the 3rd pill at 60 min. Total time is 60 minutes (1 hour)!',
    explanationHindi: 'पहली गोली तुरंत (0 मिनट पर), दूसरी 30 मिनट पर, और तीसरी 60 मिनट पर ली जाएगी। कुल समय 60 मिनट (1 घंटा) हुआ!',
    deepThinking: {
      rationale: 'Interval math: 3 events have only 2 intervals between them (3 - 1 = 2 intervals of 30 min = 60 min).',
      distractorAnalysis: 'People mistakenly multiply 3 × 30 = 90 minutes without realizing the first pill is taken at time zero.',
      takeaway: 'In sequential events, the number of intervals is always one less than the number of items.'
    }
  },

  // ==========================================
  // 2. SPACE & UNIVERSE CURIOSITIES (🚀)
  // ==========================================
  {
    category: 'Space & Universe',
    question: 'Which planet in our solar system is the hottest, even though it is not closest to the Sun?',
    questionHindi: 'हमारे सौर मंडल का सबसे गर्म ग्रह कौन सा है, भले ही वह सूर्य के सबसे करीब न हो?',
    options: ['Venus', 'Mercury', 'Mars', 'Jupiter'],
    optionsHindi: ['शुक्र (Venus)', 'बुध (Mercury)', 'मंगल (Mars)', 'बृहस्पति (Jupiter)'],
    correct: 0,
    explanation: 'Venus is the hottest planet (around 465°C / 870°F) because of its dense atmosphere made of 96% carbon dioxide, creating a runaway greenhouse effect!',
    explanationHindi: 'शुक्र सबसे गर्म ग्रह है (लगभग 465°C) क्योंकि इसके घने वायुमंडल में 96% कार्बन डाइऑक्साइड है, जो भीषण ग्रीनहाउस प्रभाव पैदा करती है!',
    deepThinking: {
      rationale: 'While Mercury is closer to the Sun, it has virtually no atmosphere to trap heat. Venus has an ultra-thick CO2 atmosphere with sulfuric acid clouds.',
      distractorAnalysis: 'Mercury is the closest planet, which makes it the most common guess, but its night side drops to -180°C.',
      takeaway: 'Atmospheric composition and greenhouse gases can warm a planet far more than proximity to a star alone.'
    }
  },
  {
    category: 'Space & Universe',
    question: 'How long does sunlight take to travel through space and reach the surface of Earth?',
    questionHindi: 'सूर्य के प्रकाश को अंतरिक्ष से पृथ्वी की सतह तक पहुँचने में लगभग कितना समय लगता है?',
    options: ['About 8 minutes and 20 seconds', 'Instantaneously (0 seconds)', '1 hour', '24 hours'],
    optionsHindi: ['लगभग 8 मिनट 20 सेकंड', 'तुरंत (0 सेकंड)', '1 घंटा', '24 घंटे'],
    correct: 0,
    explanation: 'Sunlight travels at 300,000 km/s and covers the 150 million kilometers between the Sun and Earth in approximately 8 minutes and 20 seconds (500 seconds).',
    explanationHindi: 'प्रकाश 3 लाख किमी/सेकंड की गति से चलता है और सूर्य से पृथ्वी की 15 करोड़ किमी दूरी तय करने में लगभग 8 मिनट 20 सेकंड लेता है।',
    deepThinking: {
      rationale: 'Time = Distance / Speed. 149,600,000 km / 299,792 km/s ≈ 499 seconds ≈ 8 minutes 19 seconds.',
      distractorAnalysis: 'Many assume light is instantaneous because it appears instantaneous over human terrestrial distances.',
      takeaway: 'Whenever you look at daylight, you are seeing the Sun as it looked over 8 minutes ago.'
    }
  },
  {
    category: 'Space & Universe',
    question: 'What is the name of our spiral galaxy that contains our Solar System and billions of stars?',
    questionHindi: 'हमारी सर्पिलाकार आकाशगंगा का क्या नाम है जिसमें हमारा सौर मंडल और अरबों तारे स्थित हैं?',
    options: ['Milky Way (आकाशगंगा)', 'Andromeda', 'Whirlpool Galaxy', 'Sombrero Galaxy'],
    optionsHindi: ['मिल्की वे (आकाशगंगा)', 'एंड्रोमेडा', 'व्हर्लपूल गैलेक्सी', 'सोम्ब्रेरो गैलेक्सी'],
    correct: 0,
    explanation: 'We live in the Milky Way galaxy, named for the milky band of stars that stretches across a dark night sky.',
    explanationHindi: 'हम मिल्की वे (आकाशगंगा) में रहते हैं, जो रात के साफ आसमान में दूधिया नदी की तरह दिखाई देती है।',
    deepThinking: {
      rationale: 'The Milky Way is a barred spiral galaxy spanning about 100,000 light-years in diameter with over 100 billion stars.',
      distractorAnalysis: 'Andromeda is our nearest large galactic neighbor (2.5 million light-years away).',
      takeaway: 'Our Sun is just one medium star among over 100 billion stars in the Milky Way.'
    }
  },
  {
    category: 'Space & Universe',
    question: 'Who was the first human being to step foot on the surface of the Moon in July 1969?',
    questionHindi: 'जुलाई 1969 में चंद्रमा की सतह पर कदम रखने वाले पहले मानव कौन थे?',
    options: ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'Rakesh Sharma'],
    optionsHindi: ['नील आर्मस्ट्रांग (Neil Armstrong)', 'बज एल्ड्रिन (Buzz Aldrin)', 'यूरी गगारिन (Yuri Gagarin)', 'राकेश शर्मा (Rakesh Sharma)'],
    correct: 0,
    explanation: 'Neil Armstrong stepped onto the lunar surface from Apollo 11 on July 20, 1969, saying "That\'s one small step for man, one giant leap for mankind."',
    explanationHindi: 'नील आर्मस्ट्रांग ने 20 जुलाई 1969 को अपोलो 11 से चंद्रमा पर कदम रखा और कहा "मनुष्य के लिए यह छोटा कदम, मानव जाति के लिए विशाल छलांग है।"',
    deepThinking: {
      rationale: 'Armstrong was the commander of Apollo 11. Buzz Aldrin stepped out 19 minutes later.',
      distractorAnalysis: 'Yuri Gagarin was the first human in space (1961). Rakesh Sharma was the first Indian citizen in space (1984).',
      takeaway: 'Neil Armstrong was first on the Moon; Buzz Aldrin was second; Michael Collins piloted the command module in orbit.'
    }
  },
  {
    category: 'Space & Universe',
    question: 'What natural phenomenon creates day and night on Earth?',
    questionHindi: 'पृथ्वी पर दिन और रात किस प्राकृतिक प्रक्रिया के कारण होते हैं?',
    options: ['Earth rotating on its own axis', 'Earth revolving around the Sun', 'The Moon blocking the Sun', 'Sun turning off at night'],
    optionsHindi: ['पृथ्वी का अपनी धुरी पर घूमना (घूर्णन)', 'पृथ्वी का सूर्य के चारों ओर परिक्रमा करना', 'चंद्रमा द्वारा सूर्य को ढकना', 'रात में सूर्य का बंद होना'],
    correct: 0,
    explanation: 'Earth rotates on its axis once every 24 hours. The side facing the Sun experiences day, while the side facing away experiences night.',
    explanationHindi: 'पृथ्वी अपनी धुरी पर 24 घंटे में एक पूरा चक्कर लगाती है। जो भाग सूर्य के सामने होता है वहां दिन और विपरीत भाग में रात होती है।',
    deepThinking: {
      rationale: 'Rotation (spinning on axis) takes 24 hours and causes day/night. Revolution (orbiting the Sun) takes 365.25 days and causes seasons.',
      distractorAnalysis: 'Revolution causes the change of seasons and years, not day/night.',
      takeaway: 'Rotation = Day & Night (24 hours). Revolution = Seasons & Year (365 days).'
    }
  },

  // ==========================================
  // 3. WORLD WONDERS & GEOGRAPHY (🌍)
  // ==========================================
  {
    category: 'World Wonders & Geography',
    question: 'Which is the largest and deepest ocean on Earth, covering more area than all the land combined?',
    questionHindi: 'पृथ्वी पर सबसे बड़ा और गहरा महासागर कौन सा है, जो पूरी पृथ्वी की सभी भूमियों से भी बड़ा है?',
    options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
    optionsHindi: ['प्रशांत महासागर (Pacific Ocean)', 'अटलांटिक महासागर', 'हिंद महासागर (Indian Ocean)', 'आर्कटिक महासागर'],
    correct: 0,
    explanation: 'The Pacific Ocean is the largest ocean, covering over 30% of Earth\'s total surface, and houses the deepest point on Earth: the Mariana Trench (11,000 meters deep)!',
    explanationHindi: 'प्रशांत महासागर पृथ्वी का 30% से अधिक हिस्सा ढकता है और इसमें पृथ्वी का सबसे गहरा स्थान मेरियाना ट्रेंच (11,000 मीटर) मौजूद है!',
    deepThinking: {
      rationale: 'The Pacific Ocean spans 165 million sq km, easily fitting all seven continents inside its boundary.',
      distractorAnalysis: 'The Atlantic is second largest; the Indian Ocean is third; the Arctic is the smallest and shallowest.',
      takeaway: 'Pacific Ocean = Largest & Deepest (Mariana Trench: ~11 km deep).'
    }
  },
  {
    category: 'World Wonders & Geography',
    question: 'Mount Everest, the highest mountain peak above sea level on Earth, is situated in which mountain range?',
    questionHindi: 'माउंट एवरेस्ट, जो समुद्र तल से पृथ्वी की सबसे ऊंची चोटी है, किस पर्वत श्रृंखला में स्थित है?',
    options: ['Himalayas', 'Alps', 'Andes', 'Rockies'],
    optionsHindi: ['हिमालय (Himalayas)', 'आल्प्स (Alps)', 'एंडीज (Andes)', 'रॉकी पर्वत (Rockies)'],
    correct: 0,
    explanation: 'Mount Everest (8,848.86 meters tall) is located in the Himalayas on the border between Nepal and Tibet (China).',
    explanationHindi: 'माउंट एवरेस्ट (8,848.86 मीटर ऊंचा) नेपाल और तिब्बत की सीमा पर हिमालय पर्वतमाला में स्थित है।',
    deepThinking: {
      rationale: 'The Himalayas were formed by the tectonic collision between the Indian Plate and Eurasian Plate, a process still actively lifting the peaks today.',
      distractorAnalysis: 'The Andes is the longest continental mountain range, but the Himalayas have the highest peaks.',
      takeaway: 'Himalayas = Highest peaks (Everest, K2, Kanchenjunga). Andes = Longest mountain range.'
    }
  },
  {
    category: 'World Wonders & Geography',
    question: 'Which country is widely known as the "Land of the Rising Sun"?',
    questionHindi: 'किस देश को "उगते सूरज की भूमि" (Land of the Rising Sun) के नाम से जाना जाता है?',
    options: ['Japan', 'China', 'Norway', 'Australia'],
    optionsHindi: ['जापान (Japan)', 'चीन (China)', 'नॉर्वे (Norway)', 'ऑस्ट्रेलिया (Australia)'],
    correct: 0,
    explanation: 'Japan is called "Nippon" or "Nihon" in Japanese, which translates to "origin of the sun", because it lies to the extreme east of the Asian continent.',
    explanationHindi: 'जापान को जापानी में "निप्पॉन" (Nippon) कहा जाता है जिसका अर्थ "सूर्य की उत्पत्ति" है, क्योंकि यह एशियाई मुख्यभूमि के पूर्व में स्थित है।',
    deepThinking: {
      rationale: 'Historically, from the perspective of China and mainland Asia, the Sun appeared to rise directly from the direction of the Japanese islands.',
      distractorAnalysis: 'Norway is known as the "Land of the Midnight Sun" because the sun does not set there during midsummer.',
      takeaway: 'Japan = Land of the Rising Sun. Norway = Land of the Midnight Sun.'
    }
  },
  {
    category: 'World Wonders & Geography',
    question: 'Which is the longest river in the world, flowing through 11 African countries into the Mediterranean Sea?',
    questionHindi: 'विश्व की सबसे लंबी नदी कौन सी है, जो 11 अफ्रीकी देशों से बहते हुए भूमध्य सागर में गिरती है?',
    options: ['Nile River', 'Amazon River', 'Ganga River', 'Yangtze River'],
    optionsHindi: ['नील नदी (Nile River)', 'अमेज़न नदी (Amazon River)', 'गंगा नदी (Ganga River)', 'यांग्त्से नदी (Yangtze River)'],
    correct: 0,
    explanation: 'The Nile River in Africa is the longest river in the world, stretching approximately 6,650 kilometers (4,132 miles).',
    explanationHindi: 'अफ्रीका की नील नदी लगभग 6,650 किलोमीटर की लंबाई के साथ दुनिया की सबसे लंबी नदी है।',
    deepThinking: {
      rationale: 'The Nile holds the title for longest total length (~6,650 km), whereas the Amazon River holds the title for greatest water volume and widest basin.',
      distractorAnalysis: 'The Amazon River carries more water than any other river, but the Nile is traditionally measured as the longest.',
      takeaway: 'Nile = Longest River. Amazon = Largest by Water Volume.'
    }
  },

  // ==========================================
  // 4. WILDLIFE & NATURE SUPERPOWERS (🦁)
  // ==========================================
  {
    category: 'Wildlife & Nature',
    question: 'Which creature is the largest living animal to ever exist on planet Earth—even bigger than any dinosaur?',
    questionHindi: 'पृथ्वी पर अब तक का सबसे बड़ा जीवित प्राणी कौन सा है—जो किसी भी डायनासोर से भी बड़ा है?',
    options: ['Blue Whale', 'African Elephant', 'Giraffe', 'Megalodon Shark'],
    optionsHindi: ['नीली व्हेल (Blue Whale)', 'अफ्रीकी हाथी (African Elephant)', 'जिराफ (Giraffe)', 'मेगालोडोन शार्क'],
    correct: 0,
    explanation: 'The Blue Whale can grow up to 30 meters (100 feet) long and weigh up to 200 tons! Its tongue alone weighs as much as an entire adult elephant!',
    explanationHindi: 'नीली व्हेल 30 मीटर तक लंबी और 200 टन वजनी हो सकती है! केवल इसकी जीभ का वजन एक वयस्क हाथी के बराबर होता है!',
    deepThinking: {
      rationale: 'Buoyancy in water allows marine animals to support immense body mass without collapsing under gravity, allowing the blue whale to exceed even the largest sauropod dinosaurs.',
      distractorAnalysis: 'The African Elephant is the largest living land animal, but the Blue Whale is vastly larger.',
      takeaway: 'Blue Whale = Largest animal ever on Earth (up to 200 tons). African Elephant = Largest land animal.'
    }
  },
  {
    category: 'Wildlife & Nature',
    question: 'How many hearts does an octopus have to pump blue blood throughout its body?',
    questionHindi: 'ऑक्टोपस के शरीर में नीले रंग का खून पंप करने के लिए कितने दिल (Hearts) होते हैं?',
    options: ['3 hearts', '1 heart', '2 hearts', '4 hearts'],
    optionsHindi: ['3 दिल (3 Hearts)', '1 दिल', '2 दिल', '4 दिल'],
    correct: 0,
    explanation: 'An octopus has 3 hearts! Two pump blood through its gills to gather oxygen, and the third pumps oxygenated blood through the rest of the body.',
    explanationHindi: 'ऑक्टोपस के 3 दिल होते हैं! दो दिल गलफड़ों (Gills) में खून पंप करते हैं और तीसरा दिल पूरे शरीर में खून पहुंचाता है।',
    deepThinking: {
      rationale: 'Octopus blood uses copper-rich hemocyanin (which looks blue), which is less efficient at carrying oxygen in cold water than iron-rich hemoglobin, requiring three hearts to maintain circulation.',
      distractorAnalysis: 'Humans and most vertebrates have a single 4-chambered heart.',
      takeaway: 'Octopuses have 3 hearts, 9 brains (one central + one in each arm), and blue blood!'
    }
  },
  {
    category: 'Wildlife & Nature',
    question: 'What is the only mammal on Earth capable of true, powered flight like a bird?',
    questionHindi: 'पृथ्वी पर एकमात्र ऐसा स्तनपायी (Mammal) जीव कौन सा है जो पक्षियों की तरह सचमुच उड़ सकता है?',
    options: ['Bat', 'Flying Squirrel', 'Flying Fish', 'Sugar Glider'],
    optionsHindi: ['चमगादड़ (Bat)', 'उड़न गिलहरी (Flying Squirrel)', 'उड़न मछली', 'शुगर ग्लाइडर'],
    correct: 0,
    explanation: 'Bats are the only true flying mammals. Flying squirrels and sugar gliders can only glide through the air, but bats flap their wings to generate lift!',
    explanationHindi: 'चमगादड़ एकमात्र स्तनपायी है जो वास्तव में पंख फड़फड़ाकर उड़ सकता है। उड़न गिलहरी केवल हवा में ग्लाइड (फिसल) कर सकती है!',
    deepThinking: {
      rationale: 'Bat wings are modified hands with flexible membrane (patagium) stretched between elongated finger bones, providing superior maneuverability over bird feathers.',
      distractorAnalysis: 'Flying squirrels and sugar gliders glide downward using skin flaps; they cannot flap wings to gain altitude.',
      takeaway: 'Bats fly; flying squirrels glide.'
    }
  },
  {
    category: 'Wildlife & Nature',
    question: 'Why do camels have long double eyelashes and the ability to close their nostrils?',
    questionHindi: 'ऊंटों की लंबी दोहरी पलकें और नथुने बंद करने की क्षमता किसलिए होती है?',
    options: ['To protect against desert sandstorms', 'To stay underwater', 'To look scary to predators', 'To sleep while walking'],
    optionsHindi: ['रेगिस्तानी रेत के तूफानों से बचने के लिए', 'पानी के अंदर रहने के लिए', 'शिकारियों को डराने के लिए', 'चलते-चलते सोने के लिए'],
    correct: 0,
    explanation: 'Camels live in harsh deserts where blowing sand can blind or choke animals. Their specialized eyelashes and sealable nostrils keep desert sand completely out!',
    explanationHindi: 'ऊंट रेगिस्तान में रहते हैं जहां उड़ती रेत आंखों और नाक को नुकसान पहुंचा सकती है। उनकी पलकें और नथुने रेत को अंदर जाने से रोकते हैं!',
    deepThinking: {
      rationale: 'This is an evolutionary adaptation for desert biome survival, alongside fat-storing humps and wide padded footpads that prevent sinking in sand.',
      distractorAnalysis: 'Camels store fat (energy) in their humps, not water, and their facial features are sandstorm shields.',
      takeaway: 'Animal physical traits are evolved tools adapted specifically for their native biomes.'
    }
  },

  // ==========================================
  // 5. INCREDIBLE INDIA & GREAT HEROES (🇮🇳)
  // ==========================================
  {
    category: 'Incredible India & Heroes',
    question: 'Which beloved former President of India and aerospace scientist was affectionately called the "Missile Man of India"?',
    questionHindi: 'भारत के किस प्रिय पूर्व राष्ट्रपति और एयरोस्पेस वैज्ञानिक को प्यार से "मिसाइल मैन ऑफ इंडिया" कहा जाता है?',
    options: ['Dr. A.P.J. Abdul Kalam', 'Dr. Homi Bhabha', 'Dr. Vikram Sarabhai', 'Sir C.V. Raman'],
    optionsHindi: ['डॉ. ए.पी.जे. अब्दुल कलाम', 'डॉ. होमी भाभा', 'डॉ. विक्रम साराभाई', 'सर सी.वी. रमन'],
    correct: 0,
    explanation: 'Dr. A.P.J. Abdul Kalam led the development of India\'s indigenous missile programs (Agni and Prithvi) and served as the 11th President of India.',
    explanationHindi: 'डॉ. ए.पी.जे. अब्दुल कलाम ने भारत के स्वदेशी मिसाइल विकास (अग्नि और पृथ्वी) का नेतृत्व किया और भारत के 11वें राष्ट्रपति बने।',
    deepThinking: {
      rationale: 'Dr. Kalam directed ISRO\'s SLV-III satellite launch vehicle and DRDO\'s Integrated Guided Missile Development Programme (IGMDP).',
      distractorAnalysis: 'Vikram Sarabhai is the Father of the Indian Space Programme. Homi Bhabha is the Father of the Indian Nuclear Programme.',
      takeaway: 'Dr. A.P.J. Abdul Kalam inspired millions of students with his book "Wings of Fire" and his passion for education.'
    }
  },
  {
    category: 'Incredible India & Heroes',
    question: 'What is the National Aquatic Animal of India, symbolizing the health of holy freshwater rivers?',
    questionHindi: 'भारत का राष्ट्रीय जलीय जीव (National Aquatic Animal) कौन सा है, जो स्वच्छ नदियों का प्रतीक है?',
    options: ['Ganges River Dolphin', 'Gharial Crocodile', 'Golden Mahseer Fish', 'Olive Ridley Turtle'],
    optionsHindi: ['गंगा नदी डॉल्फिन (Ganges River Dolphin)', 'घड़ियाल', 'गोल्डन महाशीर मछली', 'ओलिव रिडले कछुआ'],
    correct: 0,
    explanation: 'The Ganges River Dolphin (Platanista gangetica) was declared India\'s National Aquatic Animal in 2009. It is essentially blind and hunts using ultrasonic echolocation!',
    explanationHindi: 'गंगा नदी की डॉल्फिन को 2009 में भारत का राष्ट्रीय जलीय जीव घोषित किया गया था। यह दृष्टिहीन होती है और अल्ट्रासोनिक ध्वनि से शिकार ढूंढती है!',
    deepThinking: {
      rationale: 'The river dolphin is an indicator species: it can only survive in clean, unpolluted freshwater with ample fish populations.',
      distractorAnalysis: 'Gharials are also native to the Chambal and Ganga systems, but the Dolphin is the designated national aquatic animal.',
      takeaway: 'Ganges River Dolphin uses echolocation and lives only in pure freshwater.'
    }
  },
  {
    category: 'Incredible India & Heroes',
    question: 'How many spokes are in the Ashoka Chakra situated at the center of the Indian National Flag?',
    questionHindi: 'भारतीय राष्ट्रीय ध्वज (तिरंगे) के केंद्र में स्थित अशोक चक्र में कुल कितनी तीलियां (Spokes) होती हैं?',
    options: ['24 spokes', '20 spokes', '12 spokes', '28 spokes'],
    optionsHindi: ['24 तीलियां (24 Spokes)', '20 तीलियां', '12 तीलियां', '28 तीलियां'],
    correct: 0,
    explanation: 'The Ashoka Chakra has 24 spokes in navy blue color. Each spoke represents 24 hours of the day and 24 virtuous principles of human life and constant progress.',
    explanationHindi: 'अशोक चक्र में गहरे नीले रंग की 24 तीलियां होती हैं। ये दिन के 24 घंटों और जीवन के 24 मानवीय नैतिक सिद्धांतों का प्रतिनिधित्व करती हैं।',
    deepThinking: {
      rationale: 'Adopted on July 22, 1947, from the Lion Capital of Ashoka at Sarnath, the wheel symbolizes the Dharma Chakra (Wheel of Law and Motion).',
      distractorAnalysis: '12 would correspond to hours on a standard clock, but the Ashoka Chakra has 24 to denote all 24 hours of day and night.',
      takeaway: 'The 24 spokes teach children that life is motion and continuous constructive progress.'
    }
  },
  {
    category: 'Incredible India & Heroes',
    question: 'Which Indian mathematician-physicist won the 1930 Nobel Prize in Physics for discovering how light scatters when passing through a transparent material?',
    questionHindi: 'किस भारतीय वैज्ञानिक को पारदर्शी माध्यम से गुजरते हुए प्रकाश के प्रकीर्णन की खोज के लिए 1930 में भौतिकी का नोबेल पुरस्कार मिला था?',
    options: ['Sir C.V. Raman', 'Satyendra Nath Bose', 'Subrahmanyan Chandrasekhar', 'Homi Bhabha'],
    optionsHindi: ['सर सी.वी. रमन (Sir C.V. Raman)', 'सत्येंद्र नाथ बोस', 'सुब्रह्मण्यन चंद्रशेखर', 'होमी भाभा'],
    correct: 0,
    explanation: 'Sir C.V. Raman discovered the "Raman Effect" on February 28, 1928, which is why India celebrates National Science Day every year on February 28!',
    explanationHindi: 'सर सी.वी. रमन ने 28 फरवरी 1928 को "रमन प्रभाव" की खोज की थी, इसीलिए भारत हर वर्ष 28 फरवरी को राष्ट्रीय विज्ञान दिवस मनाता है!',
    deepThinking: {
      rationale: 'Inelastic scattering of photons by matter means the scattered light changes wavelength, giving insight into molecular structures.',
      distractorAnalysis: 'S.N. Bose collaborated with Einstein on Bose-Einstein statistics and bosons. Chandrasekhar won in 1983 for the Chandrasekhar limit.',
      takeaway: 'National Science Day (Feb 28) honors Sir C.V. Raman\'s discovery of the Raman Effect.'
    }
  },

  // ==========================================
  // 6. SPEED MENTAL MATH & NUMBER MAGIC (⚡)
  // ==========================================
  {
    category: 'Speed Math & Numbers',
    question: 'What is any number multiplied by zero equal to?',
    questionHindi: 'किसी भी संख्या को शून्य (0) से गुणा करने पर क्या परिणाम मिलता है?',
    options: ['0', 'The number itself', '1', 'Infinity'],
    optionsHindi: ['0 (शून्य)', 'वही संख्या', '1', 'अनंत (Infinity)'],
    correct: 0,
    explanation: 'Multiplying any number by 0 always results in 0! For example, 1,000,000 × 0 = 0.',
    explanationHindi: 'किसी भी संख्या को 0 से गुणा करने पर हमेशा 0 ही मिलता है! जैसे 10,00,000 × 0 = 0।',
    deepThinking: {
      rationale: 'Multiplication represents repeated addition. Having 5 groups of zero things (or zero groups of 5 things) gives zero total items.',
      distractorAnalysis: 'Multiplying by 1 gives the number itself (identity property). Multiplying by 0 absorbs everything into 0.',
      takeaway: 'Zero is the absorbing element of multiplication: X × 0 = 0.'
    }
  },
  {
    category: 'Speed Math & Numbers',
    question: 'What is the sum of all three interior angles in any flat triangle?',
    questionHindi: 'किसी भी त्रिभुज (Triangle) के तीनों आंतरिक कोणों का योग हमेशा कितना होता है?',
    options: ['180 degrees', '90 degrees', '360 degrees', '100 degrees'],
    optionsHindi: ['180 डिग्री (180°)', '90 डिग्री (90°)', '360 डिग्री (360°)', '100 डिग्री (100°)'],
    correct: 0,
    explanation: 'The interior angles of every Euclidean triangle always add up to exactly 180 degrees (a straight line)!',
    explanationHindi: 'किसी भी समतल त्रिभुज के तीनों आंतरिक कोणों का जोड़ हमेशा 180° (एक सीधी रेखा) होता है!',
    deepThinking: {
      rationale: 'By drawing a line parallel to the base through the opposite vertex, alternate interior angles prove that the three angles form a straight angle (180°).',
      distractorAnalysis: '360° is the sum of angles in a 4-sided quadrilateral (square or rectangle).',
      takeaway: 'Triangle interior angle sum is always 180°.'
    }
  },
  {
    category: 'Speed Math & Numbers',
    question: 'Which number is the ONLY even prime number in mathematics?',
    questionHindi: 'गणित में एकमात्र सम अभाज्य संख्या (Even Prime Number) कौन सी है?',
    options: ['2', '0', '4', '1'],
    optionsHindi: ['2 (दो)', '0 (शून्य)', '4 (चार)', '1 (एक)'],
    correct: 0,
    explanation: '2 is the only even prime number because every other even number is divisible by 2 and therefore cannot be prime!',
    explanationHindi: '2 एकमात्र सम अभाज्य संख्या है क्योंकि अन्य सभी सम संख्याएं 2 से विभाजित हो जाती हैं!',
    deepThinking: {
      rationale: 'A prime number has exactly two positive factors: 1 and itself. 2 has factors 1 and 2. Any higher even number has at least 1, 2, and itself.',
      distractorAnalysis: '1 is neither prime nor composite. 4 is composite (2 × 2).',
      takeaway: '2 is the smallest prime number and the ONLY even prime number.'
    }
  },
  {
    category: 'Speed Math & Numbers',
    question: 'What comes next in this smart number pattern: 3, 6, 12, 24, ___?',
    questionHindi: 'इस दिमागी नंबर पैटर्न में अगला नंबर क्या आएगा: 3, 6, 12, 24, ___?',
    options: ['48', '36', '30', '42'],
    optionsHindi: ['48', '36', '30', '42'],
    correct: 0,
    explanation: 'Each number is doubled (multiplied by 2): 3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24, and 24 × 2 = 48!',
    explanationHindi: 'प्रत्येक संख्या पिछली संख्या की दुगुनी (×2) हो रही है: 3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24, और 24 × 2 = 48!',
    deepThinking: {
      rationale: 'This is a geometric sequence with common ratio r = 2. a_n = a_1 * r^(n-1).',
      distractorAnalysis: '36 is a common mistake by assuming an addition rule like +12.',
      takeaway: 'Look for proportional scaling (doubling) when terms grow rapidly.'
    }
  },

  // ==========================================
  // 7. EVERYDAY SCIENCE & INVENTIONS (💡)
  // ==========================================
  {
    category: 'Everyday Science & Inventions',
    question: 'Why does a dropped ball or apple fall down towards the floor instead of floating away?',
    questionHindi: 'हाथ से छूटी हुई गेंद या सेब ऊपर तैरने के बजाय नीचे जमीन की ओर क्यों गिरता है?',
    options: ['Earth\'s gravitational pull (Gravity)', 'Air pressure pushing it down', 'Magnetic attraction in soil', 'Static electricity'],
    optionsHindi: ['पृथ्वी का गुरुत्वाकर्षण बल (Gravity)', 'हवा का दबाव', 'मिट्टी का चुंबकत्व', 'स्थैतिक बिजली'],
    correct: 0,
    explanation: 'Earth has massive mass, which produces gravity that pulls all objects towards its center at 9.8 m/s²!',
    explanationHindi: 'पृथ्वी का विशाल द्रव्यमान गुरुत्वाकर्षण बल उत्पन्न करता है जो सभी वस्तुओं को अपने केंद्र की ओर खींचता है!',
    deepThinking: {
      rationale: 'Newton\'s Law of Universal Gravitation states that any two masses attract each other with force proportional to the product of their masses.',
      distractorAnalysis: 'Air pressure actually creates slight upward buoyant force, but gravity overwhelmingly dominates.',
      takeaway: 'Gravity is the invisible force that keeps our feet on the ground and planets in orbit around the Sun.'
    }
  },
  {
    category: 'Everyday Science & Inventions',
    question: 'What green pigment in plant leaves absorbs sunlight to make food through photosynthesis?',
    questionHindi: 'पौधों की पत्तियों में कौन सा हरा वर्णक (Pigment) सूर्य का प्रकाश सोखकर भोजन (प्रकाश संश्लेषण) बनाता है?',
    options: ['Chlorophyll', 'Hemoglobin', 'Melanin', 'Carotene'],
    optionsHindi: ['क्लोरोफिल (Chlorophyll)', 'हीमोग्लोबिन', 'मेलेनिन', 'कैरोटीन'],
    correct: 0,
    explanation: 'Chlorophyll is the green pigment in chloroplasts that absorbs red and blue light and reflects green light, powering the production of glucose and oxygen.',
    explanationHindi: 'क्लोरोफिल पत्तियों में मौजूद हरा वर्णक है जो सूर्य के प्रकाश को अवशोषित करके ग्लूकोज और ऑक्सीजन का निर्माण करता है।',
    deepThinking: {
      rationale: 'Photosynthesis equation: 6CO2 + 6H2O + Sunlight -> C6H12O6 + 6O2. Chlorophyll drives the light-dependent reactions.',
      distractorAnalysis: 'Hemoglobin carries oxygen in human blood (red). Melanin gives skin and hair its pigment.',
      takeaway: 'Chlorophyll makes leaves green and produces the oxygen that animals and humans breathe.'
    }
  },
  {
    category: 'Everyday Science & Inventions',
    question: 'At sea level, at what temperature does pure water boil and turn into steam?',
    questionHindi: 'समुद्र तल पर शुद्ध पानी किस तापमान पर उबलने लगता है और भाप में बदल जाता है?',
    options: ['100° Celsius (212° Fahrenheit)', '50° Celsius', '0° Celsius', '200° Celsius'],
    optionsHindi: ['100° सेल्सियस (212° फारेनहाइट)', '50° सेल्सियस', '0° सेल्सियस (0°C)', '200° सेल्सियस'],
    correct: 0,
    explanation: 'Pure water boils at 100°C (212°F) and freezes into solid ice at 0°C (32°F) under standard atmospheric pressure.',
    explanationHindi: 'शुद्ध पानी 100°C (212°F) पर उबलता है और 0°C (32°F) पर जमकर बर्फ बन जाता है।',
    deepThinking: {
      rationale: 'The Celsius scale was originally calibrated based on the freezing (0°C) and boiling (100°C) points of water.',
      distractorAnalysis: '0°C is the freezing point of water.',
      takeaway: 'Freezing point of water = 0°C. Boiling point = 100°C.'
    }
  },
  {
    category: 'Everyday Science & Inventions',
    question: 'Which gas is absorbed by green plants during the daytime and released as fresh oxygen for us to breathe?',
    questionHindi: 'दिन के समय हरे पौधे कौन सी गैस सोखते हैं और हमारे सांस लेने के लिए ताजी ऑक्सीजन छोड़ते हैं?',
    options: ['Carbon Dioxide (CO2)', 'Nitrogen (N2)', 'Helium (He)', 'Carbon Monoxide (CO)'],
    optionsHindi: ['कार्बन डाइऑक्साइड (CO2)', 'नाइट्रोजन', 'हीलियम', 'कार्बन मोनोऑक्साइड'],
    correct: 0,
    explanation: 'Plants absorb Carbon Dioxide (CO2) from the air through tiny leaf pores called stomata and release oxygen (O2) as a byproduct of photosynthesis.',
    explanationHindi: 'पौधे पत्तियों के सूक्ष्म छिद्रों (स्टोमेटा) से कार्बन डाइऑक्साइड (CO2) सोखते हैं और ऑक्सीजन छोड़ते हैं।',
    deepThinking: {
      rationale: 'Plants and animals maintain atmospheric equilibrium: plants take CO2 and release O2, while animals breathe in O2 and exhale CO2.',
      distractorAnalysis: 'Nitrogen makes up 78% of air, but plants cannot absorb gaseous N2 directly through leaves.',
      takeaway: 'Planting trees purifies the air by absorbing excess carbon dioxide and producing life-giving oxygen.'
    }
  }
];

/**
 * Procedurally shuffles and selects a set of 10-15 Mind Sharpener questions
 * with rotation based on attemptNumber so questions continually change.
 */
export function getMindSharpenerQuestions(
  themeId: string = 'all',
  attemptNumber: number = 1,
  questionCount: number = 15
): QuizQuestion[] {
  let pool = [...kidsGkQuestionsBank];

  if (themeId && themeId !== 'all') {
    const themeMap: Record<string, string> = {
      'brain-teasers': 'Brain Teasers',
      'space': 'Space & Universe',
      'world': 'World Wonders',
      'wildlife': 'Wildlife & Nature',
      'india': 'Incredible India',
      'math': 'Speed Math',
      'science': 'Everyday Science'
    };
    const key = themeMap[themeId];
    if (key) {
      const filtered = pool.filter((q) => q.category.includes(key));
      if (filtered.length >= 4) {
        pool = filtered;
      }
    }
  }

  // Rotate questions systematically based on attemptNumber
  const offset = (attemptNumber - 1) * 3;
  const rotated = pool.map((q, idx) => {
    // Shuffle options order deterministically based on idx + attemptNumber
    const seed = idx + attemptNumber * 7;
    const order = [0, 1, 2, 3];
    // Deterministic pseudo shuffle of options
    if (seed % 4 === 1) {
      // Rotate options by 1
      const newCorrect = (q.correct + 1) % 4;
      const newOpts = [q.options[3], q.options[0], q.options[1], q.options[2]];
      const newOptsHi = q.optionsHindi
        ? [q.optionsHindi[3], q.optionsHindi[0], q.optionsHindi[1], q.optionsHindi[2]]
        : undefined;
      return {
        ...q,
        options: newOpts,
        optionsHindi: newOptsHi,
        correct: newCorrect,
      };
    } else if (seed % 4 === 2) {
      // Swap 0 and 2
      const newOpts = [...q.options];
      const temp = newOpts[0];
      newOpts[0] = newOpts[2];
      newOpts[2] = temp;
      let newCorrect = q.correct;
      if (q.correct === 0) newCorrect = 2;
      else if (q.correct === 2) newCorrect = 0;

      let newOptsHi = q.optionsHindi ? [...q.optionsHindi] : undefined;
      if (newOptsHi) {
        const tHi = newOptsHi[0];
        newOptsHi[0] = newOptsHi[2];
        newOptsHi[2] = tHi;
      }
      return {
        ...q,
        options: newOpts,
        optionsHindi: newOptsHi,
        correct: newCorrect,
      };
    }
    return q;
  });

  // Cycle starting offset so repeated retakes show different questions first
  const startIndex = offset % rotated.length;
  const reordered = [
    ...rotated.slice(startIndex),
    ...rotated.slice(0, startIndex)
  ];

  return reordered.slice(0, Math.min(questionCount, reordered.length));
}
