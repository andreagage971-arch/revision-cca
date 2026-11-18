import { e, o, type Element } from './grade'

export type Kind = 'full' | 'role' | 'both' | 'def'

export type Notion = {
  id: string
  theme: string
  term: string
  kind: Kind
  q: string
  alt: string
  def: string
  el: Element[]
  min?: number
  source: string
  quiz: boolean
  flag?: string
}

export const THEMES = [
  { id: 'org', name: 'Organisations' },
  { id: 'crew', name: 'Crew and health' },
  { id: 'sig', name: 'Acronyms and alphabet' },
  { id: 'vol', name: 'Forces of flight and aircraft' },
  { id: 'cab', name: 'Cabin and doors' },
] as const

const L1 = 'Booklet p.1 · PHOTO-2026-11-18-00-59-23.jpg'
const L2 = 'Booklet p.2 · PHOTO-2026-11-18-00-59-30.jpg'
const L3 = 'Booklet p.3 · PHOTO-2026-11-18-00-59-34.jpg'
const L4 = 'Booklet p.4 · PHOTO-2026-11-18-00-59-39.jpg'
const C1 = 'Notebook · PHOTO-2026-11-18-01-01-35.jpg'
const C2 = 'Notebook · PHOTO-2026-11-18-01-01-45.jpg'
const C3 = 'Notebook · PHOTO-2026-11-18-01-02-04.jpg'

type In = {
  id: string
  theme: string
  term: string
  kind: Kind
  def: string
  src: string
  el: Element[]
  q?: string
  alt?: string
  min?: number
  flag?: string
  quiz?: boolean
}

const n = (x: In): Notion => {
  const alt =
    x.alt ??
    (x.kind === 'full'
      ? `Spell out the acronym ${x.term}.`
      : x.kind === 'role'
        ? `What is ${x.term} used for?`
        : x.kind === 'both'
          ? `Give the full name of ${x.term} and explain its role.`
          : `Recall the definition of: ${x.term}.`)
  return {
    id: x.id, theme: x.theme, term: x.term, kind: x.kind,
    q: x.q ?? `What does ${x.term} stand for?`, alt, def: x.def, el: x.el, min: x.min,
    source: x.src, quiz: x.quiz ?? !x.flag, flag: x.flag,
  }
}

