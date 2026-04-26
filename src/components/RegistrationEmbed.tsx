import { useState, type MouseEvent } from "react";
import { Calendar, MapPin, Ticket, AlertCircle, Mail, Phone, ExternalLink, ChevronDown } from "lucide-react";

interface RegistrationEmbedProps {
  lang?: string;
  pretixUrl?: string;
  dateValue?: string;
  prepDay?: string;
  venues?: string;
  city?: string;
  contactEmail?: string;
  contactPhone?: string;
}

const regCopy: Record<
  string,
  {
    title: string;
    subtitle: string;
    howTitle: string;
    step1: string;
    step2: string;
    step3: string;
    openForm: string;
    tip: string;
    deadline: string;
    dateLabel: string;
    placeLabel: string;
    admissionLabel: string;
    admissionValue: string;
    limitLabel: string;
    limitValue: string;
    contactLabel: string;
    questionsLabel: string;
    contactUs: string;
  }
> = {
  pl: {
    title: "Rejestracja na Cerberus",
    subtitle: "WSTĘP BEZPŁATNY · WYMAGANA REJESTRACJA",
    howTitle: "JAK SIĘ ZAREJESTROWAĆ — 3 KROKI",
    step1: "Wybierz bilet i kliknij „Zarejestruj\" / „Dalej\".",
    step2: "Finalizacja otworzy się w nowym oknie Pretix — zezwól na wyskakujące okna.",
    step3: "Jeśli przyciski nie reagują, użyj linku „Otwórz pełny formularz\" pod widgetem.",
    openForm: "OTWÓRZ PEŁNY FORMULARZ REJESTRACJI",
    tip: "Po wybraniu biletu, finalizacja zamówienia odbywa się na stronie Pretix.",
    deadline: "Dzień przygotowawczy: 12 czerwca",
    dateLabel: "TERMIN", placeLabel: "MIEJSCE",
    admissionLabel: "WSTĘP", admissionValue: "BEZPŁATNY",
    limitLabel: "UWAGA", limitValue: "LICZBA MIEJSC OGRANICZONA",
    contactLabel: "KONTAKT — REJESTRACJA",
    questionsLabel: "MASZ PYTANIA O REJESTRACJĘ?",
    contactUs: "SKONTAKTUJ SIĘ Z NAMI",
    admissionNote: "Finansowane z dotacji samorządowych",
    registerNow: "Zarejestruj się teraz",
  },
  en: {
    title: "Register for Cerberus",
    subtitle: "FREE ADMISSION · REGISTRATION REQUIRED",
    howTitle: "HOW TO REGISTER — 3 STEPS",
    step1: "Select a ticket and click \"Register\" / \"Next\".",
    step2: "Checkout will open in a new Pretix window — allow pop-ups.",
    step3: "If buttons don't respond, use the \"Open full form\" link below the widget.",
    openForm: "OPEN FULL REGISTRATION FORM",
    tip: "After selecting a ticket, order finalisation takes place on the Pretix website.",
    deadline: "Preparation day: June 12",
    dateLabel: "DATE", placeLabel: "VENUE",
    admissionLabel: "ADMISSION", admissionValue: "FREE",
    limitLabel: "NOTE", limitValue: "LIMITED PLACES AVAILABLE",
    contactLabel: "CONTACT — REGISTRATION",
    questionsLabel: "QUESTIONS ABOUT REGISTRATION?",
    contactUs: "CONTACT US",
    admissionNote: "Funded by local government grants",
    registerNow: "Register now",
  },
  de: {
    title: "Anmeldung für Cerberus",
    subtitle: "KOSTENLOSER EINTRITT · ANMELDUNG ERFORDERLICH",
    howTitle: "SO MELDEN SIE SICH AN — 3 SCHRITTE",
    step1: "Wählen Sie ein Ticket und klicken Sie auf „Registrieren\" / „Weiter\".",
    step2: "Der Checkout öffnet sich in einem neuen Pretix-Fenster — erlauben Sie Pop-ups.",
    step3: "Wenn die Schaltflächen nicht reagieren, nutzen Sie den Link „Vollständiges Anmeldeformular öffnen\" unter dem Widget.",
    openForm: "VOLLSTÄNDIGES ANMELDEFORMULAR ÖFFNEN",
    tip: "Nach der Ticketauswahl erfolgt der Bestellabschluss auf der Pretix-Website.",
    deadline: "Vorbereitungstag: 12. Juni",
    dateLabel: "DATUM", placeLabel: "ORT",
    admissionLabel: "EINTRITT", admissionValue: "KOSTENLOS",
    limitLabel: "HINWEIS", limitValue: "BEGRENZTE PLÄTZE",
    contactLabel: "KONTAKT — ANMELDUNG",
    questionsLabel: "FRAGEN ZUR ANMELDUNG?",
    contactUs: "KONTAKTIEREN SIE UNS",
    admissionNote: "Finanziert durch kommunale Fördermittel",
    registerNow: "Jetzt registrieren",
  },
  fr: {
    title: "Inscription à Cerberus",
    subtitle: "ENTRÉE GRATUITE · INSCRIPTION OBLIGATOIRE",
    howTitle: "COMMENT S'INSCRIRE — 3 ÉTAPES",
    step1: "Sélectionnez un billet puis cliquez sur « S'inscrire » / « Suivant ».",
    step2: "Le paiement s'ouvrira dans une nouvelle fenêtre Pretix — autorisez les pop-ups.",
    step3: "Si les boutons ne répondent pas, utilisez le lien « Ouvrir le formulaire complet » sous le widget.",
    openForm: "OUVRIR LE FORMULAIRE COMPLET",
    tip: "Après la sélection du billet, la finalisation de la commande se fait sur le site Pretix.",
    deadline: "Journée préparatoire : 12 juin",
    dateLabel: "DATE", placeLabel: "LIEU",
    admissionLabel: "ENTRÉE", admissionValue: "GRATUITE",
    limitLabel: "NOTE", limitValue: "PLACES LIMITÉES",
    contactLabel: "CONTACT — INSCRIPTION",
    questionsLabel: "DES QUESTIONS SUR L'INSCRIPTION ?",
    contactUs: "CONTACTEZ-NOUS",
    admissionNote: "Financé par des subventions des collectivités locales",
    registerNow: "Inscrivez-vous maintenant",
  },
  cs: {
    title: "Registrace na Cerberus",
    subtitle: "VSTUP ZDARMA · REGISTRACE POVINNÁ",
    howTitle: "JAK SE REGISTROVAT — 3 KROKY",
    step1: "Vyberte vstupenku a klikněte na „Registrovat\" / „Další\".",
    step2: "Dokončení objednávky se otevře v novém okně Pretix — povolte vyskakovací okna.",
    step3: "Pokud tlačítka nereagují, použijte odkaz „Otevřít celý formulář\" pod widgetem.",
    openForm: "OTEVŘÍT CELÝ FORMULÁŘ",
    tip: "Po výběru vstupenky probíhá dokončení objednávky na webu Pretix.",
    deadline: "Přípravný den: 12. června",
    dateLabel: "TERMÍN", placeLabel: "MÍSTO",
    admissionLabel: "VSTUP", admissionValue: "ZDARMA",
    limitLabel: "POZNÁMKA", limitValue: "OMEZENÝ POČET MÍST",
    contactLabel: "KONTAKT — REGISTRACE",
    questionsLabel: "MÁTE DOTAZY K REGISTRACI?",
    contactUs: "KONTAKTUJTE NÁS",
    admissionNote: "Financováno z dotací samosprávy",
    registerNow: "Zaregistrujte se nyní",
  },
  sk: {
    title: "Registrácia na Cerberus",
    subtitle: "VSTUP ZDARMA · REGISTRÁCIA POVINNÁ",
    howTitle: "AKO SA REGISTROVAŤ — 3 KROKY",
    step1: "Vyberte lístok a kliknite na „Registrovať\" / „Ďalej\".",
    step2: "Dokončenie objednávky sa otvorí v novom okne Pretix — povoľte vyskakovacie okná.",
    step3: "Ak tlačidlá nereagujú, použite odkaz „Otvoriť celý formulár\" pod widgetom.",
    openForm: "OTVORIŤ CELÝ FORMULÁR",
    tip: "Po výbere lístka prebieha dokončenie objednávky na stránke Pretix.",
    deadline: "Prípravný deň: 12. júna",
    dateLabel: "TERMÍN", placeLabel: "MIESTO",
    admissionLabel: "VSTUP", admissionValue: "ZDARMA",
    limitLabel: "POZNÁMKA", limitValue: "OBMEDZENÝ POČET MIEST",
    contactLabel: "KONTAKT — REGISTRÁCIA",
    questionsLabel: "MÁTE OTÁZKY K REGISTRÁCII?",
    contactUs: "KONTAKTUJTE NÁS",
    admissionNote: "Financované z dotácií samosprávy",
    registerNow: "Zaregistrujte sa teraz",
  },
  hu: {
    title: "Regisztráció a Cerberusra",
    subtitle: "INGYENES BELÉPÉS · REGISZTRÁCIÓ SZÜKSÉGES",
    howTitle: "HOGYAN REGISZTRÁLJ — 3 LÉPÉS",
    step1: "Válasszon jegyet, majd kattintson a „Regisztráció\" / „Tovább\" gombra.",
    step2: "A fizetés új Pretix ablakban nyílik meg — engedélyezze a felugró ablakokat.",
    step3: "Ha a gombok nem reagálnak, használja a widget alatti „Teljes regisztrációs űrlap megnyitása\" linket.",
    openForm: "TELJES REGISZTRÁCIÓS ŰRLAP MEGNYITÁSA",
    tip: "Jegyválasztás után a rendelés véglegesítése a Pretix weboldalán történik.",
    deadline: "Előkészítő nap: június 12.",
    dateLabel: "IDŐPONT", placeLabel: "HELYSZÍN",
    admissionLabel: "BELÉPÉS", admissionValue: "INGYENES",
    limitLabel: "MEGJEGYZÉS", limitValue: "KORLÁTOZOTT FÉRŐHELY",
    contactLabel: "KAPCSOLAT — REGISZTRÁCIÓ",
    questionsLabel: "KÉRDÉSE VAN A REGISZTRÁCIÓVAL KAPCSOLATBAN?",
    contactUs: "VEGYE FEL VELÜNK A KAPCSOLATOT",
    admissionNote: "Önkormányzati támogatásból finanszírozva",
    registerNow: "Regisztráljon most",
  },
  hr: {
    title: "Registracija za Cerberus",
    subtitle: "BESPLATAN ULAZ · REGISTRACIJA OBAVEZNA",
    howTitle: "KAKO SE REGISTRIRATI — 3 KORAKA",
    step1: "Odaberite ulaznicu i kliknite „Registriraj se\" / „Dalje\".",
    step2: "Završetak prijave otvorit će se u novom Pretix prozoru — dopustite skočne prozore.",
    step3: "Ako gumbi ne reagiraju, upotrijebite poveznicu „Otvorite cijeli obrazac za registraciju\" ispod widgeta.",
    openForm: "OTVORITE CIJELI OBRAZAC ZA REGISTRACIJU",
    tip: "Nakon odabira ulaznice, završetak narudžbe odvija se na Pretix web-stranici.",
    deadline: "Pripremni dan: 12. lipnja",
    dateLabel: "DATUM", placeLabel: "MJESTO",
    admissionLabel: "ULAZ", admissionValue: "BESPLATAN",
    limitLabel: "NAPOMENA", limitValue: "OGRANIČEN BROJ MJESTA",
    contactLabel: "KONTAKT — REGISTRACIJA",
    questionsLabel: "IMATE PITANJA O REGISTRACIJI?",
    contactUs: "KONTAKTIRAJTE NAS",
    admissionNote: "Financirano lokalnim državnim bespovratnim sredstvima",
    registerNow: "Registrirajte se sada",
  },
  sl: {
    title: "Registracija za Cerberus",
    subtitle: "BREZPLAČEN VSTOP · REGISTRACIJA OBVEZNA",
    howTitle: "KAKO SE REGISTRIRATI — 3 KORAKI",
    step1: "Izberite vstopnico in kliknite »Registracija« / »Naprej«.",
    step2: "Zaključek naročila se odpre v novem oknu Pretix — dovolite pojavna okna.",
    step3: "Če gumbi ne delujejo, uporabite povezavo »Odprite celoten registracijski obrazec« pod gradnikom.",
    openForm: "ODPRITE CELOTEN REGISTRACIJSKI OBRAZEC",
    tip: "Po izbiri vstopnice se zaključek naročila izvede na spletni strani Pretix.",
    deadline: "Pripravljalni dan: 12. junij",
    dateLabel: "DATUM", placeLabel: "KRAJ",
    admissionLabel: "VSTOP", admissionValue: "BREZPLAČEN",
    limitLabel: "OPOMBA", limitValue: "OMEJENO ŠTEVILO MEST",
    contactLabel: "KONTAKT — REGISTRACIJA",
    questionsLabel: "IMATE VPRAŠANJA O REGISTRACIJI?",
    contactUs: "STOPITE V STIK Z NAMI",
    admissionNote: "Financirano z lokalnimi vladnimi nepovratnimi sredstvi",
    registerNow: "Registrirajte se zdaj",
  },
  lt: {
    title: "Registracija į Cerberus",
    subtitle: "NEMOKAMAS ĮĖJIMAS · REGISTRACIJA BŪTINA",
    howTitle: "KAIP UŽSIREGISTRUOTI — 3 ŽINGSNIAI",
    step1: "Pasirinkite bilietą ir spustelėkite „Registruotis\" / „Toliau\".",
    step2: "Užsakymo užbaigimas atsidarys naujame Pretix lange — leiskite iššokančius langus.",
    step3: "Jei mygtukai nereaguoja, naudokite nuorodą „Atidaryti pilną registracijos formą\" po valdikliu.",
    openForm: "ATIDARYTI PILNĄ REGISTRACIJOS FORMĄ",
    tip: "Pasirinkus bilietą, užsakymo užbaigimas vyksta Pretix svetainėje.",
    deadline: "Parengiamoji diena: birželio 12 d.",
    dateLabel: "DATA", placeLabel: "VIETA",
    admissionLabel: "ĮĖJIMAS", admissionValue: "NEMOKAMAS",
    limitLabel: "PASTABA", limitValue: "RIBOTAS VIETŲ SKAIČIUS",
    contactLabel: "KONTAKTAI — REGISTRACIJA",
    questionsLabel: "TURITE KLAUSIMŲ APIE REGISTRACIJĄ?",
    contactUs: "SUSISIEKITE SU MUMIS",
    admissionNote: "Finansuojama iš savivaldybių dotacijų",
    registerNow: "Užsiregistruokite dabar",
  },
  lv: {
    title: "Reģistrācija Cerberus",
    subtitle: "BEZMAKSAS IEEJA · REĢISTRĀCIJA OBLIGĀTA",
    howTitle: "KĀ REĢISTRĒTIES — 3 SOĻI",
    step1: "Izvēlieties biļeti un noklikšķiniet uz „Reģistrēties\" / „Tālāk\".",
    step2: "Pasūtījuma pabeigšana tiks atvērta jaunā Pretix logā — atļaujiet uznirstošos logus.",
    step3: "Ja pogas nereaģē, izmantojiet saiti „Atvērt pilno reģistrācijas veidlapu\" zem logrīka.",
    openForm: "ATVĒRT PILNO REĢISTRĀCIJAS VEIDLAPU",
    tip: "Pēc biļetes izvēles pasūtījuma pabeigšana notiek Pretix vietnē.",
    deadline: "Sagatavošanās diena: 12. jūnijs",
    dateLabel: "DATUMS", placeLabel: "VIETA",
    admissionLabel: "IEEJA", admissionValue: "BEZMAKSAS",
    limitLabel: "PIEZĪME", limitValue: "IEROBEŽOTS VIETU SKAITS",
    contactLabel: "KONTAKTS — REĢISTRĀCIJA",
    questionsLabel: "IR JAUTĀJUMI PAR REĢISTRĀCIJU?",
    contactUs: "SAZINIETIES AR MUMS",
    admissionNote: "Finansēts no vietējās pašvaldības dotācijām",
    registerNow: "Reģistrējieties tagad",
  },
  no: {
    title: "Registrering til Cerberus",
    subtitle: "GRATIS INNGANG · REGISTRERING PÅKREVD",
    howTitle: "SLIK REGISTRERER DU DEG — 3 TRINN",
    step1: "Velg en billett og klikk «Registrer» / «Neste».",
    step2: "Kassen åpnes i et nytt Pretix-vindu — tillat popup-vinduer.",
    step3: "Hvis knappene ikke svarer, bruk lenken «Åpne fullt registreringsskjema» under widgeten.",
    openForm: "ÅPNE FULLT REGISTRERINGSSKJEMA",
    tip: "Etter valg av billett skjer fullføring av bestilling på Pretix-nettstedet.",
    deadline: "Forberedelsesdag: 12. juni",
    dateLabel: "DATO", placeLabel: "STED",
    admissionLabel: "INNGANG", admissionValue: "GRATIS",
    limitLabel: "MERK", limitValue: "BEGRENSET ANTALL PLASSER",
    contactLabel: "KONTAKT — REGISTRERING",
    questionsLabel: "SPØRSMÅL OM REGISTRERING?",
    contactUs: "KONTAKT OSS",
    admissionNote: "Finansiert av lokale tilskudd",
    registerNow: "Registrer deg nå",
  },
  sv: {
    title: "Registrering för Cerberus",
    subtitle: "GRATIS INTRÄDE · REGISTRERING KRÄVS",
    howTitle: "SÅ REGISTRERAR DU DIG — 3 STEG",
    step1: "Välj en biljett och klicka på ”Registrera” / ”Nästa”.",
    step2: "Slutförandet öppnas i ett nytt Pretix-fönster — tillåt popup-fönster.",
    step3: "Om knapparna inte svarar, använd länken ”Öppna hela registreringsformuläret” under widgeten.",
    openForm: "ÖPPNA HELA REGISTRERINGSFORMULÄRET",
    tip: "Efter att du valt biljett sker slutförandet av beställningen på Pretix webbplats.",
    deadline: "Förberedelsedag: 12 juni",
    dateLabel: "DATUM", placeLabel: "PLATS",
    admissionLabel: "INTRÄDE", admissionValue: "GRATIS",
    limitLabel: "OBS", limitValue: "BEGRÄNSAT ANTAL PLATSER",
    contactLabel: "KONTAKT — REGISTRERING",
    questionsLabel: "FRÅGOR OM REGISTRERING?",
    contactUs: "KONTAKTA OSS",
    admissionNote: "Finansierat av lokala bidrag",
    registerNow: "Registrera dig nu",
  },
  nl: {
    title: "Registratie voor Cerberus",
    subtitle: "GRATIS TOEGANG · REGISTRATIE VEREIST",
    howTitle: "ZO REGISTREER JE JE — 3 STAPPEN",
    step1: "Selecteer een ticket en klik op \"Registreren\" / \"Volgende\".",
    step2: "Afrekenen opent in een nieuw Pretix-venster — sta pop-ups toe.",
    step3: "Als knoppen niet reageren, gebruik de link \"Volledig registratieformulier openen\" onder de widget.",
    openForm: "VOLLEDIG REGISTRATIEFORMULIER OPENEN",
    tip: "Na het kiezen van een ticket vindt de afronding van de bestelling plaats op de Pretix-website.",
    deadline: "Voorbereidingsdag: 12 juni",
    dateLabel: "DATUM", placeLabel: "LOCATIE",
    admissionLabel: "TOEGANG", admissionValue: "GRATIS",
    limitLabel: "LET OP", limitValue: "BEPERKT AANTAL PLAATSEN",
    contactLabel: "CONTACT — REGISTRATIE",
    questionsLabel: "VRAGEN OVER REGISTRATIE?",
    contactUs: "NEEM CONTACT OP",
    admissionNote: "Gefinancierd door lokale subsidies",
    registerNow: "Registreer nu",
  },
  es: {
    title: "Registro para Cerberus",
    subtitle: "ENTRADA GRATUITA · REGISTRO OBLIGATORIO",
    howTitle: "CÓMO REGISTRARSE — 3 PASOS",
    step1: "Seleccione una entrada y haga clic en «Registrarse» / «Siguiente».",
    step2: "La finalización se abrirá en una nueva ventana de Pretix — permita las ventanas emergentes.",
    step3: "Si los botones no responden, use el enlace «Abrir formulario de registro completo» debajo del widget.",
    openForm: "ABRIR FORMULARIO DE REGISTRO COMPLETO",
    tip: "Tras seleccionar una entrada, la finalización del pedido se realiza en el sitio web de Pretix.",
    deadline: "Día preparatorio: 12 de junio",
    dateLabel: "FECHA", placeLabel: "LUGAR",
    admissionLabel: "ENTRADA", admissionValue: "GRATUITA",
    limitLabel: "AVISO", limitValue: "PLAZAS LIMITADAS",
    contactLabel: "CONTACTO — REGISTRO",
    questionsLabel: "¿PREGUNTAS SOBRE EL REGISTRO?",
    contactUs: "CONTÁCTENOS",
    admissionNote: "Financiado con subvenciones del gobierno local",
    registerNow: "Regístrese ahora",
  },
  pt: {
    title: "Registo no Cerberus",
    subtitle: "ENTRADA GRATUITA · REGISTO OBRIGATÓRIO",
    howTitle: "COMO REGISTAR-SE — 3 PASSOS",
    step1: "Selecione um bilhete e clique em \"Registar\" / \"Seguinte\".",
    step2: "A finalização abrirá numa nova janela Pretix — permita pop-ups.",
    step3: "Se os botões não responderem, use o link \"Abrir formulário de registo completo\" abaixo do widget.",
    openForm: "ABRIR FORMULÁRIO DE REGISTO COMPLETO",
    tip: "Após selecionar um bilhete, a finalização da encomenda ocorre no site da Pretix.",
    deadline: "Dia preparatório: 12 de junho",
    dateLabel: "DATA", placeLabel: "LOCAL",
    admissionLabel: "ENTRADA", admissionValue: "GRATUITA",
    limitLabel: "NOTA", limitValue: "LUGARES LIMITADOS",
    contactLabel: "CONTACTO — REGISTO",
    questionsLabel: "TEM QUESTÕES SOBRE O REGISTO?",
    contactUs: "CONTACTE-NOS",
    admissionNote: "Financiado por subsídios do governo local",
    registerNow: "Registe-se agora",
  },
  ro: {
    title: "Înregistrare la Cerberus",
    subtitle: "INTRARE GRATUITĂ · ÎNREGISTRARE OBLIGATORIE",
    howTitle: "CUM TE ÎNREGISTREZI — 3 PAȘI",
    step1: "Selectați un bilet și faceți clic pe „Înregistrare\" / „Următorul\".",
    step2: "Finalizarea se va deschide într-o fereastră Pretix nouă — permiteți ferestrele pop-up.",
    step3: "Dacă butoanele nu răspund, folosiți linkul „Deschideți formularul complet de înregistrare\" de sub widget.",
    openForm: "DESCHIDEȚI FORMULARUL COMPLET DE ÎNREGISTRARE",
    tip: "După selectarea biletului, finalizarea comenzii are loc pe site-ul Pretix.",
    deadline: "Zi pregătitoare: 12 iunie",
    dateLabel: "DATA", placeLabel: "LOCAȚIE",
    admissionLabel: "INTRARE", admissionValue: "GRATUITĂ",
    limitLabel: "NOTĂ", limitValue: "LOCURI LIMITATE",
    contactLabel: "CONTACT — ÎNREGISTRARE",
    questionsLabel: "ÎNTREBĂRI DESPRE ÎNREGISTRARE?",
    contactUs: "CONTACTAȚI-NE",
    admissionNote: "Finanțat prin granturi guvernamentale locale",
    registerNow: "Înregistrați-vă acum",
  },
  it: {
    title: "Registrazione a Cerberus",
    subtitle: "INGRESSO GRATUITO · REGISTRAZIONE OBBLIGATORIA",
    howTitle: "COME REGISTRARSI — 3 PASSAGGI",
    step1: "Seleziona un biglietto e fai clic su \"Registrati\" / \"Avanti\".",
    step2: "Il checkout si aprirà in una nuova finestra Pretix — consenti i popup.",
    step3: "Se i pulsanti non rispondono, usa il link \"Apri il modulo di registrazione completo\" sotto il widget.",
    openForm: "APRI IL MODULO DI REGISTRAZIONE COMPLETO",
    tip: "Dopo aver selezionato il biglietto, la finalizzazione dell'ordine avviene sul sito Pretix.",
    deadline: "Giorno preparatorio: 12 giugno",
    dateLabel: "DATA", placeLabel: "LUOGO",
    admissionLabel: "INGRESSO", admissionValue: "GRATUITO",
    limitLabel: "NOTA", limitValue: "POSTI LIMITATI",
    contactLabel: "CONTATTO — REGISTRAZIONE",
    questionsLabel: "DOMANDE SULLA REGISTRAZIONE?",
    contactUs: "CONTATTACI",
    admissionNote: "Finanziato da sovvenzioni del governo locale",
    registerNow: "Registrati ora",
  },
  ko: {
    title: "Cerberus 등록",
    subtitle: "무료 입장 · 등록 필수",
    howTitle: "등록 방법 — 3단계",
    step1: "티켓을 선택하고 \"등록\" / \"다음\"을 클릭하세요.",
    step2: "결제는 새 Pretix 창에서 열립니다 — 팝업을 허용하세요.",
    step3: "버튼이 작동하지 않으면 위젯 아래의 \"전체 등록 양식 열기\" 링크를 사용하세요.",
    openForm: "전체 등록 양식 열기",
    tip: "티켓 선택 후 주문 최종 단계는 Pretix 웹사이트에서 진행됩니다.",
    deadline: "사전 준비일: 6월 12일",
    dateLabel: "날짜", placeLabel: "장소",
    admissionLabel: "입장", admissionValue: "무료",
    limitLabel: "안내", limitValue: "자리 제한 있음",
    contactLabel: "문의 — 등록",
    questionsLabel: "등록 관련 문의가 있으신가요?",
    contactUs: "문의하기",
    admissionNote: "지방 정부 보조금으로 운영",
    registerNow: "지금 등록하기",
  },
};

