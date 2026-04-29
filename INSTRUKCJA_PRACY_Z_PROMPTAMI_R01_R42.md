# Instrukcja pracy z promptami R01-R42

Ten dokument opisuje prosty, powtarzalny sposób pracy z plikiem:
- `FULL_PROMPTS_R01_R42_READY.txt`

Cel: wykonywać zadania R01-R42 bez chaosu, bez regresji wizualnych i z pełną kontrolą jakości.

## 1. Co masz przygotowane

W `FULL_PROMPTS_R01_R42_READY.txt` są:
- prompty zadaniowe `R01...R42` (co zrobić),
- sekcja `STRICT PRODUCTION ADDON` (jak raportować i czego nie wolno).

## 2. Zasada główna (bardzo ważna)

Dla każdego zadania wykonujesz ten sam cykl:
1. Wybierasz jedno `RXX` (np. `R07`).
2. Wklejasz do Cursor:
   - najpierw blok `RXX`,
   - od razu pod nim sekcję `STRICT PRODUCTION ADDON`.
3. Cursor wykonuje tylko ten zakres.
4. Odbierasz raport w formacie z `MANDATORY OUTPUT SCHEMA`.
5. Sprawdzasz akceptację.
6. Dopiero potem przechodzisz do kolejnego `RXX+1`.

Nie uruchamiaj wielu R naraz.

## 3. Schemat operacyjny (Cursor -> Akceptacja -> Następny krok)

### Krok A: Start zadania
- Otwórz `FULL_PROMPTS_R01_R42_READY.txt`.
- Skopiuj wybrane `RXX`.
- Doklej `STRICT PRODUCTION ADDON`.
- Dodaj 1 zdanie sterujące:
  - "Wykonaj tylko zakres RXX. Nie wychodź poza scope."

### Krok B: Realizacja i raport
- Cursor robi zmiany.
- Cursor zwraca raport wg sekcji:
  - `Scope`,
  - `Changes`,
  - `Definition of Done Check`,
  - `Validation Logs`,
  - `Risks / Decisions Needed`.

### Krok C: Twoja akceptacja
Akceptujesz RXX, jeśli:
- build i typecheck są zielone,
- nie ma driftu wizualnego,
- nie ma zmian poza scope,
- ryzyka są opisane i zrozumiałe.

Jeśli coś nie gra, odpalasz poprawkę:
- "Popraw tylko punkty X/Y z raportu RXX. Bez nowych zmian."

### Krok D: Zamknięcie etapu
Po akceptacji:
- robisz commit tylko dla tego RXX,
- dopiero potem startujesz kolejny numer.

## 4. Zalecana kolejność realizacji

Minimalna bezpieczna sekwencja:
1. Content i fundament: `R01-R10`
2. Pretix i rejestracja: `R11-R15`
3. Nowe strony/funkcje eventowe: `R16-R23`
4. Integracje zewnętrzne: `R24-R30`
5. Live/ops/media: `R31-R38`
6. Final hardening: `R39-R42`

## 5. Bramka jakości przed każdym "następnym R"

Checklist:
- `npm run build` przechodzi,
- `npx tsc --noEmit` przechodzi,
- raport ma komplet sekcji,
- brak zmian stylu/layoutu,
- brak hardcoded user-facing tekstów,
- brak sekretów w kodzie.

Jeśli choć 1 punkt jest na "nie", nie przechodzisz dalej.

## 6. Jak kopiować prompt poprawnie

Dla każdego zadania używaj tego mini-szablonu:

1) blok `RXX` z pliku,
2) cały `STRICT PRODUCTION ADDON`,
3) dopisek:

`Wykonaj tylko RXX. Zwróć wynik dokładnie wg MANDATORY OUTPUT SCHEMA.`

## 7. Jak pracować z ryzykami i decyzjami

Jeśli w raporcie jest:
- `Requires business decision: yes`

to:
1. Zatrzymujesz progres na tym RXX.
2. Podejmujesz decyzję biznesową.
3. Dajesz Cursor jednoznaczne polecenie wdrożenia wybranej opcji.
4. Dopiero po rewalidacji idziesz dalej.

## 8. Czego unikać

- Nie mieszaj kilku R w jednym poleceniu.
- Nie pomijaj sekcji strict.
- Nie rób "na oko" akceptacji bez build/typecheck.
- Nie rób dużych commitów obejmujących wiele R.

## 9. Definicja ukończenia całego programu R01-R42

Program uznajesz za domknięty, gdy:
- wszystkie R01-R42 mają status accepted,
- każde ma raport zgodny ze schematem,
- brak otwartych blockerów z R42,
- jest finalny go/no-go z uzasadnieniem.

## 10. Szybki tryb dzienny (praktyka)

Na każdy dzień:
1. Weź 1-3 zadania R (zależnie od złożoności).
2. Dla każdego: wykonanie -> raport -> akceptacja -> commit.
3. Na koniec dnia: krótki log postępu:
   - zrobione R,
   - ryzyka,
   - decyzje na jutro.

