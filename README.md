# Kyokushin Dojo – aplikacja do nauki karate

Aplikacja webowo-mobilna (PWA) do nauki karate Kyokushin: wideo z technikami kihon, kata i kihon kumite, programy treningowe oraz sekcja **Teoria i Wiedza**.

**Stos:** Next.js 16 (App Router, TypeScript, Tailwind CSS 4) · Supabase (Postgres, Auth, RLS) · Mux (hosting i streaming wideo) · Vercel (hosting).

## Szybki start

```bash
npm install
npm run dev
```

Aplikacja działa od razu pod http://localhost:3000, nawet bez Supabase i Mux. W tym trybie podglądu treści (artykuły, słowniczek, przykładowe techniki i program) są czytane z plików w `src/content/`. Logowanie, panel admina i wideo wymagają konfiguracji poniżej.

## Konfiguracja

1. Skopiuj `.env.example` do `.env.local`.
2. **Supabase:** utwórz projekt na [supabase.com](https://supabase.com) i wklej URL, klucz `anon` oraz `service_role` (Project Settings → API).
3. Uruchom migrację: wklej `supabase/migrations/20261020000000_init.sql` w SQL Editor albo użyj `supabase db push` (Supabase CLI).
4. Wgraj treści startowe: `npm run db:seed`.
5. Zaloguj się w aplikacji (`/logowanie`), a potem nadaj sobie rolę admina w SQL Editor:
   ```sql
   update profiles set role = 'admin' where id = (select id from auth.users where email = 'twoj@email.pl');
   ```
6. **Mux:** utwórz token API (Settings → Access Tokens, uprawnienia Mux Video: Read + Write) i webhook (Settings → Webhooks) kierujący na `https://<twoja-domena>/api/mux/webhook`. Wklej `MUX_TOKEN_ID`, `MUX_TOKEN_SECRET` i `MUX_WEBHOOK_SECRET`.

## Struktura

```
src/
  app/
    page.tsx                 strona startowa
    techniki/                lista technik (filtr kihon / kata / kihon kumite) i strona z wideo
    programy/                programy treningowe z planem na kolejne dni
    wiedza/                  ★ Teoria i Wiedza
      page.tsx               przegląd: kategorie artykułów + wejście do słowniczka
      [slug]/page.tsx        artykuł (Markdown)
      slowniczek/page.tsx    słowniczek z wyszukiwarką i filtrem kategorii
    admin/
      wiedza/                ★ dodawanie i edycja artykułów (Markdown z podglądem, szkic/publikacja)
      techniki/              upload wideo do Mux przy każdej technice
    api/mux/upload           tworzy bezpośredni upload do Mux (tylko admin)
    api/mux/webhook          zapisuje playback ID po przetworzeniu wideo
    logowanie/, auth/        logowanie linkiem e-mail (Supabase Auth)
    manifest.ts              manifest PWA
  components/                nawigacja (góra + dolne zakładki na telefonie), odtwarzacz Mux, Markdown, słowniczek
  content/                   treści startowe: historia, Dojo Kun, etykieta, stopnie, ~110 pojęć, techniki
  lib/
    data.ts                  dostęp do danych (Supabase lub treści startowe)
    auth.ts                  bieżący użytkownik i rola admin
    supabase/                klienci Supabase (serwer, przeglądarka, proxy)
  proxy.ts                   odświeżanie sesji i ochrona /admin
supabase/migrations/         schemat bazy z politykami RLS
scripts/seed.ts              wgrywanie treści startowych do Supabase
```

## Teoria i Wiedza

Sekcja składa się z trzech części:

- **Artykuły** w kategoriach: Historia, Zasady i etykieta, Stopnie i egzaminy, Wiedza treningowa. Na start: historia Kyokushin, Dojo Kun (7 zasad, japoński i polski), etykieta w dojo, system kyu/dan.
- **Słowniczek** z wyszukiwarką odporną na polskie znaki: komendy, etykieta, poziomy i części ciała, pozycje, tsuki, uchi (np. uraken), uke, geri, kata, liczenie, pojęcia ogólne.
- **Edytor** w `/admin/wiedza`: tytuł, adres, kategoria, zajawka, treść w Markdown z podglądem i przełącznik „Opublikowany”. Szkice widzi tylko admin (wymusza to RLS w bazie).

Nowe kategorie dodajesz w tabeli `knowledge_categories`, a pojęcia słowniczka w `glossary_terms` (Supabase Table Editor) lub w `src/content/glossary.ts` i ponownym `npm run db:seed`.

## Model danych

| Tabela | Zawartość |
| --- | --- |
| `profiles` | rola (`student` / `instructor` / `admin`) i pas użytkownika |
| `techniques` | techniki: kategoria, stopień, opis, `mux_playback_id` |
| `programs`, `program_items` | programy treningowe i ich elementy na kolejne dni |
| `progress` | postępy ucznia w technikach (tylko własne wiersze) |
| `knowledge_categories`, `articles` | sekcja Teoria i Wiedza |
| `glossary_terms` | słowniczek |

## Skrypty

| Polecenie | Opis |
| --- | --- |
| `npm run dev` | serwer deweloperski |
| `npm run build` | build produkcyjny |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm run db:seed` | wgranie treści startowych do Supabase |
