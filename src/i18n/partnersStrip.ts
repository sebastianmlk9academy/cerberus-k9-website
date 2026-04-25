import type { Lang } from './utils';

export type PartnersStripCopy = {
	sectionTag: string;
	patronage: string;
	mediaPatronage: string;
	partners: string;
	becomePartner: string;
};

export const partnersStripByLang: Record<Lang, PartnersStripCopy> = {
	pl: { sectionTag: 'PATRONATY I PARTNERSTWA', patronage: 'PATRONATY', mediaPatronage: 'PATRONAT MEDIALNY', partners: 'PARTNERZY', becomePartner: 'ZOSTAŃ PARTNEREM' },
	en: { sectionTag: 'PATRONAGES & PARTNERSHIPS', patronage: 'PATRONAGES', mediaPatronage: 'MEDIA PATRONAGE', partners: 'PARTNERS', becomePartner: 'BECOME A PARTNER' },
	de: { sectionTag: 'SCHIRMHERRSCHAFTEN & PARTNERSCHAFTEN', patronage: 'SCHIRMHERRSCHAFTEN', mediaPatronage: 'MEDIENPARTNERSCHAFT', partners: 'PARTNER', becomePartner: 'PARTNER WERDEN' },
	fr: { sectionTag: 'PARRAINAGES ET PARTENARIATS', patronage: 'PARRAINAGES', mediaPatronage: 'PARRAINAGE MÉDIA', partners: 'PARTENAIRES', becomePartner: 'DEVENIR PARTENAIRE' },
	hr: { sectionTag: 'POKROVITELJSTVA I PARTNERSTVA', patronage: 'POKROVITELJSTVA', mediaPatronage: 'MEDIJSKO POKROVITELJSTVO', partners: 'PARTNERI', becomePartner: 'POSTANI PARTNER' },
	cs: { sectionTag: 'PATRONÁTY A PARTNERSTVÍ', patronage: 'PATRONÁTY', mediaPatronage: 'MEDIÁLNÍ PATRONÁT', partners: 'PARTNEŘI', becomePartner: 'STAŇTE SE PARTNEREM' },
	lt: { sectionTag: 'GLOBA IR PARTNERYSTĖS', patronage: 'GLOBA', mediaPatronage: 'ŽINIASKLAIDOS GLOBA', partners: 'PARTNERIAI', becomePartner: 'TAPKITE PARTNERIU' },
	lv: { sectionTag: 'PATRONĀŽA UN PARTNERĪBAS', patronage: 'PATRONĀŽA', mediaPatronage: 'MEDIJU PATRONĀŽA', partners: 'PARTNERI', becomePartner: 'KĻŪT PAR PARTNERI' },
	sk: { sectionTag: 'PATRONÁTY A PARTNERSTVÁ', patronage: 'PATRONÁTY', mediaPatronage: 'MEDIÁLNY PATRONÁT', partners: 'PARTNERI', becomePartner: 'STAŤ SA PARTNEROM' },
	sl: { sectionTag: 'POKROVITELJSTVA IN PARTNERSTVA', patronage: 'POKROVITELJSTVA', mediaPatronage: 'MEDIJSKO POKROVITELJSTVO', partners: 'PARTNERJI', becomePartner: 'POSTANI PARTNER' },
	hu: { sectionTag: 'VÉDNÖKSÉGEK ÉS PARTNERSÉGEK', patronage: 'VÉDNÖKSÉGEK', mediaPatronage: 'MÉDIA VÉDNÖKSÉG', partners: 'PARTNEREK', becomePartner: 'LEGYEN PARTNER' },
	no: { sectionTag: 'PATRONAT OG PARTNERSKAP', patronage: 'PATRONAT', mediaPatronage: 'MEDIEPATRONAT', partners: 'PARTNERE', becomePartner: 'BLI PARTNER' },
	sv: { sectionTag: 'PATRONAT OCH PARTNERSKAP', patronage: 'PATRONAT', mediaPatronage: 'MEDIEPATRONAT', partners: 'PARTNERS', becomePartner: 'BLI PARTNER' },
	nl: { sectionTag: 'PATRONATEN EN PARTNERSCHAPPEN', patronage: 'PATRONATEN', mediaPatronage: 'MEDIAPATRONAAT', partners: 'PARTNERS', becomePartner: 'WORD PARTNER' },
	es: { sectionTag: 'PATRONAZGOS Y ALIANZAS', patronage: 'PATRONAZGOS', mediaPatronage: 'PATRONAZGO MEDIÁTICO', partners: 'SOCIOS', becomePartner: 'HAZTE SOCIO' },
	pt: { sectionTag: 'PATRONATOS E PARCERIAS', patronage: 'PATRONATOS', mediaPatronage: 'PATRONATO DE MEDIA', partners: 'PARCEIROS', becomePartner: 'TORNE-SE PARCEIRO' },
	ro: { sectionTag: 'PATRONAJ ȘI PARTENERIATE', patronage: 'PATRONAJ', mediaPatronage: 'PATRONAJ MEDIA', partners: 'PARTENERI', becomePartner: 'DEVINO PARTENER' },
	it: { sectionTag: 'PATROCINI E PARTNERSHIP', patronage: 'PATROCINI', mediaPatronage: 'PATROCINIO MEDIALE', partners: 'PARTNER', becomePartner: 'DIVENTA PARTNER' },
	ko: { sectionTag: '후원 및 파트너십', patronage: '후원', mediaPatronage: '미디어 후원', partners: '파트너', becomePartner: '파트너 신청' },
};