const partnerCtaBase = {
  border: "1px solid #C4922A",
  background: "transparent",
  color: "#C4922A",
  fontFamily: "'Rajdhani', sans-serif",
  fontSize: "11px",
  letterSpacing: "3px",
  fontWeight: 700,
  padding: "12px 24px",
  cursor: "pointer",
  transition: "all 200ms ease",
} as const;

function setPartnerCtaHover(e: MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.background = "#C4922A";
  e.currentTarget.style.color = "#0F1720";
}

function setPartnerCtaLeave(e: MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.background = "transparent";
  e.currentTarget.style.color = "#C4922A";
}

/** Left column: heading + registration steps (Pretix widget is rendered between this and RegistrationTip via Astro). */
export function RegistrationIntro({ lang, pretixUrl }: RegistrationEmbedProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const c = regCopy[lang ?? "pl"] ?? regCopy["en"];

  return (
    <>
      <div className="mb-6">
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "44px",
            color: "#E4DDD0",
            letterSpacing: "1px",
            margin: 0,
          }}
        >
          <span>{c.title} </span>
          <span style={{ color: '#C42B2B' }}>K9</span>
        </h2>
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "5px",
            color: "#C4922A",
            fontWeight: 700,
            marginTop: "8px",
          }}
        >
          {c.subtitle}
        </p>
      </div>

      <div
        className="mb-3 sm:mb-4"
        style={{
          border: "1px solid rgba(196,146,42,0.4)",
          background: "#1A2430",
          padding: "20px",
        }}
      >
        <button
          type="button"
          onClick={() => setShowInstructions((v) => !v)}
          aria-expanded={showInstructions}
          aria-controls="registration-steps"
          className="flex w-full items-center justify-between gap-2 text-left sm:pointer-events-none sm:cursor-default"
        >
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "9px",
              letterSpacing: "4px",
              color: "#C4922A",
              fontWeight: 700,
            }}
          >
            {c.howTitle}
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform sm:hidden ${
              showInstructions ? "rotate-180" : ""
            }`}
            style={{ color: "#C4922A" }}
            aria-hidden="true"
          />
        </button>
        <ol
          id="registration-steps"
          className={`${
            showInstructions ? "mt-2 block" : "hidden"
          } space-y-1.5 sm:mt-3 sm:block sm:space-y-2`}
        >
          <li className="flex gap-2 sm:gap-3">
            <span
              style={{
                width: "20px",
                height: "20px",
                background: "#C4922A",
                color: "#0F1720",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              1
            </span>
            <span
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "14px",
                lineHeight: 1.45,
                color: "rgba(228,221,208,0.92)",
              }}
            >
              {c.step1}
            </span>
          </li>
          <li className="flex gap-2 sm:gap-3">
            <span
              style={{
                width: "20px",
                height: "20px",
                background: "#C4922A",
                color: "#0F1720",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              2
            </span>
            <span
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "14px",
                lineHeight: 1.45,
                color: "rgba(228,221,208,0.92)",
              }}
            >
              {c.step2}
            </span>
          </li>
          <li className="flex gap-2 sm:gap-3">
            <span
              style={{
                width: "20px",
                height: "20px",
                background: "#C4922A",
                color: "#0F1720",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              3
            </span>
            <span
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "14px",
                lineHeight: 1.45,
                color: "rgba(228,221,208,0.92)",
              }}
            >
              {c.step3}
            </span>
          </li>
        </ol>

        <a
          href={pretixUrl ?? 'https://pretix.eu/MLK9-LLK9/CERBERUS/'}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 sm:mt-4"
          style={partnerCtaBase}
          onMouseEnter={setPartnerCtaHover}
          onMouseLeave={setPartnerCtaLeave}
        >
          {c.openForm}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* PretixWidget is rendered below via Astro component */}
    </>
  );
}

export function RegistrationTip({ lang, pretixUrl }: RegistrationEmbedProps) {
  const c = regCopy[lang ?? "pl"] ?? regCopy["en"];
  const tipLabelByLang: Record<string, string> = {
    pl: "Wskazówka:",
    en: "Tip:",
    de: "Hinweis:",
    fr: "Conseil :",
    cs: "Tip:",
    sk: "Tip:",
    hu: "Tipp:",
    hr: "Savjet:",
    sl: "Nasvet:",
    lt: "Patarimas:",
    lv: "Padoms:",
    no: "Tips:",
    sv: "Tips:",
    nl: "Tip:",
    es: "Consejo:",
    pt: "Dica:",
    ro: "Sfat:",
    it: "Suggerimento:",
    ko: "팁:",
  };
  const tipLabel = tipLabelByLang[lang ?? "pl"] ?? tipLabelByLang.en;
  return (
    <div
      className="mt-4"
      style={{
        border: "1px solid rgba(196,146,42,0.3)",
        background: "rgba(196,146,42,0.08)",
        padding: "20px",
      }}
    >
      <p
        style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: "14px",
          lineHeight: 1.55,
          color: "rgba(228,221,208,0.92)",
          margin: "0 0 12px 0",
        }}
      >
        <strong style={{ color: "#C4922A" }}>{tipLabel}</strong> {c.tip}
      </p>
      <a
        href={pretixUrl ?? 'https://pretix.eu/MLK9-LLK9/CERBERUS/'}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2"
        style={partnerCtaBase}
        onMouseEnter={setPartnerCtaHover}
        onMouseLeave={setPartnerCtaLeave}
      >
        {c.openForm}
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

function telHref(phone: string) {
  const cleaned = phone.replace(/\s+/g, "").replace(/(?!^\+)\D/g, "");
  return `tel:${cleaned}`;
}

export function RegistrationAside({
  lang,
  dateValue,
  prepDay,
  venues,
  city,
  contactEmail,
  contactPhone,
}: RegistrationEmbedProps) {
  const c = regCopy[lang ?? "pl"] ?? regCopy["en"];
  const dateStr =
    dateValue ??
    (lang === "pl" ? "13–14 czerwca 2026" : lang === "de" ? "13.–14. Juni 2026" : "June 13–14, 2026");
  const prepStr = prepDay ?? c.deadline;
  const venuesStr =
    venues ?? "3MK Arena, Szkoła Mundurowa, Stadion Miejski";
  const cityStr = city ?? (lang === "pl" ? "Ostrów Wielkopolski" : "Ostrow Wielkopolski");
  const emailStr = contactEmail ?? "rejestracja@cerberusk9.pl";
  const phoneStr = contactPhone ?? "+48 000 000 000";
  return (
    <aside className="flex flex-col gap-4">
      <div
        style={{
          borderLeft: "3px solid #C4922A",
          background: "#1A2430",
          padding: "20px",
        }}
      >
        <div
          className="mb-2 flex items-center gap-2"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "#C4922A",
            fontWeight: 700,
          }}
        >
          <Calendar className="h-4 w-4 shrink-0" />
          {c.dateLabel}
        </div>
        <p
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "28px",
            color: "#E4DDD0",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {dateStr}
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "14px",
            color: "rgba(228,221,208,0.7)",
            margin: 0,
            marginTop: "4px",
          }}
        >
          {prepStr}
        </p>
      </div>

      <div
        style={{
          borderLeft: "3px solid #253344",
          background: "#1A2430",
          padding: "20px",
        }}
      >
        <div
          className="mb-2 flex items-center gap-2"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "#7A8A96",
            fontWeight: 700,
          }}
        >
          <MapPin className="h-4 w-4 shrink-0" />
          {c.placeLabel}
        </div>
        <p
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: 1.5,
            color: "#E4DDD0",
            margin: 0,
          }}
        >
          {venuesStr}
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "14px",
            color: "rgba(228,221,208,0.7)",
            margin: 0,
            marginTop: "4px",
          }}
        >
          {cityStr}
        </p>
      </div>

      <div
        style={{
          border: "1px solid rgba(42,122,58,0.4)",
          background: "rgba(42,122,58,0.1)",
          padding: "20px",
        }}
      >
        <div
          className="mb-2 flex items-center gap-2"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "#3A8A4A",
            fontWeight: 700,
          }}
        >
          <Ticket className="h-4 w-4 shrink-0" />
          {c.admissionLabel}
        </div>
        <p
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "36px",
            color: "#C4922A",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {c.admissionValue}
        </p>
        <p
          className="mt-2"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "12px",
            lineHeight: 1.5,
            color: "rgba(228,221,208,0.7)",
            margin: 0,
            marginTop: "8px",
          }}
        >
          {(c as any).admissionNote ?? "Finansowane z dotacji samorządowych"}
        </p>
      </div>

      <div
        style={{
          border: "1px solid rgba(196,43,43,0.4)",
          background: "rgba(196,43,43,0.1)",
          padding: "20px",
        }}
      >
        <div
          className="mb-2 flex items-center gap-2"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "#C42B2B",
            fontWeight: 700,
          }}
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {c.limitLabel}
        </div>
        <p
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "22px",
            color: "#E4DDD0",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {c.limitValue}
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "14px",
            color: "rgba(228,221,208,0.8)",
            margin: 0,
            marginTop: "4px",
          }}
        >
          {(c as any).registerNow ?? "Zarejestruj się teraz"}
        </p>
      </div>

      <div style={{ background: "#1A2430", padding: "20px" }}>
        <div
          className="mb-3"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "#7A8A96",
            fontWeight: 700,
          }}
        >
          {c.contactLabel}
        </div>
        <div className="space-y-2">
          <a
            href={`mailto:${emailStr}`}
            className="flex items-center gap-2 transition-colors duration-200"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "11px",
              color: "#E4DDD0",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#C4922A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#E4DDD0";
            }}
          >
            <Mail className="h-4 w-4 shrink-0" style={{ color: "#C4922A" }} />
            {emailStr}
          </a>
          <a
            href={telHref(phoneStr)}
            className="flex items-center gap-2 transition-colors duration-200"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "11px",
              color: "#E4DDD0",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#C4922A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#E4DDD0";
            }}
          >
            <Phone className="h-4 w-4 shrink-0" style={{ color: "#C4922A" }} />
            {phoneStr}
          </a>
        </div>
      </div>

      <div
        className="mt-2 text-center"
        style={{
          background: "#1A2430",
          padding: "20px",
          border: "1px solid rgba(37,51,68,0.9)",
        }}
      >
        <p
          className="mb-2"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "#7A8A96",
            fontWeight: 700,
            margin: 0,
            marginBottom: "8px",
          }}
        >
          {c.questionsLabel}
        </p>
        <a
          href={`/${lang ?? 'pl'}/kontakt`}
          className="inline-flex items-center gap-2"
          style={{ ...partnerCtaBase, textDecoration: "none" }}
          onMouseEnter={(e) => {
            setPartnerCtaHover(e);
          }}
          onMouseLeave={(e) => {
            setPartnerCtaLeave(e);
          }}
        >
          {c.contactUs}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </aside>
  );
}
