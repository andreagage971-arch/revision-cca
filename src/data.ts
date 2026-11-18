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
  { id: 'org', name: 'Organismes' },
  { id: 'crew', name: 'Équipage et santé' },
  { id: 'sig', name: 'Sigles et alphabet' },
  { id: 'vol', name: 'Forces du vol et avion' },
  { id: 'cab', name: 'Cabine et portes' },
] as const

const L1 = 'Livret p.1 · PHOTO-2026-11-18-00-59-23.jpg'
const L2 = 'Livret p.2 · PHOTO-2026-11-18-00-59-30.jpg'
const L3 = 'Livret p.3 · PHOTO-2026-11-18-00-59-34.jpg'
const L4 = 'Livret p.4 · PHOTO-2026-11-18-00-59-39.jpg'
const C1 = 'Cahier · PHOTO-2026-11-18-01-01-35.jpg'
const C2 = 'Cahier · PHOTO-2026-11-18-01-01-45.jpg'
const C3 = 'Cahier · PHOTO-2026-11-18-01-02-04.jpg'

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
      ? `Développe le sigle ${x.term}.`
      : x.kind === 'role'
        ? `À quoi sert ${x.term} ?`
        : x.kind === 'both'
          ? `Donne l’intitulé complet de ${x.term} et son rôle.`
          : `Rappelle la définition de : ${x.term}.`)
  return {
    id: x.id, theme: x.theme, term: x.term, kind: x.kind,
    q: x.q ?? `Que signifie ${x.term} ?`, alt, def: x.def, el: x.el, min: x.min,
    source: x.src, quiz: x.quiz ?? !x.flag, flag: x.flag,
  }
}

