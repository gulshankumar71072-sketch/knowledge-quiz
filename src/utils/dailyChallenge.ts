import { DailyChallengeInfo, LeaderboardEntry, QuizQuestion } from '../types';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const trendingDailyTopics: DailyChallengeInfo[] = [
  {
    date: '2026-10-10',
    topic: 'Cosmic Marvels & Deep Space Telescopes',
    headline: 'Voyage Beyond: Galaxies, Exoplanets & Black Holes',
    description: 'Explore the universe\'s greatest astrophysical discoveries from deep space observatories, gravitational waves, and exoplanet atmospheres.',
    icon: '🔭',
    category: 'Astrophysics & Space',
    totalQuestions: 15,
  },
  {
    date: '2026-10-11',
    topic: 'Artificial Intelligence & Quantum Frontiers',
    headline: 'Silicon Minds: Neural Nets, Quantum Bits & Robotics',
    description: 'Test your understanding of modern transformer architectures, quantum superposition, and the future of computational intelligence.',
    icon: '🤖',
    category: 'Computer Science & AI',
    totalQuestions: 15,
  },
  {
    date: '2026-10-12',
    topic: 'Lost Civilizations & Ancient Secrets',
    headline: 'Chronicles of Antiquity: Enigmas of Human History',
    description: 'From the Indus Valley script to Mayan astronomical calendars and Egyptian engineering feats.',
    icon: '🏺',
    category: 'World History & Archaeology',
    totalQuestions: 15,
  },
  {
    date: '2026-10-13',
    topic: 'Deep Ocean Mysteries & Extreme Ecosystems',
    headline: 'Abyssal Depths: Hydrothermal Vents & Bioluminescence',
    description: 'Discover the strangest organisms living under crushing oceanic pressures without sunlight.',
    icon: '🌊',
    category: 'Marine Biology & Earth Science',
    totalQuestions: 15,
  },
];

// Returns today's active challenge info based on date modulo
export function getTodayChallengeInfo(): DailyChallengeInfo {
  const todayStr = getTodayDateString();
  const found = trendingDailyTopics.find((t) => t.date === todayStr);
  if (found) return found;

  // Fallback using day of year hash
  const now = new Date();
  const dayIndex = (now.getDate() + now.getMonth() * 31) % trendingDailyTopics.length;
  const picked = trendingDailyTopics[dayIndex];
  return {
    ...picked,
    date: todayStr,
  };
}

