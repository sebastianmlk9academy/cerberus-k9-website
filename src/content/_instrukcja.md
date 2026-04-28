# Witaj w panelu CMS CERBERUS K9

Ta instrukcja opisuje aktualny, bezpieczny workflow edycji.
Cel: jedna ścieżka edycji, brak pomyłek między polami aktywnymi i legacy.

---

## Zasada najważniejsza

Edytuj najpierw pola kanoniczne wskazane poniżej.
Pola oznaczone jako legacy/rezerwa traktuj jako awaryjne fallbacki.

---

## Mapa kanoniczna: gdzie edytować co

### Rejestracja (strona `/rejestracja`)

- Kanoniczne źródło: kolekcja `Rejestracja — Informacje Boczne` (`registration_info`).
- Tu edytuj: daty, miejsca, kontakt rejestracji, kroki, teksty sidebara.
- W `Ustawienia Globalne` pola `registration_*` są fallbackami legacy.

### Kontakt + Media + Partnerzy (dane kontaktowe i sponsoring)

- Kanoniczne źródło: kolekcja `Kontakt — Treści` (`kontakt_content`).
- Tu edytuj: endpoint i odbiorcę formularza, zgody GDPR, kontakty medialne,
  deadline akredytacji, PDF sponsoringu, e-mail sponsoring.
- W `Ustawienia Globalne` odpowiedniki tych pól są fallbackami legacy.

### Hero / stopka / globalne URL i branding

- Kanoniczne źródło: `Ustawienia Globalne` (`ustawienia`).
- Tu edytuj: logo, sociale, linki stopki, główne URL, SEO globalne.

---

## Legacy i rezerwa: jak traktować

- Jeśli pole ma dopisek `legacy` lub `rezerwa`, nie używaj go do codziennej edycji treści.
- Takie pole może być puste i to jest poprawne.
- Najpierw sprawdzaj hint pod polem: zawiera informację, gdzie jest pole kanoniczne.

---

## Checklista przed publikacją

1. Edytowałem właściwą kolekcję kanoniczną (nie fallback legacy).
2. Uzupełniłem pola wymagane (`required`).
3. Wszystkie URL zaczynają się od `https://` (chyba że hint mówi inaczej).
4. Wpis ma poprawną kolejność (`order`) i status widoczności (`active`).
5. W kolekcjach folderowych sprawdzam podgląd listy (summary) przed zapisem.
6. Po zapisie sprawdzam stronę docelową (np. `/rejestracja`, `/kontakt`, `/media`).

---

## Jak rozpoznać „puste pole” vs błąd

- Pole puste + hint mówi „opcjonalne/rezerwa” -> stan poprawny.
- Pole puste + powinno być wymagane biznesowo -> uzupełnij.
- Jeśli pole nie wpływa na stronę, sprawdź czy nie edytujesz fallbacku legacy.

---

## Czego nie robić

- Nie usuwaj wpisów, jeśli nie musisz; użyj `active: false` (ukrycie).
- Nie zmieniaj kluczy technicznych (`key`, `value`, `slug`) bez uzgodnienia.
- Nie mieszaj źródeł: dla jednego obszaru edytuj tylko kolekcję kanoniczną.

---

## Szybka ścieżka pracy redaktora

1. Wybierz kolekcję kanoniczną.
2. Wprowadź zmiany.
3. Zapisz.
4. Sprawdź stronę docelową.
5. Opublikuj.

---

## Kontakt techniczny

W razie problemów: `sebastian@pactak9.org`