export const NOTIONS: Notion[] = [
  // ───────── Organismes
  n({ id: 'icao', theme: 'org', term: 'ICAO', kind: 'both', src: `${L1} + ${C1}`,
    def: 'International Civil Aviation Organisation (OACI) : organisme mondial qui émet des recommandations internationales (SARPs : standards and recommended practices) et des politiques de sécurité.',
    el: [
      e('Intitulé complet : International Civil Aviation Organisation', 'international civil aviation organisation', 'international civil aviation organization', 'organisation de l aviation civile internationale', 'organisation aviation civile internationale', 'oaci'),
      e('Rôle : recommandations / standards au niveau mondial', 'recommand*', 'recommend*', 'standard*', 'sarps', 'guideline*', 'global*', 'mondial*', 'monde', 'world', 'regles internationales', 'politique*'),
    ] }),
  n({ id: 'easa', theme: 'org', term: 'EASA', kind: 'both', src: `${L1} + ${C1}`,
    def: 'European Aviation Safety Agency (AESA) : agence européenne qui fait les lois contraignantes de sécurité aérienne pour les États de l’UE. Elle applique (implement) d’abord les standards de l’ICAO, puis crée des règles supplémentaires.',
    el: [
      e('Intitulé complet : European Aviation Safety Agency', 'european aviation safety agency', 'agence europeenne de la securite aerienne', 'agence europeenne securite aerienne', 'aesa'),
      e('Rôle : lois de sécurité européennes (applique les standards ICAO)', 'loi*', 'law*', 'regle*', 'regulation*', 'rule*', 'binding', 'contraignant*', 'implement*', 'appliqu*', 'obligatoire*'),
    ] }),
  n({ id: 'dgac', theme: 'org', term: 'DGAC', kind: 'both', src: `${L1} + ${C1}`,
    def: 'Direction Générale de l’Aviation Civile (France) = la Civil Aviation Authority (CAA) française : elle applique (implement) la réglementation EASA et peut créer des règles supplémentaires, plus strictes, pour la France.',
    el: [
      e('Intitulé complet : Direction Générale de l’Aviation Civile', 'direction generale de l aviation civile', 'direction generale aviation civile'),
      e('Rôle : applique les règles EASA (+ règles locales plus strictes)', 'easa', 'appliqu*', 'implement*', 'regle*', 'regulation*', 'rule*', 'strict*', 'supplementaire*', 'extra', 'autorite', 'authority'),
    ] }),
  n({ id: 'caa', theme: 'org', term: 'CAA', kind: 'full', src: `${L1} + ${C1}`,
    def: 'Civil Aviation Authority : autorité nationale de l’aviation civile. Pour la France, c’est la DGAC.',
    el: [e('Civil Aviation Authority', 'civil aviation authority', 'autorite de l aviation civile', 'autorite nationale aviation civile', 'autorite aviation civile')] }),
  n({ id: 'iata', theme: 'org', term: 'IATA', kind: 'role', src: C1,
    def: 'Organisation de soutien (siège à Genève) qui s’occupe de l’aspect financier de l’aviation : elle aide les compagnies (airlines) à gagner de l’argent. L’intitulé complet n’est pas écrit dans tes notes.',
    q: 'Quel est le rôle de l’IATA ? (l’intitulé complet n’est pas dans tes notes)',
    alt: 'Que fait l’IATA pour les compagnies aériennes ?',
    el: [e('Aspect financier : aide les compagnies à faire du profit', 'financ*', 'money', 'argent', 'profit*', 'benefice*', 'econom*', 'rentab*', 'compagnie*', 'airline*')] }),
  n({ id: 'atc', theme: 'org', term: 'ATC', kind: 'both', src: C2 + ' + ' + C3,
    def: 'Air Traffic Control (contrôle de la circulation aérienne) : vérifie la piste (runway verification), applique les règles de séparation, donne vent et météo, et donne le « clear for take-off ». Attention : ne pas confondre avec ATCC (Aircraft Type Conversion Course).',
    el: [
      e('Intitulé complet : Air Traffic Control', 'air traffic control', 'controle aerien', 'controle de la circulation aerienne', 'controle du trafic aerien'),
      e('Rôle : piste, séparation, météo, autorisation de décoller', 'runway', 'piste*', 'separation*', 'wind', 'vent', 'meteo', 'weather', 'clear for take off', 'clear for takeoff', 'autorisation*', 'autorise*', 'decollage', 'clearance', 'guide*', 'trafic'),
    ] }),
  n({ id: 'icao-vs-easa', theme: 'org', term: 'ICAO vs EASA', kind: 'def', src: `${L1} + ${C1}`,
    q: 'Quelle est la différence entre l’ICAO et l’EASA ?',
    def: 'ICAO = niveau mondial : recommandations et standards (SARPs). EASA = niveau européen : lois contraignantes qui appliquent les standards ICAO.',
    el: [
      e('ICAO : niveau mondial, recommandations', 'mondial*', 'global*', 'monde', 'world', 'international*', 'recommand*', 'recommend*', 'standard*'),
      e('EASA : niveau européen, lois contraignantes', 'europ*', 'loi*', 'law*', 'binding', 'contraignant*', 'obligatoire*', 'ue'),
    ] }),
  n({ id: 'easa-vs-dgac', theme: 'org', term: 'EASA vs DGAC', kind: 'def', src: `${L1} + ${C1}`,
    q: 'Quelle est la différence entre l’EASA et la DGAC ?',
    def: 'EASA = niveau européen : fait les lois. DGAC = niveau national (France) : applique les règles EASA et peut ajouter des règles plus strictes.',
    el: [
      e('EASA : niveau européen', 'europ*', 'ue', 'union'),
      e('DGAC : France, applique l’EASA + règles plus strictes', 'france', 'francais*', 'national*', 'strict*', 'supplementaire*', 'extra', 'appliqu*', 'implement*'),
    ] }),
  n({ id: 'icao-origin', theme: 'org', term: 'ICAO : création et siège', kind: 'def', src: `${L1} + ${C1}`,
    q: 'Quand et où l’ICAO a-t-elle été créée, et où se trouve son siège ?',
    def: 'ICAO : créée en 1944 (convention de Chicago), siège à Montréal.',
    el: [e('1944', '1944'), e('Chicago', 'chicago'), e('Montréal', 'montreal')] }),
  n({ id: 'easa-origin', theme: 'org', term: 'EASA : création et siège', kind: 'def', src: `${L1} + ${C1}`,
    q: 'En quelle année l’EASA a-t-elle été créée et où est son siège ?',
    def: 'EASA : créée en 2002, siège à Cologne (Cologne, Allemagne).',
    el: [e('2002', '2002'), e('Cologne', 'cologne', 'koln', 'cologne')] }),
  n({ id: 'icao-standards', theme: 'org', term: 'ICAO : standards et recommandations', kind: 'def', src: C1, quiz: false,
    flag: 'Notes peu lisibles : « Recommendation / Standards = 60 min toilets / main not most ». Je n’ai pas pu en tirer une définition fiable.',
    def: 'Les notes opposent « recommendation » et « standards » mais la ligne « 60 min toilets » et « main not most » est ambiguë. À vérifier avec ton formateur avant de l’apprendre.',
    el: [] }),

  // ───────── Équipage et santé
  n({ id: 'cca', theme: 'crew', term: 'CCA', kind: 'full', src: L1,
    def: 'Cabin Crew Attestation : étape 1 de la qualification (attestation).',
    el: [e('Cabin Crew Attestation', 'cabin crew attestation', 'attestation navigant cabine', 'attestation personnel cabine', 'attestation pnc')] }),
  n({ id: 'occ', theme: 'crew', term: 'OCC', kind: 'full', src: `${L1} + ${C1}`,
    def: 'Operator Conversion Course : étape 2 de la qualification (conversion à l’opérateur, c’est-à-dire à la compagnie).',
    el: [e('Operator Conversion Course', 'operator conversion course', 'conversion operateur', 'cours de conversion operateur', 'conversion compagnie')] }),
  n({ id: 'atcc', theme: 'crew', term: 'ATCC', kind: 'both', src: `${L1} + ${C1}`,
    def: 'Aircraft Type Conversion Course : étape 3, la qualification de type (type rating) sur un avion ; maximum 3 types d’avion.',
    el: [
      e('Intitulé complet : Aircraft Type Conversion Course', 'aircraft type conversion course', 'conversion type avion', 'cours de conversion type avion'),
      e('Rôle : étape 3, qualification de type (type rating)', 'type rating', 'qualification de type', 'qualification type', 'etape 3', 'step 3', 'type d avion', 'type avion', 'avion'),
    ] }),
  n({ id: 'steps', theme: 'crew', term: 'Étapes de qualification', kind: 'def', src: `${L1} + ${C1}`,
    q: 'Quelles sont, dans l’ordre, les trois étapes de la qualification (training qualification steps) ?',
    def: 'Step 1 : CCA (Attestation) → Step 2 : OCC (Operator Conversion) → Step 3 : ATCC (Type Rating, max 3 types).',
    el: [e('CCA', 'cca', 'cabin crew attestation', 'attestation'), e('OCC', 'occ', 'operator conversion'), e('ATCC', 'atcc', 'aircraft type conversion', 'type rating')] }),
  n({ id: 'type-rating', theme: 'crew', term: 'Type rating : maximum', kind: 'def', src: L1,
    q: 'Sur combien de types d’avion un CCM peut-il être qualifié au maximum ?',
    def: '3 types d’avion au maximum (étape 3, ATCC / type rating).',
    el: [e('3 types', '3', 'trois', 'three')] }),
  n({ id: 'duties', theme: 'crew', term: 'Core duties', kind: 'def', src: L1,
    q: 'Quelles sont les trois missions principales du cabin crew (core duties) ?',
    def: 'SAFETY : réponse aux urgences et sécurité des passagers. COMMUNICATION & SERVICE : interaction avec les passagers et expérience de qualité à bord. SECURITY : protection contre les interférences illicites.',
    el: [
      e('Safety (urgences, sécurité des passagers)', 'safety', 'urgence*', 'emergency', 'secours', 'securite'),
      e('Communication & service', 'service', 'communication*', 'communiquer', 'interaction*', 'confort', 'accueil*'),
      e('Security (interférences illicites)', 'security', 'surete', 'unlawful', 'interference*', 'malveillan*', 'illicite*', 'protection*'),
    ] }),
  n({ id: 'captain', theme: 'crew', term: 'Captain (CPT)', kind: 'def', src: L1,
    q: 'Qui est le Captain (CPT) et quel est son rôle ?',
    def: 'Rang 1 : Pilot in Command, autorité finale sur la sécurité et l’exploitation du vol.',
    el: [
      e('Pilot in Command (commandant de bord)', 'pilot in command', 'commandant*', 'pic', 'chef', 'pilote*', 'capitaine'),
      e('Autorité finale sur la sécurité et le vol', 'final*', 'authority', 'autorite', 'decision*', 'responsable*', 'dernier*', 'securite', 'safety'),
    ] }),
  n({ id: 'fo', theme: 'crew', term: 'First Officer (FO)', kind: 'def', src: L1,
    q: 'Qui est le First Officer (FO) ?',
    def: 'Rang 2 : co-pilote / Cruise Captain (selon le cas).',
    el: [e('Co-pilote', 'copilot*', 'co pilot*', 'copilote*', 'second pilote', 'cruise captain', 'adjoint')] }),
  n({ id: 'so', theme: 'crew', term: 'Flight Engineer / SO', kind: 'def', src: L1,
    q: 'Que veut dire « Flight Engineer / SO » dans la hiérarchie ?',
    def: 'Rang 3 : Flight Engineer / Second Officer (SO) selon les avions (« where applicable »).',
    el: [e('Second Officer / Flight Engineer', 'second officer', 'flight engineer', 'ingenieur*', 'engineer', 'officier*')] }),
  n({ id: 'cabin-manager', theme: 'crew', term: 'Cabin Manager', kind: 'def', src: L1,
    q: 'Qui est le Cabin Manager ?',
    def: 'Rang 4 : responsable de l’équipage cabine = Lead Cabin Crew / Senior Cabin Crew Member (SCCM).',
    el: [e('Chef de cabine : Lead Cabin Crew / SCCM', 'lead*', 'chef*', 'senior*', 'sccm', 'responsable*', 'superviseur*', 'purser', 'manager', 'cabin crew')] }),
  n({ id: 'ccm', theme: 'crew', term: 'CCM', kind: 'both', src: L1,
    def: 'Cabin Crew Member : membre d’équipage cabine (rang 5) qui exécute la sécurité et le service.',
    el: [
      e('Intitulé complet : Cabin Crew Member', 'cabin crew member', 'membre d equipage cabine', 'membre equipage cabine', 'membre de l equipage cabine', 'pnc'),
      e('Rôle : exécute la sécurité et le service', 'safety', 'securite', 'service', 'execut*', 'appliqu*', 'passager*'),
    ] }),
  n({ id: 'chain', theme: 'crew', term: 'Chaîne de commandement', kind: 'def', src: L1,
    q: 'Cite les cinq positions de la hiérarchie à bord, du rang 1 au rang 5.',
    def: '1 Captain (CPT) · 2 First Officer (FO) · 3 Flight Engineer / SO · 4 Cabin Manager · 5 Cabin Crew.',
    min: 4,
    el: [
      e('Captain', 'captain', 'capitaine', 'commandant', 'cpt'),
      e('First Officer', 'first officer', 'fo', 'copilote', 'co pilote'),
      e('Flight Engineer / SO', 'flight engineer', 'engineer', 'second officer', 'so', 'ingenieur*'),
      e('Cabin Manager', 'cabin manager', 'sccm', 'chef de cabine', 'lead'),
      e('Cabin Crew', 'cabin crew', 'ccm', 'equipage cabine'),
    ] }),
  n({ id: 'reqcc', theme: 'crew', term: 'REQ CC', kind: 'both', src: L4,
    def: 'Required Crew : équipage cabine minimum pour la sécurité des passagers sur un vol commercial : 1 cabin crew par 50 sièges de l’avion.',
    el: [
      e('Intitulé : Required Crew (minimum requis)', 'required', 'requis*', 'minimum*', 'obligatoire*', 'necessaire*'),
      e('Règle : 1 cabin crew pour 50 sièges', '50', 'cinquante'),
    ] }),
  n({ id: 'addcc', theme: 'crew', term: 'ADD CC', kind: 'both', src: L4,
    def: 'Additional Crew : membres d’équipage en plus du REQ CC, affectés pour le service commercial, la formation en vol ou le repos de l’équipage seulement.',
    el: [
      e('Équipage supplémentaire (Additional Crew), au-dessus du REQ CC', 'additional', 'additionnel*', 'supplementaire*', 'extra', 'en plus', 'au dessus', 'above'),
      e('Usage : service commercial, formation en vol, repos équipage', 'service', 'training', 'formation', 'rest', 'repos'),
    ] }),
  n({ id: 'reqcc-145', theme: 'crew', term: 'REQ CC pour 145 sièges', kind: 'def', src: `${L4} (question du livret laissée vide)`, quiz: false,
    flag: 'La réponse n’est pas écrite dans le livret : elle se déduit de la règle 1 cabin crew / 50 sièges.',
    def: '145 sièges ÷ 50 = 2,9 → 3 cabin crew au minimum (arrondi au supérieur). Calcul déduit de la règle du livret : à confirmer avec ton formateur.',
    el: [] }),
  n({ id: 'scuba', theme: 'crew', term: 'Plongée sous-marine (scuba diving)', kind: 'def', src: L4,
    q: 'Quel délai faut-il respecter entre une plongée sous-marine (scuba diving) et un vol ?',
    def: 'Aucune plongée dans les 24 heures avant de voler (risque de décompression).',
    el: [e('24 heures', '24', 'vingt quatre')] }),
  n({ id: 'alcohol', theme: 'crew', term: 'Alcohol policy', kind: 'def', src: L4,
    q: 'Quelle est la règle sur l’alcool avant un service (alcohol policy) ?',
    def: 'Aucun alcool dans les 10 heures avant le flying duty ou le standby.',
    el: [e('10 heures', '10', 'dix'), e('Avant le service de vol ou le standby', 'standby', 'duty', 'service', 'vol', 'avant', 'prior')] }),
  n({ id: 'drugs', theme: 'crew', term: 'Substance ban', kind: 'def', src: L4,
    q: 'Que dit la règle sur les drogues psychoactives (substance ban) ?',
    def: 'Les drogues psychoactives ne sont PAS autorisées du tout.',
    el: [e('Interdites en toutes circonstances', 'interdit*', 'autoris*', 'allowed', 'jamais', 'ban*', 'aucune*', 'zero', 'tolerance*', 'pas')] }),
  n({ id: 'fatigue', theme: 'crew', term: 'CC lifestyle (fatigue)', kind: 'def', src: `${L4} + ${L3}`,
    q: 'Comment prévenir la fatigue opérationnelle (cabin crew lifestyle) ?',
    def: 'Sleep well · Eat well · Practise sport.',
    el: [
      e('Bien dormir (sleep well)', 'sleep*', 'dorm*', 'sommeil', 'repos*'),
      e('Bien manger (eat healthy)', 'eat*', 'mang*', 'aliment*', 'healthy', 'sain*'),
      e('Pratiquer du sport', 'sport*', 'practi*', 'exercice*', 'activite*'),
    ] }),

  // ───────── Sigles et alphabet
  n({ id: 'apu', theme: 'sig', term: 'APU', kind: 'both', src: C1,
    def: 'Auxiliary Power Unit : groupe auxiliaire de puissance, qui sert à démarrer l’avion (start aircraft).',
    el: [
      e('Intitulé complet : Auxiliary Power Unit', 'auxiliary power unit', 'groupe auxiliaire de puissance', 'groupe auxiliaire', 'unite auxiliaire'),
      e('Rôle : démarrer l’avion', 'demarr*', 'start*', 'allum*', 'lancer', 'moteur*'),
    ] }),
  n({ id: 'gpu', theme: 'sig', term: 'GPU', kind: 'full', src: C1,
    flag: 'La parenthèse de tes notes (« …branches ground ») est peu lisible : seule l’idée « branché au sol » est sûre.',
    def: 'Ground Power Unit : alimentation électrique extérieure branchée à l’avion au sol (par opposition à l’APU, embarquée).',
    el: [e('Ground Power Unit', 'ground power unit', 'groupe de parc', 'alimentation au sol', 'unite de puissance au sol', 'groupe electrogene sol')], quiz: true }),
  n({ id: 'eta', theme: 'sig', term: 'ETA', kind: 'full', src: C1,
    def: 'Estimated Time of Arrival : heure d’arrivée estimée.',
    el: [e('Estimated Time of Arrival', 'estimated time of arrival', 'heure d arrivee estimee', 'heure estimee d arrivee', 'heure d arrivee prevue')] }),
  n({ id: 'lmc', theme: 'sig', term: 'LMC', kind: 'full', src: C2,
    def: 'Last Minute Change : changement de dernière minute.',
    el: [e('Last Minute Change', 'last minute change', 'changement de derniere minute', 'changement derniere minute', 'modification derniere minute')] }),
  n({ id: 'tcas', theme: 'sig', term: 'TCAS', kind: 'full', src: C2,
    def: 'Traffic Collision Avoidance System : système d’évitement de collision.',
    el: [e('Traffic Collision Avoidance System', 'traffic collision avoidance system', 'systeme d evitement de collision', 'systeme anti collision', 'evitement de collision', 'anti collision')] }),
  n({ id: 'gendec', theme: 'sig', term: 'GEN DEC', kind: 'full', src: C2,
    flag: 'La parenthèse à côté de GEN DEC est illisible dans la photo : seule la signification du sigle est utilisée.',
    def: 'General Declaration (déclaration générale du vol).',
    el: [e('General Declaration', 'general declaration', 'declaration generale')], quiz: true }),
  n({ id: 'lt', theme: 'sig', term: 'LT', kind: 'full', src: C2,
    def: 'Local Time : heure locale.',
    el: [e('Local Time', 'local time', 'heure locale')] }),
  n({ id: 'om', theme: 'sig', term: 'OM', kind: 'both', src: C2,
    def: 'Operations Manual : le manuel d’exploitation, qui contient les procédures de la compagnie (« your procedures »).',
    el: [
      e('Intitulé complet : Operations Manual', 'operation manual', 'operations manual', 'manuel d exploitation', 'manuel exploitation'),
      e('Rôle : contient les procédures', 'procedure*', 'compagnie*', 'airline*', 'regle*', 'consigne*'),
    ] }),
  n({ id: 'mel', theme: 'sig', term: 'MEL', kind: 'full', src: C2,
    def: 'Minimum Equipment List : liste des équipements minimum (surlignée dans tes notes). Son rôle n’est pas détaillé dans le cours.',
    el: [e('Minimum Equipment List', 'minimum equipment list', 'liste minimale d equipements', 'liste d equipements minimum', 'liste equipements minimum', 'liste minimale equipement')] }),
  n({ id: 'aoc', theme: 'sig', term: 'AOC', kind: 'full', src: C2,
    def: 'Air Operator Certificate : certificat d’exploitant aérien.',
    el: [e('Air Operator Certificate', 'air operator certificate', 'certificat d exploitant aerien', 'certificat exploitant aerien', 'certificat d exploitation')] }),
  n({ id: 'altn', theme: 'sig', term: 'ALTN', kind: 'full', src: C2,
    def: 'Alternate Airport for Landing : aéroport de dégagement pour l’atterrissage.',
    el: [e('Alternate (Airport for Landing)', 'alternate airport', 'alternate airport for landing', 'aeroport de degagement', 'aeroport alternatif', 'aeroport de secours', 'alternate')] }),
  n({ id: 'v1', theme: 'sig', term: 'V1', kind: 'def', src: L3,
    q: 'Qu’est-ce que V1 ?',
    def: 'V1 = decision speed : vitesse de décision au décollage. Elle dépend surtout du poids de l’avion et de la longueur de piste. C’est le point de non-retour (no return point).',
    el: [
      e('Vitesse de décision (decision speed)', 'decision*', 'decider', 'decide'),
      e('Point de non-retour (no return point)', 'no return', 'non retour', 'point de non retour', 'plus de retour', 'retour'),
      o('Dépend du poids et de la longueur de piste', 'poids', 'weight', 'piste', 'runway', 'longueur', 'length'),
    ] }),
  n({ id: 'feet', theme: 'sig', term: 'Feet', kind: 'def', src: `${C1} + ${C2}`,
    q: 'Quelle grandeur mesure-t-on en feet (aviation terminology) ?',
    def: 'Les feet (pieds) servent à exprimer les hauteurs (heights), c’est-à-dire l’altitude.',
    el: [e('Hauteur / altitude', 'hauteur*', 'height*', 'altitude*', 'alt', 'niveau de vol')] }),
  n({ id: 'um', theme: 'sig', term: 'UM', kind: 'full', src: C1,
    flag: 'La tranche d’âge « 3/15 yo » de tes notes est difficile à lire : à vérifier avant de l’apprendre.',
    def: 'Unaccompanied Minor : mineur non accompagné.',
    el: [e('Unaccompanied Minor', 'unaccompanied minor', 'mineur non accompagne', 'mineur seul', 'enfant non accompagne')], quiz: true }),
  n({ id: 'depu', theme: 'sig', term: 'DEPU', kind: 'both', src: C1,
    def: 'Deportee Unaccompanied : personne expulsée voyageant sans escorte ; elle est renvoyée dans son pays d’origine (sent back to his own country).',
    el: [
      e('Intitulé complet : Deportee Unaccompanied', 'deportee unaccompanied', 'deporte non accompagne', 'expulse non accompagne', 'deporte sans escorte'),
      e('Rôle : renvoyé dans son pays', 'pays', 'country', 'renvoy*', 'expuls*', 'sent back', 'retour*', 'origine'),
    ] }),
  n({ id: 'depa', theme: 'sig', term: 'DEPA', kind: 'both', src: C1,
    def: 'Deportee Accompanied : personne expulsée voyageant avec escorte ; elle est renvoyée dans son pays d’origine.',
    el: [
      e('Intitulé complet : Deportee Accompanied', 'deportee accompanied', 'deporte accompagne', 'expulse accompagne', 'deporte escorte'),
      e('Rôle : renvoyé dans son pays', 'pays', 'country', 'renvoy*', 'expuls*', 'sent back', 'retour*', 'origine'),
    ] }),
  n({ id: 'inad', theme: 'sig', term: 'INAD', kind: 'both', src: C1,
    def: 'Inadmissible : passager refusé à l’entrée sur le territoire, qui n’est jamais entré dans le pays (never came in the country).',
    el: [
      e('Intitulé complet : Inadmissible', 'inadmissible', 'non admis', 'passager inadmissible'),
      e('Rôle : n’est jamais entré dans le pays', 'jamais', 'never', 'pas entre', 'refuse*', 'entree', 'entry', 'territoire', 'country', 'pays'),
    ] }),
  n({ id: 'prm', theme: 'sig', term: 'PRM', kind: 'full', src: C1,
    def: 'Passenger Reduced Mobility : passager à mobilité réduite. (Écrit « RRM » dans la photo : lu comme PRM.)',
    el: [e('Passenger Reduced Mobility', 'passenger reduced mobility', 'passager a mobilite reduite', 'passager mobilite reduite', 'personne a mobilite reduite', 'mobilite reduite')] }),
  n({ id: 'wchr', theme: 'sig', term: 'WCHR', kind: 'full', src: C1,
    def: 'Wheelchair Ramp : passager en fauteuil roulant qui monte/descend les rampes.',
    el: [e('Wheelchair Ramp', 'wheelchair ramp', 'fauteuil roulant rampe', 'fauteuil rampe')] }),
  n({ id: 'wchc', theme: 'sig', term: 'WCHC', kind: 'full', src: C1,
    def: 'Wheelchair Complete : passager en fauteuil roulant qui a besoin d’une assistance complète.',
    el: [e('Wheelchair Complete', 'wheelchair complete', 'fauteuil roulant complet', 'fauteuil complet')] }),
  n({ id: 'wchs', theme: 'sig', term: 'WCHS', kind: 'full', src: C1, quiz: false,
    flag: 'Tes notes disent « Wheelchair Chair (not go up – climb) » : l’intitulé exact est à vérifier avec ton formateur.',
    def: 'Passager en fauteuil roulant qui ne peut pas monter (climb). L’intitulé exact est à confirmer.',
    el: [] }),
  n({ id: 'utc', theme: 'sig', term: 'UTC', kind: 'full', src: `${L3} + ${C2}`, quiz: false,
    flag: 'Deux formulations contradictoires : « Universal Time Zone » (livret p.3) et « Universal Time Coordinated » (cahier). À vérifier.',
    def: 'Fuseau/heure de référence utilisé en aviation. L’intitulé change selon tes deux notes : à faire confirmer par ton formateur.',
    el: [] }),
  n({ id: 'nato-door', theme: 'sig', term: 'Alphabet OTAN : Door L1', kind: 'def', src: L2,
    q: 'En alphabet phonétique OTAN (radiotelephony), comment épelle-t-on « Door L1 » ?',
    def: 'L = Lima, donc « Door Lima One ».',
    el: [e('Lima', 'lima'), e('One / 1', 'one', 'un', '1', 'wun')] }),
  n({ id: 'nato-seat', theme: 'sig', term: 'Alphabet OTAN : Seat 12B', kind: 'def', src: L2,
    q: 'En alphabet phonétique OTAN (radiotelephony), comment annonce-t-on « Seat 12B » ?',
    def: 'B = Bravo : « Seat One Two Bravo » (twelve Bravo).',
    el: [e('Bravo', 'bravo'), e('Twelve / One Two / 12', 'twelve', 'douze', 'one two', '12', 'un deux')] }),

  // ───────── Forces du vol et avion
  n({ id: 'forces', theme: 'vol', term: 'Quatre forces du vol', kind: 'def', src: L2,
    q: 'Quelles sont les quatre forces du vol (principles of flight) ?',
    def: 'Lift (wings) · Thrust (engines) · Drag (air resistance) · Weight / Gravity.',
    el: [e('Lift', 'lift', 'portance'), e('Thrust', 'thrust', 'poussee', 'propulsion'), e('Drag', 'drag', 'trainee', 'resistance'), e('Weight / Gravity', 'weight', 'poids', 'gravity', 'gravite')] }),
  n({ id: 'principle', theme: 'vol', term: 'Principe des forces', kind: 'def', src: L2,
    q: 'Que se passe-t-il quand une force du vol est plus grande qu’une autre ?',
    def: '« When a force is bigger than another, the plane moves » : l’avion se déplace.',
    el: [e('L’avion bouge / se déplace', 'move*', 'bouge*', 'deplace*', 'mouvement*', 'avance*')] }),
  n({ id: 'lift', theme: 'vol', term: 'Lift', kind: 'def', src: L2,
    q: 'Qu’est-ce que le lift ?',
    def: 'Lift (portance) : force produite par les wings (ailes) qui fait voler l’avion : « fait décoller ».',
    el: [e('Fait voler / décoller l’avion', 'vol*', 'fly*', 'decoll*', 'take off', 'takeoff', 'soulev*', 'monter', 'portance', 'leve*', 'air'), o('Produite par les ailes (wings)', 'aile*', 'wing*')] }),
  n({ id: 'thrust', theme: 'vol', term: 'Thrust', kind: 'def', src: L2,
    q: 'Qu’est-ce que le thrust ?',
    def: 'Thrust (poussée) : force des engines (moteurs) qui fait avancer l’avion (move forward).',
    el: [e('Fait avancer l’avion', 'avanc*', 'forward', 'pouss*', 'propuls*', 'move*', 'deplace*'), o('Produite par les moteurs (engines)', 'moteur*', 'engine*', 'reacteur*', 'turbine*')] }),
  n({ id: 'drag', theme: 'vol', term: 'Drag', kind: 'def', src: L2,
    q: 'Qu’est-ce que le drag ?',
    def: 'Drag (traînée) : la résistance de l’air, qui ralentit l’avion (to slow).',
    el: [e('Résistance de l’air', 'resistance*', 'air', 'frottement*', 'trainee'), e('Ralentit l’avion', 'ralent*', 'slow*', 'frein*')] }),
  n({ id: 'weight', theme: 'vol', term: 'Weight / Gravity', kind: 'def', src: L2,
    q: 'Qu’est-ce que le weight / gravity ?',
    def: 'Weight / Gravity (poids / gravité) : la force qui tire l’avion vers le sol (down to the ground).',
    el: [e('Poids / gravité', 'poids', 'gravit*', 'weight', 'gravity'), e('Tire vers le sol', 'sol', 'ground', 'bas', 'down', 'terre', 'attire*', 'tire*')] }),
  n({ id: 'elevators', theme: 'vol', term: 'Elevators', kind: 'def', src: `${L2} + ${C3}`,
    q: 'À quoi servent les elevators ?',
    def: 'Elevators : gouvernes de profondeur, elles pointent le nez de l’avion vers le haut ou le bas (pitch / tangage).',
    el: [e('Lèvent ou baissent le nez', 'nez', 'nose', 'monter', 'descendre', 'haut', 'bas', 'up', 'down', 'cabr*', 'pique*'), o('Mouvement de pitch (tangage)', 'pitch', 'tangage')] }),
  n({ id: 'ailerons', theme: 'vol', term: 'Ailerons', kind: 'def', src: `${L2} + ${C3}`,
    q: 'À quoi servent les ailerons ?',
    def: 'Ailerons : ils font rouler l’avion (roll / roulis).',
    el: [e('Font rouler l’avion (roll)', 'roll*', 'roul*', 'incline*', 'penche*', 'rotation*', 'inclinaison*')] }),
  n({ id: 'flaps', theme: 'vol', term: 'Flaps', kind: 'def', src: `${L2} + ${C3}`,
    q: 'À quoi servent les flaps ?',
    def: 'Flaps (volets) : ils augmentent le lift et le drag.',
    el: [e('Augmentent le lift (portance)', 'lift', 'portance'), e('Augmentent le drag (traînée)', 'drag', 'trainee', 'resistance*')] }),
  n({ id: 'rudder', theme: 'vol', term: 'Rudder', kind: 'def', src: `${L2} + ${C3}`,
    q: 'À quoi sert le rudder ?',
    def: 'Rudder (gouverne de direction) : rotation de côté à côté de l’avion (side to side rotation = yaw / lacet).',
    el: [e('Rotation latérale, de côté à côté', 'cote*', 'lateral*', 'side*', 'gauche*', 'droite*', 'left', 'right', 'direction*', 'tourner'), o('Yaw (lacet)', 'yaw', 'lacet')] }),
  n({ id: 'spoilers', theme: 'vol', term: 'Spoilers', kind: 'def', src: `${L2} + ${C3}`,
    q: 'À quoi servent les spoilers ?',
    def: 'Spoilers (aérofreins) : ils changent le lift et ralentissent l’avion (slow down).',
    el: [e('Changent / réduisent le lift', 'lift', 'portance', 'reduis*', 'change*'), e('Ralentissent l’avion', 'ralent*', 'slow*', 'frein*')] }),
  n({ id: 'narrow', theme: 'vol', term: 'Narrow body', kind: 'def', src: L2,
    q: 'Comment décrire un avion narrow body (couloirs, routes, évacuation) ?',
    def: 'Narrow body : 1 aisle (couloir), routes short to medium haul, évacuation par slide (sans raft) / self help exit.',
    min: 2,
    el: [e('1 couloir (aisle)', '1 aisle', 'un couloir', '1 couloir', 'one aisle', 'single aisle', 'un seul couloir', 'un aisle'), e('Court à moyen courrier', 'court*', 'short*', 'moyen*', 'medium*'), o('Évacuation : slide sans raft / self help exit', 'slide*', 'raft*', 'toboggan*', 'self')] }),
  n({ id: 'wide', theme: 'vol', term: 'Wide body', kind: 'def', src: L2,
    q: 'Comment décrire un avion wide body (couloirs, routes, évacuation) ?',
    def: 'Wide body : 2 aisles, routes long haul heavy, évacuation par slide / raft / doors only.',
    min: 2,
    el: [e('2 couloirs (aisles)', '2 aisles', 'deux couloirs', '2 couloirs', 'two aisles', 'deux aisles'), e('Long courrier (long haul heavy)', 'long*', 'heavy', 'gros porteur'), o('Évacuation : slide / raft / doors only', 'slide*', 'raft*', 'toboggan*', 'doors')] }),
  n({ id: 'flightdeck', theme: 'vol', term: 'Flight deck', kind: 'def', src: L2,
    q: 'Qu’est-ce que le flight deck ?',
    def: 'Flight deck = cockpit : le poste de pilotage.',
    el: [e('Cockpit', 'cockpit', 'poste de pilotage', 'cabine de pilotage', 'pilotage')] }),
  n({ id: 'parts', theme: 'vol', term: 'Parties de l’avion', kind: 'def', src: `${L2} + ${C3}`, quiz: false,
    flag: 'Liste de notes sans définition : utile à connaître mais non évaluée dans les quiz.',
    def: 'Aircraft parts : wings · turbine engine · landing gear · fuselage · flight deck / cockpit · tail · flaps.',
    el: [] }),

  // ───────── Cabine et portes
  n({ id: 'pa', theme: 'cab', term: 'PA', kind: 'both', src: L3,
    def: 'Public Address : sert à faire des annonces aux passagers (information et safety briefings).',
    el: [
      e('Intitulé complet : Public Address', 'public address', 'sonorisation', 'annonces publiques'),
      e('Rôle : annonces aux passagers (information, safety briefings)', 'passager*', 'passenger*', 'annonce*', 'announcement*', 'briefing*', 'information*'),
    ] }),
  n({ id: 'interphone', theme: 'cab', term: 'Interphone system', kind: 'def', src: `${L3} + ${C3}`,
    q: 'Qu’est-ce que l’interphone (interphone system) ?',
    def: 'Interphone : appels internes cabin ↔ cockpit, cockpit ↔ cabin et cabin ↔ cabin (call, announcement, commands, avec « Press To Talk »).',
    el: [e('Appels internes (équipage)', 'intern*', 'appel*', 'call*', 'communication*', 'equipage', 'crew'), e('Entre cockpit et cabine (et cabine ↔ cabine)', 'cockpit', 'cabine', 'cabin')] }),
  n({ id: 'pa-vs-int', theme: 'cab', term: 'PA vs interphone', kind: 'def', src: L3,
    q: 'Quelle est la différence entre le PA et l’interphone ?',
    def: 'PA = annonces publiques aux passagers. Interphone = appels internes entre le cockpit et la cabine (ou entre cabines), pas pour les passagers.',
    el: [e('PA : annonces aux passagers', 'passager*', 'passenger*', 'public*', 'annonce*', 'announcement*'), e('Interphone : appels internes équipage / cockpit', 'intern*', 'equipage', 'crew', 'cockpit', 'entre*', 'appel*', 'call*')] }),
  n({ id: 'cockpit-cmd', theme: 'cab', term: 'Cockpit commands', kind: 'def', src: L3,
    q: 'Que sont les cockpit commands ?',
    def: 'Cockpit commands : ordres opérationnels directs et signaux envoyés du cockpit à l’équipage cabine.',
    el: [e('Ordres / signaux opérationnels directs', 'ordre*', 'order*', 'command*', 'consigne*', 'instruction*', 'signal*', 'signaux'), e('Du cockpit vers l’équipage cabine', 'cockpit', 'equipage', 'crew', 'cabin', 'cabine', 'pilote*')] }),
  n({ id: 'galley', theme: 'cab', term: 'Galley', kind: 'def', src: `${L3} + ${C3}`,
    q: 'Qu’est-ce que la galley et que contient-elle ? (donne au moins 4 éléments)',
    def: 'Galley : l’espace cuisine. Elle comprend trolleys (service carts), containers, ovens, coffee maker / water boiler, main power, circuit breakers et water shut-off valves.',
    min: 4,
    el: [e('Trolleys (service carts)', 'trolley*', 'chariot*', 'service cart*', 'cart*'), e('Containers', 'container*', 'conteneur*'), e('Ovens', 'oven*', 'four*'), e('Coffee maker / water boiler', 'coffee*', 'cafetiere*', 'boiler*', 'bouilloire*', 'water*'), e('Main power', 'main power', 'alimentation*', 'courant'), e('Circuit breakers', 'circuit*', 'breaker*', 'disjoncteur*'), e('Water shut-off valves', 'shut off', 'valve*', 'robinet*', 'vanne*')] }),
  n({ id: 'cabin-inc', theme: 'cab', term: 'Cabin includes', kind: 'def', src: C3,
    q: 'Que comprend la cabine (cabin includes) ? Donne au moins 5 éléments.',
    def: 'Cabin includes : aural and visual signs, seatbelt sign, passenger call, interphone call, lavatory call, emergency lights, passenger seat, luggage bins, window blinds.',
    min: 5,
    el: [e('Aural and visual signs', 'aural', 'visual*', 'sonore*', 'visuel*', 'signes'), e('Seatbelt sign', 'seatbelt', 'ceinture*'), e('Passenger call', 'passenger call', 'appel passager'), e('Interphone call', 'interphone', 'appel interphone'), e('Lavatory call', 'lavatory call', 'appel toilette*', 'lavatory'), e('Emergency lights', 'emergency light*', 'lumiere* de secours', 'eclairage*'), e('Passenger seat', 'seat*', 'siege*'), e('Luggage bins', 'luggage*', 'bagage*', 'bins', 'coffre*'), e('Window blinds', 'blind*', 'store*', 'volet*', 'window*')] }),
  n({ id: 'lavatories', theme: 'cab', term: 'Lavatories', kind: 'def', src: C3,
    q: 'Quels équipements de sécurité trouve-t-on dans les lavatories ?',
    def: 'Lavatories : smoke detectors (détecteurs de fumée) et waste bin extinguisher (extincteur de la poubelle).',
    el: [e('Smoke detectors', 'smoke*', 'fumee*', 'detecteur*'), e('Waste bin extinguisher', 'extinct*', 'poubelle*', 'waste*', 'bin')] }),
  n({ id: 'crew-rest', theme: 'cab', term: 'Crew rest area', kind: 'def', src: C3,
    q: 'Que trouve-t-on dans la crew rest area ? Donne au moins 4 éléments.',
    def: 'Crew rest area : réservée à l’équipage (crew only). Elle comprend seatbelts, interphone, safety equipment, oxygen masks et smoke detector.',
    min: 4,
    el: [e('Crew only (réservée à l’équipage)', 'crew only', 'equipage seulement', 'reserve*', 'equipage'), e('Seatbelts', 'seatbelt*', 'ceinture*'), e('Interphone', 'interphone'), e('Safety equipment', 'safety', 'securite', 'equipement*'), e('Oxygen masks', 'oxygen*', 'oxygene*', 'masque*'), e('Smoke detector', 'smoke*', 'fumee*', 'detecteur*')] }),
  n({ id: 'door-l1', theme: 'cab', term: 'Door L1', kind: 'def', src: L3,
    q: 'À quelle porte correspond « L1 » ?',
    def: 'PAX door L1 : Left Forward Entry (entrée passagers avant gauche).',
    el: [e('Porte passagers (PAX / entry)', 'pax', 'passager*', 'entree', 'entry'), e('Avant gauche (Left Forward)', 'avant', 'forward', 'fwd', 'gauche', 'left')] }),
  n({ id: 'door-r1', theme: 'cab', term: 'Door R1', kind: 'def', src: L3,
    q: 'À quelle porte correspond « R1 » ?',
    def: 'Service door R1 : Right Forward Service (porte de service avant droite).',
    el: [e('Porte de service', 'service'), e('Avant droite (Right Forward)', 'avant', 'forward', 'fwd', 'droite', 'right')] }),
  n({ id: 'door-l2', theme: 'cab', term: 'Door L2', kind: 'def', src: L3,
    q: 'À quelle porte correspond « L2 » ?',
    def: 'PAX door L2 : Left Rear Entry (entrée passagers arrière gauche).',
    el: [e('Porte passagers (PAX / entry)', 'pax', 'passager*', 'entree', 'entry'), e('Arrière gauche (Left Rear)', 'arriere', 'rear', 'aft', 'gauche', 'left')] }),
  n({ id: 'door-r2', theme: 'cab', term: 'Door R2', kind: 'def', src: L3,
    q: 'À quelle porte correspond « R2 » ?',
    def: 'Service door R2 : Right Rear Service (porte de service arrière droite).',
    el: [e('Porte de service', 'service'), e('Arrière droite (Right Rear)', 'arriere', 'rear', 'aft', 'droite', 'right')] }),
  n({ id: 'door-steps', theme: 'cab', term: 'Standard door opening procedure', kind: 'def', src: L3,
    q: 'Quelles sont les trois étapes de la standard door opening procedure ?',
    def: 'Step 1 : Check Outside (contrôle visuel par le hublot). Step 2 : Disarm / Verify (vérifier l’état d’armement). Step 3 : Rotate Handle (tourner la poignée comme appris).',
    el: [e('Check outside (regarder dehors)', 'check*', 'outside', 'dehors', 'exterieur*', 'hublot*', 'window', 'visuel*'), e('Disarm / Verify (état d’armement)', 'disarm*', 'desarm*', 'verif*', 'verify', 'arm*'), e('Rotate handle (tourner la poignée)', 'rotate*', 'rotation', 'tourn*', 'poignee*', 'handle')] }),
  n({ id: 'door-fam', theme: 'cab', term: 'Door familiarisation', kind: 'def', src: `${L3} + ${C3}`,
    q: 'Quels éléments repérer sur une porte lors de la general cabin door familiarisation ? Donne-en au moins 4.',
    def: 'Viewing window · girt bar / slide bar · door handle · instructions placard · slide container · arming lever (slide selector).',
    min: 4,
    el: [e('Viewing window (hublot)', 'viewing', 'window', 'hublot*', 'fenetre*'), e('Girt bar / slide bar', 'girt', 'slide bar', 'barre*'), e('Door handle (poignée)', 'handle', 'poignee*'), e('Instructions placard', 'placard*', 'instruction*', 'etiquette*', 'consigne*'), e('Slide container', 'slide container', 'container', 'conteneur*', 'toboggan*'), e('Arming lever', 'arming*', 'armement*', 'levier*', 'lever', 'selector')] }),
  n({ id: 'arming', theme: 'cab', term: 'Arming lever / slide selector', kind: 'def', src: `${L3} + ${C3}`, quiz: false,
    flag: 'Ton cours cite l’élément (« slide selector / arming lever ») sans expliquer son fonctionnement : non évalué.',
    def: 'Arming lever (slide selector) : levier de la porte lié à l’armement du slide. Sa fonction n’est pas détaillée dans ton livret ni dans tes notes.',
    el: [] }),
]

export const QUIZ_NOTIONS = NOTIONS.filter((x) => x.quiz)
export const byId = (id: string) => NOTIONS.find((x) => x.id === id)!
export const themeName = (id: string) => THEMES.find((t) => t.id === id)?.name ?? id

export const expectText = (x: Notion) => {
  if (x.min) return `au moins ${x.min} éléments du cours`
  if (x.kind === 'full') return 'l’intitulé complet'
  if (x.kind === 'role') return 'le rôle'
  if (x.kind === 'both') return 'l’intitulé complet et le rôle'
  return 'la définition'
}
