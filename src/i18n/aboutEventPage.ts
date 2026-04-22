import type { Lang } from './ui';

export type AboutEventStat = {
	value: string;
	label: string;
	accent: 'gold' | 'red';
};

export type AboutEventPageCopy = {
	metaTitle: string;
	metaDescription: string;
	category: string;
	heroTitle: string;
	heroSubtitle: string;
	sectionTitle: string;
	bodyP1: string;
	bodyP2: string;
	stats: [AboutEventStat, AboutEventStat, AboutEventStat, AboutEventStat];
};

const enBody: { p1: string; p2: string } = {
	p1: 'CERBERUS K9 is Poland’s largest and one of the NATO region’s largest free platforms for exchanging knowledge and experience in cynology, public safety, and defence. The event connects uniformed professionals with civilians, instructors from around the world with Polish specialists, and theory with intensive hands-on practice.',
	p2: 'In 2025 we brought together more than 150 participants from 7 countries — police, military, fire and rescue, pro-defence organisations, and civilian dog handlers. In 2026 we scale to a European level: confirmed participation from US Police K9 SWAT, the Portuguese Navy, and 15+ delegations from NATO countries.',
};

export const aboutEventPageByLang: Record<Lang, AboutEventPageCopy> = {
	pl: {
		metaTitle: 'O Wydarzeniu — CERBERUS K9 2026 | Program i Agenda | Ostrów Wielkopolski',
		metaDescription:
			'Pełny program CERBERUS K9 2026. Szkolenia K9, TCCC, drony, konferencja zarządzania kryzysowego. 13-14 czerwca, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMACJE',
		heroTitle: 'O WYDARZENIU',
		heroSubtitle: 'CERBERUS K9 2026 · 13–14 CZERWCA · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'CZYM JEST CERBERUS K9?',
		bodyP1:
			'CERBERUS K9 to największa w Polsce i jedna z największych w regionie NATO bezpłatna platforma wymiany wiedzy i doświadczeń w zakresie kynologii, bezpieczeństwa publicznego i obronności. Wydarzenie łączy profesjonalne służby mundurowe z cywilami, instruktorów z całego świata z polskimi specjalistami, teorię z intensywną praktyką.',
		bodyP2:
			'W 2025 roku zebraliśmy ponad 150 uczestników z 7 krajów — policję, wojsko, straż, organizacje proobronne i cywilnych przewodników psów. W 2026 roku wychodzimy na poziom europejski: potwierdzony udział US Police K9 SWAT, Marynarka Wojenna Portugalii i 15+ delegacji z krajów NATO.',
		stats: [
			{ value: '250+', label: 'PLANOWANYCH UCZESTNIKÓW', accent: 'gold' },
			{ value: '15+', label: 'KRAJÓW NATO I UE', accent: 'red' },
			{ value: '8', label: 'MODUŁÓW SZKOLENIOWYCH', accent: 'gold' },
			{ value: '1', label: 'PIERWSZE TAKIE WYDARZENIE W POLSCE', accent: 'red' },
		],
	},
	en: {
		metaTitle: 'About the Event — CERBERUS K9 2026 | Programme & Agenda | Ostrów Wielkopolski',
		metaDescription:
			'Full CERBERUS K9 2026 programme: K9 training, TCCC, drones, crisis-management conference. 13–14 June, 3MK Arena, Ostrów Wielkopolski, Poland.',
		category: 'INFORMATION',
		heroTitle: 'ABOUT THE EVENT',
		heroSubtitle: 'CERBERUS K9 2026 · 13–14 JUNE · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'WHAT IS CERBERUS K9?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: 'PLANNED PARTICIPANTS', accent: 'gold' },
			{ value: '15+', label: 'NATO & EU COUNTRIES', accent: 'red' },
			{ value: '8', label: 'TRAINING MODULES', accent: 'gold' },
			{ value: '1', label: 'FIRST EVENT OF THIS KIND IN POLAND', accent: 'red' },
		],
	},
	de: {
		metaTitle: 'Über die Veranstaltung — CERBERUS K9 2026 | Programm & Agenda | Ostrów Wielkopolski',
		metaDescription:
			'Vollständiges Programm CERBERUS K9 2026: K9-Ausbildung, TCCC, Drohnen, Konferenz Krisenmanagement. 13.–14. Juni, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMATIONEN',
		heroTitle: 'ÜBER DIE VERANSTALTUNG',
		heroSubtitle: 'CERBERUS K9 2026 · 13.–14. JUNI · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'WAS IST CERBERUS K9?',
		bodyP1:
			'CERBERUS K9 ist Polens größte und eine der größten kostenlosen Plattformen in der NATO-Region zum Austausch von Wissen und Erfahrung in Kynologie, öffentlicher Sicherheit und Verteidigung. Die Veranstaltung verbindet uniformierte Fachkräfte mit Zivilisten, internationale Ausbilder mit polnischen Spezialisten und Theorie mit intensiver Praxis.',
		bodyP2:
			'2025 brachten wir über 150 Teilnehmer aus 7 Ländern zusammen — Polizei, Militär, Rettungsdienste, pro-defensive Organisationen und zivile Hundeführer. 2026 skalieren wir auf europäisches Niveau: bestätigt u. a. US Police K9 SWAT, die portugiesische Marine und 15+ Delegationen aus NATO-Staaten.',
		stats: [
			{ value: '250+', label: 'GEPLANTE TEILNEHMER', accent: 'gold' },
			{ value: '15+', label: 'NATO- UND EU-LÄNDER', accent: 'red' },
			{ value: '8', label: 'SCHULUNGSMODULE', accent: 'gold' },
			{ value: '1', label: 'ERSTMALS EINE SOLCHE VERANSTALTUNG IN POLEN', accent: 'red' },
		],
	},
	fr: {
		metaTitle: "À propos — CERBERUS K9 2026 | Programme et agenda | Ostrów Wielkopolski",
		metaDescription:
			'Programme complet CERBERUS K9 2026 : formation K9, TCCC, drones, conférence gestion de crise. 13–14 juin, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMATIONS',
		heroTitle: 'À PROPOS DE L’ÉVÉNEMENT',
		heroSubtitle: 'CERBERUS K9 2026 · 13–14 JUIN · OSTRÓW WIELKOPOLSKI',
		sectionTitle: "QU'EST-CE QUE CERBERUS K9 ?",
		bodyP1:
			'CERBERUS K9 est la plus grande plateforme gratuite de Pologne et l’une des plus importantes dans la région OTAN pour échanger savoir-faire et expériences en cynologie, sécurité publique et défense. L’événement réunit professionnels en uniforme et civils, instructeurs du monde entier et spécialistes polonais, théorie et pratique intensive.',
		bodyP2:
			'En 2025, nous avons réuni plus de 150 participants de 7 pays — police, armée, secours, organisations pro-défense et conducteurs civils de chiens. En 2026, nous passons à l’échelle européenne : participation confirmée d’US Police K9 SWAT, de la Marine portugaise et de 15+ délégations de pays OTAN.',
		stats: [
			{ value: '250+', label: 'PARTICIPANTS PRÉVUS', accent: 'gold' },
			{ value: '15+', label: 'PAYS OTAN ET UE', accent: 'red' },
			{ value: '8', label: 'MODULES DE FORMATION', accent: 'gold' },
			{ value: '1', label: 'PREMIER ÉVÉNEMENT DE CE TYPE EN POLOGNE', accent: 'red' },
		],
	},
	hr: {
		metaTitle: 'O događaju — CERBERUS K9 2026 | Program i raspored | Ostrów Wielkopolski',
		metaDescription:
			'Potpuni program CERBERUS K9 2026. K9 obuka, TCCC, dronovi, konferencija upravljanja krizom. 13.–14. lipnja, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMACIJE',
		heroTitle: 'O DOGAĐAJU',
		heroSubtitle: 'CERBERUS K9 2026 · 13.–14. LIPNJA · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'ŠTO JE CERBERUS K9?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: 'PLANIRANIH SUDIONIKA', accent: 'gold' },
			{ value: '15+', label: 'ZEMALJA NATO-a I EU-a', accent: 'red' },
			{ value: '8', label: 'OBRAZOVNIH MODULA', accent: 'gold' },
			{ value: '1', label: 'PRVI DOGAĐAJ OVE VRSTE U POLJSKOJ', accent: 'red' },
		],
	},
	cs: {
		metaTitle: 'O akci — CERBERUS K9 2026 | Program a agenda | Ostrów Wielkopolski',
		metaDescription:
			'Plný program CERBERUS K9 2026: výcvik K9, TCCC, drony, konference krizového řízení. 13.–14. června, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMACE',
		heroTitle: 'O AKCI',
		heroSubtitle: 'CERBERUS K9 2026 · 13.–14. ČERVNA · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'CO JE CERBERUS K9?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: 'PLÁNOVANÝCH ÚČASTNÍKŮ', accent: 'gold' },
			{ value: '15+', label: 'ZEMÍ NATO A EU', accent: 'red' },
			{ value: '8', label: 'ŠKOLICÍCH MODULŮ', accent: 'gold' },
			{ value: '1', label: 'PRVNÍ AKCE TOHOTO DRUHU V POLSKU', accent: 'red' },
		],
	},
	lt: {
		metaTitle: 'Apie renginį — CERBERUS K9 2026 | Programa ir darbotvarkė | Ostrów Wielkopolski',
		metaDescription:
			'Pilna CERBERUS K9 2026 programa: K9 mokymai, TCCC, dronai, krizių valdymo konferencija. Birželio 13–14 d., 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMACIJA',
		heroTitle: 'APIE RENGINĮ',
		heroSubtitle: 'CERBERUS K9 2026 · BIRŽELIO 13–14 · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'KAS YRA CERBERUS K9?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: 'PLANUOJAMŲ DALYVIŲ', accent: 'gold' },
			{ value: '15+', label: 'NATO IR ES ŠALIŲ', accent: 'red' },
			{ value: '8', label: 'MOKYMŲ MODULIŲ', accent: 'gold' },
			{ value: '1', label: 'PIRMĄ KARTĄ TOKS RENGINYS LENKIJOJE', accent: 'red' },
		],
	},
	lv: {
		metaTitle: 'Par pasākumu — CERBERUS K9 2026 | Programma un darba kārtība | Ostrów Wielkopolski',
		metaDescription:
			'Pilna CERBERUS K9 2026 programma: K9 apmācība, TCCC, droni, krīzes pārvaldības konference. 13.–14. jūnijā, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMĀCIJA',
		heroTitle: 'PAR PASĀKUMU',
		heroSubtitle: 'CERBERUS K9 2026 · 13.–14. JŪNIJS · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'KAS IR CERBERUS K9?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: 'PLĀNOTO DALĪBNIEKU', accent: 'gold' },
			{ value: '15+', label: 'NATO UN ES VALSTĪM', accent: 'red' },
			{ value: '8', label: 'APMĀCĪBU MODUĻIEM', accent: 'gold' },
			{ value: '1', label: 'PIRMĀ REIZE POLIJĀ', accent: 'red' },
		],
	},
	sk: {
		metaTitle: 'O podujatí — CERBERUS K9 2026 | Program a agenda | Ostrów Wielkopolski',
		metaDescription:
			'Plný program CERBERUS K9 2026: výcvik K9, TCCC, drony, konferencia krízového riadenia. 13.–14. júna, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMÁCIE',
		heroTitle: 'O PODUJATÍ',
		heroSubtitle: 'CERBERUS K9 2026 · 13.–14. JÚNA · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'ČO JE CERBERUS K9?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: 'PLÁNOVANÝCH ÚČASTNÍKOV', accent: 'gold' },
			{ value: '15+', label: 'KRAJÍN NATO A EÚ', accent: 'red' },
			{ value: '8', label: 'ŠKOLIACICH MODULOV', accent: 'gold' },
			{ value: '1', label: 'PRVÁ AKCIA TOHTO DRUHU V POĽSKU', accent: 'red' },
		],
	},
	sl: {
		metaTitle: 'O dogodku — CERBERUS K9 2026 | Program in agenda | Ostrów Wielkopolski',
		metaDescription:
			'Poln program CERBERUS K9 2026: usposabljanje K9, TCCC, droni, konferenca kriznega vodenja. 13.–14. junija, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMACIJE',
		heroTitle: 'O DOGODKU',
		heroSubtitle: 'CERBERUS K9 2026 · 13.–14. JUNIJA · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'KAJ JE CERBERUS K9?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: 'NAČRTOVANIH UDELEŽENCEV', accent: 'gold' },
			{ value: '15+', label: 'DRŽAV NATO IN EU', accent: 'red' },
			{ value: '8', label: 'USPOSABLJEVALNIH MODULOV', accent: 'gold' },
			{ value: '1', label: 'PRVI TAKŠEN DOGODEK V POLJSKI', accent: 'red' },
		],
	},
	hu: {
		metaTitle: 'A rendezvényről — CERBERUS K9 2026 | Program és napirend | Ostrów Wielkopolski',
		metaDescription:
			'Teljes CERBERUS K9 2026 program: K9 képzés, TCCC, drónok, válságkezelési konferencia. június 13–14., 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMÁCIÓ',
		heroTitle: 'A RENDEZVÉNYRŐL',
		heroSubtitle: 'CERBERUS K9 2026 · JÚNIUS 13–14. · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'MI AZ A CERBERUS K9?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: 'TERVEZETT RÉSZTVEVŐK', accent: 'gold' },
			{ value: '15+', label: 'NATO- ÉS EU-ORSZÁGOK', accent: 'red' },
			{ value: '8', label: 'KÉPZÉSI MODULOK', accent: 'gold' },
			{ value: '1', label: 'ELSŐ ILYEN ESEMÉNY LENGYELORSZÁGBAN', accent: 'red' },
		],
	},
	no: {
		metaTitle: 'Om arrangementet — CERBERUS K9 2026 | Program og agenda | Ostrów Wielkopolski',
		metaDescription:
			'Fullt program for CERBERUS K9 2026: K9-opplæring, TCCC, droner, konferanse i krisehåndtering. 13.–14. juni, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMASJON',
		heroTitle: 'OM ARRANGEMENTET',
		heroSubtitle: 'CERBERUS K9 2026 · 13.–14. JUNI · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'HVA ER CERBERUS K9?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: 'PLANLAGTE DELTAKERE', accent: 'gold' },
			{ value: '15+', label: 'NATO- OG EU-LAND', accent: 'red' },
			{ value: '8', label: 'TRENINGSMODULER', accent: 'gold' },
			{ value: '1', label: 'FØRSTE ARRANGEMENT AV SLAGET I POLEN', accent: 'red' },
		],
	},
	sv: {
		metaTitle: 'Om evenemanget — CERBERUS K9 2026 | Program och agenda | Ostrów Wielkopolski',
		metaDescription:
			'Fullständigt program för CERBERUS K9 2026: K9-utbildning, TCCC, drönare, krishanteringskonferens. 13–14 juni, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMATION',
		heroTitle: 'OM EVENEMANGET',
		heroSubtitle: 'CERBERUS K9 2026 · 13–14 JUNI · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'VAD ÄR CERBERUS K9?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: 'PLANERADE DELTAGARE', accent: 'gold' },
			{ value: '15+', label: 'NATO- OCH EU-LÄNDER', accent: 'red' },
			{ value: '8', label: 'UTBILDNINGSMODULER', accent: 'gold' },
			{ value: '1', label: 'FÖRSTA EVENEMANGET AV DETTA SLAG I POLEN', accent: 'red' },
		],
	},
	nl: {
		metaTitle: 'Over het evenement — CERBERUS K9 2026 | Programma en agenda | Ostrów Wielkopolski',
		metaDescription:
			'Volledig programma CERBERUS K9 2026: K9-training, TCCC, drones, crisisbeheersconferentie. 13–14 juni, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMATIE',
		heroTitle: 'OVER HET EVENEMENT',
		heroSubtitle: 'CERBERUS K9 2026 · 13–14 JUNI · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'WAT IS CERBERUS K9?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: 'GEPLANDE DEELNEMERS', accent: 'gold' },
			{ value: '15+', label: 'NATO- EN EU-LANDEN', accent: 'red' },
			{ value: '8', label: 'TRAININGSMODULES', accent: 'gold' },
			{ value: '1', label: 'EERSTE EVENEMENT VAN DEZE SOORT IN POLEN', accent: 'red' },
		],
	},
	es: {
		metaTitle: 'Sobre el evento — CERBERUS K9 2026 | Programa y agenda | Ostrów Wielkopolski',
		metaDescription:
			'Programa completo CERBERUS K9 2026: formación K9, TCCC, drones, conferencia de gestión de crisis. 13–14 de junio, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMACIÓN',
		heroTitle: 'SOBRE EL EVENTO',
		heroSubtitle: 'CERBERUS K9 2026 · 13–14 DE JUNIO · OSTRÓW WIELKOPOLSKI',
		sectionTitle: '¿QUÉ ES CERBERUS K9?',
		bodyP1:
			'CERBERUS K9 es la mayor plataforma gratuita de Polonia y una de las más grandes de la región OTAN para intercambiar conocimiento y experiencia en cinología, seguridad pública y defensa. El evento une a profesionales uniformados con civiles, instructores de todo el mundo con especialistas polacos, y la teoría con la práctica intensiva.',
		bodyP2:
			'En 2025 reunimos a más de 150 participantes de 7 países — policía, ejército, servicios de emergencia, organizaciones prodefensa y guías caninos civiles. En 2026 damos el salto europeo: participación confirmada de US Police K9 SWAT, la Armada portuguesa y más de 15 delegaciones de países OTAN.',
		stats: [
			{ value: '250+', label: 'PARTICIPANTES PREVISTOS', accent: 'gold' },
			{ value: '15+', label: 'PAÍSES DE LA OTAN Y LA UE', accent: 'red' },
			{ value: '8', label: 'MÓDULOS DE FORMACIÓN', accent: 'gold' },
			{ value: '1', label: 'PRIMER EVENTO DE ESTE TIPO EN POLONIA', accent: 'red' },
		],
	},
	pt: {
		metaTitle: 'Sobre o evento — CERBERUS K9 2026 | Programa e agenda | Ostrów Wielkopolski',
		metaDescription:
			'Programa completo CERBERUS K9 2026: formação K9, TCCC, drones, conferência de gestão de crises. 13–14 de junho, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMAÇÃO',
		heroTitle: 'SOBRE O EVENTO',
		heroSubtitle: 'CERBERUS K9 2026 · 13–14 DE JUNHO · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'O QUE É O CERBERUS K9?',
		bodyP1:
			'O CERBERUS K9 é a maior plataforma gratuita da Polónia e uma das maiores na região da NATO para partilhar conhecimento e experiência em cinotecnia, segurança pública e defesa. O evento liga profissionais fardados a civis, instrutores de todo o mundo a especialistas polacos, e a teoria a uma prática intensiva.',
		bodyP2:
			'Em 2025 reunimos mais de 150 participantes de 7 países — polícia, forças armadas, emergência, organizações pró-defesa e condutores civis de cães. Em 2026 subimos ao nível europeu: participação confirmada da US Police K9 SWAT, da Marinha Portuguesa e de mais de 15 delegações de países NATO.',
		stats: [
			{ value: '250+', label: 'PARTICIPANTES PREVISTOS', accent: 'gold' },
			{ value: '15+', label: 'PAÍSES DA NATO E DA UE', accent: 'red' },
			{ value: '8', label: 'MÓDULOS DE FORMAÇÃO', accent: 'gold' },
			{ value: '1', label: 'PRIMEIRO EVENTO DESTE TIPO NA POLÓNIA', accent: 'red' },
		],
	},
	ro: {
		metaTitle: 'Despre eveniment — CERBERUS K9 2026 | Program și agendă | Ostrów Wielkopolski',
		metaDescription:
			'Program complet CERBERUS K9 2026: instruire K9, TCCC, drone, conferință managementul crizelor. 13–14 iunie, 3MK Arena, Ostrów Wielkopolski.',
		category: 'INFORMAȚII',
		heroTitle: 'DESPRE EVENIMENT',
		heroSubtitle: 'CERBERUS K9 2026 · 13–14 IUNIE · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'CE ESTE CERBERUS K9?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: 'PARTICIPANȚI PLANIFICAȚI', accent: 'gold' },
			{ value: '15+', label: 'ȚĂRI NATO ȘI UE', accent: 'red' },
			{ value: '8', label: 'MODULE DE INSTRUIRE', accent: 'gold' },
			{ value: '1', label: 'PRIMUL EVENIMENT DE ACEST FEL ÎN POLONIA', accent: 'red' },
		],
	},
	it: {
		metaTitle: "Sull'evento — CERBERUS K9 2026 | Programma e agenda | Ostrów Wielkopolski",
		metaDescription:
			"Programma completo CERBERUS K9 2026: addestramento K9, TCCC, droni, conferenza sulla gestione delle crisi. 13–14 giugno, 3MK Arena, Ostrów Wielkopolski.",
		category: 'INFORMAZIONI',
		heroTitle: "SULL'EVENTO",
		heroSubtitle: 'CERBERUS K9 2026 · 13–14 GIUGNO · OSTRÓW WIELKOPOLSKI',
		sectionTitle: "COS'È CERBERUS K9?",
		bodyP1:
			'CERBERUS K9 è la più grande piattaforma gratuita in Polonia e una delle più importanti nella regione NATO per scambiare conoscenze ed esperienze in cinologia, sicurezza pubblica e difesa. L’evento unisce operatori in uniforme e civili, istruttori da tutto il mondo e specialisti polacchi, teoria e pratica intensiva.',
		bodyP2:
			'Nel 2025 abbiamo riunito oltre 150 partecipanti da 7 Paesi — polizia, forze armate, soccorso, organizzazioni pro-difesa e conduttori civili di cani. Nel 2026 passiamo a scala europea: partecipazione confermata di US Police K9 SWAT, Marina portoghese e oltre 15 delegazioni da Paesi NATO.',
		stats: [
			{ value: '250+', label: 'PARTECIPANTI PREVISTI', accent: 'gold' },
			{ value: '15+', label: 'PAESI NATO E UE', accent: 'red' },
			{ value: '8', label: 'MODULI DI FORMAZIONE', accent: 'gold' },
			{ value: '1', label: 'PRIMO EVENTO DI QUESTO TIPO IN POLONIA', accent: 'red' },
		],
	},
	ko: {
		metaTitle: '행사 소개 — CERBERUS K9 2026 | 프로그램 및 일정 | 오스트루프 비엘코폴스키',
		metaDescription:
			'CERBERUS K9 2026 전체 일정: K9 훈련, TCCC, 드론, 위기관리 컨퍼런스. 6월 13–14일, 3MK 아레나, 오스트루프 비엘코폴스키.',
		category: '안내',
		heroTitle: '행사 소개',
		heroSubtitle: 'CERBERUS K9 2026 · 6월 13–14일 · OSTRÓW WIELKOPOLSKI',
		sectionTitle: 'CERBERUS K9란?',
		bodyP1: enBody.p1,
		bodyP2: enBody.p2,
		stats: [
			{ value: '250+', label: '예상 참가자', accent: 'gold' },
			{ value: '15+', label: 'NATO·EU 국가', accent: 'red' },
			{ value: '8', label: '훈련 모듈', accent: 'gold' },
			{ value: '1', label: '폴란드 최초의 이 유형 행사', accent: 'red' },
		],
	},
};
