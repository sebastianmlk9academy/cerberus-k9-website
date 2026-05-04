import { useState, type CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import { tokens } from '../styles/tokens';

const TAG_STYLES: Record<string, { bg: string; border: string; color: string }> = {
  'K9 Gryzienie': { bg: 'rgba(196,146,42,0.15)', border: 'rgba(196,146,42,0.4)', color: '#C4922A' },
  'K9 Detekcja': { bg: 'rgba(196,146,42,0.15)', border: 'rgba(196,146,42,0.4)', color: '#C4922A' },
  'K9 Tropienie/SAR': { bg: 'rgba(196,146,42,0.15)', border: 'rgba(196,146,42,0.4)', color: '#C4922A' },
  'TCCC': { bg: 'rgba(196,43,43,0.15)', border: 'rgba(196,43,43,0.35)', color: '#C42B2B' },
  'TCCC-K9': { bg: 'rgba(196,43,43,0.15)', border: 'rgba(196,43,43,0.35)', color: '#C42B2B' },
  'Pierwsza Pomoc Przedmedyczna': { bg: 'rgba(196,43,43,0.15)', border: 'rgba(196,43,43,0.35)', color: '#C42B2B' },
  'Pozorant': { bg: 'rgba(90,58,138,0.15)', border: 'rgba(90,58,138,0.35)', color: '#8A5ACA' },
  'Konferencja - Prelegent': { bg: 'rgba(42,106,58,0.15)', border: 'rgba(42,106,58,0.35)', color: '#3A8A4A' },
  'Behawiorysta': { bg: 'rgba(42,90,138,0.15)', border: 'rgba(42,90,138,0.35)', color: '#3A7ACA' },
};

const DEFAULT_TAG = { bg: 'rgba(196,146,42,0.15)', border: 'rgba(196,146,42,0.4)', color: '#C4922A' };

const countryNames: Record<string, Record<string, string>> = {
  pl: {
    PL: 'Polska', US: 'USA', DE: 'Niemcy', FR: 'Francja',
    GB: 'Wielka Brytania', PT: 'Portugalia', IT: 'Włochy',
    ES: 'Hiszpania', CZ: 'Czechy', SK: 'Słowacja',
    HU: 'Węgry', HR: 'Chorwacja', SI: 'Słowenia',
    LT: 'Litwa', LV: 'Łotwa', EE: 'Estonia',
    NO: 'Norwegia', DK: 'Dania', SE: 'Szwecja',
    FI: 'Finlandia', BE: 'Belgia', NL: 'Holandia',
    RO: 'Rumunia', BG: 'Bułgaria', GR: 'Grecja',
    TR: 'Turcja', CA: 'Kanada', AL: 'Albania',
    ME: 'Czarnogóra', MK: 'Macedonia Północna',
    BA: 'Bośnia i Hercegowina', IS: 'Islandia',
    LU: 'Luksemburg', MT: 'Malta',
  },
  en: {
    PL: 'Poland', US: 'USA', DE: 'Germany', FR: 'France',
    GB: 'United Kingdom', PT: 'Portugal', IT: 'Italy',
    ES: 'Spain', CZ: 'Czech Republic', SK: 'Slovakia',
    HU: 'Hungary', HR: 'Croatia', SI: 'Slovenia',
    LT: 'Lithuania', LV: 'Latvia', EE: 'Estonia',
    NO: 'Norway', DK: 'Denmark', SE: 'Sweden',
    FI: 'Finland', BE: 'Belgium', NL: 'Netherlands',
    RO: 'Romania', BG: 'Bulgaria', GR: 'Greece',
    TR: 'Turkey', CA: 'Canada', AL: 'Albania',
    ME: 'Montenegro', MK: 'North Macedonia',
    BA: 'Bosnia and Herzegovina', IS: 'Iceland',
    LU: 'Luxembourg', MT: 'Malta',
  },
  de: {
    PL: 'Polen', US: 'USA', DE: 'Deutschland', FR: 'Frankreich',
    GB: 'Vereinigtes Königreich', PT: 'Portugal', IT: 'Italien',
    ES: 'Spanien', CZ: 'Tschechien', SK: 'Slowakei',
    HU: 'Ungarn', HR: 'Kroatien', SI: 'Slowenien',
    LT: 'Litauen', LV: 'Lettland', EE: 'Estland',
    NO: 'Norwegen', DK: 'Dänemark', SE: 'Schweden',
    FI: 'Finnland', BE: 'Belgien', NL: 'Niederlande',
    RO: 'Rumänien', BG: 'Bulgarien', GR: 'Griechenland',
    TR: 'Türkei', CA: 'Kanada', AL: 'Albanien',
    ME: 'Montenegro', MK: 'Nordmazedonien',
    BA: 'Bosnien und Herzegowina', IS: 'Island',
    LU: 'Luxemburg', MT: 'Malta',
  },
  fr: {
    PL: 'Pologne', US: 'États-Unis', DE: 'Allemagne',
    FR: 'France', GB: 'Royaume-Uni', PT: 'Portugal',
    IT: 'Italie', ES: 'Espagne', CZ: 'République tchèque',
    SK: 'Slovaquie', HU: 'Hongrie', HR: 'Croatie',
    SI: 'Slovénie', LT: 'Lituanie', LV: 'Lettonie',
    EE: 'Estonie', NO: 'Norvège', DK: 'Danemark',
    SE: 'Suède', FI: 'Finlande', BE: 'Belgique',
    NL: 'Pays-Bas', RO: 'Roumanie', BG: 'Bulgarie',
    GR: 'Grèce', TR: 'Turquie', CA: 'Canada',
    AL: 'Albanie', ME: 'Monténégro',
    MK: 'Macédoine du Nord', BA: 'Bosnie-Herzégovine',
    IS: 'Islande', LU: 'Luxembourg', MT: 'Malte',
  },
  cs: {
    PL: 'Polsko', US: 'USA', DE: 'Německo', FR: 'Francie',
    GB: 'Velká Británie', PT: 'Portugalsko', IT: 'Itálie',
    ES: 'Španělsko', CZ: 'Česká republika', SK: 'Slovensko',
    HU: 'Maďarsko', HR: 'Chorvatsko', SI: 'Slovinsko',
    LT: 'Litva', LV: 'Lotyšsko', EE: 'Estonsko',
    NO: 'Norsko', DK: 'Dánsko', SE: 'Švédsko',
    FI: 'Finsko', BE: 'Belgie', NL: 'Nizozemsko',
    RO: 'Rumunsko', BG: 'Bulharsko', GR: 'Řecko',
    TR: 'Turecko', CA: 'Kanada', AL: 'Albánie',
    ME: 'Černá Hora', MK: 'Severní Makedonie',
    BA: 'Bosna a Hercegovina', IS: 'Island',
    LU: 'Lucembursko', MT: 'Malta',
  },
  sk: {
    PL: 'Poľsko', US: 'USA', DE: 'Nemecko', FR: 'Francúzsko',
    GB: 'Veľká Británia', PT: 'Portugalsko', IT: 'Taliansko',
    ES: 'Španielsko', CZ: 'Česká republika', SK: 'Slovensko',
    HU: 'Maďarsko', HR: 'Chorvátsko', SI: 'Slovinsko',
    LT: 'Litva', LV: 'Lotyšsko', EE: 'Estónsko',
    NO: 'Nórsko', DK: 'Dánsko', SE: 'Švédsko',
    FI: 'Fínsko', BE: 'Belgicko', NL: 'Holandsko',
    RO: 'Rumunsko', BG: 'Bulharsko', GR: 'Grécko',
    TR: 'Turecko', CA: 'Kanada', AL: 'Albánsko',
    ME: 'Čierna Hora', MK: 'Severné Macedónsko',
    BA: 'Bosna a Hercegovina', IS: 'Island',
    LU: 'Luxembursko', MT: 'Malta',
  },
  hu: {
    PL: 'Lengyelország', US: 'USA', DE: 'Németország',
    FR: 'Franciaország', GB: 'Egyesült Királyság',
    PT: 'Portugália', IT: 'Olaszország', ES: 'Spanyolország',
    CZ: 'Csehország', SK: 'Szlovákia', HU: 'Magyarország',
    HR: 'Horvátország', SI: 'Szlovénia', LT: 'Litvánia',
    LV: 'Lettország', EE: 'Észtország', NO: 'Norvégia',
    DK: 'Dánia', SE: 'Svédország', FI: 'Finnország',
    BE: 'Belgium', NL: 'Hollandia', RO: 'Románia',
    BG: 'Bulgária', GR: 'Görögország', TR: 'Törökország',
    CA: 'Kanada', AL: 'Albánia', ME: 'Montenegró',
    MK: 'Észak-Macedónia', BA: 'Bosznia-Hercegovina',
    IS: 'Izland', LU: 'Luxemburg', MT: 'Málta',
  },
  hr: {
    PL: 'Poljska', US: 'SAD', DE: 'Njemačka', FR: 'Francuska',
    GB: 'Ujedinjeno Kraljevstvo', PT: 'Portugal', IT: 'Italija',
    ES: 'Španjolska', CZ: 'Češka', SK: 'Slovačka',
    HU: 'Mađarska', HR: 'Hrvatska', SI: 'Slovenija',
    LT: 'Litva', LV: 'Latvija', EE: 'Estonija',
    NO: 'Norveška', DK: 'Danska', SE: 'Švedska',
    FI: 'Finska', BE: 'Belgija', NL: 'Nizozemska',
    RO: 'Rumunjska', BG: 'Bugarska', GR: 'Grčka',
    TR: 'Turska', CA: 'Kanada', AL: 'Albanija',
    ME: 'Crna Gora', MK: 'Sjeverna Makedonija',
    BA: 'Bosna i Hercegovina', IS: 'Island',
    LU: 'Luksemburg', MT: 'Malta',
  },
  sl: {
    PL: 'Poljska', US: 'ZDA', DE: 'Nemčija', FR: 'Francija',
    GB: 'Združeno kraljestvo', PT: 'Portugalska', IT: 'Italija',
    ES: 'Španija', CZ: 'Češka', SK: 'Slovaška',
    HU: 'Madžarska', HR: 'Hrvaška', SI: 'Slovenija',
    LT: 'Litva', LV: 'Latvija', EE: 'Estonija',
    NO: 'Norveška', DK: 'Danska', SE: 'Švedska',
    FI: 'Finska', BE: 'Belgija', NL: 'Nizozemska',
    RO: 'Romunija', BG: 'Bolgarija', GR: 'Grčija',
    TR: 'Turčija', CA: 'Kanada', AL: 'Albanija',
    ME: 'Črna gora', MK: 'Severna Makedonija',
    BA: 'Bosna in Hercegovina', IS: 'Islandija',
    LU: 'Luksemburg', MT: 'Malta',
  },
  lt: {
    PL: 'Lenkija', US: 'JAV', DE: 'Vokietija', FR: 'Prancūzija',
    GB: 'Jungtinė Karalystė', PT: 'Portugalija', IT: 'Italija',
    ES: 'Ispanija', CZ: 'Čekija', SK: 'Slovakija',
    HU: 'Vengrija', HR: 'Kroatija', SI: 'Slovėnija',
    LT: 'Lietuva', LV: 'Latvija', EE: 'Estija',
    NO: 'Norvegija', DK: 'Danija', SE: 'Švedija',
    FI: 'Suomija', BE: 'Belgija', NL: 'Nyderlandai',
    RO: 'Rumunija', BG: 'Bulgarija', GR: 'Graikija',
    TR: 'Turkija', CA: 'Kanada', AL: 'Albanija',
    ME: 'Juodkalnija', MK: 'Šiaurės Makedonija',
    BA: 'Bosnija ir Hercegovina', IS: 'Islandija',
    LU: 'Liuksemburgas', MT: 'Malta',
  },
  lv: {
    PL: 'Polija', US: 'ASV', DE: 'Vācija', FR: 'Francija',
    GB: 'Lielbritānija', PT: 'Portugāle', IT: 'Itālija',
    ES: 'Spānija', CZ: 'Čehija', SK: 'Slovākija',
    HU: 'Ungārija', HR: 'Horvātija', SI: 'Slovēnija',
    LT: 'Lietuva', LV: 'Latvija', EE: 'Igaunija',
    NO: 'Norvēģija', DK: 'Dānija', SE: 'Zviedrija',
    FI: 'Somija', BE: 'Beļģija', NL: 'Nīderlande',
    RO: 'Rumānija', BG: 'Bulgārija', GR: 'Grieķija',
    TR: 'Turcija', CA: 'Kanāda', AL: 'Albānija',
    ME: 'Melnkalne', MK: 'Ziemeļmaķedonija',
    BA: 'Bosnija un Hercegovina', IS: 'Islande',
    LU: 'Luksemburga', MT: 'Malta',
  },
  no: {
    PL: 'Polen', US: 'USA', DE: 'Tyskland', FR: 'Frankrike',
    GB: 'Storbritannia', PT: 'Portugal', IT: 'Italia',
    ES: 'Spania', CZ: 'Tsjekkia', SK: 'Slovakia',
    HU: 'Ungarn', HR: 'Kroatia', SI: 'Slovenia',
    LT: 'Litauen', LV: 'Latvia', EE: 'Estland',
    NO: 'Norge', DK: 'Danmark', SE: 'Sverige',
    FI: 'Finland', BE: 'Belgia', NL: 'Nederland',
    RO: 'Romania', BG: 'Bulgaria', GR: 'Hellas',
    TR: 'Tyrkia', CA: 'Canada', AL: 'Albania',
    ME: 'Montenegro', MK: 'Nord-Makedonia',
    BA: 'Bosnia-Hercegovina', IS: 'Island',
    LU: 'Luxemburg', MT: 'Malta',
  },
  sv: {
    PL: 'Polen', US: 'USA', DE: 'Tyskland', FR: 'Frankrike',
    GB: 'Storbritannien', PT: 'Portugal', IT: 'Italien',
    ES: 'Spanien', CZ: 'Tjeckien', SK: 'Slovakien',
    HU: 'Ungern', HR: 'Kroatien', SI: 'Slovenien',
    LT: 'Litauen', LV: 'Lettland', EE: 'Estland',
    NO: 'Norge', DK: 'Danmark', SE: 'Sverige',
    FI: 'Finland', BE: 'Belgien', NL: 'Nederländerna',
    RO: 'Rumänien', BG: 'Bulgarien', GR: 'Grekland',
    TR: 'Turkiet', CA: 'Kanada', AL: 'Albanien',
    ME: 'Montenegro', MK: 'Nordmakedonien',
    BA: 'Bosnien och Hercegovina', IS: 'Island',
    LU: 'Luxemburg', MT: 'Malta',
  },
  nl: {
    PL: 'Polen', US: 'VS', DE: 'Duitsland', FR: 'Frankrijk',
    GB: 'Verenigd Koninkrijk', PT: 'Portugal', IT: 'Italië',
    ES: 'Spanje', CZ: 'Tsjechië', SK: 'Slowakije',
    HU: 'Hongarije', HR: 'Kroatië', SI: 'Slovenië',
    LT: 'Litouwen', LV: 'Letland', EE: 'Estland',
    NO: 'Noorwegen', DK: 'Denemarken', SE: 'Zweden',
    FI: 'Finland', BE: 'België', NL: 'Nederland',
    RO: 'Roemenië', BG: 'Bulgarije', GR: 'Griekenland',
    TR: 'Turkije', CA: 'Canada', AL: 'Albanië',
    ME: 'Montenegro', MK: 'Noord-Macedonië',
    BA: 'Bosnië en Herzegovina', IS: 'IJsland',
    LU: 'Luxemburg', MT: 'Malta',
  },
  es: {
    PL: 'Polonia', US: 'EE. UU.', DE: 'Alemania',
    FR: 'Francia', GB: 'Reino Unido', PT: 'Portugal',
    IT: 'Italia', ES: 'España', CZ: 'República Checa',
    SK: 'Eslovaquia', HU: 'Hungría', HR: 'Croacia',
    SI: 'Eslovenia', LT: 'Lituania', LV: 'Letonia',
    EE: 'Estonia', NO: 'Noruega', DK: 'Dinamarca',
    SE: 'Suecia', FI: 'Finlandia', BE: 'Bélgica',
    NL: 'Países Bajos', RO: 'Rumanía', BG: 'Bulgaria',
    GR: 'Grecia', TR: 'Turquía', CA: 'Canadá',
    AL: 'Albania', ME: 'Montenegro',
    MK: 'Macedonia del Norte', BA: 'Bosnia y Herzegovina',
    IS: 'Islandia', LU: 'Luxemburgo', MT: 'Malta',
  },
  pt: {
    PL: 'Polónia', US: 'EUA', DE: 'Alemanha', FR: 'França',
    GB: 'Reino Unido', PT: 'Portugal', IT: 'Itália',
    ES: 'Espanha', CZ: 'República Checa', SK: 'Eslováquia',
    HU: 'Hungria', HR: 'Croácia', SI: 'Eslovénia',
    LT: 'Lituânia', LV: 'Letónia', EE: 'Estónia',
    NO: 'Noruega', DK: 'Dinamarca', SE: 'Suécia',
    FI: 'Finlândia', BE: 'Bélgica', NL: 'Países Baixos',
    RO: 'Roménia', BG: 'Bulgária', GR: 'Grécia',
    TR: 'Turquia', CA: 'Canadá', AL: 'Albânia',
    ME: 'Montenegro', MK: 'Macedónia do Norte',
    BA: 'Bósnia e Herzegovina', IS: 'Islândia',
    LU: 'Luxemburgo', MT: 'Malta',
  },
  ro: {
    PL: 'Polonia', US: 'SUA', DE: 'Germania', FR: 'Franța',
    GB: 'Regatul Unit', PT: 'Portugalia', IT: 'Italia',
    ES: 'Spania', CZ: 'Republica Cehă', SK: 'Slovacia',
    HU: 'Ungaria', HR: 'Croația', SI: 'Slovenia',
    LT: 'Lituania', LV: 'Letonia', EE: 'Estonia',
    NO: 'Norvegia', DK: 'Danemarca', SE: 'Suedia',
    FI: 'Finlanda', BE: 'Belgia', NL: 'Olanda',
    RO: 'România', BG: 'Bulgaria', GR: 'Grecia',
    TR: 'Turcia', CA: 'Canada', AL: 'Albania',
    ME: 'Muntenegru', MK: 'Macedonia de Nord',
    BA: 'Bosnia și Herțegovina', IS: 'Islanda',
    LU: 'Luxemburg', MT: 'Malta',
  },
  it: {
    PL: 'Polonia', US: 'USA', DE: 'Germania', FR: 'Francia',
    GB: 'Regno Unito', PT: 'Portogallo', IT: 'Italia',
    ES: 'Spagna', CZ: 'Repubblica Ceca', SK: 'Slovacchia',
    HU: 'Ungheria', HR: 'Croazia', SI: 'Slovenia',
    LT: 'Lituania', LV: 'Lettonia', EE: 'Estonia',
    NO: 'Norvegia', DK: 'Danimarca', SE: 'Svezia',
    FI: 'Finlandia', BE: 'Belgio', NL: 'Paesi Bassi',
    RO: 'Romania', BG: 'Bulgaria', GR: 'Grecia',
    TR: 'Turchia', CA: 'Canada', AL: 'Albania',
    ME: 'Montenegro', MK: 'Macedonia del Nord',
    BA: 'Bosnia ed Erzegovina', IS: 'Islanda',
    LU: 'Lussemburgo', MT: 'Malta',
  },
  ko: {
    PL: '폴란드', US: '미국', DE: '독일', FR: '프랑스',
    GB: '영국', PT: '포르투갈', IT: '이탈리아',
    ES: '스페인', CZ: '체코', SK: '슬로바키아',
    HU: '헝가리', HR: '크로아티아', SI: '슬로베니아',
    LT: '리투아니아', LV: '라트비아', EE: '에스토니아',
    NO: '노르웨이', DK: '덴마크', SE: '스웨덴',
    FI: '핀란드', BE: '벨기에', NL: '네덜란드',
    RO: '루마니아', BG: '불가리아', GR: '그리스',
    TR: '터키', CA: '캐나다', AL: '알바니아',
    ME: '몬테네그로', MK: '북마케도니아',
    BA: '보스니아 헤르체고비나', IS: '아이슬란드',
    LU: '룩셈부르크', MT: '몰타',
  },
};

interface InstructorCardProps {
  name: string;
  role?: string;
  country: string;
  countryCode: string;
  specializations: string[];
  bioShort: string;
  bioFull: string;
  photo: string;
  order: number;
  module?: string;
  schedule?: string;
  linkedinUrl?: string;
  socialFacebook?: string;
  socialInstagram?: string;
  placeholderPhoto?: string;
  lang?: string;
}

export default function InstructorCard({
  name,
  role,
  country,
  countryCode,
  specializations,
  bioShort,
  bioFull,
  photo,
  module,
  schedule,
  linkedinUrl,
  socialFacebook,
  socialInstagram,
  placeholderPhoto,
  lang,
}: InstructorCardProps) {
  const [expanded, setExpanded] = useState(false);
  const fallbackPhoto = placeholderPhoto ?? '/images/instruktorzy/test_instruktor_photo.webp';
  const photoSrc = photo || fallbackPhoto;
  const socialLinkStyle: CSSProperties = {
    fontFamily: 'Rajdhani, sans-serif',
    fontSize: '9px',
    letterSpacing: '2px',
    marginTop: '4px',
    display: 'block',
  };
  const cardCopy: Record<string, {
    expand: string; collapse: string;
    module: string; schedule: string; linkedin: string; facebook: string; instagram: string;
  }> = {
    pl: { expand: 'ROZWIŃ BIO', collapse: 'ZWIŃ BIO',
      module: 'MODUŁ:', schedule: 'HARMONOGRAM:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    en: { expand: 'EXPAND BIO', collapse: 'COLLAPSE BIO',
      module: 'MODULE:', schedule: 'SCHEDULE:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    de: { expand: 'BIO ERWEITERN', collapse: 'BIO SCHLIESSEN',
      module: 'MODUL:', schedule: 'ZEITPLAN:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    fr: { expand: 'DÉVELOPPER LA BIO', collapse: 'RÉDUIRE LA BIO',
      module: 'MODULE :', schedule: 'PROGRAMME :', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    cs: { expand: 'ROZBALIT BIO', collapse: 'SBALIT BIO',
      module: 'MODUL:', schedule: 'ROZVRH:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    sk: { expand: 'ROZBALIŤ BIO', collapse: 'ZBALIŤ BIO',
      module: 'MODUL:', schedule: 'ROZVRH:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    hu: { expand: 'BIO MEGJELENÍTÉSE', collapse: 'BIO ELREJTÉSE',
      module: 'MODUL:', schedule: 'MENETREND:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    hr: { expand: 'PROŠIRI BIO', collapse: 'SAŽMI BIO',
      module: 'MODUL:', schedule: 'RASPORED:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    sl: { expand: 'RAZŠIRI BIO', collapse: 'STRNI BIO',
      module: 'MODUL:', schedule: 'URNIK:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    lt: { expand: 'IŠSKLEISTI BIO', collapse: 'SUTRAUKTI BIO',
      module: 'MODULIS:', schedule: 'TVARKARAŠTIS:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    lv: { expand: 'IZVĒRST BIO', collapse: 'SAKĻAUT BIO',
      module: 'MODULIS:', schedule: 'GRAFIKS:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    no: { expand: 'VIS BIO', collapse: 'SKJUL BIO',
      module: 'MODUL:', schedule: 'TIDSPLAN:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    sv: { expand: 'VISA BIO', collapse: 'DÖLJ BIO',
      module: 'MODUL:', schedule: 'SCHEMA:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    nl: { expand: 'BIO UITKLAPPEN', collapse: 'BIO INKLAPPEN',
      module: 'MODULE:', schedule: 'SCHEMA:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    es: { expand: 'AMPLIAR BIO', collapse: 'CONTRAER BIO',
      module: 'MÓDULO:', schedule: 'HORARIO:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    pt: { expand: 'EXPANDIR BIO', collapse: 'RECOLHER BIO',
      module: 'MÓDULO:', schedule: 'HORÁRIO:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    ro: { expand: 'EXTINDE BIO', collapse: 'RESTRÂNGE BIO',
      module: 'MODUL:', schedule: 'PROGRAM:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    it: { expand: 'ESPANDI BIO', collapse: 'COMPRIMI BIO',
      module: 'MODULO:', schedule: 'ORARIO:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
    ko: { expand: '바이오 펼치기', collapse: '바이오 접기',
      module: '모듈:', schedule: '일정:', linkedin: 'LINKEDIN →', facebook: 'FACEBOOK →', instagram: 'INSTAGRAM →' },
  };
  const t = cardCopy[lang ?? 'pl'] ?? cardCopy['en'];
  const resolvedCountry =
    countryCode
      ? (countryNames[lang ?? 'pl']?.[countryCode.toUpperCase()]
        ?? countryNames['en']?.[countryCode.toUpperCase()]
        ?? country)
      : country;

  return (
    <div
      className="group overflow-hidden cursor-pointer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#1E2B38',
        border: '1px solid #253344',
        transition: 'border-color 200ms ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#C4922A')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#253344')}
    >
      {/* Photo area */}
      <div className="relative w-full" style={{ aspectRatio: '1/1', flexShrink: 0, background: '#253344' }}>
        <img
          src={photoSrc}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = fallbackPhoto;
          }}
        />
        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: '40%',
            background: 'linear-gradient(to top, #1E2B38, transparent)',
          }}
        />
      </div>

      {/* Content area */}
      <div
        style={{
          padding: '20px',
          display: 'grid',
          gridTemplateRows: 'auto auto 80px auto auto',
          gap: '0px',
          alignItems: 'start',
        }}
      >
        {/* Name */}
        <h3
          style={{
            flexShrink: 0,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '22px',
            color: '#E4DDD0',
            letterSpacing: '1px',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {name}
        </h3>

        {role?.trim() ? (
          <p
            style={{
              color: tokens.text.muted,
              fontSize: '12px',
              letterSpacing: '2px',
              fontFamily: 'var(--font-rajdhani)',
              margin: '0 0 8px 0',
              lineHeight: 1.35,
            }}
          >
            {role.trim()}
          </p>
        ) : null}

        {/* Country name with flag */}
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '10px',
            letterSpacing: '3px',
            color: '#7A8A96',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
          }}
        >
          <img
            src={'https://flagcdn.com/24x18/' + countryCode.toLowerCase() + '.png'}
            srcSet={'https://flagcdn.com/48x36/' + countryCode.toLowerCase() + '.png 2x'}
            width="24"
            height="18"
            alt={resolvedCountry}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          />
          {resolvedCountry}
        </p>

        {/* Specialization tags */}
        <div
          className="flex flex-wrap"
          style={{ gap: '6px', marginBottom: '14px', flexShrink: 0, height: '80px', overflow: 'hidden', alignContent: 'start', alignItems: 'start', alignSelf: 'start' }}
        >
          {specializations.map((spec) => {
            const style = TAG_STYLES[spec] ?? DEFAULT_TAG;
            return (
              <span
                key={spec}
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '8px',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  background: style.bg,
                  border: `1px solid ${style.border}`,
                  color: style.color,
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                }}
              >
                {spec}
              </span>
            );
          })}
        </div>

        <div style={{ alignSelf: 'start', height: 'auto' }}>
          {!expanded ? (
            /* COLLAPSED */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: '12px',
                  color: '#5A6A7A',
                  lineHeight: 1.6,
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                  height: '96px',
                }}
              >
                {bioShort}
              </p>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="flex items-center gap-1 bg-transparent border-none"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  color: '#C4922A',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {t.expand}
                <ChevronDown size={12} style={{ transform: 'rotate(0deg)', transition: 'transform 300ms ease' }} />
              </button>
            </div>
          ) : (
            /* EXPANDED */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="flex items-center gap-1 bg-transparent border-none"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  color: '#C4922A',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {t.collapse}
                <ChevronDown size={12} style={{ transform: 'rotate(180deg)', transition: 'transform 300ms ease' }} />
              </button>
              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: '13px',
                  color: '#7A8A96',
                  lineHeight: 1.75,
                  margin: 0,
                  borderTop: '1px solid #253344',
                  paddingTop: '12px',
                }}
              >
                {bioFull}
              </p>
              {module && (
                <p
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '2px',
                    color: '#C4922A',
                    margin: '4px 0 0 0',
                  }}
                >
                  {t.module} {module}
                </p>
              )}
              {schedule && (
                <p
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '2px',
                    color: '#7A8A96',
                    margin: '2px 0 0 0',
                  }}
                >
                  {t.schedule} {schedule}
                </p>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...socialLinkStyle, color: '#3A7ACA' }}
                >
                  {t.linkedin}
                </a>
              )}
              {socialFacebook && (
                <a
                  href={socialFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...socialLinkStyle, color: '#6B8FD6' }}
                >
                  {t.facebook}
                </a>
              )}
              {socialInstagram && (
                <a
                  href={socialInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...socialLinkStyle, color: '#C4922A' }}
                >
                  {t.instagram}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export type { InstructorCardProps };
