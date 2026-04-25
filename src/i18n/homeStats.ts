import type { Lang } from './utils';

export type StatItem = {
	value: string;
	label: string;
};

export type HomeStatsCopy = [
	StatItem,
	StatItem,
	StatItem,
	StatItem,
	StatItem,
	StatItem,
];

export const homeStatsByLang: Record<Lang, HomeStatsCopy> = {
	pl: [
		{ value: '250+', label: 'UCZESTNIKÓW' },
		{ value: '15+', label: 'KRAJÓW NATO I UE' },
		{ value: '8', label: 'SPECJALIZACJI K9' },
		{ value: '2', label: 'DNI SZKOLEŃ' },
		{ value: '80+', label: 'SZKOLENIA DRONOWEGO' },
		{ value: '1', label: 'KONFERENCJA BEZPIECZEŃSTWA' },
	],
	en: [
		{ value: '250+', label: 'PARTICIPANTS' },
		{ value: '15+', label: 'NATO & EU COUNTRIES' },
		{ value: '8', label: 'K9 SPECIALIZATIONS' },
		{ value: '2', label: 'TRAINING DAYS' },
		{ value: '80+', label: 'DRONE TRAINING HOURS' },
		{ value: '1', label: 'SECURITY CONFERENCE' },
	],
	de: [{ value: '250+', label: 'TEILNEHMER' }, { value: '15+', label: 'NATO- UND EU-LÄNDER' }, { value: '8', label: 'K9-SPEZIALISIERUNGEN' }, { value: '2', label: 'SCHULUNGSTAGE' }, { value: '80+', label: 'DROHNENTRAINING' }, { value: '1', label: 'SICHERHEITSKONFERENZ' }],
	fr: [{ value: '250+', label: 'PARTICIPANTS' }, { value: '15+', label: 'PAYS OTAN ET UE' }, { value: '8', label: 'SPÉCIALISATIONS K9' }, { value: '2', label: 'JOURS DE FORMATION' }, { value: '80+', label: 'FORMATION DRONES' }, { value: '1', label: 'CONFÉRENCE SÉCURITÉ' }],
	hr: [{ value: '250+', label: 'SUDIONIKA' }, { value: '15+', label: 'ZEMALJA NATO-a I EU-a' }, { value: '8', label: 'K9 SPECIJALIZACIJA' }, { value: '2', label: 'DANA OBUKE' }, { value: '80+', label: 'DRON OBUKE' }, { value: '1', label: 'SIGURNOSNA KONFERENCIJA' }],
	cs: [{ value: '250+', label: 'ÚČASTNÍKŮ' }, { value: '15+', label: 'ZEMÍ NATO A EU' }, { value: '8', label: 'SPECIALIZACÍ K9' }, { value: '2', label: 'DNY VÝCVIKU' }, { value: '80+', label: 'DRONOVÉHO VÝCVIKU' }, { value: '1', label: 'BEZPEČNOSTNÍ KONFERENCE' }],
	lt: [{ value: '250+', label: 'DALYVIŲ' }, { value: '15+', label: 'NATO IR ES ŠALIŲ' }, { value: '8', label: 'K9 SPECIALIZACIJOS' }, { value: '2', label: 'MOKYMŲ DIENOS' }, { value: '80+', label: 'DRONŲ MOKYMŲ' }, { value: '1', label: 'SAUGUMO KONFERENCIJA' }],
	lv: [{ value: '250+', label: 'DALĪBNIEKU' }, { value: '15+', label: 'NATO UN ES VALSTIS' }, { value: '8', label: 'K9 SPECIALIZĀCIJAS' }, { value: '2', label: 'APMĀCĪBU DIENAS' }, { value: '80+', label: 'DRONU APMĀCĪBAS' }, { value: '1', label: 'DROŠĪBAS KONFERENCE' }],
	sk: [{ value: '250+', label: 'ÚČASTNÍKOV' }, { value: '15+', label: 'KRAJÍN NATO A EÚ' }, { value: '8', label: 'K9 ŠPECIALIZÁCIÍ' }, { value: '2', label: 'DNI ŠKOLENIA' }, { value: '80+', label: 'DRONOVÉHO VÝCVIKU' }, { value: '1', label: 'BEZPEČNOSTNÁ KONFERENCIA' }],
	sl: [{ value: '250+', label: 'UDELEŽENCEV' }, { value: '15+', label: 'DRŽAV NATO IN EU' }, { value: '8', label: 'K9 SPECIALIZACIJ' }, { value: '2', label: 'DNEVA USPOSABLJANJA' }, { value: '80+', label: 'USPOSABLJANJA Z DRONI' }, { value: '1', label: 'VARNOSTNA KONFERENCA' }],
	hu: [{ value: '250+', label: 'RÉSZTVEVŐ' }, { value: '15+', label: 'NATO- ÉS EU-ORSZÁG' }, { value: '8', label: 'K9 SZAKTERÜLET' }, { value: '2', label: 'KÉPZÉSI NAP' }, { value: '80+', label: 'DRÓNKÉPZÉS' }, { value: '1', label: 'BIZTONSÁGI KONFERENCIA' }],
	no: [{ value: '250+', label: 'DELTAKERE' }, { value: '15+', label: 'NATO- OG EU-LAND' }, { value: '8', label: 'K9-SPESIALISERINGER' }, { value: '2', label: 'TRENINGSDAGER' }, { value: '80+', label: 'DRONEOPPLÆRING' }, { value: '1', label: 'SIKKERHETSKONFERANSE' }],
	sv: [{ value: '250+', label: 'DELTAGARE' }, { value: '15+', label: 'NATO- OCH EU-LÄNDER' }, { value: '8', label: 'K9-SPECIALISERINGAR' }, { value: '2', label: 'UTBILDNINGSDAGAR' }, { value: '80+', label: 'DRÖNARUTBILDNING' }, { value: '1', label: 'SÄKERHETSKONFERENS' }],
	nl: [{ value: '250+', label: 'DEELNEMERS' }, { value: '15+', label: 'NAVO- EN EU-LANDEN' }, { value: '8', label: 'K9-SPECIALISATIES' }, { value: '2', label: 'TRAININGSDAGEN' }, { value: '80+', label: 'DRONETRAINING' }, { value: '1', label: 'VEILIGHEIDSCONFERENTIE' }],
	es: [{ value: '250+', label: 'PARTICIPANTES' }, { value: '15+', label: 'PAÍSES OTAN Y UE' }, { value: '8', label: 'ESPECIALIZACIONES K9' }, { value: '2', label: 'DÍAS DE FORMACIÓN' }, { value: '80+', label: 'FORMACIÓN CON DRONES' }, { value: '1', label: 'CONFERENCIA DE SEGURIDAD' }],
	pt: [{ value: '250+', label: 'PARTICIPANTES' }, { value: '15+', label: 'PAÍSES NATO E UE' }, { value: '8', label: 'ESPECIALIZAÇÕES K9' }, { value: '2', label: 'DIAS DE FORMAÇÃO' }, { value: '80+', label: 'FORMAÇÃO COM DRONES' }, { value: '1', label: 'CONFERÊNCIA DE SEGURANÇA' }],
	ro: [{ value: '250+', label: 'PARTICIPANȚI' }, { value: '15+', label: 'ȚĂRI NATO ȘI UE' }, { value: '8', label: 'SPECIALIZĂRI K9' }, { value: '2', label: 'ZILE DE INSTRUIRE' }, { value: '80+', label: 'INSTRUIRE CU DRONE' }, { value: '1', label: 'CONFERINȚĂ DE SECURITATE' }],
	it: [{ value: '250+', label: 'PARTECIPANTI' }, { value: '15+', label: 'PAESI NATO E UE' }, { value: '8', label: 'SPECIALIZZAZIONI K9' }, { value: '2', label: 'GIORNI DI ADDESTRAMENTO' }, { value: '80+', label: 'ADDESTRAMENTO DRONI' }, { value: '1', label: 'CONFERENZA SULLA SICUREZZA' }],
	ko: [{ value: '250+', label: '참가자' }, { value: '15+', label: 'NATO 및 EU 국가' }, { value: '8', label: 'K9 전문 분야' }, { value: '2', label: '훈련 일수' }, { value: '80+', label: '드론 훈련' }, { value: '1', label: '보안 컨퍼런스' }],
};
