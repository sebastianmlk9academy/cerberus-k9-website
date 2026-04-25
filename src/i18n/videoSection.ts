import type { Lang } from './utils';

export type VideoSectionCopy = {
	sectionTag: string;
	sectionTitle: string;
	mainVideoTitle: string;
	secondaryVideoTitle: string;
	stripText: string;
};

export const videoSectionByLang: Record<Lang, VideoSectionCopy> = {
	pl: { sectionTag: 'MEDIA I PRASA', sectionTitle: 'RELACJA 2025', mainVideoTitle: 'Główna relacja', secondaryVideoTitle: 'Reportaż i wywiad', stripText: 'CERBERUS K9 2025 · GDAŃSK · POLSKA · RELACJA OFICJALNA' },
	en: { sectionTag: 'MEDIA & PRESS', sectionTitle: '2025 COVERAGE', mainVideoTitle: 'Main coverage', secondaryVideoTitle: 'Report and interview', stripText: 'CERBERUS K9 2025 · GDAŃSK · POLAND · OFFICIAL COVERAGE' },
	de: { sectionTag: 'MEDIEN & PRESSE', sectionTitle: 'BERICHT 2025', mainVideoTitle: 'Hauptbericht', secondaryVideoTitle: 'Reportage und Interview', stripText: 'CERBERUS K9 2025 · DANZIG · POLEN · OFFIZIELLE BERICHTERSTATTUNG' },
	fr: { sectionTag: 'MÉDIAS & PRESSE', sectionTitle: 'REPORTAGE 2025', mainVideoTitle: 'Reportage principale', secondaryVideoTitle: 'Reportage et interview', stripText: 'CERBERUS K9 2025 · GDAŃSK · POLOGNE · REPORTAGE OFFICIEL' },
	hr: { sectionTag: 'MEDIJI I TISAK', sectionTitle: 'IZVJEŠTAJ 2025', mainVideoTitle: 'Glavni izvještaj', secondaryVideoTitle: 'Reportaža i intervju', stripText: 'CERBERUS K9 2025 · GDAŃSK · POLJSKA · SLUŽBENI IZVJEŠTAJ' },
	cs: { sectionTag: 'MÉDIA A TISK', sectionTitle: 'REPORTÁŽ 2025', mainVideoTitle: 'Hlavní reportáž', secondaryVideoTitle: 'Reportáž a rozhovor', stripText: 'CERBERUS K9 2025 · GDAŃSK · POLSKO · OFICIÁLNÍ REPORTÁŽ' },
	lt: { sectionTag: 'ŽINIASKLAIDA IR SPAUDA', sectionTitle: '2025 REPORTAŽAS', mainVideoTitle: 'Pagrindinis reportažas', secondaryVideoTitle: 'Reportažas ir interviu', stripText: 'CERBERUS K9 2025 · GDAŃSKAS · LENKIJA · OFICIALUS REPORTAŽAS' },
	lv: { sectionTag: 'MEDIJI UN PRESE', sectionTitle: '2025. GADA REPORTĀŽA', mainVideoTitle: 'Galvenā reportāža', secondaryVideoTitle: 'Reportāža un intervija', stripText: 'CERBERUS K9 2025 · GDAŅSKA · POLIJA · OFICIĀLĀ REPORTĀŽA' },
	sk: { sectionTag: 'MÉDIÁ A TLAČ', sectionTitle: 'REPORTÁŽ 2025', mainVideoTitle: 'Hlavná reportáž', secondaryVideoTitle: 'Reportáž a rozhovor', stripText: 'CERBERUS K9 2025 · GDAŃSK · POĽSKO · OFICIÁLNA REPORTÁŽ' },
	sl: { sectionTag: 'MEDIJI IN TISK', sectionTitle: 'POROČILO 2025', mainVideoTitle: 'Glavno poročilo', secondaryVideoTitle: 'Reportaža in intervju', stripText: 'CERBERUS K9 2025 · GDAŃSK · POLJSKA · URADNO POROČILO' },
	hu: { sectionTag: 'MÉDIA ÉS SAJTÓ', sectionTitle: '2025-ÖS BESZÁMOLÓ', mainVideoTitle: 'Fő beszámoló', secondaryVideoTitle: 'Riport és interjú', stripText: 'CERBERUS K9 2025 · GDAŃSK · LENGYELORSZÁG · HIVATALOS BESZÁMOLÓ' },
	no: { sectionTag: 'MEDIA OG PRESSE', sectionTitle: '2025-REPORTASJE', mainVideoTitle: 'Hovedreportasje', secondaryVideoTitle: 'Reportasje og intervju', stripText: 'CERBERUS K9 2025 · GDAŃSK · POLEN · OFFISIELL REPORTASJE' },
	sv: { sectionTag: 'MEDIA OCH PRESS', sectionTitle: 'REPORTAGE 2025', mainVideoTitle: 'Huvudreportage', secondaryVideoTitle: 'Reportage och intervju', stripText: 'CERBERUS K9 2025 · GDAŃSK · POLEN · OFFICIELL REPORTAGE' },
	nl: { sectionTag: 'MEDIA EN PERS', sectionTitle: 'REPORTAGE 2025', mainVideoTitle: 'Hoofdreportage', secondaryVideoTitle: 'Reportage en interview', stripText: 'CERBERUS K9 2025 · GDAŃSK · POLEN · OFFICIËLE REPORTAGE' },
	es: { sectionTag: 'MEDIOS Y PRENSA', sectionTitle: 'COBERTURA 2025', mainVideoTitle: 'Cobertura principal', secondaryVideoTitle: 'Reportaje y entrevista', stripText: 'CERBERUS K9 2025 · GDAŃSK · POLONIA · COBERTURA OFICIAL' },
	pt: { sectionTag: 'MEDIA E IMPRENSA', sectionTitle: 'REPORTAGEM 2025', mainVideoTitle: 'Reportagem principal', secondaryVideoTitle: 'Reportagem e entrevista', stripText: 'CERBERUS K9 2025 · GDAŃSK · POLÓNIA · REPORTAGEM OFICIAL' },
	ro: { sectionTag: 'MEDIA ȘI PRESĂ', sectionTitle: 'REPORTAJ 2025', mainVideoTitle: 'Reportaj principal', secondaryVideoTitle: 'Reportaj și interviu', stripText: 'CERBERUS K9 2025 · GDAŃSK · POLONIA · REPORTAJ OFICIAL' },
	it: { sectionTag: 'MEDIA E STAMPA', sectionTitle: 'REPORTAGE 2025', mainVideoTitle: 'Reportage principale', secondaryVideoTitle: 'Reportage e intervista', stripText: 'CERBERUS K9 2025 · DÀNICA · POLONIA · REPORTAGE UFFICIALE' },
	ko: { sectionTag: '미디어 및 프레스', sectionTitle: '2025 하이라이트', mainVideoTitle: '메인 영상', secondaryVideoTitle: '리포트 및 인터뷰', stripText: 'CERBERUS K9 2025 · 그단스크 · 폴란드 · 공식 영상' },
};
