import type { Lang } from './ui';

/** SEO + PageHero copy for routes that also exist as Polish-only under `/pl/`. */
export type PlOnlyPageCopy = {
	metaTitle: string;
	metaDescription: string;
	heroCategory: string;
	heroTitle: string;
	heroSubtitle: string;
};

export const fundacjaPageByLang: Record<Lang, PlOnlyPageCopy> = {
	pl: {
		metaTitle: 'Fundacja PACTA K9 — KRS 0001219121 | Misja, Wizja, Zarząd',
		metaDescription:
			'Fundacja PACTA K9: misja i wizja, zarząd, dane rejestrowe (KRS, NIP, REGON), cele statutowe wg §5 oraz odnośniki do statutu i KRS.',
		heroCategory: 'O NAS',
		heroTitle: 'FUNDACJA PACTA K9',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · WIELKOPOLSKA',
	},
	en: {
		metaTitle: 'PACTA K9 Foundation — KRS 0001219121 | Mission, Vision, Board',
		metaDescription:
			'PACTA K9 Foundation: mission and vision, board, registry data (KRS, NIP, REGON), statutory goals under Article 5, and links to the statute and Polish National Court Register.',
		heroCategory: 'ABOUT US',
		heroTitle: 'PACTA K9 FOUNDATION',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · GREATER POLAND',
	},
	de: {
		metaTitle: 'Stiftung PACTA K9 — KRS 0001219121 | Mission, Vision, Vorstand',
		metaDescription:
			'Stiftung PACTA K9: Mission und Vision, Vorstand, Registerdaten (KRS, NIP, REGON), satzungsgemässe Ziele nach §5 sowie Links zur Satzung und zum polnischen Vereinsregister (KRS).',
		heroCategory: 'ÜBER UNS',
		heroTitle: 'STIFTUNG PACTA K9',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · GROSSPOLEN',
	},
	fr: {
		metaTitle: 'Fondation PACTA K9 — KRS 0001219121 | Mission, vision, conseil',
		metaDescription:
			'Fondation PACTA K9 : mission et vision, conseil d’administration, donnees d’immatriculation (KRS, NIP, REGON), objectifs statutaires (article 5) et liens vers les statuts et le registre national des associations polonais.',
		heroCategory: 'À PROPOS',
		heroTitle: 'FONDATION PACTA K9',
		heroSubtitle: 'KRS : 0001219121 · TOPOLA MAŁA · GRANDE-POLOGNE',
	},
	hr: {
		metaTitle: 'Zaklada PACTA K9 — KRS 0001219121 | Misija, vizija, uprava',
		metaDescription:
			'Zaklada PACTA K9: misija i vizija, uprava, registarski podaci (KRS, NIP, REGON), ciljevi prema statutu (cl. 5) te poveznice na statut i poljski sudski registar udruga.',
		heroCategory: 'O NAMA',
		heroTitle: 'ZAKLADA PACTA K9',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · VELIKOPOLJSKA',
	},
	cs: {
		metaTitle: 'Nadace PACTA K9 — KRS 0001219121 | Mise, vize, predstavenstvo',
		metaDescription:
			'Nadace PACTA K9: mise a vize, predstavenstvo, registracni udaje (KRS, NIP, REGON), cile podle stanov cl. 5 a odkazy na stanovy a polsky soudni rejstrik spolku.',
		heroCategory: 'O NAS',
		heroTitle: 'NADACE PACTA K9',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · VELKOPOLSKO',
	},
	lt: {
		metaTitle: 'PACTA K9 fondas — KRS 0001219121 | Misija, vizija, valdyba',
		metaDescription:
			'PACTA K9 fondas: misija ir vizija, valdyba, registro duomenys (KRS, NIP, REGON), istatu tikslai pagal §5 straipsni bei nuorodos i istatus ir Lenkijos teismo registra.',
		heroCategory: 'APIE MUS',
		heroTitle: 'PACTA K9 FONDAS',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · DIDŽIOJI LENKIJA',
	},
	lv: {
		metaTitle: 'PACTA K9 fonds — KRS 0001219121 | Misija, redzejums, valde',
		metaDescription:
			'PACTA K9 fonds: misija un redzejums, valde, registra dati (KRS, NIP, REGON), statuta merki pec §5 un saites uz statutu un Polijas biedribu registru.',
		heroCategory: 'PAR MUMS',
		heroTitle: 'PACTA K9 FONDS',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · LIELPOLIJA',
	},
	sk: {
		metaTitle: 'Nadácia PACTA K9 — KRS 0001219121 | Misia, vízia, predstavenstvo',
		metaDescription:
			'Nadácia PACTA K9: misia a vízia, predstavenstvo, registračné údaje (KRS, NIP, REGON), ciele podla stanov cl. 5 a odkazy na stanovy a polsky zväzový register.',
		heroCategory: 'O NÁS',
		heroTitle: 'NADÁCIA PACTA K9',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · VEĽKOPOĽSKO',
	},
	sl: {
		metaTitle: 'Fundacija PACTA K9 — KRS 0001219121 | Misija, vizija, uprava',
		metaDescription:
			'Fundacija PACTA K9: misija in vizija, uprava, registrski podatki (KRS, NIP, REGON), cilji po clenu 5 statuta ter povezave do statuta in poljskega sodnega registra drustev.',
		heroCategory: 'O NAS',
		heroTitle: 'FUNDACIJA PACTA K9',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · VELIKOPOLJSKA',
	},
	hu: {
		metaTitle: 'PACTA K9 Alapítvány — KRS 0001219121 | Küldetés, vízió, igazgatóság',
		metaDescription:
			'A PACTA K9 Alapítvány küldetése és víziója, igazgatóság, nyilvántartási adatok (KRS, NIP, REGON), alapszabály szerinti célok (5. paragrafus), valamint hivatkozások az alapszabályra és a lengyel birosági nyilvántartásra.',
		heroCategory: 'RÓLUNK',
		heroTitle: 'PACTA K9 ALAPÍTVÁNY',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · NAGYLENGYELORSZÁG',
	},
	no: {
		metaTitle: 'PACTA K9-stiftelsen — KRS 0001219121 | Misjon, visjon, styre',
		metaDescription:
			'PACTA K9-stiftelsen: misjon og visjon, styre, registerdata (KRS, NIP, REGON), vedtektsmessige mal iht. §5 og lenker til vedtekter og polsk foreningsregister.',
		heroCategory: 'OM OSS',
		heroTitle: 'PACTA K9-STIFTELSEN',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · STORPOLEN',
	},
	sv: {
		metaTitle: 'PACTA K9-stiftelsen — KRS 0001219121 | Uppdrag, vision, styrelse',
		metaDescription:
			'PACTA K9-stiftelsen: uppdrag och vision, styrelse, registreringsuppgifter (KRS, NIP, REGON), stadgade mal enligt §5 samt lankar till stadgar och polska associationsregistret.',
		heroCategory: 'OM OSS',
		heroTitle: 'PACTA K9-STIFTELSEN',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · STORPOLEN',
	},
	nl: {
		metaTitle: 'PACTA K9 Stichting — KRS 0001219121 | Missie, visie, bestuur',
		metaDescription:
			'PACTA K9 Stichting: missie en visie, bestuur, registratiegegevens (KRS, NIP, REGON), statutaire doelen conform artikel 5 en links naar de statuten en het Poolse rechtspersonenregister.',
		heroCategory: 'OVER ONS',
		heroTitle: 'STICHTING PACTA K9',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · GROOT-POLEN',
	},
	es: {
		metaTitle: 'Fundación PACTA K9 — KRS 0001219121 | Misión, visión, junta',
		metaDescription:
			'Fundación PACTA K9: misión y visión, junta directiva, datos registrales (KRS, NIP, REGON), fines estatutarios según el artículo 5 y enlaces a los estatutos y al registro nacional de asociaciones de Polonia.',
		heroCategory: 'SOBRE NOSOTROS',
		heroTitle: 'FUNDACIÓN PACTA K9',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · GRAN POLONIA',
	},
	pt: {
		metaTitle: 'Fundacao PACTA K9 — KRS 0001219121 | Missao, visao, direcao',
		metaDescription:
			'Fundacao PACTA K9: missao e visao, direcao, dados de registo (KRS, NIP, REGON), fins estatutarios ao abrigo do artigo 5 e ligacoes aos estatutos e ao registo nacional de associacoes polaco.',
		heroCategory: 'SOBRE NOS',
		heroTitle: 'FUNDACAO PACTA K9',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · GRANDE POLONIA',
	},
	ro: {
		metaTitle: 'Fundatia PACTA K9 — KRS 0001219121 | Misiune, viziune, conducere',
		metaDescription:
			'Fundatia PACTA K9: misiune si viziune, conducere, date de inregistrare (KRS, NIP, REGON), scopuri statutare conform art. 5 si legaturi catre statut si registrul asociatiilor din Polonia.',
		heroCategory: 'DESPRE NOI',
		heroTitle: 'FUNDATIA PACTA K9',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · MARELE POLONIA',
	},
	it: {
		metaTitle: 'Fondazione PACTA K9 — KRS 0001219121 | Missione, visione, consiglio',
		metaDescription:
			'Fondazione PACTA K9: missione e visione, consiglio, dati di registro (KRS, NIP, REGON), finalita statutarie ai sensi dell’articolo 5 e link allo statuto e al registro nazionale delle associazioni polacco.',
		heroCategory: 'CHI SIAMO',
		heroTitle: 'FONDAZIONE PACTA K9',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · GRANDE POLONIA',
	},
	ko: {
		metaTitle: 'PACTA K9 재단 — KRS 0001219121 | 미션, 비전, 이사회',
		metaDescription:
			'PACTA K9 재단의 미션과 비전, 이사회, 등록 정보(KRS, NIP, REGON), 정관 제5조에 따른 목적, 정관 및 폴란드 법인등기부 링크.',
		heroCategory: '소개',
		heroTitle: 'PACTA K9 재단',
		heroSubtitle: 'KRS: 0001219121 · TOPOLA MAŁA · 그레이터폴란드',
	},
};

