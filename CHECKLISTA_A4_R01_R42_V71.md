# CHECKLISTA A4 — R01-R42 (v7.1)

Krótka karta operacyjna: 1 zadanie R na raz, bez chaosu.

## 0) Zasada główna

- Wykonuj tylko jeden task `RXX` w jednym przebiegu.
- Zero zmian wizualnych (kolory, spacing, typografia, layout).
- Zero nowych hardcoded user-facing tekstów.

## 1) Start dnia (2 min)

- [ ] Otwórz: `FULL_PROMPTS_R01_R42_READY.txt`
- [ ] Sprawdź poprzedni status (jaki był ostatni accepted `RXX`)
- [ ] Wybierz dziś: `RXX` (max 1-3 taski/dzień)

## 2) Start taska RXX

- [ ] Skopiuj blok `RXX`
- [ ] Doklej `STRICT PRODUCTION ADDON`
- [ ] Dodaj polecenie:
      `Wykonaj tylko RXX. Nie wychodź poza scope.`
      `Zwróć wynik dokładnie wg MANDATORY OUTPUT SCHEMA.`

## 3) Wymagany wynik od Cursor

- [ ] `Scope`
- [ ] `Changes`
- [ ] `Definition of Done Check`
- [ ] `Validation Logs`
- [ ] `Risks / Decisions Needed`

Jeśli raport nie ma pełnego formatu -> poprawa raportu przed akceptacją.

## 4) Bramka jakości (must pass)

- [ ] `npm run build` = PASS
- [ ] `npx tsc --noEmit` = PASS
- [ ] Brak driftu wizualnego
- [ ] Brak zmian poza zakresem RXX
- [ ] Brak sekretów/tokenów w kodzie
- [ ] Brak `as any` jako obejścia problemu

Jeśli cokolwiek = FAIL -> nie przechodź do kolejnego R.

## 5) Decyzja biznesowa (gdy wymagana)

Jeśli raport ma: `Requires business decision: yes`
- [ ] Stop dalszych R
- [ ] Podejmij decyzję (A/B)
- [ ] Wydaj jednoznaczne polecenie wdrożenia opcji
- [ ] Powtórz walidację

## 6) Zamknięcie taska RXX

- [ ] Status: ACCEPTED
- [ ] Osobny commit tylko dla `RXX`
- [ ] Krótka notatka: co zrobione / ryzyka
- [ ] Dopiero teraz start `RXX+1`

## 7) Koniec dnia (3 min)

- [ ] Lista ukończonych R dziś
- [ ] Lista otwartych ryzyk
- [ ] Lista decyzji na jutro

## 8) Definition of done całego programu

Program R01-R42 jest zamknięty, gdy:
- [ ] Wszystkie R01-R42 = ACCEPTED
- [ ] R42 nie ma otwartych blockerów
- [ ] Jest finalne `GO/NO-GO` z uzasadnieniem

