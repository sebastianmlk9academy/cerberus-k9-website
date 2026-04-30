# Brief: zgoda na cookies i trackery (implementacja R13)

**Dla:** Sebastian  
**Kontekst:** strona CERBERUS K9 (Astro + React), klucz localStorage `ck9_consent_v1`, wersja polityki z CMS (`consent_version` w `ustawienia.yml`).

## Czym jest „consent” w naszej implementacji

**Consent** to świadomy wybór użytkownika co do **opcjonalnych** kategorii przetwarzania: **analityka**, **marketing** oraz **preferencje** (w tym narzędzia typu nagrywanie sesji). Kategoria **niezbędna** jest zawsze włączona (techniczne działanie strony); nie pokazujemy jej jako przełącznika, bo nie wymaga zgody w modelu „tylko niezbędne”.

Zapis w przeglądarce to JSON w `localStorage` pod kluczem **`ck9_consent_v1`**, m.in. z polami:

- `analytics`, `marketing`, `preferences` (boolean),
- `timestamp` (ISO, kiedy użytkownik zapisał wybór),
- `version` — **numer wersji polityki zgody**, z jaką ten wybór został zapisany (patrz niżej).

Dopóki użytkownik **nie** wyrazi zgody w aktualnej wersji polityki, **zewnętrzne trackery** (GA4, Plausible, Meta Pixel, Microsoft Clarity) **nie** są wstrzykiwane do strony — w zakładce Sieć (F12) nie powinny pojawiać się żądania do `googletagmanager.com`, `plausible.io`, `clarity.ms`, `facebook.com` z inicjatywy naszych skryptów.

## Jak zmienić politykę i wymusić ponowny wybór u wszystkich

1. Zaktualizuj **Politykę prywatności** / komunikat cookies (treść prawna — np. w przyszłym R31).
2. W CMS (**Ustawienia globalne → sekcja „Analityka i trackery”**) podbij pole **`consent_version`** (np. z `1` na `2`).
3. Po publikacji: każdy, kto ma w `localStorage` zapis ze **starszą** wartością `version` niż aktualna w CMS, zostanie potraktowany jak osoba **bez ważnej zgody** — zobaczy ponownie baner i trackery pozostaną wyłączone do nowego wyboru.

Nie musisz ręcznie czyścić localStorage użytkowników; mechanizm opiera się na porównaniu **`version` w zapisie** z **`consent_version` z CMS**.

## Trackery: co wdrażamy, co zbierają, cel (szkic pod Politykę Prywatności)

| Narzędzie | Kategoria zgody | Typowe dane / zachowanie | Cel biznesowy (szkic) |
|-----------|-----------------|---------------------------|------------------------|
| **Google Analytics 4** (`ga4_id`) | Analityka | Statystyki wizyt, interakcji, urządzeń (wg konfiguracji GA4 / Google). | Pomiar ruchu i skuteczności strony, ulepszanie treści. |
| **Plausible Analytics** (`plausible_domain`) | Analityka | Zanonimizowany ruch stronowy (model Plausible — bez ciasteczek reklamowych w typowej konfiguracji; i tak ładujemy skrypt dopiero po zgodzie). | Prywatnościowe statystyki odwiedzin. |
| **Meta (Facebook) Pixel** (`facebook_pixel_id`) | Marketing | Zdarzenia konwersji, remarketing (wg polityki Meta). | Pomiar kampanii reklamowych i optymalizacja. |
| **Microsoft Clarity** (`microsoft_clarity_id`) | Preferencje | Nagrania sesji, mapy ciepła, dane behawioralne (wg Clarity). | Diagnostyka UX i błędów interfejsu. |

**Uwaga prawna:** powyższa tabela to **opis techniczny** do spięcia z pełną Polityką Prywatności i ewentualnie umowami powierzenia — nie zastępuje konsultacji prawnej.

## Gdzie w CMS ustawiasz ID i wersję

Plik / sekcja: **`ustawienia.yml`** w grupie **„Analityka i trackery”** — pola puste = brak ładowania danego skryptu, nawet przy zgodzie użytkownika.

---

*Dokument roboczy powiązany z refaktorem banera cookies (R13).*