export const mediaPageByLang: Record<Lang, PlOnlyPageCopy> = {
	pl: {
		metaTitle: 'Media — CERBERUS K9 2026 | Press Kit, Informacje Prasowe, Akredytacja',
		metaDescription:
			'Materiały prasowe CERBERUS K9 2026. Pobierz press kit, logo, zdjęcia i informacje prasowe. Kontakt dla mediów.',
		heroCategory: 'DLA DZIENNIKARZY',
		heroTitle: 'MEDIA',
		heroSubtitle: 'PRESS KIT · INFORMACJE PRASOWE · RELACJE 2025',
	},
	en: {
		metaTitle: 'Media — CERBERUS K9 2026 | Press Kit, Press Releases, Accreditation',
		metaDescription:
			'CERBERUS K9 2026 press materials. Download the press kit, logos, photos, and press information. Media contact.',
		heroCategory: 'FOR JOURNALISTS',
		heroTitle: 'MEDIA',
		heroSubtitle: 'PRESS KIT · PRESS RELEASES · 2025 COVERAGE',
	},
	de: {
		metaTitle: 'Medien — CERBERUS K9 2026 | Pressemappe, Pressemitteilungen, Akkreditierung',
		metaDescription:
			'Pressematerialien zu CERBERUS K9 2026. Pressemappe, Logos, Fotos und Presseinfos herunterladen. Kontakt fuer Medien.',
		heroCategory: 'FÜR JOURNALISTEN',
		heroTitle: 'MEDIEN',
		heroSubtitle: 'PRESSEMAPPE · PRESSEMITTEILUNGEN · MEDIEN 2025',
	},
	fr: {
		metaTitle: 'Médias — CERBERUS K9 2026 | Dossier de presse, communiqués, accréditation',
		metaDescription:
			'Matériels de presse CERBERUS K9 2026. Téléchargez le dossier de presse, logos, photos et informations presse. Contact médias.',
		heroCategory: 'POUR LA PRESSE',
		heroTitle: 'MÉDIAS',
		heroSubtitle: 'DOSSIER DE PRESSE · COMMUNIQUÉS · COUVERTURE 2025',
	},
	hr: {
		metaTitle: 'Mediji — CERBERUS K9 2026 | Press kit, priopcenja, akreditacija',
		metaDescription:
			'Medijski materijali CERBERUS K9 2026. Preuzmite press kit, logotipe, fotografije i priopcenja. Kontakt za medije.',
		heroCategory: 'ZA NOVINARE',
		heroTitle: 'MEDIJI',
		heroSubtitle: 'PRESS KIT · PRIOPCENJA · 2025. COVERAGE',
	},
	cs: {
		metaTitle: 'Média — CERBERUS K9 2026 | Press kit, tiskové zprávy, akreditace',
		metaDescription:
			'Tiskové materiály CERBERUS K9 2026. Stáhněte si press kit, loga, fotografie a tiskové informace. Kontakt pro média.',
		heroCategory: 'PRO NOVINÁŘE',
		heroTitle: 'MÉDIA',
		heroSubtitle: 'PRESS KIT · TISKOVÉ ZPRÁVY · ZÁBĚRY 2025',
	},
	lt: {
		metaTitle: 'Žiniasklaida — CERBERUS K9 2026 | Press rinkinys, pranešimai, akreditacija',
		metaDescription:
			'CERBERUS K9 2026 žiniasklaidos medžiaga. Atsisiųskite press rinkinį, logotipus, nuotraukas ir pranešimus spaudai. Kontaktai žiniasklaidai.',
		heroCategory: 'ŽINIASKLAIDAI',
		heroTitle: 'ŽINIASKLAIDA',
		heroSubtitle: 'PRESS RINKINYS · PRANEŠIMAI · 2025 NUOTRAUKOS',
	},
	lv: {
		metaTitle: 'Mediji — CERBERUS K9 2026 | Preses komplekts, preses relizes, akreditacija',
		metaDescription:
			'CERBERUS K9 2026 preses materiali. Lejupielādējiet preses komplektu, logotipus, fotografijas un preses informaciju. Kontakti medijiem.',
		heroCategory: 'PRESEI',
		heroTitle: 'MEDIJI',
		heroSubtitle: 'PRESES KOMPLEKTS · RELIZES · 2025. GADA APSKATS',
	},
	sk: {
		metaTitle: 'Médiá — CERBERUS K9 2026 | Press kit, tlačové správy, akreditácia',
		metaDescription:
			'Tlačové materiály CERBERUS K9 2026. Stiahnite si press kit, logá, fotografie a tlačové informácie. Kontakt pre médiá.',
		heroCategory: 'PRE NOVINÁROV',
		heroTitle: 'MÉDIÁ',
		heroSubtitle: 'PRESS KIT · TLACOVÉ SPRÁVY · COVERAGE 2025',
	},
	sl: {
		metaTitle: 'Mediji — CERBERUS K9 2026 | Press kit, sporočila za javnost, akreditacija',
		metaDescription:
			'Medijski materiali CERBERUS K9 2026. Prenesite press kit, logotipe, fotografije in sporočila za javnost. Kontakt za medije.',
		heroCategory: 'ZA NOVINARJE',
		heroTitle: 'MEDIJI',
		heroSubtitle: 'PRESS KIT · SPOROČILA ZA JAVNOST · 2025',
	},
	hu: {
		metaTitle: 'Média — CERBERUS K9 2026 | Sajtócsomag, közlemények, akkreditáció',
		metaDescription:
			'CERBERUS K9 2026 sajtóanyagok. Töltse le a sajtócsomagot, logókat, fényképeket és sajtóinformációkat. Média kapcsolat.',
		heroCategory: 'ÚJSÁGÍRÓKNAK',
		heroTitle: 'MÉDIA',
		heroSubtitle: 'SAJTÓCSOMAG · KÖZLEMÉNYEK · 2025-ÖS ANYAGOK',
	},
	no: {
		metaTitle: 'Media — CERBERUS K9 2026 | Pressepakke, pressemeldinger, akkreditering',
		metaDescription:
			'Pressemateriell for CERBERUS K9 2026. Last ned pressepakke, logoer, bilder og presseinformasjon. Mediekontakt.',
		heroCategory: 'FOR JOURNALISTER',
		heroTitle: 'MEDIA',
		heroSubtitle: 'PRESSEPAKKE · PRESSEMELDINGER · 2025-DEKNING',
	},
	sv: {
		metaTitle: 'Media — CERBERUS K9 2026 | Presskit, pressmeddelanden, ackreditering',
		metaDescription:
			'Pressmaterial för CERBERUS K9 2026. Ladda ner presskit, logotyper, foton och pressinformation. Mediekontakt.',
		heroCategory: 'FÖR JOURNALISTER',
		heroTitle: 'MEDIA',
		heroSubtitle: 'PRESSKIT · PRESSMEDDELANDEN · 2025-TÄCKNING',
	},
	nl: {
		metaTitle: 'Media — CERBERUS K9 2026 | Perskit, persberichten, accreditatie',
		metaDescription:
			'Persmateriaal voor CERBERUS K9 2026. Download de perskit, logo’s, foto’s en persinformatie. Media contact.',
		heroCategory: 'VOOR JOURNALISTEN',
		heroTitle: 'MEDIA',
		heroSubtitle: 'PERSKIT · PERSBERICHTEN · 2025-COVERAGE',
	},
	es: {
		metaTitle: 'Medios — CERBERUS K9 2026 | Press kit, notas de prensa, acreditación',
		metaDescription:
			'Materiales de prensa de CERBERUS K9 2026. Descargue el press kit, logotipos, fotos e información de prensa. Contacto de medios.',
		heroCategory: 'PARA PERIODISTAS',
		heroTitle: 'MEDIOS',
		heroSubtitle: 'PRESS KIT · NOTAS DE PRENSA · COBERTURA 2025',
	},
	pt: {
		metaTitle: 'Media — CERBERUS K9 2026 | Press kit, comunicados, credenciação',
		metaDescription:
			'Materiais de imprensa CERBERUS K9 2026. Descarregue o press kit, logotipos, fotos e informações para a imprensa. Contacto de media.',
		heroCategory: 'PARA JORNALISTAS',
		heroTitle: 'MEDIA',
		heroSubtitle: 'PRESS KIT · COMUNICADOS · COBERTURA 2025',
	},
	ro: {
		metaTitle: 'Media — CERBERUS K9 2026 | Press kit, comunicate, acreditare',
		metaDescription:
			'Materiale de presa CERBERUS K9 2026. Descarcati press kit-ul, logo-urile, fotografiile si informatiile de presa. Contact media.',
		heroCategory: 'PENTRU JURNALISTI',
		heroTitle: 'MEDIA',
		heroSubtitle: 'PRESS KIT · COMUNICATE · ACOPERIRE 2025',
	},
	it: {
		metaTitle: 'Media — CERBERUS K9 2026 | Press kit, comunicati stampa, accreditamento',
		metaDescription:
			'Materiali stampa CERBERUS K9 2026. Scarica il press kit, loghi, foto e informazioni per la stampa. Contatti media.',
		heroCategory: 'PER LA STAMPA',
		heroTitle: 'MEDIA',
		heroSubtitle: 'PRESS KIT · COMUNICATI · COPERTURA 2025',
	},
	ko: {
		metaTitle: '미디어 — CERBERUS K9 2026 | 프레스 키트, 보도자료, 취재 등록',
		metaDescription:
			'CERBERUS K9 2026 보도 자료. 프레스 키트, 로고, 사진 및 보도 정보를 내려받으세요. 미디어 문의.',
		heroCategory: '기자용',
		heroTitle: '미디어',
		heroSubtitle: '프레스 키트 · 보도자료 · 2025 보도',
	},
};

