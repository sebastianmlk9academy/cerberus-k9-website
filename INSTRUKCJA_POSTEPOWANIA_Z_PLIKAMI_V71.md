# Instrukcja postępowania z plikami v7.1

Poniżej masz praktyczny schemat pracy na plikach, które już zostały przygotowane.

## 1) Do czego służy każdy plik

- `claude_vs_repo_verification_report.txt`  
  Raport zgodności: co Claude założył vs co realnie jest w repo.

- `MEGA_PROMPT_V7_1_VERIFIED.txt`  
  Zweryfikowany, główny prompt diagnostyczny (punkt odniesienia "source of truth").

- `WORKFLOW_AKCEPTACJI_CURSOR_CLAUDE.txt`  
  Zasady obiegu pracy: Cursor -> Claude -> Twoja akceptacja -> prompt wykonawczy.

- `PROMPT_PACK_R01_R42_CURSOR.txt`  
  Pakiet zadań wdrożeniowych R01-R42 (zakres prac).

- `FINALNY_SKRYPT_DZIALANIA_V7_1.txt`  
  Plan operacyjny: kolejność i logika realizacji etapów.

- `FULL_PROMPTS_R01_R42_READY.txt`  
  Gotowe prompty do użycia 1:1 (R01-R42 + strict addon).

- `INSTRUKCJA_PRACY_Z_PROMPTAMI_R01_R42.md`  
  Instrukcja wykonawcza "jak prowadzić pojedynczy task RXX".

## 2) Kolejność pracy (najważniejsze)

1. **Punkt startowy faktów**  
   Przeczytaj najpierw: `claude_vs_repo_verification_report.txt`.

2. **Punkt odniesienia diagnostycznego**  
   Potwierdź zakres przez: `MEGA_PROMPT_V7_1_VERIFIED.txt`.

3. **Zasady procesu**  
   Ustal workflow z: `WORKFLOW_AKCEPTACJI_CURSOR_CLAUDE.txt`.

4. **Plan etapów**  
   Sprawdź kolejność i priorytety w: `FINALNY_SKRYPT_DZIALANIA_V7_1.txt`.

5. **Realizacja zadań**  
   Wykonuj taski z: `FULL_PROMPTS_R01_R42_READY.txt` (lub `PROMPT_PACK_R01_R42_CURSOR.txt` jako referencja).

## 3) Jak realizować pojedyncze zadanie RXX

Dla każdego numeru (np. R08):

1. Skopiuj blok `R08` z `FULL_PROMPTS_R01_R42_READY.txt`.
2. Dołącz sekcję `STRICT PRODUCTION ADDON`.
3. Dopisz na końcu:
   - `Wykonaj tylko R08. Nie wychodź poza scope.`
   - `Zwróć wynik dokładnie wg MANDATORY OUTPUT SCHEMA.`
4. Uruchom w Cursor.
5. Odbierz raport i sprawdź:
   - build: `npm run build`,
   - typecheck: `npx tsc --noEmit`,
   - brak driftu wizualnego,
   - brak zmian poza zakresem.
6. Akceptacja -> commit -> dopiero kolejny numer.

## 4) Reguły bezpieczeństwa

- Nigdy nie uruchamiaj wielu R-tasków w jednym poleceniu.
- Nigdy nie pomijaj sekcji strict.
- Nie akceptuj zadania bez zielonego build/typecheck.
- Każdy task kończ osobnym, małym commitem.
- Jeśli raport mówi `Requires business decision: yes`, zatrzymaj i podejmij decyzję przed dalszą pracą.

## 5) Minimalny rytm dzienny

- Dziennie realizuj 1-3 taski R (zależnie od trudności).
- Każdy task: wykonanie -> raport -> akceptacja -> commit.
- Na koniec dnia zapisz:
  - zrealizowane R,
  - otwarte ryzyka,
  - decyzje potrzebne na kolejny dzień.

## 6) Kiedy uznać całość za zamkniętą

Program R01-R42 jest zamknięty, gdy:
- wszystkie R mają status accepted,
- nie ma otwartych blockerów z R42,
- masz finalny status go/no-go z uzasadnieniem.

