import type { Lang } from './ui';

export type HomeSeo = {
	title: string;
	description: string;
	eventName: string;
};

export const HOME_OG_IMAGE = '/og-cerberus-k9-2026.jpg';

export const homeSeoByLang: Record<Lang, HomeSeo> = {
	pl: {
		title: 'CERBERUS K9 2026 — Międzynarodowe Ćwiczenia K9 | 13-14 Czerwca | Ostrów Wielkopolski',
		description:
			'Największe w Polsce międzynarodowe ćwiczenia K9. 250+ uczestników z 15+ krajów NATO. US Police K9, Marinha Portuguesa. Wstęp bezpłatny.',
		eventName: 'CERBERUS K9 2026 - Międzynarodowe Ćwiczenia K9',
	},
	en: {
		title: 'CERBERUS K9 2026 — International K9 Exercises | June 13-14 | Ostrów Wielkopolski',
		description:
			"Poland's largest international K9 exercise. 250+ participants from 15+ NATO countries. US Police K9, Marinha Portuguesa. Free admission.",
		eventName: 'CERBERUS K9 2026 - International K9 Exercises',
	},
	de: {
		title: 'CERBERUS K9 2026 — Internationale K9-Ubungen | 13.-14. Juni | Ostrów Wielkopolski',
		description:
			'Polens groesste internationale K9-Ubung. 250+ Teilnehmer aus 15+ NATO-Laendern. US Police K9, Marinha Portuguesa. Freier Eintritt.',
		eventName: 'CERBERUS K9 2026 - Internationale K9-Uebungen',
	},
	fr: {
		title: 'CERBERUS K9 2026 — Exercices K9 Internationaux | 13-14 Juin | Ostrów Wielkopolski',
		description:
			"Les plus grands exercices K9 internationaux en Pologne. 250+ participants de 15+ pays de l'OTAN. US Police K9, Marinha Portuguesa. Entree gratuite.",
		eventName: 'CERBERUS K9 2026 - Exercices K9 Internationaux',
	},
	hr: {
		title: 'CERBERUS K9 2026 — Medunarodne K9 Vjezbe | 13.-14. Lipnja | Ostrów Wielkopolski',
		description:
			'Najvece medunarodne K9 vjezbe u Poljskoj. 250+ sudionika iz 15+ NATO zemalja. US Police K9, Marinha Portuguesa. Besplatan ulaz.',
		eventName: 'CERBERUS K9 2026 - Medunarodne K9 Vjezbe',
	},
	cs: {
		title: 'CERBERUS K9 2026 — Mezinarodni K9 Vycvik | 13.-14. Cervna | Ostrów Wielkopolski',
		description:
			'Nejvetsi mezinarodni K9 cviceni v Polsku. 250+ ucastniku z 15+ zemi NATO. US Police K9, Marinha Portuguesa. Vstup zdarma.',
		eventName: 'CERBERUS K9 2026 - Mezinarodni K9 Vycvik',
	},
	lt: {
		title: 'CERBERUS K9 2026 — Tarptautines K9 Pratybos | Birzelio 13-14 d. | Ostrów Wielkopolski',
		description:
			'Didziausios tarptautines K9 pratybos Lenkijoje. 250+ dalyviu is 15+ NATO saliu. US Police K9, Marinha Portuguesa. Iejimas nemokamas.',
		eventName: 'CERBERUS K9 2026 - Tarptautines K9 Pratybos',
	},
	lv: {
		title: 'CERBERUS K9 2026 — Starptautiskas K9 Macibas | 13.-14. Junijs | Ostrów Wielkopolski',
		description:
			'Lielakas starptautiskas K9 macibas Polija. 250+ dalibnieku no 15+ NATO valstīm. US Police K9, Marinha Portuguesa. Ieeja bez maksas.',
		eventName: 'CERBERUS K9 2026 - Starptautiskas K9 Macibas',
	},
	sk: {
		title: 'CERBERUS K9 2026 — Medzinarodne K9 Cvicenia | 13.-14. Juna | Ostrów Wielkopolski',
		description:
			'Najvacsie medzinarodne K9 cvicenia v Polsku. 250+ ucastnikov z 15+ krajin NATO. US Police K9, Marinha Portuguesa. Vstup zdarma.',
		eventName: 'CERBERUS K9 2026 - Medzinarodne K9 Cvicenia',
	},
	sl: {
		title: 'CERBERUS K9 2026 — Mednarodne K9 Vaje | 13.-14. Junij | Ostrów Wielkopolski',
		description:
			'Najvecje mednarodne K9 vaje na Poljskem. 250+ udelezencev iz 15+ drzav Nata. US Police K9, Marinha Portuguesa. Vstop prost.',
		eventName: 'CERBERUS K9 2026 - Mednarodne K9 Vaje',
	},
	hu: {
		title: 'CERBERUS K9 2026 — Nemzetkozi K9 Gyakorlatok | Junius 13-14. | Ostrów Wielkopolski',
		description:
			'Lengyelorszag legnagyobb nemzetkozi K9 gyakorlata. 250+ resztvevo 15+ NATO orszagbol. US Police K9, Marinha Portuguesa. Ingyenes belepes.',
		eventName: 'CERBERUS K9 2026 - Nemzetkozi K9 Gyakorlatok',
	},
	no: {
		title: 'CERBERUS K9 2026 — Internasjonale K9-Ovelser | 13.-14. Juni | Ostrów Wielkopolski',
		description:
			'Polens storste internasjonale K9-ovelse. 250+ deltakere fra 15+ NATO-land. US Police K9, Marinha Portuguesa. Gratis inngang.',
		eventName: 'CERBERUS K9 2026 - Internasjonale K9-Ovelser',
	},
	sv: {
		title: 'CERBERUS K9 2026 — Internationella K9-Ovningar | 13-14 Juni | Ostrów Wielkopolski',
		description:
			'Polens storsta internationella K9-ovning. 250+ deltagare fran 15+ NATO-lander. US Police K9, Marinha Portuguesa. Fri entre.',
		eventName: 'CERBERUS K9 2026 - Internationella K9-Ovningar',
	},
	nl: {
		title: 'CERBERUS K9 2026 — Internationale K9-Oefeningen | 13-14 Juni | Ostrów Wielkopolski',
		description:
			'De grootste internationale K9-oefening in Polen. 250+ deelnemers uit 15+ NAVO-landen. US Police K9, Marinha Portuguesa. Gratis toegang.',
		eventName: 'CERBERUS K9 2026 - Internationale K9-Oefeningen',
	},
	es: {
		title: 'CERBERUS K9 2026 — Ejercicios K9 Internacionales | 13-14 de Junio | Ostrów Wielkopolski',
		description:
			'Los mayores ejercicios K9 internacionales en Polonia. 250+ participantes de 15+ paises de la OTAN. US Police K9, Marinha Portuguesa. Entrada gratuita.',
		eventName: 'CERBERUS K9 2026 - Ejercicios K9 Internacionales',
	},
	pt: {
		title: 'CERBERUS K9 2026 — Exercicios K9 Internacionais | 13-14 de Junho | Ostrów Wielkopolski',
		description:
			'Os maiores exercicios K9 internacionais na Polonia. 250+ participantes de 15+ paises da NATO. US Police K9, Marinha Portuguesa. Entrada gratuita.',
		eventName: 'CERBERUS K9 2026 - Exercicios K9 Internacionais',
	},
	ro: {
		title: 'CERBERUS K9 2026 — Exercitii K9 Internationale | 13-14 Iunie | Ostrów Wielkopolski',
		description:
			'Cele mai mari exercitii K9 internationale din Polonia. 250+ participanti din 15+ tari NATO. US Police K9, Marinha Portuguesa. Intrare gratuita.',
		eventName: 'CERBERUS K9 2026 - Exercitii K9 Internationale',
	},
	it: {
		title: 'CERBERUS K9 2026 — Esercitazioni K9 Internazionali | 13-14 Giugno | Ostrów Wielkopolski',
		description:
			'Le piu grandi esercitazioni K9 internazionali in Polonia. 250+ partecipanti da 15+ paesi NATO. US Police K9, Marinha Portuguesa. Ingresso gratuito.',
		eventName: 'CERBERUS K9 2026 - Esercitazioni K9 Internazionali',
	},
	ko: {
		title: 'CERBERUS K9 2026 — 국제 K9 훈련 | 6월 13-14일 | Ostrów Wielkopolski',
		description:
			'폴란드 최대 규모의 국제 K9 훈련. NATO 15개국 이상에서 250명 이상 참가. US Police K9, Marinha Portuguesa. 무료 입장.',
		eventName: 'CERBERUS K9 2026 - 국제 K9 훈련',
	},
};
