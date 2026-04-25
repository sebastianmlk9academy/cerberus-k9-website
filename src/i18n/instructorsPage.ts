import type { Lang } from './utils';

export type InstructorsPageCopy = {
	heroCategory: string;
	heroTitle: string;
	heroSubtitle: string;
	introP: string;
	countTemplate: string;
	filterAll: string;
	filterDecoy: string;
	noResults: string;
	loading: string;
};

export const instructorsPageByLang: Record<Lang, InstructorsPageCopy> = {
	pl: {
		heroCategory: 'CERBERUS K9',
		heroTitle: 'NASI INSTRUKTORZY',
		heroSubtitle: 'Eksperci z całego świata prowadzący moduły operacyjne i szkoleniowe.',
		introP:
			'Zespół CERBERUS K9 tworzą instruktorzy wojskowi, policyjni i cywilni z doświadczeniem bojowym oraz szkoleniowym. Każdy moduł prowadzony jest przez praktyków, którzy wdrażali procedury K9 i TCCC w realnych działaniach operacyjnych.',
		countTemplate: 'INSTRUKTORÓW Z {n} KRAJÓW',
		filterAll: 'WSZYSCY',
		filterDecoy: 'POZORANT',
		noResults: 'BRAK INSTRUKTORÓW',
		loading: 'ŁADOWANIE...',
	},
	en: {
		heroCategory: 'CERBERUS K9',
		heroTitle: 'OUR INSTRUCTORS',
		heroSubtitle: 'Experts from across the world delivering operational and training modules.',
		introP:
			'The CERBERUS K9 instructor team includes military, police, and civilian specialists with field and training experience. Every module is led by practitioners who have implemented K9 and TCCC procedures in real operations.',
		countTemplate: 'INSTRUCTORS FROM {n} COUNTRIES',
		filterAll: 'ALL',
		filterDecoy: 'DECOY',
		noResults: 'NO INSTRUCTORS FOUND',
		loading: 'LOADING...',
	},
	de: { heroCategory: 'CERBERUS K9', heroTitle: 'UNSERE INSTRUKTEURE', heroSubtitle: 'Experten aus aller Welt für operative und trainingsbezogene Module.', introP: 'Das CERBERUS-K9-Team besteht aus militärischen, polizeilichen und zivilen Ausbildern mit Einsatz- und Trainingserfahrung. Jedes Modul wird von Praktikern geleitet, die K9- und TCCC-Verfahren in realen Einsätzen umgesetzt haben.', countTemplate: 'INSTRUKTEURE AUS {n} LÄNDERN', filterAll: 'ALLE', filterDecoy: 'SCHEINANGREIFER', noResults: 'KEINE INSTRUKTEURE', loading: 'WIRD GELADEN...' },
	fr: { heroCategory: 'CERBERUS K9', heroTitle: 'NOS INSTRUCTEURS', heroSubtitle: 'Des experts du monde entier pour des modules opérationnels et de formation.', introP: 'L’équipe CERBERUS K9 réunit des instructeurs militaires, policiers et civils avec une expérience du terrain et de la formation. Chaque module est conduit par des praticiens ayant appliqué les procédures K9 et TCCC en opérations réelles.', countTemplate: 'INSTRUCTEURS DE {n} PAYS', filterAll: 'TOUS', filterDecoy: 'LEURRE', noResults: 'AUCUN INSTRUCTEUR', loading: 'CHARGEMENT...' },
	hr: { heroCategory: 'CERBERUS K9', heroTitle: 'NAŠI INSTRUKTORI', heroSubtitle: 'Stručnjaci iz cijelog svijeta za operativne i obučne module.', introP: 'Tim CERBERUS K9 čine vojni, policijski i civilni instruktori s terenskim i nastavnim iskustvom. Svaki modul vode praktičari koji su K9 i TCCC procedure provodili u stvarnim operacijama.', countTemplate: 'INSTRUKTORA IZ {n} ZEMALJA', filterAll: 'SVI', filterDecoy: 'POZORANT', noResults: 'NEMA INSTRUKTORA', loading: 'UČITAVANJE...' },
	cs: { heroCategory: 'CERBERUS K9', heroTitle: 'NAŠI INSTRUKTOŘI', heroSubtitle: 'Odborníci z celého světa pro operační a výcvikové moduly.', introP: 'Tým CERBERUS K9 tvoří vojenští, policejní i civilní instruktoři s praxí z terénu i výcviku. Každý modul vedou profesionálové, kteří nasazovali postupy K9 a TCCC v reálných operacích.', countTemplate: 'INSTRUKTORŮ Z {n} ZEMÍ', filterAll: 'VŠICHNI', filterDecoy: 'FIGURANT', noResults: 'ŽÁDNÍ INSTRUKTOŘI', loading: 'NAČÍTÁNÍ...' },
	lt: { heroCategory: 'CERBERUS K9', heroTitle: 'MŪSŲ INSTRUKTORIAI', heroSubtitle: 'Ekspertai iš viso pasaulio, vedantys operacinius ir mokymo modulius.', introP: 'CERBERUS K9 komandą sudaro kariniai, policijos ir civiliniai instruktoriai, turintys praktinės ir mokymo patirties. Kiekvieną modulį veda specialistai, realiose operacijose taikę K9 ir TCCC procedūras.', countTemplate: 'INSTRUKTORIŲ IŠ {n} ŠALIŲ', filterAll: 'VISI', filterDecoy: 'IMITATORIUS', noResults: 'INSTRUKTORIŲ NERASTA', loading: 'KRAUNAMA...' },
	lv: { heroCategory: 'CERBERUS K9', heroTitle: 'MŪSU INSTRUKTORI', heroSubtitle: 'Eksperti no visas pasaules operatīvajiem un apmācību moduļiem.', introP: 'CERBERUS K9 komandu veido militārie, policijas un civilie instruktori ar praktisku un mācību pieredzi. Katru moduli vada profesionāļi, kuri K9 un TCCC procedūras īstenojuši reālās operācijās.', countTemplate: 'INSTRUKTORI NO {n} VALSTĪM', filterAll: 'VISI', filterDecoy: 'MĀNEKLIS', noResults: 'INSTRUKTORU NAV', loading: 'IELĀDĒJAS...' },
	sk: { heroCategory: 'CERBERUS K9', heroTitle: 'NAŠI INŠTRUKTORI', heroSubtitle: 'Experti z celého sveta pre operačné a tréningové moduly.', introP: 'Tím CERBERUS K9 tvoria vojenskí, policajní a civilní inštruktori so skúsenosťami z terénu aj výcviku. Každý modul vedú praktici, ktorí zavádzali postupy K9 a TCCC v reálnych operáciách.', countTemplate: 'INŠTRUKTOROV Z {n} KRAJÍN', filterAll: 'VŠETCI', filterDecoy: 'FIGURANT', noResults: 'ŽIADNI INŠTRUKTORI', loading: 'NAČÍTAVA SA...' },
	sl: { heroCategory: 'CERBERUS K9', heroTitle: 'NAŠI INŠTRUKTORJI', heroSubtitle: 'Strokovnjaki z vsega sveta za operativne in učne module.', introP: 'Ekipo CERBERUS K9 sestavljajo vojaški, policijski in civilni inštruktorji z izkušnjami iz prakse in usposabljanja. Vsak modul vodijo strokovnjaki, ki so postopke K9 in TCCC uporabljali v realnih operacijah.', countTemplate: 'INŠTRUKTORJEV IZ {n} DRŽAV', filterAll: 'VSI', filterDecoy: 'VABA', noResults: 'NI INŠTRUKTORJEV', loading: 'NALAGANJE...' },
	hu: { heroCategory: 'CERBERUS K9', heroTitle: 'OKTATÓINK', heroSubtitle: 'A világ minden részéről érkező szakértők operatív és képzési modulokkal.', introP: 'A CERBERUS K9 csapatát katonai, rendőrségi és civil oktatók alkotják, terep- és képzési tapasztalattal. Minden modult olyan szakemberek vezetnek, akik valós műveletekben alkalmazták a K9 és TCCC eljárásokat.', countTemplate: '{n} ORSZÁGBÓL SZÁRMAZÓ OKTATÓK', filterAll: 'MIND', filterDecoy: 'SEGÉDTÁMADÓ', noResults: 'NINCS OKTATÓ', loading: 'BETÖLTÉS...' },
	no: { heroCategory: 'CERBERUS K9', heroTitle: 'VÅRE INSTRUKTØRER', heroSubtitle: 'Eksperter fra hele verden som leder operative og faglige moduler.', introP: 'CERBERUS K9-teamet består av militære, politi og sivile instruktører med felt- og treningserfaring. Hver modul ledes av fagpersoner som har brukt K9- og TCCC-prosedyrer i reelle operasjoner.', countTemplate: 'INSTRUKTØRER FRA {n} LAND', filterAll: 'ALLE', filterDecoy: 'LOKKEMANN', noResults: 'INGEN INSTRUKTØRER', loading: 'LASTER...' },
	sv: { heroCategory: 'CERBERUS K9', heroTitle: 'VÅRA INSTRUKTÖRER', heroSubtitle: 'Experter från hela världen som leder operativa och utbildande moduler.', introP: 'CERBERUS K9-teamet består av militära, polisiära och civila instruktörer med erfarenhet från både fält och utbildning. Varje modul leds av yrkespersoner som använt K9- och TCCC-procedurer i skarpa insatser.', countTemplate: 'INSTRUKTÖRER FRÅN {n} LÄNDER', filterAll: 'ALLA', filterDecoy: 'FIGURANT', noResults: 'INGA INSTRUKTÖRER', loading: 'LADDAR...' },
	nl: { heroCategory: 'CERBERUS K9', heroTitle: 'ONZE INSTRUCTEURS', heroSubtitle: 'Experts van over de hele wereld voor operationele en trainingsmodules.', introP: 'Het CERBERUS K9-team bestaat uit militaire, politie- en civiele instructeurs met praktijk- en opleidingservaring. Elke module wordt geleid door professionals die K9- en TCCC-procedures in echte operaties hebben toegepast.', countTemplate: 'INSTRUCTEURS UIT {n} LANDEN', filterAll: 'ALLE', filterDecoy: 'LOKFIGUUR', noResults: 'GEEN INSTRUCTEURS', loading: 'LADEN...' },
	es: { heroCategory: 'CERBERUS K9', heroTitle: 'NUESTROS INSTRUCTORES', heroSubtitle: 'Expertos de todo el mundo en módulos operativos y de formación.', introP: 'El equipo CERBERUS K9 reúne instructores militares, policiales y civiles con experiencia en campo y docencia. Cada módulo está dirigido por profesionales que han aplicado procedimientos K9 y TCCC en operaciones reales.', countTemplate: 'INSTRUCTORES DE {n} PAÍSES', filterAll: 'TODOS', filterDecoy: 'FIGURANTE', noResults: 'SIN INSTRUCTORES', loading: 'CARGANDO...' },
	pt: { heroCategory: 'CERBERUS K9', heroTitle: 'OS NOSSOS INSTRUTORES', heroSubtitle: 'Especialistas de todo o mundo em módulos operacionais e de formação.', introP: 'A equipa CERBERUS K9 integra instrutores militares, policiais e civis com experiência de terreno e de ensino. Cada módulo é conduzido por profissionais que aplicaram procedimentos K9 e TCCC em operações reais.', countTemplate: 'INSTRUTORES DE {n} PAÍSES', filterAll: 'TODOS', filterDecoy: 'FIGURANTE', noResults: 'SEM INSTRUTORES', loading: 'A CARREGAR...' },
	ro: { heroCategory: 'CERBERUS K9', heroTitle: 'INSTRUCTORII NOȘTRI', heroSubtitle: 'Experți din întreaga lume pentru module operaționale și de instruire.', introP: 'Echipa CERBERUS K9 include instructori militari, de poliție și civili cu experiență în teren și în instruire. Fiecare modul este condus de practicieni care au aplicat procedurile K9 și TCCC în operațiuni reale.', countTemplate: 'INSTRUCTORI DIN {n} ȚĂRI', filterAll: 'TOȚI', filterDecoy: 'FIGURANT', noResults: 'NU EXISTĂ INSTRUCTORI', loading: 'SE ÎNCARCĂ...' },
	it: { heroCategory: 'CERBERUS K9', heroTitle: 'I NOSTRI ISTRUTTORI', heroSubtitle: 'Esperti da tutto il mondo per moduli operativi e formativi.', introP: 'Il team CERBERUS K9 riunisce istruttori militari, di polizia e civili con esperienza sul campo e nella formazione. Ogni modulo è guidato da professionisti che hanno applicato procedure K9 e TCCC in operazioni reali.', countTemplate: 'ISTRUTTORI DA {n} PAESI', filterAll: 'TUTTI', filterDecoy: 'FIGURANTE', noResults: 'NESSUN ISTRUTTORE', loading: 'CARICAMENTO...' },
	ko: { heroCategory: 'CERBERUS K9', heroTitle: '강사진 소개', heroSubtitle: '전 세계 전문가들이 운영·훈련 모듈을 진행합니다.', introP: 'CERBERUS K9 강사진은 군, 경찰, 민간 분야의 실무 경험을 갖춘 전문가로 구성됩니다. 모든 모듈은 실제 작전에서 K9 및 TCCC 절차를 적용해 본 실무자가 진행합니다.', countTemplate: '{n}개국 강사진', filterAll: '전체', filterDecoy: '포저런트', noResults: '강사진이 없습니다', loading: '로딩 중...' },
};