export const partnerzyPageByLang: Record<Lang, PlOnlyPageCopy> = {
	pl: {
		metaTitle: 'Partnerzy CERBERUS K9 | Sponsorzy i Patronat Medialny',
		metaDescription:
			'Partnerzy strategiczni, sponsorzy i patroni medialni wydarzenia CERBERUS K9 — instytucje i firmy współtworzące szkolenia K9 oraz rozwój kompetencji służb mundurowych.',
		heroCategory: 'WSPÓŁPRACA',
		heroTitle: 'PARTNERZY',
		heroSubtitle: 'STRATEGICZNI · SPONSORZY · PATRONI MEDIALNI',
	},
	en: {
		metaTitle: 'CERBERUS K9 Partners | Sponsors and Media Patrons',
		metaDescription:
			'Strategic partners, sponsors, and media patrons of CERBERUS K9 — institutions and companies co-developing K9 training and uniformed services capability.',
		heroCategory: 'PARTNERSHIPS',
		heroTitle: 'PARTNERS',
		heroSubtitle: 'STRATEGIC · SPONSORS · MEDIA PATRONS',
	},
	de: {
		metaTitle: 'Partner CERBERUS K9 | Sponsoren und Medienpatenschaft',
		metaDescription:
			'Strategische Partner, Sponsoren und Medienpaten von CERBERUS K9 — Institutionen und Unternehmen, die K9-Ausbildung und Fähigkeiten der uniformierten Dienste mitgestalten.',
		heroCategory: 'ZUSAMMENARBEIT',
		heroTitle: 'PARTNER',
		heroSubtitle: 'STRATEGISCH · SPONSOREN · MEDIENPATEN',
	},
	fr: {
		metaTitle: 'Partenaires CERBERUS K9 | Sponsors et parrainage média',
		metaDescription:
			'Partenaires strategiques, sponsors et parrains media de CERBERUS K9 — institutions et entreprises qui co-developpent la formation K9 et les competences des services en uniforme.',
		heroCategory: 'PARTENARIATS',
		heroTitle: 'PARTENAIRES',
		heroSubtitle: 'STRATÉGIQUES · SPONSORS · PARRAINS MÉDIA',
	},
	hr: {
		metaTitle: 'Partneri CERBERUS K9 | Sponzori i medijski pokrovitelji',
		metaDescription:
			'Strateski partneri, sponzori i medijski pokrovitelji CERBERUS K9 — institucije i tvrtke koje suuzdaju K9 obuku i sposobnosti sluzbi u uniformi.',
		heroCategory: 'SURADNJA',
		heroTitle: 'PARTNERI',
		heroSubtitle: 'STRATESKI · SPONZORI · MEDIJSKI POKROVITELJI',
	},
	cs: {
		metaTitle: 'Partneri CERBERUS K9 | Sponzori a medialni patronat',
		metaDescription:
			'Strategicti partneri, sponzori a medialni patroni CERBERUS K9 — instituce a firmy spoluvytvarejici vycvik K9 a schopnosti uniformovanych slozek.',
		heroCategory: 'SPOLUPRÁCE',
		heroTitle: 'PARTNEŘI',
		heroSubtitle: 'STRATEGICTÍ · SPONZOŘI · MEDIÁLNÍ PATRONI',
	},
	lt: {
		metaTitle: 'CERBERUS K9 partneriai | Rėmėjai ir žiniasklaidos globėjai',
		metaDescription:
			'Strateginiai partneriai, rėmėjai ir žiniasklaidos globėjai renginyje CERBERUS K9 — institucijos ir įmonės, kuriančios K9 mokymus ir uniformuotų tarnybų kompetencijas.',
		heroCategory: 'BENDRADARBIAVIMAS',
		heroTitle: 'PARTNERIAI',
		heroSubtitle: 'STRATEGINIAI · RĖMĖJAI · ŽINIASKLAIDOS GLOBĖJAI',
	},
	lv: {
		metaTitle: 'CERBERUS K9 partneri | Sponsoru un mediju patrons',
		metaDescription:
			'Strategiskie partneri, sponsori un mediju patroni CERBERUS K9 — iestades un uznemumi, kas lidzveido K9 apmacibu un uniformeto dienestu spejas.',
		heroCategory: 'PARTNERĪBA',
		heroTitle: 'PARTNERI',
		heroSubtitle: 'STRATEGISKIE · SPONSORI · MEDIJU PATRONI',
	},
	sk: {
		metaTitle: 'Partneri CERBERUS K9 | Sponzori a medialny patronat',
		metaDescription:
			'Strategicki partneri, sponzori a medialni patroni CERBERUS K9 — institucie a firmy spoluvytvarajuce vycvik K9 a schopnosti uniformovanych zlozek.',
		heroCategory: 'SPOLUPRÁCA',
		heroTitle: 'PARTNERI',
		heroSubtitle: 'STRATEGICKÍ · SPONZORI · MEDIÁLNI PATRÓNI',
	},
	sl: {
		metaTitle: 'Partnerji CERBERUS K9 | Sponzorji in medijski meceni',
		metaDescription:
			'Strateski partnerji, sponzorji in medijski meceni CERBERUS K9 — institucije in podjetja, ki sooblikujejo K9 usposabljanje in zmogljivosti uniformiranih sluzb.',
		heroCategory: 'SODELOVANJE',
		heroTitle: 'PARTNERJI',
		heroSubtitle: 'STRATESKI · SPONZORJI · MEDIJSKI MECENI',
	},
	hu: {
		metaTitle: 'CERBERUS K9 partnerek | Szponzorok és médiafelkarolók',
		metaDescription:
			'A CERBERUS K9 stratégiai partnerei, szponzorai és médiafelkarolói — intézmények és vállalatok, amelyek közösen alakítják a K9-képzést és az egyenruhás szolgálatok képességeit.',
		heroCategory: 'EGYÜTTMŰKÖDÉS',
		heroTitle: 'PARTNEREK',
		heroSubtitle: 'STRATÉGIAI · SZPONZOROK · MÉDIAFELKAROLÓK',
	},
	no: {
		metaTitle: 'CERBERUS K9-partnere | Sponsorer og mediapatroner',
		metaDescription:
			'Strategiske partnere, sponsorer og mediapatroner for CERBERUS K9 — institusjoner og selskaper som medutvikler K9-opplæring og kapasitet i uniformerte tjenester.',
		heroCategory: 'SAMARBEID',
		heroTitle: 'PARTNERE',
		heroSubtitle: 'STRATEGISKE · SPONSORER · MEDIAPATRONER',
	},
	sv: {
		metaTitle: 'CERBERUS K9-partners | Sponsorer och mediapatroner',
		metaDescription:
			'Strategiska partners, sponsorer och mediapatroner for CERBERUS K9 — institutioner och foretag som samutvecklar K9-utbildning och formaga hos uniformerade tjanster.',
		heroCategory: 'SAMARBETE',
		heroTitle: 'PARTNERS',
		heroSubtitle: 'STRATEGISKA · SPONSORER · MEDIAPATRONER',
	},
	nl: {
		metaTitle: 'CERBERUS K9-partners | Sponsors en mediapartners',
		metaDescription:
			'Strategische partners, sponsors en mediapatrons van CERBERUS K9 — instellingen en bedrijven die K9-training en capaciteit van uniformed diensten mede vormgeven.',
		heroCategory: 'SAMENWERKING',
		heroTitle: 'PARTNERS',
		heroSubtitle: 'STRATEGISCH · SPONSORS · MEDIAPATRONS',
	},
	es: {
		metaTitle: 'Socios CERBERUS K9 | Patrocinadores y medios',
		metaDescription:
			'Socios estrategicos, patrocinadores y medios de CERBERUS K9 — instituciones y empresas que codesarrollan la formacion K9 y las capacidades de los servicios uniformados.',
		heroCategory: 'COLABORACIÓN',
		heroTitle: 'SOCIOS',
		heroSubtitle: 'ESTRATÉGICOS · PATROCINADORES · MEDIOS',
	},
	pt: {
		metaTitle: 'Parceiros CERBERUS K9 | Patrocinadores e media',
		metaDescription:
			'Parceiros estrategicos, patrocinadores e patronos de media do CERBERUS K9 — instituicoes e empresas que co-desenvolvem formacao K9 e capacidades dos servicos uniformizados.',
		heroCategory: 'PARCERIAS',
		heroTitle: 'PARCEIROS',
		heroSubtitle: 'ESTRATÉGICOS · PATROCINADORES · PATRONOS DE MEDIA',
	},
	ro: {
		metaTitle: 'Parteneri CERBERUS K9 | Sponsori si media',
		metaDescription:
			'Parteneri strategici, sponsori si patroni media ai CERBERUS K9 — institutii si companii care co-dezvolta instruirea K9 si competentele serviciilor in uniforma.',
		heroCategory: 'PARTENERIAT',
		heroTitle: 'PARTENERI',
		heroSubtitle: 'STRATEGICI · SPONSORI · PATRONI MEDIA',
	},
	it: {
		metaTitle: 'Partner CERBERUS K9 | Sponsor e media partner',
		metaDescription:
			'Partner strategici, sponsor e patroni media di CERBERUS K9 — istituzioni e aziende che co-sviluppano la formazione K9 e le capacita dei servizi in uniforme.',
		heroCategory: 'PARTNERSHIP',
		heroTitle: 'PARTNER',
		heroSubtitle: 'STRATEGICI · SPONSOR · MEDIA PATRONI',
	},
	ko: {
		metaTitle: 'CERBERUS K9 파트너 | 스폰서 및 미디어',
		metaDescription:
			'CERBERUS K9의 전략적 파트너, 스폰서, 미디어 후원사 — K9 훈련과 제복 부대 역량을 함께 만드는 기관과 기업.',
		heroCategory: '협력',
		heroTitle: '파트너',
		heroSubtitle: '전략적 · 스폰서 · 미디어 후원',
	},
};

