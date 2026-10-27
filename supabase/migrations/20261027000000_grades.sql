-- System stopni z dwoma torami:
--   junior: do 15. roku życia, kyu z podstopniami (10.1, 10.2, 10.3) od 10. do 5. kyu,
--   senior: od 16. roku życia, pełne kyu od 10. do 1. oraz stopnie dan.
-- Stopnie od 4. kyu w górę istnieją tylko w torze senior (min_age = 16).

create table public.grades (
  code text primary key,                -- np. 'J-10.1', 'S-4', 'D-1'
  track text not null check (track in ('junior', 'senior')),
  kyu int check (kyu between 1 and 10),
  dan int check (dan between 1 and 10),
  sub int check (sub between 1 and 3),  -- podstopień juniora (liczba czerwonych belek)
  label text not null,                  -- np. '10.1 kyu', '4 kyu', '1 dan'
  belt_color text not null,             -- kolor pasa
  stripe_color text,                    -- kolorowa belka (kolor kolejnego pasa)
  red_stripes int not null default 0,   -- czerwone belki podstopni juniora
  gold_stripes int not null default 0,  -- złote belki stopni dan
  min_age int,
  max_age int,
  sort_order int not null,              -- kolejność w obrębie toru
  requirements text,                    -- wymagania egzaminacyjne (Markdown), uzupełnia admin
  check ((kyu is null) <> (dan is null)),
  check (track = 'junior' or sub is null)
);

create index grades_track_idx on public.grades (track, sort_order);

alter table public.grades enable row level security;

create policy "Publiczne stopnie" on public.grades
  for select using (true);
create policy "Admin: stopnie" on public.grades
  for all using (public.is_admin()) with check (public.is_admin());

-- Aktualny stopień ucznia (dokładniejszy niż dotychczasowe pole tekstowe belt).
alter table public.profiles
  add column grade_code text references public.grades on update cascade on delete set null;

-- Uczeń nie może sam zmienić sobie roli ani stopnia; robi to admin (instruktor).
drop policy "Edycja własnego profilu" on public.profiles;
create policy "Edycja własnego profilu" on public.profiles
  for update using (id = auth.uid())
  with check (
    id = auth.uid()
    and role = (select p.role from public.profiles p where p.id = auth.uid())
    and grade_code is not distinct from (select p.grade_code from public.profiles p where p.id = auth.uid())
  );
create policy "Admin: profile" on public.profiles
  for update using (public.is_admin()) with check (public.is_admin());