export const NOTIONS: Notion[] = [
  // ───────── Organisations
  n({ id: 'icao', theme: 'org', term: 'ICAO', kind: 'both', src: `${L1} + ${C1}`,
    def: 'International Civil Aviation Organisation: the worldwide body that issues international guidelines and standard practices (SARPs: Standards and Recommended Practices) and safety policies.',
    el: [
      e('Full name: International Civil Aviation Organisation', 'international civil aviation organisation', 'international civil aviation organization', 'organisation de l aviation civile internationale', 'oaci'),
      e('Role: international recommendations / standards worldwide', 'recommend*', 'recommandation*', 'standard*', 'sarps', 'guideline*', 'global*', 'worldwide', 'world', 'mondial*', 'monde', 'international guideline*', 'polic*', 'practice*'),
    ] }),
  n({ id: 'easa', theme: 'org', term: 'EASA', kind: 'both', src: `${L1} + ${C1}`,
    def: 'European Aviation Safety Agency: the European agency that makes legally binding aviation safety laws for EU member states. It first implements ICAO standards, then creates extra rules.',
    el: [
      e('Full name: European Aviation Safety Agency', 'european aviation safety agency', 'agence europeenne de la securite aerienne', 'aesa'),
      e('Role: European safety laws (implements ICAO standards)', 'law*', 'loi*', 'rule*', 'regle*', 'regulation*', 'binding', 'legally', 'implement*', 'appli*', 'enforce*', 'make laws'),
    ] }),
  n({ id: 'dgac', theme: 'org', term: 'DGAC', kind: 'both', src: `${L1} + ${C1}`,
    def: 'Direction Générale de l’Aviation Civile (France) = the French Civil Aviation Authority (CAA). It implements EASA regulations and can create extra, stricter rules for France.',
    el: [
      e('Full name: Direction Générale de l’Aviation Civile', 'direction generale de l aviation civile', 'direction generale aviation civile', 'direction generale de l aviation civil'),
      e('Role: implements EASA rules (+ stricter local rules)', 'easa', 'implement*', 'appli*', 'enforce*', 'rule*', 'regulation*', 'strict*', 'extra', 'additional', 'authority', 'france'),
    ] }),
  n({ id: 'caa', theme: 'org', term: 'CAA', kind: 'full', src: `${L1} + ${C1}`,
    def: 'Civil Aviation Authority: the national civil aviation authority. For France, it is the DGAC.',
    el: [e('Civil Aviation Authority', 'civil aviation authority', 'autorite de l aviation civile')] }),
  n({ id: 'iata', theme: 'org', term: 'IATA', kind: 'role', src: C1,
    def: 'A supportive organisation (based in Geneva) that deals with the financial side of aviation: it helps airlines make money and profit. The full name is not written in your notes.',
    q: 'What is the role of IATA? (the full name is not in your notes)',
    alt: 'What does IATA do for airlines?',
    el: [e('Financial aspect: helps airlines make a profit', 'financ*', 'money', 'argent', 'profit*', 'econom*', 'business', 'revenue', 'airline*', 'compan*', 'support*')] }),
  n({ id: 'atc', theme: 'org', term: 'ATC', kind: 'both', src: C2 + ' + ' + C3,
    def: 'Air Traffic Control: checks the runway (runway verification), applies separation rules, gives wind and weather information, and gives the “clear for take-off”. Do not confuse it with ATCC (Aircraft Type Conversion Course).',
    el: [
      e('Full name: Air Traffic Control', 'air traffic control', 'controle aerien', 'controle de la circulation aerienne'),
      e('Role: runway, separation, weather, take-off clearance', 'runway', 'separation*', 'wind', 'weather', 'clear for take off', 'clear for takeoff', 'clearance', 'take off', 'takeoff', 'authoris*', 'authoriz*', 'permission', 'guide*', 'traffic'),
    ] }),
  n({ id: 'icao-vs-easa', theme: 'org', term: 'ICAO vs EASA', kind: 'def', src: `${L1} + ${C1}`,
    q: 'What is the difference between ICAO and EASA?',
    def: 'ICAO = worldwide level: recommendations and standards (SARPs). EASA = European level: legally binding laws that implement ICAO standards.',
    el: [
      e('ICAO: worldwide level, recommendations', 'world*', 'global*', 'international*', 'recommend*', 'standard*', 'guideline*', 'mondial*'),
      e('EASA: European level, binding laws', 'europ*', 'law*', 'binding', 'legal*', 'mandatory', 'compulsory', 'eu'),
    ] }),
  n({ id: 'easa-vs-dgac', theme: 'org', term: 'EASA vs DGAC', kind: 'def', src: `${L1} + ${C1}`,
    q: 'What is the difference between EASA and the DGAC?',
    def: 'EASA = European level: makes the laws. DGAC = national level (France): implements EASA rules and can add stricter ones.',
    el: [
      e('EASA: European level', 'europ*', 'eu', 'union'),
      e('DGAC: France, implements EASA + stricter rules', 'france', 'french', 'national*', 'strict*', 'extra', 'additional', 'local', 'implement*', 'appli*', 'enforce*'),
    ] }),
  n({ id: 'icao-origin', theme: 'org', term: 'ICAO: creation and headquarters', kind: 'def', src: `${L1} + ${C1}`,
    q: 'When and where was ICAO created, and where is its headquarters?',
    def: 'ICAO: created in 1944 (Chicago Convention), headquarters in Montreal.',
    el: [e('1944', '1944'), e('Chicago', 'chicago'), e('Montreal', 'montreal')] }),
  n({ id: 'easa-origin', theme: 'org', term: 'EASA: creation and headquarters', kind: 'def', src: `${L1} + ${C1}`,
    q: 'In which year was EASA created, and where is its headquarters?',
    def: 'EASA: created in 2002, headquarters in Cologne (Germany).',
    el: [e('2002', '2002'), e('Cologne', 'cologne', 'koln')] }),
  n({ id: 'icao-standards', theme: 'org', term: 'ICAO: standards and recommendations', kind: 'def', src: C1, quiz: false,
    flag: 'Hard-to-read notes: “Recommendation / Standards = 60 min toilets / main not most”. I could not extract a reliable definition.',
    def: 'Your notes contrast “recommendation” and “standards”, but the lines “60 min toilets” and “main not most” are ambiguous. Check with your instructor before learning it.',
    el: [] }),

  // ───────── Crew and health
  n({ id: 'cca', theme: 'crew', term: 'CCA', kind: 'full', src: L1,
    def: 'Cabin Crew Attestation: step 1 of the qualification path (attestation).',
    el: [e('Cabin Crew Attestation', 'cabin crew attestation', 'attestation navigant cabine')] }),
  n({ id: 'occ', theme: 'crew', term: 'OCC', kind: 'full', src: `${L1} + ${C1}`,
    def: 'Operator Conversion Course: step 2 of the qualification path (conversion to the operator, i.e. the airline).',
    el: [e('Operator Conversion Course', 'operator conversion course', 'conversion operateur')] }),
  n({ id: 'atcc', theme: 'crew', term: 'ATCC', kind: 'both', src: `${L1} + ${C1}`,
    def: 'Aircraft Type Conversion Course: step 3, the type rating on an aircraft; maximum 3 types.',
    el: [
      e('Full name: Aircraft Type Conversion Course', 'aircraft type conversion course', 'conversion type avion'),
      e('Role: step 3, type rating', 'type rating', 'rating', 'qualification', 'step 3', 'third step'),
    ] }),
  n({ id: 'steps', theme: 'crew', term: 'Qualification steps', kind: 'def', src: `${L1} + ${C1}`,
    q: 'What are the three training qualification steps, in order?',
    def: 'Step 1: CCA (Attestation) → Step 2: OCC (Operator Conversion) → Step 3: ATCC (Type Rating, max 3 types).',
    el: [e('CCA', 'cca', 'cabin crew attestation', 'attestation'), e('OCC', 'occ', 'operator conversion'), e('ATCC', 'atcc', 'aircraft type conversion', 'type rating')] }),
  n({ id: 'type-rating', theme: 'crew', term: 'Type rating: maximum', kind: 'def', src: L1,
    q: 'On how many aircraft types can a CCM be qualified at most?',
    def: '3 aircraft types at most (step 3, ATCC / type rating).',
    el: [e('3 types', '3', 'three', 'trois')] }),
  n({ id: 'duties', theme: 'crew', term: 'Core duties', kind: 'def', src: L1,
    q: 'What are the three core duties of cabin crew?',
    def: 'SAFETY: emergency response and passenger safety protocols. COMMUNICATION & SERVICE: passenger interaction and a high-quality onboard experience. SECURITY: protection against unlawful interference onboard.',
    el: [
      e('Safety (emergencies, passenger safety)', 'safety', 'emergenc*', 'urgence*', 'protocol*'),
      e('Communication & service', 'service', 'communication*', 'interaction*', 'experience', 'passenger*'),
      e('Security (unlawful interference)', 'security', 'unlawful', 'interference*', 'protect*', 'surete'),
    ] }),
  n({ id: 'captain', theme: 'crew', term: 'Captain (CPT)', kind: 'def', src: L1,
    q: 'Who is the Captain (CPT) and what is the role?',
    def: 'Rank 1: Pilot in Command, with final authority for safety and flight operation.',
    el: [
      e('Pilot in Command', 'pilot in command', 'pic', 'commandant*', 'chief pilot', 'main pilot', 'in command', 'commander'),
      e('Final authority for safety and the flight', 'final*', 'authority', 'decision*', 'responsible*', 'last word', 'safety', 'in charge', 'leader'),
    ] }),
  n({ id: 'fo', theme: 'crew', term: 'First Officer (FO)', kind: 'def', src: L1,
    q: 'Who is the First Officer (FO)?',
    def: 'Rank 2: co-pilot / Cruise Captain (where applicable).',
    el: [e('Co-pilot', 'copilot*', 'co pilot*', 'copilote*', 'second pilot', 'cruise captain', 'deputy')] }),
  n({ id: 'so', theme: 'crew', term: 'Flight Engineer / SO', kind: 'def', src: L1,
    q: 'What does “Flight Engineer / SO” mean in the hierarchy?',
    def: 'Rank 3: Flight Engineer / Second Officer (SO), where applicable.',
    el: [e('Second Officer / Flight Engineer', 'second officer', 'flight engineer', 'engineer', 'officer')] }),
  n({ id: 'cabin-manager', theme: 'crew', term: 'Cabin Manager', kind: 'def', src: L1,
    q: 'Who is the Cabin Manager?',
    def: 'Rank 4: head of the cabin crew = Lead Cabin Crew / Senior Cabin Crew Member (SCCM).',
    el: [e('Lead Cabin Crew / SCCM (cabin chief)', 'lead*', 'chief*', 'senior*', 'sccm', 'head*', 'purser', 'manager', 'supervisor*', 'cabin crew')] }),
  n({ id: 'ccm', theme: 'crew', term: 'CCM', kind: 'both', src: L1,
    def: 'Cabin Crew Member: a cabin crew member (rank 5) who carries out safety and service.',
    el: [
      e('Full name: Cabin Crew Member', 'cabin crew member', 'membre equipage cabine'),
      e('Role: carries out safety and service', 'safety', 'service', 'execut*', 'carr*', 'perform*', 'passenger*'),
    ] }),
  n({ id: 'chain', theme: 'crew', term: 'Chain of command', kind: 'def', src: L1,
    q: 'List the five positions of the onboard hierarchy, from rank 1 to rank 5.',
    def: '1 Captain (CPT) · 2 First Officer (FO) · 3 Flight Engineer / SO · 4 Cabin Manager · 5 Cabin Crew.',
    min: 4,
    el: [
      e('Captain', 'captain', 'cpt', 'commandant'),
      e('First Officer', 'first officer', 'fo', 'co pilot', 'copilot'),
      e('Flight Engineer / SO', 'flight engineer', 'engineer', 'second officer', 'so'),
      e('Cabin Manager', 'cabin manager', 'sccm', 'lead'),
      e('Cabin Crew', 'cabin crew', 'ccm'),
    ] }),
  n({ id: 'reqcc', theme: 'crew', term: 'REQ CC', kind: 'both', src: L4,
    def: 'Required Crew: the minimum cabin crew needed for passenger safety on a passenger-carrying flight: 1 cabin crew per 50 aircraft seats.',
    el: [
      e('Meaning: Required Crew (minimum required)', 'required', 'minimum*', 'mandatory', 'needed', 'necessary'),
      e('Rule: 1 cabin crew per 50 seats', '50', 'fifty'),
    ] }),
  n({ id: 'addcc', theme: 'crew', term: 'ADD CC', kind: 'both', src: L4,
    def: 'Additional Crew: crew members above the REQ CC, assigned for commercial service, in-flight training, or crew rest only.',
    el: [
      e('Extra crew above the REQ CC (Additional Crew)', 'additional', 'extra', 'more', 'above', 'on top', 'supplementar*'),
      e('Use: commercial service, in-flight training, crew rest', 'service', 'training', 'rest'),
    ] }),
  n({ id: 'reqcc-145', theme: 'crew', term: 'REQ CC for 145 seats', kind: 'def', src: `${L4} (booklet question left blank)`, quiz: false,
    flag: 'The answer is not written in the booklet: it is deduced from the rule of 1 cabin crew per 50 seats.',
    def: '145 seats ÷ 50 = 2.9 → at least 3 cabin crew (rounded up). Calculated from the booklet rule: confirm with your instructor.',
    el: [] }),
  n({ id: 'scuba', theme: 'crew', term: 'Scuba diving', kind: 'def', src: L4,
    q: 'What time buffer is required between scuba diving and flying?',
    def: 'No scuba diving within 24 hours prior to flying (decompression risk).',
    el: [e('24 hours', '24', 'twenty four')] }),
  n({ id: 'alcohol', theme: 'crew', term: 'Alcohol policy', kind: 'def', src: L4,
    q: 'What is the alcohol policy before duty?',
    def: 'No alcohol within 10 hours prior to flying duty or standby.',
    el: [e('10 hours', '10', 'ten'), e('Before flying duty or standby', 'standby', 'duty', 'flying', 'flight', 'before', 'prior')] }),
  n({ id: 'drugs', theme: 'crew', term: 'Substance ban', kind: 'def', src: L4,
    q: 'What does the rule say about psychoactive drugs (substance ban)?',
    def: 'Psychoactive drugs are NOT allowed AT ALL.',
    el: [e('Banned in all circumstances', 'not allowed', 'forbidden', 'banned', 'prohibit*', 'never', 'no ', 'zero', 'at all', 'ban', 'illegal')] }),
  n({ id: 'fatigue', theme: 'crew', term: 'CC lifestyle (fatigue)', kind: 'def', src: `${L4} + ${L3}`,
    q: 'How can you prevent operational fatigue (cabin crew lifestyle)?',
    def: 'Sleep well · Eat well · Practise sport.',
    el: [
      e('Sleep well', 'sleep*', 'rest*'),
      e('Eat well (healthy)', 'eat*', 'food', 'diet', 'healthy', 'nutrition'),
      e('Practise sport', 'sport*', 'exercis*', 'practis*', 'practic*', 'workout', 'train*'),
    ] }),

  // ───────── Acronyms and alphabet
  n({ id: 'apu', theme: 'sig', term: 'APU', kind: 'both', src: C1,
    def: 'Auxiliary Power Unit: used to start the aircraft (start aircraft).',
    el: [
      e('Full name: Auxiliary Power Unit', 'auxiliary power unit', 'groupe auxiliaire de puissance'),
      e('Role: starts the aircraft', 'start*', 'engine*', 'power the aircraft', 'electric*', 'turn on', 'begin'),
    ] }),
  n({ id: 'gpu', theme: 'sig', term: 'GPU', kind: 'full', src: C1,
    flag: 'The bracketed note next to GPU (“…branches ground”) is hard to read: only the idea “plugged in on the ground” is certain.',
    def: 'Ground Power Unit: external electrical power plugged into the aircraft on the ground (as opposed to the onboard APU).',
    el: [e('Ground Power Unit', 'ground power unit', 'groupe de parc')], quiz: true }),
  n({ id: 'eta', theme: 'sig', term: 'ETA', kind: 'full', src: C1,
    def: 'Estimated Time of Arrival.',
    el: [e('Estimated Time of Arrival', 'estimated time of arrival', 'estimated arrival time', 'estimated time of arrival')] }),
  n({ id: 'lmc', theme: 'sig', term: 'LMC', kind: 'full', src: C2,
    def: 'Last Minute Change.',
    el: [e('Last Minute Change', 'last minute change')] }),
  n({ id: 'tcas', theme: 'sig', term: 'TCAS', kind: 'full', src: C2,
    def: 'Traffic Collision Avoidance System.',
    el: [e('Traffic Collision Avoidance System', 'traffic collision avoidance system', 'traffic collision avoidance')] }),
  n({ id: 'gendec', theme: 'sig', term: 'GEN DEC', kind: 'full', src: C2,
    flag: 'The bracketed note next to GEN DEC is unreadable in the photo: only the meaning of the acronym is used.',
    def: 'General Declaration.',
    el: [e('General Declaration', 'general declaration')], quiz: true }),
  n({ id: 'lt', theme: 'sig', term: 'LT', kind: 'full', src: C2,
    def: 'Local Time.',
    el: [e('Local Time', 'local time')] }),
  n({ id: 'om', theme: 'sig', term: 'OM', kind: 'both', src: C2,
    def: 'Operations Manual: contains the airline’s procedures (“your procedures”).',
    el: [
      e('Full name: Operations Manual', 'operation manual', 'operations manual'),
      e('Role: contains the procedures', 'procedure*', 'airline*', 'compan*', 'rule*', 'instruction*'),
    ] }),
  n({ id: 'mel', theme: 'sig', term: 'MEL', kind: 'full', src: C2,
    def: 'Minimum Equipment List (highlighted in your notes). Its role is not detailed in the course.',
    el: [e('Minimum Equipment List', 'minimum equipment list')] }),
  n({ id: 'aoc', theme: 'sig', term: 'AOC', kind: 'full', src: C2,
    def: 'Air Operator Certificate.',
    el: [e('Air Operator Certificate', 'air operator certificate', 'air operator s certificate')] }),
  n({ id: 'altn', theme: 'sig', term: 'ALTN', kind: 'full', src: C2,
    def: 'Alternate Airport for Landing.',
    el: [e('Alternate (Airport for Landing)', 'alternate airport', 'alternate airport for landing', 'alternate', 'alternative airport')] }),
  n({ id: 'v1', theme: 'sig', term: 'V1', kind: 'def', src: L3,
    q: 'What is V1?',
    def: 'V1 = decision speed. It depends mostly on airplane weight and runway length. It is the no return point.',
    el: [
      e('Decision speed', 'decision*', 'decide'),
      e('No return point', 'no return', 'point of no return', 'cannot stop', 'cant stop', 'return'),
      o('Depends on weight and runway length', 'weight', 'runway', 'length'),
    ] }),
  n({ id: 'feet', theme: 'sig', term: 'Feet', kind: 'def', src: `${C1} + ${C2}`,
    q: 'What is measured in feet (aviation terminology)?',
    def: 'Feet are used for heights, i.e. altitude.',
    el: [e('Height / altitude', 'height*', 'altitude*', 'alt', 'flight level')] }),
  n({ id: 'um', theme: 'sig', term: 'UM', kind: 'full', src: C1,
    flag: 'The age range “3/15 yo” in your notes is hard to read: check it before learning it.',
    def: 'Unaccompanied Minor.',
    el: [e('Unaccompanied Minor', 'unaccompanied minor')], quiz: true }),
  n({ id: 'depu', theme: 'sig', term: 'DEPU', kind: 'both', src: C1,
    def: 'Deportee Unaccompanied: a deported person travelling without an escort; sent back to their own country.',
    el: [
      e('Full name: Deportee Unaccompanied', 'deportee unaccompanied'),
      e('Role: sent back to their own country', 'country', 'sent back', 'return*', 'origin', 'deport*', 'home'),
    ] }),
  n({ id: 'depa', theme: 'sig', term: 'DEPA', kind: 'both', src: C1,
    def: 'Deportee Accompanied: a deported person travelling with an escort; sent back to their own country.',
    el: [
      e('Full name: Deportee Accompanied', 'deportee accompanied'),
      e('Role: sent back to their own country', 'country', 'sent back', 'return*', 'origin', 'deport*', 'home'),
    ] }),
  n({ id: 'inad', theme: 'sig', term: 'INAD', kind: 'both', src: C1,
    def: 'Inadmissible: a passenger refused entry who never came into the country.',
    el: [
      e('Full name: Inadmissible', 'inadmissible'),
      e('Role: never entered the country', 'never', 'refus*', 'entry', 'enter*', 'country', 'denied', 'not allowed'),
    ] }),
  n({ id: 'prm', theme: 'sig', term: 'PRM', kind: 'full', src: C1,
    def: 'Passenger Reduced Mobility. (Written “RRM” in the photo: read as PRM.)',
    el: [e('Passenger Reduced Mobility', 'passenger reduced mobility', 'passenger with reduced mobility', 'person with reduced mobility', 'reduced mobility')] }),
  n({ id: 'wchr', theme: 'sig', term: 'WCHR', kind: 'full', src: C1,
    def: 'Wheelchair Ramp.',
    el: [e('Wheelchair Ramp', 'wheelchair ramp')] }),
  n({ id: 'wchc', theme: 'sig', term: 'WCHC', kind: 'full', src: C1,
    def: 'Wheelchair Complete.',
    el: [e('Wheelchair Complete', 'wheelchair complete')] }),
  n({ id: 'wchs', theme: 'sig', term: 'WCHS', kind: 'full', src: C1, quiz: false,
    flag: 'Your notes say “Wheelchair Chair (not go up – climb)”: the exact name needs checking with your instructor.',
    def: 'A wheelchair passenger who cannot climb. The exact name needs confirmation.',
    el: [] }),
  n({ id: 'utc', theme: 'sig', term: 'UTC', kind: 'full', src: `${L3} + ${C2}`, quiz: false,
    flag: 'Two contradictory wordings: “Universal Time Zone” (booklet p.3) and “Universal Time Coordinated” (notebook). To check.',
    def: 'Reference time used in aviation. The name differs between your two notes: ask your instructor to confirm.',
    el: [] }),
  n({ id: 'nato-door', theme: 'sig', term: 'NATO alphabet: Door L1', kind: 'def', src: L2,
    q: 'In the NATO phonetic alphabet (radiotelephony), how do you spell “Door L1”?',
    def: 'L = Lima, so “Door Lima One”.',
    el: [e('Lima', 'lima'), e('One / 1', 'one', '1', 'wun')] }),
  n({ id: 'nato-seat', theme: 'sig', term: 'NATO alphabet: Seat 12B', kind: 'def', src: L2,
    q: 'In the NATO phonetic alphabet (radiotelephony), how do you announce “Seat 12B”?',
    def: 'B = Bravo: “Seat One Two Bravo” (twelve Bravo).',
    el: [e('Bravo', 'bravo'), e('Twelve / One Two / 12', 'twelve', 'one two', '12')] }),

  // ───────── Forces of flight and aircraft
  n({ id: 'forces', theme: 'vol', term: 'Four forces of flight', kind: 'def', src: L2,
    q: 'What are the four forces of flight (principles of flight)?',
    def: 'Lift (wings) · Thrust (engines) · Drag (air resistance) · Weight / Gravity.',
    el: [e('Lift', 'lift'), e('Thrust', 'thrust'), e('Drag', 'drag'), e('Weight / Gravity', 'weight', 'gravity')] }),
  n({ id: 'principle', theme: 'vol', term: 'Principle of the forces', kind: 'def', src: L2,
    q: 'What happens when one force of flight is bigger than another?',
    def: '“When a force is bigger than another, the plane moves.”',
    el: [e('The plane moves', 'move*', 'moving', 'movement', 'motion')] }),
  n({ id: 'lift', theme: 'vol', term: 'Lift', kind: 'def', src: L2,
    q: 'What is lift?',
    def: 'Lift: the force produced by the wings that makes the aircraft fly (“fait décoller”: it takes the aircraft off the ground).',
    el: [e('Makes the aircraft fly / take off', 'fly*', 'flight', 'take off', 'takeoff', 'rise', 'up', 'air', 'raise*', 'leave the ground'), o('Produced by the wings', 'wing*')] }),
  n({ id: 'thrust', theme: 'vol', term: 'Thrust', kind: 'def', src: L2,
    q: 'What is thrust?',
    def: 'Thrust: the force from the engines that makes the aircraft move forward.',
    el: [e('Makes the aircraft move forward', 'forward*', 'move*', 'push*', 'propel*', 'ahead', 'accelerat*'), o('Produced by the engines', 'engine*', 'turbine*', 'motor*')] }),
  n({ id: 'drag', theme: 'vol', term: 'Drag', kind: 'def', src: L2,
    q: 'What is drag?',
    def: 'Drag: air resistance, which slows the aircraft down (to slow).',
    el: [e('Air resistance', 'resistance*', 'air', 'friction*'), e('Slows the aircraft down', 'slow*', 'brak*', 'reduc*')] }),
  n({ id: 'weight', theme: 'vol', term: 'Weight / Gravity', kind: 'def', src: L2,
    q: 'What is weight / gravity?',
    def: 'Weight / Gravity: the force that pulls the aircraft down to the ground.',
    el: [e('Weight / gravity', 'weight', 'gravity'), e('Pulls down to the ground', 'ground', 'down*', 'earth', 'pull*', 'attract*')] }),
  n({ id: 'elevators', theme: 'vol', term: 'Elevators', kind: 'def', src: `${L2} + ${C3}`,
    q: 'What are the elevators used for?',
    def: 'Elevators: they point the nose of the aircraft up or down (pitch).',
    el: [e('Point the nose up or down', 'nose', 'up', 'down', 'raise*', 'lower*'), o('Pitch movement', 'pitch')] }),
  n({ id: 'ailerons', theme: 'vol', term: 'Ailerons', kind: 'def', src: `${L2} + ${C3}`,
    q: 'What are the ailerons used for?',
    def: 'Ailerons: they roll the aircraft.',
    el: [e('Roll the aircraft', 'roll*', 'bank*', 'tilt*', 'rotat*')] }),
  n({ id: 'flaps', theme: 'vol', term: 'Flaps', kind: 'def', src: `${L2} + ${C3}`,
    q: 'What are the flaps used for?',
    def: 'Flaps: they increase lift and drag.',
    el: [e('Increase lift', 'lift'), e('Increase drag', 'drag', 'resistance*')] }),
  n({ id: 'rudder', theme: 'vol', term: 'Rudder', kind: 'def', src: `${L2} + ${C3}`,
    q: 'What is the rudder used for?',
    def: 'Rudder: side-to-side rotation of the aircraft (yaw).',
    el: [e('Side-to-side rotation', 'side*', 'left', 'right', 'lateral*', 'turn*', 'rotat*', 'direction*'), o('Yaw', 'yaw')] }),
  n({ id: 'spoilers', theme: 'vol', term: 'Spoilers', kind: 'def', src: `${L2} + ${C3}`,
    q: 'What are the spoilers used for?',
    def: 'Spoilers: they change (reduce) lift and slow the aircraft down.',
    el: [e('Change / reduce lift', 'lift', 'reduc*', 'change*', 'spoil*'), e('Slow the aircraft down', 'slow*', 'brak*')] }),
  n({ id: 'narrow', theme: 'vol', term: 'Narrow body', kind: 'def', src: L2,
    q: 'How would you describe a narrow body aircraft (aisles, routes, evacuation)?',
    def: 'Narrow body: 1 aisle, short to medium haul routes, evacuation by slide (no raft) / self help exit.',
    min: 2,
    el: [e('1 aisle', '1 aisle', 'one aisle', 'single aisle', 'one single aisle', 'single'), e('Short to medium haul', 'short*', 'medium*'), o('Evacuation: slide (no raft) / self help exit', 'slide*', 'raft*', 'self')] }),
  n({ id: 'wide', theme: 'vol', term: 'Wide body', kind: 'def', src: L2,
    q: 'How would you describe a wide body aircraft (aisles, routes, evacuation)?',
    def: 'Wide body: 2 aisles, long haul heavy routes, evacuation by slide / raft / doors only.',
    min: 2,
    el: [e('2 aisles', '2 aisles', 'two aisles', 'two', 'double aisle', 'twin aisle'), e('Long haul (heavy)', 'long*', 'heavy'), o('Evacuation: slide / raft / doors only', 'slide*', 'raft*', 'doors')] }),
  n({ id: 'flightdeck', theme: 'vol', term: 'Flight deck', kind: 'def', src: L2,
    q: 'What is the flight deck?',
    def: 'Flight deck = cockpit.',
    el: [e('Cockpit', 'cockpit', 'pilot s compartment', 'pilots compartment')] }),
  n({ id: 'parts', theme: 'vol', term: 'Aircraft parts', kind: 'def', src: `${L2} + ${C3}`, quiz: false,
    flag: 'A list of notes without definitions: useful to know but not tested in the quiz.',
    def: 'Aircraft parts: wings · turbine engine · landing gear · fuselage · flight deck / cockpit · tail · flaps.',
    el: [] }),

  // ───────── Cabin and doors
  n({ id: 'pa', theme: 'cab', term: 'PA', kind: 'both', src: L3,
    def: 'Public Address: used to make announcements to passengers (information and safety briefings).',
    el: [
      e('Full name: Public Address', 'public address'),
      e('Role: announcements to passengers (information, safety briefings)', 'passenger*', 'announcement*', 'announce*', 'briefing*', 'information*', 'inform*'),
    ] }),
  n({ id: 'interphone', theme: 'cab', term: 'Interphone system', kind: 'def', src: `${L3} + ${C3}`,
    q: 'What is the interphone system?',
    def: 'Interphone: internal calls cabin ↔ cockpit, cockpit ↔ cabin and cabin ↔ cabin (call, announcement, commands, with “Press To Talk”).',
    el: [e('Internal calls (crew)', 'internal*', 'call*', 'communicat*', 'crew', 'between'), e('Between cockpit and cabin (and cabin ↔ cabin)', 'cockpit', 'cabin')] }),
  n({ id: 'pa-vs-int', theme: 'cab', term: 'PA vs interphone', kind: 'def', src: L3,
    q: 'What is the difference between the PA and the interphone?',
    def: 'PA = public announcements to passengers. Interphone = internal calls between the cockpit and the cabin (or between cabins), not for passengers.',
    el: [e('PA: announcements to passengers', 'passenger*', 'public*', 'announce*', 'announcement*'), e('Interphone: internal calls crew / cockpit', 'internal*', 'crew', 'cockpit', 'between', 'call*', 'private*')] }),
  n({ id: 'cockpit-cmd', theme: 'cab', term: 'Cockpit commands', kind: 'def', src: L3,
    q: 'What are the cockpit commands?',
    def: 'Cockpit commands: direct operational orders and signals from the cockpit to the cabin crew.',
    el: [e('Direct operational orders / signals', 'order*', 'command*', 'instruction*', 'signal*', 'operational*', 'direct*'), e('From the cockpit to the cabin crew', 'cockpit', 'crew', 'cabin', 'pilot*')] }),
  n({ id: 'galley', theme: 'cab', term: 'Galley', kind: 'def', src: `${L3} + ${C3}`,
    q: 'What is the galley and what does it include? (give at least 4 items)',
    def: 'Galley: the kitchen area. It includes trolleys (service carts), containers, ovens, coffee maker / water boiler, main power, circuit breakers and water shut-off valves.',
    min: 4,
    el: [e('Trolleys (service carts)', 'trolley*', 'service cart*', 'cart*'), e('Containers', 'container*'), e('Ovens', 'oven*'), e('Coffee maker / water boiler', 'coffee*', 'boiler*', 'water*', 'kettle'), e('Main power', 'main power', 'power'), e('Circuit breakers', 'circuit*', 'breaker*'), e('Water shut-off valves', 'shut off', 'shutoff', 'valve*')] }),
  n({ id: 'cabin-inc', theme: 'cab', term: 'Cabin includes', kind: 'def', src: C3,
    q: 'What does the cabin include? Give at least 5 items.',
    def: 'Cabin includes: aural and visual signs, seatbelt sign, passenger call, interphone call, lavatory call, emergency lights, passenger seat, luggage bins, window blinds.',
    min: 5,
    el: [e('Aural and visual signs', 'aural', 'visual*', 'signs', 'sign'), e('Seatbelt sign', 'seatbelt*', 'seat belt*'), e('Passenger call', 'passenger call'), e('Interphone call', 'interphone'), e('Lavatory call', 'lavatory call', 'lavatory'), e('Emergency lights', 'emergency light*', 'emergency'), e('Passenger seat', 'seat*'), e('Luggage bins', 'luggage*', 'bins', 'bin', 'baggage'), e('Window blinds', 'blind*', 'window*', 'shade*')] }),
  n({ id: 'lavatories', theme: 'cab', term: 'Lavatories', kind: 'def', src: C3,
    q: 'What safety equipment is found in the lavatories?',
    def: 'Lavatories: smoke detectors and a waste bin extinguisher.',
    el: [e('Smoke detectors', 'smoke*', 'detector*'), e('Waste bin extinguisher', 'extinguish*', 'waste*', 'bin')] }),
  n({ id: 'crew-rest', theme: 'cab', term: 'Crew rest area', kind: 'def', src: C3,
    q: 'What is found in the crew rest area? Give at least 4 items.',
    def: 'Crew rest area: for crew only. It includes seatbelts, interphone, safety equipment, oxygen masks and a smoke detector.',
    min: 4,
    el: [e('Crew only', 'crew only', 'only crew', 'crew'), e('Seatbelts', 'seatbelt*', 'seat belt*'), e('Interphone', 'interphone'), e('Safety equipment', 'safety', 'equipment*'), e('Oxygen masks', 'oxygen*', 'mask*'), e('Smoke detector', 'smoke*', 'detector*')] }),
  n({ id: 'door-l1', theme: 'cab', term: 'Door L1', kind: 'def', src: L3,
    q: 'Which door is “L1”?',
    def: 'PAX door L1: Left Forward Entry (passenger entry door, front left).',
    el: [e('Passenger door (PAX / entry)', 'pax', 'passenger*', 'entry', 'entrance'), e('Front left (Left Forward)', 'forward', 'front', 'fwd', 'left')] }),
  n({ id: 'door-r1', theme: 'cab', term: 'Door R1', kind: 'def', src: L3,
    q: 'Which door is “R1”?',
    def: 'Service door R1: Right Forward Service (service door, front right).',
    el: [e('Service door', 'service'), e('Front right (Right Forward)', 'forward', 'front', 'fwd', 'right')] }),
  n({ id: 'door-l2', theme: 'cab', term: 'Door L2', kind: 'def', src: L3,
    q: 'Which door is “L2”?',
    def: 'PAX door L2: Left Rear Entry (passenger entry door, rear left).',
    el: [e('Passenger door (PAX / entry)', 'pax', 'passenger*', 'entry', 'entrance'), e('Rear left (Left Rear)', 'rear', 'back', 'aft', 'left')] }),
  n({ id: 'door-r2', theme: 'cab', term: 'Door R2', kind: 'def', src: L3,
    q: 'Which door is “R2”?',
    def: 'Service door R2: Right Rear Service (service door, rear right).',
    el: [e('Service door', 'service'), e('Rear right (Right Rear)', 'rear', 'back', 'aft', 'right')] }),
  n({ id: 'door-steps', theme: 'cab', term: 'Standard door opening procedure', kind: 'def', src: L3,
    q: 'What are the three steps of the standard door opening procedure?',
    def: 'Step 1: Check Outside (visual check through the window). Step 2: Disarm / Verify (assess the arming state). Step 3: Rotate Handle (operate the handle as trained).',
    el: [e('Check outside (visual check through the window)', 'check*', 'outside', 'window', 'visual*'), e('Disarm / Verify (arming state)', 'disarm*', 'verif*', 'verify', 'arm*'), e('Rotate handle', 'rotate*', 'rotation', 'turn*', 'handle', 'open*')] }),
  n({ id: 'door-fam', theme: 'cab', term: 'Door familiarisation', kind: 'def', src: `${L3} + ${C3}`,
    q: 'What elements should you identify on a door during the general cabin door familiarisation? Give at least 4.',
    def: 'Viewing window · girt bar / slide bar · door handle · instructions placard · slide container · arming lever (slide selector).',
    min: 4,
    el: [e('Viewing window', 'viewing', 'window'), e('Girt bar / slide bar', 'girt', 'slide bar', 'bar'), e('Door handle', 'handle'), e('Instructions placard', 'placard*', 'instruction*'), e('Slide container', 'slide container', 'container', 'slide'), e('Arming lever', 'arming*', 'lever', 'selector')] }),
  n({ id: 'arming', theme: 'cab', term: 'Arming lever / slide selector', kind: 'def', src: `${L3} + ${C3}`, quiz: false,
    flag: 'Your course names the element (“slide selector / arming lever”) without explaining how it works: not tested.',
    def: 'Arming lever (slide selector): a door lever linked to arming the slide. Its function is not detailed in your booklet or notes.',
    el: [] }),
]

export const QUIZ_NOTIONS = NOTIONS.filter((x) => x.quiz)
export const byId = (id: string) => NOTIONS.find((x) => x.id === id)!
export const themeName = (id: string) => THEMES.find((t) => t.id === id)?.name ?? id

export const expectText = (x: Notion) => {
  if (x.min) return `at least ${x.min} items from the course`
  if (x.kind === 'full') return 'the full name'
  if (x.kind === 'role') return 'the role'
  if (x.kind === 'both') return 'the full name and the role'
  return 'the definition'
}