export const galeriaPageByLang: Record<Lang, PlOnlyPageCopy> = {
	pl: {
		metaTitle: 'Galeria — CERBERUS K9 2025 | Zdjęcia i Wideo z Ćwiczeń K9',
		metaDescription:
			'Galeria zdjęć i wideo z CERBERUS K9 2025 — Terminal LPG, Stena Line, Muzeum Gryf. 300+ profesjonalnych fotografii.',
		heroCategory: 'ARCHIWUM FOTOGRAFICZNE',
		heroTitle: 'GALERIA',
		heroSubtitle: 'EDYCJA 2025 · TRÓJMIASTO · 300+ ZDJĘĆ',
	},
	en: {
		metaTitle: 'Gallery — CERBERUS K9 2025 | Photos and Video from K9 Exercises',
		metaDescription:
			'Photo and video gallery from CERBERUS K9 2025 — LPG Terminal, Stena Line, Gryf Museum. 300+ professional photographs.',
		heroCategory: 'PHOTO ARCHIVE',
		heroTitle: 'GALLERY',
		heroSubtitle: '2025 EDITION · TRI-CITY · 300+ PHOTOS',
	},
	de: {
		metaTitle: 'Galerie — CERBERUS K9 2025 | Fotos und Video von K9-Übungen',
		metaDescription:
			'Foto- und Videogalerie von CERBERUS K9 2025 — LPG-Terminal, Stena Line, Gryf-Museum. Über 300 professionelle Fotos.',
		heroCategory: 'FOTOARCHIV',
		heroTitle: 'GALERIE',
		heroSubtitle: 'AUSGABE 2025 · DREISTADT · 300+ FOTOS',
	},
	fr: {
		metaTitle: 'Galerie — CERBERUS K9 2025 | Photos et vidéos des exercices K9',
		metaDescription:
			'Galerie photo et video de CERBERUS K9 2025 — Terminal GPL, Stena Line, musee Gryf. Plus de 300 photos professionnelles.',
		heroCategory: 'ARCHIVES PHOTO',
		heroTitle: 'GALERIE',
		heroSubtitle: 'ÉDITION 2025 · TRIO-VILLE · 300+ PHOTOS',
	},
	hr: {
		metaTitle: 'Galerija — CERBERUS K9 2025 | Fotografije i video s K9 vježbi',
		metaDescription:
			'Foto i video galerija CERBERUS K9 2025 — LPG terminal, Stena Line, Muzej Gryf. 300+ profesionalnih fotografija.',
		heroCategory: 'FOTO ARHIV',
		heroTitle: 'GALERIJA',
		heroSubtitle: 'IZDANJE 2025 · TRI GRADA · 300+ FOTOGRAFIJA',
	},
	cs: {
		metaTitle: 'Galerie — CERBERUS K9 2025 | Fotografie a video z cviceni K9',
		metaDescription:
			'Foto a video galerie CERBERUS K9 2025 — LPG terminal, Stena Line, Muzeum Gryf. 300+ profesionalnich fotografii.',
		heroCategory: 'FOTOARCHIV',
		heroTitle: 'GALERIE',
		heroSubtitle: 'ROCNIK 2025 · TRIMESTO · 300+ FOTOGRAFIÍ',
	},
	lt: {
		metaTitle: 'Galerija — CERBERUS K9 2025 | Nuotraukos ir vaizdo įrašai iš K9 pratybų',
		metaDescription:
			'CERBERUS K9 2025 nuotraukų ir vaizdo galerija — LPG terminalas, Stena Line, Gryf muziejus. 300+ profesionalių nuotraukų.',
		heroCategory: 'FOTO ARCHYVAS',
		heroTitle: 'GALERIJA',
		heroSubtitle: '2025 LEIDIMAS · TRIJŲ MIESTŲ REGIONAS · 300+ NUOTRAUKŲ',
	},
	lv: {
		metaTitle: 'Galerija — CERBERUS K9 2025 | Fotografijas un video no K9 macibam',
		metaDescription:
			'CERBERUS K9 2025 foto un video galerija — LPG terminals, Stena Line, Gryf muzejs. 300+ profesionalu fotografiju.',
		heroCategory: 'FOTO ARHĪVS',
		heroTitle: 'GALERIJA',
		heroSubtitle: '2025. IZDEVUMS · TRISPILSETA · 300+ FOTO',
	},
	sk: {
		metaTitle: 'Galéria — CERBERUS K9 2025 | Fotografie a video z cviceni K9',
		metaDescription:
			'Foto a video galéria CERBERUS K9 2025 — LPG terminál, Stena Line, Múzeum Gryf. 300+ profesionálnych fotografií.',
		heroCategory: 'FOTOARCHÍV',
		heroTitle: 'GALÉRIA',
		heroSubtitle: 'ROCNIK 2025 · TROJMESTO · 300+ FOTografií',
	},
	sl: {
		metaTitle: 'Galerija — CERBERUS K9 2025 | Fotografije in video z vaj K9',
		metaDescription:
			'Foto in video galerija CERBERUS K9 2025 — LPG terminal, Stena Line, Muzej Gryf. 300+ profesionalnih fotografij.',
		heroCategory: 'FOTO ARHIV',
		heroTitle: 'GALERIJA',
		heroSubtitle: 'IZDAJA 2025 · TRI MESTA · 300+ FOTOGRAFIJ',
	},
	hu: {
		metaTitle: 'Galéria — CERBERUS K9 2025 | Fotók és videók a K9 gyakorlatokról',
		metaDescription:
			'CERBERUS K9 2025 fotó- és videógalériája — LPG terminál, Stena Line, Gryf Múzeum. 300+ professzionális fénykép.',
		heroCategory: 'FOTÓARCHÍVUM',
		heroTitle: 'GALÉRIA',
		heroSubtitle: '2025-ÖS KIADÁS · HÁROMVÁROS · 300+ FÉNYKÉP',
	},
	no: {
		metaTitle: 'Galleri — CERBERUS K9 2025 | Bilder og video fra K9-øvelser',
		metaDescription:
			'Bilde- og videogalleri fra CERBERUS K9 2025 — LPG-terminal, Stena Line, Gryf-museet. 300+ profesjonelle fotografier.',
		heroCategory: 'FOTOARKIV',
		heroTitle: 'GALLERI',
		heroSubtitle: '2025-UTGAVE · TREBY · 300+ BILDER',
	},
	sv: {
		metaTitle: 'Galleri — CERBERUS K9 2025 | Foton och video från K9-övningar',
		metaDescription:
			'Foto- och videogalleri från CERBERUS K9 2025 — LPG-terminalen, Stena Line, Gryf-museet. 300+ professionella fotografier.',
		heroCategory: 'FOTOARKIV',
		heroTitle: 'GALLERI',
		heroSubtitle: '2025-UTGÅVA · TRESTAD · 300+ FOTON',
	},
	nl: {
		metaTitle: 'Galerij — CERBERUS K9 2025 | Foto’s en video van K9-oefeningen',
		metaDescription:
			'Foto- en videogalerij van CERBERUS K9 2025 — LPG-terminal, Stena Line, Gryf Museum. 300+ professionele foto’s.',
		heroCategory: 'FOTOARCHIEF',
		heroTitle: 'GALERIJ',
		heroSubtitle: 'EDITIE 2025 · DRIESTAD · 300+ FOTO’S',
	},
	es: {
		metaTitle: 'Galería — CERBERUS K9 2025 | Fotos y vídeo de los ejercicios K9',
		metaDescription:
			'Galería de fotos y vídeo de CERBERUS K9 2025 — Terminal LPG, Stena Line, Museo Gryf. Más de 300 fotografías profesionales.',
		heroCategory: 'ARCHIVO FOTOGRÁFICO',
		heroTitle: 'GALERÍA',
		heroSubtitle: 'EDICIÓN 2025 · TRICIUDAD · 300+ FOTOS',
	},
	pt: {
		metaTitle: 'Galeria — CERBERUS K9 2025 | Fotos e vídeo dos exercícios K9',
		metaDescription:
			'Galeria de fotos e vídeo do CERBERUS K9 2025 — Terminal LPG, Stena Line, Museu Gryf. Mais de 300 fotografias profissionais.',
		heroCategory: 'ARQUIVO FOTOGRÁFICO',
		heroTitle: 'GALERIA',
		heroSubtitle: 'EDIÇÃO 2025 · TRICIDADE · 300+ FOTOS',
	},
	ro: {
		metaTitle: 'Galerie — CERBERUS K9 2025 | Fotografii si video de la exercitiile K9',
		metaDescription:
			'Galerie foto si video CERBERUS K9 2025 — Terminal LPG, Stena Line, Muzeul Gryf. Peste 300 de fotografii profesionale.',
		heroCategory: 'ARHIVĂ FOTO',
		heroTitle: 'GALERIE',
		heroSubtitle: 'EDITIA 2025 · TRIO ORASE · 300+ FOTOGRAFII',
	},
	it: {
		metaTitle: 'Galleria — CERBERUS K9 2025 | Foto e video dagli esercizi K9',
		metaDescription:
			'Galleria foto e video di CERBERUS K9 2025 — terminale GPL, Stena Line, Museo Gryf. Oltre 300 fotografie professionali.',
		heroCategory: 'ARCHIVIO FOTOGRAFICO',
		heroTitle: 'GALLERIA',
		heroSubtitle: 'EDIZIONE 2025 · TRI-CITTA · 300+ FOTO',
	},
	ko: {
		metaTitle: '갤러리 — CERBERUS K9 2025 | K9 훈련 사진 및 영상',
		metaDescription:
			'CERBERUS K9 2025 사진·영상 갤러리 — LPG 터미널, Stena Line, Gryf 박물관. 전문 사진 300장 이상.',
		heroCategory: '사진 아카이브',
		heroTitle: '갤러리',
		heroSubtitle: '2025 에디션 · 트리시티 · 사진 300+',
	},
};