// 15 curated high-thinking questions for today's Cosmic Marvels & Deep Space Challenge
export const todayCosmicQuestions: QuizQuestion[] = [
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'At what stable gravitational equilibrium point in space is the James Webb Space Telescope (JWST) situated?',
    questionHindi: 'जेम्स वेब स्पेस टेलीस्कोप (JWST) अंतरिक्ष में किस स्थिर गुरुत्वाकर्षण संतुलन बिंदु पर स्थित है?',
    options: ['Low Earth Orbit (LEO)', 'Lagrange Point 1 (L1)', 'Lagrange Point 2 (L2)', 'Geostationary Orbit (GEO)'],
    optionsHindi: ['लो अर्थ ऑर्बिट (LEO)', 'लैग्रेंज पॉइंट 1 (L1)', 'लैग्रेंज पॉइंट 2 (L2)', 'भूस्थैतिक कक्षा (GEO)'],
    correct: 2,
    explanation: 'JWST orbits the Sun at Earth-Sun Lagrange Point 2 (L2), approximately 1.5 million kilometers (1 million miles) away from Earth.',
    explanationHindi: 'JWST पृथ्वी से लगभग 15 लाख किलोमीटर दूर सूर्य-पृथ्वी लैग्रेंज बिंदु 2 (L2) पर सूर्य की परिक्रमा करता है।',
    deepThinking: {
      rationale: 'At L2, the combined gravitational pull of the Sun and Earth balances the centrifugal force required for an orbit with the same 1-year period as Earth, keeping the Sun, Earth, and Moon always behind its sunshield.',
      distractorAnalysis: 'LEO is where Hubble orbits. L1 sits between Earth and Sun (used by solar observatories like SOHO). GEO is at ~36,000 km.',
      takeaway: 'L2 allows JWST to keep its ultra-cold infrared instruments permanently shadowed by its tennis-court-sized sunshield.'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'What primary range of the electromagnetic spectrum is JWST optimized to observe?',
    questionHindi: 'JWST विद्युत चुंबकीय स्पेक्ट्रम के किस मुख्य भाग का प्रेक्षण करने के लिए अनुकूलित है?',
    options: ['Gamma rays', 'Infrared radiation', 'Ultraviolet light', 'X-rays'],
    optionsHindi: ['गामा किरणें (Gamma rays)', 'अवरक्त विकिरण (Infrared)', 'पराबैंगनी प्रकाश (UV)', 'एक्स-किरणें (X-rays)'],
    correct: 1,
    explanation: 'JWST is an infrared observatory, detecting both near-infrared (NIRCam) and mid-infrared (MIRI) wavelengths to pierce dust clouds and observe redshifted ancient light.',
    explanationHindi: 'JWST एक इन्फ्रारेड (अवरक्त) वेधशाला है जो धूल के बादलों को भेदकर ब्रह्मांड के शुरुआती प्रकाश का अध्ययन करती है।',
    deepThinking: {
      rationale: 'Cosmological expansion stretches (redshifts) light from the earliest galaxies into the infrared band. Infrared also penetrates dense interstellar molecular dust clouds.',
      distractorAnalysis: 'Hubble observed mainly in visible and UV light. Chandra observes X-rays, and Fermi observes gamma rays.',
      takeaway: 'Infrared reveals both the oldest cosmic light and cold star-forming nebulae.'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'What is the theoretical boundary around a black hole beyond which nothing, not even light, can escape?',
    questionHindi: 'ब्लैक होल के चारों ओर की वह काल्पनिक सीमा क्या कहलाती है जिससे बाहर प्रकाश भी नहीं निकल सकता?',
    options: ['Photon Sphere', 'Accretion Disk', 'Event Horizon', 'Ergosphere'],
    optionsHindi: ['फोटॉन क्षेत्र (Photon Sphere)', 'अभिवृद्धि डिस्क (Accretion Disk)', 'घटना क्षितिज (Event Horizon)', 'एर्गोस्फीयर (Ergosphere)'],
    correct: 2,
    explanation: 'The event horizon is the threshold at which the escape velocity equalizes with the speed of light in vacuum.',
    explanationHindi: 'घटना क्षितिज (Event Horizon) वह सीमा है जहां पलायन वेग निर्वात में प्रकाश की चाल के बराबर हो जाता है।',
    deepThinking: {
      rationale: 'Derived from the Schwarzschild metric: r_s = 2GM/c². At and within this spatial boundary, all light cones point inward toward the gravitational singularity.',
      distractorAnalysis: 'The photon sphere is where photons can orbit at r = 1.5 r_s. The ergosphere is an exterior region in rotating Kerr black holes.',
      takeaway: 'The event horizon is a point of no causal return.'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'Which is the nearest major spiral galaxy to our Milky Way galaxy?',
    questionHindi: 'हमारी आकाशगंगा (मिल्की वे) के सबसे निकट स्थित प्रमुख सर्पिल (Spiral) आकाशगंगा कौन सी है?',
    options: ['Triangulum Galaxy (M33)', 'Andromeda Galaxy (M31)', 'Large Magellanic Cloud', 'Sombrero Galaxy (M104)'],
    optionsHindi: ['ट्राएंगुलम गैलेक्सी (M33)', 'एंड्रोमेडा गैलेक्सी (M31)', 'लार्ज मैग्लेनिक क्लाउड', 'सोम्ब्रेरो गैलेक्सी (M104)'],
    correct: 1,
    explanation: 'The Andromeda Galaxy (Messier 31) is the nearest major spiral galaxy, located about 2.5 million light-years away.',
    explanationHindi: 'एंड्रोमेडा आकाशगंगा (M31) लगभग 25 लाख प्रकाश वर्ष दूर स्थित हमारी सबसे निकटतम प्रमुख सर्पिल आकाशगंगा है।',
    deepThinking: {
      rationale: 'Andromeda and the Milky Way are the two largest members of the Local Group and are on a collision course, expected to merge into "Milkdromeda" in ~4.5 billion years.',
      distractorAnalysis: 'Large Magellanic Cloud is a satellite dwarf galaxy. Triangulum is smaller and slightly farther (~2.73 Mly).',
      takeaway: 'Andromeda is our giant spiral neighbor visible to the naked eye on dark nights.'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'What is the most abundant chemical element in the observable universe by mass?',
    questionHindi: 'द्रव्यमान के अनुसार दृश्य ब्रह्मांड में सबसे प्रचुर मात्रा में पाया जाने वाला रासायनिक तत्व कौन सा है?',
    options: ['Helium', 'Hydrogen', 'Oxygen', 'Carbon'],
    optionsHindi: ['हीलियम (Helium)', 'हाइड्रोजन (Hydrogen)', 'ऑक्सीजन (Oxygen)', 'कार्बन (Carbon)'],
    correct: 1,
    explanation: 'Hydrogen constitutes approximately 75% of the baryonic mass of the universe, formed during Big Bang nucleosynthesis.',
    explanationHindi: 'हाइड्रोजन दृश्य ब्रह्मांड के कुल सामान्य द्रव्यमान का लगभग 75% भाग बनाता है, जो बिग बैंग के समय बना था।',
    deepThinking: {
      rationale: 'Within the first 20 minutes of the Big Bang, primordial nucleosynthesis produced roughly 75% hydrogen-1 and 25% helium-4 by mass, with trace amounts of lithium.',
      distractorAnalysis: 'Helium makes up nearly 24%. All heavier elements (metals in astronomy) make up less than 2% combined.',
      takeaway: 'The universe is predominantly hydrogen, the simplest element (1 proton, 1 electron).'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'What exotic astronomical object is left behind when a massive star undergoes a supernova but does not collapse into a black hole?',
    questionHindi: 'जब कोई विशाल तारा सुपरनोवा विस्फोट करता है और ब्लैक होल नहीं बनता, तो पीछे कौन सा खगोलीय पिंड बचता है?',
    options: ['White Dwarf', 'Neutron Star', 'Brown Dwarf', 'Red Giant'],
    optionsHindi: ['श्वेत वामन (White Dwarf)', 'न्यूट्रॉन तारा (Neutron Star)', 'भूरा वामन (Brown Dwarf)', 'लाल दानव (Red Giant)'],
    correct: 1,
    explanation: 'A neutron star forms when gravitational collapse crushes protons and electrons into tightly packed degenerate neutrons.',
    explanationHindi: 'न्यूट्रॉन तारा तब बनता है जब अत्यधिक गुरुत्वाकर्षण खिंचाव प्रोटॉन और इलेक्ट्रॉनों को सघन न्यूट्रॉनों में बदल देता है।',
    deepThinking: {
      rationale: 'Stars with core masses between ~1.4 and 2.16 solar masses (the Tolman-Oppenheimer-Volkoff limit) are stabilized against further collapse by neutron degeneracy pressure.',
      distractorAnalysis: 'White dwarfs are supported by electron degeneracy (core < 1.4 solar masses). Brown dwarfs are failed stars without hydrogen fusion.',
      takeaway: 'A neutron star compresses the mass of the Sun into a sphere just 20 km in diameter.'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'What is the cosmic microwave background (CMB)?',
    questionHindi: 'कॉस्मिक माइक्रोवेव बैकग्राउंड (CMB) क्या है?',
    options: ['Radiation from exploding stars', 'Thermal remnant radiation from the early universe (~380,000 years after Big Bang)', 'Signals from orbiting satellites', 'Solar wind particles'],
    optionsHindi: ['विस्फोटक तारों का विकिरण', 'प्रारंभिक ब्रह्मांड का अवशिष्ट उष्मीय विकिरण (बिग बैंग के ~3.8 लाख वर्ष बाद)', 'उपग्रहों से आने वाले सिग्नल', 'सौर पवन के कण'],
    correct: 1,
    explanation: 'The CMB is the afterglow radiation left over from the epoch of recombination, when the universe cooled to ~3000 K, allowing neutral hydrogen to form and photons to travel freely.',
    explanationHindi: 'CMB ब्रह्मांड के निर्माण (बिग बैंग) के समय का सबसे पुराना अवशिष्ट विकिरण है जो पूरे अंतरिक्ष में एक समान फैला हुआ है।',
    deepThinking: {
      rationale: 'Discovered accidentally by Penzias and Wilson in 1965, the CMB is a nearly isotropic blackbody spectrum at 2.725 Kelvin.',
      distractorAnalysis: 'Starlight is localized and higher frequency. Solar wind is charged particle plasma, not EM blackbody radiation.',
      takeaway: 'CMB is the oldest electromagnetic snapshot of the universe.'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'What method has detected the vast majority of known exoplanets to date (such as by NASA\'s Kepler and TESS missions)?',
    questionHindi: 'नासा के केप्लर और TESS अभियानों द्वारा अब तक अधिकांश बाह्यग्रहों (Exoplanets) को किस विधि से खोजा गया है?',
    options: ['Direct Imaging', 'Transit Photometry', 'Radial Velocity (Doppler)', 'Astrometry'],
    optionsHindi: ['प्रत्यक्ष इमेजिंग', 'ट्रांजिट फोटोमेट्री (Transit Photometry)', 'रेडियल वेग विधि (डॉप्लर)', 'एस्ट्रोमेट्री'],
    correct: 1,
    explanation: 'Transit photometry measures the minuscule periodic dip in a star\'s apparent brightness as an exoplanet passes directly in front of its disk.',
    explanationHindi: 'ट्रांजिट फोटोमेट्री में जब कोई ग्रह अपने तारे के सामने से गुजरता है, तो तारे के प्रकाश में आने वाली सूक्ष्म कमी को मापकर ग्रह खोजा जाता है।',
    deepThinking: {
      rationale: 'Over 70% of confirmed exoplanets were discovered via transits. The fractional depth of the dip equals (R_planet / R_star)², yielding planet radius.',
      distractorAnalysis: 'Radial velocity detects gravitational wobbles via Doppler shift. Direct imaging is rare because stars outshine planets by billions to one.',
      takeaway: 'Transit dips allow astronomers to measure both orbital periods and planet diameters.'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'Which mysterious force or energy is causing the accelerated expansion of the universe?',
    questionHindi: 'ब्रह्मांड के त्वरित विस्तार (Accelerated Expansion) के लिए कौन सी रहस्यमयी ऊर्जा उत्तरदायी है?',
    options: ['Dark Matter', 'Dark Energy', 'Hawking Radiation', 'Cosmic Inflation'],
    optionsHindi: ['डार्क मैटर (Dark Matter)', 'डार्क एनर्जी (Dark Energy)', 'हॉकिंग विकिरण', 'कॉस्मिक इन्फ्लेशन'],
    correct: 1,
    explanation: 'Dark energy is the hypothesized form of vacuum energy that makes up ~68% of the universe and exerts negative pressure, driving accelerated cosmic expansion.',
    explanationHindi: 'डार्क एनर्जी ब्रह्मांड का लगभग 68% भाग बनाती है और ऋणात्मक दबाव उत्पन्न करके अंतरिक्ष को तेजी से फैला रही है।',
    deepThinking: {
      rationale: 'Confirmed in 1998 via Type Ia supernova distance measurements, dark energy acts as a positive cosmological constant (Lambda) in Einstein\'s general relativity field equations.',
      distractorAnalysis: 'Dark matter exerts attractive gravity to hold galaxies together (~27%). Dark energy causes expansion.',
      takeaway: 'Dark Matter pulls galaxies together; Dark Energy pushes space apart.'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'What is the name of the supermassive black hole located at the center of our Milky Way galaxy?',
    questionHindi: 'हमारी आकाशगंगा (मिल्की वे) के केंद्र में स्थित सुपरमैसिव ब्लैक होल का क्या नाम है?',
    options: ['Cygnus X-1', 'Sagittarius A*', 'M87*', 'Centaurus A'],
    optionsHindi: ['सिग्नस X-1 (Cygnus X-1)', 'धनु A* (Sagittarius A*)', 'M87*', 'सेंटॉरस A'],
    correct: 1,
    explanation: 'Sagittarius A* (pronounced Sagittarius A-star) is a supermassive black hole of approximately 4.3 million solar masses located at our galactic core.',
    explanationHindi: 'धनु A* (Sagittarius A*) लगभग 43 लाख सौर द्रव्यमान वाला एक विशाल ब्लैक होल है जो हमारी आकाशगंगा के केंद्र में स्थित है।',
    deepThinking: {
      rationale: 'Reinhard Genzel and Andrea Ghez won the 2020 Nobel Prize for tracking stars (like S2) orbiting Sagittarius A* at thousands of km/s, confirming its compact mass.',
      distractorAnalysis: 'Cygnus X-1 is a stellar-mass black hole. M87* is the giant black hole in galaxy Messier 87 (6.5 billion solar masses).',
      takeaway: 'Sagittarius A* sits ~26,000 light-years away at our galactic hub.'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'Which planet in our solar system has the most extensive, prominent ring system?',
    questionHindi: 'हमारे सौर मंडल के किस ग्रह में सबसे विशाल और स्पष्ट वलय (Ring System) प्रणाली है?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    optionsHindi: ['बृहस्पति (Jupiter)', 'शनि (Saturn)', 'अरुण (Uranus)', 'वरुण (Neptune)'],
    correct: 1,
    explanation: 'Saturn has spectacular rings composed of billions of chunks of ice and rock dust extending up to 282,000 kilometers from the planet.',
    explanationHindi: 'शनि ग्रह के पास बर्फ और चट्टानों के टुकड़ों से बनी भव्य वलय प्रणाली है जो ग्रह से 2.8 लाख किमी तक फैली है।',
    deepThinking: {
      rationale: 'Saturn\'s rings are primarily water ice (99%) with trace tholin impurities, formed from shattered comets, asteroids, or ancient icy moons pulled apart inside Saturn\'s Roche limit.',
      distractorAnalysis: 'Jupiter, Uranus, and Neptune all have thin, faint rings, but Saturn\'s are vastly brighter and more massive.',
      takeaway: 'Saturn\'s rings are hundreds of thousands of km wide, but on average only ~10 meters thick!'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'What is a pulsar?',
    questionHindi: 'पल्सर (Pulsar) क्या होता है?',
    options: ['A pulsating variable red star', 'A rapidly rotating magnetized neutron star emitting beams of radiation', 'A dying white dwarf star', 'A cloud of stellar dust'],
    optionsHindi: ['धड़कता हुआ लाल तारा', 'तेजी से घूमने वाला अत्यधिक चुंबकीय न्यूट्रॉन तारा', 'मरता हुआ श्वेत वामन तारा', 'तारकीय धूल का बादल'],
    correct: 1,
    explanation: 'A pulsar is a magnetized rotating neutron star whose magnetic axis is misaligned with its rotation axis, sweeping beams of electromagnetic radiation across space like a lighthouse.',
    explanationHindi: 'पल्सर एक तेजी से घूर्णन करने वाला अत्यधिक चुंबकीय न्यूट्रॉन तारा है जो अंतरिक्ष में लाइटहाउस की तरह विकिरण बीम फेंकता है।',
    deepThinking: {
      rationale: 'Discovered in 1967 by Jocelyn Bell Burnell, pulsars have exceptionally precise rotational periods ranging from milliseconds to seconds.',
      distractorAnalysis: 'Cepheid variables are pulsating supergiant stars, not compact relativistic remnants.',
      takeaway: 'Pulsars serve as ultra-precise natural atomic clocks in deep space.'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'Approximately how long does light from the Sun take to reach Earth across 1 Astronomical Unit (150 million km)?',
    questionHindi: 'सूर्य का प्रकाश 1 खगोलीय इकाई (लगभग 15 करोड़ किमी) की दूरी तय करके पृथ्वी तक पहुँचने में लगभग कितना समय लेता है?',
    options: ['8 seconds', '8 minutes and 20 seconds', '1 hour', 'Instantaneous'],
    optionsHindi: ['8 सेकंड', '8 मिनट 20 सेकंड', '1 घंटा', 'तत्काल (0 सेकंड)'],
    correct: 1,
    explanation: 'Travelling at ~300,000 km/s, sunlight takes roughly 500 seconds (8 minutes and 20 seconds) to travel the 150 million kilometers to Earth.',
    explanationHindi: 'लगभग 3 लाख किमी/सेकंड की गति से चलने पर सूर्य के प्रकाश को पृथ्वी तक आने में करीब 500 सेकंड (8 मिनट 20 सेकंड) लगते हैं।',
    deepThinking: {
      rationale: 't = d / c = (1.496 × 10¹¹ m) / (2.998 × 10⁸ m/s) ≈ 499 seconds ≈ 8 minutes 19 seconds.',
      distractorAnalysis: 'Moonlight takes ~1.3 seconds. Starlight from Proxima Centauri takes 4.24 years.',
      takeaway: 'When you view the Sun, you are seeing it as it was over 8 minutes ago.'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'What term describes the theoretical point of infinite density and zero volume at the center of a black hole?',
    questionHindi: 'ब्लैक होल के केंद्र में अनंत घनत्व और शून्य आयतन वाले सैद्धांतिक बिंदु को क्या कहा जाता है?',
    options: ['Singularity', 'Event Horizon', 'Plasma Vortex', 'Quark Core'],
    optionsHindi: ['सिंगुलैरिटी (Singularity / विचित्रता)', 'इवेंट होराइजन', 'प्लाज्मा वोर्टेक्स', 'क्वार्क कोर'],
    correct: 0,
    explanation: 'A gravitational singularity is the central point where curvature of spacetime becomes infinite in classical general relativity.',
    explanationHindi: 'गुरुत्वाकर्षण सिंगुलैरिटी (Singularity) वह बिंदु है जहां अंतरिक्ष-समय का वक्रत्व और द्रव्यमान घनत्व अनंत हो जाता है।',
    deepThinking: {
      rationale: 'Classical general relativity breaks down at r = 0, predicting infinite density. A complete theory of quantum gravity is required to resolve what truly occurs at this scale.',
      distractorAnalysis: 'The event horizon is the outer boundary. Plasma vortex is an atmospheric/fluid term.',
      takeaway: 'Singularities represent the intersection where General Relativity meets Quantum Mechanics.'
    }
  },
  {
    category: 'Daily Challenge • Cosmic Marvels',
    question: 'Which spacecraft is currently the most distant human-made object from Earth, having entered interstellar space in 2012?',
    questionHindi: 'पृथ्वी से सबसे अधिक दूरी पर स्थित मानव निर्मित अंतरिक्ष यान कौन सा है, जिसने 2012 में इंटरस्टेलर स्पेस में प्रवेश किया?',
    options: ['New Horizons', 'Voyager 1', 'Voyager 2', 'Pioneer 10'],
    optionsHindi: ['न्यू होराइजन्स', 'वॉयेजर 1 (Voyager 1)', 'वॉयेजर 2 (Voyager 2)', 'पायनियर 10'],
    correct: 1,
    explanation: 'Launched in 1977, Voyager 1 crossed the heliopause into interstellar space in August 2012 and is currently over 24 billion kilometers away from Earth.',
    explanationHindi: '1977 में प्रक्षेपित वॉयेजर 1 ने अगस्त 2012 में सौरमंडल को पार कर अंतरतारकीय अंतरिक्ष में प्रवेश किया और यह 24 अरब किमी से अधिक दूर है।',
    deepThinking: {
      rationale: 'Traveling at ~17 km/s relative to the Sun, Voyager 1 carries the Golden Record, carrying sounds and images of Earth for any extraterrestrial civilization.',
      distractorAnalysis: 'Voyager 2 crossed into interstellar space in 2018. New Horizons passed Pluto in 2015 and is closer.',
      takeaway: 'Voyager 1 is humanity\'s furthest ambassador, traveling through the pristine interstellar medium.'
    }
  }
];

// Pre-seeded community leaderboard contenders for competition
export const seedLeaderboardEntries: LeaderboardEntry[] = [
  { id: 'lb-1', userName: 'Aarav Sharma', score: 15, totalQuestions: 15, accuracy: 100, timeSpentSeconds: 142, date: '2026-10-10', topic: 'Cosmic Marvels' },
  { id: 'lb-2', userName: 'Dr. Priya Patel', score: 14, totalQuestions: 15, accuracy: 93, timeSpentSeconds: 165, date: '2026-10-10', topic: 'Cosmic Marvels' },
  { id: 'lb-3', userName: 'Vikram Singh', score: 14, totalQuestions: 15, accuracy: 93, timeSpentSeconds: 189, date: '2026-10-10', topic: 'Cosmic Marvels' },
  { id: 'lb-4', userName: 'Ananya Verma', score: 13, totalQuestions: 15, accuracy: 87, timeSpentSeconds: 210, date: '2026-10-10', topic: 'Cosmic Marvels' },
  { id: 'lb-5', userName: 'Rohan Mehta', score: 12, totalQuestions: 15, accuracy: 80, timeSpentSeconds: 245, date: '2026-10-10', topic: 'Cosmic Marvels' },
  { id: 'lb-6', userName: 'Kavita Das', score: 12, totalQuestions: 15, accuracy: 80, timeSpentSeconds: 270, date: '2026-10-10', topic: 'Cosmic Marvels' },
  { id: 'lb-7', userName: 'Aditya Rao', score: 11, totalQuestions: 15, accuracy: 73, timeSpentSeconds: 290, date: '2026-10-10', topic: 'Cosmic Marvels' },
  { id: 'lb-8', userName: 'Sneha Kulkarni', score: 10, totalQuestions: 15, accuracy: 67, timeSpentSeconds: 310, date: '2026-10-10', topic: 'Cosmic Marvels' },
];

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return seedLeaderboardEntries;
  try {
    const raw = localStorage.getItem('quiz_daily_leaderboard');
    if (!raw) {
      localStorage.setItem('quiz_daily_leaderboard', JSON.stringify(seedLeaderboardEntries));
      return seedLeaderboardEntries;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seedLeaderboardEntries;
  } catch (e) {
    return seedLeaderboardEntries;
  }
}

export function saveUserScoreToLeaderboard(entry: Omit<LeaderboardEntry, 'id'>): LeaderboardEntry[] {
  const current = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: `user-${Date.now()}`,
    isCurrentUser: true,
  };

  const updated = [...current, newEntry];
  // Sort by score desc, then by timeSpentSeconds asc
  updated.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeSpentSeconds - b.timeSpentSeconds;
  });

  try {
    localStorage.setItem('quiz_daily_leaderboard', JSON.stringify(updated.slice(0, 50)));
    // Also track streak in localStorage
    const today = getTodayDateString();
    localStorage.setItem(`daily_challenge_done_${today}`, 'true');
    const prevStreak = parseInt(localStorage.getItem('daily_challenge_streak') || '0', 10);
    localStorage.setItem('daily_challenge_streak', String(prevStreak + 1));
  } catch (e) {
    // ignore
  }

  return updated;
}

export interface DailyProgressState {
  date: string;
  isDailyMode: boolean;
  currentQuestionIndex: number;
  score: number;
  streak: number;
  maxStreak: number;
  selectedOption: number | null;
  userAnswers: any[];
  dailyStartTime: number;
  quizFinished: boolean;
}

export function saveDailyProgress(state: DailyProgressState): void {
  if (typeof window === 'undefined') return;
  try {
    const today = getTodayDateString();
    localStorage.setItem(`quiz_daily_progress_${today}`, JSON.stringify(state));
  } catch (e) {
    // ignore
  }
}

export function loadDailyProgress(): DailyProgressState | null {
  if (typeof window === 'undefined') return null;
  try {
    const today = getTodayDateString();
    const raw = localStorage.getItem(`quiz_daily_progress_${today}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.date === today) {
      return parsed;
    }
  } catch (e) {
    // ignore
  }
  return null;
}

export function clearDailyProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    const today = getTodayDateString();
    localStorage.removeItem(`quiz_daily_progress_${today}`);
  } catch (e) {
    // ignore
  }
}

